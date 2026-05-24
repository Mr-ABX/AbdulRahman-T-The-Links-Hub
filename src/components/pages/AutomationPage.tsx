import React from "react";
import { Layers, Terminal, Bot, Smartphone, Send, Code } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";

export const AutomationPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
      <BentoCard
        size="2x1"
        className="bg-purple-500/5 border-purple-500/10"
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="text-purple-400" size={20} />
              <span className="text-[10px] text-purple-400 uppercase tracking-[0.2em] font-bold">
                n8n Expert
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">
              AI Automation Systems
            </h3>
            <p className="text-white/50 text-sm max-w-xs font-light leading-relaxed">
              I architect complex n8n workflows that automate lead gen,
              content creation, and business operations.
            </p>
          </div>
          <div className="p-4 rounded-3xl bg-purple-500/10 text-purple-400 shadow-lg shadow-purple-500/10">
            <Terminal size={32} />
          </div>
        </div>
        <div className="mt-auto flex gap-3">
          <a
            href="mailto:abdulrahmant.official@gmail.com?subject=Automation Quote Request"
            className="px-6 py-3 rounded-2xl bg-purple-500 text-white text-xs font-bold hover:bg-purple-400 transition-all shadow-lg shadow-purple-500/20 active:scale-95"
          >
            Get a Free Quote
          </a>
        </div>
      </BentoCard>

      <BentoCard
        size="1x1"
        className="hover:bg-blue-500/5 transition-colors"
      >
        <div className="flex flex-col h-full">
          <div className="mb-4 text-blue-400">
            <Smartphone size={24} />
          </div>
          <h3 className="font-bold mb-1">Voice AI</h3>
          <p className="text-xs text-white/40 font-light">
            Custom voice-calling assistants for automated customer
            support.
          </p>
        </div>
      </BentoCard>

      <BentoCard
        size="1x1"
        className="hover:bg-emerald-500/5 transition-colors"
      >
        <div className="flex flex-col h-full">
          <div className="mb-4 text-emerald-400">
            <Send size={24} />
          </div>
          <h3 className="font-bold mb-1">Lead Gen</h3>
          <p className="text-xs text-white/40 font-light">
            Automated LinkedIn & Email outreach systems that convert.
          </p>
        </div>
      </BentoCard>

      <BentoCard size="3x1" className="bg-white/[0.02]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-center">
          <div className="flex flex-col">
            <h3 className="font-bold text-lg mb-1">Auto Posting</h3>
            <p className="text-xs text-white/40 font-light">
              Multi-platform content distribution.
            </p>
          </div>
          <div className="flex flex-col border-l border-white/5 pl-6">
            <h3 className="font-bold text-lg mb-1">Content Gen</h3>
            <p className="text-xs text-white/40 font-light">
              AI-driven content creation pipelines.
            </p>
          </div>
          <div className="flex flex-col border-l border-white/5 pl-6">
            <h3 className="font-bold text-lg mb-1">Custom CRM</h3>
            <p className="text-xs text-white/40 font-light">
              Automated data sync & management.
            </p>
          </div>
        </div>
      </BentoCard>
    </div>
  );
};
