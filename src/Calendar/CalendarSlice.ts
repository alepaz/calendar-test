import { createSlice } from "@reduxjs/toolkit";

type CalendarEntry = {
  [key: string]: {
    color: string;
    title: string;
    description: string;
  }[];
};

type PayloadProps = {
  date: string;
  title: string;
  color: string;
  description: string;
};

const initialState = {
  calendarEvents: {} as CalendarEntry,
};

const calendarSlice = createSlice({
  name: "calendarMethods",
  initialState,
  reducers: {
    addCalendarEvent: (state, action) => {
      const { payload } = action;
      const { date, title, color, description }: PayloadProps = payload;
      state.calendarEvents[date] = [
        ...state.calendarEvents[date],
        {
          color,
          title,
          description,
        },
      ];
    },
  },
});

export const { addCalendarEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
