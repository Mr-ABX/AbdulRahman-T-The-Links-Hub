import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { BentoCard } from "./BentoCard";
import { ProjectType } from "../../types";

export const FeaturedCarousel = ({
  projects,
  onSelect,
}: {
  projects: ProjectType[];
  onSelect: (p: ProjectType) => void;
}) => {
  const [index, setIndex] = useState(0);
  const featured = useMemo(
    () =>
      projects.filter((p) =>
        [
          "FlowType - Minimalist Touch Typing",
          "Babel | Learn Fictional Languages",
          "Virtuoso Web Piano & Beat Studio",
          "Trust Nothing",
          "Gekko Dash",
          "The Architect's Doodle Trap",
          "Vesper AI Notes",
        ].includes(p.name),
      ),
    [projects],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featured.length]);

  const current = featured[index];

  if (!current) return null;

  return (
    <BentoCard
      size="2x2"
      className="relative overflow-hidden group/featured cursor-pointer border-indigo-500/30 bg-indigo-500/5 shadow-[0_0_30px_rgba(99,102,241,0.05)] min-h-[450px] md:min-h-0 !p-0"
      onClick={() => onSelect(current)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 p-6 md:p-8 flex flex-col"
        >
          {/* Background Decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]">
            {current.url !== "#" && (
              <img
                src={`https://image.thum.io/get/width/1200/crop/800/noanimate/${current.url}`}
                alt={current.name}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/featured:opacity-100 group-hover/featured:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
            <div
              className={`absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_30%,_var(--tw-gradient-from)_0%,_transparent_70%)] ${current.bg.replace("bg-", "from-")}`}
            />
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4">
              {React.cloneElement(current.icon as React.ReactElement, {
                size: 240,
                className: `${current.color} opacity-10 rotate-12`,
              })}
            </div>
          </div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${current.bg} flex items-center justify-center ${current.color} shadow-lg`}
                >
                  {React.cloneElement(current.icon as React.ReactElement, {
                    size: 24,
                  })}
                </div>
                <div>
                  <div
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] ${current.color}`}
                  >
                    Featured Project
                  </div>
                  <div className="flex gap-1.5 mt-1">
                    {featured.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${i === index ? "w-6 bg-indigo-400" : "w-2 bg-white/10"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-2 rounded-full bg-white/5 border border-white/10">
                <Sparkles size={16} className="text-yellow-400 animate-pulse" />
              </div>
            </div>

            <div className="mt-auto">
              <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 tracking-tight group-hover/featured:translate-x-2 transition-transform duration-500">
                {current.name}
              </h3>
              <p className="text-white/60 text-sm md:text-lg max-w-md mb-4 md:mb-6 leading-relaxed line-clamp-2 md:line-clamp-3">
                {current.desc}
              </p>

              <div className="flex items-center gap-4">
                <div
                  className={`px-4 py-2 md:px-6 md:py-3 rounded-2xl ${current.bg} ${current.color} font-bold text-xs md:text-sm flex items-center gap-2 group-hover/featured:scale-105 transition-all shadow-xl border border-white/5`}
                >
                  <span>Explore Now</span>
                  <ArrowRight size={18} />
                </div>
                <div className="text-white/30 text-[10px] md:text-xs font-medium italic">
                  Click to view details
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 to-transparent pointer-events-none rounded-tr-[2rem] rounded-bl-[2rem]" />
    </BentoCard>
  );
};
