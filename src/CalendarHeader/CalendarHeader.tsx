import { monthName } from "../utils/utils";

type CalendarHeaderProps = {
  date: Date;
};

export function CalendarHeader({ date }: CalendarHeaderProps) {
  return (
    <div>
      {monthName[date.getMonth()]} {date.getFullYear()}
    </div>
  );
}
