import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Check, Copy } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

const EMAIL = "yadavmanya1902@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback silent
    }
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 gap-16 lg:grid-cols-2"
        >
          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.35 }}
          >
            <h2 className="mb-6 text-4xl font-orbitron font-bold text-white">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <p className="mb-12 text-lg font-rajdhani text-gray-400">
              Have a project in mind or want to discuss the latest tech? I'm always open to new
              opportunities and collaborations.
            </p>

            <div className="space-y-8">
              {/* Email row — with copy button */}
              <div className="group flex items-center gap-4">
                <MagneticButton strength={0.4}>
                  <motion.a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-4"
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-black group-hover:shadow-[0_12px_30px_rgba(34,211,238,0.3)]">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-mono uppercase tracking-wider text-gray-500">
                        Email
                      </p>
                      <p className="text-lg font-rajdhani text-white transition-colors group-hover:text-primary">
                        {EMAIL}
                      </p>
                    </div>
                  </motion.a>
                </MagneticButton>

                {/* Copy button */}
                <motion.button
                  onClick={copyEmail}
                  className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-200 hover:border-primary/50 hover:text-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  title="Copy email"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-primary"
                      >
                        <Check className="h-4 w-4" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Copy className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Copied toast */}
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      initial={{ opacity: 0, y: 6, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className="absolute ml-64 mt-1 rounded-md border border-primary/30 bg-black/80 px-3 py-1 text-xs font-mono text-primary backdrop-blur-sm pointer-events-none"
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Phone row */}
              <MagneticButton strength={0.4} className="w-full">
                <motion.a
                  href="tel:9253615701"
                  className="group flex items-center gap-4"
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-black group-hover:shadow-[0_12px_30px_rgba(168,85,247,0.3)]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-mono uppercase tracking-wider text-gray-500">
                      Phone
                    </p>
                    <p className="text-lg font-rajdhani text-white transition-colors group-hover:text-secondary">
                      9253615701
                    </p>
                  </div>
                </motion.a>
              </MagneticButton>

              {/* Social icons */}
              <div className="flex gap-4 pt-4">
                <MagneticButton strength={0.5}>
                  <motion.a
                    href="https://www.linkedin.com/in/manya-yadav01/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-black"
                    whileHover={{ rotateY: 15, rotateX: -8, scale: 1.1 }}
                    transition={{ duration: 0.25 }}
                    style={{ transformStyle: "preserve-3d" }}
                    data-cursor="link"
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>
                </MagneticButton>

                <MagneticButton strength={0.5}>
                  <motion.a
                    href="https://github.com/manya3219"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-black"
                    whileHover={{ rotateY: -15, rotateX: 8, scale: 1.1 }}
                    transition={{ duration: 0.25 }}
                    style={{ transformStyle: "preserve-3d" }}
                    data-cursor="link"
                  >
                    <Github className="h-5 w-5" />
                  </motion.a>
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* ── Right — about card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20, scale: 0.94, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -6 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-card/30 p-8 backdrop-blur-md transition-all duration-300 hover:border-primary/25 hover:shadow-[0_18px_40px_rgba(34,211,238,0.12)] group"
          >
            {/* Ambient corner glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/15 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-secondary/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <p className="font-rajdhani leading-8 text-gray-300 relative z-10">
              As a 2025 B.Tech CSE graduate, I've spent the last few years working on personal and
              academic projects that helped me understand how modern web applications are built, from
              creating responsive interfaces with HTML, CSS, JavaScript, and React.js to developing
              backend functionality with Node.js and MongoDB.
            </p>
            <p className="mt-6 font-rajdhani leading-8 text-gray-300 relative z-10">
              I'm always excited to connect with people, explore new opportunities, and contribute to
              teams where I can apply my technical skills while continuing to learn and grow.
            </p>
            <p className="mt-6 font-rajdhani leading-8 text-gray-300 relative z-10">
              If you feel my passion and energy align with the kind of work you're doing, I'd love to
              hear from you. Let's connect, share ideas, and build something impactful together.
            </p>

            {/* Decorative corner bracket */}
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-primary/20 group-hover:border-primary/50 transition-colors duration-300" />
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-primary/20 group-hover:border-primary/50 transition-colors duration-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
