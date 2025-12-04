import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    company: "AKWA Group",
    role: "Stagiaire IT",
    type: "Stage",
    period: "Mars - Septembre 2025",
    description: (
      <div className="text-sm text-muted-foreground space-y-4">
        
        <p className="flex items-start">
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full mt-2 mr-3"></span>
          Réalisation d’un projet (Optifuel) pour Afriquia SMDC
        </p>

        <p className="flex items-start ml-6">
          <span className="inline-block w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
          Création d’un portail clients pour le passage des commandes
        </p>
        <p className="flex items-start ml-6">
          <span className="inline-block w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
          Génération de fichiers JSON pour les commandes et affichage dans Odoo
        </p>
        <p className="flex items-start ml-6">
          <span className="inline-block w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
          Automatisation des affectations de commandes aux camions selon les contraintes métiers
        </p>
        <p className="flex items-start ml-6">
          <span className="inline-block w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
          Mise en place d’une gestion logistique centralisée
        </p>
        <p className="flex items-start ml-6">
          <span className="inline-block w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
          Calcul et optimisation des trajets via l’API GraphHopper
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
    description: (
      <div className="text-sm text-muted-foreground space-y-4">
        
        <p className="flex items-start">
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full mt-2 mr-3"></span>
          Mise en place d’une solution NAC avec PacketFence
        </p>

        <p className="flex items-start ml-6">
          <span className="inline-block w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
          Configuration des switchs.
        </p>
        <p className="flex items-start ml-6">
          <span className="inline-block w-1 h-1 bg-black rounded-full mt-2 mr-3"></span>
          Développer authentification centralisée.
        </p>
      </div>
    ),
    technologies: ["Packetfence"]
  },
];

export const Experience = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Expériences Professionnelles
        </h2>

        {/* Stacked cards */}
        <div className="flex flex-col gap-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-border/50 w-full">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">
                  {exp.role} - {exp.company} | {exp.period}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">
                  {exp.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 mt-2">
                {exp.technologies.map((tech, i) => (
                  <Badge key={i} variant="secondary" className="text-sm transition-all duration-300 hover:text-primary hover:[text-shadow:0_0_15px_rgba(59,130,246,1)] cursor-pointer border-0">
                    {tech}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
