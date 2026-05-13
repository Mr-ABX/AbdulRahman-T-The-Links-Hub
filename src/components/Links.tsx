import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Linkedin, Github, Twitter, Mail, ArrowRight, Bot, Store, LayoutGrid, Newspaper } from 'lucide-react';

const myPfpFull = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";

export const Links = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const quickLinks = [
    { 
      name: "My Storefront", 
      desc: "Premium templates & components",
      icon: <Store size={24} />, 
      action: () => setActiveTab('Store'), 
      highlight: true 
    },
    { 
      name: "Ask My AI Assistant", 
      desc: "Chat with my custom Gemini 3 Flash model",
      icon: <Bot size={24} />, 
      action: () => { /* Assume handled by parent or hook */ }, 
      highlight: false 
    },
    { 
      name: "Explore My Apps", 
      desc: "Web apps, tools, and SaaS products",
      icon: <LayoutGrid size={24} />, 
      action: () => setActiveTab('Apps'), 
      highlight: false 
    },
    { 
      name: "Read the Journal", 
      desc: "Ideas, guides, and tech explorations",
      icon: <Newspaper size={24} />, 
      action: () => setActiveTab('Journal'), 
      highlight: false 
    },
    { 
      name: "Get in Touch", 
      desc: "Available for freelance work",
      icon: <Mail size={24} />, 
      action: () => setActiveTab('Connect'), 
      highlight: false 
    },
  ];

  const socialLinks = [
    { icon: <Instagram size={20} />, url: "https://www.instagram.com/abdulrahman.toor/" },
    { icon: <Linkedin size={20} />, url: "https://www.linkedin.com/in/abdulrahman-t/" },
    { icon: <Github size={20} />, url: "https://github.com/Mr-ABX/" },
    { icon: <Twitter size={20} />, url: "https://x.com/Mr_AbdulrahmanT" }
  ];

  return (
    <div className="w-full relative z-10 flex flex-col items-center justify-center p-4 md:p-8 min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[480px] relative z-10 flex flex-col items-center"
      >
        {/* Profile Card */}
        <div className="flex flex-col items-center mb-10 w-full">
          <div className="relative mb-6 group cursor-pointer" onClick={() => setActiveTab('Connect')}>
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[2.5rem] blur-xl opacity-40 animate-pulse group-hover:opacity-70 transition-opacity duration-500" />
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl relative z-10 bg-[#050505]">
              <div className="absolute inset-0 bg-indigo-500/10 flex items-center justify-center text-5xl">👨🏽‍💻</div>
              <img 
                src={myPfpFull} 
                alt="Abdulrahman Toor" 
                className="absolute inset-0 w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            
            <div className="absolute -bottom-4 right-[-10px] z-20 bg-[#050505] border border-white/10 rounded-full py-1.5 px-3 shadow-xl">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5 opacity-90">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_infinite]" /> Available
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-black text-center mb-2 tracking-tight text-white drop-shadow-md">
            Abdulrahman Toor
          </h1>
          <p className="text-white/60 text-sm font-medium tracking-wide text-center max-w-[280px] mb-6">
            Architecting the future with AI, SaaS, and Automation.
          </p>

          <div className="flex gap-4">
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/30 hover:scale-110 transition-all shadow-lg"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links Column */}
        <div className="w-full flex flex-col gap-4">
          {quickLinks.map((link, i) => (
            <motion.button
              key={link.name}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1 + (i * 0.1), duration: 0.5 }}
              onClick={link.action}
              className={`
                group relative w-full p-5 rounded-[2rem] flex flex-col md:flex-row items-start md:items-center gap-5 transition-all duration-300
                ${link.highlight 
                  ? 'bg-gradient-to-br from-indigo-500/10 via-[#0a0a0a] to-purple-600/10 border-indigo-500/30 hover:border-indigo-400 border shadow-[0_0_30px_rgba(99,102,241,0.05)] hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]' 
                  : 'bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/20 hover:shadow-2xl'
                }
              `}
            >
              <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${link.highlight ? 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg' : 'bg-white/5 text-white/50 group-hover:bg-white/10 group-hover:text-white transition-all duration-300'}`}>
                {link.icon}
              </div>
              <div className="flex-1 text-left flex flex-col justify-center">
                <h3 className={`font-bold text-lg mb-1 ${link.highlight ? 'text-white' : 'text-white/80 group-hover:text-white transition-all duration-300'}`}>
                  {link.name}
                </h3>
                <p className="text-white/50 text-xs font-medium">
                  {link.desc}
                </p>
              </div>
              <div className="absolute top-5 right-5 md:relative md:top-auto md:right-auto shrink-0 w-8 flex justify-end text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
                <ArrowRight size={20} />
              </div>
            </motion.button>
          ))}
          
          <button 
            onClick={() => setActiveTab('Home')}
            className="mt-6 w-full py-4 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors"
          >
            ← Back to Main Website
          </button>
        </div>
      </motion.div>
    </div>
  );
};
