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
        <>
          <AddGroupsFormEnterprise />
        </>
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
