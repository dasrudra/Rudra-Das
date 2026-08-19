import { Layers, Cpu, Database, Globe } from 'lucide-react';
import { NavLink, Service, Project, Skill, TimelineItem } from './types';

import distractCheckCover from './assets/images/distract_check_cover_1784703888424.jpg';
import plantDashboardCover from './assets/images/plant_dashboard_cover_1787110872918.jpg';
import smartDetectionCover from './assets/images/smart_detection_ai_cover_1786162259074.jpg';
import nnFundCover from './assets/images/nn_fund_management_cover_1786162278657.jpg';
import accountingLedgerCover from './assets/images/accounting_ledger_cover_1786162295638.jpg';
import metaAdsCover from './assets/images/meta_ads_scraper_cover_1786162330802.jpg';
import focusDeckCover from './assets/images/focusdeck_cover_1786162312827.jpg';
import appleQualityCover from './assets/images/apple_quality_cover_1784703903675.jpg';

export const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Contact', href: '/#contact' },
];

export const services: Service[] = [
  {
    title: 'ERP Development',
    description: 'Custom ERP solutions tailored for enterprise business optimization and process automation.',
    icon: <Layers className="w-8 h-8 text-accent-primary" />,
    size: 'large'
  },
  {
    title: 'SAP ABAP Customization',
    description: 'Expertise in SAP ABAP development, reports, and functional application enhancements.',
    icon: <Cpu className="w-8 h-8 text-accent-primary" />,
  },
  {
    title: 'Data Analysis Solutions',
    description: 'Advanced data processing and visualization for informed business decision-making.',
    icon: <Database className="w-8 h-8 text-accent-primary" />,
  },
  {
    title: 'Web Application Development',
    description: 'Modern, scalable web applications built with Python, Flask, and modern front-end stacks.',
    icon: <Globe className="w-8 h-8 text-accent-primary" />,
    size: 'large'
  },
];

