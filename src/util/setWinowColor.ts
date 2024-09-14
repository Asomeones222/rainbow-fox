import { HsvaColor, hsvaToRgba, hsvaToRgbaString } from "@uiw/react-color";
import { getReadableTextColor } from "./getReadableTextColor";

export const setWindowColor = async (hsva: HsvaColor) => {
  const currentWindow = await browser.windows.getCurrent();
  if (!currentWindow.id) {
    console.error("Failed to set theme for current window", currentWindow);
    return;
  }
  browser.theme.update(currentWindow.id, {
    colors: {
      frame: hsvaToRgbaString(hsva),
      tab_background_text: getReadableTextColor(hsvaToRgba(hsva)),
    },
  });
};
