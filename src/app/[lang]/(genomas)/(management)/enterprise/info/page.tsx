"use client";

import { useState } from "react";
import { ChatSuggestionTitle } from "@/features/enterprise/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { useDataTableUserEnterpriseContext } from "@/features/enterprise/context/DataTableUserEnterpriseContext";
import { useWorkspacesContext } from "@/features/enterprise/context/WorkspacesEnterpriseContext";
import { useProjectsContextEnterprise } from "@/features/enterprise/context/ProjectContextEnterprise";
import { ModalContainerAddUsersEnterprise } from "@/features/modals/components/ModalContainer";
import { InfoTabs } from "./components/InfoTabs";

import { WorkspacesProjectsView } from "./components/WorkspacesProjectsView";
import { ContainerDefaultEnterprise } from "@/features/enterprise/components/ContainerDefaultEnterprise";
import "./page.css";
import { EnterpriseUserHero } from "@/features/enterprise/components/enterprise/users/components/EnterpriseUserHero";
import { TableEnterpriseUserContainer } from "@/features/enterprise/components/enterprise/users/components/TableEnterpriseUserContainer";

type Tab = "users" | "workspaces";

export default function InfoPage() {
  const [activeTab, setActiveTab] = useState<Tab>("users");

  return (
    <div className="enterprise-info">
      <ChatSuggestionTitle
        title="Información de la organización"
        description="Vista unificada de usuarios, grupos, workspaces y proyectos."
      />

      <ContainerDefaultEnterprise dinamicStyle="enterprise-info__tabs">
        <InfoTabsWrapper activeTab={activeTab} onTabChange={setActiveTab} />
      </ContainerDefaultEnterprise>

      <ContainerDefaultEnterprise dinamicStyle="info-content">
        {activeTab === "users" && (
          <>
            <EnterpriseUserHero />
            <TableEnterpriseUserContainer />
          </>
        )}

        {activeTab === "workspaces" && <WorkspacesProjectsView />}
      </ContainerDefaultEnterprise>

      <ModalContainerAddUsersEnterprise />
    </div>
  );
}

const InfoTabsWrapper = ({
  activeTab,
  onTabChange,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}) => {
  const { users } = useDataTableUserEnterpriseContext();
  const { workspaces } = useWorkspacesContext();
  const { projectsByWorkspace } = useProjectsContextEnterprise();

  const totalProjects = Object.values(projectsByWorkspace).reduce(
    (acc, projects) => acc + projects.length,
    0
  );

  return (
    <InfoTabs
      activeTab={activeTab}
      onTabChange={onTabChange}
      usersCount={users.length}
      workspacesCount={workspaces.length}
      projectsCount={totalProjects}
    />
  );
};
