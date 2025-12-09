"use client";

/* contexts */
import { SuggestionsProvider } from "@/features/enterprise/context/SuggestionsPromptContext";
import { WorkspacesProvider } from "@/features/enterprise/context/WorkspacesEnterpriseContext";
import { ProjectsProvider } from "@/features/enterprise/context/ProjectContextEnterprise";
import { ModalProvider } from "@/features/modals/context/ModalsProject";
import { GroupsProvider } from "@/features/enterprise/context/GroupsEnterpriseContext";
import { DataTableUserEnterpriseProvider } from "@/features/enterprise/context/DataTableUserEnterpriseContext";
import { EnterprisePageLayout } from "@/features/enterprise/page_layout";
import { ModalContainer } from "@/features/modals/components/ModalContainer";

export default function EnterpriseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EnterprisePageLayout role="user">
      <GroupsProvider>
        <SuggestionsProvider>
          <WorkspacesProvider>
            <ProjectsProvider>
              <DataTableUserEnterpriseProvider>
                <ModalProvider>
                  <ModalContainer />
                  {children}
                </ModalProvider>
              </DataTableUserEnterpriseProvider>
            </ProjectsProvider>
          </WorkspacesProvider>
        </SuggestionsProvider>
      </GroupsProvider>
    </EnterprisePageLayout>
  );
}
