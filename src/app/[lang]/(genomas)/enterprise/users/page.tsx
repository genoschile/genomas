"use client";

import { ChatSuggestionTitle } from "@/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { FiltersTableUserEnterpriseContextProvider } from "@/context/enterprise/FiltersTableUserEnterpriseContext";
import { DataTableUserEnterpriseProvider } from "@/context/enterprise/DataTableUserEnterpriseContext";
import { EnterpriseUserHero } from "./components/EnterpriseUserHero";
import { EnterpriseUserFiltersHero } from "./components/EnterpriseUserFiltersHero";
import { TableEnterpriseUserContainer } from "./components/TableEnterpriseUserContainer";

import "./page.css";
import { ModalContainerAddUsersEnterprise } from "@/components/modals/ModalContainer";

export default function page() {
  return (
    <DataTableUserEnterpriseProvider>
      <FiltersTableUserEnterpriseContextProvider>
        <ModalContainerAddUsersEnterprise />
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
