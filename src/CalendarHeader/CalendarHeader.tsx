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
      <div className="calendarHeader-label">
        <div className="calendarHeader--month">
          {monthName[date.getMonth()]}
        </div>
        <div className="calendarHeader--year">{date.getFullYear()}</div>
      </div>
      <div className="calendarHeader-buttonContainer">
        <button
          className="calendarHeader-button"
          onClick={() => setDate(new Date(date.setMonth(date.getMonth() - 1)))}
        >
          <ArrowBackIosIcon className="calendarHeader-icon--left" />
        </button>
        <button
          className="calendarHeader-button--center"
          onClick={() => setDate(new Date())}
        >
          Today
        </button>
        <button
          className="calendarHeader-button"
          onClick={() => setDate(new Date(date.setMonth(date.getMonth() + 1)))}
        >
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
}
