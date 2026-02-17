import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service - LexSims",
    description: "LexSims Terms of Service - Rules and guidelines for using our platform.",
};

export default function TermsPage() {
    return (
        <main className="bg-cream min-h-screen">
            {/* Header */}
            <div className="border-b border-border">
                <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-text-primary text-sm transition-colors">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Home
                    </Link>
                </div>
            </div>

            <div className="max-w-[800px] mx-auto px-6 lg:px-12 pt-16 lg:pt-24 pb-24 lg:pb-32">
                {/* Title */}
                <div className="mb-16">
                    <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-text-muted mb-4">Legal</p>
                    <h1 className="text-[32px] lg:text-[40px] font-normal leading-[1.2] tracking-[-0.01em] text-text-primary mb-4">
                        Terms of Service
                    </h1>
                    <p className="text-text-muted text-sm">Effective February 2026</p>
                </div>

                {/* Intro */}
                <p className="text-text-secondary text-[15px] leading-[1.8] mb-16">
                    By accessing or using LexSims (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, please do not use our Service.
                </p>

                {/* Sections */}
                <div className="space-y-14">
                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">01</span>
                            Description of Service
                        </h2>
                        <p className="pl-8 text-text-secondary text-[15px] leading-[1.8]">
                            LexSims provides legal simulation, case outcome modeling, and predictive analytics services. Our platform uses advanced multi-agent modeling to help legal teams explore outcomes, stress-test strategies, and make data-informed decisions across litigation, regulatory compliance, and transactional domains.
                        </p>
                    </section>

                    <div className="w-full h-px bg-border" />

                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">02</span>
                            User Accounts
                        </h2>
                        <div className="pl-8">
                            <p className="text-text-secondary text-[15px] leading-[1.8] mb-4">To access certain features, you must create an account. You are responsible for:</p>
                            <ul className="space-y-2.5 text-text-secondary text-[15px] leading-[1.8]">
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Maintaining the confidentiality of your account credentials
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    All activities that occur under your account
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Notifying us immediately of any unauthorized access
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Providing accurate and complete registration information
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="w-full h-px bg-border" />

                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">03</span>
                            Acceptable Use
                        </h2>
                        <div className="pl-8">
                            <p className="text-text-secondary text-[15px] leading-[1.8] mb-4">You agree not to:</p>
                            <ul className="space-y-2.5 text-text-secondary text-[15px] leading-[1.8]">
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Use the Service for any unlawful purpose or in violation of any applicable laws
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Attempt to gain unauthorized access to our systems or other users&apos; accounts
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Interfere with, disrupt, or place undue burden on the Service or its infrastructure
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Reverse engineer, decompile, or extract source code from the platform
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Resell, sublicense, or redistribute the Service without written authorization
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="w-full h-px bg-border" />

                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">04</span>
                            Intellectual Property
                        </h2>
                        <p className="pl-8 text-text-secondary text-[15px] leading-[1.8]">
                            The Service&mdash;including its models, algorithms, interface, documentation, and all original content&mdash;is owned by LexSims and protected by international copyright, trademark, patent, and trade secret laws. You retain full ownership of any data you input into the Service. We claim no rights over your proprietary data or simulation inputs.
                        </p>
                    </section>

                    <div className="w-full h-px bg-border" />

                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">05</span>
                            Simulation Outputs &amp; Disclaimer
                        </h2>
                        <div className="pl-8 space-y-4 text-text-secondary text-[15px] leading-[1.8]">
                            <p>
                                THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. LEXSIMS DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.
                            </p>
                            <p>
                                Simulation outputs are probabilistic models intended to inform decision-making. They do not constitute legal, financial, medical, or professional advice. Users should exercise independent judgment and consult appropriate professionals before acting on any analysis.
                            </p>
                        </div>
                    </section>

                    <div className="w-full h-px bg-border" />

                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">06</span>
                            Limitation of Liability
                        </h2>
                        <p className="pl-8 text-text-secondary text-[15px] leading-[1.8]">
                            TO THE MAXIMUM EXTENT PERMITTED BY LAW, LEXSIMS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE.
                        </p>
                    </section>

                    <div className="w-full h-px bg-border" />

                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">07</span>
                            Confidentiality
                        </h2>
                        <p className="pl-8 text-text-secondary text-[15px] leading-[1.8]">
                            Both parties agree to maintain the confidentiality of any proprietary or sensitive information exchanged during the use of the Service. This obligation survives termination of these Terms for a period of two (2) years.
                        </p>
                    </section>

                    <div className="w-full h-px bg-border" />

                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">08</span>
                            Termination
                        </h2>
                        <p className="pl-8 text-text-secondary text-[15px] leading-[1.8]">
                            We may suspend or terminate your access to the Service at any time for breach of these Terms or for any reason with reasonable notice. Upon termination, your right to use the Service ceases immediately. You may request export of your data within thirty (30) days of termination.
                        </p>
                    </section>

                    <div className="w-full h-px bg-border" />

                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">09</span>
                            Modifications
                        </h2>
                        <p className="pl-8 text-text-secondary text-[15px] leading-[1.8]">
                            We reserve the right to modify these Terms at any time. Material changes will be communicated via email or a notice on the platform at least thirty (30) days before taking effect. Continued use after changes constitutes acceptance.
                        </p>
                    </section>

                    <div className="w-full h-px bg-border" />

                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">10</span>
                            Governing Law
                        </h2>
                        <p className="pl-8 text-text-secondary text-[15px] leading-[1.8]">
                            These Terms are governed by the laws of the State of California, without regard to conflict of law principles. Any disputes shall be resolved in the state or federal courts located in San Francisco County, California.
                        </p>
                    </section>

                </div>
            </div>
        </main>
    );
}
