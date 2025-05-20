import { Suspense, use } from "react";
import "./page.css";

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
  const promiseUsers = getUsers();

  return (
    <div className="pen">
      <h1>hola!</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DraftListUsers promiseUser={promiseUsers} />
      </Suspense>
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
