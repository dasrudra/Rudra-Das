import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Github, 
  BookOpen, 
  ArrowLeft, 
  ChevronRight, 
  ChevronLeft,
  Calendar, 
  Users, 
  Briefcase, 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  Database, 
  Cpu, 
  Layers, 
  Wrench, 
  Layout, 
  Maximize2,
  Minimize2,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Info,
  Server,
  Zap
} from 'lucide-react';
import { projects } from '../constants';
import { caseStudiesData } from '../data/caseStudiesData';

export default function CaseStudyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get active project index from query parameter, fallback to 0
  const projectIdParam = searchParams.get('id');
  const activeIndex = projectIdParam ? parseInt(projectIdParam, 10) : 0;
  
  // Guard against invalid index
  const safeIndex = isNaN(activeIndex) || activeIndex < 0 || activeIndex >= projects.length ? 0 : activeIndex;
  const project = projects[safeIndex];

  // Resolve specific case study data
  const studyData = caseStudiesData[project.title] || caseStudiesData['Generic'];

  // Expandable Challenges State
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(null);

  // Active Viewport Tab State (Screenshot Gallery mock)
  const [galleryTab, setGalleryTab] = useState<'desktop' | 'mobile' | 'api'>('desktop');

  // Helper to render dynamic lucide icons safely
  const renderIcon = (name: string, size = 18, className = '') => {
    switch (name) {
      case 'server': return <Server size={size} className={className} />;
      case 'database': return <Database size={size} className={className} />;
      case 'zap': return <Zap size={size} className={className} />;
      case 'shield': return <ShieldAlert size={size} className={className} />;
      case 'book': return <BookOpen size={size} className={className} />;
      case 'activity': return <Activity size={size} className={className} />;
      case 'layers': return <Layers size={size} className={className} />;
      case 'wrench': return <Wrench size={size} className={className} />;
      case 'cpu': return <Cpu size={size} className={className} />;
      default: return <Cpu size={size} className={className} />;
    }
  };

  // Navigate next/previous project
  const handlePrev = () => {
    const nextIdx = (safeIndex - 1 + projects.length) % projects.length;
    setSearchParams({ id: nextIdx.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = () => {
    const nextIdx = (safeIndex + 1) % projects.length;
    setSearchParams({ id: nextIdx.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleChallenge = (idx: number) => {
    setExpandedChallenge(expandedChallenge === idx ? null : idx);
  };

  // Aesthetic color accent based on active project's domain/index
  const colors = [
    { primary: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', glow: 'rgba(16,185,129,0.25)', raw: '#10b981' },
    { primary: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', glow: 'rgba(59,130,246,0.25)', raw: '#3b82f6' },
    { primary: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', glow: 'rgba(245,158,11,0.25)', raw: '#f59e0b' },
    { primary: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', glow: 'rgba(239,68,68,0.25)', raw: '#ef4444' },
    { primary: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30', glow: 'rgba(168,85,247,0.25)', raw: '#a855f7' },
    { primary: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/30', glow: 'rgba(13,148,136,0.25)', raw: '#0d9488' }
  ];
  const color = colors[safeIndex % colors.length];

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-[#020306]">
      {/* Immersive radial gradient ambient light casting */}
      <div 
        className="absolute inset-0 transition-all duration-1000 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 15%, ${color.raw} 0%, transparent 55%)`
        }}
      />

      {/* Grid line layout backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px] opacity-[0.06] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Dynamic Project Quick Switcher */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 p-4 rounded-2xl bg-navy-950/40 border border-white/5 backdrop-blur-md">
          <Link 
            to="/portfolio" 
            className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-muted-slate hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>RETURN TO SHOWCASE</span>
          </Link>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden md:inline">
              Template Demo Selector:
            </span>
            <div className="relative w-full sm:w-64">
              <select
                value={safeIndex}
                onChange={(e) => setSearchParams({ id: e.target.value })}
                className="w-full bg-navy-900/60 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold font-mono text-white/90 focus:outline-none focus:border-white/20 cursor-pointer appearance-none"
              >
                {projects.map((p, idx) => (
                  <option key={idx} value={idx}>
                    {idx + 1}. {p.title}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ==================== 1. HERO SECTION ==================== */}
        <section id="hero" className="mb-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Hero Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-white/5 border border-white/10 ${color.primary}`}>
                  {studyData.domain}
                </span>
                <span className="px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-white/60">
                  {studyData.statusText}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                {project.title}
              </h1>

              <div className="space-y-2">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-bold">Business Summary</p>
                <p className="text-muted-slate text-sm md:text-base leading-relaxed">
                  {studyData.businessSummary}
                </p>
              </div>

              {/* Technology badges mapping */}
              <div className="space-y-3">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest font-bold">Technology Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span 
                      key={t} 
                      className="text-[10px] font-mono font-bold px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hero CTA buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <a 
                  href={project.liveLink || project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-center text-[11px] font-mono font-bold uppercase tracking-widest text-navy-950 transition-all duration-300 transform active:scale-95 hover:scale-[1.02] shadow-lg cursor-pointer"
                  style={{ backgroundColor: color.raw }}
                >
                  <Globe size={14} className="shrink-0" />
                  <span>Live Demo</span>
                </a>

                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-center text-[11px] font-mono font-bold uppercase tracking-widest text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform active:scale-95 hover:scale-[1.02] cursor-pointer"
                >
                  <Github size={14} className="shrink-0" />
                  <span>GitHub</span>
                </a>

                <button 
                  onClick={() => {
                    const section = document.getElementById('architecture');
                    if (section) section.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-center text-[11px] font-mono font-bold uppercase tracking-widest text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform active:scale-95 hover:scale-[1.02] cursor-pointer"
                >
                  <BookOpen size={14} className="shrink-0" />
                  <span>Documentation</span>
                </button>
              </div>
            </div>

            {/* Hero Image / Video Container Area */}
            <div className="lg:col-span-6">
              <div 
                className="relative rounded-3xl overflow-hidden border bg-navy-950/80 p-3 transition-all duration-700"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                  boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 40px ${color.glow}`
                }}
              >
                {/* Visual Glass Header Bar */}
                <div className="flex items-center justify-between px-3 pb-3 border-b border-white/5 text-[9px] font-mono text-white/40">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/70" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                    <span className="w-2 h-2 rounded-full bg-green-500/70" />
                  </div>
                  <span className="tracking-wide text-white/30 uppercase">SYSTEM_STAGE_LIVE.EXE</span>
                  <div className="flex items-center gap-1 text-[8px] font-bold text-white/40">
                    <Activity size={10} className="animate-pulse" />
                    <span>60 FPS</span>
                  </div>
                </div>

                {/* Display Cover Frame */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mt-3 border border-white/5 bg-[#070a13]">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== 2. QUICK OVERVIEW TABLE ==================== */}
        <section id="overview" className="mb-20">
          <div className="p-8 rounded-[24px] bg-navy-950/40 border border-white/5 backdrop-blur-md">
            <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-white/40 mb-6">
              PROJECT SNAPSHOT & QUICK OVERVIEW
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
              
              <div className="space-y-1.5 md:px-3 pt-4 md:pt-0">
                <div className="flex items-center gap-2 text-white/30">
                  <Activity size={13} style={{ color: color.raw }} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Industry</span>
                </div>
                <p className="text-sm font-bold text-white/95">{studyData.industry}</p>
              </div>

              <div className="space-y-1.5 md:px-4 pt-4 md:pt-0">
                <div className="flex items-center gap-2 text-white/30">
                  <Layers size={13} style={{ color: color.raw }} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Project Type</span>
                </div>
                <p className="text-sm font-bold text-white/95">{studyData.projectType}</p>
              </div>

              <div className="space-y-1.5 md:px-4 pt-4 md:pt-0">
                <div className="flex items-center gap-2 text-white/30">
                  <Calendar size={13} style={{ color: color.raw }} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Duration</span>
                </div>
                <p className="text-sm font-bold text-white/95">{studyData.duration}</p>
              </div>

              <div className="space-y-1.5 md:px-4 pt-4 md:pt-0">
                <div className="flex items-center gap-2 text-white/30">
                  <Users size={13} style={{ color: color.raw }} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Team Size</span>
                </div>
                <p className="text-sm font-bold text-white/95">{studyData.teamSize}</p>
              </div>

              <div className="space-y-1.5 md:px-4 pt-4 md:pt-0">
                <div className="flex items-center gap-2 text-white/30">
                  <Briefcase size={13} style={{ color: color.raw }} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">My Role</span>
                </div>
                <p className="text-sm font-bold text-white/95">{studyData.role}</p>
              </div>

              <div className="space-y-1.5 md:px-4 pt-4 md:pt-0">
                <div className="flex items-center gap-2 text-white/30">
                  <CheckCircle2 size={13} style={{ color: color.raw }} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Status</span>
                </div>
                <p className="text-sm font-bold text-white/95">{studyData.status}</p>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== 3. BUSINESS PROBLEM ==================== */}
        <section id="problem" className="mb-20">
          <div className="grid md:grid-cols-12 gap-8 items-stretch">
            
            {/* Labeled Side Heading */}
            <div className="md:col-span-4 space-y-2">
              <span className="px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-red-500/10 border border-red-500/20 text-red-400">
                STAGE 01: PROBLEM ROOT
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Business Problem
              </h2>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                ANALYSIS OF CRITICAL ENGINEERING CHALLENGES & OPERATIONAL INEFFICIENCIES.
              </p>
            </div>

            {/* Blueprint Detailed Box */}
            <div className="md:col-span-8 p-6 md:p-8 rounded-[24px] bg-navy-950/20 border border-white/5 flex flex-col justify-between space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                <ShieldAlert className="text-red-400 shrink-0 mt-0.5" size={20} />
                <div className="space-y-1">
                  <p className="text-xs font-mono font-bold text-red-400 uppercase tracking-wide">
                    {studyData.problemAlertTitle}
                  </p>
                  <p className="text-xs text-muted-slate leading-relaxed">
                    {studyData.problemAlertDesc}
                  </p>
                </div>
              </div>

              <div className="space-y-4 font-sans text-sm text-muted-slate leading-relaxed">
                {studyData.problemBody.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Labeled Placeholder Metrics Badge */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.01] text-[10px] font-mono text-white/40">
                <span className="uppercase">{studyData.problemMetric.label}</span>
                <span className="text-red-400 font-bold uppercase tracking-wider">{studyData.problemMetric.value}</span>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== 4. SOLUTION ==================== */}
        <section id="solution" className="mb-20">
          <div className="grid md:grid-cols-12 gap-8 items-stretch">
            
            {/* Labeled Side Heading */}
            <div className="md:col-span-4 space-y-2">
              <span className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase ${color.bg} border ${color.border} ${color.primary}`}>
                STAGE 02: THE SPECIFICATION
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Proposed Solution
              </h2>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                DECOUPLED PIPELINES, SECURE AUTHENTICATION, AND DATA INTEGRITY BLUEPRINTS.
              </p>
            </div>

            {/* Blueprint Detailed Box */}
            <div className="md:col-span-8 p-6 md:p-8 rounded-[24px] bg-navy-950/20 border border-white/5 flex flex-col justify-between space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={20} />
                <div className="space-y-1">
                  <p className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">
                    {studyData.solutionSuccessTitle}
                  </p>
                  <p className="text-xs text-muted-slate leading-relaxed">
                    {studyData.solutionSuccessDesc}
                  </p>
                </div>
              </div>

              <div className="space-y-4 font-sans text-sm text-muted-slate leading-relaxed">
                {studyData.solutionBody.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Labeled Placeholder Metrics Badge */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.01] text-[10px] font-mono text-white/40">
                <span className="uppercase">{studyData.solutionMetric.label}</span>
                <span className="text-emerald-400 font-bold uppercase tracking-wider">{studyData.solutionMetric.value}</span>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== 5. KEY FEATURES ==================== */}
        <section id="features" className="mb-20">
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-[0.25em]">
                FUNCTIONAL MODULES
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Core System Features
              </h2>
            </div>

            {/* Feature Cards Grid (2x2 / 3x1 responsive layout) */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyData.features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-[22px] bg-navy-950/20 border border-white/5 hover:border-white/10 hover:bg-navy-900/10 transition-all duration-300 space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {renderIcon(feature.icon, 18, "text-white/60")}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white">{feature.title}</h3>
                    <p className="text-xs text-muted-slate leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="text-[9px] font-mono text-white/30 uppercase">{feature.moduleRef}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 6. SCREENSHOT GALLERY ==================== */}
        <section id="gallery" className="mb-20">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-[0.25em]">
                  VISUAL INTERFACES
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">
                  System Screenshot Gallery
                </h2>
              </div>
              
              {/* Tabs selector */}
              <div className="flex rounded-lg bg-navy-950/60 p-1 border border-white/5 text-[10px] font-mono font-bold uppercase tracking-wider">
                <button
                  onClick={() => setGalleryTab('desktop')}
                  className={`px-3 py-1.5 rounded transition-colors ${galleryTab === 'desktop' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/85'}`}
                >
                  Desktop view
                </button>
                <button
                  onClick={() => setGalleryTab('mobile')}
                  className={`px-3 py-1.5 rounded transition-colors ${galleryTab === 'mobile' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/85'}`}
                >
                  Mobile View
                </button>
                <button
                  onClick={() => setGalleryTab('api')}
                  className={`px-3 py-1.5 rounded transition-colors ${galleryTab === 'api' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/85'}`}
                >
                  API Payload
                </button>
              </div>
            </div>

            {/* Interactive Browser Frame representation */}
            <div className="rounded-3xl border border-white/5 bg-navy-950/30 overflow-hidden relative min-h-[340px] md:min-h-[460px] flex flex-col justify-between">
              
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-navy-950/80 border-b border-white/5 text-[10px] font-mono text-white/40">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                </div>
                <div className="px-4 py-1 rounded bg-white/5 border border-white/5 w-60 md:w-96 text-center truncate">
                  {galleryTab === 'desktop' && 'https://core-platform.io/dashboard/projects/active'}
                  {galleryTab === 'mobile' && 'https://m.core-platform.io/active'}
                  {galleryTab === 'api' && 'https://api.core-platform.io/v1/telemetry'}
                </div>
                <span className="text-[8px] opacity-40">SSL SECURE</span>
              </div>

              {/* Gallery Content switcher */}
              <div className="p-8 flex-grow flex items-center justify-center relative overflow-hidden bg-navy-950/10">
                <AnimatePresence mode="wait">
                  {galleryTab === 'desktop' && (
                    <motion.div 
                      key="desktop"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="w-full max-w-4xl border border-white/5 bg-navy-950/80 rounded-2xl p-6 space-y-6 shadow-inner"
                    >
                      <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <div className="space-y-1">
                          <p className="text-[10px] font-mono text-white/40 uppercase">{studyData.gallery.desktop.subtitle}</p>
                          <h3 className="text-lg font-black text-white">{studyData.gallery.desktop.title}</h3>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[8px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">{studyData.gallery.desktop.badge}</span>
                      </div>
                      
                      {/* Grid representation */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {studyData.gallery.desktop.items.map((item, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-1">
                            <p className="text-[8px] font-mono text-white/30">{item.label}</p>
                            <p className="text-sm font-bold text-white">{item.title}</p>
                            <p className="text-[10px] text-muted-slate leading-relaxed">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {galleryTab === 'mobile' && (
                    <motion.div 
                      key="mobile"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.3 }}
                      className="w-64 border border-white/10 bg-navy-950 rounded-[32px] p-4 aspect-[9/16] relative overflow-hidden"
                    >
                      {/* Camera Notch placeholder */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full bg-navy-900 border border-white/5" />
                      <div className="mt-6 space-y-6 text-center">
                        <p className="text-[8px] font-mono text-white/30 uppercase tracking-widest">{studyData.gallery.mobile.subtitle}</p>
                        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center">
                          {renderIcon(studyData.gallery.mobile.icon, 24, "text-emerald-400")}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-black text-white">{studyData.gallery.mobile.title}</p>
                          <p className="text-[10px] text-muted-slate px-2 leading-relaxed">Responsive screen optimized for administrative monitoring on the move.</p>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 text-[9px] font-mono text-left space-y-1">
                          {studyData.gallery.mobile.items.map((mItem, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span className="text-white/30">{mItem.label}</span>
                              <span className="text-white/80">{mItem.val}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {galleryTab === 'api' && (
                    <motion.div 
                      key="api"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="w-full max-w-2xl border border-white/5 bg-[#010204]/90 rounded-2xl p-6 font-mono text-xs text-white/70 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-white/30">
                        <span>{studyData.gallery.api.headers}</span>
                        <span>HTTP/2 200 OK</span>
                      </div>
                      <pre className="overflow-x-auto text-[10px] md:text-xs text-emerald-400/90 leading-relaxed whitespace-pre p-2">
                        {studyData.gallery.api.code}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Caption placeholder */}
              <div className="p-4 bg-navy-950/80 border-t border-white/5 text-[10px] font-mono text-white/30 text-center">
                {studyData.gallery.caption}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 7. SYSTEM ARCHITECTURE ==================== */}
        <section id="architecture" className="mb-20">
          <div className="grid md:grid-cols-12 gap-8 items-stretch">
            
            {/* Labeled Side Heading */}
            <div className="md:col-span-4 space-y-2">
              <span className="px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-white/40">
                SYSTEM DESIGN
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Core System Architecture
              </h2>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                TECHNICAL FLUID PROCESS CHANNELS, API ROUTING SEGMENTS, AND DATABASE INTEGRITY GATEWAYS.
              </p>
            </div>

            {/* Interactive Vector/Architecture flow area */}
            <div className="md:col-span-8 p-6 md:p-8 rounded-[24px] bg-navy-950/20 border border-white/5 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-[8px] font-mono text-white/20 uppercase tracking-wider">
                {studyData.architecture.diagramRef}
              </div>

              {/* Dynamic topology connector line canvas flow */}
              <div className="grid grid-cols-3 gap-4 text-center relative z-10">
                
                {/* Stage 1: Ingress */}
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3 relative">
                  <div className="w-8 h-8 rounded-lg bg-white/5 mx-auto flex items-center justify-center">
                    {renderIcon(studyData.architecture.stage1.icon, 15, "text-white/50")}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono">{studyData.architecture.stage1.title}</h4>
                    <p className="text-[9px] text-white/40 uppercase tracking-wider mt-1">{studyData.architecture.stage1.subtitle}</p>
                  </div>
                  <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 text-white/20 font-bold hidden md:block">→</div>
                </div>

                {/* Stage 2: Processing */}
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/10 space-y-3 relative">
                  <div className="w-8 h-8 rounded-lg bg-white/5 mx-auto flex items-center justify-center animate-pulse" style={{ backgroundColor: `${color.raw}15` }}>
                    {renderIcon(studyData.architecture.stage2.icon, 15, color.primary)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono">{studyData.architecture.stage2.title}</h4>
                    <p className="text-[9px] text-white/40 uppercase tracking-wider mt-1">{studyData.architecture.stage2.subtitle}</p>
                  </div>
                  <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 text-white/20 font-bold hidden md:block">→</div>
                </div>

                {/* Stage 3: Persistence */}
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3 relative">
                  <div className="w-8 h-8 rounded-lg bg-white/5 mx-auto flex items-center justify-center">
                    {renderIcon(studyData.architecture.stage3.icon, 15, "text-white/50")}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono">{studyData.architecture.stage3.title}</h4>
                    <p className="text-[9px] text-white/40 uppercase tracking-wider mt-1">{studyData.architecture.stage3.subtitle}</p>
                  </div>
                </div>

              </div>

              {/* Core Description of design */}
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 text-xs text-muted-slate leading-relaxed font-sans space-y-2">
                <p>
                  Our architecture guarantees strict <strong>separation of concerns</strong>:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-white/75">
                  {studyData.architecture.bullets.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== 8. TECHNOLOGIES USED ==================== */}
        <section id="technologies" className="mb-20">
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-[0.25em]">
                STACK SPECS
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Technologies Grouped
              </h2>
            </div>

            {/* Grid of Grouped tech */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              
              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3 text-center">
                <div className="w-8 h-8 rounded-lg bg-white/5 mx-auto flex items-center justify-center">
                  <Layout size={15} className="text-white/60" />
                </div>
                <h4 className="text-xs font-bold font-mono text-white">Frontend</h4>
                <div className="flex flex-col gap-1 text-[10px] font-mono text-white/50">
                  {studyData.technologies.frontend.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3 text-center">
                <div className="w-8 h-8 rounded-lg bg-white/5 mx-auto flex items-center justify-center">
                  <Server size={15} className="text-white/60" />
                </div>
                <h4 className="text-xs font-bold font-mono text-white">Backend</h4>
                <div className="flex flex-col gap-1 text-[10px] font-mono text-white/50">
                  {studyData.technologies.backend.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3 text-center">
                <div className="w-8 h-8 rounded-lg bg-white/5 mx-auto flex items-center justify-center">
                  <Database size={15} className="text-white/60" />
                </div>
                <h4 className="text-xs font-bold font-mono text-white">Database</h4>
                <div className="flex flex-col gap-1 text-[10px] font-mono text-white/50">
                  {studyData.technologies.database.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3 text-center">
                <div className="w-8 h-8 rounded-lg bg-white/5 mx-auto flex items-center justify-center">
                  <Cpu size={15} className="text-white/60" />
                </div>
                <h4 className="text-xs font-bold font-mono text-white">AI Engine</h4>
                <div className="flex flex-col gap-1 text-[10px] font-mono text-white/50">
                  {studyData.technologies.ai.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3 text-center">
                <div className="w-8 h-8 rounded-lg bg-white/5 mx-auto flex items-center justify-center">
                  <Globe size={15} className="text-white/60" />
                </div>
                <h4 className="text-xs font-bold font-mono text-white">Deployment</h4>
                <div className="flex flex-col gap-1 text-[10px] font-mono text-white/50">
                  {studyData.technologies.deployment.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3 text-center">
                <div className="w-8 h-8 rounded-lg bg-white/5 mx-auto flex items-center justify-center">
                  <Wrench size={15} className="text-white/60" />
                </div>
                <h4 className="text-xs font-bold font-mono text-white">Tools</h4>
                <div className="flex flex-col gap-1 text-[10px] font-mono text-white/50">
                  {studyData.technologies.tools.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==================== 9. CHALLENGES & SOLUTIONS ==================== */}
        <section id="challenges" className="mb-20">
          <div className="grid md:grid-cols-12 gap-8 items-stretch">
            
            {/* Labeled Side Heading */}
            <div className="md:col-span-4 space-y-2">
              <span className="px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                ENGINEERING DEBATES
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Challenges & Solutions
              </h2>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                HOW TECHNICAL BLOCKS, COMPILATION RISKS, AND TRAFFIC SPIKES WERE RESOLVED.
              </p>
            </div>

            {/* Expandable Engineering Cards (Accordion layout with transitions) */}
            <div className="md:col-span-8 space-y-4">
              {studyData.challenges.map((challenge, idx) => (
                <div key={idx} className="rounded-2xl border border-white/5 bg-navy-950/20 overflow-hidden">
                  <button
                    onClick={() => toggleChallenge(idx)}
                    className="w-full text-left p-5 flex items-center justify-between font-bold text-white/95 focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-white/30">{String(idx + 1).padStart(2, '0')} /</span>
                      <h3 className="text-sm md:text-base">{challenge.title}</h3>
                    </div>
                    <span className="text-white/45 text-xs font-mono">{expandedChallenge === idx ? 'COLLAPSE ▲' : 'EXPAND ▼'}</span>
                  </button>
                  
                  <AnimatePresence>
                    {expandedChallenge === idx && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 border-t border-white/5 bg-white/[0.01] space-y-4 text-xs md:text-sm text-muted-slate leading-relaxed font-sans">
                          <div className="p-3.5 rounded-xl bg-red-500/5 border border-red-500/15">
                            <p className="font-mono font-bold text-red-400 uppercase text-[10px] mb-1">THE TECHNICAL HAZARD:</p>
                            <p className="text-xs">{challenge.hazard}</p>
                          </div>
                          <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                            <p className="font-mono font-bold text-emerald-400 uppercase text-[10px] mb-1">THE ENGINEERING RESOLUTION:</p>
                            <p className="text-xs">{challenge.resolution}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==================== 10. RESULTS & IMPACT ==================== */}
        <section id="results" className="mb-20">
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1">
              <span className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-[0.25em]">
                AUDITED STATISTICS
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Results & Business Impact
              </h2>
            </div>

            {/* High-impact metric card layouts */}
            <div className="grid sm:grid-cols-3 gap-6">
              {studyData.results.map((metric, idx) => (
                <div key={idx} className="p-6 rounded-[24px] bg-navy-950/30 border border-white/5 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 text-[7px] font-mono text-white/10">{metric.ref}</div>
                  <div className="space-y-1.5 relative z-10">
                    <p className="text-4xl md:text-5xl font-black font-mono tracking-tight" style={{ color: color.raw }}>
                      {metric.value}
                    </p>
                    <h4 className="text-sm font-bold text-white">{metric.title}</h4>
                    <p className="text-xs text-muted-slate leading-relaxed">{metric.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 11. LESSONS LEARNED ==================== */}
        <section id="lessons" className="mb-20">
          <div className="grid md:grid-cols-12 gap-8 items-stretch">
            
            {/* Labeled Side Heading */}
            <div className="md:col-span-4 space-y-2">
              <span className="px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-white/40">
                RETROSPECTIVES
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Lessons Learned
              </h2>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                ENGINEERING PRACTICES, SCALABILITY BLUEPRINTS, AND ROBUST CODE STANDARDS DISCOVERED.
              </p>
            </div>

            {/* List block */}
            <div className="md:col-span-8 p-6 md:p-8 rounded-[24px] bg-navy-950/20 border border-white/5 space-y-6">
              {studyData.lessons.map((lesson, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color.raw }} />
                    <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider">{lesson.title}</h4>
                  </div>
                  <p className="text-xs text-muted-slate leading-relaxed">
                    {lesson.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==================== 12. FUTURE IMPROVEMENTS ==================== */}
        <section id="improvements" className="mb-20">
          <div className="grid md:grid-cols-12 gap-8 items-stretch">
            
            {/* Labeled Side Heading */}
            <div className="md:col-span-4 space-y-2">
              <span className="px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase bg-white/5 border border-white/10 text-white/40">
                ROADMAP SPEC
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Future Improvements
              </h2>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                NEXT-GEN UPGRADES, SECONDARY MACHINE LEARNING TRIGGERS, AND ENTERPRISE ENHANCEMENTS.
              </p>
            </div>

            {/* List block */}
            <div className="md:col-span-8 p-6 md:p-8 rounded-[24px] bg-navy-950/20 border border-white/5 space-y-6">
              {studyData.improvements.map((imp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-white/30 font-mono text-[10px] font-bold">{imp.letter}.</span>
                    <h4 className="text-sm font-bold font-mono text-white uppercase tracking-wider">{imp.title}</h4>
                    {imp.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        {imp.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-slate leading-relaxed">
                    {imp.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==================== 13. PREVIOUS, NEXT & BACK NAVIGATION ==================== */}
        <section id="navigation" className="pt-8 border-t border-white/5">
          <div className="grid sm:grid-cols-3 gap-4 items-center">
            
            {/* Previous Project Button */}
            <button
              onClick={handlePrev}
              className="group p-5 rounded-2xl border border-white/5 bg-navy-950/30 hover:bg-navy-900/40 text-left transition-all duration-300 hover:scale-[1.01] active:scale-95 flex items-center gap-4 cursor-pointer"
            >
              <ChevronLeft size={20} className="text-white/50 group-hover:text-white transition-colors shrink-0" />
              <div className="space-y-1 truncate">
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">PREVIOUS CASE STUDY</p>
                <p className="text-sm font-black text-white truncate">
                  {projects[(safeIndex - 1 + projects.length) % projects.length].title}
                </p>
              </div>
            </button>

            {/* Back to Projects Button */}
            <Link
              to="/portfolio"
              className="p-5 rounded-2xl border border-white/5 bg-navy-950/30 hover:bg-navy-900/40 text-center transition-all duration-300 hover:scale-[1.01] active:scale-95 flex flex-col justify-center items-center gap-1 cursor-pointer"
            >
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">PORTFOLIO CENTER</p>
              <p className="text-sm font-black text-white">Back to Projects</p>
            </Link>

            {/* Next Project Button */}
            <button
              onClick={handleNext}
              className="group p-5 rounded-2xl border border-white/5 bg-navy-950/30 hover:bg-navy-900/40 text-right transition-all duration-300 hover:scale-[1.01] active:scale-95 flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="space-y-1 truncate text-right flex-grow">
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">NEXT CASE STUDY</p>
                <p className="text-sm font-black text-white truncate">
                  {projects[(safeIndex + 1) % projects.length].title}
                </p>
              </div>
              <ChevronRight size={20} className="text-white/50 group-hover:text-white transition-colors shrink-0" />
            </button>

          </div>
        </section>

      </div>
    </div>
  );
}
