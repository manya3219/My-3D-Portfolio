import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-orbitron font-bold text-white mb-4">
            Experience & <span className="text-accent">Education</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-orbitron font-bold text-white">Experience</h3>
            </div>
            
            <div className="relative border-l border-primary/20 ml-3 pl-8 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary box-glow border-4 border-black" />
                <h4 className="text-xl font-orbitron font-bold text-white">Full Stack Developer (Freelance)</h4>
                <p className="text-primary font-rajdhani font-semibold">Independent Client – MediPayTrack System</p>
                <p className="text-sm text-gray-500 font-mono mb-4">Jan 2026 – Present</p>
                <ul className="list-disc list-inside text-gray-400 font-rajdhani space-y-2">
                  <li>Built a full-stack Medical Shop Management System to replace manual prescription and billing tracking with centralized digital records.</li>
                  <li>Developed React UI and Node.js/Express REST APIs with PostgreSQL to manage prescription uploads, searchable records, and real-time tracking of revenue, deposits, and balances.</li>
                  <li>Implemented a monthly financial dashboard with profit/loss, deposit totals, outstanding balance reports, and transaction history.</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary box-glow border-4 border-black" />
                <h4 className="text-xl font-orbitron font-bold text-white">Full-Stack Intern</h4>
                <p className="text-primary font-rajdhani font-semibold">ThinkNEXT Technologies</p>
                <p className="text-sm text-gray-500 font-mono mb-4">July 2024 – Aug 2024</p>
                <ul className="list-disc list-inside text-gray-400 font-rajdhani space-y-2">
                  <li>Improved dashboard performance by 30% through optimized rendering.</li>
                  <li>Collaborated in an Agile team of 5 developers.</li>
                  <li>Built secure RESTful APIs improving data flow efficiency.</li>
                  <li>Reduced delivery time by 20% via streamlined workflows.</li>
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Education & Achievements Column */}
          <div className="space-y-12">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-6 h-6 text-secondary" />
                <h3 className="text-2xl font-orbitron font-bold text-white">Education</h3>
              </div>
              
              <div className="relative border-l border-secondary/20 ml-3 pl-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-secondary box-glow border-4 border-black" />
                  <h4 className="text-xl font-orbitron font-bold text-white">B.Tech Computer Science</h4>
                  <p className="text-secondary font-rajdhani font-semibold">Kurukshetra University</p>
                  <p className="text-sm text-gray-500 font-mono mb-2">2021 – 2025</p>
                  <p className="text-gray-400 font-rajdhani">CGPA: 7.8</p>
                </motion.div>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-6 h-6 text-accent" />
                <h3 className="text-2xl font-orbitron font-bold text-white">Achievements</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-card/30 border border-white/5 p-4 rounded-lg flex items-center justify-between"
                >
                  <span className="text-white font-rajdhani">HackerRank Problem Solving</span>
                  <span className="text-accent font-bold font-orbitron">Gold Badge</span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-card/30 border border-white/5 p-4 rounded-lg flex items-center justify-between"
                >
                  <span className="text-white font-rajdhani">Coding Problems Solved</span>
                  <span className="text-primary font-bold font-orbitron">300+</span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-card/30 border border-white/5 p-4 rounded-lg"
                >
                  <span className="text-gray-300 font-rajdhani block text-sm">Participated in</span>
                  <span className="text-white font-bold font-orbitron">SIH, Kavach, Flipkart Grid 5.0</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
