import ThreeBackground from "@/components/ThreeBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import generatedImage from '@assets/generated_images/dark_futuristic_hexagonal_grid_texture.png';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/30">
      {/* Background Layer */}
      <div 
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${generatedImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* 3D Background Layer */}
      <ThreeBackground />
      
      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        
        <footer className="py-8 text-center border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <p className="text-gray-500 font-rajdhani text-sm">
            © 2024 Manya Yadav. Built with React, Tailwind & Three.js.
          </p>
        </footer>
      </div>
    </div>
  );
}
