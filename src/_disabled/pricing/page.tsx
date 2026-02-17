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

const pricingTiers = [
    {
        name: "Starter",
        price: "Contact Us",
        description: "For teams exploring decision intelligence",
        features: [
            "Up to 5 users",
            "100 simulations/month",
            "Basic scenario modeling",
            "Email support",
            "Standard analytics",
        ],
        highlighted: false,
    },
    {
        name: "Professional",
        price: "Contact Us",
        description: "For growing teams with complex needs",
        features: [
            "Up to 25 users",
            "Unlimited simulations",
            "Advanced behavioral modeling",
            "Priority support",
            "Custom integrations",
            "API access",
        ],
        highlighted: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        description: "For large organizations requiring full capability",
        features: [
            "Unlimited users",
            "Unlimited simulations",
            "White-glove onboarding",
            "Dedicated success manager",
            "On-premise deployment option",
            "Custom model development",
            "SLA guarantees",
        ],
        highlighted: false,
    },
];

export default function PricingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <main className="bg-[#1e1e1e] min-h-screen">
            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            {/* Hero Section */}
            <section className="relative p-1 sm:p-2">
                <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden">
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
                            <span className="text-white text-[11px] font-medium tracking-[0.1em] uppercase">Pricing</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.1}
                            className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-light leading-[1.15] tracking-[-0.02em] text-white max-w-[700px]"
                        >
                            Simple, <span className="font-serif italic">transparent</span> pricing
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.2}
                            className="text-white/70 text-sm sm:text-base leading-[1.6em] max-w-[500px] mt-6"
                        >
                            Choose the plan that fits your organization. All plans include core simulation capabilities.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Pricing Grid */}
            <section className="py-16 lg:py-24">
                <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                        {pricingTiers.map((tier, index) => (
                            <motion.div
                                key={tier.name}
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                custom={0.1 + index * 0.1}
                                className={`relative rounded-2xl p-6 lg:p-8 flex flex-col ${tier.highlighted
                                        ? "bg-white text-[#1e1e1e] border-2 border-white"
                                        : "bg-white/5 border border-white/10"
                                    }`}
                            >
                                {tier.highlighted && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1e1e1e] text-white text-xs px-3 py-1 rounded-full">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className={`text-2xl font-medium mb-2 ${tier.highlighted ? "text-[#1e1e1e]" : "text-white"}`}>
                                    {tier.name}
                                </h3>
                                <p className={`text-sm mb-6 ${tier.highlighted ? "text-[#1e1e1e]/60" : "text-white/60"}`}>
                                    {tier.description}
                                </p>
                                <div className={`text-3xl font-light mb-6 ${tier.highlighted ? "text-[#1e1e1e]" : "text-white"}`}>
                                    {tier.price}
                                </div>
                                <ul className="flex-1 space-y-3 mb-8">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-3">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                className={`mt-0.5 shrink-0 ${tier.highlighted ? "text-[#1e1e1e]" : "text-white/70"}`}
                                            >
                                                <path
                                                    d="M3.5 8L6.5 11L12.5 5"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <span className={`text-sm ${tier.highlighted ? "text-[#1e1e1e]/80" : "text-white/70"}`}>
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/demo"
                                    className={`w-full py-3 rounded-full text-sm font-medium text-center transition-colors ${tier.highlighted
                                            ? "bg-[#1e1e1e] text-white hover:bg-[#1e1e1e]/90"
                                            : "bg-white text-[#1e1e1e] hover:bg-white/90"
                                        }`}
                                >
                                    Get Started
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Enterprise CTA */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.3}
                        className="mt-16 text-center"
                    >
                        <p className="text-white/50 text-sm mb-4">
                            Need a custom solution for your organization?
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors text-sm font-medium"
                        >
                            Contact our sales team
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
