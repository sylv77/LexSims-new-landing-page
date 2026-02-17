"use client";

import { useEffect, useRef, useCallback } from "react";

// --- Config ---
const DOT_COUNT = 900;
const GLOBE_RADIUS_RATIO = 0.44;
const AUTO_ROTATE_SPEED = 0.0035;
const MOUSE_TILT_STRENGTH = 0.3;
const ARC_INTERVAL = 2200;
const MAX_ARCS = 6;
const HOTSPOT_COUNT = 8;
const RIPPLE_DURATION = 1500;
const COLOR_CYCLE_SPEED = 0.00008; // slow transition

// Charcoal & warm palette [r, g, b] — charcoal cycling through warm bronze tones
const AURORA_PALETTE: [number, number, number][] = [
  [45, 45, 45],     // charcoal (primary)
  [65, 65, 65],     // medium gray
  [90, 85, 80],     // warm gray
  [130, 120, 105],  // warm bronze
  [85, 75, 65],     // warm dark brown
];

function lerpColor(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function getAuroraColor(time: number): {
  core: [number, number, number];
  bright: [number, number, number];
  dim: [number, number, number];
} {
  const t = (time * COLOR_CYCLE_SPEED) % 1;
  const count = AURORA_PALETTE.length;
  const segment = t * count;
  const idx = Math.floor(segment) % count;
  const frac = segment - Math.floor(segment);
  const next = (idx + 1) % count;

  const base = lerpColor(AURORA_PALETTE[idx], AURORA_PALETTE[next], frac);
  // Brighter variant for highlights
  const bright: [number, number, number] = [
    Math.min(255, base[0] + 50),
    Math.min(255, base[1] + 45),
    Math.min(255, base[2] + 30),
  ];
  // Dimmer variant for atmosphere
  const dim: [number, number, number] = [
    base[0] * 0.7,
    base[1] * 0.7,
    base[2] * 0.7,
  ];

  return { core: base, bright, dim };
}

// --- Types ---
interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Arc {
  from: Vec3;
  to: Vec3;
  progress: number;
  speed: number;
  opacity: number;
}

interface Ripple {
  point: Vec3;
  age: number; // ms
  maxAge: number;
}

interface Hotspot {
  point: Vec3;
  phase: number;
  pulseSpeed: number;
}

// --- Fibonacci sphere distribution ---
function fibonacciSphere(count: number): Vec3[] {
  const points: Vec3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push({
      x: Math.cos(theta) * radiusAtY,
      y,
      z: Math.sin(theta) * radiusAtY,
    });
  }
  return points;
}

// --- Rotation ---
function rotateY(p: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
}

function rotateX(p: Vec3, angle: number): Vec3 {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
}

function applyRotation(p: Vec3, rotY: number, tiltX: number, tiltY: number): Vec3 {
  let r = rotateY(p, rotY);
  r = rotateX(r, tiltX);
  r = rotateY(r, tiltY);
  return r;
}

// --- Great-circle interpolation ---
function slerp(a: Vec3, b: Vec3, t: number): Vec3 {
  const dot = a.x * b.x + a.y * b.y + a.z * b.z;
  const omega = Math.acos(Math.max(-1, Math.min(1, dot)));
  if (omega < 0.001) return { x: a.x, y: a.y, z: a.z };
  const sinOmega = Math.sin(omega);
  const wa = Math.sin((1 - t) * omega) / sinOmega;
  const wb = Math.sin(t * omega) / sinOmega;
  return { x: a.x * wa + b.x * wb, y: a.y * wa + b.y * wb, z: a.z * wa + b.z * wb };
}

// --- Angular distance between two unit vectors ---
function angularDist(a: Vec3, b: Vec3): number {
  return Math.acos(Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z)));
}

// --- Hotspot positions ---
function generateHotspots(): Hotspot[] {
  const positions: Vec3[] = [
    { x: -0.3, y: 0.6, z: 0.74 },
    { x: 0.5, y: 0.55, z: 0.67 },
    { x: 0.75, y: 0.3, z: -0.59 },
    { x: -0.2, y: -0.3, z: 0.93 },
    { x: 0.6, y: -0.4, z: -0.69 },
    { x: 0.4, y: 0.7, z: -0.59 },
    { x: -0.7, y: 0.1, z: 0.71 },
    { x: 0.1, y: -0.7, z: 0.71 },
  ];
  return positions.slice(0, HOTSPOT_COUNT).map((p) => ({
    point: p,
    phase: Math.random() * Math.PI * 2,
    pulseSpeed: 0.8 + Math.random() * 0.6,
  }));
}

