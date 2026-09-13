import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MessageCircle,
  Calendar,
  X,
  Workflow,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { cn } from "../../lib/utils";

// 3D Visual Artworks
import shapeGreenBlob from "../../assets/images/shape_green_blob_1789327926420.jpg";
import shapeOrangeRibbed from "../../assets/images/shape_orange_ribbed_1789327939534.jpg";
import shapeYellowCrystal from "../../assets/images/shape_yellow_crystal_1789327951530.jpg";
import shapeMagentaLoop from "../../assets/images/shape_magenta_loop_1789327963097.jpg";
import shapeBlueCloud from "../../assets/images/shape_blue_cloud_1789327973174.jpg";

interface ServiceColumn {
  id: string;
  tag: string;
  dotColor: string;
  title: string;
  startingPrice: string;
  turnaround: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  accent: string;
  subServices: string[];
  idealFor: string;
}

const SERVICES_COLUMNS: ServiceColumn[] = [
  {
    id: "web-design",
    tag: "WEB DESIGN",
    dotColor: "#22c55e",
    title: "WEB & SAAS DESIGN",
    startingPrice: "$2,800",
    turnaround: "1 — 2 Weeks",
    image: shapeGreenBlob,
    shortDesc: "Custom websites and SaaS interfaces for businesses, entrepreneurs, and creators with sleek, user-focused designs.",
    fullDesc: "We design and engineer high-performance web products, SaaS applications, and interactive platforms with Apple-grade fluid UX and clean component architecture.",
    accent: "#22c55e",
    subServices: [
      "Custom React 19 / Next.js architecture with TypeScript",
      "Tailwind CSS styling with responsive micro-interactions",
      "Interactive 3D & canvas motion integration",
      "Mobile-first responsive design & accessibility compliance",
      "Full SEO structure & Core Web Vitals optimization",
    ],
    idealFor: "Founders and businesses requiring a distinctive, high-converting digital presence.",
  },
  {
    id: "ai-automation",
    tag: "AI AUTOMATION",
    dotColor: "#f97316",
    title: "AUTONOMOUS AGENTS",
    startingPrice: "$2,400",
    turnaround: "1 — 2 Weeks",
    image: shapeOrangeRibbed,
    shortDesc: "Custom autonomous agent pipelines and n8n workflows that handle heavy operations without manual effort.",
    fullDesc: "Eliminate repetitive manual tasks with tailored multi-agent pipelines, automated CRM syncing, and reliable LLM-powered backend processing loops.",
    accent: "#f97316",
    subServices: [
      "Custom n8n / Make.com enterprise workflow architecture",
      "Autonomous AI Agent swarms with memory & tool calling",
      "CRM, Slack, and database bidirectional synchronizations",
      "Automated webhook integrations & error-recovery loops",
      "Complete deployment with 30-day monitoring & maintenance",
    ],
    idealFor: "Teams spending 20+ hours a week on manual data entry, customer triaging, or operations.",
  },
  {
    id: "ai-strategy",
    tag: "AI STRATEGY",
    dotColor: "#eab308",
    title: "ARCHITECTURE & ROADMAP",
    startingPrice: "$1,600",
    turnaround: "3 — 7 Days",
    image: shapeYellowCrystal,
    shortDesc: "Elevate your tech stack with cohesive AI blueprints, cost-optimized token economics, and de-risked roadmaps.",
    fullDesc: "Clear, battle-tested guidance on model architectures, vector database selection, cost estimation, and private data security before writing production code.",
    accent: "#eab308",
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
    id: "marketing",
    tag: "GROWTH ENGINES",
    dotColor: "#ec4899",
    title: "GROWTH & ACQUISITION",
    startingPrice: "$2,200",
    turnaround: "1 — 2 Weeks",
    image: shapeMagentaLoop,
    shortDesc: "Engage high-value leads with automated enrichment, conversion funnels, and real-time qualification triggers.",
    fullDesc: "We build data-driven acquisition engines combining frictionless interactive UX with instant lead qualification and CRM enrichment workflows.",
    accent: "#ec4899",
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
    id: "a-la-carte",
    tag: "À LA CARTE",
    dotColor: "#3b82f6",
    title: "BESPOKE & ADVISORY",
    startingPrice: "$1,200",
    turnaround: "3 — 5 Days",
    image: shapeBlueCloud,
    shortDesc: "Get targeted help with focused engineering sprints like API development, security audits, or performance tuning.",
    fullDesc: "Flexible, high-velocity engineering sprints for specialized technical needs, performance refactors, custom integrations, or architecture audits.",
    accent: "#3b82f6",
    subServices: [
      "Custom REST / GraphQL API engineering and webhook ingestion",
      "Performance optimization & Core Web Vitals remediation",
      "Database schema refactoring & query index tuning",
      "Third-party API integration & payment gateways (Stripe)",
      "Dedicated technical advisory & sprint-based fractional engineering",
    ],
    idealFor: "Companies needing immediate, senior-level execution on focused technical milestones.",
  },
];

