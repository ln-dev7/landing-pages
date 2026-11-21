"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Product", href: "#product" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
];

const easeTransition = [0.16, 1, 0.3, 1] as const;

export function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <motion.nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-50 pointer-events-none select-none"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
    >
      <div className="mx-auto flex items-center justify-between px-10 py-6 max-[850px]:px-6 max-[850px]:py-4 max-w-[1680px]">
        {/* Logo Pill */}
        <motion.div
          className="pointer-events-auto"
          variants={{
            hidden: { opacity: 0, y: -12 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: easeTransition }}
        >
          <motion.a
            href="/"
            className="relative inline-flex items-center gap-3 text-xl font-medium tracking-tight rounded-lg border cursor-pointer"
            initial={false}
            animate={{
              paddingLeft: scrolled ? 12 : 0,
              paddingRight: scrolled ? 12 : 0,
              paddingTop: scrolled ? 8 : 0,
              paddingBottom: scrolled ? 8 : 0,
              backgroundColor: scrolled
                ? "rgba(255,255,255,1)"
                : "rgba(255,255,255,0)",
              color: scrolled ? "#0a0a0a" : "#ffffff",
              borderColor: scrolled
                ? "rgba(10,10,10,0.08)"
                : "rgba(255,255,255,0)",
            }}
            transition={{ duration: 0.45, ease: easeTransition }}
          >
            <motion.span
              aria-hidden="true"
              className="rounded-full border-2"
              initial={false}
              animate={{
                width: scrolled ? 28 : 32,
                height: scrolled ? 28 : 32,
                borderColor: scrolled
                  ? "rgba(10,10,10,0.7)"
                  : "rgba(255,255,255,0.7)",
              }}
              transition={{ duration: 0.45, ease: easeTransition }}
            />
            <span>Lumen</span>
          </motion.a>
        </motion.div>

        {/* Right Nav Pill */}
        <motion.div
          className="pointer-events-auto"
          variants={{
            hidden: { opacity: 0, y: -12 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: easeTransition }}
        >
          <div className="flex items-center gap-1 rounded-lg border border-neutral-900/[0.08] bg-white p-1.5 text-xs font-medium uppercase tracking-widest text-neutral-700 shadow-sm">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hidden min-[850px]:inline-flex items-center px-4 py-2.5 rounded-md hover:bg-neutral-100 hover:text-neutral-900 transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#get-started"
              className="inline-flex items-center px-4 py-2.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800 transition-colors duration-200 cursor-pointer"
            >
              Get Started
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="min-[850px]:hidden inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-neutral-100 text-neutral-900 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="min-[850px]:hidden fixed inset-0 z-40 pointer-events-auto bg-background p-6 flex flex-col justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: easeTransition }}
          >
            <div className="flex justify-between items-center">
              <span className="text-xl font-medium tracking-tight text-foreground">
                Lumen
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-muted text-foreground cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-6 my-auto text-2xl font-medium">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a
              href="#get-started"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-4 rounded-xl bg-foreground text-background text-sm font-medium tracking-widest uppercase cursor-pointer"
            >
              Get Started
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
