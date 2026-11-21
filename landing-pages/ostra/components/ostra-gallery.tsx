"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

interface GalleryArtwork {
  id: string;
  title: string;
  specs: string;
  src: string;
  alt: string;
  bgTint: string;
  width: number;
  height: number;
}

const GALLERY_WORKS: GalleryArtwork[] = [
  {
    id: "work-1",
    title: "Amina, emerald & gold",
    specs: "2024, selenium-toned silver gelatin, 50 × 60 cm",
    src: "/images/studio/portrait-1.webp",
    alt: "Amina in emerald silk portrait",
    bgTint: "from-emerald-950/40 via-black to-[#0a0a0c]",
    width: 576,
    height: 1024,
  },
  {
    id: "work-2",
    title: "Zahra, graphic rose",
    specs: "2024, archival pigment on baryta paper, 40 × 50 cm",
    src: "/images/studio/portrait-2.webp",
    alt: "Zahra with graphic pink liner",
    bgTint: "from-rose-950/40 via-black to-[#0a0a0c]",
    width: 682,
    height: 1024,
  },
  {
    id: "work-3",
    title: "Mireille, geometric wood",
    specs: "2023, archival fiber silver print, 40 × 50 cm",
    src: "/images/studio/portrait-3.webp",
    alt: "Mireille with wooden geometric earrings",
    bgTint: "from-amber-950/40 via-black to-[#0a0a0c]",
    width: 682,
    height: 1024,
  },
  {
    id: "work-4",
    title: "Sora, architectural linen",
    specs: "2024, hand-washed silver gelatin, 40 × 50 cm",
    src: "/images/studio/portrait-4.webp",
    alt: "Sora in beige tailored blazer",
    bgTint: "from-stone-900/50 via-black to-[#0a0a0c]",
    width: 682,
    height: 1024,
  },
  {
    id: "work-5",
    title: "Nia, voluminous crown",
    specs: "2024, selenium-toned darkroom master, 50 × 60 cm",
    src: "/images/studio/portrait-5.webp",
    alt: "Nia with voluminous afro",
    bgTint: "from-emerald-950/30 via-black to-[#0a0a0c]",
    width: 681,
    height: 1024,
  },
  {
    id: "work-6",
    title: "Awa, monochrome braids",
    specs: "2023, silver bromide darkroom master, 50 × 60 cm",
    src: "/images/studio/portrait-6.webp",
    alt: "Awa monochrome braids portrait",
    bgTint: "from-zinc-900/60 via-black to-[#0a0a0c]",
    width: 646,
    height: 968,
  },
  {
    id: "work-7",
    title: "Imani, midnight velvet",
    specs: "2024, archival platinum-palladium print, 40 × 50 cm",
    src: "/images/studio/portrait-7.webp",
    alt: "Imani in black velvet with diamond choker",
    bgTint: "from-blue-950/40 via-black to-[#0a0a0c]",
    width: 640,
    height: 1024,
  },
  {
    id: "work-8",
    title: "Fatou, sculpted wave",
    specs: "2023, selenium archival print, 50 × 60 cm",
    src: "/images/studio/portrait-8.webp",
    alt: "Fatou with sculpted finger waves",
    bgTint: "from-neutral-900/50 via-black to-[#0a0a0c]",
    width: 576,
    height: 1024,
  },
  {
    id: "work-9",
    title: "Rêve, glass skin macro",
    specs: "2024, ultra-fine archival pigment, 40 × 50 cm",
    src: "/images/studio/portrait-9.webp",
    alt: "Rêve glass skin profile",
    bgTint: "from-amber-950/30 via-black to-[#0a0a0c]",
    width: 682,
    height: 1024,
  },
  {
    id: "work-10",
    title: "Kemi, copper silk & brass",
    specs: "2024, hand-pulled photogravure print, 50 × 70 cm",
    src: "/images/studio/portrait-10.webp",
    alt: "Kemi with copper silk turban",
    bgTint: "from-amber-950/40 via-black to-[#0a0a0c]",
    width: 580,
    height: 1024,
  },
  {
    id: "work-11",
    title: "Binta, afro silhouette",
    specs: "2024, selenium-toned baryta print, 50 × 60 cm",
    src: "/images/studio/portrait-11.webp",
    alt: "Binta afro studio portrait",
    bgTint: "from-zinc-900/50 via-black to-[#0a0a0c]",
    width: 682,
    height: 1024,
  },
  {
    id: "work-12",
    title: "Yara, geometric bob",
    specs: "2023, archival silver gelatin, 40 × 50 cm",
    src: "/images/studio/portrait-12.webp",
    alt: "Yara sleek bob portrait",
    bgTint: "from-stone-900/40 via-black to-[#0a0a0c]",
    width: 486,
    height: 876,
  },
  {
    id: "work-13",
    title: "Aura, chrome & amber",
    specs: "2024, high-gloss archival metallic print, 50 × 70 cm",
    src: "/images/studio/portrait-13.webp",
    alt: "Aura futuristic chrome portrait",
    bgTint: "from-orange-950/40 via-black to-[#0a0a0c]",
    width: 682,
    height: 1024,
  },
];

