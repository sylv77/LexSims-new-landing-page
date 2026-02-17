"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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

function ClinicalTechnologiesIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 36V12L24 24L36 12V36"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BioinformaticsIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 4L28 20L44 24L28 28L24 44L20 28L4 24L20 20L24 4Z"
        fill="white"
      />
    </svg>
  );
}

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

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  delay: number;
}

function ServiceCard({ icon, title, delay }: ServiceCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      custom={delay}
      className="flex flex-col justify-between p-[18px] lg:p-6 min-h-[200px] border border-white/10 rounded-[10px]"
    >
      <div className="w-10 h-10">{icon}</div>
      <p className="text-white text-sm font-medium leading-[1.4em]">
        {title}
      </p>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section className="bg-[#1e1e1e] min-h-screen flex items-center py-12 sm:py-[72px] lg:py-24">
      <div className="max-w-[1248px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col gap-6">
            {/* Headline */}
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0}
              className="text-[28px] lg:text-[36px] font-normal leading-[1.2em] tracking-[-0.01em] text-white"
            >
              See the system. Shape the outcome.
            </motion.h2>

            {/* Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ServiceCard
                icon={<ClinicalTechnologiesIcon />}
                title="Litigation Foresight"
                delay={0.1}
              />
              <ServiceCard
                icon={<BioinformaticsIcon />}
                title="Regulatory Intelligence"
                delay={0.2}
              />
            </div>

            {/* Subheading and Description */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.3}
              className="flex flex-col gap-2"
            >
              <p className="text-white text-sm font-medium leading-[1.4em]">
                Scenario Intelligence
              </p>
              <p className="text-white/70 text-sm font-normal leading-[1.4em]">
                We build engines that model how litigation, regulation, and compliance collide. Run case scenarios. Stress-test legal strategies. Know what works before you commit.
              </p>
            </motion.div>

            {/* Explore Link */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0.4}
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-white text-sm font-medium leading-[1.4em] hover:opacity-80 transition-opacity"
              >
                See the platform
                <ArrowDownLeftIcon />
              </Link>
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0.2}
            className="relative w-full h-[400px] lg:h-full lg:min-h-[500px] rounded-[10px] overflow-hidden"
          >
            <Image
              src="/images/jFoBbK5cesdAk7KUPUmJ6Ikes.webp"
              alt="Strategic analysis and scenario planning"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
