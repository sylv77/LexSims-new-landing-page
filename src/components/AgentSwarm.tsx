"use client";

import { useEffect, useRef } from "react";

const COLS = 18;
const ROWS = 14;
const DOT_RADIUS = 3;
const GAP = 6;

interface Agent {
  col: number;
  row: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  brightness: number;
  targetBrightness: number;
  size: number;
  targetSize: number;
  phase: number;
  cluster: number; // which group this agent belongs to
  active: boolean;
}

export default function AgentSwarm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef(0);
  const agentsRef = useRef<Agent[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let eventTimer = 0;
    let activeCluster = -1;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = rect.width * dpr;
      canvas!.height = rect.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      w = rect.width;
      h = rect.height;

      const cellW = (w - GAP * 2) / COLS;
      const cellH = (h - GAP * 2) / ROWS;
      const cellSize = Math.min(cellW, cellH);
      const gridW = cellSize * COLS;
      const gridH = cellSize * ROWS;
      const ox = (w - gridW) / 2;
      const oy = (h - gridH) / 2;

      if (agentsRef.current.length === 0) {
        const agents: Agent[] = [];
        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const bx = ox + c * cellSize + cellSize / 2;
            const by = oy + r * cellSize + cellSize / 2;
            // Assign clusters based on spatial regions
            let cluster = 0;
            if (c > COLS * 0.6 && r < ROWS * 0.4) cluster = 1;
            else if (c < COLS * 0.35 && r > ROWS * 0.5) cluster = 2;
            else if (c > COLS * 0.4 && r > ROWS * 0.6) cluster = 3;

            agents.push({
              col: c,
              row: r,
              x: bx,
              y: by,
              baseX: bx,
              baseY: by,
              brightness: 0.15 + Math.random() * 0.1,
              targetBrightness: 0.15,
              size: DOT_RADIUS,
              targetSize: DOT_RADIUS,
              phase: Math.random() * Math.PI * 2,
              cluster,
              active: false,
            });
          }
        }
        agentsRef.current = agents;
      } else {
        // Update positions on resize
        agentsRef.current.forEach((a) => {
          a.baseX = ox + a.col * cellSize + cellSize / 2;
          a.baseY = oy + a.row * cellSize + cellSize / 2;
        });
      }
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    let time = 0;

    function triggerEvent() {
      const agents = agentsRef.current;
      // Pick a random cluster to "activate"
      activeCluster = Math.floor(Math.random() * 4);

      // Activate agents in that cluster
      for (const a of agents) {
        if (a.cluster === activeCluster) {
          a.active = true;
          a.targetBrightness = 0.7 + Math.random() * 0.3;
          a.targetSize = DOT_RADIUS * 1.6;
        }
      }

      // After a delay, propagate to neighboring clusters (ripple effect)
      setTimeout(() => {
        for (const a of agents) {
          if (a.cluster !== activeCluster && Math.random() < 0.3) {
            a.active = true;
            a.targetBrightness = 0.4 + Math.random() * 0.3;
            a.targetSize = DOT_RADIUS * 1.3;
          }
        }
      }, 800);

      // Reset after a while
      setTimeout(() => {
        for (const a of agents) {
          a.active = false;
          a.targetBrightness = 0.15 + Math.random() * 0.1;
          a.targetSize = DOT_RADIUS;
        }
        activeCluster = -1;
      }, 2800);
    }

    function animate() {
      if (!ctx || !w) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      time += 0.016;
      eventTimer += 0.016;

      // Trigger a simulated "event" every ~5 seconds
      if (eventTimer > 5) {
        eventTimer = 0;
        triggerEvent();
      }

      const { x: mx, y: my } = mouseRef.current;
      const agents = agentsRef.current;

      for (const a of agents) {
        // Mouse proximity highlight
        const mdx = a.baseX - mx;
        const mdy = a.baseY - my;
        const md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 80) {
          const proximity = (80 - md) / 80;
          a.targetBrightness = Math.max(a.targetBrightness, 0.5 + proximity * 0.5);
          a.targetSize = Math.max(a.targetSize, DOT_RADIUS * (1 + proximity * 0.8));
        }

        // Smooth interpolation
        a.brightness += (a.targetBrightness - a.brightness) * 0.06;
        a.size += (a.targetSize - a.size) * 0.08;

        // Gentle positional breathing
        const breathe = Math.sin(time * 0.8 + a.phase) * 1.5;
        a.x += (a.baseX + breathe - a.x) * 0.1;
        a.y += (a.baseY + Math.cos(time * 0.6 + a.phase * 1.3) * 1.2 - a.y) * 0.1;
        a.phase += 0.005;
      }

      // Draw connection lines between active agents in same cluster
      if (activeCluster >= 0) {
        const activeAgents = agents.filter(
          (a) => a.active && a.brightness > 0.35
        );
        ctx.lineWidth = 0.5;
        for (let i = 0; i < activeAgents.length; i++) {
          for (let j = i + 1; j < activeAgents.length; j++) {
            const dx = activeAgents[i].x - activeAgents[j].x;
            const dy = activeAgents[i].y - activeAgents[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < 80) {
              const alpha =
                (1 - d / 80) *
                0.15 *
                Math.min(activeAgents[i].brightness, activeAgents[j].brightness);
              ctx.strokeStyle = `rgba(140,130,220,${alpha})`;
              ctx.beginPath();
              ctx.moveTo(activeAgents[i].x, activeAgents[i].y);
              ctx.lineTo(activeAgents[j].x, activeAgents[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw agents
      for (const a of agents) {
        // Glow for bright agents
        if (a.brightness > 0.35) {
          const g = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.size * 4);
          g.addColorStop(0, `rgba(140,130,220,${a.brightness * 0.2})`);
          g.addColorStop(1, "rgba(140,130,220,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core dot
        ctx.fillStyle = `rgba(200,195,240,${a.brightness})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.size, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(animate);
    }

    // Start first event sooner
    eventTimer = 3.5;
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
