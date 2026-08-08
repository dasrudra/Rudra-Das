import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Github, 
  BookOpen,
  Info,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { projects } from '../constants';
import { ProjectVisualMockup } from './ProjectVisualMockup';
import { SkillLogoBadge } from './SkillLogoBadge';

interface ProjectSkin {
  themeColor: string;
  bgGradient: string;
  borderColor: string;
  labelText: string;
  accentText: string;
  shadowGlow: string;
}

const PROJECT_SKINS: ProjectSkin[] = [
  {
    themeColor: '#5FB3B3', // Muted Teal - DistractCheck (AI Benchmark)
    bgGradient: 'from-[#5FB3B3]/15 via-[#141D30] to-[#0B1220]',
    borderColor: 'border-[#5FB3B3]/40 hover:border-[#5FB3B3]/60',
    labelText: 'AI RESEARCH',
    accentText: 'text-[#5FB3B3]',
    shadowGlow: 'shadow-[0_0_35px_rgba(95,179,179,0.2)]',
  },
  {
    themeColor: '#5FB3B3', // Muted Teal - Smart AI Detection
    bgGradient: 'from-[#5FB3B3]/15 via-[#141D30] to-[#0B1220]',
    borderColor: 'border-[#5FB3B3]/40 hover:border-[#5FB3B3]/60',
    labelText: 'COMPUTER VISION',
    accentText: 'text-[#5FB3B3]',
    shadowGlow: 'shadow-[0_0_35px_rgba(95,179,179,0.2)]',
  },
  {
    themeColor: '#E0995A', // Warm Amber - Odoo ERP Fund Management
    bgGradient: 'from-[#E0995A]/15 via-[#141D30] to-[#0B1220]',
    borderColor: 'border-[#E0995A]/40 hover:border-[#E0995A]/60',
    labelText: 'ERP SYSTEM',
    accentText: 'text-[#E0995A]',
    shadowGlow: 'shadow-[0_0_35px_rgba(224,153,90,0.2)]',
  },
  {
    themeColor: '#E0995A', // Warm Amber - Ledger / Accounting
    bgGradient: 'from-[#E0995A]/15 via-[#141D30] to-[#0B1220]',
    borderColor: 'border-[#E0995A]/40 hover:border-[#E0995A]/60',
    labelText: 'FINTECH & ENTERPRISE',
    accentText: 'text-[#E0995A]',
    shadowGlow: 'shadow-[0_0_35px_rgba(224,153,90,0.2)]',
  },
  {
    themeColor: '#E0995A', // Warm Amber - Meta Ads Scraper
    bgGradient: 'from-[#E0995A]/15 via-[#141D30] to-[#0B1220]',
    borderColor: 'border-[#E0995A]/40 hover:border-[#E0995A]/60',
    labelText: 'AUTOMATION',
    accentText: 'text-[#E0995A]',
    shadowGlow: 'shadow-[0_0_35px_rgba(224,153,90,0.2)]',
  },
  {
    themeColor: '#5FB3B3', // Muted Teal - Speech Emotion
    bgGradient: 'from-[#5FB3B3]/15 via-[#141D30] to-[#0B1220]',
    borderColor: 'border-[#5FB3B3]/40 hover:border-[#5FB3B3]/60',
    labelText: 'AUDIO AI',
    accentText: 'text-[#5FB3B3]',
    shadowGlow: 'shadow-[0_0_35px_rgba(95,179,179,0.2)]',
  },
  {
    themeColor: '#E0995A', // Warm Amber - FocusDeck Productivity
    bgGradient: 'from-[#E0995A]/15 via-[#141D30] to-[#0B1220]',
    borderColor: 'border-[#E0995A]/40 hover:border-[#E0995A]/60',
    labelText: 'PRODUCTIVITY',
    accentText: 'text-[#E0995A]',
    shadowGlow: 'shadow-[0_0_35px_rgba(224,153,90,0.2)]',
  },
  {
    themeColor: '#E0995A', // Warm Amber - Hotel Management
    bgGradient: 'from-[#E0995A]/15 via-[#141D30] to-[#0B1220]',
    borderColor: 'border-[#E0995A]/40 hover:border-[#E0995A]/60',
    labelText: 'WEB APP',
    accentText: 'text-[#E0995A]',
    shadowGlow: 'shadow-[0_0_35px_rgba(224,153,90,0.2)]',
  },
  {
    themeColor: '#5FB3B3', // Muted Teal - Sentiment Model
    bgGradient: 'from-[#5FB3B3]/15 via-[#141D30] to-[#0B1220]',
    borderColor: 'border-[#5FB3B3]/40 hover:border-[#5FB3B3]/60',
    labelText: 'NLP MODEL',
    accentText: 'text-[#5FB3B3]',
    shadowGlow: 'shadow-[0_0_35px_rgba(95,179,179,0.2)]',
  },
  {
    themeColor: '#E0995A', // Warm Amber - Frontend
    bgGradient: 'from-[#E0995A]/15 via-[#141D30] to-[#0B1220]',
    borderColor: 'border-[#E0995A]/40 hover:border-[#E0995A]/60',
    labelText: 'FRONTEND',
    accentText: 'text-[#E0995A]',
    shadowGlow: 'shadow-[0_0_35px_rgba(224,153,90,0.2)]',
  },
  {
    themeColor: '#5FB3B3', // Muted Teal - Apple Quality Research
    bgGradient: 'from-[#5FB3B3]/15 via-[#141D30] to-[#0B1220]',
    borderColor: 'border-[#5FB3B3]/40 hover:border-[#5FB3B3]/60',
    labelText: 'DATA SCIENCE RESEARCH',
    accentText: 'text-[#5FB3B3]',
    shadowGlow: 'shadow-[0_0_35px_rgba(95,179,179,0.2)]',
  },
];

