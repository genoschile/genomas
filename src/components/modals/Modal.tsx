import { createPortal } from "react-dom";
import "./modal.css";
import { FaTimes } from "react-icons/fa";

export interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  children,
  onClose,
  title,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal__content" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h4 className="modal__title">{title}</h4>
          <button className="modal__close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};
