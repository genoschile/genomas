"use client"

/* hooks */
import { useModalContext } from "@/hooks/useModalsProject";
import { useRef, useEffect } from "react";

/* icons */
import { FaTimes } from "react-icons/fa";

/* types */
import { ModalProps } from "@/context/ModalsProject";

/* styles */
import "./modal.css";

export const Modal: React.FC<ModalProps> = ({ id, title, children }) => {
  const { activeModal, closeModal } = useModalContext();
  const dialogRef = useRef<HTMLDialogElement>(null);

useEffect(() => {
  console.log("Modal useEffect: ", { activeModal, id });

  if (activeModal === id && dialogRef.current) {
    dialogRef.current.showModal();
  } else if (activeModal !== id && dialogRef.current?.open) {
    dialogRef.current.close();
  }
}, [activeModal, id]);

  if (activeModal !== id) return null;

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal__content" onMouseDown={(e) => e.stopPropagation()}>
        <header className="modal__header">
          <h4 className="modal__title" aria-labelledby="modal-title">
            {title}
          </h4>
          <form method="dialog">
            <button className="modal__close-button" onClick={closeModal}>
              <FaTimes />
            </button>
          </form>
        </header>
        {children}
      </div>
    </dialog>
  );
};
