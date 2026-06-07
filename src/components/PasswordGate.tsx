import React, { useState } from "react";
import { ShieldCheck, ShieldX, KeyRound, ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";

interface PasswordGateProps {
  onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get stored password, defaults to 'panico' if not set
    const currentPass = localStorage.getItem("mnesia_gate_password") || "panico";
    
    if (password === currentPass) {
      setErrorStatus(false);
      onUnlock();
    } else {
      setErrorStatus(true);
      setPassword("");
      // Flash error status for 2 seconds
      setTimeout(() => {
        setErrorStatus(false);
      }, 2500);
    }
  };

  return (
    <div 
      id="password-gate-lock-container"
      className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 transition-opacity duration-500 select-none pb-12 px-4"
    >
      {/* Background vector elements to lock the aesthetic */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,#090d16_0,#020617_100%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-md w-full text-center space-y-6 z-10">
        
        {/* Security Crest Header */}
        <div className="flex flex-col items-center space-y-3">
          <div className={`p-4 rounded-full border-2 transition-all duration-300 ${
            errorStatus 
              ? "bg-rose-500/15 border-rose-500 text-rose-500 animate-bounce" 
              : "bg-slate-900 border-slate-800 text-stone-400"
          }`}>
            {errorStatus ? <ShieldX size={36} /> : <LockKeyhole size={36} />}
          </div>
          
          <div className="space-y-1">
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#06b6d4] bg-cyan-950/40 border border-cyan-800/35 px-2 py-0.5 rounded-full">
              Force Safe Security Active
            </span>
            <h2 className="font-display text-2xl font-black text-white tracking-tight">
              Acesso Restrito
            </h2>
            <p className="text-slate-400 text-xs max-w-xs mx-auto">
              Digite a chave de criptografia master para destravar a micro-incubadora @mnésia_Lab's.
            </p>
          </div>
        </div>

        {/* Input Gate Form */}
        <form 
          id="password-gate-form"
          onSubmit={handleSubmit} 
          className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 shadow-2xl backdrop-blur-sm space-y-4 text-left"
        >
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase font-bold text-slate-500 flex justify-between items-center">
              <span>Senha de Liberação</span>
            </label>
            
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <KeyRound size={16} />
              </span>
              
              <input
                type={showPassword ? "text" : "password"}
                autoFocus
                placeholder="Insira a chave..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-slate-950/80 border rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${
                  errorStatus 
                    ? "border-rose-500 ring-1 ring-rose-500/20" 
                    : "border-slate-800 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-350 cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            id="btn-submeter-chave-senha"
            className={`w-full py-3 px-4 rounded-xl text-xs uppercase font-mono font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              errorStatus 
                ? "bg-rose-600 text-white" 
                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/10"
            }`}
          >
            {errorStatus ? (
              <>Chave Inválida. Tente Novamente</>
            ) : (
              <>
                Acessar Incubadora <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Footnote instruction */}
        <div className="text-[10px] text-slate-500 font-mono flex items-center justify-center gap-1.5 leading-none">
          <ShieldCheck size={12} className="text-emerald-500" />
          <span>A senha padrão pode ser alterada no menu superior interno.</span>
        </div>

      </div>
    </div>
  );
}
