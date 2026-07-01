import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  Play, 
  Pause,
  Compass,
  Sparkles,
  Info,
  Layers,
  Activity
} from 'lucide-react';
import { projects } from '../constants';

// Aesthetic premium skins for each project canister to make them distinct, matching the video's neon energy theme
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
    borderColor: 'border-emerald-500/40',
    glowColor: 'bg-emerald-500/10',
    labelText: 'ERP SYSTEM',
    accentText: 'text-emerald-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(16,185,129,0.3)]',
  },
  {
    themeColor: '#3b82f6', // Blue - Ledger / Accounting
    bgGradient: 'from-blue-500/20 via-blue-950/40 to-navy-950/90',
    borderColor: 'border-blue-500/40',
    glowColor: 'bg-blue-500/10',
    labelText: 'FINTECH',
    accentText: 'text-blue-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(59,130,246,0.3)]',
  },
  {
    themeColor: '#f59e0b', // Amber - FocusDeck Productivity
    bgGradient: 'from-amber-500/20 via-amber-950/40 to-navy-950/90',
    borderColor: 'border-amber-500/40',
    glowColor: 'bg-amber-500/10',
    labelText: 'PRODUCTIVITY',
    accentText: 'text-amber-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(245,158,11,0.3)]',
  },
  {
    themeColor: '#ef4444', // Red - DistractCheck Attention
    bgGradient: 'from-red-500/20 via-red-950/40 to-navy-950/90',
    borderColor: 'border-red-500/40',
    glowColor: 'bg-red-500/10',
    labelText: 'RESEARCH AI',
    accentText: 'text-red-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(239,68,68,0.3)]',
  },
  {
    themeColor: '#a855f7', // Purple - YOLO v8 Computer Vision
    bgGradient: 'from-purple-500/20 via-purple-950/40 to-navy-950/90',
    borderColor: 'border-purple-500/40',
    glowColor: 'bg-purple-500/10',
    labelText: 'YOLO VISION',
    accentText: 'text-purple-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(168,85,247,0.3)]',
  },
  {
    themeColor: '#0d9488', // Teal - Hotel Management
    bgGradient: 'from-teal-500/20 via-teal-950/40 to-navy-950/90',
    borderColor: 'border-teal-500/40',
    glowColor: 'bg-teal-500/10',
    labelText: 'ERP WORKFLOW',
    accentText: 'text-teal-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(13,148,136,0.3)]',
  },
  {
    themeColor: '#ec4899', // Pink - Sentiment Model
    bgGradient: 'from-pink-500/20 via-pink-950/40 to-navy-950/90',
    borderColor: 'border-pink-500/40',
    glowColor: 'bg-pink-500/10',
    labelText: 'SENTIMENT',
    accentText: 'text-pink-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(236,72,153,0.3)]',
  },
  {
    themeColor: '#8b5cf6', // Violet - Speech Emotion
    bgGradient: 'from-violet-500/20 via-violet-950/40 to-navy-950/90',
    borderColor: 'border-violet-500/40',
    glowColor: 'bg-violet-500/10',
    labelText: 'AUDIO ML',
    accentText: 'text-violet-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(139,92,246,0.3)]',
  },
  {
    themeColor: '#06b6d4', // Cyan - Udemy Web Dev
    bgGradient: 'from-cyan-500/20 via-cyan-950/40 to-navy-950/90',
    borderColor: 'border-cyan-500/40',
    glowColor: 'bg-cyan-500/10',
    labelText: 'WEB ENGINE',
    accentText: 'text-cyan-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(6,182,212,0.3)]',
  },
  {
    themeColor: '#84cc16', // Lime - Apple Quality research
    bgGradient: 'from-lime-500/20 via-lime-950/40 to-navy-950/90',
    borderColor: 'border-lime-500/40',
    glowColor: 'bg-lime-500/10',
    labelText: 'DATA SCIENCE',
    accentText: 'text-lime-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(132,204,22,0.3)]',
  },
  {
    themeColor: '#f43f5e', // Rose - Meta Ads Scraper
    bgGradient: 'from-rose-500/20 via-rose-950/40 to-navy-950/90',
    borderColor: 'border-rose-500/40',
    glowColor: 'bg-rose-500/10',
    labelText: 'WEB SCRAPER',
    accentText: 'text-rose-400',
    shadowNeon: 'shadow-[0_0_50px_rgba(244,63,94,0.3)]',
  },
];

