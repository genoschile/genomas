"use client";

/* context */
import { ProjectProvider } from "@/features/user/context/ProjectContext";
import { UserWorkspacesProvider } from "@/features/user/context/userWorkspacesContext";
import { ProcessContextProvider } from "@/features/user/context/ProcessContext";

/* styles */
import "./layout.css";

/* components */
import { FooterLanding } from "@/features/landing/components/FooterLanding";
import { HeaderUserWorkspace } from "@/components/headers/HeaderUserWorkspace";
import { SidebarUser } from "@/components/sidebar/SidebarUser";
import { ModalContainer } from "@/features/modals/components/ModalContainer";
import { FilesProvider } from "@/components/project/context/FilesContext";

export default function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProcessContextProvider>
      <UserWorkspacesProvider>
        <ProjectProvider>
          <ModalContainer />
          <FilesProvider>
            <div className="userWorkspace--container">
              <HeaderUserWorkspace className="wu-header" />
              <SidebarUser className="wu-aside" />
              <main className="wu-main">{children}</main>
              <FooterLanding className="wu-footer" />
            </div>
          </FilesProvider>
        </ProjectProvider>
      </UserWorkspacesProvider>
    </ProcessContextProvider>
  );
}
