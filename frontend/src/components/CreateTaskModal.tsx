import { useState } from "react";
import { createTask } from "../services/taskService";
import type { CreateTaskDTO } from "../types/task";
import type { Task } from "../types/task";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateTaskModal({
  onClose,
  onCreated,
}: Props) {
const [task, setTask] = useState<CreateTaskDTO>({
  title: "",
  description: "",
  deadline: "",
  priority: "medium",
  status: "todo",
});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      ...task,
      deadline: `${task.deadline}:00-03:00`,
    };

    console.log(payload)
    await createTask(payload);
    onCreated();
  }

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex justify-center items-center p-4 z-50">
      <div className="bg-slate-900/95 rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-lg relative border border-slate-800 text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors p-1.5 rounded-xl hover:bg-slate-800/80 cursor-pointer"
          type="button"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Criar Nova Task
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Preencha as informações para adicionar a tarefa ao board.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Título <span className="text-rose-400">*</span>
            </label>
            <input
              required
              minLength={3}
              className="w-full border border-slate-700/80 bg-slate-800/60 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm"
              placeholder="Ex: Elaboração de petição inicial"
              value={task.title}
              onChange={(e) =>
                setTask({ ...task, title: e.target.value })
              }
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Descrição
            </label>
            <textarea
              rows={3}
              className="w-full border border-slate-700/80 bg-slate-800/60 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm resize-none"
              placeholder="Detalhes sobre os requisitos ou passos dessa tarefa..."
              value={task.description}
              onChange={(e) =>
                setTask({
                  ...task,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Deadline Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Prazo Limite
              </label>
              <input
                required
                type="datetime-local"
                className="w-full border border-slate-700/80 bg-slate-800/60 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm [color-scheme:dark]"
                value={task.deadline}
                onChange={(e) =>
                  setTask({
                    ...task,
                    deadline: e.target.value,
                  })
                }
              />
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Prioridade
              </label>
              <select
                className="w-full border border-slate-700/80 bg-slate-800/60 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm cursor-pointer"
                value={task.priority}
                onChange={(e) =>
                  setTask({
                    ...task,
                    priority: e.target.value as Task["priority"],
                  })
                }
              >
                <option value="low" className="bg-[#192A36]">Baixa</option>
                <option value="medium" className="bg-[#192A36]">Média</option>
                <option value="high" className="bg-[#192A36]">Alta</option>
              </select>
            </div>

          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors text-sm cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#C4BD72] hover:bg-[#B3AC68] text-slate-950 font-semibold shadow-sm hover:shadow-amber-500/10 transition-all text-sm cursor-pointer border border-amber-400/30 active:scale-98"
            >
              Criar Task
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}