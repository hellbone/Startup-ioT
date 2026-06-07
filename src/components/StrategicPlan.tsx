import React, { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  Lightbulb, 
  CheckCircle2, 
  Target, 
  LineChart, 
  BookOpen, 
  Award, 
  Zap, 
  TrendingUp, 
  Bot, 
  Cpu, 
  Layers,
  HelpCircle,
  Clock,
  ArrowRight,
  Coins,
  Globe,
  Database,
  MessageSquare,
  MapPin,
  PlaySquare,
  UserCheck,
  DollarSign,
  Plus,
  Trash2,
  Info
} from "lucide-react";

interface CostItem {
  id: string;
  name: string;
  category: string;
  cost: number;
  type: "mensal" | "anual" | "unico";
  enabled: boolean;
  description: string;
}

export default function StrategicPlan() {
  const [costs, setCosts] = useState<CostItem[]>(() => {
    const cached = localStorage.getItem("rtl_strat_costs");
    if (cached) return JSON.parse(cached);
    return [
      {
        id: "sys-web",
        name: "Deploy & Implantação de Sistema Web (Docker/Cloud Run/Vercel)",
        category: "Infraestrutura",
        cost: 150,
        type: "mensal",
        enabled: true,
        description: "Contêiner escalável na nuvem e deploy integrado com SSL para o painel administrativo."
      },
      {
        id: "domains",
        name: "Registro de Domínios Comerciais (.com & .com.br)",
        category: "Identidade",
        cost: 80,
        type: "anual",
        enabled: true,
        description: "Domínio próprio seguro para landing page de atração e serviços API corporativos comercial."
      },
      {
        id: "hosting",
        name: "Hospedagem de APIs e Backend (Render / VPS)",
        category: "Infraestrutura",
        cost: 120,
        type: "mensal",
        enabled: true,
        description: "Processamento contínuo de eventos do ESP32 e roteador de webhooks do sistema."
      },
      {
        id: "database",
        name: "Banco de Dados relacional PostgreSQL / Supabase",
        category: "Dados",
        cost: 95,
        type: "mensal",
        enabled: true,
        description: "Instância na nuvem para persistência rápida das ordens de serviço, logs e geolocalizações."
      },
      {
        id: "payment-api",
        name: "Gateway de Cartão / Pix (Stripe / Asaas / Mercado Pago)",
        category: "Financeiro",
        cost: 50,
        type: "mensal",
        enabled: true,
        description: "Configuração do ambiente de sandbox de cobrança e webhook automático de faturas."
      },
      {
        id: "whatsapp-api",
        name: "Assistente WhatsApp Business (Z-API / Evolution API)",
        category: "Comunicação",
        cost: 149,
        type: "mensal",
        enabled: true,
        description: "API de disparo automático para enviar atualizações de rotas em tempo real ao cliente."
      },
      {
        id: "maps-api",
        name: "API do Google Maps (Geocoding & Matrix de Rotas)",
        category: "Location",
        cost: 100,
        type: "mensal",
        enabled: true,
        description: "Conversão de coordenadas GPS em endereços reais para controle geográfico dos técnicos."
      },
      {
        id: "gemini-api",
        name: "IA Gemini Studio Pro (Créditos de uso corporativo)",
        category: "Inteligência",
        cost: 150,
        type: "mensal",
        enabled: true,
        description: "Processamentos inteligentes de áudio para texto e relatórios executivos das frotas de campo."
      },
      {
        id: "app-pub",
        name: "Google Play Store / Apple Store Developer Setup",
        category: "Publicação",
        cost: 135,
        type: "unico",
        enabled: true,
        description: "Registro de licenças oficiais de desenvolvedor para publicação oficial e downloads sem barreiras."
      },
      {
        id: "developer-wage",
        name: "Manutenção Mínima de Sobrevivência (Mês 1)",
        category: "Fundador",
        cost: 3500,
        type: "mensal",
        enabled: true,
        description: "Subsistência do programador para dedicação integral exclusiva à arquitetura @mnésia_Lab's."
      }
    ];
  });

  // State for adding custom item
  const [customName, setCustomName] = useState("");
  const [customCategory, setCustomCategory] = useState("Vários");
  const [customCost, setCustomCost] = useState(100);
  const [customType, setCustomType] = useState<"mensal" | "anual" | "unico">("mensal");

  // Load contracts value to show feasibility
  const [activeContractsVal] = useState<number>(() => {
    const cached = localStorage.getItem("rtl_contracts");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return parsed.reduce((acc: number, curr: any) => acc + (curr.monthlyValue || 0), 0);
      } catch (e) { return 4000; }
    }
    return 4000; // default active contract R$ 4.000 for safety
  });

  useEffect(() => {
    localStorage.setItem("rtl_strat_costs", JSON.stringify(costs));
  }, [costs]);

  const toggleCost = (id: string) => {
    setCosts(prev => prev.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c));
  };

  const updateCostValue = (id: string, newVal: number) => {
    setCosts(prev => prev.map(c => c.id === id ? { ...c, cost: newVal } : c));
  };

  const addCustomCost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const newItem: CostItem = {
      id: "custom-" + Date.now(),
      name: customName,
      category: customCategory,
      cost: customCost,
      type: customType,
      enabled: true,
      description: "Item adicional customizado adicionado pelo estrategista."
    };
    setCosts(prev => [...prev, newItem]);
    setCustomName("");
    setCustomCost(100);
  };

  const removeCost = (id: string) => {
    setCosts(prev => prev.filter(c => c.id !== id));
  };

  // Calculations
  const activeCosts = costs.filter(c => c.enabled);
  const totalSingleUpfront = activeCosts
    .filter(c => c.type === "unico" || c.type === "anual")
    .reduce((acc, curr) => acc + curr.cost, 0);

  const totalMonthlyRun = activeCosts
    .filter(c => c.type === "mensal")
    .reduce((acc, curr) => acc + curr.cost, 0);

  const totalInitialShortTermNeeded = totalSingleUpfront + totalMonthlyRun; // month 1 structure cost

  // Icon mapping helper
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "infraestrutura": return <Globe size={14} className="text-blue-400" />;
      case "identidade": return <Globe size={14} className="text-amber-400" />;
      case "dados": return <Database size={14} className="text-teal-400" />;
      case "financeiro": return <Coins size={14} className="text-emerald-400" />;
      case "comunicação": return <MessageSquare size={14} className="text-purple-400" />;
      case "location": return <MapPin size={14} className="text-red-400" />;
      case "inteligência": return <Bot size={14} className="text-fuchsia-400" />;
      case "publicação": return <PlaySquare size={14} className="text-rose-400" />;
      case "fundador": return <UserCheck size={14} className="text-yellow-400" />;
      default: return <Cpu size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Editorial Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-rose-500/10 w-96 h-96 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 bg-amber-500/5 w-80 h-80 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          <span className="text-[10px] uppercase tracking-widest font-bold bg-rose-500/10 text-rose-300 px-3 py-1 rounded-full border border-rose-500/20 font-mono">
            Diagnóstico e Planejamento Tático - 2026
          </span>
          <h2 className="font-display text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
            Manifesto de Execução da @mnésia_Lab's APPs
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Você está em uma posição interessante porque seu principal ativo não é capital, é <span className="text-amber-300 font-semibold decoration-amber-500 underline decoration-2 underline-offset-4">capacidade técnica</span>. Muitas startups fracassam por falta de execução; no seu caso, o desafio é foco e geração de caixa.
          </p>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
            O maior risco do seu plano não é a falta de dinheiro. É tentar iniciar 5 ou 6 negócios simultaneamente e acabar sem receita em nenhum deles.
          </p>

          <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl max-w-3xl mt-4">
            <div className="flex gap-3">
              <ShieldAlert className="text-amber-400 shrink-0" size={20} />
              <p className="text-xs text-amber-200 leading-relaxed">
                <strong>Diagnóstico Inicial:</strong> Você possui excelentes competências em Desenvolvimento web, Desenvolvimento mobile, SaaS, IoT (Arduino, ESP32, GPS, 3G/4G), Automação, Inteligência Artificial e Produção de conteúdo digital. Isso permite criar uma empresa com investimento financeiro extremamente reduzido, mas requer disciplina de gastos críticos estruturais.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: CUSTOS INICIAIS FUNDAMENTAIS DE ESTRUTURA */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden" id="fundamental-upfront-costs">
        <div className="absolute top-0 right-0 bg-rose-500/5 w-72 h-72 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-widest font-bold bg-rose-500/10 text-rose-300 px-2 py-0.5 rounded border border-rose-500/20 font-mono">
                Passos Iniciais Críticos
              </span>
              <span className="text-slate-500 font-mono text-[9px]">•</span>
              <span className="text-slate-300 font-display text-xs font-semibold">Tudo só é possível após estes passos fundamentais</span>
            </div>
            <h3 className="font-display font-bold text-lg text-white">Custos Fundamentais de Estrutura Inicial</h3>
            <p className="text-slate-400 text-xs font-sans">O orçamento mínimo necessário nos primeiros 30 dias para materialização da infraestrutura do app de campo.</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex items-center gap-3 self-start md:self-auto">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
            <span className="font-mono text-xs">
              <span className="text-slate-400 mr-1">Meta Pillar 1 MRR:</span>
              <strong className="text-emerald-400 font-bold">R$ {activeContractsVal.toLocaleString("pt-BR")}/mês</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cost Sheet List */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-500 font-mono px-1">
              <span>ITEM DE INVESTIMENTO ESTRUTURAL</span>
              <span>CUSTO ESTIMADO</span>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {costs.map((c) => (
                <div 
                  key={c.id} 
                  className={`p-3.5 rounded-xl border transition-all ${
                    c.enabled 
                      ? "bg-slate-950 border-slate-800 text-slate-100 shadow-inner" 
                      : "bg-slate-950/30 border-slate-900 text-slate-500 opacity-65"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <button 
                        type="button"
                        onClick={() => toggleCost(c.id)}
                        className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition-all ${
                          c.enabled 
                            ? "bg-rose-500/10 border-rose-500/60 text-rose-400" 
                            : "bg-slate-900 border-slate-800 text-transparent"
                        }`}
                        title={c.enabled ? "Desativar custo" : "Ativar custo"}
                      >
                        {c.enabled && <span className="text-[10px] leading-none">✔</span>}
                      </button>

                      <div className="space-y-1 text-left">
                        <div className="flex flex-wrap items-center gap-1.5 leading-none">
                          <span className="inline-flex items-center gap-1">
                            {getCategoryIcon(c.category)}
                          </span>
                          <span className={`text-xs font-bold font-display ${c.enabled ? "text-slate-200" : "text-slate-500"}`}>
                            {c.name}
                          </span>
                          <span className={`text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded font-mono ${
                            c.type === "mensal" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                            c.type === "anual" ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" :
                            "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                          }`}>
                            {c.type === "mensal" ? "Mensal" : c.type === "anual" ? "Anual" : "Único"}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-snug font-sans">
                          {c.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0 gap-1.5">
                      <div className="flex items-center gap-1 font-mono text-xs font-bold">
                        <span className="text-slate-500">R$</span>
                        <input
                          type="number"
                          value={c.cost}
                          disabled={!c.enabled}
                          onChange={(e) => updateCostValue(c.id, Math.max(0, Number(e.target.value)))}
                          className={`w-16 bg-slate-900 border text-center rounded px-1 py-0.5 font-bold font-mono text-xs ${
                            c.enabled 
                              ? "border-slate-800 text-white focus:border-rose-500" 
                              : "border-slate-950 text-slate-600 cursor-not-allowed"
                          }`}
                        />
                      </div>
                      {c.id.startsWith("custom-") && (
                        <button
                          type="button"
                          onClick={() => removeCost(c.id)}
                          className="text-[9px] text-red-400 hover:text-red-300 flex items-center gap-0.5 font-sans cursor-pointer"
                        >
                          <Trash2 size={10} /> Excluir
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form to add custom cost */}
            <form onSubmit={addCustomCost} className="bg-slate-950 border border-slate-850 p-3.5 rounded-xl space-y-3 font-sans">
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Adicionar Custo Extra Personalizado</span>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <input
                  type="text"
                  placeholder="Ex: Aluguel de Bancada, Protótipo físico..."
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="md:col-span-12 lg:col-span-5 bg-slate-900 text-xs border border-slate-800 rounded-lg px-3 py-2 text-white focus:border-rose-500"
                />
                <input
                  type="number"
                  placeholder="Valor"
                  value={customCost}
                  onChange={(e) => setCustomCost(Number(e.target.value))}
                  className="md:col-span-4 lg:col-span-2 bg-slate-900 text-xs border border-slate-800 rounded-lg px-3 py-2 text-white font-mono"
                />
                <select
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value as any)}
                  className="md:col-span-4 lg:col-span-3 bg-slate-900 text-xs border border-slate-800 rounded-lg px-3 py-2 text-white"
                >
                  <option value="mensal">Mensal</option>
                  <option value="unico">Taxa Única</option>
                  <option value="anual">Anual</option>
                </select>
                <button
                  type="submit"
                  className="md:col-span-4 lg:col-span-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg py-2 cursor-pointer transition-all flex items-center justify-center gap-1"
                >
                  <Plus size={12} /> Adicionar
                </button>
              </div>
            </form>

          </div>

          {/* Budget output dashboard summary on the right */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <span className="text-[9px] uppercase font-bold tracking-widest bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded border border-rose-500/20 font-mono">
                Fechamento do Orçamento Inicial
              </span>

              {/* Total initial cash needed */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-black block font-sans">CAIXA CRÍTICO NECESSÁRIO (MÊS 1)</span>
                <p className="text-3xl font-extrabold font-mono text-white tracking-tight">
                  R$ {totalInitialShortTermNeeded.toLocaleString("pt-BR")},00
                </p>
                <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                  Consolida as mensalidades do 1º mês + todas as taxas únicas de publicação e registros anuais fundamentais.
                </p>
              </div>

              <div className="h-px bg-slate-900"></div>

              {/* Cost splits */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Frequência Recorrente:</span>
                  <span className="text-white font-bold">R$ {totalMonthlyRun.toLocaleString("pt-BR")}/mês</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Custo Geral Único/Setup:</span>
                  <span className="text-white font-bold">R$ {totalSingleUpfront.toLocaleString("pt-BR")}</span>
                </div>
              </div>

              <div className="h-px bg-slate-900"></div>

              {/* Feasibility Alert */}
              <div className="space-y-3 font-sans">
                <span className="text-[10px] uppercase font-bold block text-slate-400 text-xs">Análise de Amortização B2B</span>
                
                {activeContractsVal >= totalInitialShortTermNeeded ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                    <p className="text-[11px] text-emerald-400 leading-relaxed">
                      <strong className="text-white">✓ Fluxo Positivo:</strong> Seu faturamento B2B de serviços cobrirá estes custos de imediato de forma auto-sustentada!
                    </p>
                  </div>
                ) : (
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                    <p className="text-[11px] text-amber-300 leading-relaxed font-sans">
                      <strong className="text-white">⚠ Passo 1 Fundamental:</strong> Sua meta prioritária absoluta deve ser garantir faturamento inicial no Pilar 1 de serviços para cobrir com segurança o total de R$ {totalInitialShortTermNeeded.toLocaleString("pt-BR")} de setup operacional inicial.
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Strategic Rule Quote */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-start gap-2 text-xs font-sans">
              <Info size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-relaxed text-left">
                <strong className="text-slate-200">Regras de Validação:</strong> Estes custos de infraestrutura e subsistência de programador são os pilares fundamentais. Todo o restante do plano de expansão só é viável após estes passos fundamentais serem estruturados.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Grid: Competências & Micro-Incubadora Concept */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Competências B2B Widget */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Award className="text-blue-400" size={18} />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-display">Competências Instaladas</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sua pilha de habilidades permite desenvolver, fabricar e implantar soluções fim-a-fim de forma autônoma sem contratar terceiros:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <span className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Desenvolvimento Web
            </span>
            <span className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Mobile Nativo/Híbrido
            </span>
            <span className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span> Arquitetura SaaS B2B
            </span>
            <span className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span> IoT (Arduino / ESP32)
            </span>
            <span className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span> Automação Industrial
            </span>
            <span className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full"></span> Inteligência Artificial
            </span>
            <span className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg flex items-center gap-2 text-slate-300 sm:col-span-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> Criação de Conteúdo Digital de Alto Lead
            </span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-[11px] text-slate-500 text-center font-mono">
            Investimento Financeiro Necessário: <strong className="text-emerald-400 font-bold">R$ ~0,00</strong> (Apenas tempo de engenharia)
          </div>
        </div>

        {/* Dynamic Road map approach */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Zap className="text-amber-400 animate-bounce" size={18} />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-display">A Visão: Micro-Incubadora Orgânica</h3>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Em vez de apostar todas as fichas em um único app sem validação de mercado, o conceito de <strong>Micro-Incubadora</strong> permite que você crie pequenos projetos de forma rápida, autofinanciando-os através de contratos de consultoria, gerando canais de tráfego orgânico com conteúdos de hardware que convertem leads B2B silenciosamente.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed">
              O ecossistema se alimenta sozinho: Seus testes de hardware viram conteúdo nas redes. Esse conteúdo atrai empresários com dores reais que contratam seus serviços. Os códigos criados nesses serviços servem de base para o seu SaaS autônomo escalável.
            </p>
          </div>

          <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl flex items-center justify-between">
            <div className="text-left">
              <span className="text-[9px] text-slate-500 font-bold uppercase block font-mono">Próxima Meta Jurídica</span>
              <span className="text-xs font-bold text-white leading-tight">Começar MEI ou Simples Nacional</span>
              <span className="text-[10px] text-slate-500 block">Fuga total de holdings caras no início</span>
            </div>
            <span className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md font-mono">
              Foco: R$ 10k - 20k/m
            </span>
          </div>
        </div>

      </div>

      {/* The 3 Pillars Deep Dive */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-200 tracking-wider uppercase border-b border-slate-800 pb-2 flex items-center gap-2 font-display">
          <Layers size={18} className="text-blue-400" />
          A Estrutura de Três Pilares da @mnésia_Lab's
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          
          {/* Pillar 1 Detail */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-blue-500/20 transition-all">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9px] bg-blue-500/15 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-md font-bold uppercase font-mono">
                  Pilar 1 - Imediato
                </span>
                <span className="text-xs font-bold text-slate-400">R$ 4.000+/m</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">Serviços e Caixa</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                O pilar de velocidade. Objetivo principal de garantir fluxo de caixa operacional estável nos primeiros 30 dias para financiar sua subsistência e ensaios de hardware.
              </p>

              <div className="space-y-1.5 text-xs">
                <span className="text-slate-300 font-semibold block">O que oferecer:</span>
                <ul className="space-y-1 text-[11px] text-slate-400 list-inside list-disc">
                  <li>Desenvolvimento corporativo customizado</li>
                  <li>Aplicativos mobile funcionais</li>
                  <li>Dashboards gerenciais com IA integrada</li>
                  <li>Integrações de dados herdados</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-left">
              <span className="text-[9px] text-slate-500 uppercase font-mono block">Meta Métrica</span>
              <span className="text-[11px] font-bold text-slate-300">2 Contratos Recorrentes de R$ 2.000</span>
            </div>
          </div>

          {/* Pillar 2 Detail */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-emerald-500/20 transition-all">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-md font-bold uppercase font-mono">
                  Pilar 2 - Ativo Escalável
                </span>
                <span className="text-xs font-bold text-slate-400">Recorrência Limpa</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">Produto SaaS IoT</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Criação de propriedade intelectual e patrimônio digital de receita previsível. Menos dependência direta da venda de suas horas de trabalho.
              </p>

              <div className="space-y-1.5 text-xs">
                <span className="text-slate-300 font-semibold block">Soluções mais prováveis:</span>
                <ul className="space-y-1 text-[11px] text-slate-400 list-inside list-disc">
                  <li>Gestão de Ordens de Serviço Offline</li>
                  <li>Rastreamento inteligente de técnicos externos</li>
                  <li>Portais de monitoramento industrial IoT</li>
                  <li>Painel embarcado multilocatário</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-left">
              <span className="text-[9px] text-slate-500 uppercase font-mono block">Ticket Estimado</span>
              <span className="text-[11px] font-bold text-emerald-400">R$ 49 a R$ 199/mês por usuário</span>
            </div>
          </div>

          {/* Pillar 3 Detail */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-purple-500/20 transition-all">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9px] bg-purple-500/15 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-md font-bold uppercase font-mono">
                  Pilar 3 - Tráfego Orgânico
                </span>
                <span className="text-xs font-bold text-slate-400">Vendedor 24/7</span>
              </div>
              <h4 className="text-base font-bold text-white font-display">Conteúdo e Autoridade</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Utilizar seu talento e experimentos físicos para atrair audiência qualificada e leads corporativos valiosos que vêm até você por reputação técnica.
              </p>

              <div className="space-y-1.5 text-xs">
                <span className="text-slate-300 font-semibold block">Canais & Estrutura:</span>
                <ul className="space-y-1 text-[11px] text-slate-400 list-inside list-disc">
                  <li>Vídeos de pinagem e fiação ESP32 no YouTube</li>
                  <li>Demonstrações de automação rápida no TikTok</li>
                  <li>Artigos de gestão IoT robustos no LinkedIn</li>
                  <li>Conversão silenciosa em leads qualificados</li>
                </ul>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-left">
              <span className="text-[9px] text-slate-500 uppercase font-mono block">Efeito Multiplicador</span>
              <span className="text-[11px] font-bold text-purple-400">Cada tutorial atrai potenciais clientes B2B</span>
            </div>
          </div>

        </div>
      </div>

      {/* Gold Opportunity: SaaS + IoT + IA */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-blue-950/40 border border-emerald-500/25 p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/10 text-emerald-400 font-bold font-mono text-[9px] border border-emerald-500/20 px-2 py-0.5 rounded">
                Estratégia de Produto Vencedor
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-300 text-xs font-bold flex items-center gap-1 font-sans">
                <Bot size={13} className="text-blue-400" /> SaaS + IoT + IA
              </span>
            </div>
            <h4 className="text-lg font-bold text-white font-display">A Oportunidade Real: Monitoramento Inteligente de Campo</h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-4xl font-sans">
              Entre todas as frentes de teste, a que possui menor concorrência predatória nacional e margem substancial em 2026 é a de <strong className="text-white">Operações de Campo Inteligentes</strong>. Criar um CRM e painel integrado de ordens de serviço offline, geofencing com sinal simplificado de rastreadores remotos, e IA (como o Gemini) computando relatórios táticos de atendimentos. Isso resolve a dor de dezenas de pequenas empresas de assistência de ar-condicionado, segurança patrimonial e instalações de internet local.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-xs space-y-1.5 min-w-[200px] shrink-0 font-sans">
            <span className="font-bold text-white block">Arquitetura Integrada:</span>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Hardware (ESP32)</span>
              <span className="text-emerald-400 font-mono">SIM810 4G</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Check-in Automático</span>
              <span className="text-blue-400 font-mono">Radius 30m</span>
            </div>
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Sumarizador Web IA</span>
              <span className="text-purple-400 font-mono">Gemini 1.5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Avoid traps */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 border-b border-slate-800 pb-3 mb-4 flex items-center gap-2 font-display">
          <ShieldAlert size={16} className="text-red-400" />
          Armadilhas Comuns: O que Evitar Inicialmente
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
          
          <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2">
            <div className="font-bold text-red-400 flex items-center gap-1.5 font-display text-sm">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> 
              Dropshipping em 2026
            </div>
            <p className="text-slate-400 leading-relaxed">
              Está extremamente saturado e competitivo por importações facilitadas de grandes portais.
            </p>
            <div className="text-[11px] text-slate-500 leading-snug space-y-1">
              <p>• <strong className="text-slate-400">Margens baixas:</strong> Custos de conversão altíssimos engolem o lucro corporal.</p>
              <p>• <strong className="text-slate-400">Leilão de Ads:</strong> Alto risco de travar capital em testes de criativos sem conversão e devoluções.</p>
            </div>
            <span className="text-[9px] text-slate-500 block italic pt-1 border-t border-slate-900">Deixe totalmente para uma segunda fase empresarial posterior.</span>
          </div>

          <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2">
            <div className="font-bold text-red-400 flex items-center gap-1.5 font-display text-sm">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span> 
              Lançar múltiplos SaaS / Apps ao mesmo tempo
            </div>
            <p className="text-slate-400 leading-relaxed">
              O erro clássico de desenvolvedores solitários que se perdem no entusiasmo do código.
            </p>
            <div className="text-[11px] text-slate-500 leading-snug space-y-1">
              <p>• <strong className="text-slate-400">Paralisia de Escala:</strong> ERP, CRM, Marketplace, ferramentas de IA iniciados juntos.</p>
              <p>• <strong className="text-slate-400">Resultado Comum:</strong> Centenas de horas de código disperso e nenhum produto finalizado ou com faturamento.</p>
            </div>
            <span className="text-[9px] text-slate-500 block italic pt-1 border-t border-slate-900">Seja cirúrgico: Desenvolva e venda um único MVP de ponta.</span>
          </div>

        </div>
      </div>

      {/* Chronological Strategy Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-5">
          <BookOpen className="text-blue-400" size={18} />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-display">Plano Cronológico de 90 Dias</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          
          <div className="space-y-3">
            <div className="bg-slate-950/80 p-3 border-l-2 border-blue-500 rounded-r-lg">
              <span className="text-[9px] text-blue-400 font-bold block font-mono">Mês 1 - Alavancagem</span>
              <h4 className="text-xs font-bold text-white mt-0.5 leading-tight">Posicionamento & Prospecção</h4>
            </div>
            <ul className="text-xs text-slate-400 space-y-2 leading-snug list-inside list-disc">
              <li>Definição de marca e criação de site institucional simples em React.</li>
              <li>Ajuste do perfil do LinkedIn para focar em soluções exclusivas IoT e automação.</li>
              <li>Estruturação do portfólio inteligente.</li>
              <li className="text-emerald-400 font-semibold font-mono">Meta: 1º contrato recorrente de serviços.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-950/80 p-3 border-l-2 border-purple-500 rounded-r-lg">
              <span className="text-[9px] text-purple-400 font-bold block font-mono">Mês 2 - Tração Física</span>
              <h4 className="text-xs font-bold text-white mt-0.5 leading-tight">Construção do MVP & Vídeos</h4>
            </div>
            <ul className="text-xs text-slate-400 space-y-2 leading-snug list-inside list-disc">
              <li>Desenvolver o MVP do SaaS conectando ESP32 a uma API local de teste.</li>
              <li>Criar calendário de publicação diária de tutoriais de hardware para atrair leads.</li>
              <li>Automação de emails e prospecção ativa B2B.</li>
              <li className="text-emerald-400 font-semibold font-mono">Meta: 2 a 5 clientes de serviço consolidados.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="bg-slate-950/80 p-3 border-l-2 border-emerald-500 rounded-r-lg">
              <span className="text-[9px] text-emerald-400 font-bold block font-mono">Mês 3 - Lançamento</span>
              <h4 className="text-xs font-bold text-white mt-0.5 leading-tight">Escala e Usuários Beta</h4>
            </div>
            <ul className="text-xs text-slate-400 space-y-2 leading-snug list-inside list-disc">
              <li>Lançar a versão Beta do rastreador inteligente de campo.</li>
              <li>Oferecer o teste piloto para os clientes que vieram através dos seus vídeos técnicos do canal.</li>
              <li className="text-emerald-400 font-semibold font-mono">Meta: 10 usuários ativos reais na plataforma SaaS.</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Conclusion Quote card */}
      <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 font-mono block">Estratégia de Posicionamento Final</span>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            Com as habilidades de desenvolvimento, eletrônica embarcada e inteligência artificial reunidos sob a mesma marca, você não vende apenas layouts ou APIs simples. <strong className="text-white">Você resolve gargalos operacionais custosos no campo que empresas tradicionais de TI não conseguem tocar.</strong> Foque em construir esta fábrica de hardware & software inteligente e estabeleça uma das operações B2B mais resilientes do mercado.
          </p>
        </div>
      </div>

    </div>
  );
}
