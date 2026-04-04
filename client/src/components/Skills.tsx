import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  Terminal, 
  Cpu, 
  Globe, 
  Layers 
} from "lucide-react";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <Code2 className="w-6 h-6 text-primary" />,
    skills: ["C++", "JavaScript", "HTML5", "CSS3"]
  },
  {
    title: "Frameworks & Libraries",
    icon: <Layers className="w-6 h-6 text-secondary" />,
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS", ]
  },
  {
    title: "Databases",
    icon: <Database className="w-6 h-6 text-accent" />,
    skills: ["MongoDB", "SQL", "Firebase","PostgresSQL"]
  },
  {
    title: "AI Tools & Platforms",
    icon: <Terminal className="w-6 h-6 text-primary" />,
    skills: ["Cursor.AI","ChatGPT","Sanity","Git", "GitHub", "Postman", "VS Code", "Vercel", "Render"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.35 }}
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
              initial={{ opacity: 0, y: 70, scale: 0.82, filter: "blur(14px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.25 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="bg-card/30 backdrop-blur-md border border-white/5 p-6 rounded-xl hover:border-primary/50 transition-all duration-300 group relative overflow-hidden hover:shadow-[0_18px_40px_rgba(34,211,238,0.18)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 border border-white/10 group-hover:border-primary/50 transition-colors">
                  {category.icon}
                </div>
                
                <h3 className="text-xl font-orbitron font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 rounded-full text-sm font-rajdhani font-medium bg-white/5 border border-white/10 text-gray-300 group-hover:border-primary/30 group-hover:text-white transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
