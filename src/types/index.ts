// Definición de emociones
export type Emotion = 'tristeza' | 'alegria' | 'cansancio' | 'ansiedad' | 'estres' | 'frustracion' | 'neutral';
export type EmotionType = Emotion; // Alias para compatibilidad

// Roles en el chat
export type Role = 'system' | 'user' | 'assistant';
export type Sender = 'user' | 'bot'; // Legacy

// Estructura del mensaje
export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
  emotion?: Emotion;
  sender?: Sender; // Legacy: se mantiene para compatibilidad con componentes UI antiguos
}

export type Message = ChatMessage; // Alias para compatibilidad

// Estado del usuario
export interface UserState {
  name?: string;
  currentEmotion?: Emotion;
  crisisMode: boolean;
}

// Estado global del chat
export interface ChatState {
  messages: ChatMessage[];
  isTyping: boolean;
  userState: UserState;
}

// Configuración OpenAI
export interface OpenAIConfig {
  apiKey: string;
  useAI: boolean;
}

// Fases de la conversación (mapeo entre inglés/español para compatibilidad)
export type ConversationPhase = 
  | 'greeting' | 'inicio' 
  | 'exploration' | 'exploracion'
  | 'empathy' | 'respuesta_empatica'
  | 'advice' | 'recomendacion'
  | 'closing' | 'cierre';

// Análisis de emociones
export interface EmotionAnalysis {
  primary: Emotion;
  confidence: number;
  keywords: string[];
  intensity: 'low' | 'medium' | 'high';
  // Propiedades legacy/adicionales
  emotion?: Emotion; 
  isCrisis?: boolean;
}

// Respuesta del bot
export interface BotResponse {
  text: string;
  nextPhase: ConversationPhase;
  suggestions?: string[];
  // Propiedades legacy
  message?: string;
  showCrisisAlert?: boolean;
}

// Estado de la conversación (lógica interna)
export interface ConversationState {
  phase: ConversationPhase;
  history: Message[];
  lastEmotion?: Emotion;
  turnCount: number;
  // Propiedades legacy
  messageCount?: number;
  detectedEmotion?: Emotion;
  sessionStartTime?: Date;
}
