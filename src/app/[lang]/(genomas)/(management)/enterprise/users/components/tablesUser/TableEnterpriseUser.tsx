"use client";

import "./tableEnterpriseUser.css";
import { useDataTableUserEnterpriseContext } from "@/context/enterprise/DataTableUserEnterpriseContext";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import { SkeletonTable } from "./SkeletonTableUser";
import { ButtonEditUser } from "./ButtonEditUser";

type UserItemProps = {
  id: string;
  name: string;
  email: string;
  role: string;
  groups: string[];
  image: string;
  isDefaultAdmin: boolean;
  selectedIds: string[];
  favoriteIds: string[];
  toggleSelect: (id: string) => void;
  toggleFavorite: (id: string) => void;
  handleDelete: (id: string) => void;
};

const UserItem = ({
  id,
  name,
  email,
  role,
  groups,
  image,
  isDefaultAdmin,
  selectedIds,
  favoriteIds,
  toggleSelect,
  toggleFavorite,
  handleDelete,
}: UserItemProps) => {
  console.log("Rendering UserItem:", { id, name, email, role, groups });

  return (
    <li
      className={`enterprise-user-item ${
        selectedIds.includes(id) ? "selected" : ""
      }`}
    >
      <div className="user-select">
        <input
          type="checkbox"
          checked={selectedIds.includes(id)}
          onChange={() => toggleSelect(id)}
        />
        <FaStar
          size={20}
          onClick={() => toggleFavorite(id)}
          className={favoriteIds.includes(id) ? "favorite" : ""}
        />
      </div>
      <div className="user-avatar" data-name={name?.charAt(0).toUpperCase()}>
        {image && (
          <img
            src={image}
            alt="User avatar"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
      </div>
      <div className="user-info">
        <span>{name}</span>
        <span>{email}</span>
        <span>{role ?? "—"}</span>
        <span>{groups?.join(", ")}</span>
      </div>
      <div className="user-actions">
        <ButtonEditUser userId={id} />
        {!isDefaultAdmin && (
          <button className="delete" onClick={() => handleDelete(id)}>
            Eliminar
          </button>
        )}
      </div>
    </li>
  );
};

export const TableEnterpriseUser = () => {
  const {
    users,
    selectedIds,
    favoriteIds,
    toggleSelect,
    toggleFavorite,
    loading,
    removeUser,
  } = useDataTableUserEnterpriseContext();

  const orgId = getLocalStorageOrganization();

  const handleDelete = async (userId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

    try {
      if (!orgId) {
        toast.error("ID de organización no encontrado");
        return;
      }

      const res = await fetch(`/api/deleteUserFromOrganization/${orgId}`, {
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
    } catch {
      toast.error("Error al eliminar el usuario");
    }
  };

  if (loading) return <SkeletonTable rows={2} />;

  return (
    <ul className="enterprise-user-list">
      {users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          role={user.userType}
          groups={user.groups}
          image={user.image}
          isDefaultAdmin={user.isDefaultAdmin}
          selectedIds={selectedIds}
          favoriteIds={favoriteIds}
          toggleSelect={toggleSelect}
          toggleFavorite={toggleFavorite}
          handleDelete={handleDelete}
        />
      ))}
      {/* <li className="pagination-wrapper">
        <Pagination
          totalPosts={users.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </li> */}
    </ul>
  );
};
