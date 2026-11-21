"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ShaderCanvas } from "./shader-canvas";
import { ArrowChip } from "./product-section";

const easeTransition = [0.33, 1, 0.68, 1] as const;
const HEADLINE_LINES = ["Ship the work,", "skip the waiting."];

export function FinalCtaSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section
      ref={ref}
      id="get-started"
      aria-labelledby="final-cta-heading"
      className="relative w-full bg-background text-foreground select-none"
    >
      <div className="max-w-[1680px] mx-auto px-10 max-[850px]:px-6 pb-32 max-[850px]:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 1, ease: easeTransition }}
          className="relative overflow-hidden rounded-3xl bg-[#3a1818] min-h-[520px] max-[850px]:min-h-[420px]"
        >
          {/* Background WebGL Shader Canvas */}
          <div aria-hidden="true" className="absolute inset-0">
            <ShaderCanvas />
          </div>

          {/* Vignette Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/10"
          />

          {/* Card Content */}
          <div className="relative h-full flex flex-col justify-between p-14 max-[850px]:p-8 min-h-[inherit] text-white">
            <motion.h2
              id="final-cta-heading"
              className="max-w-[16ch] text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-tight"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
            >
              {HEADLINE_LINES.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.05em]">
                  <motion.span
                    className="block will-change-transform"
                    variants={{ hidden: { y: "110%" }, visible: { y: "0%" } }}
                    transition={{ duration: 1, ease: easeTransition }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <div className="flex items-end justify-between gap-8 max-[850px]:flex-col max-[850px]:items-start mt-10">
              <motion.p
                className="max-w-xl text-3xl max-[850px]:text-base font-normal tracking-tighter leading-snug text-white/75"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.8, ease: easeTransition, delay: 0.6 }}
              >
                Spin up a workspace in under a minute. Pro is free for 14 days, no card, no calls, no friction.
              </motion.p>

              <motion.button
                type="button"
                className="group inline-flex items-stretch gap-1 cursor-pointer shrink-0"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.8, ease: easeTransition, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="px-5 py-3 rounded-md bg-white text-neutral-900 text-xs font-medium tracking-widest uppercase border border-neutral-900/[0.08]">
                  Get Lumen
                </span>
                <ArrowChip className="bg-white text-neutral-900" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
