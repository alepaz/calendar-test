import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeOptions } from "./ThemeProvider";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={themeOptions}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
