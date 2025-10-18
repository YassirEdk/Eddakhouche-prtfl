import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const certifications = [
  {
    title: "Building Scalable Java Microservices",
    issuer: "Google Cloud Training",
    link: "https://coursera.org/share/1bcf6e81d760f670609b6637312ccd35"
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
    title: "Python for Everybody",
    issuer: "University of Michigan",
    link: "https://coursera.org/share/f475f11918cde2681d2b3b81290d6f9a"
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
