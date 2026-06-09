import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ExternalLink,
  Sparkles,
  Database,
  Grid,
  Laptop,
  Video,
  Code as CodeIcon,
  Cpu,
  Bookmark,
  Layers,
  Wrench,
  HelpCircle,
  HelpCircle as QuestionIcon
} from "lucide-react";

interface DatabaseTool {
  id: string;
  name: string;
  category: "all" | "ai" | "design" | "mcp" | "dev" | "productivity";
  desc: string;
  tags: string[];
  pricing: "Free" | "Freemium" | "Paid" | "Open Source";
  actionUrl: string;
  icon: React.ReactNode;
  popularity: string;
}

const CATEGORIES = [
  { id: "all", label: "All Repository", icon: <Grid size={15} /> },
  { id: "ai", label: "Artificial Intel", icon: <Cpu size={15} /> },
  { id: "design", label: "Design & UX", icon: <Layers size={15} /> },
  { id: "mcp", label: "MCP Protocols", icon: <Database size={15} /> },
  { id: "dev", label: "Developer", icon: <CodeIcon size={15} /> },
  { id: "productivity", label: "Productivity", icon: <Wrench size={15} /> },
];

const PRE_LOADED_TOOLS: DatabaseTool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT Plus",
    category: "ai",
    desc: "Industry-standard conversation AI, perfect for multi-modal code review, logical structuring, and general-purpose reasoning.",
    tags: ["LLM", "AI Chat", "OpenAI"],
    pricing: "Freemium",
    actionUrl: "https://chatgpt.com",
    popularity: "9.9/10",
    icon: <Sparkles className="text-emerald-400" size={20} />,
  },
  {
    id: "gemini",
    name: "Google Gemini",
    category: "ai",
    desc: "Google's flagship multimodal model featuring extreme speed, robust reasoning, and direct search-grounded live data feeds.",
    tags: ["LLM", "Google AI", "Multimodal"],
    pricing: "Freemium",
    actionUrl: "https://gemini.google.com",
    popularity: "9.7/10",
    icon: <Sparkles className="text-indigo-400" size={20} />,
  },
  {
    id: "v0dev",
    name: "v0.dev by Vercel",
    category: "design",
    desc: "Instant generative UI framework powered by modern LLMs. Generates production-ready, beautiful React code using Tailwind & Radix.",
    tags: ["Generative UI", "React", "Frontend"],
    pricing: "Freemium",
    actionUrl: "https://v0.dev",
    popularity: "9.8/10",
    icon: <Laptop className="text-cyan-400" size={20} />,
  },
  {
    id: "cursor",
    name: "Cursor IDE",
    category: "dev",
    desc: "The absolute gold standard fork of VSCode built from the ground up to support real-time conversational coding with local context.",
    tags: ["IDE", "AI Coding", "Autocomplete"],
    pricing: "Freemium",
    actionUrl: "https://cursor.sh",
    popularity: "9.9/10",
    icon: <CodeIcon className="text-blue-400" size={20} />,
  },
  {
    id: "claudai",
    name: "Claude AI",
    category: "ai",
    desc: "Anthropic's premier language model, renowned for unparalleled precision in coding, system design reviews, and artifact generation.",
    tags: ["Anthropic", "Coding LLM"],
    pricing: "Freemium",
    actionUrl: "https://claude.ai",
    popularity: "9.8/10",
    icon: <Sparkles className="text-amber-400" size={20} />,
  },
  {
    id: "mcp-servers",
    name: "Model Context Protocol",
    category: "mcp",
    desc: "Anthropic's open standard protocol allowing local AI assistants to read your database schemas, execute secure terminal tools, and retrieve files.",
    tags: ["MCP", "Open Protocol", "Integrations"],
    pricing: "Open Source",
    actionUrl: "https://github.com/modelcontextprotocol",
    popularity: "9.6/10",
    icon: <Database className="text-indigo-400" size={20} />,
  },
  {
    id: "koe-studio",
    name: "Koe Audio Studio",
    category: "design",
    desc: "Parametric AI voice cloning synthesis dashboard. Excellent for content creators, audio developers, and immersive narration.",
    tags: ["Audio", "Voice Synthesis", "SaaS"],
    pricing: "Paid",
    actionUrl: "https://koe-audiostudio.netlify.app/",
    popularity: "9.4/10",
    icon: <Video className="text-purple-400" size={20} />,
  },
  {
    id: "speakeasy",
    name: "SpeakEasy AI",
    category: "productivity",
    desc: "A fully free, ultra-fast Text-To-Speech tool designed to turn scripts into ready-to-use audio resources with zero cloud bills.",
    tags: ["TTS", "Voice Utility", "Free Tools"],
    pricing: "Free",
    actionUrl: "https://github.com/Mr-ABX/SpeakEasy-AI-Text-To-Speech-Tool---100-Free-by-AbdulrahmanT",
    popularity: "9.2/10",
    icon: <Wrench className="text-rose-400" size={20} />,
  },
];

