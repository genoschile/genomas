import { ProjectCard } from "./ProjectCard";

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