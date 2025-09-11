import { AdminAccountEnterpriseCredentials } from "@/components/enterprise/adminAccountEnterpriseCredentials/AdminAccountEnterpriseCredentials";
import { ChatSuggestionTitle } from "@/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import {
  MonthlyGrowthCard,
  TotalGroupsCard,
  TotalUsersCard,
} from "@/components/enterprise/metrics/MetricsEnterprise";
import {
  QuickActionsUsers,
  QuickActionsGroups,
  QuickActionsProjects,
} from "@/components/enterprise/quickactions/QuickActions";
import { ContainerWorkspaces } from "./components/workspaces/components/ContainerWorkspaces";
import { ContainerListWorkspaces } from "./components/workspaces/components/ContainerListWorkspaces";

export default function page() {
  return (
    <>
      <ChatSuggestionTitle
        title="Hello there"
        description="What do you think of your organization's summary?"
      />

      <ContainerWorkspaces>
        <ContainerListWorkspaces />
      </ContainerWorkspaces>

      <ContainerWorkspaces>
        <div className="container__grid-metrics">
          <div className="container__metrics">
            <TotalUsersCard />
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
