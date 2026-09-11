import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";

interface SplashScreenProps {
  onComplete?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isParting, setIsParting] = useState(false);

  useEffect(() => {
    // 1. Brief cinematic pause in centered touch state
    const partTimer = setTimeout(() => {
      setIsParting(true);
    }, 650);

    // 2. Complete transition and hand off to main view
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 2000);

    return () => {
      clearTimeout(partTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsParting(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 150);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="rock-parting-splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: isParting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.75,
            delay: isParting ? 0.35 : 0,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="fixed inset-0 z-[9999] bg-[#06060a] flex items-center justify-center overflow-hidden pointer-events-auto select-none"
        >
          {/* Ambient Deep Atmospheric Glows */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
              animate={{
                scale: isParting ? 1.6 : 1,
                opacity: isParting ? 0 : 0.35,
              }}
              transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
              className="w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-purple-600/25 blur-[120px] -translate-y-6"
            />
            <motion.div
              animate={{
                scale: isParting ? 1.8 : 1,
                opacity: isParting ? 0 : 0.2,
              }}
              transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
              className="w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full bg-blue-600/20 blur-[100px] translate-y-12"
            />
          </div>

          {/* Vignette Boundary */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,#06060a_95%)]" />

          {/* Center Stage: The Twin Monolith Rocks */}
          <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center px-4">
            {/* Left Monolith Rock */}
            <motion.div
              initial={{ x: 28, scale: 1.1, rotate: -2, opacity: 0.95 }}
              animate={
                isParting
                  ? {
                      x: "-52vw",
                      scale: 0.88,
                      rotate: -7,
                      opacity: 0,
                    }
                  : {
                      x: 28,
                      scale: [1.1, 1.12, 1.1],
                      rotate: [-2, -2.5, -2],
                      opacity: 1,
                    }
              }
              transition={
                isParting
                  ? {
                      duration: 1.15,
                      ease: [0.23, 1, 0.32, 1],
                    }
                  : {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="w-52 sm:w-68 md:w-84 lg:w-[420px] pointer-events-none z-20 shrink-0"
            >
              <img
                src="/rock-left-1000.webp"
                alt="Left Monolith Rock"
                className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] filter brightness-100 contrast-105"
              />
            </motion.div>

            {/* Center Gate Rift Lighting & Monogram (Fades as rocks part) */}
            <motion.div
              animate={{
                opacity: isParting ? 0 : 1,
                scale: isParting ? 0.8 : 1,
              }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="absolute z-30 flex flex-col items-center justify-center pointer-events-none -translate-y-2 sm:-translate-y-4"
            >
              {/* Vertical light rift seam between the rocks */}
              <div className="w-[1.5px] h-20 sm:h-28 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-60 blur-[0.5px] mb-4 animate-pulse" />

              {/* Apple HIG Minimalist Studio Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-white/90">
                  STUDIO // ABDULRAHMAN-T
                </span>
              </div>
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40 mt-2">
                INITIALIZING LAB
              </span>
            </motion.div>

            {/* Right Monolith Rock */}
            <motion.div
              initial={{ x: -28, scale: 1.1, rotate: 2, opacity: 0.95 }}
              animate={
                isParting
                  ? {
                      x: "52vw",
                      scale: 0.88,
                      rotate: 7,
                      opacity: 0,
                    }
                  : {
                      x: -28,
                      scale: [1.1, 1.12, 1.1],
                      rotate: [2, 2.5, 2],
                      opacity: 1,
                    }
              }
              transition={
                isParting
                  ? {
                      duration: 1.15,
                      ease: [0.23, 1, 0.32, 1],
                    }
                  : {
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="w-52 sm:w-68 md:w-84 lg:w-[420px] pointer-events-none z-20 shrink-0"
            >
              <img
                src="/rock-right-1000.webp"
                alt="Right Monolith Rock"
                className="w-full h-auto object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] filter brightness-100 contrast-105"
              />
            </motion.div>
          </div>

          {/* Minimal Skip Control (Apple HIG Capsule) */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: isParting ? 0 : 0.6 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSkip}
            className="absolute bottom-6 right-6 z-40 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white/60 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
          >
            <span>Skip</span>
            <ArrowRight size={11} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
