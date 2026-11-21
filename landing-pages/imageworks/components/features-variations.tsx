"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

const MARIGOLD_IMAGE = "/images/marigold.jpg";

interface Variation {
  note: string;
  className: string;
}

const VARIATIONS: Variation[] = [
  { note: "As briefed", className: "filter-none" },
  { note: "Cooler", className: "[filter:hue-rotate(-28deg)_saturate(0.9)]" },
  { note: "Softer", className: "[filter:contrast(0.8)_brightness(1.1)]" },
  { note: "Darker", className: "[filter:brightness(0.7)_contrast(1.08)]" },
  { note: "Muted", className: "[filter:saturate(0.4)]" },
  { note: "Warmer", className: "[filter:sepia(0.45)_saturate(1.25)]" },
  { note: "Punchier", className: "[filter:saturate(1.6)_contrast(1.15)]" },
  { note: "Faded", className: "[filter:contrast(0.8)_brightness(1.18)_saturate(0.7)]" },
  { note: "Mono", className: "[filter:grayscale(1)_contrast(1.08)]" },
  { note: "Brighter", className: "[filter:brightness(1.25)]" },
  { note: "Flatter", className: "[filter:contrast(0.7)_brightness(1.06)]" },
  { note: "Deeper", className: "[filter:saturate(1.2)_brightness(0.82)_contrast(1.1)]" },
];

const RANGE_MERGE = [0.6, 0.9] as const;

function clamp01(val: number): number {
  return val < 0 ? 0 : val > 1 ? 1 : val;
}

function clampNorm(val: number, [min, max]: readonly [number, number]): number {
  return clamp01((val - min) / (max - min));
}

function HeaderTitles({ progress }: { progress: MotionValue<number> }) {
  const opacity1 = useTransform(progress, (v) => 1 - clampNorm(v, [0.5, 0.58]));
  const opacity2 = useTransform(progress, (v) => clampNorm(v, [0.6, 0.7]));
  const titleClass =
    "font-serif text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance";

  return (
    <div className="relative mx-auto max-w-3xl text-center">
      <motion.h2
        id="features-heading"
        style={{ opacity: opacity1 }}
        className={titleClass}
      >
        Ask for twelve, not one.
      </motion.h2>
      <motion.p
        aria-hidden="true"
        style={{ opacity: opacity2 }}
        className={`${titleClass} absolute inset-x-0 top-0 text-foreground`}
      >
        Keep the one you’d pitch.
      </motion.p>
    </div>
  );
}

