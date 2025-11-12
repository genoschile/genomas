"use client";

import { WorkspaceForm } from "../forms/Workspaceform";
import { Modal } from "./Modal";
import { DeleteConfirmationForm } from "../project/components/DeleteConfirmationForm";
import { MembersForm } from "../forms/MembersForm";
import { AddGroupsFormEnterprise } from "../forms/AddGroupsEnterprise";
import { AddWorkspacesEnterpriseForm } from "../forms/AddWorkspacesEnterpriseForm";
import { MODAL_IDS } from "@/context/ModalsProject";
import { AddProjectEnterpriseForm } from "../forms/AddProjectEnterpriseForm";
import { AddUsersEnterprise } from "../forms/AddUsersEnterprise";
import { TbBulb } from "react-icons/tb";
import { ModalGroupsDeleteEnterprise } from "../forms/DeleteGroupsEnterprise";
import { ModalUtilsUsers } from "./modalUtilsUsers";
import { WorkflowsForm } from "@/app/[lang]/(genomas)/user/components/utilsForm/WorkflowsForm";
import { StepsProvider } from "@/app/[lang]/(genomas)/user/components/utilsForm/workflowContext";
import { UploadForm } from "@/app/[lang]/(genomas)/user/components/utilsForm/UploadForm";
import { TrashContainer } from "@/app/[lang]/(genomas)/user/components/TrashContainer";
import { ExecutorContainer } from "@/app/[lang]/(genomas)/user/components/utilsForm/ExecutorContainer";
import { UploadStepsProvider } from "@/app/[lang]/(genomas)/user/components/utilsForm/stepUploads/UploadStepContext";
import { ModalEditsUsersEnterprise } from "@/app/[lang]/(genomas)/(high)/enterprise/users/components/ModalEditsUsersEnterprise";
import { ModalEditGroups } from "@/app/[lang]/(genomas)/(high)/enterprise/groups/component/ModalEditGroups";

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
        {({ payload }) => <ModalEditGroups groupId={payload.userId} />}
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
