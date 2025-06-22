"use client";

import { IoMdPersonAdd } from "react-icons/io";
import { MdDownload, MdEdit, MdInfoOutline } from "react-icons/md";
import "./dropdownMenuCard.css";
import { useProjectContext } from "@/hooks/useProjectContext";

export const DropdownMenuCard = ({
  openToLeft,
  cardId,
}: {
  openToLeft: boolean;
  cardId: string;
}) => {
  const { onSetOpen } = useProjectContext();

  const handleSetOpenInfoCard = () => {
    console.log("Abriendo información del proyecto con ID:", cardId);

    onSetOpen({ id: cardId, onOpen: true });
  };

  const menuItems = [
    {
      id: 1,
      label: "Download",
      icon: <MdDownload />,
      onClick: () => console.log("Descargando archivo..."),
    },
    {
      id: 2,
      label: "Rename",
      icon: <MdEdit />,
      onClick: () => console.log("Renombrando archivo..."),
    },
    {
      id: 3,
      label: "Add Members",
      icon: <IoMdPersonAdd />,
      onClick: () => alert("Abriendo modal para agregar miembros"),
    },
    {
      id: 4,
      label: "More Info",
      icon: <MdInfoOutline />,
      type: "info",
      onClick: handleSetOpenInfoCard,
    },
  ];

  return (
    <ul
      className={`project--dropdown-menu__options ${
        openToLeft ? "position-left" : "position-right"
      }`}
    >
      {menuItems.map((item) => (
        <li
          key={item.id}
          className={
            item.type === "info" ? "dropdown-info-item info-container" : ""
          }
        >
          <button onClick={item.onClick}>
            {item.icon} {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
};
