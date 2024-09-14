import { hexToHsva } from "@uiw/react-color";
import { localStorageKey } from "../constants";
import { ExtensionData } from "../types/data";

export const storeWindowsColors = async () => {
  const data: ExtensionData = {
    [localStorageKey]: {},
  };
  const windows = await browser.windows.getAll();
  for (const w of windows) {
    if (!w.tabs) continue;

    const key = w.tabs.map((tab) => tab.url).join(",");
    const color = (await browser.theme.getCurrent(w.id)).colors?.frame;
    if (typeof color !== "string") continue;

    data[localStorageKey][key] = hexToHsva(color);
  }
  console.debug("storeWindowsColors", data);
  browser.storage.local.set(data);
};
