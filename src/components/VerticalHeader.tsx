import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Settings, Sparkles, Compass, Layout, Send, PanelLeftClose, PanelLeftOpen, ExternalLink } from "lucide-react";
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
    { label: "Work", items: ["Flagships", "Projects", "Services", "Automation"] },
    { label: "Insights", items: ["Journal", "Academy", "Music", "Blog", "Feed", "Ebooks"] },
    { label: "About", items: ["About", "Reviews", "Connect", "Community"] },
  ];

  const toggleGroup = (label: string) => {
    setExpandedGroups(prev => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-3 bottom-3 md:top-4 md:bottom-4 my-auto h-[calc(100vh-24px)] md:h-[calc(100vh-32px)] z-[90] flex flex-col justify-between select-none font-sans transition-all duration-300",
        "bg-[#0c0c14]/92 backdrop-blur-3xl border-r border-y border-white/[0.12] rounded-r-[22px] md:rounded-r-[26px]",
        "shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] py-4",
        isCollapsed ? "w-16" : "w-56 md:w-60"
      )}
    >
      {/* Top Concave Notch Wing (Curves seamlessly from left screen edge into sidebar top) */}
      <div className="absolute -top-[16px] left-0 w-[16px] h-[16px] pointer-events-none overflow-hidden">
        <svg viewBox="0 0 16 16" className="w-full h-full">
          <path d="M 0 0 C 0 8.837, 7.163 16, 16 16 L 0 16 Z" fill="#0c0c14" />
          <path d="M 0 0 C 0 8.837, 7.163 16, 16 16" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        </svg>
      </div>

      {/* Bottom Concave Notch Wing (Curves seamlessly from sidebar bottom back into left screen edge) */}
      <div className="absolute -bottom-[16px] left-0 w-[16px] h-[16px] pointer-events-none overflow-hidden">
        <svg viewBox="0 0 16 16" className="w-full h-full">
          <path d="M 16 0 C 7.163 0, 0 7.163, 0 16 L 0 0 Z" fill="#0c0c14" />
          <path d="M 16 0 C 7.163 0, 0 7.163, 0 16" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        </svg>
      </div>

      {/* Main Nav Scroll Body */}
      <div className={cn("space-y-4 flex-1 overflow-y-auto custom-scroll-area", isCollapsed ? "px-2" : "px-3.5")}>
        {/* Header Actions / Branding */}
        <div className={cn("flex items-center pb-3 border-b border-white/[0.08]", isCollapsed ? "flex-col gap-3 justify-center" : "justify-between gap-2")}>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveTab("Home")}
              className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 hover:border-purple-500/30 flex items-center justify-center hover:bg-white/[0.1] transition-all group shrink-0 shadow-sm"
              title="Home"
            >
              <img
                src={logo1}
                alt="Logo"
                className="w-5 h-5 object-contain group-hover:scale-110 transition-transform"
              />
            </button>
            {!isCollapsed && (
              <div className="text-left whitespace-nowrap overflow-hidden">
                <h1 className="text-xs font-black tracking-[0.16em] text-white uppercase font-mono truncate">
                  Abdulrahman-T
                </h1>
                <span className="text-[8px] text-purple-400 font-mono tracking-widest uppercase flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-purple-400 inline-block" />
                  LABS ENGINE
                </span>
              </div>
            )}
          </div>
          <button
            id="toggle-sidebar-collapse-btn"
            onClick={() => setIsCollapsed && setIsCollapsed(!isCollapsed)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-purple-300 hover:bg-white/[0.06] transition-colors shrink-0"
            title={isCollapsed ? "Expand Sidebar Notch" : "Collapse Sidebar Notch"}
          >
            {isCollapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          </button>
        </div>

        {/* Navigation Categories */}
        <nav className={cn("space-y-3.5", isCollapsed ? "mt-2" : "")}>
          {navGroups.map((group, groupIdx) => {
            if (group.tab) {
              const isActive = activeTab === group.tab;
              return (
                <button
                  key={group.label}
                  onClick={() => setActiveTab(group.tab)}
                  className={cn(
                    "flex items-center rounded-xl font-bold text-xs uppercase transition-all border outline-none cursor-pointer",
                    isCollapsed ? "justify-center w-10 h-10 p-0 mx-auto" : "w-full gap-2.5 px-3 py-2 tracking-wider text-left",
                    isActive
                      ? "bg-purple-950/40 border-purple-500/30 text-white shadow-[0_0_12px_rgba(168,85,247,0.25)]"
                      : "bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/[0.04]"
                  )}
                  title={isCollapsed ? group.label : undefined}
                >
                  <Compass size={14} className={isActive ? "text-purple-400" : "text-white/40"} />
                  {!isCollapsed && group.label}
                </button>
              );
            }

            const isGroupExpanded = expandedGroups[group.label] !== false;
            return (
              <div key={group.label} className={cn("space-y-1", isCollapsed ? "flex flex-col items-center" : "")}>
                {/* Accordion header or Divider */}
                {isCollapsed ? (
                  groupIdx > 0 && <div className="w-5 border-b border-white/[0.08] my-1.5"></div>
                ) : (
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className="w-full flex items-center justify-between py-1 text-[9px] font-black text-white/35 uppercase tracking-[0.2em] hover:text-white/60 transition-colors cursor-pointer"
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      size={10}
                      className={cn("transition-transform duration-200", isGroupExpanded ? "rotate-180" : "")}
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
                      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                      className={cn(
                        "overflow-hidden flex flex-col",
                        isCollapsed ? "gap-1.5 items-center w-full" : "gap-0.5"
                      )}
                    >
                      {group.items.map((item) => {
                        const tabInfo = tabs.find((t) => t.name === item);
                        const displayName = 
                          item === "Apps" ? "INFNI-T' LABZ" : 
                          item === "Music" ? "AI Music" : 
                          item === "Blog" ? "My Blog" : 
                          item === "Feed" ? "Release Feed" : 
                          item === "Toolspedia" ? "Tools Pedia" : 
                          tabInfo?.name || item;
                        const icon = tabInfo?.icon || <Layout size={13} />;
                        const isActive = activeTab === item;

                        return (
                          <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={cn(
                              "flex items-center text-xs font-semibold leading-none tracking-wide rounded-xl transition-all border outline-none cursor-pointer",
                              isCollapsed ? "justify-center w-10 h-10 p-0" : "w-full gap-2.5 px-3 py-2 text-left",
                              isActive
                                ? "bg-purple-950/40 border-purple-500/30 text-white shadow-[0_0_12px_rgba(168,85,247,0.25)]"
                                : "bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/[0.04]"
                            )}
                            title={isCollapsed ? displayName : undefined}
                          >
                            <span className={cn("transition-colors flex shrink-0", isActive ? "text-purple-400" : "text-white/40")}>
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

        {/* Compact Portal V2 Showcase Widget */}
        <div className="pt-2">
          {isCollapsed ? (
            <a
              href="https://ab-folio-portal-v2.vercel.app/"
              target="_blank"
              rel="noreferrer noopener"
              className="w-10 h-10 mx-auto rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-center text-purple-300 hover:text-white hover:border-purple-400/60 hover:bg-purple-500/20 transition-all group relative shadow-md shadow-purple-950/50"
              title="AB Folio Portal V2 (Launch 3D Web)"
            >
              <Sparkles size={15} className="group-hover:scale-110 transition-transform text-purple-400" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-purple-400 rounded-full border border-[#0c0c14] animate-pulse" />
            </a>
          ) : (
            <div className="relative overflow-hidden rounded-xl p-[1px] group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/25 to-indigo-500/25 rounded-xl" />
              <div className="relative bg-[#0c0c14]/95 backdrop-blur-xl p-2.5 rounded-[calc(0.75rem-1px)] border border-white/[0.08] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-wider text-purple-300 font-mono">
                      PORTAL V2
                    </span>
                  </div>
                  <span className="text-[7px] font-mono font-bold px-1 py-0.5 rounded bg-white/[0.05] text-white/50 border border-white/10 uppercase">
                    3D LIVE
                  </span>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-[11px] font-bold text-white font-sans truncate">
                    AB-Folio Experience
                  </h4>
                  <a
                    href="https://ab-folio-portal-v2.vercel.app/"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="p-1 rounded-md bg-white/[0.06] hover:bg-purple-500/25 text-purple-300 hover:text-white border border-white/10 transition-all shrink-0"
                    title="Launch 3D Web Portal"
                  >
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Settings & Controls */}
      <div className={cn("pt-3 border-t border-white/[0.08] space-y-3 shrink-0", isCollapsed ? "px-2 flex flex-col items-center" : "px-3.5")}>
        <button
          onClick={() => setActiveTab("Connect")}
          className={cn(
            "bg-white hover:bg-neutral-200 text-black font-bold uppercase tracking-wider rounded-xl transition-all duration-200 shadow-[0_4px_16px_rgba(255,255,255,0.15)] flex items-center justify-center cursor-pointer",
            isCollapsed ? "w-10 h-10 p-0" : "w-full py-2.5 text-[10px]"
          )}
          title={isCollapsed ? "Hire Me" : undefined}
        >
          {isCollapsed ? <Send size={14} /> : "Hire Me"}
        </button>

        <div className={cn("flex items-center", isCollapsed ? "justify-center w-full" : "justify-between")}>
          <button
            id="sidebar-preferences-btn"
            onClick={() => setIsSettingsOpen(true)}
            className={cn(
              "flex items-center rounded-lg text-[10px] font-mono text-white/50 hover:text-purple-300 hover:bg-white/[0.05] transition-all border border-transparent cursor-pointer",
              isCollapsed ? "justify-center w-10 h-10 p-0" : "gap-1.5 px-2 py-1"
            )}
            title="Preferences"
          >
            <Settings size={13} />
            {!isCollapsed && <span>Preferences</span>}
          </button>
          {!isCollapsed && <span className="text-[8px] font-mono text-white/30 uppercase">v4.2</span>}
        </div>
      </div>
    </aside>
  );
};
