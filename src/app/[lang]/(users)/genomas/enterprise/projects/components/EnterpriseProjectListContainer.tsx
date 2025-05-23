"use client";

import { useProjectsContextEnterprise } from "@/context/enterprise/ProjectContextEnterprise";
import { ContainerDefaultEnterprise } from "../../components/ContainerDefaultEnterprise";
import { useWorkspacesContext } from "@/context/enterprise/WorkspacesEnterpriseContext";
import "./enterpriseProjectListContainer.css";

const headers = ["Nombre", "Fecha de creación", "Dueño", "Acciones", "Estado"];

export const EnterpriseProjectListContainer = () => {
  const { selectedWorkspaceId } = useWorkspacesContext();

  const { projectsByWorkspace } = useProjectsContextEnterprise();

  const projects = selectedWorkspaceId
    ? projectsByWorkspace[selectedWorkspaceId] ?? []
    : [];

  return (
    <ContainerDefaultEnterprise dinamicStyle="enterprise-projects__list">
      <div className="table">
        {/* Encabezados */}
        <ul
          className="table-header"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
          }}
        >
          {headers.map((header, index) => (
            <li key={index}>{header}</li>
          ))}
        </ul>
        {/* Filas */}
        {projects.length === 0 ? (
          <ul
            className="table-row"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
            }}
          >
            <li
              style={{
                gridColumn: `span ${headers.length}`,
                textAlign: "center",
              }}
            >
              No hay proyectos disponibles.
            </li>
          </ul>
        ) : (
          projects.map((project) => (
            <ul
              className="table-row"
              key={project.id}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${headers.length}, 1fr)`,
              }}
            >
              <li>{project.name}</li>
              <li>{new Date(project.createdAt).toLocaleDateString()}</li>
              <li>{project.ownerId}</li>
              <li>
                <button>Ver</button>
              </li>
              <li>Activo</li>
            </ul>
          ))
        )}
      </div>
    </ContainerDefaultEnterprise>
  );
};
