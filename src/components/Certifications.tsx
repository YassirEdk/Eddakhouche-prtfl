import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export const Certifications = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Certifications
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg break-words">{cert.title}</CardTitle>
                <CardDescription className="break-words">{cert.issuer}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild className="gap-2">
                  <a href={cert.link} target="_blank" rel="noopener noreferrer">
                    Voir la certification
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
