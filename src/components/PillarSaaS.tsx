import React, { useState, useEffect, useRef } from "react";
import { 
  Radio, 
  MapPin, 
  Cpu, 
  Zap, 
  Sparkles, 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  Loader2,
  Copy,
  Download,
  Calculator,
  Percent,
  TrendingUp,
  Coins,
  Wrench,
  Info
} from "lucide-react";
import { FieldTechnician, IoTTelemetry } from "../types";

interface PillarSaaSProps {
  saasClients: number;
  setSaasClients: React.Dispatch<React.SetStateAction<number>>;
}

export default function PillarSaaS({ saasClients, setSaasClients }: PillarSaaSProps) {
  // Field Technicians State
  const [technicians, setTechnicians] = useState<FieldTechnician[]>([
    {
      id: "TECH-01",
      name: "Carlos Silveira",
      role: "Técnico de Subestações",
      status: "online",
      lastCheckIn: "09:30:15",
      lat: -23.551,
      lng: -46.634,
      battery: 88,
      signal_3g4g: "Excelente",
      activeTask: "Inspeção de Trafo T-4"
    },
    {
      id: "TECH-02",
      name: "Eduardo Santos",
      role: "Instalador de Banda Larga",
      status: "em_atendimento",
      lastCheckIn: "09:42:10",
      lat: -23.556,
      lng: -46.640,
      battery: 42,
      signal_3g4g: "Regular",
      activeTask: "Ativação Cliente GPON"
    },
    {
      id: "TECH-03",
      name: "Sandra de Souza",
      role: "Manutenção Preventiva de IoT",
      status: "online",
      lastCheckIn: "09:48:02",
      lat: -23.548,
      lng: -46.628,
      battery: 95,
      signal_3g4g: "Bom",
      activeTask: "Troca de Célula fotoelétrica"
    }
  ]);

  // Telemetry logs stream state
  const [logs, setLogs] = useState<IoTTelemetry[]>([
    {
      timestamp: "09:48:02",
      deviceId: "ESP32-GPS-8F4C",
      technicianId: "TECH-03",
      rssi: -65,
      lat: -23.5482,
      lng: -46.6285,
      batteryVoltage: 4.12,
      checkInStatus: "Automatic",
      event: "Check-in automático em raio de 25m da Ordem de Serviço #883"
    },
    {
      timestamp: "09:42:10",
      deviceId: "ESP32-GPS-2A1B",
      technicianId: "TECH-02",
      rssi: -82,
      lat: -23.5561,
      lng: -46.6402,
      batteryVoltage: 3.65,
      checkInStatus: "Manual",
      event: "Check-in manual realizado pelo técnico (Sinal Fraco)"
    },
    {
      timestamp: "09:30:15",
      deviceId: "ESP32-GPS-9D2E",
      technicianId: "TECH-01",
      rssi: -52,
      lat: -23.5515,
      lng: -46.6341,
      batteryVoltage: 4.02,
      checkInStatus: "Automatic",
      event: "Dispositivo inicializado, sinal GPS fixado (9 satélites)"
    }
  ]);

  const [simulating, setSimulating] = useState(false);
  const [aiReport, setAiReport] = useState("");
  const [generatingReport, setGeneratingReport] = useState(false);
  const [errorReport, setErrorReport] = useState("");

  // Hardware ROI Simulator State
  const [numDevices, setNumDevices] = useState<number>(() => {
    const cached = localStorage.getItem("rtl_roi_devices");
    return cached ? Number(cached) : 50;
  });
  const [hardwareModel, setHardwareModel] = useState<"venda" | "as_a_service">(() => {
    const cached = localStorage.getItem("rtl_roi_model");
    return (cached as "venda" | "as_a_service") || "as_a_service";
  });
  const [maintenancePerDevice, setMaintenancePerDevice] = useState<number>(() => {
    const cached = localStorage.getItem("rtl_roi_maintenance");
    return cached ? Number(cached) : 15;
  });
  const [hardwareCostOneTime, setHardwareCostOneTime] = useState<number>(() => {
    const cached = localStorage.getItem("rtl_roi_build_cost");
    return cached ? Number(cached) : 120;
  });
  const [hardwareUpfrontPrice, setHardwareUpfrontPrice] = useState<number>(() => {
    const cached = localStorage.getItem("rtl_roi_upfront_price");
    return cached ? Number(cached) : 299;
  });

  // LocalStorage support
  useEffect(() => {
    localStorage.setItem("rtl_roi_devices", numDevices.toString());
  }, [numDevices]);

  useEffect(() => {
    localStorage.setItem("rtl_roi_model", hardwareModel);
  }, [hardwareModel]);

  useEffect(() => {
    localStorage.setItem("rtl_roi_maintenance", maintenancePerDevice.toString());
  }, [maintenancePerDevice]);

  useEffect(() => {
    localStorage.setItem("rtl_roi_build_cost", hardwareCostOneTime.toString());
  }, [hardwareCostOneTime]);

  useEffect(() => {
    localStorage.setItem("rtl_roi_upfront_price", hardwareUpfrontPrice.toString());
  }, [hardwareUpfrontPrice]);

  // Calculations
  const totalBuildCost = numDevices * hardwareCostOneTime;
  const totalUpfrontRevenue = hardwareModel === "venda" ? numDevices * hardwareUpfrontPrice : 0;
  const initialNetOutflow = totalBuildCost - totalUpfrontRevenue; 

  const monthlySaaSRevenue = numDevices * 99; // Licença do software R$ 99/mês
  const monthlyLeaseRevenue = hardwareModel === "as_a_service" ? numDevices * 35 : 0; // Locação do hardware R$ 35/mês
  const totalMonthlyMRR = monthlySaaSRevenue + monthlyLeaseRevenue;
  const totalMonthlyCost = numDevices * maintenancePerDevice;
  const netMonthlyProfit = totalMonthlyMRR - totalMonthlyCost;

  // Payback period
  const paybackPeriodMonths = initialNetOutflow <= 0 
    ? 0 
    : netMonthlyProfit > 0 
      ? Number((initialNetOutflow / netMonthlyProfit).toFixed(1))
      : 999;

  // Auto incremental subscription simulator
  useEffect(() => {
    const timer = setInterval(() => {
      // randomly adjust subscription count to simulate growth
      setSaasClients(prev => {
        const change = Math.random() > 0.65 ? 1 : 0;
        return Math.min(100, Math.max(10, prev + change));
      });
    }, 15000);
    return () => clearInterval(timer);
  }, [setSaasClients]);

  // Simulate incoming real-time telemetry event from ESP32
  const handleTriggerTelemetry = () => {
    setSimulating(true);
    const radTech = technicians[Math.floor(Math.random() * technicians.length)];
    
    // Slight jitter in coordinates to simulate tracking movement code
    const isNewCheckin = Math.random() > 0.4;
    const offsetLat = (Math.random() - 0.5) * 0.005;
    const offsetLng = (Math.random() - 0.5) * 0.005;
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString("pt-BR");

    const newLog: IoTTelemetry = {
      timestamp: timeStr,
      deviceId: `ESP32-GPS-${Math.random().toString(36).substring(7, 11).toUpperCase()}`,
      technicianId: radTech.id,
      rssi: Math.floor(Math.random() * -40) - 50,
      lat: Number((radTech.lat + offsetLat).toFixed(4)),
      lng: Number((radTech.lng + offsetLng).toFixed(4)),
      batteryVoltage: Number((3.5 + Math.random() * 0.7).toFixed(2)),
      checkInStatus: isNewCheckin ? "Automatic" : "Manual",
      event: isNewCheckin 
        ? `Gatilho de Proximidade (ESP32 Bluetooth beacon detectou OS #${Math.floor(Math.random() * 400 + 400)})`
        : `Botão SOS/Destaque pressionado pelo técnico [Bateria: ${radTech.battery}%]`
    };

    // Update technician in map
    setTechnicians(prev => prev.map(t => {
      if (t.id === radTech.id) {
        return {
          ...t,
          lat: newLog.lat,
          lng: newLog.lng,
          lastCheckIn: timeStr,
          battery: Math.max(3, t.battery - Math.floor(Math.random() * 4)),
          status: Math.random() > 0.5 ? "em_atendimento" : "online"
        };
      }
      return t;
    }));

    setTimeout(() => {
      setLogs(prev => [newLog, ...prev.slice(0, 8)]);
      setSimulating(false);
    }, 800);
  };

  // Generate Report with actual server-side Gemini API
  const handleGenerateAIReport = async () => {
    setGeneratingReport(true);
    setErrorReport("");
    setAiReport("");

    const payloadPrompt = `
      Considere o seguinte log de telemetria em tempo real recebido de rastreadores ESP32 (equipados com modem 3G/4G e GPS) operados por técnicos de campo:
      
      ${JSON.stringify(logs, null, 2)}
      
      Você é a inteligência integrada ao @mnésia_Lab's APPs & Force Safe ioT Mobile Security (SaaS FieldSmart IoT + IA). Escreva um Relatório de Operações de Campo Técnico executivo contendo:
      1. Resumo executivo da conformidade de check-in automático (Quantos automáticos vs manuais).
      2. Diagnóstico de rede e sinal (análise de RSSI: -50 a -70 dBm excelente/bom, -70 a -85 regular, menor que -85 fraco).
      3. Alertas de manutenção preventiva de hardware (quais baterias estão baixas, ou tensões abaixo de 3.7V precisam de recarga imediata ou troca).
      4. Recomendação corporativa acionável para o gestor operacional baseando-se nesses logs atuais.

      Retorne em português brasileiro claro, elegante, formatado em excelente Markdown, com tom profissional e focado em valor empresarial para o cliente final do software.
    `;

    try {
      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: payloadPrompt, 
          systemInstruction: "Você é um consultor operacional especialista em IoT estruturais, redes móveis e eficiência logística de campo." 
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Operação mal sucedida");
      }

      const data = await res.json();
      setAiReport(data.text);
    } catch (err: any) {
      console.error("Erro ao gerar relatório AI:", err);
      setErrorReport(err.message || "Não foi possível conectar com o modelo Gemini. Verifique se configurou a API_KEY.");
    } finally {
      setGeneratingReport(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiReport);
    alert("Copiado com sucesso!");
  };

  return (
    <div className="space-y-6">
      {/* Title block */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-emerald-500 font-bold text-7xl select-none uppercase font-display pointer-events-none">
          Pilar 2
        </div>
        <div className="relative z-10">
          <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
            Ativo Escalável SaaS + IoT + IA
          </span>
          <h2 className="font-display text-2xl font-bold text-white mt-3">Pilar 2: Simulador do Produto SaaS (FieldSmart IoT)</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            A oportunidade mais promissora do blueprint: <strong className="text-white">SaaS + IoT + IA</strong>. Um sistema para prestadores de serviços externos munidos de <strong className="text-white">rastreadores ESP32 inteligentes</strong>, com check-in automatizado por raio geográfico e relatórios gerados por inteligência artificial.
          </p>
        </div>
      </div>

      {/* Subscription Pricing Simulator Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-semibold text-lg text-white">Faturamento de Assinatura Recorrente</h3>
            <p className="text-slate-400 text-xs">Simule o faturamento conforme as metas de crescimento do micro-SaaS</p>
          </div>
          <div className="bg-slate-950 px-4 py-3 border border-slate-800 rounded-xl flex items-center gap-6">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold">Assinantes Ativos</span>
              <p className="text-xl font-bold font-mono text-emerald-400">{saasClients} / 100</p>
            </div>
            <div className="h-8 w-px bg-slate-850"></div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold">MRR Estimado (R$ 99/mês)</span>
              <p className="text-xl font-bold font-mono text-white">R$ {(saasClients * 99).toLocaleString("pt-BR")},00/mês</p>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <label className="block text-slate-400 text-xs font-semibold flex justify-between">
            <span>Aumentar Assinantes Simulado</span>
            <span className="text-slate-200">{saasClients} empresas</span>
          </label>
          <input
            type="range"
            min="10"
            max="100"
            step="1"
            value={saasClients}
            onChange={(e) => setSaasClients(Number(e.target.value))}
            className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>10 Clientes (Ponto de Equilíbrio)</span>
            <span>Meta Principal (100 Clientes) = R$ 9.900/mês</span>
          </div>
        </div>
      </div>

      {/* ROI Simulation Component for IoT Hardware */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden" id="iot-roi-simulator">
        <div className="absolute top-0 right-0 bg-emerald-500/5 w-64 h-64 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-850 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 text-emerald-400 w-10 h-10 rounded-xl flex items-center justify-center border border-emerald-500/20">
              <Calculator size={18} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-base text-white">Simulador de ROI de Hardware & Lucro Líquido IoT</h3>
              <p className="text-slate-400 text-xs">Simulador avançado do Pilar 2: Projete margens do produto físico, frete/fabricação e recorrente</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2.5 py-0.5 rounded-full select-none shrink-0 self-start md:self-auto">
            Hardware B2B Projections v2.0
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Interactive Inputs */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Input 1: Devices Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold flex items-center gap-1.5 font-sans">
                  <Cpu size={14} className="text-emerald-400" /> Número de Dispositivos Implantados
                </span>
                <span className="text-emerald-400 font-mono font-bold bg-slate-950 px-2.5 py-1 rounded border border-slate-850">
                  {numDevices} rastreadores
                </span>
              </div>
              <input
                id="roi-input-devices"
                type="range"
                min="5"
                max="500"
                step="5"
                value={numDevices}
                onChange={(e) => setNumDevices(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg cursor-pointer accent-emerald-500 bg-slate-850"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>5 (Contato Piloto)</span>
                <span>150 (Escala Operacional)</span>
                <span>500 (Grande Frota B2B)</span>
              </div>
            </div>

            {/* Input 2: Business Model selection */}
            <div className="space-y-2">
              <label className="block text-slate-400 text-xs font-semibold font-sans">
                Modelo de Cobrança B2B (Estratégia)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  id="roi-btn-haas"
                  type="button"
                  onClick={() => setHardwareModel("as_a_service")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    hardwareModel === "as_a_service"
                      ? "bg-emerald-500/10 border-emerald-500 text-white shadow-md"
                      : "bg-slate-950 border-slate-850 hover:border-slate-800 text-slate-400"
                  }`}
                >
                  <p className="text-xs font-bold font-display flex items-center gap-1.5">
                    <TrendingUp size={12} className="text-emerald-400" />
                    HaaS (Leasing)
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug font-sans">
                    R$ 0 de taxa inicial para o cliente. Você aluga o rastreador por <strong className="text-white">R$ 35/mês</strong> extra mais <strong className="text-white">R$ 99/mês</strong> de SaaS. MRR total: R$ 134/mês.
                  </p>
                </button>
                <button
                  id="roi-btn-venda"
                  type="button"
                  onClick={() => setHardwareModel("venda")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    hardwareModel === "venda"
                      ? "bg-emerald-500/10 border-emerald-500 text-white shadow-md"
                      : "bg-slate-950 border-slate-850 hover:border-slate-800 text-slate-400"
                  }`}
                >
                  <p className="text-xs font-bold font-display flex items-center gap-1.5">
                    <Coins size={12} className="text-amber-400" />
                    Venda Direta de Hardware
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug font-sans">
                    O cliente paga <strong className="text-white">R$ {hardwareUpfrontPrice}</strong> por dispositivo no setup. Assinatura regular de <strong className="text-white">R$ 99/mês</strong> por técnico.
                  </p>
                </button>
              </div>
            </div>

            {/* Sub-inputs box for manufacturer settings */}
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 border-b border-slate-900 pb-2 font-sans">
                <Wrench size={14} className="text-blue-400" />
                <span>Configurações Técnicas de Custo</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                {/* Cost to manufacture a single unit (pieces) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>Componentes de Hardware por Unidade</span>
                    <span className="font-mono text-white font-bold">R$ {hardwareCostOneTime},00</span>
                  </div>
                  <input
                    id="roi-input-build-cost"
                    type="range"
                    min="60"
                    max="220"
                    step="5"
                    value={hardwareCostOneTime}
                    onChange={(e) => setHardwareCostOneTime(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg cursor-pointer accent-blue-500 bg-slate-800"
                  />
                  <span className="text-[9px] text-slate-500 font-mono italic">ESP32 + Módulo Celular + Placa + Caixa</span>
                </div>

                {/* Monthly eSIM data traffic and server overhead per unit */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>Operação Mensal (eSIM + Nuvem) por tracker</span>
                    <span className="font-mono text-white font-bold">R$ {maintenancePerDevice},00</span>
                  </div>
                  <input
                    id="roi-input-maintenance"
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={maintenancePerDevice}
                    onChange={(e) => setMaintenancePerDevice(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg cursor-pointer accent-blue-500 bg-slate-800"
                  />
                  <span className="text-[9px] text-slate-500 font-mono italic">Plano M2M multi-operadora e conexões AWS/GCP</span>
                </div>
              </div>

              {hardwareModel === "venda" && (
                <div className="space-y-1.5 pt-2 border-t border-slate-900 font-sans">
                  <div className="flex justify-between items-center text-[11px] text-slate-400">
                    <span>Preço de Venda Praticado (Upfront Unitário)</span>
                    <span className="font-mono text-emerald-400 font-bold">R$ {hardwareUpfrontPrice},00</span>
                  </div>
                  <input
                    id="roi-input-upfront"
                    type="range"
                    min="150"
                    max="500"
                    step="10"
                    value={hardwareUpfrontPrice}
                    onChange={(e) => setHardwareUpfrontPrice(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg cursor-pointer accent-emerald-500 bg-slate-800"
                  />
                  <div className="flex justify-between text-[9px] text-slate-500">
                    <span>Custo: R$ {hardwareCostOneTime}</span>
                    <span className="font-semibold text-slate-300">Margem por Equipamento: R$ {hardwareUpfrontPrice - hardwareCostOneTime} ({(((hardwareUpfrontPrice - hardwareCostOneTime) / hardwareUpfrontPrice) * 100).toFixed(0)}%)</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Calculations & Projections */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-850 p-5 rounded-xl flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <span className="text-[9px] uppercase font-bold tracking-widest bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                Projeções Financeiras Reais
              </span>

              {/* Monthly MRR */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-black block font-sans">Faturamento Recorrente Mensal (MRR)</span>
                <p className="text-3xl font-extrabold font-mono text-white tracking-tight">
                  R$ {totalMonthlyMRR.toLocaleString("pt-BR")},00
                </p>
                <div className="grid grid-cols-2 gap-1 text-[10px] text-slate-400 pt-1 font-sans">
                  <div>Licença SaaS: <strong className="text-slate-200 font-mono">R$ {monthlySaaSRevenue.toLocaleString("pt-BR")}</strong></div>
                  {hardwareModel === "as_a_service" && (
                    <div>Locação HaaS: <strong className="text-blue-400 font-mono">R$ {monthlyLeaseRevenue.toLocaleString("pt-BR")}</strong></div>
                  )}
                </div>
              </div>

              <div className="h-px bg-slate-900"></div>

              {/* Monthly Costs */}
              <div className="flex justify-between items-center text-xs font-sans">
                <span className="text-slate-400 font-semibold">Custo de Operação Mensal ({numDevices} eSIMs)</span>
                <span className="font-mono text-red-400 font-bold">- R$ {totalMonthlyCost.toLocaleString("pt-BR")},00</span>
              </div>

              {/* Net Profit Box */}
              <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex justify-between items-center">
                <div className="font-sans">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Lucro Líquido Operacional</span>
                  <span className="text-xl font-bold font-mono text-emerald-400 tracking-tight">R$ {netMonthlyProfit.toLocaleString("pt-BR")},00</span>
                  <span className="text-[9px] text-slate-500 block">Faturamento recorrente limpo</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block font-sans">Margem de Lucro</span>
                  <span className="inline-block mt-0.5 bg-emerald-500/10 text-emerald-400 text-xs font-black px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                    {totalMonthlyMRR > 0 ? ((netMonthlyProfit / totalMonthlyMRR) * 100).toFixed(0) : 0}%
                  </span>
                </div>
              </div>

              {/* Comparative progress bar metric */}
              {totalMonthlyMRR > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                    <span>Custos ({((totalMonthlyCost / totalMonthlyMRR) * 100).toFixed(0)}%)</span>
                    <span>Retorno Operacional ({((netMonthlyProfit / totalMonthlyMRR) * 100).toFixed(0)}%)</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-red-500 transition-all duration-300" 
                      style={{ width: `${(totalMonthlyCost / totalMonthlyMRR) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-emerald-400 transition-all duration-300 flex-1"
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Payback math */}
            <div className="border-t border-slate-900 pt-4 space-y-3 font-sans">
              <div className="grid grid-cols-2 gap-2 text-left">
                <div className="bg-slate-900 p-2 border border-slate-850 rounded-lg">
                  <span className="text-[9px] text-slate-500 uppercase font-bold block">Investimento Placas</span>
                  <p className="text-xs font-bold font-mono text-slate-300">R$ {totalBuildCost.toLocaleString("pt-BR")},00</p>
                </div>
                <div className="bg-slate-900 p-2 border border-slate-850 rounded-lg">
                  <span className="text-[9px] text-slate-500 uppercase font-bold block">Setup Pago (Upfront)</span>
                  <p className="text-xs font-bold font-mono text-slate-300">R$ {totalUpfrontRevenue.toLocaleString("pt-BR")},00</p>
                </div>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center gap-2.5">
                <Coins size={14} className="text-amber-400 shrink-0" />
                <div className="text-xs text-left">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Tempo de Payback Estimado</span>
                  <div className="text-slate-100 font-semibold">
                    {hardwareModel === "venda" && totalUpfrontRevenue >= totalBuildCost ? (
                      <span className="text-emerald-400 font-extrabold flex items-center gap-1">
                        Imediato! Setup cobre custos e gera R$ {totalUpfrontRevenue - totalBuildCost} de caixa inicial
                      </span>
                    ) : netMonthlyProfit <= 0 ? (
                      <span className="text-red-400">Prejuízo mensal — ajuste plano eSIM ou quantidade</span>
                    ) : (
                      <span>
                        Retorno em <strong className="text-amber-400 font-mono text-sm">{paybackPeriodMonths}</strong> {paybackPeriodMonths === 1 ? "mês" : "meses"}{" "}
                        <span className="text-slate-500 font-normal">com lucro do recorrente</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Interactive Core: Grid Map + ESP32 Live Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Simulated Web Map of Field Technicians */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-white text-sm mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin size={16} className="text-emerald-400" />
                Mapa de Rastreamento Remoto (GPS ESP32 SIM800L)
              </span>
              <span className="text-[10px] text-slate-500 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                Mock GPS Centro de SP
              </span>
            </h3>

            {/* Simulated Grid City Plotting */}
            <div className="bg-slate-950 border border-slate-850 h-64 rounded-xl relative overflow-hidden flex items-center justify-center glow-border">
              {/* grid pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-40"></div>
              
              {/* Central base landmark */}
              <div className="absolute flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white font-bold">HQ</div>
                </div>
                <span className="text-[8px] text-blue-400 font-mono mt-1 opacity-70">Sede @mnésia_Lab's APPs</span>
              </div>

              {/* Plotted technicians on GPS map */}
              {technicians.map((t) => {
                // Determine relative pixels coordinates on our 2D grid based on lat/lng offsets around SP Center (-23.55, -46.63)
                const latDiff = t.lat - (-23.551);
                const lngDiff = t.lng - (-46.634);
                // scaling offsets
                const left = 50 + (lngDiff * 5000);
                const top = 50 - (latDiff * 5000);

                return (
                  <div 
                    key={t.id} 
                    className="absolute transition-all duration-700 ease-out flex items-center gap-2"
                    style={{ left: `${Math.min(90, Math.max(10, left))}%`, top: `${Math.min(90, Math.max(10, top))}%` }}
                  >
                    <div className="relative group/marker">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg border text-[10px] font-bold cursor-pointer ${
                        t.status === "em_atendimento" 
                          ? "bg-amber-500 text-slate-950 border-amber-300 shadow-amber-500/20" 
                          : "bg-emerald-500 text-slate-950 border-emerald-300 shadow-emerald-500/20"
                      }`}>
                        {t.id.split("-")[1]}
                      </div>
                      {/* Pulse rings */}
                      <span className={`absolute -inset-1 rounded-full animate-ping opacity-25 pointer-events-none ${
                        t.status === "em_atendimento" ? "bg-amber-400" : "bg-emerald-400"
                      }`}></span>

                      {/* Info bubble on hover */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-850 p-2 rounded-lg text-[10px] shadow-xl w-32 hidden group-hover/marker:block z-10">
                        <p className="font-bold text-white">{t.name}</p>
                        <p className="text-slate-400">{t.activeTask}</p>
                        <p className="text-[8px] text-slate-500 font-mono font-semibold">GPS: {t.lat}, {t.lng}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {technicians.map((t) => (
              <div key={t.id} className="bg-slate-950 border border-slate-850 rounded-xl p-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white text-xs">{t.name}</h4>
                    <span className={`w-2 h-2 rounded-full ${t.status === "em_atendimento" ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`}></span>
                  </div>
                  <p className="text-slate-500 text-[10px]">{t.role}</p>
                  <p className="text-slate-300 text-[10px] font-bold mt-1 max-w-[150px] truncate">⚙️ {t.activeTask}</p>
                </div>
                <div className="flex justify-between items-center text-[9px] text-slate-400 pt-2 border-t border-slate-900 mt-2 font-mono">
                  <span>🔋 {t.battery}%</span>
                  <span>📶 {t.signal_3g4g}</span>
                  <span>🕒 {t.lastCheckIn}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live ESP32 Serial Communications + AI Reporting */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* ESP32 Logging Terminal */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col flex-1 shadow-inner glow-border">
            <div className="flex justify-between items-center mb-2.5">
              <span className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
                <Terminal size={14} className="text-emerald-500" />
                ESP32 SIM800L Serial Monitor
              </span>
              <button 
                onClick={handleTriggerTelemetry}
                disabled={simulating}
                className="bg-slate-900 border border-emerald-500/20 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 font-mono text-[9px] px-2 py-1 rounded transition-all cursor-pointer flex items-center gap-1"
              >
                {simulating ? <Loader2 size={10} className="animate-spin" /> : <Play size={10} />}
                Simular Evento
              </button>
            </div>

            {/* Terminal screen */}
            <div className="bg-black/90 rounded-lg p-3 font-mono text-[9.5px] leading-relaxed text-slate-300 overflow-y-auto h-48 scrollbar-none flex flex-col-reverse border border-slate-900">
              {logs.map((log, index) => (
                <div key={index} className="border-b border-slate-900/60 pb-1.5 pt-0.5 last:border-0">
                  <span className="text-slate-500">[{log.timestamp}]</span>{" "}
                  <span className="text-emerald-500 font-bold">{log.deviceId}</span>{" "}
                  <span className="bg-slate-900 px-1 py-0.5 rounded text-slate-400 text-[8px] font-bold">{log.checkInStatus}</span>{" "}
                  <span className="text-blue-400 font-semibold">{log.technicianId}</span>
                  <p className="text-slate-400 pl-10 mt-0.5">» {log.event}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Automated Report Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="font-display font-semibold text-white text-xs mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-emerald-400" />
              Geração de Relatório de Campo por IA
            </h3>
            <p className="text-slate-400 text-[11px] mb-3 leading-relaxed">
              Consolide os logs telemetry automáticos de proximidade dos ESP32 usando o Gemini para gerar um PDF ou sumário de faturamento operacional de alto nível.
            </p>

            <button
              onClick={handleGenerateAIReport}
              disabled={generatingReport}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/15"
            >
              {generatingReport ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Compilando Telemetria...
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Compilar Logs com Gemini AI
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* AI Output Result Box */}
      {(aiReport || errorReport || generatingReport) && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 mt-4 transition-all">
          <div className="flex justify-between items-center border-b border-slate-850 pb-3 mb-3">
            <span className="text-xs font-mono font-semibold text-white flex items-center gap-1.5">
              <Sparkles size={14} className="text-emerald-400" />
              Resultado da Integração SaaS + IoT + IA
            </span>
            {aiReport && (
              <div className="flex gap-2">
                <button 
                  onClick={copyToClipboard}
                  className="bg-slate-950 hover:bg-slate-800 text-[10px] font-mono font-semibold text-slate-300 p-1.5 rounded border border-slate-800 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Copy size={11} /> Copiar
                </button>
              </div>
            )}
          </div>

          {generatingReport ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
              <Loader2 size={32} className="text-emerald-500 animate-spin" />
              <p className="text-xs text-slate-400 font-mono">Processando logs da ESP32-GPS no servidor @mnésia_Lab's APPs & Force Safe ioT Mobile Security...</p>
            </div>
          ) : errorReport ? (
            <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-xl text-red-400 text-xs text-left">
              <AlertTriangle size={16} className="inline mr-2" />
              {errorReport}
            </div>
          ) : (
            <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl text-left">
              <div className="markdown-body font-sans text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-72 overflow-y-auto">
                {aiReport}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
