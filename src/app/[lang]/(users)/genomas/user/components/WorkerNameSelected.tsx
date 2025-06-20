"use client";

import { useState } from "react";

const WORKERS = [
  { id: "1", name: "vcf" },
  { id: "2", name: "Worker 2" },
  { id: "3", name: "Worker 3" },
];

export const WorkerNameSelected = () => {
  const [selectedWorker, setSelectedWorker] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    const selected = WORKERS.find((w) => w.id === newId) || null;
    setSelectedWorker(selected);
  };

  return (
    <div className="select-dropdown--workspaces select-dropdown">
      <label htmlFor="workers-select" className="visually-hidden">
        Seleccionar worker
      </label>
      <select
        id="workers-select"
        value={selectedWorker?.id || ""}
        onChange={handleChange}
      >
        <option value="" disabled>
          Selecciona un worker
        </option>

        {WORKERS.map((worker) => (
          <option key={worker.id} value={worker.id}>
            {worker.name}
          </option>
        ))}
      </select>
    </div>
  );
};
