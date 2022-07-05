import { useState } from "react";
import { monthName } from "../utils/utils";
import { CalendarHeader } from "../CalendarHeader";
import { Calendar } from "Calendar/";

export function CalendarView() {
  //Date to display
  const [date, setDate] = useState(new Date());

  return (
    <div>
      {/* Calendar header and controls */}
      <CalendarHeader date={date} setDate={setDate} />
      {/*Calendar Section*/}
      <Calendar date={date} />
    </div>
  );
}
