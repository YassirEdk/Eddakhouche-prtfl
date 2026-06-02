import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

let revealed = false;

const doReveal = () => {
  if (revealed) return;
  revealed = true;
  const root   = document.getElementById("root");
  const loader = document.getElementById("loader");
  if (root) {
    root.style.visibility = "visible";
    root.style.opacity    = "1";
  }
  if (loader) {
    loader.style.opacity       = "0";
    loader.style.pointerEvents = "none";
    setTimeout(() => loader.remove(), 800);
  }
  window.dispatchEvent(new Event("site-revealed"));
};

// Reveal as soon as fonts + all page assets are fully loaded — no artificial delay
Promise.all([
  document.fonts.ready,
  new Promise<void>(r => {
    if (document.readyState === "complete") r();
    else window.addEventListener("load", r as EventListener, { once: true });
  }),
]).then(doReveal);

// Safety net — never stuck forever
setTimeout(doReveal, 12_000);
