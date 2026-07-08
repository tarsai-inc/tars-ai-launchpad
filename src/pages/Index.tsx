import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Pedigree from "@/components/Pedigree";
import Constraint from "@/components/Constraint";
import System from "@/components/System";
import DepotViz from "@/components/DepotViz";
import Scale from "@/components/Scale";
import Company from "@/components/Company";
import Briefing from "@/components/Briefing";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 voice-label"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main">
      <Hero />
      <Pedigree />
      <Constraint />
      <System />
      <DepotViz />
      <Scale />
      <Company />
      <Briefing />
    </main>
    <Footer />
  </div>
);

export default Index;
