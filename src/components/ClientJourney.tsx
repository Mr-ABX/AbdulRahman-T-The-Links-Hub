import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
  Calendar,
  Zap,
  Rocket,
  Layers,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface JourneyMilestone {
  id: string;
  step: string;
  title: string;
  tag: string;
  timeframe: string;
  description: string;
  highlights: string[];
  agencyContrast: string;
  icon: React.ElementType;
  accent: string;
  glow: string;
}

const MILESTONES: JourneyMilestone[] = [
  {
    id: "step-1",
    step: "01",
    title: "Low-Stress Discovery",
    tag: "Stage 01 • Zero Jargon",
    timeframe: "20-Min Casual Strategy Chat",
    description:
      "A relaxed, conversational call. You share your goal or challenge — I translate it into technical feasibility, timeline, and a clear fixed roadmap.",
    highlights: [
      "No prep or technical brief required",
      "Instant architectural feasibility check",
      "Transparent fixed quote delivered within 24 hours",
    ],
    agencyContrast: "Vs. Agency: 3 weeks of junior sales reps & 40-page questionnaires",
    icon: Calendar,
    accent: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: "step-2",
    step: "02",
    title: "Interactive Staging Preview",
    tag: "Stage 02 • Rapid Clarity",
    timeframe: "Days 2 – 5 • First Working Link",
    description:
      "You shouldn't wait months to touch your product. Experience a live clickable build directly on your phone and browser before deep coding begins.",
    highlights: [
      "Tactile UI & spatial layout in days",
      "Dial in animations, typography & feel early",
      "Zero guessing from static Figma/PDF screens",
    ],
    agencyContrast: "Vs. Agency: Weeks of disconnected static mockups",
    icon: Layers,
    accent: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.4)",
  },
  {
    id: "step-3",
    step: "03",
    title: "Direct Async Development",
    tag: "Stage 03 • Pure Velocity",
    timeframe: "High-Velocity Sprints • Daily Syncs",
    description:
      "Work directly with the engineer building your platform. Private Telegram/WhatsApp channel with video Loom walkthroughs and rapid iterations.",
    highlights: [
      "Direct 1-on-1 contact (sub-hour responses)",
      "Weekly staging deployments you can test live",
      "Zero account managers or bureaucratic lag",
    ],
    agencyContrast: "Vs. Agency: Slow telephone game through middle managers",
    icon: Zap,
    accent: "#10B981",
    glow: "rgba(16, 185, 129, 0.4)",
  },
  {
    id: "step-4",
    step: "04",
    title: "Turnkey Launch & 30-Day Shield",
    tag: "Stage 04 • Total Peace of Mind",
    timeframe: "Production Day • Complete Ownership",
    description:
      "Production deployment to your cloud or domain, 95+ performance scores, full source code handover, and 30 days of complimentary safety warranty.",
    highlights: [
      "100% intellectual property & code ownership",
      "Production cloud rollout with zero downtime",
      "30-day post-launch support and bug warranty",
    ],
    agencyContrast: "Vs. Agency: Expensive retainers and proprietary hosting lock-ins",
    icon: Rocket,
    accent: "#A855F7",
    glow: "rgba(168, 85, 247, 0.4)",
  },
];

