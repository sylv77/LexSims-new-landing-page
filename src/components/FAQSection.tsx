"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const faqs = [
    {
        question: "How does LexSims differ from traditional legal analytics?",
        answer: "Traditional legal analytics relies on static case databases, historical win rates, and keyword-based research. LexSims builds living simulations where every legal actor—judges, jurors, opposing counsel, regulators—behaves independently and responds dynamically to your legal strategy. Think of it as a flight simulator for legal decisions: you get probability distributions across thousands of case scenarios, not single-point predictions.",
    },
    {
        question: "What kinds of legal decisions can I simulate?",
        answer: "Any legal decision involving multiple parties and uncertain outcomes. Litigation strategy, settlement negotiations, regulatory compliance responses, M&A legal risk, patent disputes, class action exposure, and contract disputes. Each simulation runs thousands of scenario paths tailored to your specific case context, delivering outcome intelligence you can act on.",
    },
    {
        question: "How accurate are the legal simulations?",
        answer: "Our legal actor models generate probability distributions rather than single predictions, and these distributions have shown strong alignment with real-world case outcomes in backtesting. Like a flight simulator that improves with every hour logged, accuracy increases continuously as models ingest new case law, judicial rulings, and regulatory actions in your practice area.",
    },
    {
        question: "How is my case data handled?",
        answer: "We implement enterprise-grade security including end-to-end encryption, SOC 2 compliance, and fully isolated data environments. Your case data is never used to train models for other clients. We also support on-premise deployment for organizations with strict data residency and attorney-client privilege requirements.",
    },
    {
        question: "What practice areas do you serve?",
        answer: "We serve litigation (case outcome modeling and trial strategy), regulatory compliance (SEC, FDA, EPA enforcement simulation), M&A (antitrust risk and deal structure analysis), intellectual property (patent dispute and injunction modeling), employment law, insurance defense, securities litigation, and international arbitration. Each practice area has specialized legal actor models tuned for domain-specific simulation.",
    },
    {
        question: "How do I get started?",
        answer: "Request a demo through our website. Our team will build an initial simulation of a case scenario relevant to your practice and walk you through a live simulation—so you can see exactly how LexSims works with your legal context before any commitment.",
    },
];

function FAQItem({ question, answer, isOpen, onToggle }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="border-b border-white/10">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-6 text-left group"
            >
                <span className="text-white text-base lg:text-lg font-medium pr-8 group-hover:text-white/80 transition-colors">
                    {question}
                </span>
                <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full border border-white/20 group-hover:border-white/40 transition-colors">
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    >
                        <path
                            d="M6 2V10M2 6H10"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="text-white/60 text-base leading-[1.7] pb-6">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="bg-[#121212] py-20 lg:py-28">
            <div className="max-w-[800px] mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    custom={0}
                    className="mb-12 text-center"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-white text-[8px]">■</span>
                        <span className="text-white text-[11px] font-medium tracking-[0.1em] uppercase">
                            FAQ
                        </span>
                    </div>
                    <h2 className="text-[32px] lg:text-[44px] font-light leading-[1.15] tracking-[-0.02em] text-white">
                        Common <span className="font-serif italic">questions</span>
                    </h2>
                </motion.div>

                {/* FAQ List */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    custom={0.1}
                >
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={faq.question}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
