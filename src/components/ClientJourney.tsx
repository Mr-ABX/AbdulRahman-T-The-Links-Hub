import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
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
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface JourneyStep {
  id: string;
  stepNum: string;
  category: string;
  name: string;
  badge: string;
  timeframe: string;
  headline: string;
  description: string;
  deliverables: { icon: React.ElementType; label: string }[];
  clientPeaceOfMind: string;
  agencyDifference: string;
  icon: React.ElementType;
  accent: string;
  accentGradient: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "discovery",
    stepNum: "01",
    category: "ALIGNMENT",
    name: "Discovery",
    badge: "Stage 01 • Low Stress",
    timeframe: "20-Min Strategy Call",
    headline: "Zero jargon. Real architectural clarity in minutes.",
    description:
      "A friendly, conversational deep dive. We unpack your product goals, map technical constraints, and define the exact scope — no preparation or 40-page briefs required.",
    deliverables: [
      { icon: Compass, label: "Technical feasibility assessment" },
      { icon: Clock, label: "Detailed timeline & milestone breakdown" },
      { icon: ShieldCheck, label: "Guaranteed fixed-price proposal" },
    ],
    clientPeaceOfMind: "Zero sales pitch. You leave with an actionable technical plan whether we build together or not.",
    agencyDifference: "Vs. 3 weeks of junior sales reps and generic boilerplate decks",
    icon: Search,
    accent: "#38BDF8", // Frost Sky
    accentGradient: "linear-gradient(135deg, #38BDF8, #818CF8)",
  },
  {
    id: "strategy",
    stepNum: "02",
    category: "ARCHITECTURE",
    name: "Strategy",
    badge: "Stage 02 • Rapid Clarity",
    timeframe: "Days 2 – 5 • Interactive Prototype",
    headline: "A clickable build on your phone within days, not months.",
    description:
      "Instead of static PDF mockups, you receive a real interactive staging URL. Experience spatial typography, gestures, and responsive flows early so there are no surprises.",
    deliverables: [
      { icon: Layers, label: "Live clickable staging link (mobile & web)" },
      { icon: Zap, label: "System architecture & database schema" },
      { icon: Sparkles, label: "Apple HIG micro-interaction design system" },
    ],
    clientPeaceOfMind: "Touch and test the core experience before a single deep backend line is written.",
    agencyDifference: "Vs. Weeks of disconnected Figma screens that don't match real code",
    icon: Compass,
    accent: "#818CF8", // Indigo Frost
    accentGradient: "linear-gradient(135deg, #818CF8, #C084FC)",
  },
  {
    id: "execution",
    stepNum: "03",
    category: "VELOCITY",
    name: "Execution",
    badge: "Stage 03 • Direct Access",
    timeframe: "Sprint Velocity • Daily Updates",
    headline: "Direct 1-on-1 contact with your lead architect.",
    description:
      "No account managers or telephone games. You get a private Slack or Telegram channel with asynchronous Loom video walkthroughs and daily milestone deployments.",
    deliverables: [
      { icon: Video, label: "Recorded async video walkthroughs for each sprint" },
      { icon: FileCode2, label: "Private GitHub repository with live changelogs" },
      { icon: MessageSquare, label: "Sub-hour direct responses on Slack/WhatsApp" },
    ],
    clientPeaceOfMind: "Watch your product evolve in real time with continuous staging builds you can inspect.",
    agencyDifference: "Vs. Slow bureaucratic ticket queues and junior offshore handoffs",
    icon: Code2,
    accent: "#34D399", // Emerald Mint
    accentGradient: "linear-gradient(135deg, #34D399, #06B6D4)",
  },
  {
    id: "delivery",
    stepNum: "04",
    category: "LAUNCH & IP",
    name: "Delivery",
    badge: "Stage 04 • Turnkey Handover",
    timeframe: "Production Launch • 30-Day Shield",
    headline: "Flawless deployment with 100% intellectual property transfer.",
    description:
      "Zero-downtime production deployment, 95+ Google Lighthouse scores, complete documentation, and 30 days of comprehensive post-launch warranty support.",
    deliverables: [
      { icon: Rocket, label: "Zero-downtime production cloud rollout" },
      { icon: ShieldCheck, label: "100% code, domain & asset ownership transfer" },
      { icon: CheckCircle2, label: "30-day bug-free safety warranty & maintenance" },
    ],
    clientPeaceOfMind: "You own every line of code with clean documentation, ready to scale independently.",
    agencyDifference: "Vs. Costly lock-in retainers and hostage hosting fees",
    icon: Rocket,
    accent: "#A78BFA", // Violet Titanium
    accentGradient: "linear-gradient(135deg, #A78BFA, #F472B6)",
  },
];

