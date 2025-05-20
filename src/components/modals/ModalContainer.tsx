import { MODAL_IDS } from "@/lib/types/modal";
import { WorkspaceForm } from "../forms/Workspaceform";
import { Modal } from "./Modal";
import { DeleteConfirmationForm } from "../project/components/DeleteConfirmationForm";
import { MembersForm } from "../forms/MembersForm";
import { AddUserFormEnterprise } from "../forms/AddUserEnterprise";

export const ModalContainer = () => {
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
        id={MODAL_IDS.ADD_USER_ENTERPRISE}
        title="Add User(s) to Enterprise"
      >
        <AddUserFormEnterprise />
      </Modal>
    </>
  );
};
