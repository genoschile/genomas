"use client";

import Logo from "@components/logo/Logo";
import "./headerUserWorkspace.css";
import { usePathname } from "next/navigation";
import FeaturesContainer from "./FeaturesContainer";
import UserOptions from "./UserOptions";

export function HeaderUserWorkspace() {
  const currentPath = usePathname();

  const isUserOrGenomaPath =
    currentPath.startsWith("/genomas/user") ||
    currentPath.startsWith("/genoma/");
  const isGenomasPath = currentPath === "/genomas";

  return (
    <header className="headerUserWorkspace">
      <div className="headerUserWorkspace__container">
        {isUserOrGenomaPath ? (
          <figure>
            <Logo />
            <figcaption>Descripción breve de la imagen.</figcaption>
          </figure>
        ) : isGenomasPath ? (
          <FeaturesContainer />
        ) : (
          <p style={{ color: "red" }}>something went wrong</p>
        )}
        <UserOptions />
      </div>
    </header>
  );
}
