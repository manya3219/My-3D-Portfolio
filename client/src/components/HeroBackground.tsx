import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  targetOpacity: number;
}

interface GeometricLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
  speed: number;
  phase: number;
  color: string;
}

const GRID_SPACING = 60;
const MOUSE_RADIUS = 180;
const MOUSE_REPEL_STRENGTH = 0.08;
const LINE_COUNT = 12;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let dots: Dot[] = [];
    let lines: GeometricLine[] = [];
    let width = 0;
    let height = 0;

    const buildGrid = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;

      dots = [];
      const cols = Math.ceil(width / GRID_SPACING) + 1;
      const rows = Math.ceil(height / GRID_SPACING) + 1;
      const offsetX = (width % GRID_SPACING) / 2;
      const offsetY = (height % GRID_SPACING) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = offsetX + c * GRID_SPACING;
          const by = offsetY + r * GRID_SPACING;
          dots.push({
            x: bx,
            y: by,
            baseX: bx,
            baseY: by,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.2 + 0.4,
            opacity: Math.random() * 0.25 + 0.05,
            targetOpacity: Math.random() * 0.25 + 0.05,
          });
        }
      }

      // Geometric lines — diagonal, slow-moving
      lines = [];
      const colors = [
        "rgba(34,211,238,",   // cyan
        "rgba(168,85,247,",   // purple
        "rgba(34,211,238,",
      ];
      for (let i = 0; i < LINE_COUNT; i++) {
        const isHorizontal = i % 3 === 0;
        lines.push({
          x1: isHorizontal ? 0 : Math.random() * width,
          y1: isHorizontal ? Math.random() * height : 0,
          x2: isHorizontal ? width : Math.random() * width,
          y2: isHorizontal ? Math.random() * height : height,
          opacity: 0,
          speed: 0.0003 + Math.random() * 0.0004,
          phase: Math.random() * Math.PI * 2,
          color: colors[i % colors.length],
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onResize = () => {
      buildGrid();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    buildGrid();

    const draw = () => {
      if (!ctx) return;
      timeRef.current += 1;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw geometric lines first (background layer)
      lines.forEach((line) => {
        if (isReducedMotion) {
          line.opacity = 0.04;
        } else {
          const pulse = Math.sin(t * line.speed * 1000 + line.phase) * 0.5 + 0.5;
          line.opacity = lerp(line.opacity, pulse * 0.07, 0.02);
        }
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `${line.color}${line.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw dots
      dots.forEach((dot) => {
        if (!isReducedMotion) {
          const dx = mx - dot.baseX;
          const dy = my - dot.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_RADIUS) {
            const force = (1 - dist / MOUSE_RADIUS) * MOUSE_REPEL_STRENGTH;
            dot.vx -= (dx / dist) * force * 12;
            dot.vy -= (dy / dist) * force * 12;
            dot.targetOpacity = 0.7 - (dist / MOUSE_RADIUS) * 0.5;
          } else {
            dot.targetOpacity = Math.sin(t * 0.012 + dot.baseX * 0.02 + dot.baseY * 0.02) * 0.12 + 0.1;
          }

          // Spring back to base
          dot.vx += (dot.baseX - dot.x) * 0.06;
          dot.vy += (dot.baseY - dot.y) * 0.06;
          dot.vx *= 0.82;
          dot.vy *= 0.82;
          dot.x += dot.vx;
          dot.y += dot.vy;
          dot.opacity = lerp(dot.opacity, dot.targetOpacity, 0.06);
        } else {
          dot.opacity = 0.1;
        }

        // Connect nearby dots to cursor area
        if (!isReducedMotion) {
          const dx = mx - dot.x;
          const dy = my - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_RADIUS * 0.6) {
            const alpha = (1 - dist / (MOUSE_RADIUS * 0.6)) * 0.15;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${dot.opacity})`;
        ctx.fill();
      });

      // Scanline effect — very subtle horizontal line sweeping down
      if (!isReducedMotion) {
        const scanY = ((t * 0.3) % (height + 40)) - 20;
        const scanGrad = ctx.createLinearGradient(0, scanY - 8, 0, scanY + 8);
        scanGrad.addColorStop(0, "rgba(34,211,238,0)");
        scanGrad.addColorStop(0.5, "rgba(34,211,238,0.025)");
        scanGrad.addColorStop(1, "rgba(34,211,238,0)");
        ctx.fillStyle = scanGrad;
        ctx.fillRect(0, scanY - 8, width, 16);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.65 }}
    />
  );
}
