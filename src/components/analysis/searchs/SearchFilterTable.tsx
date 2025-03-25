import "./searchFilterTable.css";

export function SearchFilterTable() {
  return (
    <search className="table-filters">
      <button> Select All </button>
      <select>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button>Export</button>
      <button>Move to Trash</button>
    </search>
  );
}
