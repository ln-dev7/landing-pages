"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { SiteHeader } from "./site-header";
import { RunningStatsCard } from "./running-stats-card";

interface HeroSectionProps {
  imageSrc?: string;
}

export function HeroSection({ imageSrc = "/hero-v3.webp" }: HeroSectionProps) {
  return (
    <section id="home" className="relative w-full overflow-hidden flex flex-col justify-start items-center pt-2 sm:pt-3 px-2 sm:px-3 pb-0">
      {/* Ambient Blurred Background of the image behind the hero card */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={imageSrc}
          alt="Ambient blurred backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110 filter blur-[45px] sm:blur-[60px] lg:blur-[80px] brightness-[0.85] contrast-[1.1] saturate-[1.25]"
        />
        {/* Subtle dark tint to preserve contrast */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      </div>

      {/* Framed Hero Card Container — rounded top only, straight grounded bottom */}
      <div className="relative z-10 w-[97vw] max-w-[2400px] mx-auto h-[92vh] min-h-[760px] max-h-[1050px] rounded-t-[26px] sm:rounded-t-[38px] lg:rounded-t-[46px] rounded-b-none overflow-hidden flex flex-col justify-between bg-[#080d0a] shadow-[0_30px_90px_rgba(0,0,0,0.7)] border-t border-x border-b-0 border-white/15">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src={imageSrc}
            alt="Woman immersed in crystal clear sunlight water with floating coconuts"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_center] sm:object-center filter brightness-[0.93] contrast-[1.05]"
          />

          {/* Cinematic Vignette & Ambient Dark Gradient for flawless text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/35 pointer-events-none" />
        </div>

        {/* Top Header inside the rounded hero frame */}
        <SiteHeader />

        {/* Hero Content Container — elevated & well-balanced */}
        <div className="relative z-10 w-full max-w-[95%] mx-auto px-6 sm:px-12 lg:px-16 my-auto pt-10 sm:pt-16 pb-8 sm:pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-8">
            {/* Left Column — Text & CTAs (elevated) */}
            <div className="max-w-2xl lg:mb-10 xl:mb-14">
              {/* Main Title (finer, more refined font weight) */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal tracking-tight text-white leading-[1.08] mb-5 sm:mb-6"
              >
                Care for your <br />
                mental health.
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg lg:text-xl text-white/75 max-w-lg leading-relaxed mb-8 sm:mb-10 font-light"
              >
                Track every move, analyze your performance, and get real-time
                coaching, all from your wrist.
              </motion.p>

              {/* Dual Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-4 sm:gap-5"
              >
                {/* Primary Lime Button */}
                <Link
                  href="#request-call"
                  className="group inline-flex items-center gap-2 bg-[#d7f943] hover:bg-[#c6e835] text-[#0e1711] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]"
                >
                  <span>Request A Call</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                {/* Secondary Frosted Glass Button */}
                <Link
                  href="#features"
                  className="group inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white hover:text-[#d7f943] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-normal text-sm sm:text-base transition-all duration-200 shadow-md hover:scale-[1.02]"
                >
                  <span>Explore Features</span>
                  <ArrowRight className="w-4 h-4 text-[#d7f943] transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>

            {/* Right Column — Floating Glass HUD Widget */}
            <div className="flex justify-start lg:justify-end lg:pr-8 lg:pb-6 pt-4 lg:pt-0 lg:self-end">
              <RunningStatsCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
