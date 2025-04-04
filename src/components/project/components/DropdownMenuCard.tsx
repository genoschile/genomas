"use client";

import { IoMdPersonAdd } from "react-icons/io";
import { MdDownload, MdEdit, MdInfoOutline } from "react-icons/md";
import "./dropdownMenuCard.css";

const menuItems = [
  {
    id: 1,
    label: "Download",
    icon: <MdDownload />,
  },
  {
    id: 2,
    label: "Rename",
    icon: <MdEdit />,
  },
  {
    id: 3,
    label: "Add Members",
    icon: <IoMdPersonAdd />,
  },
  {
    id: 4,
    label: "More Info",
    icon: <MdInfoOutline />,
    type: "info",
  },
];

const DropdownMenuCardInfo = () => {
  return (
    <div className="project--dropdown-menu__options--info-a">
      <div>
        <p>Project Name: Project A</p>
        <p>Created By: User123</p>
        <p>Members: 5</p>
        <p>Last Updated: 2023-10-01</p>
      </div>
    </div>
  );
};

export const DropdownMenuCard = () => {
  return (
    <ul className="project--dropdown-menu__options">
      {menuItems.map((item) => (
        <li
          key={item.id}
          className={item.type === "info" ? "dropdown-info-item info-container" : ""}
        >
          <button>
            {item.icon} {item.label}
          </button>
          {item.type === "info" && <DropdownMenuCardInfo />}
        </li>
      ))}
    </ul>
  );
};