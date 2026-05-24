/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import confetti from "canvas-confetti";
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
  ShoppingBag,
  Link as LinkIcon,
  Store,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Lenis from "lenis";

import { ChatAssistant } from "./components/ChatAssistant";
import { CustomCursor } from "./components/CustomCursor";
import { Home as NewHome } from "./components/NewHome";
import { MainHeader } from "./components/MainHeader";
import { Vortex } from "./components/Vortex";
import { MedusaImage } from "./components/MedusaImage";

import { LinksPage } from "./components/pages/LinksPage";
import { ProjectsPage } from "./components/pages/ProjectsPage";
import { AppsPage } from "./components/pages/AppsPage";
import { JournalPage } from "./components/pages/JournalPage";
import { AutomationPage } from "./components/pages/AutomationPage";
import { EbooksPage } from "./components/pages/EbooksPage";
import { StorePage } from "./components/pages/StorePage";
import { ContentPage } from "./components/pages/ContentPage";
import { AboutPage } from "./components/pages/AboutPage";
import { ReviewsPage } from "./components/pages/ReviewsPage";
import { ConnectPage } from "./components/pages/ConnectPage";
import { SuccessPage } from "./components/pages/SuccessPage";
import { ServicesPage } from "./components/pages/ServicesPage";

import { MainFooter } from "./components/layout/MainFooter";

import { ASSET_LINKS } from "./constants/assets";

const myPfpFull = ASSET_LINKS.myPfpFull;
const bookCover = ASSET_LINKS.bookCover;
const logo1 = ASSET_LINKS.logo1Svg;
const logo2 = ASSET_LINKS.logo2Svg;
const myPfp = ASSET_LINKS.myPfp;

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { Category, ProjectCategory } from "./types";
import { tabs, socialTabs, projects, reviews, companies, skills, categoryDescriptions } from "./constants/data";
import { SkeletonCard, BentoCard } from "./components/shared/BentoCard";
import { LiveAutomationFeed } from "./components/shared/LiveAutomationFeed";
import { FeaturedCarousel } from "./components/shared/FeaturedCarousel";
import { ProjectModal } from "./components/shared/ProjectModal";
import { EbookModal } from "./components/shared/EbookModal";


