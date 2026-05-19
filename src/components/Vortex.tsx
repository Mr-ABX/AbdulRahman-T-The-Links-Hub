import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const characters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:"<>?~`-=[]\\;,./';
const generateGibberish = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const GlitchText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState(
    generateGibberish(text.length),
  );

  useEffect(() => {
    let iteration = 0;
    let interval: any = null;

    const startAnimation = () => {
      clearInterval(interval);
      iteration = 0;
      interval = setInterval(() => {
        setDisplayText((prev) => {
          return text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              if (letter === " ") return " ";
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("");
        });

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };

    startAnimation();

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

const vortexSections = [
  {
    title: "TOOLS PORTAL",
    action: "Open Now",
    isActive: true,
    bgImage:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "BATCAVE",
    action: "Open Now",
    isActive: true,
    bgImage:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "MEET THE MULTIVERSE (LOADING...)",
    action: "Get Updates",
    isActive: false,
    bgImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "CYBERSECURITY & ETHICAL HACKING HUB (LOADING...)",
    action: "Get Updates",
    isActive: false,
    bgImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "FUSION NEXUS DASHBOARD",
    action: "Get Notes",
    isActive: false,
    bgImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "LLM & LOCAL MODELS LIBRARIES",
    action: "Open Now",
    isActive: true,
    bgImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "N8N & AI AUTOMATIONS",
    action: "Get Updates",
    isActive: false,
    bgImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "OPEN SOURCE PROJECTS",
    action: "Explore Repos",
    isActive: true,
    bgImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
];

interface VortexCardProps {
  section: (typeof vortexSections)[0];
  idx: number;
  key?: string | number;
}

const VortexCard = ({ section, idx }: VortexCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax transform for the background image
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className={`
        relative w-full aspect-[21/9] md:aspect-[3/1] rounded-[2rem] overflow-hidden 
        border border-white/5 flex flex-col justify-center p-8 md:p-16 group cursor-pointer
      `}
    >
      {/* Background Image / Overlay with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 scale-110 group-hover:scale-[1.12] transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ y }}
      >
        <img
          src={section.bgImage}
          alt={section.title}
          className={`w-full h-full object-cover transition-all duration-700 ${!section.isActive ? "grayscale opacity-30 blur-sm group-hover:opacity-40 group-hover:blur-[2px]" : "opacity-40 group-hover:opacity-70 group-hover:blur-[1px]"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl transform transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-4">
        <h2 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-wide drop-shadow-md">
          {section.title}
        </h2>
        <button
          className={`
            px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest border transition-all duration-500
            ${
              section.isActive
                ? "border-white/30 bg-white/10 hover:bg-white hover:text-black hover:scale-105 text-white backdrop-blur-md shadow-lg shadow-white/5"
                : "border-white/20 bg-transparent text-white/50 hover:border-white/40 hover:text-white/80"
            }
          `}
        >
          {section.action}
        </button>
      </div>
    </motion.div>
  );
};

export const Vortex = () => {
  const { scrollY } = useScroll();
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;

  const opacity = useTransform(scrollY, [0, vh], [1, 0.1]);
  const blur = useTransform(scrollY, [0, vh], ["blur(0px)", "blur(12px)"]);
  const scale = useTransform(scrollY, [0, vh], [1, 0.95]);

  return (
    <div className="w-full relative bg-[#050505] min-h-screen text-white pb-40">
      {/* Background grain/texture effect overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 fixed"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 1. Header Section */}
      <motion.section
        style={{ opacity, filter: blur, scale }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center text-center max-w-[1400px] mx-auto px-4 md:px-8 z-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className="text-[14vw] md:text-[11rem] font-black leading-[0.85] tracking-tighter text-white mix-blend-plus-lighter drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <GlitchText text="WELCOME TO" /> <br />
            <GlitchText text="THE VORTEX" />
          </h1>
        </motion.div>
      </motion.section>

      {/* 2. Vortex Hubs List */}
      <div className="relative z-20 bg-[#050505] pt-32 pb-40 border-t border-white/5 shadow-[0_-50px_100px_rgba(0,0,0,1)] text-white min-h-screen">
        <div className="absolute inset-0 bg-[#050505] -z-10" />
        <section className="max-w-[1000px] mx-auto px-4 md:px-8 space-y-12">
          {vortexSections.map((section, idx) => (
            <VortexCard key={section.title} section={section} idx={idx} />
          ))}
        </section>
      </div>
    </div>
  );
};
