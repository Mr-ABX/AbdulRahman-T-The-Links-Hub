import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { ChevronDown, Menu, X, Settings, ArrowUpRight } from "lucide-react";
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
    setIsScrolled(latest > 35);
  });

  const navGroups = [
    { label: "Home", tab: "Home" },
    { label: "Platform", items: ["Vortex", "Store", "Links", "Prompts", "Apps", "Toolspedia"] },
    { label: "Work", items: ["CaseStudies", "Flagships", "Projects", "Services", "Automation"] },
    { label: "Insights", items: ["Journal", "Academy", "Resources", "Music", "Blog", "Feed", "Ebooks"] },
    { label: "About", items: ["About", "Reviews", "Connect", "Community"] },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-[100] flex justify-center pointer-events-none transition-all duration-500">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            "relative pointer-events-auto flex items-center justify-between transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)]",
            "liquid-glass",
            isScrolled
              ? "mt-3 md:mt-4 rounded-full max-w-[92%] sm:max-w-2xl md:max-w-4xl px-3 md:px-5 py-2 border border-white/[0.12] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.18)]"
              : "-mt-[1px] rounded-b-[24px] md:rounded-b-[28px] rounded-t-none max-w-[96%] sm:max-w-3xl md:max-w-5xl px-4 md:px-6 py-2.5 md:py-3 border-b border-x border-white/[0.1] !border-t-0 !border-t-transparent shadow-[0_16px_36px_-10px_rgba(0,0,0,0.7)]",
          )}
          style={isScrolled ? undefined : { borderTop: "none", borderTopColor: "transparent", borderTopWidth: 0 }}
        >
          {/* Left Concave Wing (Supaste Style Notch Fillet - Seamlessly Connected) */}
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{
              opacity: isScrolled ? 0 : 1,
              scaleY: isScrolled ? 0.2 : 1,
              scaleX: isScrolled ? 0.2 : 1,
            }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="hidden md:block absolute -left-[24px] top-0 w-[26px] h-[25px] pointer-events-none origin-top-right z-20 overflow-visible"
          >
            <svg
              viewBox="0 0 26 25"
              className="w-full h-full overflow-visible"
            >
              {/* Glass body fill that bridges 2px into the nav to seamlessly cover the top 24px of nav border-left */}
              <path
                d="M 0 0 C 13.255 0, 24 10.745, 24 24 L 26 24 L 26 0 Z"
                fill="#0d0d14"
              />
              {/* Outer specular border curve arriving exactly at the side wall at (24, 24) */}
              <path
                d="M 0 0 C 13.255 0, 24 10.745, 24 24"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            </svg>
          </motion.div>

          {/* Right Concave Wing (Supaste Style Notch Fillet - Seamlessly Connected) */}
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{
              opacity: isScrolled ? 0 : 1,
              scaleY: isScrolled ? 0.2 : 1,
              scaleX: isScrolled ? 0.2 : 1,
            }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="hidden md:block absolute -right-[24px] top-0 w-[26px] h-[25px] pointer-events-none origin-top-left z-20 overflow-visible"
          >
            <svg
              viewBox="0 0 26 25"
              className="w-full h-full overflow-visible"
            >
              {/* Glass body fill that bridges 2px into the nav to seamlessly cover the top 24px of nav border-right */}
              <path
                d="M 26 0 C 12.745 0, 2 10.745, 2 24 L 0 24 L 0 0 Z"
                fill="#0d0d14"
              />
              {/* Outer specular border curve arriving exactly at the side wall at (2, 24) */}
              <path
                d="M 26 0 C 12.745 0, 2 10.745, 2 24"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            </svg>
          </motion.div>

          {/* Logo & Spin Transition */}
          <div className="flex items-center gap-3 pl-1 md:pl-2 pr-3 shrink-0">
            <motion.button
              id="header-logo-btn"
              onClick={() => handleTabClick("Home")}
              className="relative w-9 h-9 md:w-9.5 md:h-9.5 rounded-full bg-[#12121c]/90 border border-white/[0.14] flex items-center justify-center hover:bg-white/[0.14] hover:border-white/25 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_4px_14px_rgba(0,0,0,0.4)] group"
              animate={
                isScrolled
                  ? {
                      rotate: 360,
                      filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
                    }
                  : {
                      rotate: 0,
                      filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
                    }
              }
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              title="Abdulrahman Toor - Home"
            >
              <img
                src={logo1}
                alt="Abdulrahman Toor Logo"
                className="w-5 h-5 object-contain group-hover:scale-105 transition-transform"
              />
            </motion.button>
            <span
              onClick={() => handleTabClick("Home")}
              className="cursor-pointer hidden xl:inline text-xs font-semibold tracking-tight text-white/90 hover:text-white transition-colors"
            >
              Abdulrahman-T
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navGroups.map((group) =>
              group.tab ? (
                <button
                  key={group.label}
                  id={`nav-link-${group.label.toLowerCase()}`}
                  onClick={() => handleTabClick(group.tab)}
                  className={cn(
                    "relative px-3.5 py-1.5 text-[13px] font-medium tracking-tight rounded-full transition-all duration-200",
                    activeTab === group.tab
                      ? "text-white bg-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] border border-white/10"
                      : "text-white/65 hover:text-white hover:bg-white/[0.06]",
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
                    id={`nav-group-${group.label.toLowerCase()}`}
                    className={cn(
                      "relative px-3.5 py-1.5 text-[13px] font-medium tracking-tight rounded-full transition-all duration-200 flex items-center gap-1.5",
                      group.items.includes(activeTab)
                        ? "text-white bg-white/[0.1] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] border border-white/10"
                        : "text-white/65 hover:text-white hover:bg-white/[0.06]",
                    )}
                  >
                    {group.label}
                    <ChevronDown
                      size={13}
                      className={cn(
                        "transition-transform duration-300 opacity-60",
                        activeDropdown === group.label ? "rotate-180 text-white" : "",
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === group.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-52 z-50"
                      >
                        <div className="liquid-glass rounded-2xl p-1.5 flex flex-col gap-0.5 shadow-[0_24px_48px_rgba(0,0,0,0.85)] border border-white/[0.12]">
                          {group.items.map((item) => {
                            const tabInfo = tabs.find((t) => t.name === item);
                            const isActive = activeTab === item;
                            return (
                              <button
                                key={item}
                                id={`dropdown-item-${item.toLowerCase()}`}
                                onClick={() => handleTabClick(item)}
                                className={cn(
                                  "w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium tracking-tight rounded-xl transition-all text-left group/btn",
                                  isActive
                                    ? "bg-white/[0.12] text-white shadow-sm border border-white/10"
                                    : "text-white/70 hover:text-white hover:bg-white/[0.07]",
                                )}
                              >
                                <span
                                  className={cn(
                                    "transition-colors text-[14px]",
                                    isActive
                                      ? "text-indigo-400"
                                      : "text-white/50 group-hover/btn:text-white/90",
                                  )}
                                >
                                  {tabInfo?.icon}
                                </span>
                                <span className="flex-1 truncate">
                                  {item === "CaseStudies"
                                    ? "Case Studies"
                                    : item === "Apps"
                                    ? "INFNI-T' LABZ"
                                    : item === "Music"
                                    ? "AI Music"
                                    : item === "Blog"
                                    ? "My Blog"
                                    : item === "Feed"
                                    ? "Release Feed"
                                    : item === "Toolspedia"
                                    ? "Tools Pedia"
                                    : item === "Resources"
                                    ? "Free Resources"
                                    : tabInfo?.name || item}
                                </span>
                                {item === "Resources" && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/25 shrink-0">
                                    Soon
                                  </span>
                                )}
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

          {/* Right Action: Apple Pill CTA & Settings */}
          <div className="flex items-center gap-2 pl-2 md:pl-3 shrink-0">
            <button
              id="header-cta-hire-me"
              onClick={() => handleTabClick("Connect")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-black hover:bg-white/90 font-semibold text-xs tracking-tight rounded-full transition-all duration-200 shadow-[0_4px_16px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Hire Me</span>
              <ArrowUpRight size={13} className="text-black/70 stroke-[2.5]" />
            </button>

            <button
              id="header-settings-btn"
              onClick={() => setIsSettingsOpen(true)}
              className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all duration-200 flex items-center justify-center cursor-pointer shadow-sm"
              title="Preferences"
            >
              <Settings size={14} strokeWidth={1.35} />
            </button>

            {/* Mobile Menu Icon */}
            <button
              id="header-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(28px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[100] bg-[#050508]/90 backdrop-blur-3xl flex flex-col"
          >
            <div className="flex justify-between items-center p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img src={logo1} alt="Logo" className="w-6 h-6 object-contain" />
                <span className="font-semibold text-sm tracking-tight text-white">
                  Navigation
                </span>
              </div>
              <button
                id="close-mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-colors border border-white/10"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-6">
              {navGroups.map((group) => (
                <div key={group.label} className="flex flex-col gap-2.5">
                  <h3 className="text-white/40 text-[11px] font-mono uppercase tracking-wider pl-1">
                    {group.label}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {group.tab ? (
                      <button
                        id={`mobile-nav-${group.label.toLowerCase()}`}
                        onClick={() => handleTabClick(group.tab)}
                        className={cn(
                          "flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left font-medium text-xs tracking-tight transition-all border",
                          activeTab === group.tab
                            ? "bg-white/[0.12] border-white/20 text-white shadow-sm"
                            : "bg-white/[0.03] border-white/5 text-white/70 hover:bg-white/[0.08] hover:text-white",
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
                            id={`mobile-nav-${item.toLowerCase()}`}
                            onClick={() => handleTabClick(item)}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2.5 rounded-xl text-left font-medium text-xs tracking-tight transition-all border",
                              isActive
                                ? "bg-white/[0.12] border-white/20 text-white shadow-sm"
                                : "bg-white/[0.03] border-white/5 text-white/70 hover:bg-white/[0.08] hover:text-white",
                            )}
                          >
                            <span
                              className={cn(
                                "shrink-0",
                                isActive ? "text-indigo-400" : "text-white/40",
                              )}
                            >
                              {tabInfo?.icon}
                            </span>
                            <span className="truncate">
                              {item === "CaseStudies"
                                ? "Case Studies"
                                : item === "Apps"
                                ? "INFNI-T' LABZ"
                                : item === "Music"
                                ? "AI Music"
                                : item === "Blog"
                                ? "My Blog"
                                : item === "Feed"
                                ? "Release Feed"
                                : item === "Toolspedia"
                                ? "Tools Pedia"
                                : item === "Resources"
                                ? "Free Resources"
                                : tabInfo?.name || item}
                            </span>
                            {item === "Resources" && (
                              <span className="text-[8px] font-mono px-1 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/25 shrink-0 ml-auto">
                                Soon
                              </span>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-white/10">
              <button
                id="mobile-hire-me-cta"
                onClick={() => handleTabClick("Connect")}
                className="w-full py-3 bg-white text-black font-semibold text-xs tracking-tight rounded-xl hover:bg-neutral-200 transition-colors shadow-lg"
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

