"use client";

import { useState } from "react";

const genomeVersionRef = [
  { id: "1", name: "HG-19" },
  { id: "2", name: "HG-38" },
];

export const GenomeVersionRefSelected = () => {
  const [selectedGenomeVersion, setSelectedGenomeVersion] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    const selected = genomeVersionRef.find((w) => w.id === newId) || null;
    setSelectedGenomeVersion(selected);
  };

  return (
    <div className="select-dropdown--workspaces select-dropdown">
      <label htmlFor="workers-select" className="visually-hidden">
        Seleccionar worker
      </label>
      <select
        id="workers-select"
        value={selectedGenomeVersion?.id || ""}
        onChange={handleChange}
        name="genomeVersionRef"
      >
        <option value="" disabled>
          Selecciona una versión del genoma
        </option>

        {genomeVersionRef.map((worker) => (
          <option key={worker.id} value={worker.id}>
            {worker.name}
          </option>
        ))}
      </select>
    </div>
  );
};
