import React, { useState } from "react";
import { Youtube, ExternalLink, Play, Sparkles, BookOpen, GraduationCap, Clock, Search, ArrowRight } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { cn } from "../../lib/utils";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string; // Embed code or full link
  youtubeId: string;
  tags: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
}

const TUTORIALS: Tutorial[] = [
  {
    id: "t1",
    title: "How I Built a Multi-Agent AI System in n8n",
    description: "Deep dive instruction explaining the step-by-step assembly of automated autonomous developer crews inside n8n without coding.",
    duration: "18:45",
    videoUrl: "https://www.youtube.com/embed/VxCV8_2UZIM", // Placeholder or direct video
    youtubeId: "VxCV8_2UZIM",
    tags: ["n8n", "Agents", "No-Code"],
    level: "Intermediate",
  },
  {
    id: "t2",
    title: "State Management & React Suspense Patterns",
    description: "Learn how to optimize rendering hierarchies, prevent infinite loops, and handle heavy asynchronous payloads cleanly in React 18+.",
    duration: "24:12",
    videoUrl: "https://www.youtube.com/embed/VxCV8_2UZIM",
    youtubeId: "VxCV8_2UZIM",
    tags: ["React", "State", "TypeScript"],
    level: "Advanced",
  },
  {
    id: "t3",
    title: "The Ultimate Guide to n8n Webhooks & API Security",
    description: "Connect complex external systems safely using private keys, HMAC secret verification, and payload filtering nodes.",
    duration: "15:30",
    videoUrl: "https://www.youtube.com/embed/VxCV8_2UZIM",
    youtubeId: "VxCV8_2UZIM",
    tags: ["n8n", "Security", "APIs"],
    level: "Beginner",
  },
];

export const AcademyPage = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial>(TUTORIALS[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutorials = TUTORIALS.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Academy Hero Header */}
      <BentoCard size="3x1" className="bg-gradient-to-r from-red-500/10 via-amber-500/5 to-transparent border-red-500/20 p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-xs font-bold font-mono text-red-400 rounded-full">
              <GraduationCap size={12} />
              Learn & Automate
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white font-sans">
              Academy
            </h1>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Step-by-step video lessons and detailed tutorials on system engineering, AI orchestration, n8n automation architectures, and modern full-stack development.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-4">
            <a
              href="https://www.youtube.com/@abdulrahman-toor/"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 group rounded-xl bg-red-500 text-white font-extrabold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg shadow-red-500/20 border border-red-600 transition-all hover:bg-red-400"
            >
              <Youtube size={16} />
              <span>YouTube Channel</span>
            </a>
          </div>
        </div>
      </BentoCard>

      {/* Main Grid: Active Player & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Video Player (2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-4">
          <BentoCard size="2x1" className="bg-black/60 p-0 overflow-hidden border-white/5 shadow-2xl relative aspect-video h-auto">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedTutorial.youtubeId}`}
              title={selectedTutorial.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full object-cover"
            ></iframe>
          </BentoCard>

          <div className="p-6 rounded-3xl bg-[#050505]/40 border border-white/5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-mono border",
                  selectedTutorial.level === "Beginner" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                  selectedTutorial.level === "Intermediate" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                  "bg-rose-500/10 text-rose-400 border-rose-500/20"
                )}>
                  {selectedTutorial.level}
                </span>
                <span className="text-[10px] text-white/30 font-mono flex items-center gap-1">
                  <Clock size={12} />
                  {selectedTutorial.duration} min
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {selectedTutorial.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[9px] text-white/40 font-mono">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
            <h2 className="text-xl font-bold text-white font-sans">{selectedTutorial.title}</h2>
            <p className="text-xs text-white/55 font-light leading-relaxed">{selectedTutorial.description}</p>
          </div>
        </div>

        {/* Right Tutorial Feed */}
        <div className="space-y-4 flex flex-col h-full">
          {/* Search Box */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-400 transition-colors" size={14} />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-xs text-white focus:outline-none focus:border-red-500/50 transition-all focus:bg-white/10"
            />
          </div>

          {/* Lessons Stack */}
          <div className="flex-1 space-y-2 overflow-y-auto max-h-[460px] no-scrollbar pr-1">
            {filteredTutorials.map((tut) => {
              const isCurrent = tut.id === selectedTutorial.id;
              return (
                <button
                  key={tut.id}
                  onClick={() => setSelectedTutorial(tut)}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col gap-2 relative group",
                    isCurrent
                      ? "bg-red-500/10 border-red-500/30 text-white shadow-xl shadow-red-500/[0.02]"
                      : "bg-white/5 border-transparent hover:border-white/10 hover:bg-white/10 text-white/70"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-bold font-mono text-white/30 uppercase tracking-widest">
                      Session {tut.id.toUpperCase()}
                    </span>
                    <span className="text-[9px] text-white/40 font-mono flex items-center gap-1">
                      <Clock size={10} />
                      {tut.duration}
                    </span>
                  </div>
                  <h4 className={cn(
                    "font-bold text-xs font-sans group-hover:text-red-400 transition-colors line-clamp-1",
                    isCurrent ? "text-red-400" : "text-white"
                  )}>
                    {tut.title}
                  </h4>
                  <p className="text-[10px] text-white/40 font-light line-clamp-2 leading-relaxed">
                    {tut.description}
                  </p>
                  <div className="flex items-center gap-2 pt-1 border-t border-white/5 mt-auto text-[9px] font-mono text-white/20">
                    <span>Level: {tut.level}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
