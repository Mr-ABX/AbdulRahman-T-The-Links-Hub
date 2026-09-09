import React from "react";
import { motion } from "motion/react";
import { MedusaImage } from "./MedusaImage";
import { SpecularCard } from "./shared/SpecularCard";
import {
  ArrowRight,
  Monitor,
  Paintbrush,
  PlayCircle,
  Rss,
  ArrowUpRight,
  Zap,
  Target,
  Star,
  Brain,
  Sparkles,
  ExternalLink,
  Globe,
  Layers,
} from "lucide-react";

const myArea51Image =
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const HeroTitleLine = ({ 
  text, 
  variant = "black", 
  className 
}: { 
  text: string; 
  variant?: "black" | "normal"; 
  className?: string;
}) => (
  <span 
    className={`
      block w-full text-center 
      text-[clamp(2.5rem,11vw,150px)] 
      ${variant === "black" ? "font-[900]" : "font-[400]"} 
      leading-[0.8] tracking-[-0.04em] 
      overflow-visible py-2
      ${className}
    `}
  >
    {text}
  </span>
);

export const Home = ({
  projects,
  setActiveTab,
}: {
  projects: any[];
  setActiveTab: (tab: string) => void;
}) => {
  return (
    <div className="w-full relative min-h-screen text-white overflow-hidden pb-0 bg-transparent">
      {/* Background decorations */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-[#6366f1] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[60%] right-[-10%] w-[50%] h-[50%] bg-[#ec4899] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />

      {/* 1. Hero Section */}
      <section className="pt-10 sm:pt-14 md:pt-20 pb-12 flex flex-col items-center justify-center text-center max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-8 relative w-full max-w-[1200px]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl -z-10" />
          <h1 className="flex w-full flex-col items-center justify-center bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            <HeroTitleLine text="UNLEASH YOUR" variant="black" />
            <HeroTitleLine text="IMAGINATION" variant="normal" className="-mt-2 md:-mt-4" />
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="font-mono text-indigo-400 text-lg md:text-2xl tracking-[0.2em] uppercase font-bold italic mb-12 flex items-center justify-center gap-4">
            <span className="opacity-50">—</span>
            Think. Make. Solve.
            <span className="opacity-50">—</span>
          </p>

          <button
            onClick={() => setActiveTab("Projects")}
            className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold tracking-widest text-sm uppercase transition-all hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto shadow-2xl shadow-indigo-500/10 hover:border-indigo-500/50"
          >
            Explore More <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* Logos Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full flex justify-center items-center gap-6 md:gap-12 mt-24 flex-wrap opacity-40 grayscale hover:grayscale-0 transition-all duration-1000"
        >
          {["Plotnao", "Jangle", "Junno", "Innovative", "Cherry"].map(
            (logo, i) => (
              <div
                key={i}
                className="text-lg md:text-xl font-black tracking-widest uppercase flex items-center gap-2"
              >
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-md bg-white/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                </div>
                {logo}
              </div>
            ),
          )}
        </motion.div>
      </section>

      {/* Featured Showcase: AB-Folio Portal V2 */}
      <section className="py-12 max-w-[1300px] mx-auto px-4 md:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] p-[1.5px] group shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]"
        >
          {/* Animated Gradient Glow Rim */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-indigo-500/25 to-purple-500/20 rounded-[2.5rem]" />
          <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_240deg,#06b6d4_280deg,#6366f1_320deg,#ec4899_360deg)] animate-border-spin blur-xl opacity-40 group-hover:opacity-75 transition-opacity duration-700 pointer-events-none" />

          {/* Inner Content Card (macOS Pro Glass Aesthetic) */}
          <div className="relative h-full w-full bg-[#0a0a12]/90 backdrop-blur-3xl rounded-[calc(2.5rem-1.5px)] p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18)]">
            {/* Background Ambient Lights */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[140px] pointer-events-none" />

            {/* Left Preview Viewport */}
            <div className="w-full lg:w-3/5 relative rounded-2xl bg-black/50 border border-white/[0.08] overflow-hidden group/preview aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center shadow-2xl">
              <img
                src="https://image.thum.io/get/width/1000/crop/800/noanimate/https://ab-folio-portal-v2.vercel.app/"
                alt="AB-Folio Experience Portal V2 Preview"
                className="w-full h-full object-cover group-hover/preview:scale-105 transition-transform duration-700 filter brightness-95 group-hover/preview:brightness-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              {/* Overlay Glass Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 text-xs font-mono">
                  <Sparkles size={12} className="text-cyan-400" />
                  <span>ab-folio-portal-v2.vercel.app</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover/preview:opacity-100 -translate-y-1 group-hover/preview:translate-y-0 transition-all shadow-xl">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>

            {/* Right Information & Action Panel */}
            <div className="relative z-10 space-y-5 w-full lg:w-2/5 text-left flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono shadow-[0_0_12px_rgba(6,182,212,0.15)]">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  NEW PORTAL V2
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-white/[0.06] border border-white/10 text-white/60 uppercase">
                  Interactive Experience
                </span>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans leading-tight">
                  AB-Folio{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                    Portal V2
                  </span>
                </h2>
                <p className="mt-3 text-white/70 text-sm md:text-base font-normal font-sans leading-relaxed">
                  Step into the brand new spatial web experience portal showcasing cutting-edge UI physics, interactive showcases, and dynamic sound design.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {["Spatial UI", "Sound Design", "Interactive Showcase", "Next-Gen Web"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-white/[0.04] text-white/50 border border-white/[0.06]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full">
                <a
                  id="portal-launch-live-btn"
                  href="https://ab-folio-portal-v2.vercel.app/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex-1 py-3.5 px-6 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-tight flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] group/btn cursor-pointer"
                >
                  <span>Launch Live Portal</span>
                  <ArrowUpRight size={15} className="text-black/80 stroke-[2.5] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>

                <button
                  id="portal-explore-portfolio-btn"
                  onClick={() => setActiveTab("Projects")}
                  className="py-3.5 px-5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white font-semibold text-xs tracking-tight flex items-center justify-center gap-2 transition-all duration-200 border border-white/10 hover:border-white/20"
                >
                  <Layers size={14} className="text-white/50" />
                  <span>Portfolio Apps</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. Area 51 (About) */}
      <section className="py-24 max-w-[1200px] mx-auto px-4 md:px-8 border-t border-white/5 relative">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
            <div className="relative rounded-full aspect-square overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src={myArea51Image}
                alt="Area 51 of Creatives"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600 mb-2 lowercase tracking-tighter leading-none italic">
              MY AREA-51
              <br />
              <span className="text-white not-italic uppercase tracking-tight ml-4">
                OF CREATIVES
              </span>
            </h2>
            <p className="mt-8 text-white/80 leading-relaxed font-medium uppercase tracking-wide text-sm border-l-2 border-indigo-500 pl-6">
              Hi! Abdulrahman-T this side. I'm empowering human connection
              through design, cross-platform adventures & user-friendly
              solutions. I ignite engagement that leaves a lasting impression.
              Ready for accuracy, impact, and a soaring return on investment?
            </p>

            <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10 relative">
              <div className="absolute -top-4 -left-4 text-6xl text-indigo-500/30">
                "
              </div>
              <p className="text-white/60 font-serif italic text-lg text-center relative z-10 leading-relaxed">
                Design is the bridge that connects creativity and functionality,
                resulting in beautiful solutions that solve real-world problems.
              </p>
              <div className="mt-4 text-center text-sm font-bold text-white/40 uppercase tracking-widest">
                — Abdulrahman-T
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Services */}
      <section className="py-32 max-w-[1200px] mx-auto px-4 md:px-8 relative">
        <h2 className="text-[12vw] md:text-[180px] font-black leading-none text-transparent text-outline-indigo text-center mb-24 opacity-80 pointer-events-none select-none">
          SERVICES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 -mt-20 md:-mt-40">
          {[
            {
              title: "UI/UX",
              desc: "Designing captivating and user-friendly interfaces that keep your audience hooked.",
              icon: <Monitor size={22} />,
              color: "text-blue-400",
              bg: "bg-blue-500/10",
              glow: "rgba(59, 130, 246, 0.15)",
            },
            {
              title: "Graphic Designs",
              desc: "Visually striking graphics that communicate your brand's message with a lasting impression.",
              icon: <Paintbrush size={22} />,
              color: "text-purple-400",
              bg: "bg-purple-500/10",
              glow: "rgba(168, 85, 247, 0.15)",
            },
            {
              title: "Video & Motion Graphics",
              desc: "Dynamics that ignite your audience's imagination and connect them on a deeper level.",
              icon: <PlayCircle size={22} />,
              color: "text-pink-400",
              bg: "bg-pink-500/10",
              glow: "rgba(236, 72, 153, 0.15)",
            },
            {
              title: "Digital Marketing",
              desc: "Digital marketing solutions that optimize your online presence and maximize your ROI.",
              icon: <Target size={22} />,
              color: "text-orange-400",
              bg: "bg-orange-500/10",
              glow: "rgba(249, 115, 22, 0.15)",
            },
            {
              title: "Web Design & Development",
              desc: "Websites with great user experiences, drive growth and elevate your brand in the digital sphere.",
              icon: <Rss size={22} />,
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
              glow: "rgba(16, 185, 129, 0.15)",
            },
            {
              title: "AI Automation",
              desc: "Intelligent systems that automate tasks, scaling your operations to new heights.",
              icon: <Brain size={22} />,
              color: "text-indigo-400",
              bg: "bg-indigo-500/10",
              glow: "rgba(99, 102, 241, 0.15)",
            },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            >
              <SpecularCard
                id={`service-card-${s.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="p-8 h-full flex flex-col justify-between group cursor-default"
                glowColor={s.glow}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4">
                  {React.cloneElement(s.icon, { size: 90 })}
                </div>
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-md ${s.bg} ${s.color} border border-white/10`}
                  >
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-2 text-white/95">{s.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors">
                  <span>0{i + 1} // CAPABILITY</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </SpecularCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            id="all-services-cta-btn"
            onClick={() => setActiveTab("Services")}
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-tight transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95"
          >
            <span>Explore All Services</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* 4. Portfolio */}
      <section className="py-32 max-w-[1400px] mx-auto px-4 md:px-8 relative border-t border-white/5">
        <h2 className="text-[12vw] md:text-[180px] font-black leading-none text-transparent text-outline-indigo text-center mb-8 opacity-80 pointer-events-none select-none">
          PORTFOLIO
        </h2>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-white/95">
            I'm passionate about everything that has to do with Digital Design
            and Art Direction Motion Graphics and Development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.slice(0, 4).map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="cursor-pointer"
              onClick={() => setActiveTab("Projects")}
            >
              <SpecularCard
                id={`portfolio-preview-card-${p.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="p-5 md:p-6 group flex flex-col h-full"
                glowColor="rgba(99, 102, 241, 0.12)"
              >
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 relative bg-black/40 border border-white/[0.06]">
                  <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                  {p.url && p.url !== "#" ? (
                    <img
                      src={`https://image.thum.io/get/width/800/crop/800/noanimate/${p.url}`}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center fill-white/20 text-white/20">
                      <div className="scale-150 mb-4">{p.icon}</div>
                      <span className="font-mono font-medium uppercase tracking-widest text-[11px] text-white/40">
                        Featured Platform
                      </span>
                    </div>
                  )}

                  {/* Floating link icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all z-20 shadow-xl">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 mt-auto">
                  <div>
                    <h3 className="font-bold text-xl md:text-2xl tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-white/40 text-xs font-mono font-medium uppercase tracking-wider mt-1">
                      {p.mainCategory}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/[0.06] border border-white/10 text-white/60">
                    View Project
                  </span>
                </div>
              </SpecularCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button
            id="all-projects-cta-btn"
            onClick={() => setActiveTab("Projects")}
            className="inline-flex items-center gap-2 py-3.5 px-8 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs tracking-tight transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95"
          >
            <span>See All Projects</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-32 max-w-[1200px] mx-auto px-4 md:px-8 border-t border-white/5 relative">
        <h2 className="text-[6vw] md:text-[90px] font-black leading-none text-transparent text-outline-indigo text-center mb-20 opacity-80 select-none">
          WHAT OUR CLIENTS SAY
        </h2>

        <SpecularCard
          id="testimonials-featured-card"
          className="p-8 md:p-12 relative overflow-hidden"
          glowColor="rgba(168, 85, 247, 0.1)"
        >
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12 relative z-10">
            <div className="w-full md:w-1/3 aspect-square rounded-3xl bg-gradient-to-br from-indigo-500/80 to-purple-600/80 border border-white/20 flex flex-col justify-end p-8 relative overflow-hidden shrink-0 shadow-2xl">
              <h3 className="text-2xl font-bold mb-1 relative z-10 text-white">
                Mary Thomas
              </h3>
              <p className="text-white/70 text-xs font-mono font-bold uppercase tracking-widest relative z-10">
                Client Review
              </p>
              <div className="absolute -bottom-10 -right-4 text-[150px] font-serif leading-none text-white/15 select-none font-black italic">
                "
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <div className="flex gap-1.5 text-amber-400 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light italic">
                "Working with Abdulrahman on our website design and development
                was a breeze. Their team was responsive and creative, and truly
                listened to our needs. We now have a website that not only looks
                great but also provides a user experience that sets us apart from
                the competition."
              </p>
            </div>
          </div>
        </SpecularCard>
      </section>

      {/* 6. Contact Form Area */}
      <section className="py-32 max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="bg-[#050505] rounded-[3rem] border border-white/10 p-8 md:p-16 flex flex-col md:flex-row gap-16 relative overflow-hidden items-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />

          {/* Medusa / Visual */}
          <div className="w-full md:w-1/2 relative perspective-[1000px]">
            <div className="aspect-square md:aspect-[3/4] rounded-[2rem] flex items-center justify-center relative z-10 w-full h-[350px] md:h-[500px]">
              <MedusaImage />
            </div>
          </div>

          <div className="w-full md:w-1/2 relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-transparent text-outline-indigo lowercase italic tracking-tighter">
              START YOUR
              <br />
              PROJECT NOW
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Title"
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-sm focus:border-indigo-500 focus:outline-none transition-colors"
              />
              <textarea
                placeholder="Message"
                rows={6}
                className="w-full bg-transparent border border-white/20 rounded-xl px-5 py-4 text-sm focus:border-indigo-500 focus:outline-none transition-colors resize-none"
              ></textarea>

              <label className="flex items-start gap-4 text-xs font-bold text-white/50 uppercase tracking-widest cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-0.5 accent-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span className="group-hover:text-white/70 transition-colors">
                  I consent to the conditions.
                </span>
              </label>

              <button
                type="button"
                onClick={() => setActiveTab("Connect")}
                className="w-full py-4 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold uppercase tracking-widest text-sm transition-colors shadow-lg shadow-indigo-500/20"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Title */}
      <div className="text-center pt-20 pb-8 overflow-hidden relative border-t border-white/10 mt-12">
        <h2 className="text-[5vw] whitespace-nowrap font-black uppercase tracking-tight opacity-90 px-4 flex items-center justify-center gap-4">
          BRINGS YOUR SITE TO LIFE WITH
          <span className="text-transparent text-outline-indigo italic">
            CREATIVITY
          </span>
        </h2>
      </div>
    </div>
  );
};
