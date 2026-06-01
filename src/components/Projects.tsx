import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTilt } from "@/hooks/use-tilt";

const projects = [
  {
    title: "Gestion Restaurant",
    description: "Solution complète pour gérer les stocks, ventes et clients d'un restaurant, automatisant les processus pour optimiser la gestion.",
    technologies: ["Spring Boot", "React", "PostgreSQL"],
    icon: "🍽️", accent: "#f97316", glow: "rgba(249,115,22,0.12)", border: "hover:border-orange-500/40",
  },
  {
    title: "School Management",
    description: "Application permettant à une école de gérer, stocker, afficher et filtrer les informations des professeurs et des étudiants.",
    technologies: ["Spring Boot", "React", "PostgreSQL"],
    icon: "🏫", accent: "#3b82f6", glow: "rgba(59,130,246,0.12)", border: "hover:border-blue-500/40",
  },
  {
    title: "Application de facturation",
    description: "Gestion des factures et paiements avec suivi automatisé des transactions, génération dynamique de factures et tableaux de bord interactifs.",
    technologies: ["Spring Boot", "React", "PostgreSQL"],
    icon: "🧾", accent: "#22c55e", glow: "rgba(34,197,94,0.12)", border: "hover:border-green-500/40",
  },
  {
    title: "Little Lemon Food Order",
    description: "Application mobile pour la commande de nourriture avec interface utilisateur moderne et intuitive.",
    technologies: ["React Native", "PostgreSQL"],
    icon: "🍋", accent: "#eab308", glow: "rgba(234,179,8,0.12)", border: "hover:border-yellow-500/40",
  },
  {
    title: "E-Commerce Management",
    description: "Application web de vente en ligne basée sur Odoo, offrant une interface fluide pour la gestion des produits, commandes et paiements.",
    technologies: ["Odoo", "PostgreSQL"],
    icon: "🛒", accent: "#a855f7", glow: "rgba(168,85,247,0.12)", border: "hover:border-purple-500/40",
  },
  {
    title: "Rental Agency Management",
    description: "Application web de gestion de location de véhicules, permettant la réservation, le suivi des contrats et la facturation automatisée.",
    technologies: ["Odoo", "GraphHopperAPI", "PostgreSQL"],
    icon: "🚗", accent: "#ec4899", glow: "rgba(236,72,153,0.12)", border: "hover:border-pink-500/40",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const { ref: scrollRef, visible } = useScrollAnimation();
  const { ref: tiltRef, handleMouseMove, handleMouseLeave } = useTilt(8);

  return (
    <div
      ref={scrollRef}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${(index % 3) * 120}ms` }}
    >
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={(e) => { handleMouseLeave(e); (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${project.glow}`; }}
        className={`relative group h-full rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${project.border}`}
        style={{ transition: "transform 0.15s ease-out, box-shadow 0.3s ease-out, border-color 0.3s" }}
      >
        <div data-glare className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-[background] duration-100" />

        {/* Screenshot / preview area */}
        <div className="relative h-32 overflow-hidden rounded-t-2xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${project.accent}18, ${project.accent}06)` }}>
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: `linear-gradient(${project.accent} 1px, transparent 1px), linear-gradient(90deg, ${project.accent} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }} />
          <span className="text-6xl opacity-20 select-none">{project.icon}</span>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card/50 to-transparent" />
        </div>

        <div className="px-5 pt-4 pb-3">
          <div className="flex items-center justify-end mb-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded-full"
              style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}30` }}>
              Projet
            </span>
          </div>
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
        </div>

        <div className="h-px mx-5" style={{ background: `linear-gradient(to right,${project.accent}30,transparent)` }} />

        <div className="px-5 py-4 flex flex-col gap-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, i) => (
              <span key={i} className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                style={{ background: `${project.accent}12`, color: project.accent, border: `1px solid ${project.accent}28` }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => (
  <section className="relative py-24 sm:py-32 px-4 sm:px-6">
    <div className="container max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <span className="section-eyebrow block mb-3">03 — Projets</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cinema-gradient mb-4">Projets Académiques</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Une sélection de projets réalisés au cours de ma formation en informatique et réseaux.
        </p>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-5" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);
