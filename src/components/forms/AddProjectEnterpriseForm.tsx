"use client";

import "./addProjectEnterpriseForm.css";
import { useState } from "react";

export const AddProjectEnterpriseForm = () => {
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

  return (
    <form action="">
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

        <div className="form-group">
          <label htmlFor="workspaceId">Workspace ID</label>
          <input type="text" id="workspaceId" name="workspaceId" required />
        </div>

        <div className="form-group">
          <label htmlFor="ownerId">Owner ID</label>
          <input type="text" id="ownerId" name="ownerId" required />
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
