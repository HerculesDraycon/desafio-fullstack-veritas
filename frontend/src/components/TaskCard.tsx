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
      className="bg-white rounded-xl shadow p-4 border-l-8 border-blue-500 hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex justify-between">
        <h3 className="font-bold">{task.title}</h3>

        <span
          className={`text-xs text-white px-2 py-1 rounded-full ${priorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="mt-2 text-gray-600">
        {task.description}
      </p>

      <div className="mt-3 text-sm text-gray-500">
        📅 {task.deadline}
      </div>
    </div>
  );
}