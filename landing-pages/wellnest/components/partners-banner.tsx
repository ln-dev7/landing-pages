import React from "react";

export function PartnersBanner() {
  return (
    <section className="w-full bg-white pt-16 sm:pt-20 pb-10 sm:pb-12 border-b border-black/[0.04]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        {/* Header Text */}
        <p className="text-xs sm:text-sm font-light text-[#56655c] tracking-normal mb-8 sm:mb-10">
          Join over 500 Company Grow with Wellnest
        </p>

        {/* Logos Row */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 text-[#1c2e23]/70">
          {/* Wealthsimple */}
          <div className="flex items-center gap-1.5 hover:text-[#1c2e23] transition-colors">
            <span className="font-normal text-base sm:text-lg tracking-tight font-serif italic">
              Wealthsimple
            </span>
          </div>

          {/* Magnolia */}
          <div className="flex items-center gap-2 hover:text-[#1c2e23] transition-colors">
            <svg
              className="w-5 h-5 text-current"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 12c-2.5-2.5-5.5-2.5-5.5 0s3 2.5 5.5 0c2.5 2.5 5.5 2.5 5.5 0s-3-2.5-5.5 0z" />
              <circle cx="12" cy="12" r="9" />
            </svg>
            <span className="font-medium text-sm sm:text-base tracking-tight">
              Magnolia
            </span>
          </div>

          {/* healthfirst */}
          <div className="flex items-center gap-1.5 hover:text-[#1c2e23] transition-colors">
            <svg
              className="w-4 h-4 text-[#2e7d32]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
            <span className="font-normal text-sm sm:text-base tracking-tight lowercase">
              health<strong className="font-medium">first</strong>
            </span>
          </div>

          {/* healthgrades. */}
          <div className="flex items-center gap-2 hover:text-[#1c2e23] transition-colors">
            <svg
              className="w-4 h-4 text-current"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="font-normal text-sm sm:text-base tracking-tight lowercase">
              healthgrades<span className="text-[#d7f943]">.</span>
            </span>
          </div>

          {/* aspenmedical */}
          <div className="flex items-center gap-1 hover:text-[#1c2e23] transition-colors">
            <span className="font-normal text-sm sm:text-base tracking-tight lowercase">
              aspen<strong className="font-medium">medical</strong>
            </span>
          </div>

          {/* mentalisto */}
          <div className="flex items-center gap-1 hover:text-[#1c2e23] transition-colors">
            <span className="font-light text-sm sm:text-base tracking-widest uppercase">
              mentalisto
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
