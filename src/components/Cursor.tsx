import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

type CursorMode = "default" | "hover" | "text" | "grab" | "grabbing" | "download";

const CursorInner = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mode, setMode]       = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const color  = isDark ? "#ffffff" : "#000000";

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const grabbing = target.closest("[data-cursor='grabbing']");
      const grab     = target.closest("[data-cursor='grab']");
      const text     = target.closest("[data-cursor='text']");
      const download = target.closest("[data-cursor='download']");
      const hover    = target.closest("a, button, [role='button'], input, textarea, select");

      if (grabbing)    setMode("grabbing");
      else if (grab)   setMode("grab");
      else if (text)   setMode("text");
      else if (download) setMode("download");
      else if (hover)  setMode("hover");
      else             setMode("default");
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const animate = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${curX}px, ${curY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover",  onMouseOver);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover",  onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  const styles: Record<CursorMode, React.CSSProperties> = {
    default: {
      width: 28, height: 28,
      marginLeft: -14, marginTop: -14,
      borderRadius: "50%",
      background: "transparent",
      border: `1.5px solid ${color}`,
    },
    hover: {
      width: 10, height: 10,
      marginLeft: -5, marginTop: -5,
      borderRadius: "50%",
      background: color,
      border: "none",
    },
    text: {
      width: 2, height: 22,
      marginLeft: -1, marginTop: -11,
      borderRadius: "2px",
      background: color,
      border: "none",
    },
    grab: {
      width: 36, height: 36,
      marginLeft: -18, marginTop: -18,
      borderRadius: "50%",
      background: "transparent",
      border: `1.5px dashed ${color}`,
    },
    grabbing: {
      width: 18, height: 18,
      marginLeft: -9, marginTop: -9,
      borderRadius: "50%",
      background: color,
      border: "none",
    },
    download: {
      width: 10, height: 10,
      marginLeft: -5, marginTop: -5,
      borderRadius: "50%",
      background: "#ffffff",
      border: "none",
    },
  };

  const showCross = mode === "grab";

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        ...styles[mode],
        mixBlendMode: (isDark || mode === "download") ? "difference" : "normal",
        opacity: visible ? 1 : 0,
        position: "fixed",
        transition:
          "width 0.2s ease, height 0.2s ease, margin 0.2s ease, border-radius 0.2s ease, background 0.2s ease, border 0.2s ease, opacity 0.3s ease",
      }}
    >
      {showCross && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", width: 12, height: 1.5, background: color, borderRadius: 1 }} />
          <div style={{ position: "absolute", width: 1.5, height: 12, background: color, borderRadius: 1 }} />
        </div>
      )}
    </div>
  );
};

export const Cursor = () => {
  if (isTouchDevice()) return null;
  return <CursorInner />;
};
