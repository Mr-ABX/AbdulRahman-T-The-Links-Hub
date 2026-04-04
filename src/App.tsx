/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
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
  Search,
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
  Download,
  LayoutGrid,
  List,
  Lock,
  Play,
  Settings,
  ShoppingBag
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Lenis from 'lenis';

import { ChatAssistant } from './components/ChatAssistant';
import { CustomCursor } from './components/CustomCursor';

import { ASSET_LINKS } from './constants/assets';

const myPfpFull = ASSET_LINKS.myPfpFull;
const bookCover = ASSET_LINKS.bookCover;
const logo1 = ASSET_LINKS.logo1Svg;
const logo2 = ASSET_LINKS.logo2Svg;
const myPfp = ASSET_LINKS.myPfp;

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Category = 'Home' | 'Projects' | 'Apps' | 'Automation' | 'Ebooks' | 'Content' | 'About' | 'Reviews' | 'Connect' | 'Success' | 'Store';
type ProjectCategory = 'Apps & Dev' | 'Web Development Projects' | 'Interactive Experiences' | 'Video & Motion Graphics' | 'Graphics & Marketing' | 'AI Solutions' | 'My Personal Apps';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  size?: '1x1' | '2x1' | '2x2' | '1x2' | '3x1' | '3x2' | '4x1';
  delay?: number;
  onClick?: () => void;
  background?: React.ReactNode;
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

const BentoCard = ({ children, className, size = '1x1', delay = 0, onClick, background }: BentoCardProps) => {
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
      {background}
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
  { name: 'Apps', icon: <LayoutGrid size={18} /> },
  { name: 'Ebooks', icon: <Book size={18} /> },
  { name: 'Content', icon: <Newspaper size={18} /> },
  { name: 'Automation', icon: <Bot size={18} /> },
  { name: 'Store', icon: <ShoppingBag size={18} /> },
  { name: 'About', icon: <User size={18} /> },
  { name: 'Reviews', icon: <Star size={18} /> },
  { name: 'Connect', icon: <Share2 size={18} /> },
];

