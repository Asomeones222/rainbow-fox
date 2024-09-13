import { useEffect, useState } from "react";
import { Block, Colorful, HsvaColor, hsvaToRgbaString } from "@uiw/react-color";
import { predefinedColors } from "./util/predefinedColors";

const defaultColor: HsvaColor = { h: 0, s: 0, v: 68, a: 1 };
function App() {
  const [hsva, setHsva] = useState<HsvaColor>(defaultColor);
  useEffect(() => {
    if (JSON.stringify(defaultColor) === JSON.stringify(hsva)) return;

    if (typeof browser === "undefined") {
      console.log(
        "Extension is running in an unsupported environment. Browser namespace is undefined",
      );
      return;
    }

    const timeout = setTimeout(() => {
      browser.theme.update({
        colors: {
          frame: hsvaToRgbaString(hsva),
          tab_background_text: "#fff",
        },
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [hsva]);

  return (
    <main className="min-h-screen p-10 max-w-96 mx-auto bg-[#a5a184] text-center">
      <h2>
        Pick{" "}
        <span
          className="px-4 rounded-md"
          style={{
            backgroundColor: hsvaToRgbaString(hsva),
          }}
        >
          window
        </span>{" "}
        color
      </h2>
      <div className="w-fit mx-auto">
        <Colorful
          color={hsva}
          onChange={(color) => {
            setHsva(color.hsva);
          }}
        />
      </div>
      <h3>Or choose from here</h3>
      <div className="w-fit mx-auto">
        <Block
          colors={[...predefinedColors]}
          color={hsva}
          onChange={(color) => {
            setHsva(color.hsva);
          }}
        />
      </div>
    </main>
  );
}

export default App;
