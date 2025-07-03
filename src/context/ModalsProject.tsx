"use client";

import { createContext, useState } from "react";

export const MODAL_IDS = {
  WORKSPACE: "workspace",
  WORKSPACE_ENTERPRISE: "workspace-enterprise",
  DELETE_CONFIRMATION: "delete-confirmation",
  MEMBERS: "members",
  ADD_USER_ENTERPRISE: "add_user_enterprise",
  ADD_GROUPS_ENTERPRISE: "add_groups_enterprise",
  ADD_WORKSPACE_ENTERPRISE: "add_workspace_enterprise",
  ADD_PROJECT_ENTERPRISE: "add_project_enterprise",
  HELPER_SUGGESTIONS: "helper_suggestions",
  DELETE_GROUPS_ENTERPRISE: "delete_group_enterprise",
  EDIT_GROUPS_ENTERPRISE: "edit_group_enterprise",
} as const;

export type ModalID = (typeof MODAL_IDS)[keyof typeof MODAL_IDS] | null;

export interface ModalProps {
  id: ModalID;
  title: string;
  children: React.ReactNode;
}

export interface ModalContextProps {
  activeModal: ModalID;
  openModal: (id: ModalID) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeModal, setActiveModal] = useState<ModalID>(null);

  const openModal = (id: ModalID) => {
    console.log("openModal called with:", id);
    console.trace("openModal trace"); 
    
    setActiveModal(id);
  };
  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <ModalContext.Provider value={{ activeModal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
