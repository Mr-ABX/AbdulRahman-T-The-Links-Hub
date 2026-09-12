import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "motion/react";
import {
  Search,
  Compass,
  Code2,
  Rocket,
  Calendar,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Layers,
  Video,
  FileCode2,
  Sparkles,
  X,
  RotateCw,
  ArrowUpRight,
  Check,
} from "lucide-react";

interface JourneyStep {
  id: string;
  stepNum: string;
  category: string;
  name: string;
  badge: string;
  timeframe: string;
  headline: string; // Sharp punchy one-liner
  oneLinerSub: string; // Relatable, easy-to-understand sub-hook
  description: string; // Expanded deep context
  deliverables: { icon: React.ElementType; label: string }[];
  clientPeaceOfMind: string;
  agencyDifference: string;
  techHighlights: string[];
  icon: React.ElementType;
  accent: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "discovery",
    stepNum: "01",
    category: "ALIGNMENT",
    name: "Discovery",
    badge: "Stage 01 • Low Stress",
    timeframe: "20-Min Call",
    headline: "Zero jargon. Real roadmap & exact fixed scope in 20 minutes.",
    oneLinerSub: "No 40-page briefs required. We uncover your goals and hand you an actionable technical plan.",
    description:
      "A friendly, conversational deep dive. We unpack your product vision, audit technical feasibility, and define milestones — with zero preparation required on your part.",
    deliverables: [
      { icon: Compass, label: "Technical feasibility assessment" },
      { icon: Clock, label: "Detailed timeline & milestone breakdown" },
      { icon: ShieldCheck, label: "Guaranteed fixed-price proposal" },
    ],
    clientPeaceOfMind: "Zero sales pressure. You keep the complete technical plan whether we build together or not.",
    agencyDifference: "Vs. 3 weeks of junior account reps and generic sales pitch decks",
    techHighlights: [
      "Fixed-price contract with zero hidden change orders",
      "Exact architectural stack recommendation",
      "Production timeline with concrete sprint gates",
    ],
    icon: Search,
    accent: "#38BDF8", // Frost Sky
  },
  {
    id: "strategy",
    stepNum: "02",
    category: "PROTOTYPE",
    name: "Interactive Build",
    badge: "Stage 02 • Rapid Clarity",
    timeframe: "Days 2 – 5",
    headline: "A clickable build on your phone in days, not months.",
    oneLinerSub: "Experience real spatial typography, gestures, and responsive flows before deep code starts.",
    description:
      "Instead of static PDF mockups, you test a live staging URL on your own device. Tap through animations, review layout rhythm, and give feedback early with zero guesswork.",
    deliverables: [
      { icon: Layers, label: "Live clickable staging URL (mobile & desktop)" },
      { icon: Zap, label: "System architecture & database schema" },
      { icon: Sparkles, label: "Apple HIG micro-interaction design tokens" },
    ],
    clientPeaceOfMind: "Test and approve the core experience before a single deep backend line is committed.",
    agencyDifference: "Vs. Weeks of static Figma screens that never match the actual shipped code",
    techHighlights: [
      "Deployed to private preview container for instant access",
      "Spring-physics gesture validation on physical devices",
      "Verified database models & schema relationships",
    ],
    icon: Compass,
    accent: "#818CF8", // Indigo Frost
  },
  {
    id: "execution",
    stepNum: "03",
    category: "VELOCITY",
    name: "Direct Sprints",
    badge: "Stage 03 • Direct Access",
    timeframe: "Daily Updates",
    headline: "Direct 1-on-1 contact with your lead architect on Slack.",
    oneLinerSub: "Zero middlemen or telephone games. Watch your app evolve daily with async video walkthroughs.",
    description:
      "Work directly with the actual engineer building your product. You get a private Slack or WhatsApp channel with sub-hour responses and recorded video demos for every sprint.",
    deliverables: [
      { icon: Video, label: "Recorded async video walkthroughs for each sprint" },
      { icon: FileCode2, label: "Private GitHub repository with live changelogs" },
      { icon: MessageSquare, label: "Sub-hour direct responses on Slack or WhatsApp" },
    ],
    clientPeaceOfMind: "Total transparency with working staging builds deployed continuously.",
    agencyDifference: "Vs. Slow bureaucratic ticket queues and offshore handoffs",
    techHighlights: [
      "Daily automated staging CI/CD builds",
      "Direct engineer Slack/WhatsApp channel with <1h reply SLA",
      "Async Loom video breakdowns for rapid feedback loops",
    ],
    icon: Code2,
    accent: "#34D399", // Emerald Mint
  },
  {
    id: "delivery",
    stepNum: "04",
    category: "HANDOVER",
    name: "Turnkey Launch",
    badge: "Stage 04 • Turnkey IP",
    timeframe: "Launch & Handover",
    headline: "Flawless deployment with 100% code and IP ownership transfer.",
    oneLinerSub: "Zero-downtime release, 95+ Google speed scores, and a 30-day bug-free safety warranty.",
    description:
      "Complete handover of your domains, server keys, repositories, and documentation. We handle production rollout and back it with 30 days of active post-launch support.",
    deliverables: [
      { icon: Rocket, label: "Zero-downtime production cloud rollout" },
      { icon: ShieldCheck, label: "100% code, domain & asset ownership transfer" },
      { icon: CheckCircle2, label: "30-day bug-free safety warranty & maintenance" },
    ],
    clientPeaceOfMind: "You own every single line of code with clean documentation, ready to scale independently.",
    agencyDifference: "Vs. Costly lock-in retainers and proprietary hosting hostage fees",
    techHighlights: [
      "95+ Google Lighthouse performance & accessibility score",
      "Complete documentation & deployment environment runbook",
      "30-day warranty coverage for all bug fixes and updates",
    ],
    icon: Rocket,
    accent: "#A78BFA", // Violet Titanium
  },
];

