import { AdminAccountEnterpriseCredentials } from "@/features/enterprise/components/enterprise/adminAccountEnterpriseCredentials/AdminAccountEnterpriseCredentials";
import { ChatSuggestionTitle } from "@/features/enterprise/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import {
  MonthlyGrowthCard,
  TotalGroupsCard,
  TotalUsersCard,
} from "@/features/enterprise/components/enterprise/metrics/MetricsEnterprise";
import {
  QuickActionsUsers,
  QuickActionsGroups,
  QuickActionsProjects,
} from "@/features/enterprise/components/enterprise/quickactions/QuickActions";
import { ContainerWorkspaces } from "../../../../../features/enterprise/components/workspaces/components/ContainerWorkspaces";
import { ContainerListWorkspaces } from "../../../../../features/enterprise/components/workspaces/components/ContainerListWorkspaces";
import { DataTableUserEnterpriseProvider } from "@/features/enterprise/context/DataTableUserEnterpriseContext";

export default function page() {
  return (
    <>
      <ChatSuggestionTitle
        title="Hello there"
        description="What do you think of your organization's summary?"
      />
      {/* 
      <ContainerWorkspaces>
        <ContainerListWorkspaces />
      </ContainerWorkspaces> */}

      <ContainerWorkspaces>
        <div className="container__grid-metrics">
          <div className="container__metrics">
            <DataTableUserEnterpriseProvider>
              <TotalUsersCard />
            </DataTableUserEnterpriseProvider>
            <TotalGroupsCard />
            <MonthlyGrowthCard />
          </div>
          <div className="container__quick-actions">
            <AdminAccountEnterpriseCredentials />
            <div>
              <QuickActionsGroups />
              <QuickActionsUsers />
              <QuickActionsProjects />
            </div>
          </div>
        </div>
      </ContainerWorkspaces>
    </>
  );
}
