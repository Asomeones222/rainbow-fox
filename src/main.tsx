import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { restoreWindowsColors } from "./util/restoreWindowsColors.ts";

if (typeof browser !== "undefined") {
  browser.windows.onCreated.addListener(() => {
    restoreWindowsColors();
  });
  browser.runtime.onStartup.addListener(() => {
    restoreWindowsColors();
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
