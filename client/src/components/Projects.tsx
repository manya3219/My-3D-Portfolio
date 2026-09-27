import { motion } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import InteractiveProjectCard from "@/components/InteractiveProjectCard";

const projects = [
  {
    title: "Car Racing",
    description:
      "A sleek motorsport experience featuring motion-driven storytelling and high-performance UI.",
    tech: ["React", "Framer Motion", "UI/UX Design"],
    github: "https://github.com/manya3219/racer",
    link: "https://racer-lovat.vercel.app/",
    type: "Freelance Project",
  },
  {
    title: "MediPayTrack System",
    description:
      "Full-stack Medical Shop Management System with prescription tracking, billing, and financial dashboard for revenue, deposits, and balance management.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "REST API"],
    github: "https://medipay-frontend.onrender.com/",
    link: "https://medipay-frontend.onrender.com/",
    type: "Freelance Project",
  },
  {
    title: "NexaHub",
    description:
      "Collaborative learning platform with admin dashboard, moderation, and role-based access control.",
    tech: ["React", "Tailwind", "Node.js", "MongoDB"],
    github: "https://github.com/manya3219/frontend-notes",
    link: "https://frontend-notes-2-ija5.onrender.com",
    type: "Ed-Tech Platform",
  },
  {
    title: "Gemini AI Clone",
    description:
      "Integrated Google Gemini API for streaming chat responses and real-time multimodal interface.",
    tech: ["React.js", "Gemini API", "CSS3"],
    github: "https://github.com/manya3219/Gemini-clone",
    link: "https://my-gemini-clone-4jbg.vercel.app/",
    type: "AI Integration",
  },
  {
    title: "Live Chat App",
    description:
      "Real-time messaging application with Socket.io, JWT authentication, and cross-browser compatibility.",
    tech: ["Socket.io", "React", "Node.js", "JWT"],
    github: "https://github.com/manya3219/Live-chat-Application",
    link: "https://chat-frontend-3j0y.onrender.com",
    type: "Real-time Communication",
  },
  {
    title: "Route Engines",
    description:
      "Built to Move the Unmovable — RouteEngine Dynamics Inc delivers safe, reliable, and efficient heavy haul logistics across India.",
    tech: ["React", "Tailwind", "Next.js"],
    github: "https://github.com/manya3219/RouteEngines",
    link: "https://route-engines.vercel.app/",
    type: "Freelance Project",
  },
  {
    title: "Blog Website + Admin Dashboard",
    description:
      "Performance optimization project improving load times by 30% using efficient state management.",
    tech: ["React", "React Router", "Recharts"],
    github: "https://github.com/manya3219/mern-blog",
    link: "https://github.com/manya3219/mern-blog",
    type: "Internship Project",
  },
  {
    title: "RESTful API System",
    description:
      "Secure API backend system built for efficiency and security with JWT authentication.",
    tech: ["Node.js", "Express", "JWT", "Bcrypt"],
    github: "https://github.com/manya3219/MultiFactorAuthentication",
    link: "https://github.com/manya3219/MultiFactorAuthentication",
    type: "Backend Architecture",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.35 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
            Featured <span className="text-secondary">Projects</span>
          </h2>
          <p className="text-gray-400 font-rajdhani text-lg max-w-2xl mx-auto">
            Showcasing real-world applications and technical solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <InteractiveProjectCard
              key={index}
              index={index}
              className="group bg-card/40 border border-primary/20 backdrop-blur-sm rounded-xl flex flex-col h-full hover:border-primary/60 transition-colors duration-300 hover:shadow-[0_20px_50px_rgba(34,211,238,0.15)]"
            >
              {/* Card inner */}
              <div className="relative z-20 p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.15 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Folder className="w-8 h-8 text-primary" />
                  </motion.div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-colors duration-200"
                      data-cursor="link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <motion.span whileHover={{ y: -2, scale: 1.1 }} className="block">
                        <Github className="w-5 h-5" />
                      </motion.span>
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-colors duration-200"
                      data-cursor="link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <motion.span whileHover={{ y: -2, scale: 1.1 }} className="block">
                        <ExternalLink className="w-5 h-5" />
                      </motion.span>
                    </a>
                  </div>
                </div>

                {/* Project number */}
                <span className="text-[10px] font-mono text-primary/40 mb-1">
                  {String(index + 1).padStart(2, "0")} /
                </span>

                {/* Title */}
                <h3 className="text-xl font-orbitron font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs text-secondary font-rajdhani uppercase tracking-wider mb-3">
                  {project.type}
                </p>

                {/* Description */}
                <p className="text-gray-400 font-rajdhani text-sm leading-relaxed flex-grow mb-4">
                  {project.description}
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.08, y: -1 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Badge
                        variant="outline"
                        className="border-white/10 text-gray-300 bg-white/5 text-[10px] group-hover:border-primary/25 transition-colors duration-300 cursor-default"
                      >
                        {t}
                      </Badge>
                    </motion.span>
                  ))}
                </div>
              </div>
            </InteractiveProjectCard>
          ))}
        </div>
      </div>
    </section>
  );
}
