import React from "react";
import "./MarkdownEditor.css";

function MarkdownEditor() {
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
          ></textarea>
        </div>
        <div className="preview-pane">
          <div className="preview-content"></div>
        </div>
      </main>
    </div>
  );
}

export default MarkdownEditor;
