import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  ArrowRight,
  X,
  Monitor,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Layers,
  Sparkles,
  Maximize2,
  Zap,
} from "lucide-react";
import { projects } from "../constants/data";

export const Portfolio3D = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Works");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"deck" | "grid">("deck");
  const [deviceFrame, setDeviceFrame] = useState<"desktop" | "mobile">("desktop");

  const categories = [
    "All Works",
    "AI Solutions",
    "Pro Business Suite",
    "Apps & Dev",
    "Interactive Experiences",
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === "All Works") return true;
    return p.mainCategory === selectedCategory;
  });

  const activeProject = filteredProjects[currentIndex] || filteredProjects[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const openExternal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center">
      {/* Category Filter & View Mode Switcher Header */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
        {/* Category Dock */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-xl overflow-x-auto max-w-full custom-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 relative whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 p-1 bg-white/[0.03] border border-white/10 rounded-full">
          <button
            onClick={() => setViewMode("deck")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              viewMode === "deck"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                : "text-white/50 hover:text-white"
            }`}
          >
            <Layers size={13} />
            <span>Spatial Deck</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                : "text-white/50 hover:text-white"
            }`}
          >
            <LayoutGrid size={13} />
            <span>Grid Matrix</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: SPATIAL KINETIC DECK */}
      {viewMode === "deck" && activeProject && (
        <div className="w-full flex flex-col items-center">
          {/* Deck Carousel Controls */}
          <div className="relative w-full max-w-5xl h-[580px] sm:h-[620px] flex items-center justify-center perspective-[1200px]">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-30 w-11 h-11 rounded-full bg-black/60 border border-white/15 text-white/80 hover:text-white hover:bg-purple-600/80 hover:border-purple-400 flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md hover:scale-110 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-30 w-11 h-11 rounded-full bg-black/60 border border-white/15 text-white/80 hover:text-white hover:bg-purple-600/80 hover:border-purple-400 flex items-center justify-center transition-all duration-300 shadow-2xl backdrop-blur-md hover:scale-110 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>

            {/* Central Stage Card with Spatial Depth */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.name + currentIndex}
                initial={{ opacity: 0, scale: 0.92, y: 20, rotateY: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -20, rotateY: -10 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-3xl h-full bg-[#101018]/95 border border-white/15 rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(168,85,247,0.12)] flex flex-col relative group"
              >
                {/* Ambient Specular Highlight */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

                {/* Card Header & Frame Switcher */}
                <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <span className={`p-2 rounded-xl ${activeProject.bg} ${activeProject.color} border border-white/10`}>
                      {activeProject.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-bold text-base sm:text-lg tracking-tight">
                          {activeProject.name}
                        </h3>
                        <span className="text-[10px] font-mono text-purple-400 border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 rounded-full uppercase">
                          {activeProject.status || "Live"}
                        </span>
                      </div>
                      <p className="text-white/50 text-xs font-mono">
                        {activeProject.mainCategory}
                      </p>
                    </div>
                  </div>

                  {/* Device Viewport Toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10">
                    <button
                      onClick={() => setDeviceFrame("desktop")}
                      className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        deviceFrame === "desktop"
                          ? "bg-white/20 text-white"
                          : "text-white/40 hover:text-white"
                      }`}
                      title="Desktop Viewport"
                    >
                      <Monitor size={14} />
                    </button>
                    <button
                      onClick={() => setDeviceFrame("mobile")}
                      className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        deviceFrame === "mobile"
                          ? "bg-white/20 text-white"
                          : "text-white/40 hover:text-white"
                      }`}
                      title="Mobile Viewport"
                    >
                      <Smartphone size={14} />
                    </button>
                  </div>
                </div>

                {/* Interactive Live Frame Container */}
                <div className="relative flex-1 bg-black/60 overflow-hidden flex items-center justify-center p-4">
                  {/* Background grid texture */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />

                  {/* Desktop / Mobile Frame Container */}
                  <div
                    className={`relative transition-all duration-500 overflow-hidden border border-white/15 bg-[#0a0a10] shadow-2xl ${
                      deviceFrame === "desktop"
                        ? "w-full h-full rounded-2xl"
                        : "w-[240px] sm:w-[280px] h-full rounded-[36px] border-4 border-white/20"
                    }`}
                  >
                    {/* iPhone Notch in mobile view */}
                    {deviceFrame === "mobile" && (
                      <div className="absolute top-2 inset-x-0 flex justify-center z-20 pointer-events-none">
                        <div className="w-20 h-3.5 bg-black rounded-full border border-white/10" />
                      </div>
                    )}

                    {activeProject.previewUrl ? (
                      <iframe
                        src={activeProject.previewUrl}
                        className="w-full h-full border-0 pointer-events-auto"
                        title={activeProject.name}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                        <div className={`p-4 rounded-2xl ${activeProject.bg} ${activeProject.color} mb-3`}>
                          {activeProject.icon}
                        </div>
                        <h4 className="text-white font-bold text-base mb-1">{activeProject.name}</h4>
                        <p className="text-white/50 text-xs max-w-xs">{activeProject.desc}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer & Details */}
                <div className="p-5 bg-[#0a0a10]/90 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-white/70 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {activeProject.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeProject.tags?.slice(0, 4).map((tag: string) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono text-white/50 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedProject(activeProject)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-tight transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Maximize2 size={13} />
                      <span>Inspect</span>
                    </button>
                    <button
                      onClick={() => openExternal(activeProject.url)}
                      className="px-4 py-2.5 rounded-xl bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-tight transition-colors flex items-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                      <span>Launch App</span>
                      <ExternalLink size={13} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {filteredProjects.map((p, idx) => (
              <button
                key={p.name}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx
                    ? "w-8 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: INTERACTIVE MATRIX GRID */}
      {viewMode === "grid" && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="bg-[#101018]/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col group hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
            >
              <div className="relative h-48 bg-black/60 overflow-hidden border-b border-white/10">
                {project.previewUrl ? (
                  <iframe
                    src={project.previewUrl}
                    className="w-full h-full border-0 pointer-events-none group-hover:scale-105 transition-transform duration-500"
                    title={project.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className={`p-4 rounded-2xl ${project.bg} ${project.color}`}>
                      {project.icon}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101018] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 rounded-full">
                      {project.mainCategory}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">v1.0</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-purple-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-white/60 text-xs line-clamp-2 leading-relaxed mb-4">
                    {project.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-white/70 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <Maximize2 size={12} />
                  </button>
                  <button
                    onClick={() => openExternal(project.url)}
                    className="px-3 py-1.5 rounded-lg bg-white text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    <span>Launch</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Fullscreen Detailed Project Modal */}
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
                      Key Highlights & Architecture
                    </h4>
                    <ul className="space-y-2 text-xs text-white/80">
                      <li className="flex items-center gap-2">
                        <Sparkles size={13} className="text-purple-400 shrink-0" />
                        <span>High-performance reactive UI with instant feedback loops</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap size={13} className="text-blue-400 shrink-0" />
                        <span>Zero latency architecture and edge cached delivery</span>
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
