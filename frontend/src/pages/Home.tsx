import { useCallback, useEffect, useState } from "react";
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
import CreateTaskModal from "../components/CreateTaskModal";
import Header from "../components/Header";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Configura o sensor para exigir um movimento mínimo de 8px antes de ativar o drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const loadTasks = useCallback(async () => {
    try {
      const data = await getTasks({
        searchTask: search,
        filter: priority,
        sortOrder,
      });

      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  }, [search, priority, sortOrder]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

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
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <Header
        search={search}
        onSearchChange={setSearch}
        
        priority={priority}
        onPriorityChange={setPriority}

        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Cabeçalho */}
          <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Kanban
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Gerencie suas tarefas e acompanhe o progresso
              </p>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="text-lg font-bold">+</span>
              <span>Nova Task</span>
            </button>
          </div>

          {/* Kanban */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <Column
                id="todo"
                title="A Fazer"
                tasks={todo}
                onTaskClick={setSelectedTask}
              />

              <Column
                id="doing"
                title="Em Andamento"
                tasks={doing}
                onTaskClick={setSelectedTask}
              />

              <Column
                id="done"
                title="Concluído"
                tasks={done}
                onTaskClick={setSelectedTask}
              />
            </div>
          </DndContext>

          {/* Modais */}
          {selectedTask && (
            <TaskModal
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
              onUpdated={loadTasks}
            />
          )}

          {isCreateModalOpen && (
            <CreateTaskModal
              onClose={() => setIsCreateModalOpen(false)}
              onCreated={() => {
                loadTasks();
                setIsCreateModalOpen(false);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}