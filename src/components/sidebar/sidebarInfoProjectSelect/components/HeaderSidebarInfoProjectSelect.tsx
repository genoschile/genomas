import React from "react";
import { useState } from "react";

import "./headerSidebarInfoProjectSelect.css";
import { useProjectContext } from "@/features/user/hooks/useProjectContext";

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

export const HeaderSidebarInfoProjectSelect = () => {
  const [isAvatarListActive, setIsAvatarListActive] = useState(false);
  const toggleAvatarList = (): void => {
    setIsAvatarListActive((prev) => !prev);
  };

  const { onOpen, onSetOpen } = useProjectContext();

  const projectInfo = onOpen;

  return (
    <header
      className={`sidebarinfoProjectSelect--header ${
        isAvatarListActive ? "active" : ""
      }`}
    >
      <button
        style={{
          position: "absolute",
          right: "10px",
          borderRadius: "50%",
          aspectRatio: "1/1",
          width: "30px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        type="button"
        onClick={() => onSetOpen({ onOpen: false, id: "" })}
      >
        X
      </button>
      <h2>User with access </h2>
      <p>from project id {projectInfo?.id}</p>
      <ul
        style={
          {
            "--avatar-count": `${
              projectSidebarData.usersWithAccess.length + 1
            }`,
          } as React.CSSProperties
        }
        onClick={toggleAvatarList}
      >
        {projectSidebarData.usersWithAccess.map((user, index) => (
          <React.Fragment key={index}>
            <li
              style={
                {
                  "--offset": `${index === 1 ? 0 : (index - 1) * -10}px`,
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
  );
};
