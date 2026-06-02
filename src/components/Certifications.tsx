import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const certifications = [
  { title: "Python for Everybody",                       issuer: "University of Michigan",    link: "https://coursera.org/share/f475f11918cde2681d2b3b81290d6f9a" },
  { title: "Meta React Native",                          issuer: "Meta",                       link: "https://coursera.org/share/0f5997c356a5d1578575cad757c3cf26" },
  { title: "Advanced React",                             issuer: "Meta",                       link: "https://coursera.org/share/87aa69cf732807a114f97a6bc71f45c9" },
  { title: "Honoris 21st Century Soft Skills Certificate", issuer: "Honoris Online Academy",  link: "https://certificate.bcdiploma.com/check/A655474D765B7BC3C81EB3F428E439F629E975D8A71FBD154C2A90E74243C2A3WS9ZQVppeXUvV2FvdVgzR3FocGY0dDMrRGptdm9uK3h0MUhtWUhYT2lxTmVSYXlU" },
];

const CertCard = ({ cert, index }: { cert: typeof certifications[0]; index: number }) => {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`group glass-card rounded-2xl p-5 transition-all duration-700 hover:-translate-y-0.5 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-4">
        <h3 className="font-bold text-foreground text-base group-hover:text-primary transition-colors mb-1">{cert.title}</h3>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{cert.issuer}</p>
      </div>
      <Button variant="outline" size="sm" asChild className="gap-2 text-xs border-border/50 text-muted-foreground hover:bg-primary hover:border-primary hover:text-black dark:hover:text-white transition-all">
        <a href={cert.link} target="_blank" rel="noopener noreferrer">
          Voir la certification <ExternalLink className="w-3 h-3" />
        </a>
      </Button>
    </div>
  );
};

export const Certifications = () => (
  <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
    <div className="container max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <span className="section-eyebrow block mb-3">05 — Certifications</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-cinema-gradient mb-4">Certifications</h2>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {certifications.map((cert, index) => (
          <CertCard key={index} cert={cert} index={index} />
        ))}
      </div>
    </div>
  </section>
);
