import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ASSET_LINKS } from "../../constants/assets";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const logo2 = ASSET_LINKS.logo2Svg;

export const MainFooter = ({
  activeTab,
  setActiveTab,
  isInImmersiveMode,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isInImmersiveMode: boolean;
}) => {
  if (isInImmersiveMode) return null;

  return (
    <footer
      className={cn(
        "pb-12 pt-12 w-full mt-16 md:mt-24 border-t border-white/10 mx-auto",
        activeTab === "Home" || activeTab === "Vortex"
          ? "max-w-[1400px] px-8"
          : "max-w-4xl px-4"
      )}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-2">
              <img
                src={logo2}
                alt="Logo"
                className="w-full h-full object-contain opacity-80"
                loading="lazy"
              />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Abdulrahman Toor
            </span>
          </div>
          <p className="text-white/30 text-xs font-light max-w-xs text-center md:text-left">
            Architecting the future of AI automation and high-performance
            SaaS platforms.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            <button
              onClick={() => setActiveTab("Home")}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("Projects")}
              className="hover:text-white transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("Connect")}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>
          <div className="text-white/20 text-[10px] font-medium tracking-widest uppercase">
            © {new Date().getFullYear()} Abdulrahman Toor. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
