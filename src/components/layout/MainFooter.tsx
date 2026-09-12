import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Layers } from "lucide-react";
import { ASSET_LINKS } from "../../constants/assets";
import { cn } from "../../lib/utils";
import { PixelDunes, DuneShaderStyle, DuneInteractionMode } from "./PixelDunes";

const logo2 = ASSET_LINKS.logo2Svg;

interface MainFooterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isInImmersiveMode: boolean;
  footerDuneShader?: DuneShaderStyle;
  footerPixelMode?: DuneInteractionMode;
  footerPixelSize?: number;
  footerPixelGlitch?: boolean;
  footerPixelMonochrome?: boolean;
}

export const MainFooter = ({
  activeTab,
  setActiveTab,
  isInImmersiveMode,
  footerDuneShader = "halftone",
  footerPixelMode = "lens",
  footerPixelSize = 12,
  footerPixelGlitch = false,
  footerPixelMonochrome = false,
}: MainFooterProps) => {
  if (isInImmersiveMode) return null;

  const currentYear = new Date().getFullYear();

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const platformLinks = [
    { name: "Vortex", tab: "Vortex", badge: "Interactive" },
    { name: "Store", tab: "Store" },
    { name: "Links", tab: "Links" },
    { name: "Prompts", tab: "Prompts" },
    { name: "Infni-T' Labz", tab: "Apps" },
    { name: "Toolspedia", tab: "Toolspedia" },
  ];

  const workLinks = [
    { name: "Flagships", tab: "Flagships", badge: "Featured" },
    { name: "Projects", tab: "Projects" },
    { name: "Services", tab: "Services" },
    { name: "Automation", tab: "Automation" },
  ];

  const insightsLinks = [
    { name: "Journal", tab: "Journal" },
    { name: "Academy", tab: "Academy" },
    { name: "Free Resources", tab: "Resources", badge: "Coming Soon" },
    { name: "AI Music", tab: "Music" },
    { name: "Blog", tab: "Blog" },
    { name: "Feed", tab: "Feed" },
    { name: "Ebooks", tab: "Ebooks" },
  ];

  const aboutLinks = [
    { name: "About", tab: "About" },
    { name: "Reviews", tab: "Reviews" },
    { name: "Connect", tab: "Connect", badge: "Hire Me" },
    { name: "Community", tab: "Community" },
  ];

  return (
    <footer
      id="main-studio-footer"
      className="relative w-full border-t border-white/[0.08] bg-[#050508] overflow-hidden pt-16 md:pt-24 pb-0 mt-28"
    >
      <div
        className="relative z-10 mx-auto w-full max-w-[1380px] px-6 sm:px-8 md:px-12"
      >
        {/* Top Section: Left Branding & Right 4 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column (Brand & Bio & CTAs & Copyright) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Identity & Badges */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[14px] bg-[#12121c]/90 border border-white/[0.14] flex items-center justify-center p-2 shrink-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_4px_16px_rgba(0,0,0,0.5)]">
                  <img
                    src={logo2}
                    alt="Abdulrahman Logo"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white tracking-[0.12em] uppercase font-mono">
                    ABDULRAHMAN-T
                  </h3>
                  <p className="text-[9px] text-white/40 font-mono tracking-[0.15em] uppercase">
                    CREATIVE TECHNOLOGIST &amp; SAAS BUILDER
                  </p>
                </div>
              </div>

              {/* High-Impact Headline */}
              <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-[1.15]">
                Architecting the future. Built with purpose.
              </h4>

              {/* Sub-description */}
              <p className="text-white/60 text-xs sm:text-sm font-normal leading-relaxed max-w-md">
                Empowering human connection and digital velocity through next-gen design systems, autonomous AI workflows, and bespoke web platforms.
              </p>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                id="footer-start-project-btn"
                onClick={() => handleNavClick("Connect")}
                className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-tight transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={14} strokeWidth={2} />
              </button>

              <button
                id="footer-explore-work-btn"
                onClick={() => handleNavClick("Projects")}
                className="inline-flex items-center gap-2 py-2.5 px-4.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white/90 font-medium text-xs tracking-tight transition-all duration-200 cursor-pointer"
              >
                <Layers size={13} strokeWidth={1.35} />
                <span>Explore Work</span>
              </button>
            </div>

            {/* Copyright Info placed cleanly underneath buttons without operational status */}
            <div className="pt-2 text-xs font-mono text-white/35 space-y-0.5">
              <p>© {currentYear} Abdulrahman-T. All rights reserved.</p>
              <p className="text-white/45">Crafted with precision &amp; intention.</p>
            </div>
          </div>

          {/* Right Navigation Columns (4 Columns: Platform, Work, Insights, About) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pt-2">
            {/* Column 1: Platform */}
            <div className="space-y-3.5">
              <h5 className="text-[11px] font-mono font-semibold text-[#f2f2f2] uppercase tracking-[0.16em]">
                PLATFORM
              </h5>
              <ul className="space-y-2.5">
                {platformLinks.map((item) => (
                  <li key={item.name}>
                    <button
                      id={`footer-nav-${item.tab.toLowerCase()}`}
                      onClick={() => handleNavClick(item.tab)}
                      className="group inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono uppercase bg-white/[0.08] text-white/60 group-hover:bg-white/15 group-hover:text-white transition-colors">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Work */}
            <div className="space-y-3.5">
              <h5 className="text-[11px] font-mono font-semibold text-[#f2f2f2] uppercase tracking-[0.16em]">
                WORK
              </h5>
              <ul className="space-y-2.5">
                {workLinks.map((item) => (
                  <li key={item.name}>
                    <button
                      id={`footer-nav-${item.tab.toLowerCase()}`}
                      onClick={() => handleNavClick(item.tab)}
                      className="group inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono uppercase bg-white/[0.08] text-white/60 group-hover:bg-white/15 group-hover:text-white transition-colors">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Insights */}
            <div className="space-y-3.5">
              <h5 className="text-[11px] font-mono font-semibold text-[#f2f2f2] uppercase tracking-[0.16em]">
                INSIGHTS
              </h5>
              <ul className="space-y-2.5">
                {insightsLinks.map((item) => (
                  <li key={item.name}>
                    <button
                      id={`footer-nav-${item.tab.toLowerCase()}`}
                      onClick={() => handleNavClick(item.tab)}
                      className="text-xs text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: About */}
            <div className="space-y-3.5">
              <h5 className="text-[11px] font-mono font-semibold text-[#f2f2f2] uppercase tracking-[0.16em]">
                ABOUT
              </h5>
              <ul className="space-y-2.5">
                {aboutLinks.map((item) => (
                  <li key={item.name}>
                    <button
                      id={`footer-nav-${item.tab.toLowerCase()}`}
                      onClick={() => handleNavClick(item.tab)}
                      className="group inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      <span>{item.name}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono uppercase bg-white/[0.08] text-white/60 group-hover:bg-white/15 group-hover:text-white transition-colors">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Dune & Watermark Hero Display (Matching User Request) */}
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[480px] xl:h-[560px] select-none mt-8 sm:mt-14 md:mt-20 pointer-events-none">
        {/* Background Watermark Typography - Layered behind the sand dunes */}
        <div className="absolute inset-x-0 top-[6%] sm:top-[10%] md:top-[12%] lg:top-[14%] -translate-y-[100px] flex items-center justify-center z-10 pointer-events-none px-4">
          <span 
            className="text-[clamp(2.2rem,9.5vw,170px)] font-extrabold tracking-tight text-white/30 uppercase leading-none whitespace-nowrap block text-center select-none"
          >
            ABDULRAHMAN-T
          </span>
        </div>

        {/* Glowing Neon Desert Dunes Layer with Smart Pixel Effect - Masked strictly to dunes */}
        <div className="relative z-20 w-full h-full pointer-events-auto">
          <PixelDunes
            imageSrc="/footer-image.avif"
            shaderStyle={footerDuneShader}
            pixelMode={footerPixelMode}
            pixelSize={footerPixelSize}
            enableGlitch={footerPixelGlitch}
            monochrome={footerPixelMonochrome}
          />
        </div>
      </div>
    </footer>
  );
};


