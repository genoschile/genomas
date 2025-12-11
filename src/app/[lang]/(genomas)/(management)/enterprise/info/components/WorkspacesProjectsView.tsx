"use client";

import "./workspacesProjectsView.css";
import { useWorkspacesContext } from "@/features/enterprise/context/WorkspacesEnterpriseContext";
import { useProjectsContextEnterprise } from "@/features/enterprise/context/ProjectContextEnterprise";
import { MdWorkspaces, MdAdd } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { useState } from "react";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { MODAL_IDS } from "@/features/modals/context/ModalsProject";

export const WorkspacesProjectsView = () => {
  const { workspaces } = useWorkspacesContext();
  const { projectsByWorkspace } = useProjectsContextEnterprise();
  const { openModal } = useModalContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleCreateProject = (workspaceId: string) => {
    openModal(MODAL_IDS.ADD_PROJECTS_ENTERPRISE, { workspaceId });
  };

  // Flatten all projects
  const allProjects = Object.values(projectsByWorkspace).flat();

  const filteredWorkspaces = workspaces.filter((ws) =>
    ws.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjects = allProjects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="workspaces-projects-view">
      <div className="view-header">
        <div className="header-stats">
          <div className="stat-box">
            <MdWorkspaces size={24} />
            <div>
              <span className="stat-number">{workspaces.length}</span>
              <span className="stat-label">Workspaces</span>
            </div>
          </div>
          <div className="stat-box">
            <FaProjectDiagram size={24} />
            <div>
              <span className="stat-number">{allProjects.length}</span>
              <span className="stat-label">Proyectos</span>
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Buscar workspaces o proyectos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredWorkspaces.length === 0 && filteredProjects.length === 0 ? (
        <div className="empty-state">
          <MdWorkspaces size={64} className="empty-icon" />
          <p className="empty-text">
            {searchTerm
              ? "No se encontraron resultados"
              : "No hay workspaces ni proyectos configurados"}
          </p>
        </div>
      ) : (
        <div className="workspaces-list">
          {filteredWorkspaces.map((workspace) => {
            const workspaceProjects = projectsByWorkspace[workspace.id] || [];
            const filteredWorkspaceProjects = searchTerm
              ? workspaceProjects.filter((p) =>
                  p.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
              : workspaceProjects;

            // Solo mostrar workspace si coincide con búsqueda o tiene proyectos que coinciden
            if (
              searchTerm &&
              !workspace.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) &&
              filteredWorkspaceProjects.length === 0
            ) {
              return null;
            }

            return (
              <div key={workspace.id} className="workspace-section">
                <div className="workspace-header">
                  <div className="workspace-info">
                    <MdWorkspaces size={24} className="workspace-icon" />
                    <div>
                      <h3 className="workspace-name">{workspace.name}</h3>
                      {workspace.description && (
                        <p className="workspace-description">
                          {workspace.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="workspace-meta">
                    <span className="pipeline-badge">
                      {workspace.pipelineType || "Standard"}
                    <button
                      className="create-project-btn"
                      onClick={() => handleCreateProject(workspace.id)}
                      title="Crear nuevo proyecto"
                    >
                      <MdAdd size={18} />
                      Crear Proyecto
                    </button>
                    </span>
                    <span className="projects-count">
                      {workspaceProjects.length} proyecto
                      {workspaceProjects.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                {filteredWorkspaceProjects.length > 0 ? (
                  <div className="projects-grid">
                    {filteredWorkspaceProjects.map((project) => (
                      <div key={project.id} className="project-card">
                        <div className="project-header">
                          <FaProjectDiagram
                            size={16}
                            className="project-icon"
                          />
                          <h4 className="project-name">{project.name}</h4>
                        </div>
                        {project.description && (
                          <p className="project-description">
                            {project.description}
                          </p>
                        )}
                        <div className="project-footer">
                          <span className="project-date">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-projects">
                    <p>No hay proyectos en este workspace</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
