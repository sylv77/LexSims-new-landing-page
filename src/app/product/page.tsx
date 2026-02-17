"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import IndustriesTabs from "@/components/IndustriesTabs";
import ScenarioSection from "@/components/ScenarioSection";
import ProductDemoSection from "@/components/ProductDemoSection";
import ScenarioCascadeSection from "@/components/ScenarioCascadeSection";

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

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
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
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
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
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <nav className="flex flex-col gap-2 mt-16">
              <Link
                href="/"
                onClick={onClose}
                className="px-4 py-3 text-[16px] text-text-secondary hover:text-text-primary hover:bg-navy/5 rounded-lg transition-colors"
              >
                Home
              </Link>
              <Link
                href="/platform"
                onClick={onClose}
                className="px-4 py-3 text-[16px] text-text-secondary hover:text-text-primary hover:bg-navy/5 rounded-lg transition-colors"
              >
                Platform
              </Link>
              <Link
                href="/product"
                onClick={onClose}
                className="px-4 py-3 text-[16px] text-text-secondary hover:text-text-primary hover:bg-navy/5 rounded-lg transition-colors"
              >
                Product
              </Link>
              <Link
                href="/about"
                onClick={onClose}
                className="px-4 py-3 text-[16px] text-text-secondary hover:text-text-primary hover:bg-navy/5 rounded-lg transition-colors"
              >
                About
              </Link>
              {/* <Link
                href="/careers"
                onClick={onClose}
                className="px-4 py-3 text-[16px] text-text-secondary hover:text-text-primary hover:bg-navy/5 rounded-lg transition-colors"
              >
                Careers
              </Link> */}
              <div className="mt-4 pt-4 border-t border-border">
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-navy text-white text-[14px] font-medium rounded-full hover:bg-navy/90 transition-colors"
                >
                  GET STARTED
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="rotate-[-45deg]"
                  >
                    <path
                      d="M2 6H10M10 6L6 2M10 6L6 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo.png"
            alt="LexSims"
            width={120}
            height={120}
            className="h-6 sm:h-7 w-auto"
          />
          <span className="text-[18px] sm:text-[20px] font-lexsims font-semibold tracking-[0.03em] text-white">
            LexSims
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={onMenuOpen}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M3 12h18M3 6h18M3 18h18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/platform"
              className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors"
            >
              Platform
            </Link>
            <Link
              href="/product"
              className="px-4 py-2 text-[14px] font-medium text-white hover:text-white transition-colors"
            >
              Product
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors"
            >
              About
            </Link>
            {/* <Link
              href="/careers"
              className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors"
            >
              Careers
            </Link> */}
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="flex items-center gap-2 ml-4 px-5 py-2.5 bg-white text-[#1e1e1e] text-[14px] font-medium rounded-full hover:bg-white/90 transition-colors"
          >
            GET STARTED
            <svg
              width="10"
              height="10"
              viewBox="0 0 12 12"
              fill="none"
              className="rotate-[-45deg]"
            >
              <path
                d="M2 6H10M10 6L6 2M10 6L6 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function ProductHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section className="relative min-h-[70vh] bg-cream p-1 sm:p-2">
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Inner container with rounded corners */}
      <div className="relative w-full min-h-[calc(70vh-8px)] sm:min-h-[calc(70vh-16px)] rounded-xl sm:rounded-2xl overflow-hidden">
        {/* Aurora Gradient Background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 150% 100% at 0% 0%, rgba(38,38,46,0.9) 0%, rgba(38,38,46,0) 50%),
              radial-gradient(ellipse 150% 100% at 100% 0%, rgba(46,38,46,0.85) 0%, rgba(46,38,46,0) 50%),
              radial-gradient(ellipse 150% 100% at 0% 100%, rgba(50,47,40,0.8) 0%, rgba(50,47,40,0) 50%),
              radial-gradient(ellipse 150% 100% at 100% 100%, rgba(42,42,44,0.75) 0%, rgba(42,42,44,0) 50%),
              linear-gradient(135deg, rgba(20,20,23,1) 0%, rgba(22,20,22,1) 100%)
            `,
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/5" />
        </div>

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
        <Navigation onMenuOpen={() => setMobileMenuOpen(true)} />

        {/* Main Content */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
          <div className="flex flex-col gap-6 max-w-[800px] items-center">
            {/* Label */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="flex items-center gap-2"
            >
              <span className="text-white text-[8px]">■</span>
              <span className="text-white text-[11px] font-medium tracking-[0.1em] uppercase">
                Our Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-light leading-[1.15] tracking-[-0.02em] text-white"
            >
              Simulation engines for
              <br />
              <span className="font-serif italic">legal clarity</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="text-white/70 text-sm sm:text-base leading-[1.6em] max-w-[560px]"
            >
              Our platform models complex legal systems across litigation, regulation, and
              compliance—helping legal teams anticipate outcomes and make
              decisions with confidence.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="flex flex-col sm:flex-row gap-3 mt-2"
            >
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1e1e1e] text-[14px] font-medium rounded-full hover:bg-white/90 transition-colors"
              >
                Request a demo
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="rotate-[-45deg]"
                >
                  <path
                    d="M2 6H10M10 6L6 2M10 6L6 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <button
                onClick={() => document.getElementById("platform-demo")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white text-[14px] font-medium rounded-full hover:bg-white/20 transition-colors border border-white/20"
              >
                See it in action
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProductPage() {
  return (
    <main>
      <ProductHero />
      <ProductDemoSection />
      <ScenarioCascadeSection />
      {/* <IndustriesTabs /> */}
    </main>
  );
}
