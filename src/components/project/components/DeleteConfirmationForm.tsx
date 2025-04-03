"use client";

import { useState } from "react";
import "./deleteConfirmationForm.css";
import { useProjectContext } from "@/hooks/useProjectContext";

export const DeleteConfirmationForm = () => {
  const { selectedCards } = useProjectContext();
  const [confirmationText, setConfirmationText] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationText(event.target.value);
    setIsConfirmed(event.target.value.toLowerCase() === "seguro");
  };

  const handleConfirmDelete = () => {
    console.log(`Eliminando ${selectedCards.length} elementos...`);
  };

  const handleCancelDelete = () => {
    console.log("cancelando ...")
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