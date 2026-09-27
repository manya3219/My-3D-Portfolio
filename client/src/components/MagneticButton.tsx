import {
  useRef,
  useCallback,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strength?: number;   // How far the magnet pulls (px multiplier)
  textShift?: number;  // How far the inner text shifts opposite (px multiplier)
  className?: string;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  strength = 0.35,
  textShift = 0.15,
  className = "",
  disabled = false,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;
  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Spring configs — snappy but natural
  const springConfig = { stiffness: 200, damping: 18, mass: 0.5 };

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  // Text moves in opposite direction
  const textX = useTransform(x, (v) => -v * (textShift / strength));
  const textY = useTransform(y, (v) => -v * (textShift / strength));

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || isTouch || isReducedMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      x.set(dx * strength);
      y.set(dy * strength);
    },
    [disabled, isTouch, isReducedMotion, strength, x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (isTouch || isReducedMotion || disabled) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={`relative inline-block ${className}`}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-magnetic="true"
      {...(rest as object)}
    >
      <motion.span
        className="block"
        style={{ x: textX, y: textY }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
