"use client";

import { useState } from "react";
import { useGroupsContext } from "@/features/enterprise/context/GroupsEnterpriseContext";
import { useDataTableUserEnterpriseContext } from "@/features/enterprise/context/DataTableUserEnterpriseContext";
import { MdGroups2, MdExpandMore, MdExpandLess, MdEdit, MdDelete } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { MODAL_IDS } from "@/features/modals/context/ModalsProject";
import "./viewGroupsList.css";

export const ModalViewGroupsList = () => {
  const { groups } = useGroupsContext();
  const { users } = useDataTableUserEnterpriseContext();
  const { openModal } = useModalContext();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  const getUsersInGroup = (groupName: string) => {
    return users.filter((user) => user.groups.includes(groupName));
  };

  const handleEditGroup = (groupId: string) => {
    openModal(MODAL_IDS.EDIT_GROUPS_ENTERPRISE, { groupId });
  };

  const handleDeleteGroup = (groupId: string) => {
    openModal(MODAL_IDS.DELETE_GROUPS_ENTERPRISE, { groupId });
  };

  if (groups.length === 0) {
    return (
      <div className="groups-list-empty">
        <MdGroups2 size={64} className="empty-icon" />
        <p>No hay grupos creados</p>
        <p className="empty-subtitle">
          Crea tu primer grupo usando el botón de agregar grupo
        </p>
      </div>
    );
  }

  return (
    <div className="groups-list-container">
      <div className="groups-list-header">
        <div className="header-info">
          <MdGroups2 size={24} />
          <span>
            {groups.length} grupo{groups.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="groups-accordion">
        {groups.map((group) => {
          const isExpanded = expandedGroups.has(group.id);
          const groupUsers = getUsersInGroup(group.name);

          return (
            <div key={group.id} className="group-accordion-item">
              <div
                className="group-header"
                onClick={() => toggleGroup(group.id)}
              >
                <div className="group-header-left">
                  <button className="expand-button">
                    {isExpanded ? (
                      <MdExpandLess size={24} />
                    ) : (
                      <MdExpandMore size={24} />
                    )}
                  </button>
                  <MdGroups2 size={20} className="group-icon" />
                  <div className="group-title-info">
                    <h4 className="group-name">{group.name}</h4>
                    <span className="group-users-count">
                      <FaUsers size={12} />
                      {groupUsers.length} usuario{groupUsers.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <div className="group-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="action-btn edit"
                    onClick={() => handleEditGroup(group.id)}
                    title="Editar grupo"
                  >
                    <MdEdit size={18} />
                  </button>
                  <button
                    className="action-btn delete"
                    onClick={() => handleDeleteGroup(group.id)}
                    title="Eliminar grupo"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="group-content">
                  {group.description && (
                    <div className="group-section">
                      <span className="section-label">Descripción:</span>
                      <p className="group-description">{group.description}</p>
                    </div>
                  )}

                  <div className="group-section">
                    <span className="section-label">Roles:</span>
                    <div className="roles-list">
                      {group.role && group.role.length > 0 ? (
                        group.role.map((role, idx) => (
                          <span key={idx} className="role-badge">
                            {role}
                          </span>
                        ))
                      ) : (
                        <span className="no-data">Sin roles asignados</span>
                      )}
                    </div>
                  </div>

                  <div className="group-section">
                    <span className="section-label">
                      Usuarios ({groupUsers.length}):
                    </span>
                    {groupUsers.length > 0 ? (
                      <div className="users-list">
                        {groupUsers.map((user) => (
                          <div key={user.id} className="user-item">
                            <div className="user-avatar-small">
                              {user.image ? (
                                <img src={user.image} alt={user.name} />
                              ) : (
                                <span>{user.name.charAt(0).toUpperCase()}</span>
                              )}
                            </div>
                            <div className="user-details">
                              <span className="user-name">{user.name}</span>
                              <span className="user-email">{user.email}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="no-data">No hay usuarios en este grupo</span>
                    )}
                  </div>

                  <div className="group-footer">
                    <span className="created-date">
                      Creado: {new Date(group.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
