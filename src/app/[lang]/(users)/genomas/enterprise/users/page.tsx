import { ChatSuggestionTitle } from "@/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import "./page.css";
import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { FaSearch, FaUser } from "react-icons/fa";
import { TableEnterpriseUser } from "./TableEnterpriseUser";
import { IoPersonAddSharp } from "react-icons/io5";
import { SearchFilterTable } from "@/components/analysis/searchs/SearchFilterTable";

export default function page() {
  return (
    <div className="enterprise-users">
      <ChatSuggestionTitle
        title="Administra tus usuarios"
        description="Puedes agregar, editar y eliminar usuarios de tu organización."
      />
      <EnterpriseUserHero />
      <EnterpriseUserFiltersHero />
      <TableEnterpriseUserContainer />
    </div>
  );
}

export const EnterpriseUserHero = () => {
  return (
    <div className="enterprise-users__hero">
      <SearchSectionEnterpriseUser />
      <NavActionsEnterpriseUser />
    </div>
  );
};

export const EnterpriseUserFiltersHero = () => {
  return (
    <div className="enterprise-users__hero">
      <SearchFilterTable />
    </div>
  );
};

export const TableEnterpriseUserContainer = () => {
  return (
    <div className="enterprise-users__table">
      <TableEnterpriseUser />
    </div>
  );
};

export const NavActionsEnterpriseUser = () => {
  return (
    <nav>
      <button>
        <IconRoundedFull icon={<IoPersonAddSharp />} />
      </button>
    </nav>
  );
};

export const SearchSectionEnterpriseUser = () => {
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
        />
      </label>
    </search>
  );
};
