import { useCallback, useMemo, useState } from "react";
import "./Calendar.css";
import { EventForm } from "../EventForm";

type CalendarProps = {
  date: Date;
};

export function Calendar({ date }: CalendarProps) {
  // Date to insert an event
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Control for the modal
  const [showModal, setShowModal] = useState(false);

  const days = useMemo(() => {
    // Represent how many days in a month
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    //Date with the first day of the month
    const firstDayOfActualMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      1
    );

    // Index of the day of the first day of the month
    const dayIndexActualMonth = firstDayOfActualMonth.getDay();

    // Index of the day of the last day of the month
    const lastDayIndexActualMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDay();

    const daysInPreviousMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();

    const daysToRender = [];

    // Array of days of the previous month
    for (let x = dayIndexActualMonth; x > 0; x -= 1) {
      daysToRender.push(
        <div
          className="day"
          key={`${date.getMonth()}-${daysInPreviousMonth - x + 1}`}
          onClick={() => {
            setSelectedDate(
              new Date(date.setDate(daysInPreviousMonth - x + 1))
            );
            setShowModal(true);
          }}
        >
          {daysInPreviousMonth - x + 1}
        </div>
      );
    }

    // Array of days of the current month
    for (let x = 1; x <= daysInMonth; x += 1) {
      daysToRender.push(
        <div
          className="day"
          key={`${date.getMonth() + 1}-${x}`}
          onClick={() => {
            setSelectedDate(new Date(date.setDate(x)));
            setShowModal(true);
          }}
        >
          {x}
        </div>
      );
    }

    // Array of days of the next month
    for (let x = 1; x <= 7 - lastDayIndexActualMonth - 1; x += 1) {
      daysToRender.push(
        <div
          className="day"
          key={`${date.getMonth() + 2}-${x}`}
          onClick={() => {
            setSelectedDate(
              new Date(date.getFullYear(), date.getMonth() + 1, x)
            );
            setShowModal(true);
          }}
        >
          {x}
        </div>
      );
    }

    return daysToRender;
  }, [date.getMonth(), date.getFullYear()]);

  return (
    <div className="calendarContainer">
      <div className="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="days">{days.map((day) => day)}</div>
      <EventForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        date={selectedDate}
      />
    </div>
  );
}
