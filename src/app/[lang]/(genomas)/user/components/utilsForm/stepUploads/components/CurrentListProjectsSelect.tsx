import { useProjectContext } from "@/hooks/useProjectContext";

import "./currentListProjectsSelect.css";
import { useUploadSteps } from "../UploadStepContext";

export const CurrentListProjectsSelect = () => {
  const { projects } = useProjectContext();
  const { ChangeCurrentProject } = useUploadSteps();

  if (!projects || projects.length === 0) {
    return <p className="no-projects-message">No projects available.</p>;
  }

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
            onClick={() => ChangeCurrentProject(project)}
          >
            {project.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
