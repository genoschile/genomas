"use client";

import { useState } from "react";
import { ChatSuggestionTitle } from "@/features/enterprise/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { useDataTableUserEnterpriseContext } from "@/features/enterprise/context/DataTableUserEnterpriseContext";
import { useGroupsContext } from "@/features/enterprise/context/GroupsEnterpriseContext";
import { useWorkspacesContext } from "@/features/enterprise/context/WorkspacesEnterpriseContext";
import { useProjectsContextEnterprise } from "@/features/enterprise/context/ProjectContextEnterprise";
import { ModalContainerAddUsersEnterprise } from "@/features/modals/components/ModalContainer";
import { InfoTabs } from "./components/InfoTabs";
import { EnterpriseUserHero } from "../users/components/EnterpriseUserHero";
import { TableEnterpriseUserContainer } from "../users/components/TableEnterpriseUserContainer";
import { GroupsView } from "../users/components/GroupsView";
import { WorkspacesProjectsView } from "./components/WorkspacesProjectsView";
import { ContainerDefaultEnterprise } from "@/features/enterprise/components/ContainerDefaultEnterprise";
import "./page.css";

type Tab = "users" | "groups" | "workspaces";

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
      
      <div className="info-content">
        {activeTab === "users" && (
          <>
            <EnterpriseUserHero />
            <TableEnterpriseUserContainer />
          </>
        )}
        
        {activeTab === "groups" && <GroupsView />}
        
        {activeTab === "workspaces" && <WorkspacesProjectsView />}
      </div>
      
      <ModalContainerAddUsersEnterprise />
    </div>
  );
}

const InfoTabsWrapper = ({ 
  activeTab, 
  onTabChange 
}: { 
  activeTab: Tab; 
  onTabChange: (tab: Tab) => void;
}) => {
  const { users } = useDataTableUserEnterpriseContext();
  const { groups } = useGroupsContext();
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
      groupsCount={groups.length}
      workspacesCount={workspaces.length}
      projectsCount={totalProjects}
    />
  );
};
