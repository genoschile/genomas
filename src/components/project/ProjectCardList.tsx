/* hooks */
import { useProjectContext } from "@/hooks/useProjectContext";
import { useState } from "react";

/* components */
import { ProjectCard } from "./ProjectCard";
import { Pagination } from "../analysis/tables/Pagination";

/* styles */
import "./projectCardList.css";
import { useUserWorkspacesContext } from "@/context/userWorkspacesContext";

export const ProjectCardList = () => {
  const { projects, isLoading } = useProjectContext();
  const { selectedWorkspaceId } = useUserWorkspacesContext();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  if (isLoading) {
    return <p className="loading-message">Cargando proyectos...</p>;
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
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flex: "1",
      }}
    >
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

export const ProjectCardListItems = ({
  currentProjects = [],
}: {
  currentProjects?: {
    id: string;
    name: string;
    description: string;
    sharedWith?: string[];
    workspaceId: string;
  }[];
}) => {
  return (
    <ul className="project__list">
      {currentProjects.map((proj) => (
        <ProjectCard
          id={proj.id}
          key={proj.id}
          name={proj.name}
          description={proj.description}
          sharedWith={proj.sharedWith || []}
        />
      ))}
    </ul>
  );
};
