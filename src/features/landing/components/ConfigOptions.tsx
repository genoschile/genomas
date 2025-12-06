"use client";

import { I18nButton } from "@/features/lang/components/I18nButton";
import { useState, useEffect } from "react";
import { GrConfigure } from "react-icons/gr";

export const ConfigOptions = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const onScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        setOpen(false);
        setVisible(false);
      } else if (currentScroll < lastScroll) {
        setVisible(true);
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "50px",
        height: "50px",
        backgroundColor: "#ff6f61",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        zIndex: 1000,
      }}
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      aria-label="Configuración"
    >
      <GrConfigure size={24} />

      <ul
        style={{
          position: "absolute",
          bottom: "60px",
          right: 0,
          backgroundColor: "#fff",
          color: "#333",
          listStyle: "none",
          padding: "10px",
          margin: 0,
          borderRadius: "6px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          minWidth: "140px",
          display: "grid",
          gap: "4px",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(20px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          userSelect: "none",
        }}
      >
        <li style={{ padding: "6px 8px", cursor: "pointer" }}>
          <I18nButton />
        </li>
      </ul>
    </div>
  );
};
