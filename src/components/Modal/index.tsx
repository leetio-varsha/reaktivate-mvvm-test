import React, { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  visible: boolean;
  title?: string;
  onClose: () => void;
  onConfirm?: () => void;
  children?: ReactNode;
  confirmButtonText?: string;
  closeButtonText?: string;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  onClose,
  onConfirm,
  children,
  confirmButtonText = "Confirm",
  closeButtonText = "Close",
}) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {title && <h2 className="modal-title">{title}</h2>}
        <div className="modal-content">{children}</div>
        <div className="modal-actions">
          <button className="modal-close-button" onClick={onClose}>
            {closeButtonText}
          </button>
          {onConfirm && (
            <button className="modal-confirm-button" onClick={onConfirm}>
              {confirmButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
