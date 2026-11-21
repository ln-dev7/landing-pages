"use client";

import Link from "next/link";
import { motion } from "motion/react";

const PROCESS_STEPS = [
  {
    step: "1",
    label: "Consultation & creative moodboard",
  },
  {
    step: "2",
    label: "Private two-hour studio sitting",
  },
  {
    step: "3",
    label: "Handcrafted darkroom folio & scans",
  },
];

export function OstraPricing() {
  return (
    <section id="pricing" className="relative w-full py-24 sm:py-32 bg-[#0a0a0c] text-white flex items-center justify-center select-none overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tripartite Container (Desktop: Horizontal 3-Block Triptych) */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
          {/* 1. Left Card: The Process & Journey */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[42%] bg-black border border-white/[0.08] rounded-[28px] sm:rounded-[36px] lg:rounded-r-none lg:border-r-0 p-8 sm:p-12 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8)] lg:h-[500px]"
          >
            <div>
              {/* Editorial Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif text-white tracking-[-0.025em] leading-[1.12] mb-8 sm:mb-10">
                From first light<br />to master print.
              </h2>
            </div>

            {/* 3 Process Pills */}
            <div className="flex flex-col gap-3 sm:gap-3.5">
              {PROCESS_STEPS.map((item) => (
                <div
                  key={`step-${item.step}`}
                  className="bg-[#131418] border border-white/[0.06] hover:border-white/15 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:py-4 flex items-center gap-4 transition-colors duration-200"
                >
                  <span className="font-mono text-xs sm:text-sm text-[#6e707a] font-semibold w-5 shrink-0">
                    {item.step}
                  </span>
                  <span className="text-xs sm:text-sm text-white/90 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 2. Center Protruding Architectural Window Portal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-full sm:w-[360px] md:w-[380px] lg:w-[340px] xl:w-[380px] h-[480px] sm:h-[560px] lg:h-[600px] shrink-0 p-3 sm:p-3.5 bg-[#17181d] border border-white/[0.12] rounded-[44px] sm:rounded-[52px] shadow-[0_25px_80px_rgba(0,0,0,0.95)] my-[-20px] lg:my-[-40px]"
          >
            <div className="relative w-full h-full rounded-[34px] sm:rounded-[42px] overflow-hidden bg-[#0d0e12]">
              <img
                src="/images/studio/portrait-4.webp"
                alt="Studio sitting portrait"
                className="w-full h-full object-cover grayscale-[15%] contrast-[1.08] hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/[0.06] pointer-events-none" />
            </div>
          </motion.div>

          {/* 3. Right Card: The All-Inclusive Offer */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[42%] bg-black border border-white/[0.08] rounded-[28px] sm:rounded-[36px] lg:rounded-l-none lg:border-l-0 p-8 sm:p-12 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.8)] lg:h-[500px]"
          >
            <div>
              {/* Editorial Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-serif text-white tracking-[-0.025em] leading-[1.12] mb-8 sm:mb-10">
                Transparent,<br />all-inclusive.
              </h2>

              {/* Price Metric */}
              <div className="mb-2">
                <span className="text-5xl sm:text-6xl lg:text-[68px] font-bold text-white tracking-[-0.03em] leading-none">
                  €650
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#8e909a] font-normal mb-8">
                Per sitting · 10 archival fiber prints included
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href="#reserve"
                className="inline-flex items-center justify-center bg-white text-black hover:bg-[#e8e8e8] px-8 py-3.5 rounded-full text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
              >
                Reserve a sitting
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
