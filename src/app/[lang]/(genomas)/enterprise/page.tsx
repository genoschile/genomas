import "./style.css";

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

export default function page() {
  return (
    <>
      <ChatSuggestionTitle
        title="Hello there"
        description="What do you think of your organization's summary?"
      />

      <div className="grid">
        <div className="left-top">
          <TotalUsersCard />
        </div>
        <div className="left-bottom">
          <TotalGroupsCard />
        </div>
        <article className="main-top-left">
          <QuickActionsGroups />
        </article>
        <div className="main-top-right">
          <QuickActionsUsers />
        </div>
        <article className="main admincredential">
          <AdminAccountEnterpriseCredentials />
        </article>
        <div className="main-bottom-left"></div>
        <div className="main-bottom-right"></div>
        <div className="right-top">
          <MonthlyGrowthCard />
        </div>
        <div className="right-bottom">
          <QuickActionsProjects />
        </div>
      </div>
    </>
  );
}
