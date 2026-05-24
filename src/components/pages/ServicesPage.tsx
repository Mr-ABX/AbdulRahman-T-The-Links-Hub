import React from "react";
import { Bot, Layers, Brain, Code, Zap, Video } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ServicesPage = () => {
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Expert Solutions
        </h2>
        <p className="text-white/60 leading-relaxed">
          Transforming complex business challenges into streamlined
          automated realities. High-performance delivery for the AI era.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "AI Automation",
            desc: "Custom n8n workflows and AI agent integration to automate your entire business logic.",
            icon: <Bot size={24} />,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
          },
          {
            title: "SaaS Development",
            desc: "High-end React & Next.js platforms built for scale, speed, and luxury aesthetics.",
            icon: <Layers size={24} />,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
          },
          {
            title: "AI Strategy",
            desc: "Strategic consulting on how to implement generative AI to increase efficiency and creative output.",
            icon: <Brain size={24} />,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
          },
          {
            title: "Full-Stack Web",
            desc: "Modern web applications with robust backends and seamless user experiences.",
            icon: <Code size={24} />,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
          },
          {
            title: "Growth Marketing",
            desc: "Data-driven marketing strategies combined with automated lead generation systems.",
            icon: <Zap size={24} />,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
          },
          {
            title: "Content Automation",
            desc: "Automated video and text content pipelines for social media and brand presence.",
            icon: <Video size={24} />,
            color: "text-rose-400",
            bg: "bg-rose-500/10",
          },
        ].map((service, i) => (
          <BentoCard key={service.title} delay={i * 0.1}>
            <div
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center mb-6",
                service.bg,
                service.color,
              )}
            >
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">
              {service.desc}
            </p>
          </BentoCard>
        ))}
      </div>
    </div>
  );
};
