import { useEffect, useState } from "react";
import { Block, Colorful, HsvaColor, hsvaToRgbaString } from "@uiw/react-color";
import { predefinedColors } from "./util/predefinedColors";
import { storeWindowsColors } from "./util/storeWindowsColors";
import { setWindowColor } from "./util/setWinowColor";
import { getReadableTextColor } from "./util/getReadableTextColor";

const defaultColor: HsvaColor = { h: 0, s: 0, v: 68, a: 1 };
function App() {
  const [hsva, setHsva] = useState<HsvaColor>(defaultColor);
  useEffect(() => {
    // Prevents setting to default color when opening the extension
    // it's kinda a bug because if someone selects exactly this color nothing will update
    // but what's the possibility of this?
    if (JSON.stringify(defaultColor) === JSON.stringify(hsva)) return;

    if (typeof browser === "undefined") {
      console.log(
        "Extension is running in an unsupported environment. Browser namespace is undefined",
      );
      return;
    }

    const timeout = setTimeout(() => {
      try {
        setWindowColor(hsva);
        storeWindowsColors();
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
      <div className="flex justify-between mt-20">
        <span title="Free Palestine">🇵🇸</span>
        <a href="https://www.github.com" target="_blank">
          <span>Visit Page</span>
        </a>
      </div>
    </main>
  );
}

export default App;
