"use client";

import { motion } from "framer-motion";

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

const testimonials = [
    {
        quote: "LexSims expanded our case analysis scope by an order of magnitude without sacrificing depth. We see litigation risks months before they materialize.",
        author: "David Moreau",
        title: "Chief Strategy Officer",
        company: "Global Financial Services Firm",
    },
    {
        quote: "What stood out is the rigor—the team is setting a new standard for quality and validation in strategic simulation. We walk into every board meeting with scenarios already mapped.",
        author: "Rachel Okonkwo",
        title: "VP of Corporate Strategy",
        company: "Fortune 100 Enterprise",
    },
    {
        quote: "We don&apos;t need to gamble on legal strategy anymore. With LexSims, we test every approach in simulation—then litigate with confidence.",
        author: "James Westbrook",
        title: "Head of Strategic Planning",
        company: "Leading Defense Contractor",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="bg-[#1e1e1e] py-20 lg:py-28">
            <div className="max-w-[1248px] mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    custom={0}
                    className="mb-16 text-center"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <span className="text-white text-[8px]">■</span>
                        <span className="text-white text-[11px] font-medium tracking-[0.1em] uppercase">
                            Testimonials
                        </span>
                    </div>
                    <h2 className="text-[32px] lg:text-[44px] font-light leading-[1.15] tracking-[-0.02em] text-white">
                        Partnering with <span className="font-serif italic">innovative leaders</span>
                    </h2>
                </motion.div>

                {/* Testimonial Grid */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.author}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            custom={0.1 + index * 0.1}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:p-8 flex flex-col"
                        >
                            <div className="flex-1">
                                <svg
                                    className="text-white/20 mb-4"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-white/80 text-base leading-[1.7] mb-6">
                                    "{testimonial.quote}"
                                </p>
                            </div>
                            <div className="border-t border-white/10 pt-6">
                                <p className="text-white font-medium">{testimonial.author}</p>
                                <p className="text-white/50 text-sm">{testimonial.title}</p>
                                <p className="text-white/40 text-sm">{testimonial.company}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