export const ClientJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Track scroll progression through the timeline section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 75%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  // Transform scroll progress to SVG path length & glow opacity
  const beamOpacity = useTransform(smoothProgress, [0, 0.05], [0.3, 1]);

  return (
    <section
      id="client-journey"
      ref={containerRef}
      className="py-24 md:py-36 max-w-[1300px] mx-auto px-4 md:px-8 border-t border-white/[0.08] relative overflow-hidden"
    >
      {/* Ambient background refraction */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-600/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Apple HIG Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 sm:w-12 h-4 sm:h-5 rounded-full overflow-hidden relative shadow-[0_0_16px_rgba(6,182,212,0.4)] shrink-0 border border-white/15">
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                background: "linear-gradient(120deg, #06B6D4 0%, #3B82F6 40%, #10B981 75%, #A855F7 100%)",
                backgroundSize: "220% 220%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]" />
          </div>
          <span className="text-xs font-mono tracking-widest uppercase text-white/50">
            06 // THE CLIENT JOURNEY & WORKFLOW
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 font-sans">
          The Frictionless Path to Launch.
        </h2>
        <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          No bureaucracy, no confusing technical speak, and no surprise costs. Follow the interactive beam to see how we progress from initial conversation to finished product.
        </p>

        {/* Quick Comfort Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-emerald-400">
            <CheckCircle2 size={12} /> 100% Transparent
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-cyan-400">
            <Zap size={12} /> Direct Engineer Access
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-amber-400">
            <Clock size={12} /> Live Preview in Days
          </span>
        </div>
      </div>

      {/* Main Timeline Stage with Curvy Liquid S-Curve Path */}
      <div className="relative min-h-[1100px] z-10">
        {/* DESKTOP CURVY LIQUID SPLINE SVG (md+) */}
        <div className="hidden md:block absolute inset-0 w-full h-full pointer-events-none">
          <svg
            viewBox="0 0 1000 1250"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              {/* Dynamic Gradient along the fluid wave */}
              <linearGradient id="curvy-liquid-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="28%" stopColor="#06B6D4" />
                <stop offset="62%" stopColor="#10B981" />
                <stop offset="92%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>

              {/* Specular fluid glow filter */}
              <filter id="liquid-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Static Fluid Wave Guide Track (Abstract Curvy Stroke) */}
            <path
              d="M 500,20 C 400,90 260,110 260,200 C 260,330 740,330 740,460 C 740,590 260,590 260,720 C 260,850 740,850 740,980 C 740,1090 500,1120 500,1210"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="8 10"
            />

            {/* Ambient Diffuse Fluid Glow Trail */}
            <motion.path
              d="M 500,20 C 400,90 260,110 260,200 C 260,330 740,330 740,460 C 740,590 260,590 260,720 C 260,850 740,850 740,980 C 740,1090 500,1120 500,1210"
              stroke="url(#curvy-liquid-grad)"
              strokeWidth="14"
              strokeLinecap="round"
              opacity={0.25}
              style={{
                pathLength: smoothProgress,
                opacity: beamOpacity,
              }}
              filter="url(#liquid-glow)"
            />

            {/* Core Active Liquid Neon Beam (Draws Procedurally with Scroll) */}
            <motion.path
              d="M 500,20 C 400,90 260,110 260,200 C 260,330 740,330 740,460 C 740,590 260,590 260,720 C 260,850 740,850 740,980 C 740,1090 500,1120 500,1210"
              stroke="url(#curvy-liquid-grad)"
              strokeWidth="3.5"
              strokeLinecap="round"
              style={{
                pathLength: smoothProgress,
              }}
            />
          </svg>
        </div>

        {/* MOBILE CURVY LIQUID SPLINE SVG (sm and below) */}
        <div className="block md:hidden absolute inset-y-0 left-6 w-12 pointer-events-none">
          <svg
            viewBox="0 0 48 1250"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="curvy-liquid-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="30%" stopColor="#06B6D4" />
                <stop offset="65%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
            {/* Guide Track */}
            <path
              d="M 24,10 C 38,90 10,130 24,200 C 38,270 10,390 24,460 C 38,530 10,650 24,720 C 38,790 10,910 24,980 C 38,1050 24,1150 24,1210"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="3"
              strokeDasharray="6 8"
            />
            {/* Glowing Active Mobile Stream */}
            <motion.path
              d="M 24,10 C 38,90 10,130 24,200 C 38,270 10,390 24,460 C 38,530 10,650 24,720 C 38,790 10,910 24,980 C 38,1050 24,1150 24,1210"
              stroke="url(#curvy-liquid-mobile)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{
                pathLength: smoothProgress,
              }}
            />
          </svg>
        </div>

        {/* Milestones Layout: Alternating Cards on Desktop, Left-Rail Stream on Mobile */}
        <div className="space-y-16 md:space-y-24 relative z-10 pt-4">
          {MILESTONES.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            const Icon = item.icon;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={item.id}
                className="relative grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-12"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Desktop Left-aligned Card */}
                {isLeft ? (
                  <div className="col-span-1 pl-12 md:pl-0 md:col-span-5 md:text-right">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className={`relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#12131b] to-[#090a10] border transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.7)] ${
                        isHovered
                          ? "border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.15)] scale-[1.01]"
                          : "border-white/[0.1] hover:border-white/20"
                      }`}
                    >
                      {/* Top Specular Edge */}
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      {/* Header Badge */}
                      <div className="flex items-center gap-2 mb-3 md:justify-end">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold border"
                          style={{
                            backgroundColor: `${item.accent}15`,
                            color: item.accent,
                            borderColor: `${item.accent}30`,
                          }}
                        >
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                        {item.title}
                      </h3>
                      <div className="text-xs font-mono text-cyan-400 mb-3 md:justify-end flex items-center gap-1.5">
                        <Clock size={12} />
                        <span>{item.timeframe}</span>
                      </div>

                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Checklist */}
                      <div className="space-y-1.5 mb-4 text-left">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                            <CheckCircle2
                              size={13}
                              className="shrink-0 mt-0.5"
                              style={{ color: item.accent }}
                            />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Micro Agency Contrast Chip */}
                      <div className="pt-3 border-t border-white/[0.08] text-[11px] font-mono text-white/50 text-left">
                        {item.agencyContrast}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="hidden md:block md:col-span-5" />
                )}

                {/* Central Waypoint Node on the Curvy Stream */}
                <div className="absolute left-2 md:relative md:left-0 md:col-span-2 flex items-center justify-center pointer-events-auto">
                  <div className="relative group/node cursor-pointer">
                    {/* Pulsing Ripple */}
                    <motion.div
                      className="absolute -inset-3 rounded-full opacity-60 pointer-events-none blur-[4px]"
                      style={{ backgroundColor: item.glow }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: idx * 0.4,
                      }}
                    />

                    {/* Outer Metallic Ring */}
                    <div
                      className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#0d0e15] border flex items-center justify-center relative z-10 transition-transform duration-300 shadow-[0_0_20px_rgba(0,0,0,0.8)] ${
                        isHovered ? "scale-110" : "scale-100"
                      }`}
                      style={{
                        borderColor: isHovered ? item.accent : "rgba(255,255,255,0.2)",
                        boxShadow: isHovered ? `0 0 25px ${item.glow}` : undefined,
                      }}
                    >
                      <Icon size={18} style={{ color: item.accent }} />
                    </div>

                    {/* Step Number Flag on Node */}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-white/70 tracking-widest uppercase">
                      {item.step}
                    </div>
                  </div>
                </div>

                {/* Right-aligned Card */}
                {!isLeft ? (
                  <div className="col-span-1 pl-12 md:pl-0 md:col-span-5 text-left">
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className={`relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#12131b] to-[#090a10] border transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.7)] ${
                        isHovered
                          ? "border-white/30 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(6,182,212,0.15)] scale-[1.01]"
                          : "border-white/[0.1] hover:border-white/20"
                      }`}
                    >
                      {/* Top Specular Edge */}
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                      {/* Header Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold border"
                          style={{
                            backgroundColor: `${item.accent}15`,
                            color: item.accent,
                            borderColor: `${item.accent}30`,
                          }}
                        >
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                        {item.title}
                      </h3>
                      <div className="text-xs font-mono text-cyan-400 mb-3 flex items-center gap-1.5">
                        <Clock size={12} />
                        <span>{item.timeframe}</span>
                      </div>

                      <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Checklist */}
                      <div className="space-y-1.5 mb-4">
                        {item.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                            <CheckCircle2
                              size={13}
                              className="shrink-0 mt-0.5"
                              style={{ color: item.accent }}
                            />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Micro Agency Contrast Chip */}
                      <div className="pt-3 border-t border-white/[0.08] text-[11px] font-mono text-white/50">
                        {item.agencyContrast}
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

        {/* Terminal Station / High-Conversion CTA Pod (Where the Path Terminates) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 md:mt-28 relative rounded-3xl bg-gradient-to-b from-[#141520] via-[#0d0e16] to-[#07080c] border border-white/[0.14] p-7 sm:p-9 md:p-11 shadow-[0_30px_80px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.15)] text-center max-w-3xl mx-auto overflow-hidden group"
        >
          {/* Top Edge Specular Shimmer */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          {/* Ambient Glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-amber-400 uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>2 Project Openings for This Quarter</span>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3 font-sans">
            Ready for a Frictionless Experience?
          </h3>

          <p className="text-white/60 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8">
            Schedule a relaxed 20-minute strategy call. No pressure, no obligations — we’ll map out your technical scope and deliver an exact roadmap within 24 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://calendly.com/digital-b3asts/quick-free-consultation"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <Calendar size={15} />
              <span>Book 20-Min Discovery Call</span>
              <ArrowRight size={15} />
            </a>

            <a
              href="https://wa.me/923094506904"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
            >
              <MessageSquare size={15} className="text-[#25D366]" />
              <span>Chat Directly on WhatsApp</span>
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-[11px] font-mono text-white/40">
            <span className="flex items-center gap-1">
              <ShieldCheck size={13} className="text-emerald-400" /> Fixed Price
            </span>
            <span>•</span>
            <span>NDA Protected</span>
            <span>•</span>
            <span>Sub-24h Response</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
