import { useRef, useEffect, useCallback } from "react";

const SIZE  = 250;   // cube face size
const HALF  = SIZE / 2;
const SCENE = 500;   // scene container – large enough to contain any rotation

const faces = [
  {
    transform: `rotateY(0deg)   translateZ(${HALF}px)`,
    label: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    color: "#61DAFB",
  },
  {
    transform: `rotateY(180deg) translateZ(${HALF}px)`,
    label: "Odoo",
    logo: "https://cdn.simpleicons.org/odoo/875A7B",
    color: "#A855F7",
  },
  {
    transform: `rotateY(90deg)  translateZ(${HALF}px)`,
    label: "Spring Boot",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    color: "#6DB33F",
  },
  {
    transform: `rotateY(-90deg) translateZ(${HALF}px)`,
    label: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    color: "#FFD343",
  },
  {
    transform: `rotateX(90deg)  translateZ(${HALF}px)`,
    label: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    color: "#336791",
  },
  {
    transform: `rotateX(-90deg) translateZ(${HALF}px)`,
    label: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
  },
];

export const Cube3D = () => {
  const sceneRef   = useRef<HTMLDivElement>(null);
  const cubeRef    = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastPos    = useRef({ x: 0, y: 0 });
  const rotation   = useRef({ x: 15, y: 0 });
  const rafRef     = useRef<number>(0);

  const applyTransform = useCallback(() => {
    if (cubeRef.current) {
      cubeRef.current.style.transform =
        `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
    }
  }, []);

  useEffect(() => {
    let prevTime: number | null = null;
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
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [applyTransform]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (sceneRef.current) {
      sceneRef.current.style.cursor = "grabbing";
      sceneRef.current.setAttribute("data-cursor", "grabbing");
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    rotation.current.y += dx * 0.5;
    rotation.current.x -= dy * 0.5;
    lastPos.current = { x: e.clientX, y: e.clientY };
    applyTransform();
  };

  const onPointerUp = () => {
    isDragging.current = false;
    if (sceneRef.current) {
      sceneRef.current.style.cursor = "grab";
      sceneRef.current.setAttribute("data-cursor", "grab");
    }
  };

  return (
    <div className="flex flex-col items-center flex-shrink-0 self-center select-none">

      {/* Label above — safely outside the clipped scene */}
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Stack Technique
      </p>

      {/* Scene: clips 3D overflow so faces never escape onto the labels */}
      <div
        ref={sceneRef}
        data-cursor="grab"
        style={{
          width: SCENE,
          height: SCENE,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "900px",
          cursor: "grab",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Cube */}
        <div
          ref={cubeRef}
          style={{
            width: SIZE,
            height: SIZE,
            position: "relative",
            transformStyle: "preserve-3d",
            transform: "rotateX(15deg) rotateY(0deg)",
            flexShrink: 0,
          }}
        >
          {faces.map((face, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: SIZE,
                height: SIZE,
                transform: face.transform,
                border: `1.5px solid ${face.color}55`,
                background: `linear-gradient(135deg, ${face.color}18, ${face.color}06)`,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `inset 0 0 40px ${face.color}10, 0 0 25px ${face.color}18`,
              }}
            >
              <img
                src={face.logo}
                alt={face.label}
                draggable={false}
                style={{ width: 70, height: 70, objectFit: "contain", pointerEvents: "none" }}
              />
              <span
                style={{
                  color: face.color,
                  fontWeight: 700,
                  fontSize: "13px",
                  marginTop: "12px",
                  letterSpacing: "0.07em",
                  textShadow: `0 0 14px ${face.color}80`,
                }}
              >
                {face.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Label below — safely outside the clipped scene */}
      <p className="text-xs text-muted-foreground/50 tracking-wide mt-3">
        ↔ Faites glisser pour tourner
      </p>
    </div>
  );
};
