import { useEffect, useRef } from "react";

const LERP_FACTOR = 0.07;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function Spotlight() {
  const spotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -9999, y: -9999 });
  const currentPos = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || isReducedMotion) return;

    const spot = spotRef.current;
    if (!spot) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const animate = () => {
      currentPos.current.x = lerp(
        currentPos.current.x,
        mousePos.current.x,
        LERP_FACTOR
      );
      currentPos.current.y = lerp(
        currentPos.current.y,
        mousePos.current.y,
        LERP_FACTOR
      );

      const x = currentPos.current.x;
      const y = currentPos.current.y;

      spot.style.background = `radial-gradient(
        600px circle at ${x}px ${y}px,
        rgba(34, 211, 238, 0.04) 0%,
        rgba(168, 85, 247, 0.02) 40%,
        transparent 70%
      )`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
      style={{ mixBlendMode: "normal" }}
    />
  );
}
