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

  if (loading) return <SkeletonTable rows={2} />;

  return loading ? (
    <SkeletonTable rows={2} />
  ) : (
    <ul className="enterprise-user-list">
      {paginatedUsers.map((user) => (
        <li
          key={user.id}
          className={`enterprise-user-item ${
            selectedIds.includes(user.id) ? "selected" : ""
          }`}
        >
          <div className="user-select">
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
          <div
            className="user-avatar"
            data-name={user.name?.charAt(0).toUpperCase()}
          >
            {user.image && (
              <img
                src={user.image}
                alt="User avatar"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>
          <div className="user-info">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.role}</span>
            <span>{user.groups?.join(", ")}</span>
          </div>
          <div className="user-actions">
            <button onClick={() => console.log("Editar", user.id)}>
              Editar
            </button>
            <button onClick={() => console.log("Eliminar", user.id)}>
              Eliminar
            </button>
          </div>
        </li>
      ))}
      <li className="pagination-wrapper">
        <Pagination
          totalPosts={users.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </li>
    </ul>
  );
};
