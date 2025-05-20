import { useDataTableUserEnterpriseContext } from "@/context/enterprise/DataTableUserEnterpriseContext";
import { FaSearch } from "react-icons/fa";

export const SearchSectionEnterpriseUser = () => {
  const { searchTerm, setSearchTerm } = useDataTableUserEnterpriseContext();

  return (
    <search className="enterprise-users__search">
      <label htmlFor="">
        <span className="material-symbols-outlined">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Buscar usuario"
          name="search"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
    </search>
  );
};