const categories = ['All', 'AI', 'ERP', 'Full Stack', 'Research', 'Productivity', 'Automation'];

interface ProjectsStageCarouselProps {
  title?: string;
  subtitle?: string;
  showPortfolioCTA?: boolean;
}

export const ProjectsStageCarousel: React.FC<ProjectsStageCarouselProps> = ({
  title = "All Projects",
  subtitle = "An authentic showcase of enterprise modules, AI benchmarks, and open-source utilities — formatted with accurate status badges and verified project repositories.",
  showPortfolioCTA = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const [activeTilt, setActiveTilt] = useState({ x: 0, y: 0 });
  const [activeGlare, setActiveGlare] = useState({ x: 50, y: 50 });
  const [isHoveringActive, setIsHoveringActive] = useState(false);

  const lastWheelTime = useRef(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProjects = projects.filter(project => {
    if (selectedCategory === 'All') return true;
    
    const domainLower = (project.domain || '').toLowerCase();
    const titleLower = project.title.toLowerCase();
    const descLower = project.description.toLowerCase();
    
    if (selectedCategory === 'AI') {
      return domainLower.includes('ai') || domainLower.includes('vision') || descLower.includes('llm') || descLower.includes('machine learning');
    }
    if (selectedCategory === 'ERP') {
      return domainLower.includes('erp') || titleLower.includes('odoo') || titleLower.includes('hotel') || descLower.includes('erp');
    }
    if (selectedCategory === 'Full Stack') {
      return domainLower.includes('fintech') || domainLower.includes('web') || titleLower.includes('ledger') || titleLower.includes('udemy');
    }
    if (selectedCategory === 'Research') {
      return domainLower.includes('research') || domainLower.includes('science') || titleLower.includes('prediction') || titleLower.includes('distract');
    }
    if (selectedCategory === 'Productivity') {
      return domainLower.includes('productivity') || titleLower.includes('focusdeck') || titleLower.includes('extension');
    }
    if (selectedCategory === 'Automation') {
      return domainLower.includes('automation') || titleLower.includes('scraper') || descLower.includes('scrape');
    }
    
    return false;
  });

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

  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 650) return;
    if (Math.abs(e.deltaY) < 12) return;

    if (e.deltaY > 0) {
      nextProject();
      lastWheelTime.current = now;
    } else if (e.deltaY < 0) {
      prevProject();
      lastWheelTime.current = now;
    }
  };

  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 60;
    if (info.offset.x < -threshold) {
      nextProject();
    } else if (info.offset.x > threshold) {
      prevProject();
    }
  };

  const handleActiveMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    
    setActiveTilt({ x: normY * -10, y: normX * 10 });
    setActiveGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleActiveMouseLeave = () => {
    setActiveTilt({ x: 0, y: 0 });
    setActiveGlare({ x: 50, y: 50 });
    setIsHoveringActive(false);
  };

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const activeProject = filteredProjects[activeIndex] || null;
  const activeSkin = activeProject 
    ? PROJECT_SKINS[projects.indexOf(activeProject) % PROJECT_SKINS.length]
    : PROJECT_SKINS[0];

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

    let x = 0;
    if (offset !== 0) {
      const spacing = isMobile ? 120 : isTablet ? 210 : 300;
      x = offset * spacing;
    }

    if (isActive) {
      return {
        x: 0,
        z: 0,
        scale: 1.0,
        rotateY: 0,
        opacity: 1,
        filter: 'blur(0px)',
        zIndex: 100,
      };
    } else if (absOffset === 1) {
      return {
        x,
        z: -120,
        scale: 0.82,
        rotateY: offset > 0 ? -28 : 28,
        opacity: 0.45,
        filter: 'blur(1px)',
        zIndex: 80,
      };
    } else if (absOffset === 2) {
      return {
        x,
        z: -220,
        scale: 0.68,
        rotateY: offset > 0 ? -38 : 38,
        opacity: 0.2,
        filter: 'blur(3px)',
        zIndex: 60,
      };
    } else {
      return {
        x,
        z: -320,
        scale: 0.5,
        rotateY: offset > 0 ? -45 : 45,
        opacity: 0,
        filter: 'blur(6px)',
        zIndex: 10,
      };
    }
  };

  return (
    <section id="all-projects" className="py-12 md:py-20 relative overflow-hidden bg-[#0B1220]">
      {/* Restrained Ambient Glow */}
      <div 
        className="absolute inset-0 transition-all duration-700 pointer-events-none opacity-20 blur-[130px]"
        style={{ background: `radial-gradient(circle at 50% 40%, ${activeSkin.themeColor} 0%, transparent 65%)` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <span className="px-3.5 py-1 rounded-full bg-[#141D30] border border-[#2A3348] text-[10px] font-mono font-bold tracking-[0.2em] text-[#E0995A] uppercase mb-2 inline-block">
            SYSTEMS ARCHITECTURE & REPOSITORIES
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-[#EDEAE3] mb-2">
            {title}
          </h2>
          <p className="text-[#8B93A6] text-sm md:text-base leading-relaxed font-sans">
            {subtitle}
          </p>
        </motion.div>

        {/* Category Filter Pills - Monospace per typography spec */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all duration-300 relative ${
                  isSelected
                    ? 'text-[#EDEAE3] bg-[#141D30] border border-[#E0995A]/60 shadow-lg'
                    : 'text-[#8B93A6] hover:text-[#EDEAE3] bg-[#141D30]/50 border border-[#2A3348] hover:bg-[#141D30]'
                }`}
              >
                {category.toUpperCase()}
                {isSelected && (
                  <motion.div
                    layoutId="stageActiveCategory"
                    className="absolute inset-0 rounded-xl bg-[#E0995A]/15 border border-[#E0995A]/40 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Interactive 3D Stage Carousel */}
        <div 
          className="relative h-[460px] md:h-[500px] flex items-center justify-center perspective-[1200px] my-4 select-none"
          onWheel={handleWheel}
        >
          <AnimatePresence initial={false}>
            {filteredProjects.map((project, index) => {
              const transform = getCardTransform(index);
              const skin = PROJECT_SKINS[projects.indexOf(project) % PROJECT_SKINS.length];
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={project.title}
                  className="absolute w-[300px] sm:w-[360px] md:w-[410px] h-[370px] sm:h-[410px] md:h-[440px] cursor-pointer"
                  style={{
                    zIndex: transform.zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                  initial={false}
                  animate={{
                    x: transform.x,
                    z: transform.z,
                    scale: transform.scale,
                    rotateY: transform.rotateY,
                    opacity: transform.opacity,
                    filter: transform.filter,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 180,
                    damping: 24,
                    mass: 0.8,
                  }}
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  onClick={() => setActiveIndex(index)}
                  onMouseMove={isActive ? handleActiveMouseMove : undefined}
                  onMouseEnter={isActive ? () => setIsHoveringActive(true) : undefined}
                  onMouseLeave={isActive ? handleActiveMouseLeave : undefined}
                >
                  <div 
                    className={`w-full h-full rounded-2xl border p-5 md:p-6 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-gradient-to-b ${skin.bgGradient} ${skin.borderColor} ${isActive ? skin.shadowGlow : 'shadow-xl'}`}
                    style={
                      isActive && isHoveringActive
                        ? {
                            transform: `rotateX(${activeTilt.x}deg) rotateY(${activeTilt.y}deg)`,
                            transition: 'transform 0.1s ease-out',
                          }
                        : undefined
                    }
                  >
                    {/* Active Glare Light Effect */}
                    {isActive && (
                      <div
                        className="absolute inset-0 pointer-events-none opacity-15 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at ${activeGlare.x}% ${activeGlare.y}%, rgba(255,255,255,0.6) 0%, transparent 60%)`,
                        }}
                      />
                    )}

                    {/* Top Status & Domain Bar */}
                    <div className="flex items-center justify-between gap-2 relative z-10">
                      <span className={`text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-md bg-[#0B1220]/80 border border-[#2A3348] uppercase ${skin.accentText}`}>
                        {skin.labelText}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0B1220]/60 border border-[#2A3348] text-[#EDEAE3]/70">
                          {project.status || 'Active'}
                        </span>
                        <div 
                          className="w-2.5 h-2.5 rounded-full animate-ping opacity-75" 
                          style={{ backgroundColor: skin.themeColor }}
                        />
                      </div>
                    </div>

                    {/* Middle Visual Preview */}
                    <div className="my-2 relative z-10 flex-1 flex flex-col justify-center">
                      <ProjectVisualMockup 
                        project={project} 
                        themeColor={skin.themeColor} 
                        className="h-[170px] sm:h-[190px]" 
                      />
                    </div>

                    {/* Card Title & Brief */}
                    <div className="relative z-10">
                      <h3 className="text-base sm:text-lg font-display font-bold text-[#EDEAE3] tracking-tight line-clamp-1 mb-1">
                        {project.title}
                      </h3>
                      <p className="text-[#8B93A6] text-xs line-clamp-2 leading-relaxed font-sans">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Stage Navigation & Controls */}
        <div className="flex items-center justify-between max-w-xl mx-auto mt-2 px-4">
          <button
            onClick={prevProject}
            className="p-3 rounded-full bg-[#141D30] border border-[#2A3348] hover:border-[#E0995A]/50 text-[#EDEAE3] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-2 max-w-[280px] sm:max-w-md no-scrollbar">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIndex
                    ? 'w-7 bg-[#E0995A] shadow-[0_0_10px_rgba(224,153,90,0.6)]'
                    : 'w-1.5 bg-[#2A3348] hover:bg-[#8B93A6]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextProject}
            className="p-3 rounded-full bg-[#141D30] border border-[#2A3348] hover:border-[#E0995A]/50 text-[#EDEAE3] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Detailed Info Sheet for Active Project */}
        {activeProject && (
          <motion.div
            key={activeProject.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 max-w-4xl mx-auto rounded-2xl border border-[#2A3348] p-6 md:p-8 bg-[#141D30] relative overflow-hidden shadow-2xl"
          >
            <div 
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ backgroundColor: activeSkin.themeColor }}
            />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#2A3348]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-mono font-bold ${activeSkin.accentText}`}>
                    PROJECT #{projects.indexOf(activeProject) + 1} OF {projects.length}
                  </span>
                  <span className="text-[#8B93A6]">•</span>
                  <span className="text-xs font-mono text-[#8B93A6]">{activeProject.domain}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-[#EDEAE3] tracking-tight">
                  {activeProject.title}
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {(activeProject.github || activeProject.link) && (
                  <a
                    href={activeProject.github || activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#0B1220] border border-[#2A3348] hover:border-[#E0995A]/50 text-[#EDEAE3] text-xs font-mono font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <Github size={15} />
                    <span>Project Repository</span>
                  </a>
                )}
                <Link
                  to={`/portfolio/case-study?id=${projects.indexOf(activeProject)}`}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E0995A] to-[#5FB3B3] text-[#0B1220] font-mono font-bold text-xs flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(224,153,90,0.3)] group cursor-pointer"
                >
                  <BookOpen size={15} className="group-hover:rotate-6 transition-transform" />
                  <span>Case Study</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Tech Stack Pills & Description */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-3">
                <h4 className="text-xs font-mono font-bold text-[#8B93A6] uppercase tracking-wider flex items-center gap-2">
                  <Info size={14} className="text-[#E0995A]" />
                  Engineering Details
                </h4>
                <p className="text-[#EDEAE3]/90 text-sm leading-relaxed font-sans">
                  {activeProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-[#8B93A6] uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Layers size={14} className="text-[#E0995A]" />
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tech.map((t) => (
                    <SkillLogoBadge key={t} skill={t} size="sm" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Portfolio CTA */}
        {showPortfolioCTA && (
          <div className="mt-14 text-center">
            <Link
              to="/portfolio"
              className="relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#141D30] border border-[#E0995A]/60 hover:border-[#E0995A] text-[#EDEAE3] font-mono text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 group shadow-[0_0_25px_rgba(224,153,90,0.15)] overflow-hidden cursor-pointer"
            >
              <Sparkles size={18} className="text-[#E0995A] relative z-10 group-hover:rotate-12 transition-transform" />
              <span className="relative z-10 text-[#EDEAE3] group-hover:text-[#E0995A] transition-colors tracking-wide">
                Explore All Projects & Architecture Deep Dives
              </span>
              <ArrowUpRight size={18} className="text-[#E0995A] relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};
