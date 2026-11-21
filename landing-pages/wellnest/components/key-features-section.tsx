"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ChevronRight, Moon, Wind, Activity, TrendingUp, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface KeyFeaturesSectionProps {
  moodTrackingImage?: string;
  stressSupportImage?: string;
}

export function KeyFeaturesSection({
  moodTrackingImage,
  stressSupportImage,
}: KeyFeaturesSectionProps) {
  const [activeTab, setActiveTab] = useState("Daily");
  const tabs = ["Daily", "Weekly", "Monthly", "Yearly", "All"];

  return (
    <section id="features" className="w-full bg-[#fbfdfb] py-20 sm:py-28 lg:py-32 text-[#0d1711] scroll-mt-6">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Sticky Intro */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-xs font-normal text-[#4a584f] mb-6">
              <Activity className="w-3.5 h-3.5 text-[#4a584f]" />
              <span>Key Features</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-normal tracking-tight text-[#0d1711] leading-[1.12] mb-5 sm:mb-6">
              Emotional wellness <br />
              supported daily.
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#55635b] font-light leading-relaxed max-w-md">
              Early treatment and support improve outcomes for mental health
              conditions.
            </p>
          </div>

          {/* Right Column — Staggered Feature Cards Stack */}
          <div className="lg:col-span-7 space-y-20 sm:space-y-28">
            {/* Feature 1 — Mood Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Illustration Showcase Card */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#7fa292] via-[#5c8273] to-[#3a584a] shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex items-center justify-center p-5 sm:p-8">
                {moodTrackingImage ? (
                  <Image
                    src={moodTrackingImage}
                    alt="Mood tracking background"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <>
                    {/* Atmospheric Lighting */}
                    <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-black/30 pointer-events-none" />
                    <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-[#d7f943]/20 blur-3xl pointer-events-none" />
                  </>
                )}

                {/* Floating Glass HUD Card */}
                <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] rounded-[24px] p-5 sm:p-6 bg-[#0e1713]/85 backdrop-blur-xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.45)] text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="block text-[11px] font-light text-white/60 uppercase tracking-wider">
                        Health Record
                      </span>
                      <h4 className="text-base sm:text-lg font-medium text-white tracking-tight">
                        Overview
                      </h4>
                    </div>
                    <span className="text-[10px] text-white/45 font-light">
                      Showing data from 5:25 PM
                    </span>
                  </div>

                  {/* Luminous Line Graph */}
                  <div className="relative w-full h-28 my-3">
                    <svg
                      viewBox="0 0 320 100"
                      className="w-full h-full overflow-visible"
                      fill="none"
                    >
                      {/* Drop glow filter */}
                      <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="3" result="glow" />
                          <feComposite in="SourceGraphic" in2="glow" operator="over" />
                        </filter>
                      </defs>

                      {/* Vertical guide lines */}
                      <line
                        x1="120"
                        y1="10"
                        x2="120"
                        y2="85"
                        stroke="rgba(255,255,255,0.15)"
                        strokeDasharray="3 3"
                      />
                      <line
                        x1="240"
                        y1="5"
                        x2="240"
                        y2="85"
                        stroke="rgba(255,255,255,0.15)"
                        strokeDasharray="3 3"
                      />

                      {/* Smooth trend curve */}
                      <path
                        d="M 10 75 Q 65 60 120 45 T 180 50 T 240 25 T 310 15"
                        stroke="#d7f943"
                        strokeWidth="3"
                        strokeLinecap="round"
                        filter="url(#glow)"
                      />

                      {/* Active points */}
                      <circle cx="120" cy="45" r="5" fill="#d7f943" stroke="#0e1713" strokeWidth="2" />
                      <circle cx="240" cy="25" r="5" fill="#d7f943" stroke="#0e1713" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center justify-between gap-1 pt-2 border-t border-white/10">
                    {tabs.map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                          activeTab === tab
                            ? "bg-[#d7f943] text-[#0e1713] font-medium shadow-sm"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text & Checklist */}
              <div className="space-y-4 max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-normal text-[#0d1711] tracking-tight">
                  Mood Tracking
                </h3>
                <p className="text-sm sm:text-base font-light text-[#56655c] leading-relaxed">
                  Daily check-ins that help you understand emotional patterns over
                  time.
                </p>

                {/* Checklist */}
                <ul className="space-y-2.5 pt-2">
                  {[
                    "Individual Therapy",
                    "Depression Treatment",
                    "Trauma & PTSD Care",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-light text-[#2d3b31]"
                    >
                      <Check className="w-4 h-4 text-[#1b3423] stroke-[2.2]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="pt-2">
                  <Link
                    href="#mood-tracking"
                    className="inline-flex items-center gap-1.5 bg-[#15271b] hover:bg-[#203a29] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow hover:scale-[1.02]"
                  >
                    <span>Read More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Feature 2 — Anxiety & Stress Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Illustration Showcase Card */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#8faea3] via-[#74968b] to-[#45675c] shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex items-center justify-center p-5 sm:p-8">
                {stressSupportImage ? (
                  <Image
                    src={stressSupportImage}
                    alt="Anxiety & Stress support background"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <>
                    {/* Natural ambient blur texture */}
                    <div className="absolute inset-0 bg-radial from-white/30 via-transparent to-black/25 pointer-events-none" />
                    <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-[#d7f943]/25 blur-3xl pointer-events-none" />
                  </>
                )}

                {/* Floating Frosted Glass HUD Card */}
                <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] rounded-[24px] p-5 sm:p-6 bg-white/45 backdrop-blur-2xl border border-white/70 shadow-[0_25px_60px_rgba(0,0,0,0.25)] text-[#0e1713]">
                  {/* Top Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-white text-[11px] font-normal text-[#1e2e23] mb-4 shadow-xs">
                    <TrendingUp className="w-3.5 h-3.5 text-[#1e2e23]" />
                    <span>Trends</span>
                  </div>

                  {/* Ascending Stepped Progress Graph */}
                  <div className="relative w-full h-28 my-2">
                    <svg
                      viewBox="0 0 320 100"
                      className="w-full h-full overflow-visible"
                    >
                      <defs>
                        <linearGradient
                          id="areaGrad"
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#d7f943" stopOpacity="0.85" />
                          <stop offset="100%" stopColor="#2e4d3b" stopOpacity="0.85" />
                        </linearGradient>
                      </defs>

                      {/* Stepped fill shape */}
                      <polygon
                        points="10,85 50,75 90,75 130,60 170,55 210,40 250,38 290,20 290,85 10,85"
                        fill="url(#areaGrad)"
                        className="opacity-90"
                      />

                      {/* Top outline */}
                      <polyline
                        points="10,85 50,75 90,75 130,60 170,55 210,40 250,38 290,20"
                        fill="none"
                        stroke="#d7f943"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Active highlight node */}
                      <circle cx="210" cy="40" r="4.5" fill="#d7f943" stroke="#122417" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Bottom Highlight Label */}
                  <div className="flex items-center gap-2 pt-2 text-xs font-normal text-[#16291c]">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#16291c]" />
                    <span>Improving 3% this month</span>
                  </div>
                </div>
              </div>

              {/* Text & Checklist */}
              <div className="space-y-4 max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-normal text-[#0d1711] tracking-tight">
                  Anxiety & Stress Support
                </h3>
                <p className="text-sm sm:text-base font-light text-[#56655c] leading-relaxed">
                  One-on-one sessions to address anxiety, depression, stress,
                  trauma, and personal growth.
                </p>

                {/* Checklist */}
                <ul className="space-y-2.5 pt-2">
                  {[
                    "Teen & Young Adult Counseling",
                    "Relationship & Family Counseling",
                    "Trauma recovery",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-light text-[#2d3b31]"
                    >
                      <Check className="w-4 h-4 text-[#1b3423] stroke-[2.2]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="pt-2">
                  <Link
                    href="#anxiety-support"
                    className="inline-flex items-center gap-1.5 bg-[#15271b] hover:bg-[#203a29] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow hover:scale-[1.02]"
                  >
                    <span>Read More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Feature 3 — Sleep & Recovery Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Illustration Showcase Card */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#1d352f] via-[#132621] to-[#0b1714] shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex items-center justify-center p-5 sm:p-8">
                {/* Ambient Twilight Lighting */}
                <div className="absolute inset-0 bg-radial from-white/10 via-transparent to-black/40 pointer-events-none" />
                <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#d7f943]/15 blur-3xl pointer-events-none" />

                {/* Floating Midnight Glass HUD Card — designed exactly like Card 1 */}
                <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] rounded-[24px] p-5 sm:p-6 bg-[#0e1713]/85 backdrop-blur-xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.45)] text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="block text-[11px] font-light text-white/60 uppercase tracking-wider">
                        Sleep Stages
                      </span>
                      <h4 className="text-base sm:text-lg font-medium text-white tracking-tight">
                        Rest Architecture
                      </h4>
                    </div>
                    <span className="text-[10px] text-white/45 font-light">
                      Last night · 8h 14m
                    </span>
                  </div>

                  {/* Luminous Hypnogram Sleep Cycle SVG Chart */}
                  <div className="relative w-full h-28 my-3">
                    <svg
                      viewBox="0 0 320 100"
                      className="w-full h-full overflow-visible"
                      fill="none"
                    >
                      {/* Vertical guide lines */}
                      <line
                        x1="80"
                        y1="10"
                        x2="80"
                        y2="85"
                        stroke="rgba(255,255,255,0.12)"
                        strokeDasharray="3 3"
                      />
                      <line
                        x1="180"
                        y1="10"
                        x2="180"
                        y2="85"
                        stroke="rgba(255,255,255,0.12)"
                        strokeDasharray="3 3"
                      />
                      <line
                        x1="270"
                        y1="10"
                        x2="270"
                        y2="85"
                        stroke="rgba(255,255,255,0.12)"
                        strokeDasharray="3 3"
                      />

                      {/* Sleep cycle stepped & curved path */}
                      <path
                        d="M 10 20 L 40 20 L 55 50 L 90 50 L 110 80 L 160 80 L 175 45 L 210 45 L 230 75 L 265 75 L 285 30 L 310 30"
                        stroke="#d7f943"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                      />

                      {/* Active peak nodes */}
                      <circle cx="160" cy="80" r="4.5" fill="#d7f943" stroke="#0e1713" strokeWidth="2" />
                      <circle cx="210" cy="45" r="4.5" fill="#d7f943" stroke="#0e1713" strokeWidth="2" />
                      <circle cx="285" cy="30" r="4.5" fill="#d7f943" stroke="#0e1713" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Filter Pills matching Card 1 */}
                  <div className="flex items-center justify-between gap-1 pt-2 border-t border-white/10">
                    {["Stages", "Cycles", "HRV", "Recovery", "All"].map((tab, idx) => (
                      <span
                        key={tab}
                        className={`px-3 py-1 rounded-full text-[11px] transition-all ${
                          idx === 0
                            ? "bg-[#d7f943] text-[#0e1713] font-medium shadow-sm"
                            : "text-white/60"
                        }`}
                      >
                        {tab}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text & Checklist */}
              <div className="space-y-4 max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-normal text-[#0d1711] tracking-tight">
                  Sleep & Recovery Tracking
                </h3>
                <p className="text-sm sm:text-base font-light text-[#56655c] leading-relaxed">
                  Analyze restorative sleep architecture, nighttime heart rate
                  variability, and awaken feeling recharged.
                </p>

                {/* Checklist */}
                <ul className="space-y-2.5 pt-2">
                  {[
                    "Deep Sleep & REM Architecture Analysis",
                    "Nocturnal HRV & Recovery Readiness Index",
                    "Smart Circadian Awakening Window",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-light text-[#2d3b31]"
                    >
                      <Check className="w-4 h-4 text-[#1b3423] stroke-[2.2]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="pt-2">
                  <Link
                    href="#sleep-recovery"
                    className="inline-flex items-center gap-1.5 bg-[#15271b] hover:bg-[#203a29] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow hover:scale-[1.02]"
                  >
                    <span>Read More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Feature 4 — Mindfulness & Resonant Breathwork */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Illustration Showcase Card */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#9fc0b2] via-[#7ea594] to-[#4c7362] shadow-[0_20px_50px_rgba(0,0,0,0.12)] flex items-center justify-center p-5 sm:p-8">
                {/* Atmospheric Organic Light */}
                <div className="absolute inset-0 bg-radial from-white/35 via-transparent to-black/25 pointer-events-none" />
                <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-[#d7f943]/30 blur-3xl pointer-events-none" />

                {/* Floating Frosted Glass HUD Card */}
                <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] rounded-[24px] p-5 sm:p-6 bg-white/50 backdrop-blur-2xl border border-white/75 shadow-[0_25px_60px_rgba(0,0,0,0.22)] text-[#0e1713]">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-white text-[11px] font-normal text-[#1e2e23] shadow-xs">
                      <Wind className="w-3.5 h-3.5 text-[#1e2e23]" />
                      <span>Coherence Pacing</span>
                    </div>
                    <span className="text-xs font-medium text-[#1e2e23]">
                      5.5 breaths/min
                    </span>
                  </div>

                  {/* Resonant Wave Biofeedback Visualization */}
                  <div className="relative w-full h-24 my-3 flex items-center justify-center">
                    <svg viewBox="0 0 320 80" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="breathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#1e3e2c" />
                          <stop offset="50%" stopColor="#d7f943" />
                          <stop offset="100%" stopColor="#1e3e2c" />
                        </linearGradient>
                      </defs>

                      {/* Harmonic breath sine-wave */}
                      <path
                        d="M 10 40 Q 85 5, 160 40 T 310 40"
                        fill="none"
                        stroke="url(#breathGrad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Pulse point */}
                      <circle cx="160" cy="40" r="5" fill="#d7f943" stroke="#142c1f" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Bottom Metric Label */}
                  <div className="flex items-center justify-between pt-2 border-t border-black/[0.08] text-xs">
                    <span className="text-[#3b4d42] font-light">Autonomic Nervous System</span>
                    <span className="font-medium text-[#16291c]">96% Calm Index</span>
                  </div>
                </div>
              </div>

              {/* Text & Checklist */}
              <div className="space-y-4 max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-normal text-[#0d1711] tracking-tight">
                  Mindfulness & Biofeedback
                </h3>
                <p className="text-sm sm:text-base font-light text-[#56655c] leading-relaxed">
                  Real-time resonant breathing biofeedback to soothe the nervous
                  system and restore mental clarity in minutes.
                </p>

                {/* Checklist */}
                <ul className="space-y-2.5 pt-2">
                  {[
                    "Vagus Nerve Resonance Training",
                    "Real-time Heart Coherence Feedback",
                    "Personalized Daily Micro-Resets",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-light text-[#2d3b31]"
                    >
                      <Check className="w-4 h-4 text-[#1b3423] stroke-[2.2]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="pt-2">
                  <Link
                    href="#breathwork"
                    className="inline-flex items-center gap-1.5 bg-[#15271b] hover:bg-[#203a29] text-white px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all shadow-sm hover:shadow hover:scale-[1.02]"
                  >
                    <span>Read More</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
