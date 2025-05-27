"use client";

import "./dropdownWorkspace.css";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineWorkspaces } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { useModalContext } from "@/hooks/useModalsProject";
import { MODAL_IDS } from "@/context/ModalsProject";
import { useProjectContext } from "@/hooks/useProjectContext";
import { useCurrentProject } from "@/context/currentProject";

export const DropdownWorkspace = ({
  isOpen,
  setIsOpen,
  dropdownRef,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}) => {
  const { openModal } = useModalContext();

  if (!isOpen) return null;

  return (
    <nav
      aria-label="Project Options"
      ref={dropdownRef}
      className="dropdown-menu"
    >
      <button
        aria-label="Close Project Options"
        className="dropdown-close"
        onClick={() => setIsOpen(false)}
      >
        <FaTimes className="dropdown-icon" />
      </button>
      <h3>All Projects</h3>

      <div className="dropdown-content">
        <CurrentListProjectsSelect />

        <div className="buttons" role="toolbar" aria-label="project Actions">
          <button
            role="menuitem"
            aria-label="Action create project"
            onClick={() => openModal(MODAL_IDS.WORKSPACE)}
          >
            <MdOutlineWorkspaces className="buttons-icons" />
            Create project
          </button>

          <button
            role="menuitem"
            aria-label="Action invite members"
            onClick={() => openModal(MODAL_IDS.MEMBERS)}
          >
            <IoPersonOutline className="buttons-icons" />
            Invite member(s)
          </button>
        </div>
      </div>
    </nav>
  );
};

export const CurrentListProjectsSelect = () => {
  const { projects } = useProjectContext();
  const { setCurrentProject } = useCurrentProject();

  if (!projects || projects.length === 0) {
    return <p className="no-projects-message">No projects available.</p>;
  }

  return (
    <ul role="menu" aria-label="project List">
      {projects.map((project, index) => (
        <li key={index} className="dropdown-item">
          <button
            className="dropdown-link"
            onClick={() => setCurrentProject(project)}
          >
            {project.name}
          </button>
        </li>
      ))}
    </ul>
  );
};
