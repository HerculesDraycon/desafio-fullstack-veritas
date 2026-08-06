import { Search, Bell, User } from "lucide-react";
import logo from "../assets/img/veritaslaw_logo.jpg";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function Header({
  search,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-xs sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
            <div className="flex items-center justify-between gap-4">

            {/* Logo + Marca */}
            <div className="flex items-center gap-3 shrink-0">
                <img
                src={logo}
                alt="Logo Veritas Law"
                className="h-10 w-10 object-contain rounded-lg"
                />

                <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-none">
                    Veritas Law
                </h1>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
                    Gestão Jurídica
                </span>
                </div>
            </div>

            {/* Barra de Pesquisa (Desktop) */}
            <div className="hidden md:block relative w-full max-w-md mx-4">
                <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />

                <input
                type="text"
                placeholder="Pesquisar tarefas, processos ou palavras-chave..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
            </div>

            {/* Ações / Perfil */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {/* Botão Notificação */}
                <button
                type="button"
                aria-label="Notificações"
                className="relative rounded-xl p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                <Bell size={20} />
                {/* Indicador de novidades */}
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
                </button>

                {/* Divisor Visual */}
                <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block" />

                {/* Perfil do Usuário */}
                <button
                type="button"
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group"
                >
                <div className="rounded-lg bg-slate-100 p-2 text-slate-700 group-hover:bg-slate-200 transition-colors border border-slate-200">
                    <User size={18} />
                </div>
                <span className="text-sm font-semibold text-slate-700 hidden lg:inline-block">
                    Minha Conta
                </span>
                </button>
            </div>

            </div>

            {/* Barra de Pesquisa Mobile (Aparece apenas abaixo de 'md') */}
            <div className="mt-3 block md:hidden relative w-full">
            <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

            <input
                type="text"
                placeholder="Pesquisar..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
            </div>
        </div>
        </header>
  );
}