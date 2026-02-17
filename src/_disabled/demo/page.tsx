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
                </div>
            </div>
        </nav>
    );
}

const useCases = [
    "Litigation Strategy",
    "Regulatory Compliance",
    "Market Research",
    "Policy Analysis",
    "Risk Assessment",
    "Other",
];

function DemoForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        role: "",
        useCase: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://submit-form.com/qhJuRGRYg", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to send");
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
            >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h3 className="text-white text-2xl font-medium mb-3">Demo Request Received!</h3>
                <p className="text-white/60 mb-4">We'll reach out within 24 hours to schedule your personalized demo.</p>
                <Link href="/" className="text-white/70 hover:text-white transition-colors underline text-sm">
                    Back to Home
                </Link>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-white/70 text-sm mb-2">Full Name *</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-white/70 text-sm mb-2">Work Email *</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="john@company.com"
                    />
                </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-white/70 text-sm mb-2">Company *</label>
                    <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="Acme Law Firm"
                    />
                </div>
                <div>
                    <label className="block text-white/70 text-sm mb-2">Job Title</label>
                    <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="Partner"
                    />
                </div>
            </div>

            <div>
                <label className="block text-white/70 text-sm mb-2">Primary Use Case *</label>
                <select
                    required
                    value={formData.useCase}
                    onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                >
                    <option value="" className="bg-[#1e1e1e]">Select a use case</option>
                    {useCases.map((uc) => (
                        <option key={uc} value={uc} className="bg-[#1e1e1e]">{uc}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-white/70 text-sm mb-2">Anything else we should know?</label>
                <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Tell us about your needs..."
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 px-6 py-4 bg-white text-[#1e1e1e] rounded-full font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                    </>
                ) : (
                    <>
                        Request Demo
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]">
                            <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </>
                )}
            </button>
        </form>
    );
}

export default function DemoPage() {
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

                    {/* Header Content */}
                    <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-8 lg:px-16 py-16 lg:py-24">
                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0} className="flex items-center gap-2 mb-6">
                            <span className="text-white text-[8px]">■</span>
                            <span className="text-white text-[11px] font-medium tracking-[0.1em] uppercase">Get Started</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.1}
                            className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-light leading-[1.15] tracking-[-0.02em] text-white max-w-[700px]"
                        >
                            Request a <span className="font-serif italic">demo</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.2}
                            className="text-white/70 text-sm sm:text-base leading-[1.6em] max-w-[500px] mt-6"
                        >
                            See how LexSims&apos; legal simulation platform delivers outcome intelligence through a personalized walkthrough.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-[600px] mx-auto px-6 lg:px-12">
                    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
                        <DemoForm />
                    </motion.div>

                    <motion.p
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.2}
                        className="text-center text-white/40 text-sm mt-8"
                    >
                        Have a quick question?{" "}
                        <Link href="/contact" className="text-white/60 hover:text-white transition-colors underline">
                            Contact us
                        </Link>
                    </motion.p>
                </div>
            </section>
        </main>
    );
}