export default function DottedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseInRef = useRef(false);
  const tiltRef = useRef({ x: 0, y: 0 });
  const dotsRef = useRef<Vec3[]>([]);
  const hotspotsRef = useRef<Hotspot[]>([]);
  const arcsRef = useRef<Arc[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const lastArcTimeRef = useRef(0);
  const rotationRef = useRef(0);

  const spawnArc = useCallback(() => {
    const hotspots = hotspotsRef.current;
    if (hotspots.length < 2) return;

    let fromIdx = Math.floor(Math.random() * hotspots.length);
    let toIdx = Math.floor(Math.random() * hotspots.length);
    while (toIdx === fromIdx) {
      toIdx = Math.floor(Math.random() * hotspots.length);
    }

    arcsRef.current.push({
      from: hotspots[fromIdx].point,
      to: hotspots[toIdx].point,
      progress: 0,
      speed: 0.006 + Math.random() * 0.008,
      opacity: 1,
    });

    if (arcsRef.current.length > MAX_ARCS) {
      arcsRef.current.shift();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    if (dotsRef.current.length === 0) {
      dotsRef.current = fibonacciSphere(DOT_COUNT);
      hotspotsRef.current = generateHotspots();
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

    let time = 0;

    function animate() {
      if (!ctx || !w) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      const dt = 16;
      time += dt;

      // Auto-rotation
      rotationRef.current += AUTO_ROTATE_SPEED;

      // Smooth mouse tilt
      const targetTiltX = mouseInRef.current
        ? (mouseRef.current.y - 0.5) * MOUSE_TILT_STRENGTH
        : 0;
      const targetTiltY = mouseInRef.current
        ? (mouseRef.current.x - 0.5) * MOUSE_TILT_STRENGTH
        : 0;
      tiltRef.current.x += (targetTiltX - tiltRef.current.x) * 0.05;
      tiltRef.current.y += (targetTiltY - tiltRef.current.y) * 0.05;

      const radius = Math.min(w, h) * GLOBE_RADIUS_RATIO;
      const cx = w / 2;
      const cy = h / 2;
      const rot = rotationRef.current;
      const tX = tiltRef.current.x;
      const tY = tiltRef.current.y;

      // --- Aurora color for this frame ---
      const ac = getAuroraColor(time);
      const [cR, cG, cB] = ac.core;
      const [bR, bG, bB] = ac.bright;
      const [dR, dG, dB] = ac.dim;

      // --- Atmospheric glow ---
      const atmosGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.3);
      atmosGrad.addColorStop(0, `rgba(${dR},${dG},${dB},0)`);
      atmosGrad.addColorStop(0.5, `rgba(${dR},${dG},${dB},0.03)`);
      atmosGrad.addColorStop(0.75, `rgba(${cR},${cG},${cB},0.04)`);
      atmosGrad.addColorStop(1, `rgba(${dR},${dG},${dB},0)`);
      ctx.fillStyle = atmosGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // --- Compute ripple influence (for dot brightness boost) ---
      const ripples = ripplesRef.current;

      // --- Draw dots with wave animation and ripple response ---
      const dots = dotsRef.current;
      const timeSec = time / 1000;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const p = applyRotation(dot, rot, tX, tY);

        if (p.z < -0.1) continue;

        const depthFactor = (p.z + 1) / 2;
        const sx = cx + p.x * radius;
        const sy = cy - p.y * radius;

        // Wave animation: a brightness wave sweeps across the globe
        const wavePhase = timeSec * 1.2 + dot.x * 2 + dot.y * 1.5;
        const waveBrightness = Math.sin(wavePhase) * 0.08;

        // Ripple brightness boost
        let rippleBoost = 0;
        for (const rip of ripples) {
          const dist = angularDist(dot, rip.point);
          const rippleProgress = rip.age / rip.maxAge;
          const rippleRadius = rippleProgress * 1.2; // expands to ~1.2 radians
          const rippleWidth = 0.25;
          const diff = Math.abs(dist - rippleRadius);
          if (diff < rippleWidth) {
            const intensity = (1 - diff / rippleWidth) * (1 - rippleProgress);
            rippleBoost = Math.max(rippleBoost, intensity * 0.5);
          }
        }

        const baseBrightness = 0.1 + depthFactor * 0.4 + waveBrightness + rippleBoost;
        const brightness = Math.max(0.05, Math.min(1, baseBrightness));
        const size = 0.9 + depthFactor * 1.6 + rippleBoost * 2;

        // Glow for boosted dots
        if (rippleBoost > 0.15) {
          const rg = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 4);
          rg.addColorStop(0, `rgba(${cR},${cG},${cB},${rippleBoost * 0.4 * depthFactor})`);
          rg.addColorStop(1, `rgba(${cR},${cG},${cB},0)`);
          ctx.fillStyle = rg;
          ctx.beginPath();
          ctx.arc(sx, sy, size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${bR},${bG},${bB},${brightness})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Draw hotspots ---
      const hotspots = hotspotsRef.current;
      for (const hs of hotspots) {
        const p = applyRotation(hs.point, rot, tX, tY);
        if (p.z < 0) continue;

        const sx = cx + p.x * radius;
        const sy = cy - p.y * radius;
        const depthFactor = (p.z + 1) / 2;
        hs.phase += 0.016 * hs.pulseSpeed;

        const pulse = 0.5 + Math.sin(hs.phase) * 0.5;
        const glowRadius = 10 + pulse * 16;
        const glowAlpha = (0.2 + pulse * 0.35) * depthFactor;

        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowRadius);
        g.addColorStop(0, `rgba(${cR},${cG},${cB},${glowAlpha})`);
        g.addColorStop(0.4, `rgba(${cR},${cG},${cB},${glowAlpha * 0.4})`);
        g.addColorStop(1, `rgba(${cR},${cG},${cB},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(sx, sy, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        const coreAlpha = (0.7 + pulse * 0.3) * depthFactor;
        ctx.fillStyle = `rgba(${bR},${bG},${bB},${coreAlpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 3 + pulse * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Spawn arcs ---
      if (time - lastArcTimeRef.current > ARC_INTERVAL) {
        lastArcTimeRef.current = time;
        spawnArc();
      }

      // --- Update ripples ---
      for (let ri = ripples.length - 1; ri >= 0; ri--) {
        ripples[ri].age += dt;
        if (ripples[ri].age >= ripples[ri].maxAge) {
          ripples.splice(ri, 1);
        }
      }

      // --- Draw arcs ---
      const arcs = arcsRef.current;
      for (let ai = arcs.length - 1; ai >= 0; ai--) {
        const arc = arcs[ai];
        arc.progress += arc.speed;

        if (arc.progress > 0.8) {
          arc.opacity = Math.max(0, (1 - arc.progress) * 5);
        }

        if (arc.progress >= 1) {
          // Spawn ripple at destination
          ripplesRef.current.push({
            point: arc.to,
            age: 0,
            maxAge: RIPPLE_DURATION,
          });
          arcs.splice(ai, 1);
          continue;
        }

        const segments = 40;
        const trailLength = 0.35;
        const headT = arc.progress;
        const tailT = Math.max(0, headT - trailLength);

        ctx.lineWidth = 1.8;

        for (let s = 0; s < segments; s++) {
          const t0 = tailT + (headT - tailT) * (s / segments);
          const t1 = tailT + (headT - tailT) * ((s + 1) / segments);
          const mid = (t0 + t1) / 2;
          const elevation = 1 + Math.sin(mid * Math.PI) * 0.2;

          const p0raw = slerp(arc.from, arc.to, t0);
          const p1raw = slerp(arc.from, arc.to, t1);
          const p0e = { x: p0raw.x * elevation, y: p0raw.y * elevation, z: p0raw.z * elevation };
          const p1e = { x: p1raw.x * elevation, y: p1raw.y * elevation, z: p1raw.z * elevation };

          const p0 = applyRotation(p0e, rot, tX, tY);
          const p1 = applyRotation(p1e, rot, tX, tY);

          if (p0.z < -0.05 || p1.z < -0.05) continue;

          const sx0 = cx + p0.x * radius;
          const sy0 = cy - p0.y * radius;
          const sx1 = cx + p1.x * radius;
          const sy1 = cy - p1.y * radius;

          const segProgress = s / segments;
          const alpha = segProgress * arc.opacity * 0.9 * ((p0.z + p1.z) / 2 + 1) / 2;

          ctx.strokeStyle = `rgba(${cR},${cG},${cB},${alpha})`;
          ctx.beginPath();
          ctx.moveTo(sx0, sy0);
          ctx.lineTo(sx1, sy1);
          ctx.stroke();
        }

        // Head glow
        const headPoint = slerp(arc.from, arc.to, headT);
        const headElev = 1 + Math.sin(headT * Math.PI) * 0.2;
        const headP = applyRotation(
          { x: headPoint.x * headElev, y: headPoint.y * headElev, z: headPoint.z * headElev },
          rot, tX, tY
        );

        if (headP.z > -0.05) {
          const hsx = cx + headP.x * radius;
          const hsy = cy - headP.y * radius;
          const headAlpha = arc.opacity * 0.9;

          const hg = ctx.createRadialGradient(hsx, hsy, 0, hsx, hsy, 12);
          hg.addColorStop(0, `rgba(${bR},${bG},${bB},${headAlpha})`);
          hg.addColorStop(0.4, `rgba(${cR},${cG},${cB},${headAlpha * 0.5})`);
          hg.addColorStop(1, `rgba(${bR},${bG},${bB},0)`);
          ctx.fillStyle = hg;
          ctx.beginPath();
          ctx.arc(hsx, hsy, 12, 0, Math.PI * 2);
          ctx.fill();

          // Inner bright core
          ctx.fillStyle = `rgba(${Math.min(255, bR + 30)},${Math.min(255, bG + 25)},${Math.min(255, bB + 15)},${headAlpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(hsx, hsy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- Draw ripple rings on the globe surface ---
      for (const rip of ripples) {
        const progress = rip.age / rip.maxAge;
        const ringRadius = progress * 1.2; // angular radius in radians
        const ringAlpha = (1 - progress) * 0.4;
        if (ringAlpha < 0.01) continue;

        // Draw ring as series of points on the sphere at angular distance ringRadius from rip.point
        const ringSegments = 48;
        const u = { x: -rip.point.z, y: 0, z: rip.point.x };
        const uLen = Math.sqrt(u.x * u.x + u.z * u.z);
        if (uLen < 0.001) continue;
        u.x /= uLen;
        u.z /= uLen;
        // v = cross(point, u)
        const v = {
          x: rip.point.y * u.z - rip.point.z * u.y,
          y: rip.point.z * u.x - rip.point.x * u.z,
          z: rip.point.x * u.y - rip.point.y * u.x,
        };

        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `rgba(${cR},${cG},${cB},${ringAlpha})`;
        ctx.beginPath();
        let started = false;

        for (let rs = 0; rs <= ringSegments; rs++) {
          const angle = (rs / ringSegments) * Math.PI * 2;
          const sinR = Math.sin(ringRadius);
          const cosR = Math.cos(ringRadius);
          const ringPoint: Vec3 = {
            x: rip.point.x * cosR + (u.x * Math.cos(angle) + v.x * Math.sin(angle)) * sinR,
            y: rip.point.y * cosR + (u.y * Math.cos(angle) + v.y * Math.sin(angle)) * sinR,
            z: rip.point.z * cosR + (u.z * Math.cos(angle) + v.z * Math.sin(angle)) * sinR,
          };

          const rp = applyRotation(ringPoint, rot, tX, tY);
          if (rp.z < 0) {
            started = false;
            continue;
          }

          const rsx = cx + rp.x * radius;
          const rsy = cy - rp.y * radius;

          if (!started) {
            ctx.moveTo(rsx, rsy);
            started = true;
          } else {
            ctx.lineTo(rsx, rsy);
          }
        }
        ctx.stroke();
      }

      // --- Subtle outer ring ---
      ctx.strokeStyle = `rgba(${bR},${bG},${bB},0.06)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.02, 0, Math.PI * 2);
      ctx.stroke();

      frameRef.current = requestAnimationFrame(animate);
    }

    // Start with an arc quickly
    lastArcTimeRef.current = time - ARC_INTERVAL + 500;
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, [spawnArc]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}
