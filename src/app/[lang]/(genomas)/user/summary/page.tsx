"use client";

import { useState } from "react";
import "./page.css";
import { FilterSummary } from "./components/FilterSummary";
import { KpiSummary } from "./components/KpiSummary";
import { Runs } from "./components/Run";

interface Task {
  id: string;
  title: string;
  status: string;
}

export default function Page() {
  return (
    <div className="dashboard-grid">
      <FilterSummary />

      <KpiSummary />

      {/* <section className="main">
        <div className="run-card card">
          <div className="card-header-row">
            <span
              className="pipeline-badge"
              style={{ backgroundColor: "var(--color-secondary)" }}
            >
              AnnoMAF
            </span>
            <span className="chip success">Completado</span>
          </div>
          <div className="path-container">
            <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V8h16v10z" />
            </svg>
            <span className="path-text">
              /projects/genomas/runs/annomaf/CC001BTUCH
            </span>
            <div className="path-actions">
              <button title="Copiar ruta">
                <svg
                  className="icon-sm"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
              </button>
              <button title="Abrir carpeta">
                <svg
                  className="icon-sm"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 12h-2c0 3.31-2.69 6-6 6s-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8zm0-10c-4.42 0-8 3.58-8 8h2c0-3.31 2.69-6 6-6s6 2.69 6 6h2c0-4.42-3.58-8-8-8z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="run-info-grid">
            <div className="run-info-item">
              <h5>Run ID</h5>
              <p>CC001BTUCH</p>
            </div>
            <div className="run-info-item">
              <h5>Tipo de Muestra</h5>
              <p>Somatic</p>
            </div>
            <div className="run-info-item">
              <h5>Fecha</h5>
              <p>2024-10-26</p>
            </div>
            <div className="run-info-item">
              <h5>Duración</h5>
              <p>1h 25m</p>
            </div>
            <div className="run-info-item">
              <h5>Progreso</h5>
              <p>100%</p>
            </div>
            <div className="progress-bar col-span-2">
              <div className="progress-fill" style={{ width: "100%" }}></div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="action-btn">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 19.22H5V7.78h12zm-1-10H8V8h8v1.22zM21 7.21v12.57L17 23l4-3.22V7.21z" />
              </svg>
              Reporte
            </button>
            <button className="action-btn">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11H8V9h8v2zm-2 4H8v-2h6v2zM20 7h-2V5h-2v2h-2V5h-2v2h-2V5H8v2H6V5H4v2H2v14h20V7h-2z" />
              </svg>
              Métricas
            </button>
            <button className="action-btn">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6V6h12v8zm-2-5H8V8h8v1z" />
              </svg>
              Logs (0)
            </button>
            <button className="action-btn">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.84 5.91l-4.52 4.52-2.12-2.12c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l2.83 2.83c.39.39 1.02.39 1.41 0l5.23-5.23c.39-.39.39-1.02 0-1.41-.39-.39-1.03-.39-1.42 0z" />
              </svg>
              Re-Run
            </button>
            <button className="action-btn">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.99.78l-7.2-4.15c.19-.51.29-1.07.29-1.64s-.1-1.13-.29-1.64l7.19-4.15c.55.48 1.23.78 1.99.78 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .57.1 1.12.29 1.63L7.15 9.8c-.56-.47-1.24-.77-2.01-.77-1.65 0-3 1.34-3 3s1.34 3 3 3c.77 0 1.45-.3 2.01-.77l7.14 4.12c-.19.51-.29 1.06-.29 1.63 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              Compartir
            </button>
            <div className="run-info-item">
              <h5>Costo</h5>
              <p>~125 créditos</p>
            </div>
          </div>
          <div
            className="chip"
            style={{ backgroundColor: "var(--color-tertiary)" }}
          >
            Sensibles
          </div>
        </div>

        <div className="run-card card">
          <div className="card-header-row">
            <span
              className="pipeline-badge"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Sarek
            </span>
            <span className="chip in-progress">En progreso</span>
          </div>
          <div className="path-container">
            <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V8h16v10z" />
            </svg>
            <span className="path-text">
              /projects/genomas/runs/sarek/CC002PAGL
            </span>
            <div className="path-actions">
              <button title="Copiar ruta">
                <svg
                  className="icon-sm"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
              </button>
              <button title="Abrir carpeta">
                <svg
                  className="icon-sm"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 12h-2c0 3.31-2.69 6-6 6s-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8zm0-10c-4.42 0-8 3.58-8 8h2c0-3.31 2.69-6 6-6s6 2.69 6 6h2c0-4.42-3.58-8-8-8z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="run-info-grid">
            <div className="run-info-item">
              <h5>Run ID</h5>
              <p>CC002PAGL</p>
            </div>
            <div className="run-info-item">
              <h5>Tipo de Muestra</h5>
              <p>Germline</p>
            </div>
            <div className="run-info-item">
              <h5>Fecha</h5>
              <p>2024-10-25</p>
            </div>
            <div className="run-info-item">
              <h5>Duración</h5>
              <p>35m</p>
            </div>
            <div className="run-info-item">
              <h5>Progreso</h5>
              <p>45%</p>
            </div>
            <div className="progress-bar col-span-2">
              <div className="progress-fill" style={{ width: "45%" }}></div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="action-btn" disabled>
              Reporte
            </button>
            <button className="action-btn" disabled>
              Métricas
            </button>
            <button className="action-btn">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6V6h12v8zm-2-5H8V8h8v1z" />
              </svg>
              Logs (0)
            </button>
            <button className="action-btn" disabled>
              Re-Run
            </button>
            <button className="action-btn" disabled>
              Compartir
            </button>
            <div className="run-info-item">
              <h5>Costo</h5>
              <p>~52 créditos</p>
            </div>
          </div>
        </div>

        <div className="run-card card">
          <div className="card-header-row">
            <span
              className="pipeline-badge"
              style={{ backgroundColor: "var(--color-tertiary)" }}
            >
              BLAST
            </span>
            <span className="chip failure">Fallido</span>
          </div>
          <div className="path-container">
            <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V8h16v10z" />
            </svg>
            <span className="path-text">
              /projects/genomas/runs/blast/CC003ABF
            </span>
            <div className="path-actions">
              <button title="Copiar ruta">
                <svg
                  className="icon-sm"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
              </button>
              <button title="Abrir carpeta">
                <svg
                  className="icon-sm"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 12h-2c0 3.31-2.69 6-6 6s-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8zm0-10c-4.42 0-8 3.58-8 8h2c0-3.31 2.69-6 6-6s6 2.69 6 6h2c0-4.42-3.58-8-8-8z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="run-info-grid">
            <div className="run-info-item">
              <h5>Run ID</h5>
              <p>CC003ABF</p>
            </div>
            <div className="run-info-item">
              <h5>Tipo de Muestra</h5>
              <p>Bacterial</p>
            </div>
            <div className="run-info-item">
              <h5>Fecha</h5>
              <p>2024-10-24</p>
            </div>
            <div className="run-info-item">
              <h5>Duración</h5>
              <p>--</p>
            </div>
            <div className="run-info-item">
              <h5>Progreso</h5>
              <p>10%</p>
            </div>
            <div className="progress-bar col-span-2">
              <div className="progress-fill" style={{ width: "10%" }}></div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="action-btn" disabled>
              Reporte
            </button>
            <button className="action-btn" disabled>
              Métricas
            </button>
            <button className="action-btn">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6V6h12v8zm-2-5H8V8h8v1z" />
              </svg>
              Logs (1)
            </button>
            <button className="action-btn">
              <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.84 5.91l-4.52 4.52-2.12-2.12c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l2.83 2.83c.39.39 1.02.39 1.41 0l5.23-5.23c.39-.39.39-1.02 0-1.41-.39-.39-1.03-.39-1.42 0z" />
              </svg>
              Re-Run
            </button>
            <button className="action-btn" disabled>
              Compartir
            </button>
            <div className="run-info-item">
              <h5>Costo</h5>
              <p>~15 créditos</p>
            </div>
          </div>
        </div>
      </section> */}

      <Runs />
    </div>
  );
}

