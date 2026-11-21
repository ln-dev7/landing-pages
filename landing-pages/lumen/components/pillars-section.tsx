"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Compass, Layers, Zap, LucideIcon } from "lucide-react";
import { RevealHeadline } from "./reveal-headline";

interface PillarItem {
  tag: string;
  title: string;
  body: string;
  icon: LucideIcon;
}

const PILLARS: PillarItem[] = [
  {
    tag: "01 — focus",
    title: "Plan with intent",
    body: "Replace scattered docs and threads with a single source of truth that turns goals into commits.",
    icon: Compass,
  },
  {
    tag: "02 — flow",
    title: "Build without friction",
    body: "Branches, environments, and reviews stay in sync so the work moves at the speed of decisions.",
    icon: Layers,
  },
  {
    tag: "03 — fire",
    title: "Ship with confidence",
    body: "Deploys, observability, and rollbacks live in one loop — so the team trusts every release.",
    icon: Zap,
  },
];

const easeTransition = [0.33, 1, 0.68, 1] as const;

function PillarIconBox({
  Icon,
  featured,
}: {
  Icon: LucideIcon;
  featured: boolean;
}) {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-md transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:rotate-[-6deg] group-hover:scale-[1.05] ${
        featured
          ? "bg-accent-foreground/10 text-accent-foreground"
          : "bg-foreground/10 text-foreground"
      }`}
      aria-hidden="true"
    >
      <Icon className="h-5 w-5" strokeWidth={1.6} />
    </div>
  );
}

export function PillarsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section
      ref={ref}
      id="solutions"
      aria-labelledby="pillars-heading"
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
              The platform
            </motion.span>
          </div>

          {/* Heading & description right */}
          <div className="col-span-7 col-start-6 max-[1100px]:col-span-12 max-[1100px]:col-start-1 max-[850px]:col-span-1">
            <RevealHeadline
              id="pillars-heading"
              delay={0.05}
              className="text-balance text-[clamp(2rem,4.2vw,4rem)] font-medium leading-[0.95] tracking-tight"
            >
              The Lumen platform is built on three working principles.
            </RevealHeadline>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.7, ease: easeTransition, delay: 0.18 }}
              className="mt-6 max-w-[60ch] text-balance text-xl max-[850px]:text-lg font-light leading-snug text-foreground/60"
            >
              Each one carries part of the workflow — turning the fragmented act
              of shipping software into a single, continuous motion.
            </motion.p>
          </div>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="mt-20 max-[850px]:mt-12 grid grid-cols-3 gap-5 max-[1100px]:grid-cols-1 max-[1100px]:gap-4">
          {PILLARS.map((pillar, i) => {
            const isFeatured = i === 0;

            return (
              <motion.article
                key={pillar.tag}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.8,
                  ease: easeTransition,
                  delay: 0.25 + 0.08 * i,
                }}
                className="relative flex"
              >
                <div
                  className={`group relative flex flex-1 flex-col justify-between rounded-2xl p-8 max-[850px]:p-6 min-h-[360px] max-[850px]:min-h-[280px] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isFeatured
                      ? "bg-accent text-accent-foreground"
                      : "bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.06]"
                  }`}
                >
                  <PillarIconBox Icon={pillar.icon} featured={isFeatured} />

                  <div>
                    <p
                      className={`font-mono text-xs uppercase tracking-[0.2em] ${
                        isFeatured
                          ? "text-accent-foreground/55"
                          : "text-foreground/45"
                      }`}
                    >
                      {pillar.tag}
                    </p>
                    <h3 className="mt-3 text-2xl max-[850px]:text-xl font-medium leading-tight tracking-tight">
                      {pillar.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm leading-relaxed ${
                        isFeatured
                          ? "text-accent-foreground/75"
                          : "text-foreground/60"
                      }`}
                    >
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
