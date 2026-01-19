const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// CORS - permite peticiones desde cualquier origen
app.use(cors());
app.use(express.json());

// Configurar OpenAI con la clave del servidor
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Endpoint de salud
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Servidor de Erick AI funcionando 🧠✨',
    version: '1.0.0'
  });
});

// Endpoint principal del chat
app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'Se requiere un array de mensajes' 
      });
    }

    // Verificar que la API key está configurada
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'API key no configurada en el servidor' 
      });
    }

    // Llamada a OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.8, // Un poco más de creatividad para respuestas más naturales
      max_tokens: 500,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    // Devolver la respuesta al frontend
    res.json(completion);

  } catch (error) {
    console.error('Error en OpenAI:', error);
    
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ 
        error: 'API key inválida' 
      });
    }
    
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({ 
        error: 'Cuota de API agotada' 
      });
    }

    res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

app.listen(port, () => {
  console.log(`🧠 Servidor de Erick AI corriendo en puerto ${port}`);
  console.log(`📡 Listo para recibir mensajes`);
});
