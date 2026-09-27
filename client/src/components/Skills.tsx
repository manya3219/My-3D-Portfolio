import { useRef, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Code2, Database, Terminal, Layers } from "lucide-react";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code2 className="w-6 h-6 text-primary" />,
    accent: "primary",
    skills: ["C++", "JavaScript", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks & Libraries",
    icon: <Layers className="w-6 h-6 text-secondary" />,
    accent: "secondary",
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS"],
  },
  {
    title: "Databases",
    icon: <Database className="w-6 h-6 text-accent" />,
    accent: "accent",
    skills: ["MongoDB", "SQL", "Firebase", "PostgresSQL"],
  },
  {
    title: "AI Tools & Platforms",
    icon: <Terminal className="w-6 h-6 text-primary" />,
    accent: "primary",
    skills: [
      "Cursor.AI",
      "ChatGPT",
      "Sanity",
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
      "Vercel",
      "Render",
    ],
  },
];

const accentColors: Record<string, string> = {
  primary: "rgba(34,211,238,",
  secondary: "rgba(168,85,247,",
  accent: "rgba(74,222,128,",
};

interface TiltCardProps {
  children: ReactNode;
  accent: string;
}

function TiltCard({ children, accent }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;
  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || isReducedMotion) return;
      const card = cardRef.current;
      const light = lightRef.current;
      if (!card || !light) return;

      const rect = card.getBoundingClientRect();
      const lx = ((e.clientX - rect.left) / rect.width) * 100;
      const ly = ((e.clientY - rect.top) / rect.height) * 100;

      const color = accentColors[accent] ?? accentColors.primary;
      // color = "rgba(34,211,238," — append value and closing paren
      light.style.background = `radial-gradient(circle at ${lx}% ${ly}%, ${color}0.10) 0%, transparent 65%)`;
      light.style.opacity = "1";
    },
    [isTouch, isReducedMotion, accent]
  );

  const onMouseLeave = useCallback(() => {
    if (lightRef.current) lightRef.current.style.opacity = "0";
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative"
    >
      <div
        ref={lightRef}
        className="absolute inset-0 z-10 pointer-events-none rounded-xl"
        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.35 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
            Technical <span className="text-primary">Arsenal</span>
          </h2>
          <p className="text-gray-400 font-rajdhani text-lg max-w-2xl mx-auto">
            A curated collection of technologies I use to build scalable and immersive applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.85, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <TiltCard accent={category.accent}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative z-20 bg-card/30 backdrop-blur-md border border-white/5 p-6 rounded-xl hover:border-primary/40 transition-colors duration-300 group hover:shadow-[0_18px_40px_rgba(34,211,238,0.12)]"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Icon box */}
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:border-primary/50 transition-colors duration-300"
                      whileHover={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {category.icon}
                    </motion.div>

                    <h3 className="text-xl font-orbitron font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>

                    {/* Skill badges */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          className="px-3 py-1 rounded-full text-sm font-rajdhani font-medium bg-white/5 border border-white/10 text-gray-300 group-hover:border-primary/30 group-hover:text-white transition-all duration-200 cursor-default select-none"
                          whileHover={{
                            scale: 1.1,
                            y: -2,
                            backgroundColor: "rgba(34,211,238,0.08)",
                            borderColor: "rgba(34,211,238,0.4)",
                            color: "#ffffff",
                          }}
                          transition={{ duration: 0.15 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
