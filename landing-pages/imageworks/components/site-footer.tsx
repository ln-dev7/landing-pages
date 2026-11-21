"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { LogoMark } from "./header-nav";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Benchmarks", href: "#benchmarks" },
      { label: "Stories", href: "#stories" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "X", href: "https://x.com/imageworks" },
      { label: "Instagram", href: "https://instagram.com/imageworks" },
      { label: "Discord", href: "https://discord.gg/imageworks" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Terms", href: "#terms" },
  { label: "Privacy", href: "#privacy" },
  { label: "Cookies", href: "#cookies" },
];

const SPECTRUM_CLASS =
  "bg-[linear-gradient(90deg,#ff5c7a,#ffb340,#ffe14d,#57e6a8,#4cc9ff,#8b7bff,#ff5cd3,#ff5c7a)]";

function Wordmark({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const opacityVal = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 });
  const springOpacity = useSpring(opacityVal, { stiffness: 120, damping: 22 });
  const spotlightRadius = useMotionValue(120);

  const mask = useMotionTemplate`radial-gradient(${spotlightRadius}px at ${springX}px ${springY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 28%, rgba(0,0,0,0.55) 58%, transparent 100%)`;

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    let ratio = 0;
    const update = () => {
      if (!ratio) {
        const prev = container.style.fontSize;
        container.style.fontSize = "100px";
        ratio = text.getBoundingClientRect().width / 100;
        container.style.fontSize = prev;
      }
      if (!ratio) return;
      const fs = (0.98 * container.clientWidth) / ratio;
      container.style.fontSize = `${fs}px`;
      container.style.height = `${0.72 * fs}px`;
      spotlightRadius.set(0.72 * fs * 0.9);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);

    document.fonts?.ready?.then(() => {
      ratio = 0;
      update();
    });

    return () => ro.disconnect();
  }, [spotlightRadius]);

  const baseClass =
    "absolute bottom-[-0.32em] left-1/2 flex -translate-x-1/2 items-end gap-[0.12em] leading-none font-medium tracking-[-0.05em] whitespace-nowrap select-none";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      onPointerMove={(e) => {
        if (shouldReduceMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
        opacityVal.set(1);
      }}
      onPointerEnter={(e) => {
        if (shouldReduceMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        springX.jump(e.clientX - rect.left);
        springY.jump(e.clientY - rect.top);
      }}
      onPointerLeave={() => opacityVal.set(0)}
      className="relative h-[15vw] overflow-hidden"
    >
      <div ref={textRef} className={`${baseClass} ${className ?? ""}`}>
        <LogoMark className="h-[0.86em] w-[0.86em] shrink-0 translate-y-[-0.13em]" />
        <span>Imageworks</span>
      </div>

      {!shouldReduceMotion && (
        <motion.div
          style={{
            opacity: springOpacity,
            maskImage: mask,
            WebkitMaskImage: mask,
          }}
          className="absolute inset-0"
        >
          <div
            className={`${SPECTRUM_CLASS} ${baseClass} [background-size:200%_100%] bg-clip-text text-transparent motion-safe:animate-[spectrum-drift_14s_linear_infinite]`}
          >
            <span
              className={`inline-block h-[0.86em] w-[0.86em] shrink-0 translate-y-[-0.13em] [mask-image:url(/brand-mask.svg)] [background-size:200%_100%] [mask-size:100%_100%] motion-safe:animate-[spectrum-drift_14s_linear_infinite] ${SPECTRUM_CLASS}`}
            />
            <span>Imageworks</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function SiteFooter() {
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const wordmarkY = useTransform(scrollYProgress, [0, 1], ["52%", "0%"]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.6], [0.3, 1]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer
      ref={footerRef}
      aria-labelledby="footer-heading"
      className="relative overflow-hidden bg-background text-foreground select-none"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <motion.div
          style={
            shouldReduceMotion ? {} : { y: wordmarkY, opacity: wordmarkOpacity }
          }
        >
          <Wordmark className="text-foreground/[0.08] dark:text-foreground/[0.14]" />
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative -mt-px mb-4 rounded-2xl border border-border bg-muted px-6 pt-10 pb-6 sm:mb-6 sm:px-10 sm:pt-12 lg:px-12"
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-8">
            <div className="max-w-[26rem]">
              <h2 className="font-serif text-[2rem] leading-none tracking-[-0.01em] text-foreground">
                Don’t miss out
              </h2>
              <p className="mt-2 text-[15px] text-muted-foreground">
                New models, features and the occasional making-of, once a month.
              </p>

              <form
                onSubmit={handleSubmit}
                className="relative mt-6"
                aria-label="Newsletter signup"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  required
                  disabled={subscribed}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="h-13 w-full rounded-xl border border-border bg-background pr-14 pl-4 text-[15px] text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:opacity-80"
                />
                <button
                  type="submit"
                  aria-label={subscribed ? "Subscribed" : "Subscribe"}
                  disabled={subscribed}
                  className="absolute top-1.5 right-1.5 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background transition-[opacity,transform] hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-95 disabled:bg-emerald-600 disabled:text-white cursor-pointer"
                >
                  {subscribed ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </form>

              <p
                role="status"
                aria-live="polite"
                className={`mt-2 text-sm text-muted-foreground transition-opacity ${
                  subscribed ? "opacity-100" : "opacity-0"
                }`}
              >
                {subscribed ? "You're on the list. Talk soon." : " "}
              </p>
            </div>

            <nav aria-label="Footer">
              <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
                {FOOTER_COLUMNS.map((col) => (
                  <div key={col.title}>
                    <h3 className="text-xs font-medium tracking-[0.08em] text-foreground/85 uppercase">
                      {col.title}
                    </h3>
                    <ul className="mt-5 space-y-3 list-none p-0 m-0">
                      {col.links.map((link) => (
                        <li key={link.label} className="list-none">
                          <a
                            href={link.href}
                            className="group inline-flex items-center gap-1 rounded-sm text-[15px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
                          >
                            <span className="relative">
                              {link.label}
                              <span
                                aria-hidden="true"
                                className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100"
                              />
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </nav>
          </div>

          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="inline-flex items-center">
                All systems normal
              </span>
              <span>© 2026 Imageworks</span>
            </div>
            <ul className="flex flex-wrap items-center gap-5 list-none p-0 m-0">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label} className="list-none">
                  <a
                    href={link.href}
                    className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
