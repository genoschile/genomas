"use client";

import { ChatSuggestionTitle } from "@/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import "./page.css";
import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { FaSearch } from "react-icons/fa";
import { TableEnterpriseUser } from "@/components/enterprise/tables/tablesUser/TableEnterpriseUser";
import { IoPersonAddSharp } from "react-icons/io5";

import { SearchFilterEnterpriseUser } from "@/components/enterprise/tables/tablesUser/SearchFilterEnterpriseUser";
import { FiltersTableUserEnterpriseContextProvider } from "@/context/enterprise/FiltersTableUserEnterpriseContext";
import {
  DataTableUserEnterpriseProvider,
  useDataTableUserEnterpriseContext,
} from "@/context/enterprise/DataTableUserEnterpriseContext";

export default function page() {
  return (
    <DataTableUserEnterpriseProvider>
      <FiltersTableUserEnterpriseContextProvider>
        <div className="enterprise-users">
          <ChatSuggestionTitle
            title="Administra tus usuarios"
            description="Puedes agregar, editar y eliminar usuarios de tu organización."
          />
          <EnterpriseUserHero />
          <EnterpriseUserFiltersHero />
          <TableEnterpriseUserContainer />
        </div>
      </FiltersTableUserEnterpriseContextProvider>
    </DataTableUserEnterpriseProvider>
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
      <SearchFilterEnterpriseUser />
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
