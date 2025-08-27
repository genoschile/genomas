export const FilterSummary = () => {
  return (
    <section className="filters">
      <div className="filter-chip active">Estado: Completado</div>
      <div className="filter-chip">Estado: En progreso</div>
      <div className="filter-chip">Estado: Fallido</div>
      <select className="filter-select">
        <option selected disabled>
          Pipeline
        </option>
        <option>Sarek</option>
        <option>AnnoMAF</option>
        <option>BLAST</option>
      </select>
      <input
        type="text"
        placeholder="Tipo de muestra"
        className="filter-select"
      />
      <input type="date" className="filter-select" />
      <select className="filter-select">
        <option selected disabled>
          Ordenar por
        </option>
        <option>Más recientes</option>
        <option>Más antiguos</option>
      </select>
    </section>
  );
};
