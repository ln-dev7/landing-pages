"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
} from "motion/react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const DAILY_RENDER_TIMES = [
  44.2, 43.8, 44.1, 43.6, 43.9, 43.3, 43, 42.6, 42.9, 42.2, 41.8, 41.5, 40.9,
  38.4, 35.8, 34.5, 33.9, 33.5, 33.2, 32.8, 32.6, 32.3, 32, 31.8, 31.6, 31.4,
  31.3, 31.1, 31, 31,
];
const Y_TICKS = [30, 35, 40, 45];
const GROWTH_BARS = [210, 260, 300, 380, 430, 520, 640, 760, 900, 1040, 1220, 1400];

const BENCHMARK_COMPARISONS = [
  { name: "Imageworks", seconds: 31, label: "31 s", ours: true },
  { name: "Stock search", seconds: 7200, label: "2 h", ours: false },
  { name: "Retouch a shot", seconds: 172800, label: "2 days", ours: false },
  { name: "Book a shoot", seconds: 1814400, label: "3 weeks", ours: false },
];

const LOG_MIN = Math.log10(10);
const LOG_MAX = Math.log10(5184000); // 60 days
const LOG_TICKS = [
  { seconds: 60, label: "1 min" },
  { seconds: 3600, label: "1 hour" },
  { seconds: 86400, label: "1 day" },
  { seconds: 604800, label: "1 week" },
  { seconds: 2592000, label: "1 month" },
];

function logPosition(seconds: number): number {
  return ((Math.log10(seconds) - LOG_MIN) / (LOG_MAX - LOG_MIN)) * 100;
}

// Monotone cubic spline generator for the 30-day performance curve
function generateSmoothPath(points: [number, number][]): string {
  const len = points.length;
  if (len < 2) return "";
  const dx = points.slice(1).map((pt, i) => pt[0] - (points[i]?.[0] ?? 0));
  const slopes = points
    .slice(1)
    .map((pt, i) => pt[1] - (points[i]?.[1] ?? 0))
    .map((dy, i) => dy / (dx[i] || 1));

  const tangents: number[] = [slopes[0] ?? 0];
  for (let i = 1; i < len - 1; i++) {
    const s0 = slopes[i - 1] ?? 0;
    const s1 = slopes[i] ?? 0;
    tangents.push(s0 * s1 <= 0 ? 0 : (2 * s0 * s1) / (s0 + s1));
  }
  tangents.push(slopes[len - 2] ?? 0);

  let path = `M${points[0]?.[0]} ${points[0]?.[1]}`;
  for (let i = 0; i < len - 1; i++) {
    const [x0, y0] = points[i] ?? [0, 0];
    const [x1, y1] = points[i + 1] ?? [0, 0];
    const span = (x1 - x0) / 3;
    path += ` C${x0 + span} ${y0 + span * (tangents[i] ?? 0)}, ${x1 - span} ${
      y1 - span * (tangents[i + 1] ?? 0)
    }, ${x1} ${y1}`;
  }
  return path;
}

function AnimatedNumber({
  value,
  decimals = 0,
  active,
  className,
}: {
  value: number;
  decimals?: number;
  active: boolean;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active || shouldReduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setCurrent(latest),
    });
    return () => controls.stop();
  }, [active, value, shouldReduceMotion]);

  const display = (shouldReduceMotion ? value : current).toFixed(decimals);

  return (
    <span className={className}>
      <span className="sr-only">{value.toFixed(decimals)}</span>
      <span aria-hidden="true" className="tabular-nums">
        {display}
      </span>
    </span>
  );
}

