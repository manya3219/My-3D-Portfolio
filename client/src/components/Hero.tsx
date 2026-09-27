import { motion } from "framer-motion";
import { Download, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/MagneticButton";
import AnimatedText from "@/components/AnimatedText";
import TextScramble from "@/components/TextScramble";
import profilePic from "@assets/formal_picture_1765101552315.jpg";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-background/40 to-background/95 z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* ── Left column ── */}
        <div>
          {/* Status badge — TextScramble reveal */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
            className="inline-flex items-center gap-2 mb-6 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm"
          >
            {/* Live pulse dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <TextScramble
              text="AVAILABLE FOR WORK"
              className="text-primary font-rajdhani font-semibold tracking-widest text-sm uppercase"
              delay={400}
              speed={35}
              iterations={5}
            />
          </motion.div>

          {/* Main headline — character-by-character AnimatedText */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-orbitron leading-tight">
            <AnimatedText
              text="Manya"
              className="text-white block"
              delay={0.35}
              stagger={0.06}
              hoverDrift
            />
            <AnimatedText
              text="Yadav"
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow block"
              delay={0.65}
              stagger={0.07}
              hoverDrift
            />
          </h1>

          {/* Subtitle — scramble reveal */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
            className="text-2xl md:text-3xl text-gray-400 font-rajdhani mb-6"
          >
            <TextScramble
              text="Software Engineer & Full-Stack Developer"
              delay={1200}
              speed={28}
              iterations={4}
            />
          </motion.h2>

          {/* Typewriter line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6, ease: "easeOut" }}
            className="h-10 mb-8 overflow-hidden"
          >
            <motion.p
              className="text-lg md:text-xl text-primary font-mono border-r-2 border-primary pr-2 inline-block whitespace-nowrap overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.6, duration: 2.6, ease: "linear" }}
            >
              Building fast, scalable, and Responsive Design.
            </motion.p>
          </motion.div>

          {/* CTA buttons — magnetic */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton strength={0.3}>
              <Button
                size="lg"
                className="bg-primary text-black hover:bg-primary/80 font-orbitron font-bold border-none transition-shadow duration-300 hover:shadow-[0_14px_35px_rgba(34,211,238,0.45)] cursor-none"
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Hire Me <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </MagneticButton>

            <MagneticButton strength={0.3}>
              <a
                href="https://drive.google.com/file/d/11I_7Jm5HbOET4DjcNL9Tc2LqNlBkIeI4/view"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary font-orbitron font-bold backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_14px_35px_rgba(34,211,238,0.25)] cursor-none"
                >
                  Download Resume <Download className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6, ease: "easeOut" }}
            className="mt-12 flex items-center gap-6 text-gray-400 font-rajdhani"
          >
            {[
              { value: "300+", label: "Problems Solved" },
              { value: "15+", label: "Projects Built" },
              { value: "Fresher", label: "Experience" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-6">
                {i > 0 && <div className="w-px h-10 bg-gray-700" />}
                <motion.div
                  className="flex flex-col"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-3xl font-bold text-white leading-tight">
                    {stat.value}
                  </span>
                  <span className="text-sm">{stat.label}</span>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right column — profile image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.78, y: 40, filter: "blur(18px)" }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-0 flex justify-center items-center"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[100px] opacity-30 animate-pulse" />

          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] group">
            {/* Spinning rings */}
            <div className="absolute inset-0 rounded-full border border-primary/30 border-dashed animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-secondary/30 border-dashed animate-[spin_15s_linear_infinite_reverse]" />

            {/* Image */}
            <div className="absolute inset-8 rounded-full overflow-hidden border-2 border-primary/50 box-glow bg-black/50 backdrop-blur-sm">
              <img
                src={profilePic}
                alt="Manya Yadav"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              {/* Hover sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Tech labels */}
            <motion.div
              className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black border border-primary text-primary text-xs font-mono rounded-full"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              &lt;dev /&gt;
            </motion.div>
            <motion.div
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black border border-secondary text-secondary text-xs font-mono rounded-full"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            >
              DEV_MODE
            </motion.div>

            {/* Orbiting dot */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              <div
                className="absolute w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                style={{ top: "4px", left: "50%", transform: "translateX(-50%)" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-xs text-gray-500 font-rajdhani tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
