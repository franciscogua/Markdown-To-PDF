# Conversor de Markdown a PDF Full-Stack

Este proyecto es una aplicación web completa construida con Spring Boot y React que permite a los usuarios escribir texto en formato Markdown, obtener una previsualización en tiempo real y exportar el resultado como un documento PDF con estilos profesionales.

El proyecto está estructurado como un monorepo, con un backend de API REST (`backend/`) y un frontend SPA (`frontend/`).

**Ver la aplicación en vivo:** [https://markdown-pdf.netlify.app/](https://markdown-pdf.netlify.app/)

## Características

*   **Editor Markdown:** Área de texto para escribir Markdown.
*   **Previsualización en Tiempo Real:** Panel lateral que renderiza de forma segura el HTML a medida que el usuario escribe.
*   **Exportación a PDF:** Conversión de alta fidelidad de HTML+CSS a un documento PDF descargable.
*   **Interfaz Moderna:** Layout limpio de dos columnas construido con React y CSS.

## Stack Tecnológico

Este proyecto utiliza un stack tecnológico moderno y robusto:

### Backend
*   **Java 21**
*   **Spring Boot 3** (para la API REST)
*   **Maven** (Gestor de dependencias)
*   **OpenHtmlToPdf** (Librería de alta fidelidad para la conversión de HTML a PDF)

### Frontend
*   **React.js** (Construido con Vite)
*   **Marked.js** (Para la conversión de Markdown a HTML)
*   **DOMPurify** (Para la sanitización de HTML y prevención de XSS)
*   **CSS3** (Para el layout y estilos)

### Despliegue (DevOps)
*   **Backend:** Contenerizado con **Docker** y desplegado en **Render**.
*   **Frontend:** Desplegado como sitio estático en **Netlify**.
*   **Infraestructura como Código:** Despliegue de Render gestionado mediante `render.yaml`.

---

## Ejecución Local

Para ejecutar este proyecto en tu máquina local, necesitarás tener instalado Java 21 (JDK) y Node.js (v18+).

### 1. Iniciar el Backend (Terminal 1)

El backend de Spring Boot debe estar ejecutándose para que el frontend pueda solicitar la conversión a PDF.

```bash
# 1. Navega a la carpeta del backend
cd backend

# 2. (Solo la primera vez) Da permisos de ejecución al Maven Wrapper
chmod +x mvnw

# 3. Construye el proyecto y ejecuta los tests
./mvnw clean install

# 4. Inicia el servidor
./mvnw spring-boot:run
```
El backend estará ahora corriendo en `http://localhost:8080`.

### 2. Iniciar el Frontend (Terminal 2)

El frontend de React necesita su propio servidor de desarrollo.

```bash
# 1. Navega a la carpeta del frontend (desde la raíz del proyecto)
cd frontend

# 2. Instala las dependencias (solo la primera vez)
npm install

# 3. Inicia el servidor de desarrollo de Vite
npm run dev
```
La aplicación estará ahora disponible en tu navegador en `http://localhost:5173`.

---

## Despliegue en Producción

Esta aplicación está diseñada para un despliegue desacoplado en dos plataformas:

### 1. Despliegue del Backend (Render)

El backend está configurado para desplegarse como un servicio de Docker en Render.

1.  El despliegue está totalmente automatizado a través del archivo `render.yaml` en la raíz del proyecto.
2.  Render detecta el `Dockerfile` en la carpeta `/backend`, construye la imagen de Docker y la despliega.
3.  **Configuración de CORS:** Para que el frontend de producción pueda comunicarse con el backend, la URL del frontend desplegado (ej. `https://mi-sitio.netlify.app`) debe añadirse a la anotación `@CrossOrigin` en el archivo `PdfController.java`.

### 2. Despliegue del Frontend (Netlify)

El frontend se despliega como un sitio estático.

1.  **Configuración de Netlify:**
    *   **Repositorio:** Conectar el repositorio de GitHub.
    *   **Base directory:** `frontend`
    *   **Build command:** `npm run build`
    *   **Publish directory:** `frontend/dist`
2.  **Variables de Entorno:** Para conectar el frontend con el backend en producción, se debe crear un archivo `frontend/.env.production` con la URL pública del backend desplegado en Render:

    ```bash
    VITE_API_BASE_URL=https://markdown-pdf-backend.onrender.com
    ```