"use client";

import Link from "next/link";
import { motion } from "motion/react";

// Curated high-fashion studio portraits in optimized WebP format
const STUDIO_PORTRAITS = [
  { src: "/images/studio/portrait-1.webp", aspect: "aspect-[3/4]", alt: "Editorial portrait in emerald silk" },
  { src: "/images/studio/portrait-2.webp", aspect: "aspect-[4/5]", alt: "High-fashion graphic pink liner" },
  { src: "/images/studio/portrait-3.webp", aspect: "aspect-[3/4]", alt: "Studio portrait with wooden geometric earrings" },
  { src: "/images/studio/portrait-4.webp", aspect: "aspect-[4/5]", alt: "Tailored beige blazer and gold hoops" },
  { src: "/images/studio/portrait-5.webp", aspect: "aspect-[3/4]", alt: "Voluminous afro and halter dress" },
  { src: "/images/studio/portrait-6.webp", aspect: "aspect-[4/5]", alt: "Monochrome high-contrast braids portrait" },
  { src: "/images/studio/portrait-7.webp", aspect: "aspect-[3/4]", alt: "Black velvet and diamond choker" },
  { src: "/images/studio/portrait-8.webp", aspect: "aspect-[4/5]", alt: "Sculptural finger wave and manicure" },
  { src: "/images/studio/portrait-9.webp", aspect: "aspect-[3/4]", alt: "Macro beauty profile and glass skin" },
  { src: "/images/studio/portrait-10.webp", aspect: "aspect-[4/5]", alt: "Copper silk turban and golden neck rings" },
  { src: "/images/studio/portrait-11.webp", aspect: "aspect-[3/4]", alt: "Afro crown and golden hoops" },
  { src: "/images/studio/portrait-12.webp", aspect: "aspect-[4/5]", alt: "Sleek geometric bob haircut" },
  { src: "/images/studio/portrait-13.webp", aspect: "aspect-[3/4]", alt: "Futuristic chrome portrait and warm rim light" },
];

// Distribute the 13 portraits across 7 continuous columns (8 images per column) for full vertical coverage
const STUDIO_COLUMNS = [
  // Column 1
  [STUDIO_PORTRAITS[0], STUDIO_PORTRAITS[5], STUDIO_PORTRAITS[9], STUDIO_PORTRAITS[2], STUDIO_PORTRAITS[7], STUDIO_PORTRAITS[11], STUDIO_PORTRAITS[4], STUDIO_PORTRAITS[1]],
  // Column 2
  [STUDIO_PORTRAITS[1], STUDIO_PORTRAITS[6], STUDIO_PORTRAITS[10], STUDIO_PORTRAITS[3], STUDIO_PORTRAITS[8], STUDIO_PORTRAITS[0], STUDIO_PORTRAITS[5], STUDIO_PORTRAITS[12]],
  // Column 3
  [STUDIO_PORTRAITS[2], STUDIO_PORTRAITS[7], STUDIO_PORTRAITS[11], STUDIO_PORTRAITS[4], STUDIO_PORTRAITS[9], STUDIO_PORTRAITS[1], STUDIO_PORTRAITS[6], STUDIO_PORTRAITS[10]],
  // Column 4 (Behind arch apex)
  [STUDIO_PORTRAITS[8], STUDIO_PORTRAITS[3], STUDIO_PORTRAITS[12], STUDIO_PORTRAITS[5], STUDIO_PORTRAITS[0], STUDIO_PORTRAITS[6], STUDIO_PORTRAITS[11], STUDIO_PORTRAITS[2]],
  // Column 5
  [STUDIO_PORTRAITS[4], STUDIO_PORTRAITS[9], STUDIO_PORTRAITS[0], STUDIO_PORTRAITS[6], STUDIO_PORTRAITS[1], STUDIO_PORTRAITS[7], STUDIO_PORTRAITS[3], STUDIO_PORTRAITS[8]],
  // Column 6
  [STUDIO_PORTRAITS[5], STUDIO_PORTRAITS[10], STUDIO_PORTRAITS[1], STUDIO_PORTRAITS[7], STUDIO_PORTRAITS[2], STUDIO_PORTRAITS[8], STUDIO_PORTRAITS[12], STUDIO_PORTRAITS[4]],
  // Column 7
  [STUDIO_PORTRAITS[6], STUDIO_PORTRAITS[11], STUDIO_PORTRAITS[2], STUDIO_PORTRAITS[8], STUDIO_PORTRAITS[3], STUDIO_PORTRAITS[0], STUDIO_PORTRAITS[10], STUDIO_PORTRAITS[5]],
];

