"use client";

import React, { useState, useRef, useEffect } from "react";
import { LuFileInput, LuFileOutput } from "react-icons/lu";
import { HiOutlineDocumentReport } from "react-icons/hi";

export const FilesTypeSwift: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Ref para el indicador de fondo dinámico
  const indicatorRef = useRef<HTMLSpanElement | null>(null);

  // Ref para los botones
  const buttonsRef = useRef<HTMLButtonElement[]>([]);

  // Función para mover el fondo dinámico
  const moveIndicator = (index: number) => {
    const btn = buttonsRef.current[index];
    const indicator = indicatorRef.current;

    if (btn && indicator) {
      const rect = btn.getBoundingClientRect();
      const parentRect =
        btn.parentElement?.parentElement?.getBoundingClientRect();

      if (!parentRect) return;

      // Colocar el "background" justo detrás del botón
      indicator.style.width = `${rect.width}px`;
      indicator.style.height = `${rect.height}px`;
      indicator.style.left = `${rect.left - parentRect.left}px`;
      indicator.style.top = `${rect.top - parentRect.top}px`;
    }
  };

  // Actualizar la posición al cambiar de botón o al redimensionar la ventana
  useEffect(() => {
    moveIndicator(activeIndex);

    const handleResize = () => moveIndicator(activeIndex);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <div className="project__home--description">
      <ul>
        {/* Fondo dinámico detrás de los botones */}
        <span ref={indicatorRef} className="indicator" />

        <li>
          <button
            ref={(el) => {
              if (el) buttonsRef.current[0] = el;
            }}
            onClick={() => setActiveIndex(0)}
            className={activeIndex === 0 ? "active" : ""}
          >
            <LuFileInput />
          </button>
        </li>

        <li>
          <button
            ref={(el) => {
              if (el) buttonsRef.current[1] = el;
            }}
            onClick={() => setActiveIndex(1)}
            className={activeIndex === 1 ? "active" : ""}
          >
            <LuFileOutput />
          </button>
        </li>

        <li>
          <button
            ref={(el) => {
              if (el) buttonsRef.current[2] = el;
            }}
            onClick={() => setActiveIndex(2)}
            className={activeIndex === 2 ? "active" : ""}
          >
            <HiOutlineDocumentReport />
          </button>
        </li>
      </ul>
    </div>
  );
};