export const ToolspediaPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // External DB Link (User can customize this Notion DB easily)
  const MASTER_NOTION_DB_URL = "https://notion.so"; 

  const filteredTools = useMemo(() => {
    return PRE_LOADED_TOOLS.filter((tool) => {
      const matchCat = selectedCategory === "all" || tool.category === selectedCategory;
      const matchSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      {/* 1. Glass Card Premium Hero Banner */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 glass bg-[#050505]/40 p-8 md:p-12 shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono">
              ⚡ LIVE TOOL REPOSITORY
            </span>
            <h1 className="text-4xl md:text-5xl font-black font-sans tracking-tight text-white leading-none">
              Tools Pedia
            </h1>
            <p className="text-white/60 text-sm md:text-base font-light font-sans max-w-xl leading-relaxed">
              Explore my personal database of curated platforms, custom MCP servers, elite AI models, and digital templates. Easily scale your engineering speed.
            </p>
          </div>

          {/* Action Gateway Card */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="w-full md:w-80 p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden text-left shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5" />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                  <Database className="text-indigo-400" size={16} />
                </span>
                <span className="text-[9px] font-black tracking-widest font-mono uppercase text-white/40">Notion Hub</span>
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-sans">Master Database</h4>
                <p className="text-white/50 text-[11px] font-light font-sans mt-0.5">
                  Redirect directly to our heavy loaded Notion dashboard carrying 500+ curated setups.
                </p>
              </div>
              <a
                href={MASTER_NOTION_DB_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(99,102,241,0.2)]"
              >
                <span>Launch Master Directory</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 2. Interactive Search & Categorization */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#050505]/40 border border-white/5 rounded-3xl p-4 backdrop-blur-md">
          {/* Custom Minimalist Search Bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/30">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search tools, tags, libraries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/5 rounded-2xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/50 transition-colors font-sans font-medium"
            />
          </div>

          {/* Quick-Filter Horizontal Scroll Category Tags */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? "bg-white text-black border-white shadow-lg shadow-white/5"
                      : "bg-white/5 border-white/5 text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Preloaded Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout animate">
            {filteredTools.length > 0 ? (
              filteredTools.map((tool, idx) => (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.03, ease: [0.23, 1, 0.32, 1] }}
                  className="group relative flex flex-col justify-between p-5 rounded-3xl border border-white/5 bg-[#050505]/20 hover:border-white/10 hover:bg-white/5 transition-all text-left"
                >
                  <div className="space-y-4">
                    {/* Card Header (Icon + Badge) */}
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors">
                        {tool.icon}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-white/5 border border-white/5 text-white/50 font-mono">
                        {tool.pricing}
                      </span>
                    </div>

                    {/* App Specs */}
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors font-sans">
                        {tool.name}
                      </h4>
                      <p className="text-white/55 text-xs font-light font-sans mt-2 line-clamp-3 min-h-[4rem] leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>

                    {/* Interactive tags mapping */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-lg text-[9px] font-bold tracking-wide bg-indigo-500/5 text-indigo-400/80 font-mono border border-indigo-500/15"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions (Bottom details) */}
                  <div className="flex items-center justify-between pt-5 mt-4 border-t border-white/5">
                    <div className="flex flex-col">
                      <span className="text-[8px] uppercase tracking-widest text-white/30 font-mono">Popularity</span>
                      <span className="text-[10px] font-black text-emerald-400 font-mono">{tool.popularity}</span>
                    </div>
                    <a
                      href={tool.actionUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-white/5 hover:bg-white/15 px-3 py-1.5 rounded-xl transition-colors font-sans border border-white/5"
                    >
                      <span>Explore</span>
                      <ExternalLink size={10} className="opacity-60" />
                    </a>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-60 space-y-3"
              >
                <Database size={40} className="text-white/20" />
                <h5 className="text-sm font-bold text-white/80 font-sans">No tools matched your filter</h5>
                <p className="text-xs text-white/40 max-w-xs font-sans">
                  Try adjusting categories or search keywords, or launch the master external Notion Hub.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 4. Help / Pro Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#050505]/20 border border-white/5 rounded-[2.5rem] p-6 md:p-8 backdrop-blur-md text-left">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Bookmark className="text-indigo-400" size={18} />
          </div>
          <div>
            <h5 className="text-sm font-bold text-white font-sans">Why use Tools Pedia?</h5>
            <p className="text-white/50 text-xs font-light font-sans mt-1.5 leading-relaxed">
              We gather, categorize, and benchmark top developer utilities, custom MCP servers, and automation structures so you don't waste time on bloated technologies. 
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shrink-0">
            <HelpCircle className="text-teal-400" size={18} />
          </div>
          <div>
            <h5 className="text-sm font-bold text-white font-sans">How to update the database?</h5>
            <p className="text-white/50 text-xs font-light font-sans mt-1.5 leading-relaxed">
              You can easily submit new tools and automation pipelines securely inside our shared Notion database. Content is moderated and redeployed globally every midnight.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
