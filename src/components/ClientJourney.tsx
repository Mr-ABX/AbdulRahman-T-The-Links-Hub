import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Zap,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Layers,
  ArrowUpRight,
  Terminal,
} from "lucide-react";

interface StepItem {
  id: string;
  stepNumber: string;
  badge: string;
  title: string;
  duration: string;
  shortDesc: string;
  details: string[];
  clientComfort: string;
  withMe: string;
  withAgency: string;
  icon: React.ElementType;
  accentColor: string;
  gradient: string;
}

const STEPS: StepItem[] = [
  {
    id: "discovery",
    stepNumber: "01",
    badge: "Stage 1 // Zero Pressure",
    title: "Low-Stress Discovery & Scope Alignment",
    duration: "20 Minutes • Free Consultation",
    shortDesc:
      "A friendly, jargon-free conversation. You describe your idea, challenge, or vision; I translate it into a clear technical and commercial roadmap.",
    details: [
      "No tech jargon or prep required — just bring your vision",
      "Instant architectural feasibility check & timeline estimation",
      "Transparent fixed-cost scope (no hidden fees or surprise invoices)",
    ],
    clientComfort:
      "You don't need Figma files, technical briefs, or specs ready. We clarify everything together during a relaxed intro chat.",
    withMe:
      "Direct 1-on-1 talk with the lead architect. Roadmap and fixed quote delivered in 24 hours.",
    withAgency:
      "2-3 weeks of sales calls, junior account reps, and 40-page boilerplate questionnaires.",
    icon: Calendar,
    accentColor: "#F59E0B",
    gradient: "from-amber-500/20 via-amber-500/5 to-transparent",
  },
  {
    id: "prototype",
    stepNumber: "02",
    badge: "Stage 2 // Rapid Clarity",
    title: "Live Interactive Prototype & Blueprint",
    duration: "Days 2 - 6 • First Staging Link",
    shortDesc:
      "You shouldn't wait months to see what you're paying for. Within days, you receive an interactive staging build directly on your phone and browser.",
    details: [
      "Clickable prototype & real UI testing before heavy backend work",
      "Micro-interactions, typography, and responsive layouts dialed in",
      "Continuous feedback loop with rapid iteration sprints",
    ],
    clientComfort:
      "Experience the tactile look and feel of your app early. No guessing from static PDFs.",
    withMe:
      "Live interactive preview hosted on private staging URL within 4–7 days.",
    withAgency:
      "Weeks of static wireframes that feel disconnected from the final product.",
    icon: Layers,
    accentColor: "#3B82F6",
    gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
  },
  {
    id: "build",
    stepNumber: "03",
    badge: "Stage 3 // Pure Velocity",
    title: "Direct Async Build & Weekly Milestones",
    duration: "Days 7 - 21 • High-Velocity Sprints",
    shortDesc:
      "Direct communication via a private Telegram or Slack channel. Watch features ship in real-time without bureaucratic bottlenecks.",
    details: [
      "Private 1-on-1 communication channel (sub-hour response times)",
      "Weekly video Loom walkthroughs showcasing completed deliverables",
      "Continuous staging deployments so you can test as we build",
    ],
    clientComfort:
      "Total transparency. You never wonder 'what is happening with my project?' — you see progress live every few days.",
    withMe:
      "Zero middle managers. Direct chat with the engineer crafting your code.",
    withAgency:
      "Messages filtered through account managers, taking 48 hours for simple answers.",
    icon: Zap,
    accentColor: "#10B981",
    gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
  },
  {
    id: "launch",
    stepNumber: "04",
    badge: "Stage 4 // Complete Peace of Mind",
    title: "Turnkey Launch & 30-Day Post-Launch Warranty",
    duration: "Production Day • Flawless Handover",
    shortDesc:
      "Production deployment to your cloud or custom domain, 95+ Lighthouse speed scores, 100% intellectual property transfer, and a 30-day warranty.",
    details: [
      "Cloud provisioning (Cloud Run / Vercel / AWS / Custom Server)",
      "100% source code, repository, and design asset ownership transferred",
      "30-day complimentary post-launch support and bug warranty included",
    ],
    clientComfort:
      "You are never left stranded after delivery. Full documentation, video guides, and guaranteed post-launch safety.",
    withMe:
      "Complete turnkey ownership. Clean handoff with guaranteed 30-day safety net.",
    withAgency:
      "Lock-in retainers, proprietary hosting traps, or expensive post-launch maintenance contracts.",
    icon: Rocket,
    accentColor: "#A855F7",
    gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
  },
];

