import { useProjectContext } from "@/hooks/useProjectContext";
import { ProjectCard } from "./ProjectCard";
import "./projectCardList.css";
import { useState } from "react";
import { Pagination } from "../analysis/tables/Pagination";

export const ProjectCardList = () => {
  const { projects } = useProjectContext();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Define cuántos proyectos mostrar por página

  // Calcula los índices de los proyectos a mostrar en la página actual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentProjects = projects.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div style={{
      width: "100%"
    }}>
      <ul className="project__list">
        {currentProjects.length > 0 ? (
          currentProjects.map((proj, index) => (
            <ProjectCard
              key={index}
              name={proj.name}
              description={proj.description}
              sharedWith={proj.sharedWith || []}
            />
          ))
        ) : (
          <p className="no-projects-message">Aún no tienes proyectos.</p>
        )}
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