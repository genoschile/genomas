"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect to info page
    const basePath = pathname.replace("/projects", "");
    router.replace(`${basePath}/info`);
  }, [pathname, router]);

  return null;
}

/*
// PREVIOUS PAGE CONTENT - Keeping as reference
import { ChatSuggestionTitle } from "@/features/enterprise/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { EnterpriseProjectHero } from "./components/EnterpriseProjectHero";
import { EnterpriseProjectListContainer } from "./components/EnterpriseProjectListContainer";
import { useWorkspacesContext } from "@/features/enterprise/context/WorkspacesEnterpriseContext";
import { ContainerDefaultEnterprise } from "../../../../../../features/enterprise/components/ContainerDefaultEnterprise";

export default function OldPage() {
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
*/
