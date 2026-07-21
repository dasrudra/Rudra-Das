import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Activity, 
  Github, 
  Globe, 
  BookOpen,
  Info
} from 'lucide-react';
import { projects } from '../constants';

// Aesthetic premium skins for each project to match the professional enterprise feel
interface ProjectSkin {
  themeColor: string;
  bgGradient: string;
  borderColor: string;
  glowColor: string;
  labelText: string;
  accentText: string;
  shadowNeon: string;
}

const PROJECT_SKINS: ProjectSkin[] = [
  {
    themeColor: '#10b981', // Emerald - Odoo / ERP / Enterprise
    bgGradient: 'from-emerald-500/20 via-emerald-950/40 to-navy-950/90',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500/50',
    glowColor: 'bg-emerald-500/10',
    labelText: 'ERP SYSTEM',
    accentText: 'text-emerald-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(16,185,129,0.25)]',
  },
  {
    themeColor: '#3b82f6', // Blue - Ledger / Accounting
    bgGradient: 'from-blue-500/20 via-blue-950/40 to-navy-950/90',
    borderColor: 'border-blue-500/30 hover:border-blue-500/50',
    glowColor: 'bg-blue-500/10',
    labelText: 'FINTECH',
    accentText: 'text-blue-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(59,130,246,0.25)]',
  },
  {
    themeColor: '#f59e0b', // Amber - FocusDeck Productivity
    bgGradient: 'from-amber-500/20 via-amber-950/40 to-navy-950/90',
    borderColor: 'border-amber-500/30 hover:border-amber-500/50',
    glowColor: 'bg-amber-500/10',
    labelText: 'PRODUCTIVITY',
    accentText: 'text-amber-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(245,158,11,0.25)]',
  },
  {
    themeColor: '#ef4444', // Red - DistractCheck Attention
    bgGradient: 'from-red-500/20 via-red-950/40 to-navy-950/90',
    borderColor: 'border-red-500/30 hover:border-red-500/50',
    glowColor: 'bg-red-500/10',
    labelText: 'RESEARCH AI',
    accentText: 'text-red-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(239,68,68,0.25)]',
  },
  {
    themeColor: '#a855f7', // Purple - YOLO v8 Computer Vision
    bgGradient: 'from-purple-500/20 via-purple-950/40 to-navy-950/90',
    borderColor: 'border-purple-500/30 hover:border-purple-500/50',
    glowColor: 'bg-purple-500/10',
    labelText: 'YOLO VISION',
    accentText: 'text-purple-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(168,85,247,0.25)]',
  },
  {
    themeColor: '#0d9488', // Teal - Hotel Management
    bgGradient: 'from-teal-500/20 via-teal-950/40 to-navy-950/90',
    borderColor: 'border-teal-500/30 hover:border-teal-500/50',
    glowColor: 'bg-teal-500/10',
    labelText: 'ERP WORKFLOW',
    accentText: 'text-teal-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(13,148,136,0.25)]',
  },
  {
    themeColor: '#ec4899', // Pink - Sentiment Model
    bgGradient: 'from-pink-500/20 via-pink-950/40 to-navy-950/90',
    borderColor: 'border-pink-500/30 hover:border-pink-500/50',
    glowColor: 'bg-pink-500/10',
    labelText: 'SENTIMENT',
    accentText: 'text-pink-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(236,72,153,0.25)]',
  },
  {
    themeColor: '#8b5cf6', // Violet - Speech Emotion
    bgGradient: 'from-violet-500/20 via-violet-950/40 to-navy-950/90',
    borderColor: 'border-violet-500/30 hover:border-violet-500/50',
    glowColor: 'bg-violet-500/10',
    labelText: 'AUDIO ML',
    accentText: 'text-violet-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(139,92,246,0.25)]',
  },
  {
    themeColor: '#06b6d4', // Cyan - Udemy Web Dev
    bgGradient: 'from-cyan-500/20 via-cyan-950/40 to-navy-950/90',
    borderColor: 'border-cyan-500/30 hover:border-cyan-500/50',
    glowColor: 'bg-cyan-500/10',
    labelText: 'WEB ENGINE',
    accentText: 'text-cyan-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(6,182,212,0.25)]',
  },
  {
    themeColor: '#84cc16', // Lime - Apple Quality research
    bgGradient: 'from-lime-500/20 via-lime-950/40 to-navy-950/90',
    borderColor: 'border-lime-500/30 hover:border-lime-500/50',
    glowColor: 'bg-lime-500/10',
    labelText: 'DATA SCIENCE',
    accentText: 'text-lime-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(132,204,22,0.25)]',
  },
  {
    themeColor: '#f43f5e', // Rose - Meta Ads Scraper
    bgGradient: 'from-rose-500/20 via-rose-950/40 to-navy-950/90',
    borderColor: 'border-rose-500/30 hover:border-rose-500/50',
    glowColor: 'bg-rose-500/10',
    labelText: 'WEB SCRAPER',
    accentText: 'text-rose-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(244,63,94,0.25)]',
  },
];

