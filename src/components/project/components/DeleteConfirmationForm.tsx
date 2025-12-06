"use client";

import { useState } from "react";
import "./deleteConfirmationForm.css";
import { useProjectContext } from "@/features/user/hooks/useProjectContext";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { routes } from "@/lib/api/routes";
import { IProject } from "@/lib/types/contextTypes";

export const DeleteConfirmationForm = () => {
  const { selectedCards, setProjects, setSelectedCards } = useProjectContext();
  const [confirmationText, setConfirmationText] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const { closeModal } = useModalContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationText(event.target.value);
    setIsConfirmed(event.target.value.toLowerCase() === "seguro");
  };

  const handleConfirmDelete = async () => {
    console.log(`Eliminando ${selectedCards.length} elementos...`);

    try {
      const res = await fetch(routes.deleteProjects(), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedCards }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error eliminando proyectos");
      }

      setProjects((prev: IProject[]) =>
        prev.filter((p) => !selectedCards.includes(p.id))
      );

      setSelectedCards([]);

      console.log(`Eliminados ${data.count} proyectos`);

      closeModal();
    } catch (error) {
      console.error("Error al eliminar elementos:", error);
    }
  };

  const handleCancelDelete = () => {
    console.log("cancelando ...");
    closeModal();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isConfirmed) {
      handleConfirmDelete();
    }
  };

  return (
    <div className="delete-confirmation-form">
      <h2>¿Seguro que quieres eliminar {selectedCards.length} elementos?</h2>
      <p>Escribe "seguro" para confirmar:</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={confirmationText}
          onChange={handleInputChange}
        />
        <div>
          <button type="submit" disabled={!isConfirmed}>
            Eliminar
          </button>
          <button type="button" onClick={handleCancelDelete}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
