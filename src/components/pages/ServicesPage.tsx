import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bot,
  Layers,
  Brain,
  Code,
  Zap,
  Video,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MessageCircle,
  Calendar,
  X,
  Workflow,
  Sparkle,
} from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { cn } from "../../lib/utils";

interface ServiceDetail {
  id: string;
  title: string;
  category: string;
  startingPrice: string;
  turnaround: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ReactNode;
  accent: string;
  subServices: string[];
  idealFor: string;
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "ai-automation",
    title: "AI Automation & Agents",
    category: "AUTONOMOUS PIPELINES",
    startingPrice: "$2,400",
    turnaround: "1 — 2 Weeks",
    shortDesc: "Custom n8n workflows and autonomous multi-agent pipelines to automate complex operations.",
    fullDesc: "We design resilient autonomous workflows that eliminate manual data processing, integrate CRM systems, and orchestrate multi-model LLM reasoning into your daily pipeline.",
    icon: <Bot size={22} strokeWidth={1.5} />,
    accent: "#38bdf8",
    subServices: [
      "Custom n8n / Make.com enterprise workflow architecture",
      "Autonomous AI Agent swarms with memory & tool calling",
      "CRM, Slack, and database bidirectional synchronizations",
      "Automated webhook integrations & error-recovery loops",
      "Complete deployment with 30-day monitoring & maintenance",
    ],
    idealFor: "Founders & operations teams looking to automate repetitive 20+ hour weekly workflows.",
  },
  {
    id: "saas-development",
    title: "High-Performance SaaS & Web",
    category: "FULL-STACK PLATFORMS",
    startingPrice: "$4,200",
    turnaround: "2 — 4 Weeks",
    shortDesc: "Production-grade React & Next.js platforms built with Apple-grade fluid UX and scalable backends.",
    fullDesc: "From zero to live production app: we engineer responsive, high-performance web applications with real-time sync, secure authentication, and modern minimalist design.",
    icon: <Layers size={22} strokeWidth={1.5} />,
    accent: "#a78bfa",
    subServices: [
      "React 19 / Next.js architecture with TypeScript precision",
      "Tailwind CSS with Apple HIG fluid interactive physics",
      "Database schema design (PostgreSQL / Supabase / Firestore)",
      "Auth, Stripe billing, and user role-based permissions (RBAC)",
      "Vercel / Cloud Run automated CI/CD deployment pipelines",
    ],
    idealFor: "Startups and businesses needing an investor-ready, production-grade web product fast.",
  },
  {
    id: "ai-strategy",
    title: "AI Architecture & Strategy",
    category: "STRATEGIC CONSULTING",
    startingPrice: "$1,600",
    turnaround: "3 — 7 Days",
    shortDesc: "Comprehensive technical roadmap and AI model selection to maximize business ROI safely.",
    fullDesc: "Clear, battle-tested guidance on model architectures, vector database selection, cost estimation, and data security to prevent costly engineering detours.",
    icon: <Brain size={22} strokeWidth={1.5} />,
    accent: "#f472b6",
    subServices: [
      "System architecture review & model feasibility analysis",
      "Cost-optimized token economics & LLM latency budgeting",
      "Private data grounding (RAG) & privacy compliance roadmap",
      "Vendor vs open-source AI selection blueprint",
      "Actionable engineering backlog and technical specification",
    ],
    idealFor: "Leadership teams wanting a definitive, de-risked AI adoption strategy before building.",
  },
  {
    id: "full-stack-systems",
    title: "Custom Backend & API Systems",
    category: "SYSTEMS ARCHITECTURE",
    startingPrice: "$3,500",
    turnaround: "2 — 3 Weeks",
    shortDesc: "High-throughput APIs, microservices, and database infrastructures designed for zero downtime.",
    fullDesc: "Robust server architectures built to handle heavy concurrent loads, webhooks, asynchronous background job queues, and bulletproof data caching.",
    icon: <Code size={22} strokeWidth={1.5} />,
    accent: "#34d399",
    subServices: [
      "REST & GraphQL API design with automated OpenAPI documentation",
      "Background worker queues (BullMQ / Redis / Cloud Tasks)",
      "Database optimization, index tuning & data migration scripts",
      "Third-party webhook ingestion & rate-limiting guards",
      "Comprehensive telemetry, error alerting & logging setup",
    ],
    idealFor: "Companies scaling beyond initial prototypes who need solid, fault-tolerant infrastructure.",
  },
  {
    id: "growth-mechanics",
    title: "Growth & Acquisition Engines",
    category: "REVENUE AUTOMATION",
    startingPrice: "$2,200",
    turnaround: "1 — 2 Weeks",
    shortDesc: "Automated inbound capture, enrichment pipelines, and high-converting interactive web funnels.",
    fullDesc: "We build data-driven acquisition funnels combining frictionless interactive UX with instant lead qualification and CRM enrichment workflows.",
    icon: <Zap size={22} strokeWidth={1.5} />,
    accent: "#fbbf24",
    subServices: [
      "High-converting landing pages with interactive cost estimators",
      "Automated lead enrichment (Clearbit / Apollo / LinkedIn data)",
      "Real-time lead scoring & instant Slack notification bots",
      "Self-service onboarding flows with conversion tracking",
      "PostHog / Mixpanel behavioral analytics instrumentation",
    ],
    idealFor: "B2B businesses looking to double qualified lead velocity without hiring more SDRs.",
  },
  {
    id: "content-automation",
    title: "Omnichannel Media Pipelines",
    category: "GENERATIVE WORKFLOWS",
    startingPrice: "$1,900",
    turnaround: "1 — 2 Weeks",
    shortDesc: "Programmatic media rendering, transcript synthesis, and omnichannel distribution engines.",
    fullDesc: "Turn single raw assets into dozens of multi-platform formats automatically with custom generative pipelines and scheduled publishing triggers.",
    icon: <Video size={22} strokeWidth={1.5} />,
    accent: "#818cf8",
    subServices: [
      "Automated video rendering & subtitle formatting pipelines",
      "AI audio transcription and structured summary synthesis",
      "Dynamic programmatic banner and social asset generation",
      "Multi-platform scheduling (YouTube, X, LinkedIn, Instagram)",
      "Brand-aligned prompt engineering and consistency checks",
    ],
    idealFor: "Media brands and creators scaling content volume while maintaining strict brand aesthetics.",
  },
];

