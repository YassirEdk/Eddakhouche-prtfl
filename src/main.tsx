import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

const hideLoader = () => {
  // Wait 2 extra frames after load to ensure 3D cube and all components are fully painted
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        const loader = document.getElementById("loader");
        if (!loader) return;
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
        setTimeout(() => loader.remove(), 600);
      }, 400);
    });
  });
};

if (document.readyState === "complete") {
  hideLoader();
} else {
  window.addEventListener("load", hideLoader);
}
