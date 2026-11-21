"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Workflow, Boxes, Sparkles, ArrowRight } from "lucide-react";
import { RevealHeadline } from "./reveal-headline";

export function ArrowChip({ className }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center w-10 px-3 rounded-md transition-colors overflow-hidden ${
        className ?? ""
      }`}
    >
      <span className="relative block w-4 h-4 overflow-hidden">
        <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full" />
        <ArrowRight className="w-4 h-4 absolute inset-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
      </span>
    </span>
  );
}

const CARDS = [
  {
    index: "01.",
    title: "Workflows",
    body: "Compose flows from triggers and steps that move work forward without standups.",
    icon: Workflow,
    tone: "bg-accent text-accent-foreground",
    iconClass: "text-accent-foreground/85",
    indexClass: "text-accent-foreground/55",
    bodyClass: "text-accent-foreground/75",
  },
  {
    index: "02.",
    title: "Building blocks",
    body: "A library of typed primitives your team can extend without forking the platform.",
    icon: Boxes,
    tone: "bg-foreground/[0.08] text-foreground",
    iconClass: "text-foreground/70",
    indexClass: "text-foreground/45",
    bodyClass: "text-foreground/65",
  },
  {
    index: "03.",
    title: "Intelligence",
    body: "Recommendations and insights surfaced inline, where the work actually happens.",
    icon: Sparkles,
    tone: "bg-foreground/[0.04] text-foreground",
    iconClass: "text-foreground/70",
    indexClass: "text-foreground/45",
    bodyClass: "text-foreground/60",
  },
];

const easeTransition = [0.33, 1, 0.68, 1] as const;

export function ProductSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id="product"
      aria-labelledby="product-heading"
      className="relative w-full bg-background text-foreground py-32 max-[850px]:py-20 select-none"
    >
      <div className="max-w-[1680px] mx-auto px-10 max-[850px]:px-6">
        <div className="grid grid-cols-12 gap-x-10 gap-y-6 max-[850px]:grid-cols-1">
          {/* Badge left */}
          <div className="col-span-3 max-[1100px]:col-span-12 max-[850px]:col-span-1 pt-2">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.6, ease: easeTransition }}
              className="inline-flex items-center rounded-md border border-foreground/[0.08] px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground/70"
            >
              Our offer
            </motion.span>
          </div>

          {/* Heading & description right */}
          <div className="col-span-7 col-start-6 max-[1100px]:col-span-12 max-[1100px]:col-start-1 max-[850px]:col-span-1">
            <RevealHeadline
              id="product-heading"
              delay={0.05}
              mutedFrom={9}
              className="text-balance text-[clamp(2rem,4.2vw,4rem)] font-medium leading-[0.95] tracking-tight"
            >
              Everything your team needs to ship, that actually moves work
              forward.
            </RevealHeadline>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.7, ease: easeTransition, delay: 0.18 }}
              className="mt-8 max-w-[60ch] text-balance text-base max-[850px]:text-sm leading-relaxed text-foreground/65"
            >
              Lumen replaces the patchwork of trackers, docs, and chat with a
              single surface where work flows from intent to release. Workflows
              orchestrate the busywork, building blocks let your team extend the
              platform on its own terms, and an intelligence layer makes every
              decision easier than the last.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.7, ease: easeTransition, delay: 0.28 }}
              className="mt-10"
            >
              <a
                href="#pricing"
                className="group inline-flex items-stretch gap-1 cursor-pointer"
              >
                <span className="px-5 py-3 rounded-md bg-foreground text-background text-xs font-medium tracking-widest uppercase">
                  Discover the platform
                </span>
                <ArrowChip className="bg-foreground text-background" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3 Full-Width Tonal Feature Cards */}
      <div className="mt-24 max-[850px]:mt-16 grid grid-cols-3 max-[1100px]:grid-cols-1">
        {CARDS.map((card, i) => (
          <motion.article
            key={card.index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 0.8,
              ease: easeTransition,
              delay: 0.45 + 0.08 * i,
            }}
            className="relative flex"
          >
            <div
              className={`relative flex flex-1 flex-col justify-between min-h-[380px] max-[850px]:min-h-[260px] p-12 max-[850px]:p-8 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${card.tone}`}
            >
              <div className="flex items-start justify-between">
                <card.icon
                  className={card.iconClass}
                  size={64}
                  strokeWidth={0.75}
                  aria-hidden
                />
                <span
                  className={`font-mono text-xs uppercase tracking-[0.2em] ${card.indexClass}`}
                >
                  {card.index}
                </span>
              </div>

              <div>
                <h3 className="text-2xl max-[850px]:text-xl font-medium leading-tight tracking-tight">
                  {card.title}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed ${card.bodyClass}`}>
                  {card.body}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
