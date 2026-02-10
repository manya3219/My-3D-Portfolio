import { motion } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "MediPayTrack System",
    description: "Full-stack Medical Shop Management System with prescription tracking, billing, and financial dashboard for revenue, deposits, and balance management.",
    tech: ["React", "Node.js", "Express", "PostgreSQL", "REST API"],
    github: "https://medipay-frontend.onrender.com/",
    link: "https://medipay-frontend.onrender.com/",
    type: "Freelance Project"
  },
  {
    title: "NexaHub",
    description: "Collaborative learning platform with admin dashboard, moderation, and role-based access control.",
    tech: ["React", "Tailwind", "Node.js", "MongoDB"],
    github: "https://github.com/manya3219/frontend-notes",
    link: "https://frontend-notes-2-ija5.onrender.com",
    type: "Ed-Tech Platform"
  },
  {
    title: "Gemini AI Clone",
    description: "Integrated Google Gemini API for streaming chat responses and real-time multimodal interface.",
    tech: ["React.js", "Gemini API", "CSS3"],
    github: "https://github.com/manya3219/Gemini-clone",
    link: "https://my-gemini-clone-4jbg.vercel.app/",
    type: "AI Integration"
  },
  {
    title: "Live Chat App",
    description: "Real-time messaging application with Socket.io, JWT authentication, and cross-browser compatibility.",
    tech: ["Socket.io", "React", "Node.js", "JWT"],
    github: "https://github.com/manya3219/Live-chat-Application",
    link: "https://chat-frontend-3j0y.onrender.com",
    type: "Real-time Communication"
  },
  {
    title: "Route Engines",
    description: "Built to Move the Unmovable — RouteEngine Dynamics Inc delivers safe, reliable, and efficient heavy haul logistics across the India.",
    tech: ["React", "Tailwind", "Next.js"],
    github: "https://github.com/manya3219/RouteEngines",
    link: "https://route-engines.vercel.app/",
    type: "Freelance Project"
  },
  {
    title: "Blog WEBSITE + Admin Dashboard",
    description: "Performance optimization project improving load times by 30% using efficient state management.",
    tech: ["React", "React Router", "Recharts"],
    github: "https://github.com/manya3219/mern-blog",
    link: "https://github.com/manya3219/mern-blog",
    type: "Internship Project"
  },
  {
    title: "RESTful API System",
    description: "Secure API backend system built for efficiency and security with JWT authentication.",
    tech: ["Node.js", "Express", "JWT", "Bcrypt"],
    github: "https://github.com/manya3219/MultiFactorAuthentication",
    link: "https://github.com/manya3219/MultiFactorAuthentication",
    type: "Backend Architecture"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
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
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
              className="perspective-1000"
            >
              <Card className="bg-card/40 border-primary/20 backdrop-blur-sm h-full flex flex-col hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Folder className="w-8 h-8 text-primary" />
                    <div className="flex gap-2">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                      </a>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-orbitron text-white">{project.title}</CardTitle>
                  <p className="text-xs text-secondary font-rajdhani uppercase tracking-wider">{project.type}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-400 font-rajdhani text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t, i) => (
                      <Badge key={i} variant="outline" className="border-white/10 text-gray-300 bg-white/5 text-[10px]">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
