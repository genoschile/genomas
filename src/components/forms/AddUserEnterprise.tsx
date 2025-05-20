"use client";

import { Suspense, use, useState } from "react";
import "./AddUserEnterprise.css";

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
  const promiseUsers = getUsers();

  return (
    <form className="add-groups-enterprise">
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

      <button type="submit">Crear Grupo</button>
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
        name="users[]"
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
        name="role[]"
        onChange={handleChange}
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
