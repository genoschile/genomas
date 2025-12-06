"use client";

import { SlOptionsVertical } from "react-icons/sl";
import "./projectCard.css";
import { FaFolder, FaUser } from "react-icons/fa";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { useProjectContext } from "@/hooks/useProjectContext";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { useState, useEffect, useRef } from "react";
import { DropdownMenuCard } from "./components/DropdownMenuCard";
import { MODAL_IDS } from "@/features/modals/context/ModalsProject";

export const ProjectCard = ({
  id,
  description,
  sharedWith,
  name,
}: {
  id: string;
  name: string;
  description?: string;
  sharedWith: string[];
}) => {
  const { toggleCardSelection, isSelected } = useProjectContext();
  const { openModal } = useModalContext();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLSpanElement>(null);
  const [openToLeft, setOpenToLeft] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleCardSelection(id);
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

  const handleDropdownToggle = () => {
    if (!dropdownRef.current) return;

    const container = dropdownRef.current.closest(
      ".project-card-list-container"
    );

    const fakeUl = document.createElement("ul");
    fakeUl.className = "project--dropdown-menu__options";
    fakeUl.style.visibility = "hidden";
    fakeUl.style.position = "absolute";
    fakeUl.style.top = "0";
    fakeUl.style.left = "0";
    document.body.appendChild(fakeUl);

    const dropdownWidth = fakeUl.getBoundingClientRect().width || 200;
    document.body.removeChild(fakeUl);

    const triggerRect = dropdownRef.current.getBoundingClientRect();
    const containerRect = container?.getBoundingClientRect();

    if (containerRect) {
      const spaceRight = containerRect.right - triggerRect.right;
      const spaceLeft = triggerRect.left - containerRect.left;

      setOpenToLeft(spaceRight < dropdownWidth && spaceLeft > dropdownWidth);
    }

    setIsOpen((prev) => !prev);
  };

  const { ChangeSelectedProjectId } = useProjectContext();

  return (
    <li
      onDoubleClick={() => ChangeSelectedProjectId(id)}
      className={`project__list--card ${isSelected(id) ? "selected" : ""}`}
    >
      <header>
        <span ref={dropdownRef} onClick={handleDropdownToggle}>
          <SlOptionsVertical />
          {isOpen && <DropdownMenuCard openToLeft={openToLeft} cardId={id} />}
        </span>
        <label>
          <input
            type="checkbox"
            checked={isSelected(id)}
            onChange={handleCheckboxChange}
          />
        </label>
      </header>
      <figure>
        <button onClick={() => openModal(MODAL_IDS.MEMBERS)}>
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
