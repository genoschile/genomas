import { useProjectContext } from "@/features/user/hooks/useProjectContext";
import { useUploadSteps } from "../UploadStepContext";

export const CurrentListProjectsSelect = () => {
  const { projects } = useProjectContext();
  const { nextStep } = useUploadSteps();

  if (!projects || projects.length === 0) {
    return <p className="no-projects-message">No projects available.</p>;
  }

  const { ChangeCurrentProject, setValue } = useUploadSteps();

  const handleSelectProject = (project: any) => {
    ChangeCurrentProject(project);
    setValue("currentProjectId", project.id, { shouldValidate: true });
    nextStep();
  };

  return (
    <ul
      role="menu"
      aria-label="project List"
      className="dropdown-projects--list"
    >
      {projects.map((project, index) => (
        <li key={index} className="dropdown-item">
          <button
            className="dropdown-link"
            onClick={() => handleSelectProject(project)}
          >
            {project.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
