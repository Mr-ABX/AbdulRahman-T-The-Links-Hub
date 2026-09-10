import React from "react";
import { motion } from "motion/react";

export const GitHubGraph = () => {
  // Generate random data for a GitHub-like contribution graph
  const weeks = 40;
  const daysPerWeek = 7;
  const totalDays = weeks * daysPerWeek;
  
  const generateContributions = () => {
    const data = [];
    for (let i = 0; i < totalDays; i++) {
      // Create random distribution, more dense towards recent
      const intensity = Math.random();
      let level = 0;
      if (intensity > 0.8) level = 4;
      else if (intensity > 0.6) level = 3;
      else if (intensity > 0.4) level = 2;
      else if (intensity > 0.2) level = 1;
      
      data.push({ id: i, level });
    }
    return data;
  };

  const contributions = React.useMemo(generateContributions, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 4: return "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]";
      case 3: return "bg-purple-600/80";
      case 2: return "bg-purple-800/60";
      case 1: return "bg-purple-900/40";
      default: return "bg-white/[0.03]";
    }
  };

  return (
    <div className="w-full bg-[#12121c]/90 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-white/70" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">Open Source Contributions</h3>
            <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">1,024 commits in the last year</p>
          </div>
        </div>
        <div className="text-[10px] font-mono text-purple-400 border border-purple-500/30 bg-purple-500/10 px-2 py-1 rounded-full uppercase">
          Live Sync
        </div>
      </div>

      <div className="flex gap-[3px] overflow-x-auto pb-2 custom-scrollbar">
        {Array.from({ length: weeks }).map((_, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[3px]">
            {Array.from({ length: daysPerWeek }).map((_, dayIndex) => {
              const day = contributions[weekIndex * daysPerWeek + dayIndex];
              return (
                <motion.div
                  key={day.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (weekIndex * 0.01) + (dayIndex * 0.01), duration: 0.3 }}
                  className={`w-3 h-3 rounded-[2px] ${getLevelColor(day.level)} transition-colors duration-300 hover:scale-125 hover:z-10 relative`}
                  title={`${day.level * 3} contributions`}
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 mt-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-[2px] bg-white/[0.03]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-purple-900/40" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-purple-800/60" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-purple-600/80" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-purple-500" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
