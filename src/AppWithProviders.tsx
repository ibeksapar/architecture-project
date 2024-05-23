import React from "react";
import App from "./App";
import { CircuitProvider } from "./context/CircuitContext";

const AppWithProviders: React.FC = () => (
  <CircuitProvider>
    <App />
  </CircuitProvider>
);

export default AppWithProviders;
