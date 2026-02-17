"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay, ease: EASE },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay, ease: EASE },
  }),
};

/* ═══════════════════════════════════════════════
   Navigation
   ═══════════════════════════════════════════════ */

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute right-0 top-0 h-full w-[280px] bg-cream border-l border-border p-6">
            <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-primary" aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <nav className="flex flex-col gap-2 mt-16">
              <Link href="/" onClick={onClose} className="px-4 py-3 text-[16px] text-text-secondary hover:text-text-primary hover:bg-navy/5 rounded-lg transition-colors">Home</Link>
              <Link href="/platform" onClick={onClose} className="px-4 py-3 text-[16px] text-text-secondary hover:text-text-primary hover:bg-navy/5 rounded-lg transition-colors">Platform</Link>
              <Link href="/product" onClick={onClose} className="px-4 py-3 text-[16px] text-text-secondary hover:text-text-primary hover:bg-navy/5 rounded-lg transition-colors">Product</Link>
              <Link href="/about" onClick={onClose} className="px-4 py-3 text-[16px] text-text-secondary hover:text-text-primary hover:bg-navy/5 rounded-lg transition-colors">About</Link>
              <div className="mt-4 pt-4 border-t border-border">
                <Link href="/contact" onClick={onClose} className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-navy text-white text-[14px] font-medium rounded-full hover:bg-navy-light transition-colors">
                  GET STARTED
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]"><path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Navigation({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <nav className="relative z-30 w-full px-4 sm:px-8 lg:px-16 py-4 sm:py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image src="/logo.png" alt="LexSims" width={120} height={120} className="h-6 sm:h-7 w-auto" />
          <span className="text-[18px] sm:text-[20px] font-lexsims font-semibold tracking-[0.03em] text-white">LexSims</span>
        </Link>
        <button onClick={onMenuOpen} className="lg:hidden w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors" aria-label="Open menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors">Home</Link>
            <Link href="/platform" className="px-4 py-2 text-[14px] font-medium text-white hover:text-white transition-colors">Platform</Link>
            <Link href="/product" className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors">Product</Link>
            <Link href="/about" className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors">About</Link>
          </div>
          <Link href="/contact" className="flex items-center gap-2 ml-4 px-5 py-2.5 bg-white text-[#1e1e1e] text-[14px] font-medium rounded-full hover:bg-white/90 transition-colors">
            GET STARTED
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]"><path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   Section 1 — Hero
   Framing: Infrastructure you build on, not a tool you use
   ═══════════════════════════════════════════════ */

