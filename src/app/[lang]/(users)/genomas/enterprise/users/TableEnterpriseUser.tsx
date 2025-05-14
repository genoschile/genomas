"use client";

import "./tableEnterpriseUser.css";

import { Pagination } from "@/components/analysis/tables/Pagination";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export const headerTablesEnterpriseUser = [
  "Imagen",
  "Nombre",
  "Email",
  "Role",
  "Groups",
];

export const enterpriseUsersData = [
  {
    id: "1",
    image: "https://example.com/image1.jpg",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    groups: ["Group 1", "Group 2"],
  },
  {
    id: "2",
    image: "https://example.com/image2.jpg",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    groups: ["Group A"],
  },
  {
    id: "3",
    image: "https://example.com/image3.jpg",
    name: "Carlos Pérez",
    email: "carlos@example.com",
    role: "Editor",
    groups: ["Group 1", "Group 3"],
  },
];

export const TableEnterpriseUser = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentUsers = enterpriseUsersData.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const handleCheckboxChange = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleFavoriteClick = (id: string) => {
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter((favId) => favId !== id));
    } else {
      setFavoriteIds([...favoriteIds, id]);
    }
  };

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
        {currentUsers.map((user) => (
          <tr
            key={user.id}
            className={selectedIds.includes(user.id) ? "selected" : ""}
          >
            <td>
              <div>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
                <FaStar
                  size={20}
                  onClick={() => handleFavoriteClick(user.id)}
                  className={favoriteIds.includes(user.id) ? "favorite" : ""}
                />
              </div>
            </td>
            <td data-cell="Imagen">
              <img
                src={user.image}
                alt="User avatar"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            </td>
            <td data-cell="Nombre">{user.name}</td>
            <td data-cell="Email">{user.email}</td>
            <td data-cell="Role">{user.role}</td>
            <td data-cell="Groups">{user.groups.join(", ")}</td>
            <td data-cell="Actions">
              <span>...</span>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={headerTablesEnterpriseUser.length + 2}>
            <Pagination
              totalPosts={enterpriseUsersData.length}
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
