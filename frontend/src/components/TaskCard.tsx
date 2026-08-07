import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "../types/task";

interface Props {
  task: Task;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityLabels: Record<Task["priority"], string> = {
    low: "Baixa Prioridade",
    medium: "Média Prioridade",
    high: "Alta Prioridade",
  };

  const formatted = new Date(task.deadline).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className="group bg-slate-800/90 hover:bg-slate-800 rounded-xl p-4 border border-slate-700/70 hover:border-slate-600 shadow-md hover:shadow-xl transition-all cursor-pointer active:scale-[0.99] select-none"
    >
      {/* Header do Card */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-100 text-sm line-clamp-1 group-hover:text-white transition-colors">
          {task.title}
        </h3>

        <span
          className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md border shrink-0 ${priorityColor(
            task.priority
          )}`}
        >
          {priorityLabels[task.priority] || task.priority}
        </span>
      </div>

      {/* Descrição */}
      {task.description && (
        <p className="mt-2 text-slate-400 text-xs line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Footer com Prazo */}
      {formatted && (
        <div className="mt-3.5 pt-2.5 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
          <span className="text-slate-500 font-medium">Prazo:</span>
          <span className="font-medium text-slate-300">{formatted}</span>
        </div>
      )}
    </div>
  );
}