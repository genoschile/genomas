"use client";

import "./tableEnterpriseUser.css";

import { Pagination } from "@/components/analysis/tables/Pagination";
import { useDataTableUserEnterpriseContext } from "@/context/enterprise/DataTableUserEnterpriseContext";

import { FaStar } from "react-icons/fa";
import { SkeletonTable } from "./SkeletonTableUser";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { toast } from "react-toastify";
import { useModalContext } from "@/hooks/useModalsProject";
import { MODAL_IDS } from "@/context/ModalsProject";
import { routes } from "@/lib/api/routes";

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
    removeUser,
  } = useDataTableUserEnterpriseContext();

  const orgId = getLocalStorageOrganization();

  const handleDelete = async (userId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      return;
    }

    try {
      if (!orgId) {
        toast.error("ID de organización no encontrado");
        return;
      }

      const res = await fetch(routes.deleteUserFromOrganization(orgId), {
        method: "DELETE",
        body: JSON.stringify({ userId }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        removeUser(userId);
        toast.success("Usuario eliminado correctamente");
      } else {
        toast.error("Error al eliminar el usuario");
      }
    } catch (error) {
      toast.error("Error al eliminar el usuario");
    }
  };

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
            <ButtonEditUser userId={user.id} />
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
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

export const ButtonEditUser = ({ userId }: { userId: string }) => {
  const { openModal } = useModalContext();

  console.log("ButtonEditUser userId:", userId);

  return (
    <button
      onClick={() => openModal(MODAL_IDS.EDIT_USERS_ENTERPRISE, { userId })}
    >
      Editar
    </button>
  );
};
