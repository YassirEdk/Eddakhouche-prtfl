import { useRef, useEffect, useCallback, useState } from "react";

const FACES = [
  { rotY:   0, rotX:  0, label: "React",       logo: "/logos/react.svg",      color: "#61DAFB" },
  { rotY: 180, rotX:  0, label: "Odoo",         logo: "/logos/odoo.svg",       color: "#A855F7" },
  { rotY:  90, rotX:  0, label: "Spring Boot",  logo: "/logos/spring.svg",     color: "#6DB33F" },
  { rotY: -90, rotX:  0, label: "Python",       logo: "/logos/python.svg",     color: "#FFD343" },
  { rotY:   0, rotX: 90, label: "PostgreSQL",   logo: "/logos/postgresql.svg", color: "#336791" },
  { rotY:   0, rotX:-90, label: "JavaScript",   logo: "/logos/javascript.svg", color: "#F7DF1E" },
];

export const Cube3D = ({ scale = 1 }: { scale?: number }) => {
  const SIZE  = Math.round(250 * scale);
  const HALF  = SIZE / 2;
  const SCENE = Math.round(500 * scale);
  const PERSP = Math.round(900 * scale);
  const LOGO  = Math.round(70  * scale);

  const sceneRef   = useRef<HTMLDivElement>(null);
  const cubeRef    = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastPos    = useRef({ x: 0, y: 0 });
  const rotation   = useRef({ x: 15, y: 0 });
  const rafRef     = useRef<number>(0);

  // On touch devices, drop the per-frame backdrop blur (very expensive on
  // mobile GPUs) and lean on a more opaque gradient instead.
  const [lite, setLite] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setLite(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const applyTransform = useCallback(() => {
    if (cubeRef.current)
      cubeRef.current.style.transform =
        `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
  }, []);

  // Prevent browser from treating cube drag as a scroll (which hides the nav bar)
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const block = (e: TouchEvent) => e.preventDefault();
    el.addEventListener("touchstart", block, { passive: false });
    el.addEventListener("touchmove",  block, { passive: false });
    return () => {
      el.removeEventListener("touchstart", block);
      el.removeEventListener("touchmove",  block);
    };
  }, []);

  useEffect(() => {
    // Honour reduced-motion: no auto-spin (dragging still works).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let prevTime: number | null = null;
    let running = false;

    const tick = (time: number) => {
      if (!isDragging.current) {
        if (prevTime !== null) {
          const delta = Math.min(time - prevTime, 50);
          rotation.current.y += delta * 0.025;
          applyTransform();
        }
        prevTime = time;
      } else {
        prevTime = null;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      prevTime = null;
      rafRef.current = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };

    // Only animate while the cube is actually on screen.
    let onScreen = true;
    const el = sceneRef.current;
    const io = el
      ? new IntersectionObserver(([entry]) => {
          onScreen = entry.isIntersecting;
          onScreen ? start() : stop();
        })
      : null;
    if (io && el) io.observe(el);
    else start();

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [applyTransform]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    document.body.style.overflow = "hidden";
    if (sceneRef.current) sceneRef.current.setAttribute("data-cursor", "grabbing");
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    rotation.current.y += dx * 0.5;
    rotation.current.x -= dy * 0.5;
    lastPos.current = { x: e.clientX, y: e.clientY };
    applyTransform();
  };

  const onPointerUp = () => {
    isDragging.current = false;
    document.body.style.overflow = "";
    if (sceneRef.current) sceneRef.current.setAttribute("data-cursor", "grab");
  };

  return (
    <div className="flex flex-col items-center flex-shrink-0 self-center select-none">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Stack Technique
      </p>

      <div
        ref={sceneRef}
        data-cursor="grab"
        style={{
          width: SCENE, height: SCENE,
          overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
          perspective: `${PERSP}px`,
          cursor: "grab", touchAction: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div
          ref={cubeRef}
          style={{
            width: SIZE, height: SIZE,
            position: "relative",
            transformStyle: "preserve-3d",
            transform: "rotateX(15deg) rotateY(0deg)",
            flexShrink: 0,
          }}
        >
          {FACES.map((face, i) => {
            const t = face.rotX !== 0
              ? `rotateX(${face.rotX}deg) translateZ(${HALF}px)`
              : `rotateY(${face.rotY}deg) translateZ(${HALF}px)`;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: SIZE, height: SIZE,
                  transform: t,
                  border: `1.5px solid ${face.color}55`,
                  background: lite
                    ? `linear-gradient(135deg, ${face.color}30, ${face.color}14)`
                    : `linear-gradient(135deg, ${face.color}18, ${face.color}06)`,
                  backdropFilter: lite ? undefined : "blur(10px)",
                  WebkitBackdropFilter: lite ? undefined : "blur(10px)",
                  borderRadius: Math.round(16 * scale),
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  boxShadow: lite
                    ? `0 0 18px ${face.color}14`
                    : `inset 0 0 40px ${face.color}10, 0 0 25px ${face.color}18`,
                }}
              >
                <img
                  src={face.logo} alt={face.label} draggable={false}
                  style={{ width: LOGO, height: LOGO, objectFit: "contain", pointerEvents: "none" }}
                />
                <span style={{
                  color: face.color, fontWeight: 700,
                  fontSize: Math.max(10, Math.round(13 * scale)) + "px",
                  marginTop: Math.round(12 * scale),
                  letterSpacing: "0.07em",
                  textShadow: `0 0 14px ${face.color}80`,
                }}>
                  {face.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-muted-foreground/50 tracking-wide mt-3">
        ↔ Faites glisser pour tourner
      </p>
    </div>
  );
};
