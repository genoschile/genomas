"use client";

import { useState, useEffect } from "react";

type SelectableItem = {
  id: string;
  name: string;
};

export const MultiSelectChips = ({
  data,
  name,
  label,
  onChange,
  initialSelected = [],
}: {
  data: SelectableItem[];
  name: string;
  label: string;
  onChange?: (selected: string[]) => void;
  initialSelected?: string[];
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelected);

  useEffect(() => {
    const valid = initialSelected.filter((id) =>
      data.some((el) => el.id === id)
    );
    setSelectedIds(valid);
  }, [initialSelected, data]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    const merged = Array.from(new Set([...selectedIds, ...selected]));
    setSelectedIds(merged);
    onChange?.(merged);
  };

  const remove = (id: string) => {
    const updated = selectedIds.filter((itemId) => itemId !== id);
    setSelectedIds(updated);
    onChange?.(updated);
  };

  return (
    <>
      <label htmlFor={name}>{label}:</label>

      <div className="selected-chips">
        {selectedIds.map((id) => {
          const item = data.find((el) => el.id === id);
          if (!item) return null; // evita key undefined
          return (
            <div key={`chip-${id}`} className="chip">
              {item.name}
              <button type="button" onClick={() => remove(id)}>
                &times;
              </button>
            </div>
          );
        })}
      </div>

      <select
        className="select-list"
        id={name}
        name={name}
        multiple
        onChange={handleSelect}
        value={selectedIds}
      >
        {data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};
