/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  AppWindow, 
  Zap, 
  BookOpen, 
  Share2, 
  Github, 
  Twitter, 
  Linkedin, 
  ExternalLink,
  Mail,
  MapPin,
  Code,
  Layers,
  Cpu,
  Globe,
  Terminal,
  Coffee,
  Youtube,
  Facebook,
  MessageCircle,
  Bot,
  Smartphone,
  Send,
  ArrowRight,
  Book,
  Instagram,
  Star,
  Briefcase,
  Gamepad2,
  Layout,
  Rocket,
  Quote,
  CheckCircle2,
  Trophy,
  Newspaper,
  ArrowLeft,
  Monitor,
  Palette,
  Code2,
  User,
  Video,
  Brain,
  Mic
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Category = 'Home' | 'Projects' | 'Automation' | 'Ebooks' | 'Content' | 'About' | 'Reviews' | 'Connect';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  size?: '1x1' | '2x1' | '2x2' | '1x2' | '3x1' | '3x2' | '4x1';
  delay?: number;
  onClick?: () => void;
  key?: React.Key;
}

const BentoCard = ({ children, className, size = '1x1', delay = 0, onClick }: BentoCardProps) => {
  const sizeClasses = {
    '1x1': 'col-span-1 row-span-1',
    '2x1': 'col-span-2 row-span-1',
    '2x2': 'col-span-2 row-span-2',
    '1x2': 'col-span-1 row-span-2',
    '3x1': 'col-span-3 row-span-1',
    '3x2': 'col-span-3 row-span-2',
    '4x1': 'col-span-4 row-span-1',
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
        damping: 15
      }}
      onClick={onClick}
      className={cn(
        "glass glass-hover rounded-[2rem] p-6 flex flex-col justify-between group cursor-default relative overflow-hidden border border-white/5",
        sizeClasses[size],
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Category>('Home');
  const [projectFilter, setProjectFilter] = useState<string>('All');
  const [activeProjectCategory, setActiveProjectCategory] = useState<string | null>(null);
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const activeBtn = navRef.current?.querySelector('[data-active="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  const tabs: { name: Category; icon: React.ReactNode }[] = [
    { name: 'Home', icon: <Home size={18} /> },
    { name: 'Projects', icon: <AppWindow size={18} /> },
    { name: 'Automation', icon: <Bot size={18} /> },
    { name: 'Ebooks', icon: <Book size={18} /> },
    { name: 'Content', icon: <Newspaper size={18} /> },
    { name: 'About', icon: <User size={18} /> },
    { name: 'Reviews', icon: <Star size={18} /> },
    { name: 'Connect', icon: <Share2 size={18} /> },
  ];

  const projects = [
    { name: 'Vesper AI Notes', mainCategory: 'Apps & Dev', tags: ['SaaS', 'AI Tools', 'Free Apps'], pricing: 'Free', desc: 'AI-powered note-taking and knowledge base.', url: 'https://vesper-ai-notes.netlify.app/', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: <Bot size={20} /> },
    { name: 'Vibelex', mainCategory: 'Web Platforms', tags: ['SaaS', 'Free Apps'], pricing: 'Free', desc: 'Modern digital experience platform.', url: 'https://vibelex.netlify.app/', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: <Globe size={20} /> },
    { name: 'Zen Maker', mainCategory: 'Apps & Dev', tags: ['SaaS'], pricing: 'Paid', price: '$2.99/yr', desc: 'Minimalist creation tool for focused builders.', url: 'https://zen-maker.netlify.app/', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: <Layout size={20} /> },
    { name: 'LevelUp Hero', mainCategory: 'Apps & Dev', tags: ['Mobile', 'Free Apps'], pricing: 'Free', desc: "Gamified OS for your life's journey.", url: 'https://levelup-heros-journey-os.vercel.app/', color: 'text-orange-400', bg: 'bg-orange-500/10', icon: <Smartphone size={20} /> },
    { name: 'Kairos Beta', mainCategory: 'Apps & Dev', tags: ['SaaS', 'AI Tools'], pricing: 'Paid', desc: 'Time management redefined for the AI era.', url: 'https://kairos-beta3.vercel.app/', color: 'text-rose-400', bg: 'bg-rose-500/10', icon: <AppWindow size={20} /> },
    { name: 'Cyber Quest', mainCategory: 'Interactive Experiences', tags: ['Games', 'Free Apps'], pricing: 'Free', desc: 'A futuristic RPG built with React & Three.js.', url: '#', color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: <Gamepad2 size={20} /> },
    { name: 'SpeakEasy AI', mainCategory: 'Apps & Dev', tags: ['Repos', 'Free Apps', 'AI Tools'], pricing: 'Free', desc: '100% Free AI Text-To-Speech Tool.', url: 'https://github.com/Mr-ABX/SpeakEasy-AI-Text-To-Speech-Tool---100-Free-by-AbdulrahmanT', color: 'text-indigo-400', bg: 'bg-indigo-500/10', icon: <Mic size={20} /> },
    { name: 'AI Personality Quiz', mainCategory: 'Apps & Dev', tags: ['Repos', 'AI Tools'], pricing: 'Free', desc: 'Local run AI Personality Quiz Model.', url: 'https://github.com/Mr-ABX/AI-Personality-Quiz-Model', color: 'text-pink-400', bg: 'bg-pink-500/10', icon: <Brain size={20} /> },
    { name: 'ASCII TypeArt', mainCategory: 'Apps & Dev', tags: ['Repos', 'Free Apps', 'AI Tools'], pricing: 'Free', desc: 'AI art generator for ASCII Canvas.', url: 'https://github.com/Mr-ABX/ASCII-TypeArt-Canvas-Img-to-Art-', color: 'text-teal-400', bg: 'bg-teal-500/10', icon: <Palette size={20} /> },
  ];

  const reviews = [
    { name: "Sarah Jenkins", role: "CEO, TechFlow", location: "UK", text: "Abdulrahman completely transformed our lead generation. The n8n automation he built saves us 20 hours a week.", rating: 5 },
    { name: "Rajiv Patel", role: "Founder, SaaSify", location: "India", text: "Incredible AI integration skills. He built our MVP in record time and the code quality is top-notch.", rating: 5 },
    { name: "Michael Chen", role: "Director, GrowthOps", location: "USA", text: "The custom CRM solution is flawless. Highly recommend his business development and technical expertise.", rating: 5 },
    { name: "Aisha Khan", role: "Marketing Head", location: "Pakistan", text: "Not just a developer, but a true strategist. The video editing and design work for our campaign was stunning.", rating: 5 },
    { name: "David Wright", role: "Product Manager", location: "UK", text: "Vesper AI Notes is a game-changer. His ability to build intuitive, fast, and beautiful SaaS products is rare.", rating: 5 },
    { name: "Priya Sharma", role: "E-commerce Owner", location: "India", text: "Automated our entire customer support with Voice AI. We've seen a 40% increase in customer satisfaction.", rating: 5 },
    { name: "James Wilson", role: "Startup Founder", location: "USA", text: "Abdulrahman's UI/UX design skills brought our vision to life. The platform looks modern and luxurious.", rating: 5 },
    { name: "Zainab Ahmed", role: "Content Creator", location: "Pakistan", text: "The auto-posting pipeline he built for my channels is brilliant. I can finally focus on creating content.", rating: 5 },
    { name: "Elena Rodriguez", role: "Operations Lead", location: "USA", text: "We hired him for a complex n8n workflow and he delivered beyond expectations. A true professional.", rating: 5 },
    { name: "Omar Farooq", role: "Tech Entrepreneur", location: "UK", text: "His open-source tools are fantastic. SpeakEasy AI is incredibly useful and well-built.", rating: 5 },
    { name: "Anita Desai", role: "Agency Director", location: "India", text: "Partnering with INFNI-T' was the best decision for our agency. His strategic insights are invaluable.", rating: 5 },
    { name: "Marcus Johnson", role: "Indie Hacker", location: "USA", text: "Zen Maker is exactly what I needed. Minimalist, fast, and perfectly executed.", rating: 5 },
  ];

  const filteredProjects = useMemo(() => {
    let base = projects;
    if (activeProjectCategory) {
      base = base.filter(p => p.mainCategory === activeProjectCategory);
    }
    if (projectFilter === 'All') return base;
    return base.filter(p => p.tags.includes(projectFilter));
  }, [projectFilter, activeProjectCategory]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Column - Tall Profile */}
            <div className="md:col-span-5 flex flex-col">
              <BentoCard size="1x1" className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-0 overflow-hidden group/profile flex-1 min-h-[600px] md:min-h-[700px] relative border-none">
                <div className="absolute inset-0">
                  <img 
                    src="/assets/my-pfp-full.jpeg" 
                    alt="Abdulrahman Toor" 
                    className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover/profile:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
                </div>
                
                <div className="absolute top-4 right-4 flex flex-col gap-3">
                  <a href="https://www.instagram.com/abdulrahman.toor/" target="_blank" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5"><Instagram size={18} /></a>
                  <a href="https://www.linkedin.com/in/abdulrahman-t/" target="_blank" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5"><Linkedin size={18} /></a>
                  <a href="https://github.com/Mr-ABX/" target="_blank" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5"><Github size={18} /></a>
                  <a href="https://x.com/Mr_AbdulrahmanT" target="_blank" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5"><Twitter size={18} /></a>
                  <a href="https://www.youtube.com/@abdulrahman-toor/" target="_blank" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5"><Youtube size={18} /></a>
                  <a href="#" target="_blank" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5"><Facebook size={18} /></a>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium w-fit border border-emerald-500/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Open for Hire & Partnerships
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium w-fit border border-indigo-500/20">
                      <Trophy size={12} />
                      200+ Projects Delivered
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold mb-2 tracking-tight text-white">Abdulrahman Toor</h1>
                  <h2 className="text-xl text-indigo-400 font-medium mb-4">Founder & AI Automation Expert</h2>
                  <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-md">
                    Architecting the future with AI. I build scalable SaaS platforms, high-performance automation systems, and open-source tools that turn complexity into growth.
                  </p>
                  <div className="flex gap-4">
                    <button onClick={() => setActiveTab('Connect')} className="flex-1 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
                      <Mail size={18} /> Connect
                    </button>
                    <button onClick={() => setActiveTab('Projects')} className="flex-1 bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-colors backdrop-blur-md border border-white/5 flex items-center justify-center gap-2">
                      View Work <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </BentoCard>
            </div>

            {/* Right Column - Shortcuts */}
            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[180px]">
              
              {/* Projects Shortcut */}
              <BentoCard size="2x1" className="group cursor-pointer hover:bg-white/[0.04] transition-colors relative overflow-hidden" onClick={() => { setActiveTab('Projects'); setActiveProjectCategory(null); }}>
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <AppWindow size={100} />
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <AppWindow size={20} />
                      </div>
                      <h3 className="text-xl font-bold">Explore My Work</h3>
                    </div>
                    <ArrowRight size={20} className="text-white/30 group-hover:text-white transition-colors group-hover:translate-x-1" />
                  </div>
                  <p className="text-white/50 text-sm mb-auto max-w-sm">Dive into my portfolio of SaaS platforms, mobile apps, games, and open-source AI tools.</p>
                  
                  <div className="flex gap-2 mt-4">
                    <button onClick={(e) => { e.stopPropagation(); setActiveTab('Projects'); setActiveProjectCategory('Apps & Dev'); }} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"><Code2 size={14}/> Apps & Dev</button>
                    <button onClick={(e) => { e.stopPropagation(); setActiveTab('Projects'); setActiveProjectCategory('Interactive Experiences'); }} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"><Gamepad2 size={14}/> Games</button>
                    <button onClick={(e) => { e.stopPropagation(); setActiveTab('Projects'); setActiveProjectCategory('Web Platforms'); }} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"><Globe size={14}/> Web</button>
                  </div>
                </div>
              </BentoCard>

              {/* Automation Shortcut */}
              <BentoCard size="1x1" className="group cursor-pointer hover:bg-white/[0.04] transition-colors" onClick={() => setActiveTab('Automation')}>
                <div className="h-full flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                    <Bot size={20} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">AI Automation</h3>
                  <p className="text-white/50 text-sm mb-auto">n8n workflows & intelligent systems.</p>
                  <div className="flex items-center text-emerald-400 text-sm font-medium mt-4">
                    View Systems <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </BentoCard>

              {/* Reviews Shortcut */}
              <BentoCard size="1x1" className="group cursor-pointer hover:bg-white/[0.04] transition-colors" onClick={() => setActiveTab('Reviews')}>
                <div className="h-full flex flex-col">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                    <Star size={20} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Client Reviews</h3>
                  <p className="text-white/50 text-sm mb-auto">See what others say about my work.</p>
                  <div className="flex items-center text-amber-400 text-sm font-medium mt-4">
                    Read Testimonials <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </BentoCard>

              {/* Ebooks Shortcut */}
              <BentoCard size="2x1" className="group cursor-pointer hover:bg-white/[0.04] transition-colors relative overflow-hidden" onClick={() => setActiveTab('Ebooks')}>
                <div className="absolute right-0 bottom-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity translate-x-4 translate-y-4">
                  <Book size={80} />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider mb-3 w-fit">
                    New Releases
                  </div>
                  <h3 className="text-xl font-bold mb-2">Ebooks & Guides</h3>
                  <p className="text-white/50 text-sm max-w-[200px]">Level up your skills with my latest digital books.</p>
                </div>
              </BentoCard>

            </div>
          </div>
        );

      case 'Projects':
        if (!activeProjectCategory) {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[200px]">
              <BentoCard size="1x1" onClick={() => setActiveProjectCategory('Apps & Dev')} className="cursor-pointer hover:bg-indigo-500/10 transition-colors group relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Code2 size={120} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                    <Code2 size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Apps & Dev</h3>
                  <p className="text-white/50 text-sm max-w-[200px]">SaaS, Mobile Apps, AI Tools & Open Source Repos.</p>
                </div>
              </BentoCard>

              <BentoCard size="1x1" onClick={() => setActiveProjectCategory('Web Platforms')} className="cursor-pointer hover:bg-purple-500/10 transition-colors group relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Globe size={120} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Web Platforms</h3>
                  <p className="text-white/50 text-sm max-w-[200px]">Modern digital experiences and scalable web applications.</p>
                </div>
              </BentoCard>

              <BentoCard size="1x1" onClick={() => setActiveProjectCategory('Interactive Experiences')} className="cursor-pointer hover:bg-cyan-500/10 transition-colors group relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Gamepad2 size={120} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                    <Gamepad2 size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Interactive Experiences</h3>
                  <p className="text-white/50 text-sm max-w-[200px]">Games, 3D environments, and interactive storytelling.</p>
                </div>
              </BentoCard>

              <BentoCard size="1x1" onClick={() => setActiveProjectCategory('Graphics & Marketing')} className="cursor-pointer hover:bg-pink-500/10 transition-colors group relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Palette size={120} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                    <Palette size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Graphics & Marketing</h3>
                  <p className="text-white/50 text-sm max-w-[200px]">Design assets, marketing campaigns, and brand identities.</p>
                </div>
              </BentoCard>
            </div>
          );
        }

        const categoryProjects = projects.filter(p => p.mainCategory === activeProjectCategory);
        const availableTags = ['All', ...Array.from(new Set(categoryProjects.flatMap(p => p.tags)))];

        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <button onClick={() => { setActiveProjectCategory(null); setProjectFilter('All'); }} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <ArrowLeft size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold">{activeProjectCategory}</h2>
                <p className="text-sm text-white/50">Explore my work in this category.</p>
              </div>
            </div>

            {availableTags.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                {availableTags.map((f) => (
                  <button
                    key={f}
                    onClick={() => setProjectFilter(f)}
                    className={cn(
                      "px-4 py-2 rounded-2xl text-xs font-medium transition-all whitespace-nowrap",
                      projectFilter === f ? "bg-white text-black" : "bg-white/5 text-white/40 hover:bg-white/10"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}

            {filteredProjects.length === 0 ? (
              <div className="py-12 text-center border border-white/5 rounded-3xl bg-white/[0.02]">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-white/20">
                  <AppWindow size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">No projects yet</h3>
                <p className="text-white/50">I'm currently working on exciting things for this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((p, i) => (
                    <BentoCard key={p.name} size={i === 0 && projectFilter === 'All' ? "2x1" : "1x1"} className={cn(p.bg, "border-white/5")}>
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <div className={cn("p-2 rounded-xl bg-black/20", p.color)}>
                            {p.icon}
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <span className={cn("text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter", p.pricing === 'Paid' ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400")}>
                              {p.pricing} {p.price && `(${p.price})`}
                            </span>
                            <a href={p.url} target="_blank" className="text-white/20 hover:text-white transition-colors">
                              <ExternalLink size={16} />
                            </a>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                        <p className="text-xs text-white/50 line-clamp-2 font-light">{p.desc}</p>
                      </div>
                    </BentoCard>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        );

      case 'Automation':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
            <BentoCard size="2x1" className="bg-purple-500/5 border-purple-500/10">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Layers className="text-purple-400" size={20} />
                    <span className="text-[10px] text-purple-400 uppercase tracking-[0.2em] font-bold">n8n Expert</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">AI Automation Systems</h3>
                  <p className="text-white/50 text-sm max-w-xs font-light leading-relaxed">I architect complex n8n workflows that automate lead gen, content creation, and business operations.</p>
                </div>
                <div className="p-4 rounded-3xl bg-purple-500/10 text-purple-400 shadow-lg shadow-purple-500/10">
                  <Terminal size={32} />
                </div>
              </div>
              <div className="mt-auto flex gap-3">
                <a 
                  href="mailto:abdulrahmant.official@gmail.com?subject=Automation Quote Request"
                  className="px-6 py-3 rounded-2xl bg-purple-500 text-white text-xs font-bold hover:bg-purple-400 transition-all shadow-lg shadow-purple-500/20 active:scale-95"
                >
                  Get a Free Quote
                </a>
              </div>
            </BentoCard>

            <BentoCard size="1x1" className="hover:bg-blue-500/5 transition-colors">
              <div className="flex flex-col h-full">
                <div className="mb-4 text-blue-400"><Smartphone size={24} /></div>
                <h3 className="font-bold mb-1">Voice AI</h3>
                <p className="text-xs text-white/40 font-light">Custom voice-calling assistants for automated customer support.</p>
              </div>
            </BentoCard>

            <BentoCard size="1x1" className="hover:bg-emerald-500/5 transition-colors">
              <div className="flex flex-col h-full">
                <div className="mb-4 text-emerald-400"><Send size={24} /></div>
                <h3 className="font-bold mb-1">Lead Gen</h3>
                <p className="text-xs text-white/40 font-light">Automated LinkedIn & Email outreach systems that convert.</p>
              </div>
            </BentoCard>

            <BentoCard size="3x1" className="bg-white/[0.02]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full items-center">
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg mb-1">Auto Posting</h3>
                  <p className="text-xs text-white/40 font-light">Multi-platform content distribution.</p>
                </div>
                <div className="flex flex-col border-l border-white/5 pl-6">
                  <h3 className="font-bold text-lg mb-1">Content Gen</h3>
                  <p className="text-xs text-white/40 font-light">AI-driven content creation pipelines.</p>
                </div>
                <div className="flex flex-col border-l border-white/5 pl-6">
                  <h3 className="font-bold text-lg mb-1">Custom CRM</h3>
                  <p className="text-xs text-white/40 font-light">Automated data sync & management.</p>
                </div>
              </div>
            </BentoCard>
          </div>
        );

      case 'Ebooks':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
            <BentoCard size="2x2" className="p-0 overflow-hidden group/book">
              <div className="relative h-full w-full">
                <img 
                  src="/assets/31 ways to ruin your life cover.png" 
                  alt="31 Ways to Ruin Your Life" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/book:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy size={16} className="text-orange-400" />
                    <span className="text-[10px] text-orange-400 uppercase tracking-[0.2em] font-bold">Best Seller</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2 tracking-tight">31 Ways to Ruin Your Life</h3>
                  <p className="text-white/60 text-sm mb-6 max-w-sm font-light leading-relaxed">A super professional guide to self-sabotage. Learn what NOT to do to succeed.</p>
                  <div className="flex gap-3">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 rounded-2xl bg-white text-black text-xs font-bold hover:bg-white/90 transition-all shadow-xl shadow-white/10"
                    >
                      Get the Book
                    </motion.button>
                  </div>
                </div>
              </div>
            </BentoCard>

            <BentoCard size="1x1" className="bg-indigo-500/5 border-indigo-500/10">
              <div className="flex flex-col h-full justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-indigo-400 uppercase tracking-widest mb-1">Coming Soon</p>
                  <h3 className="font-bold text-lg leading-tight">Sell Like a Psychopath</h3>
                </div>
              </div>
            </BentoCard>

            <BentoCard size="1x1" className="bg-emerald-500/5 border-emerald-500/10">
              <div className="flex flex-col h-full justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <BookOpen size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-emerald-400 uppercase tracking-widest mb-1">Coming Soon</p>
                  <h3 className="font-bold text-lg leading-tight">Digital Dollar Weekend</h3>
                </div>
              </div>
            </BentoCard>

            <BentoCard size="1x1" className="bg-white/[0.02]">
              <div className="flex flex-col h-full justify-center text-center p-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Star size={24} className="text-white/20" />
                </div>
                <h3 className="font-bold mb-1">More Coming Soon</h3>
                <p className="text-xs text-white/40 font-light italic">The library is expanding...</p>
              </div>
            </BentoCard>
          </div>
        );

      case 'Content':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
            <BentoCard size="2x1" className="bg-red-500/5 border-red-500/10">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <Youtube size={32} className="text-red-500" />
                  <div className="px-3 py-1 rounded-full bg-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest">YouTube</div>
                </div>
                <h3 className="font-bold text-2xl mb-2">Video Tutorials</h3>
                <p className="text-white/50 text-sm mb-6 font-light">Deep dives into AI automation, SaaS architecture, and building in public.</p>
                <a 
                  href="https://www.youtube.com/@abdulrahman-toor/" 
                  target="_blank" 
                  className="mt-auto flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 transition-colors group/yt"
                >
                  Watch Now <ArrowRight size={12} className="group-hover/yt:translate-x-1 transition-transform" />
                </a>
              </div>
            </BentoCard>

            <BentoCard size="1x1" className="bg-white/[0.02] group/blog">
              <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <Newspaper size={24} className="text-white/40" />
                  <a href="#" className="text-white/20 hover:text-white transition-colors"><ExternalLink size={14} /></a>
                </div>
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Blog</p>
                  <h3 className="font-bold text-sm leading-tight group-hover:text-indigo-400 transition-colors">AI in 2026: The Shift to Autonomous Agents</h3>
                </div>
              </div>
            </BentoCard>

            <BentoCard size="1x1" className="bg-white/[0.01]">
              <div className="flex flex-col justify-center items-center text-center h-full">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                  <Send size={24} className="text-white/20" />
                </div>
                <h3 className="font-bold mb-1">Newsletter</h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">Coming Soon</p>
              </div>
            </BentoCard>
          </div>
        );

      case 'About':
        const companies = [
          { name: 'Plotnao', role: 'Partner' },
          { name: 'Adriel Partners', role: 'Collaborator' },
          { name: 'Content with Teeth', role: 'AI Strategist' },
          { name: 'Outlab', role: 'Expert' },
          { name: 'MSN Global IT Sol', role: 'Consultant' },
        ];

        const skills = [
          { name: 'AI Automation', icon: <Bot size={16} />, level: 'Expert' },
          { name: 'SaaS Development', icon: <Code size={16} />, level: 'Expert' },
          { name: 'Video Editing', icon: <Video size={16} />, level: 'Advanced' },
          { name: 'UI/UX Design', icon: <Palette size={16} />, level: 'Advanced' },
          { name: 'Digital Marketing', icon: <Zap size={16} />, level: 'Advanced' },
          { name: 'Business Strategy', icon: <Briefcase size={16} />, level: 'Expert' },
        ];

        return (
          <div className="space-y-12">
            {/* Section 1: About */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                <h2 className="text-2xl font-bold tracking-tight">About</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[160px]">
                {/* Profile Card (Mini) */}
                <BentoCard size="2x2" className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 flex flex-col justify-between group/profile-mini relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-50" />
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                      <img 
                        src="/assets/my-pfp-full.jpeg" 
                        alt="Abdulrahman Toor" 
                        className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover/profile-mini:scale-105"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80';
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <a href="https://www.instagram.com/abdulrahman.toor/" target="_blank" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md flex items-center justify-center border border-white/5"><Instagram size={18} /></a>
                      <a href="https://www.linkedin.com/in/abdulrahman-t/" target="_blank" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md flex items-center justify-center border border-white/5"><Linkedin size={18} /></a>
                    </div>
                  </div>

                  <div className="relative z-10 mt-6">
                    <h3 className="text-3xl font-bold text-white mb-1">Abdulrahman Toor</h3>
                    <p className="text-indigo-400 text-sm font-medium mb-4">SaaS Builder & AI Automation Expert</p>
                    <p className="text-white/60 text-xs leading-relaxed max-w-xs font-light">Architecting the future with AI. I build scalable SaaS platforms and high-performance automation systems that turn complexity into growth.</p>
                    
                    <div className="flex items-center gap-4 mt-6 text-white/30">
                      <Github size={16} className="hover:text-white transition-colors cursor-pointer" />
                      <Youtube size={16} className="hover:text-white transition-colors cursor-pointer" />
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-bold">
                        <MapPin size={12} className="text-indigo-400" /> Punjab, Pakistan
                      </div>
                    </div>
                  </div>
                </BentoCard>

                {/* Status Card */}
                <BentoCard size="1x1" className="bg-emerald-500/[0.02]">
                  <div className="flex flex-col justify-between h-full">
                    <div className="relative w-fit">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Zap size={20} />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0a0a0a] animate-pulse" />
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Status</p>
                      <p className="font-medium text-sm">Open for Hire & Partnerships</p>
                    </div>
                  </div>
                </BentoCard>

                {/* Trust Widget */}
                <BentoCard size="1x1" className="bg-amber-500/[0.02]">
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex text-amber-400 gap-0.5">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <div>
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Client Trust</p>
                      <p className="font-medium text-sm">200+ Projects Delivered</p>
                    </div>
                  </div>
                </BentoCard>

                {/* Business Dev Card */}
                <BentoCard size="2x1" className="bg-blue-500/[0.02] group/biz">
                  <div className="flex items-center justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="text-blue-400" size={16} />
                        <span className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-bold">Business Growth</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1 group-hover/biz:text-blue-300 transition-colors">Business Development</h3>
                      <p className="text-white/50 text-xs font-light">Helping startups scale through strategic AI implementation.</p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Rocket size={32} />
                    </div>
                  </div>
                </BentoCard>

                {/* Tech Stack */}
                <BentoCard size="4x1" className="bg-white/[0.01]">
                  <div className="flex items-center justify-between h-full">
                    <div className="flex flex-col">
                      <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">AI Stack</p>
                      <p className="font-medium text-xl">Antigravity & n8n</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-4">
                        <div className="w-14 h-14 rounded-full bg-indigo-500/20 border border-white/10 flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/10 backdrop-blur-sm"><Cpu size={24} /></div>
                        <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-white/10 flex items-center justify-center text-purple-400 shadow-xl shadow-purple-500/10 backdrop-blur-sm"><Layers size={24} /></div>
                        <div className="w-14 h-14 rounded-full bg-blue-500/20 border border-white/10 flex items-center justify-center text-blue-400 shadow-xl shadow-blue-500/10 backdrop-blur-sm"><Bot size={24} /></div>
                      </div>
                    </div>
                  </div>
                </BentoCard>
              </div>
            </section>

            {/* Section 2: Ventures */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-purple-500 rounded-full" />
                <h2 className="text-2xl font-bold tracking-tight">Ventures</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
                {/* Personal Site */}
                <BentoCard size="2x1" className="bg-indigo-500/5 border-indigo-500/10 group/site">
                  <div className="flex items-center justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="text-indigo-400" size={16} />
                        <span className="text-[10px] text-indigo-400 uppercase tracking-[0.2em] font-bold">Personal Hub</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-1 group-hover/site:text-indigo-300 transition-colors">abdulrahmant.com</h3>
                      <p className="text-white/50 text-sm font-light">My personal corner of the internet.</p>
                    </div>
                    <a href="https://abdulrahmant.com" target="_blank" className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 hover:bg-indigo-500/20 transition-all">
                      <ExternalLink size={24} />
                    </a>
                  </div>
                </BentoCard>

                {/* Agency Site */}
                <BentoCard size="1x1" className="bg-white/[0.02] group/agency">
                  <div className="flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start">
                      <Layout size={24} className="text-white/40" />
                      <a href="https://infni-t.com" target="_blank" className="text-white/20 hover:text-white transition-colors"><ExternalLink size={14} /></a>
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">INFNI-T'</h3>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest">Agency Venture</p>
                    </div>
                  </div>
                </BentoCard>

                {/* Companies Worked With */}
                <BentoCard size="3x1" className="bg-white/[0.01]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-6">
                      <CheckCircle2 className="text-indigo-400" size={16} />
                      <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">The Vein (Trusted By)</span>
                    </div>
                    <div className="flex flex-wrap gap-x-8 gap-y-4 items-center">
                      {companies.map(c => (
                        <div key={c.name} className="flex flex-col">
                          <span className="text-sm font-bold text-white/80">{c.name}</span>
                          <span className="text-[8px] text-white/30 uppercase tracking-tighter">{c.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </BentoCard>
              </div>
            </section>

            {/* Section 3: Skills */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                <h2 className="text-2xl font-bold tracking-tight">Skills & Expertise</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill, i) => (
                  <BentoCard key={skill.name} size="1x1" delay={i * 0.1} className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                    <div className="flex flex-col h-full justify-between">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60">
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm mb-1">{skill.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full bg-indigo-500 rounded-full",
                                skill.level === 'Expert' ? "w-full" : "w-[85%]"
                              )} 
                            />
                          </div>
                          <span className="text-[8px] text-white/30 uppercase font-bold">{skill.level}</span>
                        </div>
                      </div>
                    </div>
                  </BentoCard>
                ))}
              </div>
            </section>
          </div>
        );

      case 'Connect':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]">
             {/* WhatsApp Card */}
            <BentoCard size="2x2" className="bg-emerald-500/5 border-emerald-500/10 group/wa">
              <div className="flex flex-col h-full justify-center items-center text-center p-8">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover/wa:scale-110 transition-transform duration-500">
                  <MessageCircle size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-2">WhatsApp Me</h3>
                <p className="text-white/40 text-sm mb-6 font-light">+92 309 4506904</p>
                <a 
                  href="https://wa.me/923094506904" 
                  target="_blank" 
                  className="px-8 py-3 rounded-2xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
                >
                  Start Chat
                </a>
              </div>
            </BentoCard>

            {/* Main Email */}
            <BentoCard size="2x1" className="bg-indigo-500/5 border-indigo-500/10">
              <div className="flex items-center justify-between h-full">
                <div>
                  <h3 className="font-bold">Contact Inquiries</h3>
                  <p className="text-xs text-white/40">abdulrahmant.official@gmail.com</p>
                </div>
                <motion.a 
                  whileHover={{ scale: 1.1 }}
                  href="mailto:abdulrahmant.official@gmail.com" 
                  className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400"
                >
                  <Mail size={20} />
                </motion.a>
              </div>
            </BentoCard>

            {/* Secondary Email */}
            <BentoCard size="2x1" className="bg-white/[0.02]">
              <div className="flex items-center justify-between h-full">
                <div>
                  <h3 className="font-bold">Secondary Email</h3>
                  <p className="text-xs text-white/40">digital.b3asts@gmail.com</p>
                </div>
                <motion.a 
                  whileHover={{ scale: 1.1 }}
                  href="mailto:digital.b3asts@gmail.com" 
                  className="p-3 rounded-2xl bg-white/5 text-white/60"
                >
                  <Mail size={20} />
                </motion.a>
              </div>
            </BentoCard>

            {/* Social Grid */}
            <BentoCard size="2x1" className="bg-white/[0.01]">
              <div className="flex items-center justify-around h-full w-full flex-wrap gap-2">
                <a href="https://www.instagram.com/abdulrahman.toor/" target="_blank" className="p-3 rounded-2xl bg-pink-500/10 text-pink-400 hover:scale-110 transition-transform" title="Instagram"><Instagram size={20} /></a>
                <a href="https://www.linkedin.com/in/abdulrahman-t/" target="_blank" className="p-3 rounded-2xl bg-blue-600/10 text-blue-600 hover:scale-110 transition-transform" title="LinkedIn"><Linkedin size={20} /></a>
                <a href="https://github.com/Mr-ABX/" target="_blank" className="p-3 rounded-2xl bg-white/5 text-white hover:scale-110 transition-transform" title="GitHub"><Github size={20} /></a>
                <a href="https://x.com/Mr_AbdulrahmanT" target="_blank" className="p-3 rounded-2xl bg-white/5 text-white hover:scale-110 transition-transform" title="Twitter/X"><Twitter size={20} /></a>
                <a href="https://www.youtube.com/@abdulrahman-toor/" target="_blank" className="p-3 rounded-2xl bg-red-500/10 text-red-500 hover:scale-110 transition-transform" title="YouTube"><Youtube size={20} /></a>
                <a href="#" target="_blank" className="p-3 rounded-2xl bg-orange-500/10 text-orange-500 hover:scale-110 transition-transform" title="Reddit"><MessageCircle size={20} /></a>
                <a href="#" target="_blank" className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 hover:scale-110 transition-transform" title="Facebook"><Facebook size={20} /></a>
              </div>
            </BentoCard>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen mesh-gradient flex flex-col items-center py-12 px-4 md:py-20 selection:bg-indigo-500/30">
      {/* Header / Navigation */}
      <header className="w-full mb-12 sticky top-6 md:top-8 z-50 px-4 flex justify-center">
        <nav 
          ref={navRef}
          className="glass rounded-full p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar shadow-2xl border border-white/10 max-w-full backdrop-blur-2xl"
        >
          {tabs.map((tab) => (
            <button
              key={tab.name}
              data-active={activeTab === tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={cn(
                "relative rounded-full text-[11px] md:text-sm font-semibold transition-all duration-500 flex items-center justify-center whitespace-nowrap outline-none group",
                activeTab === tab.name 
                  ? "px-5 py-2.5 md:px-7 md:py-3 text-white" 
                  : "px-3 py-2.5 md:px-4 md:py-3 text-white/30 hover:text-white/60 hover:bg-white/5 hover:px-5 hover:md:px-7"
              )}
            >
              {activeTab === tab.name && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={cn(
                "relative z-10 transition-all duration-300", 
                activeTab === tab.name ? "scale-110 mr-2" : "scale-100 group-hover:mr-2"
              )}>
                {tab.icon}
              </span>
              <span className={cn(
                "relative z-10 transition-all duration-500 overflow-hidden",
                activeTab === tab.name ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100"
              )}>
                {tab.name}
              </span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-24 text-white/20 text-[10px] flex flex-col items-center gap-4 uppercase tracking-[0.3em]">
        <div className="flex items-center gap-4">
          <p>© 2026 AbdulRahman-T</p>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <p>Built with Antigravity</p>
        </div>
        <div className="flex items-center gap-6 mt-2">
          <a href="https://github.com/Mr-ABX/" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://x.com/Mr_AbdulrahmanT" className="hover:text-white transition-colors">Twitter</a>
          <a href="https://www.linkedin.com/in/abdulrahman-t/" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
