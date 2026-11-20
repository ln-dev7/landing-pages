"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  customImageSrc?: string;
}

export function HeroSection({ customImageSrc = "/hero-main.webp" }: HeroSectionProps) {
  return (
    <section className="w-full max-w-[1680px] mx-auto px-3 sm:px-5 lg:px-6 pb-14 pt-2">
      <div className="relative w-full h-[660px] sm:h-[760px] lg:h-[860px] rounded-[32px] sm:rounded-[42px] lg:rounded-[52px] overflow-hidden shadow-2xl bg-[#0c1a14]">
        {/* Background WebP Image */}
        <Image
          src={customImageSrc}
          alt="Two people floating peacefully in water"
          fill
          priority
          sizes="(max-width: 1680px) 100vw, 1680px"
          className="object-cover object-center filter brightness-[0.88] contrast-[1.05]"
        />

        {/* Ambient Dark Overlay for subtle cinematic contrast and flawless legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-black/35 pointer-events-none" />

        {/* Central Content with Smooth Text Animations */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 z-10">
          <motion.h1
            initial="hidden"
            animate="visible"
            className="max-w-5xl text-white tracking-tight drop-shadow-lg"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 32 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="block font-sans font-medium text-3xl sm:text-5xl md:text-6xl lg:text-[78px] leading-[1.12] mb-2 sm:mb-3"
            >
              Train Your Mind Like You Train
            </motion.span>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 36, scale: 0.98 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="block font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-[98px] leading-[1.05] tracking-wide text-white/95"
            >
              Your Body
            </motion.span>
          </motion.h1>

          {/* Central Glassmorphic CTA Pill with entrance animation */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-12"
          >
            <Link
              href="#training"
              className="group inline-flex items-center gap-3.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/35 text-white pl-7 pr-3 py-3 rounded-full text-base sm:text-lg font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.99]"
            >
              <span className="tracking-wide">Start Your Training</span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#122b20] text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
