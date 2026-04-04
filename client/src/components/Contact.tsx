import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.25 }}
          className="grid grid-cols-1 gap-16 lg:grid-cols-2"
        >
          <motion.div
            initial={{ opacity: 0, x: -40, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.35 }}
          >
            <h2 className="mb-6 text-4xl font-orbitron font-bold text-white">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <p className="mb-12 text-lg font-rajdhani text-gray-400">
              Have a project in mind or want to discuss the latest tech? I'm always open to new opportunities and collaborations.
            </p>

            <div className="space-y-8">
              <motion.a
                href="mailto:yadavmanya1902@gmail.com"
                className="group flex items-center gap-4"
                whileHover={{ x: 8, scale: 1.02 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-black group-hover:shadow-[0_12px_30px_rgba(34,211,238,0.28)]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-mono uppercase tracking-wider text-gray-500">Email</p>
                  <p className="text-lg font-rajdhani text-white transition-colors group-hover:text-primary">
                    yadavmanya1902@gmail.com
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="tel:9253615701"
                className="group flex items-center gap-4"
                whileHover={{ x: 8, scale: 1.02 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-black group-hover:shadow-[0_12px_30px_rgba(16,185,129,0.24)]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-mono uppercase tracking-wider text-gray-500">Phone</p>
                  <p className="text-lg font-rajdhani text-white transition-colors group-hover:text-secondary">
                    9253615701
                  </p>
                </div>
              </motion.a>

              <div className="flex gap-4 pt-4">
                <motion.a
                  href="https://www.linkedin.com/in/manya-yadav01/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-black"
                  whileHover={{ y: -6, scale: 1.08 }}
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  href="https://github.com/manya3219"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-black"
                  whileHover={{ y: -6, scale: 1.08 }}
                >
                  <Github className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, y: 30, scale: 0.94, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/30 p-8 backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:shadow-[0_18px_40px_rgba(34,211,238,0.16)]"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/20 blur-[60px]" />
            <p className="font-rajdhani leading-8 text-gray-300">
              As a 2025 B.Tech CSE graduate, I've spent the last few years working on personal and academic projects that helped me understand how modern web applications are built, from creating responsive interfaces with HTML, CSS, JavaScript, and React.js to developing backend functionality with Node.js and MongoDB. My journey across the MERN stack, along with strong problem-solving skills in C++, has shaped me into a developer who enjoys creating meaningful, user-focused solutions.
            </p>
            <p className="mt-6 font-rajdhani leading-8 text-gray-300">
              I'm always excited to connect with people, explore new opportunities, and contribute to teams where I can apply my technical skills while continuing to learn and grow. Whether it's collaborating on innovative ideas, taking on challenging tasks, or turning concepts into fully functional applications, I bring dedication, curiosity, and a strong commitment to delivering quality work.
            </p>
            <p className="mt-6 font-rajdhani leading-8 text-gray-300">
              If you feel my passion and energy align with the kind of work you're doing, I'd love to hear from you. Let's connect, share ideas, and build something impactful together.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
