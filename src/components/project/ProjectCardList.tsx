import { useProjectContext } from "@/hooks/useProjectContext";
import { ProjectCard } from "./ProjectCard";
import "./projectCardList.css";

export const ProjectCardList = () => {
  const { projects } = useProjectContext();

  return (
    <ul className="project__list">
      {projects.length > 0 ? (
        projects.map((proj, index) => (
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
  );
};
