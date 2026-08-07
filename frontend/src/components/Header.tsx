import { Search, Bell, User } from "lucide-react";
import logo from "../assets/img/veritaslaw_logo.jpg";

interface HeaderProps {
  search: string;
  onSearchChange: (value: string) => void;

  priority: string;
  onPriorityChange: (value: string) => void;

  sortOrder: string;
  onSortOrderChange: (value: string) => void;
}

export default function Header({
  search,
  onSearchChange,
  priority,
  onPriorityChange,
  sortOrder,
  onSortOrderChange,
}: HeaderProps) {
  return (
    <header className="w-full bg-[#192A36] border-b border-slate-700/60 shadow-md sticky top-0 z-40 text-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">

            {/* Logo and Brand */}
            <div className="flex items-center gap-3 shrink-0">
            <img
                src={logo}
                alt="Logo Veritas Law"
                className="h-10 w-10 object-contain rounded-lg"
            />

            <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none">
                Veritas Law
                </h1>
                <span className="text-xs text-slate-300/80 font-medium hidden sm:inline-block">
                Da Constituição ao M&A
                </span>
            </div>
            </div>

            {/* Search Bar & Filters */}
            <div className="hidden md:flex flex-1 items-center gap-3 mx-6">

            {/* Search */}
            <div className="relative flex-1 max-w-md">
                <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                type="text"
                placeholder="Pesquisar tarefas..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-400 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                />
            </div>

            {/* Priority */}
            <select
                value={priority}
                onChange={(e) => onPriorityChange(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
            >
                <option value="" className="bg-[#192A36]">Todas</option>
                <option value="high" className="bg-[#192A36]">Alta</option>
                <option value="medium" className="bg-[#192A36]">Média</option>
                <option value="low" className="bg-[#192A36]">Baixa</option>
            </select>

            {/* Order */}
            <select
                value={sortOrder}
                onChange={(e) => onSortOrderChange(e.target.value)}
                className="rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
            >
                <option value="" className="bg-[#192A36]">Mais antigas</option>
                <option value="priority_grw" className="bg-[#192A36]">Maior prioridade</option>
                <option value="priority_dec" className="bg-[#192A36]">Menor prioridade</option>
            </select>

            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Notifications */}
            <button
                type="button"
                aria-label="Notificações"
                className="relative rounded-xl p-2.5 text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
                <Bell size={20} />
                {/* Notification Badge */}
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-[#192A36]" />
            </button>

            {/* Divisor */}
            <div className="h-6 w-px bg-slate-700/80 mx-1 hidden sm:block" />

            {/* User Profile */}
            <button
                type="button"
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-800/60 transition-colors cursor-pointer group"
            >
                <div className="rounded-lg bg-slate-800/80 p-2 text-slate-200 group-hover:bg-slate-700/80 transition-colors border border-slate-700">
                <User size={18} />
                </div>
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white hidden lg:inline-block">
                Minha Conta
                </span>
            </button>
            </div>

        </div>

        {/* Mobile Search Bar */}
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
            className="w-full rounded-xl border border-slate-700 bg-slate-800/60 py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-400 focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
            />
        </div>
        </div>
    </header>
    );
}