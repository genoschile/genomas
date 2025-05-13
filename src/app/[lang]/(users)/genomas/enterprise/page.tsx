import "./style.css";

import { MetricsEnterprise } from "@/components/enterprise/metrics/MetricsEnterprise";
import { AdminAccountEnterpriseCredentials } from "@/components/enterprise/adminAccountEnterpriseCredentials/AdminAccountEnterpriseCredentials";
import { ChatSuggestionTitle } from "@/components/enterprise/headerMainSectionEnterprise/HeaderMainSectionEnterprise";
import { QuickActions } from "@/components/enterprise/quickactions/QuickActions";

export default function page() {
  return (
    <>
      <ChatSuggestionTitle
        title="Hello there"
        description="What do you think of your organization's summary?"
      />

      <article>
        <MetricsEnterprise />
      </article>

      <article className="admincredential">
        <h1>Organization Admin credentials</h1>

        <AdminAccountEnterpriseCredentials />
      </article>

      <article>
        <h1>Quick Actions</h1>

        <QuickActions />
      </article>
    </>
  );
}
