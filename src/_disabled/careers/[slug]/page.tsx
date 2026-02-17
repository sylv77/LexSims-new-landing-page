"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

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

const jobData: Record<string, {
    title: string;
    location: string;
    type: string;
    department: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
}> = {
    "software-engineer": {
        title: "Software Engineer",
        location: "San Francisco / Remote",
        type: "Full-time",
        department: "Engineering",
        description: "We're looking for a Software Engineer to help build our next-generation simulation platform. You'll work on complex distributed systems, real-time data pipelines, and elegant user experiences.",
        responsibilities: [
            "Design and implement scalable backend services",
            "Build intuitive frontend interfaces for complex simulation tools",
            "Collaborate with ML engineers to integrate AI models",
            "Write clean, maintainable, and well-tested code",
            "Participate in architecture decisions and code reviews",
        ],
        requirements: [
            "3+ years of software engineering experience",
            "Strong proficiency in TypeScript, Python, or Go",
            "Experience with cloud platforms (AWS, GCP, or Azure)",
            "Familiarity with modern frontend frameworks (React, Next.js)",
            "Excellent problem-solving and communication skills",
        ],
    },
    "machine-learning-engineer": {
        title: "Machine Learning Engineer",
        location: "San Francisco / Remote",
        type: "Full-time",
        department: "AI Research",
        description: "Join our AI team to build simulation engines that predict human behavior at scale. You'll work on multi-agent systems, behavioral modeling, and cutting-edge generative AI.",
        responsibilities: [
            "Develop and train large-scale agent-based models",
            "Build inference pipelines for real-time predictions",
            "Research and implement state-of-the-art ML techniques",
            "Collaborate with domain experts to validate model accuracy",
            "Optimize models for production deployment",
        ],
        requirements: [
            "MS/PhD in Computer Science, ML, or related field",
            "3+ years of experience in applied machine learning",
            "Strong Python skills and experience with PyTorch or JAX",
            "Experience with LLMs and generative models preferred",
            "Published research is a plus",
        ],
    },
    "product-designer": {
        title: "Product Designer",
        location: "San Francisco / Remote",
        type: "Full-time",
        department: "Design",
        description: "We need a Product Designer to craft intuitive interfaces for complex simulation systems. You'll shape how legal professionals and strategists interact with predictive AI.",
        responsibilities: [
            "Design end-to-end user experiences for simulation tools",
            "Create wireframes, prototypes, and high-fidelity mockups",
            "Conduct user research and usability testing",
            "Collaborate with engineers to ship polished products",
            "Define and maintain our design system",
        ],
        requirements: [
            "4+ years of product design experience",
            "Strong portfolio demonstrating complex B2B product work",
            "Proficiency in Figma and prototyping tools",
            "Experience with data visualization is a plus",
            "Excellent communication and collaboration skills",
        ],
    },
    "legal-strategy-analyst": {
        title: "Legal Strategy Analyst",
        location: "New York / Remote",
        type: "Full-time",
        department: "Strategy",
        description: "We're seeking a Legal Strategy Analyst to bridge the gap between our AI technology and legal industry needs. You'll work directly with clients to understand their cases and configure our simulation platform.",
        responsibilities: [
            "Analyze legal cases and configure simulation parameters",
            "Work with clients to understand their strategic needs",
            "Interpret simulation outputs and provide actionable insights",
            "Collaborate with engineering to improve platform capabilities",
            "Develop best practices for litigation forecasting",
        ],
        requirements: [
            "JD or equivalent legal background",
            "2+ years of litigation or legal consulting experience",
            "Strong analytical and quantitative skills",
            "Comfort with technology and data-driven approaches",
            "Excellent client communication skills",
        ],
    },
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
                            <Link href="/careers" onClick={onClose} className="px-4 py-3 text-[16px] text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Careers</Link>
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
                        <Link href="/careers" className="px-4 py-2 text-[14px] font-medium text-white hover:text-white transition-colors">Careers</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function ApplicationForm({ jobTitle, onClose }: { jobTitle: string; onClose: () => void }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        coverLetter: "",
    });
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('email', formData.email);
            submitData.append('phone', formData.phone);
            submitData.append('linkedin', formData.linkedin);
            submitData.append('coverLetter', formData.coverLetter);
            submitData.append('jobTitle', jobTitle);
            if (resumeFile) {
                submitData.append('resume', resumeFile);
            }

            const response = await fetch('/api/apply', {
                method: 'POST',
                body: submitData,
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setResumeFile(file);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative bg-[#1e1e1e] rounded-2xl p-8 max-w-md w-full border border-white/10 text-center"
                >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h3 className="text-white text-2xl font-medium mb-3">Application Submitted!</h3>
                    <p className="text-white/60 mb-6">
                        Thank you for applying for {jobTitle}. We'll review your application and get back to you soon.
                    </p>
                    <button
                        onClick={onClose}
                        className="px-6 py-3 bg-white text-[#1e1e1e] rounded-full font-medium hover:bg-white/90 transition-colors"
                    >
                        Done
                    </button>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative bg-[#1e1e1e] rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-white/10 my-8"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Header */}
                <div className="mb-8">
                    <h3 className="text-white text-2xl font-medium mb-2">Apply for {jobTitle}</h3>
                    <p className="text-white/50 text-sm">Fill out the form below and we'll be in touch.</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name */}
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

                    {/* Email */}
                    <div>
                        <label className="block text-white/70 text-sm mb-2">Email *</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="john@example.com"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-white/70 text-sm mb-2">Phone</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="+1 (555) 123-4567"
                        />
                    </div>

                    {/* LinkedIn */}
                    <div>
                        <label className="block text-white/70 text-sm mb-2">LinkedIn Profile</label>
                        <input
                            type="url"
                            value={formData.linkedin}
                            onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="https://linkedin.com/in/johndoe"
                        />
                    </div>

                    {/* Resume Upload */}
                    <div>
                        <label className="block text-white/70 text-sm mb-2">Resume *</label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 border-dashed rounded-lg text-white/50 hover:text-white hover:border-white/30 transition-colors flex items-center justify-center gap-2"
                        >
                            {resumeFile ? (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                    <span className="text-white">{resumeFile.name}</span>
                                </>
                            ) : (
                                <>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                                    </svg>
                                    Upload Resume (PDF, DOC)
                                </>
                            )}
                        </button>
                    </div>

                    {/* Cover Letter */}
                    <div>
                        <label className="block text-white/70 text-sm mb-2">Cover Letter</label>
                        <textarea
                            value={formData.coverLetter}
                            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors resize-none"
                            placeholder="Tell us why you're interested in this role..."
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting || !formData.name || !formData.email || !resumeFile}
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
                                Submit Application
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]">
                                    <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </motion.div>
    );
}

