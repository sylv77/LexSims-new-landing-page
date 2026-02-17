"use client";

import { useEffect, useRef } from "react";
import { type MotionValue } from "framer-motion";

const PARTICLE_COUNT = 300;
const CONNECTION_DIST = 55;

// Per-slide accent colors (r,g,b) — aurora earth tones
const SLIDE_COLORS: [number, number, number][] = [
  [180, 165, 175], // dusty mauve — synthetic minds
  [155, 170, 140], // sage green — world building
  [185, 160, 130], // warm amber — signal extraction
  [170, 155, 170], // soft lavender — compounding precision
];

interface Particle {
  x: number;
  y: number;
  tx: number; // target x
  ty: number; // target y
  brightness: number;
  tBrightness: number;
  size: number;
  tSize: number;
  phase: number;
  isSignal: boolean;
  cluster: number; // 0-4
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function generateParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * Math.min(w, h) * 0.4;
    return {
      x: w / 2 + Math.cos(angle) * dist,
      y: h / 2 + Math.sin(angle) * dist,
      tx: w / 2 + Math.cos(angle) * dist,
      ty: h / 2 + Math.sin(angle) * dist,
      brightness: 0.15 + Math.random() * 0.2,
      tBrightness: 0.2,
      size: 1.5 + Math.random() * 1.5,
      tSize: 1.5,
      phase: Math.random() * Math.PI * 2,
      isSignal: i % 6 === 0,
      cluster: i % 5,
    };
  });
}

function setTargetsForSlide(
  particles: Particle[],
  slide: number,
  w: number,
  h: number,
  frac: number
) {
  const cx = w / 2;
  const cy = h / 2;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const idx = i / particles.length;

    switch (slide) {
      case 0: {
        // Synthetic Minds: organic clusters of "people" — scattered groups
        const clusterCenters = [
          { x: cx - w * 0.2, y: cy - h * 0.15 },
          { x: cx + w * 0.15, y: cy - h * 0.2 },
          { x: cx - w * 0.1, y: cy + h * 0.2 },
          { x: cx + w * 0.25, y: cy + h * 0.1 },
          { x: cx, y: cy },
        ];
        const c = clusterCenters[p.cluster];
        const spread = 60 + Math.random() * 40;
        p.tx = c.x + (Math.cos(p.phase * 3) * spread);
        p.ty = c.y + (Math.sin(p.phase * 2.7) * spread);
        p.tBrightness = 0.25 + Math.random() * 0.35;
        p.tSize = 1.8 + Math.random() * 1.2;
        break;
      }
      case 1: {
        // World Building: expand into a wide grid — structured world
        const cols = Math.ceil(Math.sqrt(particles.length * (w / h)));
        const rows = Math.ceil(particles.length / cols);
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cellW = (w * 0.7) / cols;
        const cellH = (h * 0.7) / rows;
        p.tx = w * 0.15 + col * cellW + cellW / 2 + (Math.random() - 0.5) * 6;
        p.ty = h * 0.15 + row * cellH + cellH / 2 + (Math.random() - 0.5) * 6;
        p.tBrightness = 0.2 + Math.random() * 0.25;
        p.tSize = 1.5 + Math.random() * 0.5;
        break;
      }
      case 2: {
        // Signal Extraction: most dim out, "signal" particles glow bright
        const cols2 = Math.ceil(Math.sqrt(particles.length * (w / h)));
        const rows2 = Math.ceil(particles.length / cols2);
        const col2 = i % cols2;
        const row2 = Math.floor(i / cols2);
        const cellW2 = (w * 0.7) / cols2;
        const cellH2 = (h * 0.7) / rows2;
        p.tx = w * 0.15 + col2 * cellW2 + cellW2 / 2 + (Math.random() - 0.5) * 10;
        p.ty = h * 0.15 + row2 * cellH2 + cellH2 / 2 + (Math.random() - 0.5) * 10;
        if (p.isSignal) {
          p.tBrightness = 0.55 + Math.random() * 0.2;
          p.tSize = 2.5 + Math.random() * 1.5;
        } else {
          p.tBrightness = 0.03 + Math.random() * 0.03;
          p.tSize = 0.7;
        }
        break;
      }
      case 3: {
        // Compounding Precision: converge tightly to center
        const angle = idx * Math.PI * 2 * 8 + p.phase;
        const r = Math.pow(idx, 0.5) * Math.min(w, h) * 0.18;
        p.tx = cx + Math.cos(angle) * r;
        p.ty = cy + Math.sin(angle) * r;
        p.tBrightness = 0.35 + Math.random() * 0.5;
        p.tSize = 1.5 + (1 - idx) * 2;
        break;
      }
    }
  }
}

