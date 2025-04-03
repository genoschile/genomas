"use client";

import { SlOptionsVertical } from "react-icons/sl";
import "./projectCard.css";
import { FaFolder, FaUser } from "react-icons/fa";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { useProjectContext } from "@/hooks/useProjectContext";
import { useModalContext } from "@/hooks/useModalsProject";

export const ProjectCard = ({
  name,
  description,
  sharedWith,
}: {
  name: string;
  description: string;
  sharedWith: string[];
}) => {
  const { toggleCardSelection, isSelected } = useProjectContext();
  const { openMembersModal } = useModalContext();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleCardSelection(name);
  };

  return (
    <li className={`project__list--card ${isSelected(name) ? "selected" : ""}`}>
      <header>
        <button>
          <SlOptionsVertical />
        </button>
        <label>
          <input
            type="checkbox"
            checked={isSelected(name)}
            onChange={handleCheckboxChange}
          />
        </label>
      </header>
      <figure>
        <button onClick={openMembersModal}>
          {sharedWith.length > 0 ? (
            <FaUser size={20} />
          ) : (
            <RiGitRepositoryPrivateFill size={20} />
          )}
        </button>
        <FaFolder color="gray" size={"100"} className="project__list--icon" />
      </figure>
      <footer>
        <p>{name}</p>
      </footer>
    </li>
  );
};
