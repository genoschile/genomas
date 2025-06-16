"use client";

/* context */
import { ProjectProvider } from "@/context/ProjectContext";

/* styles */
import "./layout.css";

/* components */
import { FooterLanding } from "@/components/footer/FooterLanding";
import { HeaderUserWorkspace } from "@/components/headers/HeaderUserWorkspace";
import { SidebarUser } from "@/components/sidebar/SidebarUser";
import { ModalContainer } from "@/components/modals/ModalContainer";
import { CurrentProjectProvider } from "@/context/currentProject";
import { UserWorkspacesProvider } from "@/context/userWorkspacesContext";

export default function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrentProjectProvider>
      <UserWorkspacesProvider>
        <ProjectProvider>
          <ModalContainer />
          <div className="userWorkspace--container">
            <HeaderUserWorkspace className="wu-header" />
            <SidebarUser className="wu-aside" />
            <main className="wu-main">{children}</main>
            <FooterLanding className="wu-footer" />
          </div>
        </ProjectProvider>
      </UserWorkspacesProvider>
    </CurrentProjectProvider>
  );
}
