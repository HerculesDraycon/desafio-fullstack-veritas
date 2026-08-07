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
import { useDebounce } from "../hooks/useDebounce";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  // Sensor for 8px minimum movement
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
        searchTask: debouncedSearch,
        filter: priority,
        sortOrder,
      });

      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  }, [debouncedSearch, priority, sortOrder]);

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

    setTasks((current) =>
      current.map((t) =>
        t.id === taskId ? updatedTask : t
      )
    );

    try {
      await updateTask(taskId, updatedTask);
    } catch (err) {
      console.error(err);

      // Reload in case of error
      loadTasks();
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans antialiased">
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

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-700/60 pb-5">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Kanban
              </h1>

              <p className="text-sm text-slate-400 mt-1">
                Gerencie suas tarefas e acompanhe o progresso
              </p>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#C4BD72] hover:bg-[#B3AC68] text-slate-950 font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow-amber-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-400/30 active:scale-98 shrink-0"
            >
              <span className="text-lg font-bold leading-none">+</span>
              <span className="text-sm">Nova Task</span>
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

          {/* Modal */}
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