"use client";

import { use, useState } from "react";

type SelectableItem = {
  id: string;
  name: string;
};

export const MultiSelectChips = ({
  dataPromise,
  name,
  label,
  onChange,
}: {
  dataPromise: Promise<{ data: SelectableItem[] }>;
  name: string;
  label: string;
  onChange?: (selected: string[]) => void;
}) => {
  const allItems = use(dataPromise);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

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
          const item = allItems.data.find((el) => el.id === id);
          return (
            <div key={id} className="chip">
              {item?.name || id}
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
        {allItems.data.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
};
