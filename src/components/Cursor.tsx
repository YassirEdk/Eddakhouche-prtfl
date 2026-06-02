import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: coarse)").matches;

type Mode = "dot" | "text" | "target";

const CursorInner = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mode, setMode]       = useState<Mode>("dot");
  const [visible, setVisible] = useState(false);
  const { resolvedTheme } = useTheme();
  const COLOR = resolvedTheme === "light" ? "#000000" : "#ffffff";

  useEffect(() => {
    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if      (t.closest("[data-cursor='grab'],[data-cursor='grabbing']")) setMode("target");
      else if (t.closest("[data-cursor='text']"))                          setMode("text");
      else                                                                  setMode("dot");
    };

    const tick = () => {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      if (cursorRef.current)
        cursorRef.current.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover",  onOver);
    document.documentElement.addEventListener("mouseleave", () => setVisible(false));
    document.documentElement.addEventListener("mouseenter", () => setVisible(true));
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover",  onOver);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  /* ── shape styles ── */
  const base: React.CSSProperties = {
    position: "fixed", top: 0, left: 0,
    pointerEvents: "none", zIndex: 9999,
    transition: "width .18s ease, height .18s ease, margin .18s ease, border-radius .18s ease, opacity .25s ease, box-shadow .18s ease",
    opacity: visible ? 1 : 0,
  };

  const shapes: Record<Mode, React.CSSProperties> = {
    // 1 · small glowing dot
    dot: {
      width: 10, height: 10,
      marginLeft: -5, marginTop: -5,
      borderRadius: "50%",
      background: COLOR,
      boxShadow: `0 0 6px ${COLOR}, 0 0 18px ${COLOR}88`,
    },
    // 2 · text I-beam
    text: {
      width: 2, height: 22,
      marginLeft: -1, marginTop: -11,
      borderRadius: 2,
      background: COLOR,
      boxShadow: `0 0 6px ${COLOR}`,
    },
    // 4 · crosshair target (cube)
    target: {
      width: 32, height: 32,
      marginLeft: -16, marginTop: -16,
      borderRadius: "50%",
      background: "transparent",
      border: `1.5px solid ${COLOR}88`,
      boxShadow: `0 0 10px ${COLOR}44`,
    },
  };

  const isTarget = mode === "target";

  return (
    <div ref={cursorRef} style={{ ...base, ...shapes[mode] }}>
      {/* crosshair lines for target mode */}
      {isTarget && (
        <>
          {/* center dot */}
          <div style={{ position:"absolute", top:"50%", left:"50%", width:4, height:4, marginLeft:-2, marginTop:-2, borderRadius:"50%", background:COLOR, boxShadow:`0 0 6px ${COLOR}` }} />
          {/* horizontal bar */}
          <div style={{ position:"absolute", top:"50%", left:4, right:4, height:1, marginTop:-0.5, background:COLOR+"99" }} />
          {/* vertical bar */}
          <div style={{ position:"absolute", left:"50%", top:4, bottom:4, width:1, marginLeft:-0.5, background:COLOR+"99" }} />
        </>
      )}
    </div>
  );
};

export const Cursor = () => {
  if (isTouchDevice()) return null;
  return <CursorInner />;
};
