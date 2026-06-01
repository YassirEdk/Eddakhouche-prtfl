import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Remove loading screen once React has painted
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
      setTimeout(() => loader.remove(), 500);
    }
  });
});
