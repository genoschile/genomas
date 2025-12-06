"use client";

import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { FaSearch } from "react-icons/fa";

export const ContainerSearch = ({
  onSearchChange,
  searchTerm,
}: {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
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
    </nav>
  );
};
