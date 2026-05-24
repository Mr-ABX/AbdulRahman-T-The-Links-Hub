import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BentoCard } from "../shared/BentoCard";
import { ProjectType } from "../../types";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ProjectsPage = ({
  activeTab,
  activeProjectCategory,
  setActiveProjectCategory,
  filteredProjects,
  setSelectedProject,
}: {
  activeTab: string;
  activeProjectCategory: string | null;
  setActiveProjectCategory: (category: string | null) => void;
  filteredProjects: ProjectType[];
  setSelectedProject: (p: ProjectType) => void;
}) => {
  return (
    <div className="space-y-8 pb-12 w-full pt-4">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-center md:text-left">
          The <span className="text-indigo-400 text-outline-indigo">{activeTab}</span>
        </h1>
        <p className="text-white/50 text-lg max-w-2xl font-light text-center md:text-left mx-auto md:mx-0">
          A collection of my work, ranging from full-stack web applications to AI-powered SaaS solutions.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-3xl border border-white/10">
        <div className="flex gap-2 overflow-x-auto w-full no-scrollbar pb-2 md:pb-0">
          {["All", "My Personal Apps", "Client Work", "AI Agents", "UI/UX"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveProjectCategory(cat === "All" ? null : cat)}
              className={cn(
                "px-4 py-2 rounded-2xl text-sm font-bold whitespace-nowrap transition-all",
                (activeProjectCategory === cat || (cat === "All" && !activeProjectCategory))
                  ? "bg-indigo-500 text-white shadow-xl shadow-indigo-500/20"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-auto">
        {filteredProjects.map((project, i) => (
          <BentoCard 
            key={project.name} 
            delay={i * 0.1} 
            size="1x1"
            className="flex flex-col h-full bg-white/[0.02] hover:bg-white/[0.05] transition-colors border-white/5 group cursor-pointer" 
            onClick={() => setSelectedProject(project)}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border border-white/10", project.bg, project.color)}>
                {project.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-indigo-400 transition-colors leading-tight">{project.name}</h3>
                <p className="text-[10px] uppercase tracking-widest text-white/40">{project.mainCategory}</p>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-6 flex-1 font-light leading-relaxed">{project.desc}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-white/5 font-medium text-white/60 border border-white/5">{tag}</span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-[10px] px-2 py-1 rounded-md bg-transparent text-white/30">+{project.tags.length - 3}</span>
              )}
            </div>
          </BentoCard>
        ))}
      </div>
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-white/40">
          No projects found in this category.
        </div>
      )}
    </div>
  );
};
