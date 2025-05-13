"use client";

import { useTheme } from "@/context/enterprise/ThemeContext";
import { FaMoon } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { MdWbSunny } from "react-icons/md";

import "./topBar.css";

export function TopBar() {
  return (
    <div className="topbar--enterprise">
      <div className="topbar-content">
        <div>
          <span className="greeting">Good Morning!</span>
          <span className="date">Martes 14 9tg 2025</span>
        </div>
        <ThemeSwitcher />
        <button className="calendar-button">
          <FiCalendar />
          <span>Pendientes</span>
        </button>
      </div>
    </div>
  );
}

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label
      htmlFor="theme-toggle"
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      <input
        type="checkbox"
        id="theme-toggle"
        hidden
        checked={theme === "light"}
        onChange={toggleTheme}
      />
      <span className="icon sun">
        <MdWbSunny />
      </span>
      <span className="icon moon">
        <FaMoon />
      </span>
    </label>
  );
};
