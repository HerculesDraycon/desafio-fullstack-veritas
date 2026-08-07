import { useDroppable } from "@dnd-kit/core";
import type { Task } from "../types/task";
import TaskCard from "./TaskCard";

interface Props {
  id: Task["status"];
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function Column({
  id,
  title,
  tasks,
  onTaskClick,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl p-4 transition-all duration-200 min-h-[500px] border ${
        isOver
          ? "bg-slate-800/90 border-amber-500/50 ring-2 ring-amber-500/20"
          : "bg-slate-900/60 border-slate-800 hover:border-slate-700/80"
      }`}
    >
      {/* Cabeçalho da Coluna */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <h2 className="text-base font-bold text-slate-200 tracking-wide">
          {title}
        </h2>

        {/* Contador de Tarefas */}
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50">
          {tasks.length}
        </span>
      </div>

      {/* Lista de Tarefas */}
      <div className="space-y-3">
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-32 rounded-xl border border-dashed border-slate-800 text-xs italic text-slate-500">
            Nenhuma tarefa
          </div>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
          />
        ))}
      </div>
    </div>
  );
}