export const ClientJourney: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"with-me" | "comparison">("with-me");
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  // Auto-advance optionally if user enables or leave as responsive
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const activeStep = STEPS[activeStepIndex];

  return (
    <section
      id="client-journey"
      className="py-20 md:py-28 max-w-[1250px] mx-auto px-4 md:px-8 border-t border-white/[0.08] relative overflow-hidden"
    >
      {/* Ambient background refraction */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 sm:w-12 h-4 sm:h-5 rounded-full overflow-hidden relative shadow-[0_0_15px_rgba(59,130,246,0.35)] shrink-0 group/capsule border border-white/10">
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{
                background: "linear-gradient(120deg, #06B6D4 0%, #3B82F6 50%, #6366F1 100%)",
                backgroundSize: "200% 200%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]" />
          </div>
          <span className="text-xs font-mono tracking-widest uppercase text-white/50">
            06 // CLIENT JOURNEY & WORKFLOW
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 font-sans">
          The Frictionless Path from Vision to Launch.
        </h2>
        <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          No bureaucratic bloat, no confusing jargon, and no surprise costs. Here is exactly how we take your idea from initial sketch to polished production.
        </p>

        {/* Perspective Mode Switcher */}
        <div className="inline-flex items-center p-1 mt-6 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl">
          <button
            onClick={() => setViewMode("with-me")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              viewMode === "with-me"
                ? "bg-white text-black font-semibold shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            Direct Process Overview
          </button>
          <button
            onClick={() => setViewMode("comparison")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              viewMode === "comparison"
                ? "bg-white text-black font-semibold shadow-md"
                : "text-white/60 hover:text-white"
            }`}
          >
            <span>Why Not An Agency?</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10">
        {/* Step Progression Ribbon / Waypoints */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const IconComponent = step.icon;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStepIndex(idx);
                  setIsAutoPlay(false);
                }}
                className={`relative p-4 rounded-2xl border text-left transition-all duration-300 group overflow-hidden ${
                  isActive
                    ? "bg-[#141620] border-white/25 shadow-[0_10px_25px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)]"
                    : "bg-[#0b0c11]/80 border-white/[0.07] hover:border-white/15 hover:bg-[#10121a]/90 text-white/60"
                }`}
              >
                {/* Active glow top bar */}
                {isActive && (
                  <motion.div
                    layoutId="active-step-bar"
                    className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                  />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-bold ${
                      isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    STEP {step.stepNumber}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? "bg-white/10 text-white shadow-inner"
                        : "bg-white/[0.03] text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    <IconComponent size={14} />
                  </div>
                </div>

                <div
                  className={`text-xs sm:text-sm font-semibold tracking-tight line-clamp-1 ${
                    isActive ? "text-white" : "text-white/70 group-hover:text-white"
                  }`}
                >
                  {step.title.split("&")[0]}
                </div>
                <div className="text-[11px] text-white/40 mt-1 font-mono">{step.duration.split("•")[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeStep.id}-${viewMode}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="relative rounded-3xl bg-gradient-to-b from-[#13141c] to-[#0a0b10] border border-white/[0.12] p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden"
          >
            {/* Top specular border */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            {/* Gradient accent corner */}
            <div
              className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-20 bg-gradient-to-br ${activeStep.gradient}`}
            />

            {viewMode === "with-me" ? (
              /* Standard Direct Process View */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Column: Details & Narrative */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono uppercase tracking-wider text-white/70">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activeStep.accentColor }}
                    />
                    <span>{activeStep.badge}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                      {activeStep.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-xs font-mono text-cyan-400">
                      <Clock size={13} />
                      <span>{activeStep.duration}</span>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                    {activeStep.shortDesc}
                  </p>

                  {/* Bullet Checklist */}
                  <div className="space-y-2.5 pt-2">
                    {activeStep.details.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                          <CheckCircle2 size={13} />
                        </div>
                        <span className="text-xs sm:text-sm text-neutral-300 font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: The "Client Comfort" High-Value Callout */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="p-6 rounded-2xl bg-[#0e1017]/90 border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-3 text-amber-400 text-xs font-mono tracking-widest uppercase">
                      <Sparkles size={14} />
                      <span>Client Peace of Mind</span>
                    </div>

                    <p className="text-white/90 text-sm sm:text-base font-normal leading-relaxed italic mb-4">
                      "{activeStep.clientComfort}"
                    </p>

                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-white/50">
                      <span>Zero Friction Guarantee</span>
                      <span className="text-emerald-400 font-mono flex items-center gap-1">
                        <ShieldCheck size={14} /> 100% Transparent
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Comparison Mode: Me vs Agency */
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono tracking-wider text-emerald-400 uppercase">
                    Direct Comparison // Stage {activeStep.stepNumber}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                    {activeStep.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Working with Me */}
                  <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 shadow-[0_10px_30px_rgba(16,185,129,0.05)]">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-3">
                      <CheckCircle2 size={18} />
                      <span>Working with Abdulrahman</span>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed mb-4">
                      {activeStep.withMe}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                      <Zap size={13} />
                      <span>Speed: 3x - 5x Faster</span>
                    </div>
                  </div>

                  {/* Traditional Agency */}
                  <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/25 shadow-[0_10px_30px_rgba(244,63,94,0.05)]">
                    <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-3">
                      <XCircle size={18} />
                      <span>Traditional Agency Experience</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {activeStep.withAgency}
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-mono">
                      <Clock size={13} />
                      <span>High Overhead & Delayed Sprints</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Interactive Scrub Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveStepIndex(i);
                setIsAutoPlay(false);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeStepIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Terminal Action Capsule / Direct CTA */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 border border-white/10 p-6 sm:p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono tracking-widest uppercase mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for 2 Select Projects this Quarter</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to experience a truly frictionless build?
            </h4>
            <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl">
              Grab 20 minutes for a no-commitment strategy chat. We’ll talk through your idea, feasibility, and deliver an exact roadmap within 24 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://calendly.com/digital-b3asts/quick-free-consultation"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Calendar size={15} />
              <span>Book 20-Min Intro Call</span>
              <ArrowRight size={15} />
            </a>

            <a
              href="https://wa.me/923094506904"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-medium text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare size={14} className="text-[#25D366]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
