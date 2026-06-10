import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const DARK_THEMES: Record<string, { c1: string; c2: string; c3: string }> = {
  hero:           { c1: "rgba(0,212,255,0.14)",   c2: "rgba(99,102,241,0.09)",  c3: "rgba(0,212,255,0.05)"  },
  experience:     { c1: "rgba(139,92,246,0.14)",  c2: "rgba(168,85,247,0.09)",  c3: "rgba(99,102,241,0.05)" },
  projects:       { c1: "rgba(59,130,246,0.13)",  c2: "rgba(37,99,235,0.09)",   c3: "rgba(59,130,246,0.05)" },
  skills:         { c1: "rgba(20,184,166,0.14)",  c2: "rgba(6,182,212,0.09)",   c3: "rgba(20,184,166,0.05)" },
  certifications: { c1: "rgba(99,102,241,0.14)",  c2: "rgba(139,92,246,0.09)",  c3: "rgba(99,102,241,0.05)" },
  contact:        { c1: "rgba(0,212,255,0.13)",   c2: "rgba(99,102,241,0.09)",  c3: "rgba(6,182,212,0.05)"  },
};

const LIGHT_THEMES: Record<string, { c1: string; c2: string; c3: string }> = {
  hero:           { c1: "rgba(0,180,220,0.18)",   c2: "rgba(99,102,241,0.12)",  c3: "rgba(0,180,220,0.08)"  },
  experience:     { c1: "rgba(139,92,246,0.18)",  c2: "rgba(168,85,247,0.12)",  c3: "rgba(99,102,241,0.08)" },
  projects:       { c1: "rgba(59,130,246,0.16)",  c2: "rgba(37,99,235,0.12)",   c3: "rgba(59,130,246,0.07)" },
  skills:         { c1: "rgba(20,184,166,0.18)",  c2: "rgba(6,182,212,0.12)",   c3: "rgba(20,184,166,0.08)" },
  certifications: { c1: "rgba(99,102,241,0.18)",  c2: "rgba(139,92,246,0.12)",  c3: "rgba(99,102,241,0.08)" },
  contact:        { c1: "rgba(0,180,220,0.16)",   c2: "rgba(99,102,241,0.12)",  c3: "rgba(6,182,212,0.07)"  },
};

const SECTIONS = ["hero", "experience", "projects", "skills", "certifications", "contact"] as const;

export const CinematicBackground = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const THEMES = isDark ? DARK_THEMES : LIGHT_THEMES;

  const [theme, setTheme] = useState(THEMES.hero);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const mid = window.innerHeight * 0.45;
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) {
          setTheme(THEMES[id] ?? THEMES.hero);
          return;
        }
      }
      setTheme(THEMES.hero);
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false; });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [THEMES]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-colors duration-700"
      style={{ background: isDark ? "hsl(225,55%,4%)" : "hsl(210,30%,97%)" }}
    >
      {/* Blob 1 — top-left */}
      <div className="absolute top-[-15%] left-[-10%] w-[65%] h-[65%] animate-float-1 motion-reduce:animate-none">
        <div
          className="bg-blob w-full h-full rounded-full blur-[100px]"
          style={{ background: theme.c1, transition: "background 1.2s ease" }}
        />
      </div>

      {/* Blob 2 — bottom-right */}
      <div className="absolute bottom-[-20%] right-[-10%] w-[55%] h-[55%] animate-float-2 motion-reduce:animate-none">
        <div
          className="bg-blob w-full h-full rounded-full blur-[90px]"
          style={{ background: theme.c2, transition: "background 1.4s ease" }}
        />
      </div>

      {/* Blob 3 — center */}
      <div className="absolute top-[35%] left-[30%] w-[40%] h-[40%] animate-float-3 motion-reduce:animate-none">
        <div
          className="bg-blob w-full h-full rounded-full blur-[80px]"
          style={{ background: theme.c3, transition: "background 1.6s ease" }}
        />
      </div>
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(128,128,128,0.4) 59px,rgba(128,128,128,0.4) 60px)," +
            "repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(128,128,128,0.4) 59px,rgba(128,128,128,0.4) 60px)",
        }}
      />
    </div>
  );
};
