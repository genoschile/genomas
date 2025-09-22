"use client";

import React, { useEffect } from "react";
import { ContainerDefaultEnterprise } from "../../components/ContainerDefaultEnterprise";
import { useWorkspacesContext } from "@/context/enterprise/WorkspacesEnterpriseContext";
import "./enterpriseProjectHero.css";
import "./enterpriseNavActions.css";
import { useProjectsContextEnterprise } from "@/context/enterprise/ProjectContextEnterprise";
import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { MODAL_IDS } from "@/context/ModalsProject";
import { FaAndroid } from "react-icons/fa";
import { useModalContext } from "@/hooks/useModalsProject";

export const EnterpriseProjectHero = () => {
  const { openModal } = useModalContext();

  const {
    workspaces,
    selectedWorkspaceId,
    setSelectedWorkspaceId,
    showList,
    setShowList,
  } = useWorkspacesContext();

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
    <ContainerDefaultEnterprise dinamicStyle="enterprise-projects__hero">
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

      <div>
        <h4>Projects:</h4>
        <small>{selectedProjects.length}</small>
      </div>

      <div className="buttonAdd-groups">
        <nav>
          <button onClick={() => openModal(MODAL_IDS.ADD_PROJECT_ENTERPRISE)}>
            <IconRoundedFull icon={<FaAndroid />} />
          </button>
        </nav>
      </div>
    </ContainerDefaultEnterprise>
  );
};
