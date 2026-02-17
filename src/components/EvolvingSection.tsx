"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";

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

// Service card icons
function SystemsStrategyIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 72V24L48 48L64 24V72" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfrastructureDesignIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 16L56 40L80 48L56 56L48 80L40 56L16 48L40 40L48 16Z" fill="white" />
    </svg>
  );
}

function ExecutionSupportIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="24" y="24" width="48" height="48" stroke="white" strokeWidth="4" />
      <rect x="36" y="36" width="24" height="24" stroke="white" strokeWidth="4" />
    </svg>
  );
}

function AIDataIcon() {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 16V80M16 48H80M26 26L70 70M70 26L26 70" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  delay: number;
}

function ServiceCard({ icon, title, description, href, delay }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLAnchorElement>(null);
  const pointsRef = useRef<{ x: number; y: number; age: number; color: string }[]>([]);
  const animationRef = useRef<number>(0);
  const colors = ["#a2b79f", "#d8a373", "#e0835c", "#c4b090", "#9a8a9a"];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const color = colors[Math.floor(Math.random() * colors.length)];

    pointsRef.current.push({ x, y, age: 0, color });
    if (pointsRef.current.length > 30) {
      pointsRef.current.shift();
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    const animate = () => {
      if (!isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pointsRef.current = [];
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pointsRef.current = pointsRef.current.filter((point) => {
        point.age += 1;
        const maxAge = 40;
        const opacity = 1 - point.age / maxAge;
        const size = 50 + point.age * 1.5;

        if (opacity <= 0) return false;

        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, size);
        gradient.addColorStop(0, `${point.color}${Math.floor(opacity * 50).toString(16).padStart(2, "0")}`);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isHovered]);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      custom={delay}
      className="flex flex-col gap-4"
    >
      {/* Card with aurora effect */}
      <Link
        ref={containerRef}
        href={href}
        className="relative block aspect-square rounded-[10px] overflow-hidden bg-[#121212]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Dot Grid Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('/images/vLikCLnzwwcHeQgCk9IbnE9w0.png')`,
            backgroundRepeat: "repeat",
            backgroundPosition: "left top",
            backgroundSize: "1482px auto",
          }}
        />

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('/images/noise-texture.png')`,
            backgroundRepeat: "repeat",
            backgroundPosition: "left top",
            backgroundSize: "150px auto",
          }}
        />

        {/* Aurora Blobs - shown on hover */}
        <div
          className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Light gradient base - same as hero */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #b0b8a0 0%, #c8c0b0 50%, #c8b0a0 100%)",
            }}
          />
          {/* Aurora blobs */}
          <div className="aurora-blob aurora-blob--green" />
          <div className="aurora-blob aurora-blob--purple" />
          <div className="aurora-blob aurora-blob--orange" />
        </div>

        {/* Cursor Effect Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{ mixBlendMode: "soft-light" }}
        />

        {/* Icon */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-24 h-24">{icon}</div>
        </div>
      </Link>

      {/* Content below card */}
      <div className="flex flex-col gap-2">
        <h4 className="text-white text-sm font-medium">{title}</h4>
        <p className="text-white/70 text-sm leading-[1.5em]">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-white text-sm font-medium hover:opacity-80 transition-opacity mt-1"
        >
          Learn more
          <ArrowDownLeftIcon />
        </Link>
      </div>
    </motion.div>
  );
}

const services = [
  {
    icon: <SystemsStrategyIcon />,
    title: "CapSims",
    description: "Stress-test product launches, pricing moves, and market entry strategies against millions of synthetic consumers before committing resources.",
    href: "/product#capsims",
  },
  {
    icon: <ExecutionSupportIcon />,
    title: "PoliSims",
    description: "Model electorate dynamics, campaign messaging impact, and policy cascades with population-scale behavioral simulation.",
    href: "/product#polisims",
  },
  {
    icon: <InfrastructureDesignIcon />,
    title: "RegSims",
    description: "Track emerging regulatory risks, viral narratives, and sentiment shifts in real time. Know what's coming before it arrives.",
    href: "/product#regsims",
  },
  {
    icon: <AIDataIcon />,
    title: "LexSims",
    description: "Transform litigation strategy with adversarial simulation. Generate probability distributions for case outcomes across thousands of scenarios.",
    href: "/product#lexsims",
  },
];

export default function EvolvingSection() {
  return (
    <section className="bg-[#1e1e1e] py-[72px] lg:py-24">
      <div className="max-w-[1248px] mx-auto px-6 lg:px-12 w-full">
        {/* Headline */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={0}
          className="mb-16 lg:mb-20"
        >
          <h2 className="text-[28px] lg:text-[36px] font-normal leading-[1.3em] tracking-[-0.01em]">
            <span className="text-white">We are an AI research lab pushing frontier legal simulation <span className="font-serif italic">science.</span></span>{" "}
            <span className="text-white/50">
              Our models don&apos;t just analyze case law. They simulate how legal actors actually decide.
            </span>
          </h2>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              href={service.href}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
