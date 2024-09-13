import { useState } from "react";
import { Colorful, HsvaColor } from "@uiw/react-color";

function App() {
  const [hex, setHsva] = useState<HsvaColor>({ h: 0, s: 0, v: 68, a: 1 });
  return (
    <main className="min-h-screen p-10 max-w-96 mx-auto bg-red-100">
      <h2>Choose a color</h2>
      <Colorful
        color={hex}
        onChange={(color) => {
          setHsva(color.hsva);
        }}
      />
    </main>
  );
}

export default App;
