"use client";

import Link from "next/link";

export function NexbotFooter() {
  return (
    <footer className="relative z-30 w-full bg-[#e3e3e3] text-[#141518] pt-12 pb-10 border-t border-black/10 select-none overflow-hidden">
      {/* Full-Bleed Edge-to-Edge Monumental NEXBOT Title */}
      <div className="w-full px-2 sm:px-4 leading-none flex items-center justify-center">
        <svg
          viewBox="0 0 1000 195"
          className="w-full h-auto block select-none pointer-events-none drop-shadow-[0_4px_35px_rgba(0,0,0,0.14)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="500"
            y="155"
            textAnchor="middle"
            textLength="990"
            lengthAdjust="spacingAndGlyphs"
            fill="white"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 900,
              fontSize: "195px",
            }}
          >
            NEXBOT
          </text>
        </svg>
      </div>

      {/* Minimalist Bottom Bar */}
      <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 pt-8 mt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#717582] uppercase tracking-wider">
        <div>
          <span>© 2026 NEXBOT ROBOTICS. ALL RIGHTS RESERVED.</span>
        </div>
        <div>
          <Link
            href="#hero"
            className="hover:text-[#111215] transition-colors"
          >
            Back to Top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
