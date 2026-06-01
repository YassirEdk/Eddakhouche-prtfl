import { useEffect, useRef } from "react";

export const useParallax = (speed = 0.2) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      bg.style.transform = `translateY(${-rect.top * speed}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [speed]);

  return { sectionRef, bgRef };
};
