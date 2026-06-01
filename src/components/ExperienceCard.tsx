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
        className="w-16 h-16 rounded-xl object-contain bg-white border border-border p-2 flex-shrink-0 shadow-sm"
      />
    );
  }
  return (
    <div
      className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm"
      style={{ background: color }}
    >
      {initials}
    </div>
  );
};

const experiences = [
  {
    company: "MedAfrica Logistics & Outletna",
    role: "Développeur Odoo",
    type: "Emploi",
    period: "Janvier 2026 - Aujourd'hui",
    current: true,
    logo: "/MEDAF-WWE-MOBLOG3.png",
    initials: "ML",
    logoColor: "#3b82f6",
    description: (
      <div className="text-sm text-muted-foreground space-y-3">
        <p className="flex items-start gap-3">
          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
          Conception et développement de deux solutions Odoo complètes pour deux clients distincts dans les domaines RH et e-commerce.
        </p>
        <p className="flex items-start gap-3 ml-4">
          <span className="inline-block w-1.5 h-1.5 bg-border rounded-full mt-2 flex-shrink-0" />
          Développement d'un système de gestion RH sur Odoo 18 (congés, présences, workflows de validation, synchronisation pointeuses) pour MedAfrica Logistics.
        </p>
        <p className="flex items-start gap-3 ml-4">
          <span className="inline-block w-1.5 h-1.5 bg-border rounded-full mt-2 flex-shrink-0" />
          Création d'une plateforme unifiée pour Outletna incluant un portail Helpdesk sécurisé et 5 modules métier (articles, prix, factures, transferts de stock).
        </p>
        <p className="flex items-start gap-3 ml-4">
          <span className="inline-block w-1.5 h-1.5 bg-border rounded-full mt-2 flex-shrink-0" />
          Synchronisation bidirectionnelle PrestaShop.
        </p>
      </div>
    ),
    technologies: ["Odoo 17/18", "Python", "QWeb", "XML", "JavaScript", "PrestaShop API", "PostgreSQL"]
  },
  {
    company: "AKWA Group",
    role: "Stagiaire IT",
    type: "Stage",
    period: "Mars - Septembre 2025",
    current: false,
    logo: "/download.jpg",
    initials: "AK",
    logoColor: "#ef4444",
    description: (
      <div className="text-sm text-muted-foreground space-y-3">
        <p className="flex items-start gap-3">
          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
          Réalisation d'un projet (Optifuel) pour Afriquia SMDC
        </p>
        <p className="flex items-start gap-3 ml-4">
          <span className="inline-block w-1.5 h-1.5 bg-border rounded-full mt-2 flex-shrink-0" />
          Création d'un portail clients pour le passage des commandes
        </p>
        <p className="flex items-start gap-3 ml-4">
          <span className="inline-block w-1.5 h-1.5 bg-border rounded-full mt-2 flex-shrink-0" />
          Génération de fichiers JSON pour les commandes et affichage dans Odoo
        </p>
        <p className="flex items-start gap-3 ml-4">
          <span className="inline-block w-1.5 h-1.5 bg-border rounded-full mt-2 flex-shrink-0" />
          Automatisation des affectations de commandes aux camions selon les contraintes métiers
        </p>
        <p className="flex items-start gap-3 ml-4">
          <span className="inline-block w-1.5 h-1.5 bg-border rounded-full mt-2 flex-shrink-0" />
          Mise en place d'une gestion logistique centralisée
        </p>
        <p className="flex items-start gap-3 ml-4">
          <span className="inline-block w-1.5 h-1.5 bg-border rounded-full mt-2 flex-shrink-0" />
          Calcul et optimisation des trajets via l'API GraphHopper
        </p>
      </div>
    ),
    technologies: ["Odoo17", "React", "PostgreSql", "Jira", "GraphHopperAPI"]
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
      <div className="text-sm text-muted-foreground space-y-3">
        <p className="flex items-start gap-3">
          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
          Mise en place d'une solution NAC avec PacketFence
        </p>
        <p className="flex items-start gap-3 ml-4">
          <span className="inline-block w-1.5 h-1.5 bg-border rounded-full mt-2 flex-shrink-0" />
          Configuration des switchs.
        </p>
        <p className="flex items-start gap-3 ml-4">
          <span className="inline-block w-1.5 h-1.5 bg-border rounded-full mt-2 flex-shrink-0" />
          Développer authentification centralisée.
        </p>
      </div>
    ),
    technologies: ["Packetfence"]
  },
];

const ExperienceItem = ({ exp, index }: { exp: typeof experiences[0]; index: number }) => {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`relative flex gap-3 sm:gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Timeline line + dot */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-[26px] ${exp.current ? "bg-primary border-primary" : "bg-background border-muted-foreground"}`} />
        {index < experiences.length - 1 && (
          <div className="w-px flex-1 bg-border mt-1" />
        )}
      </div>

      {/* Card */}
      <div
        className={`flex-1 mb-8 rounded-xl border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md ${
          exp.current
            ? "border-primary/50 hover:border-primary hover:shadow-primary/10"
            : "border-border hover:border-primary/30"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div className="flex items-start gap-3">
            <CompanyLogo logo={exp.logo} initials={exp.initials} color={exp.logoColor} company={exp.company} />
            <div>
              <h3 className="font-semibold text-foreground text-base">
                {exp.role}
                <span className="text-muted-foreground font-normal"> · {exp.company}</span>
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">{exp.period}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {exp.current && (
              <span className="flex items-center gap-1 text-xs bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-full px-2.5 py-0.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Actuel
              </span>
            )}
            <Badge variant={exp.type === "Emploi" ? "default" : "secondary"} className="text-xs">
              {exp.type}
            </Badge>
          </div>
        </div>

        <div className="mb-4">{exp.description}</div>

        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="text-xs transition-all duration-300 hover:text-primary hover:[text-shadow:0_0_15px_rgba(59,130,246,1)] cursor-pointer border-0"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Experience = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-secondary/30">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-16 text-foreground">
          Expériences Professionnelles
        </h2>
        <div>
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
