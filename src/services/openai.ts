import { ChatMessage } from '../types';

// URL del backend
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const sendMessageToOpenAI = async (
  messages: ChatMessage[]
): Promise<string> => {
  try {
    const apiMessages = messages.map(({ role, content }) => ({ role, content }));

    console.log('Enviando mensaje al backend:', BACKEND_URL);

    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: apiMessages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error del servidor: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('La respuesta del servidor no contenía un mensaje válido');
    }

    return aiResponse;

  } catch (error) {
    console.error('Error al comunicarse con el backend:', error);
    throw error;
  }
};

export const validateApiKey = async (): Promise<boolean> => {
  return true; 
};
