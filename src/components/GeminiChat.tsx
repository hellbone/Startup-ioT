import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Trash2, 
  Lightbulb, 
  Zap, 
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { ChatMessage } from "../types";

export default function GeminiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Suggested starter prompts
  const suggestions = [
    {
      label: "Primeiro contrato de R$ 2k",
      prompt: "Ricardo deseja prospectar clientes para o Pilar 1. Como ele pode conseguir o primeiro contrato de R$ 2.000 para desenvolvimento web/automação nos próximos 15 dias?"
    },
    {
      label: "Foco vs Multi-SaaS",
      prompt: "Estou me sentindo tentado a criar um ERP, um CRM e um produto de IA simultaneamente. Como posso manter o foco obsessivo em apenas um MVP de SaaS IoT para gerar receita recorrente real?"
    },
    {
      label: "Lista de Materiais ESP32 B2B",
      prompt: "Quais são os componentes físicos ideais (ESP32, Módulo cellular 4G/NB-IoT, GPS, gerenciador de bateria recarregável) para Ricardo desenvolver um protótipo físico profissional e de baixo custo?"
    },
    {
      label: "Estruturação de Vendas/CTA",
      prompt: "Como devo estruturar a chamada para ação dos meus vídeos de TikTok e YouTube para converter programadores e técnicos em leads corporativos qualificados?"
    }
  ];

  useEffect(() => {
    // Load introductory message on mount
    setMessages([
      {
        id: "intro",
        role: "assistant",
        content: "Olá Ricardo! Sou seu **Co-Founder Técnico e Estratégico** integrado. Meu papel é ajudar você a manter o foco obsessivo na geração imediata de caixa (Pilar 1 - Serviços) e na estruturação escalável do seu SaaS IoT + IA (Pilar 2), enquanto criamos sua máquina de conteúdo orgânico (Pilar 3).\n\nQual desafio técnico ou comercial do seu plano de 90 dias quer discutir agora?",
        timestamp: new Date().toLocaleTimeString("pt-BR")
      }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    setErrorText("");
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString("pt-BR")
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // prepare clean request payload matching Gemini route expectations in server.ts
      const chatHistory = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chatHistory,
          systemInstruction: "Você é o co-fundador técnico e consultor sênior de negócios de Ricardo. Você o orienta na micro-incubadora @mnésia_Lab's APPs & Force Safe ioT Mobile Security. Seja extremamente focado em execução prática, geração de caixa rápido por meio de prestação de serviços (Pilar 1) para financiar um único micro-SaaS IoT (Pilar 2) e funil de audiência no YouTube/TikTok (Pilar 3). Dê conselhos curtos, diretos na ferida, em português claro, motivadores de ação."
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Houve um erro no processamento.");
      }

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "assistant",
        content: data.text,
        timestamp: new Date().toLocaleTimeString("pt-BR")
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error("Erro na conversa do copiloto:", err);
      setErrorText(err.message || "Conexão de rede indisponível. Verifique a chave de API nos Segredos do AI Studio.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Deseja mesmo redefinir esta sessão de mentoria?")) {
      setMessages([
        {
          id: "intro-reset",
          role: "assistant",
          content: "Sessão reiniciada. O que vamos estruturar agora, Ricardo?",
          timestamp: new Date().toLocaleTimeString("pt-BR")
        }
      ]);
      setErrorText("");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[580px] overflow-hidden">
      
      {/* Header of Chat Widget */}
      <div className="bg-slate-950/80 px-5 py-4 border-b border-slate-800/80 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="bg-blue-500/10 text-blue-400 p-2 rounded-lg border border-blue-500/20">
            <Bot size={18} className="animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-xs flex items-center gap-1.5">
              Co-Founder AI (Voz Estratégica)
            </h3>
            <p className="text-[10px] text-emerald-400 font-mono">● Conselhos de Foco e Caixa Rápido</p>
          </div>
        </div>
        
        <button
          onClick={handleClearChat}
          className="text-slate-500 hover:text-red-400 p-1.5 rounded hover:bg-slate-900 transition-all cursor-pointer"
          title="Redefinir Mentoria"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none bg-slate-950/20">
        
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex gap-3 max-w-[85%] ${
              m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
            }`}
          >
            {/* Avatar icon */}
            <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border text-[11px] font-bold ${
              m.role === "user" 
                ? "bg-blue-600 text-white border-blue-500" 
                : "bg-slate-900 text-slate-300 border-slate-800"
            }`}>
              {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>

            <div className={`p-3.5 rounded-2xl text-xs leading-relaxed text-left ${
              m.role === "user"
                ? "bg-blue-600/15 text-blue-200 rounded-tr-none border border-blue-500/10"
                : "bg-slate-900 text-slate-300 rounded-tl-none border border-slate-800"
            }`}>
              <div className="markdown-body font-sans whitespace-pre-line">
                {m.content}
              </div>
              <span className="block text-[8px] text-slate-500 font-mono text-right mt-1.5">
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 mr-auto max-w-[85%]">
            <div className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center bg-slate-900 text-slate-300 border border-slate-800">
              <Bot size={14} />
            </div>
            <div className="p-3.5 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 flex items-center gap-2">
              <Loader2 size={14} className="text-blue-500 animate-spin" />
              <span className="text-[10px] text-slate-400 font-mono">O co-fundador está formulando retorno de negócios...</span>
            </div>
          </div>
        )}

        {errorText && (
          <div className="p-3.5 bg-red-950/25 border border-red-900/30 rounded-xl text-red-400 text-xs text-left flex gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <div>
              <p className="font-bold">Chave API Ausente ou Erro na Rede</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{errorText}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starters and Input controls wrapper */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-950/60 space-y-3">
        
        {/* Suggestion capsules */}
        {messages.length <= 2 && (
          <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto scrollbar-none pb-1">
            <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1">
              <Lightbulb size={11} className="text-amber-400" />
              Perguntas recomendadas do Plano:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(s.prompt)}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px] px-2.5 py-1.5 rounded-lg border border-slate-800 transition-all text-left cursor-pointer hover:border-blue-500/20 active:scale-95"
                >
                  💡 {s.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input submission form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            placeholder="Pergunte ao Co-founder (Ex: Como organizar o código ESP32?)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer disabled:text-slate-600"
          >
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
