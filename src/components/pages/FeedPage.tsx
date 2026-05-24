import React, { useState } from "react";
import { Terminal, Cpu, Clock, CheckCircle, Tag, Radio, Zap, AlertCircle, RefreshCw } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { cn } from "../../lib/utils";

interface FeedItem {
  id: string;
  type: "changelog" | "announcement" | "system";
  title: string;
  content: string;
  timestamp: string;
  badge?: string;
  version?: string;
}

const FEED_ITEMS: FeedItem[] = [
  {
    id: "f1",
    type: "changelog",
    title: "Vortex Labs Orchestrator Engine Upgrade",
    content: "Upgraded core agents orchestration to support parallel LLM parsing. Decreased payload latency from 1.5s down to 340ms. Leveraged modern TypeScript type strip engines for high compilations.",
    timestamp: "2 hours ago",
    badge: "Engine",
    version: "v4.2.0",
  },
  {
    id: "f2",
    type: "announcement",
    title: "New Premium Prompt Packs Unlocked",
    content: "Just added 5 battle-tested production prompt structures inside the Prompts Library. Includes full NextJS API routers and cold outreach scripts analyzed for conversion optimization.",
    timestamp: "1 day ago",
    badge: "Library",
  },
  {
    id: "f3",
    type: "system",
    title: "Sleek Custom Scrollbars Deployed Globally",
    content: "Deployed responsive global stylesheet overhauling classic native browser scroll containers to modern sleek dark indicators seamlessly.",
    timestamp: "3 days ago",
    badge: "Assets",
  },
  {
    id: "f4",
    type: "changelog",
    title: "Bento Cards Grid System Optimization",
    content: "Re-engineered aspect-ratio boundaries and touch triggers on double sizes to prevent clipping artifacts inside nested iFrames on iOS Safari devices.",
    timestamp: "1 week ago",
    badge: "Grid UI",
    version: "v4.1.2",
  },
];

export const FeedPage = () => {
  const [activeFilter, setActiveFilter] = useState<"all" | "changelog" | "announcement" | "system">("all");

  const filteredItems = FEED_ITEMS.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Feed Hero Header */}
      <BentoCard size="3x1" className="bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-transparent border-teal-500/20 p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-xs font-bold font-mono text-teal-400 rounded-full">
              <Radio size={12} className="animate-pulse text-teal-400" />
              Live Workspace Console
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white font-sans">
              Release Feed
            </h1>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Real-time feed, system engineering changelogs, technical announcements, and live performance updates direct from Abdulrahman's developer console.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-4">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <div className="text-xs font-bold text-white/80 font-mono text-right">
                <div>SYSTEMS: OPERATIONAL</div>
                <div className="text-[9px] text-white/30 text-left">EST API LATENCY: 34ms</div>
              </div>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* Filter Options */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
        {["all", "changelog", "announcement", "system"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter as any)}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all duration-200 border whitespace-nowrap",
              activeFilter === filter
                ? "bg-white/15 border-white/20 text-white shadow-md shadow-black/40"
                : "bg-white/5 border-transparent text-white/55 hover:text-white/85 hover:bg-white/10"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="space-y-4 max-w-3xl pr-1">
        {filteredItems.map((item, index) => (
          <div key={item.id} className="relative pl-8 border-l-2 border-white/10 pb-2 ml-4">
            {/* Timeline Dot with matching type color */}
            <div className={cn(
              "absolute -left-2.5 top-0 w-4.5 h-4.5 rounded-full border-4 border-[#0c0c0d] flex items-center justify-center",
              item.type === "changelog" ? "bg-indigo-500" :
              item.type === "announcement" ? "bg-amber-500" :
              "bg-cyan-500"
            )} />

            <div className="p-5 rounded-3xl bg-[#050505]/40 border border-white/5 space-y-3 hover:border-white/10 hover:bg-[#050505]/60 transition-all duration-300">
              {/* Header metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[8px] font-bold uppercase tracking-widest font-mono px-2 py-0.5 rounded",
                    item.type === "changelog" ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/10" :
                    item.type === "announcement" ? "bg-amber-500/15 text-amber-400 border border-amber-500/10" :
                    "bg-cyan-500/15 text-cyan-400 border border-cyan-500/10"
                  )}>
                    {item.type}
                  </span>

                  {item.badge && (
                    <span className="text-[9px] text-white/40 font-mono border border-white/5 rounded-md px-1.5 py-0.5">
                      #{item.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[10px] text-white/30 font-mono">
                  <Clock size={10} />
                  <span>{item.timestamp}</span>
                </div>
              </div>

              {/* Title & Body */}
              <div className="space-y-1">
                <h3 className="font-bold text-sm text-white font-sans flex items-center gap-2">
                  {item.title}
                  {item.version && (
                    <span className="text-[9px] text-indigo-400 font-mono bg-indigo-500/10 px-1.5 py-0.5 rounded">
                      {item.version}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  {item.content}
                </p>
              </div>

              {/* Developer action confirmation */}
              <div className="pt-2 border-t border-white/5 flex items-center gap-1.5 text-[9px] font-mono text-white/20">
                <CheckCircle size={10} className="text-emerald-400" />
                <span>Verified by Systems Engine</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
