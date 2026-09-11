import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Sliders,
  MousePointer,
  Compass,
  LayoutGrid,
  MonitorSmartphone,
  Sparkles,
  Grid,
  Eye,
  CircleDot,
  Moon,
  SunMedium,
} from "lucide-react";
import { cn } from "../lib/utils";
import { DuneShaderStyle, DuneInteractionMode } from "./layout/PixelDunes";
import { RockLightColor } from "../types";

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
  rocksLightEnabled: boolean;
  setRocksLightEnabled: (val: boolean) => void;
  rocksLightColor: RockLightColor;
  setRocksLightColor: (val: RockLightColor) => void;
  footerDuneShader: DuneShaderStyle;
  setFooterDuneShader: (val: DuneShaderStyle) => void;
  footerPixelMode: DuneInteractionMode;
  setFooterPixelMode: (val: DuneInteractionMode) => void;
  footerPixelSize: number;
  setFooterPixelSize: (val: number) => void;
  footerPixelGlitch: boolean;
  setFooterPixelGlitch: (val: boolean) => void;
  footerPixelMonochrome: boolean;
  setFooterPixelMonochrome: (val: boolean) => void;
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
  rocksLightEnabled,
  setRocksLightEnabled,
  rocksLightColor,
  setRocksLightColor,
  footerDuneShader,
  setFooterDuneShader,
  footerPixelMode,
  setFooterPixelMode,
  footerPixelSize,
  setFooterPixelSize,
  footerPixelGlitch,
  setFooterPixelGlitch,
  footerPixelMonochrome,
  setFooterPixelMonochrome,
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
            className="fixed right-0 top-0 bottom-0 z-[160] w-full max-w-md liquid-glass !border-l !border-white/[0.12] !border-y-0 !border-r-0 shadow-[0_0_80px_rgba(0,0,0,0.9)] p-6 flex flex-col justify-between"
          >
            {/* Header Area */}
            <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pr-1">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[11px] bg-white/[0.06] border border-white/12 flex items-center justify-center text-white/80 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
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
                  className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.12] flex items-center justify-center text-white/70 hover:text-white transition-all border border-white/10 hover:border-white/20 cursor-pointer shadow-sm"
                  title="Close Preferences"
                >
                  <X size={14} strokeWidth={1.35} />
                </button>
              </div>

              {/* Layout Toggles */}
              <div className="space-y-3">
                {/* 1. Header Layout Selector (Horizontal vs Vertical) */}
                <div className="p-4 rounded-2xl liquid-glass-subtle border border-white/[0.09] space-y-3 shadow-sm">
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
                        "p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-0.5 transition-all duration-200 cursor-pointer",
                        headerLayout === "horizontal"
                          ? "bg-white/10 border-white/20 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                          : "bg-white/[0.02] border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
                      )}
                    >
                      <span className="text-[11px]">Top Notch Bar</span>
                      <span className="text-[9px] text-white/35 uppercase tracking-wider font-mono">Floating</span>
                    </button>
                    <button
                      id="nav-style-vertical-btn"
                      onClick={() => setHeaderLayout("vertical")}
                      className={cn(
                        "p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-0.5 transition-all duration-200 cursor-pointer",
                        headerLayout === "vertical"
                          ? "bg-white/10 border-white/20 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                          : "bg-white/[0.02] border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
                      )}
                    >
                      <span className="text-[11px]">Sidebar Notch</span>
                      <span className="text-[9px] text-white/35 uppercase tracking-wider font-mono">Docked</span>
                    </button>
                  </div>
                </div>

                {/* 2. Hide Custom Cursor Toggle */}
                <div className="flex items-center justify-between p-4 liquid-glass-subtle rounded-2xl border border-white/[0.09] shadow-sm">
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
                <div className="flex items-center justify-between p-4 liquid-glass-subtle rounded-2xl border border-white/[0.09] shadow-sm">
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
                <div className="flex items-center justify-between p-4 liquid-glass-subtle rounded-2xl border border-white/[0.09] shadow-sm">
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

                {/* 5. Rock Monolith Ambient Lighting */}
                <div className="p-4 rounded-2xl liquid-glass-subtle border border-white/[0.09] space-y-3.5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <SunMedium
                        className={cn(
                          "shrink-0 mt-0.5 transition-colors duration-200",
                          rocksLightEnabled
                            ? rocksLightColor === "purple"
                              ? "text-purple-400"
                              : "text-white"
                            : "text-white/40"
                        )}
                        size={16}
                        strokeWidth={1.35}
                      />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-semibold text-white tracking-tight">
                            Rock Monolith Light
                          </h4>
                          <span
                            className={cn(
                              "px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider transition-colors border",
                              rocksLightEnabled
                                ? rocksLightColor === "purple"
                                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                  : "bg-white/10 text-white border-white/20"
                                : "bg-white/[0.04] text-white/40 border-white/[0.08]"
                            )}
                          >
                            {rocksLightEnabled ? "Active" : "Disabled"}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50 max-w-[210px] leading-relaxed font-light">
                          Toggle ambient radiance and customize light aura color around hero rocks.
                        </p>
                      </div>
                    </div>

                    <AppleSwitch
                      id="toggle-rocks-light-switch"
                      checked={rocksLightEnabled}
                      onChange={() => setRocksLightEnabled(!rocksLightEnabled)}
                    />
                  </div>

                  {/* Color Selection Palette when Light is Enabled */}
                  {rocksLightEnabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="space-y-2 pt-2 border-t border-white/[0.06]"
                    >
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">
                          Lighting Tone & Spectrum
                        </label>
                        <span className="text-[10px] font-mono text-white/60">
                          {rocksLightColor === "purple" ? "Cosmic Purple" : "Lunar White"}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Option 1: Cosmic Purple */}
                        <button
                          id="rock-light-purple-btn"
                          type="button"
                          onClick={() => setRocksLightColor("purple")}
                          className={cn(
                            "p-2.5 rounded-xl border text-xs font-medium flex flex-col items-start gap-1 transition-all duration-200 cursor-pointer relative overflow-hidden text-left",
                            rocksLightColor === "purple"
                              ? "bg-purple-500/15 border-purple-500/40 text-white shadow-[0_0_15px_rgba(168,85,247,0.15),inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                              : "bg-white/[0.02] border-transparent text-white/45 hover:text-white/80 hover:bg-white/[0.05]"
                          )}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="flex items-center gap-1.5 font-medium text-[11px]">
                              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-400 shadow-[0_0_8px_rgba(168,85,247,0.8)] shrink-0" />
                              <span>Cosmic Purple</span>
                            </span>
                            {rocksLightColor === "purple" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                            )}
                          </div>
                          <span className="text-[9px] text-white/40 font-mono tracking-wider">
                            Ultraviolet Aura
                          </span>
                        </button>

                        {/* Option 2: Lunar White */}
                        <button
                          id="rock-light-white-btn"
                          type="button"
                          onClick={() => setRocksLightColor("white")}
                          className={cn(
                            "p-2.5 rounded-xl border text-xs font-medium flex flex-col items-start gap-1 transition-all duration-200 cursor-pointer relative overflow-hidden text-left",
                            rocksLightColor === "white"
                              ? "bg-white/10 border-white/30 text-white shadow-[0_0_15px_rgba(255,255,255,0.15),inset_0_1px_0_0_rgba(255,255,255,0.2)]"
                              : "bg-white/[0.02] border-transparent text-white/45 hover:text-white/80 hover:bg-white/[0.05]"
                          )}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="flex items-center gap-1.5 font-medium text-[11px]">
                              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-white via-slate-200 to-slate-400 shadow-[0_0_8px_rgba(255,255,255,0.9)] shrink-0" />
                              <span>Lunar White</span>
                            </span>
                            {rocksLightColor === "white" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            )}
                          </div>
                          <span className="text-[9px] text-white/40 font-mono tracking-wider">
                            Soft Silver Blite
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* 6. Footer Dunes Visuals & Shader FX Section */}
                <div className="p-4 rounded-2xl liquid-glass-subtle border border-white/[0.09] space-y-3.5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Sparkles className="text-purple-400 shrink-0 mt-0.5" size={16} strokeWidth={1.35} />
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-white tracking-tight">
                          Footer Dunes Visuals
                        </h4>
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          Shader FX
                        </span>
                      </div>
                      <p className="text-[11px] text-white/50 leading-relaxed font-light">
                        Choose between retro halftone dots, 8-bit pixels, or obsidian dark silhouette dunes.
                      </p>
                    </div>
                  </div>

                  {/* 1. Shader Effect Style (Pixel, Halftone Dots, Obsidian Dark) */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">
                      Visual Style
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        id="dune-shader-pixel-btn"
                        type="button"
                        onClick={() => setFooterDuneShader("pixel")}
                        className={cn(
                          "p-2 rounded-xl border text-xs font-medium flex flex-col items-center gap-0.5 transition-all duration-200 cursor-pointer text-center",
                          footerDuneShader === "pixel"
                            ? "bg-purple-500/20 border-purple-500/40 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                            : "bg-white/[0.02] border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
                        )}
                      >
                        <span className="text-[10px] flex items-center gap-1 font-medium">
                          <Grid size={11} className={footerDuneShader === "pixel" ? "text-purple-300" : "text-white/40"} />
                          <span>8-Bit Pixel</span>
                        </span>
                        <span className="text-[8px] text-white/35 uppercase tracking-wider font-mono">Mosaic</span>
                      </button>

                      <button
                        id="dune-shader-halftone-btn"
                        type="button"
                        onClick={() => setFooterDuneShader("halftone")}
                        className={cn(
                          "p-2 rounded-xl border text-xs font-medium flex flex-col items-center gap-0.5 transition-all duration-200 cursor-pointer text-center",
                          footerDuneShader === "halftone"
                            ? "bg-purple-500/20 border-purple-500/40 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                            : "bg-white/[0.02] border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
                        )}
                      >
                        <span className="text-[10px] flex items-center gap-1 font-medium">
                          <CircleDot size={11} className={footerDuneShader === "halftone" ? "text-purple-300" : "text-white/40"} />
                          <span>Halftone</span>
                        </span>
                        <span className="text-[8px] text-white/35 uppercase tracking-wider font-mono">Dot Matrix</span>
                      </button>

                      <button
                        id="dune-shader-dark-btn"
                        type="button"
                        onClick={() => setFooterDuneShader("dark")}
                        className={cn(
                          "p-2 rounded-xl border text-xs font-medium flex flex-col items-center gap-0.5 transition-all duration-200 cursor-pointer text-center",
                          footerDuneShader === "dark"
                            ? "bg-purple-500/20 border-purple-500/40 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                            : "bg-white/[0.02] border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
                        )}
                      >
                        <span className="text-[10px] flex items-center gap-1 font-medium">
                          <Moon size={11} className={footerDuneShader === "dark" ? "text-purple-300" : "text-white/40"} />
                          <span>Dark Mode</span>
                        </span>
                        <span className="text-[8px] text-white/35 uppercase tracking-wider font-mono">Silhouette</span>
                      </button>
                    </div>
                  </div>

                  {/* 2. Interaction Mode (Soft Spotlight Lens, Full Effect, Original HD) */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-wider block">
                      Spotlight & Display Mode
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        id="footer-mode-lens-btn"
                        type="button"
                        onClick={() => setFooterPixelMode("lens")}
                        className={cn(
                          "p-2 rounded-xl border text-xs font-medium flex flex-col items-center gap-0.5 transition-all duration-200 cursor-pointer text-center",
                          footerPixelMode === "lens"
                            ? "bg-purple-500/20 border-purple-500/40 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                            : "bg-white/[0.02] border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
                        )}
                      >
                        <span className="text-[10px] flex items-center gap-1 font-medium">
                          <Sparkles size={10} className={footerPixelMode === "lens" ? "text-purple-300" : "text-white/40"} />
                          <span>Soft Lens</span>
                        </span>
                        <span className="text-[8px] text-white/35 uppercase tracking-wider font-mono">Hover HD</span>
                      </button>

                      <button
                        id="footer-mode-full-btn"
                        type="button"
                        onClick={() => setFooterPixelMode("full")}
                        className={cn(
                          "p-2 rounded-xl border text-xs font-medium flex flex-col items-center gap-0.5 transition-all duration-200 cursor-pointer text-center",
                          footerPixelMode === "full"
                            ? "bg-purple-500/20 border-purple-500/40 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                            : "bg-white/[0.02] border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
                        )}
                      >
                        <span className="text-[10px] flex items-center gap-1 font-medium">
                          <Grid size={10} className={footerPixelMode === "full" ? "text-purple-300" : "text-white/40"} />
                          <span>Full FX</span>
                        </span>
                        <span className="text-[8px] text-white/35 uppercase tracking-wider font-mono">Constant</span>
                      </button>

                      <button
                        id="footer-mode-hd-btn"
                        type="button"
                        onClick={() => setFooterPixelMode("hd")}
                        className={cn(
                          "p-2 rounded-xl border text-xs font-medium flex flex-col items-center gap-0.5 transition-all duration-200 cursor-pointer text-center",
                          footerPixelMode === "hd"
                            ? "bg-purple-500/20 border-purple-500/40 text-white font-semibold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]"
                            : "bg-white/[0.02] border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.05]"
                        )}
                      >
                        <span className="text-[10px] flex items-center gap-1 font-medium">
                          <Eye size={10} className={footerPixelMode === "hd" ? "text-purple-300" : "text-white/40"} />
                          <span>Original</span>
                        </span>
                        <span className="text-[8px] text-white/35 uppercase tracking-wider font-mono">Crisp HD</span>
                      </button>
                    </div>
                  </div>

                  {/* 3. Detailed Modifiers (Glitch Animation, Dark Monochromatic Shade, Density) */}
                  {footerPixelMode !== "hd" && (
                    <div className="space-y-3 pt-2.5 border-t border-white/[0.06]">
                      {/* Glitch & Micro-Shimmer Animation Toggle */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-medium text-white/90">Glitch & Micro-Shimmer</p>
                          <p className="text-[10px] text-white/45">Periodic slice vibrations across dunes</p>
                        </div>
                        <AppleSwitch
                          id="toggle-dunes-glitch-switch"
                          checked={footerPixelGlitch}
                          onChange={() => setFooterPixelGlitch(!footerPixelGlitch)}
                        />
                      </div>

                      {/* Dark Monochromatic Shade Toggle (if not in Obsidian dark mode) */}
                      {footerDuneShader !== "dark" && (
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <p className="text-[11px] font-medium text-white/90">Dark Monochromatic Shade</p>
                            <p className="text-[10px] text-white/45">Stylized obsidian tint; hover reveals vivid HD</p>
                          </div>
                          <AppleSwitch
                            id="toggle-dunes-mono-switch"
                            checked={footerPixelMonochrome}
                            onChange={() => setFooterPixelMonochrome(!footerPixelMonochrome)}
                          />
                        </div>
                      )}

                      {/* Pattern Density / Block Size (for Pixel & Halftone) */}
                      {footerDuneShader !== "dark" && (
                        <div className="flex items-center justify-between pt-0.5">
                          <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                            {footerDuneShader === "halftone" ? "Dot Grid Spacing" : "Pixel Block Size"}
                          </span>
                          <div className="inline-flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                            {[
                              { label: "6px", value: 6, hint: "Micro" },
                              { label: "8px", value: 8, hint: "Fine" },
                              { label: "12px", value: 12, hint: "Classic" },
                              { label: "16px", value: 16, hint: "Chunky" },
                              { label: "20px", value: 20, hint: "Bold" },
                            ].map((item) => (
                              <button
                                key={item.value}
                                id={`pixel-density-${item.value}-btn`}
                                type="button"
                                onClick={() => setFooterPixelSize(item.value)}
                                className={cn(
                                  "px-2 py-0.5 rounded-md text-[10px] font-mono transition-all cursor-pointer",
                                  footerPixelSize === item.value
                                    ? "bg-purple-500/30 text-purple-200 font-semibold border border-purple-500/40 shadow-xs"
                                    : "text-white/40 hover:text-white"
                                )}
                                title={`${item.label} (${item.hint})`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Centered System Status Badge before the bottom divider */}
              <div className="pt-3 pb-1 flex justify-center text-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-white/40 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SYSTEM CORE: v4.2.5 // ALL SYSTEMS NOMINAL</span>
                </div>
              </div>
            </div>

            {/* Close footer button */}
            <div className="pt-4 border-t border-white/[0.08]">
              <button
                id="save-preferences-btn"
                onClick={onClose}
                className="w-full py-3 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer shadow-[0_4px_16px_rgba(255,255,255,0.15)] hover:scale-[1.01] active:scale-[0.99]"
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

