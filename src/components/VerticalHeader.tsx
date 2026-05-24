import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Settings, ShieldCheck, Mail, Sparkles, User, Star, Share2, Compass, Layout, Send } from "lucide-react";
import { cn } from "../lib/utils";
import { ASSET_LINKS } from "../constants/assets";

const logo1 = ASSET_LINKS.logo1Svg;

export const VerticalHeader = ({
  activeTab,
  setActiveTab,
  setIsSettingsOpen,
  tabs,
}: {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  setIsSettingsOpen: (open: boolean) => void;
  tabs: any[];
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    Platform: true,
    Work: true,
    Insights: true,
    About: true,
  });

  const navGroups = [
    { label: "Home", tab: "Home" },
    { label: "Platform", items: ["Vortex", "Store", "Links", "Prompts", "Apps"] },
    { label: "Work", items: ["Projects", "Services", "Automation"] },
    { label: "Insights", items: ["Journal", "Academy", "Music", "Blog", "Feed", "Ebooks"] },
    { label: "About", items: ["About", "Reviews", "Connect", "Community"] },
  ];

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 md:w-68 bg-[#050505]/90 backdrop-blur-3xl border-r border-white/10 z-[90] flex flex-col justify-between p-6 select-none font-sans">
      <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pr-1">
        {/* Logo Branding */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-white/5">
          <button
            onClick={() => setActiveTab("Home")}
            className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group"
          >
            <img
              src={logo1}
              alt="Logo"
              className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
            />
          </button>
          <div className="text-left">
            <h1 className="text-xs font-black tracking-[0.2em] text-white uppercase font-mono">
              Abdulrahman
            </h1>
            <span className="text-[9px] text-white/30 tracking-widest font-mono uppercase">
              LABS ENGINE
            </span>
          </div>
        </div>

        {/* Navigation Categories */}
        <nav className="space-y-5">
          {navGroups.map((group) => {
            if (group.tab) {
              const isActive = activeTab === group.tab;
              return (
                <button
                  key={group.label}
                  onClick={() => setActiveTab(group.tab)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-bold text-xs uppercase tracking-wider transition-all border",
                    isActive
                      ? "bg-white/15 border-white/20 text-white shadow-md shadow-black/40"
                      : "bg-transparent border-transparent text-white/50 hover:text-white/80 hover:bg-white/5"
                  )}
                >
                  <Compass size={14} className={isActive ? "text-indigo-400" : "text-white/30"} />
                  {group.label}
                </button>
              );
            }

            const isGroupExpanded = expandedGroups[group.label] !== false;
            return (
              <div key={group.label} className="space-y-1">
                {/* Accordion header */}
                <button
                  onClick={() => toggleGroup(group.label)}
                  className="w-full flex items-center justify-between py-1 text-[9px] font-black text-white/30 uppercase tracking-[0.2em] hover:text-white/60 transition-colors"
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    size={10}
                    className={cn("transition-transform duration-300", isGroupExpanded ? "rotate-180" : "")}
                  />
                </button>

                {/* Dropdown Items list */}
                <AnimatePresence initial={false}>
                  {isGroupExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden flex flex-col gap-0.5 pl-1"
                    >
                      {group.items.map((item) => {
                        const tabInfo = tabs.find((t) => t.name === item);
                        // Fallback handling if custom tabs name aren't found
                        const displayName = 
                          item === "Apps" ? "INFNI-T' LABZ" : 
                          item === "Music" ? "AI Music" : 
                          item === "Blog" ? "My Blog" : 
                          item === "Feed" ? "Release Feed" : 
                          tabInfo?.name || item;
                        const icon = tabInfo?.icon || <Layout size={14} />;
                        const isActive = activeTab === item;

                        return (
                          <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={cn(
                              "w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold leading-none tracking-wide rounded-xl transition-all text-left border",
                              isActive
                                ? "bg-white/10 border-white/10 text-white shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                                : "bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/5"
                            )}
                          >
                            <span className={cn("transition-colors", isActive ? "text-indigo-400" : "text-white/30")}>
                              {icon}
                            </span>
                            <span className="truncate">{displayName}</span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer Settings & Controls */}
      <div className="pt-4 border-t border-white/5 space-y-4 shrink-0">
        <button
          onClick={() => setActiveTab("Connect")}
          className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white text-[10px] font-black uppercase tracking-[0.1em] rounded-xl transition-all shadow-[0_0_15px_rgba(99,102,241,0.2)]"
        >
          Hire Me
        </button>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-mono text-white/40 hover:text-white hover:bg-white/5 transition-all border border-transparent"
          >
            <Settings size={12} />
            <span>Preferences</span>
          </button>
          <span className="text-[8px] font-mono text-white/20 uppercase">Core v4.2</span>
        </div>
      </div>
    </aside>
  );
};
