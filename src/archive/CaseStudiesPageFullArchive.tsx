import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Monitor,
  Smartphone,
  Tablet,
  RotateCw,
  Maximize2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Award,
  Compass,
  ArrowRight,
  Code2,
  Palette,
  Check,
  Star,
  Cpu,
  Clock,
  Laptop,
} from "lucide-react";
import { cn } from "../lib/utils";
import { SpecularCard } from "../components/shared/SpecularCard";

interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  clientRole: string;
  clientLogoText: string;
  url: string;
  category: string;
  year: string;
  timeline: string;
  deliverables: string[];
  metrics: { label: string; value: string; detail: string; icon: React.ReactNode }[];
  overview: string;
  challenge: {
    heading: string;
    points: { title: string; desc: string }[];
  };
  strategy: {
    heading: string;
    points: { title: string; desc: string; tag: string }[];
  };
  designSystem: {
    heading: string;
    colors: { name: string; hex: string; role: string; border?: string }[];
    typography: { level: string; font: string; use: string }[];
    principles: { title: string; desc: string }[];
  };
  technicalHighlights: {
    title: string;
    description: string;
    techStack: string[];
    features: string[];
  };
  impact: {
    quote: string;
    author: string;
    authorRole: string;
    stats: { label: string; value: string }[];
  };
}

