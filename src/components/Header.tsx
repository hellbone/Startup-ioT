import React, { useEffect, useState } from "react";
import { Cpu, TrendingUp, DollarSign, Award, Clock } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  activeContractsValue: number;
  saasClientCount: number;
  contentLeadsValue: number;
}

export default function Header({ 
  activeSection, 
  setActiveSection, 
  activeContractsValue, 
  saasClientCount, 
  contentLeadsValue 
}: HeaderProps) {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const serviceGoalPercent = Math.min(100, (activeContractsValue / 4000) * 100);
  const saasGoalPercent = Math.min(100, (saasClientCount / 100) * 100);

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 py-4 px-6 shadow-md transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo/Brando */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/10 text-blue-400 p-2.5 rounded-xl border border-blue-500/20 shadow-lg shadow-blue-500/5 animate-pulse">
            <Cpu size={24} className="stroke-[2]" />
          </div>
          <div>
            <h1 className="font-display text-sm md:text-lg font-bold text-white tracking-tight flex flex-wrap items-center gap-2">
              @mnésia_Lab's APPs & Force Safe ioT Mobile Security
              <span className="text-[9px] uppercase tracking-widest bg-emerald-500/10 text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20">
                Micro-Incubadora
              </span>
            </h1>
            <p className="text-xs text-slate-400">Poder de execução técnica gerando ativos de alto fluxo</p>
          </div>
        </div>

        {/* Real-time Goals tracker bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Pillar 1 Meter */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2 flex flex-col min-w-[140px]">
            <div className="flex justify-between text-slate-400 mb-1 font-medium">
              <span>Pilar 1: Serviços</span>
              <span className="text-blue-400 font-bold">{serviceGoalPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${serviceGoalPercent}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1">
              R$ {activeContractsValue.toLocaleString("pt-BR")}/mês (Meta R$ 4k)
            </span>
          </div>

          {/* Pillar 2 Meter */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-2 flex flex-col min-w-[140px]">
            <div className="flex justify-between text-slate-400 mb-1 font-medium">
              <span>Pilar 2: SaaS IoT</span>
              <span className="text-emerald-400 font-bold">{saasGoalPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${saasGoalPercent}%` }}
              ></div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1">
              {saasClientCount} de 100 Assinantes
            </span>
          </div>

          {/* Time and Info */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-950/60 border border-slate-800 rounded-lg p-2 text-slate-300">
            <Clock size={14} className="text-slate-400" />
            <span className="font-mono">{timeStr || "Carregando..."}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation tabs */}
      <div className="max-w-7xl mx-auto mt-4 flex border-t border-slate-800/60 pt-3 overflow-x-auto gap-2 scrollbar-none">
        <button
          onClick={() => setActiveSection("dashboard")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeSection === "dashboard"
              ? "bg-slate-800 text-white shadow-inner border border-slate-700"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setActiveSection("strategy")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeSection === "strategy"
              ? "bg-rose-600/10 text-rose-400 border border-rose-500/20 shadow-sm"
              : "text-slate-400 hover:text-rose-400 hover:bg-slate-800/30"
          }`}
        >
          Plano Detalhado
        </button>
        <button
          onClick={() => setActiveSection("services")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeSection === "services"
              ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm"
              : "text-slate-400 hover:text-blue-400 hover:bg-slate-800/30"
          }`}
        >
          Pilar 1: Portfólio & Serviços
        </button>
        <button
          onClick={() => setActiveSection("saas")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeSection === "saas"
              ? "bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 shadow-sm"
              : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800/30"
          }`}
        >
          Pilar 2: MVP SaaS IoT & IA
        </button>
        <button
          onClick={() => setActiveSection("content")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeSection === "content"
              ? "bg-purple-600/10 text-purple-400 border border-purple-500/20 shadow-sm"
              : "text-slate-400 hover:text-purple-400 hover:bg-slate-800/30"
          }`}
        >
          Pilar 3: Roteiros & Vídeos
        </button>
        <button
          onClick={() => setActiveSection("roadmap")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeSection === "roadmap"
              ? "bg-amber-600/10 text-amber-400 border border-amber-500/20 shadow-sm"
              : "text-slate-400 hover:text-amber-400 hover:bg-slate-800/30"
          }`}
        >
          Plano 90 Dias
        </button>
      </div>
    </header>
  );
}
