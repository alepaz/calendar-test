import React, { useState } from "react";
import { monthName } from "../utils/utils";
import { Modal } from "../Modal";
import { addCalendarEvent } from "../Calendar/CalendarSlice";
import { useDispatch } from "react-redux";
import "./EventForm.css";

type EventFormProps = {
  onClose: () => void;
  date: Date;
  isOpen: boolean;
  onSave?: () => void;
};

export function EventForm({ onClose, date, isOpen, onSave }: EventFormProps) {
  const dispatch = useDispatch();

  //State for input values
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  //State for color selection
  const [color, setColor] = useState("#14a800");

  //State for event description
  const [description, setDescription] = useState("");

  function wrapperOnClose() {
    setTitle("");
    setColor("#14a800");
    setDescription("");
    setTitleError("");
    onClose();
  }

  function wrapperOnSave() {
    if (title.length === 0) {
      setTitleError("Title is required");
      return "";
    }

    if (onSave) {
      onSave();
    } else {
      dispatch(
        addCalendarEvent({
          title,
          color,
          description,
          date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        })
      );
      wrapperOnClose();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={wrapperOnClose}
      header={`New Event ${monthName[date.getMonth()]} - ${date.getDate()}`}
      onSave={wrapperOnSave}
    >
      <div className="form">
        {/* Event Title */}
        <div className="form-row">
          <div className="row-label">Event:</div>
          <div className="row-input">
            <input
              className="form-input"
              aria-label="input-event-title"
              type="text"
              name="event-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        {/* Event title Error */}
        {titleError ? (
          <div className="form-row--error">
            <div className="row-label--error">* {titleError}</div>
          </div>
        ) : null}

        {/* Event Description */}
        <div className="form-row">
          <div className="row-label">Description:</div>
          <div className="row-input">
            <input
              className="form-input"
              type="text"
              name="event-description"
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
              className="form-select"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            >
              <option value="#14a800">Green</option>
              <option value="#1f57c3">Blue</option>
              <option value="#bc511b">Orange</option>
              <option value="#001e00">Black</option>
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
}
