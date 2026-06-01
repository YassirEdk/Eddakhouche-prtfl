import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/30 py-10 overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[100px] rounded-full bg-primary/5 blur-[60px]" />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto px-4 flex flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-1 font-mono select-none">
          <span className="text-primary font-black text-base">&lt;</span>
          <span className="text-foreground font-bold text-sm tracking-widest uppercase">Eddakhouche</span>
          <span className="text-primary font-black text-base">/&gt;</span>
        </div>

        <div className="flex gap-5">
          <a href="mailto:yassireddakhouche@gmail.com" className="text-muted-foreground hover:text-primary transition-colors hover:shadow-[0_0_10px_hsl(var(--primary)/0.4)]">
            <Mail className="w-4 h-4" />
          </a>
          <a href="https://github.com/YassirEdk" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/yassir-eddakhouche/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground/50 uppercase tracking-[0.2em]">
          © 2026 EDDAKHOUCHE Yassir — Tous droits réservés
        </p>
      </div>
    </footer>
  );
};
