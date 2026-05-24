import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Palette, MousePointer, Compass, LayoutGrid, ToggleLeft, ToggleRight, Sparkles, MonitorSmartphone, Layers } from "lucide-react";
import { cn } from "../lib/utils";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  hideCustomCursor: boolean;
  setHideCustomCursor: (val: boolean) => void;
  enableSmoothScroll: boolean;
  setEnableSmoothScroll: (val: boolean) => void;
  compactHomeView: boolean;
  setCompactHomeView: (val: boolean) => void;
  headerLayout: "horizontal" | "vertical";
  setHeaderLayout: (val: "horizontal" | "vertical") => void;
}

export const SettingsPanel = ({
  isOpen,
  onClose,
  hideCustomCursor,
  setHideCustomCursor,
  enableSmoothScroll,
  setEnableSmoothScroll,
  compactHomeView,
  setCompactHomeView,
  headerLayout,
  setHeaderLayout,
}: SettingsPanelProps) => {

  const handleToggleCursor = () => {
    setHideCustomCursor(!hideCustomCursor);
  };

  const handleToggleScroll = () => {
    setEnableSmoothScroll(!enableSmoothScroll);
  };

  const handleToggleCompact = () => {
    setCompactHomeView(!compactHomeView);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-md"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-[160] w-full max-w-md bg-[#09090b]/95 backdrop-blur-3xl border-l border-white/10 shadow-2xl p-6 flex flex-col justify-between"
          >
            {/* Header Area */}
            <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pr-1">
              <div className="flex items-center justify-between pb-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <Palette className="text-indigo-400" size={20} />
                  <h3 className="font-bold text-lg text-white font-sans tracking-tight">
                    Lab Preferences
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/5"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Layout Toggles */}
              <div className="space-y-5">
                {/* 1. Header Layout Selector (Horizontal vs Vertical) */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <div className="flex items-start gap-3">
                    <LayoutGrid className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        Navigation Interface
                      </h4>
                      <p className="text-[10px] text-white/40 leading-relaxed font-light">
                        Choose how you interact and navigate through the laboratory pages.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setHeaderLayout("horizontal")}
                      className={cn(
                        "p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all",
                        headerLayout === "horizontal"
                          ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 font-extrabold shadow-inner"
                          : "bg-black/30 border-transparent text-white/40 hover:text-white/70 hover:bg-black/40"
                      )}
                    >
                      <span className="text-[10px] font-mono">Horizontal Bar</span>
                      <span className="text-[8px] text-white/30 font-light font-sans uppercase">Classic Menu</span>
                    </button>
                    <button
                      onClick={() => setHeaderLayout("vertical")}
                      className={cn(
                        "p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all",
                        headerLayout === "vertical"
                          ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 font-extrabold shadow-inner"
                          : "bg-black/30 border-transparent text-white/40 hover:text-white/70 hover:bg-black/40"
                      )}
                    >
                      <span className="text-[10px] font-mono">Vertical Dock</span>
                      <span className="text-[8px] text-white/30 font-light font-sans uppercase">Tactile Sidebar</span>
                    </button>
                  </div>
                </div>

                {/* 2. Hide Custom Cursor Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex gap-3">
                    <MousePointer className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">
                        System Cursor
                      </h4>
                      <p className="text-[10px] text-white/45 max-w-[200px] leading-relaxed font-light">
                        Fallback to native classic operating system mouse cursor.
                      </p>
                    </div>
                  </div>

                  <button onClick={handleToggleCursor} className="text-white/70 hover:text-white transition-opacity">
                    {!hideCustomCursor ? (
                      <ToggleRight className="text-indigo-400" size={32} />
                    ) : (
                      <ToggleLeft className="text-white/20" size={32} />
                    )}
                  </button>
                </div>

                {/* 3. Smooth Scrolling Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex gap-3">
                    <Compass className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">
                        Lenis Smooth Scroll
                      </h4>
                      <p className="text-[10px] text-white/45 max-w-[200px] leading-relaxed font-light">
                        Enable smooth, inertia-driven physics on global layouts.
                      </p>
                    </div>
                  </div>

                  <button onClick={handleToggleScroll} className="text-white/70 hover:text-white transition-opacity">
                    {enableSmoothScroll ? (
                      <ToggleRight className="text-indigo-400" size={32} />
                    ) : (
                      <ToggleLeft className="text-white/20" size={32} />
                    )}
                  </button>
                </div>

                {/* 4. Compact Grid View */}
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex gap-3">
                    <MonitorSmartphone className="text-indigo-400 shrink-0 mt-0.5" size={18} />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-mono">
                        Compact home view
                      </h4>
                      <p className="text-[10px] text-white/45 max-w-[200px] leading-relaxed font-light">
                        Streamlines index home layouts by hiding spacious section spacers.
                      </p>
                    </div>
                  </div>

                  <button onClick={handleToggleCompact} className="text-white/70 hover:text-white transition-opacity">
                    {compactHomeView ? (
                      <ToggleRight className="text-indigo-400" size={32} />
                    ) : (
                      <ToggleLeft className="text-white/20" size={32} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Close footer button */}
            <div className="pt-4 border-t border-white/5 bg-[#09090b]/60 relative z-10 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-white/30">
                <span>SYSTEM VERSION: 4.2.0</span>
                <span>STATE: DESCRIP</span>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-white text-black text-xs font-extrabold uppercase tracking-widest hover:bg-white/90 shadow-xl transition-all"
              >
                Save Preferences
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
