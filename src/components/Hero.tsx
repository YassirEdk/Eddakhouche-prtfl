import { Mail, Phone, Linkedin, Github, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cube3D } from "@/components/Cube3D";
import { useEffect, useRef, useState } from "react";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const useCounter = (target: number, duration = 1800) => {
  const [count, setCount] = useState(0);
  const ref     = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick  = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setCount(Math.floor(easeOut(p) * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
};

const stats = [
  { target: 1,  suffix: "+", label: "An d'expérience"  },
  { target: 10, suffix: "+", label: "Projets réalisés"  },
  { target: 3,  suffix: "",  label: "Entreprises"       },
];

const StatCard = ({ stat }: { stat: typeof stats[0] }) => {
  const { count, ref } = useCounter(stat.target);
  return (
    <div ref={ref} className="flex flex-col items-center gap-0.5">
      <span className="text-2xl sm:text-3xl font-black text-primary tabular-nums leading-none">
        {count}{stat.suffix}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap">
        {stat.label}
      </span>
    </div>
  );
};

export const Hero = () => {
  const [burst, setBurst] = useState(0);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 pt-24">
      {/* Decorative edge lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
        <div className="absolute right-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      </div>

      <div className="container max-w-7xl relative z-10 w-full">
        <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-[80px] 2xl:gap-[220px]">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col items-center text-center gap-5 w-full max-w-xl">

            {/* Eyebrow */}
            <span className="section-eyebrow">Portfolio — Ingénieur Full Stack</span>

            {/* Name */}
            <div className="space-y-1">
              <h1 data-cursor="text" className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-cinema-gradient select-text">
                EDDAKHOUCHE
              </h1>
              <h1 data-cursor="text" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-foreground/80 select-text">
                Yassir
              </h1>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 w-full justify-center">
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-primary/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-primary/50" />
            </div>

            {/* Photo */}
            <div className="relative flex-shrink-0" onClick={() => setBurst(c => c + 1)}>
              {/* Burst rings — key forces remount on each click */}
              <div key={burst} className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 rounded-full border-2 border-primary/60 animate-burst-ring" style={{ animationDelay: "0ms" }} />
                <div className="absolute inset-0 rounded-full border-2 border-primary/40 animate-burst-ring" style={{ animationDelay: "180ms" }} />
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-burst-ring" style={{ animationDelay: "360ms" }} />
              </div>

              <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-110 animate-glow-pulse" />
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full p-[2px] bg-gradient-to-br from-primary via-primary/40 to-accent/30 shadow-[0_0_50px_hsl(var(--primary)/0.25)]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="https://l.top4top.io/p_35787glj01.jpg"
                    alt="Yassir Eddakhouche"
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                </div>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-card/90 border border-border/60 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_#4ade80]" />
                <span className="text-xs font-semibold text-foreground">En poste</span>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Ingénieur D'ETAT — Informatique &amp; Réseau
            </p>

            {/* Animated stats */}
            <div className="flex items-center justify-center gap-4 sm:gap-10 w-full py-2">
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} />
              ))}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Spécialisé en développement full-stack, ERP Odoo et architecture réseau.
              Actuellement développeur Odoo chez{" "}
              <span className="text-foreground font-medium">MedAfrica Logistics</span>.
            </p>

            {/* Buttons + Cards */}
            <div className="w-full flex flex-col gap-3 mt-1 items-center">
              {/* Secondary links */}
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="outline" size="sm" asChild className="gap-2 whitespace-nowrap border-border/50 text-muted-foreground hover:bg-primary hover:border-primary hover:text-black dark:hover:text-white transition-all">
                  <a href="mailto:yassireddakhouche@gmail.com">
                    <Mail className="w-3.5 h-3.5" />Email
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="gap-2 whitespace-nowrap border-border/50 text-muted-foreground hover:bg-primary hover:border-primary hover:text-black dark:hover:text-white transition-all">
                  <a href="tel:+212682546896">
                    <Phone className="w-3.5 h-3.5" />+212 682-546896
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="gap-2 whitespace-nowrap border-border/50 text-muted-foreground hover:bg-primary hover:border-primary hover:text-black dark:hover:text-white transition-all">
                  <a href="https://www.linkedin.com/in/yassir-eddakhouche/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-3.5 h-3.5" />LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="gap-2 whitespace-nowrap border-border/50 text-muted-foreground hover:bg-primary hover:border-primary hover:text-black dark:hover:text-white transition-all">
                  <a href="https://github.com/YassirEdk" target="_blank" rel="noopener noreferrer">
                    <Github className="w-3.5 h-3.5" />GitHub
                  </a>
                </Button>
              </div>

              {/* Primary CTA */}
              <Button asChild data-cursor="download" className="gap-2 w-full max-w-xs bg-primary text-white hover:bg-primary/90 shadow-[0_0_25px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_35px_hsl(var(--primary)/0.6)] transition-all">
                <a href="https://drive.usercontent.google.com/u/0/uc?id=1d2yXbGIH0BqWnObPQsqaTpsjhsvRJQLe&export=download" download>
                  <Download className="w-4 h-4" />Télécharger mon CV
                </a>
              </Button>

              {/* Info cards */}
              <div className="flex flex-col sm:flex-row gap-2 w-full text-left">
                <div className="glass-card flex-1 rounded-xl p-3">
                  <h3 className="section-eyebrow mb-1.5">Localisation</h3>
                  <div className="flex items-center gap-1.5 text-sm text-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="whitespace-nowrap">Casablanca, Maroc</span>
                  </div>
                </div>
                <div className="glass-card flex-1 rounded-xl p-3">
                  <h3 className="section-eyebrow mb-1.5">Formation</h3>
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20 whitespace-nowrap">EMSI - MIAGE (2025)</Badge>
                </div>
                <div className="glass-card flex-1 rounded-xl p-3">
                  <h3 className="section-eyebrow mb-1.5">Langues</h3>
                  <div className="flex flex-nowrap gap-1.5">
                    <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground">Arabe</Badge>
                    <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground">Français</Badge>
                    <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground">Anglais</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3D Cube — below content on small screens, beside on xl ── */}
          <div
            className="flex-shrink-0 self-center scale-[0.65] sm:scale-[0.75] md:scale-[0.85] lg:scale-[0.9] xl:scale-100 -mt-[55px] -mb-[87px] sm:-mt-[30px] sm:-mb-[62px] md:-mt-[5px] md:-mb-[37px] lg:mt-[7px] lg:-mb-[25px] xl:my-0"
            style={{ transformOrigin: "center" }}
          >
            <Cube3D />
          </div>
        </div>
      </div>
    </section>
  );
};
