import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const projectSidebarData = {
  usersWithAccess: [
    "Usuario 1",
    "Usuario 2",
    "Usuario 3",
    "Benjamin",
    "victoria",
    "Mabel",
  ],
  createdDate: "2024-04-04",
  sharedWithCount: 3,
  projectDetails: {
    type: "Research",
    owner: "Juan Pérez",
    modified: "2025-04-02",
    opened: "2025-04-03",
    created: "2024-12-15",
    description: "Este es un proyecto de investigación sobre IA.",
  },
};

export const SectionSidebarInfoProjectSelect = () => {
  const [description, setDescription] = useState(
    projectSidebarData.projectDetails.description || ""
  );

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    if (value.length <= 100) {
      setDescription(value);
    }
  };

  const isLimitReached = description.length === 100;
  
  return (
    <section>
      <h2>Project Details</h2>

      <div>
        <h3>Type</h3>
        <p>{projectSidebarData.projectDetails.type}</p>
      </div>
      <div>
        <h3>Owner</h3>
        <p>{projectSidebarData.projectDetails.owner}</p>
      </div>
      <div>
        <h3>Modified</h3>
        <p>{projectSidebarData.projectDetails.modified}</p>
      </div>
      <div>
        <h3>Opened</h3>
        <p>{projectSidebarData.projectDetails.opened}</p>
      </div>
      <div>
        <h3>Created</h3>
        <p>{projectSidebarData.projectDetails.created}</p>
      </div>

      <fieldset>
        <legend>Description</legend>

        <label htmlFor="description">
          <FaSearch />
          <input
            id="description"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
        </label>
        <small className={isLimitReached ? "limit" : ""}>
          {description.length}/100 characters
        </small>
      </fieldset>
    </section>
  );
};