export function Drag() {
  /* task active */
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  const [dragOverTask, setDragOverTask] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Tag 1", status: "todo" },
    { id: "2", title: "Tag 2", status: "todo" },
    { id: "3", title: "Tag 3", status: "todo" },
  ]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    e.dataTransfer.setData("text/plain", taskId);
    setDraggedTask(taskId);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: string
  ) => {
    e.preventDefault();
    if (taskId !== draggedTask) {
      setDragOverTask(taskId);
    }
  };

  const handleDragLeave = () => {
    setDragOverTask(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");

    setTasks((prevTasks) => {
      const movedTask = prevTasks.find((task) => task.id === taskId);
      if (!movedTask) return prevTasks;

      let newTasks = prevTasks.filter((task) => task.id !== taskId);
      const targetIndex = dragOverTask
        ? newTasks.findIndex((task) => task.id === dragOverTask)
        : -1;
      movedTask.status = status;

      if (targetIndex !== -1) {
        newTasks.splice(targetIndex, 0, movedTask);
      } else {
        newTasks.push(movedTask);
      }

      return newTasks;
    });

    setDragOverTask(null);
    setDraggedTask(null);
  };

  const renderTasks = (status: string) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, task.id)}
          onDragOver={(e) => handleDragOver(e, task.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, status)}
          style={{
            width: "100%",
            padding: "1rem",
            backgroundColor: dragOverTask === task.id ? "#FFD700" : "red",
            borderRadius: "1rem",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            transform: dragOverTask === task.id ? "translateY(10px)" : "none",
            cursor: "grab",
          }}
        >
          {task.title}
        </div>
      ));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 350px 400px", //Tamaños diferentes para cada columna
          gap: "8px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "white" }}>Todo</h2>
        <h2 style={{ textAlign: "center", color: "white" }}>In Progress</h2>
        <h2 style={{ textAlign: "center", color: "white" }}>Done</h2>

        {["todo", "in-progress", "done"].map((status) => (
          <div
            key={status}
            id={status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, status)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              border: "2px dashed",
              padding: "2px",
              gap: "4px",
              borderRadius: "4px",
            }}
          >
            {renderTasks(status)}
          </div>
        ))}
      </div>

      <small>El id de drag es: {draggedTask}</small>
    </div>
  );
}
