import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:"<>?~`-=[]\\;,./';
const generateGibberish = (length: number) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const GlitchText = ({ text, className = '' }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState(generateGibberish(text.length));

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
              if (letter === ' ') return ' ';
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
    bgImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "BATCAVE",
    action: "Open Now",
    isActive: true,
    bgImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "MEET THE MULTIVERSE (LOADING...)",
    action: "Get Updates",
    isActive: false,
    bgImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "CYBERSECURITY & ETHICAL HACKING HUB (LOADING...)",
    action: "Get Updates",
    isActive: false,
    bgImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "FUSION NEXUS DASHBOARD",
    action: "Get Notes",
    isActive: false,
    bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "LLM & LOCAL MODELS LIBRARIES",
    action: "Open Now",
    isActive: true,
    bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "N8N & AI AUTOMATIONS",
    action: "Get Updates",
    isActive: false,
    bgImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "NEW AREAS COMING SOON",
    action: "Get Updates",
    isActive: false,
    bgImage: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  }
];

export const Vortex = () => {
  return (
    <div className="w-full relative bg-[#050505] min-h-screen text-white overflow-hidden pb-40">
      
      {/* Background grain/texture effect overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 1. Header Section */}
      <section className="pt-32 pb-24 flex flex-col items-center text-center max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-[6rem] font-black leading-[1.1] tracking-tight text-white mb-8">
            <GlitchText text="WELCOME TO" /> <br className="hidden sm:block" />
            <GlitchText text="THE VORTEX" />
          </h1>
        </motion.div>
      </section>

      {/* 2. Vortex Hubs List */}
      <section className="max-w-[1000px] mx-auto px-4 md:px-8 space-y-12 relative z-10">
        {vortexSections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`
              relative w-full aspect-[21/9] md:aspect-[3/1] rounded-[2rem] overflow-hidden 
              border border-white/5 flex flex-col justify-center p-8 md:p-16 group
            `}
          >
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105">
              <img 
                src={section.bgImage} 
                alt={section.title} 
                className={`w-full h-full object-cover ${!section.isActive ? 'grayscale opacity-30 blur-sm' : 'opacity-60'}`} 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-wide drop-shadow-md">
                {section.title}
              </h2>
              <button 
                className={`
                  px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest border transition-all
                  ${section.isActive 
                    ? 'border-white/50 bg-white/10 hover:bg-white hover:text-black text-white backdrop-blur-md' 
                    : 'border-white/20 bg-transparent text-white/50 hover:border-white/40 hover:text-white/80'
                  }
                `}
              >
                {section.action}
              </button>
            </div>
          </motion.div>
        ))}
      </section>

    </div>
  );
};
