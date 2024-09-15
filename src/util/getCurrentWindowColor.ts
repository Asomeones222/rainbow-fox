import { HsvaColor } from "@uiw/react-color";
import { windowColorKey } from "../constants";

export const getCurrentWindowColor = async (): Promise<
  HsvaColor | undefined
> => {
  const windowId = (await browser.windows.getCurrent()).id;
  if (!windowId) {
    console.error(
      "getCurrentWindowColor: Failed to get color for current window",
    );
    return;
  }
  const color = await browser.sessions.getWindowValue(windowId, windowColorKey);
  if (typeof color !== "object") {
    console.error(
      "getCurrentWindowColor: Failed to get color for current window",
    );
    return;
  }
  return color as HsvaColor;
};
