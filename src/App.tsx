import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PillarServices from "./components/PillarServices";
import PillarSaaS from "./components/PillarSaaS";
import PillarContent from "./components/PillarContent";
import Pillar3D from "./components/Pillar3D";
import Roadmap90Days from "./components/Roadmap90Days";
import GeminiChat from "./components/GeminiChat";
import StrategicPlan from "./components/StrategicPlan";
import SplashScreen from "./components/SplashScreen";
import PasswordGate from "./components/PasswordGate";
import ClientAssistant from "./components/ClientAssistant";
import { 
  ClientContract, 
  ContentIdea, 
  RoadmapTask 
} from "./types";
import { 
  Briefcase, 
  Cpu, 
  Tv, 
  Calendar, 
  Sparkles, 
  Bot, 
  DollarSign, 
  TrendingUp, 
  Radio, 
  BookOpen, 
  ArrowRight,
  Target,
  FileCode,
  Smartphone,
  Printer
} from "lucide-react";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  // State with LocalStorage fallbacks or default realistic sandbox data
  const [contracts, setContracts] = useState<ClientContract[]>(() => {
    const cached = localStorage.getItem("rtl_contracts");
    if (cached) return JSON.parse(cached);
    return [
      {
        id: "ctr-1",
        clientName: "AutoPeças São José",
        serviceType: "Integração",
        monthlyValue: 2000,
        status: "ativo",
        startDate: "02/06/2026",
        description: "Dashboard em tempo real de faturamento integrado com alerta de estoque por IA."
      },
      {
        id: "ctr-2",
        clientName: "Clínica OdontoPrev",
        serviceType: "Automação IA",
        monthlyValue: 2500,
        status: "negoc",
        startDate: "05/06/2026",
        description: "Agente de voz guiado por inteligência artificial para confirmação automática de consultas."
      }
    ];
  });

  const [saasClients, setSaasClients] = useState<number>(() => {
    const cached = localStorage.getItem("rtl_saas_clients");
    return cached ? Number(cached) : 28;
  });

  const [ideas, setIdeas] = useState<ContentIdea[]>(() => {
    const cached = localStorage.getItem("rtl_ideas");
    if (cached) return JSON.parse(cached);
    return [
      {
        id: "idea-1",
        title: "Como ler coordenadas GPS com ESP32 e transmitir via 4G/LTE",
        platform: "YouTube",
        category: "ESP32",
        status: "Roteiro",
        estimatedLeads: 55,
        scriptPrompt: "Foco técnico mostrando fiação do módulo modular GPS e protocolo TinyGPS++"
      },
      {
        id: "idea-2",
        title: "Automatizando ordem de serviço de eletricistas de forma offline",
        platform: "TikTok",
        category: "Automação",
        status: "Publicado",
        estimatedLeads: 25,
        scriptPrompt: "Passo a passo rápido de 50 segundos com tela de check-in geográfico e ESP32"
      },
      {
        id: "idea-3",
        title: "Por que hardware é o novo Software en 2026",
        platform: "LinkedIn",
        category: "Empreendedorismo",
        status: "Ideia",
        estimatedLeads: 45,
        scriptPrompt: "Artigo denso para empresários de logística sobre economia com rastreadores customizáveis"
      }
    ];
  });

  const [tasks, setTasks] = useState<RoadmapTask[]>(() => {
    const cached = localStorage.getItem("rtl_tasks");
    if (cached) return JSON.parse(cached);
    return [
      // Mês 1
      {
        id: "task-1-1",
        month: 1,
        category: "Estrutura",
        title: "Definição de Marca '@mnésia_Lab's APPs' & LinkedIn",
        description: "Posicionar perfil do LinkedIn focado em consultoria e infraestrutura IoT.",
        completed: true
      },
      {
        id: "task-1-2",
        month: 1,
        category: "Serviços",
        title: "Criar Portfólio Simples de Soluções Inteligentes",
        description: "Página web rápida descrevendo capacidades de código corporativo e sensores.",
        completed: true
      },
      {
        id: "task-1-3",
        month: 1,
        category: "Serviços",
        title: "Prospectar 15 Leads Corporativos nos arredores de SP",
        description: "Focar em prestadores de serviços de campo, mecânica e assistência técnica local.",
        completed: false
      },
      {
        id: "task-1-4",
        month: 1,
        category: "Serviços",
        title: "Fechar 1º Contrato Recorrente Comercial de R$ 2.000",
        description: "Gerar o primeiro oxigênio financeiro do caixa para cobrir o mês de despesas.",
        completed: false
      },
      // Mês 2
      {
        id: "task-2-1",
        month: 2,
        category: "SaaS",
        title: "Desenvolver MVP do SaaS FieldSmart IoT",
        description: "Fazer a conexão da placa ESP32 transmitindo latitude/longitude via API local.",
        completed: false
      },
      {
        id: "task-2-2",
        month: 2,
        category: "Conteúdo",
        title: "Gravar e Publicar 12 Vídeos Técnicos Curtos",
        description: "Dividir entre tutoriais de pinagem ESP32 no TikTok e vídeos de arquitetura B2B.",
        completed: false
      },
      // Mês 3
      {
        id: "task-3-1",
        month: 3,
        category: "SaaS",
        title: "Lançar Versão Beta com os Primeiros 10 Usuários",
        description: "Trazer empresas reais indicadas por seus vídeos para testarem o rastreador.",
        completed: false
      }
    ];
  });

  // Keep LocalStorage updated
  useEffect(() => {
    localStorage.setItem("rtl_contracts", JSON.stringify(contracts));
  }, [contracts]);

  useEffect(() => {
    localStorage.setItem("rtl_saas_clients", saasClients.toString());
  }, [saasClients]);

  useEffect(() => {
    localStorage.setItem("rtl_ideas", JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem("rtl_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Aggregate metrics
  const activeContractsValue = contracts
    .filter(c => c.status === "ativo")
    .reduce((acc, curr) => acc + curr.monthlyValue, 0);

  const potentialLeadsValue = ideas
    .filter(i => i.status === "Publicado")
    .reduce((acc, curr) => acc + curr.estimatedLeads, 0);

  const roadmapCompletedCount = tasks.filter(t => t.completed).length;
  const roadmapProgress = (roadmapCompletedCount / tasks.length) * 100;

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (isLocked) {
    return <PasswordGate onUnlock={() => setIsLocked(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      
      {/* Top Header & Navigation Section */}
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        activeContractsValue={activeContractsValue}
        saasClientCount={saasClients}
        contentLeadsValue={potentialLeadsValue}
      />

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        
        {activeSection === "dashboard" && (
          <div className="space-y-6">
            
            {/* Primary Executive Diagnostics Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-500/10 w-96 h-96 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 bg-purple-500/5 w-80 h-80 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold bg-amber-500/10 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-mono">
                    Análise e Diagnóstico Técnico
                  </span>
                  <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                    @mnésia_Lab's APPs & Force Safe ioT Mobile Security: Do Zero ao Faturamento Recorrente
                  </h2>
                  <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
                    Sua combinação competitiva de <strong className="text-white">Desenvolvimento, Eletrônica, IoT e IA</strong> é rara no mercado nacional. Este painel central consolida as 3 pontas de execução de seu plano de micro-incubadora orgânica para que você evite desperdiçar foco tentando gerenciar muitos produtos antes de gerar fluxo de caixa operacional estável.
                  </p>
                </div>
                
                {/* Micro badge of diagnostic */}
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex items-center gap-3.5 shrink-0">
                  <div className="bg-emerald-500/15 text-emerald-400 w-10 h-10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                    <Target size={20} className="animate-spin" style={{ animationDuration: "12s" }} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Objetivo de Faturamento</span>
                    <p className="text-md font-bold text-white font-mono">R$ 10.000 - R$ 20.000/m</p>
                    <p className="text-[9px] text-slate-400">Recorrência B2B consolidada</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar Bento Block Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Pillar 1 Container Summary */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500/25 transition-all flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="bg-blue-500/10 text-blue-400 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-md border border-blue-505/10 font-mono">
                      Pilar 1
                    </span>
                    <Briefcase size={16} className="text-blue-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-md mt-3">Serviços e Caixa</h3>
                  <p className="text-slate-400 text-xs mt-1 leading-snug">
                    Sistemas corporativos sob demanda e automações customizadas de contratos recorrentes rápidas.
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">Faturamento Atual</span>
                    <span className="text-sm font-bold text-white font-mono">R$ {activeContractsValue.toLocaleString("pt-BR")}/mês</span>
                  </div>
                  <button 
                    onClick={() => setActiveSection("services")}
                    className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold cursor-pointer flex items-center gap-1 transition-all"
                  >
                    Gerenciar <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Pillar 2 Container Summary */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/25 transition-all flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-md border border-emerald-505/10 font-mono font-bold">
                      Pilar 2
                    </span>
                    <Cpu size={16} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-md mt-3">MVP SaaS FieldSmart IoT</h3>
                  <p className="text-slate-400 text-xs mt-1 leading-snug">
                    Sistema de check-in geográfico em tempo real com ESP32 + GSM para prestadores de serviços.
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">MRR Estimado (R$ 99/cl)</span>
                    <span className="text-sm font-bold text-white font-mono">R$ {(saasClients * 99).toLocaleString("pt-BR")}/mês</span>
                  </div>
                  <button 
                    onClick={() => setActiveSection("saas")}
                    className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer flex items-center gap-1 transition-all"
                  >
                    Controlar SaaS <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Pillar 3 Container Summary */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/25 transition-all flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="bg-purple-500/10 text-purple-400 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-md border border-purple-505/10 font-mono">
                      Pilar 3
                    </span>
                    <Tv size={16} className="text-purple-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-md mt-3">Aquisição e Conteúdo</h3>
                  <p className="text-slate-400 text-xs mt-1 leading-snug">
                    Vídeos diários de ESP32, Arduino e IA gerando leads automáticos e autoridade técnica.
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">Temas Planejados</span>
                    <span className="text-sm font-bold text-white font-mono">{ideas.length} Conteúdos</span>
                  </div>
                  <button 
                    onClick={() => setActiveSection("content")}
                    className="text-[10px] text-purple-400 hover:text-purple-300 font-semibold cursor-pointer flex items-center gap-1 transition-all"
                  >
                    Ver Linha Editorial <ArrowRight size={12} />
                  </button>
                </div>
              </div>

              {/* Pillar 4 Container Summary */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/25 transition-all flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="bg-cyan-500/10 text-cyan-400 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-md border border-[#06b6d4]/10 font-mono">
                      Pilar 4
                    </span>
                    <Printer size={16} className="text-cyan-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-md mt-3">Prototipagem & 3D B2B</h3>
                  <p className="text-slate-400 text-xs mt-1 leading-snug">
                    Cases físicos customizados de ESP32 e peças de reposição rápidas de altíssima margem de engenharia.
                  </p>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">Investimento Inicial</span>
                    <span className="text-sm font-bold text-white font-mono">1 Impressora B2B</span>
                  </div>
                  <button 
                    onClick={() => setActiveSection("3d")}
                    className="text-[10px] text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer flex items-center gap-1 transition-all"
                  >
                    Gerenciar Projetos <ArrowRight size={12} />
                  </button>
                </div>
              </div>

            </div>

            {/* Split Screen Grid: Interactive Roadmap Overview & Embedded AI Voice */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Interactive Roadmap Checkers */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4">
                    <h3 className="font-display font-bold text-white text-sm flex items-center gap-2">
                      <Calendar size={16} className="text-amber-400" />
                      Linha de Chegada de 90 Dias
                    </h3>
                    <span className="text-xs text-amber-400 font-mono font-bold">
                      {roadmapProgress.toFixed(0)}% Feito
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs mb-4">
                    Estes são os marcos críticos de curto prazo para estruturar suas operações de forma sequencial. Clique nos itens à medida que concluir:
                  </p>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {tasks.map((task) => (
                      <div 
                        key={task.id}
                        onClick={() => {
                          setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
                        }}
                        className={`p-3 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
                          task.completed 
                            ? "bg-slate-950/40 border-slate-850 text-slate-500 line-through opacity-70"
                            : "bg-slate-950 border-slate-800 hover:border-slate-750 text-white"
                        }`}
                      >
                        <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          task.month === 1 ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                          task.month === 2 ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}>
                          Mês {task.month}
                        </span>
                        
                        <div className="text-xs text-left shrink-1">
                          <p className={`font-semibold ${task.completed ? "text-slate-500" : "text-slate-200"}`}>{task.title}</p>
                          <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{task.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-850/60 text-right">
                  <button
                    onClick={() => setActiveSection("roadmap")}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer inline-flex items-center gap-1 transition-all"
                  >
                    Acessar Checklist Completo <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right Column: Embedded Gemini AI Advisor Side Panel */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <GeminiChat />
              </div>

            </div>

            {/* Architecture Details Infographics Block */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-display font-semibold text-white text-md mb-4 flex items-center gap-2">
                <Cpu size={18} className="text-blue-400" />
                Diferencial Competitivo: Arquitetura @mnésia_Lab's APPs & Force Safe ioT Mobile Security
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                
                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1.5 text-left">
                  <div className="bg-blue-500/10 text-blue-400 w-8 h-8 rounded-lg flex items-center justify-center border border-blue-500/20 mb-2">
                    <Smartphone size={16} />
                  </div>
                  <h4 className="font-bold text-white font-display">Técnico no Campo</h4>
                  <p className="text-slate-400 text-[10px] leading-relaxed">
                    Carrega um hardware robusto ESP32 recarregável por USB-C com bateria integrada e antena celular SIM810 (2G/3G/4G).
                  </p>
                </div>

                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1.5 text-left">
                  <div className="bg-emerald-500/10 text-emerald-400 w-8 h-8 rounded-lg flex items-center justify-center border border-emerald-500/20 mb-2">
                    <Radio size={16} />
                  </div>
                  <h4 className="font-bold text-white font-display">Check-in por Geofence</h4>
                  <p className="text-slate-400 text-[10px] leading-relaxed">
                    A antena GPS e o beacon Bluetooth embutido detectam quando o técnico entra no raio de 30m do local da Ordem de Serviço de forma automatizada.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1.5 text-left">
                  <div className="bg-purple-500/10 text-purple-400 w-8 h-8 rounded-lg flex items-center justify-center border border-purple-500/20 mb-2">
                    <Bot size={16} />
                  </div>
                  <h4 className="font-bold text-white font-display">IA (Gemini) no Core</h4>
                  <p className="text-slate-400 text-[10px] leading-relaxed">
                    Analisa picos de sinal celular, tensões baixas de baterias do hardware remoto e faz sumários inteligentes das atividades de atendimento de campo.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1.5 text-left">
                  <div className="bg-amber-500/10 text-amber-400 w-8 h-8 rounded-lg flex items-center justify-center border border-amber-500/20 mb-2">
                    <FileCode size={16} />
                  </div>
                  <h4 className="font-bold text-white font-display">Software Licenciável</h4>
                  <p className="text-slate-400 text-[10px] leading-relaxed">
                    Desenvolvido como SaaS multilocatário B2B, permitindo cobrar assinatura recorrente por técnico monitorado mais venda direta do hardware (plug & play).
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* Section Strategic Plan / Diagnostics */}
        {activeSection === "strategy" && (
          <StrategicPlan />
        )}

        {/* Section Pillar 1 - Services */}
        {activeSection === "services" && (
          <PillarServices contracts={contracts} setContracts={setContracts} />
        )}

        {/* Section Pillar 2 - MVP SaaS IoT */}
        {activeSection === "saas" && (
          <PillarSaaS saasClients={saasClients} setSaasClients={setSaasClients} />
        )}

        {/* Section Pillar 3 - Content & Lead Orgânico */}
        {activeSection === "content" && (
          <PillarContent ideas={ideas} setIdeas={setIdeas} />
        )}

        {/* Section Pillar 4 - B2B 3D Printing & Prototyping */}
        {activeSection === "3d" && (
          <Pillar3D />
        )}

        {/* Section Roadmap 90 days */}
        {activeSection === "roadmap" && (
          <Roadmap90Days tasks={tasks} setTasks={setTasks} />
        )}

      </main>

      {/* Elegant minimalist footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 @mnésia_Lab's APPs & Force Safe ioT Mobile Security. Todos os direitos reservados. Foco obsessivo em faturamento B2B.</p>
          <div className="flex gap-4 font-mono text-[10px]">
            <span>ESP32 Tracker v1.2</span>
            <span>·</span>
            <span>Gemini AI Engine Ativo</span>
            <span>·</span>
            <span>MEI Simples Nacional pronto</span>
          </div>
        </div>
      </footer>

      {/* Interactive AI Presentation Assistant */}
      <ClientAssistant />

    </div>
  );
}
