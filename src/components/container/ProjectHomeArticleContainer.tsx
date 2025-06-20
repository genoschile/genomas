"use client";

import { useRef, useState } from "react";
import "./style.css";

export const ArticleContainer = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Separa el header (primer hijo) del resto del contenido
  const childrenArray = Array.isArray(children) ? children : [children];
  const header = childrenArray[0];
  const body = childrenArray.slice(1);

  return (
    <article className={`project__home--article ${className}`}>
      <div
        className="project__home--header"
        style={{
          maxBlockSize: "80px",
          overflow: "hidden",
        }}
      >
        {/* Header visible siempre */}
        {header}

        {/* Botón toggle */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          style={{
            marginBlock: "0.5rem",
            padding: "0.25rem 0.5rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer",
            fontSize: "0.875rem",
          }}
        >
          {open ? "Ocultar sección" : "Mostrar sección"}
        </button>
      </div>

      <div
        ref={contentRef}
        style={{
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          maxHeight: open
            ? `${contentRef.current?.scrollHeight ?? 0}px`
            : "0px",
        }}
      >
        <div className="project__home--container">{body}</div>
      </div>
    </article>
  );
};
