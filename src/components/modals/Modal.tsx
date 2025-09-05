"use client";

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
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Mostrar o cerrar según estado
    if (activeModal === id && !dialog.open) {
      dialog.showModal();
    } else if (activeModal !== id && dialog.open) {
      dialog.close();
    }

    // Escucha ESC y sincroniza estado
    const handleCancel = (event: Event) => {
      event.preventDefault();
      closeModal();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [activeModal, id, closeModal]);

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
