package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

// Injection
type TaskHandler struct {
	data      TaskData
	validator *validator.Validate
}

// Constructor
func NewTaskHandler(data TaskData) *TaskHandler {
	return &TaskHandler{
		data:      data,
		validator: validator.New(), // Criamos a instância do validador aqui
	}
}

// @Summary      Cria uma nova task
// @Description  Preenche os dados da task e cria ela
// @Tags         tasks
// @Accept       json
// @Produce      json
// @Param        task  body      CreateTaskPayload  true  "Payload da Task"
// @Success      201  {object}  Task
// @Failure      400  {object}  map[string]string
// @Failure      500  {object}  map[string]string
// @Router       /tasks [post]
func (h *TaskHandler) CreateTask(w http.ResponseWriter, r *http.Request) {

	// Take the json and transforms in UpdateTaskPayload
	var payload CreateTaskPayload

	// If the pattern is not equal, it throws an exception
	if erro := json.NewDecoder(r.Body).Decode(&payload); erro != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Invalid Json"})
		return
	}

	if erro := h.validator.Struct(payload); erro != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"error": "Validation fail: " + erro.Error()})
		return
	}

	task, erro := h.data.CreateTask(payload.Title, payload.Description, payload.Priority, payload.Deadline)
	if erro != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"erro": "Fail in create task"})
		return
	}

	writeJSON(w, http.StatusCreated, task)
}

// @Summary      Busca uma task por um ID
// @Description  Retorna a task relacionada ao unico ID
// @Tags         tasks
// @Produce      json
// @Param        id   path      string  true  "ID da Task"
// @Success      200  {object}  Task
// @Failure      400  {object}  map[string]string
// @Failure      404  {object}  map[string]string
// @Router       /tasks/{id} [get]
func (h *TaskHandler) GetTaskById(w http.ResponseWriter, r *http.Request) {

	//Take the variants of the path
	vars := mux.Vars(r)

	id, ok := vars["id"]

	if !ok {
		writeJSON(w, http.StatusBadRequest, map[string]string{"erro": "ID isn't in the path"})
		return
	}

	task, erro := h.data.GetTask(id)
	if erro != nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"erro": erro.Error()})
		return
	}

	writeJSON(w, http.StatusOK, task)
}

// @Summary      Lista as Tasks
// @Description  Retorna em uma lista todas as Tasks encontradas
// @Tags         tasks
// @Produce      json
// @Param        task     query     string  false  "Busca por parte do titulo fornecida(case-insensitive)"
// @Param        ordem    query     string  false  "Ordena por prioridade fornecida(priority_grw, priority_dec)"
// @Param        filtro   query     string  false  "Filtra por prioridade (Alta, Media ou Baixa)"
// @Success      200  {array}   Task
// @Failure      500  {object}  map[string]string
// @Router       /tasks [get]
func (h *TaskHandler) GetAllTasks(w http.ResponseWriter, r *http.Request) {

	// Take the query params
	filterPriority := r.URL.Query().Get("priority")
	sortOrder := r.URL.Query().Get("sort")
	searchTask := r.URL.Query().Get("search")

	tasks, erro := h.data.GetAllTasks(filterPriority, sortOrder, searchTask)
	if erro != nil {
		writeJSON(w, http.StatusInternalServerError, map[string]string{"erro": "Fail in get tasks"})
		return
	}

	writeJSON(w, http.StatusOK, tasks)

}

// @Summary      Atualiza uma Task existente
// @Description  Atualiza os campos de uma Task (titulo, descricao, prioridade, prazo, status)
// @Tags         tasks
// @Accept       json
// @Produce      json
// @Param        id    path      string             true  "ID da Task"
// @Param        task  body      UpdateTaskPayload  true  "Campos da Task para Atualizar"
// @Success      200  {object}  Task
// @Failure      400  {object}  map[string]string
// @Failure      404  {object}  map[string]string
// @Router       /tasks/{id} [put]
func (h *TaskHandler) UpdateTask(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	id, ok := vars["id"]

	if !ok {
		writeJSON(w, http.StatusBadRequest, map[string]string{"erro": "ID isn't in the path"})
		return
	}

	// Transforms JSON into UpdateTaskPayload
	var payload UpdateTaskPayload
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"erro": "Invalid json"})
		return
	}

	// Validates the business rules
	if err := h.validator.Struct(payload); err != nil {
		writeJSON(w, http.StatusBadRequest, map[string]string{"erro": "Validation failed: " + err.Error()})
		return
	}

	// Save in Data Base
	task, err := h.data.UpdateTask(id, payload)
	if err != nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"erro": err.Error()})
		return
	}

	writeJSON(w, http.StatusOK, task)

}

// @Summary      Deleta uma Task
// @Description  Remove uma Task relacionada ao unico ID
// @Tags         tasks
// @Produce      json
// @Param        id   path      string  true  "ID da Task"
// @Success      204  "No Content"
// @Failure      400  {object}  map[string]string
// @Failure      404  {object}  map[string]string
// @Router       /tasks/{id} [delete]
func (h *TaskHandler) DeleteTask(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		writeJSON(w, http.StatusBadRequest, map[string]string{"erro": "ID não fornecido"})
		return
	}

	if err := h.data.DeleteTask(id); err != nil {
		writeJSON(w, http.StatusNotFound, map[string]string{"erro": err.Error()})
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(v); err != nil {
		fmt.Printf("Erro ao escrever JSON: %v", err)
	}

}
