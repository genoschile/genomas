"use client";

import "./dropdownWorkspace.css";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineWorkspaces } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Modal } from "@/components/modals/Modal";
import { WorkspaceForm } from "./Workspaceform";
import { MembersForm } from "./MembersForm";

export const DropdownWorkspace = ({
  isOpen,
  setIsOpen,
  dropdownRef,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}) => {
  // Estados para cada modal
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  // Funciones para abrir y cerrar los modales
  const openWorkspaceModal = () => setIsWorkspaceModalOpen(true);
  const closeWorkspaceModal = () => setIsWorkspaceModalOpen(false);

  const openMembersModal = () => setIsMembersModalOpen(true);
  const closeMembersModal = () => setIsMembersModalOpen(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Modal para Crear Workspace */}
      <Modal
        title="Create new Project"
        isOpen={isWorkspaceModalOpen}
        onClose={closeWorkspaceModal}
      >
        <WorkspaceForm />
      </Modal>

      {/* Modal para Invitar Miembros */}
      <Modal
        title="Invite Member(s) to Project"
        isOpen={isMembersModalOpen}
        onClose={closeMembersModal}
      >
        <MembersForm />
      </Modal>

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
          <div
            className="buttons"
            role="toolbar"
            aria-label="project Actions"
          >
            {/* Botón para abrir el modal de Crear Workspace */}
            <button
              role="menuitem"
              aria-label="Action create project"
              onClick={openWorkspaceModal}
            >
              <MdOutlineWorkspaces className="buttons-icons" />
              Create project
            </button>

            {/* Botón para abrir el modal de Invitar Miembros */}
            <button
              role="menuitem"
              aria-label="Action invite members"
              onClick={openMembersModal}
            >
              <IoPersonOutline className="buttons-icons" />
              Invite member(s)
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
