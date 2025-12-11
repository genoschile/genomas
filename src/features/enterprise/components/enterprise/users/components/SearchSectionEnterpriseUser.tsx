import { useDataTableUserEnterpriseContext } from "@/features/enterprise/context/DataTableUserEnterpriseContext";
import { FaSearch, FaTimes } from "react-icons/fa";

export const SearchSectionEnterpriseUser = () => {
  const { searchTerm, setSearchTerm } = useDataTableUserEnterpriseContext();

  return (
    <search className="enterprise-users__search">
      <label htmlFor="search">
        <span className="material-symbols-outlined">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Buscar por nombre, email, rol o grupo..."
          name="search"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            type="button"
            className="clear-search"
            onClick={() => setSearchTerm("")}
            title="Limpiar búsqueda"
          >
            <FaTimes />
          </button>
        )}
      </label>
    </search>
  );
};
