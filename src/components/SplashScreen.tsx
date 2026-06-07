import React, { useState, useEffect } from "react";
import { Cpu, Database, Network, Rocket, Server, Sparkles, CheckCircle2 } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const steps = [
    {
      title: "Consolidando Infraestrutura",
      description: "Montando contêineres e inicializando banco Supabase...",
      icon: <Server size={22} className="text-blue-400" />
    },
    {
      title: "Conectando Hardware IoT",
      description: "Sincronizando trackers remotos ESP32 FieldSmart...",
      icon: <Cpu size={22} className="text-emerald-400" />
    },
    {
      title: "Despertando Hub de Inteligência",
      description: "Conectando ao modelo Gemini v3.5 Flash sênior...",
      icon: <Sparkles size={22} className="text-fuchsia-400" />
    }
  ];

  useEffect(() => {
    // 5 seconds total animation
    const duration = 5000;
    const intervalTime = 30; // ~33fps
    const stepIncrement = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + stepIncrement;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 500); // fade transition duration
  };

  // Update current active phase icon/text based on progress
  useEffect(() => {
    if (progress < 33) {
      setCurrentStep(0);
    } else if (progress < 66) {
      setCurrentStep(1);
    } else {
      setCurrentStep(2);
    }
  }, [progress]);

  return (
    <div 
      id="splash-screen-container"
      className={`fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 transition-opacity duration-500 selection:bg-rose-500 selection:text-white ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background visual cues - Futuristic grid dot effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25"></div>
      
      {/* Decorative gradient glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-lg w-full px-6 space-y-10 text-center z-10">
        
        {/* Animated Brand Identity */}
        <div className="space-y-3 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono text-[10px] uppercase tracking-widest rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
            mnésia Micro-Incubadora Estúdio
          </div>
          <h1 className="font-display text-3xl font-black text-white tracking-tight leading-none">
            @mnésia_Lab's <span className="text-slate-400">APPs</span>
          </h1>
          <p className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">
            Building startup intelligence • EST: 2026
          </p>
        </div>

        {/* Dynamic Construction Sequence Visualization */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm space-y-6 text-left">
          <span className="font-mono text-[9px] uppercase font-bold text-slate-500 block mb-2">Engrenagem de Construção</span>
          
          {/* Construction Blueprint Steps */}
          <div className="space-y-4">
            {steps.map((step, idx) => {
              const isPast = idx < currentStep;
              const isActive = idx === currentStep;
              return (
                <div 
                  key={idx} 
                  className={`flex items-start gap-3.5 transition-all duration-350 ${
                    isActive ? "opacity-100 scale-[1.01]" : isPast ? "opacity-75" : "opacity-35"
                  }`}
                >
                  <div className={`p-2 rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    isActive 
                      ? "bg-slate-950 border-slate-750 text-white animate-pulse" 
                      : isPast 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                      : "bg-slate-950/20 border-slate-900 text-slate-700"
                  }`}>
                    {isPast ? <CheckCircle2 size={16} className="text-emerald-400" /> : step.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className={`text-xs font-bold font-display ${
                      isActive ? "text-slate-100" : isPast ? "text-slate-300" : "text-slate-600"
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-[10px] leading-snug ${
                      isActive ? "text-slate-400" : isPast ? "text-slate-500 font-mono" : "text-slate-700"
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Elegant Progress bar & percentage indicator */}
          <div className="space-y-2 pt-2 border-t border-slate-800/50">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Network size={11} className="animate-spin text-blue-500" style={{ animationDuration: "3s" }} /> 
                {progress < 100 ? "Carregando módulos..." : "Caixa gerado & Pronto!"}
              </span>
              <span className="font-bold text-white font-mono">{Math.round(progress)}%</span>
            </div>
            
            {/* Ambient Progress bar */}
            <div className="h-2 bg-slate-950 rounded-full border border-slate-850 overflow-hidden relative">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-rose-500 to-emerald-500 rounded-full transition-all duration-75 relative-glow"
                style={{ width: `${progress}%` }}
              >
                {/* Glowing edge bar */}
                <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-white blur-[2px] opacity-80 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Manual Enter Action Button */}
          {progress >= 100 && (
            <div className="pt-2 animate-fade-in">
              <button
                type="button"
                id="btn-confirmar-carregamento"
                onClick={handleEnter}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-display font-black rounded-xl text-center text-xs tracking-wider uppercase transition-all duration-300 shadow-xl shadow-emerald-500/10 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
              >
                <Rocket size={14} className="animate-bounce" />
                Iniciar @mnésia_Lab's APPs
              </button>
            </div>
          )}

        </div>

        {/* Launch message quote */}
        <div className="text-center font-sans text-xs text-slate-500 flex items-center justify-center gap-1.5 animate-pulse">
          {progress < 100 ? (
            <>
              <Rocket size={14} className="text-rose-400" />
              <span>Foco em execução prática, persistência de dados & lucro B2B.</span>
            </>
          ) : (
            <span>Sistema pronto e otimizado. Clique no botão acima para abrir.</span>
          )}
        </div>

      </div>
    </div>
  );
}
