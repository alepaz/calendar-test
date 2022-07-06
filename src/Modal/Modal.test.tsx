import { render, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

test("modal shows the children and a close button", () => {
  // Arrange
  const handleClose = jest.fn();

  // Act
  const { getByText, getByRole } = render(
    <Modal onClose={handleClose} header="this is a test" isOpen>
      <div>test</div>
    </Modal>
  );
  // Assert
  expect(getByText("test")).toBeTruthy();

  // Act
  fireEvent.click(
    getByRole("button", {
      name: /close/i, // Get the close button by the accessibility label
    })
  );

  // Assert
  expect(handleClose).toHaveBeenCalledTimes(1);
});
