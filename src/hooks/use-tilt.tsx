import { useRef, useCallback } from "react";

export const useTilt = (max = 12) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -max;
      const rotateY = ((x - cx) / cx) * max;

      const glare = el.querySelector<HTMLDivElement>("[data-glare]");
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.18) 0%, transparent 75%)`;
      }

      el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    },
    [max]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const glare = el.querySelector<HTMLDivElement>("[data-glare]");
    if (glare) glare.style.background = "transparent";
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
};
