import { Suspense } from "react";
import "./style.css";
import "./layout.css";

import { SidebarOrganization } from "@/components/sidebar/SidebarOrganization/SidebarOrganization";
import { TopBar } from "@/components/sidebar/SidebarOrganization/components/TopBar";
import { SuggestionsProvider } from "@/context/enterprise/SuggestionsPromptContext";
import { ThemeProvider } from "@/context/enterprise/ThemeContext";
import { OrganizationContextProvider } from "@/context/OrganizationContext";
import { ModalContainer } from "@/components/modals/ModalContainer";
import { WorkspacesProvider } from "@/context/enterprise/WorkspacesEnterpriseContext";
import { ProjectsProvider } from "@/context/enterprise/ProjectContextEnterprise";
import { ModalProvider } from "@/context/ModalsProject";
import { GroupsProvider } from "@/context/enterprise/GroupsEnterpriseContext";

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <OrganizationContextProvider>
        <GroupsProvider>
          <SuggestionsProvider>
            <WorkspacesProvider>
              <ProjectsProvider>
                <ModalProvider>
                  <ModalContainer />
                  <main className="enterpriselayout">
                    <SidebarOrganization />
                    <TopBar />
                    <section>
                      <Suspense fallback={<p> Loading ... </p>}>
                        {children}
                      </Suspense>
                    </section>
                  </main>
                </ModalProvider>
              </ProjectsProvider>
            </WorkspacesProvider>
          </SuggestionsProvider>
        </GroupsProvider>
      </OrganizationContextProvider>
    </ThemeProvider>
  );
}
