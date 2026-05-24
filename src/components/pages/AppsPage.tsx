import React, { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Search, 
  LayoutGrid, 
  List, 
  Play, 
  ArrowRight,
  Activity,
  Briefcase,
  Layers,
  Bot,
  Code2,
  Gamepad2,
  Lock,
  Brain,
  Rocket,
  AppWindow,
  SearchCode
} from "lucide-react";
import { BentoCard, SkeletonCard } from "../shared/BentoCard";
import { projects } from "../../constants/data";
import { ProjectType, ProjectCategory } from "../../types";
import { cn } from "../../lib/utils";

export const AppsPage = ({
  activeProjectCategory,
  setActiveProjectCategory,
  projectFilter,
  setProjectFilter,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  isInImmersiveMode,
  setIsInImmersiveMode,
  setSelectedProject,
  isLoading,
  filteredProjects,
  openProjectModal,
}: {
  activeProjectCategory: ProjectCategory | null;
  setActiveProjectCategory: (category: ProjectCategory | null) => void;
  projectFilter: string[];
  setProjectFilter: React.Dispatch<React.SetStateAction<string[]>>;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  isInImmersiveMode: boolean;
  setIsInImmersiveMode: (val: boolean) => void;
  setSelectedProject: (p: ProjectType) => void;
  isLoading: boolean;
  filteredProjects: ProjectType[];
  openProjectModal: (p: ProjectType) => void;
}) => {
  const immersiveCategories = [
    "All",
    "Pro Business Suite",
    "AI Solutions",
    "Apps & Dev",
    "Interactive Experiences",
    "My Personal Apps",
  ];

  const categoryDescriptions: Record<string, string> = {
    All: "Explore my complete portfolio of projects, apps, and experiments.",
    "AI Solutions": "Advanced artificial intelligence tools and automated workflows.",
    "Apps & Dev": "Full-stack applications, developer tools, and software projects.",
    "Interactive Experiences": "Immersive 3D worlds, games, and creative web experiences.",
    "My Personal Apps": "Private tools and experimental projects built for personal use.",
  };

  const currentCategoryProjects = useMemo(() => {
    if (!activeProjectCategory) return projects;
    return projects.filter(
      (p) =>
        p.mainCategory === activeProjectCategory ||
        (p as any).categories?.includes(activeProjectCategory)
    );
  }, [activeProjectCategory]);

  const categoryTags = useMemo(() => {
    return ["All", ...Array.from(new Set(currentCategoryProjects.flatMap((p) => p.tags)))];
  }, [currentCategoryProjects]);

  // Immersive Mode Render
  if (isInImmersiveMode) {
    return (
      <div className="flex flex-col md:flex-row gap-8 min-h-screen pb-20 w-full max-w-7xl mx-auto px-4 md:px-6 mt-8">
        {/* Floating Sidebar */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0">
          <div className="sticky top-8 glass backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-8 shadow-2xl">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsInImmersiveMode(false);
                  setActiveProjectCategory(null);
                  setSearchQuery("");
                  setProjectFilter([]);
                }}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 group cursor-pointer"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </button>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white mb-0.5 font-sans">INFNI-T' LABZ</h2>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold font-mono">
                  PLATFORM LABS
                </p>
              </div>
            </div>

            {/* Quick Search inside Sidebar */}
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all focus:bg-white/10 font-sans"
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 px-1">
                  Categories
                </h3>
                <div className="flex flex-col gap-1">
                  {immersiveCategories.map((cat) => {
                    const isActive =
                      (cat === "All" && !activeProjectCategory) || activeProjectCategory === cat;
                    const catProjects =
                      cat === "All"
                        ? projects.filter(
                            (p) =>
                              immersiveCategories.includes(p.mainCategory) ||
                              (p as any).categories?.some((c: string) =>
                                immersiveCategories.includes(c)
                              )
                          )
                        : projects.filter(
                            (p) =>
                              p.mainCategory === cat || (p as any).categories?.includes(cat)
                          );
                    const catTags = cat === "All" ? [] : Array.from(new Set(catProjects.flatMap((p) => p.tags)));

                    return (
                      <div key={cat} className="flex flex-col gap-1">
                        <button
                          onClick={() => {
                            setActiveProjectCategory((cat === "All" ? null : cat) as ProjectCategory | null);
                            setProjectFilter([]);
                          }}
                          className={cn(
                            "px-4 py-3 rounded-xl text-xs font-bold transition-all text-left border flex items-center justify-between group cursor-pointer",
                            isActive
                              ? "bg-white text-black border-white shadow-lg shadow-white/10"
                              : "bg-transparent text-white/60 border-transparent hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <span>{cat}</span>
                          <span
                            className={cn(
                              "text-[10px] px-2 py-0.5 rounded-full font-bold",
                              isActive
                                ? "bg-black/10 text-black"
                                : "bg-white/10 text-white/40 group-hover:bg-white/20 group-hover:text-white"
                            )}
                          >
                            {catProjects.length}
                          </span>
                        </button>

                        <AnimatePresence>
                          {isActive && cat !== "All" && catTags.length > 0 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="pl-4 py-2 flex flex-col gap-1 border-l border-white/10 ml-2 mt-1 overflow-hidden"
                            >
                              <button
                                onClick={() => setProjectFilter([])}
                                className={cn(
                                  "text-left text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-all flex items-center justify-between cursor-pointer",
                                  projectFilter.length === 0
                                    ? "bg-white/10 text-white"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                )}
                              >
                                <span>All {cat}</span>
                                <span className="opacity-50">({catProjects.length})</span>
                              </button>
                              {catTags.map((tag) => {
                                const tagCount = catProjects.filter((p) =>
                                  p.tags.includes(tag)
                                ).length;
                                return (
                                  <button
                                    key={tag}
                                    onClick={() =>
                                      setProjectFilter((prev) =>
                                        prev.includes(tag)
                                          ? prev.filter((t) => t !== tag)
                                          : [...prev, tag]
                                      )
                                    }
                                    className={cn(
                                      "text-left text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-all flex items-center justify-between cursor-pointer",
                                      projectFilter.includes(tag)
                                        ? "bg-white/10 text-white"
                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                    )}
                                  >
                                    <span>{tag}</span>
                                    <span className="opacity-50">({tagCount})</span>
                                  </button>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 px-1 font-mono">
                  View Mode
                </h3>
                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "flex-1 flex justify-center items-center gap-2 py-2 rounded-xl transition-all text-xs font-bold cursor-pointer",
                      viewMode === "grid" ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white"
                    )}
                  >
                    <LayoutGrid size={14} /> Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "flex-1 flex justify-center items-center gap-2 py-2 rounded-xl transition-all text-xs font-bold cursor-pointer",
                      viewMode === "list" ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white"
                    )}
                  >
                    <List size={14} /> List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center glass rounded-[3rem] border border-white/5">
              <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-white/10">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-2">No results found</h3>
              <p className="text-white/40">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setProjectFilter([]);
                  setActiveProjectCategory(null);
                }}
                className="mt-8 px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition-all cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="mb-2">
                <h2 className="text-3xl font-bold text-white mb-2 font-sans">
                  {projectFilter.length === 0 ? `All Apps` : projectFilter.join(", ")}
                </h2>
                <p className="text-white/50 text-sm font-sans">
                  {projectFilter.length === 0
                    ? categoryDescriptions["All"]
                    : `Explore projects related to ${projectFilter.join(", ")}.`}
                </p>
              </div>
              <div
                className={cn(
                  "gap-6",
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid grid-cols-1 xl:grid-cols-2"
                )}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((p, i) => {
                    const isUrlValid = p.url !== "#" || (p.previewUrl && p.previewUrl.includes("youtube.com/embed/"));
                    const imgUrl = p.url !== "#"
                      ? `https://image.thum.io/get/width/800/crop/800/noanimate/${p.url}`
                      : p.previewUrl
                      ? `https://img.youtube.com/vi/${p.previewUrl.split("/").pop()}/maxresdefault.jpg`
                      : null;

                    return (
                      <motion.div
                        key={p.name}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <BentoCard
                          size="1x1"
                          className={cn(
                            p.bg,
                            "border-white/5 cursor-pointer relative overflow-hidden group/project flex flex-col p-0 shadow-lg transition-all duration-300",
                            viewMode === "grid" ? "h-[450px]" : "h-auto md:h-44"
                          )}
                          onClick={() => openProjectModal(p)}
                          background={null}
                        >
                          {viewMode === "grid" ? (
                            <div className="flex flex-col h-full w-full">
                              {/* Top Image Area */}
                              <div className="relative w-full h-[190px] shrink-0 overflow-hidden bg-black/40 border-b border-white/5">
                                {isUrlValid && imgUrl ? (
                                  <img
                                    src={imgUrl}
                                    alt={p.name}
                                    className="w-full h-full object-cover opacity-80 group-hover/project:opacity-100 transition-all duration-700 group-hover/project:scale-110"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-white/10 scale-150">
                                    {p.icon}
                                  </div>
                                )}
                                {/* Cover overlay gradient to transition nicely */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

                                {/* Absolute Overlays inside Thumbnail area */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                  <div
                                    className={cn(
                                      "p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-lg text-white",
                                      p.color
                                    )}
                                  >
                                    {p.icon}
                                  </div>
                                  <div className="flex flex-col items-end gap-1.5">
                                    <span
                                      className={cn(
                                        "text-[8px] md:text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-lg font-mono text-white",
                                        p.pricing === "Paid"
                                          ? "bg-amber-500/20 text-amber-400"
                                          : "bg-emerald-500/20 text-emerald-400"
                                      )}
                                    >
                                      {p.pricing}
                                    </span>
                                    {p.status && (
                                      <span
                                        className={cn(
                                          "text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter backdrop-blur-md border border-white/10 font-mono text-white",
                                          p.status === "Development"
                                            ? "bg-amber-500/20 text-amber-400"
                                            : p.status === "Beta"
                                            ? "bg-blue-500/20 text-blue-400"
                                            : "bg-emerald-500/20 text-emerald-400"
                                        )}
                                      >
                                        {p.status}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Bottom Content Area */}
                              <div className="flex-1 p-5 flex flex-col justify-between bg-[#050505]/40">
                                <div className="space-y-2">
                                  <h3 className="font-bold text-xl group-hover/project:text-indigo-400 transition-colors line-clamp-1 font-sans text-white">
                                    {p.name}
                                  </h3>
                                  <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-2 font-sans">
                                    {p.desc}
                                  </p>

                                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                    {p.tags.slice(0, 3).map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-0.5 rounded-md bg-white/5 text-[8px] md:text-[9px] text-white/40 font-bold uppercase tracking-tighter border border-white/5 font-mono"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-3">
                                  <div className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors flex items-center gap-2 font-mono">
                                    <span>
                                      {p.mainCategory === "My Personal Apps"
                                        ? "Watch Preview"
                                        : "View Project"}
                                    </span>
                                    <ArrowRight
                                      size={12}
                                      className="group-hover:translate-x-1 transition-transform"
                                    />
                                  </div>
                                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/project:bg-indigo-500 group-hover/project:text-white transition-all shadow-xl text-white">
                                    {p.mainCategory === "My Personal Apps" ? (
                                      <Play size={14} fill="currentColor" />
                                    ) : (
                                      <ArrowRight size={14} />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-row items-center w-full h-full p-4 gap-4 bg-[#050505]/45">
                              {/* Left Icon */}
                              <div className="flex items-start shrink-0">
                                <div className={cn("p-3 rounded-2xl bg-black/40 border border-white/10", p.color)}>
                                  {p.icon}
                                </div>
                              </div>

                              {/* Mid Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                                    {p.mainCategory}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 mb-1.5">
                                  <h3 className="font-bold text-lg group-hover/project:text-indigo-400 transition-colors font-sans text-white truncate">
                                    {p.name}
                                  </h3>
                                  {p.status && (
                                    <span
                                      className={cn(
                                        "text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter block font-mono",
                                        p.status === "Development"
                                          ? "bg-amber-500/20 text-amber-400"
                                          : p.status === "Beta"
                                          ? "bg-blue-500/20 text-blue-400"
                                          : "bg-emerald-500/20 text-emerald-400"
                                      )}
                                    >
                                      {p.status}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-white/50 font-light leading-relaxed line-clamp-1 md:line-clamp-2 mb-2 font-sans">
                                  {p.desc}
                                </p>

                                <div className="flex items-center gap-2">
                                  <div className="flex gap-1.5">
                                    {p.tags.slice(0, 4).map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-0.5 rounded-md bg-white/5 text-[8px] text-white/40 font-bold uppercase tracking-tighter border border-white/5 font-mono"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                    {p.tags.length > 4 && (
                                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-[8px] text-white/40 font-bold uppercase tracking-tighter border border-white/5 font-mono">
                                        +{p.tags.length - 4}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Right Pricing Badge / Arrow */}
                              <div className="flex flex-col items-end gap-2 shrink-0 ml-auto self-stretch justify-between py-1 leading-none">
                                <span
                                  className={cn(
                                    "text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-mono",
                                    p.pricing === "Paid"
                                      ? "bg-amber-500/20 text-amber-400"
                                      : "bg-emerald-500/20 text-emerald-400"
                                  )}
                                >
                                  {p.pricing}
                                </span>
                                <div className="p-2 rounded-full bg-white/5 text-white/40 border border-white/5 group-hover/project:bg-white/10 group-hover/project:text-white transition-all">
                                  <ArrowRight
                                    size={16}
                                    className="group-hover/project:-rotate-45 transition-transform"
                                  />
                                </div>
                              </div>

                              {/* Thumbnail preview - kept only on the right as a standard preview block */}
                              <div className="hidden sm:block relative w-36 h-28 rounded-xl overflow-hidden shrink-0 border border-white/10">
                                {isUrlValid && imgUrl ? (
                                  <img
                                    src={
                                      p.url !== "#"
                                        ? `https://image.thum.io/get/width/400/crop/400/noanimate/${p.url}`
                                        : `https://img.youtube.com/vi/${p.previewUrl.split("/").pop()}/maxresdefault.jpg`
                                    }
                                    alt={p.name}
                                    className="w-full h-full object-cover opacity-80 group-hover/project:opacity-100 transition-all duration-500 group-hover/project:scale-110"
                                    loading="lazy"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                    <div className="opacity-20 scale-150 text-white">{p.icon}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </BentoCard>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Regular (Non-Immersive) Category View or Category Cards Grid
  if (!activeProjectCategory) {
    return (
      <div className="space-y-8 pb-12 w-full pt-4 max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] p-[2px] group mb-8">
          <div className="absolute inset-0 bg-indigo-500/20 rounded-[2.5rem]" />
          <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#6366f1_300deg,#a855f7_330deg,#ec4899_360deg)] animate-border-spin blur-md opacity-70" />
          <div className="relative h-full w-full bg-[#050505] rounded-[calc(2.5rem-2px)] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden gap-6">
            <div className="absolute inset-0 bg-indigo-500/5" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-2 font-sans">INFNI-T' LABZ</h3>
              <p className="text-white/50 text-base max-w-xl font-light font-sans">
                Experience my public tools, automation hubs, SaaS boilers, and advanced experimental models in a dedicated workspace.
              </p>
            </div>
            <button
              onClick={() => setIsInImmersiveMode(true)}
              className="relative z-10 px-8 py-4 rounded-2xl bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-3 group-hover:scale-105 shrink-0 cursor-pointer"
            >
              <Rocket size={20} />
              <span className="font-sans">Enter Gallery</span>
            </button>
          </div>
        </div>

        {/* Development Status Marquee */}
        <div className="bg-amber-500/10 border border-amber-500/20 py-3 px-4 md:px-6 rounded-full flex items-center gap-4 overflow-hidden relative mb-8">
          <div className="flex items-center gap-2 text-amber-400 shrink-0 z-10 bg-[#050505] pr-2 md:pr-4 py-1 rounded-full">
            <Activity size={18} />
            <span className="font-bold text-xs md:text-sm whitespace-nowrap font-sans">Development Status</span>
          </div>
          <div className="flex-1 overflow-hidden relative flex items-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex whitespace-nowrap animate-marquee text-amber-400/70 text-xs md:text-sm">
              <span className="mx-4">Some apps are complete and some are still under development.</span>
              <span className="mx-4">•</span>
              <span className="mx-4">
                If you face any issues, contact us or wait until the development is finished or the
                problem is fixed.
              </span>
              <span className="mx-4">•</span>
              <span className="mx-4">Some apps are complete and some are still under development.</span>
              <span className="mx-4">•</span>
              <span className="mx-4">
                If you face any issues, contact us or wait until the development is finished or the
                problem is fixed.
              </span>
            </div>
          </div>
        </div>

        <div className="text-center md:text-left mb-8">
          <h2 className="text-3xl font-bold mb-4 font-sans text-white">Apps & Tools</h2>
          <p className="text-white/60 max-w-2xl font-sans">
            Here I build apps, games, tools, and experiences for you, the community, and my own
            self too.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          <BentoCard
            size="2x1"
            onClick={() => {
              setActiveProjectCategory("Pro Business Suite" as ProjectCategory);
              setIsInImmersiveMode(true);
            }}
            className="md:col-span-2 cursor-pointer hover:bg-blue-500/10 transition-colors group relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Briefcase size={160} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <Briefcase size={24} />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-white font-sans">
                Pro Business Suite{" "}
                <span className="text-white/30 text-lg font-mono">
                  (
                  {
                    projects.filter(
                      (p) =>
                        p.mainCategory === "Pro Business Suite" ||
                        (p as any).categories?.includes("Pro Business Suite")
                    ).length
                  }
                  )
                </span>
              </h3>
              <p className="text-white/50 text-sm max-w-md leading-relaxed font-sans">
                Advanced tools for SEO, Ad Campaigns, AI Helpers, and Professional Visualizers. The ultimate admin and advanced work suite.
              </p>
            </div>
          </BentoCard>

          <BentoCard
            size="1x1"
            onClick={() => {
              setActiveProjectCategory("AI Solutions" as ProjectCategory);
              setIsInImmersiveMode(true);
            }}
            className="cursor-pointer hover:bg-emerald-500/10 transition-colors group relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Brain size={120} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Brain size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white font-sans">
                AI Solutions{" "}
                <span className="text-white/30 text-lg font-mono">
                  ({projects.filter((p) => p.mainCategory === "AI Solutions").length})
                </span>
              </h3>
              <p className="text-white/50 text-sm max-w-[200px] font-sans">
                Enterprise-grade AI Platforms, LLM Tools, and Agents.
              </p>
            </div>
          </BentoCard>

          <BentoCard
            size="1x1"
            onClick={() => {
              setActiveProjectCategory("Apps & Dev" as ProjectCategory);
              setIsInImmersiveMode(true);
            }}
            className="cursor-pointer hover:bg-indigo-500/10 transition-colors group relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Code2 size={120} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                <Code2 size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white font-sans">
                Apps & Dev{" "}
                <span className="text-white/30 text-lg font-mono">
                  ({projects.filter((p) => p.mainCategory === "Apps & Dev").length})
                </span>
              </h3>
              <p className="text-white/50 text-sm max-w-[200px] font-sans">
                SaaS, Mobile Apps, AI Tools & Open Source Repos.
              </p>
            </div>
          </BentoCard>

          <BentoCard
            size="1x1"
            onClick={() => {
              setActiveProjectCategory("Interactive Experiences" as ProjectCategory);
              setIsInImmersiveMode(true);
            }}
            className="cursor-pointer hover:bg-cyan-500/10 transition-colors group relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Gamepad2 size={120} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <Gamepad2 size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white font-sans">
                Interactive{" "}
                <span className="text-white/30 text-lg font-mono">
                  (
                  {
                    projects.filter(
                      (p) =>
                        p.mainCategory === "Interactive Experiences" ||
                        (p as any).categories?.includes("Interactive Experiences")
                    ).length
                  }
                  )
                </span>
              </h3>
              <p className="text-white/50 text-sm max-w-[200px] font-sans">
                Games, 3D environments, and interactive storytelling.
              </p>
            </div>
          </BentoCard>

          <BentoCard
            size="2x1"
            onClick={() => {
              setActiveProjectCategory("My Personal Apps" as ProjectCategory);
              setIsInImmersiveMode(true);
            }}
            className="md:col-span-2 cursor-pointer hover:bg-rose-500/10 transition-colors group relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Lock size={160} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                <Lock size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white font-sans">
                My Personal Apps{" "}
                <span className="text-white/30 text-lg font-mono">
                  ({projects.filter((p) => p.mainCategory === "My Personal Apps").length})
                </span>
              </h3>
              <p className="text-white/50 text-sm max-w-[300px] font-sans">
                Special apps currently not published, giving a glimpse into my personal builds
                and experiments.
              </p>
            </div>
          </BentoCard>
        </div>
      </div>
    );
  }

  // Active Category View
  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setActiveProjectCategory(null);
              setProjectFilter([]);
              setSearchQuery("");
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-white font-sans">
              {activeProjectCategory}{" "}
              <span className="text-white/30 text-lg font-mono">
                ({currentCategoryProjects.length})
              </span>
            </h2>
            <p className="text-sm text-white/50 font-sans">Explore my work in this category.</p>
          </div>
        </div>

        <div className="relative group w-full sm:w-64">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-2 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all focus:bg-white/10"
          />
        </div>
      </div>

      {categoryTags.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categoryTags.map((f) => {
            const count =
              f === "All"
                ? currentCategoryProjects.length
                : currentCategoryProjects.filter((p) => p.tags.includes(f)).length;
            const isSelected = f === "All" ? projectFilter.length === 0 : projectFilter.includes(f);
            return (
              <button
                key={f}
                onClick={() => {
                  if (f === "All") {
                    setProjectFilter([]);
                  } else {
                    setProjectFilter((prev) =>
                      prev.includes(f) ? prev.filter((t) => t !== f) : [...prev, f]
                    );
                  }
                }}
                className={cn(
                  "px-4 py-2 rounded-2xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer font-sans",
                  isSelected ? "bg-white text-black font-bold" : "bg-white/5 text-white/40 hover:bg-white/10"
                )}
              >
                <span>{f}</span>
                <span className={cn("opacity-50 font-mono", isSelected ? "text-black/50" : "text-white/30")}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>
      )}

      {filteredProjects.length === 0 ? (
        <div className="py-12 text-center border border-white/5 rounded-3xl bg-white/[0.02]">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-white/20">
            <AppWindow size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white font-sans">No projects yet</h3>
          <p className="text-white/50 font-sans">I'm currently working on exciting things for this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard
                key={i}
                size={i === 0 && projectFilter.length === 0 ? "2x1" : "1x1"}
              />
            ))
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, i) => {
                const isFirstCardExpand = i === 0 && projectFilter.length === 0;
                const isUrlValid = p.url !== "#" || (p.previewUrl && p.previewUrl.includes("youtube.com/embed/"));
                const imgUrl = p.url !== "#"
                  ? `https://image.thum.io/get/width/800/crop/800/noanimate/${p.url}`
                  : p.previewUrl
                  ? `https://img.youtube.com/vi/${p.previewUrl.split("/").pop()}/maxresdefault.jpg`
                  : null;

                return (
                  <BentoCard
                    key={p.name}
                    size={isFirstCardExpand ? "2x1" : "1x1"}
                    className={cn(
                      p.bg,
                      "border-white/5 cursor-pointer relative overflow-hidden group/project h-[450px] p-0 shadow-lg flex flex-col transition-all duration-300",
                      isFirstCardExpand ? "md:col-span-2" : ""
                    )}
                    onClick={() => openProjectModal(p)}
                    background={null}
                  >
                    <div className="flex flex-col h-full w-full">
                      {/* Top Image Area */}
                      <div className="relative w-full h-[190px] shrink-0 overflow-hidden bg-black/40 border-b border-white/5">
                        {isUrlValid && imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={p.name}
                            className="w-full h-full object-cover opacity-80 group-hover/project:opacity-100 transition-all duration-700 group-hover/project:scale-110"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/10 scale-150">
                            {p.icon}
                          </div>
                        )}
                        {/* Cover overlay gradient to transition nicely */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

                        {/* Absolute Overlays inside Thumbnail area */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                          <div
                            className={cn(
                              "p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 shadow-lg text-white",
                              p.color
                            )}
                          >
                            {p.icon}
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            <span
                              className={cn(
                                "text-[8px] md:text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-lg font-mono text-white",
                                p.pricing === "Paid"
                                  ? "bg-amber-500/20 text-amber-400"
                                  : "bg-emerald-500/20 text-emerald-400"
                              )}
                            >
                              {p.pricing} {p.price && `(${p.price})`}
                            </span>
                            {p.status && (
                              <span
                                className={cn(
                                  "text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter backdrop-blur-md border border-white/10 font-mono text-white",
                                  p.status === "Development"
                                    ? "bg-amber-500/20 text-amber-400"
                                    : p.status === "Beta"
                                    ? "bg-blue-500/20 text-blue-400"
                                    : "bg-emerald-500/20 text-emerald-400"
                                )}
                              >
                                {p.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Content Area */}
                      <div className="flex-1 p-5 flex flex-col justify-between bg-[#050505]/40">
                        <div className="space-y-2">
                          <h3 className="font-bold text-xl group-hover/project:text-indigo-400 transition-colors line-clamp-1 font-sans text-white">
                            {p.name}
                          </h3>
                          <p className="text-xs text-white/60 font-light leading-relaxed mb-4 line-clamp-2">
                            {p.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <span className="text-[9px] font-bold text-white/40 group-hover:text-white transition-colors flex items-center gap-1.5 font-mono">
                            <span>
                              {p.mainCategory === "My Personal Apps" ? "Watch Preview" : "View Project"}
                            </span>
                            <ArrowRight size={10} />
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-hover/project:bg-indigo-500 group-hover/project:text-white transition-all shadow-md">
                            {p.mainCategory === "My Personal Apps" ? (
                              <Play size={12} fill="currentColor" />
                            ) : (
                              <ArrowRight size={12} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </BentoCard>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
};
