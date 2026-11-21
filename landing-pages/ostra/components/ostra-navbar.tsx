"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Heritage", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Pricing", href: "#pricing" },
  { label: "Inquiries", href: "#faq" },
  { label: "Reserve", href: "#sitting" },
];

export function OstraNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top-Right Hamburger Button */}
      <div className="fixed top-6 sm:top-8 right-6 sm:right-10 z-50 select-none">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          className="w-12 h-12 rounded-full bg-[#131418]/80 hover:bg-[#1a1b22] backdrop-blur-xl border border-white/10 hover:border-white/25 text-white flex flex-col items-center justify-center gap-1.5 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] cursor-pointer group"
        >
          {/* Animated Morphing Hamburger to X */}
          <span
            className={`h-[1.5px] bg-white transition-all duration-300 ease-in-out ${
              isOpen
                ? "w-5 translate-y-[3.5px] rotate-45"
                : "w-5 group-hover:w-6"
            }`}
          />
          <span
            className={`h-[1.5px] bg-white transition-all duration-300 ease-in-out ${
              isOpen
                ? "w-5 -translate-y-[4px] -rotate-45"
                : "w-3.5 group-hover:w-6"
            }`}
          />
        </button>
      </div>

      {/* Pure Black Minimalist Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black flex items-center justify-center select-none"
          >
            {/* Center: Pure Minimalist Navigation Links */}
            <nav className="flex flex-col items-center text-center gap-6 sm:gap-9">
              {NAV_LINKS.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.05 + idx * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="inline-block text-4xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] text-white/50 hover:text-white transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
