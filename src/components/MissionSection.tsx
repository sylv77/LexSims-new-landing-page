"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const DecisionTree = dynamic(() => import("./DecisionTree"), { ssr: false });

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function ArrowDownLeftIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 4L4 12M4 12H10M4 12V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const bulletPoints = [
  "Generate synthetic legal actors—judges, jurors, regulators, opposing counsel—each calibrated to real behavioral patterns and judicial philosophies.",
  "Configure case environments with specific jurisdictions, regulations, case law precedents, and procedural rules using composable primitives.",
  "Run thousands of parallel case paths with real-time convergence detection across litigation strategies.",
  "Extract verdict probabilities, settlement likelihoods, and emergent patterns invisible to traditional legal analysis.",
];

export default function MissionSection() {
  return (
    <section className="bg-cream min-h-screen flex items-center py-[72px] lg:py-24">
      <div className="max-w-[1248px] mx-auto px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Interactive Globe */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0}
            className="relative h-[300px] lg:h-[420px] order-2 lg:order-1"
          >
            <DecisionTree />
          </motion.div>

          {/* Right Column - Text Content */}
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            {/* Label */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.1}
              className="flex items-center gap-2"
            >
              <span className="text-navy text-[8px]">&#9632;</span>
              <span className="text-navy text-[11px] font-medium tracking-[0.1em] uppercase">
                The Platform
              </span>
            </motion.div>

            {/* Headline - Serif Italic */}
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.15}
              className="text-[28px] lg:text-[36px] font-light leading-[1.2em] tracking-[-0.01em] text-text-primary font-serif italic"
            >
              Legal simulation powered by AI legal actors that analyze, argue, and decide.
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.2}
              className="text-text-secondary text-sm font-normal leading-[1.6em]"
            >
              LexSims provides composable primitives&mdash;legal actor modeling, jurisdiction environments, case execution, outcome intelligence&mdash;built on AI agents that carry the full complexity of real legal reasoning. Place them in any case scenario and observe how arguments evolve, rulings shift, and outcomes cascade across legal systems.
            </motion.p>

            {/* Bullet Points */}
            <motion.ul
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.25}
              className="flex flex-col"
            >
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex flex-col">
                  <div className="border-t border-border" />
                  <div className="flex items-start gap-3 py-3">
                    <span className="text-navy text-[6px] mt-[6px] shrink-0">&#9632;</span>
                    <span className="text-text-secondary text-sm font-normal leading-[1.5em]">
                      {point}
                    </span>
                  </div>
                </li>
              ))}
            </motion.ul>

            {/* Learn More Link */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.35}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-navy text-sm font-medium leading-[1.4em] hover:opacity-80 transition-opacity"
              >
                See how it works
                <ArrowDownLeftIcon />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
