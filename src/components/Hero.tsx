import { Mail, Phone, Linkedin, Github, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center px-4 py-12">
      <div className="container max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-primary shadow-2xl">
              <img 
                src="https://l.top4top.io/p_35787glj01.jpg" 
                alt="Yassir Eddakhouche"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 break-words overflow-hidden">
                <span className="inline-block w-0 overflow-hidden opacity-0 animate-[typing_3s_steps(18)_1s_1_normal_both,blink_0.75s_step-end_infinite] border-r-4 border-transparent pr-1 whitespace-nowrap">
                  EDDAKHOUCHE Yassir
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-primary font-semibold mb-4 break-words">
                Ingénieur D'ETAT en Informatique & Réseau
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed break-words max-w-2xl mx-auto lg:mx-0">
                Spécialisé en développement full-stack et architecture réseau avec une expertise en Spring Boot, React, et solutions NAC
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Button variant="default" size="sm" asChild className="gap-2">
                <a href="mailto:yassireddakhouche@gmail.com">
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="gap-2">
                <a href="tel:+212682546896">
                  <Phone className="w-4 h-4" />
                  +212 682-546896
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="gap-2">
                <a href="https://www.linkedin.com/in/yassir-eddakhouche/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className="gap-2">
                <a href="https://github.com/YassirEdk" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="default" size="sm" asChild className="gap-2">
                <a
                  href="https://drive.usercontent.google.com/u/0/uc?id=11fCNO9_awwCCOfBQTacMqorIhIp2oeCm&export=download"
                  download
                  className="flex items-center gap-1.5 sm:gap-2 bg-accent text-accent-foreground px-3 py-2 rounded-lg hover:bg-accent/90 transition-all shadow-[var(--shadow-medium)] text-xs xs:text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <Download className="w-4 h-4" />
                  Télécharger CV
                </a>
              </Button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* Localisation */}
              <div className="border border-border rounded-lg p-4 bg-card space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Localisation</h3>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="break-words">Casablanca, Maroc</span>
                </div>
              </div>

              {/* Formation */}

              <div className="border border-border rounded-lg p-4 bg-card space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Formation</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary" className="break-words">EMSI - MIAGE (2025)</Badge>
                </div>
              </div>
              {/* Langues */}
              <div className="border border-border rounded-lg p-4 bg-card space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Langues</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline">Arabe</Badge>
                  <Badge variant="outline">Français</Badge>
                  <Badge variant="outline">Anglais</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
