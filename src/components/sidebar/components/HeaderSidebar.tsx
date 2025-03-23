"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronRight, FaHome, FaTimes } from "react-icons/fa";
import "./headerSidebar.css";
import Link from "next/link";

interface HeaderSidebarProps {
  isExpanded: boolean;
}

const path = "genomas/user"

const HeaderSidebar: React.FC<HeaderSidebarProps> = ({ isExpanded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
          <h4 className="sidebar__header-title">Karen's Workspace</h4>
          <FaChevronRight className={`sidebar-arrow ${isOpen? "dropdown--active" : ""}`} />
        </button>
      ) : (
        <Link href={`/${path}/`}>
          <FaHome className="sidebar__icon" />
        </Link>
      )}

      {isOpen && (
        <div ref={dropdownRef} className="dropdown-menu">
          <button className="dropdown-close" onClick={() => setIsOpen(false)}>
            <FaTimes className="dropdown-icon" />
          </button>
          <ul>
            <li>Opción 1</li>
            <li>Opción 2</li>
            <li>Opción 3</li>
          </ul>

          <div className="buttons">
            <button>
              buenas
            </button>
            <button>
              buenas x2
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderSidebar;
