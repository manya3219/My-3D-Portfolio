import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Box } from "@react-three/drei";
import { ThreeErrorBoundary } from "./ThreeErrorBoundary";

function RotatingCube() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#00f3ff" />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Box args={[2.5, 2.5, 2.5]} rotation={[0.5, 0.5, 0]}>
          <meshStandardMaterial 
            color="#1a1a1a" 
            emissive="#bc13fe"
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.8}
            wireframe
          />
        </Box>
        <Box args={[2.4, 2.4, 2.4]} rotation={[0.5, 0.5, 0]}>
           <meshStandardMaterial color="#000" />
        </Box>
      </Float>
    </Canvas>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-2 md:order-1 h-[300px] md:h-[400px]">
            <ThreeErrorBoundary>
              <RotatingCube />
            </ThreeErrorBoundary>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-orbitron font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary inline-block">
              About Me
            </h2>
            
            <div className="space-y-6 text-lg text-gray-300 font-rajdhani leading-relaxed">
              <p>
                I am a passionate <span className="text-primary font-bold">Software Engineer</span> specializing in modern frontend engineering, full-stack development, and scalable web applications. 
              </p>
              
              <p>
                I love building intuitive user interfaces, real-time applications, and AI-powered tools. My journey involves solving complex problems, exploring new technologies, and creating seamless digital experiences that make a difference.
              </p>
              
              <p>
                As a recent B.Tech CSE graduate skilled in React, Node.js, Express, and MongoDB. I’ve built full-stack projects like an E-Learning App and a Live Chat App, and I have hands-on experience with REST APIs and JWT/OAuth. I’ve also solved 300+ DSA problems on LeetCode and GFG, which has strengthened my problem-solving abilities.

              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
