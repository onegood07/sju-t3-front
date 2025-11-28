import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-calendar/dist/Calendar.css";
import "./styles/spendingCalendar.css";
import "./styles/index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
