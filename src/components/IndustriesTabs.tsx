"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface IndustryTab {
  id: string;
  name: string;
  title: string;
  description: string;
  bulletPoints: string[];
  image: string;
  statistic: { value: string; label: string };
  logo?: string;
}

const industries: IndustryTab[] = [
  {
    id: "lexsims",
    name: "LexSims",
    title: "Litigation strategy and case intelligence",
    description:
      "Models each matter as a multi-agent strategic system—running thousands of scenario paths to produce probability distributions for verdict liability, damages bands, and settlement ranges. Transform litigation from intuition into quantified strategy.",
    bulletPoints: [
      "Dual-engine architecture combining strategic and behavioral simulation",
      "Probability distributions for liability, damages, and settlement outcomes",
      "Jury behavior modeling and opposing counsel response prediction",
      "Data-backed confidence for high-stakes decisions",
    ],
    image: "/images/lW7OwXcCBDa1mtMMvGQQJH7ec.jpg",
    statistic: { value: "Weeks → Hours", label: "reduction in case evaluation time" },
  },
  {
    id: "capsims",
    name: "CapSims",
    title: "Market dynamics and consumer foresight",
    description:
      "A high-fidelity market simulator that stress-tests product launches, pricing strategies, and portfolio allocations against millions of synthetic consumers. See how markets react before you move.",
    bulletPoints: [
      "Market adoption forecasting with synthetic focus groups",
      "Pricing sensitivity and elasticity modeling at scale",
      "Competitive response simulation and counter-strategy testing",
      "Consumer trend prediction across demographic segments",
    ],
    image: "/images/jFoBbK5cesdAk7KUPUmJ6Ikes.webp",
    statistic: { value: "3x", label: "improvement in launch success rates" },
  },
  {
    id: "polisims",
    name: "PoliSims",
    title: "Political strategy and electorate modeling",
    description:
      "Deep simulation of electorate dynamics—model campaign messages, policy impacts, and voter shifts to optimize political strategy with population-scale precision.",
    bulletPoints: [
      "Voter sentiment and turnout modeling across demographics",
      "Campaign message testing on synthetic constituent populations",
      "Policy impact analysis with cascading second-order effects",
      "Electoral outcome forecasting with confidence intervals",
    ],
    image: "/images/oYvV35p7ejV0T7qlnwQ5HuFGWdY.webp",
    statistic: { value: "92%", label: "accuracy in outcome predictions" },
  },
  {
    id: "regsims",
    name: "RegSims",
    title: "Regulatory intelligence and social sentiment",
    description:
      "Monitors the pulse of society in real time. Track viral narratives, emerging regulatory risks, and sentiment shifts to stay ahead of disruptions that reshape industries.",
    bulletPoints: [
      "Real-time social sentiment tracking across platforms",
      "Viral narrative propagation modeling and impact forecasting",
      "Regulatory risk early warning with probability scoring",
      "Crisis response simulation and stakeholder reaction modeling",
    ],
    image: "/images/LwcLIwRHz0Ut9qUpOMpJG30h7Q.webp",
    statistic: { value: "40%", label: "faster crisis response time" },
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const bulletItem = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
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

export default function IndustriesTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let newIndex = activeTab;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          newIndex = (activeTab + 1) % industries.length;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          newIndex = (activeTab - 1 + industries.length) % industries.length;
          break;
        case "Home":
          e.preventDefault();
          newIndex = 0;
          break;
        case "End":
          e.preventDefault();
          newIndex = industries.length - 1;
          break;
        default:
          return;
      }

      setActiveTab(newIndex);
      tabsRef.current[newIndex]?.focus();
    },
    [activeTab]
  );

  // Handle URL hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const tabIndex = industries.findIndex((ind) => ind.id === hash);
        if (tabIndex !== -1) {
          setActiveTab(tabIndex);
          // Scroll to section after a brief delay
          setTimeout(() => {
            sectionRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    // Check on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      // Disable animations for users who prefer reduced motion
    }
  }, []);

  const currentIndustry = industries[activeTab];

  return (
    <section ref={sectionRef} id="products" className="bg-darker py-16 lg:py-24">
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 lg:mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-white text-[8px]">■</span>
            <span className="text-white text-[11px] font-medium tracking-[0.1em] uppercase">
              Products
            </span>
          </div>
          <h2 className="text-[28px] lg:text-[36px] font-normal leading-[1.2em] tracking-[-0.01em] text-white max-w-[600px]">
            Tailored simulation engines for{" "}
            <span className="font-serif italic">every domain</span>
          </h2>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 lg:mb-12"
        >
          <div className="border-b border-white/10">
            <div
              role="tablist"
              aria-label="Industry sectors"
              className="flex items-center gap-8 lg:gap-12"
              onKeyDown={handleKeyDown}
            >
              {industries.map((industry, index) => (
                <button
                  key={industry.id}
                  ref={(el) => {
                    tabsRef.current[index] = el;
                  }}
                  role="tab"
                  aria-selected={activeTab === index}
                  aria-controls={`panel-${industry.id}`}
                  id={`tab-${industry.id}`}
                  tabIndex={activeTab === index ? 0 : -1}
                  onClick={() => setActiveTab(index)}
                  className={`
                    flex items-center gap-2 py-4 text-sm font-medium
                    transition-colors duration-300 ease-out
                    ${activeTab === index
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                    }
                  `}
                >
                  {activeTab === index && (
                    <span className="text-white text-[8px]">■</span>
                  )}
                  {industry.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Content Panel */}
        <div
          role="tabpanel"
          id={`panel-${currentIndustry.id}`}
          aria-labelledby={`tab-${currentIndustry.id}`}
          className="border border-white/10 rounded-xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndustry.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-2"
            >
              {/* Left Column - Content */}
              <div className="p-6 lg:p-10 flex flex-col justify-center">
                <motion.h3
                  variants={fadeInUp}
                  className="text-[22px] lg:text-[28px] font-normal leading-[1.2em] tracking-[-0.01em] text-white mb-4"
                >
                  {currentIndustry.title}
                </motion.h3>

                <motion.p
                  variants={fadeInUp}
                  className="text-white/70 text-sm leading-[1.6em] mb-6"
                >
                  {currentIndustry.description}
                </motion.p>

                {/* Bullet Points */}
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col mb-6"
                >
                  {currentIndustry.bulletPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      variants={bulletItem}
                      className="flex flex-col"
                    >
                      <div className="border-t border-white/10" />
                      <div className="flex items-start gap-3 py-3">
                        <span className="text-white text-[6px] mt-[6px] shrink-0">
                          ■
                        </span>
                        <span className="text-white/70 text-sm leading-[1.5em]">
                          {point}
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* More Information Link */}
                <motion.div variants={fadeInUp}>
                  <Link
                    href={`/industries/${currentIndustry.id}`}
                    className="inline-flex items-center gap-2 text-white text-sm font-medium hover:opacity-80 transition-opacity"
                  >
                    More information
                    <ArrowDownLeftIcon />
                  </Link>
                </motion.div>
              </div>

              {/* Right Column - Image Card */}
              <div className="relative bg-white/5 p-6 lg:p-8 flex flex-col justify-between min-h-[400px] lg:min-h-[500px]">
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={currentIndustry.image}
                    alt={currentIndustry.name}
                    fill
                    className="object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/70 to-transparent" />
                </div>

                {/* Statistic Overlay */}
                <div className="relative z-10 mt-auto">
                  <div className="flex flex-col gap-1">
                    <span className="text-[48px] lg:text-[64px] font-light leading-none text-white">
                      {currentIndustry.statistic.value}
                    </span>
                    <span className="text-white/70 text-sm">
                      {currentIndustry.statistic.label}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
