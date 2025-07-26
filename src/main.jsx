import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import ThemeContext from "./context/ThemeContext.jsx";
import JournalContext from "./context/JournalContext.jsx";

createRoot(document.getElementById("root")).render(
  <JournalContext>
    <ThemeContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeContext>
  </JournalContext>
);
