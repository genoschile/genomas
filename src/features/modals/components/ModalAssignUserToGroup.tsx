"use client";

import { useState } from "react";
import { useGroupsContext } from "@/features/enterprise/context/GroupsEnterpriseContext";
import { useDataTableUserEnterpriseContext } from "@/features/enterprise/context/DataTableUserEnterpriseContext";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { routes } from "@/lib/api/routes";
import { toast } from "react-toastify";
import "./assignUserToGroup.css";

export const ModalAssignUserToGroup = ({ payload }: { payload: any }) => {
  const { userId } = payload || {};
  const { groups } = useGroupsContext();
  const { users, editUser } = useDataTableUserEnterpriseContext();
  const { closeModal } = useModalContext();
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const orgId = getLocalStorageOrganization();
    if (!orgId) {
      toast.error("Error: Organización no encontrada");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        routes.getUserFromOrganization(orgId) + `/${userId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            groupIds: selectedGroups,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al asignar grupos");
      }

      const data = await response.json();

      // Actualizar contexto con los nombres de grupos
      const groupNames = groups
        .filter((g) => selectedGroups.includes(g.id))
        .map((g) => g.name);

      editUser(userId, {
        groups: groupNames,
      });

      toast.success("Grupos asignados correctamente");
      closeModal();
    } catch (error: any) {
      console.error("Error al asignar grupos:", error);
      toast.error(error.message || "Error al asignar grupos");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="assign-user-to-group">
      <div className="user-info">
        <h3>{user.name}</h3>
        <p className="user-email">{user.email}</p>
        <div className="current-groups">
          <span className="label">Grupos actuales:</span>
          {user.groups.length > 0 ? (
            <div className="groups-list">
              {user.groups.map((group, idx) => (
                <span key={idx} className="group-badge current">
                  {group}
                </span>
              ))}
            </div>
          ) : (
            <span className="no-groups">Sin grupos asignados</span>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="assign-form">
        <div className="form-section">
          <label className="section-label">Seleccionar grupos:</label>
          <div className="groups-grid">
            {groups.length === 0 ? (
              <p className="no-groups-available">
                No hay grupos disponibles. Crea un grupo primero.
              </p>
            ) : (
              groups.map((group) => (
                <div
                  key={group.id}
                  className={`group-option ${
                    selectedGroups.includes(group.id) ? "selected" : ""
                  }`}
                  onClick={() => handleGroupToggle(group.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedGroups.includes(group.id)}
                    onChange={() => {}}
                    className="group-checkbox"
                  />
                  <div className="group-info">
                    <span className="group-name">{group.name}</span>
                    {group.description && (
                      <span className="group-description">
                        {group.description}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={closeModal}
            className="btn-cancel"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-submit"
            disabled={isLoading || groups.length === 0}
          >
            {isLoading ? "Asignando..." : "Asignar Grupos"}
          </button>
        </div>
      </form>
    </div>
  );
};