const categories = ['All', 'AI', 'ERP', 'Full Stack', 'Research', 'Productivity', 'Automation'];

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number; opacity: number }>>([]);
  
  // Custom tilt values for the centered active card to give premium 3D feel on mouse hover
  const [activeTilt, setActiveTilt] = useState({ x: 0, y: 0 });
  const [activeGlare, setActiveGlare] = useState({ x: 50, y: 50 });
  const [isHoveringActive, setIsHoveringActive] = useState(false);

  const lastWheelTime = useRef(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate 3D atmospheric starfield/space dust particles in the cinematic background stage
  useEffect(() => {
    const generated = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 1.5 + 0.8,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setParticles(generated);
  }, []);

  // Filter projects based on categories
  const filteredProjects = projects.filter(project => {
    if (selectedCategory === 'All') return true;
    
    const domainLower = (project.domain || '').toLowerCase();
    const titleLower = project.title.toLowerCase();
    const descLower = project.description.toLowerCase();
    
    if (selectedCategory === 'AI') {
      return domainLower === 'ai' || domainLower === 'computer vision' || descLower.includes('llm') || descLower.includes('machine learning') || titleLower.includes('intelligence');
    }
    if (selectedCategory === 'ERP') {
      return domainLower === 'erp' || titleLower.includes('management') || descLower.includes('odoo') || descLower.includes('erp');
    }
    if (selectedCategory === 'Full Stack') {
      return domainLower === 'saas' || titleLower.includes('ledger') || titleLower.includes('udemy') || descLower.includes('full-stack') || descLower.includes('full stack');
    }
    if (selectedCategory === 'Research') {
      return domainLower === 'analytics' || titleLower.includes('prediction') || titleLower.includes('attention') || descLower.includes('research') || descLower.includes('publication');
    }
    if (selectedCategory === 'Productivity') {
      return domainLower === 'productivity' || titleLower.includes('deck') || titleLower.includes('extension') || descLower.includes('productivity');
    }
    if (selectedCategory === 'Automation') {
      return domainLower === 'automation' || titleLower.includes('scraper') || descLower.includes('automate') || descLower.includes('automation');
    }
    
    return false;
  });

  // Reset index when category filters change
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory]);

  const nextProject = () => {
    if (filteredProjects.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevProject = () => {
    if (filteredProjects.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  // Keyboard navigation support for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevProject();
      } else if (e.key === 'ArrowRight') {
        nextProject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredProjects.length]);

  // Cinematic Mouse Wheel Scroll throttle
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 650) return; // Smooth delay
    if (Math.abs(e.deltaY) < 12) return;

    if (e.deltaY > 0) {
      nextProject();
      lastWheelTime.current = now;
    } else if (e.deltaY < 0) {
      prevProject();
      lastWheelTime.current = now;
    }
  };

  // Drag Swipe handler for mobile touch screen or desktop cursor drag
  const handleDragEnd = (event: any, info: any) => {
    const threshold = 60;
    if (info.offset.x < -threshold) {
      nextProject();
    } else if (info.offset.x > threshold) {
      prevProject();
    }
  };

  // Active card Mouse Tilt coordinates tracking
  const handleActiveMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    
    setActiveTilt({
      x: normY * -12, 
      y: normX * 12,
    });

    setActiveGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleActiveMouseLeave = () => {
    setActiveTilt({ x: 0, y: 0 });
    setActiveGlare({ x: 50, y: 50 });
    setIsHoveringActive(false);
  };

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const activeProject = filteredProjects[activeIndex] || null;
  // Get index in absolute projects array to match global skins
  const activeSkin = activeProject 
    ? PROJECT_SKINS[projects.indexOf(activeProject) % PROJECT_SKINS.length]
    : PROJECT_SKINS[0];

  // Map cinematic 3D transform positions
  const getCardTransform = (index: number) => {
    let offset = index - activeIndex;
    const count = filteredProjects.length;

    if (count > 2) {
      const half = Math.floor(count / 2);
      if (offset > half) offset -= count;
      if (offset < -half) offset += count;
    }

    const absOffset = Math.abs(offset);
    const isActive = offset === 0;

    // Responsive horizontal distance
    let x = 0;
    if (offset !== 0) {
      const spacing = isMobile ? 130 : isTablet ? 240 : 340;
      x = offset * spacing;
    }

    // Realistic depth coordinates (push inactive items back into the screen)
    const z = isActive ? 50 : -200 - absOffset * 100;
    // Expanded active scale, standard smaller depth scale
    const scale = isActive ? 1.08 : 0.82 - absOffset * 0.08;
    // Rotate slightly inwards to form an immersive circular pedestal arc
    const rotateY = isActive ? 0 : -offset * 32;

    // Subtly blur non-focused items to direct optical focus towards active project
    const filter = isActive ? 'blur(0px)' : `blur(${absOffset * 1.5}px)`;

    // Calculate elegant fall-off opacity
    let opacity = 1;
    if (!isActive) {
      opacity = 0.55 - (absOffset - 1) * 0.2;
      opacity = Math.max(0.1, opacity);
    }

    // Hide extreme indices to keep it uncluttered
    if (absOffset > 2) {
      opacity = 0;
    }

    return {
      x,
      z,
      scale,
      rotateY,
      opacity,
      filter,
      zIndex: 100 - absOffset * 10,
    };
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-[#020306]">
      {/* Immersive Dynamic Ambiance: Radial gradient spotlight shifting color automatically */}
      <div 
        className="absolute inset-0 transition-all duration-1000 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 32%, ${activeSkin.themeColor} 0%, transparent 60%)`
        }}
      />

      {/* Floating 3D Micro Dust Particles floating through space */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              backgroundColor: activeSkin.themeColor,
              boxShadow: `0 0 8px ${activeSkin.themeColor}`,
              filter: 'blur(0.5px)'
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(p.id) * 30, 0],
            }}
            transition={{
              duration: 14 + p.speed * 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Subtle background tech line coordinates */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:45px_45px] opacity-[0.07] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold tracking-[0.2em] text-accent-primary uppercase mb-3 inline-block">
              ENGINEERING SHOWCASE
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-white via-white/90 to-white/40 bg-clip-text text-transparent"
          >
            Interactive Stage
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-slate text-base md:text-lg leading-relaxed font-sans"
          >
            A curated collection of production engineering projects, automated pipelines, and custom enterprise modules.
          </motion.p>
        </div>

        {/* Premium Category Filter Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 mb-16 max-w-4xl mx-auto px-4 relative z-20">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? 'bg-white text-navy-950 border-white shadow-[0_0_25px_rgba(255,255,255,0.15)] scale-105'
                    : 'bg-navy-950/40 text-muted-slate border-white/5 hover:border-white/10 hover:text-white hover:bg-navy-900/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Cinematic 3D Stage Space */}
        <div 
          className="relative w-full flex flex-col items-center justify-center select-none"
          onWheel={handleWheel}
        >
          {/* Main 3D Perspective Card Box */}
          <motion.div 
            className="relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing transform-style-3d overflow-visible"
            style={{ 
              height: isMobile ? '360px' : isTablet ? '440px' : '520px',
              perspective: '1300px',
              perspectiveOrigin: '50% 30%'
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {/* Soft lighting pedestal base under active slide */}
            <div 
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[600px] h-[240px] pointer-events-none opacity-40 transition-all duration-1000"
              style={{
                transform: 'rotateX(80deg) translateY(50px)',
                background: `radial-gradient(ellipse at center, ${activeSkin.themeColor}38 0%, transparent 70%)`
              }}
            />

            {/* Glowing dashboard rings */}
            <div 
              className="absolute bottom-12 left-1/2 -translate-x-1/2 w-80 h-20 pointer-events-none transition-all duration-1000 animate-pulse"
              style={{ transform: 'rotateX(75deg)' }}
            >
              <div 
                className="absolute inset-0 rounded-full border-2 border-dashed transition-colors duration-1000"
                style={{ borderColor: `${activeSkin.themeColor}55` }}
              />
              <div 
                className="absolute -inset-4 rounded-full border border-solid transition-colors duration-1000 opacity-60"
                style={{ borderColor: `${activeSkin.themeColor}33` }}
              />
              <div 
                className="absolute inset-4 rounded-full blur-2xl transition-all duration-1000"
                style={{ backgroundColor: `${activeSkin.themeColor}22` }}
              />
            </div>

            {/* Render 3D Cards */}
            <AnimatePresence initial={false}>
              {filteredProjects.map((project, i) => {
                const params = getCardTransform(i);
                const skin = PROJECT_SKINS[projects.indexOf(project) % PROJECT_SKINS.length];
                const isActive = i === activeIndex;

                return (
                  <motion.div
                    key={project.title}
                    className="absolute rounded-[28px] overflow-hidden"
                    style={{
                      width: isMobile ? '230px' : isTablet ? '290px' : '350px',
                      height: isMobile ? '310px' : isTablet ? '380px' : '450px',
                      transformOrigin: 'center center',
                    }}
                    animate={{
                      x: params.x,
                      z: params.z,
                      scale: params.scale,
                      rotateY: params.rotateY,
                      opacity: params.opacity,
                      filter: params.filter,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 110,
                      damping: 18,
                    }}
                    onClick={() => {
                      if (!isActive) {
                        setActiveIndex(i);
                      }
                    }}
                  >
                    {/* The Premium Project Canister layout */}
                    <div 
                      onMouseMove={isActive ? handleActiveMouseMove : undefined}
                      onMouseLeave={isActive ? handleActiveMouseLeave : undefined}
                      onMouseEnter={() => {
                        if (isActive) setIsHoveringActive(true);
                      }}
                      className={`relative w-full h-full rounded-[28px] border bg-gradient-to-b ${skin.bgGradient} ${skin.borderColor} overflow-hidden backdrop-blur-lg flex flex-col justify-between p-6 transition-all duration-700 ${
                        isActive ? `${skin.shadowNeon} border-white/20` : 'border-white/5'
                      }`}
                      style={isActive ? {
                        transform: `rotateX(${activeTilt.x}deg) rotateY(${activeTilt.y}deg) translateZ(10px)`,
                        transition: 'none'
                      } : {
                        transform: 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
                        transition: 'all 0.6s ease'
                      }}
                    >
                      {/* Subtly animated active glare reflection */}
                      <div 
                        className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay transition-opacity duration-300"
                        style={{
                          background: (isActive && isHoveringActive)
                            ? `radial-gradient(circle at ${activeGlare.x}% ${activeGlare.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`
                            : 'linear-gradient(to bottom, rgba(255,255,255,0.05), transparent 70%)'
                        }}
                      />

                      {/* Decoupled cover image banner in background */}
                      <div className="absolute inset-0 -z-10 overflow-hidden rounded-[28px]">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                          referrerPolicy="referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020306] via-navy-950/75 to-navy-950/30" />
                      </div>

                      {/* Card Header: Industry & System Metadata */}
                      <div className="flex justify-between items-center relative z-10">
                        <span className="text-[9px] font-mono text-white/40 tracking-wider">
                          REV-{(1.2 + i * 0.1).toFixed(1)}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-white/5 border border-white/10 ${skin.accentText}`}>
                          {project.domain || "SaaS"}
                        </span>
                      </div>

                      {/* Card Bottom: Core summary */}
                      <div className="space-y-4 relative z-10">
                        <div className="space-y-1">
                          <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">PRODUCT INTERFACE</p>
                          <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                            {project.title}
                          </h3>
                        </div>
                        
                        {/* Technology Badges inside the carousel card (limited to 3) */}
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((t) => (
                            <span 
                              key={t} 
                              className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/5 text-white/60"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <div className="text-center text-muted-slate py-12">
                <Info className="mx-auto mb-3 opacity-40" size={28} />
                <p className="text-sm">No engineering projects found in this vertical.</p>
              </div>
            )}
          </motion.div>

          {/* Navigation Controls: Arrows + Dot indicators */}
          {filteredProjects.length > 0 && (
            <div className="flex items-center gap-6 mt-8 z-20">
              <button
                onClick={prevProject}
                className="w-12 h-12 rounded-full border border-white/5 bg-navy-950/60 hover:bg-navy-900 flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg backdrop-blur-sm"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Minimal Dot Indicators */}
              <div className="flex gap-2">
                {filteredProjects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className="w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer"
                    style={{
                      backgroundColor: idx === activeIndex ? activeSkin.themeColor : 'rgba(255, 255, 255, 0.1)',
                      transform: idx === activeIndex ? 'scale(1.2)' : 'scale(1)',
                      boxShadow: idx === activeIndex ? `0 0 10px ${activeSkin.themeColor}` : 'none'
                    }}
                  />
                ))}
              </div>

              <button
                onClick={nextProject}
                className="w-12 h-12 rounded-full border border-white/5 bg-navy-950/60 hover:bg-navy-900 flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg backdrop-blur-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Cinematic Active Project Information Panel displayed below the Carousel */}
        {activeProject && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.title}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-5xl mt-16 bg-navy-950/30 border border-white/5 rounded-[32px] p-8 md:p-12 backdrop-blur-md relative overflow-hidden mx-auto"
            >
              {/* Dynamic light emission casting inside the details panel */}
              <div 
                className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full blur-[140px] opacity-[0.12] transition-all duration-1000 pointer-events-none"
                style={{ backgroundColor: activeSkin.themeColor }}
              />

              <div className="grid lg:grid-cols-12 gap-10 md:gap-14 relative z-10">
                {/* Left Column: Business Problem & Solutions */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.25em] ${activeSkin.accentText}`}>
                      CORE MISSION & SOLUTION
                    </span>
                    <h4 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                      {activeProject.title}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest font-bold">
                      Business Problem Solved
                    </p>
                    <p className="text-muted-slate text-sm md:text-base leading-relaxed whitespace-pre-line font-sans">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Industry Vertical box */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 max-w-md">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Activity size={20} style={{ color: activeSkin.themeColor }} />
                    </div>
                    <div>
                      <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider">Industry Domain</p>
                      <p className="text-sm font-bold text-white">{activeProject.domain || 'Enterprise SaaS'}</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Complete Technologies & Actions */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-8 lg:space-y-0">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest font-bold mb-3">
                        Technologies Used
                      </p>
                      {/* Fully Display all (5-7) Core Technologies badges */}
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tech.map((t) => (
                          <span 
                            key={t} 
                            className="text-[10px] font-bold text-white/80 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/40 font-mono">
                        <Sparkles size={13} style={{ color: activeSkin.themeColor }} />
                        <span>Core Operational Capability</span>
                      </div>
                      <p className="text-xs text-muted-slate leading-relaxed">
                        Engineered with type safety, robust async queues, performance optimizations, and native error handlers for industrial workloads.
                      </p>
                    </div>
                  </div>

                  {/* Core Interactive Action Buttons */}
                  <div className="space-y-3 pt-6 border-t border-white/5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Live Demo Button */}
                      <a 
                        href={activeProject.liveLink || activeProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-center text-[11px] font-bold uppercase tracking-widest text-navy-950 transition-all duration-300 transform active:scale-95 shadow-md hover:scale-[1.02] cursor-pointer"
                        style={{ backgroundColor: activeSkin.themeColor }}
                      >
                        <Globe size={14} className="shrink-0" />
                        <span>Live Demo</span>
                      </a>

                      {/* GitHub Button */}
                      <a 
                        href={activeProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-center text-[11px] font-bold uppercase tracking-widest text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform active:scale-95 hover:scale-[1.02] cursor-pointer"
                      >
                        <Github size={14} className="shrink-0" />
                        <span>GitHub</span>
                      </a>

                      {/* View Case Study Button */}
                      <Link 
                        to={`/portfolio/case-study?id=${projects.indexOf(activeProject)}`}
                        className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-center text-[11px] font-bold uppercase tracking-widest text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform active:scale-95 hover:scale-[1.02] cursor-pointer animate-pulse"
                        style={{ animationDuration: '3s' }}
                      >
                        <BookOpen size={14} className="shrink-0" />
                        <span>Case Study</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
