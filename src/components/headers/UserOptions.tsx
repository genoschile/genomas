"use client";
import { useEffect, useRef, useState } from "react";

import { DropdownMenu } from "./components/dropdowns/DropdownUser";
import { WelcomeUser } from "./components/WelcomeUser";
import "./userOptions.css";
import { FaChevronRight } from "react-icons/fa";

export default function UserOptions() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLElement>(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const srcImg = "https://avatar.iran.liara.run/public";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <div className="user-options">
      <I18nButton />
      <WelcomeUser />
      <div className="user-options__dropdown-container">
        <button
          className={`user-options__avatar-button ${
            dropdownVisible ? "active" : ""
          }`}
          aria-haspopup="true"
          aria-expanded={dropdownVisible}
          onClick={toggleDropdown}
          aria-label="Menú de usuario"
        >
          <img src={srcImg} alt="User" className="user-options__avatar" />
          <FaChevronRight className={`${dropdownVisible ? "active" : ""}`} />
        </button>
        {dropdownVisible && (
          <DropdownMenu
            dropdownVisible={dropdownVisible}
            setDropdownVisible={setDropdownVisible}
            dropdownRef={dropdownRef as React.RefObject<HTMLElement>}
          />
        )}
      </div>
    </div>
  );
}

import { useRouter, usePathname } from "next/navigation";
import "./i18nButton.css";

export const I18nButton = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  const segments = pathname.split("/").filter(Boolean); 

  const currentLang = segments[0];
  const restPath = segments.slice(1).join("/"); 

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    router.push(`/${newLang}/${restPath}`);
  };

  return (
    <div className="select-dropdown">
      <select onChange={handleChange} value={currentLang}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};
