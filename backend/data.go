package main

import (
	"errors"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/google/uuid"
)

// The Mutex is used to isolate operations in shared memory
type TaskDataBase struct {
	tasks map[string]*Task
	mutex sync.RWMutex
}

func NewTaskRepository() *TaskDataBase {
	return &TaskDataBase{
		tasks: make(map[string]*Task),
	}
}

type TaskData interface {
	CreateTask(title string, description string, priority string, deadline time.Time) (*Task, error)
	GetTask(id string) (*Task, error)
	GetAllTasks(filterPriority string, sortOrder string, searchTask string) ([]*Task, error)
	UpdateTask(id string, payload UpdateTaskPayload) (*Task, error)
	DeleteTask(id string) error
}

func (s *TaskDataBase) CreateTask(
	title string,
	description string,
	priority string,
	deadline time.Time,
) (*Task, error) {

	s.mutex.Lock()
	defer s.mutex.Unlock()

	if priority == "" {
		priority = "Media"
	}

	now := time.Now()

	newTask := &Task{
		ID:          uuid.New().String(),
		Title:       title,
		Description: description,
		Priority:    priority,
		Deadline:    deadline,
		Status:      "todo", //Valor default para status
		CreatedAt:   now,
		UpdatedAt:   now,
	}

	s.tasks[newTask.ID] = newTask

	return newTask, nil
}

func (s *TaskDataBase) GetTask(id string) (*Task, error) {

	s.mutex.RLock()
	defer s.mutex.RUnlock()

	task, exists := s.tasks[id]

	if !exists {
		return nil, errors.New("This task was not found.")
	}

	return task, nil
}

func (s *TaskDataBase) GetAllTasks(searchTask string, sortOrder string, filter string) ([]*Task, error) {

	s.mutex.RLock()
	defer s.mutex.RUnlock()

	allTasks := make([]*Task, 0, len(s.tasks))

	// Map to list
	for _, task := range s.tasks {
		allTasks = append(allTasks, task)
	}

	if searchTask != "" {
		searchedTasks := make([]*Task, 0)
		lowerCase := strings.ToLower(searchTask)
		for _, task := range allTasks {
			if strings.Contains(strings.ToLower(task.Title), lowerCase) {
				searchedTasks = append(searchedTasks, task)
			}
		}
		allTasks = searchedTasks
	}

	if filter != "" {
		orderedTasks := make([]*Task, 0)
		for _, task := range allTasks {
			if task.Priority == filter {
				orderedTasks = append(orderedTasks, task)
			}
		}
		allTasks = orderedTasks
	}

	priorities := map[string]int{"Alta": 3, "Média": 2, "Baixa": 1}

	if sortOrder == "priority_grw" {
		sort.Slice(allTasks, func(l, r int) bool {
			return priorities[allTasks[l].Priority] > priorities[allTasks[r].Priority]
		})
	} else if sortOrder == "priority_dec" {
		sort.Slice(allTasks, func(l, r int) bool {
			return priorities[allTasks[l].Priority] < priorities[allTasks[r].Priority]
		})
	} else {
		sort.Slice(allTasks, func(l, r int) bool {
			return allTasks[l].CreatedAt.Before(allTasks[r].CreatedAt)
		})
	}

	return allTasks, nil
}

func (s *TaskDataBase) UpdateTask(id string, payload UpdateTaskPayload) (*Task, error) {

	s.mutex.Lock()
	defer s.mutex.Unlock()

	task, exists := s.tasks[id]

	if !exists {
		return nil, errors.New("This task was not found.")
	}

	if payload.Title != nil {
		task.Title = *payload.Title
	}

	if payload.Description != nil {
		task.Description = *payload.Description
	}

	if payload.Priority != nil {
		task.Priority = *payload.Priority
	}
	if payload.Status != nil {
		task.Status = *payload.Status
	}
	if payload.Deadline != nil {
		if payload.Deadline.IsZero() {
			return nil, errors.New("deadline inválida")
		}

		task.Deadline = *payload.Deadline
	}
	now := time.Now()

	task.UpdatedAt = now

	return task, nil
}

func (s *TaskDataBase) DeleteTask(id string) error {

	s.mutex.Lock()
	defer s.mutex.Unlock()

	_, exists := s.tasks[id]

	if !exists {
		return errors.New("This task was not found.")
	}

	delete(s.tasks, id)

	return nil
}
