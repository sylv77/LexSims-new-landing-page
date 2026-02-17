"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import CareersModal from "@/components/CareersModal";

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

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-[280px] bg-cream border-l border-border p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-primary"
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <nav className="flex flex-col gap-2 mt-16">
              <Link href="/" onClick={onClose} className="px-4 py-3 text-[16px] text-text-secondary hover:text-text-primary hover:bg-navy/5 rounded-lg transition-colors">Home</Link>
              <Link href="/platform" onClick={onClose} className="px-4 py-3 text-[16px] text-text-secondary hover:text-text-primary hover:bg-navy/5 rounded-lg transition-colors">Platform</Link>
              <Link href="/product" onClick={onClose} className="px-4 py-3 text-[16px] text-text-secondary hover:text-text-primary hover:bg-navy/5 rounded-lg transition-colors">Product</Link>
              <Link href="/about" onClick={onClose} className="px-4 py-3 text-[16px] text-text-secondary hover:text-text-primary hover:bg-navy/5 rounded-lg transition-colors">About</Link>
              <div className="mt-4 pt-4 border-t border-border">
                <Link href="/contact" onClick={onClose} className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-navy text-white text-[14px] font-medium rounded-full hover:bg-navy/90 transition-colors">
                  GET STARTED
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]">
                    <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors">Home</Link>
            <Link href="/platform" className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors">Platform</Link>
            <Link href="/product" className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors">Product</Link>
            <Link href="/about" className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors">About</Link>
          </div>
          <Link href="/contact" className="flex items-center gap-2 ml-4 px-5 py-2.5 bg-white text-[#1e1e1e] text-[14px] font-medium rounded-full hover:bg-white/90 transition-colors">
            GET STARTED
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]">
              <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function AboutHero({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <section className="relative h-[85vh] bg-cream p-1 sm:p-2">
      <div className="relative w-full h-[calc(85vh-8px)] sm:h-[calc(85vh-16px)] rounded-xl sm:rounded-2xl overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            src="/test-library-dark.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.9) 100%)` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%)` }} />

        {/* Noise Texture Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage: `url('/images/noise-texture.png')`,
            backgroundRepeat: "repeat",
            backgroundSize: "150px auto",
          }}
        />

        {/* Dot Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1.2px, transparent 1.2px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Navigation */}
        <Navigation onMenuOpen={onMenuOpen} />

        {/* Main Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end items-end px-4 sm:px-8 lg:px-16 pb-8 sm:pb-12 lg:pb-16 pt-20">
          <div className="flex flex-col gap-4 max-w-[600px] items-end text-right">
            <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0} className="flex items-center gap-2">
              <span className="text-white text-[8px]">&#9632;</span>
              <span className="text-white text-[11px] font-medium tracking-[0.03em] uppercase">About Us</span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-light leading-[1.15] tracking-[-0.02em] text-white"
            >
              The flight simulator
              <br />
              for <span className="font-serif italic">legal decisions.</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-white/70 text-sm leading-[1.6em] max-w-[480px]"
            >
              Building the tools to rehearse legal outcomes before they&apos;re decided.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutContent() {
  const [careersOpen, setCareersOpen] = useState(false);

  return (
    <section className="bg-cream pt-24 pb-32 lg:pt-32 lg:pb-40">
      <article className="max-w-[900px] mx-auto px-6 lg:px-12">
        {/* Opening statement */}
        <motion.h2
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          className="font-serif italic text-[28px] sm:text-[36px] lg:text-[44px] font-normal leading-[1.25] tracking-[-0.01em] text-text-primary mb-20 lg:mb-28 max-w-[780px]"
        >
          Legal strategy should be rehearsed, not improvised. We build the infrastructure to make that possible.
        </motion.h2>

        {/* Section 1 */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.1}
          className="mb-16 lg:mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-12">
            <h3 className="text-[11px] font-medium tracking-[0.1em] uppercase text-text-muted pt-1">
              The Problem
            </h3>
            <div className="flex flex-col gap-6 text-[15px] sm:text-[16px] leading-[1.8] text-text-secondary">
              <p>
                Every significant legal decision carries consequences that unfold across complex, interconnected systems. A litigation strategy ripples through opposing counsel responses, judicial rulings, and settlement dynamics simultaneously. A regulatory change triggers cascading reactions across jurisdictions, compliance frameworks, and enforcement priorities.
              </p>
              <p>
                Yet the tools available to legal decision-makers remain remarkably primitive&mdash;static case assessments, historical analogies, and the informed intuition of experienced litigators. These methods worked in simpler times. They are insufficient for the complexity and stakes of modern legal practice.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="w-full h-px bg-border mb-16 lg:mb-20" />

        {/* Section 2 */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.1}
          className="mb-16 lg:mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-12">
            <h3 className="text-[11px] font-medium tracking-[0.1em] uppercase text-text-muted pt-1">
              Our Approach
            </h3>
            <div className="flex flex-col gap-6 text-[15px] sm:text-[16px] leading-[1.8] text-text-secondary">
              <p>
                LexSims constructs living digital twins of the legal systems that matter most to your cases. We populate these environments with{" "}
                <Link href="/product" className="text-navy underline underline-offset-4 decoration-navy/30 hover:decoration-navy/60 transition-colors">
                  AI legal actors
                </Link>
                {" "}that model real participants&mdash;judges, jurors, regulators, opposing counsel&mdash;their reasoning patterns, biases, and decision-making heuristics. Then we run thousands of case scenarios forward in time, surfacing the second- and third-order effects that intuition alone cannot predict.
              </p>
              <p>
                The result is not a forecast. It is a map of legal possibility space&mdash;a structured understanding of what could happen, what is likely to happen, and what you can do about it. We call this{" "}
                <Link href="/product" className="text-navy underline underline-offset-4 decoration-navy/30 hover:decoration-navy/60 transition-colors">
                  outcome intelligence
                </Link>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Pull quote */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.1}
          className="mb-16 lg:mb-20 lg:ml-[200px] lg:pl-12"
        >
          <div className="border-l-2 border-border pl-6 lg:pl-8 py-2">
            <p className="text-[20px] lg:text-[24px] font-serif italic font-normal leading-[1.4] tracking-[-0.01em] text-text-muted">
              The future is not a single path. It is a landscape of possibilities. We build the tools to explore it.
            </p>
          </div>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.1}
          className="mb-16 lg:mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-12">
            <h3 className="text-[11px] font-medium tracking-[0.1em] uppercase text-text-muted pt-1">
              Today
            </h3>
            <div className="flex flex-col gap-6 text-[15px] sm:text-[16px] leading-[1.8] text-text-secondary">
              <p>
                Law firms, corporate legal departments, and compliance teams use LexSims to rehearse litigation strategies, model case outcomes, stress-test settlement positions, and simulate the impact of regulatory changes&mdash;all before committing resources. Our clients include teams in litigation, M&amp;A, regulatory compliance, and intellectual property.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="w-full h-px bg-border mb-16 lg:mb-20" />

        {/* Closing */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0.1}
          className="lg:ml-[200px] lg:pl-12"
        >
          <p className="text-[15px] sm:text-[16px] leading-[1.8] text-text-secondary mb-8">
            We believe the most important decisions in the world should be informed by more than experience and instinct. If that resonates, we&apos;d like to hear from you.
          </p>
          <button
            onClick={() => setCareersOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-full hover:border-navy/30 hover:text-text-primary transition-colors"
          >
            Join the team
          </button>
        </motion.div>
      </article>

      <CareersModal isOpen={careersOpen} onClose={() => setCareersOpen(false)} />
    </section>
  );
}

export default function AboutCompanyPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <AboutHero onMenuOpen={() => setMobileMenuOpen(true)} />
      <AboutContent />
    </main>
  );
}