export const projects: Project[] = [
  {
    title: 'Production Capacity & Operational Intelligence Dashboard',
    description: 'A full-stack production planning dashboard that transforms monthly Excel Activity Plan data into executive KPIs, machine-level capacity analysis, utilization metrics, and operational insights. Built with a Python/Pandas/FastAPI ingestion pipeline and a React/TypeScript frontend with target-vs-capacity charts, machine schedules, and status distributions.',
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Pandas', 'OpenPyXL', 'SQLite'],
    image: plantDashboardCover,
    link: 'https://github.com/dasrudra/Production-Plant-Dashboard',
    domain: 'ERP & Manufacturing',
    categories: ['ERP', 'Automation', 'Full Stack'],
    status: 'Featured Production Tool',
    featured: true,
    liveLink: 'https://github.com/dasrudra/Production-Plant-Dashboard',
    caseStudyLink: 'https://github.com/dasrudra/Production-Plant-Dashboard'
  },
  {
    title: 'DistractCheck: Measuring Selective Attention in Language Models',
    description: "A benchmark measuring how reliably large language models retrieve the right answer when it's buried in distracting context. Submitted to Google DeepMind's Kaggle hackathon on measuring AI cognitive abilities — the Attention track, competing against 1,000+ teams for a $200,000 prize pool.",
    tech: ['Python', 'LangChain', 'Groq API', 'LLM Benchmarks', 'Dataset Curation'],
    image: distractCheckCover,
    link: 'https://kaggle.com/competitions/kaggle-measuring-agi/writeups/distract-check-measuring-selective-attention-in-l',
    domain: 'AI Research',
    categories: ['AI', 'Research'],
    status: 'Hackathon Submission',
    featured: true,
    liveLink: 'https://kaggle.com/competitions/kaggle-measuring-agi/writeups/distract-check-measuring-selective-attention-in-l',
    caseStudyLink: 'https://github.com/dasrudra/DistractCheck-Measuring-Selective-Attention-in-Language-Models#attention-scores'
  },
  {
    title: 'Smart AI Detection System',
    description: 'A real-time gate-counting system. An RTSP camera feed runs through OpenCV and YOLOv8 for object detection; a centroid tracker keeps IDs consistent frame to frame; configurable virtual lines trigger IN/OUT counts as people or vehicles cross them. Events, hourly summaries, and snapshots log to SQLite and CSV, viewable on a FastAPI dashboard.',
    tech: ['Python', 'YOLOv8', 'OpenCV', 'FastAPI', 'SQLite'],
    image: smartDetectionCover,
    link: 'https://github.com/dasrudra/Smart-Detection-Ai',
    domain: 'Computer Vision',
    categories: ['AI', 'Automation'],
    status: 'Personal Project',
    featured: true,
    liveLink: 'https://github.com/dasrudra/Smart-Detection-Ai',
    caseStudyLink: 'https://github.com/dasrudra/Smart-Detection-Ai#vision-pipeline'
  },
  {
    title: 'NN Fund Management (Odoo)',
    description: 'A custom Odoo 19 module built for a technical assessment, covering the full fund lifecycle — incoming funds, allocations, requisitions, and bill control — behind a two-stage GM-then-MD approval chain. Server-side validation blocks duplicate transaction references and over-allocation; every action logs to an audit trail. Containerized with Docker, covered by automated tests.',
    tech: ['Odoo 19', 'Python', 'PostgreSQL', 'Docker', 'ERP Workflows'],
    image: nnFundCover,
    link: 'https://github.com/dasrudra/NN-Fund-Management',
    domain: 'ERP Systems',
    categories: ['ERP', 'Automation', 'Full Stack'],
    status: 'Technical Assessment',
    featured: true,
    liveLink: 'https://github.com/dasrudra/NN-Fund-Management',
    caseStudyLink: 'https://github.com/dasrudra/NN-Fund-Management#workflow-design'
  },
  {
    title: 'Accounting & Ledger Management System',
    description: 'A role-based ledger application for daily customer-account bookkeeping. Balances carry forward automatically between closings; once a day is closed, records lock, and corrections route through auditable adjustment entries instead of silent edits.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    image: accountingLedgerCover,
    link: 'https://github.com/dasrudra/Ledger-Software-frontend',
    domain: 'Fintech',
    categories: ['ERP', 'Full Stack'],
    status: 'Frontend Complete · Backend Planned',
    featured: false,
    liveLink: 'https://github.com/dasrudra/Ledger-Software-frontend',
    caseStudyLink: 'https://github.com/dasrudra/Ledger-Software-frontend#system-architecture'
  },
  {
    title: 'Meta Ads Library Scraper',
    description: "A command-line tool for Meta's official Ads Library API. Search by keyword, Page URL, or Page ID, with automatic pagination, retry-with-backoff on transient failures, and clean CSV/JSON export. Built as five single-responsibility modules, covered by a pytest suite testing normalization, export, and pagination logic.",
    tech: ['Python', 'Meta Graph API', 'Pytest', 'CLI Design'],
    image: metaAdsCover,
    link: 'https://github.com/dasrudra/meta-ads-library-scraper',
    domain: 'Automation',
    categories: ['Automation', 'Productivity'],
    status: 'Personal Project',
    featured: false,
    liveLink: 'https://github.com/dasrudra/meta-ads-library-scraper',
    caseStudyLink: 'https://github.com/dasrudra/meta-ads-library-scraper#scraping-performance'
  },
  {
    title: 'Speech Emotion Recognition',
    description: 'A notebook-based exploration into classifying emotional states from speech audio — extracting acoustic features and training classifiers to distinguish emotions like anger, calm, and happiness from voice recordings.',
    tech: ['Python', 'Scikit-Learn', 'Signal Processing'],
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    link: 'https://github.com/dasrudra/Speech-Emotion-Recognition',
    domain: 'Audio AI',
    categories: ['AI', 'Research'],
    status: 'Personal Project',
    featured: false,
    liveLink: 'https://github.com/dasrudra/Speech-Emotion-Recognition',
    caseStudyLink: 'https://github.com/dasrudra/Speech-Emotion-Recognition#model-performance'
  },
  {
    title: 'FocusDeck: Chrome New Tab Dashboard',
    description: 'A Chrome New Tab replacement built with React, TypeScript, and Tailwind CSS — currently in early development. The scaffold and extension manifest are in place; the roadmap covers workspaces, quick links, saved notes, a focus timer, and theme customization, backed by the Chrome Storage API.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Chrome Extension APIs', 'Manifest V3'],
    image: focusDeckCover,
    link: 'https://github.com/dasrudra/FocusDeck---Chrome-Extension',
    domain: 'Productivity',
    categories: ['Productivity', 'Full Stack'],
    status: 'In Development',
    featured: false,
    liveLink: 'https://github.com/dasrudra/FocusDeck---Chrome-Extension',
    caseStudyLink: 'https://github.com/dasrudra/FocusDeck---Chrome-Extension#productivity-metrics'
  },
  {
    title: 'Hotel Management System',
    description: 'A hotel operations manager built with Flask and SQLite — room bookings, guest records, and billing behind a responsive Bootstrap interface designed to work cleanly across devices.',
    tech: ['Python', 'Flask', 'SQLite', 'Bootstrap'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    link: 'https://github.com/dasrudra/Hotel-Management-System',
    domain: 'Web Application',
    categories: ['ERP', 'Full Stack'],
    status: 'Personal Project',
    featured: false,
    liveLink: 'https://github.com/dasrudra/Hotel-Management-System',
    caseStudyLink: 'https://github.com/dasrudra/Hotel-Management-System'
  },
  {
    title: 'Sentiment Analysis: IMDB Movie Reviews',
    description: 'A binary sentiment classifier trained on the IMDB movie-review dataset — text preprocessing and NLP feature extraction feed a model that predicts whether a review reads positive or negative.',
    tech: ['Python', 'Scikit-Learn', 'NLP', 'Feature Extraction'],
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    link: 'https://github.com/dasrudra/IMDB/blob/main/imdb.ipynb',
    domain: 'NLP',
    categories: ['AI', 'Research'],
    status: 'Personal Project',
    featured: false,
    liveLink: 'https://github.com/dasrudra/IMDB/blob/main/imdb.ipynb',
    caseStudyLink: 'https://github.com/dasrudra/IMDB/blob/main/imdb.ipynb'
  },
  {
    title: 'Udemy Coursework Projects',
    description: 'A collection of front-end exercises built while working through structured JavaScript coursework — responsive layouts and DOM-driven interactivity across a handful of small, self-contained tools.',
    tech: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'DOM Manipulation'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    link: 'https://github.com/dasrudra/Udemy-Projects',
    domain: 'Frontend',
    categories: ['Full Stack'],
    status: 'Coursework / Practice',
    featured: false,
    liveLink: 'https://github.com/dasrudra/Udemy-Projects',
    caseStudyLink: 'https://github.com/dasrudra/Udemy-Projects'
  },
  {
    title: 'Apple Quality Prediction',
    description: 'Empowers automated sorting lines in precision agriculture by determining critical physical attributes that predict freshness and market quality.',
    tech: ['Machine Learning', 'Data Analysis', 'Correlation Modeling', 'Kaggle Benchmarking', 'Research'],
    image: appleQualityCover,
    link: 'https://ieeexplore.ieee.org/document/10534426?fbclid=IwZXh0bgNhZW0CMTAAAR1lt3eMmyzSVR3y0ghub0XjKbsXFH1wRFXiGlf3FSmI9NujTAS6lmYp3is_aem_ZmFrZWR1bW15MTZieXRlcw',
    domain: 'Data Science',
    categories: ['AI', 'Research'],
    status: 'Academic Research',
    featured: false,
    liveLink: 'https://ieeexplore.ieee.org/document/10534426?fbclid=IwZXh0bgNhZW0CMTAAAR1lt3eMmyzSVR3y0ghub0XjKbsXFH1wRFXiGlf3FSmI9NujTAS6lmYp3is_aem_ZmFrZWR1bW15MTZieXRlcw',
    caseStudyLink: 'https://ieeexplore.ieee.org/document/10534426?fbclid=IwZXh0bgNhZW0CMTAAAR1lt3eMmyzSVR3y0ghub0XjKbsXFH1wRFXiGlf3FSmI9NujTAS6lmYp3is_aem_ZmFrZWR1bW15MTZieXRlcw'
  },
];

