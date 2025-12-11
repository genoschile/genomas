"use client";

import { useEffect, useState } from "react";
import "./tableEnterpriseUser.css";
import { useDataTableUserEnterpriseContext } from "@/features/enterprise/context/DataTableUserEnterpriseContext";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { toast } from "react-toastify";
import { FaStar, FaRegStar } from "react-icons/fa";
import { SkeletonTable } from "./SkeletonTableUser";
import { ButtonEditUser } from "./ButtonEditUser";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { MODAL_IDS } from "@/features/modals/context/ModalsProject";

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
  handleAssignGroup: (id: string) => void;
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
  handleAssignGroup,
}: UserItemProps) => {
  console.log("🔄 Rendering UserItem:", { id, name, email, role });

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
      </div>
      <div className="user-avatar-container">
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
        <button
          className={`star-badge ${favoriteIds.includes(id) ? "is-favorite" : ""}`}
          onClick={() => toggleFavorite(id)}
          title={favoriteIds.includes(id) ? "Remover de favoritos" : "Agregar a favoritos"}
          aria-label={favoriteIds.includes(id) ? "Remover de favoritos" : "Agregar a favoritos"}
        >
          {favoriteIds.includes(id) ? (
            <FaStar size={16} />
          ) : (
            <FaRegStar size={16} />
          )}
        </button>
      </div>
      <div className="user-info">
        <span className="user-name">{name}</span>
        <span className="user-email">{email}</span>
        <span className="user-role">{role ?? "—"}</span>
        <div className="user-groups">
          {groups && groups.length > 0 ? (
            <>
              <span className="groups-count-badge">
                {groups.length} {groups.length === 1 ? 'grupo' : 'grupos'}
              </span>
              <div className="user-groups-badges">
                {groups.slice(0, 3).map((groupName, idx) => (
                  <span key={idx} className="group-badge" title={groupName}>
                    {groupName}
                  </span>
                ))}
                {groups.length > 3 && (
                  <span className="group-badge group-badge-more" title={`+${groups.length - 3} más`}>
                    +{groups.length - 3}
                  </span>
                )}
              </div>
            </>
          ) : (
            <span className="no-groups">Sin grupos</span>
          )}
        </div>
      </div>
      <div className="user-actions">
        <button className="assign-group" onClick={() => handleAssignGroup(id)}>
          Asignar Grupo
        </button>
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
    filteredUsers,
    selectedIds,
    favoriteIds,
    toggleSelect,
    toggleFavorite,
    loading,
    searchTerm,
  } = useDataTableUserEnterpriseContext();

  const { openModal } = useModalContext();

  const handleDelete = (userId: string) => {
    openModal(MODAL_IDS.DELETE_USER_CONFIRMATION, { userId });
  };

  const handleAssignGroup = (userId: string) => {
    openModal(MODAL_IDS.ASSIGN_USER_TO_GROUP, { userId });
  };

  if (loading) return <SkeletonTable rows={2} />;

  return (
    <div className="table-wrapper">
      {searchTerm && (
        <div className="search-results-info">
          <span>
            {filteredUsers.length} de {users.length} usuario
            {filteredUsers.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}
      <ul className="enterprise-user-list">
        {filteredUsers.length === 0 ? (
          <div className="no-results">
            <p>No se encontraron usuarios que coincidan con "{searchTerm}"</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <UserItem
              key={`${user.id}-${user._version ?? 0}`}
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
              handleAssignGroup={handleAssignGroup}
            />
          ))
        )}
      </ul>
    </div>
  );
};
