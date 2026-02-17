"use client";

import { useState, useEffect, useCallback, useRef, Fragment } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
} from "framer-motion";

/* ─── Types ─── */

interface Consequence {
  text: string;
  numericVal: number;
  prefix: string;
  suffix: string;
}

type VizType = "bars" | "nodes" | "cascade" | "grid" | "radial" | "flow";
type StatsType = "kpi" | "timeline" | "ticker" | "numbered" | "meter" | "delta";

interface Scenario {
  trigger: string;
  tag: string;
  impactPercent: number;
  consequences: Consequence[];
  agents: string;
  color: string;
  vizType: VizType;
  vizLabel: string;
  statsType: StatsType;
  statsLabel: string;
}

interface VizProps {
  color: string;
  impact: number;
  scenarioKey: number;
}

/* ─── Scenario Data ─── */

const scenarios: Scenario[] = [
  {
    trigger: "Patent holder files infringement claim — key witness recants during deposition",
    tag: "Litigation",
    impactPercent: 62,
    consequences: [
      { text: "Verdict probability shift", numericVal: 15, prefix: "-", suffix: "%" },
      { text: "Settlement leverage change", numericVal: 8, prefix: "", suffix: "x" },
      { text: "Trial duration impact", numericVal: 3, prefix: "+", suffix: " mo" },
    ],
    agents: "48,000",
    color: "#C4A0D0",
    vizType: "bars",
    vizLabel: "litigation positioning",
    statsType: "kpi",
    statsLabel: "litigation impact",
  },
  {
    trigger: "SEC announces new disclosure requirements effective next quarter",
    tag: "Regulatory",
    impactPercent: 40,
    consequences: [
      { text: "Compliance gap exposure", numericVal: 40, prefix: "", suffix: "%" },
      { text: "Remediation timeline", numericVal: 3, prefix: "", suffix: " wk" },
      { text: "Penalty risk multiplier", numericVal: 2, prefix: "", suffix: "x" },
    ],
    agents: "12,000",
    color: "#CC909C",
    vizType: "nodes",
    vizLabel: "regulatory network",
    statsType: "timeline",
    statsLabel: "compliance progression",
  },
  {
    trigger: "DOJ challenges proposed merger on antitrust grounds",
    tag: "M&A",
    impactPercent: 78,
    consequences: [
      { text: "Deal completion probability", numericVal: 12, prefix: "-", suffix: "%" },
      { text: "Remedies scenarios generated", numericVal: 1400, prefix: "", suffix: "" },
      { text: "Regulatory delay risk", numericVal: 340, prefix: "+", suffix: " d" },
    ],
    agents: "250,000",
    color: "#D89870",
    vizType: "cascade",
    vizLabel: "deal cascade",
    statsType: "ticker",
    statsLabel: "deal risk indicators",
  },
  {
    trigger: "Patent troll files injunction in Eastern District of Texas",
    tag: "Patent",
    impactPercent: 55,
    consequences: [
      { text: "Injunction grant probability", numericVal: 3, prefix: "", suffix: "x" },
      { text: "Prior art discovery timeline", numericVal: 6, prefix: "+", suffix: " wk" },
      { text: "Licensing exposure", numericVal: 30, prefix: "$", suffix: "M" },
    ],
    agents: "85,000",
    color: "#C8A86C",
    vizType: "grid",
    vizLabel: "patent landscape",
    statsType: "numbered",
    statsLabel: "cascading effects",
  },
  {
    trigger: "Multi-jurisdiction class action seeks certification across 12 states",
    tag: "Class Action",
    impactPercent: 85,
    consequences: [
      { text: "Certification probability", numericVal: 35, prefix: "", suffix: "%" },
      { text: "Exposure multiplier", numericVal: 5, prefix: "", suffix: "x" },
      { text: "Resolution timeline", numericVal: 90, prefix: "", suffix: " d" },
    ],
    agents: "1,200,000",
    color: "#8AB890",
    vizType: "radial",
    vizLabel: "class exposure",
    statsType: "meter",
    statsLabel: "exposure metrics",
  },
  {
    trigger: "Counterparty invokes force majeure clause in $2B supply contract",
    tag: "Contract",
    impactPercent: 48,
    consequences: [
      { text: "Damages at risk", numericVal: 14, prefix: "$", suffix: "B" },
      { text: "Arbitration window", numericVal: 90, prefix: "", suffix: " d" },
      { text: "Strategy redesign", numericVal: 18, prefix: "", suffix: " mo" },
    ],
    agents: "320,000",
    color: "#88ACAC",
    vizType: "flow",
    vizLabel: "contract flow",
    statsType: "delta",
    statsLabel: "contract risk shift",
  },
];

