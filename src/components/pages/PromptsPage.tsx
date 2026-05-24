import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Copy,
  Check,
  Terminal,
  Cpu,
  Bookmark,
  Sparkles,
  Layers,
  Code,
  Eye,
  EyeOff,
  Clock,
  ExternalLink,
} from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { cn } from "../../lib/utils";

interface PromptItem {
  id: string;
  title: string;
  desc: string;
  category: "System" | "Copywriting" | "Automation" | "Developer" | "Marketing";
  recommendedModel: string;
  promptText: string;
  tags: string[];
  status: "Live" | "Refining" | "Upcoming";
}

const INITIAL_PROMPTS: PromptItem[] = [
  {
    id: "p1",
    title: "Sentient n8n Architect",
    desc: "Engineers system instructions to transform any LLM into a professional automation engineer capable of structuring clean nodes and JSON trees.",
    category: "Automation",
    recommendedModel: "Gemini 2.5 Flash / Claude 3.5 Sonnet",
    tags: ["n8n", "System", "JSON Structure"],
    status: "Live",
    promptText: `You are an expert n8n Workflow Architect. Your goal is to design clean, self-healing integrations based on API specs.
Rules:
1. Prefer built-in HTTP Request nodes over custom Javascript, where possible.
2. Ensure clear naming conventions for all nodes: [Action] [Service] (e.g. "Get User from Stripe").
3. Always structure error-trigger nodes to capture and dispatch telemetry to a central monitoring channel.
Provide step-by-step connection hierarchies and exact node mock structures.`,
  },
  {
    id: "p2",
    title: "SaaS Hero Copywriter Pro",
    desc: "A battle-tested marketing prompt that targets psychographic triggers, generating high-converting SaaS above-the-fold content.",
    category: "Copywriting",
    recommendedModel: "Gemini 2.5 Pro / GPT-4o",
    tags: ["SaaS", "Marketing", "Copywriting"],
    status: "Live",
    promptText: `Act as a world-class SaaS copywriter trained in direct-response marketing and behavioral psychology.
Analyze the following product offering: [INSERT PRODUCT SPECS].
Write 3 alternative variants of above-the-fold website content. Each variant must contain:
- A tension-inducing Headline (max 8 words)
- A supporting Subheadline focusing on time-to-value (max 15 words)
- A bold 2-word CTA button label
Avoid corporate jargon like "revolutionizing", "synergy", or "streamlined". Focus on raw literal actions.`,
  },
  {
    id: "p3",
    title: "Git Commit Standardizer",
    desc: "Guarantees perfectly structured Conventional Commits. Turns raw messy work logs into professional, readable changelogs.",
    category: "Developer",
    recommendedModel: "Any LLM",
    tags: ["DevOps", "Git", "Workflow"],
    status: "Live",
    promptText: `Analyze the provided raw diff output or messy draft commit message.
Reformat it into a strict Conventional Commit compliant message. Use this exact structure:
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]

Types allowed: feat, fix, docs, style, refactor, test, chore, build, ci.
Output ONLY the final commit message block inside a markdown code block.`,
  },
  {
    id: "p4",
    title: "NextJS 15 API Route Mocker",
    desc: "Fleshes out fully functional Mock API responses matching edge specs in clean TypeScript.",
    category: "Developer",
    recommendedModel: "Claude 3.5 Sonnet",
    tags: ["Next.js", "TypeScript", "Mock APIs"],
    status: "Refining",
    promptText: `Generate a fully functional Next.js 15 Route Handler (app directory style) in TypeScript.
The endpoint needs to return mock data for: [DESCRIBE SPEC / SCHEMA].
Requirements:
1. Handle proper HTTP Status Codes (200, 400, 401, 500).
2. Utilize NextResponse.json() properly.
3. Simulate high-performance loading latency (e.g. 50ms-200ms sleep) if a 'delay' search parameter exists.
4. Output cleanly documented, optimized code ready to copy-paste.`,
  },
  {
    id: "p5",
    title: "Cold Email Hook Generator",
    desc: "Crafts hyper-personalized, non-spammy initial sentences matching recipient LinkedIn bios and website headers.",
    category: "Marketing",
    recommendedModel: "Gemini 2.5 Flash",
    tags: ["Cold Outreach", "Personalization", "Sales"],
    status: "Upcoming",
    promptText: `Based on the provided LinkedIn biography and website header text: [INSERT RECIPIENT DATA], craft 3 tailored, non-sleazy initial email hook sentences.
The hook must:
- Mention a specific recent technical accomplishment or direct career focus.
- Feel casual, not overly flattering.
- Lead naturally into an open-ended question about current resource bottlenecks.
- Never exceed 20 words. No 'I noticed your profile and..' prefixes.`,
  },
];

