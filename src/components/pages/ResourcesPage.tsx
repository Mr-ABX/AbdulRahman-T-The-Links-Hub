import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FolderDown,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Clock,
  Send,
  Mail,
  Layers,
  Code2,
  FileText,
  Boxes,
  Cpu,
  BookmarkCheck,
  Zap,
  Hammer,
  AlertCircle,
  FolderGit2,
  Terminal,
  ShieldCheck,
  Share2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "../../lib/utils";

interface UpcomingResource {
  id: string;
  title: string;
  category: "dev" | "design" | "ai" | "workflow" | "guides";
  categoryLabel: string;
  format: string;
  desc: string;
  includedItems: string[];
  progress: number;
  statusLabel: string;
  readMoreBeehiivTopic?: string;
}

const UPCOMING_RESOURCES: UpcomingResource[] = [
  {
    id: "res-saas-starter",
    title: "Full-Stack SaaS Blueprint & Starter Engine",
    category: "dev",
    categoryLabel: "Developer Blueprint",
    format: "GitHub Template / ZIP",
    desc: "Production-ready, type-safe full-stack scaffold featuring React 18+, Vite, Express API proxy, Stripe webhook listener, and Apple HIG components.",
    includedItems: [
      "Type-safe API proxy architecture",
      "Stripe checkout & webhook handlers",
      "Dark-mode Apple HIG design tokens",
      "One-click container deploy configuration",
    ],
    progress: 88,
    statusLabel: "Packaging & Audit",
    readMoreBeehiivTopic: "Micro-SaaS Multi-Tenant Database Architecture Guide",
  },
  {
    id: "res-apple-hig-ui",
    title: "Apple HIG Pro Design Tokens & UI Kit",
    category: "design",
    categoryLabel: "Design System",
    format: "Figma Library + CSS",
    desc: "Complete visual design system based on Apple Human Interface Guidelines: liquid glass materials, specular hairline borders, and haptic spring curves.",
    includedItems: [
      "40+ dark glass component primitives",
      "Harmonic modular typography scale",
      "Framer Motion spring presets [0.23, 1, 0.32, 1]",
      "Accessible high-contrast color tokens",
    ],
    progress: 94,
    statusLabel: "Final Visual QA",
    readMoreBeehiivTopic: "Designing Frictionless Spatial Interfaces",
  },
  {
    id: "res-ai-agent-schemas",
    title: "Autonomous AI Agent & Tool Calling Blueprints",
    category: "ai",
    categoryLabel: "AI Engineering",
    format: "JSON / TypeScript / Prompts",
    desc: "Curated collection of battle-tested system prompts, tool-calling JSON schemas, token optimization techniques, and multi-agent loops.",
    includedItems: [
      "Structured JSON schema generators",
      "Zero-hallucination agent system prompts",
      "Context compaction & caching strategies",
      "Client-safe edge routing patterns",
    ],
    progress: 82,
    statusLabel: "Benchmark Testing",
    readMoreBeehiivTopic: "AI in 2026: The Shift to Autonomous Engineering Agents",
  },
  {
    id: "res-client-onboarding",
    title: "Solopreneur Client Onboarding & Proposal Stack",
    category: "workflow",
    categoryLabel: "Operations & Workflow",
    format: "Notion Portal + PDF Kit",
    desc: "Frictionless asynchronous client onboarding dashboard, statement-of-work templates, fixed-fee quote calculator, and automated project milestone tracker.",
    includedItems: [
      "Ready-to-share Notion client portal",
      "Guaranteed scope & revision contracts",
      "Milestone approval checklists",
      "Automated handover protocol",
    ],
    progress: 75,
    statusLabel: "Document Formatting",
    readMoreBeehiivTopic: "My Step-by-Step System to Automate 90% of Client Onboardings",
  },
  {
    id: "res-framer-motion-cheat",
    title: "Liquid Motion & Interaction Architecture Cheatsheet",
    category: "guides",
    categoryLabel: "Engineering Guide",
    format: "PDF Cheatsheet + Code Snippets",
    desc: "A rapid-reference guide for building frictionless fluid animations: spring physics, scroll progress interpolation, and GPU-accelerated transforms.",
    includedItems: [
      "Spring parameter cheat sheet (damping/stiffness)",
      "SVG stroke-dashoffset fluid paths",
      "Zero-jank layout transition rules",
      "Accessible reduced-motion defaults",
    ],
    progress: 90,
    statusLabel: "Formatting Final PDF",
  },
  {
    id: "res-postgres-schema",
    title: "Multi-Tenant Postgres & Drizzle Architecture Kit",
    category: "dev",
    categoryLabel: "Backend Architecture",
    format: "TypeScript / SQL Schemas",
    desc: "Robust relational database patterns for SaaS: row-level security (RLS), multi-tenant tenancy isolation, connection pool safety, and automated migrations.",
    includedItems: [
      "Drizzle ORM relational schema boilerplate",
      "Row-level security (RLS) policies",
      "Connection pooling config for serverless",
      "Optimistic locking concurrency helpers",
    ],
    progress: 70,
    statusLabel: "Schema Hardening",
    readMoreBeehiivTopic: "Micro-SaaS Multi-Tenant Database Architecture Guide",
  },
];

