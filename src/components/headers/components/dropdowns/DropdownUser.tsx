"use client";

import { useRouter } from "next/navigation";
import { ItemMenu } from "./ItemMenu";
import "./dropdownMenu.css";

export function DropdownMenu({
  setDropdownVisible,
  dropdownVisible,
  dropdownRef,
}: {
  dropdownVisible: boolean;
  setDropdownVisible: (value: boolean) => void;
  dropdownRef: React.RefObject<HTMLElement>;
}) {
  const router = useRouter();

  if (!dropdownVisible) {
    return null;
  }

  return (
    <nav
      aria-label="Menú de usuario"
      className="dropdownUser--menu"
      ref={dropdownRef}
    >
      <ItemMenu setDropdownVisible={setDropdownVisible} />
    </nav>
  );
}
