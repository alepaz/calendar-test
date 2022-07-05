import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import CloseIcon from "@mui/icons-material/Close";
import "./Modal.css";

type ModalProps = {
  onClose: () => void;
  header: React.ReactNode | string;
  isOpen: boolean;
  children: React.ReactNode;
};

export function Modal({ onClose, header, isOpen, children }: ModalProps) {
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
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button onClick={onClose}>Cancel</button>
            <button onClick={onClose}>Save</button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  );
}
