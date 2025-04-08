"use client";

import "./dropdownWorkspace.css";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineWorkspaces } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { useModalContext } from "@/hooks/useModalsProject";
import { MODAL_IDS } from "@/lib/types/modal";

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
        <ul role="menu" aria-label="project List">
          <li role="menuitem" className="dropdown-item">
            <input type="text" placeholder="olivia@petal.org" />
          </li>
        </ul>
        <div className="buttons" role="toolbar" aria-label="project Actions">
          {/* Botón para abrir el modal de Crear Workspace */}
          <button
            role="menuitem"
            aria-label="Action create project"
            onClick={() => openModal(MODAL_IDS.WORKSPACE)}
          >
            <MdOutlineWorkspaces className="buttons-icons" />
            Create project
          </button>

          {/* Botón para abrir el modal de Invitar Miembros */}
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
