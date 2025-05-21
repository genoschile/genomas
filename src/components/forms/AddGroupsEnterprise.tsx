"use client";

import { Suspense, use, useState, useTransition } from "react";
import "./addGroupsEnterprise.css";
import { localStorageIdOrganization } from "@/lib/utils/localStorageIdOrganization";

const getUsers = async () => {
  const org = JSON.parse(localStorage.getItem("genomaOrganization") || "{}");

  const response = await fetch("http://localhost:3000/api/organization/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: org.id }),
  });

  return await response.json();
};

export const AddGroupsFormEnterprise = () => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const promiseUsers = getUsers();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Extracción de campos
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const organizationId = localStorageIdOrganization();
    const roles = formData.getAll("roles"); // array de strings
    const userIds = formData.getAll("userIds"); // array de strings

    // Crear el objeto DTO sin importar tipos del backend
    const dto = {
      name,
      role: roles,
      organizationId,
      description: description || undefined,
      users: userIds.map((id) => ({ id })),
    };

    if (!dto.organizationId) {
      setMessage("Error al cargar la organización");
      return;
    }

    console.log("DTO", { dto });

    // startTransition(async () => {
    //   try {
    //     const res = await fetch("/api/groups", {
    //       method: "POST",
    //       body: formData,
    //     });

    //     if (!res.ok) throw new Error("Error al crear el grupo");

    //     const data = await res.json();
    //     setMessage(`✅ Grupo creado: ${data.message || data.id}`);
    //   } catch (err) {
    //     console.error(err);
    //     setMessage("❌ Ocurrió un error al crear el grupo.");
    //   }
    // });
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

          <label htmlFor="users">Usuarios:</label>
          <Suspense fallback={<div>Cargando usuarios...</div>}>
            <AddGroupsFormEnterpriseListUsers promiseUser={promiseUsers} />
          </Suspense>
        </div>
      </fieldset>

      <button type="submit" disabled={isPending}>
        {isPending ? "Creando grupo..." : "Crear Grupo"}
      </button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
};

export const AddGroupsFormEnterpriseListUsers = ({
  promiseUser,
}: {
  promiseUser: Promise<any>;
}) => {
  const allUsers = use(promiseUser);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setSelectedUsers(options);
  };

  const removeUser = (id: string) => {
    setSelectedUsers((prev) => prev.filter((uid) => uid !== id));
  };

  return (
    <>
      <div className="selected-users">
        {selectedUsers.map((id) => {
          const user = allUsers.data.find((u: any) => u.id === id);
          return (
            <div key={id} className="chip">
              {user?.name || id}
              <button type="button" onClick={() => removeUser(id)}>
                &times;
              </button>
            </div>
          );
        })}
      </div>

      <select
        className="select-list"
        id="users"
        name="userIds"
        multiple
        onChange={handleSelect}
      >
        {allUsers.data.map((user: any) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </>
  );
};

const RoleSelector = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    setSelectedRoles(options);
  };
  const removeRole = (role: string) => {
    setSelectedRoles((prev) => prev.filter((r) => r !== role));
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
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
          <option value="GUEST">Guest</option>
        </optgroup>
      </select>
    </>
  );
};
