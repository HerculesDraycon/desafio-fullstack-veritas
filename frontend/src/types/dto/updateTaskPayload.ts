export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  status?: "todo" | "doing" | "done";
  deadline?: string;
}