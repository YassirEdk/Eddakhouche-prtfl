import { useEffect, useRef, useState } from "react";

export const Cursor = () => {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setHovered(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        setHovered(false);
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const animate = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover",  onMouseOver);
    window.addEventListener("mouseout",   onMouseOut);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover",  onMouseOver);
      window.removeEventListener("mouseout",   onMouseOut);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  return (
    <>
      {/* Dot — follows instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-opacity duration-300"
        style={{
          width: hovered ? 10 : 8,
          height: hovered ? 10 : 8,
          background: "hsl(var(--primary))",
          opacity: visible ? 1 : 0,
          marginTop: hovered ? -1 : 0,
          marginLeft: hovered ? -1 : 0,
          transition: "width 0.2s, height 0.2s, opacity 0.3s",
        }}
      />

      {/* Ring — chases with delay */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          width:  hovered ? 48 : 40,
          height: hovered ? 48 : 40,
          border: `2px solid hsl(var(--primary))`,
          opacity: visible ? (hovered ? 0.8 : 0.45) : 0,
          boxShadow: hovered ? "0 0 12px hsl(var(--primary) / 0.4)" : "none",
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.3s, box-shadow 0.25s",
          marginTop:  hovered ? -4 : 0,
          marginLeft: hovered ? -4 : 0,
        }}
      />
    </>
  );
};
