"use client";

import { ModalContextProps, ModalID } from "@/lib/types/modal";
import { createContext, useState } from "react";

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeModal, setActiveModal] = useState<ModalID>(null);

  const openModal = (id: ModalID) => {
    console.log("openModal", id);
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
