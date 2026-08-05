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

        console.log("Payload enviado:", payload);

        await updateTask(editedTask.id, payload);

        onUpdated?.();
        onClose();
    } catch (err) {
        console.error(err);
        alert("Erro ao atualizar tarefa.");
    } finally {
        setLoading(false);
    }
    }

  async function handleDelete() {
    if (!editedTask.id) return;

    if (!confirm("Deseja realmente excluir esta tarefa?"))
      return;

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
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            Editar tarefa
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">

          <div>
            <label className="font-semibold block mb-2">
              Título
            </label>

            <input
              className="w-full border rounded-lg p-3"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Descrição
            </label>

            <textarea
              rows={5}
              className="w-full border rounded-lg p-3 resize-none"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({
                  ...editedTask,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-5">

            <div>
              <label className="font-semibold block mb-2">
                Prioridade
              </label>

              <select
                className="w-full border rounded-lg p-3"
                value={editedTask.priority}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    priority: e.target
                      .value as Task["priority"],
                  })
                }
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-2">
                Status
              </label>

              <select
                className="w-full border rounded-lg p-3"
                value={editedTask.status}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    status: e.target.value as Task["status"],
                  })
                }
              >
                <option value="todo">A Fazer</option>
                <option value="doing">Em andamento</option>
                <option value="done">Concluído</option>
              </select>
            </div>

          </div>

          <div>
            <label className="font-semibold block mb-2">
              Prazo
            </label>

            <input
              type="datetime-local"
              className="w-full border rounded-lg p-3"
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

        <div className="flex justify-between mt-10">

          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
          >
            Excluir
          </button>

          <div className="space-x-3">

            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-lg"
            >
              Cancelar
            </button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              {loading ? "Salvando..." : "Salvar"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}