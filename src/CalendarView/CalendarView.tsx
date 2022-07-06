import { useState } from "react";
import { CalendarHeader } from "../CalendarHeader";
import { Calendar } from "Calendar/";
import "./CalendarView.css";

export function CalendarView() {
  //Date to display
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendarView">
      {/* Calendar header and controls */}
      <CalendarHeader date={date} setDate={setDate} />
      {/*Calendar Section*/}
      <Calendar date={date} />
    </div>
  );
}
