"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CareersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CareersModal({ isOpen, onClose }: CareersModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "",
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
        body: JSON.stringify({
          _subject: "Careers Inquiry",
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Failed to send");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    if (isSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", linkedin: "", message: "" });
      }, 300);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto bg-cream border border-border rounded-2xl p-8 sm:p-10"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1.5 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-4"
              >
                <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-[20px] font-normal text-text-primary tracking-[-0.01em] mb-2">
                  Application sent
                </h3>
                <p className="text-sm text-text-secondary">
                  We&apos;ll be in touch if there&apos;s a fit. Thanks for reaching out.
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-[20px] sm:text-[22px] font-normal text-text-primary tracking-[-0.01em] leading-[1.3] mb-2">
                  Join the team
                </h3>
                <p className="text-sm leading-[1.7] text-text-secondary mb-6">
                  We&apos;re always looking for exceptional people who want to rethink
                  how the world makes decisions.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-text-secondary text-sm mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-navy/30 transition-colors"
                      placeholder="Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-navy/30 transition-colors"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm mb-1.5">LinkedIn / Portfolio</label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-navy/30 transition-colors"
                      placeholder="https://linkedin.com/in/janesmith"
                    />
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm mb-1.5">Tell us about yourself *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-navy/30 transition-colors resize-none"
                      placeholder="What excites you about LexSims?"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-1 px-5 py-3 bg-navy text-white rounded-full text-sm font-medium hover:bg-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                      <>
                        Submit
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="rotate-[-45deg]">
                          <path d="M2 6H10M10 6L6 2M10 6L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
