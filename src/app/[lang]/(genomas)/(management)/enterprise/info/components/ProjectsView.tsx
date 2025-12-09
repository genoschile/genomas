"use client";

import "./projectsView.css";
import { useProjectsContextEnterprise } from "@/features/enterprise/context/ProjectContextEnterprise";
import { FaProjectDiagram, FaUsers, FaPlay } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";
import { useState } from "react";

export const ProjectsView = () => {
  const { projectsByWorkspace } = useProjectsContextEnterprise();
  const [searchTerm, setSearchTerm] = useState("");

  // Flatten all projects from all workspaces
  const allProjects = Object.values(projectsByWorkspace).flat();

  const filteredProjects = allProjects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-view">
      <div className="projects-header">
        <div className="header-content">
          <FaProjectDiagram size={32} className="header-icon" />
          <div>
            <h2 className="header-title">Proyectos</h2>
            <p className="header-subtitle">
              {allProjects.length} proyecto{allProjects.length !== 1 ? "s" : ""}{" "}
              activo{allProjects.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <input
          type="text"
          placeholder="Buscar proyecto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="project-search"
        />
      </div>

      <div className="projects-grid">
        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <FaProjectDiagram size={64} className="empty-icon" />
            <p className="empty-text">
              {searchTerm
                ? "No se encontraron proyectos"
                : "No hay proyectos creados"}
            </p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-card-header">
                <h3 className="project-name">{project.name}</h3>
              </div>

              {project.description && (
                <p className="project-description">{project.description}</p>
              )}

              <div className="project-footer">
                <span className="project-date">
                  Creado: {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
