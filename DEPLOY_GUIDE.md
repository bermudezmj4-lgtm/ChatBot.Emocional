# 🚀 Guía de Despliegue - Emo Chat

## Paso 1: Compilar el Proyecto

Primero, ejecuta este comando para generar los archivos de producción:

```bash
npm run build
```

Esto creará una carpeta `dist/` con todos los archivos optimizados.

---

## Opción 1: Servidor Tradicional (FTP/cPanel) 🖥️

### Pasos:

1. **Compila el proyecto** con `npm run build`

2. **Sube la carpeta `dist/`** a tu servidor usando:
   - FileZilla (FTP)
   - cPanel File Manager
   - SSH/SFTP

3. **Sube los archivos** a la carpeta `public_html/` o `www/` de tu servidor

4. **¡Listo!** Tu sitio estará en `https://tudominio.com`

### Estructura a subir:
```
public_html/
├── index.html
├── assets/
│   ├── index-xxxxx.js
│   └── index-xxxxx.css
└── vite.svg
```

---

## Opción 2: Netlify (GRATIS y Recomendado) ⚡

### Método A: Drag & Drop (Más fácil)

1. Ve a [netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra la carpeta `dist/` al navegador
3. ¡Listo! Te dará una URL como `https://random-name.netlify.app`

### Método B: Conectar con GitHub

1. Sube tu proyecto a GitHub
2. Ve a [netlify.com](https://netlify.com) y crea cuenta
3. Click en "Add new site" → "Import an existing project"
4. Conecta tu repositorio de GitHub
5. Configura:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click en "Deploy site"

### Dominio personalizado en Netlify:
1. Ve a "Domain settings"
2. Click en "Add custom domain"
3. Sigue las instrucciones para configurar DNS

---

## Opción 3: Vercel (GRATIS) ▲

1. Instala Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. En la carpeta del proyecto, ejecuta:
   ```bash
   vercel
   ```

3. Sigue las instrucciones en terminal

4. ¡Tu sitio estará online en segundos!

### O desde la web:
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu GitHub
3. Importa el repositorio
4. Vercel detecta automáticamente que es Vite
5. Click en "Deploy"

---

## Opción 4: GitHub Pages (GRATIS) 📄

1. **Modifica `vite.config.ts`** (ya lo haré por ti si lo necesitas):
   ```ts
   export default defineConfig({
     base: '/nombre-de-tu-repo/',
     plugins: [react()],
   })
   ```

2. **Instala gh-pages:**
   ```bash
   npm install -D gh-pages
   ```

3. **Agrega a `package.json`:**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **Ejecuta:**
   ```bash
   npm run deploy
   ```

5. Tu sitio estará en: `https://tuusuario.github.io/nombre-repo/`

---

## Opción 5: Servidor Propio con Nginx 🐧

### Configuración de Nginx:

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    root /var/www/emo-chat/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Caché para assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Pasos:

1. **Sube los archivos:**
   ```bash
   scp -r dist/* usuario@tuservidor:/var/www/emo-chat/
   ```

2. **Configura Nginx** con el archivo anterior

3. **Reinicia Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

4. **Configura SSL con Certbot (recomendado):**
   ```bash
   sudo certbot --nginx -d tudominio.com
   ```

---

## Opción 6: Docker 🐳

### Dockerfile:

```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Comandos:

```bash
# Construir imagen
docker build -t emo-chat .

# Ejecutar contenedor
docker run -d -p 80:80 emo-chat
```

---

## 🔐 Variables de Entorno (Opcional)

Si quieres tener una API Key predeterminada (no recomendado por seguridad):

1. Crea archivo `.env`:
   ```
   VITE_OPENAI_API_KEY=tu-api-key
   ```

2. En el código, accede con:
   ```ts
   const apiKey = import.meta.env.VITE_OPENAI_API_KEY
   ```

**⚠️ Nota:** Es mejor que cada usuario ingrese su propia API Key por seguridad.

---

## 📋 Checklist de Despliegue

- [ ] Ejecutar `npm run build`
- [ ] Verificar que la carpeta `dist/` se creó
- [ ] Probar localmente con `npm run preview`
- [ ] Elegir plataforma de hosting
- [ ] Subir archivos
- [ ] Configurar dominio personalizado (opcional)
- [ ] Configurar SSL/HTTPS
- [ ] Probar en producción

---

## 🆘 ¿Problemas?

### La página muestra 404 al recargar:
- Configura el servidor para que todas las rutas apunten a `index.html`
- En Netlify, crea archivo `_redirects` en `public/`:
  ```
  /*    /index.html   200
  ```

### Los assets no cargan:
- Verifica que `base` en `vite.config.ts` esté correcto
- Revisa las rutas en el servidor

### Error de CORS con OpenAI:
- La API de OpenAI se llama directamente desde el navegador
- Asegúrate de que tu API Key tenga permisos correctos

---

## 💬 ¿Necesitas Ayuda?

Desarrollado con ❤️ y AI por **AI MJBJ**
