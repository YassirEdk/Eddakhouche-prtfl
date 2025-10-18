export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-muted-foreground break-words">
            © 2025 EDDAKHOUCHE Yassir. Tous droits réservés.
          </p>
          <p className="text-sm text-muted-foreground break-words">
            Ce site est programmé avec React 18
          </p>
        </div>
      </div>
    </footer>
  );
};
