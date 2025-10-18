import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Gestion Restaurant",
    description: "Solution complète pour gérer les stocks, ventes et clients d'un restaurant, automatisant les processus pour optimiser la gestion.",
    technologies: ["Spring Boot", "React", "PostgreSQL"]
  },
  {
    title: "School Management",
    description: "Application permettant à une école de gérer, stocker, afficher et filtrer les informations des professeurs et des étudiants.",
    technologies: ["Spring Boot", "React", "PostgreSQL"]
  },
  {
    title: "Little Lemon Food Order App",
    description: "Application web mobile pour la commande de nourriture avec interface utilisateur moderne et intuitive.",
    technologies: ["React Native", "PostgreSQL"]
  }
];

export const Projects = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Projets Académiques
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl break-words">{project.title}</CardTitle>
                <CardDescription className="break-words leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
