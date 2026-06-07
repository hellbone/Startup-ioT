import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini if key exists
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// API Route 1: Gemini Assistant Chat (Dynamic Conversations)
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages, systemInstruction } = req.body;
    if (!process.env.GEMINI_API_KEY || !ai) {
      return res.status(400).json({ 
        error: "Chave do Gemini (GEMINI_API_KEY) não configurada nos Segredos do AI Studio." 
      });
    }

    // Format messages correctly for the SDK (roles 'user' and 'model')
    const formattedContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction || "Você é o co-fundador técnico de Ricardo. Ajude-o a focar no faturamento recorrente, produtos baseados em ESP32/IoT + IA e serviços de desenvolvimento de código de software corporativo. Seja prático, direto, em português, incentivando-o a gerar caixa rápido.",
        temperature: 0.7,
      }
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Erro na API do Gemini:", error);
    return res.status(500).json({ error: error.message || "Erro interno do servidor." });
  }
});

// API Route 2: Generate Content (Roteiros, Relatórios, etc.)
app.post("/api/gemini/generate", async (req, res) => {
  try {
    const { prompt, systemInstruction } = req.body;
    if (!process.env.GEMINI_API_KEY || !ai) {
      return res.status(400).json({ 
        error: "Chave do Gemini (GEMINI_API_KEY) não configurada nos Segredos do AI Studio." 
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "Você é um gerador de código, relatórios e roteiros de conteúdo especializado em IoT, IA e Software Corporativo. Responda em português.",
        temperature: 0.3,
      }
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Erro na rota de geração:", error);
    return res.status(500).json({ error: error.message || "Erro interno do servidor." });
  }
});

export default app;
