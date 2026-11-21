"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Sprout, Brain, Wind, Moon, Sparkles, Compass, ShieldCheck, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HelpCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const tabData: Record<string, HelpCard[]> = {
  "Online Therapy": [
    {
      icon: Heart,
      title: "Reduce Anxiety",
      description:
        "Learn tools to manage the thoughts and behaviors behind your anxiety and support long-term progress.",
    },
    {
      icon: Sprout,
      title: "Cope with Depression",
      description:
        "Build skills to lift your mood and ease depression — with support from your therapist.",
    },
    {
      icon: Brain,
      title: "Reframe Stress",
      description:
        "In the rush of daily life, therapy helps you find balance with techniques to reduce stress and restore calm.",
    },
  ],
  "Guided Meditations": [
    {
      icon: Wind,
      title: "Breathwork Journeys",
      description:
        "Deepen your breathing rhythms to gently regulate your nervous system and cultivate grounded focus.",
    },
    {
      icon: Compass,
      title: "Daily Mindfulness",
      description:
        "Short 5-to-10 minute mindful resets designed to center your awareness throughout busy working days.",
    },
    {
      icon: Sun,
      title: "Body Scan & Release",
      description:
        "Progressive physical relaxation sessions that untangle unconscious somatic tension from head to toe.",
    },
  ],
  "Sleep Resources": [
    {
      icon: Moon,
      title: "Wind-Down Soundscapes",
      description:
        "Immersive acoustic sound journeys recorded in pristine temperate forests and gentle ocean shores.",
    },
    {
      icon: ShieldCheck,
      title: "Circadian Rhythm Reset",
      description:
        "Science-backed night rituals and evening light discipline to restore your natural sleep-wake cycles.",
    },
    {
      icon: Heart,
      title: "Bedtime Reflections",
      description:
        "Gentle cognitive prompts that quiet rumination and invite effortless, uninterrupted deep rest.",
    },
  ],
  "AI Guidance": [
    {
      icon: Sparkles,
      title: "24/7 Grounding Assistant",
      description:
        "An intelligent, compassionate companion trained in CBT principles ready whenever racing thoughts strike.",
    },
    {
      icon: Brain,
      title: "Pattern Recognition",
      description:
        "Uncover subconscious emotional triggers and cyclical mood patterns across your weekly journaling.",
    },
    {
      icon: Sprout,
      title: "Tailored Habit Prompts",
      description:
        "Dynamic self-care suggestions that organically adapt to your energy levels and emotional capacity.",
    },
  ],
};

export function HowWeHelpSection() {
  const tabs = Object.keys(tabData);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section id="help" className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative">
      {/* Header Pill & Titles with scroll entrance */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-14"
      >
        {/* Pill Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#163327] bg-[#e8eee6] border border-[#d3ded0] mb-5">
          How We Help
        </span>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-medium tracking-tight text-[#121c17] leading-[1.15]">
          Because a Stronger Mind Starts with{" "}
          <span className="font-serif italic font-normal text-4xl sm:text-6xl lg:text-[62px] text-[#163327]">
            Small Steps
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-[#55665d] max-w-2xl leading-relaxed">
          MindScript helps you build gentle, consistent habits to support your mental wellbeing — one day at a time.
        </p>
      </motion.div>

      {/* Filter Tabs Pill Bar (no dots) */}
      <div className="flex justify-center mb-12 sm:mb-16">
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#e1e8df] shadow-sm">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#9cb098] text-white shadow-sm"
                    : "text-[#36493e] hover:text-[#163327] hover:bg-black/[0.03]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 Cards Grid with Nested Inner Rounded Box & Liquid Glass Effect */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        <AnimatePresence>
          {tabData[activeTab].map((card, idx) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={`${activeTab}-${card.title}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, delay: idx * 0.08, ease: "easeOut" }}
                className="group relative rounded-[26px] sm:rounded-[30px] p-2.5 sm:p-3 flex flex-col justify-between transition-all duration-400 bg-[#edf2ea]/90 border border-[#e2eae0] shadow-[0_8px_24px_rgba(20,40,30,0.04)] hover:shadow-[0_14px_34px_rgba(20,40,30,0.08)] hover:-translate-y-1"
              >
                {/* Inner White Box with Liquid Glass Specular Accent */}
                <div
                  className="relative rounded-[20px] sm:rounded-[22px] p-6 sm:p-8 flex-1 flex flex-col overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(250, 252, 249, 0.90) 100%)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.95)",
                    boxShadow:
                      "0 2px 12px 0 rgba(18, 43, 32, 0.03), inset 0 1px 1px 0 rgba(255, 255, 255, 1)",
                  }}
                >
                  {/* Subtle liquid glass reflection on hover */}
                  <div className="absolute -top-[40%] -left-[40%] w-[180%] h-[180%] bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-600 transform -rotate-12" />

                  {/* Circular Icon Badge */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#9cb098] flex items-center justify-center mb-6 text-white shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Card Title */}
                  <h3 className="relative z-10 text-xl sm:text-[22px] font-semibold text-[#121c17] tracking-tight mb-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="relative z-10 text-sm sm:text-[15px] text-[#55665d] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom Centered Link */}
                <div className="py-3.5 sm:py-4 text-center">
                  <Link
                    href="#learn-more"
                    className="inline-block text-xs font-semibold tracking-wider uppercase text-[#73847a] group-hover:text-[#163327] transition-colors"
                  >
                    LEARN MORE
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
