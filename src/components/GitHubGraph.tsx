import React, { useState } from "react";
import { motion } from "motion/react";
import { GitCommit, Sparkles } from "lucide-react";

export const GitHubGraph = () => {
  // 52 weeks in a full year
  const weeks = 52;
  const daysPerWeek = 7;
  const totalDays = weeks * daysPerWeek;
  
  const [hoveredDay, setHoveredDay] = useState<{ week: number; day: number; count: number } | null>(null);

  const generateContributions = () => {
    const data = [];
    for (let i = 0; i < totalDays; i++) {
      // Realistic commit distribution pattern
      const intensity = Math.random();
      let level = 0;
      let count = 0;
      if (intensity > 0.82) {
        level = 4;
        count = Math.floor(Math.random() * 8) + 12;
      } else if (intensity > 0.65) {
        level = 3;
        count = Math.floor(Math.random() * 5) + 6;
      } else if (intensity > 0.45) {
        level = 2;
        count = Math.floor(Math.random() * 4) + 2;
      } else if (intensity > 0.25) {
        level = 1;
        count = 1;
      }
      
      data.push({ id: i, level, count });
    }
    return data;
  };

  const contributions = React.useMemo(generateContributions, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 4: return "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] border border-purple-400/50";
      case 3: return "bg-purple-600/90 border border-purple-500/30";
      case 2: return "bg-purple-800/70 border border-purple-700/20";
      case 1: return "bg-purple-950/80 border border-purple-900/30";
      default: return "bg-white/[0.04] border border-white/[0.02]";
    }
  };

  return (
    <div className="w-full bg-[#101018]/90 border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden group">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/5 pointer-events-none" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <GitCommit size={14} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
              Open Source Activity
              <Sparkles size={11} className="text-purple-400" />
            </h3>
            <p className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
              {hoveredDay ? `${hoveredDay.count} commits logged` : "1,240 commits in 2026"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-[9px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Live Sync
          </div>
        </div>
      </div>

      {/* Grid Container stretching 100% width edge-to-edge */}
      <div className="w-full overflow-hidden">
        <div className="grid grid-flow-col auto-cols-fr gap-[3px] w-full">
          {Array.from({ length: weeks }).map((_, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[3px] w-full">
              {Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
                const day = contributions[weekIndex * daysPerWeek + dayIndex];
                return (
                  <motion.div
                    key={day.id}
                    onMouseEnter={() => setHoveredDay({ week: weekIndex, day: dayIndex, count: day.count })}
                    onMouseLeave={() => setHoveredDay(null)}
                    className={`w-full aspect-square rounded-[2px] ${getLevelColor(day.level)} transition-all duration-200 hover:scale-125 hover:z-20 cursor-pointer relative`}
                    title={`${day.count} contributions`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Legend */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.05] text-[9px] font-mono text-white/40 uppercase tracking-widest">
        <span>github.com/Abdulrahman-T</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-[2px] bg-white/[0.04]" />
            <div className="w-2 h-2 rounded-[2px] bg-purple-950/80" />
            <div className="w-2 h-2 rounded-[2px] bg-purple-800/70" />
            <div className="w-2 h-2 rounded-[2px] bg-purple-600/90" />
            <div className="w-2 h-2 rounded-[2px] bg-purple-500" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
