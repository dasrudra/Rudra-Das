import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  ArrowLeft, 
  ChevronDown,
  Check,
  Code2,
  Sparkles,
  Layers
} from 'lucide-react';
import { projects } from '../constants';
import { ProjectVisualMockup } from '../components/ProjectVisualMockup';
import { SkillLogoBadge } from '../components/SkillLogoBadge';

const HOW_IT_WORKS_DATA: { [key: string]: string[] } = {
  'production': [
    "Python/Pandas/OpenPyXL data pipeline ingests and validates structured monthly Plan-KPP activity workbooks",
    "FastAPI backend calculates machine utilization, capacity vs target benchmarks, and KPI aggregates",
    "SQLite-backed reporting layer persists monthly activity plans, shift targets, and status distributions",
    "React/TypeScript frontend with Recharts renders dynamic capacity curves, machine schedules, and month-over-month variance analytics"
  ],
  'plant': [
    "Python/Pandas/OpenPyXL data pipeline ingests and validates structured monthly Plan-KPP activity workbooks",
    "FastAPI backend calculates machine utilization, capacity vs target benchmarks, and KPI aggregates",
    "SQLite-backed reporting layer persists monthly activity plans, shift targets, and status distributions",
    "React/TypeScript frontend with Recharts renders dynamic capacity curves, machine schedules, and month-over-month variance analytics"
  ],
  'distractcheck': [
    "Injects controlled distractor content around a target fact, then scores whether the model's answer stays correct",
    "Built against Groq-hosted Llama 3.3 70B",
    "Submitted to the Attention track of Kaggle's \"Measuring Progress Toward AGI\" competition"
  ],
  'yolo': [
    "RTSP camera feed → OpenCV frame capture → YOLOv8n detection",
    "Centroid-based tracking keeps IDs consistent across frames",
    "Configurable virtual line triggers IN/OUT counts on crossing",
    "FastAPI dashboard plus SQLite/CSV logging, with snapshot capture on each crossing event"
  ],
  'smart ai detection': [
    "RTSP camera feed → OpenCV frame capture → YOLOv8n detection",
    "Centroid-based tracking keeps IDs consistent across frames",
    "Configurable virtual line triggers IN/OUT counts on crossing",
    "FastAPI dashboard plus SQLite/CSV logging, with snapshot capture on each crossing event"
  ],
  'nn fund management': [
    "Two-stage GM-then-MD approval state machine",
    "Server-side validation blocks duplicate transaction references and over-allocation",
    "Full audit trail via Odoo chatter",
    "Automated tests, Docker-based setup",
    "Built for a technical assessment (Trainee Software Developer role, NN Services & Engineering Ltd)"
  ],
  'odoo': [
    "Two-stage GM-then-MD approval state machine",
    "Server-side validation blocks duplicate transaction references and over-allocation",
    "Full audit trail via Odoo chatter",
    "Automated tests, Docker-based setup",
    "Built for a technical assessment (Trainee Software Developer role, NN Services & Engineering Ltd)"
  ],
  'accounting': [
    "Role-based Admin/Employee permissions",
    "Deterministic balance carry-forward between closings",
    "Day-closing locks records; corrections go through auditable adjustment entries, not silent edits",
    "Backend (FastAPI/MySQL) designed, not yet built"
  ],
  'ledger': [
    "Role-based Admin/Employee permissions",
    "Deterministic balance carry-forward between closings",
    "Day-closing locks records; corrections go through auditable adjustment entries, not silent edits",
    "Backend (FastAPI/MySQL) designed, not yet built"
  ],
  'meta ads': [
    "Wraps the official Meta Ads Library API, not unauthorized scraping",
    "Five single-responsibility modules (client, models, exporters, page_resolver, cli)",
    "Retry-with-exponential-backoff on transient failures, full pagination handling",
    "Pytest suite covering normalization, export, parsing, and pagination"
  ],
  'speech emotion': [
    "Jupyter notebook-based audio feature extraction",
    "Extracts acoustic features from audio recordings",
    "Trains classifiers to distinguish emotional states like anger, calm, and happiness"
  ],
  'focusdeck': [
    "Vite + React + TypeScript + Tailwind scaffold, Manifest V3",
    "In development — roadmap covers workspaces, quick links, notes, focus timer, all backed by Chrome Storage API"
  ],
  'hotel management': [
    "Flask + SQLite backend",
    "Bootstrap responsive frontend",
    "Forms and tables for bookings, guest records, and billing"
  ],
  'imdb': [
    "Binary classifier trained on the IMDB 50K review dataset",
    "Text preprocessing and NLP feature extraction feed model training"
  ],
  'sentiment': [
    "Binary classifier trained on the IMDB 50K review dataset",
    "Text preprocessing and NLP feature extraction feed model training"
  ],
  'udemy': [
    "Front-end exercises from structured JavaScript coursework",
    "Responsive layouts and DOM-driven interactivity"
  ],
  'apple quality': [
    "IEEE Publication ICEE-ICT 2024 paper research",
    "Feature scaling & SVM classification on fruit quality metrics"
  ]
};

