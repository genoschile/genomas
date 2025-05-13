import "./themeSwitcher.css";

import { useTheme } from "@/context/enterprise/ThemeContext";
import { FaMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

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
