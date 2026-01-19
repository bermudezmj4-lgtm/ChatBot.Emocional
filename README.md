# Erick AI - Tu Amigo Virtual de Confianza 🧠

Chatbot de apoyo emocional con inteligencia artificial, desarrollado con React + TypeScript + Tailwind CSS.

## 🚀 Demo

[Ver demo en vivo](#) _(añade tu URL aquí)_

## ✨ Características

- 💬 Conversaciones naturales y empáticas
- 🧠 Respuestas inteligentes con OpenAI GPT-4
- 😊 Detección de emociones
- ⚠️ Sistema de alertas para situaciones de crisis
- 📱 Diseño responsive
- 🔒 API Key segura en backend

## 🛠️ Tecnologías

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- Vite

**Backend:**
- Node.js
- Express
- OpenAI API

## 📦 Instalación Local

### Frontend

```bash
# Clonar repositorio
git clone https://github.com/TU_USUARIO/erick-ai.git
cd erick-ai

# Instalar dependencias
npm install

# Configurar variable de entorno
echo "VITE_BACKEND_URL=http://localhost:3001" > .env

# Ejecutar en desarrollo
npm run dev
```

### Backend

```bash
# Ir a la carpeta del servidor
cd server

# Instalar dependencias
npm install

# Configurar variable de entorno
echo "OPENAI_API_KEY=tu-api-key-aqui" > .env

# Ejecutar servidor
npm start
```

## 🌐 Despliegue

### Frontend (Netlify/Vercel)

1. Conecta tu repositorio de GitHub
2. Configura la variable: `VITE_BACKEND_URL=https://tu-backend.onrender.com`
3. Build command: `npm run build`
4. Publish directory: `dist`

### Backend (Render)

1. Crea un nuevo Web Service en Render
2. Conecta el repositorio y selecciona la carpeta `server`
3. Configura la variable: `OPENAI_API_KEY=tu-api-key`
4. Build command: `npm install`
5. Start command: `npm start`

## 📁 Estructura del Proyecto

```
erick-ai/
├── src/
│   ├── components/      # Componentes React
│   ├── hooks/           # Custom hooks
│   ├── services/        # Servicios (API)
│   ├── utils/           # Utilidades
│   ├── types/           # Tipos TypeScript
│   ├── App.tsx          # Componente principal
│   └── main.tsx         # Punto de entrada
├── server/              # Backend Node.js
│   ├── index.js         # Servidor Express
│   └── package.json     # Dependencias del servidor
├── public/              # Archivos estáticos
└── package.json         # Dependencias del frontend
```

## ⚠️ Aviso Importante

Este chatbot es solo para apoyo emocional básico y **NO sustituye la ayuda profesional**. Si estás en crisis, por favor contacta:

- 🇲🇽 México: 800 290 0024
- 🇪🇸 España: 024
- 🇦🇷 Argentina: (011) 5275-1135
- 🇨🇴 Colombia: 106

## 👨‍💻 Desarrollado con ❤️ y AI por AI MJBJ

---

⭐ Si te gustó el proyecto, ¡dale una estrella!
