import { Suspense, lazy } from "react";
import { Navbar }             from "@/components/Navbar";
import { Cursor }             from "@/components/Cursor";
import { Hero }               from "@/components/Hero";
import { CinematicBackground } from "@/components/CinematicBackground";
import { ScrollProgress }     from "@/components/ScrollProgress";

const Experience     = lazy(() => import("@/components/ExperienceCard").then(m => ({ default: m.Experience })));
const Projects       = lazy(() => import("@/components/Projects").then(m => ({ default: m.Projects })));
const Skills         = lazy(() => import("@/components/Skills").then(m => ({ default: m.Skills })));
const Certifications = lazy(() => import("@/components/Certifications").then(m => ({ default: m.Certifications })));
const Contact        = lazy(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const Footer         = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

const SectionFallback = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
  </div>
);

const Index = () => (
  <div className="min-h-screen">
    <CinematicBackground />
    <ScrollProgress />
    <Cursor />
    <Navbar />
    <div id="hero"><Hero /></div>
    <Suspense fallback={<SectionFallback />}>
      <div id="experience"><Experience /></div>
    </Suspense>
    <Suspense fallback={<SectionFallback />}>
      <div id="projects"><Projects /></div>
    </Suspense>
    <Suspense fallback={<SectionFallback />}>
      <div id="skills"><Skills /></div>
    </Suspense>
    <Suspense fallback={<SectionFallback />}>
      <div id="certifications"><Certifications /></div>
    </Suspense>
    <Suspense fallback={<SectionFallback />}>
      <div id="contact"><Contact /></div>
    </Suspense>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </div>
);

export default Index;
