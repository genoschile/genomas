import React from "react";
import { RunData } from "./Run";

export default function RunCard({ data }: { data: RunData }) {
  const {
    pipeline,
    status,
    statusType,
    color,
    path,
    runId,
    sampleType,
    date,
    duration,
    progress,
    logs,
    cost,
    tags,
  } = data;

  const isCompleted = statusType === "success";
  const isInProgress = statusType === "in-progress";
  const isFailed = statusType === "failure";

  return (
    <div className="run-card card">
      {/* Header */}
      <div className="card-header-row">
        <span className="pipeline-badge" style={{ backgroundColor: color }}>
          {pipeline}
        </span>
        <span className={`chip ${statusType}`}>{status}</span>
      </div>



      {/* Info Grid */}
      <div className="run-info-grid">
        <div className="run-info-item">
          <h5>Run ID</h5>
          <p>{runId}</p>
        </div>
        <div className="run-info-item">
          <h5>Tipo de Muestra</h5>
          <p>{sampleType}</p>
        </div>
        <div className="run-info-item">
          <h5>Fecha</h5>
          <p>{date}</p>
        </div>
        <div className="run-info-item">
          <h5>Duración</h5>
          <p>{duration}</p>
        </div>
        <div className="run-info-item">
          <h5>Progreso</h5>
          <p>{progress}%</p>
        </div>
        <div className="progress-bar col-span-2">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="action-buttons">
        <button className="action-btn" disabled={!isCompleted}>
          Reporte
        </button>
        <button className="action-btn" disabled={!isCompleted}>
          Métricas
        </button>
        <button className="action-btn">
          <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6V6h12v8zm-2-5H8V8h8v1z" />
          </svg>
          Logs ({logs})
        </button>
        <button className="action-btn" disabled={!isFailed && !isCompleted}>
          Re-Run
        </button>
        <button className="action-btn" disabled={!isCompleted}>
          Compartir
        </button>
        <div className="run-info-item">
          <h5>Costo</h5>
          <p>{cost}</p>
        </div>
      </div>

      {/* Tags */}
      {tags?.length > 0 &&
        tags.map((tag, idx) => (
          <div
            key={idx}
            className="chip"
            style={{ backgroundColor: "var(--color-tertiary)" }}
          >
            {tag}
          </div>
        ))}
    </div>
  );
}
