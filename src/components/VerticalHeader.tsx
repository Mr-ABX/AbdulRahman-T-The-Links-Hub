import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Settings, Compass, Layout, Send, PanelLeftClose, PanelLeftOpen, ExternalLink, ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";
import { ASSET_LINKS } from "../constants/assets";

const logo1 = ASSET_LINKS.logo1Svg;

export const VerticalHeader = ({
  activeTab,
  setActiveTab,
  setIsSettingsOpen,
  tabs,
  isCollapsed,
  setIsCollapsed,
}: {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  setIsSettingsOpen: (open: boolean) => void;
  tabs: any[];
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    Platform: true,
    Work: true,
    Insights: true,
    About: true,
  });

  const navGroups = [
    { label: "Home", tab: "Home" },
    { label: "Platform", items: ["Vortex", "Store", "Links", "Prompts", "Apps", "Toolspedia"] },
    { label: "Work", items: ["CaseStudies", "Flagships", "Projects", "Services", "Automation"] },
    { label: "Insights", items: ["Journal", "Academy", "Music", "Blog", "Feed", "Ebooks"] },
    { label: "About", items: ["About", "Reviews", "Connect", "Community"] },
  ];

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-3 bottom-3 my-auto h-[calc(100vh-24px)] z-[90] flex flex-col justify-between select-none font-sans transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "liquid-glass rounded-r-[26px] md:rounded-r-[30px] border-r border-y border-white/[0.12] !border-l-0",
        "shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.18)] py-4",
        isCollapsed ? "w-16" : "w-60 md:w-64"
      )}
    >
      {/* Main Nav Scroll Body */}
      <div className={cn("space-y-4 flex-1 overflow-y-auto no-scrollbar", isCollapsed ? "px-2" : "px-3.5")}>
        {/* Header Actions / Branding */}
        <div className={cn("flex items-center pb-3 border-b border-white/[0.08]", isCollapsed ? "flex-col gap-3 justify-center" : "justify-between gap-2")}>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleTabClick("Home")}
              className="w-9 h-9 rounded-[13px] bg-[#12121c]/90 border border-white/[0.14] hover:border-white/25 flex items-center justify-center hover:bg-white/[0.14] transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_4px_12px_rgba(0,0,0,0.4)] group shrink-0"
              title="Abdulrahman-T Home"
            >
              <img
                src={logo1}
                alt="Abdulrahman Logo"
                className="w-5 h-5 object-contain group-hover:scale-105 transition-transform"
              />
            </button>
            {!isCollapsed && (
              <div className="text-left whitespace-nowrap overflow-hidden">
                <h1 className="text-xs font-bold tracking-[0.12em] text-white uppercase font-mono truncate">
                  ABDULRAHMAN-T
                </h1>
                <span className="text-[9px] text-white/40 font-mono tracking-wider uppercase">
                  Studio // v4.2
                </span>
              </div>
            )}
          </div>
          <button
            id="toggle-sidebar-collapse-btn"
            onClick={() => setIsCollapsed && setIsCollapsed(!isCollapsed)}
            className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all shrink-0 cursor-pointer border border-transparent hover:border-white/10"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <PanelLeftOpen size={14} strokeWidth={1.35} /> : <PanelLeftClose size={14} strokeWidth={1.35} />}
          </button>
        </div>

        {/* Navigation Categories */}
        <nav className={cn("space-y-3", isCollapsed ? "mt-2" : "")}>
          {navGroups.map((group, groupIdx) => {
            if (group.tab) {
              const isActive = activeTab === group.tab;
              return (
                <button
                  key={group.label}
                  onClick={() => handleTabClick(group.tab)}
                  className={cn(
                    "flex items-center text-[13px] font-medium tracking-tight rounded-xl transition-all duration-200 outline-none cursor-pointer",
                    isCollapsed ? "justify-center w-10 h-10 p-0 mx-auto rounded-xl" : "w-full gap-2.5 px-3 py-2 text-left",
                    isActive
                      ? "text-white bg-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] border border-white/10 font-semibold"
                      : "text-white/65 hover:text-white hover:bg-white/[0.06]"
                  )}
                  title={isCollapsed ? group.label : undefined}
                >
                  <Compass size={15} strokeWidth={1.35} className={isActive ? "text-white" : "text-white/45"} />
                  {!isCollapsed && group.label}
                </button>
              );
            }

            const isGroupExpanded = expandedGroups[group.label] !== false;
            return (
              <div key={group.label} className={cn("space-y-1", isCollapsed ? "flex flex-col items-center" : "")}>
                {/* Accordion header or Divider */}
                {isCollapsed ? (
                  groupIdx > 0 && <div className="w-6 border-b border-white/[0.08] my-2"></div>
                ) : (
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className="w-full flex items-center justify-between px-1.5 py-1 text-[10px] font-mono font-medium text-white/40 uppercase tracking-[0.16em] hover:text-white/70 transition-colors cursor-pointer"
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      size={11}
                      strokeWidth={1.35}
                      className={cn("transition-transform duration-200 opacity-60", isGroupExpanded ? "rotate-180 text-white" : "")}
                    />
                  </button>
                )}

                {/* Dropdown Items list */}
                <AnimatePresence initial={false}>
                  {(isGroupExpanded || isCollapsed) && (
                    <motion.div
                      initial={isCollapsed ? false : { height: 0, opacity: 0 }}
                      animate={isCollapsed ? false : { height: "auto", opacity: 1 }}
                      exit={isCollapsed ? false : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                      className={cn(
                        "overflow-hidden flex flex-col",
                        isCollapsed ? "gap-1.5 items-center w-full" : "gap-0.5"
                      )}
                    >
                      {group.items.map((item) => {
                        const tabInfo = tabs.find((t) => t.name === item);
                        const displayName = 
                          item === "CaseStudies" ? "Case Studies" :
                          item === "Apps" ? "Infni-T' Labz" : 
                          item === "Music" ? "AI Music" : 
                          item === "Blog" ? "My Blog" : 
                          item === "Feed" ? "Release Feed" : 
                          item === "Toolspedia" ? "Tools Pedia" : 
                          tabInfo?.name || item;
                        const icon = tabInfo?.icon || <Layout size={14} strokeWidth={1.35} />;
                        const isActive = activeTab === item;

                        return (
                          <button
                            key={item}
                            onClick={() => handleTabClick(item)}
                            className={cn(
                              "flex items-center text-[13px] font-medium tracking-tight rounded-xl transition-all duration-200 outline-none cursor-pointer text-left",
                              isCollapsed ? "justify-center w-10 h-10 p-0 rounded-xl" : "w-full gap-2.5 px-3 py-2",
                              isActive
                                ? "text-white bg-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] border border-white/10 font-semibold"
                                : "text-white/65 hover:text-white hover:bg-white/[0.06]"
                            )}
                            title={isCollapsed ? displayName : undefined}
                          >
                            <span className={cn("transition-colors flex shrink-0", isActive ? "text-white" : "text-white/45")}>
                              {icon}
                            </span>
                            {!isCollapsed && <span className="truncate">{displayName}</span>}
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

        {/* Minimal Portal V2 Preview */}
        <div className="pt-2">
          {isCollapsed ? (
            <a
              href="https://ab-folio-portal-v2.vercel.app/"
              target="_blank"
              rel="noreferrer noopener"
              className="w-10 h-10 mx-auto rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.08] transition-all"
              title="AB Folio Portal V2"
            >
              <ExternalLink size={13} strokeWidth={1.35} />
            </a>
          ) : (
            <div className="p-3 rounded-2xl liquid-glass-subtle border border-white/[0.09] space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">
                  Live Experience
                </span>
                <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-white/[0.06] text-white/70 border border-white/10">
                  3D WEB
                </span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <h4 className="text-[12px] font-medium text-white tracking-tight truncate">
                  AB-Folio Portal
                </h4>
                <a
                  href="https://ab-folio-portal-v2.vercel.app/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-1 rounded-full bg-white/[0.06] hover:bg-white/[0.14] text-white/70 hover:text-white transition-all shrink-0 border border-white/10"
                  title="Launch 3D Web Portal"
                >
                  <ArrowUpRight size={12} strokeWidth={1.35} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Settings & Controls */}
      <div className={cn("pt-3 border-t border-white/[0.08] space-y-2.5 shrink-0", isCollapsed ? "px-2 flex flex-col items-center" : "px-3.5")}>
        <button
          onClick={() => handleTabClick("Connect")}
          className={cn(
            "bg-white hover:bg-neutral-200 text-black font-semibold text-xs tracking-tight rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer shadow-[0_4px_16px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]",
            isCollapsed ? "w-10 h-10 p-0 rounded-full" : "w-full py-2.5"
          )}
          title={isCollapsed ? "Connect" : undefined}
        >
          {isCollapsed ? <Send size={13} strokeWidth={1.35} /> : "Hire Me"}
        </button>

        <div className={cn("flex items-center", isCollapsed ? "justify-center w-full" : "justify-between")}>
          <button
            id="sidebar-preferences-btn"
            onClick={() => setIsSettingsOpen(true)}
            className={cn(
              "w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm",
              isCollapsed ? "" : ""
            )}
            title="Preferences"
          >
            <Settings size={14} strokeWidth={1.35} />
          </button>
          {!isCollapsed && (
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/35 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>v4.2 // PRO</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

