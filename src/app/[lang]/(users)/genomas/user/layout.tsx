"use client";

/* context */
import { AuthContextProvider } from "@/context/authContext";
import { UserContextProvider } from "@/context/userContext";
import { ProjectProvider } from "@/context/ProjectContext";

/* styles */
import "./layout.css";

/* components */
import { FooterLanding } from "@/components/footer/FooterLanding";
import { HeaderUserWorkspace } from "@/components/headers/HeaderUserWorkspace";
import { SidebarUser } from "@/components/sidebar/SidebarUser";

export default function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <ProjectProvider>
          <div className="userWorkspace--container">
            <HeaderUserWorkspace className="wu-header" />
            <SidebarUser className="wu-aside" />
            <main className="wu-main">{children}</main>
            <FooterLanding className="wu-footer" />
          </div>
        </ProjectProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}
