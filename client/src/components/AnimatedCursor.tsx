import { useEffect, useRef, useCallback } from "react";

// Cursor states
type CursorState = "default" | "button" | "project" | "link" | "text";

const LERP_FACTOR = 0.12;
const TRAIL_LERP = 0.06;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function AnimatedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Raw mouse pos
  const mousePos = useRef({ x: -100, y: -100 });
  // Smoothed cursor pos
  const cursorPos = useRef({ x: -100, y: -100 });
  // Trail pos
  const trailPos = useRef({ x: -100, y: -100 });

  const stateRef = useRef<CursorState>("default");
  const rafRef = useRef<number>(0);
  const isVisible = useRef(false);

  const getState = useCallback((el: Element | null): CursorState => {
    if (!el) return "default";
    const target = el.closest(
      "button, a, [data-cursor], input, textarea, [role='button']"
    ) as HTMLElement | null;
    if (!target) return "default";

    const cursor = target.dataset.cursor;
    if (cursor === "project") return "project";
    if (cursor === "link") return "link";
    if (
      target.tagName === "BUTTON" ||
      target.getAttribute("role") === "button" ||
      target.closest("[data-magnetic]")
    )
      return "button";
    if (target.tagName === "A") return "link";
    return "default";
  }, []);

  const applyCursorState = useCallback((state: CursorState) => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    const label = labelRef.current;
    if (!cursor || !trail || !label) return;

    // Reset
    cursor.className =
      "fixed pointer-events-none z-[9999] rounded-full mix-blend-normal transition-[width,height,background,border,opacity] duration-200";
    trail.className =
      "fixed pointer-events-none z-[9998] rounded-full transition-[width,height,opacity] duration-300";
    label.style.opacity = "0";

    switch (state) {
      case "button":
        cursor.classList.add(
          "w-10",
          "h-10",
          "border-2",
          "border-cyan-400",
          "bg-cyan-400/10"
        );
        trail.classList.add("w-6", "h-6", "bg-cyan-400/20");
        break;
      case "project":
        cursor.classList.add("w-20", "h-20", "bg-cyan-400/5", "border", "border-cyan-400/60");
        trail.classList.add("w-3", "h-3", "bg-cyan-400/40");
        label.style.opacity = "1";
        break;
      case "link":
        cursor.classList.add(
          "w-8",
          "h-8",
          "bg-purple-500/20",
          "border",
          "border-purple-400/60"
        );
        trail.classList.add("w-4", "h-4", "bg-purple-400/30");
        break;
      default:
        cursor.classList.add(
          "w-4",
          "h-4",
          "bg-cyan-400",
          "shadow-[0_0_12px_rgba(34,211,238,0.7)]"
        );
        trail.classList.add("w-8", "h-8", "border", "border-cyan-400/30");
        break;
    }
  }, []);

  useEffect(() => {
    // Don't render on touch/mobile devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    // Don't render if reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    // Initial state
    applyCursorState("default");

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible.current) {
        isVisible.current = true;
        cursor.style.opacity = "1";
        trail.style.opacity = "1";
        // Snap on first appearance
        cursorPos.current = { x: e.clientX, y: e.clientY };
        trailPos.current = { x: e.clientX, y: e.clientY };
      }

      const newState = getState(e.target as Element);
      if (newState !== stateRef.current) {
        stateRef.current = newState;
        applyCursorState(newState);
      }
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (cursor) cursor.style.opacity = "0";
      if (trail) trail.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible.current = true;
      if (cursor) cursor.style.opacity = "1";
      if (trail) trail.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const animate = () => {
      if (cursor && trail) {
        // Smooth lerp
        cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, LERP_FACTOR);
        cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, LERP_FACTOR);
        trailPos.current.x = lerp(trailPos.current.x, mousePos.current.x, TRAIL_LERP);
        trailPos.current.y = lerp(trailPos.current.y, mousePos.current.y, TRAIL_LERP);

        const cw = cursor.offsetWidth / 2;
        const ch = cursor.offsetHeight / 2;
        const tw = trail.offsetWidth / 2;
        const th = trail.offsetHeight / 2;

        cursor.style.transform = `translate(${cursorPos.current.x - cw}px, ${
          cursorPos.current.y - ch
        }px)`;
        trail.style.transform = `translate(${trailPos.current.x - tw}px, ${
          trailPos.current.y - th
        }px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [getState, applyCursorState]);

  // Don't mount DOM on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        style={{ opacity: 0, top: 0, left: 0, willChange: "transform" }}
        aria-hidden="true"
      >
        <span
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center text-[9px] font-orbitron font-bold tracking-widest text-cyan-300 uppercase"
          style={{ opacity: 0, transition: "opacity 0.2s" }}
        >
          VIEW
        </span>
      </div>

      {/* Trailing ring */}
      <div
        ref={trailRef}
        style={{ opacity: 0, top: 0, left: 0, willChange: "transform" }}
        aria-hidden="true"
      />
    </>
  );
}
