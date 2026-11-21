"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  LightWaveShader,
  LightWaveShaderHandle,
  WaveParams,
} from "./light-wave-shader";

const NARRATIVE_STEPS = [
  {
    eyebrow: "The friction",
    body: "You spend more time stitching tools together than actually making things.",
  },
  {
    eyebrow: "The platform",
    body: "Lumen gives you one shared surface from intent to production.",
  },
  {
    eyebrow: "The outcome",
    body: "You stop managing tools and start compounding output. Every release sharper, every iteration faster, every decision clearer.",
  },
];

const WAVE_PRESETS: WaveParams[] = [
  {
    amp: 0.16,
    freq: 1,
    complexity: 0.85,
    speed: 0.55,
    thickness: 0.07,
    hue: 0.05,
    curve: -0.18,
    warp: 0.1,
    chroma: 0.65,
    bias: 0.04,
  },
  {
    amp: 0.26,
    freq: 0.45,
    complexity: 0.45,
    speed: 0.4,
    thickness: 0.11,
    hue: 0.3,
    curve: 0.22,
    warp: 0.03,
    chroma: 0.9,
    bias: -0.02,
  },
  {
    amp: 0.1,
    freq: 0.32,
    complexity: 0.2,
    speed: 0.22,
    thickness: 0.16,
    hue: 0.65,
    curve: 0.05,
    warp: 0,
    chroma: 0.95,
    bias: 0,
  },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function interpolateParams(
  p1: WaveParams,
  p2: WaveParams,
  t: number
): WaveParams {
  return {
    amp: lerp(p1.amp, p2.amp, t),
    freq: lerp(p1.freq, p2.freq, t),
    complexity: lerp(p1.complexity, p2.complexity, t),
    speed: lerp(p1.speed, p2.speed, t),
    thickness: lerp(p1.thickness, p2.thickness, t),
    hue: lerp(p1.hue, p2.hue, t),
    curve: lerp(p1.curve, p2.curve, t),
    warp: lerp(p1.warp, p2.warp, t),
    chroma: lerp(p1.chroma, p2.chroma, t),
    bias: lerp(p1.bias, p2.bias, t),
  };
}

export function ValuePropSection() {
  const containerRef = useRef<HTMLElement>(null);
  const shaderRef = useRef<LightWaveShaderHandle>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const el = document.documentElement;
    setIsDark(el.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(el.classList.contains("dark"));
    });
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const stepCount = NARRATIVE_STEPS.length;
      const scaled = latest * stepCount;
      const currentIdx = Math.min(Math.floor(scaled), stepCount - 1);
      const subProg = scaled - currentIdx;

      setActiveStepIndex(currentIdx);
      setStepProgress(subProg);

      // Interpolate shader params
      if (shaderRef.current) {
        if (currentIdx < stepCount - 1) {
          const p = interpolateParams(
            WAVE_PRESETS[currentIdx],
            WAVE_PRESETS[currentIdx + 1],
            subProg
          );
          shaderRef.current.setParams(p);
        } else {
          shaderRef.current.setParams(WAVE_PRESETS[currentIdx]);
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const progressBarScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      aria-label="Value proposition"
      className="relative h-[300vh] bg-background text-foreground select-none"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Glowing Ribbon WebGL Canvas */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] z-0">
          <LightWaveShader
            ref={shaderRef}
            dark={isDark}
            initialParams={WAVE_PRESETS[0]}
          />
        </div>

        {/* Top Progress Line */}
        <div className="absolute inset-x-0 top-0 h-px bg-foreground/10 z-10">
          <motion.div
            className="h-full w-full bg-foreground"
            style={{
              scaleX: progressBarScale,
              transformOrigin: "0 0",
            }}
          />
        </div>

        {/* Section Header Bar */}
        <div className="absolute inset-x-0 top-0 z-10 px-10 max-[850px]:px-6 pt-28 max-[850px]:pt-24 max-w-[1680px] mx-auto flex items-end justify-between gap-8">
          <h2 className="max-w-[22ch] text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-[1.15] tracking-tight text-foreground/80">
            A platform built for teams who’d rather ship than orchestrate.
          </h2>

          <a
            href="#product"
            className="group hidden max-[850px]:hidden min-[851px]:inline-flex items-center gap-2 rounded-md border border-foreground/[0.08] px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground hover:border-foreground/[0.16] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Learn more</span>
            <span className="relative overflow-hidden w-4 h-4 inline-flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-4 duration-300" />
              <ArrowRight className="w-3.5 h-3.5 absolute -translate-x-4 transition-transform group-hover:translate-x-0 duration-300" />
            </span>
          </a>
        </div>

        {/* Scrubbed Narrative Steps */}
        <div className="absolute inset-0 z-10 px-10 max-[850px]:px-6 pt-72 max-[850px]:pt-60 pb-16 max-w-[1680px] mx-auto pointer-events-none">
          {NARRATIVE_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const words = step.body.split(" ");
            const wordCount = words.length;

            return (
              <div
                key={step.eyebrow}
                className={`absolute inset-0 px-10 max-[850px]:px-6 pt-72 max-[850px]:pt-60 transition-opacity duration-300 ${
                  isActive ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                }`}
              >
                <div className="grid grid-cols-12 gap-8 max-[850px]:grid-cols-1 max-[850px]:gap-6 max-w-[1680px] mx-auto">
                  {/* Left Column: Number badge + Eyebrow */}
                  <div className="col-span-3 max-[850px]:col-span-1">
                    <span className="inline-flex items-center rounded-md border border-foreground/[0.08] px-3.5 py-1.5 font-mono text-xs tracking-widest text-foreground/70">
                      {String(idx + 1).padStart(2, "0")}
                      <span className="mx-1.5 text-foreground/30">/</span>
                      {String(NARRATIVE_STEPS.length).padStart(2, "0")}
                    </span>
                    <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
                      {step.eyebrow}
                    </p>
                  </div>

                  {/* Right Column: Word-by-word Lighting Headline */}
                  <p className="col-span-9 max-[850px]:col-span-1 text-[clamp(2rem,4.2vw,4rem)] font-medium leading-[1.1] tracking-tight">
                    {words.map((word, wordIdx) => {
                      // Sequential word opacity lighting
                      const threshold = wordIdx / wordCount;
                      const isLit = isActive && stepProgress >= threshold;

                      return (
                        <span key={wordIdx} className="inline-block mr-[0.25em]">
                          <span
                            className="transition-colors duration-200"
                            style={{
                              color: isLit
                                ? "var(--foreground)"
                                : isDark
                                ? "rgba(250, 250, 250, 0.18)"
                                : "rgba(10, 10, 10, 0.20)",
                            }}
                          >
                            {word}
                          </span>
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
