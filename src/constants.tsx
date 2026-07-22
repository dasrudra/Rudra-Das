import { Layers, Cpu, Database, Globe } from 'lucide-react';
import { NavLink, Service, Project, Skill, TimelineItem } from './types';

export const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Skills', href: '/#skills' },
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
    title: 'NN Fund Management',
    description: 'Eliminates manual accounting inefficiencies for corporate funds by automating allocation workflows, requisition controls, and incoming capital tracking.',
    tech: ['Odoo 19', 'Python', 'XML', 'PostgreSQL', 'Docker', 'ERP Workflows'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com/dasrudra/NN-Fund-Management',
    domain: 'ERP',
    liveLink: 'https://github.com/dasrudra/NN-Fund-Management',
    caseStudyLink: 'https://github.com/dasrudra/NN-Fund-Management#workflow-design'
  },
  {
    title: 'Accounting & Ledger Software',
    description: 'Restructures chaotic financial accounting records into a unified, interactive real-time ledger dashboard to enable instant liquidity audits and secure transaction logging.',
    tech: ['React.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'Redux State', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com/dasrudra/Ledger-Software-frontend',
    domain: 'SaaS',
    liveLink: 'https://github.com/dasrudra/Ledger-Software-frontend',
    caseStudyLink: 'https://github.com/dasrudra/Ledger-Software-frontend#system-architecture'
  },
  {
    title: 'FocusDeck: Chrome Extension',
    description: 'Mitigates workplace digital distraction by embedding contextual task lists, focus metrics, and site blockers directly into the active browser environment.',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Chrome Storage API', 'Manifest v3', 'Event-Driven UI'],
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com/dasrudra/FocusDeck---Chrome-Extension',
    domain: 'Productivity',
    liveLink: 'https://github.com/dasrudra/FocusDeck---Chrome-Extension',
    caseStudyLink: 'https://github.com/dasrudra/FocusDeck---Chrome-Extension#productivity-metrics'
  },
  {
    title: 'DistractCheck: Selective Attention in LLMs',
    description: 'Prevents silent failure modes in automated customer support agents by testing and scoring how well LLMs retrieve key data when surrounded by distracting, high-noise context.',
    tech: ['Python', 'LangChain', 'Groq API', 'LLM Benchmarks', 'NLP Evaluation', 'Dataset Curation'],
    image: '/src/assets/images/distract_check_cover_1784703888424.jpg',
    link: 'https://github.com/dasrudra/DistractCheck-Measuring-Selective-Attention-in-Language-Models',
    domain: 'AI',
    liveLink: 'https://github.com/dasrudra/DistractCheck-Measuring-Selective-Attention-in-Language-Models',
    caseStudyLink: 'https://github.com/dasrudra/DistractCheck-Measuring-Selective-Attention-in-Language-Models#attention-scores'
  },
  {
    title: 'Smart AI Detection System',
    description: 'Replaces manual security headcount at industrial plant gates with a real-time, high-accuracy vehicle and personnel counting gate utilizing advanced vision models.',
    tech: ['Python', 'YOLOv8', 'OpenCV', 'FastAPI', 'SQLite', 'ETL Pipelines'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com/dasrudra/Smart-Detection-Ai',
    domain: 'Computer Vision',
    liveLink: 'https://github.com/dasrudra/Smart-Detection-Ai',
    caseStudyLink: 'https://github.com/dasrudra/Smart-Detection-Ai#vision-pipeline'
  },
  {
    title: 'Hotel Management System',
    description: 'Streamlines hospitality operations by integrating room bookings, guest billing, and inventory tracking into an intuitive, responsive management application.',
    tech: ['Python', 'Flask', 'SQLite', 'SQLAlchemy', 'Bootstrap 5', 'MVC Architecture'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    link: 'https://shorturl.at/XsTEw',
    domain: 'ERP',
    liveLink: 'https://shorturl.at/XsTEw',
    caseStudyLink: 'https://shorturl.at/XsTEw'
  },
  {
    title: 'Sentiment Analysis Model',
    description: 'Transforms millions of unorganized text reviews into structured marketing intelligence through an automated text-preprocessing and sentiment classification engine.',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'Natural Language Processing', 'Feature Extraction'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com/dasrudra/IMDB/blob/main/imdb.ipynb',
    domain: 'Analytics',
    liveLink: 'https://github.com/dasrudra/IMDB/blob/main/imdb.ipynb',
    caseStudyLink: 'https://github.com/dasrudra/IMDB/blob/main/imdb.ipynb'
  },
  {
    title: 'Speech Emotion Recognition',
    description: 'Empowers smart call centers to detect customer frustration levels automatically by training machine learning classifiers on deep acoustic and signal features.',
    tech: ['Python', 'Signal Processing', 'Audio Feature Extraction', 'Scikit-Learn', 'Model Classifiers'],
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com/dasrudra/Speech-Emotion-Recognition',
    domain: 'AI',
    liveLink: 'https://github.com/dasrudra/Speech-Emotion-Recognition',
    caseStudyLink: 'https://github.com/dasrudra/Speech-Emotion-Recognition#model-performance'
  },
  {
    title: 'Udemy Projects',
    description: 'Establishes full-stack capabilities and web layout standards by delivering an optimized, responsive collection of cross-device utility tools.',
    tech: ['HTML5', 'CSS3', 'JavaScript ES6', 'Responsive Layouts', 'DOM Manipulation'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com/dasrudra/Udemy-Projects',
    domain: 'Productivity',
    liveLink: 'https://github.com/dasrudra/Udemy-Projects',
    caseStudyLink: 'https://github.com/dasrudra/Udemy-Projects'
  },
  {
    title: 'Apple Quality Prediction',
    description: 'Empowers automated sorting lines in precision agriculture by determining critical physical attributes that predict freshness and market quality.',
    tech: ['Machine Learning', 'Data Analysis', 'Correlation Modeling', 'Kaggle Benchmarking', 'Research'],
    image: '/src/assets/images/apple_quality_cover_1784703903675.jpg',
    link: 'https://ieeexplore.ieee.org/document/10534426?fbclid=IwZXh0bgNhZW0CMTAAAR1lt3eMmyzSVR3y0ghub0XjKbsXFH1wRFXiGlf3FSmI9NujTAS6lmYp3is_aem_ZmFrZWR1bW15MTZieXRlcw',
    domain: 'Analytics',
    liveLink: 'https://ieeexplore.ieee.org/document/10534426?fbclid=IwZXh0bgNhZW0CMTAAAR1lt3eMmyzSVR3y0ghub0XjKbsXFH1wRFXiGlf3FSmI9NujTAS6lmYp3is_aem_ZmFrZWR1bW15MTZieXRlcw',
    caseStudyLink: 'https://ieeexplore.ieee.org/document/10534426?fbclid=IwZXh0bgNhZW0CMTAAAR1lt3eMmyzSVR3y0ghub0XjKbsXFH1wRFXiGlf3FSmI9NujTAS6lmYp3is_aem_ZmFrZWR1bW15MTZieXRlcw'
  },
  {
    title: 'Meta Ads Library Scraper',
    description: 'Accelerates market research workflows by automating the extraction and cleaning of targeted competitor advertising records from the Meta Ads registry.',
    tech: ['Python', 'Web Scraping', 'BeautifulSoup', 'Requests', 'Data Aggregation'],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    link: 'https://github.com/dasrudra/meta-ads-library-scraper',
    domain: 'Automation',
    liveLink: 'https://github.com/dasrudra/meta-ads-library-scraper',
    caseStudyLink: 'https://github.com/dasrudra/meta-ads-library-scraper#scraping-performance'
  },
];

export const skills: Skill[] = [
  { name: 'Python', level: 90, category: 'Programming' },
  { name: 'SQL', level: 85, category: 'Programming' },
  { name: 'ABAP', level: 80, category: 'Programming' },
  { name: 'HTML/CSS', level: 85, category: 'Programming' },
  { name: 'ERP Systems', level: 90, category: 'Technical' },
  { name: 'Data Analysis', level: 85, category: 'Technical' },
  { name: 'Machine Learning', level: 75, category: 'Technical' },
  { name: 'Image Processing', level: 70, category: 'Technical' },
  { name: 'MS Office Suite', level: 95, category: 'Microsoft' },
  { name: 'PowerPoint', level: 90, category: 'Microsoft' },
  { name: 'Excel', level: 90, category: 'Microsoft' },
];

export const timeline: TimelineItem[] = [
  {
    year: 'Dec 2025 - Present',
    title: 'Assistant Engineer – Functional Applications',
    organization: 'Tekvision (BD) Ltd. (Youngone Holdings)',
    description: 'ERP Developer focused on designing, coding, and optimizing custom ABAP programs and providing technical support for SAP Production Planning (PP).',
    type: 'experience',
  },
  {
    year: 'June 2026 – Present',
    title: 'WebApp Developer (Volunteer)',
    organization: 'FreeAppStore, New Zealand (Remote)',
    description: 'Contributing to an open-source web application ecosystem through frontend development, responsive UI improvement, and PWA integration using React.js, TypeScript, and Tailwind CSS.',
    type: 'experience',
  },
  {
    year: 'May 2024 - Nov 2025',
    title: 'Officer – IT & MIS',
    organization: 'Padma Plastics Ltd.',
    description: 'Managed IT operations, SAP data monitoring, system audits, and hardware/software maintenance.',
    type: 'experience',
  },
  {
    year: 'Feb 2026',
    title: 'ABAP and S/4 HANA Training',
    organization: 'Coursera',
    description: 'Fundamentals of ABAP and Core Programming Concepts.',
    type: 'education',
  },
  {
    year: 'March 2024',
    title: 'Python Web & Data Science',
    organization: 'Ostad',
    description: 'Fundamentals of Python Web and Basic Statistics of Data Science.',
    type: 'education',
  },
  {
    year: '2024',
    title: 'BSc in Computer Science & Engineering',
    organization: 'East Delta University',
    description: 'Graduated with a CGPA of 3.41/4.00. Strong foundation in computer science and engineering.',
    type: 'education',
  },
];