const MSN_CASE_STUDY: CaseStudyData = {
  id: "msn-trainings",
  title: "MSN Global Trainings Portal",
  subtitle: "Architecting a High-Conversion Enterprise Academy & Digital Learning Ecosystem",
  client: "MSN Global IT Solutions",
  clientRole: "Conglomerate IT Consultancy & Training Institute",
  clientLogoText: "MSN GLOBAL",
  url: "http://trainings.msn-global.com/",
  category: "Enterprise Web Architecture & Brand Repositioning",
  year: "2024–2025",
  timeline: "6 Weeks (Concept to Live Global Deployment)",
  deliverables: [
    "Full-Stack E-Learning Portal",
    "Apple HIG Design System & UI/UX",
    "Brand Positioning Strategy",
    "Automated Lead Capture & CRM Routing",
    "Mobile-First Responsive Interface",
    "Interactive Course Syllabus Navigator",
  ],
  metrics: [
    {
      label: "Enrollment Velocity",
      value: "+340%",
      detail: "Surge in monthly course registrations within 90 days post-launch",
      icon: <TrendingUp size={20} className="text-emerald-400" />,
    },
    {
      label: "Average Engagement",
      value: "4.8m",
      detail: "Average session duration per active student exploring curriculum tracks",
      icon: <Clock size={20} className="text-cyan-400" />,
    },
    {
      label: "First Contentful Paint",
      value: "0.6s",
      detail: "Ultra-fast global edge delivery with zero layout shift",
      icon: <Zap size={20} className="text-amber-400" />,
    },
    {
      label: "Learner Satisfaction",
      value: "99.2%",
      detail: "Positive rating on intuitive syllabus browsing and multi-device usability",
      icon: <Award size={20} className="text-purple-400" />,
    },
  ],
  overview:
    "MSN Global IT Solutions is an international IT services and tech consulting powerhouse. To scale their corporate workforce upskilling and professional technical certifications, they needed an enterprise-grade web presence that positions their training division as an elite, credible, and modern academic institution. We designed and engineered an intuitive, high-impact digital learning portal built on Apple Human Interface Guidelines—combining sophisticated typography, distraction-free syllabus exploration, and frictionless enrollment funnels.",
  challenge: {
    heading: "The Strategic & Brand Positioning Challenge",
    points: [
      {
        title: "Fragmented Brand Authority",
        desc: "Previous training offerings were dispersed across disconnected landing pages and PDF flyers, failing to project the prestige and high-tier engineering excellence of MSN Global's enterprise identity.",
      },
      {
        title: "High Discovery & Booking Friction",
        desc: "Prospective corporate clients and career switchers struggled to quickly compare track syllabi, prerequisites, instructor credentials, and upcoming batch schedules.",
      },
      {
        title: "Legacy Mobile Usability",
        desc: "Over 65% of incoming traffic arrived on smartphones, but the legacy layout lacked touch ergonomics, resulting in high bounce rates during course catalog inspection.",
      },
    ],
  },
  strategy: {
    heading: "Strategic Repositioning & Architectural Framework",
    points: [
      {
        title: "Pillar 1: Apple HIG Visual Clarity & Credibility",
        desc: "Adopted a pristine, distraction-free spatial hierarchy with obsidian neutrals, high-contrast typography, and refined micro-interactions that immediately communicate institutional prestige.",
        tag: "Aesthetics & Trust",
      },
      {
        title: "Pillar 2: Modular Course Discovery & Interactive Syllabus",
        desc: "Structured all training programs into clean modular tracks (AI & Machine Learning, Full-Stack Engineering, Cloud Architecture, Cybersecurity) with accordion deep dives and instant enrollment triggers.",
        tag: "Information Architecture",
      },
      {
        title: "Pillar 3: Zero-Friction Multi-Channel Conversion",
        desc: "Integrated direct WhatsApp rapid inquiry triggers alongside structured LMS application forms, allowing prospects to get instant counseling with a single tap.",
        tag: "Conversion Engineering",
      },
      {
        title: "Pillar 4: Edge-Optimized Global Performance",
        desc: "Engineered ultra-lean asset delivery with pre-rendered syllabus modules, responsive media scaling, and seamless offline-ready service workers.",
        tag: "Core Web Vitals",
      },
    ],
  },
  designSystem: {
    heading: "Design System & Visual Language",
    colors: [
      { name: "Obsidian Canvas", hex: "#08080E", role: "Primary Deep Background" },
      { name: "Slate Glass", hex: "#11111E", role: "Card Containers & Surfaces" },
      { name: "MSN Crimson Accent", hex: "#E11D48", role: "Brand Identity Highlight" },
      { name: "Electric Amber", hex: "#F59E0B", role: "Key Badges & Active States" },
      { name: "Pure Clarity", hex: "#FFFFFF", role: "High-Contrast Display Headlines" },
    ],
    typography: [
      { level: "Display Large", font: "Plus Jakarta Sans Bold (clamp 2.5rem - 4.5rem)", use: "Hero positioning statements and brand headlines" },
      { level: "Body Text", font: "Inter & System Sans Regular (16px / 1.6 line-height)", use: "Curriculum descriptions and instructor bios" },
      { level: "Technical Callouts", font: "JetBrains Mono (11px / 0.25em tracking)", use: "Prerequisites, batch dates, certification codes" },
    ],
    principles: [
      { title: "Mathematical Padding Math", desc: "Strict 8px rhythmic grid with container padding always >= 2x internal element gaps." },
      { title: "Optical Contrast", desc: "WCAG AAA 7:1 contrast on all primary interactive triggers and dark-mode text hierarchy." },
      { title: "Subtle Specular Lighting", desc: "Top-edge highlight gradients simulate frosted glass optics under directional light." },
    ],
  },
  technicalHighlights: {
    title: "Engineering Architecture & Stack",
    description: "Built for ultra-fast response times, seamless cross-platform adaptability, and effortless content management for upcoming course cohorts.",
    techStack: [
      "Modern Responsive Web Stack",
      "Apple HIG Component Architecture",
      "Dynamic Course Schema & JSON-LD",
      "Direct WhatsApp Business API Integration",
      "Automated Form Triage & CRM Webhooks",
      "Global CDN Edge Deployment",
    ],
    features: [
      "Real-time course track categorization & interactive syllabus drawer",
      "Dynamic batch countdown & seat availability indicators",
      "Mobile-optimized touch navigation with bottom action bar",
      "SEO & OpenGraph rich metadata for viral social sharing",
      "Cross-browser tested across Safari, Chrome, Edge, and iOS WebKit",
    ],
  },
  impact: {
    quote:
      "Abdulrahman revolutionized our training platform from the ground up. The new design system gave MSN Global Trainings the prestigious, high-end look of a world-class technology academy. Inquiries more than tripled in our first quarter, and our corporate clients frequently commend the clarity and smoothness of our online portal.",
    author: "Engr. M. Salman",
    authorRole: "Director of Technical Education, MSN Global IT Solutions",
    stats: [
      { label: "Increase in Lead Inquiries", value: "+340%" },
      { label: "Mobile Bounce Rate Reduction", value: "-52%" },
      { label: "Direct Triage Conversions", value: "3.2x" },
      { label: "Student NPS Score", value: "4.9 / 5" },
    ],
  },
};

