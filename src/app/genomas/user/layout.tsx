"use client";

import FooterLanding from "@/components/footer/FooterLanding";
import { HeaderUserWorkspace } from "@/components/headers/HeaderUserWorkspace";
import SidebarUser from "@/components/sidebar/SidebarUser";
import { AuthContextProvider } from "@/context/authContext";
import { UserContextProvider } from "@/context/userContext";

import "./layout.css";
import { ProjectProvider } from "@/context/ProjectContext";
import { ModalProvider } from "@/context/ModalsProject";
import { useModalContext } from "@/hooks/useModalsProject";
import { Modal } from "@/components/modals/Modal";
import { WorkspaceForm } from "@/components/sidebar/components/Workspaceform";
import { DeleteConfirmationForm } from "@/components/project/components/DeleteConfirmationForm";
import { MembersForm } from "@/components/sidebar/components/MembersForm";

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

// ⬇️ Componente separado para manejar los modales ⬇️
function ModalsContainer() {
  const {
    isWorkspaceModalOpen,
    closeWorkspaceModal,
    isDeleteConfirmationOpen,
    closeDeleteConfirmationModal,
    isMembersModalOpen,
    closeMembersModal,
  } = useModalContext();

  return (
    <>
      {isWorkspaceModalOpen && (
        <Modal
          title="Create new Project"
          isOpen={true}
          onClose={closeWorkspaceModal}
        >
          <WorkspaceForm />
        </Modal>
      )}

      {isDeleteConfirmationOpen && (
        <Modal
          title="Eliminated Project"
          isOpen={true}
          onClose={closeDeleteConfirmationModal}
        >
          <DeleteConfirmationForm />
        </Modal>
      )}

      {isMembersModalOpen && (
        <Modal
          title="Invite Member(s) to Project"
          isOpen={true}
          onClose={closeMembersModal}
        >
          <MembersForm />
        </Modal>
      )}
    </>
  );
}
