import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTilt } from "@/hooks/use-tilt";

const projects = [
  {
    title: "Gestion Restaurant",
    description: "Solution complète pour gérer les stocks, ventes et clients d'un restaurant, automatisant les processus pour optimiser la gestion.",
    technologies: ["Spring Boot", "React", "PostgreSQL"],
    icon: "🍽️",
    gradient: "from-orange-500/20 via-red-500/10 to-transparent",
    accent: "#f97316",
    border: "hover:border-orange-400/60",
    shadow: "hover:shadow-orange-500/10",
  },
  {
    title: "School Management",
    description: "Application permettant à une école de gérer, stocker, afficher et filtrer les informations des professeurs et des étudiants.",
    technologies: ["Spring Boot", "React", "PostgreSQL"],
    icon: "🏫",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    accent: "#3b82f6",
    border: "hover:border-blue-400/60",
    shadow: "hover:shadow-blue-500/10",
  },
  {
    title: "Application de facturation",
    description: "Gestion des factures et paiements avec suivi automatisé des transactions, génération dynamique de factures et tableaux de bord interactifs.",
    technologies: ["Spring Boot", "React", "PostgreSQL"],
    icon: "🧾",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    accent: "#22c55e",
    border: "hover:border-green-400/60",
    shadow: "hover:shadow-green-500/10",
  },
  {
    title: "Little Lemon Food Order",
    description: "Application mobile pour la commande de nourriture avec interface utilisateur moderne et intuitive.",
    technologies: ["React Native", "PostgreSQL"],
    icon: "🍋",
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    accent: "#eab308",
    border: "hover:border-yellow-400/60",
    shadow: "hover:shadow-yellow-500/10",
  },
  {
    title: "E-Commerce Management",
    description: "Application web de vente en ligne basée sur Odoo, offrant une interface fluide pour la gestion des produits, commandes et paiements.",
    technologies: ["Odoo", "PostgreSQL"],
    icon: "🛒",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    accent: "#a855f7",
    border: "hover:border-purple-400/60",
    shadow: "hover:shadow-purple-500/10",
  },
  {
    title: "Rental Agency Management",
    description: "Application web de gestion de location de véhicules, permettant la réservation, le suivi des contrats et la facturation automatisée.",
    technologies: ["Odoo", "GraphHopperAPI", "PostgreSQL"],
    icon: "🚗",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    accent: "#ec4899",
    border: "hover:border-pink-400/60",
    shadow: "hover:shadow-pink-500/10",
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
        onMouseLeave={handleMouseLeave}
        className={`relative group h-full rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${project.border} ${project.shadow}`}
        style={{ transition: "transform 0.15s ease-out, box-shadow 0.3s ease-out" }}
      >
        {/* Glare overlay */}
        <div data-glare className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-[background] duration-100" />

        {/* Gradient header */}
        <div className={`bg-gradient-to-br ${project.gradient} px-5 pt-5 pb-4`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">{project.icon}</span>
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: `${project.accent}20`, color: project.accent, border: `1px solid ${project.accent}40` }}
            >
              Projet
            </span>
          </div>
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
            {project.title}
          </h3>
        </div>

        {/* Divider */}
        <div className="h-px mx-5" style={{ background: `linear-gradient(to right, ${project.accent}40, transparent)` }} />

        {/* Content */}
        <div className="px-5 py-4 flex flex-col gap-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                style={{
                  background: `${project.accent}15`,
                  color: project.accent,
                  border: `1px solid ${project.accent}30`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-background">
      <div className="container max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
            Projets Académiques
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Une sélection de projets réalisés au cours de ma formation en informatique et réseaux.
          </p>
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-primary to-primary/30 mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
