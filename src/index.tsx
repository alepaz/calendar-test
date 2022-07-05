import React from "react";
import ReactDOMClient from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { themeOptions } from "./ThemeProvider";

const container = document.getElementById("root");

const root = ReactDOMClient.createRoot(container!);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={themeOptions}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
