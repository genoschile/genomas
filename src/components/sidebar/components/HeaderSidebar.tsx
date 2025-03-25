"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronRight, FaHome, FaTimes } from "react-icons/fa";
import "./headerSidebar.css";
import Link from "next/link";

const nameProject = "Karen's Project"

import { DropdownWorkspace } from "@/components/sidebar/components/DropdownWorkspace";

interface HeaderSidebarProps {
  isExpanded: boolean;
}

const path = "genomas/user";

const HeaderSidebar: React.FC<HeaderSidebarProps> = ({ isExpanded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLElement>(null);

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
        >
          <h4 className="sidebar__header-title">{nameProject}</h4>
          <FaChevronRight
            className={`sidebar-arrow ${isOpen ? "dropdown--active" : ""}`}
          />
        </button>
      ) : (
        <Link href={`/${path}/`}>
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
