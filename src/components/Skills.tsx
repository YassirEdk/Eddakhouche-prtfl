import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const skillCategories = [
  {
    title: "Langages",
    icon: "⌨️",
    skills: ["Java", "Python", "C/C++", "JavaScript"]
  },
  {
    title: "Frameworks & ERP",
    icon: "🧩",
    skills: ["Spring Boot", "React", "Angular", "Django", "Odoo 17/18"]
  },
  {
    title: "Bases de Données",
    icon: "🗄️",
    skills: ["PostgreSQL", "SQL Server", "Oracle"]
  },
  {
    title: "Outils & Méthodologies",
    icon: "🛠️",
    skills: ["Linux", "Windows Server", "UML", "Merise", "Jira", "Git"]
  }
];

const SkillCard = ({ category, index }: { category: typeof skillCategories[0]; index: number }) => {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`rounded-xl border border-border bg-card p-6 transition-all duration-700 hover:border-primary hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] cursor-default ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="text-base font-semibold text-primary">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="text-sm transition-all duration-300 hover:text-primary hover:[text-shadow:0_0_15px_rgba(59,130,246,1)] cursor-pointer border-0"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export const Skills = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-secondary/30">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-16 text-foreground">
          Compétences Techniques
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={index} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
