import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Rocket,
  Github,
  ExternalLink,
  Download,
  Sparkles,
  ShieldCheck,
  Cpu,
  Zap,
  Mic,
  Code2,
  Terminal,
  ArrowUpRight,
  ArrowLeft,
  Copy,
  Check,
  Bug,
  Search,
  Palette,
  Bot,
} from "lucide-react";

export interface FlagshipProduct {
  id: string;
  name: string;
  tagline: string;
  category: "AI Tools" | "Agentic OS" | "Design";
  status: "Active Beta (MVP)" | "Coming Soon" | "In Development";
  version?: string;
  icon?: string;
  fallbackIconType: "mic" | "bot" | "palette" | "sparkles";
  tags: string[];
  githubTags: string[];
  pricing: string;
  desc: string;
  repoUrl?: string;
  issuesUrl?: string;
  downloadUrl?: string;
  demoGif?: string;
  previewUrl?: string;
  hasRichDetail?: boolean;
}

const FLAGSHIPS: FlagshipProduct[] = [
  {
    id: "murmur",
    name: "MurMur",
    tagline: "Ambient AI Voice & Assistant Operating System",
    category: "AI Tools",
    status: "Active Beta (MVP)",
    version: "v0.3.2",
    icon: "https://raw.githubusercontent.com/Mr-ABX/MurMur/main/app-icon.png",
    fallbackIconType: "mic",
    tags: ["Voice AI", "Whisper", "Rust", "Tauri v2"],
    githubTags: [
      "ai-assistant",
      "dynamic-notch",
      "speech-to-text",
      "voice-dictation",
      "whisper",
      "rust",
      "tauri",
    ],
    pricing: "100% Free & Open Source",
    desc: "Sub-second local Whisper dictation, Dynamic Notch overlay, and universal auto-paste for macOS & Windows with zero telemetry.",
    repoUrl: "https://github.com/Mr-ABX/MurMur",
    issuesUrl: "https://github.com/Mr-ABX/MurMur/issues",
    downloadUrl: "https://github.com/Mr-ABX/MurMur/releases/latest",
    demoGif: "https://raw.githubusercontent.com/Mr-ABX/MurMur/main/assets/demo.gif",
    hasRichDetail: true,
  },
  {
    id: "zero-os",
    name: "Zero OS",
    tagline: "Autonomous Agentic Operating System",
    category: "Agentic OS",
    status: "Coming Soon",
    version: "v0.1.0",
    fallbackIconType: "bot",
    tags: ["Agentic AI", "Autonomous OS", "LLM Runtime"],
    githubTags: ["agentic-ai", "autonomous-agents", "llm-runtime", "system-automation"],
    pricing: "Developer Tier",
    desc: "Autonomous multi-agent desktop runtime designed to execute workflows across system apps and developer environments without human supervision.",
    repoUrl: "https://github.com/Mr-ABX",
    issuesUrl: "https://github.com/Mr-ABX/MurMur/issues",
    hasRichDetail: true,
  },
  {
    id: "kairos",
    name: "Kairos",
    tagline: "Spatial Design System & Motion Architecture",
    category: "Design",
    status: "Coming Soon",
    version: "v0.2.0",
    fallbackIconType: "palette",
    tags: ["Design Systems", "Motion FX", "Spatial UI"],
    githubTags: ["design-systems", "spatial-ui", "motion-architecture", "design-tokens"],
    pricing: "Design Engine",
    desc: "Generative design system builder for engineering fluid kinetic micro-interactions, responsive 3D tokens, and production shader variables.",
    repoUrl: "https://github.com/Mr-ABX",
    issuesUrl: "https://github.com/Mr-ABX/MurMur/issues",
    hasRichDetail: true,
  },
  {
    id: "zenmaker",
    name: "ZenMaker",
    tagline: "Minimalist Vector Canvas & Prototyper",
    category: "Design",
    status: "Coming Soon",
    version: "v0.1.5",
    fallbackIconType: "sparkles",
    tags: ["Vector Canvas", "Prototyping", "Design Tool"],
    githubTags: ["vector-editor", "canvas-engine", "ui-ux", "prototyping-tool"],
    pricing: "Free / Pro",
    desc: "Distraction-free, zero-latency vector canvas built for modern software designers, indie hackers, and founders seeking pure creative flow.",
    repoUrl: "https://github.com/Mr-ABX",
    issuesUrl: "https://github.com/Mr-ABX/MurMur/issues",
    hasRichDetail: true,
  },
];

