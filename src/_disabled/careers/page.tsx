"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
                        className="absolute right-0 top-0 h-full w-[280px] bg-[#1e1e1e] border-l border-white/10 p-6"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white"
                            aria-label="Close menu"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <nav className="flex flex-col gap-2 mt-16">
                            <Link href="/" onClick={onClose} className="px-4 py-3 text-[16px] text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                Home
                            </Link>
                            <Link href="/product" onClick={onClose} className="px-4 py-3 text-[16px] text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                Product
                            </Link>
                            <Link href="/about" onClick={onClose} className="px-4 py-3 text-[16px] text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                About
                            </Link>
                            <Link href="/careers" onClick={onClose} className="px-4 py-3 text-[16px] text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                                Careers
                            </Link>
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
                    <Image
                        src="/images/helm-logo.png"
                        alt="LexSims"
                        width={120}
                        height={120}
                        className="h-7 sm:h-8 w-auto"
                    />
                    <span className="text-[18px] sm:text-[20px] font-lexsims font-semibold tracking-[0.03em] text-white">
                        LexSims
                    </span>
                </Link>

                <button
                    onClick={onMenuOpen}
                    className="lg:hidden w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                    aria-label="Open menu"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="hidden lg:flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <Link href="/" className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors">
                            Home
                        </Link>
                        <Link href="/product" className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors">
                            Product
                        </Link>
                        <Link href="/about" className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link href="/careers" className="px-4 py-2 text-[14px] font-medium text-white hover:text-white transition-colors">
                            Careers
                        </Link>
                    </div>
                    <Link
                        href="/contact"
                        className="flex items-center gap-2 ml-4 px-5 py-2.5 bg-white text-[#1e1e1e] text-[14px] font-medium rounded-full hover:bg-white/90 transition-colors"
                    >
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

const openRoles = [
    {
        title: "Software Engineer",
        location: "San Francisco / Remote",
        type: "Full-time",
        href: "/careers/software-engineer",
    },
    {
        title: "Machine Learning Engineer",
        location: "San Francisco / Remote",
        type: "Full-time",
        href: "/careers/machine-learning-engineer",
    },
    {
        title: "Product Designer",
        location: "San Francisco / Remote",
        type: "Full-time",
        href: "/careers/product-designer",
    },
    {
        title: "Legal Strategy Analyst",
        location: "New York / Remote",
        type: "Full-time",
        href: "/careers/legal-strategy-analyst",
    },
];

function CareersHero() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <section className="relative min-h-[60vh] bg-[#1e1e1e] p-1 sm:p-2">
            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            <div className="relative w-full min-h-[calc(60vh-8px)] sm:min-h-[calc(60vh-16px)] rounded-xl sm:rounded-2xl overflow-hidden">
                {/* Aurora Gradient Background */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
              radial-gradient(ellipse 150% 100% at 0% 0%, rgba(162,183,159,0.85) 0%, rgba(162,183,159,0) 50%),
              radial-gradient(ellipse 150% 100% at 100% 0%, rgba(175,155,180,0.9) 0%, rgba(175,155,180,0) 50%),
              radial-gradient(ellipse 150% 100% at 0% 100%, rgba(216,163,115,0.8) 0%, rgba(216,163,115,0) 50%),
              radial-gradient(ellipse 150% 100% at 100% 100%, rgba(200,160,170,0.75) 0%, rgba(200,160,170,0) 50%),
              linear-gradient(135deg, rgba(170,175,165,1) 0%, rgba(180,170,175,1) 100%)
            `,
                    }}
                >
                    <div className="absolute inset-0 bg-black/5" />
                </div>

                {/* Noise Texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.35]"
                    style={{
                        backgroundImage: `url('/images/noise-texture.png')`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "150px auto",
                    }}
                />

                {/* Dot Pattern */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1.2px, transparent 1.2px)`,
                        backgroundSize: "50px 50px",
                    }}
                />

                <Navigation onMenuOpen={() => setMobileMenuOpen(true)} />

                {/* Main Content */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
                    <div className="flex flex-col gap-6 max-w-[700px] items-center">
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0}
                            className="flex items-center gap-2"
                        >
                            <span className="text-white text-[8px]">■</span>
                            <span className="text-white text-[11px] font-medium tracking-[0.1em] uppercase">
                                Careers
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.1}
                            className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-light leading-[1.15] tracking-[-0.02em] text-white"
                        >
                            We are always looking for{" "}
                            <span className="font-serif italic">passionate thinkers</span> to build alongside us.
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.2}
                            className="text-white/70 text-sm sm:text-base leading-[1.6em] max-w-[560px]"
                        >
                            Join a team that's rethinking the science of prediction. Every future is a scenario — we just run more of them.
                        </motion.p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function OpenRolesSection() {
    return (
        <section className="bg-[#121212] py-16 lg:py-24">
            <div className="max-w-[900px] mx-auto px-6 lg:px-12">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    custom={0}
                    className="mb-12"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-white text-[8px]">■</span>
                        <span className="text-white text-[11px] font-medium tracking-[0.1em] uppercase">
                            Open Roles ({openRoles.length})
                        </span>
                    </div>
                    <h2 className="text-[28px] lg:text-[36px] font-normal leading-[1.2em] tracking-[-0.01em] text-white">
                        Current <span className="font-serif italic">opportunities</span>
                    </h2>
                </motion.div>

                <div className="flex flex-col">
                    {openRoles.map((role, index) => (
                        <motion.div
                            key={role.title}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            custom={0.1 + index * 0.05}
                        >
                            <Link
                                href={role.href}
                                className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-t border-white/10 hover:bg-white/5 transition-colors px-4 -mx-4 rounded-lg"
                            >
                                <div className="flex flex-col gap-1 mb-2 sm:mb-0">
                                    <h3 className="text-white text-lg font-medium group-hover:text-white/90">{role.title}</h3>
                                    <p className="text-white/50 text-sm">{role.location}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-white/40 text-sm">{role.type}</span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white/50 group-hover:text-white transition-colors">
                                        <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    custom={0.4}
                    className="mt-12 pt-8 border-t border-white/10"
                >
                    <p className="text-white/50 text-sm mb-4">Don't see what you're looking for?</p>
                    <a
                        href="mailto:careers@lexsims.com"
                        className="text-white text-sm font-medium hover:opacity-80 transition-opacity"
                    >
                        careers@lexsims.com
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default function CareersPage() {
    return (
        <main>
            <CareersHero />
            <OpenRolesSection />
        </main>
    );
}