const CATEGORY_FILTERS = [
  { id: "all", label: "All Resources" },
  { id: "dev", label: "Developer Blueprints" },
  { id: "design", label: "UI Kits & Design" },
  { id: "ai", label: "AI & Agents" },
  { id: "workflow", label: "Workflow Stacks" },
  { id: "guides", label: "Cheatsheets & Guides" },
];

export const ResourcesPage = ({
  setActiveTab,
}: {
  setActiveTab?: (tab: any) => void;
}) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [email, setEmail] = useState("");
  const [isNotified, setIsNotified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const filteredResources = UPCOMING_RESOURCES.filter((res) => {
    if (selectedFilter === "all") return true;
    return res.category === selectedFilter;
  });

  const handleNotifyMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsNotified(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#818cf8", "#34d399", "#f59e0b"],
      });
    }, 800);
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* 1. Header & Under-Construction Announcement Banner */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#0c0d14]/85 backdrop-blur-2xl p-6 sm:p-8 md:p-12 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.85)]">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/[0.07] blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-indigo-500/[0.08] blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 flex flex-col gap-6">
          {/* Top Status Capsule */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-[11px] font-mono tracking-wide text-amber-300 font-semibold uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              Under Active Construction // Coming Soon
            </div>

            <span className="text-white/40 text-xs font-mono">
              BATCH 01 // PACKAGING IN PROGRESS
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.12]">
              Free Engineering &amp; Design Vault
            </h1>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
              We are assembling a curated library of battle-tested development boilerplates,
              Apple HIG UI design token packages, autonomous agent blueprints, and engineering cheat sheets.
              Every resource here will be <strong>100% free and open</strong> for the community.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-[10px] font-mono text-white/50 uppercase block">Curated Assets</span>
              <span className="text-lg font-bold text-white tracking-tight">6 In Production</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-[10px] font-mono text-white/50 uppercase block">Access Tier</span>
              <span className="text-lg font-bold text-emerald-400 tracking-tight">100% Free</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-[10px] font-mono text-white/50 uppercase block">Quality Standard</span>
              <span className="text-lg font-bold text-sky-400 tracking-tight">Production Grade</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-[10px] font-mono text-white/50 uppercase block">Next Release Drop</span>
              <span className="text-lg font-bold text-amber-400 tracking-tight">Q3 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE BEEHIIV BUILD LAB REDIRECT BRIDGE (User's specific request) */}
      <div className="relative overflow-hidden rounded-[26px] border border-emerald-500/25 bg-gradient-to-br from-emerald-950/40 via-[#0a1012]/80 to-[#07080f]/90 p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_-15px_rgba(16,185,129,0.15)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium">
              <Sparkles size={13} className="text-emerald-400" />
              Active Knowledge Hub Available Now
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Looking for Immediate Guides &amp; Deep Dives?
            </h2>

            <p className="text-sm sm:text-base text-white/75 leading-relaxed font-light">
              While the standalone downloadable resource packages are being finalized and packaged,
              all complete <strong>step-by-step technical guides, system architectures, and engineering breakdowns</strong> are
              actively published on the <strong>Beehiiv Build Lab</strong> (<em>The Laboratory Dispatch</em>).
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-white/60 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 size={13} /> Zero Paywalls
              </span>
              <span>•</span>
              <span>AI Agents</span>
              <span>•</span>
              <span>Full-Stack Architecture</span>
              <span>•</span>
              <span>Client Systems</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 w-full lg:w-auto shrink-0">
            <a
              href="https://beehiiv.com"
              target="_blank"
              rel="noreferrer"
              id="resources-beehiiv-link"
              className="px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-black font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_12px_24px_-6px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Visit Beehiiv Build Lab</span>
              <ArrowUpRight size={16} />
            </a>

            {setActiveTab && (
              <div className="flex items-center gap-2 w-full">
                <button
                  type="button"
                  onClick={() => setActiveTab("Blog")}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white text-xs font-medium transition-all text-center"
                >
                  Read In-App Blog
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("Academy")}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white text-xs font-medium transition-all text-center"
                >
                  Watch Academy
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Upcoming Downloadable Resources Deck */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              Pipeline Preview
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Resources Currently in the Workshop
            </h2>
            <p className="text-xs sm:text-sm text-white/60 max-w-xl">
              Preview what’s coming down the chute. Each resource will be packaged with clear documentation, 
              source code, and straightforward licensing.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORY_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all",
                  selectedFilter === filter.id
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-white/[0.06] text-white/70 hover:text-white hover:bg-white/[0.1] border border-white/[0.06]"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredResources.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.1] bg-[#0c0d14]/70 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-[#10111a]/85 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]"
            >
              {/* Card Top */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-[10px] font-mono font-medium text-white/70 uppercase">
                    {item.categoryLabel}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400/90 font-medium">
                    {item.format}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-white/65 leading-relaxed">
                  {item.desc}
                </p>

                {/* Key Deliverables Checkmarks */}
                <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider block">
                    What's Included
                  </span>
                  {item.includedItems.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-white/75">
                      <CheckCircle2 size={12} className="text-sky-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Bottom / Staging Status Progress */}
              <div className="pt-5 mt-5 border-t border-white/[0.08] space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-white/50">{item.statusLabel}</span>
                    <span className="text-sky-400 font-semibold">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full transition-all duration-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>

                {item.readMoreBeehiivTopic && (
                  <a
                    href="https://beehiiv.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-[11px] text-white/70 hover:text-white flex items-center justify-between transition-all group/btn"
                  >
                    <span className="truncate pr-2">Read related topic on Beehiiv</span>
                    <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform shrink-0" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Early Access Notification Pod */}
      <div className="rounded-2xl border border-white/[0.1] bg-[#0e0f17]/90 p-6 sm:p-8 backdrop-blur-2xl">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            <Mail size={12} />
            Early Drop Notification
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Be the First to Download When the Vault Opens
          </h3>

          <p className="text-xs sm:text-sm text-white/60">
            No marketing spam. Only a single email notification with direct Google Drive / GitHub download links the second these resources are published.
          </p>

          <form onSubmit={handleNotifyMe} className="flex flex-col sm:flex-row items-center gap-3 pt-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={isNotified}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.12] text-white placeholder-white/40 text-xs sm:text-sm focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || isNotified}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-white/90 text-black font-semibold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <span>Registering...</span>
              ) : isNotified ? (
                <>
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  <span>On Priority List</span>
                </>
              ) : (
                <>
                  <span>Notify Me</span>
                  <Send size={13} />
                </>
              )}
            </button>
          </form>

          {isNotified && (
            <p className="text-xs text-emerald-400 font-mono pt-1">
              ✓ You’re on the priority list! You'll receive instant download links upon launch.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
