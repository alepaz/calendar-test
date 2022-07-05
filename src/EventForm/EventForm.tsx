import React, { useEffect, useState } from "react";
import { monthName } from "../utils/utils";
import { Modal } from "../Modal";
import { addCalendarEvent } from "../Calendar/CalendarSlice";
import { useDispatch, useSelector } from "react-redux";
import "./EventForm.css";

type EventFormProps = {
  onClose: () => void;
  date: Date;
  isOpen: boolean;
};

export function EventForm({ onClose, date, isOpen }: EventFormProps) {
  const dispatch = useDispatch();

  //State for input values
  const [title, setTitle] = useState("");

  //State for color selection
  const [color, setColor] = useState("#14a800");

  //State for event description
  const [description, setDescription] = useState("");

  function wrapperOnClose() {
    setTitle("");
    setColor("#14a800");
    setDescription("");
    onClose();
  }

  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      wrapperOnClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={wrapperOnClose}
      header={`New Event ${monthName[date.getMonth()]} - ${date.getDate()}`}
      onSave={() => {
        dispatch(
          addCalendarEvent({
            title,
            color,
            description,
            date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
          })
        );
      }}
    >
      <div className="form">
        {/* Event Title */}
        <div className="form-row">
          <div className="row-label">Event:</div>
          <div className="row-input">
            <input
              type="text"
              name="name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        {/* Event Description */}
        <div className="form-row">
          <div className="row-label">Description:</div>
          <div className="row-input">
            <input
              type="text"
              name="name"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        {/* Event Color */}
        <div className="form-row">
          <div className="row-label">Color:</div>
          <div className="row-input">
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
    </Modal>
  );
}
