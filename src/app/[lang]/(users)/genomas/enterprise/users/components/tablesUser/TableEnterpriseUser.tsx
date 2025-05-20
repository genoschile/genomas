"use client";

import "./tableEnterpriseUser.css";

import { Pagination } from "@/components/analysis/tables/Pagination";
import { useDataTableUserEnterpriseContext } from "@/context/enterprise/DataTableUserEnterpriseContext";

import { FaStar } from "react-icons/fa";
import { SkeletonTable } from "./SkeletonTableUser";

export const headerTablesEnterpriseUser = [
  "Imagen",
  "Nombre",
  "Email",
  "Role",
  "Groups",
];
export const TableEnterpriseUser = () => {
  const {
    paginatedUsers,
    selectedIds,
    favoriteIds,
    toggleSelect,
    toggleFavorite,
    currentPage,
    setCurrentPage,
    users,
    postsPerPage,
    loading,
  } = useDataTableUserEnterpriseContext();

  if (loading) {
    return <SkeletonTable rows={2} />;
  }
  return (
    <table>
      <caption>Enterprise Users</caption>
      <thead>
        <tr>
          <th>Select</th>
          {headerTablesEnterpriseUser.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {paginatedUsers.map((user) => (
          <tr
            key={user.id}
            className={selectedIds.includes(user.id) ? "selected" : ""}
          >
            <td>
              <div>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(user.id)}
                  onChange={() => toggleSelect(user.id)}
                />
                <FaStar
                  size={20}
                  onClick={() => toggleFavorite(user.id)}
                  className={favoriteIds.includes(user.id) ? "favorite" : ""}
                />
              </div>
            </td>
            <td>
              <img src={user.image} alt="User avatar" />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.groups?.join(", ")}</td>
            <td>...</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={8}>
            <Pagination
              totalPosts={users.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
