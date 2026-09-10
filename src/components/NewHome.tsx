import React from "react";
import { motion } from "motion/react";
import { MedusaImage } from "./MedusaImage";
import { SpecularCard } from "./shared/SpecularCard";
import { ASSET_LINKS } from "../constants/assets";
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

import { GitHubGraph } from "./GitHubGraph";
import { Portfolio3D } from "./Portfolio3D";

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
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="w-full md:w-1/2 relative flex justify-center"
          >
            <div className="relative rounded-3xl w-full max-w-[480px] aspect-[4/5] overflow-hidden border border-white/10 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.15)] group bg-[#0d0d14]">
              <img
                src={myArea51Image}
                alt="Area 51 - Abdulrahman Toor"
                className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-xs tracking-tight">Abdulrahman Toor</p>
                  <p className="text-white/50 text-[10px] font-mono uppercase tracking-wider">Creator & Architect</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="w-full md:w-1/2"
          >
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

            <p className="text-white/80 leading-relaxed font-normal text-sm md:text-base border-l-2 border-white/20 pl-6 mb-8">
              Hi! Abdulrahman-T this side. I'm empowering human connection
              through design, cross-platform adventures & user-friendly
              solutions. I ignite engagement that leaves a lasting impression.
              Ready for accuracy, impact, and a soaring return on investment?
            </p>

            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.03] border border-white/10 relative shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] mb-8">
              <p className="text-white/70 font-sans text-sm md:text-base text-left relative z-10 leading-relaxed italic">
                "Design is the bridge that connects creativity and functionality,
                resulting in beautiful solutions that solve real-world problems."
              </p>
              <div className="mt-4 text-left text-xs font-mono font-bold text-white/40 uppercase tracking-widest">
                — Abdulrahman-T
              </div>
            </div>

            <GitHubGraph />
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

        <Portfolio3D />

        <div className="mt-16 text-center">
          <button
            id="all-projects-cta-btn"
            onClick={() => setActiveTab("Projects")}
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-tight transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>See All Projects</span>
            <ArrowRight size={14} />
          </button>
        </div>
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

      {/* 6. Contact Form Area */}
      <section className="py-32 max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="bg-[#08080c] rounded-[3rem] border border-white/10 p-8 md:p-16 flex flex-col md:flex-row gap-16 relative overflow-hidden items-center shadow-2xl">
          {/* Medusa / Visual */}
          <div className="w-full md:w-1/2 relative perspective-[1000px]">
            <div className="aspect-square md:aspect-[3/4] rounded-[2rem] flex items-center justify-center relative z-10 w-full h-[350px] md:h-[500px]">
              <MedusaImage />
            </div>
          </div>

          <div className="w-full md:w-1/2 relative z-10">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <LiquidCapsule color1="#8B5CF6" color2="#6366F1" />
                <span className="text-xs font-mono tracking-widest uppercase text-white/50">06 // Collaborate & Build</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] text-white tracking-tight leading-tight">
                Start Your Project Now
              </h2>
              <p className="text-white/60 text-sm md:text-base font-normal mt-3">
                Ready to build something unforgettable? Drop your vision below and let's engineer something iconic together.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="text"
                    id="name-input"
                    className="block px-5 pb-3 pt-6 w-full text-sm text-white bg-white/[0.03] rounded-xl border border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name-input"
                    className="absolute text-xs text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none uppercase tracking-widest font-mono"
                  >
                    Your Name
                  </label>
                </div>
                <div className="relative group">
                  <input
                    type="email"
                    id="email-input"
                    className="block px-5 pb-3 pt-6 w-full text-sm text-white bg-white/[0.03] rounded-xl border border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email-input"
                    className="absolute text-xs text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none uppercase tracking-widest font-mono"
                  >
                    Email Address
                  </label>
                </div>
              </div>
              
              <div className="relative group">
                <input
                  type="text"
                  id="title-input"
                  className="block px-5 pb-3 pt-6 w-full text-sm text-white bg-white/[0.03] rounded-xl border border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer transition-all duration-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                  placeholder=" "
                />
                <label
                  htmlFor="title-input"
                  className="absolute text-xs text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none uppercase tracking-widest font-mono"
                >
                  Project Subject
                </label>
              </div>

              <div className="relative group">
                <textarea
                  id="message-input"
                  rows={5}
                  className="block px-5 pb-3 pt-6 w-full text-sm text-white bg-white/[0.03] rounded-xl border border-white/10 appearance-none focus:outline-none focus:ring-0 focus:border-purple-500 peer transition-all duration-300 resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="message-input"
                  className="absolute text-xs text-white/50 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-5 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 pointer-events-none uppercase tracking-widest font-mono"
                >
                  Message Details
                </label>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-3 text-xs font-bold text-white/50 uppercase tracking-widest cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-black group-hover:border-purple-500 transition-colors">
                    <input type="checkbox" className="opacity-0 absolute inset-0 cursor-pointer peer" />
                    <svg className="w-3 h-3 text-purple-400 opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="group-hover:text-white/70 transition-colors">
                    I consent to the terms.
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => setActiveTab("Connect")}
                  className="px-8 py-3.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold uppercase tracking-widest text-xs transition-transform shadow-[0_4px_20px_rgba(255,255,255,0.18)] cursor-pointer hover:scale-105 active:scale-95"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Infinite Looping Marquee Before Footer */}
      <div className="py-12 md:py-16 overflow-hidden relative border-t border-white/10 mt-12 select-none bg-black/40">
        <div className="relative flex overflow-x-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
            className="flex items-center whitespace-nowrap shrink-0"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-6 md:gap-10 pr-6 md:pr-10">
                <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-[900] tracking-tight uppercase text-white">
                  BRINGS YOUR SITE TO LIFE WITH
                </span>
                <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-[900] tracking-tight uppercase text-purple-300 italic">
                  CREATIVITY
                </span>
                <span className="text-white/20 text-2xl sm:text-4xl font-mono">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