const CALENDLY_URL = "https://calendly.com/digital-b3asts/quick-free-consultation";
const WHATSAPP_PHONE = "923094506904";

export const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const handleOpenWhatsApp = (serviceTitle?: string) => {
    const text = serviceTitle
      ? `Hi Abdul Rahman, I'd like to discuss the "${serviceTitle}" service package for my project.`
      : "Hi Abdul Rahman, I'd like to discuss a tailored project with your team.";
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-12">
      {/* 1. Header & Strategic Positioning Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/80 font-mono text-[11px] uppercase tracking-[0.2em] mb-4">
          <Sparkles size={12} strokeWidth={1.5} className="text-amber-300" />
          <span>Capabilities &amp; Fixed-Scope Pricing</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 tracking-tight text-white">
          Engineered for High-Growth Teams
        </h1>

        <p className="text-white/70 leading-relaxed text-sm md:text-base font-normal max-w-2xl mx-auto mb-6">
          My team takes full ownership of your technical and growth lifecycle end-to-end once we establish a mutual fit. We build tailored, production-grade solutions — no generic templates.
        </p>

        {/* Priority SLA & Discovery Bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 p-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>&lt; 60 Min Response on WhatsApp (Mon–Fri Business Hours)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOpenWhatsApp()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-sm"
            >
              <MessageCircle size={14} />
              <span>WhatsApp Desk</span>
            </button>
            <button
              onClick={() => window.open(CALENDLY_URL, "_blank")}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold border border-white/15 transition-all"
            >
              <Calendar size={14} />
              <span>Book 20-Min Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Services Grid with Starting Prices & Modal Triggers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_DATA.map((service, i) => (
          <BentoCard
            key={service.id}
            delay={i * 0.06}
            className="p-6 sm:p-7 flex flex-col justify-between group cursor-pointer hover:border-slate-300/40 transition-all duration-300 relative overflow-hidden"
            onClick={() => setSelectedService(service)}
          >
            {/* Top Brushed Highlight */}
            <div className="absolute top-0 inset-x-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/40 transition-opacity" />

            <div>
              {/* Header: Icon & Category Tag */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-white/[0.08] transition-all"
                  style={{ color: service.accent }}
                >
                  {service.icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.04] text-white/50 border border-white/[0.06]">
                  {service.category}
                </span>
              </div>

              {/* Title & Short Description */}
              <h3 className="text-lg font-bold mb-2 text-white group-hover:text-white transition-colors tracking-tight">
                {service.title}
              </h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-normal mb-5">
                {service.shortDesc}
              </p>

              {/* Price & Turnaround Badge */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-4">
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase">Starting From</div>
                  <div className="text-base font-bold text-white tracking-tight">{service.startingPrice}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-white/40 uppercase">Turnaround</div>
                  <div className="text-xs font-mono text-white/80">{service.turnaround}</div>
                </div>
              </div>
            </div>

            {/* Bottom Inspect Action */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/60 group-hover:text-white transition-colors">
              <span className="flex items-center gap-1.5 text-slate-300 group-hover:text-white">
                <Sparkle size={12} className="text-amber-300" />
                <span>Inspect Deliverables</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.05] group-hover:bg-white/[0.12] border border-white/10 transition-all">
                <span>View Details</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>
          </BentoCard>
        ))}
      </div>

      {/* 3. Mutual Fit & Scope Transparency Card */}
      <div className="rounded-3xl bg-gradient-to-b from-[#141622]/95 via-[#0e1017]/95 to-[#08090f]/95 border border-white/10 p-7 sm:p-9 text-center max-w-3xl mx-auto backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 inset-x-12 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/70 font-mono text-[11px] mb-3">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>Transparent Fixed-Scope Guarantee</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
          Not sure which solution matches your scope?
        </h3>
        
        <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto mb-6">
          During our 20-minute discovery call, we analyze your exact operational bottlenecks, confirm mutual fit, and provide a clear, transparent implementation roadmap with fixed deliverables.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => handleOpenWhatsApp()}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20"
          >
            <MessageCircle size={15} />
            <span>Chat Directly on WhatsApp</span>
          </button>
          <button
            onClick={() => window.open(CALENDLY_URL, "_blank")}
            className="px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-bold border border-white/15 transition-all flex items-center gap-2"
          >
            <Calendar size={15} />
            <span>Schedule 20-Min Free Consultation</span>
          </button>
        </div>
      </div>

      {/* 4. Interactive Detail Modal (Openable Card View) */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#161826] via-[#0f111a] to-[#0a0b12] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-left"
            >
              {/* Top Brushed Highlight */}
              <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-white/70 hover:text-white transition-colors border border-white/10"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0"
                  style={{ color: selectedService.accent }}
                >
                  {selectedService.icon}
                </div>
                <div>
                  <div className="text-[11px] font-mono text-white/50 uppercase tracking-wider mb-1">
                    {selectedService.category}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {selectedService.title}
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/75 text-sm leading-relaxed mb-6 font-normal">
                {selectedService.fullDesc}
              </p>

              {/* Pricing & SLA Metadata Box */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-6">
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase mb-0.5">Investment</div>
                  <div className="text-lg font-bold text-white tracking-tight">{selectedService.startingPrice}</div>
                  <div className="text-[10px] text-white/40">Fixed-scope starting rate</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono text-white/40 uppercase mb-0.5">Turnaround</div>
                  <div className="text-sm font-semibold text-white/90 font-mono flex items-center gap-1.5 mt-0.5">
                    <Clock size={13} className="text-amber-300" />
                    <span>{selectedService.turnaround}</span>
                  </div>
                  <div className="text-[10px] text-white/40">Sprint based delivery</div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-[10px] font-mono text-white/40 uppercase mb-0.5">Response SLA</div>
                  <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mt-0.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>&lt; 60 Min</span>
                  </div>
                  <div className="text-[10px] text-white/40">Mon–Fri Business Hours</div>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="mb-6">
                <div className="text-xs font-mono uppercase tracking-wider text-white/60 mb-3 flex items-center gap-1.5">
                  <Workflow size={13} className="text-white/80" />
                  <span>What is Included in This Package</span>
                </div>
                <div className="space-y-2.5">
                  {selectedService.subServices.map((sub, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80">
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal Audience Note */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-6 text-xs text-white/60">
                <span className="font-semibold text-white/90 font-mono mr-1.5">MUTUAL FIT:</span>
                {selectedService.idealFor}
              </div>

              {/* Dual Action CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleOpenWhatsApp(selectedService.title)}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp (&lt;60m reply)</span>
                </button>
                <button
                  onClick={() => window.open(CALENDLY_URL, "_blank")}
                  className="w-full py-3 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-bold border border-white/15 transition-all flex items-center justify-center gap-2"
                >
                  <Calendar size={16} />
                  <span>Book 20-Min Discovery Call</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
