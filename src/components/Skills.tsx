import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const skillCategories = [
  { title: "Langages",               icon: "⌨️", skills: ["Java", "Python", "C/C++", "JavaScript"] },
  { title: "Frameworks & ERP",       icon: "🧩", skills: ["Spring Boot", "React", "Angular", "Django", "Odoo 17/18"] },
  { title: "Bases de Données",       icon: "🗄️", skills: ["PostgreSQL", "SQL Server", "Oracle"] },
  { title: "Outils & Méthodologies", icon: "🛠️", skills: ["Linux", "Windows Server", "UML", "Merise", "Jira", "Git"] },
];

const SkillCard = ({ category, index }: { category: typeof skillCategories[0]; index: number }) => {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`glass-card rounded-2xl p-6 transition-all duration-700 cursor-default ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <Badge
            key={skill}
            variant="secondary"
            className="text-xs bg-secondary/80 text-foreground/80 border border-border/50 hover:border-primary/50 hover:text-primary hover:[text-shadow:0_0_12px_hsl(var(--primary)/0.8)] transition-all cursor-pointer"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export const Skills = () => (
  <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
    <div className="container max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <span className="section-eyebrow block mb-3">04 — Compétences</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cinema-gradient mb-4">Stack Technique</h2>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {skillCategories.map((category, index) => (
          <SkillCard key={category.title} category={category} index={index} />
        ))}
      </div>
    </div>
  </section>
);
