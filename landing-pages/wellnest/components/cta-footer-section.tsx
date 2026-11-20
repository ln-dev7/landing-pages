"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function CTAFooterSection() {
  const whoWeAreLinks = [
    { label: "About", href: "#about" },
    { label: "Careers", href: "#careers" },
    { label: "Contact Us", href: "#contact" },
    { label: "Security", href: "#security" },
  ];

  const servicesColumn1 = [
    { label: "Doctors", href: "#doctors" },
    { label: "Acumatica", href: "#services" },
    { label: "Autodesk", href: "#services" },
    { label: "COINS", href: "#services" },
    { label: "Procore", href: "#services" },
  ];

  const servicesColumn2 = [
    { label: "Quickbooks", href: "#services" },
    { label: "Sage 100", href: "#services" },
    { label: "Sage 300 CRE", href: "#services" },
    { label: "Sage Intacct", href: "#services" },
  ];

  const resourcesLinks = [
    { label: "Blog", href: "#blog" },
    { label: "Customer stories", href: "#stories" },
    { label: "Guides", href: "#guides" },
    { label: "Partners", href: "#partners" },
  ];

  return (
    <div id="contact" className="w-full relative overflow-hidden bg-gradient-to-b from-[#f9fdf5] via-[#edf7d4] to-[#d8f2a5] scroll-mt-6">
      {/* 1. CTA Banner Section (Top Half) */}
      <section id="demo" className="w-full pt-28 sm:pt-36 pb-20 sm:pb-28 px-6 sm:px-10 text-center relative z-10 scroll-mt-6">
        <div className="max-w-3xl mx-auto">
          {/* Main Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-tight text-[#172c15] leading-[1.12] mb-6">
            Take the First Step <br />
            Toward Healing
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#465a44] font-light leading-relaxed max-w-xl mx-auto mb-10">
            Get instant access to premium training datasets or request custom
            collections tailored to your needs.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#213515] hover:bg-[#2c471c] text-white px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-medium transition-all shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Let&apos;s Talk with Us</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Massive Dark Olive Footer Container (Bottom Half) */}
      <footer className="w-full bg-[#24370f] text-white rounded-t-[36px] sm:rounded-t-[48px] pt-16 sm:pt-20 pb-10 px-6 sm:px-10 lg:px-16 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] relative z-20">
        <div className="max-w-[1440px] mx-auto">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 pb-16">
            {/* Brand Column (Left) */}
            <div className="lg:col-span-4 space-y-5">
              <Link href="/" className="inline-flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-[#d7f943]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                </svg>
                <span className="text-2xl font-medium tracking-tight text-[#d7f943]">
                  Wellnest
                </span>
              </Link>
              <p className="text-xs sm:text-sm font-light text-white/70 leading-relaxed max-w-sm">
                Explore a personalized mental wellness platform designed to help
                you understand your emotions, manage stress, and develop a
                positive mindset.
              </p>
            </div>

            {/* Links Columns (Right) */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {/* Who We Are */}
              <div className="space-y-4">
                <h4 className="text-xs font-normal text-white/90 uppercase tracking-wider">
                  Who We Are
                </h4>
                <ul className="space-y-2.5">
                  {whoWeAreLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm font-light text-white/65 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services (Col 1) */}
              <div className="space-y-4">
                <h4 className="text-xs font-normal text-white/90 uppercase tracking-wider">
                  Services
                </h4>
                <ul className="space-y-2.5">
                  {servicesColumn1.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm font-light text-white/65 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services (Col 2) */}
              <div className="space-y-4">
                <div className="h-4 hidden sm:block" />
                <ul className="space-y-2.5">
                  {servicesColumn2.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm font-light text-white/65 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="space-y-4">
                <h4 className="text-xs font-normal text-white/90 uppercase tracking-wider">
                  Resources
                </h4>
                <ul className="space-y-2.5">
                  {resourcesLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs sm:text-sm font-light text-white/65 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Socials */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
            <p className="text-[11px] sm:text-xs font-light text-white/50">
              Copyright ©2025. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {/* Facebook */}
              <Link
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-xs font-semibold text-white/80 hover:text-white transition-all hover:scale-105"
              >
                f
              </Link>

              {/* LinkedIn */}
              <Link
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-xs font-semibold text-white/80 hover:text-white transition-all hover:scale-105"
              >
                in
              </Link>

              {/* X */}
              <Link
                href="#x"
                aria-label="X"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-xs font-semibold text-white/80 hover:text-white transition-all hover:scale-105"
              >
                𝕏
              </Link>

              {/* Instagram */}
              <Link
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-105"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
