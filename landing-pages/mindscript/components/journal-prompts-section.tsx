"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PromptItem {
  id: number;
  question: string;
  exampleLines: string[];
}

const defaultPrompts: PromptItem[] = [
  {
    id: 1,
    question: "What's something you need less of today and something you need more of?",
    exampleLines: [
      "Example : I need less self-doubt today — it's been holding me back.",
      "What I need more of is trust in my own pace and progress.",
    ],
  },
  {
    id: 2,
    question: "If your mind had a weather forecast, what would it say right now?",
    exampleLines: [
      "Example : Mostly overcast with scattered thoughts, clearing up toward evening.",
      "A gentle breeze of calm is slowly rolling in as I pause to breathe.",
    ],
  },
  {
    id: 3,
    question: "Write a letter to a younger version of yourself. What would you say?",
    exampleLines: [
      "Example : Don't rush to have every answer right now.",
      "The moments that feel uncertain are gently preparing you for where you belong.",
    ],
  },
  {
    id: 4,
    question: "What are you avoiding — and what might happen if you faced it with compassion?",
    exampleLines: [
      "Example : I am avoiding having an honest conversation about my boundaries.",
      "If I approach it with grace, it could bring clarity and mutual respect.",
    ],
  },
];

export function JournalPromptsSection() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [showInput, setShowInput] = useState(false);
  const [customQuestion, setCustomQuestion] = useState("");
  const [promptsList, setPromptsList] = useState<PromptItem[]>(defaultPrompts);

  const togglePrompt = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    const newPrompt: PromptItem = {
      id: Date.now(),
      question: customQuestion.trim(),
      exampleLines: [
        "Example : Take three slow breaths before writing.",
        "Reflect on how this question resonates in your body and thoughts right now.",
      ],
    };

    setPromptsList([newPrompt, ...promptsList]);
    setOpenId(newPrompt.id);
    setCustomQuestion("");
    setShowInput(false);
  };

  return (
    <section id="prompts" className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Header Pill & Titles with scroll entrance */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16"
      >
        {/* Pill Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#163327] bg-[#e8eee6] border border-[#d3ded0] mb-5">
          Journal Prompts
        </span>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-medium tracking-tight text-[#121c17] leading-[1.15]">
          Words To Ground{" "}
          <span className="font-serif italic font-normal text-4xl sm:text-6xl lg:text-[62px] text-[#163327]">
            Your Mind
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-[#55665d] max-w-2xl leading-relaxed">
          Write your way to stillness and self-awareness.
        </p>
      </motion.div>

      {/* Prompts Container */}
      <div className="max-w-3xl mx-auto">
        {/* Top Action Pill Bar */}
        <div className="rounded-full border border-[#dce3da] bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 pl-6 sm:pl-7 flex items-center justify-between mb-5 shadow-sm transition-all hover:border-[#b8cbb5]">
          <span className="text-sm sm:text-base text-[#1b2b22] font-medium">
            Have a different question
          </span>
          <button
            type="button"
            onClick={() => setShowInput((prev) => !prev)}
            className="bg-[#163327] hover:bg-[#1f4233] text-white px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            {showInput ? "Close" : "Ask Something"}
          </button>
        </div>

        {/* Optional Add Custom Prompt Input */}
        <AnimatePresence>
          {showInput && (
            <motion.form
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleAddQuestion}
              className="overflow-hidden"
            >
              <div className="bg-white rounded-2xl p-4 border border-[#dce3da] shadow-sm flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="Type your reflection prompt or question here..."
                  className="flex-1 px-4 py-2 text-sm text-[#121c17] bg-[#f8faf8] border border-[#d8e0d5] rounded-xl focus:outline-none focus:border-[#163327]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-[#9cb098] hover:bg-[#8ea38a] text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                >
                  Add Prompt
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {promptsList.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="bg-white rounded-[22px] sm:rounded-[26px] border border-[#e4ebe2] p-5 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all"
              >
                {/* Header (Question + Toggle Icon) */}
                <button
                  type="button"
                  onClick={() => togglePrompt(item.id)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                >
                  <span className="text-base sm:text-lg lg:text-[19px] font-medium text-[#121c17] leading-snug group-hover:text-[#163327] transition-colors">
                    {item.question}
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[#121c17] group-hover:bg-[#f2f6f1] transition-colors">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-[#163327]" />
                    ) : (
                      <Plus className="w-5 h-5 text-[#163327]" />
                    )}
                  </span>
                </button>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-3 border-t border-[#f0f4ef] text-sm sm:text-base text-[#5c6e64] space-y-1.5 leading-relaxed">
                        {item.exampleLines.map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
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