const CALENDLY_URL = "https://calendly.com/digital-b3asts/quick-free-consultation";
const WHATSAPP_PHONE = "923094506904";

export const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceColumn | null>(null);

  const handleOpenWhatsApp = (serviceTitle?: string) => {
    const text = serviceTitle
      ? `Hi Abdul Rahman, I'd like to discuss the "${serviceTitle}" package for my project.`
      : "Hi Abdul Rahman, I'd like to discuss a tailored project with your team.";
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="relative min-h-screen text-white pb-16 max-w-[1240px] mx-auto">
      
      {/* Background Dot Matrix (Exact reference style) */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 opacity-35"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.22) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Main Structural Frame (Direct match to reference design layout) */}
      <div className="relative border border-white/20 rounded-2xl sm:rounded-3xl bg-black/95 backdrop-blur-2xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)]">
        
        {/* 1. Continuous Ticker / Marquee Bar */}
        <div className="border-b border-white/20 py-3.5 sm:py-4 overflow-hidden bg-black flex items-center relative select-none">
          <div className="flex whitespace-nowrap overflow-hidden">
            <div className="flex shrink-0 items-center animate-marquee">
              {[...Array(2)].map((_, idx) => (
                <span key={idx} className="font-mono uppercase tracking-[0.22em] text-xs sm:text-sm font-semibold text-white/90 flex items-center gap-6 mr-6">
                  <span>EMPOWERING IDEAS WITH CREATIVE COLLABORATION</span>
                  <span className="text-base">🚀</span>
                  <span>EMPOWERING IDEAS WITH CREATIVE COLLABORATION</span>
                  <span className="text-base">🚀</span>
                </span>
              ))}
            </div>
            <div className="flex shrink-0 items-center animate-marquee" aria-hidden="true">
              {[...Array(2)].map((_, idx) => (
                <span key={idx} className="font-mono uppercase tracking-[0.22em] text-xs sm:text-sm font-semibold text-white/90 flex items-center gap-6 mr-6">
                  <span>EMPOWERING IDEAS WITH CREATIVE COLLABORATION</span>
                  <span className="text-base">🚀</span>
                  <span>EMPOWERING IDEAS WITH CREATIVE COLLABORATION</span>
                  <span className="text-base">🚀</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Hero Title Section */}
        <div className="px-6 sm:px-10 md:px-14 pt-10 sm:pt-14 pb-10 md:pb-12 border-b border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4">
                Services for mission success
              </h1>
              <p className="text-white/65 text-sm sm:text-base font-normal max-w-2xl leading-relaxed">
                My team takes full ownership of your technical and creative execution end-to-end once we establish a mutual fit. We build tailored, production-grade solutions — no generic templates.
              </p>
            </div>

            {/* Response SLA Badge & Discovery Quick Action */}
            <div className="shrink-0 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>&lt; 60 Min Response on WhatsApp</span>
              </div>
              <button
                onClick={() => handleOpenWhatsApp()}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
              >
                <MessageCircle size={14} />
                <span>WhatsApp Desk</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. The 5-Column Grid with Vertical Dividers (Exact Match to Reference Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-white/20 bg-black">
          {SERVICES_COLUMNS.map((service, index) => (
            <motion.div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group relative flex flex-col justify-between p-6 sm:p-7 md:p-6 lg:p-7 hover:bg-white/[0.03] transition-all duration-300 cursor-pointer select-none"
            >
              {/* Top Tag with Colored Square Indicator Dot */}
              <div className="flex items-center justify-between gap-2 mb-8">
                <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-wider uppercase font-semibold text-white/90">
                  <span
                    className="w-2.5 h-2.5 rounded-[2px] shrink-0"
                    style={{ backgroundColor: service.dotColor }}
                  />
                  <span>{service.tag}</span>
                </div>
                
                {/* Starting Price Pill (Apple HIG Minimalist) */}
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/[0.06] border border-white/10 text-white/80 group-hover:border-white/30 transition-colors">
                  From {service.startingPrice}
                </span>
              </div>

              {/* Center 3D Visual Art Shape with Fluid Hover Floating Motion */}
              <div className="relative w-full aspect-square flex items-center justify-center my-6 sm:my-8">
                {/* Ambient Specular Glow on Hover */}
                <div 
                  className="absolute inset-4 rounded-full blur-2xl opacity-0 group-hover:opacity-35 transition-opacity duration-500"
                  style={{ backgroundColor: service.accent }}
                />
                
                <motion.div
                  className="relative w-36 sm:w-40 md:w-36 lg:w-40 aspect-square rounded-2xl overflow-hidden bg-black/40"
                  whileHover={{ scale: 1.08, y: -6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover rounded-2xl filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
                    loading="lazy"
                  />
                </motion.div>
              </div>

              {/* Bottom Typography & Description */}
              <div className="pt-4">
                <div className="flex items-center justify-between gap-1 mb-2">
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-white uppercase">
                    {service.title}
                  </h3>
                  <ArrowUpRight size={15} className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                </div>
                
                <p className="text-white/60 text-xs leading-relaxed font-normal line-clamp-4">
                  {service.shortDesc}
                </p>

                {/* Inspect Action Trigger */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40 group-hover:text-white/90 transition-colors">
                  <span>Inspect Deliverables</span>
                  <span className="text-white/70 group-hover:text-white">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* 4. Mutual Fit Assurance & Discovery Banner */}
      <div className="mt-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#141622]/95 via-[#0e1017]/95 to-[#08090f]/95 border border-white/15 p-6 sm:p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="text-left max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/80 font-mono text-[11px] mb-2">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>Mutual Fit Guarantee</span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-white mb-1.5">
            Ready to explore your custom roadmap?
          </h4>
          <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
            During our free 20-minute discovery session, we evaluate your technical requirements, outline immediate automation gains, and determine if our teams are the right fit.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => handleOpenWhatsApp()}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md"
          >
            <MessageCircle size={15} />
            <span>Chat on WhatsApp (&lt;60m reply)</span>
          </button>
          <button
            onClick={() => window.open(CALENDLY_URL, "_blank")}
            className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-bold border border-white/15 flex items-center gap-2 transition-all"
          >
            <Calendar size={15} />
            <span>Book 20-Min Call</span>
          </button>
        </div>
      </div>

      {/* 5. Interactive Detail Modal (Openable Card View on Click) */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#161826] via-[#0f111a] to-[#0a0b12] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-left"
            >
              {/* Top Specular Rim */}
              <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-white/70 hover:text-white transition-colors border border-white/10"
              >
                <X size={18} />
              </button>

              {/* Modal Header: 3D Art + Info */}
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-black/50 border border-white/15 shrink-0">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="w-2 h-2 rounded-[2px]"
                      style={{ backgroundColor: selectedService.dotColor }}
                    />
                    <span className="text-[11px] font-mono text-white/50 uppercase tracking-wider">
                      {selectedService.tag}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {selectedService.title}
                  </h2>
                </div>
              </div>

              {/* Detailed Description */}
              <p className="text-white/75 text-sm leading-relaxed mb-6 font-normal">
                {selectedService.fullDesc}
              </p>

              {/* Pricing, Turnaround & SLA Metadata Grid */}
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
                  <div className="text-[10px] text-white/40">Sprint delivery</div>
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
                  <span>Package Deliverables &amp; Inclusions</span>
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

              {/* Ideal Fit Note */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-6 text-xs text-white/60">
                <span className="font-semibold text-white/90 font-mono mr-1.5">IDEAL FIT:</span>
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
