import React, { useState } from "react";
import { 
  DollarSign, 
  Briefcase, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  Calculator,
  UserPlus,
  Send
} from "lucide-react";
import { ClientContract } from "../types";

interface PillarServicesProps {
  contracts: ClientContract[];
  setContracts: React.Dispatch<React.SetStateAction<ClientContract[]>>;
}

export default function PillarServices({ contracts, setContracts }: PillarServicesProps) {
  // Local state for adding client
  const [clientName, setClientName] = useState("");
  const [serviceType, setServiceType] = useState<ClientContract["serviceType"]>("Desenvolvimento");
  const [monthlyValue, setMonthlyValue] = useState(2000);
  const [description, setDescription] = useState("");

  // Rate calculator tool
  const [hourlyRate, setHourlyRate] = useState(120);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);

  const handleAddContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    const newContract: ClientContract = {
      id: Math.random().toString(36).substr(2, 9),
      clientName: clientName.trim(),
      serviceType,
      monthlyValue,
      status: "ativo",
      startDate: new Date().toLocaleDateString("pt-BR"),
      description: description.trim() || `Prestação de serviços corporativos em software e ${serviceType.toLowerCase()}`
    };

    setContracts((prev) => [...prev, newContract]);
    // Reset fields
    setClientName("");
    setDescription("");
  };

  const handleDeleteContract = (id: string) => {
    setContracts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setContracts((prev) => prev.map((c) => {
      if (c.id === id) {
        const nextStatus: ClientContract["status"] = 
          c.status === "prosp" ? "negoc" : 
          c.status === "negoc" ? "ativo" : 
          c.status === "ativo" ? "concluido" : "prosp";
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const activeValue = contracts
    .filter((c) => c.status === "ativo")
    .reduce((acc, curr) => acc + curr.monthlyValue, 0);

  const overallValue = contracts.reduce((acc, curr) => acc + curr.monthlyValue, 0);

  return (
    <div className="space-y-6">
      {/* Title block */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-blue-500 font-bold text-7xl select-none uppercase font-display pointer-events-none">
          Pilar 1
        </div>
        <div className="relative z-10">
          <span className="text-xs font-semibold bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">
            Faturamento Imediato
          </span>
          <h2 className="font-display text-2xl font-bold text-white mt-3">Pilar 1: Prestação de Serviços sob Demanda</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            O objetivo deste pilar é atingir o faturamento mínimo nos <strong className="text-white">primeiros 30 dias</strong> para financiar os demais projetos (SaaS & Hardware). A meta inicial sugerida é fechar <strong className="text-white">2 contratos recorrentes de R$ 2.000/mês</strong>.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl border border-emerald-500/20">
            <DollarSign size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Caixa Mensal Ativo</span>
            <p className="text-2xl font-bold text-white font-mono">
              R$ {activeValue.toLocaleString("pt-BR")},00
            </p>
            <p className="text-[10px] text-slate-400">
              {activeValue >= 4000 
                ? "🎉 Meta de faturamento atingida!" 
                : `Falta R$ ${(4000 - activeValue).toLocaleString("pt-BR")},00 para a meta`}
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-blue-500/10 text-blue-400 p-3 rounded-xl border border-blue-500/20">
            <Briefcase size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Clientes Ativos</span>
            <p className="text-2xl font-bold text-white font-mono">
              {contracts.filter(c => c.status === "ativo").length} contratos
            </p>
            <p className="text-[10px] text-slate-400">Pipeline total: {contracts.length} contatos</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-purple-500/10 text-purple-400 p-3 rounded-xl border border-purple-500/20">
            <Sparkles size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Meta de Runway</span>
            <p className="text-2xl font-bold text-white font-mono">R$ 4.000 / mês</p>
            <p className="text-[10px] text-slate-400">Focado em fechar 2 contratos corporativos de R$ 2k</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Core Contracts Pipeline Table */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display font-bold text-white text-md flex items-center gap-2">
              <Briefcase size={18} className="text-blue-400" />
              Painel de Contratos e Pipeline
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Total pipeline: R$ {overallValue.toLocaleString("pt-BR")},00
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4 rounded-tl-xl">Cliente</th>
                  <th className="py-3 px-4">Especialidade / Serviço</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Preço Recorrente</th>
                  <th className="py-3 px-4 text-right rounded-tr-xl">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-805/40">
                {contracts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      Nenhum contrato cadastrado. Adicione um cliente para simular!
                    </td>
                  </tr>
                ) : (
                  contracts.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-800/10 group transition-all">
                      <td className="py-4 px-4 font-semibold text-white">
                        {c.clientName}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="text-slate-200">{c.serviceType}</span>
                          <span className="text-[10px] text-slate-500 max-w-xs truncate">{c.description}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleStatus(c.id)}
                          className={`px-2 py-1 text-[10px] font-semibold rounded-full border cursor-pointer select-none transition-all ${
                            c.status === "ativo" 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : c.status === "negoc"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                              : c.status === "prosp"
                              ? "bg-slate-800 text-slate-400 border-slate-700"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          }`}
                        >
                          {c.status === "ativo" ? "Ativo" : c.status === "negoc" ? "Em Negociação" : c.status === "prosp" ? "Prospecção" : "Concluído"}
                        </button>
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-slate-300">
                        R$ {c.monthlyValue.toLocaleString("pt-BR")}/mês
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleDeleteContract(c.id)}
                          className="text-slate-500 hover:text-red-400 p-1 rounded-md hover:bg-slate-800 transition-all cursor-pointer"
                          title="Remover Contrato"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form to Add Client / Simulator */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="font-display font-bold text-white text-md mb-4 flex items-center gap-2">
              <UserPlus size={18} className="text-blue-400" />
              Adicionar Novo Cliente
            </h3>

            <form onSubmit={handleAddContract} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Nome da Empresa/Cliente</label>
                <input
                  type="text"
                  placeholder="Ex: AutoPeças São José"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Tipo de Solução/Serviço</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ClientContract["serviceType"])}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                >
                  <option value="Desenvolvimento">Desenvolvimento sob demanda</option>
                  <option value="Mobile App">Aplicativos Mobile (Flutter/React Native)</option>
                  <option value="Integração">Dashboard / Integração corporativa</option>
                  <option value="IoT">Projetos IoT (ESP32/Arduino/Hardware)</option>
                  <option value="Automação IA">Automações com Inteligência Artificial</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1 flex justify-between">
                  <span>Valor mensal do contrato</span>
                  <span className="text-blue-400 font-bold font-mono">R$ {monthlyValue.toLocaleString("pt-BR")}</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="8000"
                  step="250"
                  value={monthlyValue}
                  onChange={(e) => setMonthlyValue(Number(e.target.value))}
                  className="w-full accent-blue-500 bg-slate-850 h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>R$ 500,00</span>
                  <span>R$ 2.000,00 (Recomendado)</span>
                  <span>R$ 8.000,00</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Breve descrição do projeto</label>
                <textarea
                  placeholder="Ex: Integração de CRM e automatização de check-in de mecânicos."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white h-16 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-600/15"
              >
                <Plus size={16} />
                Adicionar no Pipeline
              </button>
            </form>
          </div>

          {/* Interactive Calculator for hourly work */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="font-display font-bold text-white text-md mb-4 flex items-center gap-2">
              <Calculator size={18} className="text-emerald-400" />
              Calculadora de Hora Técnica
            </h3>
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Valor da Hora (R$)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Horas p/ Semana</label>
                  <input
                    type="number"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-mono text-center"
                  />
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 flex flex-col justify-center items-center">
                <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">Faturamento Estimado</span>
                <p className="text-2xl font-bold text-emerald-400 font-mono mt-1">
                  R$ {(hourlyRate * hoursPerWeek * 4).toLocaleString("pt-BR")},00 /mês
                </p>
                <span className="text-[10px] text-slate-500 mt-1">
                  Estimado para 4 semanas ({(hourlyRate * hoursPerWeek)} h/mês)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
