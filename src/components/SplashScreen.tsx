import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";

interface SplashScreenProps {
  onComplete?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if splash screen was already shown in this session
    const hasSeenSplash = sessionStorage.getItem("abdulrahman_splash_seen");
    if (hasSeenSplash === "true") {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    // Animate progress smooth counter
    const startTime = Date.now();
    const duration = 1800; // 1.8 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          sessionStorage.setItem("abdulrahman_splash_seen", "true");
          onComplete?.();
        }, 300);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsVisible(false);
    sessionStorage.setItem("abdulrahman_splash_seen", "true");
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[9999] bg-[#07070c] flex flex-col items-center justify-center overflow-hidden selection:bg-purple-500/30"
        >
          {/* Ambient Background Radial Glows */}
          <div className="absolute w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
          <div className="absolute w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

          {/* SVG Liquid Filter Definition */}
          <svg className="hidden">
            <defs>
              <filter id="splash-liquid">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="splash-liquid"
                />
                <feBlend in="SourceGraphic" in2="splash-liquid" />
              </filter>
            </defs>
          </svg>

          {/* Central Liquid Morphing Capsule */}
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative mb-8 flex items-center justify-center">
              {/* Outer Glowing Liquid Rings */}
              <motion.div
                animate={{
                  rotate: [0, 180, 360],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-purple-500/30 via-blue-500/20 to-emerald-400/30 border border-white/20 p-1 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.3)] backdrop-blur-xl"
              >
                {/* Inner Morphing Liquid Core */}
                <motion.div
                  animate={{
                    borderRadius: [
                      "40% 60% 70% 30% / 40% 50% 60% 50%",
                      "60% 40% 30% 70% / 50% 30% 70% 50%",
                      "40% 60% 70% 30% / 40% 50% 60% 50%",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full h-full bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 flex items-center justify-center relative overflow-hidden"
                >
                  <Sparkles size={28} className="text-white animate-pulse" />
                </motion.div>
              </motion.div>
            </div>

            {/* Brand Typography & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-center space-y-2 mb-10"
            >
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
                Abdulrahman Toor
              </h1>
              <div className="flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-white/50">
                  Area 51 Studio & Lab
                </p>
              </div>
            </motion.div>

            {/* Micro Progress Bar & Ticker */}
            <div className="w-48 sm:w-64 space-y-2">
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-widest px-1">
                <span>Initializing Studio</span>
                <span className="text-purple-400 font-bold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Skip Option */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            onClick={handleSkip}
            className="absolute bottom-8 text-[11px] font-mono uppercase tracking-widest text-white/40 hover:text-white border border-white/10 px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer"
          >
            Skip Intro →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
