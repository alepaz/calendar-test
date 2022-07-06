import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import "@testing-library/jest-dom/extend-expect";

test("renders application", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(
    new RegExp(new Date().getFullYear(), "i")
  );
  expect(linkElement).toBeInTheDocument();
});
