"use client";
import { createContext, useContext, useEffect, useState } from "react";

const OverlayContext = createContext({
  showOverlay: () => {},
  hideOverlay: () => {},
});

export function OverlayProvider({ children }) {
  const [count, setCount] = useState(0);

  const showOverlay = () => setCount((c) => c + 1);
  const hideOverlay = () => setCount((c) => Math.max(0, c - 1));

  useEffect(() => {
    if (count > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [count]);

  return (
    <OverlayContext.Provider value={{ showOverlay, hideOverlay }}>
      {children}
      <div
        className="overlay"
        style={{
          position: "fixed",
          top: "0",
          zIndex: "100",
          width: "100dvw",
          height: "100dvh",
          background: `color-mix(in srgb, var(--black) ${
            count > 0 ? "40%" : "0%"
          }, transparent)`,
          pointerEvents: count > 0 ? "all" : "none",
          transition: 'all .3s'
        }}
      />
    </OverlayContext.Provider>
  );
}

export const useOverlay = () => useContext(OverlayContext);
