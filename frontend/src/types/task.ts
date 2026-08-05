export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "doing" | "done";
}
export type CreateTaskDTO = Omit<Task, "id">;