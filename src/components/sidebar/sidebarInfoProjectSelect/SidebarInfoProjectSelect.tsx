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
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isVisible = onOpen?.onOpen ?? false;
  const projectId = onOpen?.id;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // useEffect(() => {
  //   const fetchInfo = async () => {
  //     if (!projectId) {
  //       setIsExpanded(false);
  //       return;
  //     }

  //     try {
  //       const res = await fetch(`/api/projects/${projectId}/info`);
  //       const data = await res.json();
  //       if (!res.ok || !data.success) throw new Error(data.message);
  //       setIsExpanded(true);
  //     } catch (e) {
  //       console.error("No se pudo cargar info del proyecto:", e);
  //       setIsExpanded(false);
  //     }
  //   };

  //   fetchInfo();
  // }, [projectId]);

  const toggleSidebarSize = () => {
    setIsExpanded((prev) => !prev);
  };

  if (!hasMounted || !isVisible) return null;

  return (
    <div
      ref={sidebarRef}
      className={`sidebar--infoProjectSelect ${isExpanded ? "active" : ""}`}
    >
      <button
        onClick={toggleSidebarSize}
        type="button"
        className={`sidebar--toggle-button ${isExpanded ? "rot-angle-side" : ""}`}
      >
        <MdArrowCircleLeft />
      </button>

      {isExpanded ? (
        <aside
          className={`sidebar--infoProjectSelect--expanded  ${
            isExpanded ? "active" : ""
          }`}
        >
          <div className="sidebar--content">
            <HeaderSidebarInfoProjectSelect />
            <hr />
            <SectionSidebarInfoProjectSelect />
            <hr />
          </div>
        </aside>
      ) : null}
    </div>
  );
};
