import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Sparkles,
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
}

export const HomeServicesSection: React.FC<HomeServicesSectionProps> = ({ onNavigateToServices }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-28 max-w-[1040px] mx-auto px-4 md:px-6 relative">
      
      {/* Apple HIG Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 md:mb-14 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/70 font-mono text-[11px] mb-3.5 tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
          <span>Capabilities &amp; Services</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
          Engineered for Velocity. Crafted for Impact.
        </h2>
        <p className="text-white/60 text-sm md:text-base leading-relaxed">
          Full-stack architectural precision, autonomous AI integration, bespoke UI/UX, and high-conversion brand mechanics.
        </p>
      </div>

      {/* 
        Horizontal List Layout (1 Column x 6 Rows) 
        With Apple HIG Solid Liquid-Color Background Fill on Hover & Accordion Unfurl for Description + Starting Price
      */}
      <div className="border border-white/20 rounded-3xl bg-black/95 backdrop-blur-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] divide-y divide-white/15 relative z-10">
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

                    <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2 truncate">
                      <span>{s.title}</span>
                      <ArrowUpRight 
                        size={15} 
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
      </div>

      {/* Explore Full Services Button */}
      <div className="mt-10 text-center">
        <button
          id="all-services-cta-btn"
          onClick={onNavigateToServices}
          className="inline-flex items-center gap-2 py-3 px-7 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-tight transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Explore Complete Services &amp; Roadmaps</span>
          <ArrowRight size={14} />
        </button>
      </div>

    </section>
  );
};
