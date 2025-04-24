"use client";

/* context */
import { AuthContextProvider } from "@/context/authContext";
import { UserContextProvider } from "@/context/userContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { ModalProvider } from "@/context/ModalsProject";

/* styles */
import "./layout.css";

/* components */
import { FooterLanding } from "@/components/footer/FooterLanding";
import { HeaderUserWorkspace } from "@/components/headers/HeaderUserWorkspace";
import { SidebarUser } from "@/components/sidebar/SidebarUser";
import { ModalContainer } from "@/components/modals/ModalContainer";

export default function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <ModalProvider>
          <ProjectProvider>
            <ModalContainer />
            <div className="userWorkspace--container">
              <HeaderUserWorkspace className="wu-header" />
              <SidebarUser className="wu-aside" />
              <main
                style={{
                  position: "relative",
                }}
                className="wu-main"
              >
                {children}
              </main>
              <FooterLanding className="wu-footer" />
            </div>
          </ProjectProvider>
        </ModalProvider>
      </UserContextProvider>
    </AuthContextProvider>
  );
}
