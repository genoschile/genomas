import { FaSearch, FaAddressCard } from "react-icons/fa";

export const ContainerGroupsHeader = () => {
  return (
    <nav>
      <search className="enterprise-groups__search">
        <label htmlFor="">
          <span className="material-symbols-outlined">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Buscar usuario"
            name="search"
            id="search"
          />
        </label>
      </search>

      <button>
        <FaAddressCard className="icon" />
      </button>
    </nav>
  );
};
