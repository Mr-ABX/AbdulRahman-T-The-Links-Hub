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
  Layers,
  Globe,
  Video,
  Palette,
  Rocket,
  AppWindow,
  SearchCode,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { BentoCard, SkeletonCard } from "../shared/BentoCard";
import { projects } from "../../constants/data";
import { ProjectType, ProjectCategory } from "../../types";
import { cn } from "../../lib/utils";

export const ProjectsPage = ({
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
  const projectCategories = [
    "All",
    "Web Development Projects",
    "Video & Motion Graphics",
    "Graphics & Marketing",
  ];

  const categoryDescriptions: Record<string, string> = {
    All: "A handpicked selection of my custom web applications, video productions, and creative design systems.",
    "Web Development Projects": "Premium digital portals, corporate platforms, web tools, and full-stack solutions built with ultimate performance.",
    "Video & Motion Graphics": "My professional video editing, VFX reels, and cinematic transitions with dynamic animation curves.",
    "Graphics & Marketing": "High-impact visual designs, corporate branding systems, and social media media bundles.",
  };

  const currentCategoryProjects = useMemo(() => {
    if (!activeProjectCategory) {
      // Default to non-apps categories
      return projects.filter(
        (p) =>
          p.mainCategory === "Web Development Projects" ||
          p.mainCategory === "Video & Motion Graphics" ||
          p.mainCategory === "Graphics & Marketing"
      );
    }
    return projects.filter(
      (p) =>
        p.mainCategory === activeProjectCategory ||
        (p as any).categories?.includes(activeProjectCategory)
    );
  }, [activeProjectCategory]);

  const categoryTags = useMemo(() => {
    return ["All", ...Array.from(new Set(currentCategoryProjects.flatMap((p) => p.tags)))];
  }, [currentCategoryProjects]);

  const getProjectImageUrl = (url: string, previewUrl?: string) => {
    if (url && url !== "#") {
      return `https://image.thum.io/get/width/800/crop/800/noanimate/${url}`;
    }
    if (previewUrl) {
      if (previewUrl.includes("youtube.com") || previewUrl.includes("youtu.be")) {
        let videoId = "";
        if (previewUrl.includes("v=")) {
          videoId = previewUrl.split("v=")[1].split("&")[0];
        } else if (previewUrl.includes("embed/")) {
          videoId = previewUrl.split("embed/")[1].split("?")[0];
        } else if (previewUrl.includes("youtu.be/")) {
          videoId = previewUrl.split("youtu.be/")[1].split("?")[0];
        }
        if (videoId) {
          return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
        }
      }
    }
    return null;
  };

  // Immersive Mode Render for Projects
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
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 group cursor-pointer text-white"
              >
                <ArrowLeft
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </button>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">Project Showcase</h2>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                  Immersive
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 px-1 font-mono">
                  Portfolios
                </h3>
                <div className="flex flex-col gap-1">
                  {projectCategories.map((cat) => {
                    const isActive =
                      (cat === "All" && !activeProjectCategory) || activeProjectCategory === cat;
                    const catProjects =
                      cat === "All"
                        ? projects.filter(
                            (p) =>
                              projectCategories.includes(p.mainCategory) ||
                              (p as any).categories?.some((c: string) =>
                                projectCategories.includes(c)
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
                          <span className="font-sans">{cat}</span>
                          <span
                            className={cn(
                              "text-[10px] px-2 py-0.5 rounded-full font-bold font-mono",
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
                                  "text-left text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-all flex items-center justify-between cursor-pointer font-sans",
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
                                      "text-left text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-all flex items-center justify-between cursor-pointer font-sans",
                                      projectFilter.includes(tag)
                                        ? "bg-white/10 text-white"
                                        : "text-white/40 hover:text-white hover:bg-white/5"
                                    )}
                                  >
                                    <span>{tag}</span>
                                    <span className="opacity-50 font-mono">({tagCount})</span>
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
                      "flex-1 flex justify-center items-center gap-2 py-2 rounded-xl transition-all text-xs font-bold cursor-pointer font-sans",
                      viewMode === "grid" ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white"
                    )}
                  >
                    <LayoutGrid size={14} /> Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "flex-1 flex justify-center items-center gap-2 py-2 rounded-xl transition-all text-xs font-bold cursor-pointer font-sans",
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
              <h3 className="text-2xl font-bold mb-2 text-white font-sans">No projects found</h3>
              <p className="text-white/40 font-sans">
                Try adjusting your search or category filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setProjectFilter([]);
                  setActiveProjectCategory(null);
                }}
                className="mt-8 px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition-all cursor-pointer font-sans shadow-xl shadow-indigo-500/20"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="mb-2">
                <h2 className="text-3xl font-bold text-white mb-2 font-sans">
                  {projectFilter.length === 0 ? `All Portfolios` : projectFilter.join(", ")}
                </h2>
                <p className="text-white/50 text-sm font-sans">
                  {projectFilter.length === 0
                    ? categoryDescriptions["All"]
                    : `Explore portfolio samples tagged with ${projectFilter.join(", ")}.`}
                </p>
              </div>

              <div
                className={cn(
                  "gap-6",
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                    : "grid grid-cols-1 xl:grid-cols-2"
                )}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((p, i) => {
                    const imgUrl = getProjectImageUrl(p.url, p.previewUrl);
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
                            "border-white/5 cursor-pointer relative overflow-hidden group/project",
                            viewMode === "grid"
                              ? "h-[450px] p-0"
                              : "h-auto p-4 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                          )}
                          onClick={() => openProjectModal(p)}
                          background={
                            imgUrl ? (
                              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2rem]">
                                <img
                                  src={imgUrl}
                                  alt={p.name}
                                  className="w-full h-full object-cover opacity-60 group-hover/project:opacity-100 transition-all duration-700 group-hover/project:scale-110"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent" />
                              </div>
                            ) : null
                          }
                        >
                          <div
                            className={cn(
                              "relative z-10 h-full w-full flex flex-col",
                              viewMode === "grid"
                                ? "justify-end p-6"
                                : "sm:flex-row items-start sm:items-center gap-4"
                            )}
                          >
                            {viewMode === "grid" ? (
                              <>
                                <div className="flex justify-between items-start mb-auto">
                                  <div
                                    className={cn(
                                      "p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10",
                                      p.color
                                    )}
                                  >
                                    {p.icon}
                                  </div>
                                  <div className="flex flex-col items-end gap-2">
                                    <span
                                      className={cn(
                                        "text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-lg font-mono",
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
                                          "text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter backdrop-blur-md border border-white/10 shadow-lg font-mono",
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

                                <div className="mt-4">
                                  <h3 className="font-bold text-2xl group-hover/project:text-indigo-400 transition-colors mb-2 line-clamp-1 font-sans text-white">
                                    {p.name}
                                  </h3>
                                  <p className="text-sm text-white/70 font-light leading-relaxed line-clamp-2 mb-4 font-sans">
                                    {p.desc}
                                  </p>

                                  <div className="flex flex-wrap items-center gap-2 mb-4">
                                    {p.tags.slice(0, 3).map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-1 rounded-md bg-white/5 text-[9px] text-white/50 font-medium uppercase tracking-wider border border-white/5 font-mono"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="flex items-center justify-between">
                                    <div className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors flex items-center gap-2 font-mono">
                                      <span>
                                        {p.mainCategory === "Video & Motion Graphics"
                                          ? "Watch Showcase"
                                          : "View Project"}
                                      </span>
                                      <ArrowRight
                                        size={12}
                                        className="group-hover:translate-x-1 transition-transform"
                                      />
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover/project:bg-indigo-500 group-hover/project:text-white transition-all shadow-xl text-white">
                                      {p.mainCategory === "Video & Motion Graphics" ? (
                                        <Play size={16} fill="currentColor" />
                                      ) : (
                                        <ArrowRight size={16} />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex items-start gap-4 shrink-0">
                                  <div className={cn("p-3 rounded-2xl bg-black/20 backdrop-blur-md", p.color)}>
                                    {p.icon}
                                  </div>
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                                      {p.mainCategory}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-lg group-hover/project:text-indigo-400 transition-colors font-sans text-white">
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
                                  <p className="text-sm text-white/60 font-light leading-relaxed line-clamp-2 mb-2 font-sans">
                                    {p.desc}
                                  </p>

                                  <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
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

                                <div className="flex flex-col items-end gap-2 shrink-0 ml-auto leading-none">
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
                                  <div className="mt-auto p-2 rounded-full bg-white/5 text-white/40 group-hover/project:bg-white/10 group-hover/project:text-white transition-all">
                                    <ArrowRight
                                      size={16}
                                      className="group-hover/project:-rotate-45 transition-transform"
                                    />
                                  </div>
                                </div>

                                {/* List View Image Preview */}
                                <div className="hidden sm:block relative w-40 h-28 rounded-xl overflow-hidden shrink-0 border border-white/10 ml-2">
                                  {imgUrl ? (
                                    <img
                                      src={imgUrl}
                                      alt={p.name}
                                      className="w-full h-full object-cover opacity-60 group-hover/project:opacity-100 transition-all duration-500 group-hover/project:scale-110"
                                      loading="lazy"
                                      referrerPolicy="no-referrer"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                      <div className="opacity-20 scale-150 text-white">{p.icon}</div>
                                    </div>
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent opacity-50" />
                                </div>
                              </>
                            )}
                          </div>
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
        {/* Development Status Marquee */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 py-3 px-4 md:px-6 rounded-full flex items-center gap-4 overflow-hidden relative mb-8">
          <div className="flex items-center gap-2 text-emerald-400 shrink-0 z-10 bg-[#050505] pr-2 md:pr-4 py-1 rounded-full">
            <Activity size={18} />
            <span className="font-bold text-xs md:text-sm whitespace-nowrap font-sans">Active Status</span>
          </div>
          <div className="flex-1 overflow-hidden relative flex items-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex whitespace-nowrap animate-marquee text-emerald-400/70 text-xs md:text-sm font-mono">
              <span className="mx-4">Fully certified source systems and website portfolios live 24/7.</span>
              <span className="mx-4">•</span>
              <span className="mx-4">
                Explore interactive production platforms, cinematic VFX transitions, and design templates.
              </span>
              <span className="mx-4">•</span>
              <span className="mx-4">All repositories are licensed under standard open-source parameters.</span>
              <span className="mx-4">•</span>
              <span className="mx-4">
                Click on any custom card block to check deep-dive tech stack definitions.
              </span>
            </div>
          </div>
        </div>

        <div className="text-center md:text-left mb-8">
          <h2 className="text-4xl font-extrabold mb-4 font-sans text-white tracking-tight">
            My <span className="text-indigo-400 text-outline-indigo">Work & Portfolios</span>
          </h2>
          <p className="text-white/60 max-w-2xl font-sans text-base leading-relaxed">
            I craft top-tier responsive websites, cinematic media productions, and branding campaigns designed to elevate visual standards.
          </p>
        </div>

        {/* Categories Bento Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
          <BentoCard
            size="2x1"
            onClick={() => {
              setActiveProjectCategory("Web Development Projects" as ProjectCategory);
              setIsInImmersiveMode(true);
            }}
            className="md:col-span-2 cursor-pointer hover:bg-indigo-500/10 transition-colors group relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Globe size={160} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                <Globe size={24} />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-white font-sans">
                Web Development Projects{" "}
                <span className="text-white/30 text-lg font-mono">
                  (
                  {
                    projects.filter(
                      (p) =>
                        p.mainCategory === "Web Development Projects" ||
                        (p as any).categories?.includes("Web Development Projects")
                    ).length
                  }
                  )
                </span>
              </h3>
              <p className="text-white/50 text-sm max-w-md leading-relaxed font-sans">
                Enterprise-level websites, dynamic SaaS portals, highly customized digital solutions, and creative portfolio showcases.
              </p>
            </div>
          </BentoCard>

          <BentoCard
            size="1x1"
            onClick={() => {
              setActiveProjectCategory("Video & Motion Graphics" as ProjectCategory);
              setIsInImmersiveMode(true);
            }}
            className="cursor-pointer hover:bg-pink-500/10 transition-colors group relative overflow-hidden"
          >
            <div className="absolute -right-x -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Video size={120} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-center">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                <Video size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white font-sans">
                Video & VFX{" "}
                <span className="text-white/30 text-lg font-mono">
                  ({projects.filter((p) => p.mainCategory === "Video & Motion Graphics").length})
                </span>
              </h3>
              <p className="text-white/50 text-sm max-w-[200px] font-sans">
                Cinematic video edits, 3D motion transitions, and FX production design.
              </p>
            </div>
          </BentoCard>

          <BentoCard
            size="1x1"
            onClick={() => {
              setActiveProjectCategory("Graphics & Marketing" as ProjectCategory);
              setIsInImmersiveMode(true);
            }}
            className="cursor-pointer hover:bg-amber-500/10 transition-colors group relative overflow-hidden md:col-span-1 lg:col-span-1"
          >
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Palette size={120} />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-center font-sans">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <Palette size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">
                Design & Branding{" "}
                <span className="text-white/30 text-lg font-mono">
                  ({projects.filter((p) => p.mainCategory === "Graphics & Marketing").length})
                </span>
              </h3>
              <p className="text-white/50 text-sm max-w-[200px]">
                Corporate design assets, brand identity guidelines, and graphical interfaces.
              </p>
            </div>
          </BentoCard>

          {/* Prompt banner to find apps */}
          <BentoCard
            size="2x1"
            className="md:col-span-2 cursor-default bg-white/[0.01] border-white/5 relative overflow-hidden"
          >
            <div className="absolute right-6 top-1/2 -translate-y-1/2 scale-150 rotate-12 opacity-[0.03] text-white">
              <Sparkles size={180} />
            </div>
            <div className="flex flex-col h-full justify-center max-w-xl font-sans">
              <h4 className="text-lg font-bold text-white mb-2">Looking for Software & Interactive Tools?</h4>
              <p className="text-white/40 text-sm leading-relaxed mb-4">
                If you are looking for live AI agents, developer frameworks, full-stack SaaS apps, or immersive companion bots, head over to the **Apps** page for interactive galleries.
              </p>
            </div>
          </BentoCard>
        </div>
      </div>
    );
  }

  // Active Category View
  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4 font-sans">
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
            <p className="text-sm text-white/50">Explore my work and samples of this topic.</p>
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
                  "px-4 py-2 rounded-2xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer",
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
          <h3 className="text-xl font-bold mb-2 text-white font-sans">No showcases here</h3>
          <p className="text-white/50">I am currently building exciting things for this showcase category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(180px,auto)]">
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
                const imgUrl = getProjectImageUrl(p.url, p.previewUrl);
                const isFirstCardExpand = i === 0 && projectFilter.length === 0;
                return (
                  <BentoCard
                    key={p.name}
                    size={isFirstCardExpand ? "2x1" : "1x1"}
                    className={cn(
                      p.bg,
                      "border-white/5 cursor-pointer relative overflow-hidden group/project h-[400px] p-0 shadow-lg",
                      isFirstCardExpand ? "md:col-span-2" : ""
                    )}
                    onClick={() => openProjectModal(p)}
                    background={
                      imgUrl ? (
                        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2rem]">
                          <img
                            src={imgUrl}
                            alt={p.name}
                            className="w-full h-full object-cover opacity-60 group-hover/project:opacity-100 transition-all duration-700 group-hover/project:scale-110"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent" />
                        </div>
                      ) : null
                    }
                  >
                    <div className="flex flex-col h-full relative z-10 p-6 justify-end">
                      <div className="flex justify-between items-start mb-auto">
                        <div
                          className={cn(
                            "p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10",
                            p.color
                          )}
                        >
                          {p.icon}
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={cn(
                              "text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter backdrop-blur-md border border-white/10 font-mono text-white",
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

                      <div className="mt-4">
                        <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-1 font-mono">
                          {p.mainCategory}
                        </span>
                        <h3 className="font-bold text-xl group-hover/project:text-indigo-400 transition-colors mb-2 line-clamp-1 text-white">
                          {p.name}
                        </h3>
                        <p className="text-xs text-white/60 font-light leading-relaxed mb-4 line-clamp-2">
                          {p.desc}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {p.tags.slice(0, isFirstCardExpand ? 5 : 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-white/5 text-[8px] text-white/40 font-bold uppercase tracking-tighter border border-white/5 font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <span className="text-[9px] font-bold text-white/40 group-hover:text-white transition-colors flex items-center gap-1.5 font-mono">
                            <span>
                              {p.mainCategory === "Video & Motion Graphics"
                                ? "Watch Video"
                                : "Details"}
                            </span>
                            <ArrowRight size={10} />
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/60 group-hover/project:bg-indigo-500 group-hover/project:text-white transition-all shadow-md">
                            {p.mainCategory === "Video & Motion Graphics" ? (
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