function PlatformHero({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <section className="relative min-h-[90vh] bg-cream p-1 sm:p-2">
      <div className="relative w-full min-h-[calc(90vh-8px)] sm:min-h-[calc(90vh-16px)] rounded-xl sm:rounded-2xl overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 150% 100% at 0% 0%, rgba(38,38,46,0.9) 0%, rgba(38,38,46,0) 50%), radial-gradient(ellipse 150% 100% at 100% 0%, rgba(46,38,46,0.85) 0%, rgba(46,38,46,0) 50%), radial-gradient(ellipse 150% 100% at 0% 100%, rgba(50,47,40,0.8) 0%, rgba(50,47,40,0) 50%), radial-gradient(ellipse 150% 100% at 100% 100%, rgba(42,42,44,0.75) 0%, rgba(42,42,44,0) 50%), linear-gradient(135deg, rgba(20,20,23,1) 0%, rgba(22,20,22,1) 100%)` }}><div className="absolute inset-0 bg-black/5" /></div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.35]" style={{ backgroundImage: `url('/images/noise-texture.png')`, backgroundRepeat: "repeat", backgroundSize: "150px auto" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1.2px, transparent 1.2px)`, backgroundSize: "50px 50px" }} />

        <Navigation onMenuOpen={onMenuOpen} />

        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 py-12 lg:py-20">
          <div className="flex flex-col gap-6 max-w-[820px] items-center">
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0} className="flex items-center gap-2">
              <span className="text-white text-[8px]">&#9632;</span>
              <span className="text-white text-[11px] font-medium tracking-[0.1em] uppercase">Legal Simulation Infrastructure</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} initial="hidden" animate="visible" custom={0.1} className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-light leading-[1.15] tracking-[-0.02em] text-white">
              Infrastructure that powers the
              <br />
              <span className="font-serif italic">AI-native law firm of the future.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} initial="hidden" animate="visible" custom={0.2} className="text-white/70 text-sm sm:text-base leading-[1.6em] max-w-[540px]">
              LexSims provides the primitives&mdash;legal actor modeling, jurisdiction environments, case execution, outcome intelligence. You compose them into whatever legal simulation your organization needs.
            </motion.p>

            <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.3} className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link href="/contact" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1e1e1e] text-[14px] font-medium rounded-full hover:bg-white/90 transition-colors">
                Join the waitlist
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]"><path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/product" className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white text-[14px] font-medium rounded-full hover:bg-white/20 transition-colors border border-white/20">
                See what&apos;s built on LexSims
              </Link>
            </motion.div>
          </div>

          {/* Floating services preview */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.5} className="mt-14 w-full max-w-[760px]">
            <div className="relative bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-[10px] font-mono text-white/30 ml-2">lexsims / infrastructure / services</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: "Actors", desc: "Legal actor engine", color: "#8B6F7B" },
                  { name: "Jurisdictions", desc: "Environment builder", color: "#A07850" },
                  { name: "Cases", desc: "Execution runtime", color: "#7B6A8A" },
                  { name: "Intelligence", desc: "Outcome layer", color: "#5E7A6A" },
                ].map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: EASE }}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-3"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${s.color}60` }} />
                      <span className="text-[11px] font-medium text-white/80">{s.name}</span>
                    </div>
                    <span className="text-[10px] text-white/30">{s.desc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Section 2 — Infrastructure Services (AWS-style primitives)
   ═══════════════════════════════════════════════ */

const SERVICES = [
  {
    name: "Legal Actor Modeling",
    category: "COMPUTE",
    color: "#8B6F7B",
    description: "AI legal actors with full cognitive complexity including judicial temperament, argumentative strategy, and precedent knowledge.",
    specs: ["Judges & jurors", "Behavioral fidelity", "Role-based calibration"],
  },
  {
    name: "Legal Environment Builder",
    category: "ENVIRONMENT",
    color: "#A07850",
    description: "Construct complete legal landscapes with specific jurisdictions, evolving regulations, and procedural rules.",
    specs: ["Jurisdiction modeling", "Case law dynamics", "Regulatory triggers"],
  },
  {
    name: "Case Simulation Engine",
    category: "EXECUTION",
    color: "#7B6A8A",
    description: "Run thousands of case paths simultaneously with real-time convergence detection across litigation strategies.",
    specs: ["Parallel execution", "Convergence detection", "Sub-minute runs"],
  },
  {
    name: "Outcome Intelligence",
    category: "INTELLIGENCE",
    color: "#5E7A6A",
    description: "Surface hidden patterns including verdict probabilities, settlement likelihoods, and judicial disposition scoring.",
    specs: ["Verdict prediction", "Confidence intervals", "Cascade analysis"],
  },
  {
    name: "Legal Actor Database",
    category: "DATA",
    color: "#4E7A7A",
    description: "Persist and version legal actor profiles. Reuse calibrated actors across case simulations to compound precision.",
    specs: ["Version control", "Actor reuse", "Compounding precision"],
  },
  {
    name: "Case Template Library",
    category: "TOOLING",
    color: "#7A6890",
    description: "Pre-built case simulation blueprints across practice areas. Fork, customize, and deploy in minutes.",
    specs: ["Practice area templates", "Fork & customize", "Rapid deployment"],
  },
];

function InfrastructureServices() {
  const [activeService, setActiveService] = useState<number | null>(null);

  return (
    <section className="bg-beige py-24 lg:py-32">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0} className="mb-14 lg:mb-20">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-text-muted text-[8px]">&#9632;</span>
            <span className="text-text-muted text-[11px] font-medium tracking-[0.1em] uppercase">Infrastructure</span>
          </div>
          <h2 className="text-[28px] lg:text-[36px] font-normal leading-[1.2em] tracking-[-0.01em] text-text-primary max-w-[800px]">
            Composable primitives for <span className="font-serif italic">any simulation.</span>
          </h2>
          <p className="text-sm text-text-secondary leading-[1.7] mt-4 max-w-[520px]">
            Six core services that compose into any simulation product. Use them independently or orchestrate them together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES.map((service, i) => {
            const isActive = activeService === i;
            return (
              <motion.button
                key={service.name}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                custom={i * 0.06}
                onClick={() => setActiveService(isActive ? null : i)}
                className="text-left rounded-xl border p-5 transition-all duration-300 group"
                style={{
                  backgroundColor: isActive ? `${service.color}08` : "rgba(255,255,255,0.8)",
                  borderColor: isActive ? `${service.color}30` : "#D4CFC6",
                }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <motion.div
                      className="w-2 h-2 rounded-full"
                      animate={{
                        backgroundColor: isActive ? service.color : `${service.color}40`,
                        scale: isActive ? [1, 1.3, 1] : 1,
                      }}
                      transition={isActive ? { scale: { duration: 1.5, repeat: Infinity } } : {}}
                    />
                    <span className="text-sm font-medium text-text-primary">{service.name}</span>
                  </div>
                  <span
                    className="text-[9px] font-mono font-medium tracking-[0.08em] uppercase transition-colors duration-300"
                    style={{ color: isActive ? `${service.color}90` : "#7A7A8A" }}
                  >
                    {service.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[13px] leading-[1.6] text-text-secondary mb-4">
                  {service.description}
                </p>

                {/* Specs */}
                <div className="flex flex-wrap gap-1.5">
                  {service.specs.map((spec) => (
                    <span
                      key={spec}
                      className="text-[10px] font-mono px-2 py-0.5 rounded border transition-colors duration-300"
                      style={{
                        backgroundColor: isActive ? `${service.color}10` : "rgba(0,0,0,0.03)",
                        borderColor: isActive ? `${service.color}20` : "rgba(0,0,0,0.08)",
                        color: isActive ? service.color : "#7A7A8A",
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Section 3 — How It Works (interactive workflow + vis panel)
   ═══════════════════════════════════════════════ */

const WORKFLOW_STEPS = [
  { step: "01", label: "DEFINE", headline: "Define your case", description: "Configure the legal environment\u2014jurisdiction, case type, complexity level, trial date, and venue. Set the rules of the simulation.", color: "#D8A373" },
  { step: "02", label: "POPULATE", headline: "Build your legal actors", description: "Generate AI legal actors from templates or from scratch. Define judges, jurors, opposing counsel, and regulators with calibrated behavioral profiles.", color: "#C8A0AA" },
  { step: "03", label: "SIMULATE", headline: "Run case scenarios", description: "Execute thousands of case paths in parallel. Introduce triggers\u2014witness changes, evidence rulings, procedural motions\u2014and watch legal actors respond.", color: "#AF9BB4" },
  { step: "04", label: "EXTRACT", headline: "Surface legal intelligence", description: "Automated outcome extraction surfaces verdict probabilities, settlement likelihoods, and second-order effects. Confidence scoring tells you what to trust.", color: "#A2B79F" },
];

/* Viz 1 — World configurator with toggleable parameters */
function DefineViz({ color, vizKey }: { color: string; vizKey: number }) {
  const params = [
    { label: "Jurisdiction", value: "S.D.N.Y. Federal Court", pct: 80 },
    { label: "Case Type", value: "Patent infringement", pct: 65 },
    { label: "Complexity", value: "High", pct: 92 },
    { label: "Trial Date", value: "Q3 2026", pct: 45 },
    { label: "Venue", value: "Manhattan", pct: 70 },
  ];
  return (
    <div className="flex flex-col gap-2">
      {params.map((p, i) => (
        <motion.div
          key={`${vizKey}-${i}`}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
          className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2.5"
        >
          <span className="text-[10px] font-mono text-white/30 w-[90px] shrink-0">{p.label}</span>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] text-white/50">{p.value}</span>
            </div>
            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${p.pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.08 + 0.2, ease: EASE }}
                style={{ backgroundColor: `${color}80` }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* Viz 2 — Agent population grid filling in */
function PopulateViz({ color, vizKey }: { color: string; vizKey: number }) {
  const total = 50;
  const cols = 10;
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    setFilled(0);
    let count = 0;
    const t = setInterval(() => {
      count += 3;
      if (count >= total) { setFilled(total); clearInterval(t); return; }
      setFilled(count);
    }, 60);
    return () => clearInterval(t);
  }, [vizKey]);

  const segments = [
    { label: "Judges", pct: 15, hue: 0 },
    { label: "Jurors", pct: 40, hue: 30 },
    { label: "Counsel", pct: 25, hue: 60 },
    { label: "Regulators", pct: 20, hue: 90 },
  ];

  return (
    <div className="max-w-[98%] mx-auto">
      <div className="grid gap-[3px] mb-4" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: total }).map((_, i) => {
          const isFilled = i < filled;
          const segIdx = Math.floor((i / total) * segments.length);
          const hue = segments[Math.min(segIdx, segments.length - 1)].hue;
          return (
            <motion.div
              key={i}
              className="aspect-square rounded-[2px]"
              animate={{
                backgroundColor: isFilled
                  ? `hsla(${hue + 340}, 25%, 60%, ${0.25 + Math.random() * 0.25})`
                  : "rgba(255,255,255,0.03)",
              }}
              transition={{ duration: 0.15 }}
            />
          );
        })}
      </div>
      <div className="flex gap-3">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: `hsla(${seg.hue + 340}, 25%, 60%, 0.5)` }} />
            <span className="text-[9px] font-mono text-white/30">{seg.label}</span>
            <span className="text-[9px] font-mono text-white/30">{seg.pct}%</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
        <span className="text-[10px] font-mono text-white/30">Agents loaded</span>
        <motion.span
          className="text-[11px] font-mono"
          style={{ color }}
          animate={{ opacity: filled >= total ? 1 : 0.5 }}
        >
          {Math.round((filled / total) * 48000).toLocaleString()} / 48,000
        </motion.span>
      </div>
    </div>
  );
}

/* Viz 3 — Simulation execution with parallel scenario paths */
function SimulateViz({ color, vizKey }: { color: string; vizKey: number }) {
  const pathCount = 6;
  const pointCount = 12;
  const [paths, setPaths] = useState<number[][]>([]);

  useEffect(() => {
    const newPaths = Array.from({ length: pathCount }, () => {
      let val = 50;
      return Array.from({ length: pointCount }, () => {
        val += (Math.random() - 0.5) * 18;
        return Math.max(10, Math.min(90, val));
      });
    });
    setPaths(newPaths);
  }, [vizKey]);

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(0);
    let p = 0;
    const t = setInterval(() => {
      p += 1;
      if (p > pointCount) { clearInterval(t); return; }
      setProgress(p);
    }, 150);
    return () => clearInterval(t);
  }, [vizKey]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          animate={{ backgroundColor: progress < pointCount ? color : `${color}40`, scale: progress < pointCount ? [1, 1.3, 1] : 1 }}
          transition={progress < pointCount ? { scale: { duration: 0.8, repeat: Infinity } } : {}}
        />
        <span className="text-[10px] font-mono text-white/30">
          {progress < pointCount ? "Running 2,400 paths..." : "Converged."}
        </span>
        <span className="text-[10px] font-mono ml-auto" style={{ color: progress >= pointCount ? color : "rgba(255,255,255,0.3)" }}>
          {Math.min(Math.round((progress / pointCount) * 100), 100)}%
        </span>
      </div>
      <svg viewBox="0 0 240 120" className="w-full">
        {/* Grid lines */}
        {[0, 30, 60, 90, 120].map((y) => (
          <line key={y} x1={0} y1={y} x2={240} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
        ))}
        {/* Scenario paths */}
        {paths.map((path, pi) => {
          const opacity = 0.15 + (pi / pathCount) * 0.35;
          const points = path.slice(0, progress).map((v, j) => {
            const x = (j / (pointCount - 1)) * 240;
            const y = 120 - (v / 100) * 120;
            return `${x},${y}`;
          }).join(" ");
          return points ? (
            <motion.polyline
              key={`${vizKey}-${pi}`}
              points={points}
              fill="none"
              stroke={color}
              strokeWidth={pi === 0 ? 1.5 : 0.8}
              strokeOpacity={opacity}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : null;
        })}
        {/* Convergence zone */}
        {progress >= pointCount && (
          <motion.rect
            x={200} y={30} width={40} height={60}
            rx={4}
            fill={`${color}10`}
            stroke={`${color}30`}
            strokeWidth={0.5}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </svg>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[9px] font-mono text-white/25">t=0</span>
        <span className="text-[9px] font-mono text-white/25">t=18mo</span>
      </div>
    </div>
  );
}

/* Viz 4 — Signal extraction with confidence meters */
function ExtractViz({ color, vizKey }: { color: string; vizKey: number }) {
  const signals = [
    { label: "Verdict probability", confidence: 94, severity: "HIGH", value: "72%" },
    { label: "Settlement likelihood", confidence: 72, severity: "MEDIUM", value: "45%" },
    { label: "Regulatory risk", confidence: 88, severity: "HIGH", value: "High" },
    { label: "Judicial disposition", confidence: 61, severity: "LOW", value: "Neutral" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {signals.map((s, i) => (
        <motion.div
          key={`${vizKey}-${i}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.12, ease: EASE }}
          className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-3"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-white/50">{s.label}</span>
            <span className="text-[13px] font-mono font-light" style={{ color }}>{s.value}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${s.confidence}%` }}
                transition={{ duration: 1, delay: i * 0.12 + 0.3, ease: EASE }}
                style={{ backgroundColor: s.confidence > 80 ? color : `${color}60` }}
              />
            </div>
            <span className="text-[9px] font-mono tabular-nums" style={{ color: s.confidence > 80 ? color : "rgba(255,255,255,0.3)" }}>
              {s.confidence}%
            </span>
            <span
              className="text-[8px] font-mono font-medium tracking-wider px-1.5 py-0.5 rounded border"
              style={{
                color: s.severity === "HIGH" ? color : "rgba(255,255,255,0.3)",
                borderColor: s.severity === "HIGH" ? `${color}30` : "rgba(255,255,255,0.06)",
                backgroundColor: s.severity === "HIGH" ? `${color}08` : "transparent",
              }}
            >
              {s.severity}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function WorkflowVizRouter({ activeIndex, vizKey }: { activeIndex: number; vizKey: number }) {
  const color = WORKFLOW_STEPS[activeIndex].color;
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`wfviz-${activeIndex}-${vizKey}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
      >
        {activeIndex === 0 && <DefineViz color={color} vizKey={vizKey} />}
        {activeIndex === 1 && <PopulateViz color={color} vizKey={vizKey} />}
        {activeIndex === 2 && <SimulateViz color={color} vizKey={vizKey} />}
        {activeIndex === 3 && <ExtractViz color={color} vizKey={vizKey} />}
      </motion.div>
    </AnimatePresence>
  );
}

function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [vizKey, setVizKey] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    autoPlayRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length);
      setVizKey((prev) => prev + 1);
    }, 5000);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => { if (autoPlayRef.current) clearTimeout(autoPlayRef.current); };
  }, [activeIndex, startAutoPlay]);

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setVizKey((prev) => prev + 1);
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    startAutoPlay();
  };

  const active = WORKFLOW_STEPS[activeIndex];

  return (
    <section className="bg-cream py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0} className="mb-14 lg:mb-18">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-text-muted text-[8px]">&#9632;</span>
            <span className="text-text-muted text-[11px] font-medium tracking-[0.1em] uppercase">Workflow</span>
          </div>
          <h2 className="text-[28px] lg:text-[36px] font-normal leading-[1.2em] tracking-[-0.01em] text-text-primary max-w-[800px]">
            From question to <span className="font-serif italic">strategic intelligence.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 items-start">
          {/* Left: Steps */}
          <div className="flex flex-col">
            {WORKFLOW_STEPS.map((step, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={step.step}
                  onClick={() => handleSelect(i)}
                  className="flex gap-4 text-left group"
                >
                  {/* Spine */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300"
                      style={{
                        borderColor: isActive ? `${step.color}50` : "rgba(212,207,198,0.3)",
                        backgroundColor: isActive ? `${step.color}15` : "transparent",
                      }}
                    >
                      <span className="text-[11px] font-mono font-medium transition-colors duration-300" style={{ color: isActive ? step.color : "#7A7A8A" }}>
                        {step.step}
                      </span>
                    </div>
                    {i < WORKFLOW_STEPS.length - 1 && (
                      <div className="w-px h-full min-h-[20px]" style={{ background: isActive ? `linear-gradient(to bottom, ${step.color}30, rgba(0,0,0,0.08))` : "rgba(0,0,0,0.08)" }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8 lg:pb-10 pt-1.5">
                    <span
                      className="text-[10px] font-mono font-medium tracking-[0.1em] uppercase block mb-1.5 transition-colors duration-300"
                      style={{ color: isActive ? `${step.color}` : "#7A7A8A" }}
                    >
                      {step.label}
                    </span>
                    <h3 className={`text-[17px] font-normal leading-[1.3] mb-1.5 transition-colors duration-300 ${isActive ? "text-text-primary" : "text-text-muted group-hover:text-text-secondary"}`}>
                      {step.headline}
                    </h3>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="text-sm leading-[1.7] text-text-secondary overflow-hidden"
                        >
                          {step.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {/* Progress indicator for active step */}
                    {isActive && (
                      <motion.div className="mt-3 h-0.5 rounded-full overflow-hidden bg-border/20 w-full max-w-[200px]">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: `${step.color}60` }}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "linear" }}
                          key={vizKey}
                        />
                      </motion.div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Visualization panel */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-[#141414] border border-white/[0.06] rounded-2xl p-5 lg:p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    animate={{ backgroundColor: active.color }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/30">
                    {active.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/30">
                  step {active.step}/04
                </span>
              </div>

              <WorkflowVizRouter activeIndex={activeIndex} vizKey={vizKey} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Section 4 — Builder Tools (what you build WITH)
   ═══════════════════════════════════════════════ */

function ScenarioStudioPreview() {
  const [active, setActive] = useState(0);
  const triggers = [
    { label: "Patent Injunction", color: "#D8A373", severity: 72 },
    { label: "Antitrust Challenge", color: "#C4A0D0", severity: 85 },
    { label: "Class Action Filing", color: "#CC909C", severity: 91 },
  ];

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % triggers.length), 3000);
    return () => clearInterval(t);
  }, [triggers.length]);

  return (
    <div className="bg-beige/50 rounded-lg border border-border/40 p-3 h-[180px] overflow-hidden">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-text-muted" />
        <span className="text-[8px] font-mono text-text-muted">scenario_studio.config</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {triggers.map((t, i) => (
          <motion.div
            key={t.label}
            animate={{
              backgroundColor: i === active ? `${t.color}10` : "rgba(255,255,255,0.6)",
              borderColor: i === active ? `${t.color}30` : "rgba(212,207,198,0.3)",
            }}
            className="flex items-center gap-2 px-2.5 py-2 rounded-md border"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              animate={{
                backgroundColor: i === active ? t.color : "rgba(212,207,198,0.5)",
                scale: i === active ? [1, 1.3, 1] : 1,
              }}
              transition={i === active ? { scale: { duration: 1.2, repeat: Infinity } } : {}}
            />
            <span className={`text-[10px] font-mono ${i === active ? "text-text-secondary" : "text-text-muted"}`}>{t.label}</span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-12 h-1 bg-border/20 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full" animate={{ width: i === active ? `${t.severity}%` : "0%" }} transition={{ duration: 0.8, ease: EASE }} style={{ backgroundColor: t.color }} />
              </div>
              <span className={`text-[8px] font-mono ${i === active ? "text-text-secondary" : "text-text-muted"}`}>{t.severity}%</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1">
        {triggers.map((_, i) => (
          <div key={i} className={`h-0.5 flex-1 rounded-full ${i === active ? "bg-text-muted" : "bg-border/20"}`} />
        ))}
      </div>
    </div>
  );
}

function PopulationPreview() {
  const [cells, setCells] = useState<number[]>([]);
  const total = 60;

  useEffect(() => {
    setCells(Array.from({ length: total }, () => Math.random()));
    const interval = setInterval(() => {
      setCells((prev) => prev.map((v) => Math.max(0, Math.min(1, v + (Math.random() - 0.5) * 0.15))));
    }, 1500);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <div className="bg-beige/50 rounded-lg border border-border/40 p-3 h-[180px] overflow-hidden">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-text-muted" />
        <span className="text-[8px] font-mono text-text-muted">population / 48K agents</span>
      </div>
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(10, 1fr)" }}>
        {cells.map((v, i) => {
          const hue = 120 + v * 200;
          return (
            <motion.div
              key={i}
              className="aspect-square rounded-[2px]"
              animate={{ backgroundColor: v > 0.6 ? `hsla(${hue}, 30%, 60%, ${v * 0.4})` : `rgba(212,207,198,${v * 0.25})` }}
              transition={{ duration: 0.8 }}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-[8px] font-mono text-text-muted">Cognitive diversity index</span>
        <span className="text-[8px] font-mono text-text-muted">0.847</span>
      </div>
    </div>
  );
}

function TemplatePreview() {
  const templates = [
    { name: "Litigation Outcome Modeling", uses: "2.4k", color: "#C4A0D0" },
    { name: "Regulatory Compliance", uses: "1.8k", color: "#CC909C" },
    { name: "M&A Legal Risk", uses: "3.1k", color: "#D8A373" },
    { name: "Patent Dispute Analysis", uses: "2.9k", color: "#88ACAC" },
  ];

  return (
    <div className="bg-beige/50 rounded-lg border border-border/40 p-3 h-[180px] overflow-hidden">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-text-muted" />
        <span className="text-[8px] font-mono text-text-muted">templates / featured</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {templates.map((t) => (
          <div key={t.name} className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/60 border border-border/30">
            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: `${t.color}15` }}>
              <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: `${t.color}60` }} />
            </div>
            <span className="text-[10px] text-text-secondary flex-1">{t.name}</span>
            <span className="text-[8px] font-mono text-text-muted">{t.uses} runs</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPreview() {
  const bars = [65, 45, 78, 52, 88, 34, 72];

  return (
    <div className="bg-beige/50 rounded-lg border border-border/40 p-3 h-[180px] overflow-hidden">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-text-muted" />
        <span className="text-[8px] font-mono text-text-muted">dashboard / custom</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          { label: "Confidence", val: "94.2%", color: "#8AB890" },
          { label: "Agents", val: "48K", color: "#C4A0D0" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white/60 rounded-md border border-border/30 px-2 py-1.5">
            <span className="text-[7px] font-mono text-text-muted block">{kpi.label}</span>
            <span className="text-[13px] font-mono font-light" style={{ color: kpi.color }}>{kpi.val}</span>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-[3px] h-[60px]">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
            style={{ backgroundColor: `rgba(162,183,159,${0.15 + (h / 100) * 0.4})` }}
          />
        ))}
      </div>
    </div>
  );
}

const BUILDER_TOOLS = [
  { label: "CASE STUDIO", headline: "Design cases visually", description: "Configure jurisdictions, legal actors, case parameters, and triggers through an intuitive builder. No code required.", preview: ScenarioStudioPreview },
  { label: "ACTOR DESIGNER", headline: "Craft legal actors", description: "Build legal actor profiles calibrated by judicial philosophy, argumentative style, and decision patterns. Scale across any case type.", preview: PopulationPreview },
  { label: "TEMPLATE LIBRARY", headline: "Start from what works", description: "Pre-built case simulation blueprints across practice areas. Fork, customize, and deploy in minutes.", preview: TemplatePreview },
  { label: "CUSTOM DASHBOARDS", headline: "See what matters to you", description: "Build your own output views. Choose which KPIs, confidence metrics, and outcome distributions to surface.", preview: DashboardPreview },
];

function BuilderCapabilities() {
  return (
    <section className="bg-beige py-24 lg:py-32">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0} className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-text-muted text-[8px]">&#9632;</span>
            <span className="text-text-muted text-[11px] font-medium tracking-[0.1em] uppercase">Builder Tools</span>
          </div>
          <h2 className="text-[28px] lg:text-[36px] font-normal leading-[1.2em] tracking-[-0.01em] text-text-primary max-w-[800px]">
            The tools to build on the <span className="font-serif italic">infrastructure.</span>
          </h2>
          <p className="text-sm text-text-secondary leading-[1.7] mt-4 max-w-[520px]">
            Visual interfaces on top of the primitives. Design simulations without writing code, or go deeper with the APIs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BUILDER_TOOLS.map((cap, i) => {
            const Preview = cap.preview;
            return (
              <motion.div
                key={cap.label}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={i * 0.1}
                className="group relative rounded-xl bg-white border border-border p-5 sm:p-6 hover:bg-white hover:border-navy/20 transition-all duration-300"
              >
                <Preview />
                <div className="mt-5">
                  <span className="text-[10px] font-medium tracking-[0.1em] uppercase text-text-muted block mb-2">{cap.label}</span>
                  <h3 className="text-[17px] font-normal leading-[1.3] text-text-primary mb-2">{cap.headline}</h3>
                  <p className="text-sm leading-[1.6] text-text-secondary">{cap.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Section 5 — Built on LexSims (what people build ON the platform)
   ═══════════════════════════════════════════════ */

const BUILT_ON_HELM = [
  { title: "Litigation outcome modeler", team: "Litigation", description: "Model jury behavior, witness impact, and settlement dynamics across case strategies.", color: "#CC909C", services: 4 },
  { title: "Regulatory compliance engine", team: "Regulatory", description: "Simulate compliance scenarios across evolving regulatory frameworks and jurisdictions.", color: "#C4A0D0", services: 4 },
  { title: "M&A legal risk assessor", team: "M&A", description: "Evaluate antitrust challenges, regulatory approval paths, and deal structure risk.", color: "#D8A373", services: 3 },
  { title: "Patent dispute simulator", team: "Patent", description: "Model injunction risk, prior art strength, and licensing negotiation dynamics.", color: "#88ACAC", services: 3 },
  { title: "Class action exposure model", team: "Class Action", description: "Simulate multi-jurisdiction certification paths and aggregate exposure scenarios.", color: "#A2B79F", services: 5 },
  { title: "Contract dispute analyzer", team: "Contract", description: "Model force majeure claims, breach scenarios, and arbitration outcome paths.", color: "#AF9BB4", services: 3 },
  { title: "Antitrust risk modeler", team: "Antitrust", description: "Simulate merger review outcomes, remedies assessment, and competitive impact analysis.", color: "#C8A0AA", services: 2 },
  { title: "Securities litigation engine", team: "Securities", description: "Model shareholder action risk, SEC enforcement probability, and settlement economics.", color: "#D8A373", services: 3 },
  { title: "Employment law simulator", team: "Employment", description: "Simulate discrimination claims, class certification risk, and compliance gap analysis.", color: "#C4A0D0", services: 4 },
  { title: "Insurance coverage modeler", team: "Insurance", description: "Assess coverage disputes, subrogation paths, and claims outcome distributions.", color: "#88ACAC", services: 2 },
  { title: "Environmental compliance mapper", team: "Environmental", description: "Model regulatory enforcement risk across jurisdictions and remediation scenarios.", color: "#CC909C", services: 5 },
  { title: "International arbitration engine", team: "Arbitration", description: "Simulate cross-border dispute resolution, treaty claims, and enforcement paths.", color: "#A2B79F", services: 4 },
];

function BuiltOnHelm() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0} className="mb-14 lg:mb-18">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-text-muted text-[8px]">&#9632;</span>
            <span className="text-text-muted text-[11px] font-medium tracking-[0.1em] uppercase">Built on LexSims</span>
          </div>
          <h2 className="text-[28px] lg:text-[36px] font-normal leading-[1.2em] tracking-[-0.01em] text-text-primary max-w-[800px]">
            One platform. <span className="font-serif italic">Every practice area.</span>
          </h2>
          <p className="text-sm text-text-secondary leading-[1.7] mt-4 max-w-[520px]">
            Legal teams across practice areas use LexSims&apos;s infrastructure to build case simulations tailored to their exact litigation needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {BUILT_ON_HELM.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              custom={i * 0.05}
              className="rounded-xl border border-border bg-white px-4 py-4 hover:border-navy/20 hover:bg-white transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-mono font-medium tracking-[0.06em] uppercase" style={{ color: `${item.color}80` }}>
                  {item.team}
                </span>
              </div>
              <h3 className="text-[14px] font-normal leading-[1.4] text-text-primary group-hover:text-text-primary transition-colors mb-1.5">
                {item.title}
              </h3>
              <p className="text-[12px] leading-[1.5] text-text-muted">
                {item.description}
              </p>
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.services }).map((_, j) => (
                      <div
                        key={j}
                        className="h-1 rounded-full"
                        style={{
                          width: `${14 + ((i + j) % 4) * 6}px`,
                          backgroundColor: `${item.color}${j < item.services - 1 ? "40" : "15"}`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono text-text-muted ml-auto">{item.services} services</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.3} className="mt-8 text-center">
          <Link href="/product" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors">
            See the platform in action
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]"><path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Section 5 — Scale Numbers
   ═══════════════════════════════════════════════ */

function AnimatedNumber({ target, suffix, label, color }: { target: number; suffix: string; label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, { duration: 1.5, ease: EASE });
    const unsub = count.on("change", (v) => {
      setDisplay(target >= 1000 ? Math.round(v).toLocaleString() : Math.round(v).toString());
    });
    return () => { controls.stop(); unsub(); };
  }, [isInView, target, count]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-[36px] sm:text-[44px] lg:text-[52px] font-light tracking-[-0.02em] tabular-nums font-mono" style={{ color }}>
        {display}<span className="text-[20px] sm:text-[24px]">{suffix}</span>
      </div>
      <span className="text-sm text-text-muted mt-2 block">{label}</span>
    </div>
  );
}

function ScaleNumbers() {
  return (
    <section className="bg-beige py-20 lg:py-28">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
          <AnimatedNumber target={50} suffix="K+" label="Legal scenarios simulated monthly" color="#1A1A2E" />
          <AnimatedNumber target={200} suffix="+" label="Jurisdictions modeled" color="#1A1A2E" />
          <AnimatedNumber target={1} suffix="M+" label="Legal actors per simulation" color="#1A1A2E" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Section 6 — Infrastructure Philosophy (pull quote)
   ═══════════════════════════════════════════════ */

function InfraPhilosophy() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0}>
          <div className="border-l-2 border-border pl-6 lg:pl-10 py-2">
            <p className="text-[20px] sm:text-[24px] lg:text-[28px] font-serif italic font-normal leading-[1.35] tracking-[-0.01em] text-text-muted mb-6">
              Every legal analytics tool gives you their conclusions.<br />LexSims gives you the simulation to reach your own.
            </p>
            <p className="text-sm text-text-secondary leading-[1.7] max-w-[520px]">
              The same way flight simulators let pilots rehearse before they fly, LexSims lets legal teams rehearse before they litigate. We provide the engine. You define what it simulates.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Section 7 — Waitlist CTA
   ═══════════════════════════════════════════════ */

function WaitlistCTA() {
  return (
    <section className="bg-beige py-24 lg:py-32">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0}>
          <h2 className="text-[28px] lg:text-[36px] font-light leading-[1.2em] tracking-[-0.01em] text-text-primary font-serif italic mb-6">
            Stop guessing at case outcomes.<br />Start simulating them.
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-[1.6em] max-w-[480px] mx-auto mb-8">
            We&apos;re opening access to the legal simulation platform. Join the waitlist to be among the first to build on LexSims.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-navy-light transition-colors">
            Join the waitlist
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]"><path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════ */

export default function PlatformPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <PlatformHero onMenuOpen={() => setMobileMenuOpen(true)} />
      <InfrastructureServices />
      <HowItWorks />
      <BuilderCapabilities />
      <BuiltOnHelm />
      <ScaleNumbers />
      <InfraPhilosophy />
      <WaitlistCTA />
    </main>
  );
}
