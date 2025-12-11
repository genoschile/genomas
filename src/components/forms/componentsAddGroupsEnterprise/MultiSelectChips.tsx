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
    <div className="multi-select-container">
      <label htmlFor={name} className="select-label">{label}:</label>

      {selectedIds.length > 0 && (
        <div className="selected-chips">
          {selectedIds.map((id) => {
            const item = data.find((el) => el.id === id);
            if (!item) return null;
            return (
              <div key={`chip-${id}`} className="chip">
                <span className="chip-text">{item.name}</span>
                <button
                  type="button"
                  className="chip-remove"
                  onClick={(e) => {
                    e.preventDefault();
                    remove(id);
                  }}
                  aria-label={`Eliminar ${item.name}`}
                >
                  &times;
                </button>
              </div>
            );
          })}
        </div>
      )}

      <select
        className="select-list"
        id={name}
        name={name}
        multiple
        onChange={handleSelect}
        value={[]}
      >
        {data.map((item) => (
          <option
            key={item.id}
            value={item.id}
            disabled={selectedIds.includes(item.id)}
          >
            {item.name} {selectedIds.includes(item.id) ? "✓" : ""}
          </option>
        ))}
      </select>

      {/* Hidden inputs for form submission */}
      {selectedIds.map((id) => (
        <input key={`hidden-${id}`} type="hidden" name={name} value={id} />
      ))}
    </div>
  );
};
