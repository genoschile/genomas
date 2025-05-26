"use client";

/* icons */
import { IoIosAdd } from "react-icons/io";

/* style */
import "./projectHeaderUser.css";
import { useProjectContext } from "@/hooks/useProjectContext";
import { useModalContext } from "@/hooks/useModalsProject";

export function ProjectHeaderUser() {
  const { projects, selectedCards } = useProjectContext();
  const { openModal  } = useModalContext();
  return (
    <header className="project__home--header">
      <h2>User Project</h2>
      <nav>
        <button onClick={() => openModal("workspace")}>
          <IoIosAdd size="24" /> New
        </button>
        <button
          disabled={projects?.length === 0 || selectedCards.length === 0}
          onClick={() => openModal("delete-confirmation")}
        >
          Move To Trash
        </button>
      </nav>
    </header>
  );
}
