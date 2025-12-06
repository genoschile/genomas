"use client";

/* contexts */
import { SuggestionsProvider } from "@/features/enterprise/context/SuggestionsPromptContext";
import { ThemeProvider } from "@/features/theme/context/ThemeContext";
import { WorkspacesProvider } from "@/features/enterprise/context/WorkspacesEnterpriseContext";
import { ProjectsProvider } from "@/features/enterprise/context/ProjectContextEnterprise";
import { ModalProvider } from "@/features/modals/context/ModalsProject";
import { GroupsProvider } from "@/features/enterprise/context/GroupsEnterpriseContext";

/* hooks */
import { DataTableUserEnterpriseProvider } from "@/features/enterprise/context/DataTableUserEnterpriseContext";
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
