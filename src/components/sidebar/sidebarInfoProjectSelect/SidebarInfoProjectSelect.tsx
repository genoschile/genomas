"use client";

/* hooks */
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useProjectContext } from "@/hooks/useProjectContext";

/* styles */
import "./sidebarInfoProjectSelect.css";
import { MdArrowCircleLeft } from "react-icons/md";

const HeaderSidebarInfoProjectSelect = dynamic(
  () =>
    import("./components/HeaderSidebarInfoProjectSelect").then(
      (mod) => mod.HeaderSidebarInfoProjectSelect
    ),
  {
    loading: () => (
      <div className="sidebar--loading">Cargando encabezado...</div>
    ),
    ssr: false,
  }
);

const SectionSidebarInfoProjectSelect = dynamic(
  () =>
    import("./components/SectionSidebarInfoProjectSelect").then(
      (mod) => mod.SectionSidebarInfoProjectSelect
    ),
  {
    loading: () => <div className="sidebar--loading">Cargando sección...</div>,
    ssr: false,
  }
);

export const SidebarInfoProjectSelect = () => {
  const { onOpen } = useProjectContext();
  const [hasMounted, setHasMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || !onOpen) {
    return null;
  }

  const toggleSidebar = (): void => {
    setIsOpen((prev) => !prev);
  };

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar--infoProjectSelect ${isOpen ? "active" : ""}`}
    >
      <div>
        <button onClick={toggleSidebar} type="button">
          <MdArrowCircleLeft />
        </button>

        <div className="sidebar--content">
          <HeaderSidebarInfoProjectSelect />
          <hr />
          <SectionSidebarInfoProjectSelect />
          <hr />
        </div>
      </div>
    </aside>
  );
};
