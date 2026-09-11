import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  ArrowLeft,
  LayoutGrid,
  Filter,
  Layers,
  ChevronRight,
  Eye,
  Lock,
  Flame,
  Calendar,
  Box,
  Share2,
  Building2,
  FileText,
  Activity,
  CheckCircle,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { SpecularCard } from "../shared/SpecularCard";

export interface CaseStudySummary {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  clientRole: string;
  category: string;
  year: string;
  timeline: string;
  tagline: string;
  status: "ready" | "coming-soon" | "in-pipeline";
  statusLabel: string;
  featured: boolean;
  coverGradient: string;
  accentColor: string;
  accentHex: string;
  stats: { label: string; value: string }[];
  tags: string[];
  externalUrl?: string;
}

export interface CaseStudyDetailData extends CaseStudySummary {
  overview: string;
  metrics: { label: string; value: string; detail: string; icon: string }[];
  challenge: {
    heading: string;
    points: { title: string; desc: string; iconTag: string }[];
  };
  strategy: {
    heading: string;
    points: { title: string; desc: string; tag: string }[];
  };
  designSystem: {
    heading: string;
    colors: { name: string; hex: string; role: string }[];
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

const CASE_STUDIES_CATALOG: CaseStudySummary[] = [
  {
    id: "msn-trainings",
    title: "MSN Global Trainings Portal",
    subtitle: "Architecting a High-Conversion Enterprise Academy & Digital Learning Ecosystem",
    client: "MSN Global IT Solutions",
    clientRole: "Conglomerate IT Consultancy & Institute",
    category: "Enterprise Web Architecture",
    year: "2024–2025",
    timeline: "6 Weeks",
    tagline: "Apple HIG Design System, Interactive Course Navigator & Zero-Friction Multi-Channel Conversion",
    status: "ready",
    statusLabel: "Full Case Study Available",
    featured: true,
    coverGradient: "from-rose-500/20 via-purple-600/20 to-blue-600/10",
    accentColor: "text-rose-400",
    accentHex: "#E11D48",
    stats: [
      { label: "Enrollment Velocity", value: "+340%" },
      { label: "Session Duration", value: "4.8m" },
      { label: "Global Edge FCP", value: "0.6s" },
      { label: "Learner Satisfaction", value: "99.2%" },
    ],
    tags: ["React & Vite", "Apple HIG", "WhatsApp API", "Edge CDN", "Interactive Syllabus", "Lead Funnels"],
    externalUrl: "http://trainings.msn-global.com/",
  },
  {
    id: "django-ai",
    title: "Django - Enterprise AI Workflow Engine",
    subtitle: "High-Throughput Autonomous Agent Pipelines & Real-time Vector Intelligence",
    client: "Django Tech Labz",
    clientRole: "Enterprise AI Infrastructure",
    category: "AI & Distributed Systems",
    year: "2025",
    timeline: "8 Weeks",
    tagline: "Orchestrating multi-model autonomous decision loops with sub-millisecond retrieval latency.",
    status: "coming-soon",
    statusLabel: "Coming Soon • In Curation",
    featured: false,
    coverGradient: "from-emerald-500/20 via-cyan-600/20 to-indigo-600/10",
    accentColor: "text-emerald-400",
    accentHex: "#10B981",
    stats: [
      { label: "Triage Acceleration", value: "4.2x" },
      { label: "Context Retrieval", value: "< 85ms" },
      { label: "Task Autonomy", value: "98.4%" },
    ],
    tags: ["Python", "LangChain", "FastAPI", "PostgreSQL / pgvector", "Distributed Queues", "Gemini 2.5"],
  },
  {
    id: "juno-express",
    title: "Juno Express - Logistics & Telematics",
    subtitle: "Algorithmic Dispatch Engine, Spatial Telematics & Automated Driver Routing",
    client: "Juno Express Global",
    clientRole: "High-Speed Freight & Courier Network",
    category: "Logistics & Spatial Tech",
    year: "2024–2025",
    timeline: "10 Weeks",
    tagline: "Streamlining tens of thousands of real-time parcel handoffs with sub-second geospatial dispatch.",
    status: "coming-soon",
    statusLabel: "Coming Soon • In Progress",
    featured: false,
    coverGradient: "from-amber-500/20 via-orange-600/20 to-red-600/10",
    accentColor: "text-amber-400",
    accentHex: "#F59E0B",
    stats: [
      { label: "Dispatch Lock Time", value: "< 1.2s" },
      { label: "Delivery SLA", value: "99.98%" },
      { label: "Route Cost Reduction", value: "-28%" },
    ],
    tags: ["TypeScript", "WebSockets", "Mapbox GL", "Geospatial Indexing", "Fleet Dashboard", "IoT Telematics"],
  },
  {
    id: "prompt-os-platform",
    title: "PromptOS & Autonomous Orchestrator",
    subtitle: "Enterprise Prompt Engineering Studio & Multi-Model Benchmark Testing Suite",
    client: "Infni-T' Autonomous Systems",
    clientRole: "Internal AI Flagship",
    category: "AI & Developer Tooling",
    year: "2025–2026",
    timeline: "Continuous Pipeline",
    tagline: "Standardizing prompt evaluation matrices and agentic tool-calling across leading LLM providers.",
    status: "in-pipeline",
    statusLabel: "Pipeline • Next Release",
    featured: false,
    coverGradient: "from-purple-500/20 via-pink-600/20 to-amber-600/10",
    accentColor: "text-purple-400",
    accentHex: "#A855F7",
    stats: [
      { label: "Evaluated Prompts", value: "100k+" },
      { label: "Supported LLMs", value: "12+ Models" },
      { label: "Latency Benchmark", value: "Real-time" },
    ],
    tags: ["Gemini Pro", "Anthropic", "Evals Matrix", "Synthesizer", "Prompt Versioning"],
  },
];

const MSN_FULL_DATA: CaseStudyDetailData = {
  ...CASE_STUDIES_CATALOG[0],
  overview:
    "MSN Global IT Solutions is an international technology consulting and enterprise workforce training organization. To scale corporate upskilling and professional technical certifications, they needed an enterprise-grade digital portal that reflects their world-class engineering caliber. We designed and engineered an intuitive, high-impact digital learning ecosystem built on Apple Human Interface Guidelines—combining distraction-free course exploration, dynamic syllabus navigation, and instant WhatsApp inquiry routing.",
  metrics: [
    {
      label: "Enrollment Velocity",
      value: "+340%",
      detail: "Surge in verified student registrations within 90 days of live launch.",
      icon: "trending",
    },
    {
      label: "Average Session Duration",
      value: "4.8m",
      detail: "Deep engagement per active prospect exploring curriculum syllabi.",
      icon: "clock",
    },
    {
      label: "Global First Contentful Paint",
      value: "0.6s",
      detail: "Optimized static asset bundles delivered via distributed edge CDN.",
      icon: "zap",
    },
    {
      label: "Learner Usability Score",
      value: "99.2%",
      detail: "Positive rating on mobile syllabus inspection and one-tap triage.",
      icon: "award",
    },
  ],
  challenge: {
    heading: "The Strategic & Brand Positioning Challenge",
    points: [
      {
        title: "Fragmented Brand Authority",
        desc: "Previous course programs were dispersed across disconnected flyers and legacy subpages, failing to project the prestige of an elite IT institute.",
        iconTag: "01 / BRAND",
      },
      {
        title: "High Discovery & Booking Friction",
        desc: "Prospective learners struggled to compare tracks, review prerequisites, and understand schedule timelines quickly on mobile devices.",
        iconTag: "02 / UX FRICTION",
      },
      {
        title: "Low Mobile Conversion Rates",
        desc: "With 68% of traffic arriving on smartphones, non-responsive tables and lengthy lead forms caused premature drop-offs.",
        iconTag: "03 / MOBILE BOUNCE",
      },
    ],
  },
  strategy: {
    heading: "Strategic Repositioning & 4 Architectural Pillars",
    points: [
      {
        title: "Pillar 1: Apple HIG Visual Clarity & Credibility",
        desc: "Adopted a pristine, obsidian-dark canvas with high-contrast typography, strict 8px rhythmic spacing, and subtle specular lighting that immediately communicates institutional prestige.",
        tag: "Design System & Aesthetics",
      },
      {
        title: "Pillar 2: Modular Syllabus & Track Explorer",
        desc: "Structured all training offerings into intuitive modular tracks (AI & Machine Learning, Full-Stack, Cloud & DevOps, Cyber Defense) with instant collapsible deep dives.",
        tag: "Information Architecture",
      },
      {
        title: "Pillar 3: Zero-Friction Multi-Channel Conversion",
        desc: "Integrated one-tap WhatsApp Business API consultation triggers alongside structured enrollment applications, enabling instant counseling handoffs.",
        tag: "Conversion Engineering",
      },
      {
        title: "Pillar 4: Edge-Optimized Global Performance",
        desc: "Engineered ultra-lean asset payloads, lazy-loaded interactive components, and pre-rendered course schemas achieving top-tier Core Web Vitals.",
        tag: "Core Web Vitals & Speed",
      },
    ],
  },
  designSystem: {
    heading: "Design System & Visual Grammar",
    colors: [
      { name: "Obsidian Canvas", hex: "#08080E", role: "Primary Deep Background" },
      { name: "Slate Glass", hex: "#11111E", role: "Card Containers & Surfaces" },
      { name: "MSN Crimson Accent", hex: "#E11D48", role: "Brand Identity Highlight" },
      { name: "Electric Amber", hex: "#F59E0B", role: "Key Badges & Active States" },
      { name: "Pure Clarity", hex: "#FFFFFF", role: "High-Contrast Display Headlines" },
    ],
    typography: [
      { level: "Display Headline", font: "Plus Jakarta Sans Bold (clamp 2.5rem - 4.5rem)", use: "Hero positioning statements and major milestone headers" },
      { level: "Body Text", font: "Inter & System Sans Regular (16px / 1.65 line-height)", use: "Curriculum outlines, instructor profiles, and methodology" },
      { level: "Technical Callouts", font: "JetBrains Mono (11px / 0.25em tracking)", use: "Prerequisites, batch dates, certification codes, and live status" },
    ],
    principles: [
      { title: "Strict Rhythmic Grid", desc: "Container padding always equals or exceeds 2x internal child spacing for optical balance." },
      { title: "WCAG AAA Legibility", desc: "7:1+ contrast on all primary interactive buttons, text surfaces, and dark-mode hierarchy." },
      { title: "Directional Specular Frost", desc: "Top-edge highlight gradients simulate frosted glass optics under directional light." },
    ],
  },
  technicalHighlights: {
    title: "Engineering Architecture & Stack",
    description: "Built for lightning-fast responsiveness, frictionless cross-device compatibility, and effortless cohort curriculum management.",
    techStack: [
      "Modern React 18 & TypeScript",
      "Apple HIG Responsive Matrix",
      "Dynamic Course Schema & JSON-LD",
      "Direct WhatsApp Business API",
      "Automated Form Triage Webhooks",
      "Distributed Global Edge CDN",
    ],
    features: [
      "Real-time track categorization & interactive syllabus drawer",
      "Dynamic batch countdown & live seat availability indicators",
      "Mobile-optimized touch navigation with bottom action bar",
      "Rich OpenGraph metadata for viral social sharing",
      "Cross-browser verified across Safari, Chrome, Edge, and iOS WebKit",
    ],
  },
  impact: {
    quote:
      "Abdulrahman transformed our digital presence from the ground up. The new design system gave MSN Global Trainings the prestigious, high-end feel of an elite technology institute. Inquiries surged by over 340% within the first quarter, and students love how fast and intuitive the portal is.",
    author: "Engr. M. Salman",
    authorRole: "Director of Technical Education, MSN Global IT Solutions",
    stats: [
      { label: "Increase in Lead Inquiries", value: "+340%" },
      { label: "Mobile Bounce Rate Reduction", value: "-52%" },
      { label: "Direct Triage Conversions", value: "3.2x" },
      { label: "Student NPS Rating", value: "4.9 / 5" },
    ],
  },
};

interface CaseStudiesPageProps {
  initialStudyId?: string | null;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ initialStudyId = null }) => {
  const [selectedStudyId, setSelectedStudyId] = useState<string | null>(initialStudyId);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Scrollspy observer for active section
  useEffect(() => {
    if (!selectedStudyId) return;

    const sectionIds = ["overview", "challenge", "pillars", "design", "sandbox", "stack", "impact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(`section-${id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedStudyId]);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const categories = ["All", "Enterprise Web Architecture", "AI & Distributed Systems", "Logistics & Spatial Tech", "AI & Developer Tooling"];

  const filteredCatalog = CASE_STUDIES_CATALOG.filter((item) => {
    if (categoryFilter === "All") return true;
    return item.category === categoryFilter;
  });

  const selectedStudy = selectedStudyId === "msn-trainings" ? MSN_FULL_DATA : null;

  const sectionsTOC = [
    { id: "overview", label: "01. Executive Overview", shortLabel: "Overview" },
    { id: "challenge", label: "02. The Challenge", shortLabel: "Challenge" },
    { id: "pillars", label: "03. Strategic Pillars", shortLabel: "Pillars" },
    { id: "design", label: "04. Design System", shortLabel: "Design" },
    { id: "sandbox", label: "05. Live Sandbox", shortLabel: "Live Site" },
    { id: "stack", label: "06. Tech Architecture", shortLabel: "Stack" },
    { id: "impact", label: "07. Impact & Proof", shortLabel: "Impact" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // If no study is selected, render the Showcase Gallery Grid
  if (!selectedStudyId || !selectedStudy) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 font-sans select-none">
        {/* Header Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/70 text-xs font-mono mb-4 backdrop-blur-md">
            <Sparkles size={13} className="text-purple-400" />
            <span>Curated Architectural Breakdowns & Case Studies</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Selected Case Studies & System Deep Dives
          </h1>

          <p className="text-white/60 text-sm sm:text-base leading-relaxed">
            Detailed dissections of enterprise web architectures, design systems, autonomous AI engines, and high-concurrency client platforms.
          </p>
        </motion.div>

        {/* Filter Chips Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10"
        >
          {categories.map((cat) => {
            const isActive = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border",
                  isActive
                    ? "bg-white text-black border-white shadow-lg shadow-white/10"
                    : "bg-[#10101c]/80 text-white/60 border-white/8 hover:text-white hover:border-white/20 hover:bg-white/5"
                )}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Bento / Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-16">
          {filteredCatalog.map((study, idx) => {
            const isFlagship = study.id === "msn-trainings";
            const colSpan = isFlagship ? "lg:col-span-12" : idx === 1 ? "lg:col-span-7" : "lg:col-span-5";

            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={cn("col-span-1", colSpan)}
              >
                <div
                  onClick={() => {
                    if (study.status === "ready") {
                      setSelectedStudyId(study.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={cn(
                    "group relative h-full rounded-[2rem] p-6 sm:p-8 md:p-10 border transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-2xl",
                    study.status === "ready"
                      ? "bg-[#0d0d18]/90 border-white/15 hover:border-purple-500/50 hover:shadow-[0_20px_60px_rgba(168,85,247,0.18)] cursor-pointer"
                      : "bg-[#0b0b14]/70 border-white/8 opacity-90 cursor-default"
                  )}
                >
                  {/* Subtle Gradient Glow Backdrop */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-20 pointer-events-none transition-opacity group-hover:opacity-35",
                      study.coverGradient
                    )}
                  />
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  {/* Top Bar: Category & Status Badge */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
                        {study.category}
                      </span>
                      <span className="text-white/20">•</span>
                      <span className="text-[11px] font-mono text-white/50">{study.year}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {study.status === "ready" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {study.statusLabel}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-[11px] font-mono font-medium">
                          <Clock size={11} />
                          {study.statusLabel}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Title & Tagline */}
                  <div className="relative z-10 space-y-3 mb-8">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-purple-400 uppercase tracking-wider">
                      <Building2 size={13} />
                      <span>{study.client}</span>
                    </div>

                    <h2
                      className={cn(
                        "font-black text-white tracking-tight leading-tight group-hover:text-purple-200 transition-colors",
                        isFlagship ? "text-2xl sm:text-3xl md:text-4xl" : "text-xl sm:text-2xl"
                      )}
                    >
                      {study.title}
                    </h2>

                    <p className="text-white/65 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl">
                      {study.subtitle}
                    </p>
                  </div>

                  {/* Middle: Metrics Highlights Strip */}
                  <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-black/40 border border-white/6 mb-6">
                    {study.stats.map((st) => (
                      <div key={st.label} className="space-y-0.5">
                        <div className="text-lg sm:text-xl font-mono font-extrabold text-white">
                          {st.value}
                        </div>
                        <div className="text-[10px] text-white/50 leading-tight truncate">
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom: Tags & Action Button */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/8">
                    <div className="flex flex-wrap gap-1.5 max-w-xl">
                      {study.tags.slice(0, isFlagship ? 6 : 4).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/8 text-[11px] font-mono text-white/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {study.status === "ready" ? (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStudyId(study.id);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs flex items-center gap-2 hover:bg-neutral-200 transition-all shadow-md cursor-pointer hover:scale-105"
                          >
                            <span>Read Full Case Study</span>
                            <ArrowRight size={13} />
                          </button>
                          {study.externalUrl && (
                            <a
                              href={study.externalUrl}
                              target="_blank"
                              rel="noreferrer noopener"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-colors"
                              title="Visit live site"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </>
                      ) : (
                        <span className="text-xs font-mono text-white/40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
                          <Lock size={12} />
                          <span>Curating Documentation</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Strategy CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-[2.5rem] bg-gradient-to-b from-[#121222] to-[#0a0a14] border border-white/12 p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-2xl shadow-2xl"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
              Engineering & Digital Advisory
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Have a complex digital project or enterprise platform in mind?
            </h3>
            <p className="text-white/65 text-xs sm:text-sm md:text-base leading-relaxed">
              We design and construct high-performance digital products, full-stack systems, and Apple-grade user experiences with verifiable business outcomes.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="https://calendly.com/digital-b3asts/quick-free-consultation"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-[0_4px_30px_rgba(255,255,255,0.25)] flex items-center gap-2"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight size={14} />
              </a>
              <a
                href="mailto:digital.b3asts@gmail.com"
                className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/12 transition-all"
              >
                <span>Inquire via Email</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- DETAILED CASE STUDY VIEW (Clean Gamma Slide / Document Grade Layout) ---
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24 font-sans select-none">
      {/* Top Floating Control Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-[#0c0c16]/80 border border-white/10 backdrop-blur-2xl rounded-2xl p-3 sm:px-5"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedStudyId(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
            <span>All Case Studies</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/40">
            <span>/</span>
            <span className="text-purple-400 font-bold">{selectedStudy.client}</span>
            <span>/</span>
            <span className="text-white/80 truncate max-w-[200px]">{selectedStudy.title}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Live Deployment
          </span>
          {selectedStudy.externalUrl && (
            <a
              href={selectedStudy.externalUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all shadow-sm cursor-pointer"
            >
              <span>Visit Live Portal</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </motion.div>

      {/* Main Layout: Left/Main Gamma Slides Column + Right Floating Sticky TOC */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative items-start">
        {/* Left Column: Clean Gamma Slide Sections */}
        <div className="lg:col-span-9 space-y-10">
          {/* SECTION 01: Hero / Executive Overview Slide */}
          <section id="section-overview" className="scroll-mt-24">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-[2.5rem] bg-[#0c0c16]/90 border border-white/12 p-6 sm:p-8 md:p-12 overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] backdrop-blur-2xl relative"
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium">
                  <Sparkles size={13} />
                  <span>Apple HIG Case Study & Architecture Blueprint</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.1]">
                  {selectedStudy.subtitle}
                </h1>

                <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-3xl font-normal">
                  {selectedStudy.overview}
                </p>

                {/* Specs Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-md">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                      Client
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white">{selectedStudy.client}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                      Scope
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-purple-300">{selectedStudy.clientRole}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                      Timeline
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white">{selectedStudy.timeline}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block mb-1">
                      Status
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-emerald-400">Global Production</p>
                  </div>
                </div>

                {/* Top Action CTA */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {selectedStudy.externalUrl && (
                    <a
                      href={selectedStudy.externalUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="px-6 py-3 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-lg hover:scale-105"
                    >
                      <span>Explore Live Portal</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  <button
                    onClick={() => scrollToSection("sandbox")}
                    className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/12 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Monitor size={13} />
                    <span>Open Interactive Sandbox</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedStudy.metrics.map((metric, i) => (
              <SpecularCard
                key={metric.label}
                id={`detail-metric-${i}`}
                className="p-5 flex flex-col justify-between h-36"
                glowColor="rgba(255, 255, 255, 0.08)"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/8">
                    {metric.icon === "trending" && <TrendingUp size={16} className="text-emerald-400" />}
                    {metric.icon === "clock" && <Clock size={16} className="text-cyan-400" />}
                    {metric.icon === "zap" && <Zap size={16} className="text-amber-400" />}
                    {metric.icon === "award" && <Award size={16} className="text-purple-400" />}
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
                    {metric.value}
                  </div>
                  <p className="text-[11px] text-white/55 leading-tight truncate">
                    {metric.detail}
                  </p>
                </div>
              </SpecularCard>
            ))}
          </div>

          {/* SECTION 02: The Challenge / Friction Points */}
          <section id="section-challenge" className="scroll-mt-24">
            <div className="bg-[#0c0c16]/80 rounded-[2rem] border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2 font-bold">
                <Zap size={14} />
                <span>Section 02 // Friction Audit & Legacy Constraints</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                {selectedStudy.challenge.heading}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedStudy.challenge.points.map((pt) => (
                  <div
                    key={pt.title}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/6 flex flex-col justify-between hover:bg-white/[0.04] transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-white/30 font-bold block mb-2">
                        {pt.iconTag}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-white mb-2">{pt.title}</h3>
                      <p className="text-xs text-white/60 leading-relaxed font-normal">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 03: Strategic Pillars (Gamma Slide Columns) */}
          <section id="section-pillars" className="scroll-mt-24">
            <div className="bg-[#0c0c16]/80 rounded-[2rem] border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 mb-2 font-bold">
                <Compass size={14} />
                <span>Section 03 // Strategic Blueprint & 4 Core Pillars</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                {selectedStudy.strategy.heading}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedStudy.strategy.points.map((pt) => (
                  <div
                    key={pt.title}
                    className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/8 hover:border-white/15 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-[10px] font-mono text-purple-300 font-semibold mb-3">
                        {pt.tag}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2">{pt.title}</h3>
                      <p className="text-xs sm:text-sm text-white/65 leading-relaxed font-normal">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 04: Apple HIG Design System */}
          <section id="section-design" className="scroll-mt-24">
            <div className="bg-[#0c0c16]/80 rounded-[2rem] border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-pink-400 mb-2 font-bold">
                <Palette size={14} />
                <span>Section 04 // Apple HIG Design Grammar</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                {selectedStudy.designSystem.heading}
              </h2>

              {/* Color Swatches */}
              <div className="mb-8">
                <h3 className="text-xs font-mono uppercase text-white/50 tracking-widest mb-3">
                  Color Matrix & Neutral Contrast
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {selectedStudy.designSystem.colors.map((c) => (
                    <div
                      key={c.name}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 flex flex-col justify-between h-24"
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

              {/* Typography & Principles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/6">
                  <h3 className="text-xs font-mono uppercase text-white/50 tracking-widest mb-4">
                    Typographic Scale
                  </h3>
                  <div className="space-y-3.5">
                    {selectedStudy.designSystem.typography.map((t) => (
                      <div key={t.level} className="border-b border-white/5 pb-2.5 last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-bold text-white">{t.level}</span>
                          <span className="text-[10px] font-mono text-purple-400">{t.font}</span>
                        </div>
                        <p className="text-[11px] text-white/50">{t.use}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/6">
                  <h3 className="text-xs font-mono uppercase text-white/50 tracking-widest mb-4">
                    Core HIG Principles
                  </h3>
                  <div className="space-y-3.5">
                    {selectedStudy.designSystem.principles.map((pr) => (
                      <div key={pr.title} className="flex gap-2.5">
                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
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

          {/* SECTION 05: Interactive Live Sandbox Viewport */}
          <section id="section-sandbox" className="scroll-mt-24">
            <div className="bg-[#0c0c16]/90 rounded-[2rem] border border-white/12 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1 font-bold">
                    <Monitor size={14} />
                    <span>Section 05 // Live Sandbox Viewport</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Live Production Preview
                  </h2>
                </div>

                {/* Device Modes */}
                <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/10 self-start sm:self-auto">
                  <button
                    onClick={() => setViewportMode("desktop")}
                    className={cn(
                      "p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium",
                      viewportMode === "desktop"
                        ? "bg-white text-black font-bold shadow-sm"
                        : "text-white/60 hover:text-white"
                    )}
                    title="Desktop"
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
                    title="Tablet"
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
                    title="Mobile"
                  >
                    <Smartphone size={14} />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>
                  <div className="w-px h-4 bg-white/10 mx-1" />
                  <button
                    onClick={() => setIframeKey((prev) => prev + 1)}
                    className="p-2 rounded-xl text-white/60 hover:text-white transition-colors cursor-pointer"
                    title="Reload"
                  >
                    <RotateCw size={14} />
                  </button>
                  {selectedStudy.externalUrl && (
                    <a
                      href={selectedStudy.externalUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="p-2 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors flex items-center gap-1 text-xs font-semibold"
                      title="Open in new window"
                    >
                      <Maximize2 size={13} />
                    </a>
                  )}
                </div>
              </div>

              {/* Chassis Frame */}
              <div className="flex justify-center w-full">
                <div
                  className={cn(
                    "transition-all duration-500 rounded-[28px] bg-black border-2 border-white/15 p-2.5 sm:p-3 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden relative",
                    viewportMode === "desktop" && "w-full max-w-5xl h-[560px]",
                    viewportMode === "tablet" && "w-full max-w-2xl h-[560px]",
                    viewportMode === "mobile" && "w-[360px] h-[600px]"
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
                      <span className="truncate">{selectedStudy.externalUrl}</span>
                    </div>
                    <button
                      onClick={() => selectedStudy.externalUrl && handleCopy(selectedStudy.externalUrl)}
                      className="text-[10px] font-mono text-white/40 hover:text-white transition-colors flex items-center gap-1"
                    >
                      {copiedUrl ? <Check size={12} className="text-emerald-400" /> : <span>Copy</span>}
                    </button>
                  </div>

                  <div className="w-full h-[calc(100%-48px)] rounded-xl overflow-hidden bg-black relative">
                    <iframe
                      key={iframeKey}
                      src={selectedStudy.externalUrl}
                      title="MSN Global Trainings Portal"
                      className="w-full h-full border-0"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 06: Tech Stack & Execution */}
          <section id="section-stack" className="scroll-mt-24">
            <div className="bg-[#0c0c16]/80 rounded-[2rem] border border-white/10 p-6 sm:p-8 md:p-10 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-2 font-bold">
                <Code2 size={14} />
                <span>Section 06 // Technical Execution & Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                {selectedStudy.technicalHighlights.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/6">
                  <h3 className="text-xs font-mono uppercase text-white/50 tracking-widest mb-3">
                    Technologies & Frameworks
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudy.technicalHighlights.techStack.map((tech) => (
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

                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/6">
                  <h3 className="text-xs font-mono uppercase text-white/50 tracking-widest mb-3">
                    Functional Capabilities
                  </h3>
                  <ul className="space-y-2">
                    {selectedStudy.technicalHighlights.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs text-white/70">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 07: Impact & Testimonial */}
          <section id="section-impact" className="scroll-mt-24">
            <div className="bg-gradient-to-br from-[#121224] to-[#0a0a14] rounded-[2rem] border border-white/12 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-4 font-bold">
                <Award size={14} />
                <span>Section 07 // Measurable Outcomes & Endorsement</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={16} fill="currentColor" />
                    ))}
                  </div>

                  <blockquote className="text-base sm:text-lg text-white font-light italic leading-relaxed">
                    "{selectedStudy.impact.quote}"
                  </blockquote>

                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedStudy.impact.author}</h4>
                    <p className="text-xs font-mono text-purple-300">{selectedStudy.impact.authorRole}</p>
                  </div>
                </div>

                <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                  {selectedStudy.impact.stats.map((st) => (
                    <div
                      key={st.label}
                      className="p-4 rounded-2xl bg-white/[0.04] border border-white/8 text-center"
                    >
                      <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mb-1">
                        {st.value}
                      </div>
                      <div className="text-[10px] text-white/60 leading-tight">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Bottom End CTA */}
          <div className="rounded-[2rem] bg-[#0e0e1a]/90 border border-white/10 p-8 sm:p-10 text-center relative overflow-hidden">
            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Want similar engineering rigor for your organization?
              </h3>
              <p className="text-white/65 text-xs sm:text-sm leading-relaxed">
                Let's discuss how to modernize your web presence, optimize conversions, and construct an Apple-caliber design system.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <a
                  href="https://calendly.com/digital-b3asts/quick-free-consultation"
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-3 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 shadow-md flex items-center gap-2"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight size={13} />
                </a>
                <button
                  onClick={() => {
                    setSelectedStudyId(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/12 transition-all"
                >
                  <span>Browse More Case Studies</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Floating Table of Contents Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24 space-y-4">
          <div className="rounded-2xl bg-[#0c0c16]/90 border border-white/10 p-4 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/8">
              <span className="text-[11px] font-mono text-white/50 uppercase tracking-widest font-bold">
                Table of Contents
              </span>
              <span className="text-[10px] font-mono text-purple-400">7 Sections</span>
            </div>

            {/* Section Links */}
            <nav className="space-y-1">
              {sectionsTOC.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between group cursor-pointer font-sans",
                      isActive
                        ? "bg-purple-500/20 text-purple-200 font-bold border border-purple-500/30"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span className="truncate">{sec.label}</span>
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all",
                        isActive ? "bg-purple-400 scale-125" : "bg-transparent group-hover:bg-white/30"
                      )}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-white/8 space-y-2">
              <button
                onClick={() => {
                  setSelectedStudyId(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/8"
              >
                <ArrowLeft size={12} />
                <span>Back to Gallery</span>
              </button>

              <a
                href="https://calendly.com/digital-b3asts/quick-free-consultation"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-white text-black hover:bg-neutral-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm text-center"
              >
                <span>Book Consultation</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
