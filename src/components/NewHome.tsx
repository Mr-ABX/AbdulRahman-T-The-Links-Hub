import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MedusaImage } from "./MedusaImage";
import { SpecularCard } from "./shared/SpecularCard";
import { ASSET_LINKS } from "../constants/assets";
import { GitHubGraph } from "./GitHubGraph";
import { Portfolio3D } from "./Portfolio3D";
import { cn } from "../lib/utils";
import { RockLightColor, RockLightIntensity } from "../types";
import { reviews } from "../constants/data";
import {
  ArrowRight,
  Monitor,
  Paintbrush,
  PlayCircle,
  Rss,
  ArrowUpRight,
  Zap,
  Target,
  Star,
  Brain,
  Sparkles,
  ExternalLink,
  Globe,
  Layers,
  Calendar,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  Check,
  ChevronDown,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
} from "lucide-react";

const myArea51Image = "/my-image-for-home-01.jpeg";

const HeroTitleLine = ({ 
  text, 
  variant = "black", 
  className 
}: { 
  text: string; 
  variant?: "black" | "normal"; 
  className?: string;
}) => (
  <span 
    className={`
      block w-full text-center 
      text-[clamp(2.5rem,11vw,150px)] 
      ${variant === "black" ? "font-[900]" : "font-[400]"} 
      leading-[0.8] tracking-[-0.04em] 
      overflow-visible py-2
      ${className}
    `}
  >
    {text}
  </span>
);

interface AppleSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

