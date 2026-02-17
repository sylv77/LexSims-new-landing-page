"use client";

import { useEffect, useRef } from "react";
import { type MotionValue } from "framer-motion";

const PARTICLE_COUNT = 180;
const CONNECTION_DIST = 65;

interface ParticleTargets {
  x: number;
  y: number;
  brightness: number;
  size: number;
}

interface Particle {
  x: number;
  y: number;
  brightness: number;
  size: number;
  phase: number;
  isSignal: boolean;
  targets: ParticleTargets[];
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function generateTargets(
  count: number,
  w: number,
  h: number
): ParticleTargets[][] {
  const clusters = Array.from({ length: 5 }, () => ({
    x: w * 0.2 + Math.random() * w * 0.6,
    y: h * 0.2 + Math.random() * h * 0.6,
  }));

  const cols = Math.ceil(Math.sqrt(count * (w / h)));
  const rows = Math.ceil(count / cols);
  const cellW = (w * 0.6) / cols;
  const cellH = (h * 0.6) / rows;
  const gx = w * 0.2;
  const gy = h * 0.2;

  return Array.from({ length: count }, (_, i) => {
    const isSignal = i % 5 === 0;
    const cluster = clusters[i % clusters.length];
    const col = i % cols;
    const row = Math.floor(i / cols);

    // State 0: organic drift
    const s0: ParticleTargets = {
      x: cluster.x + (Math.random() - 0.5) * 140,
      y: cluster.y + (Math.random() - 0.5) * 140,
      brightness: 0.2 + Math.random() * 0.4,
      size: 1.5 + Math.random() * 2,
    };

    // State 1: grid network
    const s1: ParticleTargets = {
      x: gx + col * cellW + cellW / 2 + (Math.random() - 0.5) * 4,
      y: gy + row * cellH + cellH / 2 + (Math.random() - 0.5) * 4,
      brightness: 0.3 + Math.random() * 0.3,
      size: 2,
    };

    // State 2: signal extraction
    const s2: ParticleTargets = {
      x: gx + col * cellW + cellW / 2 + (Math.random() - 0.5) * 8,
      y: gy + row * cellH + cellH / 2 + (Math.random() - 0.5) * 8,
      brightness: isSignal ? 1.0 : 0.06,
      size: isSignal ? 3.5 : 1.2,
    };

    // State 3: dense convergence
    const angle = Math.random() * Math.PI * 2;
    const r = Math.pow(Math.random(), 0.6) * Math.min(w, h) * 0.22;
    const s3: ParticleTargets = {
      x: w / 2 + Math.cos(angle) * r,
      y: h / 2 + Math.sin(angle) * r,
      brightness: 0.4 + Math.random() * 0.6,
      size: 1.8 + Math.random() * 1.5,
    };

    return [s0, s1, s2, s3];
  });
}

export default function ParticleField({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w: rect.width, h: rect.height };

      const targets = generateTargets(PARTICLE_COUNT, rect.width, rect.height);

      if (particlesRef.current.length === 0) {
        particlesRef.current = targets.map((t) => ({
          x: t[0].x,
          y: t[0].y,
          brightness: t[0].brightness,
          size: t[0].size,
          phase: Math.random() * Math.PI * 2,
          isSignal: t[2].brightness > 0.5,
          targets: t,
        }));
      } else {
        particlesRef.current.forEach((p, i) => {
          if (targets[i]) p.targets = targets[i];
        });
      }
    }

    resize();
    window.addEventListener("resize", resize);

    let time = 0;

    function animate() {
      const { w, h } = sizeRef.current;
      if (!ctx || !w) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const progress = scrollProgress.get();
      const sf = progress * 3; // 0..3
      const si = Math.min(Math.floor(sf), 2);
      const frac = smoothstep(Math.min(sf - si, 1));
      const particles = particlesRef.current;

      // Update positions
      for (const p of particles) {
        const from = p.targets[si];
        const to = p.targets[Math.min(si + 1, 3)];

        const tx = lerp(from.x, to.x, frac);
        const ty = lerp(from.y, to.y, frac);
        const tb = lerp(from.brightness, to.brightness, frac);
        const ts = lerp(from.size, to.size, frac);

        // Organic drift strongest in state 0, fading out
        const drift = Math.max(0, 1 - sf * 0.8) * 20;
        const ox = Math.sin(time * 0.5 + p.phase) * drift;
        const oy = Math.cos(time * 0.35 + p.phase * 1.3) * drift;

        p.x += (tx + ox - p.x) * 0.045;
        p.y += (ty + oy - p.y) * 0.045;
        p.brightness += (tb - p.brightness) * 0.06;
        p.size += (ts - p.size) * 0.06;
        p.phase += 0.015;
      }

      // Connection opacity: fade in during state 1, out during state 3
      const connAlpha =
        sf < 0.6 ? 0 : sf < 1.0 ? (sf - 0.6) * 2.5 : sf < 2.5 ? 1 : Math.max(0, (3 - sf) * 2);

      // Draw connections
      if (connAlpha > 0.01) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const d = dx * dx + dy * dy;
            if (d < CONNECTION_DIST * CONNECTION_DIST) {
              const dist = Math.sqrt(d);
              const a =
                (1 - dist / CONNECTION_DIST) *
                connAlpha *
                0.12 *
                Math.min(particles[i].brightness, particles[j].brightness, 1);
              ctx.strokeStyle = `rgba(102,97,184,${a})`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Signal trace lines (state 2 region)
      const traceAlpha =
        sf < 1.5 ? 0 : sf < 2.0 ? (sf - 1.5) * 2 : sf < 2.6 ? 1 : Math.max(0, (3 - sf) * 2.5);

      if (traceAlpha > 0.01) {
        ctx.lineWidth = 0.7;
        for (const p of particles) {
          if (!p.isSignal || p.brightness < 0.4) continue;
          for (const o of particles) {
            if (o === p || o.isSignal) continue;
            const dx = p.x - o.x;
            const dy = p.y - o.y;
            const d = dx * dx + dy * dy;
            const maxD = CONNECTION_DIST * 1.8;
            if (d < maxD * maxD) {
              const dist = Math.sqrt(d);
              const a = (1 - dist / maxD) * traceAlpha * 0.15;
              ctx.strokeStyle = `rgba(170,160,240,${a})`;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(o.x, o.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const pulse = Math.sin(time * 2 + p.phase) * 0.15 + 1;
        const r = p.size * pulse;

        // Glow for bright particles
        if (p.brightness > 0.5) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
          g.addColorStop(0, `rgba(140,130,220,${p.brightness * 0.25})`);
          g.addColorStop(1, "rgba(140,130,220,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core
        ctx.fillStyle = `rgba(200,195,240,${p.brightness})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