export const ClientJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Scroll tracking across the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 80%"],
  });

  // Apple HIG Dual Liquid Springs: Leading fast stroke + Delayed trailing stroke
  const leadProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  const trailProgress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 28,
    restDelta: 0.001,
  });

  // Responsive active step indicator derived from scroll
  React.useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v < 0.25) setActiveStepIndex(0);
      else if (v < 0.5) setActiveStepIndex(1);
      else if (v < 0.75) setActiveStepIndex(2);
      else setActiveStepIndex(3);
    });
  }, [scrollYProgress]);

  // Dynamic connector opacity based on scroll
  const step1Beam = useTransform(leadProgress, [0.08, 0.22], [0, 1]);
  const step2Beam = useTransform(leadProgress, [0.32, 0.46], [0, 1]);
  const step3Beam = useTransform(leadProgress, [0.56, 0.7], [0, 1]);
  const step4Beam = useTransform(leadProgress, [0.8, 0.94], [0, 1]);

  return (
    <section
      id="onboarding-process"
      ref={containerRef}
      className="py-24 md:py-36 max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8 border-t border-white/[0.08] relative overflow-hidden"
    >
      {/* Background Soft Specular Lighting (Apple HIG Ambient Light) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-gradient-to-b from-sky-500/[0.03] to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-16 right-1/4 w-[480px] h-[480px] bg-purple-500/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* 1. Apple HIG Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 sm:w-12 h-4 sm:h-5 rounded-full overflow-hidden relative shadow-[0_0_12px_rgba(56,189,248,0.25)] shrink-0 border border-white/20">
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
            <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />
          </div>
          <span className="text-xs font-mono tracking-widest uppercase text-white/50">
            06 // ONBOARDING & PROCESS
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 font-sans">
          The Frictionless Path to Launch.
        </h2>
        <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          From first conversation to turnkey handover. Clean architecture, direct communication, and rapid weekly milestones designed around absolute peace of mind.
        </p>

        {/* Apple HIG Quick Stage Badges */}
        <div className="inline-flex items-center justify-center p-1 mt-6 rounded-full bg-[#12131b]/80 border border-white/[0.08] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          {JOURNEY_STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                const el = document.getElementById(`step-card-${s.id}`);
                el?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all cursor-pointer flex items-center gap-1.5 ${
                activeStepIndex === idx
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              <span className="text-[10px] font-mono opacity-60">0{idx + 1}</span>
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Procedural Timeline with Dual Liquid Strokes */}
      <div className="relative min-h-[1200px] z-10">
        {/* DESKTOP PROCEDURAL SVG CANVAS (md+) */}
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none">
          <svg
            viewBox="0 0 1000 1280"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              {/* Refined Apple Pro Metallic Fluid Gradients */}
              <linearGradient id="liquid-lead-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="30%" stopColor="#818CF8" />
                <stop offset="65%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>

              <linearGradient id="liquid-trail-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#818CF8" stopOpacity="0.4" />
                <stop offset="65%" stopColor="#34D399" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Note: Dotted guide lines have been made completely invisible as requested for pure immersive minimalism */}

            {/* SECONDARY TRAILING LIQUID STROKE (Moves with smooth viscous delay) */}
            <motion.path
              d="M 500,20 C 420,95 440,140 500,200 C 560,260 580,380 500,450 C 420,520 440,640 500,700 C 560,760 580,880 500,950 C 440,1020 480,1100 500,1180"
              stroke="url(#liquid-trail-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              style={{
                pathLength: trailProgress,
              }}
            />

            {/* PRIMARY LEADING METALLIC LIQUID STROKE (Crisp, moves first, non-glowing clean stroke) */}
            <motion.path
              d="M 500,20 C 420,95 440,140 500,200 C 560,260 580,380 500,450 C 420,520 440,640 500,700 C 560,760 580,880 500,950 C 440,1020 480,1100 500,1180"
              stroke="url(#liquid-lead-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{
                pathLength: leadProgress,
              }}
            />

            {/* STEP 1 CONNECTOR WHISKER: Node (500, 200) -> Left Card (440, 200) */}
            <motion.path
              d="M 500,200 L 440,200"
              stroke="#38BDF8"
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

            {/* STEP 2 CONNECTOR WHISKER: Node (500, 450) -> Right Card (560, 450) */}
            <motion.path
              d="M 500,450 L 560,450"
              stroke="#818CF8"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ opacity: step2Beam }}
            />
            <motion.circle
              cx="560"
              cy="450"
              r="2.5"
              fill="#818CF8"
              style={{ opacity: step2Beam }}
            />

            {/* STEP 3 CONNECTOR WHISKER: Node (500, 700) -> Left Card (440, 700) */}
            <motion.path
              d="M 500,700 L 440,700"
              stroke="#34D399"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ opacity: step3Beam }}
            />
            <motion.circle
              cx="440"
              cy="700"
              r="2.5"
              fill="#34D399"
              style={{ opacity: step3Beam }}
            />

            {/* STEP 4 CONNECTOR WHISKER: Node (500, 950) -> Right Card (560, 950) */}
            <motion.path
              d="M 500,950 L 560,950"
              stroke="#A78BFA"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ opacity: step4Beam }}
            />
            <motion.circle
              cx="560"
              cy="950"
              r="2.5"
              fill="#A78BFA"
              style={{ opacity: step4Beam }}
            />
          </svg>
        </div>

        {/* MOBILE PROCEDURAL SVG CANVAS (sm and below) */}
        <div className="block md:hidden absolute inset-y-0 left-5 w-8 pointer-events-none">
          <svg
            viewBox="0 0 32 1280"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="liquid-mobile-lead" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="35%" stopColor="#818CF8" />
                <stop offset="70%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
            {/* Trailing secondary stroke */}
            <motion.path
              d="M 16,10 C 24,80 8,140 16,200 C 24,270 8,380 16,450 C 24,530 8,640 16,700 C 24,780 8,890 16,950 C 24,1030 16,1120 16,1180"
              stroke="rgba(56, 189, 248, 0.25)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{
                pathLength: trailProgress,
              }}
            />
            {/* Leading primary crisp stroke */}
            <motion.path
              d="M 16,10 C 24,80 8,140 16,200 C 24,270 8,380 16,450 C 24,530 8,640 16,700 C 24,780 8,890 16,950 C 24,1030 16,1120 16,1180"
              stroke="url(#liquid-mobile-lead)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                pathLength: leadProgress,
              }}
            />
          </svg>
        </div>

        {/* 3. Alternating Milestones with Creative Checkpoint Bridge Interactivity */}
        <div className="space-y-16 md:space-y-24 relative z-10 pt-4">
          {JOURNEY_STEPS.map((step, idx) => {
            const isLeft = idx % 2 === 0;
            const StepIcon = step.icon;
            const isHovered = hoveredIndex === idx;

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
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className={`relative p-6 sm:p-7 md:p-8 rounded-[2rem] bg-[#0c0d13]/85 backdrop-blur-2xl border transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.6)] ${
                        isHovered
                          ? "border-white/25 -translate-y-1 shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
                          : "border-white/[0.08] hover:border-white/15"
                      }`}
                    >
                      {/* Top Specular Edge Highlight (Apple HIG signature) */}
                      <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      {/* Header Capsule */}
                      <div className="flex items-center gap-2 mb-3.5 md:justify-end">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                          {step.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold border"
                          style={{
                            backgroundColor: `${step.accent}12`,
                            color: step.accent,
                            borderColor: `${step.accent}30`,
                          }}
                        >
                          {step.badge}
                        </span>
                      </div>

                      {/* Title & Timeframe */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1 font-sans">
                        {step.stepNum}. {step.name}
                      </h3>
                      <div className="text-xs font-mono text-white/60 mb-3 md:justify-end flex items-center gap-1.5">
                        <Clock size={12} className="text-sky-400" />
                        <span>{step.timeframe}</span>
                      </div>

                      {/* Headline & Description */}
                      <p className="text-white/90 text-sm font-medium leading-relaxed mb-2">
                        {step.headline}
                      </p>
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-5">
                        {step.description}
                      </p>

                      {/* Deliverables Widget Box */}
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left mb-4 space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">
                          Key Deliverables
                        </div>
                        {step.deliverables.map((item, dIdx) => {
                          const ItemIcon = item.icon;
                          return (
                            <div key={dIdx} className="flex items-center gap-2.5 text-xs text-neutral-200">
                              <div
                                className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                                style={{ backgroundColor: `${step.accent}15`, color: step.accent }}
                              >
                                <ItemIcon size={12} />
                              </div>
                              <span className="font-normal text-white/80">{item.label}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Peace of Mind Highlight Callout */}
                      <div className="pt-3 border-t border-white/[0.06] flex items-start gap-2 text-left">
                        <ShieldCheck size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-white/60 leading-normal">
                          <strong className="text-white/90 font-medium">Peace of Mind:</strong> {step.clientPeaceOfMind}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="hidden md:block md:col-span-5" />
                )}

                {/* Central Waypoint Checkpoint Node (Threaded Directly on Curve) */}
                <div className="absolute left-1 md:relative md:left-0 md:col-span-2 flex items-center justify-center pointer-events-auto">
                  <div
                    className="relative group/node cursor-pointer"
                    onClick={() => {
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
                        background: `radial-gradient(circle, ${step.accent}30 0%, transparent 70%)`,
                      }}
                    />

                    {/* Apple HIG Pro Metallic Node Capsule */}
                    <div
                      className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0a0b10] border flex items-center justify-center relative z-10 transition-all duration-300 ${
                        isHovered
                          ? "scale-110 border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                          : "border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
                      }`}
                      style={{
                        borderColor: isHovered ? step.accent : undefined,
                      }}
                    >
                      <StepIcon size={18} style={{ color: step.accent }} />
                    </div>

                    {/* Number Indicator Beneath Node */}
                    <div className="hidden md:block absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-white/50 tracking-widest uppercase">
                      {step.stepNum}
                    </div>
                  </div>
                </div>

                {/* Right Column Card (Steps 02 & 04) */}
                {!isLeft ? (
                  <div className="col-span-1 pl-12 md:pl-0 md:col-span-5 text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className={`relative p-6 sm:p-7 md:p-8 rounded-[2rem] bg-[#0c0d13]/85 backdrop-blur-2xl border transition-all duration-300 shadow-[0_16px_40px_rgba(0,0,0,0.6)] ${
                        isHovered
                          ? "border-white/25 -translate-y-1 shadow-[0_24px_60px_rgba(0,0,0,0.85)]"
                          : "border-white/[0.08] hover:border-white/15"
                      }`}
                    >
                      {/* Top Specular Edge Highlight */}
                      <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      {/* Header Capsule */}
                      <div className="flex items-center gap-2 mb-3.5">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
                          {step.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold border"
                          style={{
                            backgroundColor: `${step.accent}12`,
                            color: step.accent,
                            borderColor: `${step.accent}30`,
                          }}
                        >
                          {step.badge}
                        </span>
                      </div>

                      {/* Title & Timeframe */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1 font-sans">
                        {step.stepNum}. {step.name}
                      </h3>
                      <div className="text-xs font-mono text-white/60 mb-3 flex items-center gap-1.5">
                        <Clock size={12} className="text-sky-400" />
                        <span>{step.timeframe}</span>
                      </div>

                      {/* Headline & Description */}
                      <p className="text-white/90 text-sm font-medium leading-relaxed mb-2">
                        {step.headline}
                      </p>
                      <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-5">
                        {step.description}
                      </p>

                      {/* Deliverables Widget Box */}
                      <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left mb-4 space-y-2">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">
                          Key Deliverables
                        </div>
                        {step.deliverables.map((item, dIdx) => {
                          const ItemIcon = item.icon;
                          return (
                            <div key={dIdx} className="flex items-center gap-2.5 text-xs text-neutral-200">
                              <div
                                className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                                style={{ backgroundColor: `${step.accent}15`, color: step.accent }}
                              >
                                <ItemIcon size={12} />
                              </div>
                              <span className="font-normal text-white/80">{item.label}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Peace of Mind Highlight Callout */}
                      <div className="pt-3 border-t border-white/[0.06] flex items-start gap-2 text-left">
                        <ShieldCheck size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] text-white/60 leading-normal">
                          <strong className="text-white/90 font-medium">Peace of Mind:</strong> {step.clientPeaceOfMind}
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
        <div className="mt-20 md:mt-28 relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[2.2rem] bg-gradient-to-b from-[#12131d]/95 via-[#0c0d14]/95 to-[#07080d]/95 border border-white/[0.12] p-7 sm:p-9 md:p-11 shadow-[0_24px_70px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.12)] text-center relative overflow-hidden backdrop-blur-2xl"
          >
            {/* Top Specular Ray */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-sky-400 uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for 2 Select Projects this Quarter</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3 font-sans">
              Start Your Project with Complete Confidence.
            </h3>

            <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8">
              Book a no-pressure 20-minute discovery call to discuss your goals, test feasibility, and receive an exact fixed scope within 24 hours.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://calendly.com/digital-b3asts/quick-free-consultation"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
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

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] font-mono text-white/40">
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