const projects = [
  { name: "Project X (Unreleased)", mainCategory: 'My Personal Apps', tags: ['Experimental', 'AI'], pricing: 'Private', desc: 'An experimental AI-driven personal assistant with deep system integration.', url: '#', previewUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', color: 'text-indigo-400', bg: 'bg-indigo-500/10', icon: <Lock size={20} />, status: 'Development' },
  { name: "Nexus Engine", mainCategory: 'My Personal Apps', tags: ['Game Engine', '3D'], pricing: 'Private', desc: 'A custom 3D rendering engine built from scratch for next-gen interactive experiences.', url: '#', previewUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', color: 'text-rose-400', bg: 'bg-rose-500/10', icon: <Lock size={20} />, status: 'Development' },
  { name: "NodeRaptor - n8n Architect", mainCategory: 'AI Solutions', tags: ['SaaS', 'AI Tools'], pricing: 'Free', desc: 'An AI-powered architect for n8n workflows, capable of analyzing, debugging, and building automations directly via your n8n instance.', url: 'https://noderaptor.netlify.app/', previewUrl: 'https://noderaptor.netlify.app/', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: <Bot size={20} />, status: 'Production' },
  { name: "O.S.K.A.R. (Sentient Interface)", mainCategory: 'Interactive Experiences', tags: ['AI Tools', 'Interactive'], pricing: 'Free', desc: 'A full-screen, interactive AI digital desk and companion with dynamic digital eyes, real-time voice, vision, and natural interaction capabilities.', url: 'https://project-oskar.netlify.app/', previewUrl: 'https://project-oskar.netlify.app/', color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: <Brain size={20} />, status: 'Production' },
  { name: "Noodle Draw", mainCategory: 'Apps & Dev', tags: ['Web', 'AI Tools', 'Collaborative'], pricing: 'Free', desc: 'A professional-grade infinite canvas drawing application with real-time collaboration, tablet pressure sensitivity, and AI creative assistance.', url: 'https://noodle-draw-akwy.onrender.com', previewUrl: 'https://noodle-draw-akwy.onrender.com', color: 'text-pink-400', bg: 'bg-pink-500/10', icon: <Palette size={20} />, status: 'Production' },
  { name: "ARGUS // INTELLIGENCE", mainCategory: 'AI Solutions', tags: ['SaaS', 'Cybersecurity'], pricing: 'Paid', desc: 'A high-tech cybersecurity dashboard tracking visitor IP, location, and network details with a live map interface.', url: 'https://argus-osint-soc.vercel.app/', previewUrl: 'https://argus-osint-soc.vercel.app/', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: <Globe size={20} />, status: 'Production' },
  { name: "Koe Audio Studio", mainCategory: 'AI Solutions', tags: ['SaaS', 'AI Tools'], pricing: 'Paid', desc: 'Next-generation parametric voice synthesis suite. Voice cloning and advanced speech generation.', url: 'https://koe-audiostudio.netlify.app/', previewUrl: 'https://koe-audiostudio.netlify.app/', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: <Mic size={20} />, status: 'Production' },
  { name: "FlowType - Minimalist Touch Typing", mainCategory: 'Interactive Experiences', tags: ['Web', 'AI Tools'], pricing: 'Free', desc: 'An ultra-minimalist, distraction-free touch typing application with mechanical keyboard sounds, real-time analytics, and AI-generated practice content.', url: 'https://theflowtype.netlify.app/', previewUrl: 'https://theflowtype.netlify.app/', color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: <Terminal size={20} />, status: 'Production' },
  { name: "Babel | Learn Fictional Languages", mainCategory: 'Apps & Dev', tags: ['Web', 'Education'], pricing: 'Free', desc: 'Master the languages of the multiverse. A high-end, gamified learning app for fictional tongues like Minionese, Klingon, and High Valyrian.', url: 'https://babel-learn-fiction.netlify.app/', previewUrl: 'https://babel-learn-fiction.netlify.app/', color: 'text-indigo-400', bg: 'bg-indigo-500/10', icon: <BookOpen size={20} />, status: 'Production' },
  { name: "Virtuoso Web Piano & Beat Studio", mainCategory: 'Interactive Experiences', tags: ['Web', 'Interactive'], pricing: 'Free', desc: 'A premium, responsive web music workstation featuring a Grand Piano, multiple synthesizers, and a 16-pad Beat Studio for rhythm creation.', url: 'https://virtuoso-keys.netlify.app/', previewUrl: 'https://virtuoso-keys.netlify.app/', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: <Palette size={20} />, status: 'Production' },
  { name: "The Architect's Doodle Trap", mainCategory: 'Interactive Experiences', tags: ['Games'], pricing: 'Free', desc: 'A creative puzzle game built for the web.', url: 'https://the-architects-doodle-trap.netlify.app/', previewUrl: 'https://the-architects-doodle-trap.netlify.app/', color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: <Gamepad2 size={20} />, status: 'Production' },
  { name: "Trust Nothing", mainCategory: 'Interactive Experiences', tags: ['Games'], pricing: 'Free', desc: 'A psychological thriller game that challenges your perception.', url: 'https://trust-nothing.netlify.app/', previewUrl: 'https://trust-nothing.netlify.app/', color: 'text-red-500', bg: 'bg-red-500/10', icon: <Gamepad2 size={20} />, status: 'Production' },
  { name: "Gekko Dash", mainCategory: 'Interactive Experiences', tags: ['Games'], pricing: 'Free', desc: 'A fast-paced neon runner game with addictive mechanics.', url: 'https://gekko-dash.netlify.app/', previewUrl: 'https://gekko-dash.netlify.app/', color: 'text-lime-400', bg: 'bg-lime-500/10', icon: <Gamepad2 size={20} />, status: 'Production' },
  { name: 'Vesper AI Notes', mainCategory: 'AI Solutions', tags: ['SaaS', 'AI Tools'], pricing: 'Free', desc: 'AI-powered note-taking and knowledge base.', url: 'https://vesper-ai-notes.netlify.app/', previewUrl: 'https://vesper-ai-notes.netlify.app/', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: <Bot size={20} />, status: 'Production' },
  { name: 'Vibelex', mainCategory: 'Apps & Dev', tags: ['Web', 'SaaS'], pricing: 'Free', desc: 'Modern digital experience platform.', url: 'https://vibelex.netlify.app/', previewUrl: 'https://vibelex.netlify.app/', color: 'text-purple-400', bg: 'bg-purple-500/10', icon: <Globe size={20} />, status: 'Production' },
  { name: 'Zen Maker', mainCategory: 'Apps & Dev', tags: ['SaaS'], pricing: 'Paid', price: '$2.99/yr', desc: 'Minimalist creation tool for focused builders.', url: 'https://zen-maker.netlify.app/', previewUrl: 'https://zen-maker.netlify.app/', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: <Layout size={20} />, status: 'Production' },
  { name: 'LevelUp Hero', mainCategory: 'Apps & Dev', tags: ['Mobile', 'Games'], pricing: 'Free', desc: "Gamified OS for your life's journey.", url: 'https://levelup-heros-journey-os.vercel.app/', previewUrl: 'https://levelup-heros-journey-os.vercel.app/', color: 'text-orange-400', bg: 'bg-orange-500/10', icon: <Smartphone size={20} />, status: 'Production' },
  { name: 'KAIROS - The AI Cockpit [▴ Beta 4.O]_(z2.0)', mainCategory: 'AI Solutions', tags: ['SaaS', 'AI Tools'], pricing: 'Paid', desc: 'A high-end AI Ad Creative Studio for E-commerce, featuring Brand DNA management, smart image stacking, and advanced editing capabilities powered by Gemini.', url: 'https://kairos-beta4.vercel.app/', previewUrl: 'https://kairos-beta4.vercel.app/', color: 'text-rose-400', bg: 'bg-rose-500/10', icon: <AppWindow size={20} />, status: 'Beta' },
  { name: 'Kairos Beta', mainCategory: 'AI Solutions', tags: ['SaaS', 'AI Tools'], pricing: 'Paid', desc: 'Time management redefined for the AI era.', url: 'https://kairos-beta3.vercel.app/', previewUrl: 'https://kairos-beta3.vercel.app/', color: 'text-rose-400', bg: 'bg-rose-500/10', icon: <AppWindow size={20} />, status: 'Beta' },
  { name: 'Cyber Quest', mainCategory: 'Interactive Experiences', tags: ['Games'], pricing: 'Free', desc: 'A futuristic RPG built with React & Three.js.', url: '#', color: 'text-cyan-400', bg: 'bg-cyan-500/10', icon: <Gamepad2 size={20} />, status: 'Development' },
  { name: 'SpeakEasy AI', mainCategory: 'AI Solutions', tags: ['Open Source', 'AI Tools'], pricing: 'Free', desc: '100% Free AI Text-To-Speech Tool.', url: 'https://github.com/Mr-ABX/SpeakEasy-AI-Text-To-Speech-Tool---100-Free-by-AbdulrahmanT', color: 'text-indigo-400', bg: 'bg-indigo-500/10', icon: <Mic size={20} />, status: 'Production' },
  { name: 'AI Personality Quiz', mainCategory: 'AI Solutions', tags: ['Open Source', 'AI Tools'], pricing: 'Free', desc: 'Local run AI Personality Quiz Model.', url: 'https://github.com/Mr-ABX/AI-Personality-Quiz-Model', color: 'text-pink-400', bg: 'bg-pink-500/10', icon: <Brain size={20} />, status: 'Production' },
  { name: 'ASCII TypeArt', mainCategory: 'Apps & Dev', tags: ['Open Source', 'AI Tools'], pricing: 'Free', desc: 'AI art generator for ASCII Canvas.', url: 'https://github.com/Mr-ABX/ASCII-TypeArt-Canvas-Img-to-Art-', color: 'text-teal-400', bg: 'bg-teal-500/10', icon: <Palette size={20} />, status: 'Production' },
  { name: 'GenAI Studio', mainCategory: 'AI Solutions', tags: ['SaaS', 'AI Tools'], pricing: 'Paid', price: 'Custom', desc: 'Enterprise-grade generative AI platform for content creation.', url: '#', color: 'text-orange-400', bg: 'bg-orange-500/10', icon: <Sparkles size={20} />, status: 'Beta' },
  { name: 'Fusion Nexus', mainCategory: 'Web Development Projects', tags: ['Web', 'Portfolio'], pricing: 'Free', desc: 'Advanced web platform and digital solutions.', url: 'https://fusionnexus.infni-t.com', previewUrl: 'https://fusionnexus.infni-t.com', color: 'text-indigo-400', bg: 'bg-indigo-500/10', icon: <Globe size={20} />, status: 'Production' },
  { name: 'Solution Lab', mainCategory: 'Web Development Projects', tags: ['Web', 'Portfolio'], pricing: 'Free', desc: 'Innovative solutions and digital lab.', url: 'https://solutionlab.infni-t.com', previewUrl: 'https://solutionlab.infni-t.com', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: <AppWindow size={20} />, status: 'Production' },
  { name: 'InstaShred', mainCategory: 'Web Development Projects', tags: ['Web', 'Portfolio'], pricing: 'Free', desc: 'Fitness and shredding platform.', url: 'https://instashred.com/', previewUrl: 'https://instashred.com/', color: 'text-red-400', bg: 'bg-red-500/10', icon: <Zap size={20} />, status: 'Production' },
  { name: 'Junno Express', mainCategory: 'Web Development Projects', tags: ['Web', 'Portfolio'], pricing: 'Free', desc: 'E-commerce and express delivery platform.', url: 'https://junnoexpress.com/', previewUrl: 'https://junnoexpress.com/', color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: <Globe size={20} />, status: 'Production' },
  { name: 'Recallers', mainCategory: 'Web Development Projects', tags: ['Web', 'Portfolio'], pricing: 'Free', desc: 'Dog training and recallers platform.', url: 'https://dogsthat.com/recallers/', previewUrl: 'https://dogsthat.com/recallers/', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: <Globe size={20} />, status: 'Production' },
  { name: 'Video & Motion Graphics Portfolio', mainCategory: 'Video & Motion Graphics', tags: ['Portfolio', 'Video'], pricing: 'Free', desc: 'A showcase of my video editing, motion graphics, and VFX work.', url: 'https://www.youtube.com/watch?v=0Wh7MhqeHHA&list=PL7BsW-EOVU09CgVg1O4vk3U6fujfm1xw9', color: 'text-pink-400', bg: 'bg-pink-500/10', icon: <Video size={20} />, status: 'Production' },
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
      className="relative overflow-hidden group/featured cursor-pointer border-indigo-500/30 bg-indigo-500/5 shadow-[0_0_30px_rgba(99,102,241,0.05)] min-h-[450px] md:min-h-0 !p-0"
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
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/featured:opacity-100 group-hover/featured:scale-105 transition-all duration-700"
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
              <p className="text-white/60 text-sm md:text-lg max-w-md mb-4 md:mb-6 leading-relaxed line-clamp-2 md:line-clamp-3">{current.desc}</p>
              
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

const categoryDescriptions: Record<string, string> = {
  'All': 'Explore my complete portfolio of projects, apps, and experiments.',
  'AI Solutions': 'Advanced artificial intelligence tools and automated workflows.',
  'Apps & Dev': 'Full-stack applications, developer tools, and software projects.',
  'Interactive Experiences': 'Immersive 3D worlds, games, and creative web experiences.',
  'My Personal Apps': 'Private tools and experimental projects built for personal use.',
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo<Category>(() => {
    const path = location.pathname;
    if (path.startsWith('/projects')) return 'Projects';
    if (path.startsWith('/apps')) return 'Apps';
    if (path.startsWith('/automation')) return 'Automation';
    if (path.startsWith('/ebooks')) return 'Ebooks';
    if (path.startsWith('/content')) return 'Content';
    if (path.startsWith('/about')) return 'About';
    if (path.startsWith('/reviews')) return 'Reviews';
    if (path.startsWith('/connect')) return 'Connect';
    if (path.startsWith('/success')) return 'Success';
    if (path.startsWith('/store')) return 'Store';
    return 'Home';
  }, [location.pathname]);

  const setActiveTab = (tab: Category) => {
    if (tab === 'Home') navigate('/');
    else navigate(`/${tab.toLowerCase()}`);
  };

  const [projectFilter, setProjectFilter] = useState<string[]>([]);
  const [activeProjectCategory, setActiveProjectCategory] = useState<ProjectCategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [selectedEbook, setSelectedEbook] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState('');
  const [isInImmersiveMode, setIsInImmersiveMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hideCustomCursor, setHideCustomCursor] = useState(false);
  const [enableSmoothScroll, setEnableSmoothScroll] = useState(true);
  const [compactHomeView, setCompactHomeView] = useState(false);
  const [activeHomeSection, setActiveHomeSection] = useState<'Learn' | 'Explore' | 'Work'>('Learn');
  const navRef = React.useRef<HTMLDivElement>(null);

  const slugify = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  };

  useEffect(() => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length >= 2) {
      const category = segments[0];
      const slug = segments[1];

      if (category === 'projects' || category === 'apps') {
        const project = projects.find(p => slugify(p.name) === slug);
        if (project) {
          setSelectedProject(project);
        } else {
          setSelectedProject(null);
        }
      } else if (category === 'ebooks') {
        if (slug === '31-ways-to-ruin-your-life' || slug === '31-ways') {
          setSelectedEbook({
            title: '31 Ways to Ruin Your Life',
            desc: 'A super professional guide to self-sabotage. Learn what NOT to do to succeed.',
            image: bookCover,
            polarLink: 'https://buy.polar.sh/polar_cl_w7kAdvkAHugeoJVUiB7Fmj8rNJsucriPLLpuJ3mXMML'
          });
        } else {
          setSelectedEbook(null);
        }
      }
    } else {
      // Clear modals if navigating back to root category
      setSelectedProject(null);
      setSelectedEbook(null);
    }
  }, [location.pathname]);

  const openProjectModal = (project: typeof projects[0]) => {
    let category = activeTab.toLowerCase();
    if (category !== 'projects' && category !== 'apps') {
      category = project.mainCategory.includes('App') ? 'apps' : 'projects';
    }
    navigate(`/${category}/${slugify(project.name)}`);
  };

  const closeProjectModal = () => {
    let category = activeTab.toLowerCase();
    if (category !== 'projects' && category !== 'apps') {
      category = 'projects';
    }
    navigate(`/${category}`);
  };

  const openEbookModal = () => {
    navigate(`/ebooks/31-ways`);
  };

  const closeEbookModal = () => {
    navigate(`/ebooks`);
  };

  useEffect(() => {
    if (!enableSmoothScroll) return;
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [enableSmoothScroll]);

  useEffect(() => {
    if (!hideCustomCursor) {
      document.body.classList.add('hide-native-cursor');
    } else {
      document.body.classList.remove('hide-native-cursor');
    }
    
    return () => {
      document.body.classList.remove('hide-native-cursor');
    };
  }, [hideCustomCursor]);

  useEffect(() => {
    if (activeTab === 'Success') {
      const fireConfetti = () => {
        const defaults = {
          spread: 70,
          ticks: 150,
          gravity: 0.8,
          decay: 0.94,
          startVelocity: 50,
          colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
          zIndex: 100
        };

        // Left cannon
        confetti({
          ...defaults,
          particleCount: 80,
          angle: 60,
          origin: { x: 0, y: 1 }
        });

        // Right cannon
        confetti({
          ...defaults,
          particleCount: 80,
          angle: 120,
          origin: { x: 1, y: 1 }
        });
      };

      // Fire once immediately
      fireConfetti();
      
      // Fire again after a short delay for a richer but still minimal effect
      const timeout = setTimeout(fireConfetti, 400);
      
      return () => clearTimeout(timeout);
    }
  }, [activeTab]);

  const openChatWithSearch = (query: string) => {
    setInitialChatMessage(query);
    setIsChatOpen(true);
  };

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  React.useEffect(() => {
    if (activeTab !== 'Apps') {
      setIsInImmersiveMode(false);
    }
  }, [activeTab]);

  React.useEffect(() => {
    if (activeTab === 'Projects' || activeTab === 'Apps') {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [activeTab, activeProjectCategory, projectFilter, searchQuery]);

  React.useEffect(() => {
    const activeBtn = navRef.current?.querySelector('[data-active="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);

  React.useEffect(() => {
    setActiveProjectCategory(null);
    setProjectFilter([]);
    setSearchQuery('');
  }, [activeTab]);

  const filteredProjects = useMemo(() => {
    let base = projects;
    if (activeProjectCategory) {
      base = base.filter(p => p.mainCategory === activeProjectCategory);
    }
    
    if (projectFilter.length > 0) {
      base = base.filter(p => projectFilter.every(f => p.tags.includes(f)));
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      base = base.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.desc.toLowerCase().includes(query) || 
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return base;
  }, [activeProjectCategory, projectFilter, searchQuery]);

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
                    <div className="absolute inset-0 z-0 bg-indigo-500/10 flex items-center justify-center text-8xl">
                      👨🏽‍💻
                      <img 
                        src={myPfpFull} 
                        alt="Abdulrahman Toor" 
                        className="absolute inset-0 w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover/profile:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none"></div>
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
              
              {compactHomeView && (
                <div className="flex gap-1 p-1 bg-white/[0.03] rounded-full overflow-x-auto hide-scrollbar border border-white/5 sticky top-24 z-30 backdrop-blur-xl w-fit mx-auto mb-2 shadow-2xl">
                  <button onClick={() => setActiveHomeSection('Learn')} className={cn("px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap", activeHomeSection === 'Learn' ? "bg-white/10 text-white shadow-sm border border-white/10" : "text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent")}>Learn & Connect</button>
                  <button onClick={() => setActiveHomeSection('Explore')} className={cn("px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap", activeHomeSection === 'Explore' ? "bg-white/10 text-white shadow-sm border border-white/10" : "text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent")}>Explore My Work</button>
                  <button onClick={() => setActiveHomeSection('Work')} className={cn("px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap", activeHomeSection === 'Work' ? "bg-white/10 text-white shadow-sm border border-white/10" : "text-white/40 hover:text-white/70 hover:bg-white/5 border border-transparent")}>Work With Me</button>
                </div>
              )}

              {/* Category 1: Learn & Connect */}
              {(!compactHomeView || activeHomeSection === 'Learn') && (
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.4}}>
                  {!compactHomeView && (
                    <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Book size={12} className="text-purple-400" /> Learn & Connect
                    </h3>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[minmax(180px,auto)]">
                    
                    {/* AI Assistant Quick Widget */}
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
                      className="col-span-1 md:col-span-2 row-span-1 relative overflow-hidden rounded-[2rem] p-[2px] group/ai-widget"
                    >
                      <div className="absolute inset-0 bg-indigo-500/20 rounded-[2rem]" />
                      <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#6366f1_300deg,#a855f7_330deg,#ec4899_360deg)] animate-border-spin blur-md opacity-70" />
                      <div className="relative h-full w-full bg-[#050505] rounded-[calc(2rem-2px)] p-6 flex flex-col justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10" />
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
                          <button 
                            onClick={() => openChatWithSearch('')}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm hover:bg-white/10 transition-all flex items-center justify-between group-hover/ai-widget:border-indigo-500/50"
                          >
                            <span className="text-white/60">Click to start chatting...</span>
                            <ArrowRight size={16} className="text-indigo-400" />
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Storefront Widget */}
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
                      className="col-span-1 md:col-span-2 row-span-1 relative overflow-hidden rounded-[2rem] p-[2px] group/store-widget cursor-pointer"
                      onClick={() => setActiveTab('Store')}
                    >
                      <div className="absolute inset-0 bg-emerald-500/20 rounded-[2rem]" />
                      <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#10b981_300deg,#34d399_330deg,#059669_360deg)] animate-border-spin blur-md opacity-70" />
                      <div className="relative h-full w-full bg-[#050505] rounded-[calc(2rem-2px)] p-6 flex flex-col justify-between overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10" />
                        <div className="absolute -right-4 -top-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl group-hover/store-widget:bg-emerald-500/20 transition-colors" />
                        <div className="relative z-10 h-full flex flex-col justify-center p-2">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-black shadow-lg shadow-emerald-500/20 group-hover/store-widget:scale-110 transition-transform">
                                <ShoppingBag size={20} />
                              </div>
                              <div>
                                <h3 className="text-lg font-bold text-emerald-400">Premium Storefront</h3>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Books, Apps & Resources</p>
                              </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-2">
                              <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-white/60 font-mono">31 Ways</span>
                              <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] text-white/60 font-mono">Kairos</span>
                            </div>
                          </div>
                          <button 
                            className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl py-3 px-4 text-sm hover:bg-emerald-500/20 transition-all flex items-center justify-between group-hover/store-widget:border-emerald-500/50"
                          >
                            <span className="text-emerald-400 font-bold">Visit My Storefront</span>
                            <ExternalLink size={16} className="text-emerald-400 group-hover/store-widget:translate-x-1 group-hover/store-widget:-translate-y-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>

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
                          <button className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl py-2 px-3 text-xs font-bold transition-colors flex items-center justify-center gap-2">
                            <span>Subscribe Now</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </BentoCard>

                  </div>
                </motion.div>
              )}

              {/* Category 2: Explore My Work (Apps & Projects) */}
              {(!compactHomeView || activeHomeSection === 'Explore') && (
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.4}}>
                  {!compactHomeView && (
                    <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <AppWindow size={12} className="text-indigo-400" /> Explore My Work
                    </h3>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-[minmax(180px,auto)]">

                    {/* Featured Carousel Widget */}
                    <FeaturedCarousel projects={projects} onSelect={openProjectModal} />

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
                          <button onClick={(e) => { e.stopPropagation(); setActiveTab('Projects'); setActiveProjectCategory('Web Development Projects'); }} className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 transition-colors"><Globe size={14}/> Web</button>
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
                </motion.div>
              )}

              {/* Category 3: Work With Me (Hire & Consult) */}
              {(!compactHomeView || activeHomeSection === 'Work') && (
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.4}}>
                  {!compactHomeView && (
                    <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <Briefcase size={12} className="text-emerald-400" /> Work With Me
                    </h3>
                  )}
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
                </motion.div>
              )}

            </div>
          </div>
        );

      case 'Apps':
      case 'Projects': {
        if (isInImmersiveMode && activeTab === 'Apps') {
          const immersiveCategories = ['All', 'AI Solutions', 'Apps & Dev', 'Interactive Experiences', 'My Personal Apps'];
          
          return (
            <div className="flex flex-col md:flex-row gap-8 min-h-screen pb-20 w-full px-4 md:px-8 mt-8">
              {/* Floating Sidebar */}
              <aside className="w-full md:w-64 lg:w-72 shrink-0">
                <div className="sticky top-8 glass backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 flex flex-col gap-8 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        setIsInImmersiveMode(false);
                        setSearchQuery('');
                        setProjectFilter([]);
                      }} 
                      className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10 group"
                    >
                      <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <div>
                      <h2 className="text-xl font-bold tracking-tight">App Gallery</h2>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{activeTab}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors" size={16} />
                      <input 
                        type="text" 
                        placeholder="Search projects..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all focus:bg-white/10"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 px-1">Categories</h3>
                      <div className="flex flex-col gap-1">
                        {immersiveCategories.map((cat) => {
                          const isActive = (cat === 'All' && !activeProjectCategory) || activeProjectCategory === cat;
                          const catProjects = cat === 'All' ? projects.filter(p => immersiveCategories.includes(p.mainCategory)) : projects.filter(p => p.mainCategory === cat);
                          const catTags = cat === 'All' ? [] : Array.from(new Set(catProjects.flatMap(p => p.tags)));
                          
                          return (
                            <div key={cat} className="flex flex-col gap-1">
                              <button
                                onClick={() => {
                                  setActiveProjectCategory(cat === 'All' ? null : cat as ProjectCategory);
                                  setProjectFilter([]);
                                }}
                                className={cn(
                                  "px-4 py-3 rounded-xl text-xs font-bold transition-all text-left border flex items-center justify-between group",
                                  isActive
                                    ? "bg-white text-black border-white shadow-lg shadow-white/10" 
                                    : "bg-transparent text-white/60 border-transparent hover:bg-white/5 hover:text-white"
                                )}
                              >
                                <span>{cat}</span>
                                <span className={cn(
                                  "text-[10px] px-2 py-0.5 rounded-full font-bold",
                                  isActive ? "bg-black/10 text-black" : "bg-white/10 text-white/40 group-hover:bg-white/20 group-hover:text-white"
                                )}>
                                  {catProjects.length}
                                </span>
                              </button>
                              
                              {/* Subcategories (Tags) */}
                              <AnimatePresence>
                                {isActive && cat !== 'All' && catTags.length > 0 && (
                                  <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="pl-4 py-2 flex flex-col gap-1 border-l border-white/10 ml-2 mt-1 overflow-hidden"
                                  >
                                    <button
                                      onClick={() => setProjectFilter([])}
                                      className={cn(
                                        "text-left text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-all flex items-center justify-between", 
                                        projectFilter.length === 0 ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"
                                      )}
                                    >
                                      <span>All {cat}</span>
                                      <span className="opacity-50">({catProjects.length})</span>
                                    </button>
                                    {catTags.map(tag => {
                                      const tagCount = catProjects.filter(p => p.tags.includes(tag)).length;
                                      return (
                                      <button
                                        key={tag}
                                        onClick={() => setProjectFilter(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                                        className={cn(
                                          "text-left text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg transition-all flex items-center justify-between",
                                          projectFilter.includes(tag) ? "bg-white/10 text-white" : "text-white/40 hover:text-white hover:bg-white/5"
                                        )}
                                      >
                                        <span>{tag}</span>
                                        <span className="opacity-50">({tagCount})</span>
                                      </button>
                                    )})}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-white/10">
                      <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 px-1">View Mode</h3>
                      <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                        <button 
                          onClick={() => setViewMode('grid')}
                          className={cn("flex-1 flex justify-center items-center gap-2 py-2 rounded-xl transition-all text-xs font-bold", viewMode === 'grid' ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white")}
                        >
                          <LayoutGrid size={14} /> Grid
                        </button>
                        <button 
                          onClick={() => setViewMode('list')}
                          className={cn("flex-1 flex justify-center items-center gap-2 py-2 rounded-xl transition-all text-xs font-bold", viewMode === 'list' ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white")}
                        >
                          <List size={14} /> List
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                {filteredProjects.length === 0 ? (
                  <div className="py-20 text-center glass rounded-[3rem] border border-white/5">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-white/10">
                      <Search size={40} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No results found</h3>
                    <p className="text-white/40">Try adjusting your search or filters to find what you're looking for.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setProjectFilter([]); setActiveProjectCategory(null); }}
                      className="mt-8 px-6 py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition-all"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="mb-2">
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {projectFilter.length === 0 ? `All ${activeTab}` : projectFilter.join(', ')}
                      </h2>
                      <p className="text-white/50 text-sm">
                        {projectFilter.length === 0 ? categoryDescriptions['All'] : `Explore projects related to ${projectFilter.join(', ')}.`}
                      </p>
                    </div>
                    <div className={cn(
                      "gap-6",
                      viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid grid-cols-1 xl:grid-cols-2"
                    )}>
                      <AnimatePresence mode="popLayout">
                      {filteredProjects.map((p, i) => (
                        <motion.div
                          key={p.name}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                        >
                          <BentoCard 
                            size="1x1" 
                            className={cn(
                              p.bg, 
                              "border-white/5 cursor-pointer relative overflow-hidden group/project",
                              viewMode === 'grid' ? "h-[450px] p-0" : "h-auto p-4 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                            )}
                            onClick={() => openProjectModal(p)}
                            background={p.url !== '#' || (p.previewUrl && p.previewUrl.includes('youtube.com/embed/')) ? (
                              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2rem]">
                                <img 
                                  src={p.url !== '#' 
                                    ? `https://image.thum.io/get/width/800/crop/800/noanimate/${p.url}`
                                    : `https://img.youtube.com/vi/${p.previewUrl.split('/').pop()}/maxresdefault.jpg`
                                  }
                                  alt={p.name}
                                  className="w-full h-full object-cover opacity-60 group-hover/project:opacity-100 transition-all duration-700 group-hover/project:scale-110"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
                              </div>
                            ) : null}
                          >
                            <div className={cn(
                              "relative z-10 h-full w-full flex flex-col",
                              viewMode === 'grid' ? "justify-end p-6" : "sm:flex-row items-start sm:items-center gap-4"
                            )}>
                              {viewMode === 'grid' ? (
                                <>
                                  <div className="flex justify-between items-start mb-auto">
                                    <div className={cn("p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10", p.color)}>
                                      {p.icon}
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                      <span className={cn("text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-lg", p.pricing === 'Paid' ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400")}>
                                        {p.pricing}
                                      </span>
                                      {p.status && (
                                        <span className={cn(
                                          "text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter backdrop-blur-md border border-white/10 shadow-lg",
                                          p.status === 'Development' ? "bg-amber-500/20 text-amber-400" :
                                          p.status === 'Beta' ? "bg-blue-500/20 text-blue-400" :
                                          "bg-emerald-500/20 text-emerald-400"
                                        )}>
                                          {p.status}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="mt-4">
                                    <h3 className="font-bold text-2xl group-hover/project:text-indigo-400 transition-colors mb-2 line-clamp-1">{p.name}</h3>
                                    <p className="text-sm text-white/70 font-light leading-relaxed line-clamp-2 mb-4">{p.desc}</p>
                                    
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                      {p.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-[9px] text-white/50 font-medium uppercase tracking-wider border border-white/5">
                                          {tag}
                                        </span>
                                      ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                      <div className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors flex items-center gap-2">
                                        <span>{p.mainCategory === 'My Personal Apps' ? 'Watch Preview' : 'View Project'}</span>
                                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                      </div>
                                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover/project:bg-indigo-500 group-hover/project:text-white transition-all shadow-xl">
                                        {p.mainCategory === 'My Personal Apps' ? <Play size={16} fill="currentColor" /> : <ArrowRight size={16} />}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="flex items-start gap-4 shrink-0">
                                    <div className={cn("p-3 rounded-2xl bg-black/20 backdrop-blur-md", p.color)}>
                                      {p.icon}
                                    </div>
                                  </div>
                                  
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-[10px] text-white/40 uppercase tracking-widest">{p.mainCategory}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mb-2">
                                      <h3 className="font-bold text-lg group-hover/project:text-indigo-400 transition-colors">{p.name}</h3>
                                      {p.status && (
                                        <span className={cn(
                                          "text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter block",
                                          p.status === 'Development' ? "bg-amber-500/20 text-amber-400" :
                                          p.status === 'Beta' ? "bg-blue-500/20 text-blue-400" :
                                          "bg-emerald-500/20 text-emerald-400"
                                        )}>
                                          {p.status}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-white/60 font-light leading-relaxed line-clamp-2 mb-2">{p.desc}</p>
                                    
                                    <div className="flex items-center gap-2">
                                      <div className="flex gap-1">
                                        {p.tags.slice(0, 4).map(tag => (
                                          <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-[8px] text-white/40 font-bold uppercase tracking-tighter border border-white/5">
                                            {tag}
                                          </span>
                                        ))}
                                        {p.tags.length > 4 && (
                                          <span className="px-2 py-0.5 rounded-md bg-white/5 text-[8px] text-white/40 font-bold uppercase tracking-tighter border border-white/5">
                                            +{p.tags.length - 4}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-end gap-2 shrink-0 ml-auto">
                                    <span className={cn("text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider", p.pricing === 'Paid' ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400")}>
                                      {p.pricing}
                                    </span>
                                    <div className="mt-auto p-2 rounded-full bg-white/5 text-white/40 group-hover/project:bg-white/10 group-hover/project:text-white transition-all">
                                      <ArrowRight size={16} className="group-hover/project:-rotate-45 transition-transform" />
                                    </div>
                                  </div>

                                  {/* List View Image Preview */}
                                  <div className="hidden sm:block relative w-40 h-28 rounded-xl overflow-hidden shrink-0 border border-white/10 ml-2">
                                    {p.url !== '#' || (p.previewUrl && p.previewUrl.includes('youtube.com/embed/')) ? (
                                      <img 
                                        src={p.url !== '#' 
                                          ? `https://image.thum.io/get/width/400/crop/400/noanimate/${p.url}`
                                          : `https://img.youtube.com/vi/${p.previewUrl.split('/').pop()}/maxresdefault.jpg`
                                        }
                                        alt={p.name}
                                        className="w-full h-full object-cover opacity-60 group-hover/project:opacity-100 transition-all duration-500 group-hover/project:scale-110"
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                        <div className="opacity-20 scale-150">
                                          {p.icon}
                                        </div>
                                      </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent opacity-50" />
                                  </div>
                                </>
                              )}
                            </div>
                          </BentoCard>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
                )}
              </div>
            </div>
          );
        }

        if (!activeProjectCategory) {
          if (activeTab === 'Projects') {
            return (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
                  <BentoCard size="2x1" onClick={() => setActiveProjectCategory('Web Development Projects')} className="md:col-span-2 cursor-pointer hover:bg-purple-500/10 transition-colors group relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Globe size={160} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-center">
                      <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                        <Globe size={24} />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">Web Development Projects <span className="text-white/30 text-lg">({projects.filter(p => p.mainCategory === 'Web Development Projects').length})</span></h3>
                      <p className="text-white/50 text-sm max-w-md leading-relaxed">Modern digital experiences and scalable web applications.</p>
                    </div>
                  </BentoCard>

                  <BentoCard size="1x1" onClick={() => setActiveProjectCategory('Video & Motion Graphics')} className="cursor-pointer hover:bg-pink-500/10 transition-colors group relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Video size={120} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-center">
                      <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                        <Video size={24} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Video & Motion Graphics <span className="text-white/30 text-lg">({projects.filter(p => p.mainCategory === 'Video & Motion Graphics').length})</span></h3>
                      <p className="text-white/50 text-sm max-w-[200px]">A showcase of my video editing, motion graphics, and VFX work.</p>
                    </div>
                  </BentoCard>

                  <BentoCard size="1x1" onClick={() => setActiveProjectCategory('Graphics & Marketing')} className="cursor-pointer hover:bg-orange-500/10 transition-colors group relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Palette size={120} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-center">
                      <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                        <Palette size={24} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Graphics & Marketing <span className="text-white/30 text-lg">({projects.filter(p => p.mainCategory === 'Graphics & Marketing').length})</span></h3>
                      <p className="text-white/50 text-sm max-w-[200px]">Design assets, marketing campaigns, and brand identities.</p>
                    </div>
                  </BentoCard>
                </div>
              </div>
            );
          } else {
            return (
              <div className="space-y-8">
                <div className="relative overflow-hidden rounded-[2.5rem] p-[2px] group">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-[2.5rem]" />
                  <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_270deg,#6366f1_300deg,#a855f7_330deg,#ec4899_360deg)] animate-border-spin blur-md opacity-70" />
                  <div className="relative h-full w-full bg-[#050505] rounded-[calc(2.5rem-2px)] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between overflow-hidden gap-6">
                    <div className="absolute inset-0 bg-indigo-500/5" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-2">Immersive App Gallery</h3>
                      <p className="text-white/50 text-base max-w-xl font-light">Experience my apps in a focused, full-screen gallery with advanced search and filtering.</p>
                    </div>
                    <button 
                      onClick={() => setIsInImmersiveMode(true)}
                      className="relative z-10 px-8 py-4 rounded-2xl bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-500/20 flex items-center gap-3 group-hover:scale-105 shrink-0"
                    >
                      <Rocket size={20} />
                      <span>Enter Gallery</span>
                    </button>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 py-3 px-4 md:px-6 rounded-full flex items-center gap-4 overflow-hidden relative">
                  <div className="flex items-center gap-2 text-amber-400 shrink-0 z-10 bg-[#050505] pr-2 md:pr-4 py-1 rounded-full">
                    <Activity size={18} />
                    <span className="font-bold text-xs md:text-sm whitespace-nowrap">Development Status</span>
                  </div>
                  <div className="flex-1 overflow-hidden relative flex items-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <div className="flex whitespace-nowrap animate-marquee text-amber-400/70 text-xs md:text-sm">
                      <span className="mx-4">Some apps are complete and some are still under development.</span>
                      <span className="mx-4">•</span>
                      <span className="mx-4">If you face any issues, contact us or wait until the development is finished or the problem is fixed.</span>
                      <span className="mx-4">•</span>
                      <span className="mx-4">Some apps are complete and some are still under development.</span>
                      <span className="mx-4">•</span>
                      <span className="mx-4">If you face any issues, contact us or wait until the development is finished or the problem is fixed.</span>
                      <span className="mx-4">•</span>
                      <span className="mx-4">Some apps are complete and some are still under development.</span>
                      <span className="mx-4">•</span>
                      <span className="mx-4">If you face any issues, contact us or wait until the development is finished or the problem is fixed.</span>
                    </div>
                  </div>
                </div>

                <div className="text-center md:text-left mb-8">
                  <h2 className="text-3xl font-bold mb-4">Apps & Tools</h2>
                  <p className="text-white/60 max-w-2xl">
                    Here I build apps, games, tools, and experiences for you, the community, and my own self too.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
                  <BentoCard size="2x1" onClick={() => setActiveProjectCategory('AI Solutions')} className="md:col-span-2 cursor-pointer hover:bg-emerald-500/10 transition-colors group relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Brain size={160} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-center">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                        <Brain size={24} />
                      </div>
                      <h3 className="text-3xl font-bold mb-2">AI Solutions <span className="text-white/30 text-lg">({projects.filter(p => p.mainCategory === 'AI Solutions').length})</span></h3>
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
                      <h3 className="text-2xl font-bold mb-2">Apps & Dev <span className="text-white/30 text-lg">({projects.filter(p => p.mainCategory === 'Apps & Dev').length})</span></h3>
                      <p className="text-white/50 text-sm max-w-[200px]">SaaS, Mobile Apps, AI Tools & Open Source Repos.</p>
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
                      <h3 className="text-2xl font-bold mb-2">Interactive Experiences <span className="text-white/30 text-lg">({projects.filter(p => p.mainCategory === 'Interactive Experiences').length})</span></h3>
                      <p className="text-white/50 text-sm max-w-[200px]">Games, 3D environments, and interactive storytelling.</p>
                    </div>
                  </BentoCard>

                  <BentoCard size="2x1" onClick={() => setActiveProjectCategory('My Personal Apps')} className="md:col-span-2 cursor-pointer hover:bg-rose-500/10 transition-colors group relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Lock size={160} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-center">
                      <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                        <Lock size={24} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">My Personal Apps <span className="text-white/30 text-lg">({projects.filter(p => p.mainCategory === 'My Personal Apps').length})</span></h3>
                      <p className="text-white/50 text-sm max-w-[300px]">Special apps currently not published, giving a glimpse into my personal builds and experiments.</p>
                    </div>
                  </BentoCard>
                </div>
              </div>
            );
          }
        }

        const categoryProjects = projects.filter(p => p.mainCategory === activeProjectCategory);
        const categoryTags = ['All', ...Array.from(new Set(categoryProjects.flatMap(p => p.tags)))];

        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-4">
                <button onClick={() => { setActiveProjectCategory(null); setProjectFilter([]); setSearchQuery(''); }} className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h2 className="text-2xl font-bold">{activeProjectCategory} <span className="text-white/30 text-lg">({categoryProjects.length})</span></h2>
                  <p className="text-sm text-white/50">Explore my work in this category.</p>
                </div>
              </div>
              
              <div className="relative group w-full sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-2 pl-11 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 transition-all focus:bg-white/10"
                />
              </div>
            </div>

            {categoryTags.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                {categoryTags.map((f) => {
                  const count = f === 'All' ? categoryProjects.length : categoryProjects.filter(p => p.tags.includes(f)).length;
                  const isSelected = f === 'All' ? projectFilter.length === 0 : projectFilter.includes(f);
                  return (
                  <button
                    key={f}
                    onClick={() => {
                      if (f === 'All') {
                        setProjectFilter([]);
                      } else {
                        setProjectFilter(prev => prev.includes(f) ? prev.filter(t => t !== f) : [...prev, f]);
                      }
                    }}
                    className={cn(
                      "px-4 py-2 rounded-2xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5",
                      isSelected ? "bg-white text-black" : "bg-white/5 text-white/40 hover:bg-white/10"
                    )}
                  >
                    <span>{f}</span>
                    <span className={cn("opacity-50", isSelected ? "text-black/50" : "text-white/30")}>({count})</span>
                  </button>
                )})}
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
                    <SkeletonCard key={i} size={i === 0 && projectFilter.length === 0 ? "2x1" : "1x1"} />
                  ))
                ) : (
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((p, i) => (
                      <BentoCard 
                        key={p.name} 
                        size={i === 0 && projectFilter.length === 0 ? "2x1" : "1x1"} 
                        className={cn(p.bg, "border-white/5 cursor-pointer relative overflow-hidden group/project h-[400px] p-0")}
                        onClick={() => openProjectModal(p)}
                        background={p.url !== '#' || (p.previewUrl && p.previewUrl.includes('youtube.com/embed/')) ? (
                          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2rem]">
                            <img 
                              src={p.url !== '#' 
                                ? `https://image.thum.io/get/width/800/crop/800/noanimate/${p.url}`
                                : `https://img.youtube.com/vi/${p.previewUrl.split('/').pop()}/maxresdefault.jpg`
                              }
                              alt={p.name}
                              className="w-full h-full object-cover opacity-60 group-hover/project:opacity-100 transition-all duration-700 group-hover/project:scale-110"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
                          </div>
                        ) : null}
                      >
                        <div className="flex flex-col h-full relative z-10 p-6 justify-end">
                          <div className="flex justify-between items-start mb-auto">
                            <div className={cn("p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10", p.color)}>
                              {p.icon}
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <span className={cn("text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter backdrop-blur-md border border-white/10", p.pricing === 'Paid' ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400")}>
                                {p.pricing} {p.price && `(${p.price})`}
                              </span>
                              {p.status && (
                                <span className={cn(
                                  "text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter backdrop-blur-md border border-white/10",
                                  p.status === 'Development' ? "bg-amber-500/20 text-amber-400" :
                                  p.status === 'Beta' ? "bg-blue-500/20 text-blue-400" :
                                  "bg-emerald-500/20 text-emerald-400"
                                )}>
                                  {p.status}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h3 className="font-bold text-xl mb-1 group-hover/project:text-indigo-400 transition-colors">{p.name}</h3>
                            <p className="text-xs text-white/70 line-clamp-2 font-light mb-4">{p.desc}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 group-hover:text-white transition-colors">
                                <span>{p.mainCategory === 'My Personal Apps' ? 'Watch Preview' : 'View Project'}</span>
                                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                              </div>
                              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover/project:bg-indigo-500 group-hover/project:text-white transition-all shadow-xl">
                                {p.mainCategory === 'My Personal Apps' ? <Play size={16} fill="currentColor" /> : <ArrowRight size={16} />}
                              </div>
                            </div>
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
      }

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
                  src={bookCover} 
                  alt="31 Ways to Ruin Your Life" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/book:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
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
                      onClick={openEbookModal}
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

            <BentoCard size="2x1" className="bg-purple-500/5 border-purple-500/10 p-0 overflow-hidden group/music">
              <div className="flex flex-col md:flex-row h-full">
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                        <Sparkles size={16} />
                      </div>
                      <span className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">AI Music</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">My AI Generated Music</h3>
                    <p className="text-white/50 text-sm font-light">Listen to tracks I've created using advanced AI music generation tools.</p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 min-h-[200px] bg-black/50 relative">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/VxCV8_2UZIM" 
                    title="AI Generated Music" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full object-cover"
                  ></iframe>
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
                  
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="relative w-32 h-32 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-indigo-500/10 flex items-center justify-center text-5xl">
                      👨🏽‍💻
                      <img 
                        src={myPfp} 
                        alt="Abdulrahman Toor" 
                        className="absolute inset-0 w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover/profile-mini:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
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

      case 'Store':
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <BentoCard size="2x2" className="max-w-2xl w-full text-center p-12 flex flex-col items-center justify-center relative overflow-hidden bg-white/[0.02] border-emerald-500/20">
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/30 relative z-10"
              >
                <ShoppingBag size={48} className="text-emerald-400" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight relative z-10">Premium Storefront</h2>
              <p className="text-white/60 mb-8 max-w-md mx-auto leading-relaxed font-light relative z-10">
                Access my exclusive collection of books, applications, and resources designed to elevate your digital journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center relative z-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://abdulrahman-t.web.app/store', '_blank')}
                  className="px-8 py-4 rounded-2xl bg-emerald-500 text-black text-sm font-bold hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  Enter Storefront
                  <ExternalLink size={18} />
                </motion.button>
              </div>
            </BentoCard>
          </div>
        );

      case 'Success':
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <BentoCard size="2x2" className="max-w-lg w-full text-center p-12 flex flex-col items-center justify-center relative overflow-hidden bg-white/[0.02] border-emerald-500/20">
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/30 relative z-10"
              >
                <CheckCircle2 size={48} className="text-emerald-400" />
              </motion.div>
              
              <h2 className="text-4xl font-bold mb-4 tracking-tight relative z-10">Payment Successful!</h2>
              <p className="text-white/60 mb-8 max-w-sm mx-auto leading-relaxed font-light relative z-10">
                Thank you for your purchase. Your order has been confirmed and the details have been sent to your email.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center relative z-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('Ebooks')}
                  className="px-6 py-3 rounded-2xl bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10"
                >
                  <ArrowLeft size={16} />
                  Back to Ebooks
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab('Home')}
                  className="px-6 py-3 rounded-2xl bg-emerald-500 text-black text-sm font-bold hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20"
                >
                  Return Home
                </motion.button>
              </div>
            </BentoCard>
          </div>
        );
    }
  };

  return (
    <div className={cn(
      "min-h-screen mesh-gradient flex flex-col items-center selection:bg-indigo-500/30",
      isInImmersiveMode ? "py-0 px-0" : "py-12 px-4 md:py-20"
    )}>
      {!hideCustomCursor && <CustomCursor />}
      {/* Header / Navigation */}
      {!isInImmersiveMode && (
        <header className="w-full mb-12 sticky top-6 md:top-8 z-50 px-4 flex justify-center">
          <nav 
            ref={navRef}
            className="glass rounded-full p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar shadow-2xl border border-white/10 max-w-full backdrop-blur-2xl"
          >
            {/* Animated Logo */}
            <div className="relative w-10 h-10 md:w-12 md:h-12 ml-1 mr-2 group cursor-pointer flex-shrink-0 flex items-center justify-center rounded-full bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]">
              {/* Outer rotating ring for tech feel */}
              <div className="absolute inset-0 border-2 border-dashed border-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-500" />
              
              <img 
                src={logo1} 
                alt="Logo" 
                className="absolute inset-0 w-full h-full p-2 md:p-2.5 object-contain transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-50 group-hover:opacity-0 group-hover:-rotate-90"
              />
              <img 
                src={logo2} 
                alt="Logo Hover" 
                className="absolute inset-0 w-full h-full p-2 md:p-2.5 object-contain opacity-0 scale-150 rotate-90 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-100 group-hover:opacity-100 group-hover:rotate-0"
              />
            </div>
            
            {/* Divider */}
            <div className="w-px h-8 bg-white/10 mx-1 flex-shrink-0" />

            {tabs.map((tab) => (
              <button
                key={tab.name}
                data-active={activeTab === tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                }}
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

            {/* Divider */}
            <div className="w-px h-8 bg-white/10 mx-1 flex-shrink-0" />

            {/* Settings Button */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="relative rounded-full text-[11px] md:text-sm font-semibold transition-all duration-500 flex items-center justify-center whitespace-nowrap outline-none group px-3 py-2.5 md:px-4 md:py-3 text-white/30 hover:text-white/60 hover:bg-white/5 hover:px-5 hover:md:px-7"
              title="Settings"
            >
              <span className="relative z-10 transition-all duration-300 scale-100 group-hover:rotate-90">
                <Settings size={18} />
              </span>
            </button>
          </nav>
        </header>
      )}

      {/* Main Content */}
      <main className={cn(
        "w-full pt-4 transition-all duration-500",
        isInImmersiveMode ? "max-w-full" : "max-w-4xl"
      )}>
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
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeProjectModal} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-[2.5rem] border border-white/10 shadow-2xl no-scrollbar"
            >
              <button 
                onClick={closeProjectModal}
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
                        {selectedProject.mainCategory !== 'My Personal Apps' && (
                          <>
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
                          </>
                        )}
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
                          <span className={cn(
                            "text-sm font-bold",
                            selectedProject.status === 'Development' ? "text-amber-400" :
                            selectedProject.status === 'Beta' ? "text-blue-400" :
                            "text-emerald-400"
                          )}>
                            {selectedProject.status || 'Live'}
                          </span>
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
                      {selectedProject.mainCategory !== 'My Personal Apps' && (
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <div className="px-6 py-3 rounded-2xl bg-white text-black font-bold flex items-center gap-2">
                            <ExternalLink size={18} />
                            Interact with App
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ebook Purchase Modal */}
      <AnimatePresence>
        {selectedEbook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeEbookModal} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0a0a0a] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={closeEbookModal}
                className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Left side: Cover */}
                <div className="w-full md:w-2/5 relative bg-white/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />
                  {selectedEbook.image && (
                    <img 
                      src={selectedEbook.image} 
                      alt={selectedEbook.title} 
                      className="w-full h-full object-cover relative z-10"
                    />
                  )}
                </div>

                {/* Right side: Details & Options */}
                <div className="w-full md:w-3/5 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy size={16} className="text-orange-400" />
                    <span className="text-[10px] text-orange-400 uppercase tracking-[0.2em] font-bold">Best Seller</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-3 tracking-tight">{selectedEbook.title}</h2>
                  <p className="text-white/60 text-sm mb-8 leading-relaxed">{selectedEbook.desc}</p>

                  <div className="space-y-3">
                    <button 
                      onClick={() => window.open('https://www.amazon.com', '_blank')}
                      className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
                          <Book size={20} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-sm">Amazon Ebook</h4>
                          <p className="text-[10px] text-white/40">Read on Kindle</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-1 rounded-md bg-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider">
                          72 Hours Remaining
                        </span>
                        <ExternalLink size={16} className="text-white/30 group-hover:text-white transition-colors" />
                      </div>
                    </button>

                    <button 
                      disabled
                      className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 opacity-50 cursor-not-allowed flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/40">
                          <BookOpen size={20} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-sm">Amazon Paperback</h4>
                          <p className="text-[10px] text-white/40">Physical Copy</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-md bg-white/10 text-white/40 text-[10px] font-bold uppercase tracking-wider">
                        Coming Soon
                      </span>
                    </button>

                    <button 
                      onClick={() => window.open(selectedEbook.polarLink, '_blank')}
                      className="w-full p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                          <Download size={20} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-sm text-indigo-400">Direct from My Store</h4>
                          <p className="text-[10px] text-indigo-400/60">Instant PDF Download</p>
                        </div>
                      </div>
                      <ExternalLink size={16} className="text-indigo-400/50 group-hover:text-indigo-400 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsSettingsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <Settings size={20} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold">Settings</h2>
                  </div>
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Custom Cursor Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold mb-1">Custom Cursor</h3>
                      <p className="text-xs text-white/40">Use the stylized dot cursor</p>
                    </div>
                    <button 
                      onClick={() => setHideCustomCursor(!hideCustomCursor)}
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        !hideCustomCursor ? "bg-indigo-500" : "bg-white/10"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                        !hideCustomCursor ? "left-7" : "left-1"
                      )} />
                    </button>
                  </div>

                  {/* Smooth Scroll Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold mb-1">Smooth Scrolling</h3>
                      <p className="text-xs text-white/40">Enable buttery smooth scroll</p>
                    </div>
                    <button 
                      onClick={() => setEnableSmoothScroll(!enableSmoothScroll)}
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        enableSmoothScroll ? "bg-indigo-500" : "bg-white/10"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                        enableSmoothScroll ? "left-7" : "left-1"
                      )} />
                    </button>
                  </div>

                  {/* Tabbed Dashboard View Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold mb-1">Tabbed Dashboard View</h3>
                      <p className="text-xs text-white/40">Compact tabbed layout for Home</p>
                    </div>
                    <button 
                      onClick={() => setCompactHomeView(!compactHomeView)}
                      className={cn(
                        "w-12 h-6 rounded-full transition-colors relative",
                        compactHomeView ? "bg-indigo-500" : "bg-white/10"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                        compactHomeView ? "left-7" : "left-1"
                      )} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      {!isInImmersiveMode && (
        <footer className="mt-32 py-12 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-2">
                  <img src={logo2} alt="Logo" className="w-full h-full object-contain opacity-80" loading="lazy" />
                </div>
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
      )}
    </div>
  );
}
