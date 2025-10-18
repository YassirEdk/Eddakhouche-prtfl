import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Langages",
    skills: ["Java", "Python", "C/C++", "JavaScript"]
  },
  {
    title: "Frameworks",
    skills: ["Spring Boot", "React", "Angular", "Django"]
  },
  {
    title: "Bases de Données",
    skills: ["PostgreSQL", "SQL Server", "Oracle"]
  },
  {
    title: "Outils & Méthodologies",
    skills: ["Linux", "Windows Server", "UML", "Merise"]
  }
];

export const Skills = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Compétences Techniques
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(59,130,246,1)] cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg text-primary">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-sm transition-all duration-300 hover:text-primary hover:[text-shadow:0_0_15px_rgba(59,130,246,1)] cursor-pointer border-0">
                      {skill}
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