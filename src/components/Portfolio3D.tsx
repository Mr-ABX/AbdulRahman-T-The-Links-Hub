import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ArrowRight, X } from "lucide-react";
import { projects } from "../constants/data";

export const Portfolio3D = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Take 8 projects to form a nice globe
  const globeProjects = projects.slice(0, 8);

  const openProject = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Generate spherical coordinates using Fibonacci sphere algorithm
  const getSpherePositions = (count: number, radius: number) => {
    const positions = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // Golden angle increment
      
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      
      // Calculate rotation to face outward from center
      const rotateY = Math.atan2(x, z) * (180 / Math.PI);
      const rotateX = Math.asin(y) * (180 / Math.PI);
      
      positions.push({
        rotateY,
        rotateX: -rotateX,
        translateZ: radius
      });
    }
    return positions;
  };

  const positions = getSpherePositions(globeProjects.length, 300);

  return (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center pb-24">
      <div className="text-center mb-8">
        <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2 animate-pulse">Interactive 3D Globe</p>
        <p className="text-white/60 text-sm">Drag to explore or click a node to view the project</p>
      </div>

      {/* 3D Globe Container */}
      <div
        className="relative w-full h-[500px] md:h-[600px] perspective-[1200px] flex items-center justify-center mb-16 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{
            rotateY: isHovered ? undefined : [0, 360],
            rotateX: isHovered ? undefined : [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
            width: "200px",
            height: "260px",
          }}
          className="globe-spinner"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
        >
          {globeProjects.map((project, index) => {
            const pos = positions[index];

            return (
              <div
                key={project.name}
                className="absolute top-0 left-0 w-full h-full cursor-pointer group"
                style={{
                  transform: `rotateY(${pos.rotateY}deg) rotateX(${pos.rotateX}deg) translateZ(${pos.translateZ}px)`,
                  backfaceVisibility: "visible", // We want to see them on the back side as well, but maybe dimmed?
                }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Card in 3D */}
                <div 
                  className="w-full h-full bg-[#12121c]/90 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.15)] flex flex-col transition-all duration-300 group-hover:border-purple-500/50 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]"
                  style={{ backfaceVisibility: 'hidden' }} // Only show the front of the card
                >
                  {/* Iframe Preview or Placeholder */}
                  <div className="relative w-full h-[50%] bg-black/50 overflow-hidden border-b border-white/[0.05]">
                    {project.previewUrl ? (
                      <div className="absolute inset-0 pointer-events-none">
                        <iframe
                          src={project.previewUrl}
                          className="w-[160%] h-[160%] -top-[30%] -left-[30%] absolute"
                          style={{
                            transform: "scale(0.625)",
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
                  <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-transparent to-black/40">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`p-1.5 rounded-lg ${project.bg} ${project.color} scale-75 origin-left`}>
                          {project.icon}
                        </span>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-white/50 truncate">
                          {project.mainCategory}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">
                        {project.name}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Back side of the card (shows when rotated away) */}
                <div 
                  className="absolute inset-0 w-full h-full bg-black/60 border border-white/5 rounded-2xl flex items-center justify-center opacity-30"
                  style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                  <span className="text-white/20 scale-150">{project.icon}</span>
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