function RenderTimeAreaChart({ active }: { active: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const isTriggered = active || shouldReduceMotion;
  const count = DAILY_RENDER_TIMES.length;

  const points: [number, number][] = DAILY_RENDER_TIMES.map((time, idx) => [
    (idx / (count - 1)) * 1000,
    1000 - ((time - 28) / 22) * 1000,
  ]);

  const linePath = generateSmoothPath(points);
  const areaPath = `${linePath} L1000 1000 L0 1000 Z`;
  const lastPoint = points[count - 1] ?? [1000, 1000];
  const gradientId = "render-time-gradient-area";

  return (
    <div className="relative h-[240px] sm:h-[300px] lg:h-[340px]">
      {/* Horizontal Y Grid Lines */}
      {Y_TICKS.map((tick) => (
        <div
          key={tick}
          style={{ top: `${(1 - (tick - 28) / 22) * 100}%` }}
          className="absolute inset-x-0 flex items-center gap-3"
        >
          <span className="w-8 text-right text-xs text-muted-foreground tabular-nums">
            {tick}s
          </span>
          <span className="h-px flex-1 bg-foreground/[0.08]" />
        </div>
      ))}

      {/* SVG Curve Container */}
      <div className="absolute inset-y-0 right-0 left-11 text-foreground">
        <svg
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity={0.22} />
              <stop offset="0.55" stopColor="currentColor" stopOpacity={0.06} />
              <stop offset="1" stopColor="currentColor" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <motion.path
            d={areaPath}
            fill={`url(#${gradientId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isTriggered ? 1 : 0 }}
            transition={{
              duration: 1.4,
              delay: shouldReduceMotion ? 0 : 0.5,
            }}
          />

          {/* Line Path */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
            animate={{ pathLength: isTriggered ? 1 : 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </svg>

        {/* Pulse Dot at Today's point */}
        <motion.div
          style={{ top: `${(lastPoint[1] / 1000) * 100}%` }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: isTriggered ? 1 : 0,
            scale: isTriggered ? 1 : 0.6,
          }}
          transition={{
            duration: 0.5,
            delay: shouldReduceMotion ? 0 : 1.8,
          }}
          className="absolute left-full -translate-x-1/2 -translate-y-1/2"
        >
          <span className="relative block h-3 w-3 rounded-full bg-foreground ring-[3px] ring-muted">
            <span className="absolute inset-0 rounded-full bg-foreground/40 motion-safe:animate-ping" />
          </span>
        </motion.div>
      </div>

      {/* X Labels */}
      <div className="absolute inset-x-0 -bottom-7 flex justify-between pl-11 text-xs text-muted-foreground">
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}

function VolumeBars({ active }: { active: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const isTriggered = active || shouldReduceMotion;
  const maxVal = Math.max(...GROWTH_BARS);

  return (
    <div className="flex h-16 items-end gap-1.5" aria-hidden="true">
      {GROWTH_BARS.map((val, idx) => (
        <motion.span
          key={idx}
          style={{ height: `${(val / maxVal) * 100}%` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isTriggered ? 1 : 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: shouldReduceMotion ? 0 : 0.04 * idx,
          }}
          className={`flex-1 origin-bottom rounded-[2px] ${
            idx === GROWTH_BARS.length - 1
              ? "bg-foreground"
              : "bg-foreground/[0.16]"
          }`}
        />
      ))}
    </div>
  );
}

function FirstTakeRadialGauge({ active }: { active: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const circumference = 2 * Math.PI * 28;

  return (
    <svg
      viewBox="0 0 64 64"
      className="h-16 w-16 -rotate-90 shrink-0"
      aria-hidden="true"
    >
      <circle
        cx={32}
        cy={32}
        r={28}
        fill="none"
        strokeWidth={5}
        className="stroke-foreground/[0.12]"
      />
      <motion.circle
        cx={32}
        cy={32}
        r={28}
        fill="none"
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={circumference}
        className="stroke-foreground"
        initial={{ strokeDashoffset: circumference }}
        animate={{
          strokeDashoffset:
            active || shouldReduceMotion ? 0.38 * circumference : circumference,
        }}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
    </svg>
  );
}

function BrandRulesMatrix({ active }: { active: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const isTriggered = active || shouldReduceMotion;

  return (
    <div
      className="grid h-16 w-16 grid-cols-10 gap-[3px] shrink-0"
      aria-hidden="true"
    >
      {Array.from({ length: 100 }, (_, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTriggered ? 1 : 0 }}
          transition={{
            duration: 0.3,
            delay: shouldReduceMotion ? 0 : 0.008 * idx,
          }}
          className={`rounded-full ${
            idx === 37 ? "bg-foreground/[0.18]" : "bg-foreground"
          }`}
        />
      ))}
    </div>
  );
}

function ComparisonLogScale({ active }: { active: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const isTriggered = active || shouldReduceMotion;

  return (
    <div className="relative mt-36 mb-14 hidden h-px bg-border md:block">
      {/* Ticks on scale */}
      {LOG_TICKS.map((tick) => (
        <div
          key={tick.label}
          style={{ left: `${logPosition(tick.seconds)}%` }}
          className="absolute top-0 -translate-x-1/2"
        >
          <span className="block h-2 w-px bg-border" />
          <span className="mt-2 block text-xs whitespace-nowrap text-muted-foreground">
            {tick.label}
          </span>
        </div>
      ))}

      {/* Markers */}
      {BENCHMARK_COMPARISONS.map((item, idx) => (
        <motion.div
          key={item.name}
          style={{ left: `${logPosition(item.seconds)}%` }}
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: isTriggered ? 1 : 0,
            y: isTriggered ? 0 : 8,
          }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: shouldReduceMotion ? 0 : 0.2 + 0.12 * idx,
          }}
          className="absolute bottom-0 -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <span
              className={`font-serif whitespace-nowrap ${
                item.ours
                  ? "text-[2rem] leading-none text-foreground font-semibold"
                  : "text-[1.25rem] leading-none text-muted-foreground"
              }`}
            >
              {item.label}
            </span>
            <span
              className={`mt-1.5 text-xs whitespace-nowrap ${
                item.ours ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </span>
            <span className="mt-3 h-6 w-px bg-border" />
            <span
              className={`-mb-[5px] block h-[11px] w-[11px] rounded-full ring-4 ring-muted ${
                item.ours
                  ? "bg-foreground"
                  : "border border-foreground/50 bg-muted"
              }`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function BenchmarksSection() {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLUListElement | null>(null);
  const compareRef = useRef<HTMLDivElement | null>(null);

  const isChartInView = useInView(chartRef, { once: true, margin: "-15% 0px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-15% 0px" });
  const isCompareInView = useInView(compareRef, { once: true, margin: "-15% 0px" });

  return (
    <section
      id="benchmarks"
      aria-labelledby="benchmarks-heading"
      className="scroll-mt-20 py-24 sm:py-32 select-none"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        {/* Section Heading */}
        <SectionHeading
          id="benchmarks-heading"
          title="Faster than the shoot you would have booked."
          description="Measured across every render on the standard queue last month. No cherry-picked jobs, no priority lane."
        />

        {/* 1. Median Render Time Top Box */}
        <Reveal inView y={24} className="mt-12 lg:mt-14">
          <div
            ref={chartRef}
            className="grid gap-10 rounded-2xl border border-border bg-muted p-6 sm:p-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16 lg:p-10"
          >
            <div className="flex flex-col justify-between">
              <div>
                <p className="font-serif text-[5rem] leading-[0.9] tracking-[-0.03em] sm:text-[6.5rem]">
                  <AnimatedNumber value={31} active={isChartInView} />
                  <span className="text-[0.5em] text-muted-foreground ml-1">
                    s
                  </span>
                </p>
                <h3 className="mt-6 text-lg font-medium text-foreground">
                  Median time to a first render
                </h3>
                <p className="mt-2 max-w-sm text-[15px] leading-7 text-muted-foreground">
                  From pressing render to a full-resolution image on screen,
                  every day of the last thirty. The drop mid-month is the
                  current model generation arriving.
                </p>
              </div>
            </div>
            <div className="pb-8">
              <RenderTimeAreaChart active={isChartInView} />
            </div>
          </div>
        </Reveal>

        {/* 2. Middle 3-Card Metrics Row */}
        <Reveal inView y={24} delay={0.05} className="mt-4 md:mt-5">
          <ul
            ref={statsRef}
            className="grid grid-cols-1 divide-y divide-border rounded-2xl border border-border bg-background md:grid-cols-3 md:divide-x md:divide-y-0"
          >
            {/* Stat 1: Images rendered */}
            <li className="flex items-end justify-between gap-6 p-6 sm:p-8">
              <div>
                <p className="font-serif text-[3rem] leading-none tracking-[-0.02em]">
                  <AnimatedNumber
                    value={1.4}
                    decimals={1}
                    active={isStatsInView}
                  />
                  <span className="text-[0.55em] text-muted-foreground ml-1">
                    M
                  </span>
                </p>
                <p className="mt-3 text-[15px] text-muted-foreground">
                  Images rendered last month
                </p>
              </div>
              <div className="w-32 shrink-0 sm:w-40">
                <VolumeBars active={isStatsInView} />
              </div>
            </li>

            {/* Stat 2: Approved on first take */}
            <li className="flex items-end justify-between gap-6 p-6 sm:p-8">
              <div>
                <p className="font-serif text-[3rem] leading-none tracking-[-0.02em]">
                  <AnimatedNumber value={62} active={isStatsInView} />
                  <span className="text-[0.55em] text-muted-foreground ml-1">
                    %
                  </span>
                </p>
                <p className="mt-3 text-[15px] text-muted-foreground">
                  Approved on the first take
                </p>
              </div>
              <FirstTakeRadialGauge active={isStatsInView} />
            </li>

            {/* Stat 3: Brand rules held */}
            <li className="flex items-end justify-between gap-6 p-6 sm:p-8">
              <div>
                <p className="font-serif text-[3rem] leading-none tracking-[-0.02em]">
                  <AnimatedNumber
                    value={99.2}
                    decimals={1}
                    active={isStatsInView}
                  />
                  <span className="text-[0.55em] text-muted-foreground ml-1">
                    %
                  </span>
                </p>
                <p className="mt-3 text-[15px] text-muted-foreground">
                  Brand rules held without a fix
                </p>
              </div>
              <BrandRulesMatrix active={isStatsInView} />
            </li>
          </ul>
        </Reveal>

        {/* 3. Bottom Comparison Box ("Brief to approved image") */}
        <Reveal inView y={24} delay={0.05} className="mt-4 md:mt-5">
          <div
            ref={compareRef}
            className="rounded-2xl border border-border bg-muted p-6 sm:p-8 lg:p-10"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h3 className="font-serif text-[2rem] leading-[1.05] tracking-[-0.02em]">
                Brief to approved image.
              </h3>
              <p className="max-w-md text-[15px] leading-7 text-muted-foreground">
                The four ways a team gets a picture, timed end to end on the
                same campaign brief. Log scale, so the whole story fits on one
                line.
              </p>
            </div>

            {/* Desktop Log Scale Line */}
            <ComparisonLogScale active={isCompareInView} />

            {/* Mobile Fallback List */}
            <ul className="mt-8 divide-y divide-border md:hidden">
              {BENCHMARK_COMPARISONS.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between py-3"
                >
                  <span
                    className={
                      item.ours ? "text-foreground font-medium" : "text-muted-foreground"
                    }
                  >
                    {item.name}
                  </span>
                  <span
                    className={`font-serif text-xl ${
                      item.ours ? "text-foreground font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