export function matchesCategory(project: Project, category: string): boolean {
  if (!category || category.toLowerCase() === 'all') return true;

  const selectedNorm = category.trim().toLowerCase().replace(/\s+/g, '');

  if (project.categories && Array.isArray(project.categories)) {
    if (project.categories.some(c => c.trim().toLowerCase().replace(/\s+/g, '') === selectedNorm)) {
      return true;
    }
  }

  const domainLower = (project.domain || '').toLowerCase();
  const titleLower = (project.title || '').toLowerCase();
  const descLower = (project.description || '').toLowerCase();
  const statusLower = (project.status || '').toLowerCase();
  const techLower = (project.tech || []).map(t => t.toLowerCase());

  if (selectedNorm === 'ai') {
    return (
      domainLower.includes('ai') ||
      domainLower.includes('vision') ||
      domainLower.includes('nlp') ||
      titleLower.includes('ai') ||
      descLower.includes('llm') ||
      descLower.includes('machine learning') ||
      techLower.some(t => t.includes('ai') || t.includes('nlp') || t.includes('llm') || t.includes('yolo') || t.includes('opencv') || t.includes('machine learning'))
    );
  }

  if (selectedNorm === 'erp') {
    return (
      domainLower.includes('erp') ||
      titleLower.includes('erp') ||
      titleLower.includes('odoo') ||
      titleLower.includes('hotel') ||
      titleLower.includes('ledger') ||
      descLower.includes('erp') ||
      techLower.some(t => t.includes('erp') || t.includes('odoo') || t.includes('abap') || t.includes('sap'))
    );
  }

  if (selectedNorm === 'fullstack') {
    return (
      domainLower.includes('fintech') ||
      domainLower.includes('web') ||
      domainLower.includes('frontend') ||
      domainLower.includes('full stack') ||
      titleLower.includes('ledger') ||
      titleLower.includes('udemy') ||
      titleLower.includes('hotel') ||
      techLower.some(t => t.includes('react') || t.includes('flask') || t.includes('fastapi') || t.includes('html5'))
    );
  }

  if (selectedNorm === 'research') {
    return (
      domainLower.includes('research') ||
      domainLower.includes('science') ||
      statusLower.includes('research') ||
      titleLower.includes('distract') ||
      titleLower.includes('apple') ||
      descLower.includes('benchmark') ||
      descLower.includes('kaggle')
    );
  }

  if (selectedNorm === 'productivity') {
    return (
      domainLower.includes('productivity') ||
      titleLower.includes('focus') ||
      titleLower.includes('extension') ||
      titleLower.includes('scraper') ||
      descLower.includes('chrome')
    );
  }

  if (selectedNorm === 'automation') {
    return (
      domainLower.includes('automation') ||
      titleLower.includes('scraper') ||
      titleLower.includes('detection') ||
      descLower.includes('scrape') ||
      descLower.includes('automation')
    );
  }

  return false;
}

