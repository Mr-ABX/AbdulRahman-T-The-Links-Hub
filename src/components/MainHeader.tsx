import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { ChevronDown, Menu, X, Settings } from "lucide-react";
import { cn } from "../lib/utils";
import { ASSET_LINKS } from "../constants/assets";

const logo1 = ASSET_LINKS.logo1Svg;

export const MainHeader = ({
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navGroups = [
    { label: "Home", tab: "Home" },
    { label: "Platform", items: ["Vortex", "Store", "Links", "Prompts", "Apps", "Toolspedia"] },
    { label: "Work", items: ["Projects", "Services", "Automation"] },
    { label: "Insights", items: ["Journal", "Academy", "Music", "Blog", "Feed", "Ebooks"] },
    { label: "About", items: ["About", "Reviews", "Connect", "Community"] },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-[100] px-4 md:px-8 py-6 flex justify-center pointer-events-none transition-all duration-500">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={cn(
            "flex items-center justify-between pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]",
            isScrolled
              ? "glass bg-[#050505]/80 backdrop-blur-3xl rounded-[2rem] border border-white/10 p-2.5 shadow-2xl max-w-full md:max-w-5xl w-full mx-auto mt-2"
              : "w-full max-w-[1400px] mx-auto bg-transparent border-transparent p-0 mt-0",
          )}
        >
          {/* Logo */}
          <div className="flex items-center gap-4 pl-3 pr-4 shrink-0">
            <motion.button
              onClick={() => handleTabClick("Home")}
              className="relative w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group"
              animate={
                isScrolled
                  ? {
                      rotate: 360,
                      filter: ["blur(0px)", "blur(3px)", "blur(0px)"],
                    }
                  : {
                      rotate: 0,
                      filter: ["blur(0px)", "blur(3px)", "blur(0px)"],
                    }
              }
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <img
                src={logo1}
                alt="Logo"
                className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
              />
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navGroups.map((group) =>
              group.tab ? (
                <button
                  key={group.label}
                  onClick={() => handleTabClick(group.tab)}
                  className={cn(
                    "px-5 py-2.5 text-sm font-extrabold tracking-wide rounded-xl transition-all",
                    activeTab === group.tab
                      ? "bg-white/15 text-white shadow-lg"
                      : "text-white/60 hover:text-white hover:bg-white/10",
                  )}
                >
                  {group.label}
                </button>
              ) : (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(group.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    className={cn(
                      "px-5 py-2.5 text-sm font-extrabold tracking-wide rounded-xl transition-all flex items-center gap-2",
                      group.items.includes(activeTab)
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:text-white hover:bg-white/10",
                    )}
                  >
                    {group.label}
                    <ChevronDown
                      size={16}
                      className={cn(
                        "transition-transform duration-300 opacity-50",
                        activeDropdown === group.label ? "rotate-180" : "",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === group.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-48 z-50"
                      >
                        <div className="bg-[#0f0f0f]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-2 flex flex-col gap-1">
                          {group.items.map((item) => {
                            const tabInfo = tabs.find((t) => t.name === item);
                            const isActive = activeTab === item;
                            return (
                              <button
                                key={item}
                                onClick={() => handleTabClick(item)}
                                className={cn(
                                  "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold tracking-wide rounded-xl transition-all text-left group/btn",
                                  isActive
                                    ? "bg-white/10 text-white"
                                    : "text-white/60 hover:text-white hover:bg-white/5",
                                )}
                              >
                                <span
                                  className={cn(
                                    "transition-colors",
                                    isActive
                                      ? "text-indigo-400"
                                      : "text-white/40 group-hover/btn:text-white/80",
                                  )}
                                >
                                  {tabInfo?.icon}
                                </span>
                                {item === "Apps" ? "INFNI-T' LABZ" : item === "Music" ? "AI Music" : item === "Blog" ? "My Blog" : item === "Feed" ? "Release Feed" : item === "Toolspedia" ? "Tools Pedia" : tabInfo?.name || item}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ),
            )}
          </div>

          {/* Actions & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 pl-4 shrink-0 border-l border-white/10">
            <button
              onClick={() => handleTabClick("Connect")}
              className="hidden sm:block px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white text-xs font-black uppercase tracking-[0.1em] rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] border border-white/10"
            >
              Hire Me
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all border border-transparent"
              title="Preferences"
            >
              <Settings size={18} />
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-white/80 hover:bg-white/10 transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <span className="font-black text-xl tracking-widest text-white">
                MENU
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-8">
              {navGroups.map((group) => (
                <div key={group.label} className="flex flex-col gap-3">
                  <h3 className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
                    {group.label}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {group.tab ? (
                      <button
                        onClick={() => handleTabClick(group.tab)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-semibold text-sm transition-all border",
                          activeTab === group.tab
                            ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                            : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:text-white",
                        )}
                      >
                        {group.label}
                      </button>
                    ) : (
                      group.items.map((item) => {
                        const tabInfo = tabs.find((t) => t.name === item);
                        const isActive = activeTab === item;
                        return (
                          <button
                            key={item}
                            onClick={() => handleTabClick(item)}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-semibold text-sm transition-all border",
                              isActive
                                ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                                : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:text-white",
                            )}
                          >
                            {tabInfo?.icon}
                            {item === "Apps" ? "INFNI-T' LABZ" : item === "Music" ? "AI Music" : item === "Blog" ? "My Blog" : item === "Feed" ? "Release Feed" : item === "Toolspedia" ? "Tools Pedia" : tabInfo?.name || item}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-white/10">
              <button
                onClick={() => handleTabClick("Connect")}
                className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-indigo-400 hover:text-white transition-colors"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
