import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, TorusKnot } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Download, ChevronRight } from "lucide-react";
import { ThreeErrorBoundary } from "./ThreeErrorBoundary";

function HeroScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} color="#00f3ff" />
      <directionalLight position={[-2, -5, -2]} intensity={1} color="#bc13fe" />
      
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <TorusKnot args={[1, 0.3, 128, 16]} position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <meshStandardMaterial
            color="#000000"
            emissive="#00f3ff"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={1}
            wireframe
          />
        </TorusKnot>
      </Float>
      
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <Sphere args={[0.5, 32, 32]} position={[2, 1, -1]}>
          <MeshDistortMaterial
            color="#bc13fe"
            speed={2}
            distort={0.4}
            radius={1}
          />
        </Sphere>
      </Float>
    </Canvas>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10"
        >
          <div className="inline-block px-4 py-1 mb-4 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm">
            <span className="text-primary font-rajdhani font-semibold tracking-wider text-sm uppercase">
              Available for work
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-orbitron leading-tight">
            <span className="text-white">Manya</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">Yadav</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-gray-400 font-rajdhani mb-6">
            Software Engineer & Full-Stack Developer
          </h2>
          
          <div className="h-16 mb-8">
             <motion.p 
               className="text-lg md:text-xl text-primary font-mono border-r-2 border-primary pr-2 inline-block overflow-hidden whitespace-nowrap"
               initial={{ width: 0 }}
               animate={{ width: "100%" }}
               transition={{ duration: 3, ease: "linear" }}
             >
               Building fast, scalable, and immersive digital experiences.
             </motion.p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary text-black hover:bg-primary/80 font-orbitron font-bold border-none" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}>
              Hire Me <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
            
            <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary font-orbitron font-bold backdrop-blur-sm">
              Download Resume <Download className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          <div className="mt-12 flex items-center gap-6 text-gray-400 font-rajdhani">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">300+</span>
              <span className="text-sm">Problems Solved</span>
            </div>
            <div className="w-px h-10 bg-gray-700"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">6+</span>
              <span className="text-sm">Projects Built</span>
            </div>
            <div className="w-px h-10 bg-gray-700"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-white">3.9+</span>
              <span className="text-sm">Years Coding</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-[400px] md:h-[600px] w-full relative z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[100px] opacity-30 animate-pulse" />
          <ThreeErrorBoundary>
             <HeroScene />
          </ThreeErrorBoundary>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-xs text-gray-500 font-rajdhani tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
      </motion.div>
    </section>
  );
}
