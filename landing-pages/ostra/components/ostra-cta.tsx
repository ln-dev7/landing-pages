"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const CTA_PORTRAITS = [
  { src: "/images/studio/portrait-1.webp", alt: "Emerald silk studio portrait", width: 576, height: 1024 },
  { src: "/images/studio/portrait-2.webp", alt: "High-fashion graphic pink liner", width: 682, height: 1024 },
  { src: "/images/studio/portrait-3.webp", alt: "Studio portrait with wooden geometric earrings", width: 682, height: 1024 },
  { src: "/images/studio/portrait-4.webp", alt: "Tailored beige blazer and gold hoops", width: 682, height: 1024 },
  { src: "/images/studio/portrait-5.webp", alt: "Voluminous afro and halter dress", width: 681, height: 1024 },
  { src: "/images/studio/portrait-6.webp", alt: "Monochrome high-contrast braids portrait", width: 646, height: 968 },
  { src: "/images/studio/portrait-7.webp", alt: "Black velvet and diamond choker", width: 640, height: 1024 },
  { src: "/images/studio/portrait-8.webp", alt: "Sculptural finger wave and manicure", width: 576, height: 1024 },
  { src: "/images/studio/portrait-9.webp", alt: "Macro beauty profile and glass skin", width: 682, height: 1024 },
  { src: "/images/studio/portrait-10.webp", alt: "Copper silk turban and golden neck rings", width: 580, height: 1024 },
  { src: "/images/studio/portrait-11.webp", alt: "Afro crown and golden hoops", width: 682, height: 1024 },
  { src: "/images/studio/portrait-12.webp", alt: "Sleek geometric bob haircut", width: 486, height: 876 },
  { src: "/images/studio/portrait-13.webp", alt: "Futuristic chrome portrait and warm rim light", width: 682, height: 1024 },
];

// Alternating vertical offsets so cards sit at distinct stepped heights (not all on the same flat line)
const CARD_VERTICAL_OFFSETS = [
  "-translate-y-8 sm:-translate-y-14",  // Elevated
  "translate-y-2 sm:translate-y-4",     // Lowered
  "-translate-y-12 sm:-translate-y-18", // High
  "translate-y-4 sm:translate-y-6",     // Low
  "-translate-y-6 sm:-translate-y-10",  // Mid-high
  "translate-y-0 sm:translate-y-2",     // Baseline
];

export function OstraCTA() {
  // Doubled array for seamless infinite marquee loop
  const marqueeItems = [...CTA_PORTRAITS, ...CTA_PORTRAITS];

  return (
    <section id="sitting" className="relative w-full pt-28 sm:pt-36 pb-0 bg-[#0a0a0c] text-white flex flex-col items-center justify-between select-none overflow-hidden">
      {/* 1. Upper Zone: Centered Call to Action */}
      <div className="relative z-20 max-w-3xl px-6 text-center flex flex-col items-center mb-12 sm:mb-16">
        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-white tracking-[-0.035em] leading-[1.05] mb-5 sm:mb-6"
        >
          Claim your presence in light.
        </motion.h2>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm xs:text-base sm:text-lg text-[#8e909a] font-normal leading-relaxed max-w-md sm:max-w-xl mb-8 sm:mb-10"
        >
          Private portrait sittings in our Lisbon studio, printed by hand on
          archival silver gelatin paper and delivered in bespoke linen folios.
        </motion.p>

        {/* Signature Action Button (White Pill with Black Arrow Chip) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <Link
            href="#sitting"
            className="inline-flex items-center justify-between gap-4 bg-white text-black hover:bg-[#e8e8e8] pl-7 pr-2.5 py-2.5 rounded-full text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer shadow-[0_10px_30px_rgba(255,255,255,0.15)] active:scale-95 group"
          >
            <span>Book your sitting</span>
            {/* Embedded Black Circle Chip with Arrow */}
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* 2. Lower Zone: Staggered Infinite Scrolling Marquee of Rounded Cards */}
      <div className="relative w-full overflow-hidden flex items-end pt-12 sm:pt-16 pb-2">
        {/* Soft Left and Right Edge Gradient Vignettes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0a0a0c] to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0a0a0c] to-transparent z-20" />

        {/* Marquee Track */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 38,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-end gap-4 sm:gap-6 w-max will-change-transform pb-2 hover:[animation-play-state:paused]"
        >
          {marqueeItems.map((card, idx) => {
            const offsetClass = CARD_VERTICAL_OFFSETS[idx % CARD_VERTICAL_OFFSETS.length];

            return (
              <div
                key={`cta-card-${idx}`}
                style={{ aspectRatio: `${card.width} / ${card.height}` }}
                className={`relative h-[300px] xs:h-[340px] sm:h-[400px] md:h-[450px] lg:h-[490px] shrink-0 rounded-[22px] sm:rounded-[28px] md:rounded-[34px] overflow-hidden bg-[#131418] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.9)] group cursor-pointer transition-transform duration-300 will-change-transform ${offsetClass}`}
              >
                <img
                  src={card.src}
                  alt={card.alt}
                  className="w-full h-full object-contain block transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle glass reflection / sheen top-left matching reference */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/[0.08] pointer-events-none" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
