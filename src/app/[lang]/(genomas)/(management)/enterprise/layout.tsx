"use client";

/* contexts */
import { SuggestionsProvider } from "@/context/enterprise/SuggestionsPromptContext";
import { ThemeProvider } from "@/features/theme/context/ThemeContext";
import { WorkspacesProvider } from "@/context/enterprise/WorkspacesEnterpriseContext";
import { ProjectsProvider } from "@/context/enterprise/ProjectContextEnterprise";
import { ModalProvider } from "@/features/modals/context/ModalsProject";
import { GroupsProvider } from "@/context/enterprise/GroupsEnterpriseContext";

/* hooks */
import { DataTableUserEnterpriseProvider } from "@/context/enterprise/DataTableUserEnterpriseContext";
import BaseLayout from "../layout";

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <GroupsProvider>
        <SuggestionsProvider>
          <WorkspacesProvider>
            <ProjectsProvider>
              <DataTableUserEnterpriseProvider>
                <ModalProvider>
                  <BaseLayout role="user">{children}</BaseLayout>
                </ModalProvider>
              </DataTableUserEnterpriseProvider>
            </ProjectsProvider>
          </WorkspacesProvider>
        </SuggestionsProvider>
      </GroupsProvider>
    </ThemeProvider>
  );
}