export function OstraGallery() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const totalWorks = GALLERY_WORKS.length;

  // Infinite smooth auto-scroll: never ends, smoothly advances every 3.5s
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalWorks);
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered, totalWorks]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalWorks) % totalWorks);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalWorks);
  };

  const currentWork = GALLERY_WORKS[activeIndex];

  return (
    <section id="gallery" className="relative w-full py-28 sm:py-36 bg-[#0a0a0c] text-white flex flex-col items-center justify-center select-none overflow-hidden">
      {/* 1. Header (Left-aligned within max-width, matching reference) */}
      <div className="relative z-10 w-full max-w-7xl px-6 sm:px-8 mb-12 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.035em] text-white leading-[1.08] mb-4 max-w-3xl"
        >
          Ordinary faces, given the whole frame.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm xs:text-base sm:text-lg text-[#8e909a] font-normal leading-relaxed max-w-2xl"
        >
          Editorial studies by Studio Ostra, shot by sculpted light and printed to order in Lisbon.
        </motion.p>
      </div>

      {/* 2. 3D Coverflow Stage with Arc de Cercle Curved Geometry & Generous Spacing */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full px-4 sm:px-6 h-[500px] sm:h-[580px] md:h-[640px] lg:h-[700px] flex items-center justify-center perspective-[1400px] overflow-hidden"
      >
        {/* Soft edge fade so cards transition off-screen like film rolling */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0a0a0c] to-transparent z-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0a0a0c] to-transparent z-40" />

        <div className="relative w-full h-full flex items-center justify-center">
          {GALLERY_WORKS.map((work, idx) => {
            // Infinite circular wrap-around distance calculation
            let diff = (idx - activeIndex) % totalWorks;
            if (diff > totalWorks / 2) diff -= totalWorks;
            if (diff < -totalWorks / 2) diff += totalWorks;

            // Render up to 3 cards on left and 3 cards on right (7 cards total on screen) to guarantee ZERO VOID
            if (Math.abs(diff) > 3) return null;

            const isCenter = diff === 0;

            // Arc de cercle coordinates: cards drop down progressively in Y as they spread out in X
            let xOffset = 0;
            let yOffset = 0;
            let rotateZ = 0;
            let scale = 1;
            let zIndex = 30;
            let opacity = 1;

            if (isCenter) {
              xOffset = 0;
              yOffset = 0; // Apex of the circular arc
              rotateZ = 0;
              scale = 1;
              zIndex = 35;
              opacity = 1;
            } else if (diff === -1) {
              // Left Neighbor: curve step 1
              xOffset = -460;
              yOffset = 38; // Drops along the circular arc
              rotateZ = -5; // Tangent to the arc
              scale = 0.92;
              zIndex = 25;
              opacity = 0.92;
            } else if (diff === 1) {
              // Right Neighbor: curve step 1
              xOffset = 460;
              yOffset = 38; // Drops along the circular arc
              rotateZ = 5;  // Tangent to the arc
              scale = 0.92;
              zIndex = 25;
              opacity = 0.92;
            } else if (diff === -2) {
              // Outer Left: curve step 2
              xOffset = -900;
              yOffset = 118; // Drops further along the arc
              rotateZ = -9.5;
              scale = 0.82;
              zIndex = 15;
              opacity = 0.6;
            } else if (diff === 2) {
              // Outer Right: curve step 2
              xOffset = 900;
              yOffset = 118; // Drops further along the arc
              rotateZ = 9.5;
              scale = 0.82;
              zIndex = 15;
              opacity = 0.6;
            } else if (diff === -3) {
              // Edge Left: curve step 3
              xOffset = -1320;
              yOffset = 215; // Bottom edges of the arc
              rotateZ = -14;
              scale = 0.72;
              zIndex = 5;
              opacity = 0.28;
            } else if (diff === 3) {
              // Edge Right: curve step 3
              xOffset = 1320;
              yOffset = 215; // Bottom edges of the arc
              rotateZ = 14;
              scale = 0.72;
              zIndex = 5;
              opacity = 0.28;
            }

            return (
              <motion.div
                key={work.id}
                animate={{
                  x: xOffset,
                  y: yOffset,
                  rotateZ: rotateZ,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => setActiveIndex(idx)}
                style={{
                  aspectRatio: `${work.width} / ${work.height}`,
                }}
                className="absolute h-[340px] xs:h-[400px] sm:h-[460px] md:h-[510px] lg:h-[550px] cursor-pointer will-change-transform"
              >
                {/* Card Container identical to CTA section cards: pure dark luxury, perfect aspect ratio, zero cropping */}
                <div className="relative w-full h-full rounded-[22px] sm:rounded-[28px] md:rounded-[34px] overflow-hidden bg-[#131418] border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-all duration-300 group">
                  <img
                    src={work.src}
                    alt={work.alt}
                    className="w-full h-full object-contain block transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle glass reflection & top sheen matching CTA */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/[0.08] pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Navigation Controls & Active Artwork Metadata (Below Center Card) */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-30 flex items-center justify-center gap-6 sm:gap-10 mt-6 sm:mt-10"
      >
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous artwork"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Dynamic Metadata Block */}
        <div className="text-center min-w-[260px] sm:min-w-[340px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWork.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 tracking-tight">
                {currentWork.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#8e909a] font-normal mb-2.5">
                {currentWork.specs}
              </p>
              <Link
                href="#order-print"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white hover:text-[#e8e8e8] underline underline-offset-4 tracking-tight transition-colors duration-150 group"
              >
                <span>Order a print</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next artwork"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/10 text-white flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-md"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
