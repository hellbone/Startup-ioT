import React, { useState } from "react";
import { 
  Video, 
  Sparkles, 
  Plus, 
  Trash2, 
  Layers, 
  TrendingUp, 
  Lightbulb, 
  Tv, 
  Send, 
  Loader2,
  Copy,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { ContentIdea } from "../types";

interface PillarContentProps {
  ideas: ContentIdea[];
  setIdeas: React.Dispatch<React.SetStateAction<ContentIdea[]>>;
}

export default function PillarContent({ ideas, setIdeas }: PillarContentProps) {
  // New Idea form
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState<ContentIdea["platform"]>("YouTube");
  const [category, setCategory] = useState<ContentIdea["category"]>("ESP32");
  const [scriptPrompt, setScriptPrompt] = useState("");

  // AI Script Generator state
  const [generatingScript, setGeneratingScript] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");
  const [errorScript, setErrorScript] = useState("");
  const [selectedIdeaForScript, setSelectedIdeaForScript] = useState<ContentIdea | null>(null);

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Estimate leads based on platform & category
    let estimatedLeads = 15;
    if (platform === "TikTok" || platform === "Instagram") {
      estimatedLeads = Math.floor(Math.random() * 40) + 10;
    } else if (platform === "YouTube") {
      estimatedLeads = Math.floor(Math.random() * 80) + 30;
    } else if (platform === "LinkedIn") {
      estimatedLeads = Math.floor(Math.random() * 60) + 20;
    }

    const newIdea: ContentIdea = {
      id: Math.random().toString(36).substr(2, 9),
      title: title.trim(),
      platform,
      category,
      status: "Ideia",
      estimatedLeads,
      scriptPrompt: scriptPrompt.trim() || `Roteiro prático mostrando eletrônica com ${category} integrada a software`
    };

    setIdeas((prev) => [...prev, newIdea]);
    setTitle("");
    setScriptPrompt("");
  };

  const handleDeleteIdea = (id: string) => {
    setIdeas((prev) => prev.filter((i) => i.id !== id));
    if (selectedIdeaForScript?.id === id) {
      setSelectedIdeaForScript(null);
      setGeneratedScript("");
    }
  };

  const handleToggleStatus = (id: string) => {
    setIdeas((prev) => prev.map((i) => {
      if (i.id === id) {
        const nextStatus: ContentIdea["status"] = 
          i.status === "Ideia" ? "Roteiro" : 
          i.status === "Roteiro" ? "Gravado" : 
          i.status === "Gravado" ? "Publicado" : "Ideia";
        return { ...i, status: nextStatus };
      }
      return i;
    }));
  };

  const handleGenerateScript = async (idea: ContentIdea) => {
    setSelectedIdeaForScript(idea);
    setGeneratingScript(true);
    setErrorScript("");
    setGeneratedScript("");

    const payloadPrompt = `
      Crie um roteiro de vídeo altamente engajador, persuasivo e educativo focado em programadores, entusiastas de hardware e tomadores de decisão corporativa.
      
      Detalhes do Conteúdo:
      - Título: "${idea.title}"
      - Plataforma de Destino: ${idea.platform} (otimize a linguagem para esta plataforma!)
      - Categoria Principal: ${idea.category}
      - Instruções Extras: ${idea.scriptPrompt}

      O roteiro de vídeo deve conter de forma estruturada:
      1. Gancho de atenção (os primeiros 5 segundos).
      2. O Problema comum vivido no campo / operações.
      3. A Solução prática estruturada com @mnésia_Lab's APPs & Force Safe ioT Mobile Security ou com tecnologia ${idea.category} conectada a software.
      4. Chamada de Ação (CTA) clara direcionando para o site ou para soluções SaaS.

      Gere uma resposta em português bem estruturada em Markdown, usando termos de alta conversão, energia técnica e direto ao ponto.
    `;

    try {
      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: payloadPrompt,
          systemInstruction: "Você é um Copywriter Sênior de Tecnologia, especializado em roteiros virais e didáticos sobre eletrônica, IoT (ESP32/Arduino) e SaaS B2B."
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Erro ao consultar a API.");
      }

      const data = await res.json();
      setGeneratedScript(data.text);
      
      // Upgrade state automatically to "Roteiro"
      setIdeas((prev) => prev.map((i) => {
        if (i.id === idea.id && i.status === "Ideia") {
          return { ...i, status: "Roteiro" };
        }
        return i;
      }));

    } catch (err: any) {
      console.error("Erro ao gerar roteiro:", err);
      setErrorScript(err.message || "Não foi possível conectar ao servidor para gerar o roteiro.");
    } finally {
      setGeneratingScript(false);
    }
  };

  const leadsPotenciais = ideas
    .filter((i) => i.status === "Publicado")
    .reduce((acc, curr) => acc + curr.estimatedLeads, 0);

  return (
    <div className="space-y-6">
      {/* Title block */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 text-purple-500 font-bold text-7xl select-none uppercase font-display pointer-events-none">
          Pilar 3
        </div>
        <div className="relative z-10">
          <span className="text-xs font-semibold bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full border border-purple-500/20">
            Máquina de Vendas 24 Horas
          </span>
          <h2 className="font-display text-2xl font-bold text-white mt-3">Pilar 3: Conteúdo Estratégico & Aquisição Orgânica</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-2xl">
            Produza vídeos focados em <strong className="text-white">ESP32, Arduino, Automação Corporativa e IA</strong>. No início, cada vídeo vira novos leads qualificados e atua como seu vendedor gratuito 24 horas por dia.
          </p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-purple-500/10 text-purple-400 p-3 rounded-xl border border-purple-500/20">
            <Video size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold font-display">Ideias Clave</span>
            <p className="text-2xl font-bold text-white font-mono">{ideas.length} Planejadas</p>
            <p className="text-[10px] text-slate-400">
              {ideas.filter(i => i.status === "Publicado").length} vídeos de alta conversão publicados
            </p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-pink-500/10 text-pink-400 p-3 rounded-xl border border-pink-500/20">
            <TrendingUp size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold font-display">Estimação de Leads</span>
            <p className="text-2xl font-bold text-white font-mono">+{leadsPotenciais} Leads/mês</p>
            <p className="text-[10px] text-slate-400">Calculado a partir de vídeos ativos com status "Publicado"</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
          <div className="bg-amber-500/10 text-amber-400 p-3 rounded-xl border border-amber-500/20">
            <Lightbulb size={24} />
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold font-display">Tópicos Quentes</span>
            <p className="text-2xl font-bold text-white font-mono">ESP32 + IA</p>
            <p className="text-[10px] text-slate-400">Nicho valioso e com quase zero concorrência nacional</p>
          </div>
        </div>
      </div>

      {/* Grid: Left - Editorial Board Planner, Right - Idea Creator/Scriptor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Editorial Board List */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="font-display font-semibold text-white text-md mb-4 flex items-center gap-2">
            <Tv size={18} className="text-purple-400" />
            Calendário de Conteúdo / Funil Editorial
          </h3>

          <div className="space-y-3">
            {ideas.length === 0 ? (
              <p className="text-slate-500 text-xs py-8 text-center bg-slate-950/40 rounded-xl border border-slate-805/40">
                Nenhum tema no calendário. Crie um tema ao lado para iniciar seu planejamento de posts.
              </p>
            ) : (
              ideas.map((idea) => (
                <div 
                  key={idea.id} 
                  className={`p-3.5 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                    selectedIdeaForScript?.id === idea.id 
                      ? "bg-purple-950/25 border-purple-500/50 shadow-md"
                      : "bg-slate-950/70 border-slate-850 hover:border-slate-800"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-md font-bold tracking-wider ${
                        idea.platform === "YouTube" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                        idea.platform === "TikTok" ? "bg-black text-slate-300 border border-slate-850" :
                        idea.platform === "Instagram" ? "bg-pink-500/10 text-pink-400 border border-pink-500/20" :
                        "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {idea.platform}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        #{idea.category}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-white leading-snug">{idea.title}</h4>
                    <p className="text-[10px] text-slate-500 font-mono">
                      CTA sugerido: {idea.scriptPrompt.length > 50 ? `${idea.scriptPrompt.substring(0, 50)}...` : idea.scriptPrompt}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center">
                    {/* Status badge toggler */}
                    <button
                      onClick={() => handleToggleStatus(idea.id)}
                      className={`text-[9px] font-mono font-bold px-2.5 py-1 rounded-full border cursor-pointer select-none transition-all ${
                        idea.status === "Publicado" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                        idea.status === "Gravado" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                        idea.status === "Roteiro" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                        "bg-slate-800 text-slate-400 border-slate-750"
                      }`}
                    >
                      {idea.status}
                    </button>

                    {/* Generate Script Action Button */}
                    <button
                      onClick={() => handleGenerateScript(idea)}
                      title="Gerar roteiro com IA"
                      className="bg-purple-600/10 hover:bg-purple-600 hover:text-white border border-purple-500/20 text-purple-400 p-2 rounded-lg text-[10px] font-bold font-mono py-1.5 px-2.5 cursor-pointer flex items-center gap-1 transition-all"
                    >
                      <Sparkles size={11} className="animate-pulse" />
                      Roteirizar
                    </button>

                    {/* Delete item */}
                    <button
                      onClick={() => handleDeleteIdea(idea.id)}
                      className="text-slate-600 hover:text-red-400 rounded p-1 hover:bg-slate-900 cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Content Planner / Creation Form */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-white text-md mb-4 flex items-center gap-2">
              <Plus size={18} className="text-purple-400" />
              Adicionar Novo Tema / Idea
            </h3>

            <form onSubmit={handleAddIdea} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Título Engajador do Vídeo</label>
                <input
                  type="text"
                  placeholder="Ex: Como fazer o ESP32 fazer check-in de mecânicos por GPS e 4G"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white placeholder-slate-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Mídia de Foco</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as ContentIdea["platform"])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  >
                    <option value="YouTube">YouTube (Long/Tech)</option>
                    <option value="LinkedIn">LinkedIn (Networking/Lead)</option>
                    <option value="TikTok">TikTok (Short/Viral)</option>
                    <option value="Instagram">Instagram (Reels/Status)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Assunto / Pilar</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ContentIdea["category"])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  >
                    <option value="ESP32">ESP32 & Conectividade</option>
                    <option value="Arduino">Arduino & Sensores</option>
                    <option value="Automação">Automação de Sistemas</option>
                    <option value="IA">Inteligência Artificial (Gemini)</option>
                    <option value="SaaS">Modelo SaaS B2B</option>
                    <option value="Empreendedorismo">Dicas Técnicas / Carreira</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Instruções para o roteiro IA / CTA</label>
                <textarea
                  placeholder="Ex: Mostrar código de envio de dados HTTP Post e convidar para o @mnésia_Lab's APPs & Force Safe ioT Mobile Security."
                  value={scriptPrompt}
                  onChange={(e) => setScriptPrompt(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white h-14 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 rounded-lg transition-all cursor-pointer shadow-lg shadow-purple-600/15"
              >
                Planejar no Meu Funil
              </button>
            </form>
          </div>

          <div className="mt-4 p-3 bg-purple-950/10 border border-purple-500/10 rounded-xl">
            <h4 className="text-white text-[11px] font-bold mb-1 flex items-center gap-1">
              💡 Por que produzir conteúdo diariamente?
            </h4>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              O conteúdo atua como um vendedor gratuito que educa sua audiência corporativa, constrói sua reputação técnica diferenciada nacionalmente e gera leads diretos para os serviços de alta margem de engenharia de software e hardware IoT.
            </p>
          </div>
        </div>

      </div>

      {/* AI Output Script Section */}
      {(generatingScript || generatedScript || errorScript) && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 transition-all">
          <div className="flex justify-between items-center border-b border-slate-850 pb-3 mb-3">
            <div>
              <span className="text-xs font-mono font-semibold text-white flex items-center gap-1.5">
                <Sparkles size={14} className="text-purple-400" />
                Roteiro de Vídeo Automatizado com Gemini AI
              </span>
              {selectedIdeaForScript && (
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                  Vídeo planejado: <strong className="text-slate-300">"{selectedIdeaForScript.title}"</strong>
                </p>
              )}
            </div>
            {generatedScript && (
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(generatedScript);
                  alert("Roteiro copiado!");
                }}
                className="bg-slate-950 hover:bg-slate-850 text-[10px] font-mono font-semibold text-slate-300 p-1.5 rounded border border-slate-800 transition-all flex items-center gap-1 cursor-pointer"
              >
                <Copy size={11} /> Copiar Roteiro
              </button>
            )}
          </div>

          {generatingScript ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 size={32} className="text-purple-500 animate-spin" />
              <p className="text-xs text-slate-400 font-mono">Processando com Gemini para formatar o melhor gancho e roteiro...</p>
            </div>
          ) : errorScript ? (
            <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-xl text-red-400 text-xs text-left">
              <AlertTriangle size={16} className="inline mr-2" />
              {errorScript}
            </div>
          ) : (
            <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl text-left">
              <div className="markdown-body font-sans text-xs text-slate-300 whitespace-pre-line leading-relaxed max-h-80 overflow-y-auto">
                {generatedScript}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
