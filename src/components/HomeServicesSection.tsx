import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  FileText,
  Layers,
} from "lucide-react";

// True Transparent PNG 3D Shapes
import shapeGreenFluid from "../assets/images/shape_green_fluid_1789329793443.png";
import shapeOrangeRibbed from "../assets/images/shape_orange_ribbed_1789327939534.png";
import shapeYellowCrystal from "../assets/images/shape_yellow_crystal_1789327951530.png";
import shapeMagentaLoop from "../assets/images/shape_magenta_loop_1789327963097.png";
import shapePurpleBlob from "../assets/images/shape_purple_blob_1789329803990.png";
import shapeBlueCloud from "../assets/images/shape_blue_cloud_1789327973174.png";

interface HomeServiceItem {
  id: string;
  tag: string;
  dotColor: string;
  title: string;
  startingPrice: string;
  ctaText: string;
  image: string;
  desc: string;
  accentBg: string;      // Gentle solid tint (Apple HIG style)
  accentBorder: string;
  accentText: string;
}

const HOME_SERVICES: HomeServiceItem[] = [
  {
    id: "home-serv-web",
    tag: "WEB DESIGN",
    dotColor: "#22c55e",
    title: "Web & SaaS Interfaces",
    startingPrice: "$2,800",
    ctaText: "Launch Web Build",
    image: shapeGreenFluid,
    desc: "Custom web applications and interactive SaaS platforms engineered with Apple HIG fluid UX, responsive physics, and clean component architecture.",
    accentBg: "rgba(34, 197, 94, 0.12)",
    accentBorder: "rgba(34, 197, 94, 0.35)",
    accentText: "#4ade80",
  },
  {
    id: "home-serv-ai",
    tag: "AI AUTOMATION",
    dotColor: "#f97316",
    title: "Autonomous AI Agents",
    startingPrice: "$2,400",
    ctaText: "Deploy Agents",
    image: shapeOrangeRibbed,
    desc: "Custom autonomous agent pipelines and n8n workflows that handle heavy operations, multi-tool actions, and CRM synchronizations without manual effort.",
    accentBg: "rgba(249, 115, 22, 0.12)",
    accentBorder: "rgba(249, 115, 22, 0.35)",
    accentText: "#fb923c",
  },
  {
    id: "home-serv-strategy",
    tag: "AI STRATEGY",
    dotColor: "#eab308",
    title: "Architecture & Roadmap",
    startingPrice: "$1,600",
    ctaText: "Get AI Roadmap",
    image: shapeYellowCrystal,
    desc: "Cohesive AI blueprints, cost-optimized token economics, private RAG security frameworks, and de-risked engineering specifications.",
    accentBg: "rgba(234, 179, 8, 0.12)",
    accentBorder: "rgba(234, 179, 8, 0.35)",
    accentText: "#facc15",
  },
  {
    id: "home-serv-growth",
    tag: "GROWTH ENGINES",
    dotColor: "#ec4899",
    title: "Growth & Acquisition",
    startingPrice: "$2,200",
    ctaText: "Scale Pipeline",
    image: shapeMagentaLoop,
    desc: "High-converting acquisition funnels with automated lead enrichment, real-time qualification triggers, and instant notification bots.",
    accentBg: "rgba(236, 72, 153, 0.12)",
    accentBorder: "rgba(236, 72, 153, 0.35)",
    accentText: "#f472b6",
  },
  {
    id: "home-serv-backend",
    tag: "BACKEND APIS",
    dotColor: "#a855f7",
    title: "High-Throughput APIs",
    startingPrice: "$3,400",
    ctaText: "Engineer Backend",
    image: shapePurpleBlob,
    desc: "Zero-downtime REST/GraphQL APIs, asynchronous background worker queues (BullMQ/Redis), and database optimizations engineered for high scale.",
    accentBg: "rgba(168, 85, 247, 0.12)",
    accentBorder: "rgba(168, 85, 247, 0.35)",
    accentText: "#c084fc",
  },
  {
    id: "home-serv-alacarte",
    tag: "À LA CARTE",
    dotColor: "#3b82f6",
    title: "Bespoke Sprints",
    startingPrice: "$1,200",
    ctaText: "Book Fast Sprint",
    image: shapeBlueCloud,
    desc: "Targeted engineering sprints for specialized technical needs, security audits, database refactoring, payment gateways, and rapid performance remediation.",
    accentBg: "rgba(59, 130, 246, 0.12)",
    accentBorder: "rgba(59, 130, 246, 0.35)",
    accentText: "#60a5fa",
  },
];

interface HomeServicesSectionProps {
  onNavigateToServices: () => void;
  onNavigateToConnect?: () => void;
  isLoading?: boolean;
}

