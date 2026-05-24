import React from "react";
import { motion } from "motion/react";
import { 
  Instagram, 
  Linkedin, 
  Github, 
  Twitter, 
  Mail, 
  ArrowRight, 
  Cpu, 
  Bot, 
  ShoppingBag, 
  Book, 
  Newspaper, 
  AppWindow, 
  Code2, 
  Gamepad2, 
  Globe, 
  Users, 
  Zap, 
  Briefcase, 
  Trophy,
  Download,
  Send
} from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { FeaturedCarousel } from "../shared/FeaturedCarousel";
import { LiveAutomationFeed } from "../shared/LiveAutomationFeed";
import { ASSET_LINKS } from "../../constants/assets";
import { projects } from "../../constants/data";
import { ProjectType, Category } from "../../types";
import { cn } from "../../lib/utils";

const myPfpFull = ASSET_LINKS.myPfpFull;
const bookCover = ASSET_LINKS.bookCover;

export const LinksPage = ({
  setActiveTab,
  openProjectModal,
  openChatWithSearch,
  compactHomeView,
  activeHomeSection,
  setActiveHomeSection,
}: {
  setActiveTab: (tab: Category) => void;
  openProjectModal: (p: ProjectType) => void;
  openChatWithSearch: (query: string) => void;
  compactHomeView: boolean;
  activeHomeSection: "Learn" | "Explore" | "Work";
  setActiveHomeSection: (section: "Learn" | "Explore" | "Work") => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-7xl mx-auto pb-20">
      {/* Left Column - Tall Profile */}
      <div className="md:col-span-5 flex flex-col">
        <div className="sticky top-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -5 }}
            className="glass rounded-[2.5rem] overflow-hidden group/profile min-h-[600px] md:min-h-[750px] relative border border-white/10 shadow-2xl"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 bg-indigo-500/10 flex items-center justify-center text-8xl">
              👨🏽‍💻
              <img
                src={myPfpFull}
                alt="Abdulrahman Toor"
                className="absolute inset-0 w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover/profile:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none"></div>
            </div>

            {/* Social Floating Icons */}
            <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
              <a
                href="https://www.instagram.com/abdulrahman.toor/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5 shadow-xl"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/abdulrahman-t/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5 shadow-xl"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/Mr-ABX/"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5 shadow-xl"
              >
                <Github size={20} />
              </a>
              <a
                href="https://x.com/Mr_AbdulrahmanT"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5 shadow-xl"
              >
                <Twitter size={20} />
              </a>
            </div>

            {/* Content Area */}
            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="inline-flex items-center h-9 px-3 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 group/badge-hire transition-all duration-500 cursor-default backdrop-blur-md overflow-hidden hover:pr-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                  <span className="max-w-0 overflow-hidden group-hover/badge-hire:max-w-[200px] group-hover/badge-hire:ml-2 transition-all duration-500 whitespace-nowrap opacity-0 group-hover/badge-hire:opacity-100">
                    Available for Projects
                  </span>
                </div>
                <div className="inline-flex items-center h-9 px-3 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 group/badge-projects transition-all duration-500 cursor-default backdrop-blur-md overflow-hidden hover:pr-4">
                  <Trophy size={14} className="shrink-0" />
                  <span className="max-w-0 overflow-hidden group-hover/badge-projects:max-w-[200px] group-hover/badge-projects:ml-2 transition-all duration-500 whitespace-nowrap opacity-0 group-hover/badge-projects:opacity-100">
                    200+ Delivered
                  </span>
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg font-sans">
                  Abdulrahman Toor
                </h1>
                <h2 className="text-xl text-indigo-400 font-semibold drop-shadow-md">
                  Founder & AI Automation Expert
                </h2>
              </div>

              <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-md font-medium drop-shadow-sm font-sans">
                Architecting the future with AI. I build scalable SaaS platforms, high-performance automation systems, and open-source tools that turn complexity into growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab("Connect")}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Mail
                    size={16}
                    className="group-hover/btn:rotate-12 transition-transform relative z-10"
                  />
                  <span className="relative z-10">Get in Touch</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab("Projects")}
                  className="flex-1 bg-white/10 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-white/20 transition-all backdrop-blur-md border border-white/10 flex items-center justify-center gap-2 group/btn shadow-lg cursor-pointer"
                >
                  <span>View My Work</span>
                  <ArrowRight
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Interactive Tech Cloud Widget */}
          <BentoCard size="1x1" className="bg-white/[0.02] overflow-hidden group/cloud">
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Cpu size={20} />
                </div>
                <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest font-mono">
                  Tech Cloud
                </span>
              </div>
              <div className="flex flex-wrap gap-2 relative mt-2">
                {["React", "Next.js", "n8n", "Python", "AI", "SaaS", "Supabase", "Docker", "AWS"].map((tech, i) => (
                  <motion.span
                    key={tech}
                    animate={{
                      y: [0, -5, 0],
                      x: [0, i % 2 === 0 ? 5 : -5, 0],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/5 text-[10px] text-white/60 font-medium hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors cursor-default border border-white/5 font-sans"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>
      </div>

      {/* Right Column - Categorized Shortcuts */}
      <div className="md:col-span-7 flex flex-col gap-8">
        {compactHomeView && (
          <div className="flex gap-1 p-1 bg-white/[0.03] rounded-full overflow-x-auto hide-scrollbar border border-white/5 sticky top-24 z-30 backdrop-blur-xl w-fit mx-auto mb-2 shadow-2xl">
            <button
              onClick={() => setActiveHomeSection("Learn")}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer",
                activeHomeSection === "Learn"
                  ? "bg-white/10 text-white shadow-sm border border-white/10"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent"
              )}
            >
              Learn & Connect
            </button>
            <button
              onClick={() => setActiveHomeSection("Explore")}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer",
                activeHomeSection === "Explore"
                  ? "bg-white/10 text-white shadow-sm border border-white/10"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent"
              )}
            >
              Explore My Work
            </button>
            <button
              onClick={() => setActiveHomeSection("Work")}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer",
                activeHomeSection === "Work"
                  ? "bg-white/10 text-white shadow-sm border border-white/10"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent"
              )}
            >
              Work With Me
            </button>
          </div>
        )}

        {/* Category 1: Learn & Connect */}
        {(!compactHomeView || activeHomeSection === "Learn") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {!compactHomeView && (
              <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 font-mono">
                <Book size={12} className="text-purple-400" /> Learn & Connect
              </h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-auto">
              {/* AI Assistant Quick Widget */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -5 }}
                className="col-span-1 md:col-span-2 row-span-1 relative overflow-hidden rounded-[2rem] p-[2px] group/ai-widget min-h-[180px]"
              >
                <div className="absolute inset-0 bg-indigo-500/20 rounded-[2rem]" />
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#6366f1_300deg,#a855f7_330deg,#ec4899_360deg)] animate-border-spin blur-md opacity-70" />
                <div className="relative h-full w-full bg-[#050505] rounded-[calc(2rem-2px)] p-6 flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10" />
                  <div className="absolute -right-4 -top-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover/ai-widget:bg-indigo-500/20 transition-colors" />
                  <div className="relative z-10 h-full flex flex-col justify-center p-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover/ai-widget:scale-110 transition-transform">
                        <Bot size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-sans">Ask My AI Assistant</h3>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold font-mono">
                          Powered by Gemini 3 Flash
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => openChatWithSearch("")}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm hover:bg-white/10 transition-all flex items-center justify-between group-hover/ai-widget:border-indigo-500/50 cursor-pointer text-left"
                    >
                      <span className="text-white/60">Click to start chatting...</span>
                      <ArrowRight size={16} className="text-indigo-400" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Storefront Widget */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -5 }}
                className="col-span-1 md:col-span-2 row-span-1 relative overflow-hidden rounded-[2rem] p-[2px] group/store-widget cursor-pointer"
                onClick={() => setActiveTab("Store")}
              >
                <div className="absolute inset-0 bg-emerald-500/20 rounded-[2rem]" />
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#10b981_300deg,#34d399_330deg,#059669_360deg)] animate-border-spin blur-md opacity-70" />
                <div className="relative h-full w-full bg-[#050505] rounded-[calc(2rem-2px)] p-4 flex items-center justify-between overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent" />
                  <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover/store-widget:bg-emerald-500/20 transition-colors" />

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10 group-hover/store-widget:scale-110 group-hover/store-widget:bg-emerald-500 group-hover/store-widget:text-black transition-all duration-300">
                      <ShoppingBag size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-emerald-400 font-sans">
                        Store Front - # Hash Lab
                      </h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-0.5 font-mono">
                        The AI Stash Studio
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 mr-2">
                      <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-white/60 font-mono">
                        Premium
                      </span>
                      <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-white/60 font-mono">
                        Assets
                      </span>
                    </div>
                    <button className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover/store-widget:bg-emerald-500 group-hover/store-widget:text-black transition-all duration-300 shadow-lg group-hover/store-widget:shadow-emerald-500/25 cursor-pointer">
                      <ArrowRight
                        size={18}
                        className="group-hover/store-widget:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Ebooks Shortcut */}
              <BentoCard
                size="1x1"
                className="group cursor-pointer hover:bg-white/[0.04] transition-colors relative overflow-hidden"
                onClick={() => setActiveTab("Ebooks")}
              >
                <div className="absolute right-0 bottom-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity translate-x-4 translate-y-4">
                  <Book size={60} />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-2 font-sans">Learn My Systems</h3>
                    <p className="text-white/50 text-xs max-w-[150px] font-sans">
                      Actionable guides on AI, automation, and SaaS.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-purple-400 text-[10px] font-bold uppercase tracking-widest group-hover:gap-3 transition-all font-mono">
                    <span>Browse Library</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </BentoCard>

              {/* Newsletter Widget */}
              <BentoCard size="1x1" className="bg-indigo-500/5 border-indigo-500/10 group">
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <Newspaper size={20} />
                    </div>
                    <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest font-mono">
                      Newsletter
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-1 font-sans">Join My Newsletter</h3>
                    <p className="text-white/50 text-[10px] font-sans">Weekly insights on AI trends.</p>
                  </div>
                  <div className="relative mt-auto">
                    <button className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl py-2 px-3 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer">
                      <span>Subscribe Now</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </BentoCard>
            </div>
          </motion.div>
        )}

        {/* Category 2: Explore My Work (Apps & Projects) */}
        {(!compactHomeView || activeHomeSection === "Explore") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {!compactHomeView && (
              <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 font-mono">
                <AppWindow size={12} className="text-indigo-400" /> Explore My Work
              </h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[minmax(180px,auto)]">
              {/* Featured Carousel Widget */}
              <FeaturedCarousel projects={projects} onSelect={openProjectModal} />

              {/* Get My Apps Widget */}
              <BentoCard
                size="2x1"
                className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 group/apps cursor-pointer"
                onClick={() => setActiveTab("Projects")}
              >
                <div className="absolute right-0 bottom-0 p-4 opacity-10 group-hover/apps:opacity-20 transition-opacity translate-x-4 translate-y-4">
                  <Download size={80} />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-3 w-fit font-mono">
                    Products
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-sans">Download & Use My Apps</h3>
                  <p className="text-white/50 text-sm max-w-[250px] mb-4 font-sans">
                    Get access to my premium SaaS tools, free apps, and open-source models.
                  </p>
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold group-hover/apps:gap-3 transition-all font-mono">
                    <span>Browse Products</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </BentoCard>

              {/* Projects Shortcut */}
              <BentoCard
                size="2x1"
                className="group cursor-pointer hover:bg-white/[0.04] transition-colors relative overflow-hidden"
                onClick={() => {
                  setActiveTab("Projects");
                }}
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <AppWindow size={100} />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                        <AppWindow size={20} />
                      </div>
                      <h3 className="text-xl font-bold font-sans">View My Portfolio</h3>
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-white/30 group-hover:text-white transition-colors group-hover:translate-x-1"
                    />
                  </div>
                  <p className="text-white/50 text-sm mb-auto max-w-sm font-sans">
                    Explore SaaS platforms, mobile apps, games, and open-source AI tools I've built.
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab("Projects");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Code2 size={14} /> Apps
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab("Projects");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Gamepad2 size={14} /> Games
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab("Projects");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Globe size={14} /> Web
                    </button>
                  </div>
                </div>
              </BentoCard>

              {/* Live Automation Feed */}
              <LiveAutomationFeed />

              {/* Stats Widget */}
              <BentoCard size="1x1" className="bg-indigo-500/5 border-indigo-500/10">
                <div className="flex flex-col h-full justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Users size={20} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold tracking-tighter text-white font-sans">100+</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold font-mono">
                      Happy Clients
                    </p>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-[#050505] bg-white/10 flex items-center justify-center text-[8px] font-bold font-mono"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="w-6 h-6 rounded-full border-2 border-[#050505] bg-indigo-500 flex items-center justify-center text-[8px] font-bold font-mono">
                      +
                    </div>
                  </div>
                </div>
              </BentoCard>
            </div>
          </motion.div>
        )}

        {/* Category 3: Work With Me (Hire & Consult) */}
        {(!compactHomeView || activeHomeSection === "Work") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {!compactHomeView && (
              <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2 font-mono">
                <Briefcase size={12} className="text-emerald-400" /> Work With Me
              </h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[minmax(180px,auto)]">
              {/* Calendar / Consultation Widget */}
              <BentoCard
                size="1x1"
                className="bg-amber-500/5 border-amber-500/10 group/cal cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://calendly.com/digital-b3asts/quick-free-consultation",
                    "_blank"
                  )
                }
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover/cal:scale-110 transition-transform">
                      <Zap size={20} />
                    </div>
                    <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest font-mono">
                      Consulting
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 font-sans">Book a Strategy Call</h3>
                    <p className="text-xs text-white/40 font-light font-sans">
                      Need expert advice? Let's discuss your automation or SaaS needs.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400 text-[10px] font-bold uppercase tracking-widest group-hover/cal:gap-3 transition-all font-mono">
                    <span>Schedule 15-Min Call</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </BentoCard>

              {/* Hire Me Widget */}
              <BentoCard
                size="1x1"
                className="bg-emerald-500/5 border-emerald-500/10 group/hire cursor-pointer"
                onClick={() => setActiveTab("Connect")}
              >
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover/hire:scale-110 transition-transform">
                      <Briefcase size={20} />
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/20 text-[8px] text-emerald-400 font-bold uppercase tracking-widest font-mono">
                      <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                      Available
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 font-sans">Start a Project</h3>
                    <p className="text-xs text-white/40 font-light font-sans">
                      Looking for a dedicated developer to build your next big idea?
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest group-hover/hire:gap-3 transition-all font-mono">
                    <span>Request a Proposal</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </BentoCard>

              {/* Automation Shortcut */}
              <BentoCard
                size="2x1"
                className="group cursor-pointer hover:bg-white/[0.04] transition-colors relative overflow-hidden"
                onClick={() => setActiveTab("Automation")}
              >
                <div className="absolute right-0 bottom-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity translate-x-4 translate-y-4">
                  <Bot size={80} />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-3 w-fit font-mono">
                    Services
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-sans">Automate Your Business</h3>
                  <p className="text-white/50 text-sm max-w-[250px] mb-4 font-sans">
                    Save 100+ hours/month with custom n8n workflows and AI systems.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold group-hover:gap-3 transition-all font-mono">
                    <span>View Automation Services</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </BentoCard>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
