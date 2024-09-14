import { rgbaStringToHsva } from "@uiw/react-color";
import { windowColorKey } from "../constants";

export const storeWindowsColors = async () => {
  const windows = await browser.windows.getAll();
  console.debug("storeWindowsColors windows", windows);

  for (const w of windows) {
    if (!w.id) continue;
    console.debug("storeWindowsColors w.id", w.id);

    // Color is returned in rgba format
    const color = (await browser.theme.getCurrent(w.id)).colors?.frame;
    console.debug("storeWindowsColors color", color);
    if (typeof color !== "string") continue;

    const hsvaColor = rgbaStringToHsva(color);
    console.debug("storeWindowsColors hsvaColor", hsvaColor);

    browser.sessions.setWindowValue(w.id, windowColorKey, hsvaColor);
  }
};
