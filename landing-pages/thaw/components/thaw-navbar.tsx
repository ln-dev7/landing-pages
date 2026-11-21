"use client";

import Link from "next/link";

export function ThawNavbar() {
  const navLinks = [
    { label: "APPROACH", href: "#approach" },
    { label: "HOW IT WORKS", href: "#how-it-works" },
    { label: "SCIENCE", href: "#science" },
  ];

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      {/* Top Chrome Bar */}
      <div className="w-full bg-[#afc0cc] text-[#243542] px-6 sm:px-10 py-1.5 flex items-center justify-between text-[11px] font-mono tracking-wider uppercase border-b border-black/[0.08] shadow-xs">
        <div className="flex items-center gap-2 font-semibold">
          <span>CASE UI/UX</span>
        </div>
        <div className="flex items-center gap-1.5 font-semibold">
          <span>KRIS ANFALOVA</span>
          <span className="text-[#a43b4d]">♥</span>
        </div>
      </div>

      {/* Main THAW Navigation Header (Crisp Vector Typography) */}
      <header className="w-full px-6 sm:px-10 lg:px-16 pt-5 flex items-center justify-between bg-gradient-to-b from-[#171412]/90 via-[#171412]/50 to-transparent backdrop-blur-xs">
        {/* Brand Logo Pill */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#151210] font-bold text-xs tracking-widest shadow-md hover:scale-105 transition-all"
        >
          <span>THAW</span>
          <span className="text-xs">✳</span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-mono tracking-[0.2em] text-[#aba499] hover:text-[#f3f1ee] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Action */}
        <div>
          <Link
            href="#assessment"
            className="text-xs font-mono tracking-[0.16em] text-[#d6cfc5] hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            BEGIN YOUR ASSESSMENT
          </Link>
        </div>
      </header>
    </div>
  );
}
