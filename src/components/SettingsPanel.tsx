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

// Apple iOS / macOS Style Clean Minimal Switch
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
        "w-11 h-6 rounded-full p-0.5 transition-all duration-200 focus:outline-none relative cursor-pointer select-none",
        checked
          ? "bg-white"
          : "bg-white/[0.15] hover:bg-white/[0.22]"
      )}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 600, damping: 35 }}
        className={cn(
          "w-5 h-5 rounded-full shadow-sm",
          checked ? "bg-black translate-x-5" : "bg-white translate-x-0"
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
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 z-[160] w-full max-w-md bg-[#09090d]/95 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.85)] p-6 flex flex-col justify-between"
          >
            {/* Header Area */}
            <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pr-1">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/80">
                    <Sliders size={15} strokeWidth={1.35} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white tracking-tight">
                      Preferences
                    </h3>
                    <p className="text-[10px] text-white/40 font-mono uppercase tracking-wider">
                      Abdulrahman-T // OS
                    </p>
                  </div>
                </div>
                <button
                  id="close-settings-drawer-btn"
                  onClick={onClose}
                  className="w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10 cursor-pointer"
                  title="Close Preferences"
                >
                  <X size={14} strokeWidth={1.35} />
                </button>
              </div>

              {/* Layout Toggles */}
              <div className="space-y-3">
                {/* 1. Header Layout Selector (Horizontal vs Vertical) */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                  <div className="flex items-start gap-3">
                    <LayoutGrid className="text-white/70 shrink-0 mt-0.5" size={16} strokeWidth={1.35} />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-semibold text-white tracking-tight">
                        Navigation Interface
                      </h4>
                      <p className="text-[11px] text-white/50 leading-relaxed font-light">
                        Choose between the floating top notch bar or docked sidebar.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      id="nav-style-horizontal-btn"
                      onClick={() => setHeaderLayout("horizontal")}
                      className={cn(
                        "p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-0.5 transition-all duration-150 cursor-pointer",
                        headerLayout === "horizontal"
                          ? "bg-white/10 border-white/20 text-white font-semibold shadow-sm"
                          : "bg-white/[0.02] border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                      )}
                    >
                      <span className="text-[11px]">Top Notch Bar</span>
                      <span className="text-[9px] text-white/35 uppercase tracking-wider font-mono">Floating</span>
                    </button>
                    <button
                      id="nav-style-vertical-btn"
                      onClick={() => setHeaderLayout("vertical")}
                      className={cn(
                        "p-2.5 rounded-lg border text-xs font-medium flex flex-col items-center gap-0.5 transition-all duration-150 cursor-pointer",
                        headerLayout === "vertical"
                          ? "bg-white/10 border-white/20 text-white font-semibold shadow-sm"
                          : "bg-white/[0.02] border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                      )}
                    >
                      <span className="text-[11px]">Sidebar Notch</span>
                      <span className="text-[9px] text-white/35 uppercase tracking-wider font-mono">Docked</span>
                    </button>
                  </div>
                </div>

                {/* 2. Hide Custom Cursor Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.08]">
                  <div className="flex gap-3">
                    <MousePointer className="text-white/70 shrink-0 mt-0.5" size={16} strokeWidth={1.35} />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-semibold text-white tracking-tight">
                        Fluid Cursor
                      </h4>
                      <p className="text-[11px] text-white/50 max-w-[210px] leading-relaxed font-light">
                        Enable interactive fluid magnetic cursor.
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
                <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.08]">
                  <div className="flex gap-3">
                    <Compass className="text-white/70 shrink-0 mt-0.5" size={16} strokeWidth={1.35} />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-semibold text-white tracking-tight">
                        Smooth Scroll
                      </h4>
                      <p className="text-[11px] text-white/50 max-w-[210px] leading-relaxed font-light">
                        Enable inertia physics on view scrolling.
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
                <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl border border-white/[0.08]">
                  <div className="flex gap-3">
                    <MonitorSmartphone className="text-white/70 shrink-0 mt-0.5" size={16} strokeWidth={1.35} />
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-semibold text-white tracking-tight">
                        Compact Home View
                      </h4>
                      <p className="text-[11px] text-white/50 max-w-[210px] leading-relaxed font-light">
                        Streamlines section spacing across the layout.
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
            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-white/35">
                <span>SYSTEM CORE: v4.2.5</span>
                <span>STATUS: OPERATIONAL</span>
              </div>
              <button
                id="save-preferences-btn"
                onClick={onClose}
                className="w-full py-3 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-medium tracking-tight transition-all duration-200 cursor-pointer shadow-sm"
              >
                Done
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

