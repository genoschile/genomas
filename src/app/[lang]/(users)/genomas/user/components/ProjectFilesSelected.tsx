"use client";

export const ProjectFilesSelected = ({
  projects = [],
  onChangeProject,
  currentProject,
}: {
  projects?: { id: string; name: string }[];
  onChangeProject?: (project: { id: string; name: string } | null) => void;
  currentProject?: { id: string; name: string } | null;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;

    const selectedProject = projects.find((p) => p.id === newId) || null;
    onChangeProject?.(selectedProject);
  };

  return (
    <div className="select-dropdown--workspaces select-dropdown">
      <label htmlFor="workspaces-select" className="visually-hidden">
        Seleccionar workspace
      </label>
      <select
        id="workspaces-select"
        value={currentProject?.id}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a workspace
        </option>

        {projects ? (
          projects.map((pr) => (
            <option key={pr.id} value={pr.id}>
              {pr.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            Loading workspaces...
          </option>
        )}
      </select>
    </div>
  );
};
