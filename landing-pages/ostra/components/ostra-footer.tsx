"use client";

import Link from "next/link";

export function OstraFooter() {
  return (
    <footer className="relative w-full bg-[#0a0a0c] text-white pt-24 pb-8 select-none overflow-hidden">
      {/* 1. Top Tier: Studio Tagline, Socials & Navigation Columns */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Brand Bio & Socials (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <p className="text-base sm:text-lg text-white/90 font-normal leading-relaxed max-w-sm mb-8">
              Studio Ostra is a Lisbon darkroom and portrait atelier dedicated to timeless editorial beauty.
            </p>

            {/* Circular Social Buttons */}
            <div className="flex items-center gap-3">
              {/* X / Twitter */}
              <Link
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>

              {/* YouTube */}
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>

              {/* LinkedIn */}
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.66 1.66 1.66 1.66 0 0 0 1.66 1.66 1.66 1.66 0 0 0 1.66-1.66c0-.92-.74-1.66-1.66-1.66z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Navigation Columns (7 cols on desktop) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {/* Column 1: Atelier */}
            <div className="flex flex-col gap-3.5">
              <h3 className="text-sm font-semibold text-white tracking-tight mb-1">
                Atelier
              </h3>
              <Link
                href="#portraits"
                className="text-xs sm:text-sm text-[#8e909a] hover:text-white transition-colors duration-150"
              >
                Portraits
              </Link>
              <Link
                href="#prints"
                className="text-xs sm:text-sm text-[#8e909a] hover:text-white transition-colors duration-150"
              >
                Darkroom Prints
              </Link>
              <Link
                href="#folios"
                className="text-xs sm:text-sm text-[#8e909a] hover:text-white transition-colors duration-150"
              >
                Master Folios
              </Link>
            </div>

            {/* Column 2: Editorial */}
            <div className="flex flex-col gap-3.5">
              <h3 className="text-sm font-semibold text-white tracking-tight mb-1">
                Editorial
              </h3>
              <Link
                href="#exhibitions"
                className="text-xs sm:text-sm text-[#8e909a] hover:text-white transition-colors duration-150"
              >
                Exhibitions
              </Link>
              <Link
                href="#press"
                className="text-xs sm:text-sm text-[#8e909a] hover:text-white transition-colors duration-150"
              >
                Press Archive
              </Link>
              <Link
                href="#notes"
                className="text-xs sm:text-sm text-[#8e909a] hover:text-white transition-colors duration-150"
              >
                Darkroom Notes
              </Link>
            </div>

            {/* Column 3: Studio */}
            <div className="flex flex-col gap-3.5">
              <h3 className="text-sm font-semibold text-white tracking-tight mb-1">
                Studio
              </h3>
              <Link
                href="#about"
                className="text-xs sm:text-sm text-[#8e909a] hover:text-white transition-colors duration-150"
              >
                About
              </Link>
              <div className="flex items-center gap-2">
                <Link
                  href="#sittings"
                  className="text-xs sm:text-sm text-[#8e909a] hover:text-white transition-colors duration-150"
                >
                  Sittings
                </Link>
                <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/[0.08] text-white/90 border border-white/10">
                  Open
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Tier: Monumental Outline Wordmark (O S T R A) */}
      <div className="relative w-full overflow-hidden flex justify-center -mb-4 sm:-mb-8 md:-mb-12 pointer-events-none select-none">
        <h2 className="text-[20vw] sm:text-[21vw] font-bold tracking-[0.04em] leading-[0.78] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.22)] sm:[-webkit-text-stroke:1.5px_rgba(255,255,255,0.25)] text-center whitespace-nowrap opacity-90 will-change-transform">
          OSTRA
        </h2>
      </div>

      {/* 3. Bottom Tier: Copyright & Legal Bar */}
      <div className="relative z-10 w-full border-t border-white/[0.08] pt-6 pb-2">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8e909a] font-normal">
          <div>
            &copy; {new Date().getFullYear()} Studio Ostra / Lisbon Darkroom Atelier
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="#security"
              className="hover:text-white transition-colors duration-150"
            >
              Security
            </Link>
            <Link
              href="#terms"
              className="hover:text-white transition-colors duration-150"
            >
              Terms of sitting
            </Link>
            <Link
              href="#privacy"
              className="hover:text-white transition-colors duration-150"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
