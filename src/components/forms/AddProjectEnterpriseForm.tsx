"use client";

/* hooks */
import { useWorkspacesContext } from "@/context/enterprise/WorkspacesEnterpriseContext";
import { useEffect, useState } from "react";

/* components */
import { MultiSelectChips } from "./componentsAddGroupsEnterprise/MultiSelectChips";

/* utils */
import { getOrganizationData } from "@/utils/getOrganizationData";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";

/* style */
import "./addProjectEnterpriseForm.css";

export const AddProjectEnterpriseForm = () => {
  const { selectedWorkspaceId } = useWorkspacesContext();
  const [usersPromise, setUsersPromise] = useState<Promise<any> | null>(null);
  const [groupsPromise, setGroupsPromise] = useState<Promise<any> | null>(null);

  // Estados para levantar seleccionados
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);

  useEffect(() => {
    setUsersPromise(getOrganizationData("users"));
  }, []);

  useEffect(() => {
    setGroupsPromise(getOrganizationData("groups"));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const projectData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      workspaceId: selectedWorkspaceId,
      ownerId: getLocalStorageOrganization(),
      users: selectedUserIds.map((id) => ({ id })),
      groups: selectedGroupIds.map((id) => ({ id })),
    };

    try {
      const response = await fetch(
        `/api/workspaces/${selectedWorkspaceId}/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el proyecto");
      }
      console.log("Proyecto creado exitosamente");
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
  };

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

        {usersPromise && (
          <MultiSelectChips
            dataPromise={usersPromise}
            name="userIds"
            label="Usuarios"
            onChange={setSelectedUserIds}
          />
        )}

        {groupsPromise && (
          <MultiSelectChips
            dataPromise={groupsPromise}
            name="groupIds"
            label="Grupos"
            onChange={setSelectedGroupIds}
          />
        )}
      </fieldset>

      <button type="submit">Crear Proyecto</button>
    </form>
  );
};
