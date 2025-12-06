"use client";

import { useEffect, useState, useTransition } from "react";
import "./addGroupsEnterprise.css";
import { MultiSelectChips } from "./componentsAddGroupsEnterprise/MultiSelectChips";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { toast } from "react-toastify";
import { routes } from "@/lib/api/routes";
import { useDataTableUserEnterpriseContext } from "@/context/enterprise/DataTableUserEnterpriseContext";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { useGroupsContext } from "@/context/enterprise/GroupsEnterpriseContext";

export const AddGroupsFormEnterprise = () => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const { users } = useDataTableUserEnterpriseContext();
  const { handleAddGroupsContext } = useGroupsContext();
  const { closeModal } = useModalContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const roles = formData.getAll("roles");
    const userIds = formData.getAll("userIds");

    const dto = {
      name,
      role: roles,
      description: description || undefined,
      users: userIds.map((id) => ({ id })),
    };

    const id = getLocalStorageOrganization();

    if (!id) {
      setMessage("Error al cargar la organización");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch(routes.AddGroupsEnterprise(id), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dto),
        });

        if (!res.ok) toast.error("Error al crear el grupo");

        const data = await res.json();
        setMessage(`grupo creado: ${data.message || data.id}`);
        toast.success("Grupo creado exitosamente");
        console.log("Grupo creado:", data);
        handleAddGroupsContext(data.data);
        closeModal();
      } catch (err) {
        toast.error(`${err}`);
        setMessage("Ocurrió un error al crear el grupo.");
      }
    });
  };

  return (
    <form className="add-groups-enterprise" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Crear Nuevo Grupo</legend>

        <div>
          <label htmlFor="name">Nombre del grupo:</label>
          <input type="text" id="name" name="name" required />

          <input
            type="hidden"
            id="organizationId"
            name="organizationId"
            required
          />

          <label htmlFor="description">Descripción (opcional):</label>
          <textarea id="description" name="description" rows={3} />
        </div>

        <div>
          <label htmlFor="roles">Roles:</label>
          <RoleSelector />

          {users.length === 0 ? (
            <p>Cargando usuarios...</p>
          ) : (
            <MultiSelectChips
              data={users}
              name="userIds"
              label="Selecciona usuarios"
              onChange={(selected) => {
                console.log("Usuarios seleccionados:", selected);
              }}
            />
          )}
        </div>
      </fieldset>

      <button type="submit" disabled={isPending}>
        {isPending ? "Creando grupo..." : "Crear Grupo"}
      </button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
};

export const RoleSelector = ({
  initialRoles = [],
  onChange,
}: {
  initialRoles?: string[];
  onChange?: (roles: string[]) => void;
}) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(initialRoles);

  useEffect(() => {
    setSelectedRoles(initialRoles);
  }, [initialRoles]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setSelectedRoles(options);
    onChange?.(options);
  };

  const removeRole = (role: string) => {
    const updated = selectedRoles.filter((r) => r !== role);
    setSelectedRoles(updated);
    onChange?.(updated);
  };

  return (
    <>
      <div className="selected-roles">
        {selectedRoles.map((role) => (
          <div key={role} className="chip">
            {role}
            <button type="button" onClick={() => removeRole(role)}>
              &times;
            </button>
          </div>
        ))}
      </div>

      <select
        className="select-list"
        id="roles"
        name="roles"
        value={selectedRoles}
        onChange={handleChange}
        multiple
      >
        <optgroup label="Roles">
          <option value="ADMIN">ADMIN</option>
          <option value="OWNER">OWNER</option>
          <option value="EDITOR">EDITOR</option>
          <option value="VIEWER">VIEWER</option>
        </optgroup>
      </select>
    </>
  );
};
