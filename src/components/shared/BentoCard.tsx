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
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      onClick={onClick}
      className={cn(
        "glass glass-hover rounded-[2rem] p-6 flex flex-col justify-between group cursor-default relative overflow-hidden border border-white/5",
        sizeClasses[size],
        className,
      )}
    >
      {background}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};
