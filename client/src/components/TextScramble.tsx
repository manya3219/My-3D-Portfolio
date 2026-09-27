import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

interface TextScrambleProps {
  text: string;
  className?: string;
  /** Delay before scramble starts (ms) */
  delay?: number;
  /** Speed of reveal — lower = faster (ms per step) */
  speed?: number;
  /** How many scramble iterations per character before locking */
  iterations?: number;
  /** Trigger re-scramble on hover */
  hoverTrigger?: boolean;
}

export default function TextScramble({
  text,
  className = "",
  delay = 0,
  speed = 40,
  iterations = 6,
  hoverTrigger = false,
}: TextScrambleProps) {
  const [displayed, setDisplayed] = useState<string[]>(() =>
    text.split("").map(() => " ")
  );
  const lockedRef = useRef<boolean[]>(text.split("").map(() => false));
  const rafRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scramble = () => {
    if (isReducedMotion) {
      setDisplayed(text.split(""));
      return;
    }

    const locked: boolean[] = text.split("").map(() => false);
    lockedRef.current = locked;
    const iterCounts: number[] = text.split("").map(() => 0);

    const tick = () => {
      const next = text.split("").map((char, i) => {
        if (locked[i]) return char;
        if (char === " ") {
          locked[i] = true;
          return " ";
        }
        iterCounts[i]++;
        if (iterCounts[i] >= iterations + i * 1.5) {
          locked[i] = true;
          return char;
        }
        return randomChar();
      });

      setDisplayed([...next]);

      const allLocked = locked.every(Boolean);
      if (!allLocked) {
        rafRef.current = setTimeout(tick, speed);
      }
    };

    rafRef.current = setTimeout(tick, delay);
  };

  useEffect(() => {
    scramble();
    return () => {
      if (rafRef.current) clearTimeout(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const handleMouseEnter = () => {
    if (!hoverTrigger) return;
    if (rafRef.current) clearTimeout(rafRef.current);
    scramble();
  };

  return (
    <span
      className={`font-mono ${className}`}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
    >
      {displayed.map((char, i) => (
        <span
          key={i}
          style={{
            color: lockedRef.current[i]
              ? undefined
              : "hsl(180 100% 60% / 0.7)",
            transition: "color 0.1s",
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
