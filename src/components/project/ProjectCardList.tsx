/* hooks */
import { useProjectContext } from "@/hooks/useProjectContext";
import { useState } from "react";

/* components */
import { ProjectCard } from "./ProjectCard";
import { Pagination } from "../analysis/tables/Pagination";

/* styles */
import "./projectCardList.css";

export const ProjectCardList = () => {
  const { projects, isLoading } = useProjectContext();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  if (isLoading) {
    return <p className="loading-message">Cargando proyectos...</p>;
  }

  if (!projects || projects.length === 0) {
    return <p className="no-projects-message">Aún no tienes proyectos.</p>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProjects = projects.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div style={{ width: "100%" }}>
      <ul className="project__list">
        {currentProjects.map((proj, index) => (
          <ProjectCard
            key={index}
            name={proj.id}
            description={proj.name}
            sharedWith={proj.sharedWith || []}
          />
        ))}
      </ul>

      {projects.length > postsPerPage && (
        <Pagination
          totalPosts={projects.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};
