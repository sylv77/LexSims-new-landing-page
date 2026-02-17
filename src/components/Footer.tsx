"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { showCookiePreferences } from "./CookieConsent";

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

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Platform", href: "/platform" },
  { label: "Product", href: "/product" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  { icon: LinkedInIcon, href: "https://www.linkedin.com/company/lexsims/", label: "LinkedIn" },
];

const HIDE_CTA_ROUTES = ["/privacy", "/terms", "/careers", "/contact", "/platform"];

export default function Footer() {
  const pathname = usePathname();
  const showCTA = !HIDE_CTA_ROUTES.some((route) => pathname.startsWith(route));

  return (
    <footer>
      {/* Consulting CTA Section */}
      {showCTA && (
      <section className="bg-cream py-20 lg:py-28 border-t border-border">
        <div className="max-w-[1248px] mx-auto px-6 lg:px-12">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0}
            className="flex flex-col items-center text-center gap-8"
          >
            <h2 className="text-[28px] lg:text-[36px] font-light leading-[1.2em] tracking-[-0.01em] text-text-primary font-serif italic max-w-[600px]">
              Every case has a thousand outcomes.<br />We simulate all of them.
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-navy-light transition-colors"
            >
              Request a demo
              <ArrowIcon />
            </Link>
          </motion.div>
        </div>
      </section>
      )}

      {/* Main Footer */}
      <section className="bg-navy-footer py-16 lg:py-20">
        <div className="max-w-[1248px] mx-auto px-6 lg:px-12">
          {/* Main Content Grid - Logo/Address left, Nav right */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-24"
          >
            {/* Left Column - Logo */}
            <div className="flex flex-col gap-6">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Lexsims"
                  width={120}
                  height={120}
                  className="h-7 w-auto"
                />
                <span className="text-[18px] font-lexsims font-semibold tracking-[0.03em] text-white">
                  LexSims
                </span>
              </Link>
            </div>

            {/* Right Column - Navigation */}
            <div className="flex gap-16 lg:gap-24">
              <div className="flex flex-col gap-4">
                <h3 className="text-[11px] font-medium tracking-[0.1em] uppercase text-white/50">
                  Pages
                </h3>
                <ul className="flex flex-col gap-3">
                  {navigationLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-[11px] font-medium tracking-[0.1em] uppercase text-white/50">
                  Legal
                </h3>
                <ul className="flex flex-col gap-3">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      onClick={showCookiePreferences}
                      className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                      Cookie Settings
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Bottom Row - Copyright and Social */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={0.1}
            className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <p className="text-[11px] text-white/40">
              &copy; 2026 LexSims
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </footer>
  );
}
