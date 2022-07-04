import { useState } from "react";
import { monthName } from "../utils/utils";
import { CalendarHeader } from "../CalendarHeader";

export function Calendar() {
  //Date to display
  const [date, setDate] = useState(new Date());
  // Month to display
  //   const [month, setMonth] = useState(() => new Date().getMonth());
  //   // Year to display
  //   const [year, setYear] = useState(() => new Date().getFullYear());

  return (
    <div>
      <CalendarHeader date={date} setDate={setDate} />
    </div>
  );
}
