import React from "react";
import { ArrowUpRight, Sparkles, Layers, Send, Download } from "lucide-react";
import { ASSET_LINKS } from "../../constants/assets";
import { cn } from "../../lib/utils";

const logo1 = ASSET_LINKS.logo1Svg;

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

  const menuLinks = [
    { name: "Home", tab: "Home" },
    { name: "Flagships", tab: "Flagships" },
    { name: "Projects", tab: "Projects" },
    { name: "Store", tab: "Store" },
    { name: "Services", tab: "Services" },
  ];

  const navigationLinks = [
    { name: "About", tab: "About" },
    { name: "Connect", tab: "Connect" },
    { name: "Reviews", tab: "Reviews" },
    { name: "Journal", tab: "Journal" },
    { name: "Blog", tab: "Blog" },
  ];

  const moreProductsLinks = [
    { name: "Vortex Engine", tab: "Vortex" },
    { name: "Infni-T' Labz", tab: "Apps" },
    { name: "Tools Pedia", tab: "Toolspedia" },
    { name: "Prompt Matrix", tab: "Prompts" },
    { name: "AI Academy", tab: "Academy" },
    { name: "AI Music", tab: "Music" },
    { name: "Release Feed", tab: "Feed" },
  ];

  return (
    <footer
      id="main-studio-footer"
      className="relative w-full border-t border-white/[0.08] bg-[#050508] overflow-hidden pt-16 md:pt-20 pb-16 mt-24"
    >
      {/* Dynamic SVG Filter for Crisp Pixelation */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="pixelate-b-w" x="0%" y="0%" width="100%" height="100%">
          {/* Grayscale transformation */}
          <feColorMatrix
            type="matrix"
            values="0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0    0    0    1 0"
          />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.4" />
            <feFuncG type="linear" slope="1.4" />
            <feFuncB type="linear" slope="1.4" />
          </feComponentTransfer>
        </filter>
      </svg>

      <div
        className={cn(
          "relative z-10 mx-auto w-full",
          activeTab === "Home" || activeTab === "Vortex"
            ? "max-w-[1400px] px-6 md:px-12"
            : "max-w-5xl px-6",
        )}
      >
        {/* Top Editorial Grid (Screen.Movie Style Hierarchy) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 mb-16 md:mb-24">
          {/* Left Hero Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Brand Title */}
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center p-1">
                  <img
                    src={logo1}
                    alt="Abdulrahman Logo"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-semibold text-sm text-white tracking-tight">
                  Abdulrahman-T
                </h3>
              </div>

              {/* Tagline */}
              <h4 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug">
                Full-Stack Systems & Next-Gen Digital Products
              </h4>

              {/* Sub-description */}
              <p className="text-white/50 text-xs md:text-sm font-normal leading-relaxed max-w-sm">
                Architecting autonomous workflows, scalable web platforms, and bespoke creative engineering.
              </p>
            </div>

            {/* Apple Style Download / Connect Button */}
            <div className="pt-2">
              <button
                id="footer-start-project-btn"
                onClick={() => handleNavClick("Connect")}
                className="inline-flex items-center gap-2 py-2.5 px-5 rounded-full bg-white text-black hover:bg-neutral-200 font-medium text-xs tracking-tight transition-all duration-200 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Start a Project</span>
                <ArrowUpRight size={13} className="text-black/70 stroke-[2]" />
              </button>
            </div>

            {/* Copyright & Maker Credit */}
            <div className="space-y-1 pt-4 text-xs text-white/40 font-mono">
              <p>© {currentYear} Abdulrahman-T - All rights reserved</p>
              <p className="text-white/60">Built with 🖤 by Abdulrahman-T</p>
            </div>
          </div>

          {/* Right Navigation Columns (Screen.movie Layout) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Menu */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-white tracking-tight">
                Menu
              </h5>
              <ul className="space-y-2">
                {menuLinks.map((item) => (
                  <li key={item.name}>
                    <button
                      id={`footer-nav-${item.tab.toLowerCase()}`}
                      onClick={() => handleNavClick(item.tab)}
                      className="text-xs text-white/50 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Navigation */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-white tracking-tight">
                Navigation
              </h5>
              <ul className="space-y-2">
                {navigationLinks.map((item) => (
                  <li key={item.name}>
                    <button
                      id={`footer-nav-${item.tab.toLowerCase()}`}
                      onClick={() => handleNavClick(item.tab)}
                      className="text-xs text-white/50 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: More Products */}
            <div className="space-y-3">
              <h5 className="text-xs font-semibold text-white tracking-tight">
                More products
              </h5>
              <ul className="space-y-2">
                {moreProductsLinks.map((item) => (
                  <li key={item.name}>
                    <button
                      id={`footer-nav-${item.tab.toLowerCase()}`}
                      onClick={() => handleNavClick(item.tab)}
                      className="text-xs text-white/50 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Screen.Movie Atmospheric Landscape Graphic & Large Watermark Layer */}
      <div className="relative w-full overflow-hidden pointer-events-none select-none mt-8 -mb-16">
        {/* Large Watermark Typography */}
        <div
          aria-hidden="true"
          className="w-full flex justify-center text-center overflow-hidden mb-[-4vw] sm:mb-[-3vw] md:mb-[-2vw] relative z-0"
        >
          <span className="text-[clamp(3.5rem,13vw,190px)] font-[900] tracking-[-0.04em] text-white/[0.08] uppercase leading-none whitespace-nowrap">
            ABDULRAHMAN-T
          </span>
        </div>

        {/* Footer Background Image with Black & White Pixel Filter and Low Opacity Blending */}
        <div className="relative w-full h-[200px] sm:h-[260px] md:h-[340px] lg:h-[400px] overflow-hidden z-10">
          <img
            src="/footer-image.avif"
            alt="Abdulrahman-T Landscape"
            className="w-full h-full object-cover object-bottom filter grayscale contrast-125 brightness-90 opacity-80"
            style={{
              filter: "url(#pixelate-b-w) grayscale(100%) contrast(130%) brightness(85%)",
              imageRendering: "pixelated",
            }}
          />

          {/* Micro Pixel Grid Screen Pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }}
          />

          {/* Smooth Fade to Top & Bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-[#050508] opacity-90" />
        </div>
      </div>
    </footer>
  );
};

