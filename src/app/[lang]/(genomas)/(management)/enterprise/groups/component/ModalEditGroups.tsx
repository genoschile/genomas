"use client";

import { useState, useEffect, useTransition } from "react";
import { toast } from "react-toastify";
import { routes } from "@/lib/api/routes";
import { useGroupsContext } from "@/context/enterprise/GroupsEnterpriseContext";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import "./modalEditGroups.css";
import { RoleSelector } from "@/components/forms/AddGroupsEnterprise";
import { MultiSelectChips } from "@/components/forms/componentsAddGroupsEnterprise/MultiSelectChips";
import { useDataTableUserEnterpriseContext } from "@/context/enterprise/DataTableUserEnterpriseContext";

export const ModalEditGroups = ({ groupId }: { groupId: string }) => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const { groups, handleChangeCurrentGroup } = useGroupsContext();
  const { users } = useDataTableUserEnterpriseContext();

  const { closeModal } = useModalContext();

  const group = groups.find((g) => g.id === groupId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState<string | undefined>("");
  const [roles, setRoles] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);

  useEffect(() => {
    if (group) {
      setName(group.name);
      setDescription(group.description || "");
      setRoles(group.role || []);
      setUserIds(
        Array.isArray(group.users)
          ? group.users.map((u: any) => (typeof u === "string" ? u : u.id))
          : []
      );
    }
  }, [group]);

  if (!group) {
    return <p>No se encontró el grupo con id {groupId}</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const dto = {
    //   name,
    //   description,
    //   role: roles,
    //   users: userIds.map((id) => ({ id })),
    // };

    // startTransition(async () => {
    //   try {
    //     const res = await fetch(routes.updateGroupEnterprise(groupId), {
    //       method: "PUT",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(dto),
    //     });

    //     if (!res.ok) {
    //       toast.error("Error al actualizar el grupo");
    //       return;
    //     }

    //     const data = await res.json();
    //     setMessage(`Grupo actualizado: ${data.message || data.id}`);
    //     toast.success("Grupo actualizado exitosamente");

    //     // Refrescamos el contexto actual
    //     handleChangeCurrentGroup(data.data);

    //     closeModal();
    //   } catch (err) {
    //     console.error(err);
    //     setMessage("Ocurrió un error al actualizar el grupo.");
    //     toast.error("Error inesperado al editar el grupo");
    //   }
    // });
  };

  return (
    <form className="add-groups-enterprise" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Editar Grupo</legend>

        <div>
          <label htmlFor="name">Nombre del grupo:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="description">Descripción (opcional):</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="roles">Roles:</label>
          <RoleSelector
            initialRoles={roles}
            onChange={(newRoles) => setRoles(newRoles)}
          />

          <MultiSelectChips
            data={users}
            name="userIds"
            label="Selecciona usuarios"
            initialSelected={userIds}
            onChange={(selected) => setUserIds(selected)}
          />
        </div>
      </fieldset>

      <button type="submit" disabled={isPending}>
        {isPending ? "Guardando cambios..." : "Guardar Cambios"}
      </button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
};
