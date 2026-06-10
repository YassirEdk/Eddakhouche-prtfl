import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reveal if any part of the element is in (or near) the viewport.
    const isInView = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    if (isInView()) {
      setVisible(true);
      return;
    }

    // Fallback for environments without IntersectionObserver.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // threshold 0 + a positive bottom margin: reveal an element a bit BEFORE
      // it scrolls into view, so fast scrolls don't land on blank, not-yet-
      // revealed space. A ratio threshold is avoided because on mobile a section
      // can be taller than the screen and never reach it.
      { threshold: 0, rootMargin: "0px 0px 25% 0px" }
    );

    observer.observe(el);

    // Safety net: if layout shifts (mobile address bar, late images) leave the
    // element on screen without an observer callback, re-check on resize.
    const onResize = () => {
      if (isInView()) {
        setVisible(true);
        observer.disconnect();
      }
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [threshold]);

  return { ref, visible };
};
