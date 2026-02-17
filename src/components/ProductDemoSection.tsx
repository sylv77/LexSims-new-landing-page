"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useInView,
  animate,
} from "framer-motion";

/* ─── Types ─── */

interface KpiData {
  label: string;
  value: number;
  prefix: string;
  suffix: string;
  spark: number[];
}

interface DemoScenario {
  id: string;
  label: string;
  color: string;
  prompt: string;
  agentCount: string;
  confidence: number;
  impactPercent: number;
  kpis: KpiData[];
  chartData: number[];
  logs: { time: string; text: string; highlight?: boolean }[];
  insight: string;
}

/* ─── Scenario Data ─── */

const SCENARIOS: DemoScenario[] = [
  {
    id: "litigation",
    label: "Litigation Outcome",
    color: "#C4A0D0",
    prompt: "Simulate patent infringement trial with jury verdict modeling across S.D.N.Y. federal court venue",
    agentCount: "48,000",
    confidence: 94.2,
    impactPercent: 62,
    kpis: [
      { label: "Verdict Probability", value: 72, prefix: "", suffix: "%", spark: [40, 48, 55, 62, 68, 72] },
      { label: "Damages Range", value: 8, prefix: "$", suffix: "M", spark: [20, 28, 35, 42, 48, 52] },
      { label: "Appeal Risk", value: 3.2, prefix: "", suffix: "x", spark: [10, 18, 32, 50, 62, 70] },
    ],
    chartData: [82, 78, 71, 65, 58, 54, 52, 57, 62, 68, 72, 74],
    logs: [
      { time: "00:00.12", text: "Initializing legal actor population... 48,000 actors" },
      { time: "00:01.34", text: "Loading scenario: patent_infringement_sdny.yaml" },
      { time: "00:02.01", text: "Calibrating juror profiles against venue demographics" },
      { time: "00:02.89", text: "Running verdict simulation pass 1/4 ████████░░░░ 62%", highlight: true },
      { time: "00:03.56", text: "Running verdict simulation pass 2/4 ██████████░░ 78%" },
      { time: "00:04.12", text: "Running verdict simulation pass 3/4 ████████████ 94%" },
      { time: "00:04.89", text: "Convergence detected at pass 3. Skipping pass 4." },
      { time: "00:05.23", text: "Outcome extraction complete. 3 high-confidence patterns.", highlight: true },
      { time: "00:05.67", text: "✓ Simulation converged. Confidence: 94.2%", highlight: true },
    ],
    insight: "72% probability of plaintiff verdict with damages in $6-10M range. Recommend accelerating settlement negotiations and preparing Markman hearing strategy.",
  },
  {
    id: "regulatory",
    label: "Regulatory Compliance",
    color: "#D89870",
    prompt: "Model impact of new SEC disclosure requirements on corporate compliance across 200+ jurisdictions",
    agentCount: "85,000",
    confidence: 87.6,
    impactPercent: 55,
    kpis: [
      { label: "Compliance Gap", value: 3, prefix: "", suffix: "x", spark: [15, 22, 38, 55, 72, 85] },
      { label: "Remediation Time", value: 6, prefix: "+", suffix: " wk", spark: [5, 12, 25, 42, 58, 68] },
      { label: "Penalty Risk", value: 30, prefix: "", suffix: "%", spark: [2, 8, 15, 22, 28, 30] },
    ],
    chartData: [20, 25, 32, 45, 58, 72, 80, 85, 82, 78, 75, 73],
    logs: [
      { time: "00:00.08", text: "Initializing legal actor population... 85,000 actors" },
      { time: "00:00.92", text: "Loading scenario: sec_disclosure_requirements.yaml" },
      { time: "00:01.45", text: "Mapping regulatory constraint graph across 200+ jurisdictions" },
      { time: "00:02.34", text: "Running compliance cascade simulation..." },
      { time: "00:03.12", text: "Pass 1/3 ████████████░░ 82%", highlight: true },
      { time: "00:04.01", text: "Pass 2/3 ██████████████ 96%" },
      { time: "00:04.78", text: "Detecting second-order effects: cross-border filing obligations" },
      { time: "00:05.34", text: "3 cascading compliance gaps identified.", highlight: true },
      { time: "00:05.89", text: "✓ Simulation converged. Confidence: 87.6%", highlight: true },
    ],
    insight: "Compliance costs will triple within 18 months. Early remediation advantage significant — 30% penalty risk reduction with proactive filing. Recommend accelerating disclosure framework.",
  },
  {
    id: "classaction",
    label: "Class Action Exposure",
    color: "#8AB890",
    prompt: "Simulate multi-jurisdiction class action certification paths across 12 state courts",
    agentCount: "1,200,000",
    confidence: 91.8,
    impactPercent: 85,
    kpis: [
      { label: "Certification Prob.", value: 35, prefix: "", suffix: "%", spark: [90, 72, 45, 25, 18, 15] },
      { label: "Exposure Multiplier", value: 5, prefix: "", suffix: "x", spark: [10, 22, 48, 68, 80, 88] },
      { label: "Resolution Time", value: 90, prefix: "", suffix: " d", spark: [5, 15, 30, 52, 72, 90] },
    ],
    chartData: [85, 80, 62, 38, 25, 18, 15, 20, 30, 42, 55, 65],
    logs: [
      { time: "00:00.04", text: "Initializing legal actor population... 1,200,000 actors" },
      { time: "00:01.12", text: "Loading scenario: multi_jurisdiction_class_action.yaml" },
      { time: "00:01.89", text: "Constructing jurisdiction graph topology (12 state courts)" },
      { time: "00:02.67", text: "Mapping class certification requirements across venues" },
      { time: "00:03.45", text: "Certification pass 1/5 ██████░░░░░░ 48%", highlight: true },
      { time: "00:04.23", text: "Certification pass 2/5 ████████░░░░ 64%" },
      { time: "00:05.01", text: "Certification pass 3/5 ██████████░░ 82%" },
      { time: "00:05.78", text: "Certification threshold detected. Exposure ceiling: 5x", highlight: true },
      { time: "00:06.34", text: "✓ Simulation converged. Confidence: 91.8%", highlight: true },
    ],
    insight: "35% certification probability across 8 of 12 jurisdictions. Aggregate exposure reaches 5x baseline within 90 days. Recommend preemptive settlement framework in top-3 exposure states.",
  },
  {
    id: "legal",
    label: "Legal Challenge",
    color: "#CC909C",
    prompt: "Analyze cascading effects of key witness recanting testimony during high-profile antitrust proceedings",
    agentCount: "12,000",
    confidence: 82.4,
    impactPercent: 40,
    kpis: [
      { label: "Liability Shift", value: 40, prefix: "", suffix: "%", spark: [12, 18, 25, 32, 38, 40] },
      { label: "Strategy Rework", value: 3, prefix: "", suffix: " wk", spark: [0, 5, 15, 35, 60, 82] },
      { label: "Settlement Lev.", value: 2, prefix: "", suffix: "x", spark: [10, 20, 35, 52, 68, 78] },
    ],
    chartData: [30, 35, 42, 55, 62, 58, 50, 45, 40, 38, 36, 35],
    logs: [
      { time: "00:00.06", text: "Initializing legal actor population... 12,000 actors" },
      { time: "00:00.78", text: "Loading scenario: witness_recant_antitrust.yaml" },
      { time: "00:01.23", text: "Mapping legal precedent graph (342 case nodes)" },
      { time: "00:02.10", text: "Simulating jury perception shifts..." },
      { time: "00:03.02", text: "Credibility cascade pass 1/2 ██████████░░ 80%", highlight: true },
      { time: "00:03.89", text: "Pass 2/2 ██████████████ 100%" },
      { time: "00:04.34", text: "Settlement probability recalculated.", highlight: true },
      { time: "00:04.78", text: "✓ Simulation converged. Confidence: 82.4%", highlight: true },
    ],
    insight: "Witness recantation shifts liability probability by 40%. Defense restructuring required within 3 weeks. Settlement leverage doubles — recommend initiating parallel negotiation track.",
  },
  {
    id: "mna",
    label: "M&A Risk",
    color: "#88ACAC",
    prompt: "Project regulatory outcome cascade following DOJ antitrust challenge to proposed $12B merger",
    agentCount: "250,000",
    confidence: 89.1,
    impactPercent: 78,
    kpis: [
      { label: "Approval Prob.", value: 12, prefix: "", suffix: "%", spark: [95, 88, 75, 62, 55, 50] },
      { label: "Remedies Scenarios", value: 1400, prefix: "", suffix: "", spark: [5, 15, 30, 52, 75, 92] },
      { label: "Delay Risk", value: 340, prefix: "+", suffix: " d", spark: [8, 18, 35, 58, 78, 95] },
    ],
    chartData: [80, 72, 60, 48, 38, 30, 25, 22, 28, 35, 40, 42],
    logs: [
      { time: "00:00.03", text: "Initializing legal actor population... 250,000 actors" },
      { time: "00:01.01", text: "Loading scenario: doj_antitrust_merger_challenge.yaml" },
      { time: "00:01.67", text: "Calibrating regulatory review models (14 agencies)" },
      { time: "00:02.45", text: "Running remedies assessment simulation..." },
      { time: "00:03.23", text: "Regulatory pass 1/3 ████████░░░░ 68%", highlight: true },
      { time: "00:04.12", text: "Second request complications detected" },
      { time: "00:04.89", text: "Pass 3/3 ██████████████ 98%", highlight: true },
      { time: "00:05.45", text: "✓ Simulation converged. Confidence: 89.1%", highlight: true },
    ],
    insight: "Only 12% unconditional approval probability. 1,400 remedies scenarios generated — structural remedies required in 78% of paths. Recommend proactive divestiture proposal to reduce delay by 340 days.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Sparkline ─── */

function Sparkline({ data, color, simKey }: { data: number[]; color: string; simKey: number }) {
  const w = 52, h = 16;
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const path = data
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (data.length - 1)) * w} ${h - ((v - min) / range) * h}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-4 mt-2 overflow-visible">
      <motion.path
        key={simKey}
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ duration: 0.8, delay: 2.2, ease: EASE }}
      />
    </svg>
  );
}

