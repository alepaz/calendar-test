import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import CalendarReducer from "../Calendar/CalendarSlice";

const store = configureStore({
  reducer: {
    calendar: CalendarReducer,
  },
});

export default store;