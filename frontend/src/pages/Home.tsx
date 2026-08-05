import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import type { Task } from "../types/task";
import TaskModal from "../components/TaskModal";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadTasks();
  }, []);

  const todo = tasks.filter((task) => task.status === "todo");
  const doing = tasks.filter((task) => task.status === "doing");
  const done = tasks.filter((task) => task.status === "done");

  function priorityColor(priority: Task["priority"]) {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  }

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function Column({
    title,
    tasks,
  }: {
    title: string;
    tasks: Task[];
  }) {
    return (
      <div className="bg-gray-100 rounded-xl p-4 shadow-md flex flex-col">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <div className="space-y-4">
          {tasks.length === 0 && (
            <div className="text-gray-400 italic">
              Nenhuma tarefa
            </div>
          )}

          {tasks.map((task) => (
            <div onClick={() => setSelectedTask(task)}
              key={task.id}
              className="bg-white rounded-xl shadow p-4 border-l-8 border-blue-500 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">
                  {task.title}
                </h3>

                <span
                  className={`text-white text-xs px-2 py-1 rounded-full ${priorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>

              <p className="text-gray-600 mt-2">
                {task.description}
              </p>

              <div className="mt-4 text-sm text-gray-500">
                📅 {task.deadline}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Kanban
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column title="📌 A Fazer" tasks={todo} />

        <Column title="🚀 Em Andamento" tasks={doing} />

        <Column title="✅ Concluído" tasks={done} />
      </div>
      {selectedTask && (
      <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
      />
  )}
    </div>
    
  );
}