import { Mail, Phone, Linkedin, Github, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Cube3D } from "@/components/Cube3D";

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center px-4 sm:px-6 py-20 pt-24 overflow-hidden">

      {/* Floating background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 left-8 w-56 h-56 rounded-full bg-primary/10 blur-3xl animate-float-1" />
        <div className="absolute bottom-24 left-1/3 w-48 h-48 rounded-full bg-violet-500/10 blur-3xl animate-float-3" />
        <div className="absolute top-2/3 left-12 w-14 h-14 border border-primary/15 rotate-12 animate-float-1" style={{ animationDelay: "4s" }} />
        <div className="absolute top-1/4 left-1/4 w-5 h-5 bg-cyan-400/15 rounded rotate-12 animate-float-3" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container max-w-7xl relative z-10 w-full">
        <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-[358px]">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col items-center text-center gap-4 w-full max-w-xl">

            {/* Photo */}
            <div className="relative flex-shrink-0 mb-2">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl scale-110 animate-pulse" />
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full p-[3px] bg-gradient-to-br from-primary via-primary/60 to-primary/20 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="https://l.top4top.io/p_35787glj01.jpg"
                    alt="Yassir Eddakhouche"
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                </div>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-background border border-border rounded-full px-3 py-1 shadow-md whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-foreground">En poste</span>
              </div>
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-3 select-text"
              style={{ background: "linear-gradient(135deg, hsl(var(--foreground)) 40%, hsl(var(--primary)))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              EDDAKHOUCHE Yassir
            </h1>

            {/* Divider */}
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30" />

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-primary font-semibold">
              Ingénieur D'ETAT en Informatique & Réseau
            </p>

            {/* Description */}
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
              Spécialisé en développement full-stack, ERP Odoo et architecture réseau.
              Actuellement développeur Odoo chez <span className="text-foreground font-medium">MedAfrica Logistics</span>.
            </p>

            {/* Buttons + Cards in shared container so they share the same width */}
            <div className="w-full flex flex-col gap-3 mt-1 items-center">

              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="default" size="sm" asChild className="gap-2 whitespace-nowrap">
                  <a href="mailto:yassireddakhouche@gmail.com">
                    <Mail className="w-4 h-4" />Email
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="gap-2 whitespace-nowrap">
                  <a href="tel:+212682546896">
                    <Phone className="w-4 h-4" />+212 682-546896
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="gap-2 whitespace-nowrap">
                  <a href="https://www.linkedin.com/in/yassir-eddakhouche/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild className="gap-2 whitespace-nowrap">
                  <a href="https://github.com/YassirEdk" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />GitHub
                  </a>
                </Button>
                <Button variant="default" size="sm" asChild className="gap-2 whitespace-nowrap">
                  <a href="https://drive.usercontent.google.com/u/0/uc?id=1d2yXbGIH0BqWnObPQsqaTpsjhsvRJQLe&export=download" download>
                    <Download className="w-4 h-4" />Télécharger CV
                  </a>
                </Button>
              </div>

            {/* Info cards — same width as buttons row above */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 w-full text-left">
              <div className="border border-border rounded-xl p-4 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Localisation</h3>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="whitespace-nowrap">Casablanca, Maroc</span>
                </div>
              </div>
              <div className="border border-border rounded-xl p-4 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Formation</h3>
                <Badge variant="secondary" className="text-xs whitespace-nowrap">EMSI - MIAGE (2025)</Badge>
              </div>
              <div className="border border-border rounded-xl p-4 bg-card/80 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Langues</h3>
                <div className="flex flex-nowrap gap-1.5">
                  <Badge variant="outline" className="text-xs whitespace-nowrap">Arabe</Badge>
                  <Badge variant="outline" className="text-xs whitespace-nowrap">Français</Badge>
                  <Badge variant="outline" className="text-xs whitespace-nowrap">Anglais</Badge>
                </div>
              </div>
            </div>
            </div>{/* end shared wrapper */}
          </div>

          {/* ── RIGHT COLUMN: 3D Cube (xl only) ── */}
          <Cube3D />
        </div>
      </div>
    </section>
  );
};
