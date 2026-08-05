export interface Task {
  id?: string;
  title: string;
  description: string;
  deadline: string;
  priority: "Baixa" | "Média" | "Alta";
  status: "A Fazer" | "Em Andamento" | "Concluído";
}