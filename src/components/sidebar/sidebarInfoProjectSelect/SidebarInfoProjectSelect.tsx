"use client";

import { MdArrowCircleLeft } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useProjectContext } from "@/hooks/useProjectContext";

import "./sidebarInfoProjectSelect.css";
import React from "react";
import { FaSearch } from "react-icons/fa";

const projectSidebarData = {
  usersWithAccess: [
    "Usuario 1",
    "Usuario 2",
    "Usuario 3",
    "Benjamin",
    "victoria",
    "Mabel",
  ],
  createdDate: "2024-04-04",
  sharedWithCount: 3,
  projectDetails: {
    type: "Research",
    owner: "Juan Pérez",
    modified: "2025-04-02",
    opened: "2025-04-03",
    created: "2024-12-15",
    description: "Este es un proyecto de investigación sobre IA.",
  },
};

const fixedGrayScaleColors = [
  "FFFFF0",
  "FCFCF7",
  "F2F8FC",
  "FAF9F6",
  "F4F1F8",
  "#F0F8FF",
  "#FBF5DF",
  "#FDFDFD",
];

const colorRandom = () => {
  if (
    !Array.isArray(fixedGrayScaleColors) ||
    fixedGrayScaleColors.length === 0
  ) {
    return "#FDFDFD";
  }
  const indiceAleatorio = Math.floor(
    Math.random() * fixedGrayScaleColors.length
  );
  return fixedGrayScaleColors[indiceAleatorio];
};

export const SidebarInfoProjectSelect = () => {
  const { selectedCards } = useProjectContext();
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState(
    projectSidebarData.projectDetails.description || ""
  );

  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = (): void => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (selectedCards.length > 0) {
      setIsOpen(true);
    }
  }, [selectedCards]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    if (value.length <= 100) {
      setDescription(value);
    }
  };

  const isLimitReached = description.length === 100;

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar--infoProjectSelect ${isOpen ? "active" : ""}`}
    >
      <div>
        <button onClick={toggleSidebar}>
          <MdArrowCircleLeft />
        </button>

        {isOpen && (
          <div className="sidebar--content">
            <header>
              <h2>User with access</h2>
              <ul
                style={
                  {
                    "--avatar-count": `${
                      projectSidebarData.usersWithAccess.length + 1
                    }`,
                  } as React.CSSProperties
                }
              >
                {projectSidebarData.usersWithAccess.map((user, index) => (
                  <React.Fragment key={index}>
                    <li
                      style={
                        {
                          "--offset": `${
                            index === 1 ? 0 : (index - 1) * -10
                          }px`,
                        } as React.CSSProperties
                      }
                    >
                      <span
                        style={{
                          backgroundColor: colorRandom(),
                        }}
                      >
                        {user.charAt(0).toUpperCase()}
                      </span>
                    </li>
                    {index === 0 && <hr />}
                  </React.Fragment>
                ))}
              </ul>
              <div>
                <small>Created: {projectSidebarData.createdDate}</small>
                {"  ,  "}
                <small>Shared with: {projectSidebarData.sharedWithCount}</small>
              </div>
              <button>Manage Access</button>
            </header>

            <hr />

            <section>
              <h2>Project Details</h2>

              <div>
                <h3>Type</h3>
                <p>{projectSidebarData.projectDetails.type}</p>
              </div>
              <div>
                <h3>Owner</h3>
                <p>{projectSidebarData.projectDetails.owner}</p>
              </div>
              <div>
                <h3>Modified</h3>
                <p>{projectSidebarData.projectDetails.modified}</p>
              </div>
              <div>
                <h3>Opened</h3>
                <p>{projectSidebarData.projectDetails.opened}</p>
              </div>
              <div>
                <h3>Created</h3>
                <p>{projectSidebarData.projectDetails.created}</p>
              </div>

              <fieldset>
                <legend>Description</legend>

                <label htmlFor="description">
                  <FaSearch
                    style={{
                      position: "absolute",
                      left: "10px",
                      fontSize: "1.2em",
                      color: "var(--text-color)",
                    }}
                  />
                  <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                </label>
                <small className={isLimitReached ? "limit" : ""}>
                  {description.length}/100 characters
                </small>
              </fieldset>
            </section>

            <hr />
          </div>
        )}
      </div>
    </aside>
  );
};