export const ClientJourney: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Pop-up Flippable Card Modal State
  const [selectedModalStep, setSelectedModalStep] = useState<JourneyStep | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  const openStepModal = (step: JourneyStep) => {
    setSelectedModalStep(step);
    setIsCardFlipped(false);
  };

  const closeStepModal = () => {
    setSelectedModalStep(null);
    setIsCardFlipped(false);
  };

  // Keyboard escape listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedModalStep) {
        closeStepModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedModalStep]);

  // Scroll tracking: Beam tip stays pinned to viewport center as user scrolls through timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end 80%"],
  });

  // Responsive, fluid Apple HIG Liquid Spring physics with zero lag
  const fluidProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 28,
    restDelta: 0.001,
  });

  // Derived active step indicator
  React.useEffect(() => {
    return fluidProgress.on("change", (v) => {
      if (v < 0.25) setActiveStepIndex(0);
      else if (v < 0.50) setActiveStepIndex(1);
      else if (v < 0.75) setActiveStepIndex(2);
      else setActiveStepIndex(3);
    });
  }, [fluidProgress]);

  // Dynamic beam rendering is handled locally in each step

  return (
    <section
      id="onboarding-process"
      className="py-24 md:py-36 max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 border-t border-white/[0.08] relative overflow-hidden"
    >
      {/* Background Soft Specular Lighting (Apple HIG Ambient Silver) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-slate-300/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-16 right-1/4 w-[480px] h-[480px] bg-slate-300/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* 1. Apple HIG Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          {/* Animated Iridescent Fluid Capsule Pill */}
          <div className="w-10 sm:w-12 h-4 sm:h-5 rounded-full overflow-hidden relative shadow-[0_0_12px_rgba(255,255,255,0.25)] shrink-0 border border-white/30">
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                background: "linear-gradient(120deg, #38BDF8 0%, #818CF8 35%, #34D399 70%, #A78BFA 100%)",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]" />
          </div>
          <span className="text-xs font-mono tracking-widest uppercase text-slate-300">
            06 // ONBOARDING & PROCESS
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 font-sans">
          The Frictionless Path to Launch.
        </h2>
        <p className="text-slate-300/70 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          From first strategy call to turnkey handover. Sharp execution, direct architect access, and zero corporate bureaucracy.
        </p>

        {/* Apple HIG Quick Stage Badges */}
        <div className="inline-flex items-center justify-center p-1 mt-6 rounded-full bg-[#10121a]/85 border border-white/15 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
          {JOURNEY_STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                const el = document.getElementById(`step-card-${s.id}`);
                el?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all cursor-pointer flex items-center gap-1.5 ${
                activeStepIndex === idx
                  ? "bg-slate-100 text-black font-semibold shadow-sm"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <span className="text-[10px] font-mono opacity-60">0{idx + 1}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Procedural Timeline */}
      <div ref={timelineRef} className="relative z-10 flex flex-col pt-8 pb-16">
        
        {/* APPLE HIG SMOOTH SILVER LIQUID BEAM (Global Desktop Track) */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-0">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="silverLiquidDesktop" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="25%" stopColor="#cbd5e1" stopOpacity="1" />
                <stop offset="50%" stopColor="#f8fafc" stopOpacity="1" />
                <stop offset="75%" stopColor="#94a3b8" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* Base guide track line connecting all card nodes and CTA card */}
            <path
              d="M 500 0 L 500 975"
              fill="none"
              stroke="rgba(255, 255, 255, 0.14)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Dynamic animated silver liquid filling path */}
            <motion.path
              d="M 500 0 L 500 975"
              fill="none"
              stroke="url(#silverLiquidDesktop)"
              strokeWidth="4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              style={{
                pathLength: fluidProgress,
              }}
            />
          </svg>
        </div>

        {/* APPLE HIG SMOOTH SILVER LIQUID BEAM (Global Mobile Track) */}
        <div className="block md:hidden absolute left-[36px] sm:left-[48px] top-0 bottom-0 w-[4px] pointer-events-none z-0 -translate-x-1/2">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="silverLiquidMobile" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="25%" stopColor="#cbd5e1" stopOpacity="1" />
                <stop offset="50%" stopColor="#f8fafc" stopOpacity="1" />
                <stop offset="75%" stopColor="#94a3b8" stopOpacity="1" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* Base guide track line */}
            <path
              d="M 50 0 L 50 975"
              fill="none"
              stroke="rgba(255, 255, 255, 0.14)"
              strokeWidth="2.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            {/* Dynamic animated silver liquid filling path */}
            <motion.path
              d="M 50 0 L 50 975"
              fill="none"
              stroke="url(#silverLiquidMobile)"
              strokeWidth="4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
              style={{
                pathLength: fluidProgress,
              }}
            />
          </svg>
        </div>

        {/* 3. Alternating Milestones with Embedded Card Icons & Click-to-Flip Modal */}
        <div className="flex flex-col relative z-10">
          {JOURNEY_STEPS.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            const StepIcon = step.icon;
            const isHovered = hoveredIndex === idx;

            // Precise animation timing thresholds for each step's row
            const stepThresholds = [
              { start: 0.02, end: 0.12 },
              { start: 0.22, end: 0.34 },
              { start: 0.44, end: 0.56 },
              { start: 0.66, end: 0.78 },
            ];
            const currentThreshold = stepThresholds[idx] || { start: 0.8, end: 0.9 };
            const beamProgress = useTransform(
              fluidProgress,
              [currentThreshold.start, currentThreshold.end],
              [0, 1]
            );

            return (
              <div
                key={step.id}
                id={`step-card-${step.id}`}
                className="relative grid grid-cols-1 md:grid-cols-12 items-center min-h-[300px] sm:min-h-[350px] w-full py-12"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Mobile Track Container (Only visible on SM screens) */}
                <div className="md:hidden absolute left-[36px] sm:left-[48px] top-0 bottom-0 w-[48px] pointer-events-none flex flex-col justify-center">
                  {/* Mobile Horizontal Beam */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 left-[24px] w-8 h-[3px] bg-gradient-to-r from-slate-400 to-slate-200 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)] origin-left"
                    style={{ scaleX: beamProgress }}
                  />
                  {/* Connection Dot */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 left-[50px] w-2.5 h-2.5 rounded-full bg-slate-100 border-[2px] border-slate-400 shadow-[0_0_8px_rgba(255,255,255,0.6)] z-10"
                    style={{ scale: beamProgress, opacity: beamProgress }}
                  />
                </div>

                {/* Left Column Card (Steps 01 & 03) */}
                {isLeft ? (
                  <div className="col-span-1 pl-16 sm:pl-20 md:pl-0 md:col-span-5 md:text-right pr-4 md:pr-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                      onClick={() => openStepModal(step)}
                      className={`group/card relative p-5 sm:p-6 md:p-7 rounded-[1.8rem] bg-gradient-to-b from-[#13151f]/95 via-[#0e1017]/95 to-[#090a10]/95 backdrop-blur-2xl border transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.65)] cursor-pointer select-none ${
                        isHovered
                          ? "border-slate-300/50 -translate-y-1 shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
                          : "border-white/[0.14] hover:border-white/30"
                      }`}
                    >
                      {/* Apple HIG Brushed Silver Specular Top Rim */}
                      <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />

                      {/* Header Capsule: Icon ON the card + Badge + Timeframe */}
                      <div className="flex items-center gap-2 mb-3.5 md:justify-end">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                          {step.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-slate-800/80 text-slate-200 border border-slate-600/40">
                          {step.badge}
                        </span>
                        {/* Icon embedded directly on card */}
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-white/10 bg-white/[0.05]"
                          style={{ color: step.accent }}
                        >
                          <StepIcon size={14} />
                        </div>
                      </div>

                      {/* Title & Timeframe */}
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1 font-sans flex items-center md:justify-end gap-2">
                        <span>{step.stepNum}. {step.name}</span>
                        <span className="text-xs font-mono font-normal text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.08]">
                          {step.timeframe}
                        </span>
                      </h3>

                      {/* Sharp, Punchy Main One-Liner */}
                      <p className="text-slate-300 font-medium text-sm sm:text-base leading-snug mb-5 mt-2">
                        {step.headline}
                      </p>

                      {/* Action Pill: Triggers Pop-Up Flippable Card */}
                      <div className="flex items-center md:justify-end pt-1">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-200 group-hover/card:text-white px-3 py-1.5 rounded-full bg-white/[0.06] group-hover/card:bg-white/[0.12] border border-white/15 transition-all">
                          <span>Inspect &amp; Flip Details</span>
                          <ArrowUpRight size={13} className="text-slate-400 group-hover/card:text-white group-hover/card:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="hidden md:block md:col-span-5" />
                )}

                {/* Center Spine with Dynamic Silver Beam Connectors */}
                <div className="hidden md:flex md:col-span-2 relative items-center justify-center pointer-events-none h-full w-full">
                  {/* Central Node Dot on Curvy Liquid Line */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-slate-100 border-[2px] border-white shadow-[0_0_12px_rgba(255,255,255,0.9)] z-20"
                    style={{ scale: beamProgress, opacity: beamProgress }}
                  />

                  {isLeft ? (
                    <>
                      {/* Thick silver liquid filling from the center OUT towards the left card */}
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 right-1/2 w-1/2 h-[3px] bg-gradient-to-l from-slate-100 via-slate-300 to-slate-200 rounded-l-full origin-right shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                        style={{ scaleX: beamProgress }}
                      />
                      
                      {/* Silver connection dot that lights up when the liquid hits the card edge */}
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 left-0 w-3 h-3 rounded-full bg-slate-100 border-[2px] border-slate-300 shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"
                        style={{ scale: beamProgress, opacity: beamProgress }}
                      />
                    </>
                  ) : (
                    <>
                      {/* Thick silver liquid filling from the center OUT towards the right card */}
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 left-1/2 w-1/2 h-[3px] bg-gradient-to-r from-slate-100 via-slate-300 to-slate-200 rounded-r-full origin-left shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                        style={{ scaleX: beamProgress }}
                      />
                      
                      {/* Silver connection dot that lights up when the liquid hits the card edge */}
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 right-0 w-3 h-3 rounded-full bg-slate-100 border-[2px] border-slate-300 shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10"
                        style={{ scale: beamProgress, opacity: beamProgress }}
                      />
                    </>
                  )}
                </div>

                {/* Right Column Card (Steps 02 & 04) */}
                {!isLeft ? (
                  <div className="col-span-1 pl-16 sm:pl-20 md:pl-0 md:col-span-5 md:text-left pr-4 md:pr-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                      onClick={() => openStepModal(step)}
                      className={`group/card relative p-5 sm:p-6 md:p-7 rounded-[1.8rem] bg-gradient-to-b from-[#13151f]/95 via-[#0e1017]/95 to-[#090a10]/95 backdrop-blur-2xl border transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.65)] cursor-pointer select-none ${
                        isHovered
                          ? "border-slate-300/50 -translate-y-1 shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
                          : "border-white/[0.14] hover:border-white/30"
                      }`}
                    >
                      {/* Apple HIG Brushed Silver Specular Top Rim */}
                      <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />

                      {/* Header Capsule: Icon ON the card + Badge + Timeframe */}
                      <div className="flex items-center gap-2 mb-3.5">
                        {/* Icon embedded directly on card */}
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-white/10 bg-white/[0.05]"
                          style={{ color: step.accent }}
                        >
                          <StepIcon size={14} />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                          {step.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-slate-800/80 text-slate-200 border border-slate-600/40">
                          {step.badge}
                        </span>
                      </div>

                      {/* Title & Timeframe */}
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1 font-sans flex items-center gap-2">
                        <span>{step.stepNum}. {step.name}</span>
                        <span className="text-xs font-mono font-normal text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.08]">
                          {step.timeframe}
                        </span>
                      </h3>

                      {/* Sharp, Punchy Main One-Liner */}
                      <p className="text-slate-300 font-medium text-sm sm:text-base leading-snug mb-5 mt-2">
                        {step.headline}
                      </p>

                      {/* Action Pill: Triggers Pop-Up Flippable Card */}
                      <div className="flex items-center pt-1">
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-200 group-hover/card:text-white px-3 py-1.5 rounded-full bg-white/[0.06] group-hover/card:bg-white/[0.12] border border-white/15 transition-all">
                          <span>Inspect &amp; Flip Details</span>
                          <ArrowUpRight size={13} className="text-slate-400 group-hover/card:text-white group-hover/card:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="hidden md:block md:col-span-5" />
                )}
              </div>
            );
          })}
        </div>

        {/* 4. Final Sticky / Seamless CTA Station */}
        <div className="mt-16 md:mt-24 relative max-w-3xl mx-auto">
          {/* Top Liquid Path Beacon Node & Connector */}
          <div className="flex flex-col items-center justify-center -mt-10 mb-2 pointer-events-none relative z-20">
            <motion.div
              className="w-5 h-5 rounded-full bg-white border-2 border-slate-200 shadow-[0_0_20px_rgba(255,255,255,1)] flex items-center justify-center"
              style={{
                scale: useTransform(fluidProgress, [0.82, 0.95], [0.5, 1.25]),
                opacity: useTransform(fluidProgress, [0.82, 0.92], [0.3, 1]),
              }}
            >
              <div className="w-2 h-2 rounded-full bg-slate-900 animate-pulse" />
            </motion.div>
            <motion.div
              className="w-[3px] h-6 bg-gradient-to-b from-white via-slate-200 to-slate-400/80 shadow-[0_0_10px_rgba(255,255,255,0.9)] rounded-full"
              style={{
                scaleY: useTransform(fluidProgress, [0.88, 0.98], [0, 1]),
                originY: 0,
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.2rem] bg-gradient-to-b from-[#141622]/95 via-[#0e1017]/95 to-[#08090f]/95 border border-slate-300/20 p-7 sm:p-9 md:p-11 shadow-[0_24px_70px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.15)] text-center relative overflow-hidden backdrop-blur-2xl"
          >
            {/* Top Specular Silver Ray */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200 uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for 2 Select Projects this Quarter</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3 font-sans">
              Start Your Project with Complete Confidence.
            </h3>

            <p className="text-slate-300/70 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8">
              Book a no-pressure 20-minute discovery call to discuss your goals, test feasibility, and receive an exact fixed scope within 24 hours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://calendly.com/digital-b3asts/quick-free-consultation"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-slate-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Calendar size={15} />
                <span>Book 20-Min Discovery Call</span>
                <ArrowRight size={15} />
              </a>

              <a
                href="https://wa.me/923094506904"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare size={15} className="text-[#25D366]" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-emerald-400" /> Fixed Price Quote
              </span>
              <span>•</span>
              <span>NDA Protected</span>
              <span>•</span>
              <span>Sub-24h Response</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 5. POP-UP FLIPPABLE CARD MODAL (Apple Pro Silver 3D Flip Card) */}
      <AnimatePresence>
        {selectedModalStep && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeStepModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
            />

            {/* Modal Stage: 3D Flip Card Container */}
            <div className="relative z-10 w-full max-w-xl [perspective:1400px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  rotateY: isCardFlipped ? 180 : 0,
                }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{
                  rotateY: { duration: 0.65, ease: [0.23, 1, 0.32, 1] },
                  default: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
                }}
                className="w-full relative [transform-style:preserve-3d]"
              >
                {/* ----------------- FRONT OF CARD: Overview & Deliverables ----------------- */}
                <div className="w-full rounded-[2.2rem] border border-slate-300/30 bg-gradient-to-b from-[#151724]/98 via-[#0e1018]/98 to-[#090a10]/98 p-6 sm:p-8 text-left shadow-[0_30px_90px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.2)] [backface-visibility:hidden] relative overflow-hidden">
                  {/* Top Brushed Silver Specular Reflection */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />

                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        {selectedModalStep.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-500" />
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-slate-800/90 text-slate-200 border border-slate-600/40">
                        {selectedModalStep.badge}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={closeStepModal}
                      className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  {/* Title & Timeframe */}
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0"
                      style={{ color: selectedModalStep.accent }}
                    >
                      {React.createElement(selectedModalStep.icon, { size: 20 })}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
                        {selectedModalStep.stepNum}. {selectedModalStep.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                        <Clock size={11} className="text-sky-400" />
                        <span>{selectedModalStep.timeframe}</span>
                      </div>
                    </div>
                  </div>

                  {/* Headline & Description */}
                  <p className="text-white font-medium text-sm sm:text-base leading-snug mt-3 mb-2">
                    {selectedModalStep.headline}
                  </p>
                  <p className="text-slate-300/80 text-xs sm:text-sm leading-relaxed mb-5">
                    {selectedModalStep.description}
                  </p>

                  {/* Key Deliverables Section */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2.5 mb-5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                      Core Deliverables
                    </div>
                    {selectedModalStep.deliverables.map((item, dIdx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div key={dIdx} className="flex items-center gap-2.5 text-xs text-slate-200">
                          <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 bg-white/[0.08] text-slate-200">
                            <ItemIcon size={12} />
                          </div>
                          <span className="font-normal text-slate-300">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Interactive Flip Action Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.08]">
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span>Card 1 of 2 (Overview)</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCardFlipped(true)}
                      className="px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-white text-xs font-medium flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <span>Flip for Safeguards &amp; Architecture</span>
                      <RotateCw size={13} className="text-slate-300" />
                    </button>
                  </div>
                </div>

                {/* ----------------- BACK OF CARD: Architecture, Comparison & Peace of Mind ----------------- */}
                <div className="w-full absolute inset-0 rounded-[2.2rem] border border-slate-300/30 bg-gradient-to-b from-[#151724]/98 via-[#0e1018]/98 to-[#090a10]/98 p-6 sm:p-8 text-left shadow-[0_30px_90px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.2)] [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between overflow-hidden">
                  {/* Top Brushed Silver Specular Reflection */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />

                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-slate-800/90 text-slate-200 border border-slate-600/40">
                          {selectedModalStep.stepNum} // Safeguards &amp; Specs
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={closeStepModal}
                        className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.15] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3 font-sans">
                      Architecture &amp; Client Guarantee
                    </h4>

                    {/* Peace of Mind Policy */}
                    <div className="p-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/25 flex items-start gap-2.5 mb-3.5">
                      <ShieldCheck size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-emerald-300 mb-0.5">
                          Guaranteed Peace of Mind
                        </div>
                        <p className="text-[12px] text-slate-300 leading-relaxed">
                          {selectedModalStep.clientPeaceOfMind}
                        </p>
                      </div>
                    </div>

                    {/* Agency Difference Contrast */}
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] mb-3.5">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-rose-400/90 mb-1">
                        The Agency Difference
                      </div>
                      <p className="text-xs text-slate-300 font-mono">
                        {selectedModalStep.agencyDifference}
                      </p>
                    </div>

                    {/* Technical Highlights Protocol */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        Technical Safeguards
                      </div>
                      {selectedModalStep.techHighlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <Check size={12} className="text-sky-400 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Interactive Flip Action Bar */}
                  <div className="flex items-center justify-between pt-3 mt-4 border-t border-white/[0.08]">
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span>Card 2 of 2 (Safeguards)</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsCardFlipped(false)}
                      className="px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/20 text-white text-xs font-medium flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <RotateCw size={13} className="text-slate-300" />
                      <span>Flip Back to Overview</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
