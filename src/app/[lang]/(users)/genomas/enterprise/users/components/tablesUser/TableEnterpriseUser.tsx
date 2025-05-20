"use client";

import "./tableEnterpriseUser.css";

import { Pagination } from "@/components/analysis/tables/Pagination";
import { useDataTableUserEnterpriseContext } from "@/context/enterprise/DataTableUserEnterpriseContext";

import { FaStar } from "react-icons/fa";
import { SkeletonTable } from "./SkeletonTableUser";
import { useEffect, useRef, useState } from "react";

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

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdownId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) return <SkeletonTable rows={2} />;

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
            <td
              className="user-avatar"
              data-name={user.name?.charAt(0).toUpperCase()}
            >
              <img
                src={user.image}
                alt="User avatar"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.groups?.join(", ")}</td>
            <td style={{ position: "relative" }}>
              <button onClick={() => setOpenDropdownId(user.id)}>⋯</button>
              {openDropdownId === user.id && (
                <div
                  ref={dropdownRef}
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    background: "white",
                    border: "1px solid #ccc",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    zIndex: 100,
                  }}
                >
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    <li>
                      <button onClick={() => console.log("Editar", user.id)}>
                        Editar
                      </button>
                    </li>
                    <li>
                      <button onClick={() => console.log("Eliminar", user.id)}>
                        Eliminar
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </td>
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
