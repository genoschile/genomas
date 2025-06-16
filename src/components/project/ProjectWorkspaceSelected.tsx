"use client";

import { useUserWorkspacesContext } from "@/context/userWorkspacesContext";
import "./projectWorkspacesSelected.css";

export const ProjectWorkspaceSelected = () => {
  const { workspaces, selectedWorkspaceId, setSelectedWorkspaceId } =
    useUserWorkspacesContext();

  return (
    <div className="select-dropdown--workspaces select-dropdown">
      <label htmlFor="workspaces-select" className="visually-hidden">
        Seleccionar idioma
      </label>
      <select
        id="workspaces-select"
        value={selectedWorkspaceId || ""}
        onChange={(e) => setSelectedWorkspaceId(e.target.value)}
      >
        <option value="" disabled>
          Select a workspace
        </option>

        {workspaces ? (
          workspaces.map((workspace) => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            Loading workspaces...
          </option>
        )}
      </select>
    </div>
  );
};
