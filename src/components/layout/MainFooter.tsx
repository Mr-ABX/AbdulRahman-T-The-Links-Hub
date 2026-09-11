import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Layers } from "lucide-react";
import { ASSET_LINKS } from "../../constants/assets";
import { cn } from "../../lib/utils";

const logo2 = ASSET_LINKS.logo2Svg;

interface MainFooterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isInImmersiveMode: boolean;
}

interface FluidPoint {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  decay: number;
}

const LiquidDuneHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<FluidPoint[]>([]);
  const lastMousePos = useRef<{ x: number; y: number } | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const animFrameId = useRef<number>(0);

  // Preload Dune Image
  useEffect(() => {
    const img = new Image();
    img.src = "/footer-image.avif";
    img.onload = () => {
      imageRef.current = img;
    };
  }, []);

  // Liquid trail interpolation helper
  const addFluidPoint = (x: number, y: number) => {
    const last = lastMousePos.current;
    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      // Interpolate points so rapid mouse movements form a continuous, connected liquid ribbon
      const steps = Math.min(10, Math.max(1, Math.floor(dist / 10)));
      for (let i = 1; i <= steps; i++) {
        pointsRef.current.push({
          x: last.x + (dx * i) / steps,
          y: last.y + (dy * i) / steps,
          radius: 75 + Math.random() * 20,
          alpha: 1.0,
          decay: 0.014, // ~1.2s viscous persistence
        });
      }
    } else {
      pointsRef.current.push({
        x,
        y,
        radius: 80,
        alpha: 1.0,
        decay: 0.014,
      });
    }
    lastMousePos.current = { x, y };
  };

  // Fluid canvas drawing and liquid animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const updateDimensions = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const render = () => {
      if (width === 0 || height === 0) {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const now = performance.now() * 0.001;
      const points = pointsRef.current;

      // Ambient idle liquid pulse: when user is not interacting, a gentle liquid wave rolls across the dune crest
      const ambientX = width * 0.5 + Math.sin(now * 0.75) * (width * 0.32);
      const ambientY = height * 0.58 + Math.cos(now * 1.1) * (height * 0.09);

      if (points.length > 0 || imageRef.current) {
        ctx.save();

        // 1. Draw Ambient Idle Liquid Stream
        const ambientRadius = 90 + Math.sin(now * 1.5) * 15;
        const ambientGrad = ctx.createRadialGradient(ambientX, ambientY, 0, ambientX, ambientY, ambientRadius);
        ambientGrad.addColorStop(0, "rgba(255, 255, 255, 0.45)");
        ambientGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.25)");
        ambientGrad.addColorStop(0.85, "rgba(255, 255, 255, 0.06)");
        ambientGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = ambientGrad;
        ctx.beginPath();
        ctx.arc(ambientX, ambientY, ambientRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Draw Interactive User Liquid Trail Points
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, `rgba(255, 255, 255, ${p.alpha * 0.95})`);
          grad.addColorStop(0.5, `rgba(255, 255, 255, ${p.alpha * 0.65})`);
          grad.addColorStop(0.85, `rgba(255, 255, 255, ${p.alpha * 0.2})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // 3. Connect consecutive points with viscous liquid strokes for zero gap
        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];
          const avgAlpha = (p1.alpha + p2.alpha) * 0.5;
          if (avgAlpha > 0.05) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${avgAlpha * 0.75})`;
            ctx.lineWidth = (p1.radius + p2.radius) * 0.85;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // 4. Reveal true color image exclusively through the liquid mask
        if (imageRef.current) {
          ctx.globalCompositeOperation = "source-in";
          const img = imageRef.current;
          const imgRatio = img.naturalWidth / img.naturalHeight;
          const canvasRatio = width / height;
          let drawW = width;
          let drawH = height;
          let offsetX = 0;
          let offsetY = 0;

          if (canvasRatio > imgRatio) {
            drawW = width;
            drawH = width / imgRatio;
            offsetX = 0;
            offsetY = height - drawH; // align object-bottom
          } else {
            drawH = height;
            drawW = height * imgRatio;
            offsetX = (width - drawW) / 2;
            offsetY = 0;
          }

          ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
          ctx.globalCompositeOperation = "source-over";
        }

        ctx.restore();
      }

      // Decay points
      for (let i = 0; i < points.length; i++) {
        points[i].radius += 0.45; // gentle fluid spread
        points[i].alpha -= points[i].decay;
      }
      pointsRef.current = points.filter((p) => p.alpha > 0);

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    addFluidPoint(e.clientX - rect.left, e.clientY - rect.top);
    if (!isInteracting) setIsInteracting(true);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    lastMousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    addFluidPoint(e.clientX - rect.left, e.clientY - rect.top);
    setIsInteracting(true);
  };

  const handleMouseLeave = () => {
    lastMousePos.current = null;
    setIsInteracting(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    addFluidPoint(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    if (!isInteracting) setIsInteracting(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => {
        lastMousePos.current = null;
        setIsInteracting(false);
      }}
      className="relative w-full h-[260px] sm:h-[340px] md:h-[440px] lg:h-[520px] xl:h-[600px] select-none mt-8 sm:mt-12 md:mt-16 overflow-hidden cursor-crosshair group"
    >
      {/* Background Watermark Typography - Anchored cleanly with zero clipping on any screen ratio */}
      <div className="absolute inset-x-0 top-3 sm:top-5 md:top-8 lg:top-10 flex items-center justify-center z-10 pointer-events-none px-3 sm:px-6">
        <span 
          className="text-[clamp(1.6rem,7.5vw,135px)] font-black tracking-tight text-white/[0.22] uppercase leading-none whitespace-nowrap block text-center select-none py-2"
          style={{
            textShadow: "0 0 40px rgba(0,0,0,0.9)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.25) 85%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.25) 85%, transparent 100%)",
          }}
        >
          ABDULRAHMAN-T
        </span>
      </div>

      {/* Layer 1: Base Living Liquid Obsidian Dunes (Breathes with continuous organic liquid undulation like hero rocks) */}
      <img
        src="/footer-image.avif"
        alt="Living Liquid Obsidian Dunes"
        style={{
          filter: "url(#dune-liquid-obsidian) contrast(1.18) brightness(0.9)",
        }}
        className="absolute inset-0 z-20 w-full h-full object-cover object-bottom mix-blend-lighten pointer-events-none opacity-85 transition-opacity duration-300"
      />

      {/* Subtle Halftone Matrix Grain Overlay echoing the obsidian monolith rocks */}
      <div
        className="absolute inset-0 z-22 opacity-25 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(192, 132, 252, 0.4) 1px, transparent 1px)",
          backgroundSize: "6px 6px",
        }}
      />

      {/* Layer 2: Interactive Viscous Liquid Color Trail with Turbulent Edge Displacement */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-25 w-full h-full pointer-events-none mix-blend-lighten"
        style={{
          filter: "url(#dune-interactive-liquid) brightness(1.12) saturate(1.2)",
        }}
      />

      {/* Minimal Discreet Liquid Indicator Badge */}
      <div className="absolute bottom-4 right-6 z-30 px-3 py-1 rounded-full bg-black/70 border border-purple-500/25 backdrop-blur-md text-[10px] font-mono tracking-widest text-white/50 uppercase pointer-events-none flex items-center gap-2 opacity-65 group-hover:opacity-100 transition-opacity">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
        <span>Liquid Obsidian // Dunes</span>
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
      {/* Dynamic SVG Liquid Glitch & Obsidian Displacement Filters */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        {/* Base Living Obsidian Dunes Liquid Undulation Filter */}
        <filter id="dune-liquid-obsidian" x="-10%" y="-10%" width="120%" height="120%">
          <feColorMatrix
            type="matrix"
            values="0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0    0    0    1 0"
          />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1.25" />
            <feFuncG type="linear" slope="1.25" />
            <feFuncB type="linear" slope="1.25" />
          </feComponentTransfer>
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.035" numOctaves="2" result="liquidNoise">
            <animate attributeName="baseFrequency" dur="10s" values="0.015 0.035; 0.025 0.06; 0.015 0.035" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="liquidNoise" scale="12" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Interactive Fluid Trail Liquid Edge Filter */}
        <filter id="dune-interactive-liquid" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025 0.05" numOctaves="2" result="fluidNoise">
            <animate attributeName="baseFrequency" dur="7s" values="0.025 0.05; 0.04 0.03; 0.025 0.05" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="fluidNoise" scale="18" xChannelSelector="R" yChannelSelector="G" />
        </filter>

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


