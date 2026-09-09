import React from "react";
import { ArrowUpRight, Heart, Sparkles, Send, Globe, Zap, Layers, Compass, Shield } from "lucide-react";
import { ASSET_LINKS } from "../../constants/assets";
import { cn } from "../../lib/utils";

const logo2 = ASSET_LINKS.logo2Svg;

interface MainFooterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isInImmersiveMode: boolean;
}

export const MainFooter = ({
  activeTab,
  setActiveTab,
  isInImmersiveMode,
}: MainFooterProps) => {
  if (isInImmersiveMode) return null;

  const currentYear = new Date().getFullYear();

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerGroups = [
    {
      title: "Platform",
      links: [
        { name: "Vortex", tab: "Vortex", badge: "Interactive" },
        { name: "Store", tab: "Store" },
        { name: "Links", tab: "Links" },
        { name: "Prompts", tab: "Prompts" },
        { name: "Apps", tab: "Apps", label: "Infni-T' Labz" },
        { name: "Toolspedia", tab: "Toolspedia" },
      ],
    },
    {
      title: "Work",
      links: [
        { name: "Flagships", tab: "Flagships", badge: "Featured" },
        { name: "Projects", tab: "Projects" },
        { name: "Services", tab: "Services" },
        { name: "Automation", tab: "Automation" },
      ],
    },
    {
      title: "Insights",
      links: [
        { name: "Journal", tab: "Journal" },
        { name: "Academy", tab: "Academy" },
        { name: "Music", tab: "Music", label: "AI Music" },
        { name: "Blog", tab: "Blog" },
        { name: "Feed", tab: "Feed" },
        { name: "Ebooks", tab: "Ebooks" },
      ],
    },
    {
      title: "About",
      links: [
        { name: "About", tab: "About" },
        { name: "Reviews", tab: "Reviews" },
        { name: "Connect", tab: "Connect", badge: "Hire Me" },
        { name: "Community", tab: "Community" },
      ],
    },
  ];

  return (
    <footer
      id="main-studio-footer"
      className="relative w-full border-t border-white/[0.08] bg-[#050508] overflow-hidden pt-16 md:pt-24 pb-12 mt-24 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]"
    >
      {/* Background Giant Subtle Watermark Branding ("ABDULRAHMAN" at 3% opacity) */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center text-center z-0 opacity-100"
      >
        <span className="text-[clamp(4.5rem,14vw,175px)] font-[900] tracking-[-0.04em] text-white/[0.03] uppercase leading-none whitespace-nowrap translate-y-[20%]">
          ABDULRAHMAN
        </span>
      </div>

      {/* Subtle Electric Purple Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-64 bg-purple-600/[0.04] blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-96 h-64 bg-indigo-600/[0.03] blur-[120px] pointer-events-none -z-10" />

      <div
        className={cn(
          "relative z-10 mx-auto w-full",
          activeTab === "Home" || activeTab === "Vortex"
            ? "max-w-[1400px] px-6 md:px-12"
            : "max-w-5xl px-6",
        )}
      >
        {/* Main 2-Column Section: Left Editorial + Right Pro Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* Left Column: Studio Identity & Mission Action Block */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              {/* Studio Logo & Name Badge */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center p-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]">
                  <img
                    src={logo2}
                    alt="Abdulrahman Logo"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-white tracking-tight leading-none">
                    Abdulrahman Toor
                  </h3>
                  <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-purple-400 mt-1">
                    Creative Technologist & SaaS Builder
                  </p>
                </div>
              </div>

              {/* Bold Editorial Headline (Supaste / CoolDock / Screen Movie Style) */}
              <h4 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight max-w-sm">
                Architecting the future. Built with purpose.
              </h4>

              {/* Concise Mission Description */}
              <p className="text-white/60 text-sm font-normal leading-relaxed max-w-sm">
                Empowering human connection and digital velocity through next-gen design systems, autonomous AI workflows, and bespoke web platforms.
              </p>
            </div>

            {/* Primary Action CTA Button & Status Badge */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <button
                  id="footer-start-project-btn"
                  onClick={() => handleNavClick("Connect")}
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-tight transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.18)] hover:scale-[1.02] active:scale-[0.98] group cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight
                    size={14}
                    className="text-black/70 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </button>

                <button
                  id="footer-explore-work-btn"
                  onClick={() => handleNavClick("Projects")}
                  className="inline-flex items-center gap-2 py-3 px-5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white/80 hover:text-white font-semibold text-xs tracking-tight transition-all border border-white/10 hover:border-white/20"
                >
                  <Layers size={13} className="text-white/50" />
                  <span>Explore Work</span>
                </button>
              </div>

              {/* System Live Operational Status */}
              <div className="flex items-center gap-2 text-[11px] font-mono text-white/40 pt-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>All Systems Operational // Available for Q3/Q4 Projects</span>
              </div>
            </div>
          </div>

          {/* Right Columns: Categorized Pro Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {footerGroups.map((group) => (
              <div key={group.title} className="flex flex-col space-y-4">
                <h5 className="text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-white/40">
                  {group.title}
                </h5>
                <ul className="flex flex-col space-y-2.5">
                  {group.links.map((link) => {
                    const isActive = activeTab === link.tab;
                    return (
                      <li key={link.name}>
                        <button
                          id={`footer-nav-${link.tab.toLowerCase()}`}
                          onClick={() => handleNavClick(link.tab)}
                          className={cn(
                            "group inline-flex items-center gap-1.5 text-xs font-medium tracking-tight transition-all text-left",
                            isActive
                              ? "text-white font-semibold"
                              : "text-white/60 hover:text-white",
                          )}
                        >
                          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                            {link.label || link.name}
                          </span>
                          {link.badge && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                              {link.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
          <div className="flex items-center gap-2">
            <span>© {currentYear} Abdulrahman Toor.</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1.5 text-white/60">
            <span>Built with</span>
            <Heart size={12} className="text-purple-400 fill-purple-400 inline mx-0.5" />
            <span>by Abdulrahman Toor</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
