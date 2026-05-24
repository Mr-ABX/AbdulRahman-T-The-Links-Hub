import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { ProjectType } from "../../types";

export const ProjectModal = ({
  selectedProject,
  closeProjectModal,
}: {
  selectedProject: ProjectType | null;
  closeProjectModal: () => void;
}) => {
  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeProjectModal}
          />
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-[2.5rem] border border-white/10 shadow-2xl no-scrollbar"
          >
            <button
              onClick={closeProjectModal}
              className="absolute top-6 right-6 p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all z-20"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mb-8",
                      selectedProject.bg,
                      selectedProject.color,
                    )}
                  >
                    {selectedProject.icon}
                  </div>
                  <h2 className="text-4xl font-bold mb-4">
                    {selectedProject.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/60 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <h3 className="text-xl font-bold mb-4 text-indigo-400">
                      The Challenge
                    </h3>
                    <p className="text-white/70 mb-8 leading-relaxed">
                      {selectedProject.desc} This project was built to address
                      the growing need for{" "}
                      {selectedProject.mainCategory.toLowerCase()} solutions
                      that scale effortlessly.
                    </p>

                    <h3 className="text-xl font-bold mb-4 text-indigo-400">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {[
                        "Real-time processing",
                        "AI-driven insights",
                        "Scalable architecture",
                        "Intuitive UI/UX",
                      ].map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-3 text-sm text-white/60 bg-white/5 p-4 rounded-2xl border border-white/5"
                        >
                          <CheckCircle2
                            size={18}
                            className="text-emerald-400 shrink-0"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-4">
                      {selectedProject.mainCategory !== "My Personal Apps" && (
                        <>
                          <a
                            href={selectedProject.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 bg-white text-black px-8 py-4 rounded-2xl font-bold text-center hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                          >
                            Live Demo <ExternalLink size={18} />
                          </a>
                          <button className="flex-1 bg-white/5 text-white px-8 py-4 rounded-2xl font-bold border border-white/10 hover:bg-white/10 transition-all">
                            View Code
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 space-y-6">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">
                      Project Stats
                    </h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/50">Category</span>
                        <span className="text-sm font-bold">
                          {selectedProject.mainCategory}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/50">Status</span>
                        <span
                          className={cn(
                            "text-sm font-bold",
                            selectedProject.status === "Development"
                              ? "text-amber-400"
                              : selectedProject.status === "Beta"
                                ? "text-blue-400"
                                : "text-emerald-400",
                          )}
                        >
                          {selectedProject.status || "Live"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/50">Pricing</span>
                        <span className="text-sm font-bold">
                          {selectedProject.pricing}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">
                      Tech Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Tailwind", "Node.js"].map(
                        (t) => (
                          <span
                            key={t}
                            className="px-3 py-1.5 rounded-xl bg-white/5 text-[10px] font-bold"
                          >
                            {t}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Preview Section */}
              {selectedProject.previewUrl && (
                <div className="mt-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                    <h3 className="text-xl font-bold tracking-tight">
                      Live Preview
                    </h3>
                  </div>
                  <div className="w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 glass relative group/preview shadow-2xl">
                    <iframe
                      src={selectedProject.previewUrl}
                      className="w-full h-full border-0"
                      title={`${selectedProject.name} Live Preview`}
                    />
                    {selectedProject.mainCategory !== "My Personal Apps" && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="px-6 py-3 rounded-2xl bg-white text-black font-bold flex items-center gap-2">
                          <ExternalLink size={18} />
                          Interact with App
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
