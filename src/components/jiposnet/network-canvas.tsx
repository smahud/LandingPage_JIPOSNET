"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type NetNode = { x: number; y: number; vx: number; vy: number; r: number };
type DataParticle = { a: number; b: number; t: number; speed: number; size: number };

/**
 * Live network mesh: drifting nodes, distance-based links, and cyan data
 * particles that travel along the links — the "digital gateway" motif.
 * Pauses when off-screen or when the tab is hidden. Static single frame
 * when the user prefers reduced motion.
 */
export function NetworkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LINK_DIST = 155;
    const MOUSE_DIST = 170;

    let width = 0;
    let height = 0;
    let nodes: NetNode[] = [];
    let particles: DataParticle[] = [];
    let raf = 0;
    let inView = true;
    let tabVisible = !document.hidden;
    const mouse = { x: -9999, y: -9999 };

    const pickEdge = (): [number, number] => {
      const n = nodes.length;
      for (let tries = 0; tries < 12; tries++) {
        const a = Math.floor(Math.random() * n);
        for (let b = 0; b < n; b++) {
          if (b === a) continue;
          const dx = nodes[a].x - nodes[b].x;
          const dy = nodes[a].y - nodes[b].y;
          if (Math.hypot(dx, dy) < LINK_DIST) return [a, b];
        }
      }
      return [0, Math.min(1, n - 1)];
    };

    const spawn = (): DataParticle => {
      const [a, b] = pickEdge();
      return {
        a,
        b,
        t: Math.random(),
        speed: 0.0035 + Math.random() * 0.007,
        size: 1.1 + Math.random() * 1.5,
      };
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(26, Math.min(78, Math.floor((width * height) / 24000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: 1 + Math.random() * 1.5,
      }));
      particles = Array.from({ length: Math.min(24, Math.floor(count / 3)) }, spawn);
    };

    const frame = () => {
      ctx.clearRect(0, 0, width, height);

      /* Move nodes with gentle drift */
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      /* Links */
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.24;
            ctx.strokeStyle = `rgba(0, 190, 255, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      /* Nodes — brighter near the pointer */
      for (const n of nodes) {
        const md = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const near = md < MOUSE_DIST;
        const alpha = near ? 0.95 : 0.62;
        ctx.fillStyle = near
          ? `rgba(0, 226, 255, ${alpha})`
          : `rgba(130, 190, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, near ? n.r + 0.6 : n.r, 0, Math.PI * 2);
        ctx.fill();

        if (near) {
          ctx.strokeStyle = `rgba(0, 212, 255, ${(1 - md / MOUSE_DIST) * 0.3})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      /* Data particles gliding along links */
      for (const p of particles) {
        const A = nodes[p.a];
        const B = nodes[p.b];
        if (!A || !B) continue;
        const x = A.x + (B.x - A.x) * p.t;
        const y = A.y + (B.y - A.y) * p.t;

        ctx.fillStyle = "rgba(0, 212, 255, 0.16)";
        ctx.beginPath();
        ctx.arc(x, y, p.size * 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(140, 240, 255, 0.95)";
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.t += p.speed;
        if (p.t >= 1) {
          p.t = 0;
          [p.a, p.b] = pickEdge();
          p.speed = 0.0035 + Math.random() * 0.007;
        }
      }
    };

    const loop = () => {
      if (inView && tabVisible) frame();
      raf = requestAnimationFrame(loop);
    };

    const drawStatic = () => frame();

    /* --- listeners ------------------------------------------------ */
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 160);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => {
      tabVisible = !document.hidden;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    io.observe(canvas);

    build();
    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("resize", onResize);
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none h-full w-full", className)}
    />
  );
}

/* ── Animated WiFi waves (sequential arcs + expanding rings) ─────────── */

export function WifiWaves({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex items-center justify-center", className)}>
      {/* Expanding wave rings */}
      <span className="animate-wifi-wave absolute inset-[-14px] rounded-full border border-jipo-cyan/50" />
      <span
        className="animate-wifi-wave absolute inset-[-14px] rounded-full border border-jipo-cyan/35"
        style={{ animationDelay: "1.3s" }}
      />

      {/* Sequential arcs */}
      <svg viewBox="0 0 24 24" fill="none" className="relative h-full w-full text-jipo-cyan" aria-hidden="true">
        <path
          d="M4.5 9.5a11 11 0 0 1 15 0"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          className="animate-wifi-arc"
        />
        <path
          d="M7.6 13a6.6 6.6 0 0 1 8.8 0"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          className="animate-wifi-arc"
          style={{ animationDelay: "0.22s" }}
        />
        <path
          d="M10.6 16.4a2.3 2.3 0 0 1 2.8 0"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinecap="round"
          className="animate-wifi-arc"
          style={{ animationDelay: "0.44s" }}
        />
        <circle cx="12" cy="19.6" r="1.5" fill="currentColor" />
      </svg>
    </span>
  );
}
