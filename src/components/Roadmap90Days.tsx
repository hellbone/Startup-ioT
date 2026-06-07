import React from "react";
import { 
  Calendar, 
  CheckSquare, 
  Square, 
  ChevronRight, 
  Flag, 
  Settings, 
  LineChart, 
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  Cpu
} from "lucide-react";
import { RoadmapTask } from "../types";

interface Roadmap90DaysProps {
  tasks: RoadmapTask[];
  setTasks: React.Dispatch<React.SetStateAction<RoadmapTask[]>>;
}

export default function Roadmap90Days({ tasks, setTasks }: Roadmap90DaysProps) {
  
  const handleToggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  // Filter tasks per month
  const m1Tasks = tasks.filter(t => t.month === 1);
  const m2Tasks = tasks.filter(t => t.month === 2);
  const m3Tasks = tasks.filter(t => t.month === 3);

  return (
    <div className="space-y-6">
      {/* Title block */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-amber-500 font-bold text-7xl select-none uppercase font-display pointer-events-none">
          90 Dias
        </div>
        <div className="relative z-10">
          <span className="text-xs font-semibold bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-500/20">
            Foco Prático e Execução Rápida
          </span>
          <h2 className="font-display text-2xl font-bold text-white mt-3">Plano de Execução Técnica dos Primeiros 90 Dias</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            Siga o plano de execução sequencial para criar as fundações da sua micro-incubadora. O objetivo inicial é alcançar entre <strong className="text-white">R$ 10.000 e R$ 20.000/mês</strong> de faturamento em recorrência.
          </p>
        </div>
      </div>

      {/* Progress status overall */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-slate-400 text-xs uppercase font-bold tracking-wider">Progresso de Lançamento</span>
            <p className="text-xl font-bold text-white mt-0.5">Execução das Metas Principais</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-mono font-bold text-amber-400">{progressPercent.toFixed(0)}%</span>
            <div className="w-48 bg-slate-950 h-3 border border-slate-850 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-xs text-slate-500 font-semibold">({completedCount} de {tasks.length} concluídas)</span>
          </div>
        </div>

        {/* What to avoid alert warning inside */}
        <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl p-4 flex gap-3 text-xs leading-relaxed text-slate-300">
          <ShieldAlert size={20} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white">O que Evitar Absolutamente:</strong> Não inicie 5 ou 6 produtos simultaneamente tentando criar layouts complexos sem faturamento. Evite dropshipping competitivo de baixa margem em 2026. <strong className="text-amber-400">Escolha um único MVP e execute-o até o fim</strong>.
          </div>
        </div>
      </div>

      {/* Months Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* MÊS 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono">Fase de Lançamento</span>
                <h3 className="font-display font-bold text-white text-md flex items-center gap-1.5 mt-0.5">
                  <Calendar size={16} className="text-blue-400" />
                  Mês 1
                </h3>
              </div>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 font-semibold px-2 py-0.5 rounded-md border border-blue-500/20">
                Foco: Caixa
              </span>
            </div>
            <p className="text-slate-400 text-xs mb-4 leading-relaxed">
              Criar identidade visual, estruturar o portfólio no site e encontrar o primeiro cliente de R$ 2.000 recorrentes de engenharia para cobrir gastos iniciais.
            </p>

            {/* Task list */}
            <div className="space-y-2.5">
              {m1Tasks.map((t) => (
                <div 
                  key={t.id} 
                  onClick={() => handleToggleTask(t.id)}
                  className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all cursor-pointer ${
                    t.completed 
                      ? "bg-blue-950/10 border-blue-500/30 text-slate-400 line-through opacity-75"
                      : "bg-slate-950/70 border-slate-850 hover:border-slate-800 text-white"
                  }`}
                >
                  <button className="shrink-0 text-blue-400 mt-0.5 p-0 bg-transparent border-0 cursor-pointer">
                    {t.completed ? <CheckSquare size={15} /> : <Square size={15} />}
                  </button>
                  <div className="text-xs">
                    <p className={`font-semibold ${t.completed ? "text-slate-500" : "text-slate-200"}`}>{t.title}</p>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-850 flex justify-between items-center text-[10px] text-slate-500 font-medium">
            <span>Serviços / Implantação</span>
            <span className="flex items-center gap-1 text-slate-400">Ir para o Mês 2 <ArrowRight size={10} /></span>
          </div>
        </div>

        {/* MÊS 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-3">
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest font-mono">Desenvolvimento MVP</span>
                <h3 className="font-display font-bold text-white text-md flex items-center gap-1.5 mt-0.5">
                  <Calendar size={16} className="text-purple-400" />
                  Mês 2
                </h3>
              </div>
              <span className="text-[10px] bg-purple-500/10 text-purple-400 font-semibold px-2 py-0.5 rounded-md border border-purple-500/20">
                Foco: Conteúdo
              </span>
            </div>
            <p className="text-slate-400 text-xs mb-4 leading-relaxed">
              Desenvolver o MVP do SaaS conectado à ESP32, publicar vídeos virais em canais digitais diariamente e automatizar prospecção empresarial de campo.
            </p>

            {/* Task list */}
            <div className="space-y-2.5">
              {m2Tasks.map((t) => (
                <div 
                  key={t.id} 
                  onClick={() => handleToggleTask(t.id)}
                  className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all cursor-pointer ${
                    t.completed 
                      ? "bg-purple-950/10 border-purple-500/30 text-slate-400 line-through opacity-75"
                      : "bg-slate-950/70 border-slate-850 hover:border-slate-800 text-white"
                  }`}
                >
                  <button className="shrink-0 text-purple-400 mt-0.5 p-0 bg-transparent border-0 cursor-pointer">
                    {t.completed ? <CheckSquare size={15} /> : <Square size={15} />}
                  </button>
                  <div className="text-xs">
                    <p className={`font-semibold ${t.completed ? "text-slate-500" : "text-slate-200"}`}>{t.title}</p>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-850 flex justify-between items-center text-[10px] text-slate-500 font-medium">
            <span>Audiência / Produção</span>
            <span className="flex items-center gap-1 text-slate-400">Ir para o Mês 3 <ArrowRight size={10} /></span>
          </div>
        </div>

        {/* MÊS 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">Lançamento Beta</span>
                <h3 className="font-display font-bold text-white text-md flex items-center gap-1.5 mt-0.5">
                  <Calendar size={16} className="text-emerald-400" />
                  Mês 3
                </h3>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-semibold px-2 py-0.5 rounded-md border border-emerald-500/20">
                Foco: Clientes
              </span>
            </div>
            <p className="text-slate-400 text-xs mb-4 leading-relaxed">
              Liberar o SaaS IoT em escala beta restrita, adquirir os primeiros de muitos usuários ativos pagantes e ajustar feedback do hardware/software.
            </p>

            {/* Task list */}
            <div className="space-y-2.5">
              {m3Tasks.map((t) => (
                <div 
                  key={t.id} 
                  onClick={() => handleToggleTask(t.id)}
                  className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all cursor-pointer ${
                    t.completed 
                      ? "bg-emerald-950/10 border-emerald-500/30 text-slate-400 line-through opacity-75"
                      : "bg-slate-950/70 border-slate-850 hover:border-slate-800 text-white"
                  }`}
                >
                  <button className="shrink-0 text-emerald-400 mt-0.5 p-0 bg-transparent border-0 cursor-pointer">
                    {t.completed ? <CheckSquare size={15} /> : <Square size={15} />}
                  </button>
                  <div className="text-xs">
                    <p className={`font-semibold ${t.completed ? "text-slate-500" : "text-slate-200"}`}>{t.title}</p>
                    <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-850 flex justify-between items-center text-[10px] text-slate-500 font-medium">
            <span>SaaS Beta / Ajustes de Escala</span>
            <span className="text-emerald-400 font-bold">Lançar MVP 🚀</span>
          </div>
        </div>

      </div>

      {/* Corporate growth path footer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border border-amber-505/20 text-amber-400 p-2.5 rounded-xl">
            <TrendingUp size={20} />
          </div>
          <div>
            <h4 className="text-white font-bold text-xs">Visão de Longo Prazo</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Alcançado o faturamento recorrente, formalize uma incubadora mais robusta (Simples Nacional) e licencie software IoT/IA customizável para outros setores industriais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
