import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sliders, MousePointer, Compass, LayoutGrid, MonitorSmartphone } from "lucide-react";
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

// Apple iOS / macOS Style Smooth Sliding Switch
const AppleSwitch = ({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: () => void;
  id: string;
}) => {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "w-11 h-6 rounded-full p-0.5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 relative cursor-pointer select-none",
        checked
          ? "bg-purple-600 shadow-[0_0_14px_rgba(168,85,247,0.45),inset_0_1px_0_rgba(255,255,255,0.2)]"
          : "bg-white/[0.12] hover:bg-white/[0.18]"
      )}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 600, damping: 35 }}
        className={cn(
          "w-5 h-5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.4)]",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
};

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
            className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-md"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed right-0 top-0 bottom-0 z-[160] w-full max-w-md bg-[#0c0c14]/95 backdrop-blur-3xl border-l border-white/10 shadow-[-20px_0_60px_rgba(0,0,0,0.85)] p-6 flex flex-col justify-between"
          >
            {/* Header Area */}
            <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pr-1">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Sliders size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white font-sans tracking-tight">
                      System Preferences
                    </h3>
                    <p className="text-[10px] text-white/40 font-mono uppercase tracking-wider">
                      Abdulrahman-T // OS
                    </p>
                  </div>
                </div>
                <button
                  id="close-settings-drawer-btn"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10"
                  title="Close Preferences"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Layout Toggles */}
              <div className="space-y-4">
                {/* 1. Header Layout Selector (Horizontal vs Vertical) */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3.5 hover:border-white/[0.12] transition-colors">
                  <div className="flex items-start gap-3">
                    <LayoutGrid className="text-purple-400 shrink-0 mt-0.5" size={17} />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        Navigation Interface
                      </h4>
                      <p className="text-[11px] text-white/50 leading-relaxed font-light">
                        Choose between the floating top notch bar or the docked left sidebar.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      id="nav-style-horizontal-btn"
                      onClick={() => setHeaderLayout("horizontal")}
                      className={cn(
                        "p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer",
                        headerLayout === "horizontal"
                          ? "bg-purple-950/40 border-purple-500/40 text-purple-200 shadow-[0_0_16px_-2px_rgba(168,85,247,0.3)]"
                          : "bg-black/30 border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                      )}
                    >
                      <span className="text-[11px] font-mono">Top Notch Bar</span>
                      <span className="text-[9px] text-white/35 font-normal uppercase tracking-wider">Classic Floating</span>
                    </button>
                    <button
                      id="nav-style-vertical-btn"
                      onClick={() => setHeaderLayout("vertical")}
                      className={cn(
                        "p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer",
                        headerLayout === "vertical"
                          ? "bg-purple-950/40 border-purple-500/40 text-purple-200 shadow-[0_0_16px_-2px_rgba(168,85,247,0.3)]"
                          : "bg-black/30 border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                      )}
                    >
                      <span className="text-[11px] font-mono">Sidebar Notch</span>
                      <span className="text-[9px] text-white/35 font-normal uppercase tracking-wider">Tactile Dock</span>
                    </button>
                  </div>
                </div>

                {/* 2. Hide Custom Cursor Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/[0.08] hover:border-white/[0.12] transition-colors">
                  <div className="flex gap-3">
                    <MousePointer className="text-purple-400 shrink-0 mt-0.5" size={17} />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        System Cursor
                      </h4>
                      <p className="text-[11px] text-white/50 max-w-[210px] leading-relaxed font-light">
                        Use the native operating system cursor instead of the custom fluid halo.
                      </p>
                    </div>
                  </div>

                  <AppleSwitch
                    id="toggle-cursor-switch"
                    checked={!hideCustomCursor}
                    onChange={handleToggleCursor}
                  />
                </div>

                {/* 3. Smooth Scrolling Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/[0.08] hover:border-white/[0.12] transition-colors">
                  <div className="flex gap-3">
                    <Compass className="text-purple-400 shrink-0 mt-0.5" size={17} />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        Lenis Smooth Scroll
                      </h4>
                      <p className="text-[11px] text-white/50 max-w-[210px] leading-relaxed font-light">
                        Enable smooth, inertia-driven physics on global layouts.
                      </p>
                    </div>
                  </div>

                  <AppleSwitch
                    id="toggle-scroll-switch"
                    checked={enableSmoothScroll}
                    onChange={handleToggleScroll}
                  />
                </div>

                {/* 4. Compact Home View */}
                <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl border border-white/[0.08] hover:border-white/[0.12] transition-colors">
                  <div className="flex gap-3">
                    <MonitorSmartphone className="text-purple-400 shrink-0 mt-0.5" size={17} />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        Compact Home View
                      </h4>
                      <p className="text-[11px] text-white/50 max-w-[210px] leading-relaxed font-light">
                        Streamlines the homepage layout with tighter section rhythm.
                      </p>
                    </div>
                  </div>

                  <AppleSwitch
                    id="toggle-compact-home-switch"
                    checked={compactHomeView}
                    onChange={handleToggleCompact}
                  />
                </div>
              </div>
            </div>

            {/* Close footer button */}
            <div className="pt-4 border-t border-white/[0.08] bg-[#0c0c14]/80 relative z-10 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-white/35">
                <span>SYSTEM CORE: v4.2.5</span>
                <span>STATUS: OPERATIONAL</span>
              </div>
              <button
                id="save-preferences-btn"
                onClick={onClose}
                className="w-full py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.18)] cursor-pointer"
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
