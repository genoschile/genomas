"use client";

/* context */
import { ProjectProvider } from "@/context/ProjectContext";
import { CurrentProjectProvider } from "@/context/currentProject";
import { UserWorkspacesProvider } from "@/context/userWorkspacesContext";
import { ProcessContextProvider } from "@/context/ProcessContext";

/* styles */
import "./layout.css";

/* components */
import { FooterLanding } from "@/components/footer/FooterLanding";
import { HeaderUserWorkspace } from "@/components/headers/HeaderUserWorkspace";
import { SidebarUser } from "@/components/sidebar/SidebarUser";
import { ModalContainer } from "@/components/modals/ModalContainer";
import { FilesProvider } from "@/components/project/context/FilesContext";

export default function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProcessContextProvider>
      <CurrentProjectProvider>
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
      </CurrentProjectProvider>
    </ProcessContextProvider>
  );
}