/* ═══════════════════════════════════════════════
   VIZ 1 — Horizontal Bar Race (Market / Blue)
   ═══════════════════════════════════════════════ */

function BarViz({ color, scenarioKey }: VizProps) {
  const bars = [
    { label: "Your brand", before: 72, after: 57 },
    { label: "Comp. A", before: 45, after: 52 },
    { label: "Comp. B", before: 38, after: 41 },
    { label: "New entry", before: 12, after: 82 },
    { label: "Mkt. avg", before: 55, after: 48 },
  ];

  return (
    <div className="flex flex-col gap-[10px] py-2 h-full justify-center">
      {bars.map((b, i) => {
        const delta = b.after - b.before;
        const isHighlighted = i === 3;
        return (
          <div key={`${scenarioKey}-${i}`} className="flex items-center gap-3">
            <span className="text-[10px] text-white/30 w-[68px] text-right truncate font-mono">
              {b.label}
            </span>
            <div className="flex-1 h-[26px] bg-white/[0.04] rounded-md overflow-hidden relative">
              {/* Ghost "before" bar */}
              <div
                className="absolute inset-y-0 left-0 rounded-md"
                style={{ width: `${b.before}%`, backgroundColor: "rgba(255,255,255,0.04)" }}
              />
              {/* Animated "after" bar */}
              <motion.div
                className="absolute inset-y-0 left-0 rounded-md"
                initial={{ width: `${b.before}%` }}
                animate={{ width: `${b.after}%` }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  backgroundColor: isHighlighted ? color : `${color}40`,
                }}
              />
            </div>
            <motion.span
              className="text-[11px] font-mono w-[42px] text-right tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.6 }}
              style={{ color: delta > 0 ? color : "rgba(255,255,255,0.15)" }}
            >
              {delta > 0 ? "+" : ""}
              {delta}%
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VIZ 2 — Node Network (Legal / Amber)
   ═══════════════════════════════════════════════ */

const LEGAL_NODES = [
  { x: 50, y: 15, r: 3.5, label: "Witness" },
  { x: 20, y: 40, r: 2.8, label: "Defense" },
  { x: 80, y: 40, r: 2.8, label: "Prosecution" },
  { x: 32, y: 68, r: 2.5, label: "Jury" },
  { x: 68, y: 68, r: 2.5, label: "Judge" },
  { x: 12, y: 16, r: 1.8, label: "Media" },
  { x: 88, y: 16, r: 1.8, label: "Public" },
  { x: 50, y: 48, r: 3.2, label: "Verdict" },
];

const LEGAL_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 7], [1, 3], [2, 4],
  [1, 7], [2, 7], [3, 7], [4, 7], [0, 5],
  [0, 6], [5, 1], [6, 2],
];

function NodeViz({ color, scenarioKey }: VizProps) {
  const [activeNodes, setActiveNodes] = useState<Set<number>>(new Set());

  useEffect(() => {
    setActiveNodes(new Set());
    const order = [0, 5, 6, 1, 2, 7, 3, 4];
    const timers = order.map((nodeIdx, step) =>
      setTimeout(() => setActiveNodes((prev) => new Set([...prev, nodeIdx])), (step + 1) * 280)
    );
    return () => timers.forEach(clearTimeout);
  }, [scenarioKey]);

  return (
    <div className="h-full flex items-center">
      <svg viewBox="0 0 100 82" className="w-full max-h-full">
        {LEGAL_EDGES.map(([a, b], i) => {
          const active = activeNodes.has(a) && activeNodes.has(b);
          return (
            <motion.line
              key={i}
              x1={LEGAL_NODES[a].x} y1={LEGAL_NODES[a].y}
              x2={LEGAL_NODES[b].x} y2={LEGAL_NODES[b].y}
              stroke={active ? color : "rgba(255,255,255,0.06)"}
              strokeWidth={active ? 0.3 : 0.15}
              animate={{ opacity: active ? 0.7 : 0.2 }}
              transition={{ duration: 0.4 }}
            />
          );
        })}
        {LEGAL_NODES.map((node, i) => {
          const active = activeNodes.has(i);
          return (
            <g key={i}>
              {active && (
                <motion.circle
                  cx={node.x} cy={node.y} r={node.r + 2}
                  fill="none" stroke={color} strokeWidth={0.15}
                  animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.3, 1.8] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              )}
              <motion.circle
                cx={node.x} cy={node.y} r={node.r}
                fill={active ? `${color}20` : "rgba(255,255,255,0.03)"}
                stroke={active ? color : "rgba(255,255,255,0.08)"}
                strokeWidth={0.25}
                animate={{
                  fill: active ? `${color}20` : "rgba(255,255,255,0.03)",
                  stroke: active ? color : "rgba(255,255,255,0.08)",
                }}
                transition={{ duration: 0.3 }}
              />
              <text
                x={node.x} y={node.y + node.r + 3.5}
                textAnchor="middle"
                fill={active ? `${color}90` : "rgba(255,255,255,0.12)"}
                fontSize={2.2} fontFamily="monospace"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VIZ 3 — Waterfall Cascade (Economic / Coral)
   ═══════════════════════════════════════════════ */

function CascadeViz({ color, scenarioKey }: VizProps) {
  const columns = [
    { label: "GDP", h: 60, dir: "down" as const },
    { label: "Jobs", h: 45, dir: "down" as const },
    { label: "Spend", h: 75, dir: "down" as const },
    { label: "Housing", h: 55, dir: "down" as const },
    { label: "Debt", h: 65, dir: "up" as const },
    { label: "Default", h: 85, dir: "up" as const },
    { label: "Rates", h: 50, dir: "up" as const },
    { label: "CPI", h: 38, dir: "up" as const },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-end gap-[5px] flex-1 px-1" style={{ minHeight: 160 }}>
        {columns.map((col, i) => {
          const isUp = col.dir === "up";
          return (
            <div key={`${scenarioKey}-${i}`} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <motion.div
                className="w-full rounded-sm overflow-hidden relative"
                initial={{ height: 0 }}
                animate={{ height: `${col.h}%` }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: isUp
                    ? `linear-gradient(to top, ${color}, ${color}40)`
                    : `linear-gradient(to top, ${color}25, ${color}08)`,
                }}
              />
              <span className="text-[8px] font-mono text-white/25 mt-0.5">{col.label}</span>
              <motion.span
                className="text-[9px] font-mono leading-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.07 + 0.4 }}
                style={{ color: isUp ? color : "rgba(255,255,255,0.15)" }}
              >
                {isUp ? "▲" : "▼"}
              </motion.span>
            </div>
          );
        })}
      </div>
      {/* Cascade connector line */}
      <div className="h-px mx-4 mt-1" style={{ background: `linear-gradient(90deg, transparent, ${color}30, transparent)` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VIZ 4 — Wave Grid (Regulatory / Purple)
   ═══════════════════════════════════════════════ */

const GRID_COLS = 12;
const GRID_ROWS = 7;
const GRID_TOTAL = GRID_COLS * GRID_ROWS;

function GridViz({ color, impact, scenarioKey }: VizProps) {
  const [cells, setCells] = useState<number[]>(new Array(GRID_TOTAL).fill(0));
  const impactCount = Math.round((impact / 100) * GRID_TOTAL);

  useEffect(() => {
    setCells(new Array(GRID_TOTAL).fill(0));
    const oR = Math.floor(Math.random() * GRID_ROWS);
    const oC = Math.floor(Math.random() * GRID_COLS);
    const indices = Array.from({ length: GRID_TOTAL }, (_, i) => i);
    indices.sort((a, b) => {
      const aR = Math.floor(a / GRID_COLS), aC = a % GRID_COLS;
      const bR = Math.floor(b / GRID_COLS), bC = b % GRID_COLS;
      return Math.hypot(aR - oR, aC - oC) - Math.hypot(bR - oR, bC - oC);
    });
    const impacted = new Set(indices.slice(0, impactCount));
    const batch = 4;
    const timers: NodeJS.Timeout[] = [];
    for (let b = 0; b < Math.ceil(GRID_TOTAL / batch); b++) {
      timers.push(
        setTimeout(() => {
          setCells((prev) => {
            const next = [...prev];
            for (let j = 0; j < batch; j++) {
              const idx = indices[b * batch + j];
              if (idx !== undefined) {
                next[idx] = impacted.has(idx)
                  ? 0.6 + Math.random() * 0.4
                  : 0.06 + Math.random() * 0.06;
              }
            }
            return next;
          });
        }, b * 35)
      );
    }
    return () => timers.forEach(clearTimeout);
  }, [scenarioKey, impactCount]);

  return (
    <div className="h-full flex items-center">
      <div className="w-full grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)` }}>
        {cells.map((v, i) => {
          const hex = Math.round(v * 255).toString(16).padStart(2, "0");
          return (
            <motion.div
              key={i}
              className="aspect-square rounded-[3px]"
              animate={{
                backgroundColor: v > 0.3 ? `${color}${hex}` : `rgba(255,255,255,${v * 0.5})`,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            />
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VIZ 5 — Radial Contagion (Sentiment / Rose)
   ═══════════════════════════════════════════════ */

function RadialViz({ color, impact, scenarioKey }: VizProps) {
  const ringCount = 6;
  const [activeRing, setActiveRing] = useState(-1);

  useEffect(() => {
    setActiveRing(-1);
    const timers = Array.from({ length: ringCount }, (_, i) =>
      setTimeout(() => setActiveRing(i), (i + 1) * 280)
    );
    return () => timers.forEach(clearTimeout);
  }, [scenarioKey]);

  const maxR = 28;
  const step = maxR / ringCount;

  return (
    <div className="h-full flex items-center">
      <svg viewBox="0 0 100 80" className="w-full max-h-full">
        {Array.from({ length: ringCount }).map((_, i) => {
          const r = (i + 1) * step;
          const active = i <= activeRing;
          const fillOp = active ? Math.max(0.02, ((ringCount - i) / ringCount) * 0.12) : 0;
          return (
            <g key={i}>
              <motion.circle
                cx={50} cy={40} r={r}
                fill={active ? color : "transparent"}
                fillOpacity={fillOp}
                stroke={active ? color : "rgba(255,255,255,0.06)"}
                strokeWidth={active ? 0.35 : 0.15}
                animate={{ opacity: active ? 1 : 0.2 }}
                transition={{ duration: 0.4 }}
              />
              {active && i > 0 && (
                <motion.circle
                  cx={50} cy={40} r={r}
                  fill="none" stroke={color} strokeWidth={0.8}
                  strokeDasharray={`${r * 0.5} ${r * Math.PI * 2 - r * 0.5}`}
                  strokeDashoffset={i * 25}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.35 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
              )}
            </g>
          );
        })}
        {/* Center pulse */}
        <motion.circle
          cx={50} cy={40} r={2} fill={color}
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}
        />
        <motion.circle
          cx={50} cy={40} r={3.5} fill="none" stroke={color} strokeWidth={0.2}
          animate={{ scale: [1, 1.6, 2.2], opacity: [0.5, 0.2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Impact label */}
        <text x={50} y={41.5} textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize={3} fontWeight="600">
          {impact}%
        </text>
        <text x={50} y={45} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize={1.8} fontFamily="monospace">
          reach
        </text>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VIZ 6 — Policy Flow (Political / Teal)
   ═══════════════════════════════════════════════ */

function FlowViz({ color, scenarioKey }: VizProps) {
  const flows = [
    { from: "Fossil", to: "Renewable", shift: 68 },
    { from: "Nuclear", to: "Storage", shift: 42 },
    { from: "Subsidies", to: "Carbon tax", shift: 78 },
    { from: "Domestic", to: "Import", shift: 33 },
  ];

  return (
    <div className="flex flex-col gap-[14px] py-3 h-full justify-center">
      {flows.map((f, i) => (
        <div key={`${scenarioKey}-${i}`} className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-white/30 w-[60px] text-right truncate">
            {f.from}
          </span>
          <div className="flex-1 h-[18px] bg-white/[0.04] rounded-full overflow-hidden relative">
            {/* Fading old allocation */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              initial={{ width: `${100 - f.shift}%`, opacity: 0.4 }}
              animate={{ width: `${Math.max(5, 100 - f.shift)}%`, opacity: 0.08 }}
              transition={{ duration: 1.2, delay: i * 0.12 }}
              style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
            />
            {/* Growing new allocation */}
            <motion.div
              className="absolute inset-y-0 right-0 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${f.shift}%` }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}20, ${color}90)` }}
              />
            </motion.div>
            {/* Arrow */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ delay: i * 0.12 + 0.4 }}
            >
              <span className="text-[8px]" style={{ color }}>→</span>
            </motion.div>
          </div>
          <span className="text-[10px] font-mono w-[64px] truncate" style={{ color }}>
            {f.to}
          </span>
          <motion.span
            className="text-[10px] font-mono tabular-nums w-[32px] text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: i * 0.12 + 0.6 }}
            style={{ color }}
          >
            {f.shift}%
          </motion.span>
        </div>
      ))}
    </div>
  );
}

/* ─── Viz Router ─── */

function ScenarioViz({ vizType, ...props }: VizProps & { vizType: VizType }) {
  switch (vizType) {
    case "bars":    return <BarViz {...props} />;
    case "nodes":   return <NodeViz {...props} />;
    case "cascade": return <CascadeViz {...props} />;
    case "grid":    return <GridViz {...props} />;
    case "radial":  return <RadialViz {...props} />;
    case "flow":    return <FlowViz {...props} />;
  }
}

/* ─── Animated Stat ─── */

function AnimatedStat({
  target, prefix, suffix, active, color,
}: {
  target: number; prefix: string; suffix: string; active: boolean; color: string;
}) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!active) { count.set(0); setDisplay("0"); return; }
    const controls = animate(count, target, { duration: 0.8, ease: "easeOut" });
    const unsub = count.on("change", (v) => {
      const val = Math.round(v);
      setDisplay(target >= 1000 ? val.toLocaleString() : val.toString());
    });
    return () => { controls.stop(); unsub(); };
  }, [target, active, count]);

  return (
    <span className="font-mono tabular-nums" style={{ color }}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════
   STATS DISPLAYS
   ═══════════════════════════════════════════════ */

interface StatsProps {
  consequences: Consequence[];
  color: string;
  statsVisible: boolean;
  simKey: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/* Stats 1 — KPI Cards with progress bars (Market) */
function KpiStats({ consequences, color, statsVisible, simKey }: StatsProps) {
  return (
    <motion.div key={simKey} className="flex flex-col gap-3">
      {consequences.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={statsVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, delay: i * 0.12, ease: EASE }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5"
        >
          <div className="flex items-end justify-between mb-3">
            <span className="text-sm text-white/50">{c.text}</span>
            <span className="text-2xl font-light">
              <AnimatedStat target={c.numericVal} prefix={c.prefix} suffix={c.suffix} active={statsVisible} color={color} />
            </span>
          </div>
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={statsVisible ? { width: `${Math.min(c.numericVal * 6, 100)}%` } : { width: 0 }}
              transition={{ duration: 0.8, delay: i * 0.12 + 0.3, ease: EASE }}
              style={{ backgroundColor: color }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* Stats 2 — Vertical Timeline (Legal) */
function TimelineStats({ consequences, color, statsVisible, simKey }: StatsProps) {
  return (
    <motion.div key={simKey} className="flex flex-col">
      {consequences.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 12 }}
          animate={statsVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
          transition={{ duration: 0.4, delay: i * 0.2, ease: EASE }}
          className="flex gap-5"
        >
          {/* Spine */}
          <div className="flex flex-col items-center">
            <motion.div
              className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
              initial={{ scale: 0 }}
              animate={statsVisible ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: i * 0.2 }}
              style={{ backgroundColor: `${color}30`, border: `1.5px solid ${color}` }}
            />
            {i < consequences.length - 1 && (
              <motion.div
                className="w-px flex-1"
                initial={{ scaleY: 0 }}
                animate={statsVisible ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ delay: i * 0.2 + 0.1, duration: 0.4 }}
                style={{ backgroundColor: `${color}20`, transformOrigin: "top" }}
              />
            )}
          </div>
          {/* Content */}
          <div className="flex-1 pb-8">
            <span className="text-[10px] font-mono uppercase tracking-wider block mb-2" style={{ color: `${color}50` }}>
              Phase {i + 1}
            </span>
            <span className="text-sm text-white/50 block mb-1">{c.text}</span>
            <span className="text-2xl font-light">
              <AnimatedStat target={c.numericVal} prefix={c.prefix} suffix={c.suffix} active={statsVisible} color={color} />
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* Stats 3 — Financial Ticker (Economic) */
function TickerStats({ consequences, color, statsVisible, simKey }: StatsProps) {
  return (
    <motion.div key={simKey} className="flex flex-col gap-3">
      {consequences.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -16 }}
          animate={statsVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.35, delay: i * 0.12, ease: EASE }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 flex items-center gap-5"
        >
          <div className="text-[28px] lg:text-[32px] font-mono font-light tracking-tight shrink-0">
            <AnimatedStat target={c.numericVal} prefix={c.prefix} suffix={c.suffix} active={statsVisible} color={color} />
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-sm text-white/50 truncate">{c.text}</span>
            <motion.span
              className="text-[10px] font-mono font-medium tracking-wider uppercase flex items-center gap-1.5"
              initial={{ opacity: 0 }}
              animate={statsVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: i * 0.12 + 0.4 }}
              style={{ color: `${color}90` }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
              {c.prefix === "-" || c.prefix === "+" ? "ALERT" : "CRITICAL"}
            </motion.span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* Stats 4 — Numbered Cascade (Regulatory) — original design */
function NumberedStats({ consequences, color, statsVisible, simKey }: StatsProps) {
  return (
    <motion.div key={simKey} className="flex flex-col gap-3">
      {consequences.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={statsVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.4, delay: i * 0.15, ease: EASE }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${color}10`, border: `1px solid ${color}20` }}
            >
              <span className="text-[10px] font-medium" style={{ color: `${color}60` }}>{i + 1}</span>
            </div>
            <span className="text-sm text-white/50 leading-[1.5] truncate">{c.text}</span>
          </div>
          <div className="shrink-0 text-xl lg:text-2xl font-light">
            <AnimatedStat target={c.numericVal} prefix={c.prefix} suffix={c.suffix} active={statsVisible} color={color} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* Stats 5 — Horizontal Gauge Meters (Sentiment) */
function MeterStats({ consequences, color, statsVisible, simKey }: StatsProps) {
  return (
    <motion.div key={simKey} className="flex flex-col gap-3">
      {consequences.map((c, i) => {
        const barWidth = Math.min(c.numericVal * 2.5, 100);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={statsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.4, delay: i * 0.15, ease: EASE }}
            className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/50">{c.text}</span>
              <span className="text-lg font-light">
                <AnimatedStat target={c.numericVal} prefix={c.prefix} suffix={c.suffix} active={statsVisible} color={color} />
              </span>
            </div>
            <div className="h-[6px] bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={statsVisible ? { width: `${barWidth}%` } : { width: 0 }}
                transition={{ duration: 1, delay: i * 0.15 + 0.2, ease: EASE }}
                style={{ background: `linear-gradient(90deg, ${color}50, ${color})` }}
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* Stats 6 — Before/After Delta (Political) */
function DeltaStats({ consequences, color, statsVisible, simKey }: StatsProps) {
  return (
    <motion.div key={simKey} className="flex flex-col gap-3">
      {consequences.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={statsVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.4, delay: i * 0.15, ease: EASE }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5"
        >
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-wider block mb-3">
            {c.text}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-white/30 text-sm font-mono">Stable</span>
            <motion.div
              className="h-px flex-1"
              initial={{ scaleX: 0 }}
              animate={statsVisible ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
              style={{ backgroundColor: `${color}30`, transformOrigin: "left" }}
            />
            <svg width="14" height="14" viewBox="0 0 12 12" style={{ color }} className="shrink-0">
              <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span className="text-xl font-light shrink-0">
              <AnimatedStat target={c.numericVal} prefix={c.prefix} suffix={c.suffix} active={statsVisible} color={color} />
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─── Stats Router ─── */

function ScenarioStats({ statsType, ...props }: StatsProps & { statsType: StatsType }) {
  switch (statsType) {
    case "kpi":      return <KpiStats {...props} />;
    case "timeline": return <TimelineStats {...props} />;
    case "ticker":   return <TickerStats {...props} />;
    case "numbered": return <NumberedStats {...props} />;
    case "meter":    return <MeterStats {...props} />;
    case "delta":    return <DeltaStats {...props} />;
  }
}

/* ═══════════════════════════════════════════════
   MAIN — ScenarioSection
   ═══════════════════════════════════════════════ */

export default function ScenarioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [simKey, setSimKey] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const active = scenarios[activeIndex];

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    autoPlayRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % scenarios.length);
      setSimKey((prev) => prev + 1);
    }, 7000);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => { if (autoPlayRef.current) clearTimeout(autoPlayRef.current); };
  }, [activeIndex, startAutoPlay]);

  useEffect(() => {
    setStatsVisible(false);
    const timer = setTimeout(() => setStatsVisible(true), 800);
    return () => clearTimeout(timer);
  }, [simKey]);

  const handleSelect = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setActiveIndex(index);
      setSimKey((prev) => prev + 1);
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
      startAutoPlay();
    },
    [activeIndex, startAutoPlay]
  );

  return (
    <section className="bg-cream py-16 lg:py-24 overflow-hidden">
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-navy text-[8px]">■</span>
            <span className="text-navy text-[11px] font-medium tracking-[0.1em] uppercase">
              Scenario Intelligence
            </span>
          </div>
          <h2 className="text-[28px] lg:text-[36px] font-normal leading-[1.2em] tracking-[-0.01em] text-text-primary">
            Run any scenario. Watch the{" "}
            <span className="font-serif italic">impact ripple.</span>
          </h2>
        </motion.div>

        {/* Scenario selector pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {scenarios.map((s, i) => {
            const isActive = activeIndex === i;
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className="relative px-4 py-2.5 rounded-full text-[13px] font-medium transition-all duration-300 border"
                style={{
                  color: isActive ? s.color : "rgba(45,45,45,0.35)",
                  borderColor: isActive ? `${s.color}40` : "rgba(212,207,198,1)",
                  backgroundColor: isActive ? `${s.color}10` : "transparent",
                }}
              >
                {s.tag}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `1px solid ${s.color}50` }}
                    initial={{ clipPath: "inset(0 100% 0 0)" }}
                    animate={{ clipPath: "inset(0 0% 0 0)" }}
                    transition={{ duration: 7, ease: "linear" }}
                    key={simKey}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Active scenario trigger */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-baseline gap-4 flex-wrap"
            >
              <span
                className="text-[10px] font-medium tracking-[0.1em] uppercase"
                style={{ color: `${active.color}80` }}
              >
                {active.tag}
              </span>
              <p className="text-lg lg:text-xl text-text-primary/80 font-light leading-[1.4]">
                &ldquo;{active.trigger}&rdquo;
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Main: Visualization + Stats */}
        <div className="bg-[#141414] border border-white/[0.06] rounded-2xl p-6 lg:p-8">
         <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">
          {/* Left: Visualization */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`viz-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 lg:p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-white/30">
                    {active.vizLabel}
                  </span>
                  <span className="text-[10px] font-mono text-white/30">
                    {active.agents} agents
                  </span>
                </div>

                <div className="h-[300px]">
                  <ScenarioViz
                    vizType={active.vizType}
                    color={active.color}
                    impact={active.impactPercent}
                    scenarioKey={simKey}
                  />
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-[2px]"
                      style={{ backgroundColor: `${active.color}B0` }}
                    />
                    <span className="text-[10px] text-white/30">Impacted</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.08]" />
                    <span className="text-[10px] text-white/30">Baseline</span>
                  </div>
                  <span className="text-[10px] text-white/30 ml-auto font-mono">
                    {active.impactPercent}% affected
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Consequence stats (unique per scenario) */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-white/30 mb-1">
              {active.statsLabel}
            </span>
            <AnimatePresence mode="wait">
              <ScenarioStats
                statsType={active.statsType}
                consequences={active.consequences}
                color={active.color}
                statsVisible={statsVisible}
                simKey={simKey}
              />
            </AnimatePresence>
          </div>
         </div>
        </div>

      </div>
    </section>
  );
}
