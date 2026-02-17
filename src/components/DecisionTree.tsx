"use client";

import { useEffect, useRef } from "react";

// ─── Config ─────────────────────────────────────────────────
const SIGNAL_SPAWN_MS = 1800;
const MAX_SIGNALS = 3;
const SIGNAL_SPEED = 0.013;
const EDGE_GLOW_DECAY = 0.012;
const NODE_GLOW_DECAY = 0.016;
const PARALLAX_PX = 8;
const LERP = 0.05;
const PARTICLE_COUNT = 35;
const RIPPLE_MAX_MS = 1000;

// Warm palette matching site aesthetic
const DIM = [55, 52, 48] as const;
const WARM = [140, 126, 105] as const;
const BRIGHT = [170, 155, 130] as const;

// ─── Tree Data ──────────────────────────────────────────────
interface TNode {
  x: number;
  y: number;
  depth: number;
  size: number;
}

const NODES: TNode[] = [
  // L0 — Root
  { x: 0.10, y: 0.50, depth: 0, size: 6 },
  // L1
  { x: 0.28, y: 0.18, depth: 1, size: 5 },
  { x: 0.28, y: 0.50, depth: 1, size: 5 },
  { x: 0.28, y: 0.82, depth: 1, size: 5 },
  // L2
  { x: 0.46, y: 0.08, depth: 2, size: 4 },
  { x: 0.46, y: 0.26, depth: 2, size: 4 },
  { x: 0.46, y: 0.42, depth: 2, size: 4 },
  { x: 0.46, y: 0.58, depth: 2, size: 4 },
  { x: 0.46, y: 0.74, depth: 2, size: 4 },
  { x: 0.46, y: 0.92, depth: 2, size: 4 },
  // L3
  { x: 0.66, y: 0.12, depth: 3, size: 3.5 },
  { x: 0.66, y: 0.30, depth: 3, size: 3.5 },
  { x: 0.66, y: 0.50, depth: 3, size: 4.5 },
  { x: 0.66, y: 0.68, depth: 3, size: 3.5 },
  { x: 0.66, y: 0.88, depth: 3, size: 4 },
  // L4 — Leaves
  { x: 0.86, y: 0.20, depth: 4, size: 3.5 },
  { x: 0.86, y: 0.42, depth: 4, size: 4 },
  { x: 0.86, y: 0.62, depth: 4, size: 3.5 },
  { x: 0.86, y: 0.82, depth: 4, size: 3.5 },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3],
  [1, 4], [1, 5],
  [2, 6], [2, 7],
  [3, 8], [3, 9],
  [4, 10],
  [5, 11],
  [6, 12], [7, 12],
  [7, 13],
  [8, 14], [9, 14],
  [10, 15], [11, 15],
  [12, 16],
  [13, 17], [14, 17],
  [14, 18],
];

// Adjacency: node → outgoing edge indices
const ADJ: number[][] = NODES.map(() => []);
EDGES.forEach(([from], i) => ADJ[from].push(i));

// Convergence nodes (receive 2+ incoming edges)
const CONVERGE = new Set<number>();
const inCount = new Uint8Array(NODES.length);
EDGES.forEach(([, to]) => { inCount[to]++; });
inCount.forEach((c, i) => { if (c > 1) CONVERGE.add(i); });

// Leaf labels
const LABELS: Record<number, string> = {
  15: "Verdict",
  16: "Settlement",
  17: "Ruling",
  18: "Resolved",
};

// ─── Bezier Helper ──────────────────────────────────────────
function bezierPt(
  t: number,
  x0: number, y0: number,
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
): [number, number] {
  const m = 1 - t;
  const m2 = m * m;
  const m3 = m2 * m;
  const t2 = t * t;
  const t3 = t2 * t;
  return [
    m3 * x0 + 3 * m2 * t * x1 + 3 * m * t2 * x2 + t3 * x3,
    m3 * y0 + 3 * m2 * t * y1 + 3 * m * t2 * y2 + t3 * y3,
  ];
}

