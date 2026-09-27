import { useRef, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";

interface InteractiveProjectCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

const MAX_TILT = 12; // degrees
const LIGHT_OPACITY = 0.12;

export default function InteractiveProjectCard({
  children,
  className = "",
  index = 0,
}: InteractiveProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;
  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rafRef = useRef<number>(0);
  const currentTilt = useRef({ rx: 0, ry: 0 });
  const targetTilt = useRef({ rx: 0, ry: 0 });

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animateTilt = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;

    currentTilt.current.rx = lerp(
      currentTilt.current.rx,
      targetTilt.current.rx,
      0.1
    );
    currentTilt.current.ry = lerp(
      currentTilt.current.ry,
      targetTilt.current.ry,
      0.1
    );

    const rx = currentTilt.current.rx;
    const ry = currentTilt.current.ry;

    card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;

    const diff =
      Math.abs(currentTilt.current.rx - targetTilt.current.rx) +
      Math.abs(currentTilt.current.ry - targetTilt.current.ry);

    if (diff > 0.01) {
      rafRef.current = requestAnimationFrame(animateTilt);
    } else {
      card.style.transform = `perspective(1200px) rotateX(${targetTilt.current.rx}deg) rotateY(${targetTilt.current.ry}deg) translateZ(4px)`;
    }
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || isReducedMotion) return;
      const card = cardRef.current;
      const light = lightRef.current;
      if (!card || !light) return;

      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // Normalized -1 to 1
      const nx = dx / (rect.width / 2);
      const ny = dy / (rect.height / 2);

      targetTilt.current = {
        rx: -ny * MAX_TILT,
        ry: nx * MAX_TILT,
      };

      // Light position follows cursor
      const lx = ((e.clientX - rect.left) / rect.width) * 100;
      const ly = ((e.clientY - rect.top) / rect.height) * 100;
      light.style.background = `radial-gradient(circle at ${lx}% ${ly}%, rgba(34,211,238,${LIGHT_OPACITY}) 0%, transparent 65%)`;
      light.style.opacity = "1";

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animateTilt);
    },
    [isTouch, isReducedMotion, animateTilt]
  );

  const onMouseLeave = useCallback(() => {
    if (isTouch || isReducedMotion) return;
    const light = lightRef.current;
    if (light) light.style.opacity = "0";

    targetTilt.current = { rx: 0, ry: 0 };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animateTilt);
  }, [isTouch, isReducedMotion, animateTilt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative"
      data-cursor="project"
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`relative overflow-hidden ${className}`}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Moving light overlay */}
        <div
          ref={lightRef}
          className="absolute inset-0 z-10 pointer-events-none rounded-inherit"
          style={{
            opacity: 0,
            transition: "opacity 0.3s ease",
            borderRadius: "inherit",
          }}
          aria-hidden="true"
        />
        {/* Dynamic border glow on hover — CSS handles this */}
        <div
          className="absolute inset-0 z-0 pointer-events-none rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(34,211,238,0.25)",
            borderRadius: "inherit",
          }}
          aria-hidden="true"
        />
        {children}
      </div>
    </motion.div>
  );
}
