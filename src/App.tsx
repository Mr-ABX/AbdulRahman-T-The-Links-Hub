/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  Mic,
  Sparkles,
  Users,
  Activity,
  X,
  Download
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ChatAssistant } from './components/ChatAssistant';
import { CustomCursor } from './components/CustomCursor';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Category = 'Home' | 'Projects' | 'Automation' | 'Ebooks' | 'Content' | 'About' | 'Reviews' | 'Connect';
type ProjectCategory = 'Apps & Dev' | 'Web Platforms' | 'Interactive Experiences' | 'Graphics & Marketing' | 'AI Solutions';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  size?: '1x1' | '2x1' | '2x2' | '1x2' | '3x1' | '3x2' | '4x1';
  delay?: number;
  onClick?: () => void;
  key?: React.Key;
}

const SkeletonCard = ({ size = '1x1' }: { size?: BentoCardProps['size'], key?: React.Key }) => {
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
    <div className={cn(
      "glass rounded-[2rem] p-6 flex flex-col gap-4 relative overflow-hidden border border-white/5 animate-pulse",
      sizeClasses[size]
    )}>
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

const BentoCard = ({ children, className, size = '1x1', delay = 0, onClick }: BentoCardProps) => {
  const sizeClasses = {
    '1x1': 'col-span-1 row-span-1',
    '2x1': 'col-span-1 md:col-span-2 row-span-1',
    '2x2': 'col-span-1 md:col-span-2 row-span-2',
    '1x2': 'col-span-1 row-span-2',
    '3x1': 'col-span-1 md:col-span-3 row-span-1',
    '3x2': 'col-span-1 md:col-span-3 row-span-2',
    '4x1': 'col-span-1 md:col-span-4 row-span-1',
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

const tabs: { name: Category; icon: React.ReactNode }[] = [
  { name: 'Home', icon: <Home size={18} /> },
  { name: 'Projects', icon: <AppWindow size={18} /> },
  { name: 'Ebooks', icon: <Book size={18} /> },
  { name: 'Content', icon: <Newspaper size={18} /> },
  { name: 'Automation', icon: <Bot size={18} /> },
  { name: 'About', icon: <User size={18} /> },
  { name: 'Reviews', icon: <Star size={18} /> },
  { name: 'Connect', icon: <Share2 size={18} /> },
];

const projects = [
  { name: "ARGUS // INTELLIGENCE", mainCategory: 'AI Solutions', tags: ['Cybersecurity', 'OSINT', 'SaaS'], pricing: 'Paid', desc: 'A high-tech cybersecurity dashboard tracking visitor IP, location, and network details with a live map interface.', url: 'https://argus-osint-soc.vercel.app/', previewUrl: 'https://argus-osint-soc.vercel.app/', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: <Globe size={20} /> },
  { name: "Koe Audio Studio", mainCategory: 'AI Solutions', tags: ['Audio', 'AI Tools', 'SaaS'], pricing: 'Paid', desc: 'Next-generation parametric voice synthesis suite. Voice cloning and advanced speech generation.', url: 'https://koe-audiostudio.netlify.app/', previewUrl: 'https://koe-audiostudio.netlify.app/', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: <Mic size={20} /> },
  { name: "FlowType - Minimalist Touch Typing", mainCategory: 'Interactive Experiences', tags: ['Typing', 'Interactive', 'AI Tools', 'Free Apps'], pricing: 'Free', desc: 'An ultra-minimalist, distraction-free touch typing application with mechanical keyboard sounds, real-time analytics, and AI-generated practice content.', url: 'https://theflowtype.netlify.app/', previewUrl: 'https://theflowtype.netlify.app/', color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: <Terminal size={20} /> },
  { name: "Babel | Learn Fictional Languages", mainCategory: 'Apps & Dev', tags: ['Education', 'Gamified', 'Free Apps'], pricing: 'Free', desc: 'Master the languages of the multiverse. A high-end, gamified learning app for fictional tongues like Minionese, Klingon, and High Valyrian.', url: 'https://babel-learn-fiction.netlify.app/', previewUrl: 'https://babel-learn-fiction.netlify.app/', color: 'text-indigo-400', bg: 'bg-indigo-500/10', icon: <BookOpen size={20} /> },
  { name: "Virtuoso Web Piano & Beat Studio", mainCategory: 'Interactive Experiences', tags: ['Music', 'Interactive', 'Free Apps'], pricing: 'Free', desc: 'A premium, responsive web music workstation featuring a Grand Piano, multiple synthesizers, and a 16-pad Beat Studio for rhythm creation.', url: 'https://virtuoso-keys.netlify.app/', previewUrl: 'https://virtuoso-keys.netlify.app/', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: <Palette size={20} /> },
  { name: "The Architect's Doodle Trap", mainCategory: 'Interactive Experiences', tags: ['Games', 'Free Apps'], pricing: 'Free', desc: 'A creative puzzle game built for the web.', url: 'https://the-architects-doodle-trap.netlify.app/', previewUrl: 'https://the-architects-doodle-trap.netlify.app/', color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: <Gamepad2 size={20} /> },
  { name: "Trust Nothing", mainCategory: 'Interactive Experiences', tags: ['Games', 'Free Apps'], pricing: 'Free', desc: 'A psychological thriller game that challenges your perception.', url: 'https://trust-nothing.netlify.app/', previewUrl: 'https://trust-nothing.netlify.app/', color: 'text-red-500', bg: 'bg-red-500/10', icon: <Gamepad2 size={20} /> },
  { name: "Gekko Dash", mainCategory: 'Interactive Experiences', tags: ['Games', 'Free Apps'], pricing: 'Free', desc: 'A fast-paced neon runner game with addictive mechanics.', url: 'https://gekko-dash.netlify.app/', previewUrl: 'https://gekko-dash.netlify.app/', color: 'text-lime-400', bg: 'bg-lime-500/10', icon: <Gamepad2 size={20} /> },
  { name: 'Vesper AI Notes', mainCategory: 'AI Solutions', tags: ['SaaS', 'AI Tools', 'Free Apps'], pricing: 'Free', desc: 'AI-powered note-taking and knowledge base.', url: 'https://vesper-ai-notes.netlify.app/', previewUrl: 'https://vesper-ai-notes.netlify.app/', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: <Bot size={20} /> },
  { name: 'Vibelex', mainCategory: 'Web Platforms', tags: ['SaaS', 'Free Apps'], pricing: 'Free', desc: 'Modern digital experience platform.', url: 'https://vibelex.netlify.app/', previewUrl: 'https://vibelex.netlify.app/', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: <Globe size={20} /> },
  { name: 'Zen Maker', mainCategory: 'Apps & Dev', tags: ['SaaS'], pricing: 'Paid', price: '$2.99/yr', desc: 'Minimalist creation tool for focused builders.', url: 'https://zen-maker.netlify.app/', previewUrl: 'https://zen-maker.netlify.app/', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: <Layout size={20} /> },
  { name: 'LevelUp Hero', mainCategory: 'Apps & Dev', tags: ['Mobile', 'Free Apps'], pricing: 'Free', desc: "Gamified OS for your life's journey.", url: 'https://levelup-heros-journey-os.vercel.app/', previewUrl: 'https://levelup-heros-journey-os.vercel.app/', color: 'text-orange-400', bg: 'bg-orange-500/10', icon: <Smartphone size={20} /> },
  { name: 'Kairos Beta', mainCategory: 'AI Solutions', tags: ['SaaS', 'AI Tools'], pricing: 'Paid', desc: 'Time management redefined for the AI era.', url: 'https://kairos-beta3.vercel.app/', previewUrl: 'https://kairos-beta3.vercel.app/', color: 'text-rose-400', bg: 'bg-rose-500/10', icon: <AppWindow size={20} /> },
  { name: 'Cyber Quest', mainCategory: 'Interactive Experiences', tags: ['Games', 'Free Apps'], pricing: 'Free', desc: 'A futuristic RPG built with React & Three.js.', url: '#', color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: <Gamepad2 size={20} /> },
  { name: 'SpeakEasy AI', mainCategory: 'AI Solutions', tags: ['Repos', 'Free Apps', 'AI Tools'], pricing: 'Free', desc: '100% Free AI Text-To-Speech Tool.', url: 'https://github.com/Mr-ABX/SpeakEasy-AI-Text-To-Speech-Tool---100-Free-by-AbdulrahmanT', color: 'text-indigo-400', bg: 'bg-indigo-500/10', icon: <Mic size={20} /> },
  { name: 'AI Personality Quiz', mainCategory: 'AI Solutions', tags: ['Repos', 'AI Tools'], pricing: 'Free', desc: 'Local run AI Personality Quiz Model.', url: 'https://github.com/Mr-ABX/AI-Personality-Quiz-Model', color: 'text-pink-400', bg: 'bg-pink-500/10', icon: <Brain size={20} /> },
  { name: 'ASCII TypeArt', mainCategory: 'Apps & Dev', tags: ['Repos', 'Free Apps', 'AI Tools'], pricing: 'Free', desc: 'AI art generator for ASCII Canvas.', url: 'https://github.com/Mr-ABX/ASCII-TypeArt-Canvas-Img-to-Art-', color: 'text-teal-400', bg: 'bg-teal-500/10', icon: <Palette size={20} /> },
  { name: 'GenAI Studio', mainCategory: 'AI Solutions', tags: ['AI Tools', 'SaaS', 'GenAI'], pricing: 'Paid', price: 'Custom', desc: 'Enterprise-grade generative AI platform for content creation.', url: '#', color: 'text-orange-400', bg: 'bg-orange-500/10', icon: <Sparkles size={20} /> },
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

const LiveAutomationFeed = () => {
  const [automationTasks, setAutomationTasks] = useState(1248);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setAutomationTasks(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BentoCard size="1x1" className="bg-white/[0.02] group">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Zap size={20} />
          </div>
          <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Live Feed</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">Tasks Automated Today</span>
            <span className="text-sm font-bold text-emerald-400">{automationTasks.toLocaleString()}</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-emerald-500"
            />
          </div>
          <p className="text-[10px] text-white/30 italic">"Efficiency is the key to scale."</p>
        </div>
      </div>
    </BentoCard>
  );
};

const FeaturedCarousel = ({ projects, onSelect }: { projects: any[], onSelect: (p: any) => void }) => {
  const [index, setIndex] = useState(0);
  const featured = useMemo(() => projects.filter(p => ['FlowType - Minimalist Touch Typing', 'Babel | Learn Fictional Languages', 'Virtuoso Web Piano & Beat Studio', 'Trust Nothing', 'Gekko Dash', 'The Architect\'s Doodle Trap', 'Vesper AI Notes'].includes(p.name)), [projects]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featured.length]);

  const current = featured[index];

  return (
    <BentoCard 
      size="2x2" 
      className="relative overflow-hidden group/featured cursor-pointer border-indigo-500/30 bg-indigo-500/5 shadow-[0_0_30px_rgba(99,102,241,0.05)] min-h-[450px] md:min-h-0"
      onClick={() => onSelect(current)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 p-6 md:p-8 flex flex-col"
        >
          {/* Background Decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem]">
            {current.url !== '#' && (
              <img 
                src={`https://image.thum.io/get/width/1200/crop/800/noanimate/${current.url}`}
                alt={current.name}
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover/featured:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
            <div className={`absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_70%_30%,_var(--tw-gradient-from)_0%,_transparent_70%)] ${current.bg.replace('bg-', 'from-')}`} />
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4">
              {React.cloneElement(current.icon as React.ReactElement, { size: 240, className: `${current.color} opacity-10 rotate-12` })}
            </div>
          </div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${current.bg} flex items-center justify-center ${current.color} shadow-lg`}>
                  {React.cloneElement(current.icon as React.ReactElement, { size: 24 })}
                </div>
                <div>
                  <div className={`text-[10px] font-bold uppercase tracking-[0.2em] ${current.color}`}>Featured Project</div>
                  <div className="flex gap-1.5 mt-1">
                    {featured.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-indigo-400' : 'w-2 bg-white/10'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-2 rounded-full bg-white/5 border border-white/10">
                <Sparkles size={16} className="text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            <div className="mt-auto">
              <h3 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 tracking-tight group-hover/featured:translate-x-2 transition-transform duration-500">{current.name}</h3>
              <p className="text-white/60 text-sm md:text-lg max-w-md mb-6 md:mb-8 leading-relaxed line-clamp-3">{current.desc}</p>
              
              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 md:px-6 md:py-3 rounded-2xl ${current.bg} ${current.color} font-bold text-xs md:text-sm flex items-center gap-2 group-hover/featured:scale-105 transition-all shadow-xl border border-white/5`}>
                  <span>Explore Now</span>
                  <ArrowRight size={18} />
                </div>
                <div className="text-white/30 text-[10px] md:text-xs font-medium italic">
                  Click to view details
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 to-transparent pointer-events-none rounded-tr-[2rem] rounded-bl-[2rem]" />
    </BentoCard>
  );
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo<Category>(() => {
    const path = location.pathname;
    if (path === '/projects') return 'Projects';
    if (path === '/automation') return 'Automation';
    if (path === '/ebooks') return 'Ebooks';
    if (path === '/content') return 'Content';
    if (path === '/about') return 'About';
    if (path === '/reviews') return 'Reviews';
    if (path === '/connect') return 'Connect';
    return 'Home';
  }, [location.pathname]);

  const setActiveTab = (tab: Category) => {
    if (tab === 'Home') navigate('/');
    else navigate(`/${tab.toLowerCase()}`);
  };

  const [projectFilter, setProjectFilter] = useState<string>('All');
  const [activeProjectCategory, setActiveProjectCategory] = useState<ProjectCategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState('');
  const navRef = React.useRef<HTMLDivElement>(null);

  const openChatWithSearch = (query: string) => {
    setInitialChatMessage(query);
    setIsChatOpen(true);
  };

  React.useEffect(() => {
    if (activeTab === 'Projects') {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [activeTab, activeProjectCategory, projectFilter]);

  React.useEffect(() => {
    const activeBtn = navRef.current?.querySelector('[data-active="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

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
              <div className="sticky top-24 space-y-4">
                <motion.div 
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-[2.5rem] overflow-hidden group/profile min-h-[600px] md:min-h-[750px] relative border border-white/10 shadow-2xl"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src="/assets/my-pfp-full.jpeg" 
                      alt="Abdulrahman Toor" 
                      className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover/profile:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/notionists/svg?seed=Abdulrahman&backgroundColor=6366f1';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
                  </div>
                  
                  {/* Social Floating Icons */}
                  <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
                    <a href="https://www.instagram.com/abdulrahman.toor/" target="_blank" className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5 shadow-xl"><Instagram size={20} /></a>
                    <a href="https://www.linkedin.com/in/abdulrahman-t/" target="_blank" className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5 shadow-xl"><Linkedin size={20} /></a>
                    <a href="https://github.com/Mr-ABX/" target="_blank" className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5 shadow-xl"><Github size={20} /></a>
                    <a href="https://x.com/Mr_AbdulrahmanT" target="_blank" className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/5 shadow-xl"><Twitter size={20} /></a>
                  </div>

                  {/* Content Area */}
                  <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                    <div className="flex flex-wrap gap-2 mb-6">
                      <div className="inline-flex items-center h-9 px-3 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 group/badge-hire transition-all duration-500 cursor-default backdrop-blur-md overflow-hidden hover:pr-4">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                        <span className="max-w-0 overflow-hidden group-hover/badge-hire:max-w-[200px] group-hover/badge-hire:ml-2 transition-all duration-500 whitespace-nowrap opacity-0 group-hover/badge-hire:opacity-100">Available for Projects</span>
                      </div>
                      <div className="inline-flex items-center h-9 px-3 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20 group/badge-projects transition-all duration-500 cursor-default backdrop-blur-md overflow-hidden hover:pr-4">
                        <Trophy size={14} className="shrink-0" />
                        <span className="max-w-0 overflow-hidden group-hover/badge-projects:max-w-[200px] group-hover/badge-projects:ml-2 transition-all duration-500 whitespace-nowrap opacity-0 group-hover/badge-projects:opacity-100">200+ Delivered</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-6">
                      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">Abdulrahman Toor</h1>
                      <h2 className="text-xl text-indigo-400 font-semibold drop-shadow-md">Founder & AI Automation Expert</h2>
                    </div>

                    <p className="text-white/80 text-sm leading-relaxed mb-8 max-w-md font-medium drop-shadow-sm">
                      Architecting the future with AI. I build scalable SaaS platforms, high-performance automation systems, and open-source tools that turn complexity into growth.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab('Connect')} 
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <Mail size={16} className="group-hover/btn:rotate-12 transition-transform relative z-10" /> 
                        <span className="relative z-10">Get in Touch</span>
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab('Projects')} 
                        className="flex-1 bg-white/10 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-white/20 transition-all backdrop-blur-md border border-white/10 flex items-center justify-center gap-2 group/btn shadow-lg"
                      >
                        <span>View My Work</span>
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Interactive Tech Cloud Widget */}
                <BentoCard size="1x1" className="bg-white/[0.02] overflow-hidden group/cloud">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Cpu size={20} />
                      </div>
                      <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Tech Cloud</span>
                    </div>
                    <div className="flex flex-wrap gap-2 relative">
                      {['React', 'Next.js', 'n8n', 'Python', 'AI', 'SaaS', 'Supabase', 'Docker', 'AWS'].map((tech, i) => (
                        <motion.span 
                          key={tech}
                          animate={{ 
                            y: [0, -5, 0],
                            x: [0, i % 2 === 0 ? 5 : -5, 0]
                          }}
                          transition={{ 
                            duration: 3 + i, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="px-3 py-1.5 rounded-xl bg-white/5 text-[10px] text-white/60 font-medium hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors cursor-default border border-white/5"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </BentoCard>
              </div>
            </div>

            {/* Right Column - Categorized Shortcuts */}
            <div className="md:col-span-7 flex flex-col gap-8">
              
              {/* Category 1: Learn & Connect */}
              <div>
                <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Book size={12} className="text-purple-400" /> Learn & Connect
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[minmax(180px,auto)]">
                  
                  {/* AI Assistant Quick Widget */}
                  <BentoCard size="2x1" className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border-indigo-500/20 group/ai-widget relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover/ai-widget:bg-indigo-500/20 transition-colors" />
                    <div className="relative z-10 h-full flex flex-col justify-center p-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover/ai-widget:scale-110 transition-transform">
                          <Bot size={20} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">Ask My AI Assistant</h3>
                          <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Powered by Gemini 3 Flash</p>
                        </div>
                      </div>
                      <div className="relative group/input">
                        <input 
                          type="text" 
                          placeholder="Ask about my projects, skills, or availability..." 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              openChatWithSearch((e.target as HTMLInputElement).value);
                              (e.target as HTMLInputElement).value = '';
                            }
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 pr-12 text-sm focus:outline-none focus:border-indigo-500/50 transition-all group-hover/input:bg-white/10"
                        />
                        <button 
                          onClick={(e) => {
                            const input = (e.currentTarget.previousSibling as HTMLInputElement);
                            if (input.value) {
                              openChatWithSearch(input.value);
                              input.value = '';
                            }
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 transition-colors"
                        >
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </BentoCard>

                  {/* Ebooks Shortcut */}
                  <BentoCard size="1x1" className="group cursor-pointer hover:bg-white/[0.04] transition-colors relative overflow-hidden" onClick={() => setActiveTab('Ebooks')}>
                    <div className="absolute right-0 bottom-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity translate-x-4 translate-y-4">
                      <Book size={60} />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-center">
                      <h3 className="text-lg font-bold mb-2">Learn My Systems</h3>
                      <p className="text-white/50 text-xs max-w-[150px] mb-4">Actionable guides on AI, automation, and SaaS.</p>
                      <div className="flex items-center gap-2 text-purple-400 text-[10px] font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                        <span>Browse Library</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </BentoCard>

                  {/* Newsletter Widget */}
                  <BentoCard size="1x1" className="bg-indigo-500/5 border-indigo-500/10 group">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                          <Newspaper size={20} />
                        </div>
                        <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Newsletter</span>
                      </div>
                      <h3 className="text-sm font-bold mb-1">Join My Newsletter</h3>
                      <p className="text-white/50 text-[10px] mb-auto">Weekly insights on AI trends.</p>
                      <div className="relative mt-auto">
                        <input 
                          type="email" 
                          placeholder="Your email" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-3 text-[10px] focus:outline-none focus:border-indigo-500/50 transition-colors"
                        />
                        <button className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 transition-colors">
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </BentoCard>

                </div>
              </div>

              {/* Category 2: Explore My Work (Apps & Projects) */}
              <div>
                <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <AppWindow size={12} className="text-indigo-400" /> Explore My Work
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[minmax(180px,auto)]">

                  {/* Featured Carousel Widget */}
                  <FeaturedCarousel projects={projects} onSelect={setSelectedProject} />

                  {/* Get My Apps Widget (NEW) */}
                  <BentoCard size="2x1" className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 group/apps cursor-pointer" onClick={() => setActiveTab('Projects')}>
                    <div className="absolute right-0 bottom-0 p-4 opacity-10 group-hover/apps:opacity-20 transition-opacity translate-x-4 translate-y-4">
                      <Download size={80} />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-3 w-fit">
                        Products
                      </div>
                      <h3 className="text-xl font-bold mb-2">Download & Use My Apps</h3>
                      <p className="text-white/50 text-sm max-w-[250px] mb-4">Get access to my premium SaaS tools, free apps, and open-source models.</p>
                      <div className="flex items-center gap-2 text-blue-400 text-xs font-bold group-hover/apps:gap-3 transition-all">
                        <span>Browse Products</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </BentoCard>
                  
                  {/* Projects Shortcut */}
                  <BentoCard size="2x1" className="group cursor-pointer hover:bg-white/[0.04] transition-colors relative overflow-hidden" onClick={() => { setActiveTab('Projects'); setActiveProjectCategory(null); }}>
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                      <AppWindow size={100} />
                    </div>
                    <div className="relative z-10 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                            <AppWindow size={20} />
                          </div>
                          <h3 className="text-xl font-bold">View My Portfolio</h3>
                        </div>
                        <ArrowRight size={20} className="text-white/30 group-hover:text-white transition-colors group-hover:translate-x-1" />
                      </div>
                      <p className="text-white/50 text-sm mb-auto max-w-sm">Explore SaaS platforms, mobile apps, games, and open-source AI tools I've built.</p>
                      
                      <div className="flex gap-2 mt-4">
                        <button onClick={(e) => { e.stopPropagation(); setActiveTab('Projects'); setActiveProjectCategory('Apps & Dev'); }} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"><Code2 size={14}/> Apps</button>
                        <button onClick={(e) => { e.stopPropagation(); setActiveTab('Projects'); setActiveProjectCategory('Interactive Experiences'); }} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"><Gamepad2 size={14}/> Games</button>
                        <button onClick={(e) => { e.stopPropagation(); setActiveTab('Projects'); setActiveProjectCategory('Web Platforms'); }} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"><Globe size={14}/> Web</button>
                      </div>
                    </div>
                  </BentoCard>

                  {/* Live Automation Feed */}
                  <LiveAutomationFeed />

                  {/* Stats Widget */}
                  <BentoCard size="1x1" className="bg-indigo-500/5 border-indigo-500/10">
                    <div className="flex flex-col h-full justify-between">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Users size={20} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold tracking-tighter">100+</h3>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Happy Clients</p>
                      </div>
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-[#050505] bg-white/10 flex items-center justify-center text-[8px] font-bold">
                            {String.fromCharCode(64 + i)}
                          </div>
                        ))}
                        <div className="w-6 h-6 rounded-full border-2 border-[#050505] bg-indigo-500 flex items-center justify-center text-[8px] font-bold">
                          +
                        </div>
                      </div>
                    </div>
                  </BentoCard>

                </div>
              </div>

              {/* Category 3: Work With Me (Hire & Consult) */}
              <div>
                <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <Briefcase size={12} className="text-emerald-400" /> Work With Me
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[minmax(180px,auto)]">
                  
                  {/* Calendar / Consultation Widget */}
                  <BentoCard size="1x1" className="bg-amber-500/5 border-amber-500/10 group/cal cursor-pointer" onClick={() => window.open('https://calendly.com/digital-b3asts/quick-free-consultation', '_blank')}>
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover/cal:scale-110 transition-transform">
                          <Zap size={20} />
                        </div>
                        <span className="text-[8px] text-white/20 uppercase font-bold tracking-widest">Consulting</span>
                      </div>
                      <h3 className="font-bold text-lg mb-1">Book a Strategy Call</h3>
                      <p className="text-xs text-white/40 font-light mb-auto">Need expert advice? Let's discuss your automation or SaaS needs.</p>
                      <div className="flex items-center gap-2 text-amber-400 text-[10px] font-bold uppercase tracking-widest mt-4 group-hover/cal:gap-3 transition-all">
                        <span>Schedule 15-Min Call</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </BentoCard>

                  {/* Hire Me Widget */}
                  <BentoCard size="1x1" className="bg-emerald-500/5 border-emerald-500/10 group/hire cursor-pointer" onClick={() => setActiveTab('Connect')}>
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover/hire:scale-110 transition-transform">
                          <Briefcase size={20} />
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/20 text-[8px] text-emerald-400 font-bold uppercase tracking-widest">
                          <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                          Available
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-1">Start a Project</h3>
                      <p className="text-xs text-white/40 font-light mb-auto">Looking for a dedicated developer to build your next big idea?</p>
                      <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mt-4 group-hover/hire:gap-3 transition-all">
                        <span>Request a Proposal</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </BentoCard>

                  {/* Automation Shortcut */}
                  <BentoCard size="2x1" className="group cursor-pointer hover:bg-white/[0.04] transition-colors relative overflow-hidden" onClick={() => setActiveTab('Automation')}>
                    <div className="absolute right-0 bottom-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity translate-x-4 translate-y-4">
                      <Bot size={80} />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-3 w-fit">
                        Services
                      </div>
                      <h3 className="text-xl font-bold mb-2">Automate Your Business</h3>
                      <p className="text-white/50 text-sm max-w-[250px] mb-4">Save 100+ hours/month with custom n8n workflows and AI systems.</p>
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold group-hover:gap-3 transition-all">
                        <span>View Automation Services</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </BentoCard>

                </div>
              </div>

            </div>
          </div>
        );

      case 'Projects':
        if (!activeProjectCategory) {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[minmax(200px,auto)]">
              <BentoCard size="2x1" onClick={() => setActiveProjectCategory('AI Solutions')} className="cursor-pointer hover:bg-emerald-500/10 transition-colors group relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Brain size={160} />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                    <Brain size={24} />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">AI Solutions</h3>
                  <p className="text-white/50 text-sm max-w-md leading-relaxed">Enterprise-grade AI Platforms, LLM Tools, and Autonomous Agents designed for the next generation of digital growth.</p>
                </div>
              </BentoCard>

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} size={i === 0 && projectFilter === 'All' ? "2x1" : "1x1"} />
                  ))
                ) : (
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((p, i) => (
                      <BentoCard 
                        key={p.name} 
                        size={i === 0 && projectFilter === 'All' ? "2x1" : "1x1"} 
                        className={cn(p.bg, "border-white/5 cursor-pointer relative overflow-hidden group/project")}
                        onClick={() => setSelectedProject(p)}
                      >
                        {p.url !== '#' && (
                          <div className="absolute inset-0 z-0 opacity-20 group-hover/project:opacity-50 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-[2rem]">
                            <img 
                              src={`https://image.thum.io/get/width/600/crop/600/noanimate/${p.url}`}
                              alt={p.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/project:scale-110"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                          </div>
                        )}
                        <div className="flex flex-col h-full relative z-10">
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
                          <p className="text-xs text-white/50 line-clamp-2 font-light mb-auto">{p.desc}</p>
                          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-white/40 group-hover:text-white transition-colors">
                            <span>View Project</span>
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </BentoCard>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            )}
          </div>
        );

      case 'Automation':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(220px,auto)]">
            <BentoCard size="2x2" className="p-0 overflow-hidden group/book">
              <div className="relative h-full w-full">
                <img 
                  src="/assets/31-ways-to-ruin-your-life-cover.png" 
                  alt="31 Ways to Ruin Your Life" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/book:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80';
                  }}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
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
        return (
          <div className="space-y-12">
            {/* Section 1: About */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                <h2 className="text-2xl font-bold tracking-tight">About</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
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
                          (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/notionists/svg?seed=Abdulrahman&backgroundColor=6366f1';
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
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

      case 'Reviews':
        return (
          <div className="space-y-8 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Client Testimonials</h2>
                <p className="text-white/50 text-sm mt-1">Real feedback from people I've worked with.</p>
              </div>
              <div className="flex items-center gap-4 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-sm font-bold">5.0 Average Rating</span>
              </div>
            </div>

            {/* Auto-scrolling Reviews Marquee */}
            <div className="relative flex flex-col gap-6 py-10">
              <div className="flex gap-6 animate-marquee whitespace-nowrap">
                {[...reviews, ...reviews].map((review, i) => (
                  <div key={i} className="inline-block w-[350px] shrink-0">
                    <BentoCard size="1x1" delay={0} className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors border-white/5 h-full whitespace-normal">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex text-amber-400 gap-0.5">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star key={star} size={10} fill="currentColor" />
                            ))}
                          </div>
                          <div className="px-2 py-0.5 rounded-full bg-white/5 text-[8px] text-white/40 uppercase font-bold tracking-widest">
                            Verified
                          </div>
                        </div>
                        <p className="text-sm text-white/70 italic leading-relaxed mb-6 font-light">"{review.text}"</p>
                        <div className="mt-auto flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 font-bold border border-white/10">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{review.name}</h4>
                            <p className="text-[10px] text-white/40">{review.role} • {review.location}</p>
                          </div>
                        </div>
                      </div>
                    </BentoCard>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-6 animate-marquee-reverse whitespace-nowrap">
                {[...reviews, ...reviews].reverse().map((review, i) => (
                  <div key={i} className="inline-block w-[350px] shrink-0">
                    <BentoCard size="1x1" delay={0} className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors border-white/5 h-full whitespace-normal">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex text-amber-400 gap-0.5">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star key={star} size={10} fill="currentColor" />
                            ))}
                          </div>
                          <div className="px-2 py-0.5 rounded-full bg-white/5 text-[8px] text-white/40 uppercase font-bold tracking-widest">
                            Verified
                          </div>
                        </div>
                        <p className="text-sm text-white/70 italic leading-relaxed mb-6 font-light">"{review.text}"</p>
                        <div className="mt-auto flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 font-bold border border-white/10">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{review.name}</h4>
                            <p className="text-[10px] text-white/40">{review.role} • {review.location}</p>
                          </div>
                        </div>
                      </div>
                    </BentoCard>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            <div className="px-4">
              <BentoCard size="3x1" className="bg-indigo-500/10 border-indigo-500/20 text-center py-12">
                <div className="max-w-xl mx-auto">
                  <h3 className="text-2xl font-bold mb-3">Ready to start your project?</h3>
                  <p className="text-white/60 mb-8 text-sm">Join these happy clients and let's build something extraordinary together.</p>
                  <button 
                    onClick={() => setActiveTab('Connect')}
                    className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-white/90 transition-all shadow-xl shadow-white/10 flex items-center gap-2 mx-auto text-sm"
                  >
                    <Mail size={16} /> Get a Free Quote
                  </button>
                </div>
              </BentoCard>
            </div>
          </div>
        );

      case 'Connect':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]">
             {/* Calendly Card */}
            <BentoCard size="2x2" className="bg-amber-500/5 border-amber-500/10 group/cal cursor-pointer" onClick={() => window.open('https://calendly.com/digital-b3asts/quick-free-consultation', '_blank')}>
              <div className="flex flex-col h-full justify-center items-center text-center p-8">
                <div className="w-20 h-20 rounded-3xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6 group-hover/cal:scale-110 transition-transform duration-500">
                  <Zap size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Free Consultation</h3>
                <p className="text-white/40 text-sm mb-6 font-light">Book a 15-min strategy call</p>
                <button 
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/20"
                >
                  Schedule Now
                </button>
              </div>
            </BentoCard>

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
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
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
      <CustomCursor />
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

      {/* Chat Assistant */}
      <ChatAssistant 
        isOpen={isChatOpen} 
        setIsOpen={setIsChatOpen} 
        initialMessage={initialChatMessage}
        setInitialMessage={setInitialChatMessage}
      />

      {/* Project Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-[2.5rem] border border-white/10 shadow-2xl no-scrollbar"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all z-20"
              >
                <X size={24} />
              </button>

              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-12">
                  <div className="flex-1">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8", selectedProject.bg, selectedProject.color)}>
                      {selectedProject.icon}
                    </div>
                    <h2 className="text-4xl font-bold mb-4">{selectedProject.name}</h2>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/60 border border-white/5">{tag}</span>
                      ))}
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <h3 className="text-xl font-bold mb-4 text-indigo-400">The Challenge</h3>
                      <p className="text-white/70 mb-8 leading-relaxed">
                        {selectedProject.desc} This project was built to address the growing need for {selectedProject.mainCategory.toLowerCase()} solutions that scale effortlessly.
                      </p>
                      
                      <h3 className="text-xl font-bold mb-4 text-indigo-400">Key Features</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        {['Real-time processing', 'AI-driven insights', 'Scalable architecture', 'Intuitive UI/UX'].map(f => (
                          <li key={f} className="flex items-center gap-3 text-sm text-white/60 bg-white/5 p-4 rounded-2xl border border-white/5">
                            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>

                      <div className="flex gap-4">
                        <a 
                          href={selectedProject.url} 
                          target="_blank" 
                          className="flex-1 bg-white text-black px-8 py-4 rounded-2xl font-bold text-center hover:bg-white/90 transition-all flex items-center justify-center gap-2"
                        >
                          Live Demo <ExternalLink size={18} />
                        </a>
                        <button className="flex-1 bg-white/5 text-white px-8 py-4 rounded-2xl font-bold border border-white/10 hover:bg-white/10 transition-all">
                          View Code
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3 space-y-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">Project Stats</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/50">Category</span>
                          <span className="text-sm font-bold">{selectedProject.mainCategory}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/50">Status</span>
                          <span className="text-sm font-bold text-emerald-400">Live</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/50">Pricing</span>
                          <span className="text-sm font-bold">{selectedProject.pricing}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4">Tech Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Tailwind', 'Node.js'].map(t => (
                          <span key={t} className="px-3 py-1.5 rounded-xl bg-white/5 text-[10px] font-bold">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Preview Section */}
                {(selectedProject as any).previewUrl && (
                  <div className="mt-12">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-6 bg-indigo-500 rounded-full" />
                      <h3 className="text-xl font-bold tracking-tight">Live Preview</h3>
                    </div>
                    <div className="w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 glass relative group/preview shadow-2xl">
                      <iframe 
                        src={(selectedProject as any).previewUrl} 
                        className="w-full h-full border-0"
                        title={`${selectedProject.name} Live Preview`}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="px-6 py-3 rounded-2xl bg-white text-black font-bold flex items-center gap-2">
                          <ExternalLink size={18} />
                          Interact with App
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="mt-32 py-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">A</div>
              <span className="font-bold text-lg tracking-tight">Abdulrahman Toor</span>
            </div>
            <p className="text-white/30 text-xs font-light max-w-xs text-center md:text-left">
              Architecting the future of AI automation and high-performance SaaS platforms.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              <button onClick={() => setActiveTab('Home')} className="hover:text-white transition-colors">Home</button>
              <button onClick={() => setActiveTab('Projects')} className="hover:text-white transition-colors">Projects</button>
              <button onClick={() => setActiveTab('Connect')} className="hover:text-white transition-colors">Contact</button>
            </div>
            <div className="text-white/20 text-[10px] font-medium tracking-widest uppercase">
              © {new Date().getFullYear()} Abdulrahman Toor. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
