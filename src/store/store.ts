import { configureStore } from "@reduxjs/toolkit";
import CalendarReducer from "../Calendar/CalendarSlice";

const store = configureStore({
  reducer: {
    calendar: CalendarReducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;

export default store;
