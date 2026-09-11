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
  X,
  Sliders,
  BarChart3,
  HelpCircle,
  AlertTriangle,
  Send,
  Globe,
} from "lucide-react";
import { cn } from "../../lib/utils";

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
  coverImage?: string;
  coverGradient: string;
  accentColor: string;
  accentHex: string;
  stats: { label: string; value: string }[];
  tags: string[];
  externalUrl?: string;
}

export interface CaseStudyDetailData extends CaseStudySummary {
  overview: string;
  problem: {
    heading: string;
    subheading: string;
    frictionPoints: {
      id: string;
      title: string;
      metric: string;
      description: string;
      impact: "High" | "Critical" | "Moderate";
      tag: string;
    }[];
    journeyBefore: { step: string; issue: string }[];
    journeyAfter: { step: string; benefit: string }[];
  };
  solution: {
    heading: string;
    subheading: string;
    pillars: {
      id: string;
      number: string;
      title: string;
      subtitle: string;
      description: string;
      tag: string;
      features: string[];
    }[];
    designSystem: {
      colors: { name: string; hex: string; role: string }[];
      typography: { level: string; font: string; note: string }[];
      principles: string[];
    };
    techStack: { name: string; category: string; description: string }[];
  };
  outcome: {
    heading: string;
    subheading: string;
    metrics: {
      label: string;
      value: string;
      change: string;
      detail: string;
      icon: "trending" | "clock" | "zap" | "award";
    }[];
    testimonial: {
      quote: string;
      author: string;
      role: string;
      company: string;
      avatarText: string;
    };
    takeaways: string[];
  };
}

