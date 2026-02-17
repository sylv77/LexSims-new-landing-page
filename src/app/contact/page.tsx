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

function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
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
            alert("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
            >
                <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h3 className="text-white text-2xl font-medium mb-3">Message Sent!</h3>
                <p className="text-white/60">We&apos;ll get back to you within 24 hours.</p>
            </motion.div>
        );
    }

    const inputClass = "w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                    placeholder="Name"
                />
                <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                    placeholder="Email"
                />
            </div>
            <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className={inputClass}
                placeholder="Company"
            />
            <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`${inputClass} resize-none`}
                placeholder="How can we help you?"
            />
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-1 px-6 py-3.5 bg-white text-[#1e1e1e] rounded-lg text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                    </>
                ) : (
                    "Get in touch"
                )}
            </button>
        </form>
    );
}

export default function ContactPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [careersOpen, setCareersOpen] = useState(false);

    return (
        <main className="bg-cream">
            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

            <section className="relative min-h-screen p-1 sm:p-2">
                <div className="relative w-full min-h-[calc(100vh-8px)] sm:min-h-[calc(100vh-16px)] rounded-xl sm:rounded-2xl overflow-hidden flex flex-col">
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
                        <div className="absolute inset-0 bg-black/40" />
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

                    {/* Centered Content */}
                    <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-8 py-12 lg:py-16">
                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0} className="flex items-center gap-2 mb-6">
                            <span className="text-white text-[8px]">&#9632;</span>
                            <span className="text-white text-[11px] font-medium tracking-[0.1em] uppercase">Contact</span>
                        </motion.div>

                        <motion.h1
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.1}
                            className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] font-light leading-[1.15] tracking-[-0.02em] text-white max-w-[700px]"
                        >
                            Let&apos;s shape the <span className="font-serif italic">future</span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.2}
                            className="text-white/70 text-sm sm:text-base leading-[1.6em] max-w-[500px] mt-6 mb-4"
                        >
                            Request a demo, explore a partnership, or just say hello. We&apos;re here to help you simulate your next legal challenge.
                        </motion.p>

                        <motion.p
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.25}
                            className="text-white/50 text-sm mb-10"
                        >
                            Based in San Francisco, CA
                        </motion.p>

                        {/* Form */}
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.3}
                            className="w-full max-w-[520px]"
                        >
                            <ContactForm />
                        </motion.div>

                        {/* Careers link */}
                        <motion.p
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.4}
                            className="text-white/30 text-sm mt-8"
                        >
                            Looking for careers?{" "}
                            <button onClick={() => setCareersOpen(true)} className="text-white/50 hover:text-white transition-colors underline">
                                Join the team
                            </button>
                        </motion.p>
                    </div>
                </div>
            </section>

            <CareersModal isOpen={careersOpen} onClose={() => setCareersOpen(false)} />
        </main>
    );
}
