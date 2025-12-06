"use client";

import { IoMdPersonAdd } from "react-icons/io";
import { MdDownload, MdEdit, MdInfoOutline } from "react-icons/md";
import "./dropdownMenuCard.css";
import { useProjectContext } from "@/features/user/hooks/useProjectContext";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { MODAL_IDS } from "@/features/modals/context/ModalsProject";
import { toast } from "react-toastify";

export const DropdownMenuCard = ({
  openToLeft,
  cardId,
}: {
  openToLeft: boolean;
  cardId: string;
}) => {
  const { onSetOpen } = useProjectContext();
  const { openModal } = useModalContext();

  const handleSetOpenInfoCard = () => {
    console.log("Abriendo información del proyecto con ID:", cardId);
    onSetOpen({ id: cardId, onOpen: true });
  };

  const handleDownload = () => {
    const resolveAfter3Sec = new Promise((_, reject) =>
      setTimeout(reject, 2000)
    );
    toast.promise(resolveAfter3Sec, {
      pending: "Descargando directorio...",
      success: "Directorio descargado correctamente ✅",
      error: "Descarga fallida ❌",
    });
  };

  const menuItems = [
    {
      id: 1,
      label: "Download",
      icon: <MdDownload />,
      onClick: handleDownload,
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
      onClick: () => openModal(MODAL_IDS.MEMBERS),
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
