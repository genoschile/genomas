"use client";

import React, { useState } from "react";
import { useUserWorkspacesContext } from "@/features/user/context/userWorkspacesContext";
import "./projectWorkspacesSelected.css";

export const ProjectWorkspaceSelector: React.FC = () => {
  const { workspaces, selectedWorkspaceId, setSelectedWorkspaceId } =
    useUserWorkspacesContext();

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    // Aquí decides: buscar globalmente o en el workspace actual
    // Podrías levantar un evento o llamar a un hook de búsqueda
    console.log(
      e.target.value
        ? `Buscando globalmente: ${e.target.value}`
        : `Mostrando archivos del workspace ${selectedWorkspaceId}`
    );
  };

  return (
    <div className="workspace-search-container">
      {/* Selector de workspace */}
      <div className="select-dropdown--workspaces select-dropdown">
        <label htmlFor="workspaces-select" className="visually-hidden">
          Seleccionar workspace
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

      {/* Input de búsqueda */}
      <div className="search-input-wrapper">
        <label htmlFor="workspace-search" className="visually-hidden">
          Buscar archivos
        </label>
        <input
          id="workspace-search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search files..."
        />
      </div>
    </div>
  );
};
