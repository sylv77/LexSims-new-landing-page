"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

interface CascadeEffect {
  label: string;
  detail: string;
  severity: "high" | "mid" | "low";
}

interface Scenario {
  id: string;
  product: string;
  productColor: string;
  trigger: string;
  effects: CascadeEffect[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "litigation-antitrust",
    product: "Litigation",
    productColor: "#C4A0D0",
    trigger: "Key witness recants testimony in antitrust trial",
    effects: [
      { label: "Liability probability shifts 40% toward defendant", detail: "Jury perception modeling shows credibility collapse", severity: "high" },
      { label: "Opposing counsel pivots to documentary evidence", detail: "Strategy rework required within 3 weeks", severity: "mid" },
      { label: "Settlement leverage doubles for defense", detail: "Recommend initiating parallel negotiation track", severity: "high" },
      { label: "Co-defendant coordination fractures", detail: "Separate settlement talks emerge within 48 hours", severity: "mid" },
    ],
  },
  {
    id: "litigation-class",
    product: "Litigation",
    productColor: "#C4A0D0",
    trigger: "Multi-jurisdiction class action seeks certification across 12 states",
    effects: [
      { label: "Certification probability reaches 35% in 8 of 12 venues", detail: "Plaintiff-friendly jurisdictions drive exposure", severity: "high" },
      { label: "Aggregate exposure reaches 5x baseline estimate", detail: "Bellwether case selection becomes critical strategy lever", severity: "mid" },
      { label: "Individual settlement offers fracture class cohesion", detail: "Recommend targeted opt-out incentive structure", severity: "low" },
    ],
  },
  {
    id: "mna-antitrust",
    product: "M&A",
    productColor: "#D89870",
    trigger: "DOJ files antitrust challenge to proposed $12B merger",
    effects: [
      { label: "Unconditional approval probability drops to 12%", detail: "Second request complications extend timeline 340 days", severity: "high" },
      { label: "Structural remedies required in 78% of simulation paths", detail: "Divestiture of 2-3 business units most likely outcome", severity: "high" },
      { label: "Deal economics shift — buyer premium erodes 22%", detail: "Walk-away threshold analysis triggered", severity: "mid" },
      { label: "Proactive divestiture proposal reduces delay by 8 months", detail: "Recommend filing remedies framework within 30 days", severity: "mid" },
    ],
  },
  {
    id: "mna-crossborder",
    product: "M&A",
    productColor: "#D89870",
    trigger: "CFIUS blocks cross-border acquisition on national security grounds",
    effects: [
      { label: "Deal termination probability reaches 88%", detail: "Mitigation agreement path narrows to single scenario", severity: "high" },
      { label: "Reverse break fee of $1.2B triggered", detail: "Board liability analysis required within 48 hours", severity: "high" },
      { label: "Alternative buyer universe contracts to 3 domestic candidates", detail: "Valuation markdown of 15-25% expected", severity: "mid" },
    ],
  },
  {
    id: "regulatory-sec",
    product: "Regulatory",
    productColor: "#8AB890",
    trigger: "SEC announces new climate disclosure requirements effective Q1",
    effects: [
      { label: "Compliance gap identified across 40% of reporting entities", detail: "Scope 3 emissions data most problematic", severity: "high" },
      { label: "D&O liability exposure increases 3x for non-compliance", detail: "Insurance market repricing expected within 90 days", severity: "mid" },
      { label: "Early filers gain competitive advantage in ESG ratings", detail: "Recommend accelerated voluntary disclosure strategy", severity: "mid" },
      { label: "Cross-border filing obligations trigger EU equivalence review", detail: "Dual-reporting requirements for 200+ multinationals", severity: "low" },
      { label: "Enforcement action probability peaks at month 18", detail: "Grace period expected but not guaranteed", severity: "low" },
    ],
  },
  {
    id: "regulatory-ai",
    product: "Regulatory",
    productColor: "#8AB890",
    trigger: "EU passes strict AI liability directive affecting legal tech",
    effects: [
      { label: "AI-assisted legal tools face mandatory audit requirements", detail: "Compliance timeline: 12 months from enactment", severity: "high" },
      { label: "Professional liability policies exclude AI-generated outputs", detail: "Insurance gap creates E&O exposure for firms", severity: "high" },
      { label: "Bar associations issue emergency guidance on AI use", detail: "Jurisdictional fragmentation in ethical obligations", severity: "mid" },
    ],
  },
  {
    id: "ip-patent",
    product: "IP",
    productColor: "#88ACAC",
    trigger: "Patent troll targets $4B product line with injunction in E.D. Texas",
    effects: [
      { label: "Preliminary injunction granted — sales halted in 2 markets", detail: "Revenue impact: $120M/quarter at risk", severity: "high" },
      { label: "Licensing counter-offer economics shift to plaintiff", detail: "Royalty demand increases 3x post-injunction", severity: "mid" },
      { label: "Design-around timeline estimated at 14 months", detail: "Engineering reallocation disrupts 3 adjacent products", severity: "low" },
      { label: "Inter partes review petition shows 62% invalidity probability", detail: "Recommend parallel IPR filing within 30 days", severity: "mid" },
    ],
  },
  {
    id: "ip-trade-secret",
    product: "IP",
    productColor: "#88ACAC",
    trigger: "Former executive joins competitor — trade secret misappropriation alleged",
    effects: [
      { label: "TRO granted — executive enjoined from new role for 6 months", detail: "Non-compete enforceability varies by jurisdiction", severity: "high" },
      { label: "Discovery reveals 14,000 documents on personal devices", detail: "Spoliation motion probable — sanctions risk elevated", severity: "high" },
      { label: "Competitor product launch delayed 9 months", detail: "Indirect damages calculation supports $45M claim", severity: "mid" },
    ],
  },
];

