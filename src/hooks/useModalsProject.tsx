"use client"

import { ModalContext } from "@/context/ModalsProject";
import { use } from "react";

export const useModalContext = () => {
  const context = use(ModalContext);

  if (!context) {
    throw new Error("useModalContext");
  }

  return context;
};
