"use client";

import { useEffect } from "react";
import { useWorkspacesContext } from "@/context/enterprise/WorkspacesEnterpriseContext";
import "./enterpriseProjectHero.css";
import { useProjectsContextEnterprise } from "@/context/enterprise/ProjectContextEnterprise";
import { useUserWorkspacesContext } from "@/context/userWorkspacesContext";

export const EnterpriseProjectHero = () => {
  const {
    workspaces,
    selectedWorkspaceId,
    setSelectedWorkspaceId,
    showList,
    setShowList,
  } = useUserWorkspacesContext();

  const { projectsByWorkspace, getProjectsForWorkspace } =
    useProjectsContextEnterprise();

  const handleSelect = async (workspaceId: string) => {
    setSelectedWorkspaceId(workspaceId);
    setShowList(false);
    await getProjectsForWorkspace(workspaceId);
  };

  useEffect(() => {
    const handleClickOutside = () => setShowList(false);
    if (showList) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showList]);

  const selectedProjects = selectedWorkspaceId
    ? projectsByWorkspace[selectedWorkspaceId] ?? []
    : [];

  return (

      <div>
        Current Workspaces:
        <nav className="custom-select">
          <button onClick={() => setShowList((prev) => !prev)}>
            {selectedWorkspaceId && workspaces.length > 0
              ? workspaces.find((w) => w.id === selectedWorkspaceId)?.name ??
                "Workspace desconocido"
              : "No workspace seleccionado"}
          </button>
          {showList && (
            <ul onClick={(e) => e.stopPropagation()}>
              {workspaces.map((workspace) => (
                <li
                  key={workspace.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(workspace.id);
                  }}
                >
                  {workspace.name}
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
  );
};
