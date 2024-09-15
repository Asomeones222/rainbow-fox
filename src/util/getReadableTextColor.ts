import { HsvaColor, hsvaToRgba } from "@uiw/react-color";

// https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
export const getReadableTextColor = (hsva: HsvaColor) => {
  const rgb = hsvaToRgba(hsva);
  const { r, g, b } = rgb;

  const RsRGB = r / 255;
  const GsRGB = g / 255;
  const BsRGB = b / 255;

  // Apply gamma correction
  const R =
    RsRGB <= 0.03928 ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
  const G =
    GsRGB <= 0.03928 ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
  const B =
    BsRGB <= 0.03928 ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

  // Calculate the luminance
  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  // Calculate contrast ratios
  const contrastWhite = 1.05 / (luminance + 0.05);
  const contrastBlack = (luminance + 0.05) / 0.05;

  return contrastWhite >= contrastBlack ? "#FFFFFF" : "#333333";
};
