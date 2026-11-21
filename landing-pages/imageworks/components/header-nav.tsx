"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import { motion, AnimatePresence, useScroll, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowRight, Sun, Moon } from "lucide-react";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <rect x="2" y="2" width="16" height="16" rx="4" />
      <path d="M10 5.5 14.5 10 10 14.5 5.5 10Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <a
      href="#hero"
      aria-label="Imageworks home"
      className={`inline-flex items-center rounded-lg text-[15px] font-medium tracking-[-0.01em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer ${
        className ?? ""
      }`}
    >
      <LogoMark className="h-5 w-5 shrink-0" />
      <AnimatePresence initial={false}>
        {!compact && (
          <motion.span
            key="wordmark"
            className="overflow-hidden whitespace-nowrap"
            initial={!shouldReduceMotion && { width: 0, opacity: 0 }}
            animate={{
              width: "auto",
              opacity: 1,
              transition: shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={{
              width: 0,
              opacity: 0,
              transition: shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
            }}
          >
            <span className="block pl-2 font-semibold">Imageworks</span>
          </motion.span>
        )}
      </AnimatePresence>
    </a>
  );
}

const NAV_ITEMS = [
  { label: "Features", href: "#features", id: "features" },
  { label: "Benchmarks", href: "#benchmarks", id: "benchmarks" },
  { label: "Stories", href: "#stories", id: "stories" },
  { label: "Pricing", href: "#pricing", id: "pricing" },
];

const springTransition = { type: "spring", stiffness: 420, damping: 36 } as const;

export function HeaderNav() {
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(true);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuId = useId();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 48);
    });
  }, [scrollY]);

  // Sync theme
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      setIsDark(root.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      setIsDark(true);
    }
  };

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    buttonRef.current?.focus();
  }, []);

  // Lock body scroll on mobile menu open
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

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 flex items-start justify-between px-4 pt-4 sm:px-6 sm:pt-5"
        aria-label="Site navigation"
      >
        {/* Left Floating Pill Container */}
        <motion.div
          initial={!shouldReduceMotion && { opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-11 items-center gap-1 rounded-xl bg-foreground p-1 text-background shadow-[0_12px_36px_-14px_rgba(0,0,0,0.45)] dark:shadow-[0_12px_36px_-14px_rgba(0,0,0,0.8)]"
        >
          {/* Logo */}
          <div className="flex items-center pr-1 pl-2">
            <Logo className="h-9 text-background" compact={isScrolled} />
          </div>

          {/* Desktop Nav Items */}
          <ul
            className="relative hidden items-center md:flex"
            onMouseLeave={() => setHoveredId(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isSelected = activeId === item.id;
              const isHovered = (hoveredId ?? activeId) === item.id;

              return (
                <li key={item.id} className="relative">
                  {isHovered && (
                    <motion.span
                      layoutId="nav-thumb"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-lg bg-white/10 dark:bg-black/10"
                      transition={
                        shouldReduceMotion ? { duration: 0 } : springTransition
                      }
                    />
                  )}
                  <a
                    href={item.href}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onFocus={() => setHoveredId(item.id)}
                    onBlur={() => setHoveredId(null)}
                    aria-current={isSelected ? "location" : undefined}
                    className={`relative z-[1] inline-flex h-8 items-center rounded-lg px-3 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer ${
                      isSelected || hoveredId === item.id
                        ? "text-background"
                        : "text-background/65 hover:text-background"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-[3px] left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-background transition-[opacity,transform] duration-300 ${
                        isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Hamburger Button */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-background/80 transition-colors hover:bg-background/10 hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden cursor-pointer"
          >
            <span aria-hidden="true" className="relative block h-[9px] w-[15px]">
              <motion.span
                className="absolute left-0 h-[1.5px] w-full rounded-full bg-current"
                initial={false}
                animate={
                  isOpen
                    ? { top: "50%", y: "-50%", rotate: 45 }
                    : { top: 0, y: 0, rotate: 0 }
                }
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="absolute left-0 h-[1.5px] w-full rounded-full bg-current"
                initial={false}
                animate={
                  isOpen
                    ? { top: "50%", y: "-50%", rotate: -45 }
                    : { top: "100%", y: "-100%", rotate: 0 }
                }
                transition={{ duration: 0.25 }}
              />
            </span>
          </button>
        </motion.div>

        {/* Right Action Buttons */}
        <motion.div
          initial={!shouldReduceMotion && { opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-11 items-center"
        >
          {/* Sign in Button */}
          <AnimatePresence initial={false}>
            {!isScrolled && (
              <motion.div
                className="hidden overflow-hidden sm:block"
                initial={!shouldReduceMotion && { width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href="#pricing"
                  className="mr-2 inline-flex h-11 items-center rounded-xl bg-foreground/[0.07] hover:bg-foreground/[0.12] px-4 text-sm font-medium whitespace-nowrap text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
                >
                  Sign in
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Start for free CTA Button */}
          <a
            href="#pricing"
            className="group inline-flex h-11 items-center gap-1.5 rounded-xl bg-foreground px-4 text-sm font-medium whitespace-nowrap text-background shadow-[0_12px_36px_-14px_rgba(0,0,0,0.45)] dark:shadow-[0_12px_36px_-14px_rgba(0,0,0,0.8)] transition-[transform,opacity] hover:opacity-90 active:scale-[0.98] cursor-pointer"
          >
            Start for free
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </header>

      {/* Floating Theme Toggle (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
          className="w-11 h-11 rounded-full border border-border bg-background/80 hover:bg-background backdrop-blur-xl text-foreground flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-foreground/80" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm md:hidden cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.div
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
              className="fixed top-[4.5rem] right-4 left-4 z-50 overflow-hidden rounded-2xl bg-foreground p-3 text-background shadow-[0_24px_70px_-24px_rgba(0,0,0,0.6)] md:hidden"
              initial={{ opacity: 0, scale: 0.94, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav aria-label="Mobile">
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className="group flex items-center justify-between rounded-xl px-4 py-3 text-lg font-medium transition-colors hover:bg-background/10 cursor-pointer"
                      >
                        <span className="flex items-center gap-2.5">
                          {activeId === item.id && (
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 rounded-full bg-background"
                            />
                          )}
                          {item.label}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 text-background/50 group-hover:text-background transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-background/15">
                <a
                  href="#pricing"
                  onClick={closeMenu}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-background/12 text-sm font-medium text-background hover:bg-background/20 transition-colors cursor-pointer"
                >
                  Sign in
                </a>
                <a
                  href="#pricing"
                  onClick={closeMenu}
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-background text-sm font-medium text-foreground hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Start for free
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
