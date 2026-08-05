import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import type { DragEndEvent } from "@dnd-kit/core";

import type { Task } from "../types/task";
import { getTasks, updateTask } from "../services/taskService";

import Column from "../components/Column";
import TaskModal from "../components/TaskModal";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Configura o sensor para exigir um movimento mínimo de 8px antes de ativar o drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

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

  const todo = tasks.filter((task) => task.status === "todo");
  const doing = tasks.filter((task) => task.status === "doing");
  const done = tasks.filter((task) => task.status === "done");

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = String(active.id);

    const newStatus = over.id as Task["status"];

    const task = tasks.find((t) => t.id === taskId);

    if (!task) return;

    if (task.status === newStatus) return;

    const updatedTask = {
      ...task,
      status: newStatus,
    };

    // Atualização otimista
    setTasks((current) =>
      current.map((t) =>
        t.id === taskId ? updatedTask : t
      )
    );

    try {
      await updateTask(taskId, updatedTask);
    } catch (err) {
      console.error(err);

      // Recarrega caso dê erro
      loadTasks();
    }
  }

  return (
    <div className="min-h-screen bg-slate-200 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Kanban
      </h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Column
            id="todo"
            title="📌 A Fazer"
            tasks={todo}
            onTaskClick={setSelectedTask}
          />

          <Column
            id="doing"
            title="🚀 Em Andamento"
            tasks={doing}
            onTaskClick={setSelectedTask}
          />

          <Column
            id="done"
            title="✅ Concluído"
            tasks={done}
            onTaskClick={setSelectedTask}
          />

        </div>
      </DndContext>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdated={loadTasks}
        />
      )}
    </div>
  );
}