const FILTER_CATEGORIES = ["All", "AI Tools", "Agentic OS", "Design"] as const;

export const FlagshipsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [detailSubTab, setDetailSubTab] = useState<"overview" | "specs" | "downloads">("overview");

  const handleCopyLink = (product: FlagshipProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = product.previewUrl || product.repoUrl || "https://github.com/Mr-ABX/MurMur";
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(product.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleReportIssue = (product: FlagshipProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const url = product.issuesUrl || "https://github.com/Mr-ABX/MurMur/issues";
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Filter products strictly by remaining categories
  const filteredProducts = useMemo(() => {
    return FLAGSHIPS.filter((p) => {
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Selected product object for detail modal/page
  const activeProduct = useMemo(() => {
    return FLAGSHIPS.find((p) => p.id === selectedProductId) || null;
  }, [selectedProductId]);

  const renderIcon = (product: FlagshipProduct) => {
    if (product.icon) {
      return (
        <img
          src={product.icon}
          alt={product.name}
          className="w-full h-full object-cover rounded-2xl"
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none";
          }}
        />
      );
    }
    switch (product.fallbackIconType) {
      case "mic":
        return <Mic size={30} className="text-purple-400" />;
      case "bot":
        return <Bot size={30} className="text-purple-400" />;
      case "palette":
        return <Palette size={30} className="text-purple-300" />;
      case "sparkles":
        return <Sparkles size={30} className="text-purple-400" />;
      default:
        return <Rocket size={30} className="text-purple-400" />;
    }
  };

  const getStatusBadge = (status: FlagshipProduct["status"]) => {
    switch (status) {
      case "Active Beta (MVP)":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            {status}
          </span>
        );
      case "Coming Soon":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/10 text-white/70 border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            {status}
          </span>
        );
      case "In Development":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-1 pb-12 font-sans select-none text-left">
      <AnimatePresence mode="wait">
        {activeProduct ? (
          /* Detail View Mode */
          <motion.div
            key="detail-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-6"
          >
            {/* Top Back Navigation & Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
              <button
                onClick={() => setSelectedProductId(null)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#12121c] hover:bg-[#181826] text-white/80 hover:text-white border border-white/10 text-xs font-mono font-semibold transition-all hover:border-purple-500/40 cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back to all Flagships</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleCopyLink(activeProduct, e)}
                  className="px-3 py-1.5 rounded-xl bg-[#12121c] hover:bg-[#181826] text-white/70 hover:text-white border border-white/10 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedId === activeProduct.id ? (
                    <>
                      <Check size={13} className="text-purple-400" />
                      <span className="text-purple-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <button
                  onClick={(e) => handleReportIssue(activeProduct, e)}
                  className="px-3 py-1.5 rounded-xl bg-[#12121c] hover:bg-[#181826] text-white/70 hover:text-white border border-white/10 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Bug size={13} className="text-purple-400/80" />
                  <span>Report Issue</span>
                </button>
              </div>
            </div>

            {/* Product In-Depth Hero Showcase (Solid Background) */}
            <section className="relative rounded-3xl border border-white/10 bg-[#0d0d15] p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#161622] border border-white/10 shrink-0 flex items-center justify-center overflow-hidden shadow-md p-0">
                    {renderIcon(activeProduct)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {activeProduct.name}
                      </h2>
                      {activeProduct.version && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/10 text-white border border-white/15">
                          {activeProduct.version}
                        </span>
                      )}
                      {getStatusBadge(activeProduct.status)}
                    </div>
                    <p className="text-xs sm:text-sm text-white/70 font-medium">
                      {activeProduct.tagline}
                    </p>
                    <p className="text-[11px] text-purple-400/90 font-mono mt-0.5">
                      {activeProduct.pricing}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  {activeProduct.downloadUrl && (
                    <a
                      href={activeProduct.downloadUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Download size={14} />
                      <span>Download Latest</span>
                    </a>
                  )}

                  {activeProduct.repoUrl && (
                    <a
                      href={activeProduct.repoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#151522] hover:bg-[#1b1b2a] text-white/90 hover:text-white border border-white/10 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <Github size={14} />
                      <span>GitHub</span>
                      <ArrowUpRight size={13} className="text-white/40" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="py-5 text-sm text-white/70 leading-relaxed font-light space-y-3">
                <p>{activeProduct.desc}</p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {activeProduct.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-purple-500/10 text-purple-300/80 border border-purple-500/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* MurMur Specific Interactive Sections */}
              {activeProduct.id === "murmur" && (
                <>
                  <div className="my-3 rounded-2xl border border-white/10 bg-[#08080f] overflow-hidden p-2 sm:p-3">
                    <div className="flex items-center justify-between px-3 py-2 text-[11px] font-mono text-white/50 border-b border-white/5 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                        <span className="text-white/80">Dynamic Notch Overlay & Voice Wave Preview</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-purple-400/60 hidden sm:inline font-mono">
                        v0.3.2 Native Build
                      </span>
                    </div>

                    <div className="relative rounded-xl overflow-hidden bg-black flex items-center justify-center">
                      <img
                        src="https://raw.githubusercontent.com/Mr-ABX/MurMur/main/assets/demo.gif"
                        alt="MurMur Dynamic Notch Demo Preview"
                        className="w-full h-auto max-h-[480px] object-contain rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-5 border-t border-white/5 mb-5">
                    {(
                      [
                        { id: "overview", label: "Core Capabilities" },
                        { id: "specs", label: "Benchmark Comparison" },
                        { id: "downloads", label: "Releases & Installers" },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setDetailSubTab(tab.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          detailSubTab === tab.id
                            ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {detailSubTab === "overview" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {[
                        {
                          title: "100% Local Whisper",
                          badge: "Zero Latency",
                          desc: "Private on-device transcription via whisper.cpp. Zero audio leaves your computer, zero cloud telemetry.",
                          icon: <ShieldCheck className="text-purple-400" size={18} />,
                        },
                        {
                          title: "Universal Auto-Paste",
                          badge: "Type Anywhere",
                          desc: "Directly types transcribed text into any active application with zero popups and zero clipboard friction.",
                          icon: <Zap className="text-purple-300" size={18} />,
                        },
                        {
                          title: "Dynamic Island & Notch",
                          badge: "Fluid Physics",
                          desc: "Apple Intelligence-inspired glowing sinusoidal wave driven by a 60 FPS real-time CoreAudio engine.",
                          icon: <Sparkles className="text-purple-400" size={18} />,
                        },
                        {
                          title: "VoxCoder Dictation",
                          badge: "Developer Syntax",
                          desc: "Translates spoken voice commands into clean programming syntax: camelCase, snake_case, brackets, and code symbols.",
                          icon: <Code2 className="text-purple-300" size={18} />,
                        },
                        {
                          title: "Hybrid Cloud Freedom",
                          badge: "Free Tier APIs",
                          desc: "Choose between offline local Whisper models or connect free API keys: Google Gemini 2.0 Flash, Groq Whisper LPU.",
                          icon: <Cpu className="text-purple-400" size={18} />,
                        },
                        {
                          title: "Native Rust & Tauri v2",
                          badge: "~35 MB RAM",
                          desc: "Engineered in Rust & Tauri v2 with native Cocoa bridges. Consumes ~35 MB idle RAM and minimal battery.",
                          icon: <Terminal className="text-purple-300" size={18} />,
                        },
                      ].map((feat, i) => (
                        <div
                          key={i}
                          className="p-4 rounded-2xl bg-[#12121c] border border-white/5 hover:border-purple-500/30 transition-colors text-left space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                              {feat.icon}
                            </div>
                            <span className="text-[10px] font-mono text-purple-300/80 bg-purple-500/10 px-2 py-0.5 rounded">
                              {feat.badge}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-white tracking-tight">{feat.title}</h4>
                          <p className="text-xs text-white/60 leading-relaxed font-light">{feat.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {detailSubTab === "specs" && (
                    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0a10]">
                      <table className="w-full text-left text-xs font-sans">
                        <thead>
                          <tr className="border-b border-white/10 bg-white/5 text-white/70 font-mono text-[11px]">
                            <th className="py-3 px-4">Feature</th>
                            <th className="py-3 px-4 text-purple-300 font-bold bg-purple-500/10">🎙️ MurMur</th>
                            <th className="py-3 px-4 text-white/50">Wispr Flow</th>
                            <th className="py-3 px-4 text-white/50">Otter.ai</th>
                            <th className="py-3 px-4 text-white/50">Superwhisper</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-light text-white/80">
                          <tr>
                            <td className="py-3 px-4 font-medium text-white">Pricing</td>
                            <td className="py-3 px-4 font-bold text-purple-400 bg-purple-500/5">
                              100% Free & Open-Source
                            </td>
                            <td className="py-3 px-4 text-white/50">$15 / mo</td>
                            <td className="py-3 px-4 text-white/50">$10–$20 / mo</td>
                            <td className="py-3 px-4 text-white/50">$8.99/mo or $199</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-medium text-white">Audio Privacy</td>
                            <td className="py-3 px-4 font-bold text-purple-400 bg-purple-500/5">
                              100% Local (Zero cloud upload)
                            </td>
                            <td className="py-3 px-4 text-white/50">Sent to Cloud</td>
                            <td className="py-3 px-4 text-white/50">Sent to Cloud</td>
                            <td className="py-3 px-4 text-white/50">Hybrid / Local</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-medium text-white">Idle Memory</td>
                            <td className="py-3 px-4 font-bold text-purple-300 bg-purple-500/5">
                              ~35 MB RAM
                            </td>
                            <td className="py-3 px-4 text-white/50">~250 MB+</td>
                            <td className="py-3 px-4 text-white/50">~300 MB+</td>
                            <td className="py-3 px-4 text-white/50">~400 MB+</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-medium text-white">Disk Footprint</td>
                            <td className="py-3 px-4 font-bold text-purple-300 bg-purple-500/5">
                              ~150 MB (Base model)
                            </td>
                            <td className="py-3 px-4 text-white/50">500 MB+</td>
                            <td className="py-3 px-4 text-white/50">Web / Mobile</td>
                            <td className="py-3 px-4 text-white/50">1.2 GB+</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-medium text-white">Dynamic Notch UI</td>
                            <td className="py-3 px-4 font-bold text-purple-400 bg-purple-500/5">
                              Yes (Floating Pill + Wave)
                            </td>
                            <td className="py-3 px-4 text-white/30">None</td>
                            <td className="py-3 px-4 text-white/30">None</td>
                            <td className="py-3 px-4 text-white/30">None</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {detailSubTab === "downloads" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-2xl bg-[#12121c] border border-white/10 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/15 text-purple-300">
                            macOS Apple Silicon
                          </span>
                          <h5 className="text-sm font-bold text-white">M1 / M2 / M3 / M4</h5>
                          <p className="text-xs text-white/50">
                            Native aarch64 build for Apple Silicon Macs running macOS 11.0+.
                          </p>
                        </div>
                        <a
                          href="https://github.com/Mr-ABX/MurMur/releases/latest"
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-4 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                          <Download size={13} />
                          <span>Murmur_aarch64.dmg</span>
                        </a>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#12121c] border border-white/10 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white">
                            macOS Intel
                          </span>
                          <h5 className="text-sm font-bold text-white">x86_64 Intel Macs</h5>
                          <p className="text-xs text-white/50">
                            Optimized 64-bit build for Intel Macs running macOS 10.15+.
                          </p>
                        </div>
                        <a
                          href="https://github.com/Mr-ABX/MurMur/releases/latest"
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-4 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                          <Download size={13} />
                          <span>Murmur_x64.dmg</span>
                        </a>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#12121c] border border-white/10 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-white">
                            Windows 64-bit
                          </span>
                          <h5 className="text-sm font-bold text-white">Windows 10 / 11</h5>
                          <p className="text-xs text-white/50">
                            Standalone setup executable (.exe) and installer (.msi).
                          </p>
                        </div>
                        <a
                          href="https://github.com/Mr-ABX/MurMur/releases/latest"
                          target="_blank"
                          rel="noreferrer noopener"
                          className="mt-4 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                        >
                          <Download size={13} />
                          <span>Murmur_setup.exe</span>
                        </a>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Other Products Concept Architecture Preview */}
              {activeProduct.id !== "murmur" && (
                <div className="mt-4 p-5 rounded-2xl bg-[#12121c] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                    <Sparkles size={14} />
                    <span>Product Architecture & Roadmap</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {activeProduct.name} is currently in development. To receive early access notifications or track progress, stay tuned on GitHub.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeProduct.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-semibold bg-purple-500/10 text-purple-300/80 border border-purple-500/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </motion.div>
        ) : (
          /* Cards Grid Mode (Default Minimal View) */
          <motion.div
            key="grid-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Header: Clean & Compact with Zero Extra Negative Space */}
            <header className="border-b border-white/10 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/25">
                      <Rocket size={11} className="text-purple-400" />
                      FLAGSHIPS
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      Independent Tools & OS
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Flagship Products
                  </h1>
                </div>

                <a
                  href="https://github.com/Mr-ABX"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-3 py-1.5 rounded-xl bg-[#12121c] hover:bg-[#181826] text-white/70 hover:text-white border border-white/10 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors self-start sm:self-auto hover:border-purple-500/30"
                >
                  <Github size={13} />
                  <span>@Mr-ABX</span>
                </a>
              </div>
            </header>

            {/* Filter Bar: AI Tools, Agentic OS, Design */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {FILTER_CATEGORIES.map((cat) => {
                  const count =
                    cat === "All"
                      ? FLAGSHIPS.length
                      : FLAGSHIPS.filter((p) => p.category === cat).length;

                  const isSelected = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium font-sans flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-600/25 scale-[1.02]"
                          : "bg-[#12121c] hover:bg-[#181826] text-white/60 hover:text-white border border-white/10"
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                          isSelected ? "bg-black/20 text-white" : "bg-white/10 text-white/50"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Minimal Search Input */}
              <div className="relative w-full sm:w-60">
                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#12121c] border border-white/10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 transition-colors font-sans"
                />
              </div>
            </div>

            {/* Minimal, Clean, Solid Background Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  whileHover={{
                    y: -4,
                    transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
                  }}
                  onClick={() => setSelectedProductId(product.id)}
                  className="group relative rounded-2xl border border-white/10 bg-[#0e0e16] p-5 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-600/10 cursor-pointer text-left"
                >
                  {/* Card Main Info */}
                  <div className="space-y-3">
                    {/* Top Row: Full-fit Icon + Status Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-[#151522] border border-white/10 shrink-0 flex items-center justify-center overflow-hidden shadow-md p-0 group-hover:scale-105 transition-transform duration-300">
                        {renderIcon(product)}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {getStatusBadge(product.status)}
                        {product.version && (
                          <span className="text-[10px] font-mono text-white/40">
                            {product.version}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title, Tagline & Category */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                          {product.name}
                        </h3>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300/80 border border-purple-500/20">
                          {product.category}
                        </span>
                      </div>
                      <p className="text-xs text-white/50 font-mono mt-0.5 line-clamp-1">
                        {product.tagline}
                      </p>
                    </div>

                    {/* Minimal, Comfortable 2-Line Description */}
                    <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                      {product.desc}
                    </p>

                    {/* Clean Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-white/5 text-white/50 border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Quick Actions */}
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* 1-Click Copy Link Button */}
                      <button
                        onClick={(e) => handleCopyLink(product, e)}
                        className="p-1.5 rounded-lg bg-[#151522] hover:bg-[#1b1b2c] text-white/60 hover:text-white border border-white/5 transition-colors cursor-pointer"
                        title="Copy Link"
                      >
                        {copiedId === product.id ? (
                          <Check size={13} className="text-purple-400" />
                        ) : (
                          <Copy size={13} />
                        )}
                      </button>

                      {/* Report Issue Button */}
                      <button
                        onClick={(e) => handleReportIssue(product, e)}
                        className="p-1.5 rounded-lg bg-[#151522] hover:bg-[#1b1b2c] text-white/60 hover:text-white border border-white/5 transition-colors cursor-pointer"
                        title="Report Issue"
                      >
                        <Bug size={13} className="text-purple-400/70 hover:text-purple-400" />
                      </button>

                      {product.repoUrl && (
                        <a
                          href={product.repoUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-lg bg-[#151522] hover:bg-[#1b1b2c] text-white/60 hover:text-white border border-white/5 transition-colors"
                          title="Open GitHub"
                        >
                          <Github size={13} />
                        </a>
                      )}
                    </div>

                    {/* View Details Action with Purplish Accent */}
                    <div className="flex items-center gap-1 text-[11px] font-mono font-medium text-purple-400 group-hover:text-purple-300">
                      <span>Explore</span>
                      <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-12 text-center text-white/40 font-mono text-xs">
                No flagship products found matching your filter criteria.
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
