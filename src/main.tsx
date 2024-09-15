import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { restoreWindowsColors } from "./util/restoreWindowsColors.ts";

const restoreWindowsColorsCallBack = () => {
  restoreWindowsColors();
};

if (typeof browser !== "undefined") {
  if (!browser.runtime.onStartup.hasListener(restoreWindowsColorsCallBack)) {
    browser.runtime.onStartup.addListener(restoreWindowsColorsCallBack);
    browser.windows.onCreated.addListener(restoreWindowsColorsCallBack);
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
