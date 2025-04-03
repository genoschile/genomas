"use client";

import { createContext, useState } from "react";

interface ModalContextProps {
  isWorkspaceModalOpen: boolean;
  openWorkspaceModal: () => void;
  closeWorkspaceModal: () => void;
  isDeleteConfirmationOpen: boolean;
  openDeleteConfirmationModal: () => void;
  closeDeleteConfirmationModal: () => void;
  isMembersModalOpen: boolean;
  openMembersModal: () => void;
  closeMembersModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  const openWorkspaceModal = () => setIsWorkspaceModalOpen(true);
  const closeWorkspaceModal = () => setIsWorkspaceModalOpen(false);
  const openDeleteConfirmationModal = () => setIsDeleteConfirmationOpen(true);
  const closeDeleteConfirmationModal = () => setIsDeleteConfirmationOpen(false);
  const openMembersModal = () => setIsMembersModalOpen(true);
  const closeMembersModal = () => setIsMembersModalOpen(false);

  const value: ModalContextProps = {
    isWorkspaceModalOpen,
    openWorkspaceModal,
    closeWorkspaceModal,
    isDeleteConfirmationOpen,
    openDeleteConfirmationModal,
    closeDeleteConfirmationModal,
    isMembersModalOpen,
    openMembersModal,
    closeMembersModal,
  };

  return <ModalContext value={value}>{children}</ModalContext>;
};
