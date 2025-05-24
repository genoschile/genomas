"use client"

import { WorkspaceForm } from "../forms/Workspaceform";
import { Modal } from "./Modal";
import { DeleteConfirmationForm } from "../project/components/DeleteConfirmationForm";
import { MembersForm } from "../forms/MembersForm";
import { AddGroupsFormEnterprise } from "../forms/AddGroupsEnterprise";
import { AddWorkspacesEnterpriseForm } from "../forms/AddWorkspacesEnterpriseForm";
import { MODAL_IDS } from "@/context/ModalsProject";
import { AddProjectEnterpriseForm } from "../forms/AddProjectEnterpriseForm";

export const ModalContainer = () => {
  console.log("ModalContainer: ", MODAL_IDS.ADD_GROUPS_ENTERPRISE);

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

      <Modal
        id={MODAL_IDS.ADD_GROUPS_ENTERPRISE}
        title="Add Groups(s) to Enterprise"
      >
        <>
          {console.log(
            "Rendering ADD_GROUPS_ENTERPRISE modal with ID:",
            MODAL_IDS.ADD_GROUPS_ENTERPRISE
          )}
          <AddGroupsFormEnterprise />
        </>
      </Modal>

      <Modal id={MODAL_IDS.WORKSPACE_ENTERPRISE} title="Create new Workspace">
        <AddWorkspacesEnterpriseForm />
      </Modal>

      <Modal id={MODAL_IDS.ADD_PROJECT_ENTERPRISE} title="Add Projects">
        <AddProjectEnterpriseForm />
      </Modal>
    </>
  );
};