function HighlightOverlay({
  progress,
  gridRef,
}: {
  progress: MotionValue<number>;
  gridRef: React.RefObject<HTMLDivElement | null>;
}) {
  const opacity = useTransform(progress, (v) => clampNorm(v, [0.82, 0.92]));
  const yOffset = useTransform(opacity, (o) => 10 * (1 - o));
  const cardWidth = useMotionValue("100%");
  const cardHeight = useMotionValue("100%");
  const cardRadius = useMotionValue("0.75rem");

  useEffect(() => {
    const grid = gridRef.current;
    const firstCard = grid?.querySelector("li");
    if (!grid || !firstCard) return;

    const measure = () => {
      const scaleFactor = Math.min(
        grid.clientWidth / firstCard.offsetWidth,
        grid.clientHeight / firstCard.offsetHeight
      );
      cardWidth.set(`${firstCard.offsetWidth * scaleFactor}px`);
      cardHeight.set(`${firstCard.offsetHeight * scaleFactor}px`);
      const fig = firstCard.querySelector("figure");
      if (fig) {
        const radius = parseFloat(getComputedStyle(fig).borderRadius) || 12;
        cardRadius.set(`${radius * scaleFactor}px`);
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    return () => observer.disconnect();
  }, [gridRef, cardWidth, cardHeight, cardRadius]);

  return (
    <motion.div
      style={{
        opacity,
        width: cardWidth,
        height: cardHeight,
        borderRadius: cardRadius,
      }}
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
    >
      <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/65 to-transparent" />
      <motion.p
        style={{ y: yOffset }}
        className="absolute inset-x-0 bottom-0 p-6 font-serif text-[1.5rem] leading-[1.15] tracking-[-0.01em] text-white sm:p-10 sm:text-[2rem]"
      >
        Kept: warmer, as the board suggested.
      </motion.p>
    </motion.div>
  );
}

interface PointerField {
  x: MotionValue<number>;
  y: MotionValue<number>;
  on: MotionValue<number>;
}

function CardItem({
  index,
  progress,
  gridRef,
  field,
}: {
  index: number;
  progress: MotionValue<number>;
  gridRef: React.RefObject<HTMLDivElement | null>;
  field: PointerField;
}) {
  const itemRef = useRef<HTMLLIElement | null>(null);
  const itemData = VARIATIONS[index] ?? { note: "", className: "filter-none" };
  const isWinner = index === 5; // Warmer

  const metrics = useRef({
    dx: 0,
    dy: 0,
    rank: 0,
    fill: 1,
    cx: 0,
    cy: 0,
  });

  const updateSignal = useMotionValue(0);

  // Fanout animation from deck center to grid slot
  const fanout = useTransform([progress, updateSignal], ([p]) => {
    const delay = 0.04 + 0.12 * metrics.current.rank;
    return 1 - Math.pow(1 - clampNorm(p as number, [delay, delay + 0.34]), 5);
  });

  // Zoom / Merge to hero animation for winner
  const merge = useTransform(progress, (p) => {
    const t = clampNorm(p, RANGE_MERGE);
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  });

  const posX = useTransform([fanout, merge, updateSignal], ([fVal, mVal]) => {
    const deltaX = metrics.current.dx;
    return (
      -deltaX * (1 - (fVal as number)) - (isWinner ? deltaX * (mVal as number) : 0)
    );
  });

  const posY = useTransform([fanout, merge, updateSignal], ([fVal, mVal]) => {
    const deltaY = metrics.current.dy;
    return (
      -deltaY * (1 - (fVal as number)) - (isWinner ? deltaY * (mVal as number) : 0)
    );
  });

  const scale = useTransform([fanout, merge, updateSignal], ([fVal, mVal]) => {
    const baseScale = 0.97 + 0.03 * (fVal as number);
    return isWinner
      ? baseScale + (metrics.current.fill - 1) * (mVal as number)
      : baseScale * (1 - 0.06 * (mVal as number));
  });

  const initialFade = useTransform(progress, (p) => clampNorm(p, [0, 0.04]));
  const opacity = useTransform([initialFade, merge], ([init, mVal]) =>
    isWinner ? (init as number) : (init as number) * (1 - (mVal as number))
  );

  // Magnetic hover reaction
  const magneticForce = useTransform(
    [field.x, field.y, field.on, fanout, merge, updateSignal],
    ([fx, fy, fon, fVal, mVal]) => {
      if (isWinner) return 0;
      const dist = Math.hypot(
        metrics.current.cx - (fx as number),
        metrics.current.cy - (fy as number)
      );
      const proximity = 1 - clamp01(dist / 300);
      return (
        proximity *
        proximity *
        (3 - 2 * proximity) *
        (fon as number) *
        (fVal as number) *
        (1 - (mVal as number))
      );
    }
  );

  const cardScale = useTransform(magneticForce, (mf) => 1 + 0.07 * mf);
  const zIndex = useTransform(magneticForce, (mf) =>
    isWinner ? 20 : 12 - index + Math.round(12 * mf)
  );

  useEffect(() => {
    const el = itemRef.current;
    const grid = gridRef.current;
    if (!el || !grid) return;

    const measure = () => {
      const gridW = grid.clientWidth;
      const gridH = grid.clientHeight;
      const centerX = el.offsetLeft + el.offsetWidth / 2;
      const centerY = el.offsetTop + el.offsetHeight / 2;
      const diffX = centerX - gridW / 2;
      const diffY = centerY - gridH / 2;

      metrics.current = {
        dx: diffX,
        dy: diffY,
        cx: centerX,
        cy: centerY,
        rank: Math.hypot(diffX, diffY) / Math.hypot(gridW / 2, gridH / 2),
        fill: Math.min(gridW / el.offsetWidth, gridH / el.offsetHeight),
      };
      updateSignal.set(updateSignal.get() + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    return () => observer.disconnect();
  }, [gridRef, updateSignal]);

  return (
    <motion.li
      ref={itemRef}
      style={{
        x: posX,
        y: posY,
        scale,
        opacity,
        zIndex,
      }}
      className={`relative min-h-0 ${isWinner ? "" : "will-change-transform"}`}
    >
      <motion.div
        style={{ scale: cardScale }}
        className="relative h-full w-full"
      >
        <motion.span
          aria-hidden="true"
          style={{ opacity: magneticForce }}
          className="pointer-events-none absolute inset-0 rounded-xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] dark:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)]"
        />
        <figure className="relative h-full w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={MARIGOLD_IMAGE}
            alt={
              isWinner
                ? `Marigold field in motion, ${itemData.note.toLowerCase()} grade.`
                : ""
            }
            fill
            sizes={
              isWinner ? "100vw" : "(min-width: 1024px) 25vw, 33vw"
            }
            className={`object-cover ${itemData.className}`}
          />
          <figcaption className="sr-only">{itemData.note}</figcaption>
        </figure>
      </motion.div>
    </motion.li>
  );
}

export function FeaturesVariations() {
  const containerRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 32,
    mass: 0.5,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseActive = useMotionValue(0);

  const springField: PointerField = {
    x: useSpring(mouseX, { stiffness: 140, damping: 22, mass: 0.6 }),
    y: useSpring(mouseY, { stiffness: 140, damping: 22, mass: 0.6 }),
    on: useSpring(mouseActive, { stiffness: 90, damping: 24 }),
  };

  if (shouldReduceMotion) {
    return (
      <section
        id="features"
        aria-labelledby="features-heading"
        className="scroll-mt-20 py-24 sm:py-32 select-none"
      >
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
          <h2
            id="features-heading"
            className="mx-auto max-w-3xl text-center font-serif text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.02] tracking-[-0.02em] text-balance"
          >
            Ask for twelve, not one. Keep the one you’d pitch.
          </h2>
          <ul className="mt-12 grid grid-cols-3 gap-3 lg:grid-cols-4">
            {VARIATIONS.map((item, idx) => (
              <li
                key={item.note}
                className={`relative aspect-[4/5] overflow-hidden rounded-xl bg-muted ${
                  idx === 5
                    ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                    : ""
                }`}
              >
                <Image
                  src={MARIGOLD_IMAGE}
                  alt={idx === 5 ? "Marigold field in motion, warmer grade." : ""}
                  fill
                  sizes="25vw"
                  className={`object-cover ${item.className}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section
      id="features"
      ref={containerRef}
      aria-labelledby="features-heading"
      className="relative h-[420svh] scroll-mt-0 select-none"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        {/* Animated Title Header */}
        <div className="mx-auto w-full max-w-[1440px] px-4 pt-28 sm:px-6 sm:pt-32">
          <HeaderTitles progress={smoothProgress} />
        </div>

        {/* 12-Card Dynamic Fanout Grid */}
        <div className="mx-auto min-h-0 w-full max-w-[1440px] flex-1 px-4 pt-10 pb-6 sm:px-6 sm:pt-12 sm:pb-8">
          <div
            ref={gridRef}
            onPointerMove={(e) => {
              if (e.pointerType !== "mouse") return;
              const rect = e.currentTarget.getBoundingClientRect();
              mouseX.set(e.clientX - rect.left);
              mouseY.set(e.clientY - rect.top);
              mouseActive.set(1);
            }}
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              const rect = e.currentTarget.getBoundingClientRect();
              springField.x.jump(e.clientX - rect.left);
              springField.y.jump(e.clientY - rect.top);
            }}
            onPointerLeave={() => mouseActive.set(0)}
            className="relative h-full"
          >
            {/* The Final Kept Card Overlay Caption */}
            <HighlightOverlay progress={smoothProgress} gridRef={gridRef} />

            {/* 12 Cards Grid */}
            <ul className="grid h-full grid-cols-3 grid-rows-4 gap-2.5 sm:gap-3 lg:grid-cols-4 lg:grid-rows-3">
              {VARIATIONS.map((item, idx) => (
                <CardItem
                  key={item.note}
                  index={idx}
                  progress={smoothProgress}
                  gridRef={gridRef}
                  field={springField}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
