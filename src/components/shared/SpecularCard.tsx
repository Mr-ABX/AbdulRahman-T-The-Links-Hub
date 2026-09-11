import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export interface SpecularCardProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  glowColor?: string; // e.g. "rgba(168, 85, 247, 0.15)" or default white
  interactive?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
  key?: React.Key;
}

export const SpecularCard = ({
  children,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.08)",
  interactive = true,
  id,
  onClick,
  ...props
}: SpecularCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; isHovered: boolean }>({
    x: 0,
    y: 0,
    isHovered: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const handleMouseEnter = () => {
    if (interactive) {
      setMousePos((prev) => ({ ...prev, isHovered: true }));
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setMousePos((prev) => ({ ...prev, isHovered: false }));
    }
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={interactive ? { y: -3, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } } : undefined}
      className={cn(
        "relative rounded-3xl overflow-hidden transition-all duration-300",
        "bg-[#0d0d14]/90 backdrop-blur-2xl border border-white/[0.09]",
        "shadow-[0_16px_36px_-10px_rgba(0,0,0,0.65),inset_0_1px_0_0_rgba(255,255,255,0.14)]",
        interactive && "hover:border-white/[0.18]",
        className
      )}
      {...(props as any)}
    >
      {/* Specular Radial Spotlight Layer */}
      {interactive && mousePos.isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 60%)`,
          }}
        />
      )}

      {/* Dynamic Specular Border Spotlight */}
      {interactive && mousePos.isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
          style={{
            border: "1px solid transparent",
            background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.3), transparent 70%) border-box`,
            WebkitMask:
              "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "destination-out",
            maskComposite: "exclude",
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
};
