"use client";

import { MdArrowCircleLeft } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useProjectContext } from "@/hooks/useProjectContext";
import "./sidebarInfoProjectSelect.css";

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
  const { selectedCards } = useProjectContext();
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = (): void => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && selectedCards.length > 0) {
      setIsOpen(true);
    }
  }, [hasMounted, selectedCards]);

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar--infoProjectSelect ${isOpen ? "active" : ""}`}
    >
      <div>
        <button onClick={toggleSidebar} type="button">
          <MdArrowCircleLeft />
        </button>

        {isOpen && (
          <div className="sidebar--content">
            <HeaderSidebarInfoProjectSelect />
            <hr />
            <SectionSidebarInfoProjectSelect />
            <hr />
          </div>
        )}
      </div>
    </aside>
  );
};
