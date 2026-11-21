"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, ArrowUpRight } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_COL_1: FAQItem[] = [
  {
    id: "q1",
    question: "Can you help us plan the shoot?",
    answer:
      "Yes. Share your moodboard, aesthetic references, and timeline. We map the staged lighting setups, wardrobe curation, and shot list with our master photographer owning each checkpoint.",
  },
  {
    id: "q2",
    question: "How does the sitting day usually go?",
    answer:
      "Every sitting is private and unhurried. We welcome you with coffee, review your wardrobe selections, and spend 90 to 120 minutes exploring natural daylight and sculpted studio strobes.",
  },
  {
    id: "q3",
    question: "Do you provide styling and hair direction?",
    answer:
      "We partner with Lisbon's top editorial hair, makeup, and wardrobe stylists. You can book an all-inclusive session or bring your own creative director and team into the studio.",
  },
  {
    id: "q4",
    question: "What does archival darkroom printing include?",
    answer:
      "Master prints are exposed on heavy fiber-based silver gelatin paper in our red-lit darkroom, toned in selenium for archival permanence over 100 years, and mounted in bespoke linen folios.",
  },
];

const FAQ_COL_2: FAQItem[] = [
  {
    id: "q5",
    question: "Can we book before dates are finalized?",
    answer:
      "Yes. You can reserve your sitting with a flexible retainer. We guarantee date priority and hold backup studio days in case travel or production schedules shift.",
  },
  {
    id: "q6",
    question: "Is there an international travel sitting service?",
    answer:
      "Studio Ostra regularly accepts private commissions and editorial assignments in Paris, London, New York, and Milan with portable field darkroom kits.",
  },
  {
    id: "q7",
    question: "How are commercial and press rights handled?",
    answer:
      "Every sitting includes high-resolution 16-bit drum scans with comprehensive personal licensing and press clearance for editorial features, book covers, and gallery exhibitions.",
  },
  {
    id: "q8",
    question: "What if we need rush delivery for an exhibition?",
    answer:
      "Expedited contact sheets can be delivered within 24 hours. Priority darkroom hand-printing and insured global courier delivery can be arranged on request.",
  },
];

export function OstraFAQ() {
  // Default first question open like in the reference image
  const [openIds, setOpenIds] = useState<string[]>(["q1"]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="relative w-full py-24 sm:py-32 bg-[#0a0a0c] text-white flex items-center justify-center select-none overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Hero Anchor Card (5 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-black border border-white/[0.12] rounded-[28px] sm:rounded-[32px] p-8 sm:p-10 flex flex-col justify-between shadow-[0_25px_70px_rgba(0,0,0,0.9)] min-h-[520px] lg:min-h-[580px]"
          >
            <div>
              {/* Main Headline */}
              <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.035em] text-white leading-[1.08] mb-6">
                Questions that<br />need a human?
              </h2>

              {/* Subtitle / Paragraph */}
              <p className="text-sm sm:text-base text-[#8e909a] font-normal leading-relaxed mb-10 max-w-md">
                The answers here cover the basics. For custom commissions,
                exhibition prints, or international sittings, send us the messy
                context: a real person replies.
              </p>
            </div>

            <div>
              {/* Key Metrics / Response Times (Clean spacing without separator line) */}
              <div className="grid grid-cols-2 gap-6 pt-4 mb-8">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1">
                    2h
                  </div>
                  <div className="text-xs sm:text-sm text-[#8e909a] font-normal">
                    Median first reply
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1">
                    98%
                  </div>
                  <div className="text-xs sm:text-sm text-[#8e909a] font-normal">
                    Client satisfaction
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mb-4">
                <Link
                  href="mailto:studio@ostra.com"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-[#e8e8e8] px-7 py-3.5 rounded-full text-sm font-semibold tracking-tight transition-all duration-200 cursor-pointer shadow-lg active:scale-95 group"
                >
                  <span>Email the team</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              {/* Operational Subtitle */}
              <p className="text-xs text-[#6e707a] font-normal">
                Weekdays 9:00–18:00 WET, Lisbon & worldwide.
              </p>
            </div>
          </motion.div>

          {/* Right Area: 2 Columns of Accordion Cards (7 cols on desktop) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {FAQ_COL_1.map((item, idx) => {
                const isOpen = openIds.includes(item.id);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => toggleItem(item.id)}
                    className="bg-black hover:border-white/20 border border-white/[0.08] rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 cursor-pointer transition-all duration-200 group shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white leading-snug">
                        {item.question}
                      </h3>
                      <button
                        type="button"
                        aria-label={isOpen ? "Collapse question" : "Expand question"}
                        className="text-[#8e909a] group-hover:text-white transition-colors duration-150 shrink-0 mt-0.5"
                      >
                        {isOpen ? (
                          <X className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                        ) : (
                          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs sm:text-sm text-[#8e909a] leading-relaxed font-normal pt-1">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4 sm:gap-5">
              {FAQ_COL_2.map((item, idx) => {
                const isOpen = openIds.includes(item.id);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => toggleItem(item.id)}
                    className="bg-black hover:border-white/20 border border-white/[0.08] rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 cursor-pointer transition-all duration-200 group shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white leading-snug">
                        {item.question}
                      </h3>
                      <button
                        type="button"
                        aria-label={isOpen ? "Collapse question" : "Expand question"}
                        className="text-[#8e909a] group-hover:text-white transition-colors duration-150 shrink-0 mt-0.5"
                      >
                        {isOpen ? (
                          <X className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                        ) : (
                          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs sm:text-sm text-[#8e909a] leading-relaxed font-normal pt-1">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
