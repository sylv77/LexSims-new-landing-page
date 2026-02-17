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
                            <Link href="/" onClick={onClose} className="px-4 py-3 text-[16px] text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Home</Link>
                            <Link href="/product" onClick={onClose} className="px-4 py-3 text-[16px] text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Product</Link>
                            <Link href="/about" onClick={onClose} className="px-4 py-3 text-[16px] text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors">About</Link>
                            {/* <Link href="/careers" onClick={onClose} className="px-4 py-3 text-[16px] text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Careers</Link> */}
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
                    <Image src="/images/helm-logo.png" alt="LexSims" width={120} height={120} className="h-7 sm:h-8 w-auto" />
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
                        <Link href="/product" className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors">Product</Link>
                        <Link href="/about" className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors">About</Link>
                        {/* <Link href="/careers" className="px-4 py-2 text-[14px] font-medium text-white/90 hover:text-white transition-colors">Careers</Link> */}
                    </div>
                    <Link
                        href="/demo"
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

const blogPosts = [
    {
        slug: "future-of-legal-ai",
        title: "The Future of AI in Legal Strategy",
        excerpt: "How multi-agent simulation is transforming litigation prediction and strategic planning for law firms.",
        category: "Industry Insights",
        date: "January 2026",
        readTime: "8 min read",
    },
    {
        slug: "predictive-modeling-guide",
        title: "A Guide to Predictive Modeling in Law",
        excerpt: "Understanding how probability distributions and Monte Carlo simulations improve case outcome forecasting.",
        category: "Technical Deep Dive",
        date: "January 2026",
        readTime: "12 min read",
    },
    {
        slug: "behavioral-simulation-intro",
        title: "Introduction to Behavioral Simulation",
        excerpt: "Exploring how agent-based models capture human decision-making patterns in complex scenarios.",
        category: "Research",
        date: "December 2025",
        readTime: "10 min read",
    },
    {
        slug: "regulatory-forecasting",
        title: "Regulatory Forecasting: What's Coming in 2026",
        excerpt: "Our predictions for major regulatory shifts and how organizations can prepare for compliance changes.",
        category: "Industry Insights",
        date: "December 2025",
        readTime: "6 min read",
    },
];

export default function BlogPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <main className="bg-[#1e1e1e] min-h-screen">
            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            {/* Hero Section */}
            <section className="relative p-1 sm:p-2">
                <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden">
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

                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.35]"
                        style={{
                            backgroundImage: `url('/images/noise-texture.png')`,
                            backgroundRepeat: "repeat",
                            backgroundSize: "150px auto",
                        }}
                    />

                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1.2px, transparent 1.2px)`,
                            backgroundSize: "50px 50px",
                        }}
                    />

                    <Navigation onMenuOpen={() => setMobileMenuOpen(true)} />

                    <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0} className="flex items-center gap-2 mb-6">
                            <span className="text-white text-[8px]">■</span>
                            <span className="text-white text-[11px] font-medium tracking-[0.1em] uppercase">Blog</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.1}
                            className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-light leading-[1.15] tracking-[-0.02em] text-white max-w-[700px]"
                        >
                            Insights & <span className="font-serif italic">Research</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.2}
                            className="text-white/70 text-sm sm:text-base leading-[1.6em] max-w-[500px] mt-6"
                        >
                            Thought leadership on decision intelligence, simulation, and the future of strategic analysis.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16 lg:py-24">
                <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
                    <div className="grid md:grid-cols-2 gap-8">
                        {blogPosts.map((post, index) => (
                            <motion.article
                                key={post.slug}
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                custom={0.1 + index * 0.1}
                                className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 hover:border-white/20 transition-colors group"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs text-white/50 bg-white/10 px-3 py-1 rounded-full">{post.category}</span>
                                    <span className="text-xs text-white/40">{post.date}</span>
                                </div>
                                <h2 className="text-white text-xl lg:text-2xl font-medium mb-3 group-hover:text-white/90 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-white/60 text-sm leading-[1.7] mb-6">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-white/40 text-xs">{post.readTime}</span>
                                    <span className="text-white/50 text-sm group-hover:text-white transition-colors flex items-center gap-2">
                                        Read more
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {/* Coming Soon Notice */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.3}
                        className="mt-16 text-center"
                    >
                        <p className="text-white/40 text-sm">
                            More articles coming soon. <Link href="/contact" className="text-white/60 hover:text-white underline">Subscribe to our newsletter</Link> to stay updated.
                        </p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
