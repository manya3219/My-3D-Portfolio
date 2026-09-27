import { motion, type Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  /** Initial delay before animation starts */
  delay?: number;
  /** Stagger between characters (seconds) */
  stagger?: number;
  /** Split by word instead of character */
  byWord?: boolean;
  /** Hover: letters subtly drift */
  hoverDrift?: boolean;
}

const charVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    rotateX: -30,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AnimatedText({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
  byWord = false,
  hoverDrift = false,
}: AnimatedTextProps) {
  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const units = byWord ? text.split(" ") : text.split("");

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      style={{ perspective: "600px" }}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={charVariants}
          whileHover={
            hoverDrift
              ? {
                  y: -3,
                  color: "hsl(180 100% 70%)",
                  transition: { duration: 0.2, ease: "easeOut" },
                }
              : undefined
          }
          style={{ transformStyle: "preserve-3d" }}
        >
          {unit === " " ? "\u00A0" : unit}
          {byWord && i < units.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
