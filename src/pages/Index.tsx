import { Navbar } from "@/components/Navbar";
import { Cursor } from "@/components/Cursor";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/ExperienceCard";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Certifications } from "@/components/Certifications";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Cursor />
      <Navbar />
      <div id="hero"><Hero /></div>
      <div id="experience"><Experience /></div>
      <div id="projects"><Projects /></div>
      <div id="skills"><Skills /></div>
      <div id="certifications"><Certifications /></div>
      <div id="contact"><Contact /></div>
      <Footer />
    </div>
  );
};

export default Index;
