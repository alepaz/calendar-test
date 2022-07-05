import { useMemo, useState } from "react";
import "./Calendar.css";

type CalendarProps = {
  date: Date;
};

export function Calendar({ date }: CalendarProps) {
  const daysInMonth = useMemo(
    () => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
    [date.getMonth(), date.getFullYear()]
  );

  // Index of the first day of the month
  const dayIndexActualMonth = date.getDay();

  // Index of the last day of the month
  const lastDayIndexActualMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const days = [];

  const daysInPreviousMonth = useMemo(
    () => new Date(date.getFullYear(), date.getMonth(), 0).getDate(),
    [date.getMonth(), date.getFullYear()]
  );
  // Array of days of the previous month
  for (let x = dayIndexActualMonth; x > 0; x -= 1) {
    days.push(
      <div
        className="day"
        key={`${date.getMonth()}-${daysInPreviousMonth - x + 1}`}
      >
        {daysInPreviousMonth - x + 1}
      </div>
    );
  }

  // Array of days of the current month
  for (let x = 1; x <= daysInMonth; x += 1) {
    days.push(
      <div className="day" key={`${date.getMonth() + 1}-${x}`}>
        {x}
      </div>
    );
  }

  // Array of days of the next month
  for (let x = 1; x <= 7 - lastDayIndexActualMonth - 1; x += 1) {
    days.push(
      <div className="day" key={`${date.getMonth() + 2}-${x}`}>
        {x}
      </div>
    );
  }

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
    </div>
  );
}
