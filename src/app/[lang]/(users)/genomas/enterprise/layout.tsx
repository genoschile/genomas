"use client";

/* styles */
import "./style.css";
import "./layout.css";

/* contexts */
import { SuggestionsProvider } from "@/context/enterprise/SuggestionsPromptContext";
import { ThemeProvider } from "@/context/enterprise/ThemeContext";
import { WorkspacesProvider } from "@/context/enterprise/WorkspacesEnterpriseContext";
import { ProjectsProvider } from "@/context/enterprise/ProjectContextEnterprise";
import { ModalProvider } from "@/context/ModalsProject";
import { GroupsProvider } from "@/context/enterprise/GroupsEnterpriseContext";

/* components */
import { SidebarOrganization } from "@/components/sidebar/SidebarOrganization/SidebarOrganization";
import { TopBar } from "@/components/sidebar/SidebarOrganization/components/TopBar";
import { ModalContainer } from "@/components/modals/ModalContainer";
import { CommandMenu } from "@/components/sidebar/SidebarOrganization/components/Search";

/* hooks */
import { Suspense, useState } from "react";

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSetOpenSidebar = () => {
    setOpenSidebar(openSidebar => !openSidebar);
  };

  return (
    <ThemeProvider>
      <GroupsProvider>
        <SuggestionsProvider>
          <WorkspacesProvider>
            <ProjectsProvider>
              <ModalProvider>
                <ModalContainer />
                <main className="enterpriselayout">
                  <SidebarOrganization 
                    openSidebar={openSidebar}
                    handleSetOpenSidebar={handleSetOpenSidebar}
                  />
                  <TopBar handleSetOpenSidebar={handleSetOpenSidebar} />
                  <section>
                    <Suspense fallback={<p> Loading ... </p>}>
                      {children}
                    </Suspense>
                    <CommandMenu />
                  </section>
                </main>
              </ModalProvider>
            </ProjectsProvider>
          </WorkspacesProvider>
        </SuggestionsProvider>
      </GroupsProvider>
    </ThemeProvider>
  );
}
