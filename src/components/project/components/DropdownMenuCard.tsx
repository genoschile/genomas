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

export const DropdownMenuCard = () => {
  return (
    <ul className="project--dropdown-menu__options">
      {menuItems.map((item) => (
        <li
          key={item.id}
          className={
            item.type === "info" ? "dropdown-info-item info-container" : ""
          }
        >
          <button>
            {item.icon} {item.label}
          </button>
          {item.type === "info" && <small>hola</small>}
        </li>
      ))}
    </ul>
  );
};
