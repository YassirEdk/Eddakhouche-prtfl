import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Detect low-end machines once and tag <html> so heavy effects (cube backdrop
// blur, floating blurred background blobs) can fall back to cheaper versions.
(() => {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 8;
  const memory = nav.deviceMemory ?? 8;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || cores <= 4 || memory <= 4) {
    document.documentElement.classList.add("low-perf");
  }
})();

createRoot(document.getElementById("root")!).render(<App />);

// Welcome reveal — the site emerges from a subtle dark fade (theme-aware),
// understated and cinematic rather than a bright flash.
const playWelcomeFade = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const isLight = document.documentElement.classList.contains("light");
  const bg = isLight ? "hsl(210,30%,97%)" : "hsl(225,55%,4%)";

  const overlay = document.createElement("div");
  overlay.style.cssText =
    `position:fixed;inset:0;z-index:100000;pointer-events:none;background:${bg};will-change:opacity;`;
  document.body.appendChild(overlay);

  const anim = overlay.animate(
    [
      { opacity: 0.9, offset: 0 },
      { opacity: 0, offset: 1 },
    ],
    { duration: 1100, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
  );
  anim.onfinish = () => overlay.remove();
};

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

  playWelcomeFade();
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
