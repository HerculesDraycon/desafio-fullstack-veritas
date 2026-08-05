import api from "./api";
import type { Task } from "../types/task";
import type { UpdateTaskPayload } from "../types/dto/updateTaskPayload";

export async function getTasks(): Promise<Task[]> {
  const { data } = await api.get<Task[]>("/tasks");
  return data;
}

export async function createTask(task: Task): Promise<Task> {
  const { data } = await api.post<Task>("/tasks", task);
  return data;
}

export async function updateTask(
  id: string,
  payload: UpdateTaskPayload
) {
  const { data } = await api.put<Task>(`/tasks/${id}`, payload);
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  await api.delete(`/tasks/${id}`);
}