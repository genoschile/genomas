"use client";

import { useState } from "react";

export const FilterSummary = () => {
  const [pipeline, setPipeline] = useState("Pipeline");
  const [order, setOrder] = useState("");

  return (
    <section className="filters">
      <div className="filter-chip active">Estado: Completado</div>
      <div className="filter-chip">Estado: En progreso</div>
      <div className="filter-chip">Estado: Fallido</div>

      {/* Filtro de pipeline */}
      <select
        className="filter-select"
        value={pipeline}
        onChange={(e) => setPipeline(e.target.value)}
      >
        <option disabled>Pipeline</option>
        <option value="Sarek">Sarek</option>
        <option value="AnnoMAF">AnnoMAF</option>
        <option value="BLAST">BLAST</option>
      </select>

      {/* Filtro de tipo de muestra */}
      <input
        type="text"
        placeholder="Tipo de muestra"
        className="filter-select"
      />

      {/* Filtro de fecha */}
      <input type="date" className="filter-select" />

      {/* Ordenar */}
      <select
        className="filter-select"
        value={order}
        onChange={(e) => setOrder(e.target.value)}
      >
        <option value="" disabled>
          Ordenar por
        </option>
        <option value="recent">Más recientes</option>
        <option value="oldest">Más antiguos</option>
      </select>
    </section>
  );
};
