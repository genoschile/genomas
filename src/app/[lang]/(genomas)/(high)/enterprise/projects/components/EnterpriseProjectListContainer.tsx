"use client";

import { useProjectsContextEnterprise } from "@/context/enterprise/ProjectContextEnterprise";
import { ContainerDefaultEnterprise } from "../../components/ContainerDefaultEnterprise";
import { useWorkspacesContext } from "@/context/enterprise/WorkspacesEnterpriseContext";
import "./enterpriseProjectListContainer.css";

export interface IProjectResponse {
  id: string;
  name: string;
  description: string | null;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
  users?: { id: string }[];
  groups?: { id: string }[];
  files?: File[];
  executions?: string[];
}

const headers = [
  "Nombre",
  "Fecha de creación",
  "Dueño",
  "Usuarios compartidos",
  "Grupos compartidos",
  "Ejecuciones",
  "Acciones",
  "Estado",
];

export const EnterpriseProjectListContainer = () => {
  const { selectedWorkspaceId } = useWorkspacesContext();
  const { projectsByWorkspace } = useProjectsContextEnterprise();

  const projects = selectedWorkspaceId
    ? projectsByWorkspace[selectedWorkspaceId] ?? []
    : [];

  if (!selectedWorkspaceId) return null;

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

              {/* Usuarios compartidos */}
              <li>
                <ul style={{ paddingLeft: "1rem", listStyleType: "disc" }}>
                  {project.users?.length ? (
                    project.users.map((user) => (
                      <li key={user.id}>{user.id}</li>
                    ))
                  ) : (
                    <li style={{ fontStyle: "italic", color: "#666" }}>
                      No hay usuarios
                    </li>
                  )}
                </ul>
              </li>

              {/* Grupos compartidos */}
              <li>
                <ul style={{ paddingLeft: "1rem", listStyleType: "disc" }}>
                  {project.groups?.length ? (
                    project.groups.map((group) => (
                      <li key={group.id}>{group.id}</li>
                    ))
                  ) : (
                    <li style={{ fontStyle: "italic", color: "#666" }}>
                      No hay grupos
                    </li>
                  )}
                </ul>
              </li>
              <li>{project.executions?.length ?? 0}</li>

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
