# 🚀 Guía de Despliegue en Render (Backend Privado)

Has tomado la decisión correcta al separar tu Backend (servidor) de tu Frontend (React). Esto mantiene tu API Key de OpenAI segura.

## Paso 1: Subir el Backend a Render

1. Crea un **nuevo repositorio en GitHub** solo para el backend (puedes subir la carpeta `server` o todo el proyecto).
2. Ve a [dashboard.render.com](https://dashboard.render.com) y crea una cuenta.
3. Haz clic en **"New +"** y selecciona **"Web Service"**.
4. Conecta tu repositorio de GitHub.
5. Configura el servicio:
   - **Name:** `emo-chat-backend` (o lo que quieras)
   - **Root Directory:** `server` (¡Importante! Si tu backend está en esa carpeta)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
6. **¡MUY IMPORTANTE!** Ve a la sección "Environment Variables" (Variables de Entorno) y añade:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-proj-xxxx...` (Tu clave real de OpenAI)
7. Haz clic en **Create Web Service**.

Render te dará una URL parecida a: `https://emo-chat-backend-xyz.onrender.com`. **Copia esta URL.**

## Paso 2: Conectar el Frontend con el Backend

Ahora tienes que decirle a tu aplicación React dónde está el servidor.

1. En tu proyecto de React (localmente), crea un archivo `.env` en la raíz (si no existe) y añade:
   ```
   VITE_BACKEND_URL=https://emo-chat-backend-xyz.onrender.com
   ```
   (Reemplaza con TU URL de Render real).

2. Si vas a subir el frontend a **Netlify** o **Vercel**:
   - Ve a la configuración de tu sitio en Netlify/Vercel.
   - Busca "Environment Variables".
   - Añade la misma variable: `VITE_BACKEND_URL` con tu URL de Render.

## Paso 3: ¡Listo!

Ahora tu chat funciona así:
1. Usuario escribe en React.
2. React envía mensaje a Render.
3. Render añade la clave secreta y pregunta a OpenAI.
4. OpenAI responde a Render.
5. Render responde a React.

¡Tu clave nunca toca el navegador del usuario! 🔒
