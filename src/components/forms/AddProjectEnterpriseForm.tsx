"use client";

/* hooks */
import { useWorkspacesContext } from "@/context/enterprise/WorkspacesEnterpriseContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

/* components */
import { MultiSelectChips } from "./componentsAddGroupsEnterprise/MultiSelectChips";

/* utils */
import { getOrganizationData } from "@/utils/getOrganizationData";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";

/* style */
import "./addProjectEnterpriseForm.css";
import { useProjectsContextEnterprise } from "@/context/enterprise/ProjectContextEnterprise";
import { routes } from "@/lib/api/routes";

type SelectableItem = {
  id: string;
  name: string;
};

export const AddProjectEnterpriseForm = () => {
  const { selectedWorkspaceId } = useWorkspacesContext();
  const { addProjectToWorkspace } = useProjectsContextEnterprise();

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [selectedGroupIds, setSelectedGroupIds] = useState<string[]>([]);
  const [users, setUsers] = useState<SelectableItem[]>([]);
  const [groups, setGroups] = useState<SelectableItem[]>([]);

  useEffect(() => {
    getOrganizationData("users").then((data) => setUsers(data.data));
  }, []);

  useEffect(() => {
    getOrganizationData("groups").then((data) => setGroups(data.data));
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

    if (!selectedWorkspaceId) {
      toast.error("No hay un espacio de trabajo seleccionado");
      return;
    }

    try {
      const response = await fetch(
        routes.addProjectEnterprise(selectedWorkspaceId),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );

      if (!response.ok) {
        toast.error("Error al crear el proyecto");
      }

      const data = await response.json();
      if (data?.success && data?.data) {
        addProjectToWorkspace(data.data, selectedWorkspaceId);
        toast.success("Proyecto creado exitosamente");
      } else {
        toast.error("Error al crear el proyecto (respuesta inválida)");
      }
    } catch (error) {
      toast.error(`Error al crear el proyecto: ${error}`);
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

      {users.length === 0 ? (
        <p>Cargando usuarios...</p>
      ) : (
        <MultiSelectChips
          data={users}
          name="userIds"
          label="Usuarios"
          onChange={setSelectedUserIds}
        />
      )}

      {groups.length === 0 ? (
        <p>Cargando grupos...</p>
      ) : (
        <MultiSelectChips
          data={groups}
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
