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
      deadline: `${task.deadline}T00:00:00Z`,
    };

    await createTask(payload);
    onCreated();
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-lg relative border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Botão X para fechar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          type="button"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        {/* Cabeçalho */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Criar Nova Task
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Preencha as informações para adicionar a tarefa ao board.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Campo Título */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Título <span className="text-rose-500">*</span>
            </label>
            <input
              required
              className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm"
              placeholder="Ex: Refatorar API de autenticação"
              value={task.title}
              onChange={(e) =>
                setTask({ ...task, title: e.target.value })
              }
            />
          </div>

          {/* Campo Descrição */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Descrição
            </label>
            <textarea
              rows={3}
              className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm resize-none"
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

          {/* Container em Grid para Prazo e Prioridade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Campo Prazo Limite */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                📅 Prazo Limite
              </label>
              <input
                type="date"
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm"
                value={task.deadline}
                onChange={(e) =>
                  setTask({
                    ...task,
                    deadline: e.target.value,
                  })
                }
              />
            </div>

            {/* Campo Nível de Prioridade */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                ⚡ Prioridade
              </label>
              <select
                className="w-full border border-slate-300 rounded-lg px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all text-sm bg-white cursor-pointer"
                value={task.priority}
                onChange={(e) =>
                  setTask({
                    ...task,
                    priority: e.target.value as Task["priority"],
                  })
                }
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>

          </div>

          {/* Rodapé e Ações */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors text-sm cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-all text-sm cursor-pointer"
            >
              Criar Task
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}