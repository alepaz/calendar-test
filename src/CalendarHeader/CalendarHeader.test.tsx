import { render, fireEvent, screen } from "@testing-library/react";
import { CalendarView } from "../CalendarView";
import { Provider } from "react-redux";
import store from "../store/store";
import { monthName } from "../utils/utils";

test("move forward 1 month", () => {
  //Arrange
  // Act
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <CalendarView defaultDate={new Date()} />
    </Provider>
  );

  // Act
  fireEvent.click(
    getByRole("button", {
      name: /next/i, // Get the close button by the accessibility label
    })
  );

  // Assert error
  expect(
    getByText(new RegExp(monthName[new Date().getMonth() + 1], "i"))
  ).toBeTruthy();
});

test("move backward 1 month", () => {
  //Arrange
  // Act
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <CalendarView defaultDate={new Date()} />
    </Provider>
  );

  // Act
  fireEvent.click(
    getByRole("button", {
      name: /previous/i, // Get the close button by the accessibility label
    })
  );

  // Assert error
  expect(
    getByText(new RegExp(monthName[new Date().getMonth() - 1], "i"))
  ).toBeTruthy();
});

test("move to the actual month", () => {
  //Arrange
  // Act
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <CalendarView defaultDate={new Date()} />
    </Provider>
  );

  // Act
  fireEvent.click(
    getByRole("button", {
      name: /now/i, // Get the now button by the accessibility label
    })
  );

  // Assert error
  expect(
    getByText(new RegExp(monthName[new Date().getMonth()], "i"))
  ).toBeTruthy();
});
