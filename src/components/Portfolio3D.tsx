import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ArrowRight, X } from "lucide-react";
import { projects } from "../constants/data";

export const Portfolio3D = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Take first 6 projects for the carousel
  const carouselProjects = projects.slice(0, 6);

  const openProject = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center pb-24">
      {/* 3D Carousel Container */}
      <div
        className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] perspective-[1000px] flex items-center justify-center mt-12 mb-8 md:mb-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{
            rotateY: isHovered ? undefined : 360,
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
            width: "280px",
            height: "360px",
          }}
          className="carousel-spinner"
        >
          {carouselProjects.map((project, index) => {
            const rotateY = index * (360 / carouselProjects.length);
            const translateZ = 320; // Distance from center

            return (
              <div
                key={project.name}
                className="absolute top-0 left-0 w-full h-full cursor-pointer group"
                style={{
                  transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                  backfaceVisibility: "hidden",
                }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Card in 3D */}
                <div className="w-full h-full bg-[#12121c]/90 border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_24px_50px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                  {/* Iframe Preview or Placeholder */}
                  <div className="relative w-full h-[55%] bg-black/50 overflow-hidden border-b border-white/[0.05]">
                    {project.previewUrl ? (
                      <div className="absolute inset-0 pointer-events-none">
                        <iframe
                          src={project.previewUrl}
                          className="w-[140%] h-[140%] -top-[20%] -left-[20%] absolute"
                          style={{
                            transform: "scale(0.71)",
                            transformOrigin: "center center",
                          }}
                          title={project.name}
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02]">
                        <span className={project.color}>{project.icon}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12121c] to-transparent opacity-80" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`p-1.5 rounded-lg ${project.bg} ${project.color}`}>
                          {project.icon}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                          {project.mainCategory}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
                        {project.name}
                      </h3>
                    </div>
                    <div className="text-[11px] font-medium text-white/40 uppercase tracking-widest flex items-center gap-1 group-hover:text-purple-400 transition-colors">
                      View Project <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Selected Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#0d0d14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 border border-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>

              {/* Preview Side */}
              <div className="w-full md:w-1/2 h-[250px] md:h-[400px] relative bg-black/50">
                {selectedProject.previewUrl ? (
                  <iframe
                    src={selectedProject.previewUrl}
                    className="w-full h-full pointer-events-auto"
                    title={selectedProject.name}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className={selectedProject.color}>{selectedProject.icon}</span>
                  </div>
                )}
              </div>

              {/* Details Side */}
              <div className="w-full md:w-1/2 p-8 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`p-2 rounded-xl ${selectedProject.bg} ${selectedProject.color}`}>
                      {selectedProject.icon}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 border border-white/10 px-2 py-1 rounded-full">
                      {selectedProject.status}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
                    {selectedProject.name}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {selectedProject.desc}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tags?.map((tag: string) => (
                      <span key={tag} className="text-[10px] font-mono uppercase tracking-wider text-white/40 bg-white/[0.03] px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openProject(selectedProject.url)}
                  className="w-full py-3.5 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                >
                  Launch Live App <ExternalLink size={14} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
