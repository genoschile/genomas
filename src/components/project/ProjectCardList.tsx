"use client";

/* hooks */
import { useProjectContext } from "@/hooks/useProjectContext";
import { useState } from "react";

/* components */
import { Pagination } from "../analysis/tables/Pagination";
import { ProjectCardListItems } from "./ProjectCardListItems";

/* context */
import { useUserWorkspacesContext } from "@/context/userWorkspacesContext";

/* styles */
import "./projectCardList.css";
import { useFilesContext } from "./context/FilesContext";

export const ProjectCardList = () => {
  const { projects, isLoading, ChangeSelectedProjectId, selectedProjectId } = useProjectContext();
  const { selectedWorkspaceId } = useUserWorkspacesContext();
  const [currentPage, setCurrentPage] = useState(1);

  const { files, isLoadingFiles, clearFiles } = useFilesContext();

  const postsPerPage = 6;

  if (isLoading) {
    return <p className="loading-message">Cargando proyectos...</p>;
  }

  // Si hay un proyecto seleccionado, mostramos sus archivos
  if (selectedProjectId) {
    return (
      <div className="files-view">
        <button
          onClick={() => {
            ChangeSelectedProjectId(null);
            clearFiles();
          }}
          className="back-button"
        >
          ← Volver a proyectos
        </button>

        <h2>Archivos del proyecto</h2>

        {isLoadingFiles ? (
          <p>Cargando archivos...</p>
        ) : files.length === 0 ? (
          <p>No hay archivos en este proyecto.</p>
        ) : (
          <ul className="files-list">
            {files.map((file) => (
              <li key={file.id}>
                <strong>{file.name}</strong> — {file.size} KB
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return <p className="no-projects-message">Aún no tienes proyectos.</p>;
  }

  const filteredProjects = projects.filter((proj) => {
    if (selectedWorkspaceId && selectedWorkspaceId !== "0") {
      return proj.workspaceId === selectedWorkspaceId;
    }
    return true;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <div className="project-card-list-container">
      <ProjectCardListItems currentProjects={currentProjects} />

      {filteredProjects.length > postsPerPage && (
        <Pagination
          totalPosts={filteredProjects.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}

      {filteredProjects.length === 0 && (
        <p style={{ textAlign: "center" }}>
          {selectedWorkspaceId && selectedWorkspaceId !== "0"
            ? "No projects found for the selected workspace."
            : "No projects available or select a workspace to view projects."}
        </p>
      )}
    </div>
  );
};
