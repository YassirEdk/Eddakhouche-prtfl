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
  if (root)   { root.style.visibility = "visible"; root.style.opacity = "1"; }
  if (loader) {
    loader.style.opacity       = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => loader.remove(), 600);
  }
};

const maybeReveal = () => {
  if (!windowLoaded || !reactPainted) return;
  // 900 ms settle buffer: lets CSS 3D, counter observers, and lazy chunks finish
  setTimeout(doReveal, 900);
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
