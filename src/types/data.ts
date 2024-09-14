import { HsvaColor } from "@uiw/react-color";
import { localStorageKey } from "../constants";

export type ExtensionData = {
  [localStorageKey]: {
    [windowIdentifier: string]: HsvaColor;
  };
};
