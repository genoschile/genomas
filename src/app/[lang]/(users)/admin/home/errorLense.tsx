"use client"

import React from "react";

const UnauthorizedError = () => {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <h1 className="unauthorized-title">¡Acceso Denegado!</h1>
        <p className="unauthorized-message">
          Lo sentimos, no tienes permiso para acceder a esta página.
        </p>
        <div className="unauthorized-icon">🔒</div>
        <button
          className="unauthorized-button"
          onClick={() => window.history.back()}
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedError;

const styles = `
  .unauthorized-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #6a1b9a, #4a148c); /* Gradiente morado */
    color: #fff;
    font-family: sans-serif;
    padding: 20px;
    box-sizing: border-box;
  }

  .unauthorized-card {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 40px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px); /* Efecto de vidrio */
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .unauthorized-title {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #f3e5f5; /* Un tono más claro de morado */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .unauthorized-message {
    font-size: 1.1em;
    margin-bottom: 30px;
    line-height: 1.6;
    color: #eee;
  }

  .unauthorized-icon {
    font-size: 3em;
    margin-bottom: 30px;
    color: #d1c4e9; /* Otro tono de morado */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .unauthorized-button {
    background: linear-gradient(135deg, #4a148c, #6a1b9a); /* Gradiente inverso */
    color: #fff;
    border: none;
    padding: 12px 30px;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    transition: background 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .unauthorized-button:hover {
    background: linear-gradient(135deg, #5e35b1, #9c27b0); /* Un poco más brillante al pasar el mouse */
  }
`;

// Inyectar los estilos en el head (esto es una forma sencilla para un ejemplo)
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