export const HomeServicesSection: React.FC<HomeServicesSectionProps> = ({ 
  onNavigateToServices,
  onNavigateToConnect,
  isLoading: externalLoading,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [internalLoading, setInternalLoading] = useState(true);

  useEffect(() => {
    // Brief initial mount shimmer to guarantee immediate responsive feedback
    const timer = setTimeout(() => {
      setInternalLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const isLoading = externalLoading ?? internalLoading;

  const handleCustomQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onNavigateToConnect) {
      onNavigateToConnect();
    } else {
      onNavigateToServices();
    }
  };

  return (
    <section className="py-20 md:py-32 max-w-[1060px] mx-auto px-4 md:px-6 relative border-t border-white/[0.08]">
      
      {/* Apple HIG Section Header - Enhanced Typography & Stature */}
      <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/70 font-mono text-xs mb-4 tracking-wider uppercase shadow-inner">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span>Capabilities &amp; Services</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.08]">
          Engineered for Velocity. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60">
            Crafted for Impact.
          </span>
        </h2>
        <p className="text-white/65 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
          Full-stack architectural precision, autonomous AI integration, bespoke UI/UX, and high-conversion brand mechanics.
        </p>
      </div>

      {/* 
        Horizontal List Layout (1 Column x 6 Rows) 
        With Skeleton Loading State + Apple HIG Solid Liquid-Color Background Fill on Hover & Accordion Unfurl
      */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="services-skeleton-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="border border-white/10 rounded-3xl bg-[#0c0c14]/90 backdrop-blur-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] divide-y divide-white/5 relative z-10"
          >
            {[
              { color: "rgba(34, 197, 94, 0.15)", border: "rgba(34, 197, 94, 0.3)" },
              { color: "rgba(249, 115, 22, 0.15)", border: "rgba(249, 115, 22, 0.3)" },
              { color: "rgba(234, 179, 8, 0.15)", border: "rgba(234, 179, 8, 0.3)" },
              { color: "rgba(236, 72, 153, 0.15)", border: "rgba(236, 72, 153, 0.3)" },
              { color: "rgba(168, 85, 247, 0.15)", border: "rgba(168, 85, 247, 0.3)" },
              { color: "rgba(59, 130, 246, 0.15)", border: "rgba(59, 130, 246, 0.3)" },
            ].map((theme, idx) => (
              <div
                key={`service-skeleton-${idx}`}
                className="p-5 sm:p-6 md:p-7 relative overflow-hidden"
              >
                {/* Theme matched soft ambient pulse */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none animate-pulse"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${theme.color}, transparent)`,
                    animationDuration: "2s",
                  }}
                />

                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: Shape + Tag + Title placeholders */}
                  <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                    {/* Shape Box Skeleton with thematic glow */}
                    <div 
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shrink-0 animate-pulse border"
                      style={{
                        backgroundColor: theme.color,
                        borderColor: theme.border,
                      }}
                    />
                    
                    {/* Tag & Title Skeletons */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-2 h-2 rounded-[2px] shrink-0" 
                          style={{ backgroundColor: theme.border }}
                        />
                        <div className="h-3 w-24 rounded bg-white/[0.08] animate-pulse" />
                      </div>
                      <div className="h-6 w-48 sm:w-72 rounded bg-white/[0.1] animate-pulse" />
                    </div>
                  </div>

                  {/* Right: CTA Button Skeleton */}
                  <div className="pt-2 sm:pt-0 shrink-0">
                    <div className="h-9 w-36 rounded-xl bg-white/[0.05] border border-white/[0.08] animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="services-content-container"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="border border-white/20 rounded-3xl bg-black/95 backdrop-blur-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] divide-y divide-white/15 relative z-10"
          >
            {HOME_SERVICES.map((s) => {
              const isHovered = hoveredId === s.id;

              return (
                <div
                  key={s.id}
                  onMouseEnter={() => setHoveredId(s.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={onNavigateToServices}
                  className="group relative p-5 sm:p-6 md:p-7 cursor-pointer select-none overflow-hidden transition-colors duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    backgroundColor: isHovered ? s.accentBg : "transparent",
                  }}
                >
                  {/* Subtle Specular Top Hairline on Hover */}
                  <div 
                    className="absolute top-0 inset-x-0 h-px transition-opacity duration-300 pointer-events-none"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      background: `linear-gradient(90deg, transparent, ${s.accentBorder}, transparent)`
                    }}
                  />

                  {/* 1. Default Compact State: Tag, Left 3D Icon, Title, CTA */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Left Side: 3D Transparent Shape + Tag & Title */}
                    <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                      
                      {/* Left-Aligned Transparent PNG 3D Shape */}
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                        <motion.div
                          className="relative w-full h-full flex items-center justify-center"
                          animate={{
                            scale: isHovered ? 1.15 : 1,
                            y: isHovered ? -2 : 0,
                            rotate: isHovered ? 3 : 0,
                          }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <img
                            src={s.image}
                            alt={s.title}
                            className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]"
                            loading="lazy"
                          />
                        </motion.div>
                      </div>

                      {/* Title & Category Tag */}
                      <div className="text-left min-w-0">
                        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase font-semibold text-white/70 mb-1">
                          <span
                            className="w-2 h-2 rounded-[2px] shrink-0"
                            style={{ backgroundColor: s.dotColor }}
                          />
                          <span>{s.tag}</span>
                        </div>

                        <h3 className="text-[26px] leading-tight font-bold tracking-tight text-white flex items-center gap-2 truncate">
                          <span>{s.title}</span>
                          <ArrowUpRight 
                            size={17} 
                            className={`transition-all duration-300 shrink-0 ${
                              isHovered 
                                ? "text-white translate-x-0.5 -translate-y-0.5 opacity-100" 
                                : "text-white/30 opacity-60"
                            }`} 
                          />
                        </h3>
                      </div>
                    </div>

                    {/* Right Side: Creative Action CTA */}
                    <div className="flex items-center justify-end gap-3 shrink-0 pt-2 sm:pt-0">
                      <div
                        className="px-3.5 py-2 rounded-xl font-mono text-xs font-semibold transition-all duration-300 flex items-center gap-2 shadow-sm border"
                        style={{
                          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.04)",
                          borderColor: isHovered ? s.accentBorder : "rgba(255, 255, 255, 0.1)",
                          color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.8)",
                        }}
                      >
                        <span>{s.ctaText}</span>
                        <span className={`text-sm transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}>→</span>
                      </div>
                    </div>

                  </div>

                  {/* 
                    2. Unfurl Accordion on Hover:
                    Reveals Description and Starting Investment dynamically with smooth height & opacity transitions
                  */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden relative z-10"
                      >
                        <div className="pt-3.5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          
                          {/* Description */}
                          <p className="text-white/75 text-xs sm:text-sm leading-relaxed font-normal max-w-2xl text-left">
                            {s.desc}
                          </p>

                          {/* Prominent Starting Investment */}
                          <div className="flex items-baseline md:flex-col md:items-end gap-2 md:gap-0 shrink-0">
                            <span className="text-[10px] font-mono uppercase text-white/50">Starting Investment</span>
                            <span 
                              className="text-base sm:text-lg font-bold font-mono tracking-tight"
                              style={{ color: "#ffffff" }}
                            >
                              {s.startingPrice}
                            </span>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions: Explore Full Services & Get a Custom Quote */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
        <div className="relative group/tip w-full sm:w-auto">
          <button
            id="all-services-cta-btn"
            onClick={onNavigateToServices}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-white text-black hover:bg-neutral-100 font-semibold text-xs tracking-tight transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.18)] hover:scale-105 active:scale-95 cursor-pointer hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.6),0_8px_25px_rgba(255,255,255,0.25)]"
          >
            <span>Explore All Services &amp; Roadmaps</span>
            <ArrowRight size={14} />
          </button>
          {/* Apple HIG Floating Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#161622]/95 border border-white/15 text-white/90 text-[10px] font-mono rounded-full backdrop-blur-md shadow-xl opacity-0 group-hover/tip:opacity-100 transition-all pointer-events-none whitespace-nowrap translate-y-1 group-hover/tip:translate-y-0 duration-200 z-30">
            <span>Browse Full Capabilities Catalog</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#161622] border-r border-b border-white/15 rotate-45" />
          </div>
        </div>

        <div className="relative group/tip w-full sm:w-auto">
          <button
            id="custom-quote-services-cta-btn"
            onClick={handleCustomQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-white font-semibold text-xs tracking-tight transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xl group hover:shadow-[inset_0_0_14px_rgba(255,255,255,0.12)]"
          >
            <FileText size={14} className="text-white/80 group-hover:text-white transition-colors stroke-[1.75]" />
            <span>Get a Custom Quote</span>
            <ArrowUpRight size={14} className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>
          {/* Apple HIG Floating Tooltip */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#161622]/95 border border-white/15 text-white/90 text-[10px] font-mono rounded-full backdrop-blur-md shadow-xl opacity-0 group-hover/tip:opacity-100 transition-all pointer-events-none whitespace-nowrap translate-y-1 group-hover/tip:translate-y-0 duration-200 z-30">
            <span>Calculate Fixed Scope Proposal</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#161622] border-r border-b border-white/15 rotate-45" />
          </div>
        </div>
      </div>

    </section>
  );
};
