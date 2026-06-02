import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const CompanyLogo = ({ logo, initials, color, company }: { logo: string; initials: string; color: string; company: string }) => {
  const [error, setError] = useState(false);
  if (!error) {
    return (
      <img
        src={logo}
        alt={company}
        onError={() => setError(true)}
        className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl object-contain bg-white border border-white/20 p-2 flex-shrink-0 shadow-[0_0_12px_rgba(0,0,0,0.3)]"
        loading="lazy"
      />
    );
  }
  return (
    <div
      className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
      style={{ background: `${color}33`, border: `1px solid ${color}55` }}
    >
      {initials}
    </div>
  );
};

const experiences = [
  {
    company: "MedAfrica Logistics",
    role: "Développeur Odoo",
    type: "Stage",
    period: "Janvier 2026 — Aujourd'hui",
    current: true,
    logo: "/MEDAF-WWE-MOBLOG3.png",
    initials: "ML",
    logoColor: "#00d5ff",
    description: (
      <div className="text-sm text-muted-foreground space-y-2.5">
        <p className="flex items-start gap-3">
          <span className="inline-block w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0 shadow-[0_0_6px_hsl(var(--primary))]" />
          Conception et développement de deux solutions Odoo complètes pour deux clients distincts dans les domaines RH et e-commerce.
        </p>
        <p className="flex items-start gap-3 ml-2 sm:ml-4">
          <span className="inline-block w-1 h-1 bg-border rounded-full mt-2 flex-shrink-0" />
          Développement d'un système de gestion RH sur Odoo 18 (congés, présences, workflows de validation, synchronisation pointeuses) pour MedAfrica Logistics.
        </p>
        <p className="flex items-start gap-3 ml-2 sm:ml-4">
          <span className="inline-block w-1 h-1 bg-border rounded-full mt-2 flex-shrink-0" />
          Création d'une plateforme unifiée pour Outletna incluant un portail Helpdesk sécurisé et 5 modules métier.
        </p>
        <p className="flex items-start gap-3 ml-2 sm:ml-4">
          <span className="inline-block w-1 h-1 bg-border rounded-full mt-2 flex-shrink-0" />
          Synchronisation bidirectionnelle PrestaShop.
        </p>
      </div>
    ),
    technologies: ["Odoo 17/18", "Python", "QWeb", "XML", "JavaScript", "PrestaShop API", "PostgreSQL"],
  },
  {
    company: "AKWA Group",
    role: "Stagiaire IT",
    type: "Stage",
    period: "Mars — Septembre 2025",
    current: false,
    logo: "/download.jpg",
    initials: "AK",
    logoColor: "#f43f5e",
    description: (
      <div className="text-sm text-muted-foreground space-y-2.5">
        <p className="flex items-start gap-3">
          <span className="inline-block w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0 shadow-[0_0_6px_hsl(var(--primary))]" />
          Réalisation d'un projet (Optifuel) pour Afriquia SMDC
        </p>
        <p className="flex items-start gap-3 ml-2 sm:ml-4">
          <span className="inline-block w-1 h-1 bg-border rounded-full mt-2 flex-shrink-0" />
          Création d'un portail clients pour le passage des commandes
        </p>
        <p className="flex items-start gap-3 ml-2 sm:ml-4">
          <span className="inline-block w-1 h-1 bg-border rounded-full mt-2 flex-shrink-0" />
          Automatisation des affectations de commandes aux camions selon les contraintes métiers
        </p>
        <p className="flex items-start gap-3 ml-2 sm:ml-4">
          <span className="inline-block w-1 h-1 bg-border rounded-full mt-2 flex-shrink-0" />
          Calcul et optimisation des trajets via l'API GraphHopper
        </p>
      </div>
    ),
    technologies: ["Odoo17", "React", "PostgreSql", "Jira", "GraphHopperAPI"],
  },
  {
    company: "Afriquia Gaz Maroc",
    role: "Stagiaire",
    type: "Stage",
    period: "Août 2023",
    current: false,
    logo: "/afriquia_gaz_logo.jpg",
    initials: "AG",
    logoColor: "#22c55e",
    description: (
      <div className="text-sm text-muted-foreground space-y-2.5">
        <p className="flex items-start gap-3">
          <span className="inline-block w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0 shadow-[0_0_6px_hsl(var(--primary))]" />
          Mise en place d'une solution NAC avec PacketFence
        </p>
        <p className="flex items-start gap-3 ml-2 sm:ml-4">
          <span className="inline-block w-1 h-1 bg-border rounded-full mt-2 flex-shrink-0" />
          Configuration des switchs et authentification centralisée.
        </p>
      </div>
    ),
    technologies: ["Packetfence"],
  },
];

const ExperienceItem = ({ exp, index }: { exp: typeof experiences[0]; index: number }) => {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`relative flex gap-4 sm:gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div
          className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-6 ${
            exp.current
              ? "bg-primary border-primary shadow-[0_0_10px_hsl(var(--primary)/0.8)]"
              : "bg-background border-muted-foreground/40"
          }`}
        />
        {index < experiences.length - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-primary/30 to-border/20 mt-1" />
        )}
      </div>

      {/* Card */}
      <div
        className={`flex-1 mb-8 rounded-2xl border bg-card/50 backdrop-blur-sm p-3 sm:p-5 transition-all duration-300 ${
          exp.current
            ? "border-primary/30 hover:border-primary/60 hover:shadow-[0_0_30px_hsl(var(--primary)/0.1)]"
            : "border-border/40 hover:border-primary/20 hover:shadow-[0_0_20px_hsl(var(--primary)/0.06)]"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3">
            <CompanyLogo logo={exp.logo} initials={exp.initials} color={exp.logoColor} company={exp.company} />
            <div>
              <h3 className="font-bold text-foreground text-base">
                {exp.role}
                <span className="text-muted-foreground font-normal"> · {exp.company}</span>
              </h3>
              <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{exp.period}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {exp.current && (
              <span className="flex items-center gap-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-2.5 py-0.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Actuel
              </span>
            )}
            <Badge
              variant={exp.type === "Emploi" ? "default" : "secondary"}
              className={`text-xs ${exp.type === "Emploi" ? "bg-primary/15 text-primary border-primary/30" : "bg-secondary/80 border-border/50"}`}
            >
              {exp.type}
            </Badge>
          </div>
        </div>
        <div className="mb-4">{exp.description}</div>
        <div className="flex flex-wrap gap-1.5">
          {exp.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-0.5 rounded-full bg-primary/8 text-primary/80 border border-primary/15 hover:border-primary/40 hover:text-primary transition-all"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Experience = () => (
  <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
    <div className="container max-w-4xl mx-auto">
      <div className="text-center mb-14">
        <span className="section-eyebrow block mb-3">02 — Expériences</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cinema-gradient mb-4">Parcours Professionnel</h2>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
      </div>
      <div>
        {experiences.map((exp, index) => (
          <ExperienceItem key={exp.company} exp={exp} index={index} />
        ))}
      </div>
    </div>
  </section>
);
