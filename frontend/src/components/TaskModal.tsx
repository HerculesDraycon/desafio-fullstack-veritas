import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import { updateTask, deleteTask } from "../services/taskService";
import type { UpdateTaskPayload } from "../types/dto/updateTaskPayload";

interface Props {
  task: Task;
  onClose: () => void;
  onUpdated?: () => void;
}

export default function TaskModal({
  task,
  onClose,
  onUpdated,
}: Props) {
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [loading, setLoading] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  async function handleSave() {
    if (!editedTask.id) return;

    try {
        setLoading(true);

        const payload: UpdateTaskPayload = {
        title: editedTask.title,
        description: editedTask.description,
        priority: editedTask.priority,
        status: editedTask.status,
        deadline: new Date(editedTask.deadline).toISOString(),
        };

        await updateTask(editedTask.id, payload);

        onUpdated?.();
        onClose();
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
    }

  async function handleDelete() {
    if (!editedTask.id) return;

    try {
      setLoading(true);

      await deleteTask(editedTask.id);

      onUpdated?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-slate-900/95 rounded-2xl shadow-2xl w-full max-w-xl p-6 md:p-8 relative border border-slate-800 text-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
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
            Editar Tarefa
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Atualize as informações, mude o status ou exclua esta tarefa.
          </p>
        </div>

        <div className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Título <span className="text-rose-400">*</span>
            </label>
            <input
              required
              minLength={3}
              className="w-full border border-slate-700/80 bg-slate-800/60 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  title: e.target.value,
                })
              }
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Descrição
            </label>
            <textarea
              rows={4}
              className="w-full border border-slate-700/80 bg-slate-800/60 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm resize-none"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  description: e.target.value,
                })
              }
            />
          </div>

          {/* Grid for Priority and Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Prioridade
              </label>
              <select
                className="w-full border border-slate-700/80 bg-slate-800/60 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm cursor-pointer"
                value={editedTask.priority}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    priority: e.target.value as Task["priority"],
                  })
                }
              >
                <option value="low" className="bg-[#192A36]">Baixa</option>
                <option value="medium" className="bg-[#192A36]">Média</option>
                <option value="high" className="bg-[#192A36]">Alta</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Status
              </label>
              <select
                className="w-full border border-slate-700/80 bg-slate-800/60 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm cursor-pointer"
                value={editedTask.status}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    status: e.target.value as Task["status"],
                  })
                }
              >
                <option value="todo" className="bg-[#192A36]">A Fazer</option>
                <option value="doing" className="bg-[#192A36]">Em Andamento</option>
                <option value="done" className="bg-[#192A36]">Concluído</option>
              </select>
            </div>
          </div>

          {/* Deadline Field */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Prazo Limite
            </label>
            <input
              required
              type="datetime-local"
              className="w-full border border-slate-700/80 bg-slate-800/60 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all text-sm [color-scheme:dark]"
              value={editedTask.deadline.substring(0, 16)}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  deadline: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Actions Delete, Save and Cancel */}
        <div className="pt-6 mt-6 border-t border-slate-800">
          {isConfirmingDelete ? (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="text-sm font-bold text-rose-300">
                    Deseja realmente excluir esta tarefa?
                  </p>
                  <p className="text-xs text-rose-400/80">
                    Esta ação é permanente e não poderá ser desfeita.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsConfirmingDelete(false)}
                  className="px-3 py-1.5 rounded-xl border border-rose-500/30 text-rose-300 font-medium text-xs hover:bg-rose-500/20 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs shadow-sm transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Excluindo..." : "Sim, Excluir"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmingDelete(true)}
                disabled={loading}
                className="w-full sm:w-auto bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-medium px-4 py-2.5 rounded-xl border border-rose-500/20 transition-colors text-sm cursor-pointer disabled:opacity-50"
              >
                Excluir Tarefa
              </button>

              <div className="flex w-full sm:w-auto gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium hover:bg-slate-800 transition-colors text-sm cursor-pointer"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#C4BD72] hover:bg-[#B3AC68] text-slate-950 font-semibold shadow-sm hover:shadow-amber-500/10 transition-all text-sm cursor-pointer border border-amber-400/30 active:scale-98 disabled:opacity-50"
                >
                  {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}