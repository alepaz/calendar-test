import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { monthName } from "../utils/utils";
import CloseIcon from "@mui/icons-material/Close";
import "./Event.css";

type EventFormProps = {
  onClose: () => void;
  date: Date;
  isOpen: boolean;
};

export function EventForm({ onClose, date, isOpen }: EventFormProps) {
  //State for input values
  const [title, setTitle] = useState("");

  //State for color selection
  const [color, setColor] = useState("#14a800");

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
            <h4 className="modal-title">
              New Event {monthName[date.getMonth()]} - {date.getDate()}
            </h4>
            <button onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-form">
              {/* Event Title */}
              <div className="modal-form-row">
                <div className="modal-label">Event:</div>
                <div className="modal-input">
                  <input type="text" name="name" />
                </div>
              </div>
              {/* Event Description */}
              <div className="modal-form-row">
                <div className="modal-label">Color:</div>
                <div className="modal-input">
                  <select
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                  >
                    <option value="#14a800">Green</option>
                    <option value="#bc511b">Orange</option>
                    <option value="#001e00">Black</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
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
