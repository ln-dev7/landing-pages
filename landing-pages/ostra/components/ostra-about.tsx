"use client";

import Link from "next/link";
import { motion } from "motion/react";

interface DarkroomPrint {
  id: string;
  src: string;
  alt: string;
  aspect: string;
  rotate: number;
  position: string;
  isGrayscale?: boolean;
  size: string;
  floatDelay: number;
}

const PRINTS: DarkroomPrint[] = [
  // Top Row
  {
    id: "top-1",
    src: "/images/studio/portrait-1.webp",
    alt: "Studio portrait in warm lighting",
    aspect: "aspect-[3/4]",
    rotate: 3.5,
    position: "top-[-6%] sm:top-[-4%] left-[22%] sm:left-[25%]",
    size: "w-24 xs:w-28 sm:w-36 md:w-44 lg:w-52",
    floatDelay: 0.2,
  },
  {
    id: "top-2",
    src: "/images/studio/portrait-4.webp",
    alt: "Editorial beige blazer portrait",
    aspect: "aspect-[4/5]",
    rotate: -3,
    position: "top-[-8%] sm:top-[-6%] left-[50%] -translate-x-1/2",
    size: "w-24 xs:w-28 sm:w-36 md:w-44 lg:w-52",
    floatDelay: 0.6,
  },
  {
    id: "top-3",
    src: "/images/studio/portrait-10.webp",
    alt: "Copper silk turban darkroom print",
    aspect: "aspect-[3/4]",
    rotate: -4.5,
    position: "top-[-6%] sm:top-[-5%] right-[16%] sm:right-[18%]",
    size: "w-24 xs:w-30 sm:w-38 md:w-48 lg:w-56",
    floatDelay: 0.4,
  },

  // Left Flank
  {
    id: "left-1",
    src: "/images/studio/portrait-5.webp",
    alt: "Floral halter studio print",
    aspect: "aspect-[3/4]",
    rotate: 2.5,
    position: "top-[16%] sm:top-[18%] left-[-8%] xs:left-[-4%] sm:left-[-1%]",
    size: "w-28 xs:w-32 sm:w-40 md:w-48 lg:w-56",
    floatDelay: 0.1,
  },
  {
    id: "left-2",
    src: "/images/studio/portrait-12.webp",
    alt: "Sleek geometric bob portrait",
    aspect: "aspect-[4/5]",
    rotate: -4,
    position: "top-[48%] sm:top-[46%] left-[-6%] xs:left-[-2%] sm:left-[1%]",
    size: "w-28 xs:w-32 sm:w-40 md:w-48 lg:w-56",
    floatDelay: 0.8,
  },

  // Bottom-Left
  {
    id: "bottom-1",
    src: "/images/studio/portrait-8.webp",
    alt: "Sculptural wave beauty print",
    aspect: "aspect-[4/3]",
    rotate: 3,
    position: "bottom-[-6%] sm:bottom-[-4%] left-[4%] sm:left-[8%]",
    size: "w-28 xs:w-32 sm:w-40 md:w-48 lg:w-56",
    floatDelay: 0.3,
  },
  {
    id: "bottom-2",
    src: "/images/studio/portrait-6.webp",
    alt: "Monochrome braids archival print",
    aspect: "aspect-[3/4]",
    rotate: -3.5,
    position: "bottom-[8%] sm:bottom-[7%] left-[24%] sm:left-[26%]",
    size: "w-26 xs:w-30 sm:w-38 md:w-44 lg:w-52",
    isGrayscale: true,
    floatDelay: 0.7,
  },

  // Bottom Center & Right
  {
    id: "bottom-3",
    src: "/images/studio/portrait-3.webp",
    alt: "Wooden square earrings portrait",
    aspect: "aspect-[4/5]",
    rotate: 2,
    position: "bottom-[-7%] sm:bottom-[-5%] left-[46%] -translate-x-1/2",
    size: "w-22 xs:w-26 sm:w-32 md:w-38 lg:w-44",
    floatDelay: 0.5,
  },
  {
    id: "bottom-4",
    src: "/images/studio/portrait-9.webp",
    alt: "Macro glass skin beauty print",
    aspect: "aspect-[3/4]",
    rotate: -2,
    position: "bottom-[-6%] sm:bottom-[-4%] right-[20%] sm:right-[22%]",
    size: "w-24 xs:w-28 sm:w-36 md:w-42 lg:w-48",
    floatDelay: 0.9,
  },

  // Right Flank
  {
    id: "right-1",
    src: "/images/studio/portrait-11.webp",
    alt: "Afro crown studio print",
    aspect: "aspect-[4/5]",
    rotate: 3.5,
    position: "bottom-[16%] sm:bottom-[18%] right-[10%] sm:right-[13%]",
    size: "w-26 xs:w-30 sm:w-38 md:w-44 lg:w-52",
    floatDelay: 0.2,
  },
  {
    id: "right-2",
    src: "/images/studio/portrait-7.webp",
    alt: "Black velvet and diamond portrait",
    aspect: "aspect-[3/4]",
    rotate: -2.5,
    position: "top-[40%] sm:top-[38%] right-[-6%] xs:right-[-3%] sm:right-[0%]",
    size: "w-28 xs:w-32 sm:w-40 md:w-48 lg:w-56",
    floatDelay: 0.6,
  },
  {
    id: "right-3",
    src: "/images/studio/portrait-2.webp",
    alt: "High-fashion pink liner portrait",
    aspect: "aspect-[4/5]",
    rotate: -2,
    position: "top-[12%] sm:top-[11%] right-[-3%] xs:right-[0%] sm:right-[3%]",
    size: "w-28 xs:w-34 sm:w-42 md:w-52 lg:w-60",
    floatDelay: 0.4,
  },
];