export const PromptsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ["All", "System", "Copywriting", "Automation", "Developer", "Marketing"];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = useMemo(() => {
    return INITIAL_PROMPTS.filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <BentoCard size="3x1" className="bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border-indigo-500/20 p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full pointing-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-xs font-bold font-mono text-indigo-300">
              <Sparkles size={12} className="animate-pulse" />
              Under Active Development
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white font-sans">
              Prompt Library
            </h1>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              A private collection of advanced, production-tested prompts engineered for large language models, structured output tasks, and automated n8n workflows. Adding templates daily.
            </p>
          </div>
          <div className="shrink-0">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-md">
              <div className="text-3xl font-black text-indigo-400 font-mono">
                {INITIAL_PROMPTS.length}
              </div>
              <div className="text-[10px] text-white/40 uppercase tracking-widest font-black mt-1">
                Active Templates
              </div>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* Toolbar & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Categories Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 border whitespace-nowrap",
                selectedCategory === cat
                  ? "bg-white/15 border-white/20 text-white shadow-md shadow-black/40"
                  : "bg-white/5 border-transparent text-white/50 hover:text-white/80 hover:bg-white/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="Search prompts or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-indigo-500/50 transition-all focus:bg-white/10 font-sans"
          />
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredPrompts.map((p, index) => {
            const isExpanded = expandedId === p.id;
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="w-full"
              >
                <BentoCard
                  size="1x1"
                  className={cn(
                    "flex flex-col p-6 justify-between gap-4 border border-white/5 transition-all duration-300 relative group overflow-hidden h-auto min-h-[300px]",
                    p.status === "Refining"
                      ? "bg-amber-500/[0.02] border-amber-500/10"
                      : p.status === "Upcoming"
                      ? "bg-sky-500/[0.01] border-sky-500/5"
                      : "bg-[#050505]/40"
                  )}
                >
                  <div className="space-y-3">
                    {/* Top Row Statuses */}
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono",
                        p.category === "Automation" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                        p.category === "Copywriting" ? "bg-pink-500/10 text-pink-400 border border-pink-500/20" :
                        p.category === "Developer" ? "bg-violet-500/10 text-violet-400 border border-violet-500/20" :
                        p.category === "Marketing" ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" :
                        "bg-white/5 text-white/70 border border-white/10"
                      )}>
                        {p.category}
                      </span>

                      <span className={cn(
                        "text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter font-mono flex items-center gap-1",
                        p.status === "Live" ? "bg-emerald-500/10 text-emerald-400" :
                        p.status === "Refining" ? "bg-amber-500/10 text-amber-400" :
                        "bg-white/5 text-white/30"
                      )}>
                        <span className={cn("w-1 h-1 rounded-full",
                          p.status === "Live" ? "bg-emerald-400 animate-pulse" :
                          p.status === "Refining" ? "bg-amber-400" : "bg-white/30"
                        )} />
                        {p.status}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors font-sans flex items-center gap-2">
                        {p.title}
                      </h3>
                      <p className="text-xs text-white/60 font-light leading-relaxed font-sans line-clamp-3">
                        {p.desc}
                      </p>
                    </div>

                    {/* System Recommendation */}
                    <div className="flex items-start gap-1.5 p-2 rounded-xl bg-white/5 border border-white/5 text-[10px] text-white/50 font-mono">
                      <Cpu size={12} className="text-indigo-400 mt-0.5 shrink-0" />
                      <div>
                        <span className="text-white/30">Model:</span> {p.recommendedModel}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] text-white/40 font-mono border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Expanded Prompt Editor Box */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 p-3 rounded-2xl bg-black/80 border border-white/10 relative font-mono text-[11px] text-indigo-200/90 leading-relaxed max-h-64 overflow-y-auto no-scrollbar shadow-inner select-all">
                            <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] text-white/30">
                              <Terminal size={10} /> Shell System
                            </div>
                            <pre className="whitespace-pre-wrap pt-4 font-mono">{p.promptText}</pre>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions Area */}
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/5 mt-auto">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : p.id)}
                      className="text-[10px] font-bold text-white/40 hover:text-white transition-colors flex items-center gap-1.5 font-mono"
                    >
                      {isExpanded ? (
                        <>
                          <EyeOff size={12} />
                          <span>Hide Template</span>
                        </>
                      ) : (
                        <>
                          <Eye size={12} />
                          <span>Inspect Prompt</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopy(p.id, p.promptText)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl border text-[10px] font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md",
                        copiedId === p.id
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {copiedId === p.id ? (
                        <>
                          <Check size={12} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                </BentoCard>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredPrompts.length === 0 && (
          <div className="col-span-1 md:col-span-2 p-12 rounded-3xl bg-white/[0.01] border border-white/5 text-center flex flex-col items-center justify-center gap-3">
            <span className="text-3xl">🧩</span>
            <div className="text-sm font-bold text-white/80">No prompts found matching filter</div>
            <div className="text-xs text-white/40">Try searching a different tag or switching categories.</div>
          </div>
        )}
      </div>
    </div>
  );
};
