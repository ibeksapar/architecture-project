import React from "react";
import ReactDOM from "react-dom/client";
import AppWithProviders from "./AppWithProviders";
import "./index.css";
import initReactFastclick from "react-fastclick";

initReactFastclick();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>
);
