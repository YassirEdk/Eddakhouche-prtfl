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
  (window as any).__siteRevealed = true;
  window.dispatchEvent(new Event("site-revealed"));
};

// Keep the neon "E" loader visible until the site is genuinely ready:
// fonts loaded, all assets loaded (window.load), React has mounted content,
// AND the browser has actually painted a frame. Revealing on window.load
// alone hides the loader before React paints, which flashes blank content.
const revealWhenPainted = () => {
  const root = document.getElementById("root");
  // Wait until React has rendered its tree into #root.
  if (!root || root.childElementCount === 0) {
    requestAnimationFrame(revealWhenPainted);
    return;
  }
  // Two frames guarantees the layout/paint of that content has happened.
  requestAnimationFrame(() => requestAnimationFrame(doReveal));
};

Promise.all([
  document.fonts.ready,
  new Promise<void>(r => {
    if (document.readyState === "complete") r();
    else window.addEventListener("load", r as EventListener, { once: true });
  }),
]).then(revealWhenPainted);

// Safety net — never stuck forever
setTimeout(doReveal, 12_000);
