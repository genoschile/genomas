"use client";

import { SlOptionsVertical } from "react-icons/sl";
import "./projectCard.css";
import { FaFolder, FaUser } from "react-icons/fa";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { useProjectContext } from "@/hooks/useProjectContext";
import { useModalContext } from "@/hooks/useModalsProject";
import { useState, useEffect, useRef } from "react";
import { DropdownMenuCard } from "./components/DropdownMenuCard";

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLSpanElement>(null);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleCardSelection(name);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <li className={`project__list--card ${isSelected(name) ? "selected" : ""}`}>
      <header>
        <span ref={dropdownRef} onClick={() => setIsOpen(!isOpen)}>
          <SlOptionsVertical />
          {isOpen && <DropdownMenuCard />}
        </span>
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


