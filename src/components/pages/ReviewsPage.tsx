import React, { useState, useMemo } from "react";
import { Star, Mail, Sparkles, ShieldCheck, ArrowUpRight, Filter, ArrowRight } from "lucide-react";
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
      {/* Header & Apple HIG Pro Silver Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>05 // Client Endorsements & Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
            Client Reviews & Testimonials
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
            Authentic verified feedback from founders, agency partners, and enterprise teams across North America, Europe, the UAE, and Asia.
          </p>
        </div>

        {/* Global Rating Badge */}
        <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-[#101115] border border-white/10 shrink-0 backdrop-blur-xl shadow-lg">
          <div className="flex text-amber-400 gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={15} fill="currentColor" />
            ))}
          </div>
          <div className="border-l border-white/10 pl-3">
            <p className="text-sm font-semibold text-white leading-tight">4.95 / 5.0 Rating</p>
            <p className="text-[10px] font-mono text-emerald-400">100% Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Sleek Apple HIG Pro Pill / Metric Widget */}
      <div className="flex justify-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-5 py-2.5 px-4 sm:px-6 md:px-8 rounded-full bg-[#101115]/90 border border-white/[0.12] backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)]">
          {/* 100% Satisfaction Badge */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-white tracking-tight">100% Satisfaction</span>
          </div>

          <span className="hidden sm:inline w-px h-3.5 bg-white/10" />

          {/* 4.9 Average Rating */}
          <div className="flex items-center gap-1.5">
            <Star size={13} className="text-amber-400 fill-amber-400" />
            <span className="text-xs sm:text-sm font-medium text-white tracking-tight">4.9/5.0 Average Rating</span>
          </div>

          <span className="hidden sm:inline w-px h-3.5 bg-white/10" />

          {/* 200+ Projects Delivered */}
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[11px] font-mono text-neutral-200 font-semibold border border-white/10">200+</span>
            <span className="text-xs sm:text-sm font-medium text-neutral-300 tracking-tight">Projects Delivered</span>
          </div>

          <span className="hidden md:inline w-px h-3.5 bg-white/10" />

          {/* 110+ International Clients */}
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[11px] font-mono text-neutral-200 font-semibold border border-white/10">110+</span>
            <span className="text-xs sm:text-sm font-medium text-neutral-300 tracking-tight">International Clients</span>
          </div>

          <span className="hidden lg:inline w-px h-3.5 bg-white/10" />

          {/* 200+ Industries */}
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[11px] font-mono text-neutral-300 font-semibold border border-white/10">200+</span>
            <span className="text-xs sm:text-sm font-medium text-neutral-400 tracking-tight">Industries</span>
          </div>
        </div>
      </div>

      {/* Category Filter Segmented Control */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider mr-2 shrink-0 flex items-center gap-1">
          <Filter size={12} /> Filter:
        </span>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat as string}
              onClick={() => setSelectedCategory(cat as string)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight transition-all shrink-0 cursor-pointer border",
                isActive
                  ? "bg-white text-black border-white shadow-sm"
                  : "bg-white/[0.03] text-neutral-400 border-white/[0.08] hover:bg-white/[0.08] hover:text-white"
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Responsive Curated Review Grid with Rich Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredReviews.map((review) => (
          <div
            key={review.name}
            className="p-6 sm:p-7 rounded-3xl bg-[#0f1014]/80 border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group shadow-sm relative overflow-hidden backdrop-blur-xl"
          >
            {/* Top Specular Edge */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

            <div>
              {/* Review Card Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-white/15 shadow-sm"
                      loading="lazy"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0f1014] flex items-center justify-center">
                      <ShieldCheck size={8} className="text-white" />
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight leading-tight">
                      {review.name}
                    </h4>
                    <p className="text-xs text-neutral-400 font-medium mt-0.5">
                      {review.role}
                    </p>
                    <p className="text-[11px] text-neutral-500 font-mono">
                      {review.company || review.location}
                    </p>
                  </div>
                </div>

                <div className="flex text-amber-400 gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={12} fill="currentColor" />
                  ))}
                </div>
              </div>

              {/* Review Quote Body */}
              <p className="text-sm text-neutral-200 leading-relaxed mb-5 font-normal">
                "{review.text}"
              </p>
            </div>

            {/* Bottom Metadata & Metric */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
              {review.metric ? (
                <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-neutral-200 text-[11px] font-medium flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400" />
                  {review.metric}
                </span>
              ) : (
                <span className="text-neutral-500">{review.location}</span>
              )}

              {review.projectCategory && (
                <span className="text-neutral-500 text-[11px]">
                  {review.projectCategory}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Auto-scrolling Reviews Live Marquee */}
      <div className="relative flex flex-col gap-5 py-6 border-y border-white/[0.06]">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            Continuous Live Stream
          </span>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Verified Worldwide Partners
          </span>
        </div>

        <div className="flex gap-5 animate-marquee whitespace-nowrap overflow-hidden">
          {[...reviews, ...reviews].map((review, i) => (
            <div key={i} className="inline-block w-[340px] shrink-0">
              <div className="p-5 rounded-2xl bg-[#0e0f13]/60 hover:bg-[#0e0f13] transition-colors border border-white/[0.08] h-full whitespace-normal flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400 gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={11} fill="currentColor" />
                      ))}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-white/[0.04] text-neutral-300 text-[9px] font-mono border border-white/10 uppercase">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4 font-normal">
                    "{review.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-8 h-8 rounded-xl object-cover border border-white/15"
                    loading="lazy"
                  />
                  <div>
                    <h5 className="text-xs font-semibold text-white leading-tight">
                      {review.name}
                    </h5>
                    <p className="text-[10px] text-neutral-400">
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
        <div className="rounded-3xl bg-[#0f1014] border border-white/10 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="max-w-xl mx-auto relative z-10">
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3 tracking-tight font-sans">
              Ready to create something remarkable?
            </h3>
            <p className="text-neutral-400 mb-8 text-sm sm:text-base leading-relaxed">
              Join visionary founders and global teams. Let's engineer your high-converting digital portal, SaaS product, or automated AI infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setActiveTab("Connect")}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-all shadow-md flex items-center justify-center gap-2 text-xs tracking-tight cursor-pointer"
              >
                <Mail size={14} />
                <span>Start Your Project</span>
              </button>
              <a
                href="https://calendly.com/digital-b3asts/quick-free-consultation"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium transition-all border border-white/10 flex items-center justify-center gap-2 text-xs tracking-tight cursor-pointer"
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
