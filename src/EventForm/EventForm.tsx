import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Event.css";
import { monthName } from "../utils/utils";

type EventFormProps = {
  onClose: () => void;
  date: Date;
  isOpen: boolean;
};

export function EventForm({ onClose, date, isOpen }: EventFormProps) {
  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === "27") {
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
            <h4 className="modal-title">
              New Event {monthName[date.getMonth()]} - {date.getDate()}
            </h4>
          </div>
          <div className="modal-body"></div>
          <div className="modal-footer">
            <button onClick={onClose} className="button">
              Close
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")!
  );
}
