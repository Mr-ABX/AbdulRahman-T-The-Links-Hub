import React from "react";
import { Youtube, ExternalLink, Newspaper, Sparkles, Send, ArrowRight } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";

export const ContentPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
      <BentoCard size="2x1" className="bg-red-500/5 border-red-500/10">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <Youtube size={32} className="text-red-500" />
            <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest">
              YouTube
            </div>
          </div>
          <h3 className="font-bold text-2xl mb-2">Video Tutorials</h3>
          <p className="text-white/50 text-sm mb-6 font-light">
            Deep dives into AI automation, SaaS architecture, and building
            in public.
          </p>
          <a
            href="https://www.youtube.com/@abdulrahman-toor/"
            target="_blank"
            className="mt-auto flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 transition-colors group/yt"
          >
            Watch Now{" "}
            <ArrowRight
              size={12}
              className="group-hover/yt:translate-x-1 transition-transform"
            />
          </a>
        </div>
      </BentoCard>

      <BentoCard size="1x1" className="bg-white/[0.02] group/blog">
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-between items-start">
            <Newspaper size={24} className="text-white/40" />
            <a
              href="#"
              className="text-white/20 hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          </div>
          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">
              Blog
            </p>
            <h3 className="font-bold text-sm leading-tight group-hover:text-indigo-400 transition-colors">
              AI in 2026: The Shift to Autonomous Agents
            </h3>
          </div>
        </div>
      </BentoCard>

      <BentoCard
        size="2x1"
        className="bg-purple-500/5 border-purple-500/10 p-0 overflow-hidden group/music"
      >
        <div className="flex flex-col md:flex-row h-full">
          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Sparkles size={16} />
                </div>
                <span className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">
                  AI Music
                </span>
              </div>
              <h3 className="font-bold text-xl mb-2">
                My AI Generated Music
              </h3>
              <p className="text-white/50 text-sm font-light">
                Listen to tracks I've created using advanced AI music
                generation tools.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 min-h-[200px] bg-black/50 relative">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/VxCV8_2UZIM"
              title="AI Generated Music"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full object-cover"
            ></iframe>
          </div>
        </div>
      </BentoCard>

      <BentoCard
        size="1x1"
        className="bg-emerald-500/5 border-emerald-500/10 group/newsletter cursor-pointer"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover/newsletter:scale-110 transition-transform">
              <Send size={20} />
            </div>
            <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">
              Newsletter
            </span>
          </div>
          <h3 className="font-bold text-lg mb-1">Weekly Lab Notes</h3>
          <p className="text-xs text-white/40 font-light mb-auto">
            Join 2,500+ creators for AI & SaaS deep dives.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[10px] focus:border-emerald-500 transition-colors"
              onClick={(e) => e.stopPropagation()}
            />
            <button className="w-full py-2 bg-emerald-500 text-black font-bold rounded-lg text-[10px] hover:bg-emerald-400 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </BentoCard>
    </div>
  );
};
