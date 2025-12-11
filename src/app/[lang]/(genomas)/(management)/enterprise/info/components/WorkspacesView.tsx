"use client";

import "./workspacesView.css";
import { useWorkspacesContext } from "@/features/enterprise/context/WorkspacesEnterpriseContext";
import { MdWorkspaces } from "react-icons/md";
import { useState } from "react";
import { ContainerDefaultEnterprise } from "@/features/enterprise/components/ContainerDefaultEnterprise";

export const WorkspacesView = () => {
  const { workspaces } = useWorkspacesContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkspaces = workspaces.filter((ws) =>
    ws.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ContainerDefaultEnterprise>
      <div className="workspaces-header">
        <div className="header-content">
          <MdWorkspaces size={32} className="header-icon" />
          <div>
            <h2 className="header-title">Workspaces</h2>
            <p className="header-subtitle">
              {workspaces.length} workspace
              {workspaces.length !== 1 ? "s" : ""} configurado
              {workspaces.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <input
          type="text"
          placeholder="Buscar workspace..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="workspace-search"
        />
      </div>

      <div className="workspaces-grid">
        {filteredWorkspaces.length === 0 ? (
          <div className="empty-state">
            <MdWorkspaces size={64} className="empty-icon" />
            <p className="empty-text">
              {searchTerm
                ? "No se encontraron workspaces"
                : "No hay workspaces configurados"}
            </p>
          </div>
        ) : (
          filteredWorkspaces.map((workspace) => (
            <div key={workspace.id} className="workspace-card">
              <div className="workspace-card-header">
                <h3 className="workspace-name">{workspace.name}</h3>
                <span className="pipeline-badge">
                  {workspace.pipelineType || "Standard"}
                </span>
              </div>

              {workspace.description && (
                <p className="workspace-description">{workspace.description}</p>
              )}

              <div className="workspace-footer">
                <span className="workspace-date">
                  Creado: {new Date(workspace.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </ContainerDefaultEnterprise>
  );
};
