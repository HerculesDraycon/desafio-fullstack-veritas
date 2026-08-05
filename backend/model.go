package main

import (
	"time"
)

type Task struct {
	ID          string    `json:"id"`
	Title       string    `json:"title" validate:"required,min=3"` // The title is mandatory and must have at least 3 characters.
	Description string    `json:"description,omitempty"`           // If no description, it can be ignored by JSON
	Priority    string    `json:"priority,omitempty" validate:"omitempty,oneof='Alta' 'Média' 'Baixa'"`
	Deadline    time.Time `json:"deadline"`
	Status      string    `json:"status,omitempty" validate:"omitempty,oneof='A Fazer' 'Em Progresso' 'Concluídas'"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

// DTO for Create (POST) route.
type CreateTaskPayload struct {
	Title       string    `json:"title" validate:"required,min=3"`
	Description string    `json:"description,omitempty"`
	Priority    string    `json:"priority,omitempty" validate:"omitempty,oneof='Alta' 'Média' 'Baixa'"`
	Deadline    time.Time `json:"deadline"`
	Status      string    `json:"status,omitempty" validate:"omitempty,oneof='A Fazer' 'Em Progresso' 'Concluídas'"`
}

// DTO for UPDATE (PUT/PATCH) route.
type UpdateTaskPayload struct {
	Title       *string    `json:"title,omitempty" validate:"omitempty,min=3"`
	Description *string    `json:"description,omitempty"`
	Priority    *string    `json:"priority,omitempty" validate:"omitempty,oneof='Alta' 'Média' 'Baixa'"`
	Deadline    *time.Time `json:"deadline"`
	Status      *string    `json:"status,omitempty" validate:"omitempty,oneof='A Fazer' 'Em Progresso' 'Concluídas'"`
}
