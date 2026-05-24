import React from "react";
import { Star, Mail } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";
import { reviews } from "../../constants/data";

export const ReviewsPage = ({
  setActiveTab,
}: {
  setActiveTab: (tab: any) => void;
}) => {
  return (
    <div className="space-y-8 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Client Testimonials
          </h2>
          <p className="text-white/50 text-sm mt-1">
            Real feedback from people I've worked with.
          </p>
        </div>
        <div className="flex items-center gap-4 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </div>
          <span className="text-sm font-bold">5.0 Average Rating</span>
        </div>
      </div>

      {/* Auto-scrolling Reviews Marquee */}
      <div className="relative flex flex-col gap-6 py-10">
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[...reviews, ...reviews].map((review, i) => (
            <div key={i} className="inline-block w-[350px] shrink-0">
              <BentoCard
                size="1x1"
                delay={0}
                className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors border-white/5 h-full whitespace-normal"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400 gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={10} fill="currentColor" />
                      ))}
                    </div>
                    <div className="px-2 py-0.5 rounded-full bg-white/5 text-[8px] text-white/40 uppercase font-bold tracking-widest">
                      Verified
                    </div>
                  </div>
                  <p className="text-sm text-white/70 italic leading-relaxed mb-6 font-light">
                    "{review.text}"
                  </p>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 font-bold border border-white/10">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {review.name}
                      </h4>
                      <p className="text-[10px] text-white/40">
                        {review.role} • {review.location}
                      </p>
                    </div>
                  </div>
                </div>
              </BentoCard>
            </div>
          ))}
        </div>

        <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap">
          {[...reviews, ...reviews].reverse().map((review, i) => (
            <div key={i} className="inline-block w-[350px] shrink-0">
              <BentoCard
                size="1x1"
                delay={0}
                className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors border-white/5 h-full whitespace-normal"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-400 gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={10} fill="currentColor" />
                      ))}
                    </div>
                    <div className="px-2 py-0.5 rounded-full bg-white/5 text-[8px] text-white/40 uppercase font-bold tracking-widest">
                      Verified
                    </div>
                  </div>
                  <p className="text-sm text-white/70 italic leading-relaxed mb-6 font-light">
                    "{review.text}"
                  </p>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 font-bold border border-white/10">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {review.name}
                      </h4>
                      <p className="text-[10px] text-white/40">
                        {review.role} • {review.location}
                      </p>
                    </div>
                  </div>
                </div>
              </BentoCard>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="px-4">
        <BentoCard
          size="3x1"
          className="bg-indigo-500/10 border-indigo-500/20 text-center py-12"
        >
          <div className="max-w-xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">
              Ready to start your project?
            </h3>
            <p className="text-white/60 mb-8 text-sm">
              Join these happy clients and let's build something
              extraordinary together.
            </p>
            <button
              onClick={() => setActiveTab("Connect")}
              className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-all shadow-xl shadow-white/10 flex items-center gap-2 mx-auto text-sm"
            >
              <Mail size={16} /> Get a Free Quote
            </button>
          </div>
        </BentoCard>
      </div>
    </div>
  );
};
