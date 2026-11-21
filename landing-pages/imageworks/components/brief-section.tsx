"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

const BRIEF_TEXT =
  "“Launch hero. One glass form, lit soft, floating. Keep the left third quiet for a headline. Colours from the board, nothing neon.”";
const WORDS = BRIEF_TEXT.split(" ");
const BRIEF_PHOTO = "/images/brief-hero.jpg";

const RANGE_SCALE = [0.32, 0.86] as const;
const RANGE_TEXT_FADE = [0.4, 0.58] as const;
const RANGE_CAPTION = [0.84, 0.96] as const;

function clampNorm(val: number, [min, max]: readonly [number, number]): number {
  const norm = (val - min) / (max - min);
  return norm < 0 ? 0 : norm > 1 ? 1 : norm;
}

function Word({
  text,
  progress,
  index,
}: {
  text: string;
  progress: MotionValue<number>;
  index: number;
}) {
  const total = WORDS.length;
  const start = (index / total) * 0.28;
  const end = Math.min(0.28, ((index + 3) / total) * 0.28);
  const opacity = useTransform(
    progress,
    (v) => 0.14 + 0.86 * clampNorm(v, [start, end])
  );

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {text}&nbsp;
    </motion.span>
  );
}

function ExpandingCard({ progress }: { progress: MotionValue<number> }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const initialScale = useMotionValue(0.14);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const calculateInitialScale = () => {
      initialScale.set(
        Math.min(
          0.6,
          Math.max(0.1, Math.min(200 / el.offsetWidth, 160 / el.offsetHeight))
        )
      );
    };
    calculateInitialScale();
    const observer = new ResizeObserver(calculateInitialScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, [initialScale]);

  // Smooth easing for expansion
  const scaleCurve = useTransform(progress, (v) => {
    const t = clampNorm(v, RANGE_SCALE);
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  });

  const scale = useTransform(
    [scaleCurve, initialScale],
    ([sc, is]) => (is as number) + (1 - (is as number)) * (sc as number)
  );

  const borderRadius = useTransform(scale, (s) => `${16 / (s as number)}px`);
  const cardOpacity = useTransform(progress, (v) => clampNorm(v, [0.02, 0.14]));
  const captionOpacity = useTransform(progress, (v) =>
    clampNorm(v, RANGE_CAPTION)
  );
  const captionY = useTransform(captionOpacity, (co) => 12 * (1 - co));

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        borderRadius,
        opacity: cardOpacity,
      }}
      className="absolute inset-3 overflow-hidden bg-muted will-change-transform sm:inset-4 shadow-2xl"
    >
      <Image
        src={BRIEF_PHOTO}
        alt="White anemones streaked across a dark green field during a long exposure."
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <motion.span
        aria-hidden="true"
        style={{ opacity: captionOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent"
      />
      <motion.div
        style={{ opacity: captionOpacity, y: captionY }}
        className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10"
      >
        <p className="max-w-md font-serif text-[1.5rem] leading-[1.15] tracking-[-0.01em] text-balance sm:text-[2rem]">
          First take. Thirty-one seconds.
        </p>
      </motion.div>
    </motion.div>
  );
}

export function BriefSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(
    scrollYProgress,
    (v) => 1 - clampNorm(v, RANGE_TEXT_FADE)
  );
  const textClass =
    "mx-auto max-w-3xl text-center font-serif text-[clamp(1.75rem,3.3vw,2.75rem)] leading-[1.15] tracking-[-0.015em] text-balance text-foreground";

  if (shouldReduceMotion) {
    return (
      <section aria-label="The brief" className="py-24 sm:py-32 select-none">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
          <p className={textClass}>{BRIEF_TEXT}</p>
          <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
            <Image
              src={BRIEF_PHOTO}
              alt="White anemones streaked across a dark green field during a long exposure."
              fill
              sizes="100vw"
              className="object-cover"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
              <p className="max-w-md font-serif text-[1.5rem] leading-[1.15] tracking-[-0.01em] text-balance sm:text-[2rem]">
                First take. Thirty-one seconds.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      aria-label="The brief"
      className="relative h-[320svh] select-none"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Pinned text highlighting each word on scroll */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="mx-auto max-w-[1440px] px-4 pt-28 sm:px-6 sm:pt-32"
        >
          <p className="sr-only">{BRIEF_TEXT}</p>
          <p aria-hidden="true" className={textClass}>
            {WORDS.map((word, idx) => (
              <Word
                key={idx}
                text={word}
                progress={scrollYProgress}
                index={idx}
              />
            ))}
          </p>
        </motion.div>

        {/* Cinematic Card that scales to full viewport */}
        <ExpandingCard progress={scrollYProgress} />
      </div>
    </section>
  );
}
