import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trophy, Download, Book, ExternalLink } from "lucide-react";

export const EbookModal = ({
  selectedEbook,
  closeEbookModal,
}: {
  selectedEbook: any;
  closeEbookModal: () => void;
}) => {
  return (
    <AnimatePresence>
      {selectedEbook && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeEbookModal}
          />
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
          >
            <button
              onClick={closeEbookModal}
              className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row h-full">
              {/* Left side: Cover */}
              <div className="w-full md:w-2/5 relative bg-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                {selectedEbook.image && (
                  <img
                    src={selectedEbook.image}
                    alt={selectedEbook.title}
                    className="w-full h-full object-cover relative z-10"
                  />
                )}
              </div>

              {/* Right side: Details & Options */}
              <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy size={16} className="text-orange-400" />
                  <span className="text-[10px] text-orange-400 uppercase tracking-[0.2em] font-bold">
                    Best Seller
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-3 tracking-tight">
                  {selectedEbook.title}
                </h2>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">
                  {selectedEbook.desc}
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() =>
                      window.open(selectedEbook.polarLink, "_blank")
                    }
                    className="w-full p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Download size={20} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-sm text-indigo-400">
                          Direct from My Store
                        </h4>
                        <p className="text-[10px] text-indigo-400/60">
                          Instant PDF Download
                        </p>
                      </div>
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-indigo-400/50 group-hover:text-indigo-400 transition-colors"
                    />
                  </button>

                  <button
                    onClick={() =>
                      window.open(
                        "https://www.amazon.com/dp/B0DCKCGN9T/ref=sr_1_1",
                        "_blank",
                      )
                    }
                    className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                        <Book size={20} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-sm">Amazon Ebook</h4>
                        <p className="text-[10px] text-white/40">
                          Read on Kindle
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <ExternalLink
                        size={16}
                        className="text-white/30 group-hover:text-white transition-colors"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
