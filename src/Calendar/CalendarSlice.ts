import { createSlice } from "@reduxjs/toolkit";

type CalendarEntry = {
  [key: string]: {
    color: string;
    title: string;
    description: string;
  }[];
};

const initialState = {
  calendarEvents: {} as CalendarEntry ,
};

const calendarSlice = createSlice({
  name: "calendarMethods",
  initialState,
  reducers: {
    addCalendarEvent: (state, action) => {
      const { payload } = action;
      console.log("payload", payload);
      const {
        date,
        title,
        color,
        description,
      }: {
        date: string;
        title: string;
        color: string;
        description: string;
      } = payload;
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
