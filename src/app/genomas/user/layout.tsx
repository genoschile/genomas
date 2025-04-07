"use client";

/* context */
import { AuthContextProvider } from "@/context/authContext";
import { UserContextProvider } from "@/context/userContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { ModalProvider } from "@/context/ModalsProject";

/* styles */
import "./layout.css";
import { Modal } from "@/components/modals/Modal";

/* components */
import { WorkspaceForm } from "@/components/sidebar/components/Workspaceform";
import { DeleteConfirmationForm } from "@/components/project/components/DeleteConfirmationForm";
import { MembersForm } from "@/components/sidebar/components/MembersForm";
import FooterLanding from "@/components/footer/FooterLanding";
import { HeaderUserWorkspace } from "@/components/headers/HeaderUserWorkspace";
import SidebarUser from "@/components/sidebar/SidebarUser";

/* types */
import { MODAL_IDS } from "@/lib/types/modal";

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
            <ModalsContainer />
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

function ModalsContainer() {
  return (
    <>
      <Modal id={MODAL_IDS.WORKSPACE} title="Create new Project">
        <WorkspaceForm />
      </Modal>

      <Modal id={MODAL_IDS.DELETE_CONFIRMATION} title="Eliminated Project">
        <DeleteConfirmationForm />
      </Modal>

      <Modal id={MODAL_IDS.MEMBERS} title="Invite Member(s) to Project">
        <MembersForm />
      </Modal>
    </>
  );
}