export default function JobDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const job = jobData[slug];
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showApplicationForm, setShowApplicationForm] = useState(false);

    if (!job) {
        return (
            <main className="bg-[#1e1e1e] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-white text-2xl mb-4">Job not found</h1>
                    <Link href="/careers" className="text-white/70 hover:text-white">← Back to Careers</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[#1e1e1e] min-h-screen">
            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
            <Navigation onMenuOpen={() => setMobileMenuOpen(true)} />

            <AnimatePresence>
                {showApplicationForm && (
                    <ApplicationForm jobTitle={job.title} onClose={() => setShowApplicationForm(false)} />
                )}
            </AnimatePresence>

            <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-12 lg:py-20">
                {/* Back Link */}
                <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0}>
                    <Link href="/careers" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back to Careers
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.1} className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-xs">{job.department}</span>
                        <span className="text-white/40 text-sm">{job.type}</span>
                    </div>
                    <h1 className="text-[36px] lg:text-[48px] font-light leading-[1.15] tracking-[-0.02em] text-white mb-4">
                        {job.title}
                    </h1>
                    <p className="text-white/50 text-base">{job.location}</p>
                </motion.div>

                {/* Description */}
                <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.2} className="mb-12">
                    <p className="text-white/70 text-base leading-[1.8]">{job.description}</p>
                </motion.div>

                {/* Responsibilities */}
                <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.3} className="mb-12">
                    <h2 className="text-white text-xl font-medium mb-6">Responsibilities</h2>
                    <ul className="flex flex-col gap-3">
                        {job.responsibilities.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="text-white text-[6px] mt-[8px] shrink-0">■</span>
                                <span className="text-white/70 text-base leading-[1.6]">{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Requirements */}
                <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.4} className="mb-12">
                    <h2 className="text-white text-xl font-medium mb-6">Requirements</h2>
                    <ul className="flex flex-col gap-3">
                        {job.requirements.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="text-white text-[6px] mt-[8px] shrink-0">■</span>
                                <span className="text-white/70 text-base leading-[1.6]">{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Apply Button */}
                <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={0.5}>
                    <button
                        onClick={() => setShowApplicationForm(true)}
                        className="inline-flex items-center gap-2 bg-white text-[#1e1e1e] px-8 py-4 rounded-full text-base font-medium hover:bg-white/90 transition-colors"
                    >
                        Apply for this role
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]">
                            <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </motion.div>
            </div>
        </main>
    );
}
