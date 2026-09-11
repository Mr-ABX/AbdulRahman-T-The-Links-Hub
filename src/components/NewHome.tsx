import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MedusaImage } from "./MedusaImage";
import { SpecularCard } from "./shared/SpecularCard";
import { ASSET_LINKS } from "../constants/assets";
import { GitHubGraph } from "./GitHubGraph";
import { Portfolio3D } from "./Portfolio3D";
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

const LiquidCapsule = ({ color1, color2 }: { color1: string, color2: string }) => (
  <div className="w-12 h-5 rounded-full overflow-hidden relative shadow-[0_0_15px_rgba(255,255,255,0.1)] shrink-0 hidden sm:block">
    <svg width="48" height="20" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
      <rect width="48" height="20" fill={`url(#gradient-${color1.substring(1)})`} />
      <defs>
        <linearGradient id={`gradient-${color1.substring(1)}`} x1="0" y1="0" x2="48" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor={color1} />
          <stop offset="1" stopColor={color2} />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ filter: "url(#rock-liquid-glitch)" }}></div>
  </div>
);

export const Home = ({
  projects,
  setActiveTab,
}: {
  projects: any[];
  setActiveTab: (tab: string) => void;
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

  const [inquiryType, setInquiryType] = useState("Full-Stack Web & App");
  const [customInquiry, setCustomInquiry] = useState("");
  const [budgetRange, setBudgetRange] = useState("$5k – $10k");
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
        {/* Apple HIG Micro Pill with Circular Avatar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.12] backdrop-blur-xl transition-all duration-200 group cursor-default shadow-sm">
            {/* Small circular avatar with plain white background */}
            <div className="w-5 h-5 rounded-full bg-white border border-white/60 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
              <img
                src="/my-image-for-home-01.jpeg"
                alt="Abdulrahman"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = ASSET_LINKS.myPfp;
                }}
              />
            </div>
            <span className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-white/80 group-hover:text-white transition-colors">
              Studio // Abdulrahman-T
            </span>
          </div>
        </motion.div>

        {/* Hero Title Container with Rock Assets flanking the headline */}
        <div className="relative w-full max-w-[1150px] flex items-center justify-center mb-8">
          {/* Left Rock Asset - Layered Behind Text with Interactive Obsidian Liquid Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            whileHover={{ scale: 1.06, rotate: -3, y: -6, transition: { type: "spring", stiffness: 280, damping: 16 } }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="hidden md:block absolute -left-5 lg:-left-12 xl:-left-20 top-1/2 -translate-y-[52%] w-44 md:w-52 lg:w-68 xl:w-76 pointer-events-auto cursor-pointer select-none z-0 group"
            title="Interact with Left Monolith Rock"
          >
            {/* Base Natural Rock */}
            <motion.img
              src="/rock-left-1000.webp"
              alt=""
              animate={{ y: [-8, 8, -8], rotate: [-1.2, 1.2, -1.2] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-auto object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)] filter brightness-95 contrast-105 group-hover:opacity-15 transition-all duration-300"
            />

            {/* Super-Black Obsidian Liquid Reveal Layer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center">
              <motion.img
                src="/rock-left-1000.webp"
                alt=""
                animate={{ y: [-8, 8, -8], rotate: [-1.2, 1.2, -1.2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-auto object-contain drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]"
                style={{
                  filter: "url(#rock-liquid-glitch) grayscale(100%) contrast(450%) brightness(12%)",
                }}
              />
              {/* Halftone Dot Matrix Texture Overlay */}
              <div
                className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(rgba(192, 132, 252, 0.7) 1px, transparent 1px)",
                  backgroundSize: "5px 5px",
                }}
              />
              {/* Monolith Holographic Badge */}
              <span className="absolute -bottom-4 px-2.5 py-0.5 rounded-full bg-black/85 border border-purple-400/40 text-[9px] font-mono tracking-widest text-purple-300 uppercase shadow-md backdrop-blur-md">
                OBSIDIAN CORE // 01
              </span>
            </div>
          </motion.div>

          {/* Right Rock Asset - Layered Behind Text with Interactive Obsidian Liquid Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            whileHover={{ scale: 1.06, rotate: 3, y: -6, transition: { type: "spring", stiffness: 280, damping: 16 } }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="hidden md:block absolute -right-5 lg:-right-12 xl:-right-20 top-1/2 -translate-y-[48%] w-44 md:w-52 lg:w-68 xl:w-76 pointer-events-auto cursor-pointer select-none z-0 group"
            title="Interact with Right Monolith Rock"
          >
            {/* Base Natural Rock */}
            <motion.img
              src="/rock-right-1000.webp"
              alt=""
              animate={{ y: [8, -8, 8], rotate: [1.2, -1.2, 1.2] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-auto object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.85)] filter brightness-95 contrast-105 group-hover:opacity-15 transition-all duration-300"
            />

            {/* Super-Black Obsidian Liquid Reveal Layer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center">
              <motion.img
                src="/rock-right-1000.webp"
                alt=""
                animate={{ y: [8, -8, 8], rotate: [1.2, -1.2, 1.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-auto object-contain drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]"
                style={{
                  filter: "url(#rock-liquid-glitch) grayscale(100%) contrast(450%) brightness(12%)",
                }}
              />
              {/* Halftone Dot Matrix Texture Overlay */}
              <div
                className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(rgba(192, 132, 252, 0.7) 1px, transparent 1px)",
                  backgroundSize: "5px 5px",
                }}
              />
              {/* Monolith Holographic Badge */}
              <span className="absolute -bottom-4 px-2.5 py-0.5 rounded-full bg-black/85 border border-purple-400/40 text-[9px] font-mono tracking-widest text-purple-300 uppercase shadow-md backdrop-blur-md">
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
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LiquidCapsule color1="#10B981" color2="#0EA5E9" />
            <span className="text-xs font-mono tracking-widest uppercase text-white/50">04 // Selected Works & Platforms</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Passionate about digital design, spatial architecture, and full-stack software.
          </h2>
          <p className="text-white/60 text-sm md:text-base leading-relaxed">
            Explorations across Web, Spatial Audio, 3D Canvas, and Autonomous Systems.
          </p>
        </div>

        <Portfolio3D setActiveTab={setActiveTab} />
      </section>

      {/* 5. Testimonials */}
      <section className="py-24 md:py-32 max-w-[1200px] mx-auto px-4 md:px-8 border-t border-white/5 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LiquidCapsule color1="#F59E0B" color2="#EF4444" />
            <span className="text-xs font-mono tracking-widest uppercase text-white/50">05 // Client Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            What Our Partners Say
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            Feedback from creators, founders, and teams we've collaborated with.
          </p>
        </div>

        <SpecularCard
          id="testimonials-featured-card"
          className="p-8 md:p-12 relative overflow-hidden"
          glowColor="rgba(255, 255, 255, 0.08)"
        >
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12 relative z-10">
            <div className="w-full md:w-1/3 aspect-square rounded-3xl bg-[#0d0d14] border border-white/10 flex flex-col justify-end p-8 relative overflow-hidden shrink-0 shadow-2xl">
              <h3 className="text-2xl font-bold mb-1 relative z-10 text-white">
                Mary Thomas
              </h3>
              <p className="text-white/60 text-xs font-mono font-bold uppercase tracking-widest relative z-10">
                Client Review
              </p>
              <div className="absolute -bottom-10 -right-4 text-[150px] font-serif leading-none text-white/10 select-none font-black italic">
                "
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="flex gap-1.5 text-amber-400 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light italic">
                "Working with Abdulrahman on our website design and development
                was a breeze. Their team was responsive and creative, and truly
                listened to our needs. We now have a website that not only looks
                great but also provides a user experience that sets us apart from
                the competition."
              </p>
            </div>
          </div>
        </SpecularCard>
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