// Stagger offsets for natural rhythmic flow matching the reference
const COLUMN_OFFSETS = [
  "-mt-14 sm:-mt-20",
  "-mt-4 sm:-mt-8",
  "-mt-24 sm:-mt-32",
  "-mt-10 sm:-mt-14",
  "-mt-28 sm:-mt-36",
  "-mt-6 sm:-mt-10",
  "-mt-18 sm:-mt-24",
];

export function OstraHero() {
  return (
    <section id="hero" className="relative w-full h-[100dvh] overflow-hidden bg-[#0a0a0c] text-white flex items-end justify-center select-none">
      {/* 1. Multi-Column Photo Studio Mosaic Background */}
      <div className="absolute inset-0 w-full h-full flex justify-center overflow-hidden pointer-events-none z-0">
        <div className="grid grid-cols-7 gap-2 sm:gap-3.5 md:gap-4 w-[150vw] sm:w-[130vw] md:w-[120vw] lg:w-[112vw] h-[140vh] scale-100 sm:scale-105">
          {STUDIO_COLUMNS.map((column, colIdx) => {
            const isEven = colIdx % 2 === 0;
            const offsetClass = COLUMN_OFFSETS[colIdx] || "-mt-12";

            return (
              <motion.div
                key={`col-${colIdx}`}
                animate={{
                  y: isEven ? [-12, 12, -12] : [12, -12, 12],
                }}
                transition={{
                  duration: 8 + colIdx * 0.7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`flex flex-col gap-2 sm:gap-3.5 md:gap-4 will-change-transform ${offsetClass}`}
              >
                {column.map((img, imgIdx) => (
                  <div
                    key={`img-${colIdx}-${imgIdx}`}
                    className={`relative w-full ${img.aspect} rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden bg-[#16171a] shadow-md shrink-0`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      loading={imgIdx < 3 ? "eager" : "lazy"}
                    />
                    {/* Subtle contrast grading */}
                    <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. Soft Edge Vignettes */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-t from-[#0a0a0c] to-transparent z-10" />

      {/* 3. The Central Architectural Arch Portal (Adapted for Studio Ostra Photography) */}
      <div className="relative z-30 flex items-end justify-center w-full h-full pointer-events-none pb-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[78vw] xs:w-[76vw] sm:w-[500px] md:w-[600px] lg:w-[660px] xl:w-[700px] h-[84vh] sm:h-[87vh] md:h-[89vh] lg:h-[90vh] rounded-t-full rounded-b-none bg-[#0a0a0c] border-t border-x border-white/[0.08] shadow-[0_-25px_90px_rgba(0,0,0,0.95)] flex flex-col items-center justify-center px-6 xs:px-8 sm:px-12 md:px-16 pt-20 xs:pt-24 sm:pt-32 pb-14 sm:pb-18 text-center pointer-events-auto"
        >
          {/* Main Headline */}
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-white tracking-[-0.035em] leading-[1.06] mb-4 sm:mb-6">
            Light, form<br />and soul.
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-xs xs:text-sm sm:text-base md:text-lg text-[#9da0aa] font-normal leading-relaxed max-w-[260px] xs:max-w-xs sm:max-w-md mb-8 sm:mb-10">
            Studio Ostra crafts editorial portraits,<br className="hidden sm:inline" /> high-fashion beauty, and timeless visual stories.
          </p>

          {/* CTA Button */}
          <div>
            <Link
              href="#portfolio"
              className="inline-flex items-center justify-center bg-white text-black hover:bg-[#e8e8e8] px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
            >
              View portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
