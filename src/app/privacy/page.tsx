import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy - LexSims",
    description: "LexSims Privacy Policy - How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
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
                        Privacy Policy
                    </h1>
                    <p className="text-text-muted text-sm">Bili Technologies, Inc. d/b/a LexSims</p>
                    <p className="text-text-muted text-sm mt-1">Effective Date: January 1, 2026 &nbsp;|&nbsp; Last Updated: January 1, 2026</p>
                </div>

                {/* Intro */}
                <p className="text-text-secondary text-[15px] leading-[1.8] mb-16">
                    Bili Technologies, Inc. d/b/a LexSims (&ldquo;LexSims,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (www.lexsims.com) or use our Platform and services.
                </p>

                {/* Sections */}
                <div className="space-y-14">
                    {/* 1. Information We Collect */}
                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-6 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">01</span>
                            Information We Collect
                        </h2>
                        <div className="pl-8 space-y-6">
                            <div>
                                <h3 className="text-text-primary text-[14px] font-medium mb-3">Information You Provide</h3>
                                <div className="space-y-4 text-text-secondary text-[15px] leading-[1.8]">
                                    <p><strong className="text-text-primary">Account Information.</strong> Name, email address, job title, company name, phone number, and other contact details when you create an account or request information.</p>
                                    <p><strong className="text-text-primary">Billing Information.</strong> Payment card details, billing address, and related financial information (processed by our payment processors).</p>
                                    <p><strong className="text-text-primary">Customer Data.</strong> Information you upload or input into the Platform, including documents, case information, and simulation parameters.</p>
                                    <p><strong className="text-text-primary">Communications.</strong> Information you provide when contacting support, providing feedback, or participating in surveys.</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-text-primary text-[14px] font-medium mb-3">Information Collected Automatically</h3>
                                <div className="space-y-4 text-text-secondary text-[15px] leading-[1.8]">
                                    <p><strong className="text-text-primary">Usage Data.</strong> Information about how you access and use the Platform, including features used, actions taken, and time spent.</p>
                                    <p><strong className="text-text-primary">Device Information.</strong> Device type, operating system, browser type, unique device identifiers, and IP address.</p>
                                    <p><strong className="text-text-primary">Log Data.</strong> Server logs, access times, pages viewed, and referring URLs.</p>
                                    <p><strong className="text-text-primary">Cookies and Tracking.</strong> Information collected through cookies, web beacons, and similar technologies to analyze usage and improve our services.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="w-full h-px bg-border" />

                    {/* 2. How We Use Your Information */}
                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">02</span>
                            How We Use Your Information
                        </h2>
                        <div className="pl-8">
                            <ul className="space-y-2.5 text-text-secondary text-[15px] leading-[1.8]">
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Provide, maintain, and improve the Platform and our services
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Process transactions and send related information
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Send technical notices, updates, security alerts, and support messages
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Respond to your comments, questions, and requests
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Communicate about products, services, offers, and events
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Monitor and analyze trends, usage, and activities
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Detect, investigate, and prevent fraudulent transactions and other illegal activities
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-text-muted mt-[10px] text-[6px]">&#9679;</span>
                                    Comply with legal obligations
                                </li>
                            </ul>
                        </div>
                    </section>

                    <div className="w-full h-px bg-border" />

                    {/* 3. Legal Bases */}
                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">03</span>
                            Legal Bases for Processing (EEA/UK Users)
                        </h2>
                        <div className="pl-8">
                            <p className="text-text-secondary text-[15px] leading-[1.8] mb-4">If you are located in the European Economic Area or United Kingdom, our legal bases for processing personal data include:</p>
                            <div className="space-y-4 text-text-secondary text-[15px] leading-[1.8]">
                                <p><strong className="text-text-primary">Contract.</strong> Processing necessary for the performance of our contract with you.</p>
                                <p><strong className="text-text-primary">Legitimate Interests.</strong> Processing necessary for our legitimate business interests.</p>
                                <p><strong className="text-text-primary">Consent.</strong> Where you have given consent for specific processing activities.</p>
                                <p><strong className="text-text-primary">Legal Obligation.</strong> Processing necessary to comply with applicable laws.</p>
                            </div>
                        </div>
                    </section>

                    <div className="w-full h-px bg-border" />

                    {/* 4. Information Sharing */}
                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">04</span>
                            Information Sharing &amp; Disclosure
                        </h2>
                        <div className="pl-8 space-y-4 text-text-secondary text-[15px] leading-[1.8]">
                            <p>We may share your information in the following circumstances:</p>
                            <p><strong className="text-text-primary">Service Providers.</strong> With vendors and service providers who perform services on our behalf, bound by contractual obligations to protect your data.</p>
                            <p><strong className="text-text-primary">Business Transfers.</strong> In connection with a merger, acquisition, or sale of assets.</p>
                            <p><strong className="text-text-primary">Legal Requirements.</strong> When required by law or to respond to legal process.</p>
                            <p><strong className="text-text-primary">Protection of Rights.</strong> To protect our rights, privacy, safety, or property.</p>
                            <p><strong className="text-text-primary">With Consent.</strong> With your consent or at your direction.</p>
                            <p>We do not sell personal information.</p>
                        </div>
                    </section>

                    <div className="w-full h-px bg-border" />

                    {/* 5. International Data Transfers */}
                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">05</span>
                            International Data Transfers
                        </h2>
                        <p className="pl-8 text-text-secondary text-[15px] leading-[1.8]">
                            Your information may be transferred to and processed in countries other than your country of residence, including the United States. We implement appropriate safeguards for international transfers, including Standard Contractual Clauses approved by the European Commission.
                        </p>
                    </section>

                    <div className="w-full h-px bg-border" />

                    {/* 6. Data Retention */}
                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">06</span>
                            Data Retention
                        </h2>
                        <p className="pl-8 text-text-secondary text-[15px] leading-[1.8]">
                            We retain personal information for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. When determining retention periods, we consider the amount, nature, and sensitivity of the information, the potential risk of harm, the purposes of processing, and applicable legal requirements.
                        </p>
                    </section>

                    <div className="w-full h-px bg-border" />

                    {/* 7. Your Rights */}
                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-6 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">07</span>
                            Your Rights &amp; Choices
                        </h2>
                        <div className="pl-8 space-y-6">
                            <div className="space-y-4 text-text-secondary text-[15px] leading-[1.8]">
                                <p><strong className="text-text-primary">Access &amp; Portability.</strong> You may request access to your personal information and receive a copy in a portable format.</p>
                                <p><strong className="text-text-primary">Correction.</strong> You may request correction of inaccurate personal information.</p>
                                <p><strong className="text-text-primary">Deletion.</strong> You may request deletion of your personal information, subject to certain exceptions.</p>
                                <p><strong className="text-text-primary">Opt-Out of Marketing.</strong> You may opt out of marketing communications by clicking &ldquo;unsubscribe&rdquo; in our emails or contacting us.</p>
                                <p><strong className="text-text-primary">Additional Rights (EEA/UK).</strong> EEA and UK residents may also have rights to object to processing, restrict processing, and lodge a complaint with a supervisory authority.</p>
                            </div>
                        </div>
                    </section>

                    <div className="w-full h-px bg-border" />

                    {/* 8. California Privacy Rights */}
                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">08</span>
                            California Privacy Rights
                        </h2>
                        <p className="pl-8 text-text-secondary text-[15px] leading-[1.8]">
                            California residents have additional rights under the CCPA/CPRA, including the right to know what personal information we collect, the right to delete, the right to correct, and the right to opt out of &ldquo;sharing&rdquo; or &ldquo;selling&rdquo; (we do not sell personal information).
                        </p>
                    </section>

                    <div className="w-full h-px bg-border" />

                    {/* 9. Data Security */}
                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">09</span>
                            Data Security
                        </h2>
                        <p className="pl-8 text-text-secondary text-[15px] leading-[1.8]">
                            We implement appropriate technical and organizational security measures to protect your personal information, including encryption in transit and at rest, role-based access controls, and continuous monitoring. However, no method of transmission over the Internet or electronic storage is completely secure.
                        </p>
                    </section>

                    <div className="w-full h-px bg-border" />

                    {/* 10. Children's Privacy */}
                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">10</span>
                            Children&apos;s Privacy
                        </h2>
                        <p className="pl-8 text-text-secondary text-[15px] leading-[1.8]">
                            The Platform is not directed to children under 16, and we do not knowingly collect personal information from children under 16. If we learn we have collected personal information from a child under 16, we will take steps to delete such information.
                        </p>
                    </section>

                    <div className="w-full h-px bg-border" />

                    {/* 11. Changes */}
                    <section>
                        <h2 className="text-text-primary text-[15px] font-medium mb-4 flex items-center gap-3">
                            <span className="text-text-muted text-sm font-normal">11</span>
                            Changes to This Policy
                        </h2>
                        <p className="pl-8 text-text-secondary text-[15px] leading-[1.8]">
                            We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on our website and updating the &ldquo;Last Updated&rdquo; date. Your continued use of the Platform after changes become effective constitutes acceptance of the revised policy.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
