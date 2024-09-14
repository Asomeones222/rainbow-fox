import { HsvaColor, hsvaToRgba, hsvaToRgbaString } from "@uiw/react-color";
import { getReadableTextColor } from "./getReadableTextColor";

export const setWindowColor = async (hsva: HsvaColor, _windowId?: number) => {
  const windowId = _windowId || (await browser.windows.getCurrent()).id;
  if (!windowId) {
    console.error("setWindowColor: Failed to set theme for window");
    return;
  }
  browser.theme.update(windowId, {
    colors: {
      frame: hsvaToRgbaString(hsva),
      tab_background_text: getReadableTextColor(hsvaToRgba(hsva)),
    },
  });
};