const SectionHeading = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="max-w-3xl mb-12 text-center mx-auto px-4"
  >
    <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">{title}</h2>
    <p className="text-muted-slate text-base md:text-lg leading-relaxed">{subtitle}</p>
  </motion.div>
);

// Individual component for high-fidelity Grid card with 3D Mouse Tilt effect
const GridTiltCard: React.FC<{ project: any; skin: ProjectSkin; index: number }> = ({ project, skin, index }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates (-0.5 to 0.5)
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    
    // Apply limited tilt physics (max 12 degrees)
    setTilt({
      x: normY * -12,
      y: normX * 12
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col justify-between bg-navy-900/10 border border-white/5 hover:border-white/10 rounded-[32px] overflow-hidden p-6 hover:bg-navy-900/20 transition-all duration-500 relative"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'none' : 'transform 0.5s ease, box-shadow 0.5s ease',
        boxShadow: isHovered ? `0 20px 40px ${skin.themeColor}15` : 'none',
      }}
    >
      <div className="space-y-5">
        {/* Thumbnail frame with hover zoom */}
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/5 bg-navy-950/80">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Specular glare gradient shifting on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
            {project.link && (
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-accent-primary text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all accent-glow"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Info & Tech */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map(t => (
              <span key={t} className="text-[9px] font-bold uppercase tracking-wider text-accent-primary bg-accent-primary/10 px-2.5 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-bold group-hover:text-accent-primary transition-colors flex items-center gap-1.5">
            {project.title}
            <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0" />
          </h3>
          <p className="text-muted-slate text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-center">
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest font-mono">
          SKIN: {skin.labelText.split(' ')[0]}
        </span>
        {project.link && (
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-accent-primary hover:underline flex items-center gap-1"
          >
            Codebase
            <ExternalLink size={12} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const PortfolioPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'stage' | 'grid'>('stage');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playSpeed, setPlaySpeed] = useState<number>(4500); // ms per rotation

  // Active Canister interactive tilt states
  const [activeTilt, setActiveTilt] = useState({ x: 0, y: 0 });
  const [activeGlare, setActiveGlare] = useState({ x: 50, y: 50 });
  const activeCanisterRef = useRef<HTMLDivElement>(null);

  // Background floating 3D dust particles state
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; speed: number; opacity: number }>>([]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate perspective starfields/particles
  useEffect(() => {
    const generated = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.45 + 0.15,
    }));
    setParticles(generated);
  }, []);

  // Autoplay loop timer
  useEffect(() => {
    if (!isPlaying || viewMode !== 'stage') return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, playSpeed);
    return () => clearInterval(interval);
  }, [isPlaying, playSpeed, viewMode]);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleActiveCanisterMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!activeCanisterRef.current) return;
    const rect = activeCanisterRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    
    setActiveTilt({
      x: normY * -16, // Rotate X
      y: normX * 16,  // Rotate Y
    });

    setActiveGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleActiveCanisterMouseLeave = () => {
    setActiveTilt({ x: 0, y: 0 });
    setActiveGlare({ x: 50, y: 50 });
  };

  const isMobile = windowWidth < 768;

  // Render project parameters in the 3D space with enhanced depth (Z axis spacing)
  const getCardTransform = (index: number) => {
    let offset = index - activeIndex;
    const count = projects.length;
    const half = Math.floor(count / 2);

    // Circular wrapping offset calculation
    if (offset > half) offset -= count;
    if (offset < -half) offset += count;

    const absOffset = Math.abs(offset);

    // Skip rendering if too far to maintain beautiful focused spacing
    if (absOffset > 3) {
      return {
        x: offset > 0 ? 1200 : -1200,
        z: -600,
        scale: 0,
        opacity: 0,
        rotateY: offset * 50,
        zIndex: 0,
        pointerEvents: 'none' as const,
      };
    }

    // Curved virtual cylinder positions
    const angleStep = isMobile ? 0.62 : 0.44;
    const radiusX = isMobile ? 190 : 410;
    const radiusZ = isMobile ? 120 : 250;

    const x = Math.sin(offset * angleStep) * radiusX;
    const z = (Math.cos(offset * angleStep) - 1) * radiusZ;
    const scale = Math.max(0.35, 1 - absOffset * (isMobile ? 0.24 : 0.18));
    const opacity = Math.max(0, 1 - absOffset * (isMobile ? 0.38 : 0.3));
    const rotateY = -offset * (isMobile ? 35 : 26);
    const y = absOffset * (isMobile ? 18 : 24); // Beautiful curved stage arc elevation

    return {
      x,
      y,
      z,
      scale,
      opacity,
      rotateY,
      zIndex: 100 - absOffset * 10,
      pointerEvents: absOffset === 0 ? ('auto' as const) : ('none' as const),
    };
  };

  const activeSkin = PROJECT_SKINS[activeIndex % PROJECT_SKINS.length];

  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-[#020306]">
      {/* Background Neon Spotlight dynamic ambiance matching the active project */}
      <div 
        className="absolute inset-0 transition-all duration-1000 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${activeSkin.themeColor} 0%, transparent 65%)`
        }}
      />
      
      {/* Interactive Floating Space Dust in 3D Stage */}
      {viewMode === 'stage' && (
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
                boxShadow: `0 0 10px ${activeSkin.themeColor}`,
                filter: 'blur(0.5px)'
              }}
              animate={{
                y: [0, -120, 0],
                x: [0, Math.sin(p.id) * 40, 0],
              }}
              transition={{
                duration: 12 + p.speed * 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />

      <div className="section-padding relative z-10 max-w-7xl mx-auto">
        <SectionHeading 
          title="3D Project Stage" 
          subtitle="Explore highly scalable modules, real-world systems, and custom Odoo ERP architecture in our futuristic 3D showcase."
        />

        {/* Dynamic Controls Hub */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-navy-950/20 p-4 border border-white/5 rounded-full px-6 max-w-4xl mx-auto backdrop-blur-sm">
          {/* View Mode Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('stage')}
              id="view-stage-btn"
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                viewMode === 'stage'
                  ? 'bg-accent-primary text-white border-accent-primary accent-glow'
                  : 'bg-navy-950/50 text-muted-slate border-white/5 hover:border-white/20'
              }`}
            >
              <Compass size={14} className={viewMode === 'stage' ? 'animate-spin' : ''} />
              3D Stage
            </button>
            <button
              onClick={() => setViewMode('grid')}
              id="view-grid-btn"
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                viewMode === 'grid'
                  ? 'bg-accent-primary text-white border-accent-primary accent-glow'
                  : 'bg-navy-950/50 text-muted-slate border-white/5 hover:border-white/20'
              }`}
            >
              <LayoutGrid size={14} />
              Classic Grid
            </button>
          </div>

          {/* Autoplay Dial Controls (Only visible in Stage view) */}
          {viewMode === 'stage' && (
            <div className="flex items-center gap-6">
              {/* Autoplay Play/Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                id="toggle-autoplay-btn"
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white bg-white/5 hover:bg-white/10 px-4 py-2 border border-white/5 rounded-full transition-all"
              >
                {isPlaying ? <Pause size={12} className="text-accent-primary" /> : <Play size={12} />}
                {isPlaying ? 'Autoplay On' : 'Autoplay Off'}
              </button>

              {/* Speed Controller */}
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black tracking-widest text-muted-slate uppercase">Speed:</span>
                <select
                  value={playSpeed}
                  onChange={(e) => setPlaySpeed(Number(e.target.value))}
                  id="autoplay-speed-select"
                  className="bg-navy-950 border border-white/10 text-white text-[10px] uppercase tracking-widest font-bold py-1 px-2.5 rounded-full outline-none focus:border-accent-primary transition-all cursor-pointer"
                >
                  <option value={6000}>Cine (6s)</option>
                  <option value={4500}>Fast (4.5s)</option>
                  <option value={3000}>Turbo (3s)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'stage' ? (
            <motion.div
              key="stage-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              {/* Perspective 3D Stage Container */}
              <div 
                className="relative w-full flex items-center justify-center select-none"
                style={{ 
                  height: isMobile ? '380px' : '520px',
                  perspective: '1300px',
                  perspectiveOrigin: '50% 28%'
                }}
              >
                {/* 3D Floor Grid with Perspective Pedestal Reflection */}
                <div 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[700px] h-[320px] pointer-events-none transition-all duration-1000 opacity-60"
                  style={{
                    transform: 'rotateX(82deg) translateY(60px)',
                    background: `radial-gradient(ellipse at center, ${activeSkin.themeColor}38 0%, transparent 70%)`
                  }}
                />

                {/* Concentric Neon Rings glowing pedestal under the active canister */}
                <div 
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 h-24 pointer-events-none transition-all duration-1000 animate-pulse"
                  style={{
                    transform: 'rotateX(75deg)',
                  }}
                >
                  <motion.div 
                    animate={{ scale: [0.93, 1.18, 0.93], opacity: [0.35, 0.9, 0.35] }}
                    transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-full border-2 border-dashed transition-colors duration-1000"
                    style={{ borderColor: activeSkin.themeColor }}
                  />
                  <motion.div 
                    animate={{ scale: [1.15, 0.82, 1.15], opacity: [0.4, 0.95, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
                    className="absolute -inset-6 rounded-full border border-solid transition-colors duration-1000"
                    style={{ borderColor: activeSkin.themeColor }}
                  />
                  <div 
                    className="absolute inset-4 rounded-full blur-2xl transition-all duration-1000"
                    style={{ backgroundColor: `${activeSkin.themeColor}33` }}
                  />
                </div>

                {/* Carousel Project Canisters */}
                <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
                  {projects.map((project, i) => {
                    const params = getCardTransform(i);
                    const skin = PROJECT_SKINS[i % PROJECT_SKINS.length];
                    const isActive = i === activeIndex;

                    return (
                      <motion.div
                        key={i}
                        className="absolute cursor-pointer transition-shadow duration-500 rounded-[36px]"
                        style={{
                          width: isMobile ? '160px' : '230px',
                          height: isMobile ? '280px' : '410px',
                          transformOrigin: 'center center',
                          pointerEvents: 'auto',
                        }}
                        animate={{
                          x: params.x,
                          y: params.y,
                          scale: params.scale,
                          opacity: params.opacity,
                          rotateY: params.rotateY,
                          z: params.z,
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
                        {/* The High-End Vertical Project "Canister" with real-time 3D tilt interaction on mouse move */}
                        <motion.div 
                          ref={isActive ? activeCanisterRef : null}
                          onMouseMove={isActive ? handleActiveCanisterMouseMove : undefined}
                          onMouseLeave={isActive ? handleActiveCanisterMouseLeave : undefined}
                          className={`relative w-full h-full rounded-[36px] border bg-gradient-to-b ${skin.bgGradient} ${skin.borderColor} overflow-hidden backdrop-blur-md flex flex-col justify-between p-5 transition-all duration-700 ${
                            isActive ? `${skin.shadowNeon} border-white/20` : 'border-white/5 shadow-none hover:border-white/25'
                          }`}
                          style={isActive ? {
                            transform: `rotateX(${activeTilt.x}deg) rotateY(${activeTilt.y}deg) translateZ(10px)`,
                            transition: 'none' // Instant response during hover movement
                          } : {
                            transform: 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
                            transition: 'all 0.6s ease'
                          }}
                          whileHover={!isActive ? { y: -10, scale: 1.05 } : {}}
                        >
                          {/* Top Metallic Cap Accent */}
                          <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white/10 via-white/5 to-transparent border-b border-white/5" />

                          {/* Specular glare overlay moving dynamically with mouse coordinates on active card */}
                          <div 
                            className="absolute inset-0 pointer-events-none z-15 transition-opacity duration-300" 
                            style={{
                              background: isActive 
                                ? `radial-gradient(circle at ${activeGlare.x}% ${activeGlare.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`
                                : 'linear-gradient(to right, rgba(255,255,255,0.06), transparent, rgba(0,0,0,0.25))',
                              mixBlendMode: 'overlay'
                            }}
                          />
                          <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none z-10" />

                          {/* Project Banner Image inside the cylinder */}
                          <div className="absolute inset-0 -z-10 opacity-15 hover:opacity-25 transition-opacity duration-500">
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-cover saturate-50 contrast-125"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-navy-950/80 mix-blend-multiply" />
                          </div>

                          {/* Upper Brand Info */}
                          <div className="flex justify-between items-start z-10">
                            <span className="text-[9px] font-bold tracking-widest text-white/50 uppercase">
                              REV: {((i + 1) * 0.4).toFixed(1)}
                            </span>
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: skin.themeColor }} />
                          </div>

                          {/* Center Vertical Title Emblem */}
                          <div className="flex-1 flex flex-col items-center justify-center z-10 py-4">
                            <p 
                              className="text-xs font-bold tracking-[0.25em] text-white/40 mb-1 select-none font-mono"
                            >
                              {skin.labelText}
                            </p>
                            <h3 
                              className="text-center font-black tracking-wide text-white leading-tight uppercase select-none px-2"
                              style={{ 
                                fontSize: isMobile ? '13px' : '18px',
                                textShadow: isActive ? `0 0 12px ${skin.themeColor}88` : 'none'
                              }}
                            >
                              {project.title.split(' ')[0]} <br />
                              <span className={skin.accentText}>
                                {project.title.split(' ').slice(1).join(' ') || 'PRO'}
                              </span>
                            </h3>
                          </div>

                          {/* Bottom Tech Tags Summary */}
                          <div className="flex flex-wrap gap-1 justify-center z-10">
                            {project.tech.slice(0, 2).map((t, idx) => (
                              <span 
                                key={idx} 
                                className="text-[8px] font-bold px-2 py-0.5 rounded-full border border-white/5 bg-white/5 text-white/70"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Bottom Metallic Base Cap Accent */}
                          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/40 via-transparent to-transparent border-t border-white/5" />
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation arrows & Dot indicators */}
              <div className="flex items-center gap-6 mt-8 z-20">
                <button
                  onClick={prevProject}
                  id="prev-project-btn"
                  className="w-12 h-12 rounded-full border border-white/5 bg-navy-950/60 hover:bg-navy-900 flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-105 active:scale-95"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Dot Indicators */}
                <div className="flex gap-2">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      id={`dot-btn-${idx}`}
                      onClick={() => setActiveIndex(idx)}
                      className="w-2.5 h-2.5 rounded-full transition-all duration-300"
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
                  id="next-project-btn"
                  className="w-12 h-12 rounded-full border border-white/5 bg-navy-950/60 hover:bg-navy-900 flex items-center justify-center text-white/70 hover:text-white transition-all hover:scale-105 active:scale-95"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Elegant Active Project Description Card (displayed below the stage) */}
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-4xl mt-12 bg-navy-950/40 border border-white/5 rounded-[32px] p-6 md:p-10 backdrop-blur-md relative overflow-hidden"
              >
                {/* Active Glow Accent Background inside detail card */}
                <div 
                  className="absolute -right-32 -bottom-32 w-80 h-80 rounded-full blur-[120px] opacity-10 transition-all duration-1000"
                  style={{ backgroundColor: activeSkin.themeColor }}
                />

                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                  {/* Glassmorphic Project Badge / Category Icon with dynamic light reflection */}
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Info size={28} style={{ color: activeSkin.themeColor }} className="animate-pulse" />
                  </div>

                  <div className="flex-1 space-y-6 text-center md:text-left">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {projects[activeIndex].tech.map((t) => (
                          <span 
                            key={t} 
                            className="text-[10px] font-black uppercase tracking-widest bg-white/5 text-white/80 px-3.5 py-1.5 rounded-full border border-white/5"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3 justify-center md:justify-start">
                        {projects[activeIndex].title}
                        <Sparkles size={16} style={{ color: activeSkin.themeColor }} />
                      </h3>
                    </div>

                    <p className="text-muted-slate text-base leading-relaxed max-w-3xl whitespace-pre-line">
                      {projects[activeIndex].description}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                      {projects[activeIndex].link && (
                        <a
                          href={projects[activeIndex].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-accent-primary text-white font-bold text-xs uppercase tracking-widest hover:bg-accent-primary/80 transition-all accent-glow"
                        >
                          Visit Project Repository
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, i) => {
                const skin = PROJECT_SKINS[i % PROJECT_SKINS.length];
                return (
                  <GridTiltCard 
                    key={i} 
                    project={project} 
                    skin={skin} 
                    index={i} 
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PortfolioPage;
