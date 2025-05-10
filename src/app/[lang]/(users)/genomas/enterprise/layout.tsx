import { Suspense } from "react";
import "./style.css";

import { SidebarOrganization } from "@/components/sidebar/SidebarOrganization/SidebarOrganization";
import { TopBar } from "@/components/sidebar/SidebarOrganization/components/TopBar";
import { SuggestionsProvider } from "@/context/enterprise/SuggestionsPromptContext";

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SuggestionsProvider>
      <main className="enterpriselayout">
        <SidebarOrganization />

        <TopBar />
        <section>
          <Suspense fallback={<p> Loading ... </p>}>{children}</Suspense>
        </section>
      </main>
    </SuggestionsProvider>
  );
}
