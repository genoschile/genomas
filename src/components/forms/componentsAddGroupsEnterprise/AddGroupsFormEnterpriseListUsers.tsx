"use client";

import { use, useState } from "react";

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
