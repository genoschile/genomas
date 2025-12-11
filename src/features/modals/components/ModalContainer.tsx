"use client";

import { WorkspaceForm } from "../../../components/forms/Workspaceform";
import { Modal } from "./Modal";
import { DeleteConfirmationForm } from "../../../components/project/components/DeleteConfirmationForm";
import { MembersForm } from "../../../components/forms/MembersForm";
import { AddGroupsFormEnterprise } from "../../../components/forms/AddGroupsEnterprise";
import { AddWorkspacesEnterpriseForm } from "../../../components/forms/AddWorkspacesEnterpriseForm";
import { MODAL_IDS } from "@/features/modals/context/ModalsProject";
import { AddProjectEnterpriseForm } from "../../../components/forms/AddProjectEnterpriseForm";
import { AddUsersEnterprise } from "../../auth/components/AddUsersEnterprise";
import { TbBulb } from "react-icons/tb";
import { ModalGroupsDeleteEnterprise } from "../../../components/forms/DeleteGroupsEnterprise";
import { ModalUtilsUsers } from "./modalUtilsUsers";
import { WorkflowsForm } from "@/features/user/components/utilsForm/WorkflowsForm";
import { StepsProvider } from "@/features/user/components/utilsForm/workflowContext";
import { UploadForm } from "@/features/user/components/utilsForm/UploadForm";
import { TrashContainer } from "@/features/user/components/TrashContainer";
import { ExecutorContainer } from "@/features/user/components/utilsForm/ExecutorContainer";
import { UploadStepsProvider } from "@/features/user/components/utilsForm/stepUploads/UploadStepContext";
import { ModalEditsUsersEnterprise } from "@/features/enterprise/components/enterprise/users/components/ModalEditsUsersEnterprise";
import { ModalEditGroups } from "@/features/enterprise/components/enterprise/groups/component/ModalEditGroups";
import { ModalDeleteUserConfirmation } from "@/features/enterprise/components/enterprise/users/components/ModalDeleteUserConfirmation";
import { ModalAssignUserToGroup } from "./ModalAssignUserToGroup";
import { ModalViewGroupsList } from "./ModalViewGroupsList";


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
        id={MODAL_IDS.ADD_GROUPS_ENTERPRISE}
        title="Add Groups(s) to Enterprise"
      >
        <AddGroupsFormEnterprise />
      </Modal>

      <Modal id={MODAL_IDS.WORKSPACE_ENTERPRISE} title="Create new Workspace">
        <AddWorkspacesEnterpriseForm />
      </Modal>

      <Modal id={MODAL_IDS.ADD_PROJECT_ENTERPRISE} title="Add Projects">
        <AddProjectEnterpriseForm />
      </Modal>

      <Modal id={MODAL_IDS.HELPER_SUGGESTIONS} title="Suggestions">
        <ModalHelperSuggestions />
      </Modal>

      <Modal id={MODAL_IDS.DELETE_GROUPS_ENTERPRISE} title="Delete Group">
        <ModalGroupsDeleteEnterprise />
      </Modal>

      <Modal id={MODAL_IDS.EDIT_GROUPS_ENTERPRISE} title="Edit Group">
        {({ payload }) => <ModalEditGroups groupId={payload.groupId} />}
      </Modal>

      <Modal id={MODAL_IDS.EDIT_USERS_ENTERPRISE} title="Edit Users">
        {({ payload }) => <ModalEditsUsersEnterprise userId={payload.userId} />}
      </Modal>

      <ModalUtilsUsers id={MODAL_IDS.UPLOAD_FILES} title="Upload Files">
        <UploadStepsProvider>
          <UploadForm />
        </UploadStepsProvider>
      </ModalUtilsUsers>

      <ModalUtilsUsers id={MODAL_IDS.WORKFLOWS} title="Workflows">
        <StepsProvider>
          <WorkflowsForm />
        </StepsProvider>
      </ModalUtilsUsers>

      <ModalUtilsUsers id={MODAL_IDS.TRASH_USER} title="Trash">
        <TrashContainer />
      </ModalUtilsUsers>

      <ModalUtilsUsers id={MODAL_IDS.EXECUTOR} title="Executor">
        <ExecutorContainer />
      </ModalUtilsUsers>

      <Modal id={MODAL_IDS.ADD_USER_ENTERPRISE} title="Add Users">
        <AddUsersEnterprise />
      </Modal>
    </>
  );
};

export const ModalContainerAddUsersEnterprise = () => {
  return (
    <>
      <Modal id={MODAL_IDS.ADD_USER_ENTERPRISE} title="Add Users">
        <AddUsersEnterprise />
      </Modal>
      
      <Modal id={MODAL_IDS.EDIT_USERS_ENTERPRISE} title="Edit User">
        {({ payload }) => <ModalEditsUsersEnterprise userId={payload.userId} />}
      </Modal>
      
      <Modal id={MODAL_IDS.DELETE_USER_CONFIRMATION} title="Confirmar Eliminación">
        {({ payload }) => <ModalDeleteUserConfirmation userId={payload.userId} />}
      </Modal>

      <Modal id={MODAL_IDS.ASSIGN_USER_TO_GROUP} title="Asignar Grupos">
        {({ payload }) => <ModalAssignUserToGroup payload={payload} />}
      </Modal>

      <Modal id={MODAL_IDS.VIEW_GROUPS_LIST} title="Lista de Grupos">
        <ModalViewGroupsList />
      </Modal>
    </>
  );
};

export const ModalHelperSuggestions = () => {
  return (
    <section className="suggestions-help">
      <h2>
        <TbBulb className="icon" />
        How Group Suggestions Work
      </h2>
      <p>
        This tool uses AI to generate smart group suggestions based on the
        roles, access levels, and project assignments you provide.
      </p>
      <ul>
        <li>
          <strong>User Roles:</strong> e.g., "Admin, Developer, Manager"
        </li>
        <li>
          <strong>Access Rights:</strong> e.g., "Read, Write, Execute"
        </li>
        <li>
          <strong>Group Assignments:</strong> e.g., "Project Alpha, Beta Team"
        </li>
      </ul>
      <p>
        The AI will analyze your input and suggest the most suitable groups or
        configurations based on patterns and semantic relationships it detects.
      </p>
    </section>
  );
};

export const ModalGroupsEditEnterprise = () => {
  return (
    <section className="groups-edit">
      <h2>Edit Group</h2>
      <p>
        Use this form to edit the details of an existing group. Make sure to
        review all changes before saving.
      </p>
    </section>
  );
};
