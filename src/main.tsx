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

  // Welcome flash — a white burst that grows from the center to the edges, then fades.
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    const wrap = document.createElement("div");
    wrap.style.cssText =
      "position:fixed;inset:0;z-index:100000;pointer-events:none;display:flex;align-items:center;justify-content:center;overflow:hidden;";

    const burst = document.createElement("div");
    // A circle large enough to cover the whole viewport (incl. corners) when scaled.
    burst.style.cssText =
      "width:230vmax;height:230vmax;border-radius:50%;" +
      "background:radial-gradient(circle, #ffffff 0%, #ffffff 55%, rgba(255,255,255,0) 75%);" +
      "transform:scale(0);will-change:transform,opacity;";

    wrap.appendChild(burst);
    document.body.appendChild(wrap);

    const anim = burst.animate(
      [
        { transform: "scale(0)",   opacity: 1, offset: 0 },
        { transform: "scale(1)",   opacity: 1, offset: 0.6 },
        { transform: "scale(1.1)", opacity: 0, offset: 1 },
      ],
      { duration: 1500, easing: "cubic-bezier(0.33, 0, 0.2, 1)" }
    );
    anim.onfinish = () => wrap.remove();
  }
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
