"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { NexbotFAQ } from "@/components/nexbot-faq";
import { NexbotFooter } from "@/components/nexbot-footer";

const SPEC_TITLES = [
  "CORTEX COMPUTE",
  "BIOMIMETIC CHASSIS",
  "SOLID-STATE CORE",
  "TACTILE DEXTERITY",
];

export function NexbotShowcase() {
  const [activeSpecIndex, setActiveSpecIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const showcaseScrollRef = useRef<HTMLDivElement>(null);

  // Motion scroll progress across the showcase track
  const { scrollYProgress } = useScroll({
    target: showcaseScrollRef,
    offset: ["start start", "end end"],
  });

  // Smooth camera orbit rotation:
  // Phase 1 (0 to 0.55): Turns 360° across 4 specs angles
  // Phase 2 (0.55 to 1.0): Settles at a regal 3/4 standing angle (~340°)
  const smoothRotation = useSpring(
    useTransform(
      scrollYProgress,
      [0.05, 0.16, 0.28, 0.42, 0.55, 0.70, 1.0],
      [0, Math.PI * 0.5, Math.PI, Math.PI * 1.5, Math.PI * 1.9, Math.PI * 1.9, Math.PI * 1.9]
    ),
    { stiffness: 55, damping: 20, mass: 0.8 }
  );

  // Camera distance:
  // Phase 1 (0 to 0.55): 360 (close-up detail)
  // Phase 2 (0.55 to 0.95): Pulls back progressively from 360 to 580 (full-body shot)
  const smoothCamDist = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.55, 0.70, 0.82, 0.95],
      [360, 360, 430, 500, 580]
    ),
    { stiffness: 45, damping: 22, mass: 0.9 }
  );

  // Camera vertical center:
  // Phase 1: 244 (bust level)
  // Phase 2: Progressively lowers from 244 to 145 (perfect vertical center from head to feet)
  const smoothOffsetY = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.55, 0.70, 0.82, 0.95],
      [244, 244, 210, 180, 145]
    ),
    { stiffness: 45, damping: 22, mass: 0.9 }
  );

  // Horizontal translation of 3D model:
  // Centered during specs (0%), then glides to the right (+26% on desktop) during full-body section
  const modelTranslateX = useTransform(
    scrollYProgress,
    [0, 0.55, 0.65, 1],
    ["0%", "0%", "26%", "26%"]
  );

  // Send real-time parameters to the Spline iframe
  useEffect(() => {
    let lastRot = 0;
    let lastDist = 360;
    let lastOffset = 244;

    const unsubs = [
      smoothRotation.on("change", (rot) => {
        lastRot = rot;
        iframeRef.current?.contentWindow?.postMessage(
          { type: "UPDATE_ROTATION", rotationY: lastRot, cameraDist: lastDist, offsetY: lastOffset },
          "*"
        );
      }),
      smoothCamDist.on("change", (dist) => {
        lastDist = dist;
        iframeRef.current?.contentWindow?.postMessage(
          { type: "UPDATE_ROTATION", rotationY: lastRot, cameraDist: lastDist, offsetY: lastOffset },
          "*"
        );
      }),
      smoothOffsetY.on("change", (off) => {
        lastOffset = off;
        iframeRef.current?.contentWindow?.postMessage(
          { type: "UPDATE_ROTATION", rotationY: lastRot, cameraDist: lastDist, offsetY: lastOffset },
          "*"
        );
      }),
    ];

    return () => unsubs.forEach((u) => u());
  }, [smoothRotation, smoothCamDist, smoothOffsetY]);

  // Track active spec index for Phase 1
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (p) => {
      if (p < 0.14) {
        setActiveSpecIndex(0);
      } else if (p < 0.28) {
        setActiveSpecIndex(1);
      } else if (p < 0.42) {
        setActiveSpecIndex(2);
      } else {
        setActiveSpecIndex(3);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Phase 1 specs overlay opacity (fades out completely when Phase 2 starts)
  const specsOverlayOpacity = useTransform(scrollYProgress, [0.48, 0.54], [1, 0]);

  // Phase 2 Progressive Titles Animation (Strictly "au fur et à mesure" as you scroll):
  // Title 1: RESERVE SERIES 01. (0.58 -> 0.68)
  const title1Opacity = useTransform(scrollYProgress, [0.56, 0.64], [0, 1]);
  const title1Y = useTransform(scrollYProgress, [0.56, 0.64], [40, 0]);

  // Title 2: DEPLOY INTELLIGENCE. (0.69 -> 0.77)
  const title2Opacity = useTransform(scrollYProgress, [0.68, 0.76], [0, 1]);
  const title2Y = useTransform(scrollYProgress, [0.68, 0.76], [40, 0]);

  // Title 3: PHYSICAL REALITY. (0.80 -> 0.88)
  const title3Opacity = useTransform(scrollYProgress, [0.80, 0.88], [0, 1]);
  const title3Y = useTransform(scrollYProgress, [0.80, 0.88], [40, 0]);

  // Single Button: Request Allocation (0.87 -> 0.94)
  const buttonOpacity = useTransform(scrollYProgress, [0.87, 0.94], [0, 1]);
  const buttonY = useTransform(scrollYProgress, [0.87, 0.94], [30, 0]);

  return (
    <div className="relative w-full bg-[#e3e3e3] text-[#141518] selection:bg-[#141518] selection:text-[#f4f4f5]">
      {/* Subtle Spatial Coordinate Grid Lines */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Hero Section with Non-Fixed (Absolute) Navbar that scrolls away */}
      <section className="relative w-full h-screen flex flex-col justify-between overflow-hidden select-none">
        {/* Absolute Navigation Bar (Scrolls away with the hero) */}
        <header className="relative z-30 w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 pt-8 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-black tracking-tighter text-[#111215] hover:opacity-80 transition-opacity"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            NEXBOT
          </Link>

          <nav className="hidden md:flex items-center gap-10 lg:gap-14">
            {["Vision", "Specs", "Architecture", "Access", "FAQ"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-mono uppercase tracking-[0.2em] text-[#555861] hover:text-[#111215] transition-colors font-medium"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div>
            <Link
              href="#specs"
              className="group inline-flex items-center gap-2 bg-[#141518] hover:bg-black text-[#f4f4f5] px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </header>

        {/* Hero Bottom Subtle Cue */}
        <div className="relative z-20 w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 pb-10 flex items-end justify-between pointer-events-none">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#717582]">
            <span>Scroll to rotate &amp; inspect</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Main 3D Scroll Showcase Track (Specs 360° + Full-Body Progressive Titles) */}
      <section
        id="specs"
        ref={showcaseScrollRef}
        className="relative w-full h-[600vh] -mt-[100vh]"
      >
        {/* Sticky 3D Viewport Layer */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* 3D Spline Scene (Transforms dynamically on desktop) */}
          <motion.div
            style={{ x: modelTranslateX }}
            className="relative w-full h-full flex items-center justify-center pointer-events-auto transition-transform duration-300"
          >
            <iframe
              ref={iframeRef}
              src="/spline/scene.html?v=20"
              frameBorder="0"
              className="w-full h-full border-0 pointer-events-auto"
              title="NEXBOT 3D Character"
              loading="eager"
              allow="accelerometer; gyroscope; magnetometer"
            />

            {/* Permanent Safety Mask for Spline Watermark */}
            <div className="absolute bottom-0 right-0 w-44 h-16 bg-[#e3e3e3] z-20 pointer-events-none" />
          </motion.div>

          {/* Phase 1: Floating Specs Titles (Steps 0 to 3, fades out before Phase 2) */}
          <motion.div
            style={{ opacity: specsOverlayOpacity }}
            className="absolute inset-0 pointer-events-none flex items-end justify-start max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 pb-20 z-20"
          >
            <h2
              key={`spec-title-${activeSpecIndex}`}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white drop-shadow-[0_3px_20px_rgba(0,0,0,0.14)] leading-[0.92] uppercase select-none"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {SPEC_TITLES[activeSpecIndex]}
            </h2>
          </motion.div>

          {/* Phase 2: Progressive Titles Revealed "Au Fur et à Mesure" on the Left */}
          <div className="absolute inset-0 pointer-events-none flex items-center max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 z-30">
            <div className="w-full lg:max-w-2xl pointer-events-auto space-y-8">
              {/* Stack of Grand Titles that appear step-by-step as you scroll */}
              <div className="space-y-4 sm:space-y-6">
                {/* 1. RESERVE SERIES 01. (Appears first at 0.56) */}
                <motion.div style={{ opacity: title1Opacity, y: title1Y }}>
                  <h2
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-[0_3px_20px_rgba(0,0,0,0.14)] leading-[0.92] uppercase"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    RESERVE SERIES 01.
                  </h2>
                </motion.div>

                {/* 2. DEPLOY INTELLIGENCE. (Appears second at 0.68) */}
                <motion.div style={{ opacity: title2Opacity, y: title2Y }}>
                  <h2
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#888c9a] leading-[0.92] uppercase"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    DEPLOY INTELLIGENCE.
                  </h2>
                </motion.div>

                {/* 3. PHYSICAL REALITY. (Appears third at 0.80) */}
                <motion.div style={{ opacity: title3Opacity, y: title3Y }}>
                  <h2
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-[0_3px_20px_rgba(0,0,0,0.14)] leading-[0.92] uppercase"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    PHYSICAL REALITY.
                  </h2>
                </motion.div>
              </div>

              {/* Single Clean Action Button (Appears as the full body is fully revealed at 0.87) */}
              <motion.div style={{ opacity: buttonOpacity, y: buttonY }} className="pt-2">
                <Link
                  href="mailto:contact@nexbot.ai?subject=NEXBOT%20Series%2001%20Allocation%20Request"
                  className="group inline-flex items-center justify-center gap-3 bg-[#111215] hover:bg-black text-white px-9 py-4 rounded-full text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-200 cursor-pointer shadow-xl active:scale-95"
                >
                  <span>Request Allocation</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <NexbotFAQ />

      {/* Framer-Style Monumental Footer */}
      <NexbotFooter />
    </div>
  );
}
