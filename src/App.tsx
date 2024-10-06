import { useEffect, useRef, useState } from "react";
import { Block, Colorful, HsvaColor, hsvaToRgbaString } from "@uiw/react-color";
import { predefinedColors } from "./util/predefinedColors";
import { storeWindowsColors } from "./util/storeWindowsColors";
import { setWindowColor } from "./util/setWinowColor";
import { getReadableTextColor } from "./util/getReadableTextColor";
import { getCurrentWindowColor } from "./util/getCurrentWindowColor";
import { resetWindowColor } from "./util/resetWinowColor";

const defaultColor: HsvaColor = { h: 0, s: 0, v: 100, a: 1 };

function App() {
  const [hsva, setHsva] = useState<HsvaColor>(defaultColor);
  const currentWindowColor = useRef<HsvaColor | undefined>(undefined);

  useEffect(() => {
    getCurrentWindowColor().then((color) => {
      if (!color) return;
      setHsva(color);
    });
  }, []);

  useEffect(() => {
    if (typeof browser === "undefined") {
      console.log(
        "Extension is running in an unsupported environment. Browser namespace is undefined",
      );
      return;
    }

    if (
      JSON.stringify(hsva) === JSON.stringify(currentWindowColor.current) ||
      JSON.stringify(hsva) === JSON.stringify(defaultColor)
    )
      return;
    console.debug("Setting color through useEffect hsva dep");
    const timeout = setTimeout(() => {
      try {
        currentWindowColor.current = hsva;
        setWindowColor(hsva).then(() => {
          storeWindowsColors();
        });
      } catch (e) {
        console.error(e);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [hsva]);

  return (
    <main className="min-h-screen p-10 pb-2 max-w-96 mx-auto bg-[#a5a184] text-center relative">
      <h2>
        Pick{" "}
        <span
          className="px-4 rounded-md"
          style={{
            backgroundColor: hsvaToRgbaString(hsva),
            color: getReadableTextColor(hsva),
          }}
        >
          window
        </span>{" "}
        color
      </h2>
      <div className="w-fit mx-auto">
        <Block
          colors={[...predefinedColors]}
          color={hsva}
          onChange={(color) => {
            setHsva(color.hsva);
          }}
        />
      </div>
      <h3>
        Or choose from{" "}
        <span
          className="px-4 rounded-md"
          style={{
            backgroundColor: hsvaToRgbaString(hsva),
            color: getReadableTextColor(hsva),
          }}
        >
          here
        </span>
      </h3>
      <div className="w-fit mx-auto">
        <Colorful
          color={hsva}
          disableAlpha
          onChange={(color) => {
            setHsva(color.hsva);
          }}
        />
      </div>
      <div className="w-fit mx-auto mt-14 shadow-lg">
        <button
          className="px-4 rounded-md"
          style={{
            backgroundColor: hsvaToRgbaString(hsva),
            color: getReadableTextColor(hsva),
          }}
          onClick={() => {
            setHsva(defaultColor);
            resetWindowColor().then(() => {
              storeWindowsColors();
            });
          }}
        >
          <p className="mb-0">Reset theme</p>
        </button>
      </div>
      <div className="flex justify-between mt-20">
        <span title="Free Palestine">🇵🇸</span>
        <a href="https://github.com/Asomeones222/rainbow-fox" target="_blank">
          <span>Visit Page</span>
        </a>
      </div>
    </main>
  );
}

export default App;
