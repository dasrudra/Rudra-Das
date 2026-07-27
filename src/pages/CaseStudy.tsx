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
  Check,
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

  // New Video, Lightbox & Dropdown states
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hasVideo = [
    'NN Fund Management',
    'Accounting & Ledger Software',
    'Smart AI Detection System',
    'Meta Ads Library Scraper',
    'FocusDeck: Chrome Extension',
    'Hotel Management System'
  ].includes(project.title);

  const getProjectDescription = () => {
    const parts = [
      project.description,
      studyData.businessSummary,
      studyData.problemBody?.[0],
      studyData.solutionBody?.[0]
    ].filter(Boolean);
    
    const combined = parts.join(' ');
    const words = combined.split(/\s+/);
    if (words.length > 150) {
      return words.slice(0, 140).join(' ') + '...';
    }
    return combined;
  };

  const getTechIcon = (name: string) => {
    const normalized = name.toLowerCase().trim();
    const iconMap: Record<string, string> = {
      'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
      'react.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
      'tailwind css': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
      'postgresql': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
      'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
      'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
      'github': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
      'fastapi': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
      'odoo': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/odoo.svg',
      'odoo 19': 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/odoo.svg',
      'sqlite': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
      'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
      'html5': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
      'css3': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
      'flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg',
      'bootstrap 5': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
      'opencv': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg',
      'tensorflow': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg',
      'redux state': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg',
      'vite': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg',
    };

    if (iconMap[normalized]) return iconMap[normalized];
    for (const key of Object.keys(iconMap)) {
      if (normalized.includes(key)) {
        return iconMap[key];
      }
    }
    return null;
  };

  const TechIcon = ({ name }: { name: string }) => {
    const iconUrl = getTechIcon(name);
    if (iconUrl) {
      return (
        <img 
          src={iconUrl} 
          alt={name} 
          className="w-7 h-7 object-contain group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }
    return (
      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold font-mono text-white/70 group-hover:bg-white/10 group-hover:text-white transition-all duration-300">
        {name.substring(0, 2).toUpperCase()}
      </div>
    );
  };

  const getSystemArchitectureWorkflow = (title: string) => {
    const workflows: Record<string, {
      input: { title: string; desc: string; icon: string };
      processing: { title: string; desc: string; icon: string };
      coreModule: { title: string; desc: string; icon: string };
      businessLogic: { title: string; desc: string; icon: string };
      output: { title: string; desc: string; icon: string };
    }> = {
      'NN Fund Management': {
        input: { title: 'Wire Ingestion / API', desc: 'Ingestion of bank wire transactions and API event webhooks.', icon: 'database' },
        processing: { title: 'Signature Auth Validation', desc: 'Validates API hashes, request signatures, and formats metadata.', icon: 'shield' },
        coreModule: { title: 'NN Allocation Engine', desc: 'Custom allocation service (NN_ALLOC_ENG) calculates distribution matrices.', icon: 'layers' },
        businessLogic: { title: 'Investor Ratios Checking', desc: 'Splits funds based on contractual ratios and verifies budget boundaries.', icon: 'zap' },
        output: { title: 'Signed General Ledgers', desc: 'Issues digitally signed transaction receipts and locks general ledger entries.', icon: 'activity' }
      },
      'Accounting & Ledger Software': {
        input: { title: 'Financial Records Ingest', desc: 'Captures accounting logs, party invoices, and cashbook data.', icon: 'book' },
        processing: { title: 'Double-Entry Verification', desc: 'Applies double-entry verification rules to ensure zero balance drifts.', icon: 'cpu' },
        coreModule: { title: 'Real-Time Ledger Engine', desc: 'Propagates adjustments, balances, and cashbooks asynchronously.', icon: 'layers' },
        businessLogic: { title: 'Auditing & Tax Rules', desc: 'Enforces strict tax codes, fiscal controls, and anti-leak rules.', icon: 'shield' },
        output: { title: 'Unified Liquidity Board', desc: 'Renders dynamic cashflows, ledger statements, and CSV exports.', icon: 'activity' }
      },
      'FocusDeck: Chrome Extension': {
        input: { title: 'Active Browser Listeners', desc: 'Listens to browser tabs, active page requests, and task list inputs.', icon: 'globe' },
        processing: { title: 'Manifest v3 Background Task', desc: 'Intercepts navigation requests against selective blocklists.', icon: 'cpu' },
        coreModule: { title: 'Chrome Storage Sync', desc: 'Maintains low-latency state between user UI and active blocker.', icon: 'database' },
        businessLogic: { title: 'Focus Activity Scoring', desc: 'Computes deep productivity focus scores based on active vs idle times.', icon: 'zap' },
        output: { title: 'Active Extension Overlay', desc: 'Blocks distracting sites instantly and updates dashboard metrics.', icon: 'activity' }
      },
      'DistractCheck: Selective Attention in LLMs': {
        input: { title: 'High-Noise Datasets', desc: 'Feeds unstructured customer support query context with heavy noise.', icon: 'database' },
        processing: { title: 'Prompt Routing Pipe', desc: 'Tokenizes and structures context, preparing benchmark parameters.', icon: 'layers' },
        coreModule: { title: 'Groq LLM Inference', desc: 'Executes highly parallel, low-latency LLM context evaluations.', icon: 'cpu' },
        businessLogic: { title: 'Attention Audit Bench', desc: 'Scores how accurately key details are retrieved among noise.', icon: 'shield' },
        output: { title: 'Decision Telemetry Panel', desc: 'Logs model error rates, noise vulnerabilities, and analytics.', icon: 'activity' }
      },
      'Smart AI Detection System': {
        input: { title: 'Live CCTV Camera Ingestion', desc: 'Ingests RTSP video stream from plant gates frame-by-frame.', icon: 'globe' },
        processing: { title: 'YOLOv8 Model Inference', desc: 'Runs real-time model inference for vehicles and personnel.', icon: 'cpu' },
        coreModule: { title: 'Boundary Crossing Tracker', desc: 'Tracks bounding box trajectories across digital line fences via OpenCV.', icon: 'layers' },
        businessLogic: { title: 'Directional Traffic Counter', desc: 'Differentiates IN vs OUT movements and compiles traffic flow.', icon: 'zap' },
        output: { title: 'Gate Counter Dashboard', desc: 'Populates gate counters, snapshots, and triggers local logs.', icon: 'activity' }
      },
      'Hotel Management System': {
        input: { title: 'Guest Booking Requests', desc: 'Processes check-in sheets, room selections, and billing requests.', icon: 'book' },
        processing: { title: 'Flask MVC Controller Parsers', desc: 'Parses forms, validates payloads, and resolves active user sessions.', icon: 'cpu' },
        coreModule: { title: 'SQLAlchemy Schema Sync', desc: 'Synchronizes guest reservations with the relational SQLite schema.', icon: 'database' },
        businessLogic: { title: 'Room Allocation Checks', desc: 'Prevents double-booking and automates tax and discount rates.', icon: 'shield' },
        output: { title: 'Interactive Guest Calendar', desc: 'Renders guest occupancy calendar, checkout lists, and PDF invoices.', icon: 'activity' }
      },
      'Sentiment Analysis Model': {
        input: { title: 'Raw Review Text Feeds', desc: 'Ingests massive datasets of unstructured product or IMDB text reviews.', icon: 'database' },
        processing: { title: 'NLP Processing Pipeline', desc: 'Preprocesses text via tokenization, lemmatization, and stopword filters.', icon: 'layers' },
        coreModule: { title: 'TF-IDF Grid Matrix', desc: 'Vectorizes text blocks into high-dimensional numerical arrays.', icon: 'cpu' },
        businessLogic: { title: 'Scikit-Learn Classifier', desc: 'Trains and evaluates models to predict positive or negative sentiment.', icon: 'zap' },
        output: { title: 'Market Sentiment Intel', desc: 'Displays model accuracy metrics, sentiment distribution, and trends.', icon: 'activity' }
      },
      'Speech Emotion Recognition': {
        input: { title: 'Live Sound Clip Stream', desc: 'Ingests customer microphone audio clips under active support calls.', icon: 'globe' },
        processing: { title: 'MFCC Waveform Extractor', desc: 'Applies Librosa and signal tools to extract deep acoustic wave metrics.', icon: 'cpu' },
        coreModule: { title: 'Acoustic Model Classifier', desc: 'Processes signal features through pre-trained ML models.', icon: 'layers' },
        businessLogic: { title: 'Vocal Emotion Triggers', desc: 'Identifies high frustration, anxiety, or calm vocal triggers.', icon: 'shield' },
        output: { title: 'Agent Warning Console', desc: 'Sends live alerts and telemetry of caller mood states instantly.', icon: 'activity' }
      },
      'Udemy Projects': {
        input: { title: 'Layout Interaction Capture', desc: 'Captures user clicks, touch inputs, and viewport resize events.', icon: 'book' },
        processing: { title: 'DOM Event Processing Handlers', desc: 'Processes events synchronously using modern JavaScript triggers.', icon: 'cpu' },
        coreModule: { title: 'Responsive Flex Grid UI', desc: 'Renders adaptive layout components dynamically based on media size.', icon: 'layers' },
        businessLogic: { title: 'Client-Side Sandbox Scope', desc: 'Processes logical operations within standard sandbox scopes.', icon: 'zap' },
        output: { title: 'Cross-Device Utility collection', desc: 'Delivers a responsive, lightweight portfolio showcase in the browser.', icon: 'activity' }
      },
      'Apple Quality Prediction': {
        input: { title: 'Physical Measurement Specs', desc: 'Ingests physical dimensions, weight, acidity, and density indices.', icon: 'database' },
        processing: { title: 'Pandas Data Correlation', desc: 'Cleans null features, normalizes scales, and correlates metrics.', icon: 'layers' },
        coreModule: { title: 'Regression Model Benchmarks', desc: 'Runs advanced regression and correlation algorithms across variables.', icon: 'cpu' },
        businessLogic: { title: 'Freshness Prediction System', desc: 'Classifies premium vs low-grade crops using classification models.', icon: 'shield' },
        output: { title: 'Classification Reports Panel', desc: 'Renders predictive tables, confusion matrices, and quality score distributions.', icon: 'activity' }
      },
      'Meta Ads Library Scraper': {
        input: { title: 'Competitor Identifiers', desc: 'Ingests targeted page identifiers or keyword configurations.', icon: 'globe' },
        processing: { title: 'BeautifulSoup Extraction', desc: 'Parses DOM structures, extracting active meta advertising lists.', icon: 'layers' },
        coreModule: { title: 'Registry Data Extractor', desc: 'Pulls campaign images, copy, active timelines, and spending estimates.', icon: 'cpu' },
        businessLogic: { title: 'Scraping Cleansing Pipelines', desc: 'Deduplicates records based on campaign hashes and structures datasets.', icon: 'shield' },
        output: { title: 'Exported Campaign Tables', desc: 'Generates structured JSON/CSV files of active ad listings.', icon: 'activity' }
      }
    };

    const cleanTitle = title.replace(': Chrome Extension', '').replace(': Selective Attention in LLMs', '').replace('SEL ', '').trim();
    let match = workflows[title] || workflows[cleanTitle];
    if (!match) {
      for (const key of Object.keys(workflows)) {
        if (title.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(title.toLowerCase())) {
          match = workflows[key];
          break;
        }
      }
    }
    return match || workflows['NN Fund Management'];
  };

  const getProjectGalleryImages = (title: string, mainImage: string) => {
    const galleries: Record<string, { url: string; caption: string }[]> = {
      'NN Fund Management': [
        { url: mainImage, caption: 'Primary Fund Allocation Dashboard' },
        { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', caption: 'Real-Time Double-Entry Ledger' },
        { url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80', caption: 'Automated Capital Allocation Metrics' }
      ],
      'Accounting & Ledger Software': [
        { url: mainImage, caption: 'Unified Ledger Control Center' },
        { url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80', caption: 'Multi-Party Reconciliation Sheet' },
        { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', caption: 'Secure Transaction Auditor Interface' }
      ],
      'FocusDeck: Chrome Extension': [
        { url: mainImage, caption: 'Chrome Browser Focus overlay' },
        { url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80', caption: 'Interactive Daily Task Planner' },
        { url: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80', caption: 'Distraction Analytics Insights' }
      ],
      'DistractCheck: Selective Attention in LLMs': [
        { url: mainImage, caption: 'Attention Benchmark Testing Panel' },
        { url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80', caption: 'LLM Response Accuracy Audit' },
        { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80', caption: 'Context Distraction Metrics Matrix' }
      ],
      'Smart AI Detection System': [
        { url: mainImage, caption: 'Computer Vision Live Ingestion Gate' },
        { url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', caption: 'CCTV Neural Network Monitor' },
        { url: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80', caption: 'Vehicle Tracking and Counting Analytics' }
      ],
      'Hotel Management System': [
        { url: mainImage, caption: 'Relational SQLite Reservation Calendar' },
        { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80', caption: 'Dynamic Occupancy & Guest Logger' },
        { url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80', caption: 'Billing & POS Invoices Dispatcher' }
      ],
      'Sentiment Analysis Model': [
        { url: mainImage, caption: 'TF-IDF Preprocessing Engine' },
        { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', caption: 'IMDB Sentiment Class Distribution' },
        { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', caption: 'Model Validation Curve Matrix' }
      ],
      'Speech Emotion Recognition': [
        { url: mainImage, caption: 'Deep Acoustic Waveform Ingestion' },
        { url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=800&q=80', caption: 'MFCC Vocal Signal Analyzer' },
        { url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80', caption: 'Vocal Frustration Detection Matrix' }
      ],
      'Udemy Projects': [
        { url: mainImage, caption: 'Interactive DOM Project Showcase' },
        { url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', caption: 'Clean JavaScript Core Utilities' },
        { url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80', caption: 'Fully Responsive Multi-Grid CSS Layouts' }
      ],
      'Apple Quality Prediction': [
        { url: mainImage, caption: 'Acidity & Texture Feature Heatmap' },
        { url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80', caption: 'Model Freshness Correlation Matrix' },
        { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', caption: 'Class Balance Accuracy Benchmarks' }
      ],
      'Meta Ads Library Scraper': [
        { url: mainImage, caption: 'Competitor Ads Scraper Controller' },
        { url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80', caption: 'Scraped Campaign Ad Data Formatter' },
        { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', caption: 'Exported Competitor Ads Registry Table' }
      ]
    };

    const cleanTitle = title.replace(': Chrome Extension', '').replace(': Selective Attention in LLMs', '').replace('SEL ', '').trim();
    let match = galleries[title] || galleries[cleanTitle];
    if (!match) {
      for (const key of Object.keys(galleries)) {
        if (title.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(title.toLowerCase())) {
          match = galleries[key];
          break;
        }
      }
    }
    return match || [
      { url: mainImage, caption: 'Primary System View' },
      { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', caption: 'Analytics and Logging Interface' },
      { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', caption: 'Core Process Monitor' }
    ];
  };

  const getProjectVideoSources = (title: string): string[] => {
    switch (title) {
      case 'NN Fund Management':
        return [
          '/videos/nn-fund-management.mp4',
          '/nn-fund-management.mp4',
          '/videos/NN-FUND-MANAGEMENT.mp4',
          '/NN-FUND-MANAGEMENT.mp4'
        ];
      case 'Accounting & Ledger Software':
        return [
          '/videos/accounts-and-ledger-system.mp4',
          '/accounts-and-ledger-system.mp4',
          '/videos/ACCOUNTS-AND-LEDGER-SYSTEM.mp4',
          '/ACCOUNTS-AND-LEDGER-SYSTEM.mp4'
        ];
      case 'Smart AI Detection System':
        return [
          '/videos/smart-detection-and-counting-system.mp4',
          '/smart-detection-and-counting-system.mp4',
          '/videos/SMART-DETECTION-AND-COUNTING-SYSTEM.mp4',
          '/SMART-DETECTION-AND-COUNTING-SYSTEM.mp4'
        ];
      case 'Meta Ads Library Scraper':
        return [
          '/videos/meta-ads-library-scraper.mp4',
          '/meta-ads-library-scraper.mp4',
          '/videos/META-ADS-LIBRARY-SCRAPER.mp4',
          '/META-ADS-LIBRARY-SCRAPER.mp4'
        ];
      case 'FocusDeck: Chrome Extension':
        return [
          '/videos/focusdeck.mp4',
          '/focusdeck.mp4'
        ];
      case 'Hotel Management System':
        return [
          '/videos/hotel-management-gui-and-normal-program-python-tkinter.mp4',
          '/hotel-management-gui-and-normal-program-python-tkinter.mp4',
          '/videos/hotel-management-system.mp4',
          '/hotel-management-system.mp4'
        ];
      default:
        return [];
    }
  };

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
      case 'globe': return <Globe size={size} className={className} />;
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
            <div className="relative w-full sm:w-72">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between bg-navy-900/90 border border-white/15 hover:border-white/25 rounded-xl px-4 py-2 text-xs font-bold font-mono text-white focus:outline-none focus:border-accent-primary/60 transition-all cursor-pointer shadow-sm"
              >
                <span className="truncate">
                  {safeIndex + 1}. {project.title}
                </span>
                <ChevronDown size={14} className={`text-white/60 transition-transform duration-200 shrink-0 ml-2 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    {/* Backdrop overlay to close on outside click */}
                    <div className="fixed inset-0 z-30" onClick={() => setIsDropdownOpen(false)} />
                    
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-full sm:w-80 bg-navy-950/95 border border-white/15 rounded-xl shadow-2xl backdrop-blur-xl z-40 overflow-hidden py-1 max-h-64 overflow-y-auto"
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
                                ? 'bg-navy-900/90 text-white font-bold border-l-2 border-accent-primary'
                                : 'text-white/70 hover:bg-navy-900/50 hover:text-white'
                            }`}
                          >
                            <span className="truncate">
                              {idx + 1}. {p.title}
                            </span>
                            {isCurrent && <Check size={12} className="text-accent-primary shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
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
                {hasVideo ? (
                  <button 
                    onClick={() => setIsVideoModalOpen(true)}
                    className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-center text-[11px] font-mono font-bold uppercase tracking-widest text-navy-950 transition-all duration-300 transform active:scale-95 hover:scale-[1.02] shadow-lg cursor-pointer border-none"
                    style={{ backgroundColor: color.raw }}
                  >
                    <Globe size={14} className="shrink-0" />
                    <span>Live Demo</span>
                  </button>
                ) : (
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
                )}

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

        {/* ==================== 3. PROJECT DESCRIPTION ==================== */}
        <section id="description" className="mb-20">
          <div className="grid md:grid-cols-12 gap-8 items-stretch">
            {/* Labeled Side Heading */}
            <div className="md:col-span-4 space-y-2">
              <span className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase ${color.bg} border ${color.border} ${color.primary}`}>
                STAGE 01: OVERVIEW
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Project Description
              </h2>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                DEEP DIVE INTO BUSINESS OBJECTIVES, TARGET VALUE, AND FUNCTIONAL METRICS.
              </p>
            </div>

            {/* Detailed Box */}
            <div className="md:col-span-8 p-6 md:p-8 rounded-[24px] bg-navy-950/20 border border-white/5 flex flex-col justify-center">
              <p className="text-sm md:text-base text-muted-slate leading-relaxed font-sans">
                {getProjectDescription()}
              </p>
            </div>
          </div>
        </section>

        {/* ==================== 4. TECHNOLOGY STACK ==================== */}
        <section id="tech-stack" className="mb-20">
          <div className="space-y-6">
            <div className="space-y-1">
              <span className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase ${color.bg} border ${color.border} ${color.primary}`}>
                STAGE 02: STACK SPECS
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Technology Stack
              </h2>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                ENGINEERED WITH MODERN LANGUAGES, ECOSYSTEM FRAMEWORKS, AND UTILITY TOOLS.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {project.tech.map((t, idx) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.03)' }}
                  className="group flex items-center gap-3 p-3.5 rounded-2xl bg-navy-950/20 border border-white/5 backdrop-blur-sm transition-all duration-300"
                >
                  <TechIcon name={t} />
                  <span className="text-xs font-mono font-bold text-white/80 group-hover:text-white transition-colors">
                    {t}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. SYSTEM ARCHITECTURE ==================== */}
        <section id="architecture" className="mb-20">
          <div className="space-y-6">
            <div className="space-y-1">
              <span className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase ${color.bg} border ${color.border} ${color.primary}`}>
                STAGE 03: TECHNICAL FLUID TOPOLOGY
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                System Architecture
              </h2>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                TECHNICAL PIPELINE TRACING DATA PATHWAYS FROM DATA INGESTION TO SECURE PRODUCTION STATE COMMITS.
              </p>
            </div>

            <div className="relative p-6 md:p-8 rounded-[24px] bg-navy-950/20 border border-white/5 space-y-8 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
                {[
                  { label: 'INGEST', title: getSystemArchitectureWorkflow(project.title).input.title, desc: getSystemArchitectureWorkflow(project.title).input.desc, icon: getSystemArchitectureWorkflow(project.title).input.icon, color: color.primary, bg: color.bg, border: color.border },
                  { label: 'VALIDATE', title: getSystemArchitectureWorkflow(project.title).processing.title, desc: getSystemArchitectureWorkflow(project.title).processing.desc, icon: getSystemArchitectureWorkflow(project.title).processing.icon, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/25' },
                  { label: 'PROCESS', title: getSystemArchitectureWorkflow(project.title).coreModule.title, desc: getSystemArchitectureWorkflow(project.title).coreModule.desc, icon: getSystemArchitectureWorkflow(project.title).coreModule.icon, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/25' },
                  { label: 'RULES', title: getSystemArchitectureWorkflow(project.title).businessLogic.title, desc: getSystemArchitectureWorkflow(project.title).businessLogic.desc, icon: getSystemArchitectureWorkflow(project.title).businessLogic.icon, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/25' },
                  { label: 'COMMIT', title: getSystemArchitectureWorkflow(project.title).output.title, desc: getSystemArchitectureWorkflow(project.title).output.desc, icon: getSystemArchitectureWorkflow(project.title).output.icon, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25' },
                ].map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 space-y-3 relative flex flex-col justify-between h-full hover:border-white/10 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-white/30 uppercase">{step.label}</span>
                        <div className={`w-7 h-7 rounded-lg ${step.bg} border ${step.border} flex items-center justify-center`}>
                          {renderIcon(step.icon, 14, step.color)}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white font-mono">{step.title}</h4>
                        <p className="text-[10px] text-muted-slate leading-relaxed mt-1.5">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 6. PROJECT GALLERY ==================== */}
        <section id="gallery" className="mb-20">
          <div className="space-y-6">
            <div className="space-y-1">
              <span className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold tracking-widest uppercase ${color.bg} border ${color.border} ${color.primary}`}>
                STAGE 04: INTERFACE VERIFICATION
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Project Gallery
              </h2>
              <p className="text-xs font-mono text-white/30 uppercase tracking-widest leading-relaxed">
                VISUAL SHOWCASE OF THE LIVE INTERFACES, DASHBOARDS, AND TRANSACTION LOGGERS.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {getProjectGalleryImages(project.title, project.image).map((img, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className="group cursor-zoom-in rounded-2xl overflow-hidden border border-white/5 bg-navy-950/20 p-2 hover:border-white/20 transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-xl relative bg-[#070a13]">
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-xs font-mono font-bold text-white tracking-wide truncate w-full">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] font-mono font-bold text-white/50 px-2 pt-2 pb-1 uppercase tracking-wider group-hover:text-white/80 transition-colors">
                    {img.caption}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 7. PREVIOUS, NEXT & BACK NAVIGATION ==================== */}
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

        {/* ==================== 8. MODALS ==================== */}
        {/* Video Player Modal */}
        <AnimatePresence>
          {isVideoModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-[#070a13] p-3 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Top Bar */}
                <div className="flex items-center justify-between px-3 pb-3 border-b border-white/5 text-xs font-mono text-white/50 mb-2">
                  <div className="flex items-center gap-2">
                    <Globe size={12} className={color.primary} />
                    <span className="font-bold text-white/90 uppercase tracking-wider">{project.title} Demo Video</span>
                  </div>
                  <button
                    onClick={() => setIsVideoModalOpen(false)}
                    className="px-2 py-1 rounded bg-white/5 text-[10px] font-bold text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    CLOSE ×
                  </button>
                </div>

                {/* Video Container */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/95 border border-white/5">
                  <video
                    controls
                    className="w-full h-full object-contain"
                    poster={project.image}
                    preload="metadata"
                    playsInline
                  >
                    {getProjectVideoSources(project.title).map((src, idx) => (
                      <source key={idx} src={src} type="video/mp4" />
                    ))}
                    Your browser does not support the video tag.
                  </video>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Screenshot Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative max-w-5xl w-full rounded-2xl border border-white/10 bg-[#070a13] p-2 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 border border-white/10 text-white/80 hover:bg-black/80 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="text-sm font-bold block px-1">×</span>
                </button>

                <div className="rounded-xl overflow-hidden aspect-[16/10] bg-[#070a13]">
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.caption}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 text-center font-mono text-xs text-white/70">
                  {selectedImage.caption}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
