import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import CloseIcon from "@mui/icons-material/Close";
import "./Modal.css";

type ModalProps = {
  onClose: () => void;
  header: React.ReactNode | string;
  isOpen: boolean;
  children: React.ReactNode;
  onSave?: () => void;
};

export function Modal({
  onClose,
  onSave,
  header,
  isOpen,
  children,
}: ModalProps) {
  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition in={isOpen} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">{header}</h4>
            <button
              aria-label="close"
              className="modal-button--close"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>
          <div className="modal-body">{children}</div>
          {onSave ? (
            <div className="modal-footer">
              <button
                aria-label="cancel"
                className="modal-button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                aria-label="save"
                className="modal-button"
                onClick={onSave}
              >
                Save
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
}
