import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-10">
      <div className="container max-w-6xl mx-auto px-4 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-0.5 font-mono select-none">
          <span className="text-lg font-black text-primary">E</span>
          <span className="text-lg font-black text-primary">/</span>
          <span className="text-sm font-bold text-foreground tracking-tight">Eddakhouche</span>
          <span className="text-sm font-bold text-primary">.</span>
          <span className="text-sm font-bold text-muted-foreground tracking-tight">Portfolio</span>
        </div>
        <div className="flex gap-4">
          <a href="mailto:yassireddakhouche@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://github.com/YassirEdk" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/yassir-eddakhouche/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 EDDAKHOUCHE Yassir · Tous droits réservés
        </p>
      </div>
    </footer>
  );
};
