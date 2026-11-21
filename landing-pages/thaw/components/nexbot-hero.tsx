"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function NexbotHero() {
  const [isLaunched, setIsLaunched] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "SPLINE_LOADED") {
        console.log("[Parent] Spline loaded with objects:", event.data.objects);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#e3e3e3] text-[#141518] overflow-hidden flex flex-col justify-between select-none">
      {/* Subtle Spatial Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Ultra-Clean Minimalist Navigation Bar */}
      <header className="relative z-30 w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 pt-8 flex items-center justify-between">
        {/* Brand in Distinctive Syne Font */}
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-black tracking-tighter text-[#111215] hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          NEXBOT
        </Link>

        {/* Minimalist Center Navigation */}
        <nav className="hidden md:flex items-center gap-10 lg:gap-14">
          {["Vision", "Specs", "Architecture", "Access"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#555861] hover:text-[#111215] transition-colors font-medium"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Clean Minimalist CTA Button */}
        <div>
          <button
            type="button"
            onClick={() => setIsLaunched(true)}
            className="group inline-flex items-center gap-2 bg-[#141518] hover:bg-black text-[#f4f4f5] px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
          >
            <span>Launch</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </header>

      {/* Center 3D Spline Interactive Scene (Full Unobstructed Viewport) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden pointer-events-auto">
        <div className="relative w-full h-full flex items-center justify-center">
          <iframe
            ref={iframeRef}
            src="/spline/scene.html?v=2"
            frameBorder="0"
            className="w-full h-full border-0 pointer-events-auto"
            title="NEXBOT 3D Character"
            loading="eager"
            allow="accelerometer; gyroscope; magnetometer"
          />

          {/* Mask to Completely Hide the 'Built with Spline' Watermark */}
          <div className="absolute bottom-0 right-0 w-44 h-16 bg-[#e3e3e3] z-20 pointer-events-none" />
        </div>
      </div>

      {/* Discreet Editorial Subtitle (Minimalist & Breathable) */}
      <div className="relative z-20 w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 pointer-events-none mb-auto pt-4 flex items-center justify-between">
        <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#717582]">
          Autonomous Robotic Unit
        </p>
        <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#717582] hidden sm:block">
          Real-Time WebGL 3D
        </p>
      </div>

      {/* Pure, Refined Bottom Controls Bar (Zero Badges, Minimalist) */}
      <div className="relative z-30 w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 pb-8 flex items-end justify-between pointer-events-none">
        {/* Left Discrete Interaction Cue */}
        <div className="text-[11px] font-mono tracking-widest text-[#717582] uppercase pointer-events-auto">
          <span>Click &amp; Drag to Inspect 3D</span>
        </div>

        {/* Right Action Button */}
        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsLaunched(true)}
            className="group inline-flex items-center gap-3 bg-[#111215] hover:bg-black text-white px-7 py-3.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl active:scale-95"
          >
            <span>Experience Unit</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Launch Confirmation Notification */}
      <AnimatePresence>
        {isLaunched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-24 left-1/2 -translate-x-1/2 z-50 bg-[#111215] text-[#f4f4f5] px-7 py-3 rounded-full text-xs font-mono tracking-wider shadow-2xl flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>NEXBOT Interface Engaged</span>
            <button
              type="button"
              onClick={() => setIsLaunched(false)}
              className="ml-3 text-zinc-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