export default function SimulationBackground({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const prevSlideRef = useRef(-1);

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

      if (particlesRef.current.length === 0) {
        particlesRef.current = generateParticles(PARTICLE_COUNT, rect.width, rect.height);
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
      const slideIndex = Math.min(Math.floor(sf), 3);
      const slideFrac = smoothstep(Math.min(sf - Math.floor(sf), 1));
      const particles = particlesRef.current;

      // Update targets when slide changes
      if (slideIndex !== prevSlideRef.current) {
        prevSlideRef.current = slideIndex;
        setTargetsForSlide(particles, slideIndex, w, h, slideFrac);
      }

      // Blend between current and next slide's accent color
      const nextSlide = Math.min(slideIndex + 1, 3);
      const c0 = SLIDE_COLORS[slideIndex];
      const c1 = SLIDE_COLORS[nextSlide];
      const accentR = lerp(c0[0], c1[0], slideFrac);
      const accentG = lerp(c0[1], c1[1], slideFrac);
      const accentB = lerp(c0[2], c1[2], slideFrac);

      // --- Draw subtle background accent glow ---
      const glowGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, h * 0.5);
      glowGrad.addColorStop(0, `rgba(${accentR},${accentG},${accentB},0.04)`);
      glowGrad.addColorStop(0.5, `rgba(${accentR},${accentG},${accentB},0.02)`);
      glowGrad.addColorStop(1, `rgba(${accentR},${accentG},${accentB},0)`);
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, h * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // --- Update and draw particles ---
      const interpSpeed = 0.035;

      for (const p of particles) {
        // Smooth interpolation toward targets
        p.x += (p.tx - p.x) * interpSpeed;
        p.y += (p.ty - p.y) * interpSpeed;
        p.brightness += (p.tBrightness - p.brightness) * 0.05;
        p.size += (p.tSize - p.size) * 0.05;

        // Organic drift
        const drift = 8;
        const ox = Math.sin(time * 0.4 + p.phase) * drift;
        const oy = Math.cos(time * 0.3 + p.phase * 1.3) * drift;
        const drawX = p.x + ox;
        const drawY = p.y + oy;

        p.phase += 0.008;

        // Glow for bright particles
        if (p.brightness > 0.4) {
          const glowR = p.size * 4;
          const g = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, glowR);
          g.addColorStop(0, `rgba(${accentR},${accentG},${accentB},${p.brightness * 0.2})`);
          g.addColorStop(1, `rgba(${accentR},${accentG},${accentB},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(drawX, drawY, glowR, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core dot
        const pulse = Math.sin(time * 1.5 + p.phase) * 0.1 + 1;
        const r = p.size * pulse;
        ctx.fillStyle = `rgba(${lerp(200, accentR, 0.3)},${lerp(195, accentG, 0.3)},${lerp(240, accentB, 0.3)},${p.brightness})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Connections (visible in slides 0, 1, 3) ---
      const connAlpha = slideIndex === 2 ? Math.max(0, 0.3 - slideFrac * 0.3) : 0.6;

      if (connAlpha > 0.01) {
        ctx.lineWidth = 0.4;
        for (let i = 0; i < particles.length; i++) {
          if (particles[i].brightness < 0.15) continue;
          for (let j = i + 1; j < particles.length; j++) {
            if (particles[j].brightness < 0.15) continue;
            const dx = (particles[i].x + Math.sin(time * 0.4 + particles[i].phase) * 8) -
                       (particles[j].x + Math.sin(time * 0.4 + particles[j].phase) * 8);
            const dy = (particles[i].y + Math.cos(time * 0.3 + particles[i].phase * 1.3) * 8) -
                       (particles[j].y + Math.cos(time * 0.3 + particles[j].phase * 1.3) * 8);
            const d = dx * dx + dy * dy;
            if (d < CONNECTION_DIST * CONNECTION_DIST) {
              const dist = Math.sqrt(d);
              const a =
                (1 - dist / CONNECTION_DIST) *
                connAlpha *
                0.15 *
                Math.min(particles[i].brightness, particles[j].brightness, 1);
              ctx.strokeStyle = `rgba(${accentR},${accentG},${accentB},${a})`;
              ctx.beginPath();
              ctx.moveTo(
                particles[i].x + Math.sin(time * 0.4 + particles[i].phase) * 8,
                particles[i].y + Math.cos(time * 0.3 + particles[i].phase * 1.3) * 8
              );
              ctx.lineTo(
                particles[j].x + Math.sin(time * 0.4 + particles[j].phase) * 8,
                particles[j].y + Math.cos(time * 0.3 + particles[j].phase * 1.3) * 8
              );
              ctx.stroke();
            }
          }
        }
      }

      // --- Signal trace lines (slide 2) ---
      if (slideIndex === 2) {
        ctx.lineWidth = 0.6;
        for (const p of particles) {
          if (!p.isSignal || p.brightness < 0.4) continue;
          const px = p.x + Math.sin(time * 0.4 + p.phase) * 8;
          const py = p.y + Math.cos(time * 0.3 + p.phase * 1.3) * 8;
          for (const o of particles) {
            if (o === p || o.isSignal) continue;
            const ox = o.x + Math.sin(time * 0.4 + o.phase) * 8;
            const oy = o.y + Math.cos(time * 0.3 + o.phase * 1.3) * 8;
            const dx = px - ox;
            const dy = py - oy;
            const d = dx * dx + dy * dy;
            const maxD = CONNECTION_DIST * 2.5;
            if (d < maxD * maxD) {
              const dist = Math.sqrt(d);
              const a = (1 - dist / maxD) * 0.12 * p.brightness;
              ctx.strokeStyle = `rgba(${accentR},${accentG},${accentB},${a})`;
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(ox, oy);
              ctx.stroke();
            }
          }
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [scrollProgress]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}
