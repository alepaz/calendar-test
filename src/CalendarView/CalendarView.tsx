import { useState } from "react";
import { CalendarHeader } from "../CalendarHeader";
import { Calendar } from "Calendar/";
import "./CalendarView.css";

type CalendarViewProps = {
  defaultDate?: Date;
};

export function CalendarView({ defaultDate = new Date() }: CalendarViewProps) {
  //Date to display
  const [date, setDate] = useState(defaultDate);

  return (
    <div className="calendarView">
      {/* Calendar header and controls */}
      <CalendarHeader date={date} setDate={setDate} />
      {/*Calendar Section*/}
      <Calendar date={date} />
    </div>
  );
}
