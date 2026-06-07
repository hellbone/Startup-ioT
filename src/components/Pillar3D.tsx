import React, { useState, useEffect } from "react";
import { Project3D } from "../types";
import { 
  Plus, 
  Trash2, 
  Printer, 
  Coins, 
  TrendingUp, 
  Wrench, 
  Layers, 
  FileText, 
  Briefcase, 
  Package, 
  HelpCircle,
  TrendingDown,
  ChevronRight,
  Info
} from "lucide-react";

export default function Pillar3D() {
  const [projects, setProjects] = useState<Project3D[]>(() => {
    const cached = localStorage.getItem("rtl_projects_3d");
    if (cached) return JSON.parse(cached);
    return [
      {
        id: "p3d-1",
        projectName: "Case Estanque p/ Sensor de Solo Agrícola ESP32",
        material: "PETG Carbon",
        estimatedCost: 14.50,
        sellingPrice: 160.00,
        quantity: 5,
        clientName: "Fazenda Sol Nascente (Agronegócio)",
        status: "concluido",
        notes: "Gabinete selado contra água com parede tripla e suporte para bateria 18650."
      },
      {
        id: "p3d-2",
        projectName: "Suporte de Painel DIN p/ Placa Receptora GPS",
        material: "ASA Industrial",
        estimatedCost: 8.20,
        sellingPrice: 110.00,
        quantity: 10,
        clientName: "Logística Expressa SP",
        status: "imprimindo",
        notes: "Substituição de suporte de metal oxidado por material com alta resistência a raios UV."
      },
      {
        id: "p3d-3",
        projectName: "Engrenagem Helicoidal Sob Medida p/ Alimentador",
        material: "Nylon Injetado",
        estimatedCost: 4.80,
        sellingPrice: 95.00,
        quantity: 4,
        clientName: "Indústria Metalúrgica Ramos",
        status: "planejado",
        notes: "Peça de reposição urgente. Evitou parada de máquina que custaria R$ 5.000/dia."
      },
      {
        id: "p3d-4",
        projectName: "Gabarito de Clipe de Segurança p/ Conectores 4G",
        material: "PLA Premium",
        estimatedCost: 2.10,
        sellingPrice: 45.00,
        quantity: 20,
        clientName: "Mnesia Lab's (Consumo Interno)",
        status: "entregue",
        notes: "Clipes rápidos para montagem acelerada da equipe técnica de campo."
      }
    ];
  });

  // Form State
  const [projectName, setProjectName] = useState("");
  const [material, setMaterial] = useState("PETG");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [clientName, setClientName] = useState("");
  const [status, setStatus] = useState<Project3D["status"]>("planejado");
  const [notes, setNotes] = useState("");
  const [errorFeedback, setErrorFeedback] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");

  // Keep LocalStorage updated
  useEffect(() => {
    localStorage.setItem("rtl_projects_3d", JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim() || !material.trim()) {
      setErrorFeedback("Preencha o nome do projeto e o material do filamento.");
      return;
    }

    const costNum = parseFloat(estimatedCost) || 0;
    const priceNum = parseFloat(sellingPrice) || 0;
    const qtyNum = parseInt(quantity) || 1;

    if (costNum < 0 || priceNum < 0) {
      setErrorFeedback("Os custos e valores de venda não podem ser negativos.");
      return;
    }

    const newProj: Project3D = {
      id: "p3d-" + Date.now(),
      projectName: projectName.trim(),
      material: material.trim(),
      estimatedCost: costNum,
      sellingPrice: priceNum,
      quantity: qtyNum,
      clientName: clientName.trim() || undefined,
      status,
      notes: notes.trim() || undefined
    };

    setProjects(prev => [newProj, ...prev]);
    
    // Clear Input fields
    setProjectName("");
    setMaterial("PETG");
    setEstimatedCost("");
    setSellingPrice("");
    setQuantity("1");
    setClientName("");
    setStatus("planejado");
    setNotes("");
    setErrorFeedback("");
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Deseja realmente remover este projeto 3D?")) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleUpdateStatus = (id: string, newStatus: Project3D["status"]) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  // Metric aggregates
  const totalCostOfProjects = projects.reduce((acc, curr) => acc + (curr.estimatedCost * curr.quantity), 0);
  const totalValueExpected = projects.reduce((acc, curr) => acc + (curr.sellingPrice * curr.quantity), 0);
  const totalProfitExpected = totalValueExpected - totalCostOfProjects;
  const averageMargin = totalValueExpected > 0 ? (totalProfitExpected / totalValueExpected) * 100 : 0;

  // Filter projects
  const filteredProjects = projects.filter(p => {
    if (filterStatus === "todos") return true;
    return p.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Informative Jumbotron */}
      <div className="bg-gradient-to-br from-cyan-900/30 to-indigo-950/20 border border-cyan-500/20 p-6 rounded-2xl relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 bg-cyan-500/10 w-92 h-92 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-bold bg-cyan-500/15 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30 font-mono">
              Pilar 4: Manufatura Premium & mini-fábrica digital
            </span>
            <h2 className="font-display text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Printer className="text-cyan-400" size={24} />
              Modelagem, Prototipagem & Projetos 3D B2B
            </h2>
            <p className="text-slate-400 text-xs max-w-2xl leading-relaxed">
              O ecossistema corporativo precisa de soluções de design industrial rápidas. Use a sua impressora 3D para criar capas robustas de sensores, invólucros para o ESP32 e peças mecânicas sob demanda com alta rentabilidade (até <span className="text-emerald-400 font-bold">900%+ de ROI</span>), transformando filamento básico em faturamento corporativo nobre.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3.2 shrink-0">
            <div className="bg-cyan-500/10 text-cyan-400 w-11 h-11 rounded-xl flex items-center justify-center border border-cyan-500/20">
              <Coins size={22} className="animate-bounce" />
            </div>
            <div>
              <span className="text-[9px] text-slate-500 uppercase font-mono font-bold">Margem Média Geral</span>
              <p className="text-lg font-bold text-emerald-400 font-mono">{averageMargin.toFixed(0)}%</p>
              <p className="text-[9px] text-slate-400">Total Esperado: R$ {totalProfitExpected.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Margins Indicators Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9.5px] text-slate-500 uppercase font-bold font-mono">Custo de Produção (Filamento/Luz)</span>
            <p className="text-lg font-bold text-slate-200 font-mono">R$ {totalCostOfProjects.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
            <span className="text-[9px] text-zinc-400">Total investido no inventário</span>
          </div>
          <div className="p-2 bg-slate-950 rounded-lg text-rose-400 border border-slate-850">
            <TrendingDown size={18} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9.5px] text-slate-500 uppercase font-bold font-mono">Valor de Faturamento</span>
            <p className="text-lg font-bold text-white font-mono">R$ {totalValueExpected.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
            <span className="text-[9px] text-cyan-400 font-medium">Lucro Bruto estimado esperado</span>
          </div>
          <div className="p-2 bg-slate-950 rounded-lg text-cyan-400 border border-slate-850">
            <Coins size={18} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9.5px] text-slate-500 uppercase font-bold font-mono">Retorno Operacional (Lucro Real)</span>
            <p className="text-lg font-bold text-emerald-400 font-mono">R$ {totalProfitExpected.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</p>
            <span className="text-[9px] text-emerald-500/85">✓ Alto ticket com 01 impressora</span>
          </div>
          <div className="p-2 bg-slate-950 rounded-lg text-emerald-400 border border-slate-850">
            <TrendingUp size={18} />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[9.5px] text-slate-500 uppercase font-bold font-mono">Projetos no Funil</span>
            <p className="text-lg font-bold text-cyan-400 font-mono">{projects.length}</p>
            <span className="text-[9px] text-slate-400">Soma de todas as encomendas</span>
          </div>
          <div className="p-2 bg-slate-950 rounded-lg text-blue-400 border border-slate-850">
            <Layers size={18} />
          </div>
        </div>

      </div>

      {/* Main Grid: Add Print Project Form and Project Inventory Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Hand: New Project Form (col-4) */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Plus size={16} className="text-cyan-400" />
            <span className="text-xs font-mono uppercase font-bold text-slate-200">Adicionar Projeto 3D B2B</span>
          </div>

          <form onSubmit={handleAddProject} className="space-y-4 text-xs">
            {errorFeedback && (
              <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] rounded-lg">
                ⚠ {errorFeedback}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Nome do Projeto/Peça *</label>
              <input
                type="text"
                required
                placeholder="Ex. Case de Parede para ESP32"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Filamento / Material *</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-350 focus:outline-none"
                >
                  <option value="PETG">PETG Premium</option>
                  <option value="PETG Carbon">PETG Carbon</option>
                  <option value="ASA Industrial">ASA Industrial</option>
                  <option value="PLA Premium">PLA Premium</option>
                  <option value="ABS Reforçado">ABS Reforçado</option>
                  <option value="TPU Flexível">TPU Flexível / Borracha</option>
                  <option value="Nylon Injetado">Nylon Industrial</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Quantidade *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Custo Estimado (R$)*</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="Ex. 12.50"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Valor de Venda (R$)*</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="Ex. 140.00"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Nome do Cliente Corporativo (Opcional)</label>
              <input
                type="text"
                placeholder="Ex. Fazenda Três Lagoas"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Fase de Impressão *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Project3D["status"])}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-350 focus:outline-none"
              >
                <option value="planejado">Planejado (Modelagem 3D CAD)</option>
                <option value="imprimindo">Ativo: Imprimindo peça</option>
                <option value="concluido">Mesa Finalizada: Concluída</option>
                <option value="entregue">Remetido e Entregue ao Cliente</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Observações / Detalhes de Geometria</label>
              <textarea
                placeholder="Ex. Parede de 4mm reforçada, preenchimento Giroide de 30%..."
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white h-14 resize-none focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white py-3 rounded-lg font-bold font-mono uppercase tracking-wider text-[11px] shadow-lg shadow-cyan-500/10 cursor-pointer flex items-center justify-center gap-1.5 transition-all"
            >
              <Plus size={14} /> Registrar Projeto 3D
            </button>
          </form>

          {/* Quick Informational Tip */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1">
            <span className="text-[9.5px] text-cyan-400 font-bold uppercase block flex items-center gap-1">
              <Info size={11} /> Multiplicador Técnico
            </span>
            <p className="text-[10.5px] text-slate-400 leading-normal">
              Note que o custo de filamento é baixíssimo (1kg ~ R$ 120 rende dezenas de suportes pequenos). Seu ganho está no design de engenharia sob medida.
            </p>
          </div>
        </div>

        {/* Right Hand: Projects Inventory Manager (col-8) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Filtering buttons row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFilterStatus("todos")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  filterStatus === "todos" 
                    ? "bg-slate-800 text-white" 
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Todos ({projects.length})
              </button>
              <button
                onClick={() => setFilterStatus("planejado")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  filterStatus === "planejado" 
                    ? "bg-amber-600/20 text-amber-300 border border-amber-500/30 font-bold" 
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Modelagem CAD
              </button>
              <button
                onClick={() => setFilterStatus("imprimindo")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  filterStatus === "imprimindo" 
                    ? "bg-blue-600/20 text-blue-300 border border-blue-500/30 font-bold" 
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Mesa Exposta
              </button>
              <button
                onClick={() => setFilterStatus("concluido")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  filterStatus === "concluido" 
                    ? "bg-purple-600/20 text-purple-300 border border-purple-500/30 font-bold" 
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Pronto/Fila
              </button>
              <button
                onClick={() => setFilterStatus("entregue")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  filterStatus === "entregue" 
                    ? "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 font-bold" 
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Entregues
              </button>
            </div>
            
            <span className="text-[10px] font-mono text-slate-500">
              Mostrando {filteredProjects.length} de {projects.length} itens do funil
            </span>
          </div>

          {/* List of high ticket 3D prints */}
          {filteredProjects.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
              <Printer className="mx-auto text-slate-600 animate-pulse" size={32} />
              <p className="text-xs">
                Nenhum projeto registrado para este filtro de manufatura.
              </p>
              <p className="text-[10px] text-slate-500 font-mono">
                Adicione um novo case ou peça B2B no painel esquerdo para iniciar!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProjects.map((p) => {
                const subTotalCost = p.estimatedCost * p.quantity;
                const subTotalRevenue = p.sellingPrice * p.quantity;
                const subTotalProfit = subTotalRevenue - subTotalCost;
                const roiPercent = subTotalCost > 0 ? (subTotalProfit / subTotalCost) * 100 : 0;

                return (
                  <div 
                    key={p.id}
                    id={`p3d-card-item-${p.id}`}
                    className="bg-slate-900 border border-slate-800 hover:border-slate-750 p-5 rounded-2xl transition-all space-y-4 text-left"
                  >
                    {/* Card Top Title & State Controls */}
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 pb-3 border-b border-slate-850/60">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-mono uppercase bg-slate-950 border border-slate-800 px-2 py-0.5 rounded font-bold text-slate-400">
                            {p.material}
                          </span>
                          <span className="text-[9px] font-mono text-zinc-500">
                            Qtd: <b className="text-white font-mono">{p.quantity}un</b>
                          </span>

                          <span className={`text-[9px] font-mono font-bold uppercase rounded px-2 py-0.5 border ${
                            p.status === "planejado" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                            p.status === "imprimindo" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                            p.status === "concluido" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                            "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}>
                            {p.status === "planejado" ? "Modelando CAD" :
                             p.status === "imprimindo" ? "Imprimindo" :
                             p.status === "concluido" ? "Peça Concluída" :
                             "Despachado e Pago"}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-white tracking-tight pt-1 font-display leading-tight">
                          {p.projectName}
                        </h3>
                        {p.clientName && (
                          <p className="text-[10px] text-slate-400 font-sans flex items-center gap-1">
                            <Briefcase size={12} className="text-slate-500 shrink-0" />
                            Cliente: <span className="font-semibold">{p.clientName}</span>
                          </p>
                        )}
                      </div>

                      {/* State switch buttons for ease of management */}
                      <div className="flex items-center gap-1 sm:self-center font-mono">
                        <select
                          value={p.status}
                          onChange={(e) => handleUpdateStatus(p.id, e.target.value as Project3D["status"])}
                          className="bg-slate-950 border border-slate-800 rounded-lg text-[10px] py-1 px-2 text-slate-300 focus:outline-none"
                        >
                          <option value="planejado">Modelagem</option>
                          <option value="imprimindo">Ativo Imprimindo</option>
                          <option value="concluido">Mesa Pronta</option>
                          <option value="entregue">Despachado</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-1 px-2 rounded bg-slate-950 hover:bg-rose-950/40 text-slate-500 hover:text-rose-450 border border-slate-800 hover:border-rose-900/30 transition-colors cursor-pointer"
                          title="Apagar projeto B2B"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Detailed Notes */}
                    {p.notes && (
                      <div className="bg-slate-950/55 p-3 rounded-xl border border-slate-850/40 text-xs text-slate-400 font-sans leading-relaxed">
                        <strong className="text-slate-350 text-[10px] uppercase font-mono block mb-0.5">Notas Geométricas & Setup do Fatiador:</strong>
                        {p.notes}
                      </div>
                    )}

                    {/* Cost, Margin & ROI metrics footer block of each project */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950/70 p-3 rounded-xl border border-slate-850">
                      
                      <div className="text-zinc-500 font-mono">
                        <span className="text-[8px] uppercase font-bold tracking-wider text-slate-500 block">Investimento Unitário</span>
                        <p className="text-xs text-slate-400">R$ {p.estimatedCost.toFixed(2)}</p>
                        <p className="text-[8px] text-slate-600">Total: R$ {subTotalCost.toFixed(2)}</p>
                      </div>

                      <div className="text-cyan-400 font-mono">
                        <span className="text-[8px] uppercase font-bold tracking-wider text-slate-500 block">Venda Sugerida</span>
                        <p className="text-xs text-white">R$ {p.sellingPrice.toFixed(2)}</p>
                        <p className="text-[8px] text-slate-400">Total: R$ {subTotalRevenue.toFixed(2)}</p>
                      </div>

                      <div className="text-emerald-400 font-mono">
                        <span className="text-[8px] uppercase font-bold tracking-wider text-slate-500 block">Lucro Financeiro</span>
                        <p className="text-xs text-emerald-400 font-bold">R$ {subTotalProfit.toFixed(2)}</p>
                        <p className="text-[8px] text-emerald-500/80">Por lote completo</p>
                      </div>

                      <div className="text-blue-400 font-mono">
                        <span className="text-[8px] uppercase font-bold tracking-wider text-slate-500 block">Multiplicador ROI</span>
                        <p className="text-xs text-blue-300 font-bold">+{roiPercent.toFixed(0)}% </p>
                        <p className="text-[8px] text-slate-550">{(subTotalRevenue / (subTotalCost || 1)).toFixed(1)}x o custo de nylon</p>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* Practical guide and reference cards to maximize high margins */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3.5 text-left">
            <h4 className="text-xs font-bold text-white uppercase font-mono flex items-center gap-1 border-b border-slate-850 pb-2">
              <Wrench size={14} className="text-cyan-400" />
              Diretrizes de Manufatura de Alto Ticket B2B
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-[11px] leading-relaxed text-slate-400">
              <div className="space-y-1">
                <span className="font-bold text-slate-205 flex items-center gap-1 text-xs text-white">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span> 
                  1. Peças Mecânicas (PETG/Nylon)
                </span>
                <p>
                  Sempre use fatiamento focado em furos horizontais precisos e espessuras de parede superiores (mínimo 4 perímetros). Nylon absorve água, seque antes.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-205 flex items-center gap-1 text-xs text-white">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> 
                  2. Gabinetes de Proteção (ASA)
                </span>
                <p>
                  O filamento ASA substitui ABS por resistir a raios UV externos sem amarelar. Imprescindível para rastreador agro e antenas no tempo.
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-205 flex items-center gap-1 text-xs text-white">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span> 
                  3. Parar de Vender Plástico
                </span>
                <p>
                  Sempre venda o pacote "Cérebro + Invólucro". Um técnico de automação paga R$ 250 pela solução inteligente que resolve um sensor de campo.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
