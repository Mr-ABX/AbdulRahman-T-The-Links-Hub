import React from "react";
import { motion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BentoCardProps } from "../../types";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SkeletonCard = ({
  size = "1x1",
}: {
  size?: BentoCardProps["size"];
  key?: React.Key;
}) => {
  const sizeClasses = {
    "1x1": "col-span-1 row-span-1",
    "2x1": "col-span-2 row-span-1",
    "2x2": "col-span-2 row-span-2",
    "1x2": "col-span-1 row-span-2",
    "3x1": "col-span-3 row-span-1",
    "3x2": "col-span-3 row-span-2",
    "4x1": "col-span-4 row-span-1",
  };

  return (
    <div
      className={cn(
        "glass rounded-[2rem] p-6 flex flex-col gap-4 relative overflow-hidden border border-white/5 animate-pulse",
        sizeClasses[size],
      )}
    >
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded-xl bg-white/5" />
        <div className="w-16 h-4 rounded-full bg-white/5" />
      </div>
      <div className="space-y-2">
        <div className="w-3/4 h-6 rounded-lg bg-white/10" />
        <div className="w-full h-4 rounded-lg bg-white/5" />
        <div className="w-5/6 h-4 rounded-lg bg-white/5" />
      </div>
      <div className="mt-auto w-24 h-4 rounded-lg bg-white/5" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
    </div>
  );
};

export const BentoCard = ({
  children,
  className,
  size = "1x1",
  delay = 0,
  onClick,
  background,
}: BentoCardProps) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = React.useState<{ x: number; y: number; isHovered: boolean }>({
    x: 0,
    y: 0,
    isHovered: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const sizeClasses = {
    "1x1": "col-span-1 row-span-1",
    "2x1": "col-span-1 md:col-span-2 row-span-1",
    "2x2": "col-span-1 md:col-span-2 row-span-2",
    "1x2": "col-span-1 row-span-2",
    "3x1": "col-span-1 md:col-span-3 row-span-1",
    "3x2": "col-span-1 md:col-span-3 row-span-2",
    "4x1": "col-span-1 md:col-span-4 row-span-1",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setMousePos((prev) => ({ ...prev, isHovered: true }))}
      onMouseLeave={() => setMousePos((prev) => ({ ...prev, isHovered: false }))}
      className={cn(
        "glass rounded-[2rem] p-6 flex flex-col justify-between group cursor-default relative overflow-hidden",
        "border border-white/[0.08] hover:border-white/[0.18]",
        "shadow-[0_16px_36px_-10px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
        sizeClasses[size],
        className,
      )}
    >
      {background}
      {/* Specular Radial Spotlight */}
      {mousePos.isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.07), transparent 60%)`,
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};
