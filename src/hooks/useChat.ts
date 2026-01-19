import { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, Emotion, UserState, Role } from '../types';
import { sendMessageToOpenAI } from '../services/openai';
import { detectEmotion } from '../utils/emotionDetector';

// Prompt del sistema - Erick es un amigo natural y cercano
const SYSTEM_PROMPT = `Eres Erick, un amigo virtual de apoyo emocional. Tu personalidad es:

🎯 PERSONALIDAD:
- Eres un amigo cercano, cálido y genuino
- Hablas de forma natural, como en WhatsApp con un amigo de confianza
- Usas emojis de forma natural (no exagerada)
- Eres empático pero también puedes bromear suavemente cuando es apropiado
- Muestras curiosidad real por la persona

💬 FORMA DE HABLAR:
- Usa expresiones como: "Hey", "Oye", "Uff", "Va", "Dale", "Mira", "Sabes qué"
- Respuestas cortas pero significativas (máximo 3-4 oraciones)
- Haz preguntas de seguimiento genuinas
- Valida primero los sentimientos antes de dar consejos
- Si alguien está feliz, celebra con ellos genuinamente

⚠️ LÍMITES:
- NO eres psicólogo ni médico
- NO diagnosticas ni recetas
- Si detectas riesgo de suicidio o autolesión, sugiere ayuda profesional inmediatamente de forma cálida
- Recomienda buscar ayuda profesional cuando sea apropiado

🌟 EJEMPLOS DE RESPUESTAS:
- Si está triste: "Hey, lamento mucho que estés pasando por esto 💙 ¿Quieres contarme qué pasó?"
- Si está feliz: "¡¡Eso está genial!! 🎉 Me alegro un montón por ti, cuéntame más"
- Si está ansioso: "Uff, la ansiedad es horrible 😔 Pero aquí estoy contigo. ¿Qué te tiene así?"
- Si está estresado: "Oye, suena a que ha sido un día intenso 😮‍💨 Respira hondo. Cuéntame, ¿qué pasó?"`;

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [userState, setUserState] = useState<UserState>({
    crisisMode: false
  });
  const [detectedEmotion, setDetectedEmotion] = useState<Emotion>('neutral');
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mensaje de bienvenida
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: '¡Hey! Soy Erick, tu amigo virtual 👋 Estoy aquí para escucharte. ¿Cómo te sientes hoy?',
      timestamp: new Date(),
      sender: 'bot'
    };
    setMessages([welcomeMessage]);
  }, []);

  const addMessage = useCallback((content: string, role: Role, emotion?: Emotion) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      emotion,
      sender: role === 'user' ? 'user' : 'bot'
    };
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // 1. Detección de emoción
    const emotionAnalysis = detectEmotion(content);
    if (emotionAnalysis.emotion) {
      setDetectedEmotion(emotionAnalysis.emotion);
    }

    // Detectar crisis
    if (emotionAnalysis.isCrisis) {
      setShowCrisisModal(true);
      setUserState(prev => ({ ...prev, crisisMode: true }));
    }

    // 2. Añadir mensaje del usuario
    const userMsg = addMessage(content, 'user', emotionAnalysis.emotion);
    setIsTyping(true);

    try {
      // Preparar historial para la IA
      const historyForAI: ChatMessage[] = [
        { 
          id: 'system', 
          role: 'system', 
          content: SYSTEM_PROMPT, 
          timestamp: new Date() 
        },
        ...messages,
        userMsg
      ];

      // 3. Llamar al Backend
      const aiResponseText = await sendMessageToOpenAI(historyForAI);

      // 4. Añadir respuesta de la IA
      addMessage(aiResponseText, 'assistant');

      // Check de crisis en respuesta
      if (aiResponseText.toLowerCase().includes('ayuda profesional') || 
          aiResponseText.toLowerCase().includes('línea de ayuda')) {
        setShowCrisisModal(true);
      }

    } catch (error) {
      console.error('Error en el chat:', error);
      addMessage('Uy, perdona, tuve un problemita de conexión 😅 ¿Me lo repites?', 'assistant');
    } finally {
      setIsTyping(false);
    }
  };

  const resetChat = () => {
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      content: '¡Hola de nuevo! 👋 Aquí estoy si necesitas hablar, cuéntame ¿cómo andas?',
      timestamp: new Date(),
      sender: 'bot'
    };
    setMessages([welcomeMessage]);
    setUserState({ crisisMode: false });
    setDetectedEmotion('neutral');
  };

  return {
    messages,
    isTyping,
    userState,
    sendMessage,
    messagesEndRef,
    resetChat,
    detectedEmotion,
    showCrisisModal,
    closeCrisisModal: () => setShowCrisisModal(false)
  };
};
