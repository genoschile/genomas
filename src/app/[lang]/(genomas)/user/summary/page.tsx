"use client";

import "./page.css";
import { FilterSummary } from "./components/FilterSummary";
import { KpiSummary } from "./components/KpiSummary";
import { Runs } from "./components/Run";

export default function Page() {
  return (
    <div className="dashboard-grid">
      <FilterSummary />

      <KpiSummary />

      <Runs />
    </div>
  );
}
