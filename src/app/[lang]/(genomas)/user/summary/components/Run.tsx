"use client";

import { useRuns } from "../context/RunsContext";
import RunCard from "./RunCard";

export const Runs = () => {
  const { runs, loading, error } = useRuns();

  return (
    <section className="main">
      {loading ? (
        <p>Cargando ejecuciones...</p>
      ) : error ? (
        <p>{error}</p>
      ) : runs.length === 0 ? (
        <div>
          <h3>No hay ejecuciones recientes</h3>
          <p>Parece que no has ejecutado ningún pipeline recientemente.</p>
          <button
            className="primary-btn"
            onClick={() => {
              window.location.href = "/user";
            }}
          >
            Iniciar un nuevo análisis
          </button>
        </div>
      ) : (
        runs.map((run) => <RunCard key={run.runId} run={run} />)
      )}
    </section>
  );
};
