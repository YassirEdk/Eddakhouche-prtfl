import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

let windowLoaded = false;
let reactPainted = false;
let revealed     = false;

const doReveal = () => {
  if (revealed) return;
  revealed = true;
  clearTimeout(safetyTimer);
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
  // Tell React components the site is now visible so they can start their animations
  window.dispatchEvent(new Event("site-revealed"));
};

const maybeReveal = () => {
  if (!windowLoaded || !reactPainted) return;
  // 1400 ms settle: covers CSS 3D init, cube logo renders, lazy chunks, and counter observers
  setTimeout(doReveal, 1400);
};

(window as any).__signalReady = () => { reactPainted = true; maybeReveal(); };

// Safety valve — never stuck forever
const safetyTimer = setTimeout(doReveal, 10_000);

Promise.all([
  document.fonts.ready,
  new Promise<void>(r => {
    if (document.readyState === "complete") r();
    else window.addEventListener("load", () => r(), { once: true });
  }),
]).then(() => { windowLoaded = true; maybeReveal(); });
