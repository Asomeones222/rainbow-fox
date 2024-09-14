import { HsvaColor } from "@uiw/react-color";
import { windowColorKey } from "../constants";
import { setWindowColor } from "./setWinowColor";

export const restoreWindowsColors = async () => {
  const windows = await browser.windows.getAll();
  console.debug("restoreWindowsColors windows", windows);

  for (const w of windows) {
    if (!w.id) continue;
    console.debug("restoreWindowsColors w.id", w.id);

    // The color value should be an Hsva color as we set in the setWindowsColors method
    try {
      const colorValue = await browser.sessions.getWindowValue(
        w.id,
        windowColorKey,
      );
      console.debug("restoreWindowsColors colorValue", w.id, colorValue);

      if (!colorValue || typeof colorValue === "string") continue;
      const hsvaColor = colorValue as HsvaColor;
      setWindowColor(hsvaColor, w.id);
    } catch (error) {
      console.error(error);
    }
  }
};