export function OstraAbout() {
  return (
    <section id="about" className="relative w-full min-h-[100dvh] h-[100dvh] overflow-hidden bg-[#0a0a0c] text-white flex items-center justify-center select-none py-16 sm:py-24">
      {/* 1. Scattered Floating Darkroom Prints (Archival Baryta Paper Margins) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10">
        {PRINTS.map((print) => (
          <motion.div
            key={print.id}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            animate={{
              y: [-6, 6, -6],
              rotate: [print.rotate - 0.7, print.rotate + 0.7, print.rotate - 0.7],
            }}
            transition={{
              duration: 7 + print.floatDelay * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: print.floatDelay,
            }}
            className={`absolute ${print.position} ${print.size} z-10 will-change-transform`}
            style={{ transformOrigin: "center center" }}
          >
            {/* Physical Darkroom Paper Border */}
            <div className="relative p-1.5 xs:p-2 sm:p-2.5 md:p-3 bg-white rounded-[2px] shadow-[0_12px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_55px_rgba(0,0,0,0.95)] hover:scale-105 transition-all duration-500 group pointer-events-auto cursor-pointer">
              <div className={`relative w-full ${print.aspect} overflow-hidden bg-[#16171a]`}>
                <img
                  src={print.src}
                  alt={print.alt}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    print.isGrayscale ? "grayscale contrast-[1.12]" : "contrast-[1.05]"
                  }`}
                  loading="lazy"
                />
                {/* Micro surface film sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. Soft Edge Vignette to keep focus on typography */}
      <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#0a0a0c]/40 to-[#0a0a0c] z-20" />

      {/* 3. Central Editorial Heritage Content */}
      <div className="relative z-30 max-w-2xl sm:max-w-3xl px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-white tracking-[-0.035em] leading-[1.05] mb-5 sm:mb-6"
        >
          Portraits, printed by<br />hand since 1979.
        </motion.h2>

        {/* Subtitle / Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm xs:text-base sm:text-lg md:text-xl text-[#9da0aa] font-normal leading-relaxed max-w-sm sm:max-w-lg mb-8 sm:mb-10"
        >
          One camera, one darkroom in Lisbon and<br className="hidden sm:inline" /> forty years of faces.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <Link
            href="#sitting"
            className="inline-flex items-center justify-center bg-white text-black hover:bg-[#e8e8e8] px-8 py-3.5 rounded-full text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer shadow-lg active:scale-95"
          >
            Book a sitting
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