const AppleSelect = ({ label, value, options, onChange }: AppleSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="space-y-1.5 relative" ref={dropdownRef}>
      <label className="text-[11px] font-mono uppercase tracking-wider text-white/60 block">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 text-xs sm:text-sm text-white bg-white/[0.04] hover:bg-white/[0.07] rounded-full border border-white/15 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all flex items-center justify-between cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          size={14}
          className={`text-white/40 transition-transform duration-200 shrink-0 ml-2 ${isOpen ? "rotate-180 text-purple-400" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full left-0 right-0 mt-1.5 z-50 p-1.5 rounded-2xl bg-[#0d0d18]/95 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col gap-0.5 max-h-60 overflow-y-auto"
          >
            {options.map((opt) => {
              const isSelected = opt === value;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm text-left flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? "bg-purple-500/20 text-white font-medium shadow-sm"
                      : "text-white/70 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <span className="truncate">{opt}</span>
                  {isSelected && <Check size={14} className="text-purple-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LiquidCapsule = ({
  color1,
  color2,
  className,
  showOnMobile = false,
}: {
  color1: string;
  color2: string;
  className?: string;
  showOnMobile?: boolean;
}) => {
  const gradientId = `gradient-${color1.replace(/[^a-zA-Z0-9]/g, "")}-${color2.replace(/[^a-zA-Z0-9]/g, "")}`;
  return (
    <div
      className={cn(
        "w-10 sm:w-12 h-4 sm:h-5 rounded-full overflow-hidden relative shadow-[0_0_15px_rgba(255,255,255,0.12)] shrink-0",
        !showOnMobile && "hidden sm:block",
        className
      )}
    >
      <svg
        width="48"
        height="20"
        viewBox="0 0 48 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        <rect width="48" height="20" fill={`url(#${gradientId})`} />
        <defs>
          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="48"
            y2="20"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={color1} />
            <stop offset="1" stopColor={color2} />
          </linearGradient>
        </defs>
      </svg>
      <div
        className="absolute inset-0 opacity-45 mix-blend-overlay"
        style={{ filter: "url(#rock-liquid-glitch)" }}
      />
    </div>
  );
};

export const Home = ({
  projects,
  setActiveTab,
  rocksLightEnabled = true,
  rocksLightColor = "purple",
  rocksLightIntensity = "balanced",
}: {
  projects: any[];
  setActiveTab: (tab: string) => void;
  rocksLightEnabled?: boolean;
  rocksLightColor?: RockLightColor;
  rocksLightIntensity?: RockLightIntensity;
}) => {
  const PROJECT_TYPE_OPTIONS = [
    "Full-Stack Web & App",
    "UI/UX & Product Design",
    "3D & Interactive Web",
    "AI Automation & Cloud",
    "Other / Custom Scope",
  ];

  const BUDGET_OPTIONS = [
    "$2.5k – $5k",
    "$5k – $10k",
    "$10k+",
    "Flexible / Advisory",
  ];

  // Dynamic Intensity-Responsive Rock Monolith Lighting Styles
  const leftGlowGradient =
    rocksLightColor === "purple"
      ? rocksLightIntensity === "subtle"
        ? "bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.12)_0%,rgba(99,102,241,0.04)_45%,transparent_70%)]"
        : rocksLightIntensity === "vibrant"
        ? "bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.36)_0%,rgba(99,102,241,0.18)_50%,transparent_75%)]"
        : "bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.22)_0%,rgba(99,102,241,0.09)_45%,transparent_70%)]"
      : rocksLightIntensity === "subtle"
      ? "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(203,213,225,0.03)_45%,transparent_70%)]"
      : rocksLightIntensity === "vibrant"
      ? "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.28)_0%,rgba(203,213,225,0.14)_50%,transparent_75%)]"
      : "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16)_0%,rgba(203,213,225,0.07)_45%,transparent_70%)]";

  const rightGlowGradient =
    rocksLightColor === "purple"
      ? rocksLightIntensity === "subtle"
        ? "bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12)_0%,rgba(168,85,247,0.04)_45%,transparent_70%)]"
        : rocksLightIntensity === "vibrant"
        ? "bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.36)_0%,rgba(168,85,247,0.18)_50%,transparent_75%)]"
        : "bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.22)_0%,rgba(168,85,247,0.09)_45%,transparent_70%)]"
      : rocksLightIntensity === "subtle"
      ? "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,rgba(203,213,225,0.03)_45%,transparent_70%)]"
      : rocksLightIntensity === "vibrant"
      ? "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.28)_0%,rgba(203,213,225,0.14)_50%,transparent_75%)]"
      : "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16)_0%,rgba(203,213,225,0.07)_45%,transparent_70%)]";

  const rockBaseDropShadow = !rocksLightEnabled
    ? "drop-shadow-[0_24px_45px_rgba(0,0,0,0.85)]"
    : rocksLightColor === "purple"
    ? rocksLightIntensity === "subtle"
      ? "drop-shadow-[0_0_8px_rgba(168,85,247,0.12)] drop-shadow-[0_24px_45px_rgba(0,0,0,0.85)]"
      : rocksLightIntensity === "vibrant"
      ? "drop-shadow-[0_0_26px_rgba(168,85,247,0.45)] drop-shadow-[0_0_8px_rgba(192,132,252,0.3)] drop-shadow-[0_24px_45px_rgba(0,0,0,0.85)]"
      : "drop-shadow-[0_0_16px_rgba(168,85,247,0.28)] drop-shadow-[0_24px_45px_rgba(0,0,0,0.85)]"
    : rocksLightIntensity === "subtle"
    ? "drop-shadow-[0_0_6px_rgba(255,255,255,0.08)] drop-shadow-[0_24px_45px_rgba(0,0,0,0.85)]"
    : rocksLightIntensity === "vibrant"
    ? "drop-shadow-[0_0_22px_rgba(255,255,255,0.38)] drop-shadow-[0_0_6px_rgba(226,232,240,0.3)] drop-shadow-[0_24px_45px_rgba(0,0,0,0.85)]"
    : "drop-shadow-[0_0_14px_rgba(255,255,255,0.22)] drop-shadow-[0_24px_45px_rgba(0,0,0,0.85)]";

  const rockObsidianDropShadow = !rocksLightEnabled
    ? "drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
    : rocksLightColor === "purple"
    ? rocksLightIntensity === "subtle"
      ? "drop-shadow-[0_0_16px_rgba(168,85,247,0.25)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
      : rocksLightIntensity === "vibrant"
      ? "drop-shadow-[0_0_40px_rgba(168,85,247,0.65)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
      : "drop-shadow-[0_0_28px_rgba(168,85,247,0.45)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
    : rocksLightIntensity === "subtle"
    ? "drop-shadow-[0_0_12px_rgba(255,255,255,0.15)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
    : rocksLightIntensity === "vibrant"
    ? "drop-shadow-[0_0_34px_rgba(255,255,255,0.50)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
    : "drop-shadow-[0_0_24px_rgba(255,255,255,0.35)] drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]";

  const [inquiryType, setInquiryType] = useState("Full-Stack Web & App");
  const [customInquiry, setCustomInquiry] = useState("");
  const [budgetRange, setBudgetRange] = useState("$5k – $10k");
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isReviewPaused, setIsReviewPaused] = useState(false);

  // Apple HIG Pro Auto-Scroll Carousel Timer
  useEffect(() => {
    if (isReviewPaused) return;
    const timer = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isReviewPaused]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    consent: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  return (
    <div className="w-full relative min-h-screen text-white overflow-hidden pb-0 bg-transparent">
      {/* SVG Liquid Glitch & Obsidian Displacement Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="rock-liquid-glitch" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="2" result="noise">
            <animate attributeName="baseFrequency" dur="8s" values="0.04 0.08; 0.07 0.04; 0.04 0.08" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* 1. Hero Section */}
      <section className="pt-28 sm:pt-36 md:pt-44 lg:pt-48 pb-14 flex flex-col items-center justify-center text-center max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        {/* Apple HIG Micro Pill with Zoomed Avatar, Dark-Silver Liquid Capsule, and Monospace Studio Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-[#0d0d18]/90 hover:bg-[#141424]/95 border border-white/[0.14] hover:border-white/25 backdrop-blur-2xl transition-all duration-300 group cursor-default shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.6)]">
            {/* Zoomed Avatar - Framed to Face with Translucent Glass Rim (Harsh White Border Removed) */}
            <div className="w-6 h-6 rounded-full bg-black/60 border border-white/20 overflow-hidden flex items-center justify-center shrink-0 shadow-inner relative">
              <img
                src="/my-image-for-home-01.jpeg"
                alt="Abdulrahman"
                className="w-full h-full object-cover scale-[1.38] object-[50%_20%]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = ASSET_LINKS.myPfp;
                }}
              />
            </div>

            {/* Apple-style Dark & Metallic Silver Liquid Capsule */}
            <LiquidCapsule
              color1="#1E293B"
              color2="#CBD5E1"
              showOnMobile={true}
              className="w-8 sm:w-9 h-3.5 sm:h-4 shadow-[0_0_12px_rgba(203,213,225,0.25)] border border-white/10"
            />

            <span className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-white/90 group-hover:text-white transition-colors">
              Studio // Abdulrahman-T
            </span>
          </div>
        </motion.div>

        {/* Hero Title Container with Rock Assets flanking the headline */}
        <div className="relative w-full max-w-[1150px] flex items-center justify-center mb-8">
          {/* Left Rock Asset - Layered Behind Text with Ambient Glow and Interactive Obsidian Liquid Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            whileHover={{ scale: 1.06, rotate: -3, y: -6, transition: { type: "spring", stiffness: 280, damping: 16 } }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="hidden md:block absolute -left-5 lg:-left-12 xl:-left-20 top-1/2 -translate-y-[52%] w-44 md:w-52 lg:w-68 xl:w-76 pointer-events-auto cursor-pointer select-none z-0 group"
            title="Interact with Left Monolith Rock"
          >
            {/* Ambient Glow Field (Controlled by Settings & Intensity) */}
            {rocksLightEnabled && (
              <div
                className={cn(
                  "absolute inset-2 -z-10 rounded-full blur-xl transition-all duration-700 pointer-events-none group-hover:scale-105 group-hover:opacity-100",
                  leftGlowGradient
                )}
              />
            )}

            {/* Base Natural Rock with Clean Natural Specular Contour */}
            <motion.img
              src="/rock-left-1000.webp"
              alt=""
              animate={{ y: [-8, 8, -8], rotate: [-1.2, 1.2, -1.2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className={cn(
                "w-full h-auto object-contain filter brightness-100 contrast-105 group-hover:opacity-15 transition-all duration-300",
                rockBaseDropShadow
              )}
            />

            {/* Super-Black Obsidian Liquid Reveal Layer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center">
              <motion.img
                src="/rock-left-1000.webp"
                alt=""
                animate={{ y: [-8, 8, -8], rotate: [-1.2, 1.2, -1.2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "w-full h-auto object-contain transition-all duration-300",
                  rockObsidianDropShadow
                )}
                style={{
                  filter: "url(#rock-liquid-glitch) grayscale(100%) contrast(450%) brightness(12%)",
                }}
              />
              {/* Halftone Dot Matrix Texture Overlay */}
              <div
                className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none"
                style={{
                  backgroundImage:
                    rocksLightColor === "purple"
                      ? "radial-gradient(rgba(192, 132, 252, 0.6) 1px, transparent 1px)"
                      : "radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)",
                  backgroundSize: "5px 5px",
                }}
              />
              {/* Monolith Holographic Badge */}
              <span
                className={cn(
                  "absolute -bottom-4 px-2.5 py-0.5 rounded-full bg-black/85 text-[9px] font-mono tracking-widest uppercase shadow-md backdrop-blur-md transition-colors",
                  rocksLightColor === "purple"
                    ? "border border-purple-400/40 text-purple-300"
                    : "border border-white/30 text-white/90 shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                )}
              >
                OBSIDIAN CORE // 01
              </span>
            </div>
          </motion.div>

          {/* Right Rock Asset - Layered Behind Text with Ambient Glow and Interactive Obsidian Liquid Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            whileHover={{ scale: 1.06, rotate: 3, y: -6, transition: { type: "spring", stiffness: 280, damping: 16 } }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="hidden md:block absolute -right-5 lg:-right-12 xl:-right-20 top-1/2 -translate-y-[48%] w-44 md:w-52 lg:w-68 xl:w-76 pointer-events-auto cursor-pointer select-none z-0 group"
            title="Interact with Right Monolith Rock"
          >
            {/* Ambient Glow Field (Controlled by Settings & Intensity) */}
            {rocksLightEnabled && (
              <div
                className={cn(
                  "absolute inset-2 -z-10 rounded-full blur-xl transition-all duration-700 pointer-events-none group-hover:scale-105 group-hover:opacity-100",
                  rightGlowGradient
                )}
              />
            )}

            {/* Base Natural Rock with Clean Natural Specular Contour */}
            <motion.img
              src="/rock-right-1000.webp"
              alt=""
              animate={{ y: [8, -8, 8], rotate: [1.2, -1.2, 1.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className={cn(
                "w-full h-auto object-contain filter brightness-100 contrast-105 group-hover:opacity-15 transition-all duration-300",
                rockBaseDropShadow
              )}
            />

            {/* Super-Black Obsidian Liquid Reveal Layer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center">
              <motion.img
                src="/rock-right-1000.webp"
                alt=""
                animate={{ y: [8, -8, 8], rotate: [1.2, -1.2, 1.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className={cn(
                  "w-full h-auto object-contain transition-all duration-300",
                  rockObsidianDropShadow
                )}
                style={{
                  filter: "url(#rock-liquid-glitch) grayscale(100%) contrast(450%) brightness(12%)",
                }}
              />
              {/* Halftone Dot Matrix Texture Overlay */}
              <div
                className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none"
                style={{
                  backgroundImage:
                    rocksLightColor === "purple"
                      ? "radial-gradient(rgba(192, 132, 252, 0.6) 1px, transparent 1px)"
                      : "radial-gradient(rgba(255, 255, 255, 0.6) 1px, transparent 1px)",
                  backgroundSize: "5px 5px",
                }}
              />
              {/* Monolith Holographic Badge */}
              <span
                className={cn(
                  "absolute -bottom-4 px-2.5 py-0.5 rounded-full bg-black/85 text-[9px] font-mono tracking-widest uppercase shadow-md backdrop-blur-md transition-colors",
                  rocksLightColor === "purple"
                    ? "border border-purple-400/40 text-purple-300"
                    : "border border-white/30 text-white/90 shadow-[0_0_8px_rgba(255,255,255,0.1)]"
                )}
              >
                OBSIDIAN CORE // 02
              </span>
            </div>
          </motion.div>

          {/* Central Typography - Layered On Top */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-10 w-full"
          >
            <h1 className="flex w-full flex-col items-center justify-center text-white">
              <HeroTitleLine text="UNLEASH YOUR" variant="black" />
              <HeroTitleLine text="IMAGINATION" variant="normal" className="-mt-2 md:-mt-4 text-white/80" />
            </h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-xl mx-auto"
        >
          {/* Think. Make. Solve. clean text in brand purple shade */}
          <p className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-purple-300/90 mb-3.5 font-semibold">
            Think. Make. Solve.
          </p>
          <p className="text-white/70 text-sm md:text-base font-normal leading-relaxed mb-8 max-w-lg mx-auto">
            Empowering human connection through deliberate design, spatial interfaces, and autonomous systems.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => setActiveTab("Projects")}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold tracking-tight text-xs uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.18)] cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight size={14} className="stroke-[2.5]" />
            </button>
            <button
              onClick={() => setActiveTab("Connect")}
              className="px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white/80 hover:text-white font-semibold tracking-tight text-xs transition-all border border-white/10 hover:border-white/20 cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </motion.div>

        {/* Logos Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full flex justify-center items-center gap-6 md:gap-12 mt-20 flex-wrap opacity-35 hover:opacity-70 transition-opacity duration-500"
        >
          {["Plotnao", "Jangle", "Junno", "Innovative", "Cherry"].map(
            (logo, i) => (
              <div
                key={i}
                className="text-base md:text-lg font-bold tracking-widest uppercase flex items-center gap-2 text-white"
              >
                <div className="w-4 h-4 rounded-md bg-white/15 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                {logo}
              </div>
            ),
          )}
        </motion.div>
      </section>

      {/* Featured Showcase: AB-Folio Experience Portal V2 (Apple HIG Minimal Decent Pill) */}
      <section className="py-6 max-w-[1100px] mx-auto px-4 md:px-8 relative z-20 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-2xl"
        >
          <a
            id="portal-minimal-pill"
            href="https://ab-folio-portal-v2.vercel.app/"
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-center justify-between gap-4 px-5 py-3 rounded-full bg-[#0d0d14]/90 hover:bg-white/[0.08] backdrop-blur-2xl border border-white/10 hover:border-white/20 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.12)] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span className="flex h-2.5 w-2.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div className="text-left truncate">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                    AB-Folio Experience Portal V2
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-white/[0.08] border border-white/10 text-white/70">
                    3D Spatial Lab
                  </span>
                </div>
                <p className="text-[11px] text-white/50 truncate hidden sm:block">
                  Next-generation interactive 3D spatial showcase & audio canvas
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black font-semibold text-xs tracking-tight shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles size={13} className="text-black" />
              <span>Launch Portal</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </motion.div>
      </section>

      {/* 2. Area 51 (About) */}
      <section className="py-20 md:py-28 max-w-[1200px] mx-auto px-4 md:px-8 border-t border-white/5 relative">
        <div className="flex flex-col md:flex-row md:items-stretch gap-10 md:gap-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="w-full md:w-1/2 flex flex-col justify-between"
          >
            <div className="relative rounded-3xl w-full h-full min-h-[460px] md:min-h-[580px] overflow-hidden border border-white/10 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.15)] group bg-[#0d0d14] flex flex-col justify-end">
              <img
                src={myArea51Image}
                alt="Area 51 - Abdulrahman Toor"
                className="absolute inset-0 w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="relative z-10 m-4 sm:m-6 p-4 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/15 flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-white font-semibold text-xs tracking-tight">Abdulrahman Toor</p>
                  <p className="text-white/50 text-[10px] font-mono uppercase tracking-wider">Creator & Architect</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">Available for Work</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="w-full md:w-1/2 flex flex-col justify-between"
          >
            <div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <LiquidCapsule color1="#8B5CF6" color2="#3B82F6" />
                  <span className="text-xs font-mono tracking-widest uppercase text-white/50">02 // Personal Lab & Studio</span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  My Area 51
                  <span className="block text-white/50 text-2xl sm:text-3xl md:text-4xl font-normal mt-1">
                    Creative Studio & Lab
                  </span>
                </h2>
              </div>

              <p className="text-white/80 leading-relaxed font-normal text-sm md:text-base border-l-2 border-white/20 pl-6 mb-6">
                Hi! Abdulrahman-T this side. I'm empowering human connection
                through design, cross-platform adventures & user-friendly
                solutions. I ignite engagement that leaves a lasting impression.
                Ready for accuracy, impact, and a soaring return on investment?
              </p>

              <div className="p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/10 relative shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] mb-6">
                <p className="text-white/70 font-sans text-xs sm:text-sm text-left relative z-10 leading-relaxed italic">
                  "Design is the bridge that connects creativity and functionality,
                  resulting in beautiful solutions that solve real-world problems."
                </p>
                <div className="mt-3 text-left text-[11px] font-mono font-bold text-white/40 uppercase tracking-widest">
                  — Abdulrahman-T
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0 pt-2">
              <GitHubGraph />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Services / Capabilities */}
      <section className="py-24 md:py-32 max-w-[1250px] mx-auto px-4 md:px-8 relative">
        {/* Apple HIG Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LiquidCapsule color1="#C084FC" color2="#EC4899" />
            <span className="text-xs font-mono tracking-widest uppercase text-white/50">03 // Capabilities & Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Engineered for Velocity. Crafted for Impact.
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            Full-stack architectural precision, autonomous AI integration, bespoke UI/UX, and high-conversion brand mechanics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {[
            {
              title: "UI/UX Design",
              desc: "Designing captivating and user-friendly interfaces that keep your audience hooked.",
              icon: <Monitor size={18} strokeWidth={1.35} />,
            },
            {
              title: "Graphic Design",
              desc: "Visually striking graphics that communicate your brand's message with a lasting impression.",
              icon: <Paintbrush size={18} strokeWidth={1.35} />,
            },
            {
              title: "Video & Motion Graphics",
              desc: "Dynamics that ignite your audience's imagination and connect them on a deeper level.",
              icon: <PlayCircle size={18} strokeWidth={1.35} />,
            },
            {
              title: "Digital Strategy",
              desc: "Digital solutions that optimize your online presence and maximize your return on effort.",
              icon: <Target size={18} strokeWidth={1.35} />,
            },
            {
              title: "Web Engineering",
              desc: "Websites with great user experiences, drive growth and elevate your brand in the digital sphere.",
              icon: <Rss size={18} strokeWidth={1.35} />,
            },
            {
              title: "AI Automation",
              desc: "Intelligent systems that automate tasks, scaling your operations to new heights.",
              icon: <Brain size={18} strokeWidth={1.35} />,
            },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <SpecularCard
                id={`service-card-${s.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="p-7 h-full flex flex-col justify-between group cursor-default"
                glowColor="rgba(255, 255, 255, 0.06)"
              >
                <div>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-5 bg-white/[0.03] border border-white/[0.06] text-white/35 group-hover:text-white/80 group-hover:border-white/15 transition-all duration-300"
                  >
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-bold tracking-tight mb-2 text-white/95">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40 group-hover:text-white/70 transition-colors">
                  <span>0{i + 1} // CAPABILITY</span>
                  <ArrowRight size={13} strokeWidth={1.35} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </SpecularCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            id="all-services-cta-btn"
            onClick={() => setActiveTab("Services")}
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-tight transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Explore All Services</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* 4. Portfolio */}
      <section className="py-24 md:py-32 max-w-[1400px] mx-auto px-4 md:px-8 relative border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LiquidCapsule color1="#10B981" color2="#0EA5E9" />
            <span className="text-xs font-mono tracking-widest uppercase text-white/50">04 // Selected Works & Platforms</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Passionate about digital design, spatial architecture, and full-stack software.
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
            Explorations across Web, Spatial Audio, 3D Canvas, and Autonomous Systems.
          </p>

          {/* Apple HIG Case Study Spotlight Pill */}
          <div className="inline-flex items-center gap-3 p-1.5 pl-4 pr-2 rounded-full bg-[#10101c]/90 border border-white/12 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span className="text-xs text-white/80 font-medium">
                New Case Study: <strong className="text-white font-semibold">MSN Global Trainings Portal</strong>
              </span>
            </div>
            <button
              onClick={() => setActiveTab("CaseStudies")}
              className="px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-bold flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer shadow-sm"
            >
              <span>Read Case Study</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        <Portfolio3D setActiveTab={setActiveTab} />
      </section>

      {/* 5. Minimal Apple HIG Pro Partner Reviews (Singular Auto-Advancing Card + Metric Capsule) */}
      <section className="py-16 md:py-24 max-w-[1100px] mx-auto px-4 md:px-8 border-t border-white/[0.08] relative">
        {/* Subtle Ambient Refraction */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-16 bg-gradient-to-b from-white/[0.02] to-transparent blur-xl pointer-events-none" />

        {/* Section Header Matching Screenshot Styling & Requested Content */}
        <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LiquidCapsule
              color1="#F97316"
              color2="#EA580C"
              showOnMobile={true}
              className="w-10 sm:w-12 h-4 sm:h-5 shadow-[0_0_15px_rgba(249,115,22,0.35)]"
            />
            <span className="text-xs font-mono tracking-widest uppercase text-white/50">
              05 // CLIENT REVIEWS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 font-sans">
            What Our Partners Say
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Feedback from creators, founders, and teams we've collaborated with — engineered for commercial impact with authentic verified outcomes from global leaders.
          </p>
        </div>

        {/* Singular Minimal Apple HIG Testimonial Card with Auto-Advance */}
        {(() => {
          const activeReview = reviews[activeReviewIndex] || reviews[0];
          return (
            <div
              id="testimonials-featured-card"
              className="relative max-w-3xl mx-auto mb-8 rounded-3xl bg-gradient-to-b from-[#121317] to-[#090a0d] border border-white/[0.1] p-7 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl overflow-hidden group"
              onMouseEnter={() => setIsReviewPaused(true)}
              onMouseLeave={() => setIsReviewPaused(false)}
            >
              {/* Precision Specular Top Edge */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Animated Quote & Author */}
              <div className="relative min-h-[160px] sm:min-h-[140px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReviewIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col justify-between"
                  >
                    {/* Clean Typography Quote */}
                    <blockquote className="text-base sm:text-lg md:text-xl text-neutral-100 font-normal leading-relaxed tracking-tight mb-8">
                      "{activeReview.text}"
                    </blockquote>

                    {/* Author Profile */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={activeReview.avatar}
                          alt={activeReview.name}
                          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-white/20 shadow-sm"
                          loading="lazy"
                        />
                        <div>
                          <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight leading-tight">
                            {activeReview.name}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            {activeReview.role} • {activeReview.company}
                          </p>
                        </div>
                      </div>

                      {/* 5-Star Rating */}
                      <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={13} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Minimal Apple Progress Indicators & Subtle Navigation */}
              <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                {/* Clean Progress Pills */}
                <div className="flex items-center gap-1.5">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveReviewIndex(idx)}
                      className={cn(
                        "h-1 rounded-full transition-all duration-300 cursor-pointer",
                        activeReviewIndex === idx
                          ? "w-6 sm:w-8 bg-white"
                          : "w-1.5 sm:w-2 bg-white/20 hover:bg-white/40"
                      )}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Quiet Chevrons */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
                    }
                    className="p-1.5 sm:p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button
                    onClick={() =>
                      setActiveReviewIndex((prev) => (prev + 1) % reviews.length)
                    }
                    className="p-1.5 sm:p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
                    aria-label="Next review"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Sleek Apple HIG Pro Metric Capsule Widget */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-5 py-2.5 px-4 sm:px-6 md:px-8 rounded-full bg-[#101115]/90 border border-white/[0.12] backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)]">
            {/* 100% Satisfaction Badge */}
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-white tracking-tight">100% Satisfaction</span>
            </div>

            <span className="hidden sm:inline w-px h-3.5 bg-white/10" />

            {/* 4.9 Average Rating */}
            <div className="flex items-center gap-1.5">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span className="text-xs sm:text-sm font-medium text-white tracking-tight">4.9/5.0 Average Rating</span>
            </div>

            <span className="hidden sm:inline w-px h-3.5 bg-white/10" />

            {/* 200+ Projects Delivered */}
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[11px] font-mono text-neutral-200 font-semibold border border-white/10">200+</span>
              <span className="text-xs sm:text-sm font-medium text-neutral-300 tracking-tight">Projects Delivered</span>
            </div>

            <span className="hidden md:inline w-px h-3.5 bg-white/10" />

            {/* 110+ International Clients */}
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[11px] font-mono text-neutral-200 font-semibold border border-white/10">110+</span>
              <span className="text-xs sm:text-sm font-medium text-neutral-300 tracking-tight">International Clients</span>
            </div>

            <span className="hidden lg:inline w-px h-3.5 bg-white/10" />

            {/* 200+ Industries */}
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[11px] font-mono text-neutral-300 font-semibold border border-white/10">200+</span>
              <span className="text-xs sm:text-sm font-medium text-neutral-400 tracking-tight">Industries</span>
            </div>

            {/* View All Trigger */}
            {setActiveTab && (
              <>
                <span className="hidden sm:inline w-px h-3.5 bg-white/10" />
                <button
                  onClick={() => setActiveTab("Reviews")}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-200 hover:text-white transition-colors cursor-pointer pl-1 group"
                >
                  <span>All Reviews</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 6. Apple HIG Pro Contact & Strategy Call Area */}
      <section className="py-20 md:py-28 max-w-[1250px] mx-auto px-4 md:px-8">
        <div className="bg-[#090912]/80 rounded-[2.5rem] md:rounded-[3rem] border border-white/10 p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col lg:flex-row gap-10 lg:gap-14 relative overflow-hidden items-stretch shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Floating Medusa 3D & Fast-Track Direct Channels */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between gap-6 relative z-10">
            <div>
              {/* Medusa floating freely in 3D without restrictive box background */}
              <div className="relative w-full h-[300px] sm:h-[360px] lg:h-[400px] flex items-center justify-center">
                {/* Radial ambient glow behind 3D Medusa */}
                <div className="absolute inset-0 bg-radial from-purple-600/25 via-transparent to-transparent blur-3xl pointer-events-none" />
                <MedusaImage />
              </div>

              {/* Direct Booking Minimal Pill */}
              <a
                href="https://calendly.com/digital-b3asts/quick-free-consultation"
                target="_blank"
                rel="noreferrer"
                className="mt-3 w-full py-2.5 px-4 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 hover:border-amber-500/40 text-amber-300 text-xs font-semibold tracking-tight transition-all flex items-center justify-between group shadow-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                  <span>Need a Rapid Strategy Call? (15-Min Free)</span>
                </div>
                <ArrowUpRight size={14} className="text-amber-400/80 group-hover:text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </a>
            </div>

            {/* Quick Contact Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href="https://wa.me/923094506904"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 hover:border-[#25D366]/50 text-[#25D366] text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm group"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.814 3.183 0 5.769-2.587 5.77-5.767 0-3.181-2.587-5.767-5.77-5.767zm0-1.672c4.103 0 7.439 3.336 7.439 7.439 0 4.103-3.336 7.439-7.439 7.439-1.282 0-2.483-.325-3.535-.895l-4.496 1.179 1.2-4.382c-.655-1.112-1.008-2.39-1.008-3.741 0-4.103 3.336-7.439 7.439-7.439z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              <a
                href="mailto:abdulrahmant.official@gmail.com"
                className="py-2.5 px-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 hover:border-white/35 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm group"
              >
                <Mail size={15} className="text-white/80 group-hover:scale-110 transition-transform shrink-0" />
                <span>Direct Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean, Streamlined Apple HIG Pro Capsule Form */}
          <div className="w-full lg:w-7/12 relative z-10 flex flex-col justify-center">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 text-center flex flex-col items-center justify-center my-auto shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Project Brief Transmitted!</h3>
                <p className="text-white/60 text-sm max-w-md leading-relaxed mb-6">
                  Thank you, <span className="text-white font-semibold">{formData.name || "Partner"}</span>. We have logged your request for <span className="text-purple-300 font-semibold">{inquiryType === "Other / Custom Scope" && customInquiry ? customInquiry : inquiryType}</span>. We'll reach out within 24 hours.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href="https://calendly.com/digital-b3asts/quick-free-consultation"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs transition-transform hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg"
                  >
                    <Calendar size={13} />
                    <span>Fast-Track with Calendly</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", message: "", consent: true });
                      setCustomInquiry("");
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </motion.div>
            ) : (
              <div>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2.5">
                    <LiquidCapsule color1="#8B5CF6" color2="#6366F1" />
                    <span className="text-xs font-mono tracking-widest uppercase text-white/50">06 // Collaborate & Build</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Start Your Project
                  </h2>
                  <p className="text-white/60 text-xs sm:text-sm font-normal mt-1.5 leading-relaxed">
                    Clean, direct collaboration. Tell us about your goals or schedule a 1:1 strategy call.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Stylized Dropdowns: Project Type & Target Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <AppleSelect
                      label="Project Type"
                      value={inquiryType}
                      options={PROJECT_TYPE_OPTIONS}
                      onChange={(val) => setInquiryType(val)}
                    />

                    <AppleSelect
                      label="Target Budget"
                      value={budgetRange}
                      options={BUDGET_OPTIONS}
                      onChange={(val) => setBudgetRange(val)}
                    />
                  </div>

                  {/* Optional Custom Specification Input when "Other" is chosen */}
                  {inquiryType === "Other / Custom Scope" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1.5"
                    >
                      <label htmlFor="custom-inquiry" className="text-[11px] font-mono uppercase tracking-wider text-purple-300">
                        Custom Scope Specification *
                      </label>
                      <input
                        type="text"
                        id="custom-inquiry"
                        required
                        value={customInquiry}
                        onChange={(e) => setCustomInquiry(e.target.value)}
                        placeholder="e.g. Fintech Mobile App, Web3 Dashboard, Brand Identity"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm text-white bg-purple-500/[0.08] rounded-full border border-purple-500/30 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-white/30"
                      />
                    </motion.div>
                  )}

                  {/* Name & Work Email in sleek Apple capsule fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label htmlFor="name-field" className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                        Your Name / Organization *
                      </label>
                      <input
                        type="text"
                        id="name-field"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm text-white bg-white/[0.04] hover:bg-white/[0.07] rounded-full border border-white/15 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-white/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="email-field" className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        id="email-field"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 text-xs sm:text-sm text-white bg-white/[0.04] hover:bg-white/[0.07] rounded-full border border-white/15 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-white/30 shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
                      />
                    </div>
                  </div>

                  {/* Dynamic Auto-Expanding Message Field (1-2 lines default, expands up to 3 lines) */}
                  <div className="space-y-1.5">
                    <label htmlFor="message-field" className="text-[11px] font-mono uppercase tracking-wider text-white/60 block">
                      Message / Project Details
                    </label>
                    <textarea
                      id="message-field"
                      rows={1}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        // Dynamically adjust height up to 3 lines (max ~80px)
                        e.target.style.height = "auto";
                        e.target.style.height = `${Math.min(84, Math.max(42, e.target.scrollHeight))}px`;
                      }}
                      placeholder="Brief outline of your goals, deliverables, or timeline..."
                      className="w-full px-4 py-2.5 text-xs sm:text-sm text-white bg-white/[0.04] hover:bg-white/[0.07] rounded-2xl border border-white/15 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all placeholder:text-white/30 min-h-[44px] max-h-[88px] resize-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)] leading-relaxed"
                    />
                  </div>

                  {/* Submit Controls & Consent */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 pt-1">
                    <label className="flex items-center gap-2.5 text-xs text-white/60 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="w-4 h-4 rounded border-white/20 bg-black/40 text-purple-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className="text-[11px] sm:text-xs">I agree to receive project correspondence.</span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 px-7 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_4px_25px_rgba(255,255,255,0.2)] hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 shrink-0"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Project Brief</span>
                          <Send size={13} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dual Opposite Infinite Looping Marquees */}
      <div className="py-10 md:py-14 overflow-hidden relative border-t border-b border-white/10 select-none bg-[#07070d]/80 backdrop-blur-xl flex flex-col gap-4 sm:gap-6">
        {/* Track 1: Scrolling Right to Left */}
        <div className="relative flex overflow-x-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 28, repeat: Infinity }}
            className="flex items-center whitespace-nowrap shrink-0"
          >
            {[...Array(4)].map((_, i) => (
              <div key={`track1-${i}`} className="flex items-center gap-6 md:gap-10 pr-6 md:pr-10">
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] tracking-tight uppercase text-white">
                  BRINGS YOUR SITE TO LIFE WITH
                </span>
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] tracking-tight uppercase text-purple-300 italic">
                  CREATIVITY
                </span>
                <span className="text-white/20 text-xl sm:text-3xl font-mono">✦</span>
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] tracking-tight uppercase text-white/90">
                  ARCHITECTING NEXT-GEN EXPERIENCES
                </span>
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] tracking-tight uppercase text-indigo-300 italic">
                  SPATIAL 3D & AUDIO
                </span>
                <span className="text-white/20 text-xl sm:text-3xl font-mono">✦</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Track 2: Scrolling Left to Right (Opposite Direction) */}
        <div className="relative flex overflow-x-hidden">
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 32, repeat: Infinity }}
            className="flex items-center whitespace-nowrap shrink-0"
          >
            {[...Array(4)].map((_, i) => (
              <div key={`track2-${i}`} className="flex items-center gap-6 md:gap-10 pr-6 md:pr-10">
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] tracking-tight uppercase text-white/80">
                  AI AUTOMATION & FULL-STACK CLOUD
                </span>
                <span className="text-white/20 text-xl sm:text-3xl font-mono">✦</span>
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] tracking-tight uppercase text-emerald-300 italic">
                  HIGH-CONVERSION DESIGN
                </span>
                <span className="text-white/20 text-xl sm:text-3xl font-mono">✦</span>
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] tracking-tight uppercase text-white">
                  100% PRODUCTION READY
                </span>
                <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] tracking-tight uppercase text-amber-300 italic">
                  BESPOKE DIGITAL LABS
                </span>
                <span className="text-white/20 text-xl sm:text-3xl font-mono">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
