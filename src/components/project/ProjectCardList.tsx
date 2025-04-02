import { ProjectCard } from "./ProjectCard";
import "./projectCardList.css";

const project = {
  data: {
    projects: [
      {
        name: "karen@genomas.com",
        description: "Proyecto de análisis genómico basado en IA.",
      },
      {
        name: "bioinformatics-hub",
        description:
          "Plataforma colaborativa para investigaciones en bioinformática.",
      },
      {
        name: "med-data-secure",
        description:
          "Sistema de almacenamiento seguro para historiales médicos.",
      },
      {
        name: "genome-mapper",
        description:
          "Aplicación para mapeo y visualización de secuencias genéticas.",
      },
    ],
  },
};

export const ProjectCardList = () => {
  return (
    <ul className="project__list">
      {project.data.projects.map((proj, index) => (
        <ProjectCard
          key={index}
          name={proj.name}
          description={proj.description}
        />
      ))}
    </ul>
  );
};
