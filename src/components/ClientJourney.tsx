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
  ChevronDown,
  ChevronUp,
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
    clientPeaceOfMind: "Zero sales pressure. You keep the technical plan whether we build together or not.",
    agencyDifference: "Vs. 3 weeks of junior account reps and generic sales decks",
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
      { icon: Sparkles, label: "Apple HIG micro-interaction design system" },
    ],
    clientPeaceOfMind: "Test and approve the core experience before a single deep backend line is committed.",
    agencyDifference: "Vs. Weeks of static Figma designs that don't match the actual code",
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
    icon: Rocket,
    accent: "#A78BFA", // Violet Titanium
  },
];

export const ClientJourney: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // Toggle card detail expansion
  const toggleCardExpansion = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Scroll tracking: Trigger begins when the timeline starting point reaches the vertical CENTER of the viewport
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end 85%"],
  });

  // Apple HIG Liquid Spring: Viscous fluid physics with smooth inertia
  const fluidProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001,
  });

  // Secondary delayed fluid trail for viscous organic motion
  const trailProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 26,
    restDelta: 0.001,
  });

  // Responsive active step indicator derived from scroll progress
  React.useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v < 0.25) setActiveStepIndex(0);
      else if (v < 0.5) setActiveStepIndex(1);
      else if (v < 0.75) setActiveStepIndex(2);
      else setActiveStepIndex(3);
    });
  }, [scrollYProgress]);

  // Dynamic connector opacity when the liquid stream flows past each node
  const step1Beam = useTransform(fluidProgress, [0.08, 0.22], [0, 1]);
  const step2Beam = useTransform(fluidProgress, [0.32, 0.46], [0, 1]);
  const step3Beam = useTransform(fluidProgress, [0.56, 0.70], [0, 1]);
  const step4Beam = useTransform(fluidProgress, [0.80, 0.94], [0, 1]);

  return (
    <section
      id="onboarding-process"
      className="py-24 md:py-36 max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 border-t border-white/[0.08] relative overflow-hidden"
    >
      {/* Background Soft Specular Lighting (Apple HIG Ambient Silver & Iridescent Lights) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-slate-200/[0.04] via-sky-500/[0.02] to-transparent rounded-full blur-[140px] pointer-events-none" />
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

      {/* 2. Main Procedural Timeline with Organic Curvy Liquid Silver Stream */}
      <div ref={timelineRef} className="relative min-h-[1200px] z-10">
        {/* DESKTOP PROCEDURAL LIQUID STREAM SVG (md+) */}
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none">
          <svg
            viewBox="0 0 1000 1280"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              {/* Liquid Silver Metallic + Pill Iridescent Color Flow */}
              <linearGradient id="liquid-silver-stream" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="15%" stopColor="#38BDF8" />
                <stop offset="35%" stopColor="#F8FAFC" />
                <stop offset="45%" stopColor="#818CF8" />
                <stop offset="65%" stopColor="#34D399" />
                <stop offset="80%" stopColor="#F1F5F9" />
                <stop offset="92%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>

              {/* Specular Liquid Chrome Core */}
              <linearGradient id="liquid-specular-core" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="25%" stopColor="#BAE6FD" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="75%" stopColor="#DDD6FE" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
              </linearGradient>

              {/* Viscous Soft Liquid Trail */}
              <linearGradient id="liquid-trail-subtle" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.25" />
                <stop offset="30%" stopColor="#38BDF8" stopOpacity="0.3" />
                <stop offset="65%" stopColor="#34D399" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* CURVY ORGANIC LIQUID STREAM PATH
                Natural sweeping S-curves that flow smoothly through the 4 milestone nodes
                (500,20) -> curves left to (450,110) -> (500,200) -> curves right to (560,330)
                -> curves left to (440,430) -> (500,480) -> curves right to (570,610)
                -> (500,720) -> curves left to (430,850) -> (500,960) -> cascades to (500,1180)
            */}

            {/* 1. Base Liquid Channel (Subtle silver groove) */}
            <path
              d="M 500,20 C 440,80 430,140 500,200 C 580,270 575,390 500,480 C 420,570 425,640 500,720 C 580,810 575,890 500,960 C 430,1030 460,1110 500,1180"
              stroke="rgba(226, 232, 240, 0.07)"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* 2. Trailing Viscous Liquid Layer (A bit thicker, glides with soft organic lag) */}
            <motion.path
              d="M 500,20 C 440,80 430,140 500,200 C 580,270 575,390 500,480 C 420,570 425,640 500,720 C 580,810 575,890 500,960 C 430,1030 460,1110 500,1180"
              stroke="url(#liquid-trail-subtle)"
              strokeWidth="10"
              strokeLinecap="round"
              style={{
                pathLength: trailProgress,
              }}
            />

            {/* 3. Primary Liquid Silver & Iridescent Body (Smooth liquid ribbon, NOT a harsh glowing stroke) */}
            <motion.path
              d="M 500,20 C 440,80 430,140 500,200 C 580,270 575,390 500,480 C 420,570 425,640 500,720 C 580,810 575,890 500,960 C 430,1030 460,1110 500,1180"
              stroke="url(#liquid-silver-stream)"
              strokeWidth="6"
              strokeLinecap="round"
              style={{
                pathLength: fluidProgress,
              }}
            />

            {/* 4. Specular Chrome Liquid Core (Apple Pro high-precision liquid reflection) */}
            <motion.path
              d="M 500,20 C 440,80 430,140 500,200 C 580,270 575,390 500,480 C 420,570 425,640 500,720 C 580,810 575,890 500,960 C 430,1030 460,1110 500,1180"
              stroke="url(#liquid-specular-core)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                pathLength: fluidProgress,
              }}
            />

            {/* STEP 1 CONNECTOR WHISKER: Node (500, 200) -> Left Card (440, 200) */}
            <motion.path
              d="M 500,200 L 440,200"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ opacity: step1Beam }}
            />
            <motion.circle
              cx="440"
              cy="200"
              r="2.5"
              fill="#38BDF8"
              style={{ opacity: step1Beam }}
            />

            {/* STEP 2 CONNECTOR WHISKER: Node (500, 480) -> Right Card (560, 480) */}
            <motion.path
              d="M 500,480 L 560,480"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ opacity: step2Beam }}
            />
            <motion.circle
              cx="560"
              cy="480"
              r="2.5"
              fill="#818CF8"
              style={{ opacity: step2Beam }}
            />

            {/* STEP 3 CONNECTOR WHISKER: Node (500, 720) -> Left Card (440, 720) */}
            <motion.path
              d="M 500,720 L 440,720"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ opacity: step3Beam }}
            />
            <motion.circle
              cx="440"
              cy="720"
              r="2.5"
              fill="#34D399"
              style={{ opacity: step3Beam }}
            />

            {/* STEP 4 CONNECTOR WHISKER: Node (500, 960) -> Right Card (560, 960) */}
            <motion.path
              d="M 500,960 L 560,960"
              stroke="#E2E8F0"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ opacity: step4Beam }}
            />
            <motion.circle
              cx="560"
              cy="960"
              r="2.5"
              fill="#A78BFA"
              style={{ opacity: step4Beam }}
            />
          </svg>
        </div>

        {/* MOBILE PROCEDURAL LIQUID STREAM (sm and below) */}
        <div className="block md:hidden absolute inset-y-0 left-5 w-8 pointer-events-none">
          <svg
            viewBox="0 0 32 1280"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="liquid-mobile-stream" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="25%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#818CF8" />
                <stop offset="75%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
            {/* Soft liquid channel */}
            <path
              d="M 16,10 C 26,80 6,140 16,200 C 26,290 6,380 16,480 C 26,590 6,650 16,720 C 26,820 6,890 16,960 C 26,1040 16,1120 16,1180"
              stroke="rgba(226, 232, 240, 0.08)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Fluid body */}
            <motion.path
              d="M 16,10 C 26,80 6,140 16,200 C 26,290 6,380 16,480 C 26,590 6,650 16,720 C 26,820 6,890 16,960 C 26,1040 16,1120 16,1180"
              stroke="url(#liquid-mobile-stream)"
              strokeWidth="5"
              strokeLinecap="round"
              style={{
                pathLength: fluidProgress,
              }}
            />
            {/* Core highlight */}
            <motion.path
              d="M 16,10 C 26,80 6,140 16,200 C 26,290 6,380 16,480 C 26,590 6,650 16,720 C 26,820 6,890 16,960 C 26,1040 16,1120 16,1180"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              style={{
                pathLength: fluidProgress,
              }}
            />
          </svg>
        </div>

        {/* 3. Alternating Milestones: Sharp One-Liners on Surface, Click to Reveal Full Details */}
        <div className="space-y-16 md:space-y-24 relative z-10 pt-4">
          {JOURNEY_STEPS.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            const StepIcon = step.icon;
            const isHovered = hoveredIndex === idx;
            const isExpanded = !!expandedCards[step.id];

            return (
              <div
                key={step.id}
                id={`step-card-${step.id}`}
                className="relative grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-12"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Left Column Card (Steps 01 & 03) */}
                {isLeft ? (
                  <div className="col-span-1 pl-12 md:pl-0 md:col-span-5 md:text-right">
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                      onClick={() => toggleCardExpansion(step.id)}
                      className={`group/card relative p-5 sm:p-6 md:p-7 rounded-[1.8rem] bg-gradient-to-b from-[#13151f]/95 via-[#0e1017]/95 to-[#090a10]/95 backdrop-blur-2xl border transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.65)] cursor-pointer select-none ${
                        isHovered
                          ? "border-slate-300/40 -translate-y-0.5 shadow-[0_22px_55px_rgba(0,0,0,0.85)]"
                          : "border-white/[0.14] hover:border-white/25"
                      }`}
                    >
                      {/* Apple HIG Brushed Silver Specular Top Rim */}
                      <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent" />

                      {/* Header Capsule: Silver Badge + Timeframe */}
                      <div className="flex items-center gap-2 mb-3 md:justify-end">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                          {step.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-slate-800/80 text-slate-200 border border-slate-600/40">
                          {step.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1 font-sans flex items-center md:justify-end gap-2">
                        <span>{step.stepNum}. {step.name}</span>
                        <span className="text-xs font-mono font-normal text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.08]">
                          {step.timeframe}
                        </span>
                      </h3>

                      {/* Sharp, Punchy Main One-Liner (Not content-heavy!) */}
                      <p className="text-white font-medium text-sm sm:text-base leading-snug mb-1.5 mt-2">
                        {step.headline}
                      </p>

                      {/* Relatable, Easy-To-Understand One-Liner Subtext */}
                      <p className="text-slate-300/70 text-xs sm:text-sm leading-relaxed mb-3">
                        {step.oneLinerSub}
                      </p>

                      {/* Sleek Action Affordance (Click to view full details) */}
                      <div className="flex items-center md:justify-end pt-1">
                        <button
                          type="button"
                          onClick={(e) => toggleCardExpansion(step.id, e)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
                        >
                          <span>{isExpanded ? "Hide Details" : "View Details & Scope"}</span>
                          {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>
                      </div>

                      {/* EXPANDABLE DEEP CONTENT (Only shown when user clicks card) */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                            className="overflow-hidden pt-4 mt-3 border-t border-white/[0.08] text-left space-y-3.5"
                          >
                            <p className="text-slate-300 text-xs leading-relaxed">
                              {step.description}
                            </p>

                            {/* Deliverables Widget Box */}
                            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                                Key Deliverables
                              </div>
                              {step.deliverables.map((item, dIdx) => {
                                const ItemIcon = item.icon;
                                return (
                                  <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-200">
                                    <div
                                      className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-white/[0.08] text-slate-200"
                                    >
                                      <ItemIcon size={12} />
                                    </div>
                                    <span className="font-normal text-slate-300">{item.label}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Peace of Mind Callout */}
                            <div className="p-2.5 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/20 flex items-start gap-2">
                              <ShieldCheck size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span className="text-[11px] text-slate-300 leading-snug">
                                <strong className="text-white font-medium">Peace of Mind:</strong> {step.clientPeaceOfMind}
                              </span>
                            </div>

                            {/* Agency Difference */}
                            <div className="text-[11px] font-mono text-slate-400 italic">
                              {step.agencyDifference}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                ) : (
                  <div className="hidden md:block md:col-span-5" />
                )}

                {/* Central Waypoint Checkpoint Node (Liquid Metallic Capsule) */}
                <div className="absolute left-1 md:relative md:left-0 md:col-span-2 flex items-center justify-center pointer-events-auto">
                  <div
                    className="relative group/node cursor-pointer"
                    onClick={() => {
                      toggleCardExpansion(step.id);
                      const el = document.getElementById(`step-card-${step.id}`);
                      el?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }}
                  >
                    {/* Active Optical Aura on Hover */}
                    <div
                      className={`absolute -inset-2.5 rounded-full transition-opacity duration-300 pointer-events-none ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        background: `radial-gradient(circle, rgba(226, 232, 240, 0.25) 0%, transparent 70%)`,
                      }}
                    />

                    {/* Apple Pro Silver Titanium Node Capsule */}
                    <div
                      className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0d0e15] border flex items-center justify-center relative z-10 transition-all duration-300 ${
                        isHovered
                          ? "scale-110 border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                          : "border-slate-400/40 shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                      }`}
                    >
                      <StepIcon size={18} className="text-slate-200" />
                    </div>

                    {/* Number Indicator Beneath Node */}
                    <div className="hidden md:block absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-slate-400 tracking-widest uppercase">
                      {step.stepNum}
                    </div>
                  </div>
                </div>

                {/* Right Column Card (Steps 02 & 04) */}
                {!isLeft ? (
                  <div className="col-span-1 pl-12 md:pl-0 md:col-span-5 text-left">
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                      onClick={() => toggleCardExpansion(step.id)}
                      className={`group/card relative p-5 sm:p-6 md:p-7 rounded-[1.8rem] bg-gradient-to-b from-[#13151f]/95 via-[#0e1017]/95 to-[#090a10]/95 backdrop-blur-2xl border transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.65)] cursor-pointer select-none ${
                        isHovered
                          ? "border-slate-300/40 -translate-y-0.5 shadow-[0_22px_55px_rgba(0,0,0,0.85)]"
                          : "border-white/[0.14] hover:border-white/25"
                      }`}
                    >
                      {/* Apple HIG Brushed Silver Specular Top Rim */}
                      <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent" />

                      {/* Header Capsule: Silver Badge + Timeframe */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                          {step.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-500" />
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase font-semibold bg-slate-800/80 text-slate-200 border border-slate-600/40">
                          {step.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1 font-sans flex items-center gap-2">
                        <span>{step.stepNum}. {step.name}</span>
                        <span className="text-xs font-mono font-normal text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.08]">
                          {step.timeframe}
                        </span>
                      </h3>

                      {/* Sharp, Punchy Main One-Liner (Not content-heavy!) */}
                      <p className="text-white font-medium text-sm sm:text-base leading-snug mb-1.5 mt-2">
                        {step.headline}
                      </p>

                      {/* Relatable, Easy-To-Understand One-Liner Subtext */}
                      <p className="text-slate-300/70 text-xs sm:text-sm leading-relaxed mb-3">
                        {step.oneLinerSub}
                      </p>

                      {/* Sleek Action Affordance (Click to view full details) */}
                      <div className="flex items-center pt-1">
                        <button
                          type="button"
                          onClick={(e) => toggleCardExpansion(step.id, e)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
                        >
                          <span>{isExpanded ? "Hide Details" : "View Details & Scope"}</span>
                          {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>
                      </div>

                      {/* EXPANDABLE DEEP CONTENT (Only shown when user clicks card) */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                            className="overflow-hidden pt-4 mt-3 border-t border-white/[0.08] text-left space-y-3.5"
                          >
                            <p className="text-slate-300 text-xs leading-relaxed">
                              {step.description}
                            </p>

                            {/* Deliverables Widget Box */}
                            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                                Key Deliverables
                              </div>
                              {step.deliverables.map((item, dIdx) => {
                                const ItemIcon = item.icon;
                                return (
                                  <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-200">
                                    <div
                                      className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-white/[0.08] text-slate-200"
                                    >
                                      <ItemIcon size={12} />
                                    </div>
                                    <span className="font-normal text-slate-300">{item.label}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Peace of Mind Callout */}
                            <div className="p-2.5 rounded-lg bg-emerald-500/[0.06] border border-emerald-500/20 flex items-start gap-2">
                              <ShieldCheck size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                              <span className="text-[11px] text-slate-300 leading-snug">
                                <strong className="text-white font-medium">Peace of Mind:</strong> {step.clientPeaceOfMind}
                              </span>
                            </div>

                            {/* Agency Difference */}
                            <div className="text-[11px] font-mono text-slate-400 italic">
                              {step.agencyDifference}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
        <div className="mt-20 md:mt-28 relative max-w-3xl mx-auto">
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
    </section>
  );
};
