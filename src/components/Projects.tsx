import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useTilt } from "@/hooks/use-tilt";
import type { IconType } from "react-icons";
import { SiReact, SiSupabase, SiSharp, SiJavascript, SiVite } from "react-icons/si";

// Official technology icons + brand colors
const techIcons: Record<string, { Icon: IconType; color: string }> = {
  React: { Icon: SiReact, color: "#61DAFB" },
  Supabase: { Icon: SiSupabase, color: "#3ECF8E" },
  Sharp: { Icon: SiSharp, color: "#99CC00" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  Vite: { Icon: SiVite, color: "#646CFF" },
};

const personalProjects = [
  {
    title: "Yassir Cars",
    description: "Plateforme de location de voitures où les clients peuvent effectuer leurs réservations en ligne, tout en offrant une gestion claire et organisée pour l'agence (véhicules, réservations et suivi des clients).",
    technologies: ["React", "Supabase", "Sharp", "JavaScript", "Vite"],
    link: "https://yassir-cars.vercel.app/",
    image: "/yassir-cars.webp",
    icon: "🚙", accent: "#06b6d4", glow: "rgba(6,182,212,0.25)", border: "hover:border-cyan-500/40", featured: true,
  },
];

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

type Project = (typeof projects)[number] & { link?: string; image?: string; featured?: boolean };

const PERSONAL: Project[] = personalProjects;

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const { ref: scrollRef, visible } = useScrollAnimation();
  const { ref: tiltRef, handleMouseMove, handleMouseLeave } = useTilt(8);

  return (
    <div
      ref={scrollRef}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${(index % 3) * 120}ms` }}
    >
      <div
        ref={project.featured ? undefined : tiltRef}
        onMouseMove={project.featured ? undefined : handleMouseMove}
        onMouseLeave={(e) => { if (!project.featured) handleMouseLeave(e); (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 40px ${project.glow}`; }}
        className={`relative group h-full rounded-2xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300 ${project.featured ? "featured-card" : "hover:-translate-y-1.5"} ${project.border}`}
        style={project.featured ? undefined : { transition: "transform 0.15s ease-out, box-shadow 0.3s ease-out, border-color 0.3s" }}
      >
        <div data-glare className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-[background] duration-100" />

        {/* Screenshot / preview area */}
        <div className="relative h-32 overflow-hidden rounded-t-2xl flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${project.accent}18, ${project.accent}06)` }}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <>
              <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: `linear-gradient(${project.accent} 1px, transparent 1px), linear-gradient(90deg, ${project.accent} 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }} />
              <span className="text-6xl opacity-20 select-none">{project.icon}</span>
            </>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card/50 to-transparent" />
          {project.featured && <div className="featured-shine" />}
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
            {project.technologies.map((tech) => {
              const ti = project.featured ? techIcons[tech] : undefined;
              return (
                <span key={tech} className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full"
                  style={{ background: `${project.accent}12`, color: project.accent, border: `1px solid ${project.accent}28` }}>
                  {ti && <ti.Icon size={13} style={{ color: ti.color }} />}
                  {tech}
                </span>
              );
            })}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="demo-btn group/demo relative overflow-hidden inline-flex items-center justify-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full self-start"
              style={{ background: `${project.accent}18`, color: project.accent, border: `1px solid ${project.accent}40` }}
            >
              <span className="demo-shine" aria-hidden="true" />
              Voir la démo
              <svg className="transition-transform duration-300 ease-out group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const Projects = () => (
  <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
    <div className="container max-w-6xl mx-auto">
      {/* Projets Personnels */}
      <div className="text-center mb-14">
        <span className="section-eyebrow block mb-3">03 — Projets</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cinema-gradient mb-4">Projets Professionnels</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Des projets que je développe par passion, du concept à la mise en ligne.
        </p>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-5" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PERSONAL.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      {/* Projets Académiques */}
      <div className="text-center mb-14 mt-24">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cinema-gradient mb-4">Projets Académiques</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Une sélection de projets réalisés au cours de ma formation en informatique et réseaux.
        </p>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-5" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);
