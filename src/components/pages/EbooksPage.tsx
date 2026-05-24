import React from "react";
import { BentoCard } from "../shared/BentoCard";
import { BookOpen, Trophy } from "lucide-react";
import { ASSET_LINKS } from "../../constants/assets";
import { motion } from "motion/react";

const bookCover = ASSET_LINKS.bookCover;

export const EbooksPage = ({
  openEbookModal,
}: {
  openEbookModal: () => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(220px,auto)]">
      <BentoCard size="2x2" className="p-0 overflow-hidden group/book">
        <div className="relative h-full w-full">
          <img
            src={bookCover}
            alt="31 Ways to Ruin Your Life"
            className="w-full h-full object-cover transition-transform duration-700 group-hover/book:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-8">
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={16} className="text-orange-400" />
              <span className="text-[10px] text-orange-400 uppercase tracking-[0.2em] font-bold">
                Best Seller
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-2 tracking-tight">
              31 Ways to Ruin Your Life
            </h3>
            <p className="text-white/60 text-sm mb-6 max-w-sm font-light leading-relaxed">
              A super professional guide to self-sabotage. Learn what NOT
              to do to succeed.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openEbookModal}
                className="px-6 py-3 rounded-2xl bg-white text-black text-xs font-bold hover:bg-white/90 transition-all shadow-xl shadow-white/10"
              >
                Get the Book
              </motion.button>
            </div>
          </div>
        </div>
      </BentoCard>

      <BentoCard
        size="1x1"
        className="bg-indigo-500/5 border-indigo-500/10"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <BookOpen size={20} />
          </div>
          <div>
            <p className="text-[10px] text-indigo-400 uppercase tracking-widest mb-1">
              Coming Soon
            </p>
            <h3 className="font-bold text-lg leading-tight">
              Sell Like a Psychopath
            </h3>
          </div>
        </div>
      </BentoCard>

      <BentoCard
        size="1x1"
        className="bg-emerald-500/5 border-emerald-500/10"
      >
        <div className="flex flex-col h-full justify-between">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <BookOpen size={20} />
          </div>
          <div>
            <p className="text-[10px] text-emerald-400 uppercase tracking-widest mb-1">
              Coming Soon
            </p>
            <h3 className="font-bold text-lg leading-tight">
              Digital Dollar Weekend
            </h3>
          </div>
        </div>
      </BentoCard>

      <BentoCard size="1x1" className="bg-white/[0.02]">
        <div className="flex flex-col h-full justify-center text-center p-4">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
            <span className="text-white/20 text-2xl">📚</span>
          </div>
          <h3 className="font-bold mb-1">More Coming Soon</h3>
          <p className="text-xs text-white/40 font-light italic">
            The library is expanding...
          </p>
        </div>
      </BentoCard>
    </div>
  );
};
