"use client";

/* hooks */
import { useModalContext } from "@/hooks/useModalsProject";
import { useRef, useEffect } from "react";

/* icons */
import { FaTimes } from "react-icons/fa";

/* types */
import { ModalProps } from "@/context/ModalsProject";

/* styles */
import "./modalUtils.css";

export const ModalUtilsUsers: React.FC<ModalProps> = ({
  id,
  title,
  children,
}) => {
  const { activeModal } = useModalContext();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (activeModal === id && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (activeModal !== id && dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [activeModal, id]);

  if (activeModal !== id) return null;

  return (
    <dialog ref={dialogRef} className="modal">
      {children}
    </dialog>
  );
};
