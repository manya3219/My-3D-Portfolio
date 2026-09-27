import HeroBackground from "@/components/HeroBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import AnimatedCursor from "@/components/AnimatedCursor";
import Spotlight from "@/components/Spotlight";
import generatedImage from "@assets/generated_images/dark_futuristic_hexagonal_grid_texture.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/30">
      {/* Custom cursor — desktop only, renders nothing on touch */}
      <AnimatedCursor />

      {/* Global spotlight following cursor */}
      <Spotlight />

      {/* Hexagonal texture overlay */}
      <div
        className="fixed inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `url(${generatedImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Interactive canvas background */}
      <HeroBackground />

      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <footer className="py-8 text-center border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <p className="text-gray-500 font-rajdhani text-sm">© 2025 Manya Yadav.</p>
        </footer>
      </div>
    </div>
  );
}