// ─── Component ──────────────────────────────────────────────
export default function DecisionTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseInRef = useRef(false);
  const tiltRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const lastSpawnRef = useRef(0);

  // Animation state — persistent across frames
  const signalsRef = useRef<{ edge: number; t: number; speed: number }[]>([]);
  const edgeGlowRef = useRef(new Float32Array(EDGES.length));
  const nodeGlowRef = useRef(new Float32Array(NODES.length));
  const ripplesRef = useRef<{ node: number; age: number; max: number }[]>([]);
  const particlesRef = useRef<{
    x: number; y: number; vx: number; vy: number;
    r: number; o: number; phase: number;
  }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    // Init particles once
    if (particlesRef.current.length === 0) {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.00025,
        vy: (Math.random() - 0.5) * 0.00018,
        r: 0.6 + Math.random() * 1.4,
        o: 0.02 + Math.random() * 0.05,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = rect.width;
      h = rect.height;
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
      mouseInRef.current = true;
    }

    function onMouseLeave() {
      mouseInRef.current = false;
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    // ─── Spawn signal from root ───
    function spawn() {
      if (signalsRef.current.length >= MAX_SIGNALS) return;
      const out = ADJ[0];
      if (!out.length) return;
      signalsRef.current.push({
        edge: out[Math.floor(Math.random() * out.length)],
        t: 0,
        speed: SIGNAL_SPEED + (Math.random() - 0.5) * 0.004,
      });
      nodeGlowRef.current[0] = Math.max(nodeGlowRef.current[0], 0.8);
    }

    // ─── Edge bezier control points ───
    function edgeCPs(fi: number, ti: number, pos: { x: number; y: number }[]) {
      const f = pos[fi];
      const t = pos[ti];
      const dx = t.x - f.x;
      return { x1: f.x + dx * 0.4, y1: f.y, x2: t.x - dx * 0.4, y2: t.y };
    }

    // ─── Draw bezier edge ───
    function drawEdge(
      ctx: CanvasRenderingContext2D,
      from: { x: number; y: number },
      to: { x: number; y: number },
      cp: { x1: number; y1: number; x2: number; y2: number },
    ) {
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.bezierCurveTo(cp.x1, cp.y1, cp.x2, cp.y2, to.x, to.y);
      ctx.stroke();
    }

    // ─── Animation loop ───
    function animate() {
      if (!ctx || !w) { frameRef.current = requestAnimationFrame(animate); return; }

      const dt = 16;
      timeRef.current += dt;
      const time = timeRef.current;

      // Mouse parallax (smooth lerp)
      const tx = mouseInRef.current ? (mouseRef.current.y - 0.5) * 0.3 : 0;
      const ty = mouseInRef.current ? (mouseRef.current.x - 0.5) * 0.3 : 0;
      tiltRef.current.x += (tx - tiltRef.current.x) * LERP;
      tiltRef.current.y += (ty - tiltRef.current.y) * LERP;
      const px = tiltRef.current.y * PARALLAX_PX;
      const py = tiltRef.current.x * PARALLAX_PX;

      // Subtle warmth shift
      const warmShift = Math.sin(time * 0.0004) * 8;
      const wr = WARM[0] + warmShift;
      const wg = WARM[1] + warmShift * 0.5;
      const wb = WARM[2];
      const br = BRIGHT[0] + warmShift;
      const bg = BRIGHT[1] + warmShift * 0.5;
      const bb = BRIGHT[2];

      // Node positions (with parallax + organic drift)
      const pad = w * 0.06;
      const tw = w - pad * 2;
      const th = h - pad * 2;
      const pos = NODES.map((n, i) => ({
        x: pad + n.x * tw + px * (1 + n.depth * 0.3) + Math.sin(time * 0.0008 + i * 1.7) * 1.5,
        y: pad + n.y * th + py * (1 + n.depth * 0.3) + Math.cos(time * 0.001 + i * 2.3) * 1.2,
      }));

      ctx.clearRect(0, 0, w, h);

      // ─── Background haze ───
      const bgG = ctx.createRadialGradient(w * 0.35, h * 0.5, 0, w * 0.35, h * 0.5, w * 0.55);
      bgG.addColorStop(0, `rgba(${wr}, ${wg}, ${wb}, 0.018)`);
      bgG.addColorStop(1, `rgba(${wr}, ${wg}, ${wb}, 0)`);
      ctx.fillStyle = bgG;
      ctx.fillRect(0, 0, w, h);

      // ─── Ambient particles ───
      const particles = particlesRef.current;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.008;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.fillStyle = `rgba(${wr}, ${wg}, ${wb}, ${p.o * (0.7 + Math.sin(p.phase) * 0.3)})`;
        ctx.beginPath();
        ctx.arc(p.x * w + px * 0.5, p.y * h + py * 0.5, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ─── Edges ───
      const eg = edgeGlowRef.current;
      for (let i = 0; i < EDGES.length; i++) {
        const [fi, ti] = EDGES[i];
        const from = pos[fi];
        const to = pos[ti];
        const cp = edgeCPs(fi, ti, pos);
        const g = eg[i];

        // Dormant edge
        const a = 0.07 + g * 0.4;
        const r = g > 0.1 ? wr : DIM[0];
        const gn = g > 0.1 ? wg : DIM[1];
        const b = g > 0.1 ? wb : DIM[2];
        ctx.strokeStyle = `rgba(${r}, ${gn}, ${b}, ${a})`;
        ctx.lineWidth = 0.8 + g * 1.5;
        drawEdge(ctx, from, to, cp);

        // Bloom on active edges
        if (g > 0.15) {
          ctx.strokeStyle = `rgba(${br}, ${bg}, ${bb}, ${g * 0.1})`;
          ctx.lineWidth = 4 + g * 5;
          drawEdge(ctx, from, to, cp);
        }

        eg[i] = Math.max(0, g - EDGE_GLOW_DECAY);
      }

      // ─── Nodes ───
      const ng = nodeGlowRef.current;
      for (let i = 0; i < NODES.length; i++) {
        const n = NODES[i];
        const p = pos[i];
        const g = ng[i];
        const sz = n.size + g * 3;

        // Outer glow
        if (g > 0.05) {
          const rad = sz * 5;
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
          grad.addColorStop(0, `rgba(${wr}, ${wg}, ${wb}, ${g * 0.3})`);
          grad.addColorStop(0.5, `rgba(${wr}, ${wg}, ${wb}, ${g * 0.06})`);
          grad.addColorStop(1, `rgba(${wr}, ${wg}, ${wb}, 0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
          ctx.fill();
        }

        // Ring
        ctx.strokeStyle = `rgba(${DIM[0]}, ${DIM[1]}, ${DIM[2]}, ${0.1 + g * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz * 1.8, 0, Math.PI * 2);
        ctx.stroke();

        // Second ring for convergence nodes
        if (CONVERGE.has(i)) {
          ctx.strokeStyle = `rgba(${DIM[0]}, ${DIM[1]}, ${DIM[2]}, ${0.06 + g * 0.25})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, sz * 2.6, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Core fill
        const cr = g > 0.2 ? wr : DIM[0];
        const cg2 = g > 0.2 ? wg : DIM[1];
        const cb = g > 0.2 ? wb : DIM[2];
        ctx.fillStyle = `rgba(${cr}, ${cg2}, ${cb}, ${0.2 + g * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fill();

        // Bright center
        if (g > 0.3) {
          ctx.fillStyle = `rgba(${br}, ${bg}, ${bb}, ${g * 0.7})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, sz * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ng[i] = Math.max(0, g - NODE_GLOW_DECAY);
      }

      // ─── Leaf labels ───
      ctx.font = "500 10px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (const [id, label] of Object.entries(LABELS)) {
        const ni = Number(id);
        const p = pos[ni];
        const g = ng[ni];
        ctx.fillStyle = `rgba(${DIM[0]}, ${DIM[1]}, ${DIM[2]}, ${0.12 + g * 0.3})`;
        ctx.fillText(label, p.x, p.y + NODES[ni].size * 2.5 + 6);
      }

      // ─── Root pulse ring ───
      const rootP = pos[0];
      const rootPulse = 0.5 + Math.sin(time * 0.002) * 0.5;
      ctx.strokeStyle = `rgba(${wr}, ${wg}, ${wb}, ${0.04 + rootPulse * 0.04})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.arc(rootP.x, rootP.y, 18 + rootPulse * 6, 0, Math.PI * 2);
      ctx.stroke();

      // ─── Signals ───
      const sigs = signalsRef.current;
      for (let si = sigs.length - 1; si >= 0; si--) {
        const sig = sigs[si];
        sig.t += sig.speed;

        const [fi, ti] = EDGES[sig.edge];
        const from = pos[fi];
        const to = pos[ti];
        const cp = edgeCPs(fi, ti, pos);

        // Keep edge lit
        eg[sig.edge] = Math.max(eg[sig.edge], 0.6);

        if (sig.t >= 1) {
          // Arrived — glow node + ripple
          const isConverging = ng[ti] > 0.3;
          ng[ti] = Math.max(ng[ti], isConverging ? 1.0 : 0.9);
          ripplesRef.current.push({
            node: ti,
            age: 0,
            max: isConverging ? 1400 : RIPPLE_MAX_MS,
          });

          // Continue or die
          const out = ADJ[ti];
          if (out.length > 0) {
            sig.edge = out[Math.floor(Math.random() * out.length)];
            sig.t = 0;
          } else {
            sigs.splice(si, 1);
          }
          continue;
        }

        // Draw trail
        const trailSteps = 10;
        const trailLen = 0.3;
        for (let ti2 = 0; ti2 < trailSteps; ti2++) {
          const tt = sig.t - trailLen * (ti2 + 1) / trailSteps;
          if (tt < 0) continue;
          const [tx, ty] = bezierPt(tt, from.x, from.y, cp.x1, cp.y1, cp.x2, cp.y2, to.x, to.y);
          const fade = 1 - ti2 / trailSteps;
          ctx.fillStyle = `rgba(${wr}, ${wg}, ${wb}, ${0.35 * fade * fade})`;
          ctx.beginPath();
          ctx.arc(tx, ty, 1.5 * fade, 0, Math.PI * 2);
          ctx.fill();
        }

        // Head position
        const [hx, hy] = bezierPt(sig.t, from.x, from.y, cp.x1, cp.y1, cp.x2, cp.y2, to.x, to.y);

        // Head bloom
        const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 18);
        hg.addColorStop(0, `rgba(${br}, ${bg}, ${bb}, 0.55)`);
        hg.addColorStop(0.3, `rgba(${wr}, ${wg}, ${wb}, 0.15)`);
        hg.addColorStop(1, `rgba(${wr}, ${wg}, ${wb}, 0)`);
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(hx, hy, 18, 0, Math.PI * 2);
        ctx.fill();

        // Bright core
        ctx.fillStyle = `rgba(${br}, ${bg}, ${bb}, 0.85)`;
        ctx.beginPath();
        ctx.arc(hx, hy, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ─── Ripples ───
      const rips = ripplesRef.current;
      for (let ri = rips.length - 1; ri >= 0; ri--) {
        const rip = rips[ri];
        rip.age += dt;
        if (rip.age >= rip.max) { rips.splice(ri, 1); continue; }

        const p = pos[rip.node];
        const prog = rip.age / rip.max;
        const radius = 8 + prog * 30;
        const alpha = (1 - prog) * 0.3;

        ctx.strokeStyle = `rgba(${wr}, ${wg}, ${wb}, ${alpha})`;
        ctx.lineWidth = 1.2 * (1 - prog);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Second ripple ring (offset timing) for convergence arrivals
        if (rip.max > RIPPLE_MAX_MS) {
          const prog2 = Math.max(0, (rip.age - 120) / rip.max);
          if (prog2 > 0 && prog2 < 1) {
            const r2 = 6 + prog2 * 35;
            const a2 = (1 - prog2) * 0.2;
            ctx.strokeStyle = `rgba(${br}, ${bg}, ${bb}, ${a2})`;
            ctx.lineWidth = 0.8 * (1 - prog2);
            ctx.beginPath();
            ctx.arc(p.x, p.y, r2, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      // ─── Spawn timer ───
      if (time - lastSpawnRef.current > SIGNAL_SPAWN_MS) {
        lastSpawnRef.current = time;
        spawn();
      }

      frameRef.current = requestAnimationFrame(animate);
    }

    // Kick off with a signal quickly
    lastSpawnRef.current = timeRef.current - SIGNAL_SPAWN_MS + 300;
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
