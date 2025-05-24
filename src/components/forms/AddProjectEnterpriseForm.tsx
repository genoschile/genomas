"use client";

import { useWorkspacesContext } from "@/context/enterprise/WorkspacesEnterpriseContext";
import "./addProjectEnterpriseForm.css";
import { useState } from "react";

export const AddProjectEnterpriseForm = () => {
  const { selectedWorkspaceId } = useWorkspacesContext();

  const [sharedWith, setSharedWith] = useState([
    { userId: "", permission: "read" },
  ]);

  const handleAddShared = () => {
    setSharedWith([...sharedWith, { userId: "", permission: "read" }]);
  };

  const handleSharedChange = (index: number, field: string, value: string) => {
    const updated = [...sharedWith];
    updated[index][field] = value;
    setSharedWith(updated);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const projectData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      workspaceId: selectedWorkspaceId,
      ownerId: formData.get("ownerId") as string,
      sharedWith: sharedWith.map((entry) => ({
        userId: entry.userId,
        permission: entry.permission,
      })),
    };

    try {
      const response = await fetch("/api/workspaces/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el proyecto");
      }
      console.log("Proyecto creado exitosamente");
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Nuevo Proyecto</legend>

        <div className="form-group">
          <label htmlFor="name">Nombre del proyecto</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea id="description" name="description" rows={4}></textarea>
        </div>

        <fieldset className="form-group">
          <legend>Compartido con</legend>
          {sharedWith.map((entry, index) => (
            <div key={index} className="shared-entry">
              <input
                type="text"
                name={`sharedWith[${index}].userId`}
                placeholder="User ID"
                value={entry.userId}
                onChange={(e) =>
                  handleSharedChange(index, "userId", e.target.value)
                }
                required
              />
              <select
                name={`sharedWith[${index}].permission`}
                value={entry.permission}
                onChange={(e) =>
                  handleSharedChange(index, "permission", e.target.value)
                }
              >
                <option value="read">Leer</option>
                <option value="write">Escribir</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={handleAddShared}>
            Añadir usuario compartido
          </button>
        </fieldset>
      </fieldset>

      <button type="submit">Crear Proyecto</button>
    </form>
  );
};
