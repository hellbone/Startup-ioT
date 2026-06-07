export interface ClientContract {
  id: string;
  clientName: string;
  serviceType: "Desenvolvimento" | "Mobile App" | "Integração" | "IoT" | "Automação IA";
  monthlyValue: number;
  status: "prosp" | "negoc" | "ativo" | "concluido";
  startDate?: string;
  description: string;
}

export interface FieldTechnician {
  id: string;
  name: string;
  role: string;
  status: "online" | "offline" | "em_atendimento";
  lastCheckIn: string;
  lat: number;
  lng: number;
  battery: number;
  signal_3g4g: "Excelente" | "Bom" | "Regular" | "Fraco";
  activeTask?: string;
}

export interface IoTTelemetry {
  timestamp: string;
  deviceId: string;
  technicianId: string;
  rssi: number; // Signal strength
  lat: number;
  lng: number;
  batteryVoltage: number; // e.g. 3.7V - 4.2V
  checkInStatus: "Automatic" | "Manual" | "Warning";
  event: string;
}

export interface ContentIdea {
  id: string;
  title: string;
  platform: "YouTube" | "TikTok" | "Instagram" | "LinkedIn";
  category: "ESP32" | "Arduino" | "Automação" | "IA" | "SaaS" | "Empreendedorismo";
  status: "Ideia" | "Roteiro" | "Gravado" | "Publicado";
  estimatedLeads: number;
  scriptPrompt: string;
}

export interface RoadmapTask {
  id: string;
  month: 1 | 2 | 3;
  category: "Serviços" | "SaaS" | "Conteúdo" | "Estrutura";
  title: string;
  description: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
