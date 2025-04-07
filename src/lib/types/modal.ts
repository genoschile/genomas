export const MODAL_IDS = {
  WORKSPACE: "workspace",
  DELETE_CONFIRMATION: "delete-confirmation",
  MEMBERS: "members",
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
