"use client";

import { useModalContext } from "@/hooks/useModalsProject";
import { MODAL_IDS } from "@/lib/types/modal";
import { FaSearch, FaAddressCard } from "react-icons/fa";

export const ContainerGroupsHeader = () => {
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
          />
        </label>
      </search>

      <button>
        <FaAddressCard
          className="icon"
          onClick={() => {
            return openModal(MODAL_IDS.ADD_USER_ENTERPRISE);
          }}
        />
      </button>
    </nav>
  );
};
