package main

import (
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	_ "github.com/HerculesDraycon/desafio-fullstack-veritas/docs"
	httpSwagger "github.com/swaggo/http-swagger"
)

// @title           Kanban de Tarefas - Desafio Fullstack Veritas
// @version         1.0
// @description     Aplicação de Kanban de tarefas (React + Go).
// @termsOfService  http:
// @host            localhost:8080
// @BasePath
func main() {

	// Data Base Instance
	db := NewTaskRepository()

	// Data Base injection into Controller
	taskHandler := NewTaskHandler(db)

	router := mux.NewRouter()

	api := router.PathPrefix("/").Subrouter()
	api.PathPrefix("/swagger/").Handler(httpSwagger.WrapHandler)

	api.HandleFunc("/tasks", taskHandler.CreateTask).Methods(http.MethodPost)
	api.HandleFunc("/tasks/{id}", taskHandler.GetTaskById).Methods(http.MethodGet)
	api.HandleFunc("/tasks", taskHandler.GetAllTasks).Methods(http.MethodGet)
	api.HandleFunc("/tasks/{id}", taskHandler.UpdateTask).Methods(http.MethodPut)
	api.HandleFunc("/tasks/{id}", taskHandler.DeleteTask).Methods(http.MethodDelete)

	headersOK := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization", "Accept"})
	originsOK := handlers.AllowedOrigins([]string{"http://localhost:5173", "http://localhost"}) // Permits React and Nginx
	methodsOK := handlers.AllowedMethods([]string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete, http.MethodOptions})

	corsRouter := handlers.CORS(originsOK, headersOK, methodsOK)(router)

	port := ":8080"
	log.Printf("Servidor Go rodando na porta %s", port)

	if err := http.ListenAndServe(port, corsRouter); err != nil {
		log.Fatalf("Erro ao iniciar o servidor: %v", err)
	}
}
