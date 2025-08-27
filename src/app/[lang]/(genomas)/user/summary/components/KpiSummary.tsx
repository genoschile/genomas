export const KpiSummary = () => {
  return (
    <section className="kpis">
      <div className="kpi-card card">
        <h4>Duración media</h4>
        <p>1h 25m</p>
      </div>
      <div className="kpi-card card">
        <h4>Tasa de éxito (180 días)</h4>
        <p>92%</p>
      </div>
      <div className="kpi-card card">
        <h4>Ejecuciones activas</h4>
        <p>12</p>
      </div>
      <div className="kpi-card card">
        <h4>Fallas más comunes</h4>
        <p>Error en Sarek</p>
      </div>
    </section>
  );
};