const CASE_STUDIES_CATALOG: CaseStudySummary[] = [
  {
    id: "msn-trainings",
    title: "MSN Global Trainings Portal",
    subtitle: "High-Conversion Enterprise Academy & Digital Learning Ecosystem",
    client: "MSN Global IT Solutions",
    clientRole: "Conglomerate IT Consultancy & Institute",
    category: "Enterprise Web Architecture",
    year: "2024–2025",
    timeline: "6 Weeks",
    tagline: "Apple HIG Design System, Interactive Course Navigator & Zero-Friction Multi-Channel Conversion",
    status: "ready",
    statusLabel: "Case Study Available",
    featured: true,
    coverGradient: "from-rose-500/10 via-purple-600/15 to-blue-600/10",
    accentColor: "text-rose-400",
    accentHex: "#E11D48",
    stats: [
      { label: "Enrollment Velocity", value: "+340%" },
      { label: "Session Duration", value: "4.8m" },
      { label: "Global Edge FCP", value: "0.6s" },
      { label: "Learner Satisfaction", value: "99.2%" },
    ],
    tags: ["React 18", "Apple HIG", "WhatsApp API", "Edge CDN", "Dynamic Syllabus", "Lead Funnels"],
    externalUrl: "http://trainings.msn-global.com/",
  },
  {
    id: "django-ai",
    title: "Django - Autonomous AI Workflow Engine",
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
    coverGradient: "from-emerald-500/10 via-cyan-600/15 to-indigo-600/10",
    accentColor: "text-emerald-400",
    accentHex: "#10B981",
    stats: [
      { label: "Triage Acceleration", value: "4.2x" },
      { label: "Context Retrieval", value: "< 85ms" },
      { label: "Task Autonomy", value: "98.4%" },
    ],
    tags: ["Python", "FastAPI", "pgvector", "LangChain", "Distributed Queues", "Gemini 2.5"],
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
    coverGradient: "from-amber-500/10 via-orange-600/15 to-red-600/10",
    accentColor: "text-amber-400",
    accentHex: "#F59E0B",
    stats: [
      { label: "Dispatch Lock Time", value: "< 1.2s" },
      { label: "Delivery SLA", value: "99.98%" },
      { label: "Route Cost Reduction", value: "-28%" },
    ],
    tags: ["TypeScript", "WebSockets", "Mapbox GL", "Geospatial Indexing", "Fleet Dashboard"],
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
    coverGradient: "from-purple-500/10 via-pink-600/15 to-amber-600/10",
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
    "MSN Global IT Solutions is an international IT consulting and workforce education institute. To expand their corporate training programs and technical certification cohorts, they needed a premier web portal that communicates institutional excellence. We architected and delivered an Apple HIG-inspired digital ecosystem—uniting distraction-free syllabus navigation, real-time cohort tracking, and zero-friction WhatsApp counseling routing.",
  problem: {
    heading: "The Challenge: Fragmented Authority & High Mobile Friction",
    subheading: "An audit of the previous workflow revealed three critical operational friction points causing qualified prospective students to abandon enrollment inquiries.",
    frictionPoints: [
      {
        id: "brand-authority",
        title: "Fragmented Brand Authority",
        metric: "62% Bounce",
        description: "Course tracks were scattered across disconnected PDFs and legacy web pages, failing to project the caliber of an elite technical training institute.",
        impact: "Critical",
        tag: "01 / BRANDING",
      },
      {
        id: "mobile-friction",
        title: "Mobile Enrollment Drop-off",
        metric: "68% Mobile Traffic",
        description: "Over two-thirds of prospects browsed on smartphones, but static multi-column tables and non-responsive forms caused severe registration fatigue.",
        impact: "High",
        tag: "02 / UX FRICTION",
      },
      {
        id: "delayed-triage",
        title: "Multi-Day Counseling Lag",
        metric: "48h+ Delay",
        description: "Traditional email forms led to delayed follow-ups and lost interest before admissions counselors could engage qualified candidates.",
        impact: "High",
        tag: "03 / FUNNEL LEAK",
      },
    ],
    journeyBefore: [
      { step: "Discovery", issue: "Disjointed PDFs & social media flyers" },
      { step: "Evaluation", issue: "Confusing curriculum schedules & prerequisite lists" },
      { step: "Contact", issue: "Lengthy email form with 48h response delay" },
    ],
    journeyAfter: [
      { step: "Discovery", benefit: "Unified Apple HIG Portal with instant track cards" },
      { step: "Evaluation", benefit: "Interactive collapsible syllabus with batch countdowns" },
      { step: "Contact", benefit: "One-tap direct WhatsApp Admissions counseling" },
    ],
  },
  solution: {
    heading: "The Architecture: 4 Pillars of High-Conversion Engineering",
    subheading: "A systematic overhaul built on Apple Human Interface Guidelines, lean edge asset delivery, and instant multi-channel lead routing.",
    pillars: [
      {
        id: "pillar-1",
        number: "01",
        title: "Apple HIG Visual Hierarchy",
        subtitle: "Minimal Silver & Obsidian Aesthetics",
        description: "Designed with a deep obsidian canvas, high-contrast display typography, and 8px rhythmic grid spacing to immediately establish executive trust.",
        tag: "Design System",
        features: ["Obsidian-dark canvas (#08080E)", "Frosted glass container cards", "Subtle specular border highlights", "WCAG AAA contrast adherence"],
      },
      {
        id: "pillar-2",
        number: "02",
        title: "Interactive Modular Syllabus Explorer",
        subtitle: "Zero-Friction Curriculum Discovery",
        description: "Organized training programs into 4 distinct disciplines (AI/ML, Full-Stack, Cloud DevOps, Cybersecurity) with real-time drawer navigation.",
        tag: "Information Architecture",
        features: ["Instant category filter matrix", "Collapsible week-by-week syllabus", "Prerequisite & tooling badges", "Live cohort seat indicators"],
      },
      {
        id: "pillar-3",
        number: "03",
        title: "Zero-Friction WhatsApp Triage",
        subtitle: "Direct Admissions Handoff",
        description: "Implemented a floating bottom mobile dock and direct WhatsApp Business API webhooks, eliminating inquiry friction and speeding counselor triage.",
        tag: "Conversion Engineering",
        features: ["Pre-filled course context in messages", "One-tap admissions counseling", "Reduced contact friction to < 5 seconds", "Higher counselor conversion rate"],
      },
      {
        id: "pillar-4",
        number: "04",
        title: "Distributed Edge CDN & Performance",
        subtitle: "Sub-Second Global Loading",
        description: "Engineered ultra-lean asset payloads, lazy-loaded components, and static JSON-LD course schemas achieving exceptional Core Web Vitals.",
        tag: "Edge Performance",
        features: ["0.6s First Contentful Paint", "100% Core Web Vitals pass", "Zero client-side bundle bloat", "Pre-rendered SEO course schemas"],
      },
    ],
    designSystem: {
      colors: [
        { name: "Obsidian Canvas", hex: "#08080E", role: "Deep Background" },
        { name: "Slate Glass", hex: "#11111E", role: "Card Containers" },
        { name: "MSN Crimson Accent", hex: "#E11D48", role: "Brand Highlight" },
        { name: "Silver Frost", hex: "#E2E8F0", role: "Display Headlines" },
        { name: "Electric Amber", hex: "#F59E0B", role: "Batch Alerts" },
      ],
      typography: [
        { level: "Display Headline", font: "Plus Jakarta Sans Bold (clamp 2.2rem - 3.8rem)", note: "Executive positioning" },
        { level: "Body Text", font: "Inter & System Sans (16px / 1.65 line-height)", note: "Curriculum readability" },
        { level: "Technical Badges", font: "JetBrains Mono (11px / 0.25em tracking)", note: "Batch dates & codes" },
      ],
      principles: [
        "Consistent 8px spatial rhythm across all card paddings",
        "Strict 2x vertical-to-horizontal button padding balance",
        "Mathematical nested border radii (Outer = Inner + Padding)",
        "Zero generic gradients or artificial AI visual clutter",
      ],
    },
    techStack: [
      { name: "React 18 & Vite", category: "Frontend Framework", description: "Ultra-fast bundling and component modularity" },
      { name: "TypeScript", category: "Type Safety", description: "Strict typing for curriculum schemas and batches" },
      { name: "Tailwind CSS", category: "Styling Engine", description: "Utility-first design system adherence" },
      { name: "WhatsApp Business API", category: "Triage Routing", description: "Direct programmatic admissions messaging" },
      { name: "Edge Global CDN", category: "Infrastructure", description: "Distributed caching with sub-second FCP" },
    ],
  },
  outcome: {
    heading: "The Outcome: Measurable Business & Conversion Velocity",
    subheading: "Within 90 days of live launch, MSN Global IT Solutions experienced a verifiable surge across admissions velocity, engagement, and learner satisfaction.",
    metrics: [
      {
        label: "Enrollment Inquiries",
        value: "+340%",
        change: "vs previous quarter",
        detail: "Massive influx of qualified prospective learners through instant mobile triage.",
        icon: "trending",
      },
      {
        label: "Mobile Bounce Rate",
        value: "-52%",
        change: "reduction",
        detail: "Learners actively explore curriculum syllabi on smartphones without premature drop-off.",
        icon: "zap",
      },
      {
        label: "Global First Contentful Paint",
        value: "0.6s",
        change: "Edge optimized",
        detail: "Instantaneous page rendering on 3G/4G/5G mobile connections globally.",
        icon: "clock",
      },
      {
        label: "Admissions Satisfaction",
        value: "4.9 / 5",
        change: "NPS Rating",
        detail: "Consistently rated as intuitive, clear, and prestigious by verified students.",
        icon: "award",
      },
    ],
    testimonial: {
      quote:
        "Abdulrahman completely elevated our digital presence. The new design system gave MSN Global Trainings the prestigious look and feel of an elite international technology institute. Inquiries surged by over 340% within the first 90 days, and our students love how fast and clear the portal is.",
      author: "Engr. M. Salman",
      role: "Director of Technical Education",
      company: "MSN Global IT Solutions",
      avatarText: "MS",
    },
    takeaways: [
      "Eliminating friction between curriculum exploration and one-tap contact drives immediate lead conversion.",
      "An Apple HIG aesthetic builds institutional trust and commands higher perceived value for technical certifications.",
      "Optimizing Core Web Vitals to sub-second load times directly lowers mobile bounce rates.",
    ],
  },
};

interface CaseStudiesPageProps {
  initialStudyId?: string | null;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ initialStudyId = null }) => {
  const [selectedStudyId, setSelectedStudyId] = useState<string | null>(initialStudyId);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [activeSection, setActiveSection] = useState<string>("brief");
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isModalOpen) {
          setIsModalOpen(false);
        } else if (selectedStudyId) {
          setSelectedStudyId(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedStudyId]);

  // Scrollspy observer for sticky Table of Contents
  useEffect(() => {
    if (!selectedStudyId && !isModalOpen) return;

    const sections = ["brief", "problem", "solution", "sandbox", "outcome"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      for (const id of sections) {
        const el = document.getElementById(`cs-section-${id}`);
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
  }, [selectedStudyId, isModalOpen]);

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
    { id: "brief", label: "01. Executive Brief", shortLabel: "Brief" },
    { id: "problem", label: "02. The Problem", shortLabel: "Problem" },
    { id: "solution", label: "03. The Solution", shortLabel: "Solution" },
    { id: "sandbox", label: "04. Live Sandbox", shortLabel: "Live Site" },
    { id: "outcome", label: "05. The Outcome", shortLabel: "Outcome" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`cs-section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openStudy = (id: string) => {
    setSelectedStudyId(id);
    setIsModalOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-28 font-sans select-none">
      {/* Header Title & Concept Intro */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-white/70 text-xs font-mono mb-4 backdrop-blur-md">
          <Sparkles size={13} className="text-purple-400" />
          <span>Case Studies & Systems Breakdown</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3.5 leading-tight">
          Systems & Case Studies
        </h1>

        <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
          In-depth architectural dissections of production web ecosystems, Apple HIG design systems, and autonomous engines built with precision.
        </p>
      </motion.div>

      {/* Category Filter Chips Bar (Apple Silver Aesthetic) */}
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
                "px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer border",
                isActive
                  ? "bg-white text-black border-white shadow-[0_2px_12px_rgba(255,255,255,0.15)] font-semibold"
                  : "bg-[#0f0f18]/80 text-white/60 border-white/10 hover:text-white hover:border-white/20 hover:bg-white/5"
              )}
            >
              {cat}
            </button>
          );
        })}
      </motion.div>

      {/* ========================================================================= */}
      {/* CASE STUDIES GALLERY: CLEAN & SIMPLIFIED SILVER CARDS                     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-20">
        {filteredCatalog.map((study, idx) => {
          const isFlagship = study.id === "msn-trainings";
          const colSpan = isFlagship ? "lg:col-span-12" : idx === 1 ? "lg:col-span-7" : "lg:col-span-5";
          const isReady = study.status === "ready";

          return (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className={cn("col-span-1", colSpan)}
            >
              <div
                onClick={() => {
                  if (isReady) {
                    openStudy(study.id);
                  }
                }}
                className={cn(
                  "group relative h-full rounded-[2rem] p-6 sm:p-8 border transition-all duration-300 flex flex-col justify-between overflow-hidden backdrop-blur-xl",
                  isReady
                    ? "bg-[#0d0d16]/95 border-white/15 hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-pointer"
                    : "bg-[#0a0a12]/70 border-white/8 opacity-80 cursor-default"
                )}
              >
                {/* Subtle Specular Top Highlight */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                {/* Card Top: Client & Status Tag */}
                <div className="flex items-center justify-between gap-3 mb-5 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
                      {study.client}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="text-[11px] font-mono text-white/40">{study.year}</span>
                  </div>

                  <div>
                    {isReady ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {study.statusLabel}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[11px] font-mono font-medium">
                        <Lock size={11} />
                        {study.statusLabel}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Center: Title & Visual Thumbnail */}
                <div className="space-y-4 mb-6 relative z-10">
                  <h2
                    className={cn(
                      "font-black text-white tracking-tight leading-tight group-hover:text-neutral-100 transition-colors",
                      isFlagship ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                    )}
                  >
                    {study.title}
                  </h2>

                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-3xl">
                    {study.subtitle}
                  </p>

                  {/* Clean Visual Mockup Graphic Frame */}
                  <div className="relative rounded-2xl bg-black/60 border border-white/10 p-3 overflow-hidden shadow-inner mt-4 group-hover:border-white/20 transition-all">
                    {isFlagship ? (
                      /* Flagship MSN Portal Interactive Mockup Graphic */
                      <div className="relative rounded-xl overflow-hidden bg-[#0a0a14] border border-white/5 p-4 sm:p-6 flex flex-col justify-between h-44 sm:h-52">
                        {/* Browser Top Bar */}
                        <div className="flex items-center justify-between pb-3 border-b border-white/5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                            <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                          </div>
                          <div className="px-3 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-white/50 border border-white/5 flex items-center gap-1">
                            <ShieldCheck size={10} className="text-emerald-400" />
                            <span>trainings.msn-global.com</span>
                          </div>
                          <span className="text-[10px] font-mono text-purple-400">Apple HIG</span>
                        </div>

                        {/* Internal Mockup Content */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
                            <span className="text-[9px] font-mono text-white/40 uppercase block">Course Track</span>
                            <p className="text-xs font-bold text-white">AI & Deep Learning</p>
                            <span className="text-[10px] text-emerald-400 font-mono">Live Admissions</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
                            <span className="text-[9px] font-mono text-white/40 uppercase block">Delivery Speed</span>
                            <p className="text-xs font-bold text-white">0.6s Global Edge FCP</p>
                            <span className="text-[10px] text-cyan-400 font-mono">Sub-Second CDN</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 space-y-1">
                            <span className="text-[9px] font-mono text-white/40 uppercase block">Triage Funnel</span>
                            <p className="text-xs font-bold text-white">Instant WhatsApp API</p>
                            <span className="text-[10px] text-rose-400 font-mono">Zero-Friction</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Greyed Out Sneak Peek Frame */
                      <div className="relative rounded-xl overflow-hidden bg-[#07070d] border border-white/5 p-4 flex items-center justify-center h-32 sm:h-36">
                        <div className="text-center space-y-1.5">
                          <Lock size={18} className="text-white/20 mx-auto mb-1" />
                          <p className="text-xs font-mono text-white/40 font-medium">Architecture Blueprint in Curation</p>
                          <p className="text-[10px] font-mono text-white/25">Scheduled for next documentation cycle</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom: Metric Badges & Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/8 relative z-10">
                  {/* Metric Stat Strip */}
                  <div className="flex flex-wrap items-center gap-2">
                    {study.stats.slice(0, 3).map((st) => (
                      <div
                        key={st.label}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/8 text-[11px] font-mono flex items-center gap-1.5"
                      >
                        <span className="text-white/40 text-[10px]">{st.label}:</span>
                        <span className="font-bold text-white">{st.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Primary Action Button */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isReady ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openStudy(study.id);
                          }}
                          className="px-5 py-2 rounded-full bg-white text-black font-bold text-xs flex items-center gap-2 hover:bg-neutral-200 transition-all shadow-sm cursor-pointer hover:scale-105"
                        >
                          <span>Open Case Study</span>
                          <ArrowRight size={13} />
                        </button>
                        {study.externalUrl && (
                          <a
                            href={study.externalUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
                            title="Visit live deployment"
                          >
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </>
                    ) : (
                      <span className="text-xs font-mono text-white/30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
                        <Clock size={11} />
                        <span>Coming Soon</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* CASE STUDY DETAILS MODAL / PRESENTATION SLIDE DECK VIEW                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {(isModalOpen || selectedStudyId) && selectedStudy && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-2xl flex justify-center p-3 sm:p-6 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-7xl bg-[#090912] border border-white/15 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.98)] overflow-hidden flex flex-col my-auto"
            >
              {/* Top Modal Navigation Header */}
              <div className="sticky top-0 z-30 px-6 sm:px-8 py-4 bg-[#090912]/95 border-b border-white/10 backdrop-blur-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedStudyId(null);
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
                    title="Close Case Study (Esc)"
                  >
                    <ArrowLeft size={14} />
                    <span className="hidden sm:inline">Back to Showcase</span>
                  </button>

                  <div className="h-4 w-px bg-white/10 hidden sm:block" />

                  <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-white/50 truncate max-w-md">
                    <span className="text-purple-400 font-bold">{selectedStudy.client}</span>
                    <span>/</span>
                    <span className="text-white truncate">{selectedStudy.title}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Live Production
                  </span>
                  {selectedStudy.externalUrl && (
                    <a
                      href={selectedStudy.externalUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="px-4 py-1.5 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Visit Live Portal</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setSelectedStudyId(null);
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors cursor-pointer"
                    title="Close Modal"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Modal Body: Column-Based Presentation Slides Layout */}
              <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* ------------------------------------------------------------- */}
                {/* LEFT STICKY SIDEBAR: Table of Contents & Quick Metadata       */}
                {/* ------------------------------------------------------------- */}
                <div className="lg:col-span-3 sticky top-24 space-y-5 hidden lg:block">
                  {/* Table of Contents Card */}
                  <div className="p-5 rounded-2xl bg-[#0e0e1a] border border-white/10 backdrop-blur-md space-y-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold">
                      <Layers size={13} />
                      <span>Table of Contents</span>
                    </div>

                    <nav className="space-y-1">
                      {sectionsTOC.map((sec) => {
                        const isActive = activeSection === sec.id;
                        return (
                          <button
                            key={sec.id}
                            onClick={() => scrollToSection(sec.id)}
                            className={cn(
                              "w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-between cursor-pointer",
                              isActive
                                ? "bg-white text-black font-bold shadow-md"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                          >
                            <span>{sec.label}</span>
                            {isActive && <ChevronRight size={13} className="text-black" />}
                          </button>
                        );
                      })}
                    </nav>
                  </div>

                  {/* Project Specs Card */}
                  <div className="p-5 rounded-2xl bg-[#0e0e1a] border border-white/10 space-y-3.5 text-xs">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 font-bold">
                      Project Dossier
                    </div>

                    <div className="space-y-2.5">
                      <div>
                        <span className="text-[10px] font-mono text-white/40 block">Client</span>
                        <p className="font-bold text-white">{selectedStudy.client}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-white/40 block">Timeline</span>
                        <p className="font-bold text-purple-300">{selectedStudy.timeline}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-white/40 block">Category</span>
                        <p className="font-bold text-white">{selectedStudy.category}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-white/40 block">Design Standard</span>
                        <p className="font-bold text-emerald-400">Apple HIG & Rhythmic Grid</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <a
                        href="https://calendly.com/digital-b3asts/quick-free-consultation"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs text-center block transition-all border border-white/10"
                      >
                        Book a Strategy Call
                      </a>
                    </div>
                  </div>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* RIGHT COLUMN: Presentation Slides & Structured Infographics  */}
                {/* ------------------------------------------------------------- */}
                <div className="lg:col-span-9 space-y-12">
                  {/* SLIDE 01: Executive Brief & Metric Strip */}
                  <section id="cs-section-brief" className="scroll-mt-28 space-y-6">
                    <div className="p-6 sm:p-8 md:p-10 rounded-[2rem] bg-gradient-to-b from-[#111122] to-[#0a0a14] border border-white/12 relative overflow-hidden shadow-xl">
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono">
                          <Sparkles size={12} />
                          <span>01. Executive Brief & Scope</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                          {selectedStudy.subtitle}
                        </h2>

                        <p className="text-white/70 text-sm sm:text-base leading-relaxed font-normal">
                          {selectedStudy.overview}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-2">
                          {selectedStudy.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-white/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 4 High-Impact Metric Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                      {selectedStudy.stats.map((st) => (
                        <div
                          key={st.label}
                          className="p-4 rounded-2xl bg-[#0f0f1c] border border-white/10 flex flex-col justify-between h-28"
                        >
                          <span className="text-[10px] font-mono text-white/45 uppercase tracking-wider block">
                            {st.label}
                          </span>
                          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
                            {st.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* SLIDE 02: The Problem (Friction Audit & Journey Infographics) */}
                  <section id="cs-section-problem" className="scroll-mt-28 space-y-6">
                    <div className="p-6 sm:p-8 rounded-[2rem] bg-[#0c0c16] border border-white/10">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-2">
                        <AlertTriangle size={14} />
                        <span>02. The Problem // Friction Audit & Legacy Constraints</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                        {selectedStudy.problem.heading}
                      </h3>
                      <p className="text-white/60 text-xs sm:text-sm mb-6 leading-relaxed">
                        {selectedStudy.problem.subheading}
                      </p>

                      {/* 3 Friction Infographic Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {selectedStudy.problem.frictionPoints.map((pt) => (
                          <div
                            key={pt.id}
                            className="p-5 rounded-2xl bg-[#11111f]/80 border border-white/8 flex flex-col justify-between space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold text-white/40">{pt.tag}</span>
                              <span className="px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-[9px] font-mono font-semibold">
                                {pt.impact} Impact
                              </span>
                            </div>

                            <div>
                              <div className="text-xl font-bold text-rose-300 mb-1">{pt.metric}</div>
                              <h4 className="text-sm font-bold text-white mb-1.5">{pt.title}</h4>
                              <p className="text-xs text-white/60 leading-relaxed">{pt.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* User Journey Friction Comparison Infographic */}
                      <div className="p-5 rounded-2xl bg-black/40 border border-white/6 space-y-3">
                        <div className="text-xs font-mono uppercase text-white/50 tracking-wider font-bold">
                          User Journey Evolution: Legacy Drop-off vs. New Flow
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                          {/* Before Flow */}
                          <div className="p-3.5 rounded-xl bg-rose-500/[0.04] border border-rose-500/20 space-y-2">
                            <div className="text-[11px] font-mono font-bold text-rose-400 uppercase">
                              Legacy Experience (High Friction)
                            </div>
                            <div className="space-y-1.5 text-xs">
                              {selectedStudy.problem.journeyBefore.map((j, i) => (
                                <div key={i} className="flex items-center gap-2 text-white/60">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                                  <span className="font-bold text-white/80">{j.step}:</span>
                                  <span>{j.issue}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* After Flow */}
                          <div className="p-3.5 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20 space-y-2">
                            <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase">
                              Architected Experience (Zero Friction)
                            </div>
                            <div className="space-y-1.5 text-xs">
                              {selectedStudy.problem.journeyAfter.map((j, i) => (
                                <div key={i} className="flex items-center gap-2 text-white/60">
                                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                                  <span className="font-bold text-white/80">{j.step}:</span>
                                  <span>{j.benefit}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* SLIDE 03: The Solution (Architecture Pillars & Design System) */}
                  <section id="cs-section-solution" className="scroll-mt-28 space-y-6">
                    <div className="p-6 sm:p-8 rounded-[2rem] bg-[#0c0c16] border border-white/10 space-y-6">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-2">
                          <Compass size={14} />
                          <span>03. The Solution // 4 Core Engineering Pillars</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                          {selectedStudy.solution.heading}
                        </h3>
                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                          {selectedStudy.solution.subheading}
                        </p>
                      </div>

                      {/* 4 Pillar Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedStudy.solution.pillars.map((pil) => (
                          <div
                            key={pil.id}
                            className="p-6 rounded-2xl bg-gradient-to-b from-[#111122]/90 to-[#0a0a14] border border-white/10 space-y-4 hover:border-white/20 transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <span className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-[10px] font-mono text-purple-300 font-bold">
                                Pillar {pil.number}
                              </span>
                              <span className="text-[11px] font-mono text-white/40">{pil.tag}</span>
                            </div>

                            <div>
                              <h4 className="text-base font-bold text-white mb-0.5">{pil.title}</h4>
                              <p className="text-xs font-mono text-purple-300 mb-2">{pil.subtitle}</p>
                              <p className="text-xs text-white/60 leading-relaxed mb-3">{pil.description}</p>

                              <div className="space-y-1.5 pt-2 border-t border-white/5">
                                {pil.features.map((feat, i) => (
                                  <div key={i} className="flex items-center gap-2 text-[11px] text-white/70">
                                    <Check size={12} className="text-emerald-400 shrink-0" />
                                    <span>{feat}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Design Tokens & Grammar */}
                      <div className="p-5 rounded-2xl bg-[#090912] border border-white/8 space-y-4">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase text-pink-400 font-bold">
                          <Palette size={13} />
                          <span>Apple HIG Design Tokens & Strict Grid Grammar</span>
                        </div>

                        {/* Color Matrix */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                          {selectedStudy.solution.designSystem.colors.map((c) => (
                            <div
                              key={c.name}
                              className="p-3 rounded-xl bg-white/[0.03] border border-white/6 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <span
                                  className="w-3.5 h-3.5 rounded-full border border-white/20"
                                  style={{ backgroundColor: c.hex }}
                                />
                                <span className="text-[9px] font-mono text-white/40">{c.hex}</span>
                              </div>
                              <p className="text-[11px] font-bold text-white truncate">{c.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* SLIDE 04: Interactive Live Sandbox Viewport */}
                  <section id="cs-section-sandbox" className="scroll-mt-28 space-y-6">
                    <div className="p-6 sm:p-8 rounded-[2rem] bg-[#0c0c16] border border-white/10 shadow-2xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-1">
                            <Monitor size={14} />
                            <span>04. Live Production Sandbox Viewport</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white">
                            Interactive Portal Preview
                          </h3>
                        </div>

                        {/* Device Mode Switcher */}
                        <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/10">
                          <button
                            onClick={() => setViewportMode("desktop")}
                            className={cn(
                              "px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium",
                              viewportMode === "desktop"
                                ? "bg-white text-black font-bold shadow-sm"
                                : "text-white/60 hover:text-white"
                            )}
                          >
                            <Laptop size={13} />
                            <span>Desktop</span>
                          </button>
                          <button
                            onClick={() => setViewportMode("tablet")}
                            className={cn(
                              "px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium",
                              viewportMode === "tablet"
                                ? "bg-white text-black font-bold shadow-sm"
                                : "text-white/60 hover:text-white"
                            )}
                          >
                            <Tablet size={13} />
                            <span>Tablet</span>
                          </button>
                          <button
                            onClick={() => setViewportMode("mobile")}
                            className={cn(
                              "px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium",
                              viewportMode === "mobile"
                                ? "bg-white text-black font-bold shadow-sm"
                                : "text-white/60 hover:text-white"
                            )}
                          >
                            <Smartphone size={13} />
                            <span>Mobile</span>
                          </button>
                          <div className="w-px h-4 bg-white/10 mx-1" />
                          <button
                            onClick={() => setIframeKey((k) => k + 1)}
                            className="p-1.5 rounded-xl text-white/60 hover:text-white transition-colors cursor-pointer"
                            title="Reload iframe"
                          >
                            <RotateCw size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Device Chassis Frame */}
                      <div className="flex justify-center w-full">
                        <div
                          className={cn(
                            "transition-all duration-300 rounded-[24px] bg-black border-2 border-white/15 p-2.5 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden relative",
                            viewportMode === "desktop" && "w-full max-w-4xl h-[520px]",
                            viewportMode === "tablet" && "w-full max-w-xl h-[520px]",
                            viewportMode === "mobile" && "w-[360px] h-[580px]"
                          )}
                        >
                          <div className="px-3.5 py-2 bg-[#12121e] rounded-xl mb-2 flex items-center justify-between gap-3 border border-white/8">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                            </div>
                            <div className="flex-1 max-w-xs bg-black/60 px-3 py-0.5 rounded-md border border-white/5 text-[10px] font-mono text-white/60 truncate text-center flex items-center justify-center gap-1.5">
                              <ShieldCheck size={11} className="text-emerald-400 shrink-0" />
                              <span className="truncate">{selectedStudy.externalUrl}</span>
                            </div>
                            <button
                              onClick={() => selectedStudy.externalUrl && handleCopy(selectedStudy.externalUrl)}
                              className="text-[10px] font-mono text-white/40 hover:text-white transition-colors flex items-center gap-1"
                            >
                              {copiedUrl ? <Check size={11} className="text-emerald-400" /> : <Share2 size={11} />}
                              <span>{copiedUrl ? "Copied" : "Copy"}</span>
                            </button>
                          </div>

                          <div className="w-full h-[calc(100%-42px)] rounded-lg overflow-hidden bg-[#08080e] relative">
                            {selectedStudy.externalUrl ? (
                              <iframe
                                key={iframeKey}
                                src={selectedStudy.externalUrl}
                                title="MSN Live Training Portal Sandbox"
                                className="w-full h-full border-0 bg-[#08080e]"
                                loading="lazy"
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/40 text-xs font-mono">
                                Live sandbox preview unavailable
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* SLIDE 05: The Outcome (Verified Impact & Client Endorsement) */}
                  <section id="cs-section-outcome" className="scroll-mt-28 space-y-6">
                    <div className="p-6 sm:p-8 rounded-[2rem] bg-[#0c0c16] border border-white/10 space-y-6">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
                          <TrendingUp size={14} />
                          <span>05. The Outcome // Measurable Business Velocity</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                          {selectedStudy.outcome.heading}
                        </h3>
                        <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                          {selectedStudy.outcome.subheading}
                        </p>
                      </div>

                      {/* 4 Outcome Stat Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedStudy.outcome.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="p-5 rounded-2xl bg-gradient-to-b from-[#111122] to-[#0a0a14] border border-white/10 flex flex-col justify-between h-36"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono text-white/50 uppercase tracking-wider">{m.label}</span>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold">
                                {m.change}
                              </span>
                            </div>
                            <div>
                              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans mb-1">
                                {m.value}
                              </div>
                              <p className="text-xs text-white/60 leading-tight">{m.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Client Testimonial Quote Card */}
                      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-900/20 via-black to-[#0d0d1a] border border-purple-500/30 relative overflow-hidden">
                        <div className="space-y-4 relative z-10">
                          <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill="currentColor" />
                            ))}
                          </div>

                          <blockquote className="text-sm sm:text-base text-white/90 italic leading-relaxed font-normal">
                            "{selectedStudy.outcome.testimonial.quote}"
                          </blockquote>

                          <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                            <div className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-xs font-mono font-bold text-white">
                              {selectedStudy.outcome.testimonial.avatarText}
                            </div>
                            <div>
                              <div className="text-xs sm:text-sm font-bold text-white">
                                {selectedStudy.outcome.testimonial.author}
                              </div>
                              <div className="text-[11px] text-white/50 font-mono">
                                {selectedStudy.outcome.testimonial.role} • {selectedStudy.outcome.testimonial.company}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Modal Footer CTA */}
                  <div className="rounded-2xl bg-[#10101c] border border-white/12 p-6 sm:p-8 text-center space-y-4">
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      Ready to architect a high-conversion digital platform?
                    </h4>
                    <p className="text-xs sm:text-sm text-white/60 max-w-xl mx-auto">
                      Let's design and engineer an Apple-grade web application tailored to your business goals.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <a
                        href="https://calendly.com/digital-b3asts/quick-free-consultation"
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 rounded-full bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all shadow-md"
                      >
                        Book a Strategy Call
                      </a>
                      <button
                        onClick={() => {
                          setIsModalOpen(false);
                          setSelectedStudyId(null);
                        }}
                        className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 transition-colors"
                      >
                        Close Case Study
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Bottom Consultation CTA Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-[2.5rem] bg-gradient-to-b from-[#121222] to-[#0a0a14] border border-white/12 p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-2xl shadow-2xl"
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
            Engineering & Strategy Advisory
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Have an enterprise platform or high-impact SaaS in mind?
          </h3>
          <p className="text-white/65 text-xs sm:text-sm md:text-base leading-relaxed">
            We architect and construct high-performance digital systems, full-stack platforms, and Apple-grade user experiences with verifiable results.
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
};
