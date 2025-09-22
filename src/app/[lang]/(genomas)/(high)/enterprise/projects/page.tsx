"use client";

import { ChatSuggestionTitle } from "@/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { EnterpriseProjectHero } from "./components/EnterpriseProjectHero";
import { EnterpriseProjectListContainer } from "./components/EnterpriseProjectListContainer";
import { EnterpriseNavActions } from "./components/EnterpriseNavActions";
import { useWorkspacesContext } from "@/context/enterprise/WorkspacesEnterpriseContext";
import { ContainerDefaultEnterprise } from "../components/ContainerDefaultEnterprise";

export default function page() {
  const { selectedWorkspaceId } = useWorkspacesContext();

  return (
    <>
      <ChatSuggestionTitle
        title="Administra tus Projects"
        description="Puedes agregar, editar y eliminar proyectos de tu organización."
      />
      <EnterpriseProjectHero />

      {selectedWorkspaceId ? (
        <>
          {/* <EnterpriseNavActions /> */}
          <EnterpriseProjectListContainer />
        </>
      ) : (
        <ContainerDefaultEnterprise dinamicStyle="enterprise-projects__hero">
          Selecciona un espacio de trabajo para ver sus proyectos.
        </ContainerDefaultEnterprise>
      )}
    </>
  );
}
