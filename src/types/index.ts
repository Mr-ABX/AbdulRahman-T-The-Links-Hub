import React from "react";

export type Category =
  | "Home"
  | "Links"
  | "Projects"
  | "Apps"
  | "Automation"
  | "Ebooks"
  | "Content"
  | "About"
  | "Reviews"
  | "Connect"
  | "Success"
  | "Store"
  | "Journal"
  | "Vortex"
  | "Services"
  | "Prompts"
  | "Community";

export type ProjectCategory =
  | "Apps & Dev"
  | "Web Development Projects"
  | "Interactive Experiences"
  | "Video & Motion Graphics"
  | "Graphics & Marketing"
  | "AI Solutions"
  | "My Personal Apps"
  | "Pro Business Suite";

export interface ProjectType {
  name: string;
  mainCategory: ProjectCategory | string;
  categories?: string[];
  tags: string[];
  pricing: string;
  price?: string;
  desc: string;
  url: string;
  previewUrl?: string;
  color: string;
  bg: string;
  icon: React.ReactNode;
  status: string;
}

export interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  size?: "1x1" | "2x1" | "2x2" | "1x2" | "3x1" | "3x2" | "4x1";
  delay?: number;
  onClick?: () => void;
  background?: React.ReactNode;
  key?: React.Key;
}
