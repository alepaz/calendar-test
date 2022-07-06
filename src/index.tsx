import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { themeOptions } from "./ThemeProvider";
import { Provider } from "react-redux";
import store from "./store/store";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={themeOptions}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
