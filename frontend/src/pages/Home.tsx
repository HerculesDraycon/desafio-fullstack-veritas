import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import type { Task } from "../types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
      }
    }

    loadTasks();
  }, []);

  return (
    <div>
      <h1>Minhas tarefas</h1>

      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{task.priority}</p>
          <p>{task.status}</p>
        </div>
      ))}
    </div>
  );
}