import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Certifications } from "@/components/Certifications";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Projects />
      <Skills />
      <Certifications />
      <Footer />
    </div>
  );
};

export default Index;
