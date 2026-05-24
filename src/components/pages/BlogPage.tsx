import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Newspaper, Send, Mail, CheckCircle2, ArrowUpRight, ArrowRight, Sparkles, BookOpen, Clock, RefreshCw } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { cn } from "../../lib/utils";
import confetti from "canvas-confetti";

interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: "AI Agents" | "SaaS Builders" | "No-Code" | "Solopreneur";
  url: string; // redirect to beehiiv
}

const ARTICLES: ArticleItem[] = [
  {
    id: "art1",
    title: "AI in 2026: The Shift to Autonomous Engineering Agents",
    excerpt: "Why the classic chat interface is dying, and how server-authoritative autonomous workflows are taking over multi-million dollar software operations.",
    date: "May 15, 2026",
    readTime: "7 min read",
    category: "AI Agents",
    url: "https://beehiiv.com", // Placeholder
  },
  {
    id: "art2",
    title: "My Step-by-Step System to Automate 90% of Client Onboardings",
    excerpt: "An engineering breakdown of custom webhooks, type-safe Stripe payload responders, and automated account creations inside n8n labs.",
    date: "April 28, 2026",
    readTime: "11 min read",
    category: "No-Code",
    url: "https://beehiiv.com",
  },
  {
    id: "art3",
    title: "Micro-SaaS Multi-Tenant Database Architecture Guide",
    excerpt: "A direct blueprints layout explaining how we configure secure schemas inside Postgres and handle edge proxy caching smoothly.",
    date: "March 12, 2026",
    readTime: "14 min read",
    category: "SaaS Builders",
    url: "https://beehiiv.com",
  },
];

export const BlogPage = () => {
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

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#10b981", "#059669", "#34d399", "#a7f3d0"],
      });
    }, 1100);
  };

  return (
    <div className="space-y-6">
      {/* Blog & Newsletter Hero Banner */}
      <BentoCard size="3x1" className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border-emerald-500/20 p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold font-mono text-emerald-400 rounded-full">
              <Newspaper size={12} />
              The Laboratory Dispatch
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white font-sans">
              My Blog & Insights
            </h1>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Real engineering journals, zero-fluff case studies, and advanced tutorials. We write in-depth on Beehiiv while hosting active newsletters directly inside this laboratory.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-4">
            <a
              href="https://beehiiv.com"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 group rounded-xl bg-white text-black font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg hover:bg-white/95 transition-all"
            >
              <span>Explore on Beehiiv</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </BentoCard>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Articles List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold tracking-[0.2em] font-mono text-white/30 uppercase mb-2 px-1">
            Featured Dispatches
          </h2>

          <div className="space-y-4">
            {ARTICLES.map((art) => (
              <BentoCard
                key={art.id}
                size="2x1"
                className="p-6 bg-[#050505]/40 border-white/5 flex flex-col justify-between h-auto gap-4 group hover:border-emerald-500/20 transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono border bg-white/5 border-white/5 text-emerald-400">
                      {art.category}
                    </span>
                    <span className="text-[10px] text-white/30 font-mono flex items-center gap-2">
                      <Clock size={10} />
                      {art.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors font-sans">
                    {art.title}
                  </h3>
                  <p className="text-xs text-white/50 leading-relaxed font-light">
                    {art.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <span className="text-[10px] text-white/20 font-mono tracking-wide">
                    Published {art.date}
                  </span>
                  <a
                    href={art.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-emerald-400 transition-colors group/link"
                  >
                    <span>Read on Beehiiv</span>
                    <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Embedded Newsletter box */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold tracking-[0.2em] font-mono text-white/30 uppercase mb-2 px-1">
            Subscribe Area
          </h2>

          <BentoCard size="1x1" className="bg-gradient-to-b from-emerald-500/[0.03] to-transparent border-emerald-500/10 p-6 flex flex-col justify-between h-auto min-h-[380px] relative">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                <Send size={22} className="animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-lg text-white font-sans">Weekly Lab Notes</h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  Join 2,500+ developers, tech agency owners, and product builders securing weekly insights.
                </p>
              </div>

              <div className="space-y-2 pt-2 text-[10px] font-mono text-white/40">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> High-signal tech tutorials
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> n8n blueprint node file drops
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> Private prompts packages
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="w-full bg-black/40 border border-white/10 focus:border-emerald-500 rounded-xl p-3 text-xs text-white focus:outline-none transition-all focus:bg-black/60 font-sans disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl bg-emerald-500 text-black font-extrabold uppercase tracking-widest text-[10px] hover:bg-emerald-450 transition-all flex items-center justify-center gap-2 disabled:opacity-50 h-10"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                      ) : (
                        <>
                          <span>Subscribe Now</span>
                          <ArrowRight size={12} />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4 space-y-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                      <CheckCircle2 size={20} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">Subscribed!</h4>
                      <p className="text-[10px] text-white/40 leading-relaxed font-sans">
                        Check your inbox at <span className="text-emerald-400 font-semibold">{email}</span> for details. Welcome!
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
};
