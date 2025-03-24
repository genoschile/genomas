"use client";

import "./dropdownWorkspace.css";

import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineWorkspaces } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Modal } from "@/components/modals/Modal";
import { WorkspaceForm } from "./Workspaceform";

const title = "Create new Workspace";

export const DropdownWorkspace = ({
  isOpen,
  setIsOpen,
  dropdownRef,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal title={title} isOpen={isModalOpen} onClose={handleCloseModal}>
        <WorkspaceForm />
      </Modal>

      <nav
        aria-label="Workspace Options"
        ref={dropdownRef}
        className="dropdown-menu"
      >
        <button
          aria-label="Close Workspace Options"
          className="dropdown-close"
          onClick={() => setIsOpen(false)}
        >
          <FaTimes className="dropdown-icon" />
        </button>
        <h3>All Workspaces</h3>

        <div className="dropdown-content">
          <ul role="menu" aria-label="Workspace List">
            <li role="menuitem" className="dropdown-item">
              <input type="text" placeholder="olivia@petal.org" />
            </li>
          </ul>
          <div
            className="buttons"
            role="toolbar"
            aria-label="Workspace Actions"
          >
            <button
              role="menuitem"
              aria-label="Action create workspace"
              onClick={handleOpenModal}
            >
              <MdOutlineWorkspaces className="buttons-icons" />
              Create workspace
            </button>
            <button role="menuitem" aria-label="Action invite members">
              <IoPersonOutline className="buttons-icons" /> Invite member(s)
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
