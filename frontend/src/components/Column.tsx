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
      className={`rounded-xl p-4 shadow-md transition min-h-[500px]
      ${
        isOver
          ? "bg-blue-100"
          : "bg-gray-100"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">
        {title}
      </h2>

      <div className="space-y-4">
        {tasks.length === 0 && (
          <div className="italic text-gray-400">
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