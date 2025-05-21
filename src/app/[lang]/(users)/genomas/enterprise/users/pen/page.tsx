"use client"

import { Suspense, use } from "react";
import "./page.css";
import { AddGroupsFormEnterprise } from "@/components/forms/AddGroupsEnterprise";

const getUsers = async () => {
  const response = await fetch("http://localhost:3000/api/organization/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: "cmavbyiqp0007g1kw94qezuiq" }),
  });

  return await response.json();
};

export default function page() {

  return (
    <div className="pen">
      <h1>hola!</h1>
      <AddGroupsFormEnterprise />
    </div>
  );
}

export const DraftListUsers = ({
  promiseUser,
}: {
  promiseUser: Promise<any>;
}) => {
  const allUsers = use(promiseUser);
  return (
    <ul>
      {allUsers.data.map((user: any) => (
        <li key={user.id}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{user.userType}</p>
          <p>{user.organizationId}</p>
          <p>{user.groupId}</p>
          <p>{user.createdAt}</p>
          <p>{user.updatedAt}</p>
        </li>
      ))}
    </ul>
  );
};
