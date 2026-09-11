import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight, Layers } from "lucide-react";
import { ASSET_LINKS } from "../../constants/assets";
import { cn } from "../../lib/utils";

const logo2 = ASSET_LINKS.logo2Svg;

interface MainFooterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isInImmersiveMode: boolean;
}

const LiquidDuneHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values with liquid inertia
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { stiffness: 220, damping: 24, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 24, mass: 0.8 });

  const [pos, setPos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const unsubX = springX.on("change", (v) => setPos((prev) => ({ ...prev, x: Math.round(v) })));
    const unsubY = springY.on("change", (v) => setPos((prev) => ({ ...prev, y: Math.round(v) })));
    return () => {
      unsubX();
      unsubY();
    };
  }, [springX, springY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.jump(x);
    mouseY.jump(y);
    setPos({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    if (!isHovered) setIsHovered(true);
  };

  const maskStyle = isHovered && pos.x > -500
    ? {
        WebkitMaskImage: `radial-gradient(circle 260px at ${pos.x}px ${pos.y}px, black 0%, black 45%, rgba(0,0,0,0.35) 75%, transparent 100%)`,
        maskImage: `radial-gradient(circle 260px at ${pos.x}px ${pos.y}px, black 0%, black 45%, rgba(0,0,0,0.35) 75%, transparent 100%)`,
      }
    : {
        WebkitMaskImage: "radial-gradient(circle 0px at 0px 0px, transparent 100%)",
        maskImage: "radial-gradient(circle 0px at 0px 0px, transparent 100%)",
      };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsHovered(false)}
      className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[480px] xl:h-[560px] select-none mt-8 sm:mt-14 md:mt-20 overflow-hidden cursor-crosshair group"
    >
      {/* Background Watermark Typography - Layered behind the sand dunes */}
      <div className="absolute inset-x-0 top-[6%] sm:top-[10%] md:top-[12%] lg:top-[14%] -translate-y-[100px] flex items-center justify-center z-10 pointer-events-none px-4">
        <span 
          className="text-[clamp(2.2rem,9.5vw,170px)] font-extrabold tracking-tight text-white/30 uppercase leading-none whitespace-nowrap block text-center select-none"
        >
          ABDULRAHMAN-T
        </span>
      </div>

      {/* Layer 1: Base High-Contrast Monochrome / Pixelated Dunes */}
      <img
        src="/footer-image.avif"
        alt="Monochrome Desert Dunes"
        style={{ filter: "url(#pixelate-b-w) contrast(1.15) brightness(0.85)" }}
        className="absolute inset-0 z-20 w-full h-full object-cover object-bottom mix-blend-lighten pointer-events-none opacity-85 transition-opacity duration-300"
      />

      {/* Layer 2: True Color Neon Desert Dunes Revealed via Liquid Lens */}
      <div
        className="absolute inset-0 z-25 w-full h-full pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          ...maskStyle,
        }}
      >
        <img
          src="/footer-image.avif"
          alt="Neon Desert Dunes Revealed"
          className="w-full h-full object-cover object-bottom mix-blend-lighten filter brightness-110 saturate-125"
        />
      </div>

      {/* Optical Lens Rim & Golden Aura Indicator */}
      {isHovered && pos.x > -500 && (
        <div
          className="absolute z-30 pointer-events-none rounded-full transition-opacity duration-300"
          style={{
            width: 520,
            height: 520,
            left: pos.x - 260,
            top: pos.y - 260,
            background: "radial-gradient(circle, rgba(251,191,36,0.05) 0%, rgba(245,158,11,0.015) 60%, transparent 100%)",
            boxShadow: "inset 0 0 35px rgba(251,191,36,0.12), 0 0 45px rgba(245,158,11,0.15)",
            border: "1px solid rgba(251,191,36,0.22)",
          }}
        />
      )}

      {/* Minimal Discreet Exploration Hint Badge */}
      <div className="absolute bottom-4 right-6 z-30 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono tracking-widest text-white/50 uppercase pointer-events-none flex items-center gap-1.5 opacity-60 group-hover:opacity-90 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
        <span>Optical Lens // Dunes</span>
      </div>
    </div>
  );
};

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
      {/* Dynamic SVG Filter for Crisp Pixelation */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id="pixelate-b-w" x="0%" y="0%" width="100%" height="100%">
          <feColorMatrix
            type="matrix"
            values="0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0    0    0    1 0"
          />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.3" />
            <feFuncG type="linear" slope="1.3" />
            <feFuncB type="linear" slope="1.3" />
          </feComponentTransfer>
        </filter>
      </svg>

      <div
        className={cn(
          "relative z-10 mx-auto w-full",
          activeTab === "Home" || activeTab === "Vortex"
            ? "max-w-[1340px] px-6 sm:px-8 md:px-12"
            : "max-w-6xl px-6",
        )}
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

      {/* Cinematic Dune & Watermark Hero Display with Liquid Optical Lens Effect */}
      <LiquidDuneHero />
    </footer>
  );
};


