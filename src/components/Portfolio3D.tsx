import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  X,
  Zap,
  ArrowRight,
  Volume2,
  VolumeX,
  Play,
  Globe,
  Video,
  Lock,
  GraduationCap,
} from "lucide-react";
import { projects } from "../constants/data";

interface Portfolio3DProps {
  setActiveTab?: (tab: string) => void;
}

export const Portfolio3D: React.FC<Portfolio3DProps> = ({ setActiveTab }) => {
  // Curate top featured projects with guaranteed live embeds, rotating order starting with INFNI-T
  const featuredProjects = [
    projects.find((p) => p.name.toUpperCase().includes("INFNI-T")) || projects[0],
    projects.find((p) => p.name.includes("MSN Global Trainings")) || projects[1],
    projects.find((p) => p.name.includes("Vibelex")) || projects[2],
    projects.find((p) => p.name.includes("Cinematic Motion")) || projects[3],
    projects.find((p) => p.name.includes("NodeRaptor")) || projects[4],
  ].filter(Boolean);
  const total = featuredProjects.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [unmutedVideoId, setUnmutedVideoId] = useState<string | null>(null);

  // Helper index calculators
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setUnmutedVideoId(null); // Reset unmuted state on swivel
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setUnmutedVideoId(null); // Reset unmuted state on swivel
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) return; // Don't intercept when modal is open
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, currentIndex]);

  const getEmbedUrl = (project: any, isCenter: boolean) => {
    if (!project.previewUrl) return "";
    
    // Check if it's a YouTube video project
    if (project.youtubeId) {
      const isAudioOn = isCenter && unmutedVideoId === project.youtubeId;
      const muteParam = isAudioOn ? "0" : "1";
      const qualityParam = isCenter ? "hd720" : "small";
      
      return `https://www.youtube.com/embed/${project.youtubeId}?enablejsapi=1&autoplay=1&mute=${muteParam}&loop=1&playlist=${project.youtubeId}&vq=${qualityParam}&controls=1&modestbranding=1&rel=0&playsinline=1`;
    }
    
    return project.previewUrl;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center select-none py-2">
      {/* 3D Rotating Carousel Container */}
      <div className="relative w-full h-[500px] sm:h-[560px] flex items-center justify-center perspective-[1200px] overflow-hidden sm:overflow-visible">
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-40 w-12 h-12 rounded-full bg-black/80 border border-white/20 text-white/80 hover:text-white hover:bg-purple-600 hover:border-purple-400 flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-xl hover:scale-110 cursor-pointer group"
          title="Previous Project"
        >
          <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-40 w-12 h-12 rounded-full bg-black/80 border border-white/20 text-white/80 hover:text-white hover:bg-purple-600 hover:border-purple-400 flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-xl hover:scale-110 cursor-pointer group"
          title="Next Project"
        >
          <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Render 3D Cards Stack */}
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          {featuredProjects.map((project, index) => {
            let position: "center" | "left" | "right" | "hidden" = "hidden";

            if (index === currentIndex) position = "center";
            else if (index === prevIndex) position = "left";
            else if (index === nextIndex) position = "right";

            if (position === "hidden") return null;

            const isCenter = position === "center";
            const isLeft = position === "left";
            const isRight = position === "right";
            const isVideo = Boolean(project.youtubeId);
            const isAudioActive = isCenter && unmutedVideoId === project.youtubeId;

            return (
              <motion.div
                key={project.name}
                onClick={() => {
                  if (isLeft) handlePrev();
                  if (isRight) handleNext();
                }}
                initial={false}
                animate={{
                  x: isCenter ? "0%" : isLeft ? "-48%" : "48%",
                  scale: isCenter ? 1 : 0.82,
                  rotateY: isCenter ? 0 : isLeft ? 22 : -22,
                  z: isCenter ? 0 : -150,
                  opacity: isCenter ? 1 : 0.35,
                  filter: isCenter ? "blur(0px) brightness(100%)" : "blur(2px) brightness(60%)",
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className={`absolute w-[92%] sm:w-[580px] md:w-[650px] h-[440px] sm:h-[500px] rounded-[28px] bg-[#0c0c14]/95 border ${
                  isCenter
                    ? "border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(168,85,247,0.18),inset_0_1px_0_0_rgba(255,255,255,0.2)] z-30"
                    : "border-white/10 shadow-xl z-10 cursor-pointer hover:opacity-60"
                } overflow-hidden flex flex-col backdrop-blur-3xl group`}
              >
                {/* Top Specular Edge Highlight for Center Card */}
                {isCenter && (
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
                )}

                {/* Left/Right Card Edge Fade Gradients for Extra Depth */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70 z-20 pointer-events-none" />
                )}

                {/* Apple HIG Header Bar */}
                <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.03]">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-2xl ${project.bg} ${project.color} border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center justify-center`}>
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg tracking-tight flex items-center gap-2">
                        <span>{project.name}</span>
                      </h3>
                      <p className="text-white/40 text-[11px] font-mono tracking-wide">
                        {project.mainCategory}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Audio Toggle Pill for Video Cards - Compact Sound Icon */}
                    {isVideo && isCenter && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUnmutedVideoId(isAudioActive ? null : project.youtubeId);
                        }}
                        className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                          isAudioActive
                            ? "bg-purple-500 text-white border border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                            : "bg-white/10 text-white/70 border border-white/10 hover:bg-white/20 hover:text-white"
                        }`}
                        title={isAudioActive ? "Mute Audio (720p HD)" : "Unmute Audio (720p HD)"}
                      >
                        {isAudioActive ? (
                          <div className="flex items-center gap-1">
                            <Volume2 size={14} className="animate-pulse text-white" />
                            <span className="text-[9px] font-mono font-bold tracking-tight bg-black/40 px-1 py-0.5 rounded text-purple-200">720p</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <VolumeX size={14} />
                            <span className="text-[9px] font-mono text-white/50">HD</span>
                          </div>
                        )}
                      </button>
                    )}

                    {project.hasCaseStudy && (
                      <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <Sparkles size={11} />
                        Case Study
                      </span>
                    )}

                    <span className="text-[10px] font-mono text-purple-400 border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {project.status || "Production"}
                    </span>
                  </div>
                </div>

                {/* Card Preview Viewport */}
                <div 
                  data-hide-cursor="true"
                  onMouseEnter={() => {
                    if (isCenter) window.dispatchEvent(new CustomEvent('hide-custom-cursor'));
                  }}
                  onMouseLeave={() => {
                    window.dispatchEvent(new CustomEvent('show-custom-cursor'));
                  }}
                  className="relative flex-1 bg-black/80 overflow-hidden flex items-center justify-center p-2.5 preview-viewport"
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-[#05050a] relative">
                    {project.name.includes("MSN Global") ? (
                      <div className="w-full h-full flex flex-col justify-between p-5 sm:p-6 bg-gradient-to-br from-[#0c0c16] via-[#150f29] to-[#090912] relative overflow-hidden text-left">
                        {/* Background subtle mesh glow */}
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
                        
                        {/* Top Simulated Browser Bar */}
                        <div className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/60 bg-black/50 px-3 py-1 rounded-full border border-white/10">
                            <Lock size={10} className="text-emerald-400" />
                            <span>trainings.msn-global.com</span>
                          </div>
                          <span className="text-[9px] font-mono text-white/40 uppercase">LIVE</span>
                        </div>

                        {/* Center Hero Info */}
                        <div className="w-full my-auto flex flex-col gap-2.5 z-10 py-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-mono uppercase tracking-widest font-semibold flex items-center gap-1">
                              <GraduationCap size={12} />
                              Enterprise Academy
                            </span>
                            <span className="text-[10px] font-mono text-white/40">Apple HIG Design System</span>
                          </div>
                          <h4 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
                            MSN Global Trainings Portal
                          </h4>
                          <p className="text-xs text-white/70 max-w-lg leading-relaxed line-clamp-2 sm:line-clamp-none">
                            A premier corporate learning academy with interactive curriculum syllabus, fast lead funnels, and high-conversion enterprise UX.
                          </p>

                          <div className="grid grid-cols-3 gap-2 mt-1 pt-2 border-t border-white/10">
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                              <p className="text-[9px] text-white/40 font-mono">ENROLLMENT</p>
                              <p className="text-xs sm:text-sm font-bold text-rose-400">+340%</p>
                            </div>
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                              <p className="text-[9px] text-white/40 font-mono">AVG SESSION</p>
                              <p className="text-xs sm:text-sm font-bold text-white">4.8m</p>
                            </div>
                            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                              <p className="text-[9px] text-white/40 font-mono">SATISFACTION</p>
                              <p className="text-xs sm:text-sm font-bold text-emerald-400">99.2%</p>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="w-full flex items-center justify-between pt-2 border-t border-white/10 z-10">
                          <span className="text-[10px] font-mono text-white/40">Live Production URL</span>
                          <div className="flex items-center gap-2">
                            {setActiveTab && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveTab("CaseStudies");
                                }}
                                className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold flex items-center gap-1 transition-colors border border-rose-500/30 cursor-pointer"
                              >
                                <Sparkles size={11} />
                                <span>Case Study</span>
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openExternal("http://trainings.msn-global.com/");
                              }}
                              className="px-3.5 py-1.5 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-bold flex items-center gap-1 transition-transform hover:scale-105 cursor-pointer shadow-md"
                            >
                              <span>Open Live Portal</span>
                              <ExternalLink size={11} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : project.previewUrl ? (
                      <iframe
                        src={getEmbedUrl(project, isCenter)}
                        className={`w-full h-full border-0 ${isCenter ? "pointer-events-auto" : "pointer-events-none"}`}
                        title={project.name}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                        <div className={`p-4 rounded-2xl ${project.bg} ${project.color} mb-3`}>
                          {project.icon}
                        </div>
                        <h4 className="text-white font-bold text-base mb-1">{project.name}</h4>
                        <p className="text-white/50 text-xs max-w-xs">{project.desc}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Apple HIG Card Footer */}
                <div className="px-5 py-4 bg-[#08080f]/95 border-t border-white/[0.08] flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-white/70 text-xs leading-relaxed line-clamp-1">
                      {project.desc}
                    </p>
                  </div>

                  {isCenter && (
                    <div className="flex items-center gap-2 shrink-0">
                      {project.hasCaseStudy && setActiveTab && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab("CaseStudies");
                          }}
                          className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-semibold text-xs tracking-tight transition-colors flex items-center gap-1.5 cursor-pointer border border-purple-500/30"
                        >
                          <Sparkles size={13} />
                          <span>Case Study</span>
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-tight transition-colors flex items-center gap-1.5 cursor-pointer border border-white/10"
                      >
                        <Maximize2 size={13} />
                        <span className="hidden sm:inline">Inspect</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openExternal(project.url);
                        }}
                        className="px-4 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-tight transition-colors flex items-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      >
                        <span>Launch</span>
                        <ExternalLink size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dot Controls */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {featuredProjects.map((p, idx) => (
          <button
            key={p.name}
            onClick={() => {
              setCurrentIndex(idx);
              setUnmutedVideoId(null);
            }}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx
                ? "w-8 bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                : "w-2.5 bg-white/20 hover:bg-white/40"
            }`}
            title={`Go to project ${idx + 1}`}
          />
        ))}
      </div>

      {/* Direct CTA: See All Projects */}
      {setActiveTab && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setActiveTab("Projects")}
            className="inline-flex items-center gap-2.5 py-3.5 px-8 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-tight transition-all duration-200 shadow-[0_4px_25px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>See All Projects ({projects.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Fullscreen Inspect Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#090910] border border-white/20 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Preview Half */}
              <div 
                data-hide-cursor="true"
                onMouseEnter={() => window.dispatchEvent(new CustomEvent('hide-custom-cursor'))}
                onMouseLeave={() => window.dispatchEvent(new CustomEvent('show-custom-cursor'))}
                className="w-full md:w-1/2 h-[320px] md:h-auto bg-black relative flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 preview-viewport"
              >
                {selectedProject.previewUrl ? (
                  <iframe
                    src={getEmbedUrl(selectedProject, true)}
                    className="w-full h-full border-0"
                    title={selectedProject.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <div className="p-6 text-center">
                    <span className={`p-5 rounded-2xl inline-block ${selectedProject.bg} ${selectedProject.color} mb-3`}>
                      {selectedProject.icon}
                    </span>
                    <p className="text-white font-bold text-lg">{selectedProject.name}</p>
                  </div>
                )}
              </div>

              {/* Info Half */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto custom-scrollbar">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono text-purple-400 border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {selectedProject.mainCategory}
                    </span>
                    <span className="text-[10px] font-mono text-white/50 border border-white/10 px-2.5 py-1 rounded-full">
                      {selectedProject.status || "Production"}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-white mb-3 tracking-tight">
                    {selectedProject.name}
                  </h2>

                  <p className="text-white/70 text-sm leading-relaxed mb-6">
                    {selectedProject.desc}
                  </p>

                  <div className="space-y-3 mb-6">
                    <h4 className="text-xs font-mono uppercase text-white/40 tracking-widest">
                      Key Highlights
                    </h4>
                    <ul className="space-y-2 text-xs text-white/80">
                      <li className="flex items-center gap-2">
                        <Sparkles size={13} className="text-purple-400 shrink-0" />
                        <span>High-performance reactive UI & fluid 3D spatial transitions</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap size={13} className="text-blue-400 shrink-0" />
                        <span>Apple HIG pro design system with edge-cached assets</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {selectedProject.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-white/60 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  {selectedProject.hasCaseStudy && setActiveTab && (
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        setActiveTab("CaseStudies");
                      }}
                      className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs tracking-wider uppercase rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_30px_rgba(168,85,247,0.35)]"
                    >
                      <Sparkles size={14} />
                      <span>Read Full Case Study</span>
                      <ArrowRight size={14} />
                    </button>
                  )}

                  <button
                    onClick={() => openExternal(selectedProject.url)}
                    className="w-full py-3.5 bg-white text-black font-semibold text-xs tracking-wider uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    <span>Launch Live Platform / Video</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

