"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "01",
    question: "What development environments and SDKs are supported?",
    answer:
      "NEXBOT ships with a native Python 3.12 API and direct PyTorch bindings for kinematic control and reinforcement learning policies. Full digital twin simulation pipelines are provided out of the box for NVIDIA Isaac Sim and MuJoCo.",
  },
  {
    id: "02",
    question: "What is the delivery timeline for Series 01 units?",
    answer:
      "Production allocations for Series 01 commence deployment in Q3 2026. Early developer batches are prioritized for verified robotics research institutes, advanced AI laboratories, and select industrial automation partners.",
  },
  {
    id: "03",
    question: "How does the autonomous recharge mechanism operate?",
    answer:
      "When the dorsal solid-state battery drops below 15% charge, NEXBOT autonomously navigates to its magnetic resonant docking plate. The system reaches 80% capacity within 28 minutes without requiring human tethering.",
  },
  {
    id: "04",
    question: "Can NEXBOT operate safely in collaborative human environments?",
    answer:
      "Yes. The sensory array continuously executes 360° LiDAR and stereoscopic depth fusion at 120 FPS. Whole-body impedance controllers dynamically cap contact forces below collaborative safety thresholds to prevent impact hazards.",
  },
  {
    id: "05",
    question: "Is physical maintenance and hardware support included?",
    answer:
      "Every Series 01 allocation includes dedicated field engineering coverage, hot-swappable cycloidal joint modules, and over-the-air fleet telemetry diagnostics with prioritized parts replacement.",
  },
];

export function NexbotFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative z-30 w-full max-w-[1720px] mx-auto px-6 sm:px-12 lg:px-16 py-32 border-t border-black/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Left Column: Section Title */}
        <div className="lg:col-span-5">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#717582] mb-3">
            System Inquiries
          </p>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111215] leading-[1.02]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Frequently Asked Questions.
          </h2>
        </div>

        {/* Right Column: Clean Accordion */}
        <div className="lg:col-span-7 divide-y divide-black/10">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={faq.id} className="py-8 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-start justify-between gap-6 text-left group cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-xs font-mono text-[#8c909e] pt-1">
                      {faq.id}
                    </span>
                    <h3
                      className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
                        isOpen
                          ? "text-[#111215]"
                          : "text-[#353840] group-hover:text-[#111215]"
                      }`}
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <div className="pt-1 text-[#111215] shrink-0">
                    {isOpen ? (
                      <Minus className="w-5 h-5 transition-transform" />
                    ) : (
                      <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pl-10 sm:pl-12 pt-4 pr-6 text-sm sm:text-base leading-relaxed text-[#4a4d57] font-normal">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
