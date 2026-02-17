"use client";

import { useState, useEffect, useCallback } from "react";

const COOKIE_NAME = "cookie_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

type ConsentValue = "all" | "necessary" | null;

function getConsent(): ConsentValue {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );
  return match ? (match[1] as ConsentValue) : null;
}

function setConsent(value: "all" | "necessary") {
  document.cookie = `${COOKIE_NAME}=${value};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

export default function CookieConsent() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const current = getConsent();
    if (!current) {
      setBannerVisible(true);
    } else {
      setAnalyticsEnabled(current === "all");
    }

    const onShowPrefs = () => {
      const current = getConsent();
      setAnalyticsEnabled(current === "all");
      setPrefsOpen(true);
    };
    window.addEventListener("cookie-consent-show-prefs", onShowPrefs);
    return () =>
      window.removeEventListener("cookie-consent-show-prefs", onShowPrefs);
  }, []);

  const accept = useCallback(() => {
    setConsent("all");
    setBannerVisible(false);
    setPrefsOpen(false);
  }, []);

  const decline = useCallback(() => {
    setConsent("necessary");
    setBannerVisible(false);
    setPrefsOpen(false);
  }, []);

  const savePrefs = useCallback(() => {
    setConsent(analyticsEnabled ? "all" : "necessary");
    setBannerVisible(false);
    setPrefsOpen(false);
  }, [analyticsEnabled]);

  return (
    <>
      {/* Banner */}
      {bannerVisible && !prefsOpen && (
        <div className="fixed bottom-4 left-4 z-[2147483647] w-[460px] rounded-xl border border-border bg-white/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-4 py-3 flex items-center gap-4 animate-fade-in">
          <p className="text-[11px] leading-[1.4] text-text-muted min-w-0 shrink">
            We use cookies for site functionality and optional analytics.
          </p>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={accept}
              className="px-3 py-1 rounded-full bg-navy text-white text-[11px] font-medium hover:bg-navy-light transition-colors cursor-pointer"
            >
              Accept
            </button>
            <button
              onClick={decline}
              className="px-3 py-1 rounded-full border border-border text-text-secondary text-[11px] font-medium hover:bg-beige transition-colors cursor-pointer"
            >
              Decline
            </button>
            <button
              onClick={() => {
                setAnalyticsEnabled(false);
                setPrefsOpen(true);
              }}
              className="text-[11px] text-text-muted hover:text-text-primary transition-colors cursor-pointer ml-0.5"
            >
              Settings
            </button>
          </div>
        </div>
      )}

      {/* Preferences modal */}
      {prefsOpen && (
        <div className="fixed inset-0 z-[2147483647] flex items-center justify-center animate-fade-in">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => {
              if (getConsent()) setPrefsOpen(false);
            }}
          />

          {/* Modal */}
          <div className="relative w-full max-w-[360px] mx-4 rounded-xl border border-border bg-white shadow-[0_8px_40px_rgba(0,0,0,0.1)] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-0">
              <h2 className="text-[14px] font-medium text-text-primary">
                Cookie Preferences
              </h2>
              {getConsent() && (
                <button
                  onClick={() => setPrefsOpen(false)}
                  className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M11 3L3 11M3 3l8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Description */}
            <p className="px-5 pt-2 text-[12px] leading-[1.5] text-text-muted">
              Manage your cookie preferences. Essential cookies cannot be
              disabled.
            </p>

            {/* Categories */}
            <div className="px-5 pt-4 pb-2 flex flex-col gap-2.5">
              {/* Essential */}
              <div className="flex items-center justify-between py-2.5 px-3.5 rounded-lg bg-beige border border-border">
                <div>
                  <p className="text-[12px] font-medium text-text-primary">
                    Essential
                  </p>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Required for site functionality
                  </p>
                </div>
                <div className="w-8 h-[18px] rounded-full bg-navy/20 flex items-center px-[3px] opacity-50 cursor-not-allowed">
                  <div className="w-3 h-3 rounded-full bg-navy ml-auto" />
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between py-2.5 px-3.5 rounded-lg bg-beige border border-border">
                <div>
                  <p className="text-[12px] font-medium text-text-primary">
                    Analytics
                  </p>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    Help us improve with anonymized data
                  </p>
                </div>
                <button
                  onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                  className={`w-8 h-[18px] rounded-full flex items-center px-[3px] transition-colors cursor-pointer ${
                    analyticsEnabled ? "bg-navy" : "bg-border"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full transition-all ${
                      analyticsEnabled
                        ? "bg-white ml-auto"
                        : "bg-white ml-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="px-5 pt-3 pb-4 flex items-center gap-2">
              <button
                onClick={savePrefs}
                className="flex-1 px-3 py-1.5 rounded-full bg-navy text-white text-[11px] font-medium hover:bg-navy-light transition-colors cursor-pointer"
              >
                Save preferences
              </button>
              <button
                onClick={accept}
                className="px-3 py-1.5 rounded-full border border-border text-text-secondary text-[11px] font-medium hover:bg-beige transition-colors cursor-pointer"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function showCookiePreferences() {
  window.dispatchEvent(new Event("cookie-consent-show-prefs"));
}
