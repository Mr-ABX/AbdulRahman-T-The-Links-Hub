import React from "react";
import { Instagram, Linkedin, Github, Youtube, MapPin, Zap, Star, Briefcase, Rocket, Cpu, Layers, Bot, ExternalLink, CheckCircle2, Globe, Layout as LayoutIcon } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ASSET_LINKS } from "../../constants/assets";
import { companies, skills } from "../../constants/data";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const myPfp = ASSET_LINKS.myPfp;

export const AboutPage = () => {
  return (
    <div className="space-y-12">
      {/* Section 1: About */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-indigo-500 rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight">About</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
          {/* Profile Card (Mini) */}
          <BentoCard
            size="2x2"
            className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 flex flex-col justify-between group/profile-mini relative overflow-hidden"
          >
            <div className="relative z-10 flex justify-between items-start">
              <div className="relative w-32 h-32 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-indigo-500/10 flex items-center justify-center text-5xl">
                👨🏽‍💻
                <img
                  src={myPfp}
                  alt="Abdulrahman Toor"
                  className="absolute inset-0 w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover/profile-mini:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
              <div className="flex gap-2">
                <a
                  href="https://www.instagram.com/abdulrahman.toor/"
                  target="_blank"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md flex items-center justify-center border border-white/5"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/abdulrahman-t/"
                  target="_blank"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md flex items-center justify-center border border-white/5"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            <div className="relative z-10 mt-6">
              <h3 className="text-3xl font-bold text-white mb-1">
                Abdulrahman Toor
              </h3>
              <p className="text-indigo-400 text-sm font-medium mb-4">
                SaaS Builder & AI Automation Expert
              </p>
              <p className="text-white/60 text-xs leading-relaxed max-w-xs font-light">
                Architecting the future with AI. I build scalable SaaS
                platforms and high-performance automation systems that
                turn complexity into growth.
              </p>

              <div className="flex items-center gap-4 mt-6 text-white/30">
                <Github
                  size={16}
                  className="hover:text-white transition-colors cursor-pointer"
                />
                <Youtube
                  size={16}
                  className="hover:text-white transition-colors cursor-pointer"
                />
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold">
                  <MapPin size={12} className="text-indigo-400" /> Punjab,
                  Pakistan
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Status Card */}
          <BentoCard size="1x1" className="bg-emerald-500/[0.02]">
            <div className="flex flex-col justify-between h-full">
              <div className="relative w-fit">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Zap size={20} />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0a0a] animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">
                  Status
                </p>
                <p className="font-medium text-sm">
                  Open for Hire & Partnerships
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Trust Widget */}
          <BentoCard size="1x1" className="bg-amber-500/[0.02]">
            <div className="flex flex-col justify-between h-full">
              <div className="flex text-amber-400 gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">
                  Client Trust
                </p>
                <p className="font-medium text-sm">
                  200+ Projects Delivered
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Business Dev Card */}
          <BentoCard size="2x1" className="bg-blue-500/[0.02] group/biz">
            <div className="flex items-center justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="text-blue-400" size={16} />
                  <span className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-bold">
                    Business Growth
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover/biz:text-blue-300 transition-colors">
                  Business Development
                </h3>
                <p className="text-white/50 text-xs font-light">
                  Helping startups scale through strategic AI
                  implementation.
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Rocket size={32} />
              </div>
            </div>
          </BentoCard>

          {/* Tech Stack */}
          <BentoCard size="4x1" className="bg-white/[0.01]">
            <div className="flex items-center justify-between h-full">
              <div className="flex flex-col">
                <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">
                  AI Stack
                </p>
                <p className="font-medium text-xl">Antigravity & n8n</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  <div className="w-14 h-14 rounded-full bg-indigo-500/20 border border-white/10 flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/10 backdrop-blur-sm">
                    <Cpu size={24} />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-white/10 flex items-center justify-center text-purple-400 shadow-xl shadow-purple-500/10 backdrop-blur-sm">
                    <Layers size={24} />
                  </div>
                  <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-white/10 flex items-center justify-center text-blue-400 shadow-xl shadow-blue-500/10 backdrop-blur-sm">
                    <Bot size={24} />
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Section 2: Ventures */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-purple-500 rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight">Ventures</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
          {/* Personal Site */}
          <BentoCard
            size="2x1"
            className="bg-indigo-500/5 border-indigo-500/10 group/site"
          >
            <div className="flex items-center justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="text-indigo-400" size={16} />
                  <span className="text-[10px] text-indigo-400 uppercase tracking-[0.2em] font-bold">
                    Personal Hub
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1 group-hover/site:text-indigo-300 transition-colors">
                  abdulrahmant.com
                </h3>
                <p className="text-white/50 text-sm font-light">
                  My personal corner of the internet.
                </p>
              </div>
              <a
                href="https://abdulrahmant.com"
                target="_blank"
                className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 hover:bg-indigo-500/20 transition-all"
              >
                <ExternalLink size={24} />
              </a>
            </div>
          </BentoCard>

          {/* Agency Site */}
          <BentoCard size="1x1" className="bg-white/[0.02] group/agency">
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <LayoutIcon size={24} className="text-white/40" />
                <a
                  href="https://infni-t.com"
                  target="_blank"
                  className="text-white/20 hover:text-white transition-colors"
                >
                  <ExternalLink size={14} />
                </a>
              </div>
              <div>
                <h3 className="font-bold mb-1">INFNI-T'</h3>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">
                  Agency Venture
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Companies Worked With */}
          <BentoCard size="3x1" className="bg-white/[0.01]">
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle2 className="text-indigo-400" size={16} />
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
                  The Vein (Trusted By)
                </span>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-4 items-center">
                {companies.map((c) => (
                  <div key={c.name} className="flex flex-col">
                    <span className="text-sm font-bold text-white/80">
                      {c.name}
                    </span>
                    <span className="text-[8px] text-white/30 uppercase tracking-tighter">
                      {c.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Section 3: Skills */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-emerald-500 rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight">
            Skills & Expertise
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill, i) => (
            <BentoCard
              key={skill.name}
              size="1x1"
              delay={i * 0.1}
              className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex flex-col h-full justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm mb-1">{skill.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full bg-indigo-500 rounded-full",
                          skill.level === "Expert" ? "w-full" : "w-[85%]",
                        )}
                      />
                    </div>
                    <span className="text-[8px] text-white/30 uppercase font-bold">
                      {skill.level}
                    </span>
                  </div>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </section>
    </div>
  );
};
