"use client";

import Logo from "@components/logo/Logo";
import "./headerUserWorkspace.css";
import { usePathname } from "next/navigation";
import FeaturesContainer from "./FeaturesContainer";
import UserOptions from "./UserOptions";

export function HeaderUserWorkspace({
  className = "",
}: {
  className?: string;
}) {
  const currentPath = usePathname();

  const isPipePath =
    currentPath === "/pipe" || currentPath.startsWith("/pipe/");

  return (
    <header className={`headerUserWorkspace ${className}`}>
      <div className="headerUserWorkspace__container">
        <figure>
          <Logo />
          <figcaption>Descripción breve de la imagen.</figcaption>
        </figure>

        {isPipePath ? <FeaturesContainer /> : <UserOptions />}
      </div>
    </header>
  );
}
