"use client";

import { MODAL_IDS } from "@/context/ModalsProject";
import { useModalContext } from "@/hooks/useModalsProject";
import { FaSearch, FaAddressCard } from "react-icons/fa";

export const ContainerGroupsHeader = ({
  onSearchChange,
  searchTerm,
}: {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { openModal } = useModalContext();

  return (
    <nav>
      <search className="enterprise-groups__search">
        <label htmlFor="">
          <span className="material-symbols-outlined">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Buscar usuario"
            name="search"
            id="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e)}
          />
        </label>
      </search>

      <button
        onClick={() => {
          openModal(MODAL_IDS.ADD_GROUPS_ENTERPRISE);
        }}
        type="button"
      >
        <FaAddressCard className="icon" />
      </button>
    </nav>
  );
};
