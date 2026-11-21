"use client";

import { Activity } from "lucide-react";
import { motion } from "motion/react";

export function RunningStatsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 w-[285px] sm:w-[310px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgba(255, 255, 255, 0.78) 0%, rgba(245, 250, 245, 0.65) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.9)",
      }}
    >
      {/* Top Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/75 border border-white/90 text-[11px] font-normal text-[#1e2e23] mb-4 sm:mb-5 shadow-sm">
        <Activity className="w-3.5 h-3.5 text-[#1e2e23]" />
        <span>Running Stats</span>
      </div>

      {/* Metrics Grid */}
      <div className="space-y-3.5">
        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="block text-[11px] text-[#526359] font-light mb-0.5">
              Distance
            </span>
            <span className="text-lg sm:text-xl font-medium text-[#0e1711] tracking-tight">
              2.5 <span className="text-xs font-normal text-[#526359]">km</span>
            </span>
          </div>
          <div>
            <span className="block text-[11px] text-[#526359] font-light mb-0.5">
              Pace
            </span>
            <span className="text-lg sm:text-xl font-medium text-[#0e1711] tracking-tight">
              4&apos;56&quot; <span className="text-xs font-normal text-[#526359]">/km</span>
            </span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="block text-[11px] text-[#526359] font-light mb-0.5">
              Calories
            </span>
            <span className="text-lg sm:text-xl font-medium text-[#0e1711] tracking-tight">
              120 <span className="text-xs font-normal text-[#526359]">kcal</span>
            </span>
          </div>
          <div>
            <span className="block text-[11px] text-[#526359] font-light mb-0.5">
              Elevation Gain
            </span>
            <span className="text-lg sm:text-xl font-medium text-[#0e1711] tracking-tight">
              14 <span className="text-xs font-normal text-[#526359]">m</span>
            </span>
          </div>
        </div>

        {/* Row 3 (Max + Save Button) */}
        <div className="grid grid-cols-2 gap-3 items-end pt-0.5">
          <div>
            <span className="block text-[11px] text-[#526359] font-light mb-0.5">
              Max
            </span>
            <span className="text-lg sm:text-xl font-medium text-[#0e1711] tracking-tight">
              148 <span className="text-xs font-normal text-[#526359]">m</span>
            </span>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-[#d7f943] hover:bg-[#c6e835] text-[#0e1711] font-medium text-xs px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
