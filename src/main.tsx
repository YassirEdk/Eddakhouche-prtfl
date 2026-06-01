import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

const revealSite = () => {
  // Wait for fonts + 2 paint frames + 600ms buffer so 3D and all CSS fully initialize
  Promise.all([
    document.fonts.ready,
    new Promise(r => setTimeout(r, 600)),
  ]).then(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const root   = document.getElementById("root");
      const loader = document.getElementById("loader");

      // Show site
      if (root) {
        root.style.visibility = "visible";
        root.style.opacity    = "1";
      }

      // Fade out loader
      if (loader) {
        loader.style.opacity      = "0";
        loader.style.pointerEvents = "none";
        setTimeout(() => loader.remove(), 600);
      }
    }));
  });
};

if (document.readyState === "complete") {
  revealSite();
} else {
  window.addEventListener("load", revealSite);
}
