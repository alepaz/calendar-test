import { useCallback, useMemo, useState } from "react";
import { EventForm } from "../EventForm";
import { useDispatch, useSelector } from "react-redux";
import { getCalendarEvents, CalendarEntry } from "./CalendarSlice";
import "./Calendar.css";

type CalendarProps = {
  date: Date;
};

export function Calendar({ date }: CalendarProps) {
  // Date to insert an event
  const [selectedDate, setSelectedDate] = useState(new Date());
  // Control for the modal
  const [showModal, setShowModal] = useState(false);

  /* Retrieve calendar Events */
  const calendarEvents = useSelector(getCalendarEvents);

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
          className="calendar-day--padding-month"
          key={`${date.getFullYear()}${date.getMonth() - 1}-${
            daysInPreviousMonth - x + 1
          }`}
          onClick={() => {
            setSelectedDate(
              new Date(
                date.getFullYear(),
                date.getMonth() - 1,
                daysInPreviousMonth - x + 1
              )
            );
            setShowModal(true);
          }}
        >
          {daysInPreviousMonth - x + 1}{" "}
          {new Date(
            date.getFullYear(),
            date.getMonth() - 1,
            daysInPreviousMonth - x + 1
          ).toLocaleString("default", { month: "short" })}
          <div className="calendar-events">
            {calendarEvents[
              `${date.getFullYear()}-${date.getMonth() - 1}-${
                daysInPreviousMonth - x + 1
              }`
            ]?.map((event) => {
              return (
                <div
                  className="calendar-event"
                  style={{ backgroundColor: event.color }}
                  key={event.title}
                >
                  {event.title}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Array of days of the current month
    for (let x = 1; x <= daysInMonth; x += 1) {
      daysToRender.push(
        <div
          className={`calendar-day${
            x === date.getDate() &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear()
              ? "--active"
              : ""
          }`}
          key={`${date.getMonth()}-${x}`}
          onClick={() => {
            setSelectedDate(new Date(date.getFullYear(), date.getMonth(), x));
            setShowModal(true);
          }}
        >
          {x}
          <div className="calendar-events">
            {calendarEvents[
              `${date.getFullYear()}-${date.getMonth()}-${x}`
            ]?.map((event) => {
              return (
                <div
                  className="calendar-event"
                  style={{
                    backgroundColor:
                      x === date.getDate() &&
                      event.color === "#14a800" &&
                      date.getMonth() === new Date().getMonth() &&
                      date.getFullYear() === new Date().getFullYear()
                        ? "#13544e"
                        : event.color,
                  }}
                  key={event.title}
                >
                  {event.title}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Array of days of the next month
    for (let x = 1; x <= 7 - lastDayIndexActualMonth - 1; x += 1) {
      daysToRender.push(
        <div
          className="calendar-day--padding-month"
          key={`${date.getMonth() + 1}-${x}`}
          onClick={() => {
            setSelectedDate(
              new Date(date.getFullYear(), date.getMonth() + 1, x)
            );
            setShowModal(true);
          }}
        >
          {x}{" "}
          {new Date(date.getFullYear(), date.getMonth() + 1, x).toLocaleString(
            "default",
            { month: "short" }
          )}
          <div className="calendar-events">
            {calendarEvents[
              `${date.getFullYear()}-${date.getMonth() + 1}-${x}`
            ]?.map((event) => {
              return (
                <div
                  className="calendar-event"
                  style={{ backgroundColor: event.color }}
                  key={event.title}
                >
                  {event.title}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return daysToRender;
  }, [date.getMonth(), date.getFullYear(), calendarEvents]);

  return (
    <div className="calendar">
      <div className="calendar-weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="calendar-days">{days.map((day) => day)}</div>
      <EventForm
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        date={selectedDate}
      />
    </div>
  );
}
