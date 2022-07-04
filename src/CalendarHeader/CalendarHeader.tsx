import { monthName } from "../utils/utils";
import "./CalendarHeader.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type CalendarHeaderProps = {
  date: Date;
  setDate: (date: Date) => void;
};

export function CalendarHeader({ date, setDate }: CalendarHeaderProps) {
  return (
    <div className="calendarHeader">
      <div>
        {monthName[date.getMonth()]} {date.getFullYear()}
      </div>
      <div>
        <button
          onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}
        >
          <ArrowBackIosIcon />
        </button>
        <button onClick={() => setDate(new Date())}>Today</button>
        <button
          onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
}
