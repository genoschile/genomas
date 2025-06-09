"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import "./headerSidebar.css";
import Link from "next/link";

const nameProject = "Select a project";

import { DropdownWorkspace } from "@/components/sidebar/components/DropdownWorkspace";
import { useCurrentProject } from "@/context/currentProject";

interface HeaderSidebarProps {
  isExpanded: boolean;
}

const path = "genomas/user";

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
      {isExpanded ? (
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
          <h4 className="sidebar__header-title">
            {currentProject?.name || nameProject}
          </h4>
          <FaChevronRight
            className={`sidebar-arrow ${isOpen ? "dropdown--active" : ""}`}
          />
        </button>
      ) : (
        <Link href={`/${path}/`} aria-label="go page home">
          <FaHome className="sidebar__icon" />
        </Link>
      )}

      {isOpen && (
        <DropdownWorkspace
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dropdownRef={dropdownRef as React.RefObject<HTMLDivElement>}
        />
      )}
    </header>
  );
};

export default HeaderSidebar;
