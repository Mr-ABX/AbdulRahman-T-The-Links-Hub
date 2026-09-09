import React from "react";
import { Bot, Layers, Brain, Code, Zap, Video, Sparkles, ArrowRight } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { cn } from "../../lib/utils";

export const ServicesPage = () => {
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/70 font-mono text-[11px] uppercase tracking-[0.2em] mb-4">
          <Sparkles size={11} strokeWidth={1.35} className="text-white/80" />
          <span>Capabilities &amp; Services</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
          Expert Solutions
        </h2>
        <p className="text-white/60 leading-relaxed text-sm md:text-base">
          Transforming complex technical and creative challenges into streamlined, high-performance systems for the AI era.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "AI Automation",
            desc: "Custom n8n workflows and autonomous AI agent pipelines to scale business logic.",
            icon: <Bot size={20} strokeWidth={1.35} />,
          },
          {
            title: "SaaS Development",
            desc: "High-end React & Next.js platforms built for scale, speed, and luxury aesthetics.",
            icon: <Layers size={20} strokeWidth={1.35} />,
          },
          {
            title: "AI Strategy",
            desc: "Strategic consulting on implementing generative models to maximize efficiency.",
            icon: <Brain size={20} strokeWidth={1.35} />,
          },
          {
            title: "Full-Stack Web",
            desc: "Modern web applications with robust backends and seamless user experiences.",
            icon: <Code size={20} strokeWidth={1.35} />,
          },
          {
            title: "Growth Mechanics",
            desc: "Data-driven marketing strategies combined with automated lead generation systems.",
            icon: <Zap size={20} strokeWidth={1.35} />,
          },
          {
            title: "Content Automation",
            desc: "Automated media and generative copy pipelines for omnichannel brand presence.",
            icon: <Video size={20} strokeWidth={1.35} />,
          },
        ].map((service, i) => (
          <BentoCard key={service.title} delay={i * 0.08} className="p-7 flex flex-col justify-between group">
            <div>
              <div
                className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 text-white/80 flex items-center justify-center mb-5 group-hover:bg-white/[0.08] group-hover:text-white transition-colors"
              >
                {service.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-white/95 tracking-tight">{service.title}</h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-normal">
                {service.desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-white/40 group-hover:text-white/70 transition-colors">
              <span>0{i + 1} // CAPABILITY</span>
              <ArrowRight size={13} strokeWidth={1.35} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          </BentoCard>
        ))}
      </div>
    </div>
  );
};
