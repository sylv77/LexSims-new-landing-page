"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface SlideContent {
  number: string;
  label: string;
  headline: string;
  description: string;
}

const SLIDES: SlideContent[] = [
  {
    number: "01",
    label: "LEGAL ACTORS",
    headline:
      "Build AI judges, jurors, regulators, and opposing counsel that carry the full complexity of legal reasoning\u2014precedent knowledge, judicial temperament, and argumentative strategy.",
    description: "Authenticity at any scale.",
  },
  {
    number: "02",
    label: "CASE ENVIRONMENTS",
    headline:
      "Construct complete legal landscapes\u2014specific jurisdictions, evolving regulations, shifting case law, procedural rules\u2014and observe how legal actors respond to each strategy.",
    description: "Rehearse tomorrow\u2019s cases today.",
  },
  {
    number: "03",
    label: "OUTCOME INTELLIGENCE",
    headline:
      "When thousands of simulated case paths converge, verdict patterns emerge that no analyst could see. Cut through assumption and surface what the case data actually says.",
    description: "Intelligence hidden in complexity.",
  },
  {
    number: "04",
    label: "COMPOUNDING PRECISION",
    headline:
      "Every case simulation sharpens the model. Outcome predictions improve. Legal blind spots surface. The more you run, the closer you get to ground truth.",
    description: "Confidence you can measure.",
  },
];

// Accent colors for label chips
const SLIDE_ACCENT = [
  "rgba(255,255,255,0.1)",
  "rgba(255,255,255,0.1)",
  "rgba(255,255,255,0.1)",
  "rgba(255,255,255,0.1)",
];
const SLIDE_ACCENT_TEXT = [
  "rgba(255,255,255,0.7)",
  "rgba(255,255,255,0.7)",
  "rgba(255,255,255,0.7)",
  "rgba(255,255,255,0.7)",
];

export default function SimulationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slideCount = SLIDES.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${slideCount * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Aurora gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 150% 100% at 0% 0%, rgba(38,38,46,0.9) 0%, rgba(38,38,46,0) 50%),
              radial-gradient(ellipse 150% 100% at 100% 0%, rgba(46,38,46,0.85) 0%, rgba(46,38,46,0) 50%),
              radial-gradient(ellipse 150% 100% at 50% 40%, rgba(45,42,38,0.7) 0%, rgba(45,42,38,0) 45%),
              radial-gradient(ellipse 150% 100% at 0% 100%, rgba(50,47,40,0.8) 0%, rgba(50,47,40,0) 50%),
              radial-gradient(ellipse 150% 100% at 100% 100%, rgba(42,42,44,0.75) 0%, rgba(42,42,44,0) 50%),
              linear-gradient(135deg, rgba(20,20,23,1) 0%, rgba(22,20,22,1) 100%)
            `,
          }}
        />
        {/* Noise texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          style={{
            backgroundImage: `url('/images/noise-texture.png')`,
            backgroundRepeat: "repeat",
            backgroundSize: "150px auto",
          }}
        />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.3) 1.2px, transparent 1.2px)`,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Giant watermark number */}
        {SLIDES.map((slide, index) => (
          <WatermarkNumber
            key={index}
            number={slide.number}
            index={index}
            totalSlides={slideCount}
            scrollProgress={scrollYProgress}
          />
        ))}

        {/* Centered content */}
        <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl text-center relative h-[380px] w-full">
            {SLIDES.map((slide, index) => (
              <SlideText
                key={index}
                slide={slide}
                index={index}
                totalSlides={slideCount}
                scrollProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Horizontal progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
          <motion.div
            className="h-full origin-left"
            style={{
              scaleX: scrollYProgress,
              background: "linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.4))",
            }}
          />
        </div>

        {/* Slide counter */}
        <SlideCounter
          scrollProgress={scrollYProgress}
          totalSlides={slideCount}
        />

        {/* Scroll indicator — only on first slide */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]),
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/30">
              Scroll
            </span>
            <div className="w-px h-6 bg-white/15" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function WatermarkNumber({
  number,
  index,
  totalSlides,
  scrollProgress,
}: {
  number: string;
  index: number;
  totalSlides: number;
  scrollProgress: MotionValue<number>;
}) {
  const segmentSize = 1 / totalSlides;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;

  const opacity = useTransform(
    scrollProgress,
    [
      Math.max(0, start - 0.02),
      start + 0.04,
      end - 0.1,
      Math.min(1, end + 0.02),
    ],
    [0, 0.04, 0.04, 0]
  );

  const scale = useTransform(
    scrollProgress,
    [start, start + 0.05, end - 0.05, end],
    [0.9, 1, 1, 1.1]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] select-none"
      style={{ opacity, scale }}
    >
      <span className="text-[200px] sm:text-[280px] md:text-[360px] font-bold text-white tabular-nums leading-none">
        {number}
      </span>
    </motion.div>
  );
}

function SlideText({
  slide,
  index,
  totalSlides,
  scrollProgress,
}: {
  slide: SlideContent;
  index: number;
  totalSlides: number;
  scrollProgress: MotionValue<number>;
}) {
  const segmentSize = 1 / totalSlides;
  const start = index * segmentSize;
  const end = (index + 1) * segmentSize;

  const opacity = useTransform(
    scrollProgress,
    [
      Math.max(0, start - 0.01),
      start + 0.04,
      end - 0.08,
      Math.min(1, end + 0.01),
    ],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollProgress,
    [start, start + 0.05, end - 0.05, end],
    [40, 0, 0, -40]
  );

  const textScale = useTransform(
    scrollProgress,
    [start, start + 0.05, end - 0.05, end],
    [0.96, 1, 1, 0.96]
  );

  const blur = useTransform(scrollProgress, (v) => {
    const segV = (v - start) / segmentSize;
    if (segV < 0.1) return `blur(${(1 - segV / 0.1) * 3}px)`;
    if (segV > 0.85) return `blur(${((segV - 0.85) / 0.15) * 3}px)`;
    return "blur(0px)";
  });

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center items-center"
      style={{ opacity, y, scale: textScale, filter: blur }}
    >
      {/* Label chip */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[11px] font-medium tracking-[0.1em] uppercase px-3 py-1 rounded-full"
          style={{
            backgroundColor: SLIDE_ACCENT[index],
            color: SLIDE_ACCENT_TEXT[index],
          }}
        >
          {slide.number} &mdash; {slide.label}
        </span>
      </div>

      <h2 className="text-[26px] md:text-[34px] lg:text-[40px] font-normal leading-[1.2em] tracking-[-0.01em] text-white/90 mb-5">
        {slide.headline}
      </h2>

      <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-xl mx-auto">
        {slide.description}
      </p>
    </motion.div>
  );
}

function SlideCounter({
  scrollProgress,
  totalSlides,
}: {
  scrollProgress: MotionValue<number>;
  totalSlides: number;
}) {
  const slideNumber = useTransform(scrollProgress, (v) => {
    const num = Math.min(Math.floor(v * totalSlides) + 1, totalSlides);
    return num.toString().padStart(2, "0");
  });

  return (
    <motion.div className="absolute left-6 md:left-10 bottom-6 flex items-center gap-2 text-white/30">
      <motion.span className="text-sm font-medium tabular-nums">
        {slideNumber}
      </motion.span>
      <span className="text-xs">/</span>
      <span className="text-sm font-medium">
        {totalSlides.toString().padStart(2, "0")}
      </span>
    </motion.div>
  );
}
