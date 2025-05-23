"use client"

import { useWorkspacesContext } from "@/context/enterprise/WorkspacesEnterpriseContext";
import { ItemWorkspace } from "./ItemWorkspaces";
import "./containerListWorkspaces.css";

export const ContainerListWorkspaces = ({}: {}) => {
  const { workspaces } = useWorkspacesContext();

  return (
    <ul className="container__list-workspaces">
      {workspaces.map((workspace) => (
        <ItemWorkspace key={workspace.id} workspace={workspace} />
      ))}
    </ul>
  );
};
