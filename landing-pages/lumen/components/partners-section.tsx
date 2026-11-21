"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";

const easeTransition = [0.33, 1, 0.68, 1] as const;

interface PartnerItem {
  name: string;
  type: "serif" | "mono" | "sans" | "sansBold" | "sansLight" | "italic";
}

const PARTNERS: PartnerItem[] = [
  { name: "Northwind", type: "serif" },
  { name: "stripe/pay", type: "mono" },
  { name: "Halcyon", type: "sansBold" },
  { name: "ATLAS", type: "sansBold" },
  { name: "vector&co", type: "italic" },
  { name: "kindred", type: "sansLight" },
  { name: "Meridian", type: "serif" },
  { name: "FORGE/9", type: "mono" },
  { name: "lattice", type: "sansLight" },
  { name: "Quill", type: "italic" },
  { name: "OBSIDIAN", type: "sansBold" },
  { name: "tempo·", type: "sans" },
];

const TYPE_CLASSES: Record<PartnerItem["type"], string> = {
  serif: "font-serif font-medium tracking-tight",
  mono: "font-mono tracking-tight lowercase",
  sans: "font-sans font-medium tracking-tight",
  sansBold: "font-sans font-semibold tracking-tight uppercase",
  sansLight: "font-sans font-light tracking-tight lowercase",
  italic: "font-serif italic font-medium tracking-tight lowercase",
};

function CornerTicks() {
  const tickBase =
    "absolute h-[10px] w-[10px] border-accent-foreground/30 transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:border-accent-foreground";

  return (
    <>
      <span
        className={`${tickBase} left-0 top-0 border-l border-t group-hover:-left-1.5 group-hover:-top-1.5`}
        aria-hidden="true"
      />
      <span
        className={`${tickBase} right-0 top-0 border-r border-t group-hover:-right-1.5 group-hover:-top-1.5`}
        aria-hidden="true"
      />
      <span
        className={`${tickBase} bottom-0 left-0 border-b border-l group-hover:-bottom-1.5 group-hover:-left-1.5`}
        aria-hidden="true"
      />
      <span
        className={`${tickBase} bottom-0 right-0 border-b border-r group-hover:-bottom-1.5 group-hover:-right-1.5`}
        aria-hidden="true"
      />
    </>
  );
}

function RollingArrow({
  iconSize = 12,
  strokeWidth = 2.2,
}: {
  iconSize?: number;
  strokeWidth?: number;
}) {
  return (
    <span
      className="relative inline-block overflow-hidden align-middle"
      style={{ width: iconSize, height: iconSize }}
      aria-hidden="true"
    >
      <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:translate-x-full">
        <span className="absolute inset-0 flex items-center justify-center">
          <ArrowRight
            style={{ width: iconSize, height: iconSize }}
            strokeWidth={strokeWidth}
          />
        </span>
        <span
          className="absolute inset-y-0 right-full flex items-center justify-center"
          style={{ width: iconSize }}
        >
          <ArrowRight
            style={{ width: iconSize, height: iconSize }}
            strokeWidth={strokeWidth}
          />
        </span>
      </span>
    </span>
  );
}

export function PartnersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      id="partners"
      className="relative w-full bg-accent text-accent-foreground rounded-[50px] select-none"
      aria-labelledby="partners-heading"
    >
      <div className="max-w-[1680px] mx-auto px-10 max-[850px]:px-6 py-24 max-[850px]:py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.6, ease: easeTransition }}
        >
          <h2
            id="partners-heading"
            className="inline-flex items-center rounded-md border border-accent-foreground/[0.08] px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-accent-foreground/70"
          >
            Our partners
          </h2>
        </motion.div>

        {/* Divider rule */}
        <div className="mt-6 h-px w-full bg-accent-foreground/15" />

        {/* Featured partner hero card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.8, ease: easeTransition, delay: 0.1 }}
          className="mt-16 max-[850px]:mt-10 grid grid-cols-12 gap-6 max-[850px]:gap-6 rounded-2xl bg-background p-3 max-[850px]:p-3 text-foreground"
        >
          <div className="col-span-7 max-[1100px]:col-span-12 flex flex-col p-7 max-[850px]:p-4">
            <h3 className="text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-tight">
              Northwind
            </h3>
            <p className="mt-6 max-w-[42ch] text-balance text-base max-[850px]:text-sm leading-relaxed text-foreground/65">
              Northwind has financed and partnered with platform-stage software companies since 2009, helping teams scale infrastructure and product in lockstep.
            </p>
            <a
              href="#"
              className="group mt-auto inline-flex items-center gap-3 self-start pt-12 max-[850px]:pt-8 font-mono text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors duration-200 hover:text-foreground"
            >
              Visit website
              <span
                aria-hidden="true"
                className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-accent text-accent-foreground"
              >
                <RollingArrow iconSize={12} strokeWidth={2.2} />
              </span>
            </a>
          </div>

          <div className="col-span-5 max-[1100px]:col-span-12 flex items-center justify-center rounded-xl bg-foreground min-h-[180px] max-[850px]:min-h-[140px] p-3">
            <span className="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-none text-background font-serif font-medium tracking-tight">
              Northwind
            </span>
          </div>
        </motion.div>

        {/* 12 Partner grid */}
        <div className="mt-20 max-[850px]:mt-14 grid grid-cols-4 gap-x-12 gap-y-16 max-[1100px]:grid-cols-3 max-[1100px]:gap-x-8 max-[1100px]:gap-y-12 max-[850px]:grid-cols-2 max-[850px]:gap-x-6 max-[850px]:gap-y-10">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{
                duration: 0.6,
                ease: easeTransition,
                delay: 0.32 + 0.04 * i,
              }}
              className="group relative flex aspect-[5/2] cursor-pointer items-center justify-center"
            >
              <CornerTicks />
              {/* Vertical sliding hover curtain background */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-accent-foreground/[0.08] transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-y-100"
              />
              <span
                className={`relative select-none px-3 text-center text-[clamp(1rem,1.5vw,1.4rem)] leading-tight text-accent-foreground/85 transition-colors duration-300 group-hover:text-accent-foreground ${
                  TYPE_CLASSES[partner.type]
                }`}
              >
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