export default function CaseStudyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const projectIdParam = searchParams.get('id');
  const projectTitleParam = searchParams.get('project');
  
  let safeIndex = 0;
  if (projectIdParam !== null) {
    const parsed = parseInt(projectIdParam, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed < projects.length) {
      safeIndex = parsed;
    }
  } else if (projectTitleParam !== null) {
    const decodedTitle = decodeURIComponent(projectTitleParam).toLowerCase();
    const foundIdx = projects.findIndex(p => 
      p.title.toLowerCase() === decodedTitle || 
      p.title.toLowerCase().includes(decodedTitle) || 
      decodedTitle.includes(p.title.toLowerCase())
    );
    if (foundIdx !== -1) {
      safeIndex = foundIdx;
    }
  }

  const project = projects[safeIndex];

  const titleLower = project.title.toLowerCase();
  let howItWorksBullets: string[] = [];
  for (const key of Object.keys(HOW_IT_WORKS_DATA)) {
    if (titleLower.includes(key)) {
      howItWorksBullets = HOW_IT_WORKS_DATA[key];
      break;
    }
  }
  if (howItWorksBullets.length === 0) {
    howItWorksBullets = [
      "Modular, maintainable architecture designed for enterprise scalability",
      "Comprehensive test coverage and detailed API documentation",
      "Optimized performance and clean separation of concerns"
    ];
  }

  // Theme palette options for case studies (Warm Amber and Muted Teal)
  const colors = [
    { primary: 'text-[#5FB3B3]', bg: 'bg-[#5FB3B3]/10', border: 'border-[#5FB3B3]/30', raw: '#5FB3B3' },
    { primary: 'text-[#E0995A]', bg: 'bg-[#E0995A]/10', border: 'border-[#E0995A]/30', raw: '#E0995A' },
    { primary: 'text-[#E0995A]', bg: 'bg-[#E0995A]/10', border: 'border-[#E0995A]/30', raw: '#E0995A' },
    { primary: 'text-[#5FB3B3]', bg: 'bg-[#5FB3B3]/10', border: 'border-[#5FB3B3]/30', raw: '#5FB3B3' },
    { primary: 'text-[#E0995A]', bg: 'bg-[#E0995A]/10', border: 'border-[#E0995A]/30', raw: '#E0995A' },
    { primary: 'text-[#5FB3B3]', bg: 'bg-[#5FB3B3]/10', border: 'border-[#5FB3B3]/30', raw: '#5FB3B3' }
  ];
  const color = colors[safeIndex % colors.length];

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-hidden bg-[#0B1220] text-[#EDEAE3]">
      {/* Radial ambient glow */}
      <div 
        className="absolute inset-0 transition-all duration-1000 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 15%, ${color.raw} 0%, transparent 55%)`
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Navigation & Jump Dropdown Bar */}
        <div className="relative z-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-2xl bg-[#141D30] border border-[#2A3348] backdrop-blur-xl shadow-xl">
          
          <div className="flex flex-wrap items-center gap-3">
            <Link 
              to="/#all-projects" 
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0B1220] hover:bg-[#1a263d] text-xs font-mono font-bold tracking-wider text-[#E0995A] transition-all duration-200 hover:scale-105 cursor-pointer border border-[#E0995A]/30 shadow-sm"
            >
              <Layers size={14} />
              <span>BACK TO PORTFOLIO</span>
            </Link>

            <Link 
              to="/portfolio" 
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0B1220] hover:bg-[#1a263d] text-xs font-mono font-bold tracking-wider text-[#EDEAE3]/80 hover:text-[#EDEAE3] transition-all duration-200 hover:scale-105 cursor-pointer border border-[#2A3348] shadow-sm"
            >
              <ArrowLeft size={14} />
              <span>PREVIOUS PAGE</span>
            </Link>
          </div>

          {/* Jump-to-project dropdown */}
          <div className="relative w-full sm:w-72">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between bg-[#0B1220] border border-[#2A3348] hover:border-[#E0995A]/50 rounded-xl px-4 py-2 text-xs font-bold font-mono text-[#EDEAE3] focus:outline-none transition-all cursor-pointer shadow-sm"
            >
              <span className="truncate">
                Jump to ({safeIndex + 1}/{projects.length}): {project.title}
              </span>
              <ChevronDown size={14} className={`text-[#E0995A] transition-transform duration-200 shrink-0 ml-2 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-full bg-[#141D30] border border-[#2A3348] rounded-xl shadow-2xl backdrop-blur-2xl z-50 overflow-hidden py-1 max-h-64 overflow-y-auto"
                  >
                    {projects.map((p, idx) => {
                      const isCurrent = idx === safeIndex;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSearchParams({ id: String(idx) });
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                            isCurrent
                              ? 'bg-[#0B1220] text-[#E0995A] font-bold border-l-2 border-[#E0995A]'
                              : 'text-[#8B93A6] hover:bg-[#0B1220]/60 hover:text-[#EDEAE3]'
                          }`}
                        >
                          <span className="truncate">
                            {idx + 1}. {p.title}
                          </span>
                          {isCurrent && <Check size={12} className="text-[#E0995A] shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Project Header & Case Study Detail Card */}
        <motion.div 
          key={project.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-12 rounded-[32px] bg-[#141D30] border border-[#2A3348] backdrop-blur-xl space-y-8 shadow-2xl relative overflow-hidden z-10"
        >
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] opacity-15 pointer-events-none"
            style={{ backgroundColor: color.raw }}
          />

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-[#0B1220] border border-[#2A3348] ${color.primary}`}>
              {project.domain || "Software System"}
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-[#0B1220] border border-[#2A3348] text-[#EDEAE3]/70">
              STATUS: {project.status}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-display font-bold text-[#EDEAE3] leading-tight">
            {project.title}
          </h1>

          {/* Technical Visual */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8B93A6] uppercase tracking-widest font-bold">
              <Code2 size={14} className={color.primary} />
              <span>System Artifact & Implementation Visual</span>
            </div>
            <ProjectVisualMockup project={project} themeColor={color.raw} className="h-[320px] md:h-[380px]" />
          </div>

          {/* Description */}
          <div className="space-y-3 pt-4 border-t border-[#2A3348]">
            <p className="text-xs font-mono text-[#8B93A6] uppercase tracking-widest font-bold">
              Technical Overview & Domain Scope
            </p>
            <p className="text-[#8B93A6] text-base md:text-lg leading-relaxed whitespace-pre-line font-sans">
              {project.description}
            </p>
          </div>

          {/* How It Works Section */}
          <div className="space-y-3 pt-4 border-t border-[#2A3348]">
            <p className="text-xs font-mono text-[#E0995A] uppercase tracking-widest font-bold flex items-center gap-2">
              <Sparkles size={14} />
              <span>How It Works</span>
            </p>
            <ul className="space-y-2.5 font-sans text-sm md:text-base text-[#EDEAE3]/90 bg-[#0B1220]/60 p-5 rounded-2xl border border-[#2A3348]">
              {howItWorksBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E0995A] mt-2 shrink-0" />
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-3 pt-4 border-t border-[#2A3348]">
            <p className="text-xs font-mono text-[#8B93A6] uppercase tracking-widest font-bold">
              Technologies & Libraries
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <SkillLogoBadge key={t} skill={t} size="sm" />
              ))}
            </div>
          </div>

          {/* Direct Repository Link */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#2A3348]">
            {(project.github || project.link) && (
              <a 
                href={project.github || project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-3.5 px-7 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-[#0B1220] bg-[#E0995A] hover:bg-[#d68c4d] transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
              >
                <Github size={16} />
                <span>Source Repository</span>
              </a>
            )}
          </div>

        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#2A3348]">
          <Link
            to="/#all-projects"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#141D30] border border-[#2A3348] hover:border-[#E0995A]/50 text-xs font-mono font-bold text-[#EDEAE3] hover:text-[#E0995A] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-lg group"
          >
            <Layers size={16} className="text-[#E0995A] group-hover:rotate-12 transition-transform" />
            <span>BACK TO PORTFOLIO</span>
          </Link>

          <Link
            to="/portfolio"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#141D30] border border-[#2A3348] hover:bg-[#1a263d] text-xs font-mono font-bold text-[#EDEAE3] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <ArrowLeft size={16} className="text-[#E0995A] group-hover:-translate-x-1 transition-transform" />
            <span>PREVIOUS PAGE</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
