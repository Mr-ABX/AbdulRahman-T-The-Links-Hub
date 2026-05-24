import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Zap, Activity, Users, Store, ArrowRight, Code2, Send, Linkedin, Github, Instagram, Twitter, Mail } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { FeaturedCarousel } from "../shared/FeaturedCarousel";
import { ASSET_LINKS } from "../../constants/assets";
import { projects, skills } from "../../constants/data";
import { ProjectType } from "../../types";

const myPfp = ASSET_LINKS.myPfp;

const socialTabs = [
  {
    name: "Twitter",
    icon: <Twitter size={18} />,
    url: "https://x.com/Mr_AbdulrahmanT",
  },
  { name: "LinkedIn", icon: <Linkedin size={18} />, url: "#" },
  { name: "Instagram", icon: <Instagram size={18} />, url: "#" },
  { name: "GitHub", icon: <Github size={18} />, url: "#" },
  {
    name: "Mail",
    icon: <Mail size={18} />,
    url: "mailto:digital.b3asts@gmail.com",
  },
];

const LiveAutomationFeed = () => {
  const [automationTasks, setAutomationTasks] = useState(1248);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutomationTasks((prev) => prev + Math.floor(Math.random() * 2) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BentoCard size="1x1" className="bg-white/[0.02] group">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Zap size={20} />
          </div>
          <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">
            Live Feed
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">Tasks Automated Today</span>
            <span className="text-sm font-bold text-emerald-400">
              {automationTasks.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "75%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-emerald-500"
            />
          </div>
          <p className="text-[10px] text-white/30 italic">
            "Efficiency is the key to scale."
          </p>
        </div>
      </div>
    </BentoCard>
  );
};

export const LinksPage = ({
  setActiveTab,
  openProjectModal,
}: {
  setActiveTab: (tab: any) => void;
  openProjectModal: (p: ProjectType) => void;
}) => {
  return (
    <div className="w-full space-y-4 md:space-y-6 pb-20">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)] md:auto-rows-[minmax(220px,auto)]">
        {/* 1. Intro / Profile (2x2) */}
        <BentoCard
          size="2x2"
          className="bg-indigo-500/5 border-indigo-500/20 group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
            <Zap size={120} className="text-indigo-400" />
          </div>
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-indigo-500/30">
                <img
                  src={myPfp}
                  alt="Abdulrahman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-3 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Available for Work
              </div>
            </div>

            <div className="mt-auto">
              <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">
                Abdulrahman Toor
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 max-w-[90%]">
                Full-Stack Architect, AI Engineer, and Digital Creator. Building intelligent SaaS, immersive experiences, and automation ecosystems.
              </p>
              <div className="flex flex-wrap gap-2">
                {socialTabs.map((tab, i) => (
                  <a
                    key={i}
                    href={tab.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-indigo-500/20 hover:border-indigo-500/50 transition-all group/social"
                  >
                    <span className="group-hover/social:scale-110 transition-transform">
                      {tab.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </BentoCard>

        {/* 2. Featured Projects (2x2) */}
        <FeaturedCarousel
          projects={projects}
          onSelect={openProjectModal}
        />

        {/* 3. Small Stat Cards (1x1 each) */}
        <BentoCard size="1x1" className="bg-rose-500/5 border-rose-500/20">
          <div className="text-rose-400 mb-auto">
            <Activity size={24} />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl md:text-4xl font-black">150k+</h3>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-1 font-bold">
              Impressions
            </p>
          </div>
        </BentoCard>

        <BentoCard size="1x1" className="bg-cyan-500/5 border-cyan-500/20">
          <div className="text-cyan-400 mb-auto">
            <Users size={24} />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl md:text-4xl font-black">12k+</h3>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-1 font-bold">
              Network
            </p>
          </div>
        </BentoCard>

        {/* 4. Live Automation Feed (1x1) */}
        <LiveAutomationFeed />

        {/* 5. Quick Nav: Store (1x1) */}
        <BentoCard
          size="1x1"
          className="bg-emerald-500/10 hover:bg-emerald-500/20 cursor-pointer border-emerald-500/20 group transition-all"
          onClick={() => setActiveTab("Store")}
        >
          <div className="text-emerald-400 mb-auto group-hover:scale-110 transition-transform origin-left">
            <Store size={28} />
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-emerald-100">
                My Store
              </h3>
              <p className="text-emerald-400/60 text-xs">
                Tools & Templates
              </p>
            </div>
            <ArrowRight size={20} className="text-emerald-400 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </div>
        </BentoCard>

        {/* 6. Skills Box (2x1) */}
        <BentoCard size="2x1" className="bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-6">
            <Code2 size={20} className="text-white/40" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">
              Core Arsenal
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-auto">
            {skills.slice(0, 6).map((skill, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors"
              >
                <div className="text-white/40 group-hover:text-indigo-400 transition-colors">
                  {skill.icon}
                </div>
                <span className="text-xs md:text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* 7. Connect CTA (2x1) */}
        <BentoCard
          size="2x1"
          className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-500/30 cursor-pointer group"
          onClick={() => setActiveTab("Connect")}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between h-full gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-black mb-2 opacity-90 group-hover:opacity-100 transition-opacity">
                Got an idea?
              </h3>
              <p className="text-white/60 text-sm md:text-base max-w-sm">
                Let's collaborate on your next big project. Open for freelance opportunities.
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <Send size={20} className="ml-1" />
            </div>
          </div>
        </BentoCard>
      </div>
    </div>
  );
};
