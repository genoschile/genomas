"use client";

import { useState, useRef, useEffect } from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import "./headerSidebar.css";

interface HeaderSidebarProps {
  isExpanded: boolean;
}

const HeaderSidebar: React.FC<HeaderSidebarProps> = ({ isExpanded }) => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header
      className="sidebar__header"
      data-expanded={isExpanded ? "true" : "false"}
    >
      {isExpanded ? (
        <>
          <button className="sidebar__header--button" onClick={toggleDropdown}>
            <h4 className="sidebar__header-title">Karen's Workspace</h4>
            <FaChevronRight />
          </button>
          <Dropdown
            isVisible={dropdownVisible}
            onClose={() => setDropdownVisible(false)}
            position="right"
          >
            <p>Opciones del workspace</p>
          </Dropdown>
        </>
      ) : (
        <button className="sidebar__header--button">
          <FaHome className="sidebar__icon" />
        </button>
      )}
    </header>
  );
};

// import "./Dropdown.css";

interface DropdownProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position: "left" | "right";
}

const Dropdown: React.FC<DropdownProps> = ({
  isVisible,
  onClose,
  children,
  position,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div ref={dropdownRef} className="dropdown" data-position={position}>
      <div className="dropdown__content">{children}</div>
    </div>
  );
};

export default HeaderSidebar;
