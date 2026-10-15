import { motion, type Variants } from "framer-motion";
import { Award, Briefcase, GraduationCap } from "lucide-react";

const experienceItems = [
  {
    title: "Full-Stack Developer ",
    company: "Solution Bowl",
    period: "March 2026 - Present",
    points: [
      "Contributing to the development of a scalable gaming platform using React.js and TypeScript, designing modular and reusable UI components for improved maintainability.",
      "Implementing dynamic and responsive user interfaces with efficient state management to enhance user experience and platform performance.",
      "Integrating RESTful APIs and managing asynchronous data flows to support real-time updates within the application.",
      "Leveraging AI-assisted development tools to accelerate debugging, code optimization, and feature development.",
      "Collaborating with the engineering team through Bitbucket-based version control, following structured branching strategies, pull requests, and code review practices.",
    ],
  },
  {
    title: "Full Stack Developer (Freelance)",
    company: "Independent Client - MediPayTrack System",
    period: "Jan 2026 - Present",
    points: [
      "Built a full-stack Medical Shop Management System to replace manual prescription and billing tracking with centralized digital records.",
      "Developed React UI and Node.js/Express REST APIs with PostgreSQL to manage prescription uploads, searchable records, and real-time tracking of revenue, deposits, and balances.",
      "Implemented a monthly financial dashboard with profit/loss, deposit totals, outstanding balance reports, and transaction history.",
    ],
  },
  {
    title: "Full-Stack Intern",
    company: "ThinkNEXT Technologies",
    period: "Step 2025 - Feb 2026",
    points: [
      "Improved dashboard performance by 30% through optimized rendering.",
      "Collaborated in an Agile team of 5 developers.",
      "Built secure RESTful APIs improving data flow efficiency.",
      "Reduced delivery time by 20% via streamlined workflows.",
    ],
  },
];

const sectionTitleVariant: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerParentVariant: Variants = {
      hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const boomCardVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.96,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const sideBlockVariant: Variants = {
  hidden: { opacity: 0, x: 24, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-black/20 py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/95 via-background/45 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-orbitron font-bold text-white md:text-5xl">
            Experience & <span className="text-accent">Education</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base font-rajdhani tracking-wide text-gray-400 md:text-lg">
            First the heading lands, then each role steps in one by one with a punchy timeline reveal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            variants={staggerParentVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.18 }}
          >
            <div className="mb-8 flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-orbitron font-bold text-white">Experience</h3>
            </div>

            <div className="space-y-6">
                {experienceItems.map((item, index) => (
                  <div key={`${item.title}-${item.company}-wrap`} className="relative">
                    <motion.article
                      key={`${item.title}-${item.company}`}
                      variants={boomCardVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.35 }}
                      whileHover={{ y: -8, scale: 1.015 }}
                      className="group relative overflow-hidden rounded-2xl border border-white/8 bg-card/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/35 hover:shadow-[0_18px_40px_rgba(34,211,238,0.14)]"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative z-10">
                        <div className="mb-4 flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-xl font-orbitron font-bold text-white">{item.title}</h4>
                            <p className="font-rajdhani font-semibold text-primary">{item.company}</p>
                          </div>
                          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-mono text-primary">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <div className="mb-4 flex items-center gap-3">
                          <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_18px_rgba(34,211,238,0.55)]" />
                          <p className="text-sm font-mono text-gray-500">{item.period}</p>
                        </div>

                        <ul className="list-disc space-y-2 pl-5 font-rajdhani text-gray-300 marker:text-primary">
                          {item.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.article>
                  </div>
                ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerParentVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="space-y-12"
          >
            <motion.div variants={sideBlockVariant}>
              <div className="mb-8 flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-secondary" />
                <h3 className="text-2xl font-orbitron font-bold text-white">Education</h3>
              </div>

              <div className="relative ml-3 border-l border-secondary/20 pl-8">
                <motion.div
                  variants={boomCardVariant}
                  whileHover={{ y: -8, scale: 1.015 }}
                  className="relative overflow-hidden rounded-2xl border border-white/8 bg-card/30 p-6 backdrop-blur-md transition-all duration-300 hover:border-secondary/35 hover:shadow-[0_18px_40px_rgba(16,185,129,0.12)]"
                >
                  <div className="absolute -left-[42px] top-8 h-5 w-5 rounded-full border-4 border-black bg-secondary shadow-[0_0_25px_rgba(16,185,129,0.75)]" />
                  <h4 className="text-xl font-orbitron font-bold text-white">B.Tech Computer Science</h4>
                  <p className="font-rajdhani font-semibold text-secondary">Kurukshetra University</p>
                  <p className="mb-2 text-sm font-mono text-gray-500">2021 - 2025</p>
                  <p className="font-rajdhani text-gray-400">CGPA: 8</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={sideBlockVariant}>
              <div className="mb-8 flex items-center gap-3">
                <Award className="h-6 w-6 text-accent" />
                <h3 className="text-2xl font-orbitron font-bold text-white">Achievements</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <motion.div
                  variants={boomCardVariant}
                  whileHover={{ y: -6, scale: 1.015 }}
                  className="flex items-center justify-between rounded-xl border border-white/8 bg-card/30 p-4 backdrop-blur-md transition-all duration-300 hover:border-accent/35 hover:shadow-[0_18px_36px_rgba(249,115,22,0.12)]"
                >
                  <span className="font-rajdhani text-white">HackerRank Problem Solving</span>
                  <span className="font-orbitron font-bold text-accent">Gold Badge</span>
                </motion.div>

                <motion.div
                  variants={boomCardVariant}
                  whileHover={{ y: -6, scale: 1.015 }}
                  className="flex items-center justify-between rounded-xl border border-white/8 bg-card/30 p-4 backdrop-blur-md transition-all duration-300 hover:border-primary/35 hover:shadow-[0_18px_36px_rgba(34,211,238,0.12)]"
                >
                  <span className="font-rajdhani text-white">Coding Problems Solved</span>
                  <span className="font-orbitron font-bold text-primary">300+</span>
                </motion.div>

                <motion.div
                  variants={boomCardVariant}
                  whileHover={{ y: -6, scale: 1.015 }}
                  className="rounded-xl border border-white/8 bg-card/30 p-4 backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:shadow-[0_18px_36px_rgba(255,255,255,0.08)]"
                >
                  <span className="block text-sm font-rajdhani text-gray-300">Participated in</span>
                  <span className="font-orbitron font-bold text-white">SIH, Kavach, Flipkart Grid 5.0</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
