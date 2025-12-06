"use client";

import { MdCloudUpload } from "react-icons/md";
import "./style.css";
import { LuWorkflow } from "react-icons/lu";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { MODAL_IDS } from "@/features/modals/context/ModalsProject";
import { FaRegTrashAlt, FaTasks } from "react-icons/fa";
import { ProjectWorkspaceSelector } from "../project/ProjectWorkspaceSelected";

interface NavButton {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

interface ProjectHeaderProps {
  title: string;
  navButtons: NavButton[];
}

export const ProjectHomeHeaderContainer: React.FC<ProjectHeaderProps> = ({
  title,
  navButtons,
}) => {
  const { openModal } = useModalContext();

  return (
    <header className="project__home--header">
      <div className="project__home--header__info">
        <h2>{title}</h2>
      </div>

      <div className="project__home--header__controls">
        <nav className="trash-button-header content-controls-header">
          <ProjectWorkspaceSelector />

          {navButtons.map((button) => (
            <button
              key={button.id}
              onClick={button.onClick}
              disabled={button.disabled}
              type="button"
            >
              {button.icon && (
                <span style={{ marginRight: "0.5rem" }}>{button.icon}</span>
              )}{" "}
              {button.label}
            </button>
          ))}
        </nav>

        <nav className="content-controls-header">
          <button
            className="workflow-btn"
            onClick={() => openModal(MODAL_IDS.WORKFLOWS)}
          >
            <LuWorkflow />
          </button>

          <button
            className="workflow-btn"
            onClick={() => openModal(MODAL_IDS.UPLOAD_FILES)}
          >
            <MdCloudUpload />
          </button>

          <button
            className="workflow-btn"
            onClick={() => openModal(MODAL_IDS.TRASH_USER)}
          >
            <FaRegTrashAlt />
          </button>
          <button
            className="workflow-btn"
            onClick={() => openModal(MODAL_IDS.EXECUTOR)}
          >
            <FaTasks />
          </button>
        </nav>
      </div>
    </header>
  );
};
