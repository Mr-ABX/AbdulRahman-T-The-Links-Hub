import React, { useState } from "react";
import { Sparkles, Play, PlayCircle, Pause, Disc, Volume2, ListMusic, Layers, ExternalLink, Headphones } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { cn } from "../../lib/utils";

interface Track {
  id: string;
  title: string;
  genre: string;
  tempo: string;
  mood: string;
  tools: string[];
  youtubeId: string;
  isPopular?: boolean;
}

const TRACKS: Track[] = [
  {
    id: "m1",
    title: "Vortex Drift",
    genre: "Synthwave / Retrowave",
    tempo: "115 BPM",
    mood: "Driving & Retro",
    tools: ["Suno AI v4", "Logic Pro", "AI Synthesizers"],
    youtubeId: "VxCV8_2UZIM",
    isPopular: true,
  },
  {
    id: "m2",
    title: "Neural Dreams",
    genre: "Ambient Lo-Fi / Chillhop",
    tempo: "80 BPM",
    mood: "Relaxing or Deep Coding",
    tools: ["Suno AI v4", "Adobe Audition"],
    youtubeId: "VxCV8_2UZIM",
  },
  {
    id: "m3",
    title: "Quantum Codebase",
    genre: "Electro Cyberpunk",
    tempo: "128 BPM",
    mood: "Hyper-energetic & Aggressive",
    tools: ["Udio v1.5", "Serum AI Filters"],
    youtubeId: "VxCV8_2UZIM",
    isPopular: true,
  },
];

export const MusicPage = () => {
  const [activeTrack, setActiveTrack] = useState<Track>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-6">
      {/* Hero Banner in Synthwave style */}
      <BentoCard size="3x1" className="bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-transparent border-purple-500/20 p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-purple-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/15 border border-purple-500/20 text-xs font-bold font-mono text-purple-300 rounded-full">
              <Sparkles size={12} className="animate-spin" />
              Cosmic soundscapes
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white font-sans">
              AI Music Room
            </h1>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              Synthesizing retro-electronic, lo-fi beats, and dark cyberpunk tracks using advanced generative sound engines. Perfect auditory companions for deep-focus coding and late-night building.
            </p>
          </div>
          <div className="shrink-0">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 animate-pulse">
                <Headphones size={20} />
              </div>
              <div>
                <div className="text-lg font-bold text-white font-mono">3 Active Jamz</div>
                <div className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Curated List</div>
              </div>
            </div>
          </div>
        </div>
      </BentoCard>

      {/* Embedded Player & Discography */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Cyber Player */}
        <div className="lg:col-span-2 space-y-4">
          <BentoCard size="2x1" className="bg-[#050505]/60 border-white/5 p-6 flex flex-col justify-between relative overflow-hidden h-auto min-h-[400px]">
            {/* Background glowing ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none" />

            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10 h-full">
              {/* Spinning Disc visual */}
              <div className="relative group/disc shrink-0">
                <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-xl opacity-25 group-hover/disc:opacity-45 transition-opacity" />
                <div className={cn(
                  "w-44 h-44 rounded-full bg-[#0a0a0a] border-4 border-white/10 flex items-center justify-center relative shadow-2xl transition-transform",
                  isPlaying ? "animate-[spin_12s_linear_infinite]" : ""
                )}>
                  {/* Outer grooves */}
                  <div className="absolute inset-4 rounded-full border border-white/5" />
                  <div className="absolute inset-8 rounded-full border border-white/5" />
                  <div className="absolute inset-12 rounded-full border border-white/5" />
                  {/* Core Label */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center border-2 border-black">
                    <Disc size={20} className="text-white animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Player Details & Real Iframe Loader */}
              <div className="flex-1 space-y-6 w-full text-center md:text-left">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-bold tracking-[0.2em] font-mono text-purple-400 uppercase">
                    Currently Auditing
                  </span>
                  <h2 className="text-2xl font-black text-white font-sans">{activeTrack.title}</h2>
                  <p className="text-xs text-white/40 font-light font-sans">{activeTrack.genre} • {activeTrack.tempo}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-1.5">
                  {activeTrack.tools.map(tool => (
                    <span key={tool} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-[9px] text-white/50 font-mono">
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Sub Player / YouTube Source Loader */}
                <div className="w-full h-[180px] bg-black/90 rounded-2xl border border-white/10 overflow-hidden relative shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${activeTrack.youtubeId}?autoplay=0`}
                    title={activeTrack.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  ></iframe>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Right Side: Playlist Stack */}
        <div className="space-y-4 flex flex-col">
          <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/5 rounded-2xl">
            <ListMusic size={16} className="text-purple-400" />
            <span className="text-xs font-bold text-white/70 uppercase tracking-widest font-mono">Tracklist</span>
          </div>

          <div className="space-y-2 overflow-y-auto no-scrollbar max-h-[360px]">
            {TRACKS.map((t) => {
              const isActive = t.id === activeTrack.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTrack(t);
                    setIsPlaying(false);
                  }}
                  className={cn(
                    "w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 group/track",
                    isActive
                      ? "bg-purple-500/10 border-purple-500/30 text-white"
                      : "bg-white/5 border-transparent hover:border-white/10 hover:bg-white/10 text-white/60"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className={cn(
                        "font-bold text-xs font-sans group-hover/track:text-purple-400 transition-colors",
                        isActive ? "text-purple-400" : "text-white"
                      )}>
                        {t.title}
                      </h4>
                      {t.isPopular && (
                        <span className="text-[7px] px-1.5 py-0.5 rounded bg-pink-500/20 text-pink-400 font-bold uppercase tracking-wider font-mono">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-white/40 font-light font-sans">{t.genre}</p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/40 group-hover/track:bg-purple-500 group-hover/track:text-white transition-all shadow-md">
                    {isActive ? (
                      <Volume2 size={16} className="text-purple-400 group-hover/track:text-white animate-pulse" />
                    ) : (
                      <PlayCircle size={16} />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Prompt/Suno suggestion Box */}
          <div className="p-4 rounded-3xl bg-white/[0.01] border border-white/5 space-y-2 mt-auto text-center">
            <Headphones size={20} className="text-pink-400 mx-auto" />
            <h5 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">Suno & Udio Gen</h5>
            <p className="text-[10px] text-white/40 leading-relaxed font-light">
              We leverage Custom Seed Prompting to lock instrumentation and prevent vocal warbles. Click to listen on Youtube.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