/* ─── Impact Dot Grid ─── */

const GRID_COLS = 10;
const GRID_ROWS = 6;
const GRID_TOTAL = GRID_COLS * GRID_ROWS;

function ImpactGrid({ color, impact, simKey }: { color: string; impact: number; simKey: number }) {
  const [progress, setProgress] = useState(0);
  const targetFraction = impact / 100;

  // Pre-compute distance order from center
  const order = useMemo(() => {
    const cR = GRID_ROWS / 2, cC = GRID_COLS / 2;
    return Array.from({ length: GRID_TOTAL }, (_, i) => ({
      idx: i,
      dist: Math.hypot(Math.floor(i / GRID_COLS) - cR, (i % GRID_COLS) - cC),
    }))
      .sort((a, b) => a.dist - b.dist)
      .map((d) => d.idx);
  }, []);

  const maxDist = useMemo(() => Math.hypot(GRID_ROWS / 2, GRID_COLS / 2), []);

  useEffect(() => {
    setProgress(0);
    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      let frame = 0;
      intervalId = setInterval(() => {
        frame++;
        const p = Math.min(frame / 50, 1) * targetFraction;
        setProgress(p);
        if (p >= targetFraction) clearInterval(intervalId);
      }, 30);
    }, 2200);
    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [simKey, targetFraction]);

  const litSet = useMemo(() => {
    const count = Math.round(progress * GRID_TOTAL);
    return new Set(order.slice(0, count));
  }, [progress, order]);

  return (
    <div
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)` }}
    >
      {Array.from({ length: GRID_TOTAL }).map((_, i) => {
        const lit = litSet.has(i);
        const row = Math.floor(i / GRID_COLS), col = i % GRID_COLS;
        const dist = Math.hypot(row - GRID_ROWS / 2, col - GRID_COLS / 2) / maxDist;
        return (
          <div
            key={i}
            className="aspect-square rounded-[2px] transition-all duration-300"
            style={{
              backgroundColor: lit ? color : "rgba(255,255,255,0.04)",
              opacity: lit ? Math.max(0.3, 1 - dist * 0.7) : 1,
            }}
          />
        );
      })}
    </div>
  );
}

/* ─── Animated Counter ─── */

function AnimatedCounter({
  target, prefix, suffix, color, simKey,
}: {
  target: number; prefix: string; suffix: string; color: string; simKey: number;
}) {
  const val = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    val.set(0);
    setDisplay("0");
    const isDecimal = target % 1 !== 0;
    const controls = animate(val, target, { duration: 1.2, delay: 1.8, ease: "easeOut" });
    const unsub = val.on("change", (v) => {
      setDisplay(
        isDecimal
          ? v.toFixed(1)
          : target >= 1000
            ? Math.round(v).toLocaleString()
            : Math.round(v).toString()
      );
    });
    return () => { controls.stop(); unsub(); };
  }, [simKey, target, val]);

  return (
    <span className="font-mono tabular-nums" style={{ color }}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ─── Dashboard Chart ─── */

function DashboardChart({ data, color, simKey }: { data: number[]; color: string; simKey: number }) {
  const W = 400, H = 140;
  const PAD = { top: 8, right: 8, bottom: 20, left: 32 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const points = data.map((v, i) => ({
    x: PAD.left + (i / (data.length - 1)) * chartW,
    y: PAD.top + chartH - (v / 100) * chartH,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${PAD.top + chartH} L ${points[0].x} ${PAD.top + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {[0, 25, 50, 75, 100].map((v) => {
        const y = PAD.top + chartH - (v / 100) * chartH;
        return (
          <g key={v}>
            <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
            <text x={PAD.left - 6} y={y + 3} textAnchor="end" fill="rgba(255,255,255,0.12)" fontSize={6} fontFamily="monospace">{v}</text>
          </g>
        );
      })}
      {data.map((_, i) => {
        if (i % 3 !== 0 && i !== data.length - 1) return null;
        return (
          <text key={i} x={PAD.left + (i / (data.length - 1)) * chartW} y={H - 4} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize={6} fontFamily="monospace">
            T{i}
          </text>
        );
      })}
      <motion.path key={`a-${simKey}`} d={areaPath} fill={`url(#dg-${simKey})`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 2 }} />
      <motion.path key={`l-${simKey}`} d={linePath} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 1.5, ease: EASE }} />
      {points.map((p, i) => (
        <motion.circle key={`${simKey}-d-${i}`} cx={p.x} cy={p.y} r={2} fill={color} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.8, scale: 1 }} transition={{ duration: 0.25, delay: 1.8 + i * 0.06 }} />
      ))}
      <defs>
        <linearGradient id={`dg-${simKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.12} />
          <stop offset="100%" stopColor={color} stopOpacity={0.01} />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Terminal Log ─── */

function TerminalLog({ logs, color, simKey }: { logs: DemoScenario["logs"]; color: string; simKey: number }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(0);
    const timers = logs.map((_, i) => setTimeout(() => setVisibleCount(i + 1), 600 + i * 380));
    return () => timers.forEach(clearTimeout);
  }, [simKey, logs]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [visibleCount]);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto font-mono text-[10px] sm:text-[11px] leading-[1.9] px-3 py-2">
      {logs.slice(0, visibleCount).map((log, i) => (
        <motion.div key={`${simKey}-${i}`} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.15 }} className="flex gap-2 whitespace-nowrap">
          <span className="text-white/15 shrink-0">[{log.time}]</span>
          <span className="truncate" style={{ color: log.highlight ? color : "rgba(255,255,255,0.35)" }}>{log.text}</span>
        </motion.div>
      ))}
      {visibleCount > 0 && visibleCount >= logs.length && (
        <div className="flex gap-2 mt-0.5">
          <span className="text-white/15">&gt;</span>
          <span className="inline-block w-[5px] h-[11px] animate-pulse bg-white/25" />
        </div>
      )}
    </div>
  );
}

/* ─── Typing Effect ─── */

function useTypingEffect(text: string, simKey: number, delay: number = 0, speed: number = 22) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      let i = 0;
      intervalId = setInterval(() => {
        if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
        else clearInterval(intervalId);
      }, speed);
    }, delay);
    return () => { clearTimeout(timeoutId); if (intervalId) clearInterval(intervalId); };
  }, [simKey, text, delay, speed]);
  return displayed;
}

/* ─── Streaming Insight ─── */

function StreamingInsight({ text, color, simKey }: { text: string; color: string; simKey: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => { setDisplayed(""); setStarted(false); const t = setTimeout(() => setStarted(true), 5000); return () => clearTimeout(t); }, [simKey]);
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => { if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; } else clearInterval(interval); }, 12);
    return () => clearInterval(interval);
  }, [started, text]);

  if (!started) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-wider">Insight</span>
      </div>
      <p className="text-[11px] text-white/45 leading-[1.65]">
        {displayed}
        {displayed.length < text.length && (
          <span className="inline-block w-[4px] h-[10px] ml-0.5 animate-pulse" style={{ backgroundColor: color }} />
        )}
      </p>
    </motion.div>
  );
}

/* ─── Sim Timer ─── */

function SimTimer({ simKey }: { simKey: number }) {
  const [time, setTime] = useState("0.00");
  useEffect(() => {
    setTime("0.00");
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      if (elapsed < 6.5) setTime(elapsed.toFixed(2));
      else clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [simKey]);
  return <>{time}s</>;
}

/* ═══════════════════════════════════════════════
   MAIN — ProductDemoSection
   ═══════════════════════════════════════════════ */

export default function ProductDemoSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [simKey, setSimKey] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });
  const [hasStarted, setHasStarted] = useState(false);

  const scenario = SCENARIOS[activeIndex];
  const typedPrompt = useTypingEffect(scenario.prompt, simKey, 100);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    autoPlayRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % SCENARIOS.length);
      setSimKey((prev) => prev + 1);
    }, 10000);
  }, []);

  useEffect(() => {
    if (isInView && !hasStarted) { setHasStarted(true); setSimKey(1); }
  }, [isInView, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    startAutoPlay();
    return () => { if (autoPlayRef.current) clearTimeout(autoPlayRef.current); };
  }, [activeIndex, startAutoPlay, hasStarted]);

  const handleSelect = useCallback((index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setSimKey((prev) => prev + 1);
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    startAutoPlay();
  }, [activeIndex, startAutoPlay]);

  return (
    <section ref={sectionRef} id="platform-demo" className="bg-cream py-16 lg:py-24 overflow-hidden scroll-mt-8">
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-text-primary text-[8px]">&#9632;</span>
            <span className="text-text-primary text-[11px] font-medium tracking-[0.1em] uppercase">Platform Preview</span>
          </div>
          <h2 className="text-[28px] lg:text-[36px] font-normal leading-[1.2em] tracking-[-0.01em] text-text-primary">
            Experience the simulation <span className="font-serif italic">engine.</span>
          </h2>
        </motion.div>

        {/* App Window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="bg-[#0a0a0a] border border-white/[0.08] rounded-xl lg:rounded-2xl overflow-hidden transition-shadow duration-[2s]"
          style={{
            boxShadow: hasStarted
              ? `0 25px 80px -12px rgba(0,0,0,0.6), 0 0 100px -30px ${scenario.color}18, 0 0 0 1px rgba(255,255,255,0.03) inset`
              : "0 25px 80px -12px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset",
          }}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f0f0f] border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-[6px]">
                <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]/80" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]/80" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]/80" />
              </div>
              <span className="text-[11px] text-white/15 ml-3 font-mono hidden sm:inline">LexSims Platform v2.4</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Active agent indicator dots */}
              {hasStarted && (
                <div className="hidden sm:flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-[3px] h-[3px] rounded-full"
                      style={{ backgroundColor: scenario.color }}
                      animate={{ opacity: [0.2, 0.7, 0.2] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                    />
                  ))}
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <div className="w-[5px] h-[5px] rounded-full bg-emerald-500/70 animate-pulse" />
                <span className="text-[10px] text-white/15 font-mono hidden sm:inline">Connected</span>
              </div>
            </div>
          </div>

          {/* Mobile Preset Bar */}
          <div className="flex lg:hidden gap-2 px-4 py-3 border-b border-white/[0.06] overflow-x-auto no-scrollbar">
            {SCENARIOS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => handleSelect(i)}
                className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 border"
                style={{
                  color: activeIndex === i ? s.color : "rgba(255,255,255,0.25)",
                  borderColor: activeIndex === i ? `${s.color}30` : "rgba(255,255,255,0.06)",
                  backgroundColor: activeIndex === i ? `${s.color}10` : "transparent",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr]">

            {/* ─── Sidebar (desktop) ─── */}
            <div className="hidden lg:flex flex-col border-r border-white/[0.06] p-4 gap-4">
              <div>
                <span className="text-[9px] font-mono text-white/15 uppercase tracking-[0.1em] mb-2.5 block">Scenarios</span>
                <div className="flex flex-col gap-1">
                  {SCENARIOS.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => handleSelect(i)}
                      className="text-left px-3 py-2 rounded-lg text-[11px] font-medium transition-all duration-200 hover:bg-white/[0.03]"
                      style={{
                        color: activeIndex === i ? s.color : "rgba(255,255,255,0.25)",
                        backgroundColor: activeIndex === i ? `${s.color}0D` : undefined,
                        borderLeft: activeIndex === i ? `2px solid ${s.color}60` : "2px solid transparent",
                      }}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt */}
              <div className="flex-1">
                <span className="text-[9px] font-mono text-white/15 uppercase tracking-[0.1em] mb-2 block">Prompt</span>
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-3 min-h-[72px] hover:border-white/[0.08] transition-colors">
                  <p className="text-[11px] text-white/40 leading-[1.6] font-mono break-words">
                    {hasStarted ? typedPrompt : ""}
                    {hasStarted && typedPrompt.length < scenario.prompt.length && (
                      <span className="inline-block w-[4px] h-[11px] ml-0.5 animate-pulse bg-white/30" />
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-white/12">
                <span>{scenario.agentCount} agents</span>
                <span>{scenario.confidence}% conf</span>
              </div>

              {/* Insight */}
              {hasStarted && (
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-3 hover:border-white/[0.08] transition-colors">
                  <StreamingInsight text={scenario.insight} color={scenario.color} simKey={simKey} />
                </div>
              )}
            </div>

            {/* ─── Right: Dashboard + Terminal ─── */}
            <div className="flex flex-col">
              {/* Progress bar */}
              <motion.div
                key={`progress-${simKey}`}
                className="h-[2px]"
                style={{ background: `linear-gradient(90deg, transparent, ${scenario.color}80)`, transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={hasStarted ? { scaleX: 1 } : {}}
                transition={{ duration: 6, ease: "linear" }}
              />

              {/* Dashboard area */}
              <div
                className="p-4 lg:p-5 flex-1"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.015) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                {/* KPI cards with sparklines */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                  {scenario.kpis.map((kpi, i) => (
                    <motion.div
                      key={`${simKey}-kpi-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                      transition={{ delay: 1.5 + i * 0.12, duration: 0.4, ease: EASE }}
                      className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-3 hover:bg-white/[0.035] hover:border-white/[0.08] transition-colors duration-300"
                    >
                      <span className="text-[9px] sm:text-[10px] text-white/20 block mb-1 truncate">{kpi.label}</span>
                      <div className="text-base sm:text-lg font-light">
                        {hasStarted ? (
                          <AnimatedCounter target={kpi.value} prefix={kpi.prefix} suffix={kpi.suffix} color={scenario.color} simKey={simKey} />
                        ) : (
                          <span className="text-white/10">—</span>
                        )}
                      </div>
                      {hasStarted && <Sparkline data={kpi.spark} color={scenario.color} simKey={simKey} />}
                    </motion.div>
                  ))}
                </div>

                {/* Chart + Impact Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-3">
                  {/* Main chart */}
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-3 sm:p-4 hover:border-white/[0.08] transition-colors duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/15 uppercase tracking-[0.08em]">Impact Trajectory</span>
                      <span className="text-[9px] font-mono text-white/10">12 periods</span>
                    </div>
                    <div className="h-[140px] sm:h-[160px]">
                      {hasStarted && <DashboardChart data={scenario.chartData} color={scenario.color} simKey={simKey} />}
                    </div>
                  </div>

                  {/* Impact grid */}
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-3 sm:p-4 hover:border-white/[0.08] transition-colors duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] sm:text-[10px] font-mono text-white/15 uppercase tracking-[0.08em]">Impact Spread</span>
                      <motion.span
                        key={`pct-${simKey}`}
                        className="text-[9px] font-mono tabular-nums"
                        style={{ color: `${scenario.color}80` }}
                        initial={{ opacity: 0 }}
                        animate={hasStarted ? { opacity: 1 } : {}}
                        transition={{ delay: 3 }}
                      >
                        {scenario.impactPercent}%
                      </motion.span>
                    </div>
                    {hasStarted && <ImpactGrid color={scenario.color} impact={scenario.impactPercent} simKey={simKey} />}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-[2px]" style={{ backgroundColor: `${scenario.color}B0` }} />
                        <span className="text-[8px] text-white/20">Affected</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-[2px] bg-white/[0.04]" />
                        <span className="text-[8px] text-white/20">Baseline</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile insight */}
                {hasStarted && (
                  <div className="lg:hidden mt-4 bg-white/[0.02] border border-white/[0.05] rounded-lg p-3">
                    <StreamingInsight text={scenario.insight} color={scenario.color} simKey={simKey} />
                  </div>
                )}
              </div>

              {/* Terminal */}
              <div className="border-t border-white/[0.05] bg-[#070707]">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.04]">
                  <span className="text-[9px] sm:text-[10px] font-mono text-white/15">Terminal</span>
                  <span className="text-[9px] font-mono text-white/10">agent.log</span>
                </div>
                <div className="h-[120px] sm:h-[150px] lg:h-[170px]">
                  {hasStarted && <TerminalLog logs={scenario.logs} color={scenario.color} simKey={simKey} />}
                </div>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between px-4 py-1.5 bg-[#080808] border-t border-white/[0.06] text-[9px] sm:text-[10px] font-mono text-white/12">
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-[4px] h-[4px] rounded-full bg-emerald-500/50" />
                {scenario.agentCount} active
              </span>
              <span className="hidden sm:inline">sim_time: {hasStarted ? <SimTimer simKey={simKey} /> : "0.00s"}</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="hidden sm:inline">impact: {scenario.impactPercent}%</span>
              <span>confidence: {scenario.confidence}%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
