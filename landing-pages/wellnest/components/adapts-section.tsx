"use client";

import Image from "next/image";
import { Sliders, GripVertical } from "lucide-react";
import { motion } from "motion/react";

interface AdaptsSectionProps {
  bikeImageSrc?: string;
}

export function AdaptsSection({
  bikeImageSrc = "/adapts-health.webp",
}: AdaptsSectionProps) {
  return (
    <section id="insights" className="w-full bg-white py-24 sm:py-32 text-[#0d1711] scroll-mt-6">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Centered Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f4f6f4] border border-[#e2e7e3] text-xs font-normal text-[#4a584f] mb-5">
            <Sliders className="w-3.5 h-3.5 text-[#4a584f]" />
            <span>Advanced Features</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#172c1e]">
            Wellnest Adapts To You.
          </h2>
        </div>

        {/* 3-Card Triptych Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {/* Card 1 — Personalized Insights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 bg-[#f5f7f5] border border-black/[0.04] flex flex-col justify-between min-h-[440px] sm:min-h-[480px]"
          >
            {/* Top Title */}
            <div>
              <h3 className="text-2xl sm:text-[26px] font-normal text-[#0d1711] tracking-tight leading-snug">
                Personalized <br />
                Insights
              </h3>
            </div>

            {/* Bottom Floating White Metric Card */}
            <div className="bg-white rounded-[22px] p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-black/[0.04] mt-8">
              {/* Header */}
              <span className="block text-xs font-light text-[#56655c] mb-2">
                Body Mass Index (BMI)
              </span>

              {/* Metric Row */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-medium text-[#0d1711] tracking-tight">
                  24.9
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#e7f7ed] text-[#1b7340] text-xs font-normal">
                  You&apos;re Healthy
                </span>
              </div>

              {/* Spectrum Gradient Slider Bar */}
              <div className="relative pt-3 pb-1">
                {/* Active Marker Pin on 24.9 */}
                <div
                  className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
                  style={{ left: "50%" }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3d7a64] border-2 border-white shadow-sm" />
                </div>

                {/* Gradient Track */}
                <div className="w-full h-2 rounded-full bg-gradient-to-r from-[#4fb395] via-[#d7f943] to-[#e8705b] opacity-90" />

                {/* Legend Scale */}
                <div className="flex justify-between text-[10px] font-light text-[#75847b] mt-2 px-0.5">
                  <span>15</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — Emergency Alert Network */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 bg-[#edf4f8] border border-black/[0.04] flex flex-col justify-between min-h-[440px] sm:min-h-[480px]"
          >
            {/* Top Title */}
            <div>
              <h3 className="text-2xl sm:text-[26px] font-normal text-[#0d1711] tracking-tight leading-snug">
                Emergency Alert <br />
                Network
              </h3>
            </div>

            {/* Bottom Stacked Alert Checklist Card */}
            <div className="bg-white rounded-[22px] p-5 sm:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-black/[0.04] mt-8 space-y-3">
              {[
                "Detects high-distress signals",
                "Encourages reaching out to human help",
                "Highlights support resources",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full border border-[#e5eae7] bg-white text-xs font-normal text-[#2d3a31]"
                >
                  <GripVertical className="w-3.5 h-3.5 text-[#85948a] shrink-0" />
                  <span className="truncate">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3 — Health your way (Photo Card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 overflow-hidden flex flex-col justify-between min-h-[440px] sm:min-h-[480px] shadow-[0_15px_40px_rgba(0,0,0,0.08)] md:col-span-2 lg:col-span-1"
          >
            {/* Background Image / Nature Fallback */}
            <div className="absolute inset-0 z-0">
              {bikeImageSrc ? (
                <Image
                  src={bikeImageSrc}
                  alt="Couple happily cycling outdoors in summer sunlight"
                  fill
                  className="object-cover object-center"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2d4d3c] via-[#48735c] to-[#7fa38c]" />
              )}
              {/* Soft dark vignette so white text is crisp */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70 pointer-events-none" />
            </div>

            {/* Top Text (Overlay) */}
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight">
                Health your way.
              </h3>
            </div>

            {/* Bottom Text (Overlay) */}
            <div className="relative z-10 pt-16">
              <p className="text-white/90 text-sm sm:text-base font-light leading-relaxed">
                Wellnest Responds With Care And Highlighting Support Resources.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
