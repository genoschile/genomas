"use client";

import "./style.css";
import { LuWorkflow } from "react-icons/lu";

interface NavButton {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

interface ProjectHeaderProps {
  title: string;
  navButtons: NavButton[];
  children?: React.ReactNode;
}

export const ProjectHomeHeaderContainer: React.FC<ProjectHeaderProps> = ({
  title,
  navButtons,
  children,
}) => {
  return (
    <header className="project__home--header">
      <h2>{title}</h2>

      {children}
      <label htmlFor="project-select">
        <input type="text" id="project-select" />
      </label>

      <nav>
        {navButtons.map((button) => (
          <button
            key={button.id}
            onClick={button.onClick}
            disabled={button.disabled}
            type="button"
          >
            {button.icon && (
              <span style={{ marginRight: "0.5rem" }}>{button.icon}</span>
            )}{" "}
            {button.label}
          </button>
        ))}
      </nav>

      <button className="workflow-btn">
        <LuWorkflow />
      </button>
    </header>
  );
};
