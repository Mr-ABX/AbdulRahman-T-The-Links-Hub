import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Zap } from "lucide-react";
import { BentoCard } from "./BentoCard";

export const LiveAutomationFeed = () => {
  const [automationTasks, setAutomationTasks] = useState(1248);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutomationTasks((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BentoCard size="1x1" className="bg-white/[0.02] group">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Zap size={20} />
          </div>
          <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">
            Live Feed
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">Tasks Automated Today</span>
            <span className="text-sm font-bold text-emerald-400">
              {automationTasks.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-emerald-500"
            />
          </div>
          <p className="text-[10px] text-white/30 italic">
            "Efficiency is the key to scale."
          </p>
        </div>
      </div>
    </BentoCard>
  );
};