function severityOpacity(severity: "high" | "mid" | "low"): number {
  if (severity === "high") return 0.8;
  if (severity === "mid") return 0.4;
  return 0.15;
}

const AUTO_PLAY_INTERVAL = 8000;

export default function ScenarioCascadeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scenario = SCENARIOS[activeIndex];
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    const start = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / AUTO_PLAY_INTERVAL, 1));
    }, 50);

    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % SCENARIOS.length);
    }, AUTO_PLAY_INTERVAL);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [activeIndex, startTimer]);

  const handleSelect = (i: number) => {
    if (i === activeIndex) return;
    setActiveIndex(i);
  };

  return (
    <section className="bg-cream py-20 lg:py-32 overflow-hidden">
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-text-primary text-[8px]">&#9632;</span>
            <span className="text-text-primary text-[11px] font-medium tracking-[0.1em] uppercase">
              Scenario Intelligence
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-[28px] lg:text-[36px] font-normal leading-[1.2em] tracking-[-0.01em] text-text-primary">
              Run the domino <span className="font-serif italic">forward.</span>
            </h2>
            <p className="text-sm text-text-muted max-w-[340px] leading-[1.6] lg:text-right">
              Select a trigger event. See the cascading effects our engine surfaces across systems.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          {/* Product filter pills */}
          <div className="flex items-center gap-6 mb-5">
            {["Litigation", "M&A", "Regulatory", "IP"].map((product) => {
              const color = SCENARIOS.find((s) => s.product === product)?.productColor || "#fff";
              const isActive = scenario.product === product;
              return (
                <button
                  key={product}
                  onClick={() => {
                    const idx = SCENARIOS.findIndex((s) => s.product === product);
                    if (idx >= 0) handleSelect(idx);
                  }}
                  className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.05em] uppercase transition-all duration-200"
                  style={{ color: isActive ? color : "rgba(26,26,46,0.3)" }}
                >
                  <div
                    className="w-[5px] h-[5px] rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? color : "rgba(26,26,46,0.15)",
                      boxShadow: isActive ? `0 0 8px ${color}40` : "none",
                    }}
                  />
                  {product}
                </button>
              );
            })}
          </div>

          {/* Main container */}
          <div className="border border-white/[0.06] rounded-xl overflow-hidden">
            {/* Top bar with progress */}
            <div className="relative">
              <div className="flex items-center justify-between px-5 py-2.5 bg-[#161616] border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] font-medium tracking-[0.06em] uppercase px-2 py-0.5 rounded"
                    style={{
                      color: scenario.productColor,
                      backgroundColor: `${scenario.productColor}12`,
                      border: `1px solid ${scenario.productColor}20`,
                    }}
                  >
                    {scenario.product}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/15">
                  [ <span className="text-white/40">{String(activeIndex + 1).padStart(2, "0")}</span> / {String(SCENARIOS.length).padStart(2, "0")} ]
                </span>
              </div>
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.03]">
                <motion.div
                  className="h-full"
                  style={{
                    width: `${progress * 100}%`,
                    backgroundColor: `${scenario.productColor}50`,
                  }}
                />
              </div>
            </div>

            {/* Two-column body */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
              {/* Left — Trigger list */}
              <div
                className="lg:border-r border-white/[0.06] bg-[#161616]"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.01) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              >
                {SCENARIOS.map((s, i) => {
                  const isActive = activeIndex === i;
                  return (
                    <button
                      key={s.id}
                      onClick={() => handleSelect(i)}
                      className="relative w-full text-left px-5 py-3 border-b border-white/[0.03] transition-all duration-200 group flex items-start gap-3"
                    >
                      {/* Left accent */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? s.productColor : "transparent",
                          opacity: isActive ? 0.6 : 0,
                        }}
                      />
                      {/* Product dot */}
                      <div
                        className="shrink-0 mt-[7px] w-[5px] h-[5px] rounded-full transition-all duration-200"
                        style={{
                          backgroundColor: isActive ? s.productColor : "rgba(255,255,255,0.08)",
                        }}
                      />
                      <span
                        className="text-[13px] leading-[1.5] transition-colors duration-200"
                        style={{
                          color: isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
                        }}
                      >
                        {s.trigger}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right — Cascade effects */}
              <div className="p-5 lg:p-7 bg-[#131313]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col gap-0"
                  >
                    {/* Trigger echo */}
                    <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/[0.04]">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0">
                        <path d="M8 1v14M1 8h14" stroke={scenario.productColor} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
                      </svg>
                      <span className="text-[12px] font-mono text-white/30">
                        if: <span className="text-white/50">{scenario.trigger.toLowerCase()}</span>
                      </span>
                    </div>

                    {/* Effects */}
                    {scenario.effects.map((effect, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 + i * 0.08, duration: 0.3, ease: EASE }}
                        className="flex gap-3 py-3 group"
                      >
                        {/* Severity bar */}
                        <div className="shrink-0 flex flex-col items-center gap-1 pt-1">
                          <div
                            className="w-[3px] h-[18px] rounded-full"
                            style={{ backgroundColor: scenario.productColor, opacity: severityOpacity(effect.severity) }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] sm:text-[14px] font-mono text-white/70 leading-[1.45] mb-0.5">
                            {effect.label}
                          </p>
                          <p className="text-[11px] sm:text-[12px] font-mono text-white/20 leading-[1.5]">
                            {effect.detail}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Footer */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.04]"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: `${scenario.productColor}80` }} />
                        <span className="text-[10px] font-mono text-white/15">
                          {scenario.effects.length} cascade effects identified
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[9px] font-mono text-white/10">
                        <span className="flex items-center gap-1">
                          <div className="w-[3px] h-[8px] rounded-full" style={{ backgroundColor: scenario.productColor, opacity: 0.8 }} />
                          high
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-[3px] h-[8px] rounded-full" style={{ backgroundColor: scenario.productColor, opacity: 0.4 }} />
                          mid
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="w-[3px] h-[8px] rounded-full" style={{ backgroundColor: scenario.productColor, opacity: 0.15 }} />
                          low
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
