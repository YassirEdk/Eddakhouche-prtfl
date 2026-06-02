import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

let windowLoaded  = false;
let reactPainted  = false;

const doReveal = () => {
  const root   = document.getElementById("root");
  const loader = document.getElementById("loader");
  if (root)   { root.style.visibility = "visible"; root.style.opacity = "1"; }
  if (loader) {
    loader.style.opacity       = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => loader.remove(), 600);
  }
};

// Called by Index.tsx after React has actually painted the page
(window as any).__signalReady = () => {
  reactPainted = true;
  if (windowLoaded) doReveal();
};

// Safety valve — reveal after 6 s regardless, so the page is never stuck forever
const safetyTimer = setTimeout(() => doReveal(), 6000);

Promise.all([
  document.fonts.ready,
  new Promise<void>(r => {
    if (document.readyState === "complete") r();
    else window.addEventListener("load", () => r(), { once: true });
  }),
]).then(() => {
  windowLoaded = true;
  if (reactPainted) { clearTimeout(safetyTimer); doReveal(); }
});
