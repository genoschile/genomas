"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useCurrentProject } from "@/context/currentProject";
import { SiOpenproject } from "react-icons/si";

/* style */
import "./headerSidebar.css";

const nameProject = "Select a project";

interface HeaderSidebarProps {
  isExpanded: boolean;
}

const HeaderSidebar: React.FC<HeaderSidebarProps> = ({ isExpanded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLElement>(null);

  const { currentProject } = useCurrentProject();

  // Cierra el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Cierra el dropdown si isExpanded cambia a false
  useEffect(() => {
    if (!isExpanded) {
      setIsOpen(false);
    }
  }, [isExpanded]);

  return (
    <header
      className="sidebar__header"
      data-expanded={isExpanded ? "true" : "false"}
    >
      <button
        className="sidebar__header--button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={
          isOpen
            ? `Cerrar selector de proyecto: ${
                currentProject?.name || nameProject
              }`
            : `Abrir selector de proyecto: ${
                currentProject?.name || nameProject
              }`
        }
      >
        {isExpanded ? (
          <>
            <h4 className="sidebar__header-title">
              {currentProject?.name || nameProject}
            </h4>
            <FaChevronRight
              className={`sidebar-arrow ${isOpen ? "dropdown--active" : ""}`}
            />
          </>
        ) : (
          <SiOpenproject className="sidebar__icon" />
        )}
      </button>
    </header>
  );
};

const HeaderSidebarV2 = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <header
      className="sidebar__header"
      data-expanded={isExpanded ? "true" : "false"}
    >
      <button className="sidebar__header--button">
        <SiOpenproject className="sidebar__icon" />
      </button>
    </header>
  );
};

export default HeaderSidebarV2;