export const skills: Skill[] = [
  { name: 'Python', level: 95, category: 'Programming' },
  { name: 'ABAP', level: 85, category: 'Programming' },
  { name: 'TypeScript', level: 85, category: 'Programming' },
  { name: 'JavaScript', level: 85, category: 'Programming' },
  { name: 'SQL', level: 90, category: 'Programming' },
  { name: 'HTML/CSS', level: 90, category: 'Programming' },
  { name: 'Machine Learning', level: 88, category: 'Technical' },
  { name: 'Computer Vision', level: 85, category: 'Technical' },
  { name: 'NLP & LLM Apps', level: 88, category: 'Technical' },
  { name: 'Odoo ERP (Python)', level: 90, category: 'Technical' },
  { name: 'SAP (ABAP & PP)', level: 85, category: 'Technical' },
  { name: 'FastAPI & Flask', level: 88, category: 'Technical' },
  { name: 'React.js & Tailwind', level: 85, category: 'Technical' },
];

export const timeline: TimelineItem[] = [
  {
    year: 'Dec 2025 – Present',
    title: 'Assistant Engineer – Manufacturing Applications',
    organization: 'Tekvision (BD) Ltd., subsidiary of Youngone Holdings',
    description: 'Build AI-driven automation, computer-vision, and data-analytics tooling in Python, core-team member on Odoo ERP implementation for APDL, and custom SAP ABAP report optimization.',
    type: 'experience',
  },
  {
    year: 'June 2026 – Present',
    title: 'Web Developer (Volunteer)',
    organization: 'FreeAppStore, New Zealand',
    description: 'Build responsive, accessible features in React.js, TypeScript, and Tailwind CSS for a free, open-source web-app ecosystem.',
    type: 'experience',
  },
  {
    year: 'May 2024 – Nov 2025',
    title: 'Officer – IT, MIS',
    organization: 'Padma Plastics Ltd., sister concern of Padma Group of Converters',
    description: 'Monitored SAP data-entry accuracy, maintained IT infrastructure reliability, backups, recovery, and supported 5S/TPM/ISO initiatives.',
    type: 'experience',
  },
  {
    year: 'Feb 2026',
    title: 'ABAP and S/4 HANA Training',
    organization: 'Coursera',
    description: 'ABAP fundamentals and core programming concepts.',
    type: 'education',
  },
  {
    year: 'March 2024',
    title: 'Python Web Course',
    organization: 'Ostad',
    description: 'Fundamentals of Python web development.',
    type: 'education',
  },
  {
    year: 'Feb 2024',
    title: 'Database and MySQL',
    organization: 'Great Learning',
    description: 'Database management system and advanced SQL.',
    type: 'education',
  },
  {
    year: '2024',
    title: 'BSc in Computer Science and Engineering',
    organization: 'East Delta University, Chattogram',
    description: 'Graduated with a CGPA of 3.41 / 4.00.',
    type: 'education',
  },
];
