import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Sparkles,
  Send,
  CheckCircle2,
  Boxes,
  Code2,
  Cpu,
  Layers,
  FileText,
  Terminal,
} from "lucide-react";
import confetti from "canvas-confetti";

const UPCOMING_PILLS = [
  { label: "Full-Stack SaaS Starter", icon: Code2 },
  { label: "Apple HIG Design Tokens", icon: Layers },
  { label: "Autonomous AI Agent Schemas", icon: Cpu },
  { label: "Client Proposal & SOW Stack", icon: FileText },
  { label: "Liquid Motion Cheatsheets", icon: Sparkles },
  { label: "Multi-Tenant Postgres Schemas", icon: Terminal },
];

export const ResourcesPage = ({
  setActiveTab,
}: {
  setActiveTab?: (tab: any) => void;
}) => {
  const [email, setEmail] = useState("");
  const [isNotified, setIsNotified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsNotified(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#E2E8F0", "#38bdf8", "#818cf8", "#FFFFFF"],
      });
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4 sm:px-6">
      {/* Apple Pro Silver Announcement Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] border border-slate-300/20 bg-gradient-to-b from-[#141622]/95 via-[#0e1017]/95 to-[#090a10]/95 backdrop-blur-2xl p-8 sm:p-12 md:p-16 text-center shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.18)]"
      >
        {/* Top Brushed Silver Specular Reflection */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200/60 to-transparent" />
        
        {/* Soft Ambient Radial Lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-slate-300/[0.04] blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-sky-500/[0.03] blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          {/* 1. Subtle Apple Coming Soon Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-slate-600/40 text-slate-200 text-xs font-mono tracking-wider uppercase font-medium shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span>Coming Soon • Under Active Construction</span>
          </div>

          {/* 2. Crisp, Non-Overloaded Display Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-sans">
              Free Engineering &amp; Design Vault.
            </h1>
            <p className="text-slate-300/75 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              We are assembling a curated library of code templates, Apple HIG design tokens, and agent blueprints. 100% free and open source.
            </p>
          </div>

          {/* 3. Primary CTA to the Build Lab (In the Meantime) */}
          <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-slate-300/15 backdrop-blur-md space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
              In The Meantime
            </div>
            <p className="text-sm text-slate-200/90 leading-relaxed max-w-md mx-auto">
              All complete technical architectures, build logs, and step-by-step guides are actively published on the <strong>Build Lab</strong>.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <a
                href="https://beehiiv.com"
                target="_blank"
                rel="noreferrer"
                id="resources-buildlab-btn"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-black font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore The Build Lab</span>
                <ArrowUpRight size={15} />
              </a>

              {setActiveTab && (
                <button
                  type="button"
                  onClick={() => setActiveTab("Blog")}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-200 text-xs sm:text-sm font-medium transition-all"
                >
                  Read In-App Blog
                </button>
              )}
            </div>
          </div>

          {/* 4. Minimal Apple-Style Pills: Assets & Resources on the Way */}
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-mono tracking-wider text-slate-400 uppercase block">
              Assets &amp; Blueprints on the Way
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
              {UPCOMING_PILLS.map((pill, i) => {
                const Icon = pill.icon;
                return (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12141d]/90 border border-slate-400/20 text-xs text-slate-200 font-medium hover:border-slate-300/40 transition-colors"
                  >
                    <Icon size={13} className="text-slate-400" />
                    <span>{pill.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Minimal 1-Line Drop Notification */}
          <div className="pt-4 max-w-md mx-auto">
            <form onSubmit={handleNotifyMe} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email for direct download drop"
                required
                disabled={isNotified}
                className="w-full px-4 py-2.5 rounded-full bg-white/[0.05] border border-white/15 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-slate-300 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || isNotified}
                className="px-5 py-2.5 rounded-full bg-slate-200 hover:bg-white text-black font-semibold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 disabled:opacity-60 cursor-pointer shrink-0"
              >
                {isLoading ? (
                  <span>Wait...</span>
                ) : isNotified ? (
                  <>
                    <CheckCircle2 size={13} className="text-emerald-700" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <span>Notify Me</span>
                    <Send size={12} />
                  </>
                )}
              </button>
            </form>
            {isNotified && (
              <p className="text-[11px] font-mono text-emerald-400 pt-2">
                ✓ Priority access confirmed. You'll receive direct links the moment files drop.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
