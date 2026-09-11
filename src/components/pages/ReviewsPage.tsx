import React, { useState, useMemo } from "react";
import { Star, Mail, Sparkles, ShieldCheck, ArrowUpRight, MessageSquare, Filter } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { reviews } from "../../constants/data";
import { cn } from "../../lib/utils";

export const ReviewsPage = ({
  setActiveTab,
}: {
  setActiveTab: (tab: any) => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = Array.from(new Set(reviews.map((r) => r.projectCategory).filter(Boolean)));
    return ["All", ...cats];
  }, []);

  const filteredReviews = useMemo(() => {
    if (selectedCategory === "All") return reviews;
    return reviews.filter((r) => r.projectCategory === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-12 overflow-hidden max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Sparkles size={12} />
            <span>Client Feedback & Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Client Reviews & Testimonials
          </h2>
          <p className="text-white/60 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Authentic verified feedback from founders, agency partners, and enterprise teams across the US, UK, Europe, UAE, and Asia.
          </p>
        </div>

        {/* Global Rating Badge */}
        <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 shrink-0 backdrop-blur-xl shadow-xl">
          <div className="flex text-amber-400 gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <div className="border-l border-white/10 pl-3">
            <p className="text-sm font-bold text-white leading-tight">5.0 Star Rating</p>
            <p className="text-[10px] font-mono text-emerald-400">100% Recommended</p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-mono text-white/40 uppercase tracking-wider mr-2 shrink-0 flex items-center gap-1">
          <Filter size={12} /> Filter:
        </span>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat as string}
              onClick={() => setSelectedCategory(cat as string)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all shrink-0 cursor-pointer border",
                isActive
                  ? "bg-white text-black border-white shadow-lg"
                  : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Responsive Curated Review Grid with Rich Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review.name}
            className="p-6 sm:p-7 rounded-3xl bg-[#0e0e18]/90 border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1 relative overflow-hidden backdrop-blur-xl"
          >
            {/* Top Specular Edge */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div>
              {/* Review Card Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl object-cover border border-white/20 shadow-md"
                      loading="lazy"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0e0e18] flex items-center justify-center">
                      <ShieldCheck size={10} className="text-white" />
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight leading-tight">
                      {review.name}
                    </h4>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">
                      {review.role}
                    </p>
                    <p className="text-[11px] text-white/40 font-mono">
                      {review.company || review.location}
                    </p>
                  </div>
                </div>

                <div className="flex text-amber-400 gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={13} fill="currentColor" />
                  ))}
                </div>
              </div>

              {/* Review Quote Body */}
              <p className="text-sm text-white/85 italic leading-relaxed mb-5 font-light">
                "{review.text}"
              </p>
            </div>

            {/* Bottom Metadata & Metric */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              {review.metric ? (
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-semibold flex items-center gap-1">
                  <Sparkles size={11} />
                  {review.metric}
                </span>
              ) : (
                <span className="text-white/40">{review.location}</span>
              )}

              {review.projectCategory && (
                <span className="text-white/40 text-[11px]">
                  {review.projectCategory}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Auto-scrolling Reviews Live Marquee */}
      <div className="relative flex flex-col gap-6 py-6 border-y border-white/10">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
            Continuous Live Stream
          </span>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Verified Worldwide Partners
          </span>
        </div>

        <div className="flex gap-6 animate-marquee whitespace-nowrap overflow-hidden">
          {[...reviews, ...reviews].map((review, i) => (
            <div key={i} className="inline-block w-[360px] shrink-0">
              <div className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors border border-white/10 h-full whitespace-normal flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400 gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={11} fill="currentColor" />
                      ))}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono font-bold tracking-widest uppercase">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 italic leading-relaxed mb-4 font-light">
                    "{review.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-xl object-cover border border-white/20"
                    loading="lazy"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-white leading-tight">
                      {review.name}
                    </h5>
                    <p className="text-[10px] text-white/50">
                      {review.role} • {review.company || review.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="pb-8">
        <div className="rounded-3xl bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-purple-900/30 border border-white/10 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="max-w-xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
              Ready to create something remarkable?
            </h3>
            <p className="text-white/70 mb-8 text-sm sm:text-base leading-relaxed">
              Join visionary founders and global teams. Let's engineer your high-converting digital portal, SaaS product, or automated AI infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setActiveTab("Connect")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-all shadow-xl flex items-center justify-center gap-2 text-xs tracking-tight hover:scale-105 cursor-pointer"
              >
                <Mail size={15} />
                <span>Start Your Project</span>
              </button>
              <a
                href="https://calendly.com/digital-b3asts/quick-free-consultation"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all border border-white/15 flex items-center justify-center gap-2 text-xs tracking-tight hover:scale-105 cursor-pointer"
              >
                <span>Book 15-Min Free Call</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
