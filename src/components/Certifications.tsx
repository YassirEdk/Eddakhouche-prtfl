import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const certifications = [
  {
    title: "Python for Everybody",
    issuer: "University of Michigan",
    link: "https://coursera.org/share/f475f11918cde2681d2b3b81290d6f9a"
  },
  {
    title: "Meta React Native",
    issuer: "Meta",
    link: "https://coursera.org/share/0f5997c356a5d1578575cad757c3cf26"
  },
  {
    title: "Advanced React",
    issuer: "Meta",
    link: "https://coursera.org/share/87aa69cf732807a114f97a6bc71f45c9"
  },
  {
    title: "Honoris 21st Century Soft Skills Certificate",
    issuer: "Honoris Online Academy",
    link: "https://certificate.bcdiploma.com/check/A655474D765B7BC3C81EB3F428E439F629E975D8A71FBD154C2A90E74243C2A3WS9ZQVppeXUvV2FvdVgzR3FocGY0dDMrRGptdm9uK3h0MUhtWUhYT2lxTmVSYXlU"
  }
];

const CertCard = ({ cert, index }: { cert: typeof certifications[0]; index: number }) => {
  const { ref, visible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`group rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-700 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="mb-4">
        <h3 className="font-semibold text-foreground text-base group-hover:text-primary transition-colors mb-1">
          {cert.title}
        </h3>
        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
      </div>
      <Button variant="outline" size="sm" asChild className="gap-2 text-xs">
        <a href={cert.link} target="_blank" rel="noopener noreferrer">
          Voir la certification
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </Button>
    </div>
  );
};

export const Certifications = () => {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-background">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-16 text-foreground">
          Certifications
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <CertCard key={index} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
