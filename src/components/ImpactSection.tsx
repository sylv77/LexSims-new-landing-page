"use client";

import { motion } from "framer-motion";
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

const stats = [
  { value: "50K+", label: "Legal scenarios simulated monthly" },
  { value: "200+", label: "Jurisdictions modeled" },
  { value: "< 2hrs", label: "From case input to outcome prediction" },
];

export default function ImpactSection() {
  return (
    <section className="bg-beige min-h-screen flex items-center py-[72px] lg:py-24">
      <div className="max-w-[1248px] mx-auto px-6 lg:px-12 w-full">
        <div className="relative">
          {/* Dotted Map - Positioned absolutely on the right */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.3}
            className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 w-[700px] h-[580px]"
          >
            <Image
              src="/images/dotted-map.png"
              alt="Global reach visualization"
              fill
              className="object-contain opacity-60 brightness-0"
            />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 max-w-xl">
            {/* Label */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0}
              className="flex items-center gap-2 mb-6"
            >
              <span className="text-navy text-[8px]">&#9632;</span>
              <span className="text-navy text-[11px] font-medium tracking-[0.1em] uppercase">
                Jurisdictional Reach
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.1}
              className="text-[28px] lg:text-[36px] font-normal leading-[1.2em] tracking-[-0.01em] text-text-primary mb-6"
            >
              Legal simulation reveals what case law misses, what precedent assumes, and what intuition <span className="font-serif italic">overlooks.</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.15}
              className="text-text-secondary text-sm font-normal leading-[1.6em] mb-12"
            >
              Our platform runs continuously—generating simulated case outcomes across jurisdictions, updating litigation forecasts in real time, and surfacing legal risks before they reach your courtroom.
            </motion.p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 lg:gap-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  custom={0.2 + index * 0.1}
                  className="flex flex-col gap-2"
                >
                  <span className="text-[32px] sm:text-[40px] lg:text-[48px] font-normal leading-[1em] tracking-[-0.02em] text-navy">
                    {stat.value}
                  </span>
                  <span className="text-text-secondary text-sm font-normal leading-[1.4em]">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile Map */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.4}
            className="lg:hidden mt-12 w-full h-[250px] relative"
          >
            <Image
              src="/images/dotted-map.png"
              alt="Global reach visualization"
              fill
              className="object-contain opacity-60 brightness-0"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
