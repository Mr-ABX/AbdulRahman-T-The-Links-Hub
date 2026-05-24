import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  MessageSquare,
  Send,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Bell,
  Sparkles,
  Zap,
} from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { cn } from "../../lib/utils";
import confetti from "canvas-confetti";

interface CommunityPlatform {
  name: string;
  desc: string;
  subTitle: string;
  icon: React.ReactNode;
  stat: string;
  platformColorStyle: string;
  btnLabel: string;
  url: string;
  badge: string;
}

export const CommunityPage = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);

      // Celebrate success!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#a855f7", "#ec4899", "#10b981"],
      });
    }, 1200);
  };

  const platforms: CommunityPlatform[] = [
    {
      name: "Discord Guild",
      subTitle: "Dev & AI Squad",
      desc: "Deep tech, direct support from our developers, integration brainstorming sessions, and weekly live community voice jams.",
      icon: <MessageSquare size={24} />,
      stat: "1,450+ Active Members",
      platformColorStyle: "text-indigo-400 border-indigo-500/10 hover:border-indigo-500/30 bg-indigo-500/[0.02]",
      btnLabel: "Enter Discord",
      url: "https://discord.com",
      badge: "Voice & Collab",
    },
    {
      name: "Elite WhatsApp Channel",
      subTitle: "High-Signal Broadcast",
      desc: "Fast, bite-sized updates, direct notifications for new releases, system alerts, and immediate product announcements. No fluff.",
      icon: <Users size={24} />,
      stat: "850+ Subscribers",
      platformColorStyle: "text-emerald-400 border-emerald-500/10 hover:border-emerald-500/30 bg-emerald-500/[0.02]",
      btnLabel: "Join Channel",
      url: "https://whatsapp.com",
      badge: "Real-time Access",
    },
    {
      name: "Telegram Hub",
      subTitle: "Automators Nexus",
      desc: "Ambitious tech founders and developers sharing workflow scripts, custom n8n JSON nodes, and speed lessons on AI setups.",
      icon: <Send size={24} />,
      stat: "2,200+ Core Automators",
      platformColorStyle: "text-sky-400 border-sky-500/10 hover:border-sky-500/30 bg-sky-500/[0.02]",
      btnLabel: "Unlock Telegram",
      url: "https://telegram.org",
      badge: "Script Drops",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <BentoCard size="3x1" className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-500/20 p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold font-mono text-emerald-300">
              <Zap size={12} className="animate-bounce" />
              Engage & Build
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white font-sans">
              Community Hub
            </h1>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Skip the generic networks. Join curated channels where builders, developers, and AI-first creators connect directly with Abdulrahman and his engineering team.
            </p>
          </div>
          <div className="shrink-0">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400">
                <Users size={20} />
              </div>
              <div>
                <div className="text-xl font-black text-white font-mono">4,500+</div>
                <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Total Peers</div>
              </div>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* Grid Outlets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map((p, index) => (
          <BentoCard
            key={p.name}
            size="1x1"
            className={cn(
              "p-6 flex flex-col justify-between h-[360px] border transition-all duration-300 group/comm hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]",
              p.platformColorStyle
            )}
          >
            <div className="space-y-4">
              {/* Icon & Badge Row */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 shadow-lg group-hover/comm:bg-white/10 transition-colors">
                  {p.icon}
                </div>
                <span className="text-[8px] px-2 py-1 rounded-full bg-white/5 border border-white/5 text-white/50 font-bold uppercase tracking-widest font-mono">
                  {p.badge}
                </span>
              </div>

              {/* Text info */}
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 font-mono">
                  {p.subTitle}
                </p>
                <h3 className="font-bold text-xl text-white group-hover/comm:text-indigo-400 transition-colors font-sans">
                  {p.name}
                </h3>
                <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-4 pt-1 font-sans">
                  {p.desc}
                </p>
              </div>
            </div>

            {/* Bottom Panel */}
            <div className="space-y-3 pt-4 border-t border-white/5 mt-auto">
              <div className="text-[10px] font-bold text-white/40 font-mono flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>{p.stat}</span>
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white hover:text-black border border-white/10 hover:border-white text-white text-xs font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group-hover/comm:translate-y-[-2px]"
              >
                <span>{p.btnLabel}</span>
                <ArrowRight size={14} className="group-hover/comm:translate-x-1 transition-transform" />
              </a>
            </div>
          </BentoCard>
        ))}
      </div>

      {/* Interactive Newsletter Box */}
      <BentoCard size="3x2" className="bg-[#050505]/40 border-white/5 p-8 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10 h-full">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shadow-lg shadow-indigo-500/5">
              <Mail size={22} className="animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white font-sans">The Weekly Signal</h3>
              <p className="text-xs text-white/50 leading-relaxed font-sans max-w-sm">
                Get high-quality, actionable digests detailing system engineering breakthroughs, complete source codes of personal apps, n8n tutorials, and prompt strategies sent directly to your inbox.
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-1.5">
              <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono">
                <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                <span>No spam. Instant opt-out at any time.</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono">
                <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                <span>Premium prompt packs delivered on sign-up.</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-3xl shadow-2xl relative">
            <div className="absolute -top-3 -right-3 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[8px] font-black uppercase tracking-wider text-indigo-300 font-mono flex items-center gap-1">
              <Sparkles size={10} /> Free Pack Included
            </div>
            <AnimatePresence mode="wait">
              {!isSubscribed ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubscribe}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="w-full bg-black/40 border border-white/10 focus:border-indigo-500/50 rounded-2xl p-4 text-sm text-white focus:outline-none transition-all focus:bg-black/60 font-sans disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-white/90 shadow-xl transition-all font-sans relative overflow-hidden flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed h-12"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <span>Subscribe Now</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                    <CheckCircle2 size={28} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-white font-sans">You're On The List!</h4>
                    <p className="text-xs text-white/50 leading-relaxed font-sans max-w-sm mx-auto">
                      Done. I've sent the **Premium Prompt Pack** directly to <strong className="text-white font-semibold font-mono">{email}</strong>. Welcome to the workspace.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </BentoCard>
    </div>
  );
};