export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = useMemo<Category>(() => {
    const path = location.pathname;
    if (path.startsWith("/projects")) return "Projects";
    if (path.startsWith("/apps")) return "Apps";
    if (path.startsWith("/automation")) return "Automation";
    if (path.startsWith("/ebooks")) return "Ebooks";
    if (path.startsWith("/content")) return "Content";
    if (path.startsWith("/about")) return "About";
    if (path.startsWith("/reviews")) return "Reviews";
    if (path.startsWith("/connect")) return "Connect";
    if (path.startsWith("/success")) return "Success";
    if (path.startsWith("/store")) return "Store";
    if (path.startsWith("/vortex")) return "Vortex";
    if (path.startsWith("/services")) return "Services";
    if (path.startsWith("/links")) return "Links";
    return "Home";
  }, [location.pathname]);

  const setActiveTab = (tab: Category) => {
    if (tab === "Home") navigate("/");
    else navigate(`/${tab.toLowerCase()}`);
  };

  const [projectFilter, setProjectFilter] = useState<string[]>([]);
  const [activeProjectCategory, setActiveProjectCategory] =
    useState<ProjectCategory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [selectedEbook, setSelectedEbook] = useState<any>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState("");
  const [isInImmersiveMode, setIsInImmersiveMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hideCustomCursor, setHideCustomCursor] = useState(() => {
    const val = localStorage.getItem("abdulrahman_hideCursor");
    return val !== null ? val === "true" : true; // true by default (hidden)
  });
  const [enableSmoothScroll, setEnableSmoothScroll] = useState(
    () => localStorage.getItem("abdulrahman_smoothScroll") === "true",
  ); // false by default
  const [compactHomeView, setCompactHomeView] = useState(
    () => localStorage.getItem("abdulrahman_compactHome") === "true",
  );
  const [activeHomeSection, setActiveHomeSection] = useState<
    "Learn" | "Explore" | "Work"
  >("Learn");
  const navRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("abdulrahman_hideCursor", hideCustomCursor.toString());
    localStorage.setItem(
      "abdulrahman_smoothScroll",
      enableSmoothScroll.toString(),
    );
    localStorage.setItem("abdulrahman_compactHome", compactHomeView.toString());
  }, [hideCustomCursor, enableSmoothScroll, compactHomeView]);

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  useEffect(() => {
    const path = location.pathname;
    const segments = path.split("/").filter(Boolean);

    if (segments.length >= 2) {
      const category = segments[0];
      const slug = segments[1];

      if (category === "projects" || category === "apps") {
        const project = projects.find((p) => slugify(p.name) === slug);
        if (project) {
          setSelectedProject(project);
        } else {
          setSelectedProject(null);
        }
      } else if (category === "ebooks") {
        if (
          slug === "31-ways-to-ruin-your-life-v1" ||
          slug === "31-ways-to-ruin-your-life" ||
          slug === "31-ways"
        ) {
          setSelectedEbook({
            title: "31 Ways to Ruin Your Life",
            desc: "A super professional guide to self-sabotage. Learn what NOT to do to succeed.",
            image: bookCover,
            polarLink:
              "https://buy.polar.sh/polar_cl_w7kAdvkAHugeoJVUiB7Fmj8rNJsucriPLLpuJ3mXMML",
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

  const openProjectModal = (project: (typeof projects)[0]) => {
    let category = activeTab.toLowerCase();
    if (category !== "projects" && category !== "apps") {
      category = project.mainCategory.includes("App") ? "apps" : "projects";
    }
    navigate(`/${category}/${slugify(project.name)}`);
  };

  const closeProjectModal = () => {
    let category = activeTab.toLowerCase();
    if (category !== "projects" && category !== "apps") {
      category = "projects";
    }
    navigate(`/${category}`);
  };

  const openEbookModal = () => {
    navigate(`/ebooks/31-ways-to-ruin-your-life-v1`);
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
      document.body.classList.add("hide-native-cursor");
    } else {
      document.body.classList.remove("hide-native-cursor");
    }

    return () => {
      document.body.classList.remove("hide-native-cursor");
    };
  }, [hideCustomCursor]);

  useEffect(() => {
    if (activeTab === "Success") {
      const fireConfetti = () => {
        const defaults = {
          spread: 70,
          ticks: 150,
          gravity: 0.8,
          decay: 0.94,
          startVelocity: 50,
          colors: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"],
          zIndex: 100,
        };

        // Left cannon
        confetti({
          ...defaults,
          particleCount: 80,
          angle: 60,
          origin: { x: 0, y: 1 },
        });

        // Right cannon
        confetti({
          ...defaults,
          particleCount: 80,
          angle: 120,
          origin: { x: 1, y: 1 },
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
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);

  React.useEffect(() => {
    if (activeTab !== "Apps") {
      setIsInImmersiveMode(false);
    }
  }, [activeTab]);

  React.useEffect(() => {
    if (activeTab === "Projects" || activeTab === "Apps") {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [activeTab, activeProjectCategory, projectFilter, searchQuery]);

  React.useEffect(() => {
    const activeBtn = navRef.current?.querySelector('[data-active="true"]');
    if (activeBtn) {
      activeBtn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeTab]);

  React.useEffect(() => {
    setActiveProjectCategory(null);
    setProjectFilter([]);
    setSearchQuery("");
  }, [activeTab]);

  const filteredProjects = useMemo(() => {
    let base = projects;

    if (activeTab === "Projects") {
      base = base.filter(
        (p) =>
          p.mainCategory === "Web Development Projects" ||
          p.mainCategory === "Video & Motion Graphics" ||
          p.mainCategory === "Graphics & Marketing",
      );
    } else if (activeTab === "Apps") {
      base = base.filter(
        (p) =>
          p.mainCategory === "Pro Business Suite" ||
          p.mainCategory === "AI Solutions" ||
          p.mainCategory === "Apps & Dev" ||
          p.mainCategory === "Interactive Experiences" ||
          p.mainCategory === "My Personal Apps",
      );
    }

    if (activeProjectCategory) {
      base = base.filter(
        (p) =>
          p.mainCategory === activeProjectCategory ||
          (p as any).categories?.includes(activeProjectCategory),
      );
    }

    if (projectFilter.length > 0) {
      base = base.filter((p) => projectFilter.every((f) => p.tags.includes(f)));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      base = base.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.desc.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    return base;
  }, [activeTab, activeProjectCategory, projectFilter, searchQuery]);

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <NewHome projects={projects} setActiveTab={setActiveTab} />;
      case "Links":
        return (
          <LinksPage
            setActiveTab={setActiveTab}
            openProjectModal={openProjectModal}
            openChatWithSearch={openChatWithSearch}
            compactHomeView={compactHomeView}
            activeHomeSection={activeHomeSection}
            setActiveHomeSection={setActiveHomeSection}
          />
        );
      case "Projects":
        return (
          <ProjectsPage
            activeProjectCategory={activeProjectCategory}
            setActiveProjectCategory={setActiveProjectCategory}
            projectFilter={projectFilter}
            setProjectFilter={setProjectFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
            isInImmersiveMode={isInImmersiveMode}
            setIsInImmersiveMode={setIsInImmersiveMode}
            setSelectedProject={setSelectedProject}
            isLoading={isLoading}
            filteredProjects={filteredProjects}
            openProjectModal={openProjectModal}
          />
        );
      case "Apps":
        return (
          <AppsPage
            activeProjectCategory={activeProjectCategory}
            setActiveProjectCategory={setActiveProjectCategory}
            projectFilter={projectFilter}
            setProjectFilter={setProjectFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
            isInImmersiveMode={isInImmersiveMode}
            setIsInImmersiveMode={setIsInImmersiveMode}
            setSelectedProject={setSelectedProject}
            isLoading={isLoading}
            filteredProjects={filteredProjects}
            openProjectModal={openProjectModal}
          />
        );
      case "Journal":
        return <JournalPage />;

      case "Automation":
        return <AutomationPage />;
      case "Ebooks":
        return <EbooksPage openEbookModal={openEbookModal} />;
      case "Store":
        return <StorePage />;
      case "Content":
        return <ContentPage />;
      case "About":
        return <AboutPage />;
      case "Reviews":
        return <ReviewsPage setActiveTab={setActiveTab} />;
      case "Connect":
        return <ConnectPage />;
      case "Success":
        return <SuccessPage setActiveTab={setActiveTab} />;
      case "Vortex":
        return <Vortex />;
      case "Services":
        return <ServicesPage />;
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen mesh-gradient flex flex-col items-center selection:bg-indigo-500/30",
        isInImmersiveMode || activeTab === "Home" || activeTab === "Vortex"
          ? "py-0 px-0 relative top-0"
          : "pt-32 pb-12 px-4 md:pt-40 md:pb-20",
      )}
    >
      {!hideCustomCursor && <CustomCursor />}
      {/* Headers / Navigation */}

      {/* 1. Main Minimal Floating Header for normal pages */}
      {!isInImmersiveMode &&
        activeTab !== "Links" &&
        activeTab !== "Vortex" && (
          <MainHeader
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setIsSettingsOpen={setIsSettingsOpen}
            tabs={tabs}
          />
        )}

      {/* 2. Links Page Header (Original Glass Pill style but with social icons) */}
      {!isInImmersiveMode && activeTab === "Links" && (
        <header className="w-full mb-12 sticky top-6 md:top-8 z-50 px-4 flex justify-center">
          <nav className="glass rounded-full p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar shadow-2xl border border-white/10 max-w-full backdrop-blur-2xl">
            <div className="relative w-10 h-10 md:w-12 md:h-12 ml-1 mr-2 flex-shrink-0 flex items-center justify-center rounded-full bg-white/5 border border-white/10">
              <img
                src={logo1}
                alt="Logo"
                className="absolute inset-0 w-full h-full p-2 md:p-2.5 object-contain"
              />
            </div>

            <div className="w-px h-8 bg-white/10 mx-1 flex-shrink-0" />

            {socialTabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.url}
                target="_blank"
                rel="noreferrer"
                className="relative rounded-full text-[11px] md:text-sm font-semibold transition-all duration-300 flex items-center justify-center whitespace-nowrap outline-none group px-3 py-2.5 md:px-4 md:py-3 text-white/30 hover:text-white/80 hover:bg-white/5 hover:px-5 hover:md:px-6"
              >
                <span className="relative z-10 transition-transform duration-300 scale-100 group-hover:scale-110 group-hover:mr-2 flex items-center gap-2">
                  {tab.icon}
                </span>
                <span className="relative z-10 transition-all duration-300 overflow-hidden max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100">
                  {tab.name}
                </span>
              </a>
            ))}

            <div className="w-px h-8 bg-white/10 mx-1 flex-shrink-0" />

            <button
              onClick={() => setActiveTab("Home")}
              className="relative rounded-full text-[11px] md:text-sm font-semibold transition-all duration-300 flex items-center justify-center group px-3 py-2.5 md:px-4 md:py-3 text-white/30 hover:text-white/80 hover:bg-white/5"
              title="Home"
            >
              <Home size={18} />
            </button>
          </nav>
        </header>
      )}

      {/* 3. Vortex Header: floating "Go Back" button */}
      {activeTab === "Vortex" && (
        <div className="fixed top-6 left-6 z-50">
          <button
            onClick={() => setActiveTab("Home")}
            className="px-5 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white/60 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all font-bold tracking-widest text-xs uppercase flex items-center gap-3 shadow-2xl"
          >
            <ArrowLeft size={16} />{" "}
            <span className="hidden md:inline">Go Back</span>
          </button>
        </div>
      )}

      {/* Main Content */}
      <main
        className={cn(
          "w-full transition-all duration-500",
          isInImmersiveMode || activeTab === "Home" || activeTab === "Vortex"
            ? "max-w-full"
            : "max-w-4xl pt-4",
        )}
      >
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

      <ProjectModal selectedProject={selectedProject} closeProjectModal={closeProjectModal} />
      <EbookModal selectedEbook={selectedEbook} closeEbookModal={closeEbookModal} />
      
      <MainFooter
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isInImmersiveMode={isInImmersiveMode}
      />
    </div>
  );
}
