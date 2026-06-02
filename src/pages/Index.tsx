import { Navbar }              from "@/components/Navbar";
import { Cursor }              from "@/components/Cursor";
import { Hero }                from "@/components/Hero";
import { CinematicBackground } from "@/components/CinematicBackground";
import { ScrollProgress }      from "@/components/ScrollProgress";
import { Experience }          from "@/components/ExperienceCard";
import { Projects }            from "@/components/Projects";
import { Skills }              from "@/components/Skills";
import { Certifications }      from "@/components/Certifications";
import { Contact }             from "@/components/Contact";
import { Footer }              from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <CinematicBackground />
    <ScrollProgress />
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

export default Index;
