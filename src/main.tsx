import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

const pageStart = Date.now();
const MIN_MS    = 2200; // neon E shows for at least this long
let   revealed  = false;

const doReveal = () => {
  if (revealed) return;
  revealed = true;
  const root   = document.getElementById("root");
  const loader = document.getElementById("loader");
  if (root) {
    root.style.visibility = "visible";
    root.style.opacity    = "1";
    root.style.transform  = "translateY(0)";
  }
  if (loader) {
    loader.style.opacity       = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => loader.remove(), 800);
  }
  window.dispatchEvent(new Event("site-revealed"));
};

// Wait for everything (fonts + all page resources), then pad to MIN_MS minimum
Promise.all([
  document.fonts.ready,
  new Promise<void>(r => {
    if (document.readyState === "complete") r();
    else window.addEventListener("load", r as EventListener, { once: true });
  }),
]).then(() => {
  const remaining = MIN_MS - (Date.now() - pageStart);
  setTimeout(doReveal, Math.max(0, remaining));
});

// Absolute safety net — never stuck forever
setTimeout(doReveal, 12_000);
