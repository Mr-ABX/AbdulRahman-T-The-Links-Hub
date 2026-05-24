import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";

export const StorePage = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <BentoCard
        size="2x2"
        className="max-w-3xl w-full text-center p-12 flex flex-col items-center justify-center relative overflow-hidden bg-[#050505] border-emerald-500/20"
      >
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          className="mb-8 relative z-10 flex items-center justify-center"
        >
          {/* Custom Hash Lab Logo */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute top-2 left-2 w-6 h-6 bg-emerald-400 rounded-sm transform rotate-45" />
            <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-300 rounded-sm transform rotate-45" />
            <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/80 rounded-sm transform rotate-45" />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-white/40 rounded-sm transform rotate-45" />
            <div className="absolute inset-0 bg-[#050505] w-8 h-8 m-auto transform rotate-45 z-10" />
          </div>
        </motion.div>

        <div className="relative z-10 mb-6 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 flex items-center flex-wrap justify-center gap-3">
            <span>Store Front - # Hash Lab</span>
          </h2>
          <h3 className="text-2xl md:text-3xl text-emerald-400 font-medium mt-2">
            The AI Stash Studio
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mt-6 mb-2" />
        </div>

        <h3 className="text-xl md:text-2xl text-white/90 font-semibold mb-4 relative z-10">
          The Intelligent AI Product Engine
        </h3>

        <p className="text-white/70 mb-10 max-w-xl mx-auto leading-relaxed text-lg relative z-10">
          The foundation for your next big launch. Explore a curated stash
          of premium, cutting-edge digital assets built for the community
          and ready for your clients.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center relative z-10">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              window.open("https://abdulrahman-t.web.app/store", "_blank")
            }
            className="px-8 py-4 rounded-2xl bg-emerald-500 text-black text-sm font-bold hover:bg-emerald-400 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 group"
          >
            Enter The Lab
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>
        </div>
      </BentoCard>
    </div>
  );
};
