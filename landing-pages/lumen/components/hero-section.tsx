"use client";

import { motion } from "motion/react";
import { ShaderCanvas } from "./shader-canvas";

const easeTransition = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const scrollToProduct = () => {
    document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden bg-black select-none">
      <div className="absolute inset-0">
        <ShaderCanvas />
      </div>

      <motion.div
        className="absolute inset-0 flex flex-col justify-between p-10 pt-40 max-[850px]:p-6 max-[850px]:pt-32 text-white pointer-events-none max-w-[1680px] mx-auto"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.12, delayChildren: 0.2 }}
      >
        {/* Animated Display Headline */}
        <motion.h1
          className="max-w-[18ch] text-[clamp(2.75rem,7.75vw,7.75rem)] font-medium leading-[0.95] tracking-tight"
          variants={{ hidden: {}, visible: {} }}
          transition={{ staggerChildren: 0.12 }}
        >
          {["Build what matters,", "ship without limits."].map((line) => (
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
        </motion.h1>

        {/* Bottom Subtitle + CTA */}
        <div className="flex items-end justify-between gap-8 max-[850px]:flex-col max-[850px]:items-start">
          <motion.p
            className="max-w-xl text-2xl font-medium leading-snug tracking-tight text-white/90"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: easeTransition }}
          >
            The all-in-one platform for modern teams to design, deploy, and
            scale software products faster than ever.
          </motion.p>

          <motion.button
            type="button"
            onClick={scrollToProduct}
            className="group pointer-events-auto inline-flex items-stretch gap-1 cursor-pointer"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: easeTransition }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="px-5 py-3 rounded-md bg-white text-neutral-900 text-xs font-medium tracking-widest uppercase border border-neutral-900/[0.08] shadow-sm">
              Explore the Platform
            </span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
