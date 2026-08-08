import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Github, 
  BookOpen, 
  ArrowUpRight, 
  Layers
} from 'lucide-react';
import { projects } from '../constants';
import { ProjectVisualMockup } from '../components/ProjectVisualMockup';
import { SkillLogoBadge } from '../components/SkillLogoBadge';

const categories = ['All', 'AI', 'ERP', 'Full Stack', 'Research', 'Productivity', 'Automation'];

const TILT_ANGLES = [
  { rx: 4, ry: -6 },
  { rx: -3, ry: 5 },
  { rx: 5, ry: 3 },
  { rx: -4, ry: -5 },
  { rx: 3, ry: -4 },
  { rx: -2, ry: 6 },
  { rx: 4, ry: -3 },
  { rx: -5, ry: 4 },
  { rx: 3, ry: 5 },
  { rx: -3, ry: -4 }
];

const CARD_COLORS = [
  '#5FB3B3', '#E0995A', '#E0995A', '#5FB3B3', '#E0995A', 
  '#5FB3B3', '#E0995A', '#E0995A', '#5FB3B3', '#E0995A', '#5FB3B3'
];

const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function PortfolioPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

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

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden bg-[#0B1220] text-[#EDEAE3]">
      {/* Radial Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(224,153,90,0.08),transparent_65%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        
        {/* Top Header Row with Back Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141D30] border border-[#2A3348] hover:border-[#E0995A]/50 hover:bg-[#1a263d] text-[#EDEAE3] font-mono text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 group shadow-lg cursor-pointer"
            aria-label="Back to previous page"
          >
            <ArrowLeft size={16} className="text-[#E0995A] group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO PREVIOUS PAGE</span>
          </button>

          <span className="text-xs font-mono text-[#8B93A6] flex items-center gap-2">
            <Layers size={14} className="text-[#E0995A]" />
            <span>ARCHITECTURAL GALLERY • {projects.length} SYSTEMS</span>
          </span>
        </div>

        {/* Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3"
        >
          <span className="px-3.5 py-1 rounded-full bg-[#141D30] border border-[#2A3348] text-xs font-mono font-bold tracking-[0.2em] text-[#E0995A] uppercase inline-block">
            FULL ENGINEERING CATALOGUE
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-[#EDEAE3] tracking-tight">
            All Projects & Architectural Systems
          </h1>
          <p className="text-[#8B93A6] text-base md:text-lg leading-relaxed font-sans">
            A comprehensive gallery of machine learning benchmarks, enterprise modules, and software tools — browse all systems with detailed case study deep dives.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 relative ${
                  isSelected
                    ? 'text-[#EDEAE3] bg-[#141D30] border border-[#E0995A]/60 shadow-lg'
                    : 'text-[#8B93A6] hover:text-[#EDEAE3] bg-[#141D30]/50 border border-[#2A3348] hover:bg-[#141D30]'
                }`}
              >
                {category.toUpperCase()}
                {isSelected && (
                  <motion.div
                    layoutId="portfolioActiveCategory"
                    className="absolute inset-0 rounded-xl bg-[#E0995A]/15 border border-[#E0995A]/40 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Gallery Wall Grid */}
        <div className="perspective-[1400px] pt-4">
          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
              {filteredProjects.map((project, index) => {
                const originalIndex = projects.indexOf(project);
                const tilt = TILT_ANGLES[originalIndex % TILT_ANGLES.length];
                const cardColor = CARD_COLORS[originalIndex % CARD_COLORS.length];

                return (
                  <motion.div
                    key={project.title}
                    layout
                    variants={staggerItemVariants}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                    className="group"
                  >
                    <div 
                      className="h-full rounded-2xl border border-[#2A3348] p-6 bg-[#141D30] backdrop-blur-xl flex flex-col justify-between transition-all duration-500 ease-out hover:border-[#E0995A]/50 hover:shadow-[0_0_30px_rgba(224,153,90,0.15)] group-hover:z-30 relative overflow-hidden"
                      style={{
                        transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1)`;
                      }}
                    >
                      {/* Glow Accent */}
                      <div 
                        className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity"
                        style={{ backgroundColor: cardColor }}
                      />

                      <div className="space-y-4 relative z-10">
                        {/* Status & Domain Bar */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-[#0B1220] border border-[#2A3348] text-[#E0995A] text-[10px] font-mono font-extrabold uppercase tracking-widest">
                            {project.domain || "SYSTEM"}
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-[#0B1220] border border-[#2A3348] text-[#EDEAE3]/70 text-[9px] font-mono font-bold uppercase tracking-widest">
                            {project.status}
                          </span>
                        </div>

                        {/* Interactive Code Terminal Visual */}
                        <ProjectVisualMockup 
                          project={project} 
                          themeColor={cardColor} 
                          className="h-[190px]" 
                        />

                        {/* Content */}
                        <div className="space-y-2">
                          <h3 className="text-lg font-display font-bold text-[#EDEAE3] group-hover:text-[#E0995A] transition-colors leading-snug line-clamp-1">
                            {project.title}
                          </h3>
                          <p className="text-[#8B93A6] text-xs leading-relaxed line-clamp-3 font-sans">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.tech.map(t => (
                            <SkillLogoBadge key={t} skill={t} size="xs" />
                          ))}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="grid grid-cols-2 gap-2.5 pt-5 mt-5 border-t border-[#2A3348] relative z-10">
                        {(project.github || project.link) && (
                          <a 
                            href={project.github || project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-center text-[10px] font-mono font-bold uppercase tracking-wider text-[#EDEAE3] bg-[#0B1220] border border-[#2A3348] hover:border-[#E0995A]/50 transition-all duration-200 cursor-pointer"
                          >
                            <Github size={13} />
                            <span>Repository</span>
                          </a>
                        )}

                        <Link 
                          to={`/portfolio/case-study?id=${originalIndex}`}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-center text-[10px] font-mono font-bold uppercase tracking-wider text-[#0B1220] bg-[#E0995A] hover:bg-[#d68c4d] transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer col-span-1"
                        >
                          <BookOpen size={13} />
                          <span>Case Study</span>
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
