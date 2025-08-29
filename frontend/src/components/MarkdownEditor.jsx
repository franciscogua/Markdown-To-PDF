import React, { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "./MarkdownEditor.css";

const convertToXhtml = (html) => {
  return html
    .replace(/<hr>/g, "<hr />")
    .replace(/<br>/g, "<br />")
    .replace(/<img>/g, "<img />");
};

function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(`# ¡Bienvenido a tu Editor Markdown!

## Comienza a escribir y mira la magia en tiempo real

Esta aplicación te permite convertir tus notas de **Markdown** a un archivo **PDF** con un estilo profesional.

---

### ¿Listo para Probar?

1.  Modifica este texto o pega tu propio Markdown.
2.  Haz clic en el botón **"Exportar a PDF"**.
3.  ¡Disfruta de tu documento!`);
  const [isLoading, setIsLoading] = useState(false);

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const getSanitizedHtmlForPreview = (markdownText) => {
    const rawHtml = marked.parse(markdownText);
    return DOMPurify.sanitize(rawHtml);
  };

  const handleExportPdf = async () => {
    setIsLoading(true);

    const rawHtml = marked.parse(markdown);
    const baseHtml = convertToXhtml(rawHtml);

    const styles = `
      <style>
        @page {
          margin: 1.5cm;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 11pt;
          line-height: 1.6;
          color: #24292e;
        }
        h1, h2, h3, h4, h5, h6 {
          font-weight: 600;
          line-height: 1.25;
          margin-top: 24px;
          margin-bottom: 16px;
          border-bottom: 1px solid #eaecef;
          padding-bottom: 0.3em;
        }
        h1 { font-size: 2em; }
        h2 { font-size: 1.5em; }
        h3 { font-size: 1.25em; }
        code {
          background-color: #f6f8fa;
          padding: 0.2em 0.4em;
          margin: 0;
          font-size: 85%;
          border-radius: 6px;
          font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier, monospace;
        }
        pre {
          background-color: #f6f8fa;
          padding: 16px;
          overflow: auto;
          line-height: 1.45;
          border-radius: 6px;
        }
        pre code {
          padding: 0;
          margin: 0;
          font-size: 100%;
          background-color: transparent;
        }
        blockquote {
          color: #6a737d;
          border-left: 0.25em solid #dfe2e5;
          padding: 0 1em;
          margin-left: 0;
        }
        ul, ol {
          padding-left: 2em;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin-top: 1em;
          margin-bottom: 1em;
        }
        th, td {
          border: 1px solid #dfe2e5;
          padding: 8px 13px;
        }
        th {
          font-weight: 600;
        }
        a {
          color: #0366d6;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    `;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          ${styles}
        </head>
        <body>
          ${baseHtml}
        </body>
      </html>
    `;

    try {
      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/generate-pdf`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ htmlContent }),
      });

      if (!response.ok) {
        throw new Error(
          `Error del servidor: ${response.status} ${response.statusText}`
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "documento.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert(
        "No se pudo generar el PDF. Asegúrate de que el backend esté funcionando y revisa la consola del navegador para más detalles."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Markdown to PDF Converter</h1>
        <button
          className="export-button"
          onClick={handleExportPdf}
          disabled={isLoading}
        >
          {isLoading ? "Generando..." : "Exportar a PDF"}
        </button>
      </header>
      <main className="editor-layout">
        <div className="editor-pane">
          <textarea
            className="editor-textarea"
            placeholder="Escribe tu Markdown aquí..."
            value={markdown}
            onChange={handleMarkdownChange}
          ></textarea>
        </div>
        <div className="preview-pane">
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{
              __html: getSanitizedHtmlForPreview(markdown),
            }}
          ></div>
        </div>
      </main>
    </div>
  );
}

export default MarkdownEditor;
