"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "motion/react";

export function ThawHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [selectedRange, setSelectedRange] = useState<"ALL" | "THIS">("THIS");
  const [activeCheckinBar, setActiveCheckinBar] = useState<number>(4);
  const [isSessionStarted, setIsSessionStarted] = useState(false);

  const totalFrames = 60;

  // Preload all 60 pristine 1688x1140 HD rotation frames
  useEffect(() => {
    const loadedList: HTMLImageElement[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const img = new window.Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/thaw-rot/frame_${frameNum}.webp`;

      img.onload = () => {
        // Draw frame 0 immediately once ready
        if (i === 0 && canvasRef.current) {
          drawFrame(img);
        }
      };

      loadedList.push(img);
    }

    setImages(loadedList);
  }, []);

  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // Set up scroll tracking over the 260vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate current rotation frame on scroll
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!hasScrolled && progress > 0.01) {
      setHasScrolled(true);
    }

    const frameIdx = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(progress * (totalFrames - 1)))
    );

    setCurrentFrame(frameIdx);

    if (images[frameIdx] && images[frameIdx].complete) {
      drawFrame(images[frameIdx]);
    }
  });

  const handleStartSession = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSessionStarted(true);
    setTimeout(() => {
      setIsSessionStarted(false);
    }, 4500);
  };

  const rotationDegrees = Math.round((currentFrame / (totalFrames - 1)) * 360);

  return (
    <div ref={containerRef} className="relative w-full h-[260vh] bg-[#171412]">
      {/* Sticky Hero Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#171412] select-none">
        {/* Ambient Warm Radial Spotlight */}
        <div className="absolute inset-0 pointer-events-none bg-radial from-[#382b20]/50 via-transparent to-transparent" />

        {/* Centerpiece 3D Interactive Canvas Container (Pristine 1688x1140 Resolution) */}
        <div className="relative w-full h-[calc(100vh-38px)] max-w-[1720px] 2xl:max-w-[1920px] flex items-center justify-center px-2 sm:px-6">
          <div className="relative w-full aspect-[1688/1140] max-h-[calc(100vh-42px)] flex items-center justify-center">
            {/* 60fps Hardware-Accelerated High-Definition Rotation Canvas */}
            <canvas
              ref={canvasRef}
              width={1688}
              height={1140}
              className="w-full h-full object-contain filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] brightness-[1.02] contrast-[1.03]"
            />

            {/* Interactive Overlay Layer (Clickable hotspots directly aligned) */}
            <div className="absolute inset-0 z-40 pointer-events-none">
              {/* Top Navbar Click Targets */}
              <div className="absolute top-[2%] left-[2%] right-[2%] h-[8%] flex items-center justify-between pointer-events-auto">
                <Link
                  href="/"
                  className="w-[12%] h-full rounded-full cursor-pointer hover:bg-white/5 transition-colors"
                  title="THAW"
                />
                <div className="hidden md:flex items-center gap-6 h-full">
                  <Link
                    href="#approach"
                    className="px-4 py-2 rounded-md hover:bg-white/10 text-xs font-mono tracking-widest text-transparent hover:text-white transition-colors cursor-pointer"
                  >
                    APPROACH
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="px-4 py-2 rounded-md hover:bg-white/10 text-xs font-mono tracking-widest text-transparent hover:text-white transition-colors cursor-pointer"
                  >
                    HOW IT WORKS
                  </Link>
                  <Link
                    href="#science"
                    className="px-4 py-2 rounded-md hover:bg-white/10 text-xs font-mono tracking-widest text-transparent hover:text-white transition-colors cursor-pointer"
                  >
                    SCIENCE
                  </Link>
                </div>
                <Link
                  href="#assessment"
                  className="px-5 py-2.5 rounded-full hover:bg-white/10 text-xs font-mono tracking-wider text-transparent hover:text-white transition-colors cursor-pointer"
                >
                  BEGIN ASSESSMENT
                </Link>
              </div>

              {/* PRIMARY CTA BUTTON: Start First Session (Precision aligned to coordinates) */}
              <div
                style={{
                  left: "72.4%",
                  top: "86.8%",
                  width: "18.3%",
                  height: "7.2%",
                }}
                className="absolute pointer-events-auto z-50 flex items-center justify-center"
              >
                <button
                  type="button"
                  onClick={handleStartSession}
                  className="w-full h-full rounded-md flex items-center justify-between px-4 sm:px-6 cursor-pointer bg-[#b5c7d5]/15 hover:bg-[#b5c7d5]/30 active:bg-[#b5c7d5]/50 border border-[#b5c7d5]/40 hover:border-[#b5c7d5] transition-all duration-150 group shadow-lg active:scale-[0.98]"
                  title="Start First Session"
                >
                  <span className="sr-only">Start First Session</span>
                  <div className="w-full h-full flex items-center justify-end pr-1 sm:pr-2">
                    <div className="w-8 h-8 rounded-sm bg-[#171412]/80 group-hover:bg-[#171412] flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </button>
              </div>

              {/* Bottom Right Equalizer Clickable Bars Hotspot */}
              <div
                style={{
                  left: "72.5%",
                  top: "67.5%",
                  width: "18%",
                  height: "14%",
                }}
                className="absolute flex items-end justify-between pointer-events-auto cursor-pointer"
              >
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveCheckinBar(idx)}
                    className="w-4 h-full hover:bg-white/15 rounded-xs transition-colors"
                    title={`Check-in Hour ${10 + idx * 2}:00`}
                  />
                ))}
              </div>

              {/* Bottom Left Toggle Hotspot */}
              <div
                style={{
                  left: "9%",
                  top: "40.5%",
                  width: "18.5%",
                  height: "3.5%",
                }}
                className="absolute flex items-center justify-between pointer-events-auto"
              >
                <button
                  type="button"
                  onClick={() => setSelectedRange("ALL")}
                  className="w-1/2 h-full cursor-pointer hover:bg-white/10 rounded-xs transition-colors"
                  title="All Weeks"
                />
                <button
                  type="button"
                  onClick={() => setSelectedRange("THIS")}
                  className="w-1/2 h-full cursor-pointer hover:bg-white/10 rounded-xs transition-colors"
                  title="This Week"
                />
              </div>
            </div>

            {/* Live 3D Rotation Telemetry Indicator (No bullet point) */}
            <div className="absolute bottom-3 left-4 sm:left-8 z-30 pointer-events-none flex items-center gap-2.5 font-mono text-[11px] text-white/50 bg-[#171412]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <span className="text-white font-medium tracking-wider">3D ROTATION</span>
              <span className="text-[#e2dacb] font-semibold">{rotationDegrees}°</span>
              <span className="text-white/20">/</span>
              <span>FRAME {currentFrame + 1}/60</span>
            </div>

            {/* Scroll Direction Guide (Fades out once user scrolls) */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: hasScrolled ? 0 : 1 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-3 right-4 sm:right-8 z-30 pointer-events-none flex items-center gap-2 font-mono text-[11px] tracking-wider text-white/60 bg-[#171412]/85 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10"
            >
              <span>SCROLL TO ROTATE</span>
              <span className="animate-bounce">↓</span>
            </motion.div>

            {/* Session Started Feedback HUD Banner */}
            <AnimatePresence>
              {isSessionStarted && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#221d19]/95 border border-[#b5c7d5]/60 px-6 py-3.5 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl flex items-center gap-3.5 text-xs font-mono text-[#eae6e1]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#b5c7d5] text-[#171412] flex items-center justify-center font-bold">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-white block">First Session Initialized</span>
                    <span className="text-white/50 text-[10px]">
                      Biometric regulation &amp; telemetry monitoring active
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
