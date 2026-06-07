import React, { useState, useEffect, useRef } from "react";
import { 
  Bot, 
  X, 
  Send, 
  ExternalLink, 
  Sparkles, 
  HelpCircle, 
  Loader2, 
  BookOpen,
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { ChatMessage } from "../types";

export default function ClientAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Ready-to-click client questions for presentation
  const clientQuestions = [
    { label: "O que é um MVP?", short: "O que é um MVP e por que focar nele primeiro?" },
    { label: "O que é ESP32?", short: "Explique o que é o microcontrolador ESP32 de forma simples." },
    { label: "Como lucrar com 3D?", short: "Como gerar alto lucro com apenas uma impressora 3D?" },
    { label: "O que é Ordem de Serviço IoT?", short: "O que é ordem de serviço inteligente baseada em Geofence?" },
    { label: "O que é SaaS B2B?", short: "O que significa SaaS B2B e por que cobrar mensalidade?" },
    { label: "Como a IA ajuda aqui?", short: "De que maneira a Inteligência Artificial é usada neste app?" }
  ];

  useEffect(() => {
    // Initial friendly greeting tailored for distant clients or prospective partners
    setMessages([
      {
        id: "client-welcome",
        role: "assistant",
        content: "Olá! Seja muito bem-vindo à apresentação do **@mnésia_Lab's & Force Safe IoT**.\n\nSou o **Assistente Virtual Interativo**. Meu papel é traduzir termos técnicos, detalhar funções dos painéis e esclarecer dúvidas de forma simples e direta.\n\nFique à vontade para clicar em uma pergunta rápida abaixo ou digitar sua dúvida técnica directly!",
        timestamp: new Date().toLocaleTimeString("pt-BR")
      }
    ]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: "client-usr-" + Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString("pt-BR")
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Build discussion memory with model expectations (user vs model conversion)
      const chatHistory = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const sysInstruction = 
        "Você é o Assistente Virtual Oficial da plataforma de negócios corporativos do @mnésia_Lab's APPs & Force Safe IoT. " +
        "Seu público-alvo são CLIENTES E PARCEIROS COMERCIAIS que participam de reuniões e apresentações remotas. " +
        "Explique cada termo técnico (como MVP, ESP32, SaaS B2B, IoT, firmware, DIN, prototipagem 3D, radar de vulnerabilidade) e funções descritas nos painéis de forma curta, simplificada, didática e de fácil compreensão para leigos (evite jargão denso, use português amigável).\n\n" +
        "Regra crítica de integração: No final de TODA resposta, ajude o cliente a expandir o conhecimento gerando um termo de pesquisa correspondente à resposta. Escreva sempre na última linha exatamente o bloco: '[TERMO: Nome do Termo Principal]' (exemplo: '[TERMO: O que é MVP no desenvolvimento]' ou '[TERMO: Como funciona o ESP32]'). Isso gerará um botão interativo para o usuário. Diga isso de forma humilde.";

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: chatHistory,
          systemInstruction: sysInstruction
        })
      });

      if (!res.ok) {
        throw new Error("Não foi possível conectar ao motor de IA.");
      }

      const data = await res.json();

      const assistantMsg: ChatMessage = {
        id: "client-ai-" + Date.now(),
        role: "assistant",
        content: data.text,
        timestamp: new Date().toLocaleTimeString("pt-BR")
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const assistantMsg: ChatMessage = {
        id: "client-ai-err-" + Date.now(),
        role: "assistant",
        content: "Desculpe pelo transtorno técnico! Posso simplificar o tema para você: um **MVP (Minimo Produto Viável)** é a versão mais simples e rápida de um produto físico ou digital que serve para testar a utilidade real com clientes, sem gastar rios de dinheiro no início. \n\n[TERMO: O que é conceito de MVP]",
        timestamp: new Date().toLocaleTimeString("pt-BR")
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  };

  // Parsing helper to extract '[TERMO: XYZ]' and return both clean text and the match
  const parseTermFromMessage = (content: string) => {
    const regex = /\[TERMO:\s*(.*?)\]/i;
    const match = content.match(regex);
    if (match) {
      const termExtracted = match[1].replace(/\]$/, "").trim();
      // Remove tag from original text
      const cleanText = content.replace(regex, "").trim();
      return { cleanText, termExtracted };
    }
    return { cleanText: content, termExtracted: null };
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-left">
      
      {/* Floating pulsing toggle trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer group transition-all duration-300 transform hover:scale-105 active:scale-95 border border-cyan-400/40"
          id="client-ai-floating-trigger"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          
          <Bot size={18} className="text-white group-hover:rotate-12 transition-transform" />
          <span className="text-[12px] font-bold tracking-tight pr-1 font-mono">Dúvidas Técnicas?</span>
        </button>
      )}

      {/* Expanded Interactive AI Overlay Panel */}
      {isOpen && (
        <div 
          className="bg-slate-950/98 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl w-[360px] sm:w-[420px] h-[580px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
          id="client-assistant-panel"
        >
          {/* Panel Top Header Bar */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-4 border-b border-slate-850 flex justify-between items-center">
            <div className="flex items-center gap-2.5">
              <div className="bg-cyan-500/10 text-cyan-400 p-2 rounded-xl border border-cyan-500/15">
                <Bot size={18} className="animate-pulse" />
              </div>
              <div>
                <h4 className="text-[11.5px] font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
                  Mnésia Lab Assistente Virtual
                </h4>
                <p className="text-[9.5px] text-cyan-300">Explicações fáceis para Clientes e Leads</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          {/* Interactive Core Chat Stream Area */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none bg-slate-950/40"
          >
            {messages.map((m) => {
              const { cleanText, termExtracted } = parseTermFromMessage(m.content);

              return (
                <div 
                  key={m.id}
                  className={`flex gap-2.5 max-w-[85%] ${
                    m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div className={`shrink-0 w-6.5 h-6.5 rounded-lg flex items-center justify-center text-[10px] font-bold p-1 ${
                    m.role === "user" 
                      ? "bg-cyan-600 text-white" 
                      : "bg-slate-900 text-slate-300 border border-slate-800"
                  }`}>
                    {m.role === "user" ? "VC" : "IA"}
                  </div>

                  <div className="space-y-2">
                    <div className={`p-3 rounded-2xl text-[11.5px] leading-relaxed text-left ${
                      m.role === "user"
                        ? "bg-cyan-650/20 text-cyan-200 border border-cyan-500/20 rounded-tr-none"
                        : "bg-slate-900/90 text-slate-300 border border-slate-850 rounded-tl-none whitespace-pre-wrap font-sans"
                    }`}>
                      {cleanText}
                      
                      <span className="block text-[7.5px] text-slate-500 font-mono text-right mt-1">
                        {m.timestamp}
                      </span>
                    </div>

                    {/* Highly polished 'Saber mais' button using dynamic search query extracted context */}
                    {m.role === "assistant" && termExtracted && (
                      <div className="flex justify-start">
                        <a 
                          href={`https://www.google.com/search?q=${encodeURIComponent(termExtracted)}`}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-500/20 hover:border-cyan-500/40 px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-sm hover:shadow-cyan-500/5 hover:-translate-y-0.5 active:translate-y-0 text-left font-mono"
                        >
                          <BookOpen size={11} /> 
                          Saber mais sobre {termExtracted}
                          <ExternalLink size={10} className="opacity-80" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-2.5 mr-auto max-w-[85%]">
                <div className="shrink-0 w-6.5 h-6.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <Loader2 size={12} className="text-cyan-400 animate-spin" />
                </div>
                <div className="p-3 text-[11px] text-slate-400 bg-slate-900/50 border border-slate-850 rounded-2xl rounded-tl-none font-mono">
                  Buscando definição objetiva...
                </div>
              </div>
            )}
          </div>

          {/* Preset Buttons Board */}
          <div className="p-3 border-t border-slate-900 bg-slate-950/90 space-y-2">
            <span className="text-[8.5px] text-slate-500 uppercase tracking-wider font-bold block flex items-center gap-1 font-mono">
              <Sparkles size={10} className="text-amber-400" /> Perguntas frequentes do Pitch (Clique p/ IA responder):
            </span>
            
            <div className="grid grid-cols-2 gap-1.5 max-h-[140px] overflow-y-auto scrollbar-none pb-1">
              {clientQuestions.map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(q.short)}
                  disabled={loading}
                  className="bg-slate-900/80 hover:bg-slate-850 text-slate-350 hover:text-white border border-slate-850 rounded-lg py-1.5 px-2 text-[10px] text-left transition-all truncate hover:border-cyan-500/30 cursor-pointer flex items-center justify-between"
                  title={q.short}
                >
                  <span className="truncate pr-1">{q.label}</span>
                  <ArrowRight size={8} className="opacity-50 shrink-0 text-cyan-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Form and Input Text Submission Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="p-3 border-t border-slate-850 flex gap-2 bg-slate-950"
          >
            <input
              type="text"
              placeholder="Digite sua dúvida (ex: O que é Geolocalização?)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="flex-1 bg-slate-900 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-850 text-white px-3.2 rounded-xl transition-all flex items-center justify-center cursor-pointer disabled:text-slate-600"
            >
              <Send size={13} />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
