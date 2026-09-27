import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useSpring } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#root" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Refs for morphing indicator position
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorLeft = useSpring(0, { stiffness: 280, damping: 26, mass: 0.6 });
  const indicatorWidth = useSpring(0, { stiffness: 280, damping: 26, mass: 0.6 });

  // Logo spring
  const logoX = useSpring(0, { stiffness: 300, damping: 20 });
  const logoScale = useSpring(1, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update indicator to match active or hovered button
  const updateIndicator = (index: number) => {
    const btn = buttonRefs.current[index];
    const nav = navRef.current;
    if (!btn || !nav) return;
    const btnRect = btn.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    indicatorLeft.set(btnRect.left - navRect.left);
    indicatorWidth.set(btnRect.width);
  };

  useEffect(() => {
    updateIndicator(hoveredIndex !== null ? hoveredIndex : activeIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, hoveredIndex]);

  // Initialize indicator position after mount
  useEffect(() => {
    const timer = setTimeout(() => updateIndicator(activeIndex), 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (id: string, index: number) => {
    if (id === "#root") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveIndex(index);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-primary/15 shadow-[0_1px_0_rgba(34,211,238,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with micro-interaction */}
          <motion.div
            className="flex-shrink-0 cursor-pointer select-none"
            style={{ x: logoX, scale: logoScale }}
            onMouseEnter={() => { logoX.set(2); logoScale.set(1.06); }}
            onMouseLeave={() => { logoX.set(0); logoScale.set(1); }}
            onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setActiveIndex(0); }}
          >
            <span className="font-orbitron text-2xl font-bold tracking-wider">
              <motion.span
                className="text-primary inline-block"
                whileHover={{ textShadow: "0 0 20px rgba(34,211,238,0.8), 0 0 40px rgba(34,211,238,0.4)" }}
              >
                MY
              </motion.span>
              <motion.span
                className="text-secondary inline-block"
                whileHover={{ textShadow: "0 0 20px rgba(168,85,247,0.8)" }}
              >
                .dev
              </motion.span>
            </span>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:block">
            <div ref={navRef} className="relative ml-10 flex items-center space-x-1">
              {/* Morphing active indicator */}
              <motion.div
                className="absolute bottom-0 h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full pointer-events-none"
                style={{ left: indicatorLeft, width: indicatorWidth }}
                aria-hidden="true"
              />

              {navLinks.map((link, i) => (
                <button
                  key={link.name}
                  ref={(el) => { buttonRefs.current[i] = el; }}
                  onClick={() => scrollToSection(link.href, i)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative px-4 py-2 font-rajdhani font-semibold text-base uppercase tracking-wider transition-colors duration-200 ${
                    activeIndex === i
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  <motion.span
                    animate={{
                      y: hoveredIndex === i ? -1 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                    className="block"
                  >
                    {link.name}
                  </motion.span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors p-1"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-primary/20 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  onClick={() => scrollToSection(link.href, i)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base font-rajdhani font-semibold uppercase tracking-wide transition-all duration-200 ${
                    activeIndex === i
                      ? "text-primary bg-primary/10 border-l-2 border-primary"
                      : "text-foreground/70 hover:text-primary hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
