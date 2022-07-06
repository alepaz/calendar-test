import { render, fireEvent } from "@testing-library/react";
import { EventForm } from "./EventForm";
import { Provider } from "react-redux";
import store from "../store/store";

test("form shows error to save event", () => {
  // Arrange
  const handleClose = jest.fn();
  const handleSave = jest.fn();

  // Act
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <EventForm
        onClose={handleClose}
        onSave={handleSave}
        date={new Date()}
        isOpen
      />
    </Provider>
  );

  // Act
  fireEvent.click(
    getByRole("button", {
      name: /save/i, // Get the close button by the accessibility label
    })
  );

  // Assert
  expect(handleSave).toHaveBeenCalledTimes(0); // Save button should be called but save event should not and we will have an error

  // Assert error
  expect(getByText("* Title is required")).toBeTruthy();
});

test("form saves event", () => {
  // Arrange
  const handleClose = jest.fn();
  const handleSave = jest.fn();

  // Act
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <EventForm
        onClose={handleClose}
        onSave={handleSave}
        date={new Date()}
        isOpen
      />
    </Provider>
  );

  //Act
  fireEvent.input(
    getByRole("textbox", {
      name: /input-event-title/i,
    }),
    { target: { value: "test" } }
  );

  // Act
  fireEvent.click(
    getByRole("button", {
      name: /save/i, // Get the close button by the accessibility label
    })
  );

  // Assert
  expect(handleSave).toHaveBeenCalledTimes(1); // Save button should be called and save event should be executed
});
