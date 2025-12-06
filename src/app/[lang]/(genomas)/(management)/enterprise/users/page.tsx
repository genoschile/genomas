"use client";

import { ChatSuggestionTitle } from "@/features/enterprise/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { FiltersTableUserEnterpriseContextProvider } from "@/features/enterprise/context/FiltersTableUserEnterpriseContext";
import { DataTableUserEnterpriseProvider } from "@/features/enterprise/context/DataTableUserEnterpriseContext";
import { EnterpriseUserHero } from "./components/EnterpriseUserHero";
import { TableEnterpriseUserContainer } from "./components/TableEnterpriseUserContainer";

import "./page.css";
import { ModalContainerAddUsersEnterprise } from "@/features/modals/components/ModalContainer";

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
          {/* <EnterpriseUserFiltersHero /> */}
          <TableEnterpriseUserContainer />
        </div>
      </FiltersTableUserEnterpriseContextProvider>
    </DataTableUserEnterpriseProvider>
  );
}
