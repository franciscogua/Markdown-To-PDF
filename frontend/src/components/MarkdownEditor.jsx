import React, { useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import "./MarkdownEditor.css";

function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(`# ¡Hola, mundo! 
  ## Esto es una previsualización en tiempo real
  - Escribe Markdown en el panel de la izquierda.
  - Visualiza el HTML renderizado a la derecha.
  \`\`\`javascript
    function saludo() {
      console.log("¡Hola desde el bloque de código!");
    }
  \`\`\``);

  const handleMarkdownChange = (event) => {
    setMarkdown(event.target.value);
  };

  const getSanitizedHtml = (markdownText) => {
    const rawHtml = marked.parse(markdownText);
    return DOMPurify.sanitize(rawHtml);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Markdown to PDF Converter</h1>
        <button className="export-button">Exportar a PDF</button>
      </header>
      <main className="editor-layout">
        <div className="editor-pane">
          <textarea
            className="editor-textarea"
            placeholder="Escribe tu markdown aquí..."
            value={markdown}
            onChange={handleMarkdownChange}
          ></textarea>
        </div>
        <div className="preview-pane">
          <div
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: getSanitizedHtml(markdown) }}
          ></div>
        </div>
      </main>
    </div>
  );
}

export default MarkdownEditor;
