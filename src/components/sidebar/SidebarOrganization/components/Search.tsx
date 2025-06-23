"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { FiSearch, FiHelpCircle, FiSettings, FiCommand } from "react-icons/fi";

import "./search.css";

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  // Abrir con Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  if (!open) return null;

  return (
    <div className="command-overlay" onClick={() => setOpen(false)}>
      <div className="command-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setOpen(false)}
          className="close-button"
          aria-label="Cerrar"
        >
          ×
        </button>

        <Command>
          <Command.Input placeholder="Buscar..." />
          <Command.List>
            <Command.Empty>No se encontró nada.</Command.Empty>

            <Command.Group heading="Acciones">
              <Command.Item onSelect={() => alert("Ir a ayuda")}>
                <FiHelpCircle /> Ayuda
              </Command.Item>
              <Command.Item onSelect={() => alert("Ir a configuración")}>
                <FiSettings /> Configuración
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

export function Search() {
  const openCommandMenu = () => {
    const keyboardEvent = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
    });
    window.dispatchEvent(keyboardEvent);
  };

  return (
    <search className="sidebar-org--search" onClick={openCommandMenu}>
      <FiSearch size={24} className="icon" />
      <input type="text" placeholder="Search" readOnly />
      <span>
        <FiCommand /> K
      </span>
    </search>
  );
}
