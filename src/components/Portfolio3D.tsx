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
} from "lucide-react";
import { projects } from "../constants/data";

interface Portfolio3DProps {
  setActiveTab?: (tab: string) => void;
}

export const Portfolio3D: React.FC<Portfolio3DProps> = ({ setActiveTab }) => {
  // Select top 5 featured projects
  const featuredProjects = projects.slice(0, 5);
  const total = featuredProjects.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Helper index calculators
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
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

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center select-none py-4">
      {/* 3D Rotating Carousel Container */}
      <div className="relative w-full h-[480px] sm:h-[540px] flex items-center justify-center perspective-[1200px] overflow-hidden sm:overflow-visible">
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 z-40 w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-white hover:bg-purple-600 hover:border-purple-400 flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-xl hover:scale-110 cursor-pointer group"
          title="Previous Project"
        >
          <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 z-40 w-12 h-12 rounded-full bg-black/70 border border-white/20 text-white/80 hover:text-white hover:bg-purple-600 hover:border-purple-400 flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-xl hover:scale-110 cursor-pointer group"
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
                className={`absolute w-[90%] sm:w-[580px] md:w-[640px] h-[420px] sm:h-[480px] rounded-3xl bg-[#0e0e16]/95 border ${
                  isCenter
                    ? "border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(168,85,247,0.2)] z-30"
                    : "border-white/10 shadow-xl z-10 cursor-pointer hover:opacity-60"
                } overflow-hidden flex flex-col backdrop-blur-2xl group`}
              >
                {/* Top Specular Edge Highlight for Center Card */}
                {isCenter && (
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
                )}

                {/* Left/Right Card Edge Fade Gradients for Extra Depth */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-20 pointer-events-none" />
                )}

                {/* Card Header */}
                <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <span className={`p-2.5 rounded-2xl ${project.bg} ${project.color} border border-white/10 shadow-inner`}>
                      {project.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
                          {project.name}
                        </h3>
                      </div>
                      <p className="text-white/50 text-xs font-mono">
                        {project.mainCategory}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-purple-400 border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {project.status || "Production"}
                  </span>
                </div>

                {/* Card Preview Body */}
                <div className="relative flex-1 bg-black/70 overflow-hidden flex items-center justify-center p-2">
                  <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 bg-[#07070c] relative">
                    {project.previewUrl ? (
                      <iframe
                        src={project.previewUrl}
                        className={`w-full h-full border-0 ${isCenter ? "pointer-events-auto" : "pointer-events-none"}`}
                        title={project.name}
                        loading="lazy"
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

                {/* Card Footer */}
                <div className="p-4 sm:p-5 bg-[#08080e]/90 border-t border-white/10 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-white/70 text-xs line-clamp-1">
                      {project.desc}
                    </p>
                  </div>

                  {isCenter && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-tight transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Maximize2 size={13} />
                        <span className="hidden sm:inline">Inspect</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openExternal(project.url);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-tight transition-colors flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.2)]"
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
            onClick={() => setCurrentIndex(idx)}
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
        <div className="mt-10 text-center">
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
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#0b0b12] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Preview Half */}
              <div className="w-full md:w-1/2 h-[300px] md:h-auto bg-black relative flex items-center justify-center">
                {selectedProject.previewUrl ? (
                  <iframe
                    src={selectedProject.previewUrl}
                    className="w-full h-full border-0"
                    title={selectedProject.name}
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
                    <span className="text-[10px] font-mono text-white/50 border border-white/10 px-2 py-0.5 rounded-full">
                      {selectedProject.status || "Production"}
                    </span>
                  </div>

                  <h2 className="text-2xl font-extrabold text-white mb-3">
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
                        <span>High-performance reactive UI with instant feedback</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap size={13} className="text-blue-400 shrink-0" />
                        <span>Zero latency architecture and fluid spatial transitions</span>
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

                <button
                  onClick={() => openExternal(selectedProject.url)}
                  className="w-full py-3.5 bg-white text-black font-semibold text-xs tracking-wider uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
