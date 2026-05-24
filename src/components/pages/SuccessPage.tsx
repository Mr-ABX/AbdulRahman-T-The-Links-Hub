import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { BentoCard } from "../shared/BentoCard";

export const SuccessPage = ({
  setActiveTab,
}: {
  setActiveTab: (tab: any) => void;
}) => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <BentoCard
        size="2x2"
        className="max-w-lg w-full text-center p-12 flex flex-col items-center justify-center relative overflow-hidden bg-white/[0.02] border-emerald-500/20"
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/30 relative z-10"
        >
          <CheckCircle2 size={48} className="text-emerald-400" />
        </motion.div>

        <h2 className="text-4xl font-bold mb-4 tracking-tight relative z-10">
          Payment Successful!
        </h2>
        <p className="text-white/60 mb-8 max-w-sm mx-auto leading-relaxed font-light relative z-10">
          Thank you for your purchase. Your order has been confirmed and
          the details have been sent to your email.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center relative z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("Ebooks")}
            className="px-6 py-3 rounded-2xl bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10"
          >
            <ArrowLeft size={16} />
            Back to Ebooks
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab("Home")}
            className="px-6 py-3 rounded-2xl bg-emerald-500 text-black text-sm font-bold hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
          >
            Return Home
          </motion.button>
        </div>
      </BentoCard>
    </div>
  );
};