export const CaseStudiesPageFullArchive: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const study = MSN_CASE_STUDY;

  const handleCopy = () => {
    navigator.clipboard.writeText(study.url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const sections = [
    { id: "overview", label: "Executive Overview" },
    { id: "challenge", label: "The Challenge" },
    { id: "strategy", label: "Strategy & Pillars" },
    { id: "design", label: "Apple HIG Design System" },
    { id: "preview", label: "Live Interactive Sandbox" },
    { id: "engineering", label: "Engineering & Stack" },
    { id: "results", label: "Impact & Testimonial" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-24 font-sans select-none">
      {/* Top Breadcrumb & Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-3 mb-6"
      >
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-white/50">
          <span className="text-purple-400 font-bold uppercase">Case Study (Archive)</span>
          <span>/</span>
          <span className="text-white/80">{study.client}</span>
          <span>/</span>
          <span className="text-white font-medium">{study.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Live in Production
          </span>
          <a
            href={study.url}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all shadow-sm"
          >
            <span>Visit Live Site</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </motion.div>

      {/* Hero Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative rounded-[2.5rem] bg-[#0c0c16]/90 border border-white/12 p-6 sm:p-8 md:p-12 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-2xl mb-10"
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium mb-4">
            <Sparkles size={13} />
            <span>Apple HIG Full Case Study & Architecture Breakdown</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] mb-6">
            {study.subtitle}
          </h1>

          <p className="text-white/75 text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-3xl">
            {study.overview}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-md">
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                Client
              </span>
              <p className="text-xs sm:text-sm font-bold text-white tracking-tight">{study.client}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                Role & Scope
              </span>
              <p className="text-xs sm:text-sm font-bold text-purple-300 tracking-tight">Lead UI/UX & Digital Architect</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                Timeline
              </span>
              <p className="text-xs sm:text-sm font-bold text-white tracking-tight">{study.timeline}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                Deployment
              </span>
              <p className="text-xs sm:text-sm font-bold text-emerald-400 tracking-tight">Global Production</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Impact Stat Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
      >
        {study.metrics.map((metric, i) => (
          <SpecularCard
            key={metric.label}
            id={`archive-metric-${i}`}
            className="p-6 flex flex-col justify-between"
            glowColor="rgba(255, 255, 255, 0.08)"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-white/50 uppercase tracking-wider">
                {metric.label}
              </span>
              <div className="p-2 rounded-xl bg-white/5 border border-white/8">
                {metric.icon}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1.5 font-sans">
                {metric.value}
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                {metric.detail}
              </p>
            </div>
          </SpecularCard>
        ))}
      </motion.div>

      {/* Section Navigation Tabs */}
      <div className="sticky top-20 z-40 mb-10 py-2">
        <div className="bg-[#0b0b14]/90 backdrop-blur-2xl border border-white/12 rounded-full p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar shadow-2xl">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => {
                  setActiveSection(sec.id);
                  const el = document.getElementById(`section-${sec.id}`);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer font-sans",
                  isActive
                    ? "bg-white text-black font-bold shadow-md"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {sec.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-12">
        <section id="section-challenge" className="scroll-mt-32">
          <div className="bg-[#0c0c16]/80 rounded-3xl border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
              <Zap size={14} />
              <span>Phase 01 // Discovery & Friction Identification</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {study.challenge.heading}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {study.challenge.points.map((pt, idx) => (
                <div
                  key={pt.title}
                  className="p-6 rounded-2xl bg-white/[0.02] border border-white/6 flex flex-col justify-between hover:bg-white/[0.04] transition-colors"
                >
                  <div>
                    <span className="text-xs font-mono text-white/30 font-bold block mb-3">
                      0{idx + 1} / FRICTION POINT
                    </span>
                    <h3 className="text-base font-bold text-white mb-2">{pt.title}</h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-normal">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="section-strategy" className="scroll-mt-32">
          <div className="bg-[#0c0c16]/80 rounded-3xl border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 mb-2">
              <Compass size={14} />
              <span>Phase 02 // Strategic Blueprint</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {study.strategy.heading}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {study.strategy.points.map((pt) => (
                <div
                  key={pt.title}
                  className="p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/8 hover:border-white/15 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[10px] font-mono text-purple-300 font-semibold mb-3">
                      {pt.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-2">{pt.title}</h3>
                    <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-normal">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="section-design" className="scroll-mt-32">
          <div className="bg-[#0c0c16]/80 rounded-3xl border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-pink-400 mb-2">
              <Palette size={14} />
              <span>Phase 03 // Apple HIG Design System</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {study.designSystem.heading}
            </h2>

            <div className="mb-8">
              <h3 className="text-xs font-mono uppercase text-white/50 tracking-widest mb-3">
                Color Palette & Neutral Contrast Ratios
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {study.designSystem.colors.map((c) => (
                  <div
                    key={c.name}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 flex flex-col justify-between h-28"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[10px] font-mono text-white/40">{c.hex}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white truncate">{c.name}</p>
                      <p className="text-[10px] text-white/45 truncate">{c.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/6">
                <h3 className="text-xs font-mono uppercase text-white/50 tracking-widest mb-4">
                  Typographic Hierarchy
                </h3>
                <div className="space-y-4">
                  {study.designSystem.typography.map((t) => (
                    <div key={t.level} className="border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{t.level}</span>
                        <span className="text-[10px] font-mono text-purple-400">{t.font}</span>
                      </div>
                      <p className="text-[11px] text-white/50">{t.use}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/6">
                <h3 className="text-xs font-mono uppercase text-white/50 tracking-widest mb-4">
                  HIG Design Principles Applied
                </h3>
                <div className="space-y-4">
                  {study.designSystem.principles.map((pr) => (
                    <div key={pr.title} className="flex gap-3">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-white mb-0.5">{pr.title}</h4>
                        <p className="text-[11px] text-white/60 leading-relaxed">{pr.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="section-preview" className="scroll-mt-32">
          <div className="bg-[#0c0c16]/90 rounded-3xl border border-white/12 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
                  <Monitor size={14} />
                  <span>Phase 04 // Interactive Live Sandbox Viewport</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Live Production Preview
                </h2>
              </div>

              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10 self-start sm:self-auto">
                <button
                  onClick={() => setViewportMode("desktop")}
                  className={cn(
                    "p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium",
                    viewportMode === "desktop"
                      ? "bg-white text-black font-bold shadow-sm"
                      : "text-white/60 hover:text-white"
                  )}
                  title="Desktop Viewport"
                >
                  <Laptop size={14} />
                  <span className="hidden sm:inline">Desktop</span>
                </button>
                <button
                  onClick={() => setViewportMode("tablet")}
                  className={cn(
                    "p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium",
                    viewportMode === "tablet"
                      ? "bg-white text-black font-bold shadow-sm"
                      : "text-white/60 hover:text-white"
                  )}
                  title="Tablet Viewport"
                >
                  <Tablet size={14} />
                  <span className="hidden sm:inline">Tablet</span>
                </button>
                <button
                  onClick={() => setViewportMode("mobile")}
                  className={cn(
                    "p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium",
                    viewportMode === "mobile"
                      ? "bg-white text-black font-bold shadow-sm"
                      : "text-white/60 hover:text-white"
                  )}
                  title="Mobile Viewport"
                >
                  <Smartphone size={14} />
                  <span className="hidden sm:inline">Mobile</span>
                </button>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <button
                  onClick={() => setIframeKey((prev) => prev + 1)}
                  className="p-2 rounded-xl text-white/60 hover:text-white transition-colors cursor-pointer"
                  title="Reload Preview"
                >
                  <RotateCw size={14} />
                </button>
                <a
                  href={study.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors flex items-center gap-1 text-xs font-semibold"
                  title="Open in new window"
                >
                  <Maximize2 size={13} />
                </a>
              </div>
            </div>

            <div className="flex justify-center w-full">
              <div
                className={cn(
                  "transition-all duration-500 rounded-[28px] bg-black border-2 border-white/15 p-2.5 sm:p-3 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden relative",
                  viewportMode === "desktop" && "w-full max-w-5xl h-[580px]",
                  viewportMode === "tablet" && "w-full max-w-2xl h-[580px]",
                  viewportMode === "mobile" && "w-[360px] h-[640px]"
                )}
              >
                <div className="px-4 py-2 bg-[#12121e] rounded-xl mb-2 flex items-center justify-between gap-3 border border-white/8">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 max-w-md bg-black/50 px-3 py-1 rounded-lg border border-white/5 text-[11px] font-mono text-white/60 truncate text-center flex items-center justify-center gap-1.5">
                    <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
                    <span className="truncate">{study.url}</span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="text-[10px] font-mono text-white/40 hover:text-white transition-colors flex items-center gap-1"
                  >
                    {copiedUrl ? <Check size={12} className="text-emerald-400" /> : <span>Copy</span>}
                  </button>
                </div>

                <div className="w-full h-[calc(100%-48px)] rounded-xl overflow-hidden bg-black relative">
                  <iframe
                    key={iframeKey}
                    src={study.url}
                    title="MSN Global Trainings Live Site"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-white/50 px-2">
              <span>Interactive preview connects directly to live server at {study.url}</span>
              <a
                href={study.url}
                target="_blank"
                rel="noreferrer noopener"
                className="text-purple-400 hover:text-purple-300 underline underline-offset-4 flex items-center gap-1"
              >
                <span>Launch standalone browser tab</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </section>

        <section id="section-engineering" className="scroll-mt-32">
          <div className="bg-[#0c0c16]/80 rounded-3xl border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2">
              <Code2 size={14} />
              <span>Phase 05 // Technical Execution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              {study.technicalHighlights.title}
            </h2>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-8 max-w-3xl">
              {study.technicalHighlights.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/6">
                <h3 className="text-xs font-mono uppercase text-white/50 tracking-widest mb-4">
                  Core Technologies & Architecture
                </h3>
                <div className="flex flex-wrap gap-2">
                  {study.technicalHighlights.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/80 flex items-center gap-2"
                    >
                      <Cpu size={13} className="text-emerald-400" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/6">
                <h3 className="text-xs font-mono uppercase text-white/50 tracking-widest mb-4">
                  Delivered Functional Capabilities
                </h3>
                <ul className="space-y-2.5">
                  {study.technicalHighlights.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="section-results" className="scroll-mt-32">
          <div className="bg-gradient-to-br from-[#121224] to-[#0a0a14] rounded-3xl border border-white/12 p-6 sm:p-8 md:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-4">
              <Award size={14} />
              <span>Phase 06 // Measurable Impact & Testimonial</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex gap-1.5 text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} fill="currentColor" />
                  ))}
                </div>

                <blockquote className="text-lg sm:text-xl md:text-2xl text-white font-light italic leading-relaxed">
                  "{study.impact.quote}"
                </blockquote>

                <div>
                  <h4 className="text-base font-bold text-white">{study.impact.author}</h4>
                  <p className="text-xs font-mono text-purple-300">{study.impact.authorRole}</p>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {study.impact.stats.map((st) => (
                  <div
                    key={st.label}
                    className="p-5 rounded-2xl bg-white/[0.04] border border-white/8 text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mb-1">
                      {st.value}
                    </div>
                    <div className="text-[11px] text-white/60 leading-tight">
                      {st.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="rounded-3xl bg-[#0e0e1a]/90 border border-white/10 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Ready to elevate your brand presence and web architecture?
            </h3>
            <p className="text-white/65 text-sm sm:text-base leading-relaxed">
              Let's engineer an intuitive, high-conversion digital platform tailored to your organization's vision.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="https://calendly.com/digital-b3asts/quick-free-consultation"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-xs tracking-tight hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-[0_4px_25px_rgba(255,255,255,0.2)] flex items-center gap-2"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight size={14} />
              </a>
              <a
                href={study.url}
                target="_blank"
                rel="noreferrer noopener"
                className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all flex items-center gap-2"
              >
                <span>Explore Live Platform</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
