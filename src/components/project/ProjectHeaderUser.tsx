"use client";

/* icons */
import { IoIosAdd } from "react-icons/io";

/* components */
import { Modal } from "../modals/Modal";
import { WorkspaceForm } from "../sidebar/components/Workspaceform";

/* hooks */
import { useState } from "react";

/* style */
import "./projectHeaderUser.css";
import { useProjectContext } from "@/hooks/useProjectContext";
import { useModalContext } from "@/hooks/useModalsProject";

export function ProjectHeaderUser() {
  const { projects, selectedCards } = useProjectContext();
  const { openWorkspaceModal, openDeleteConfirmationModal } = useModalContext();
  return (
    <header className="project__home--header">
      <h2>User Project</h2>
      <nav>
        <button onClick={openWorkspaceModal}>
          <IoIosAdd size="24" /> New
        </button>
        <button
          disabled={projects.length === 0 || selectedCards.length === 0}
          onClick={openDeleteConfirmationModal}
        >
          Move To Trash
        </button>
      </nav>
    </header>
  );
}
