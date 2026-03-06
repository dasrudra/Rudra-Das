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
    icon: <Layers className="w-8 h-8 text-corp-blue" />,
    size: 'large'
  },
  {
    title: 'SAP ABAP Customization',
    description: 'Expertise in SAP ABAP development, reports, and functional application enhancements.',
    icon: <Cpu className="w-8 h-8 text-corp-blue" />,
  },
  {
    title: 'Data Analysis Solutions',
    description: 'Advanced data processing and visualization for informed business decision-making.',
    icon: <Database className="w-8 h-8 text-corp-blue" />,
  },
  {
    title: 'Web Application Development',
    description: 'Modern, scalable web applications built with Python, Flask, and modern front-end stacks.',
    icon: <Globe className="w-8 h-8 text-corp-blue" />,
    size: 'large'
  },
];

export const projects: Project[] = [
  {
    title: 'Smart AI Detection System',
    description: 'Developed a real-time Smart Gate Detection Counting System using YOLOv8 and OpenCV to detect, track, and count people and vehicles crossing a virtual gate area. Built a data logging and analytics pipeline with SQLite and FastAPI.',
    tech: ['Python', 'YOLOv8', 'OpenCV', 'FastAPI', 'SQLite'],
    image: 'https://picsum.photos/seed/ai-detection/800/600',
    link: 'https://github.com/dasrudra/Smart-Detection-Ai',
  },
  {
    title: 'Hotel Management System',
    description: 'A modern, responsive web application using Python (Flask) and SQLite, ensuring cross-device accessibility and clean workflow management with a scalable system architecture.',
    tech: ['Python', 'Flask', 'SQLite', 'Bootstrap'],
    image: 'https://picsum.photos/seed/hotel/800/600',
    link: 'https://shorturl.at/XsTEw',
  },
  {
    title: 'Sentiment Analysis Model',
    description: 'IMDB movie reviews sentiment analysis using Python and machine learning techniques, including NLP preprocessing, feature extraction, and model training.',
    tech: ['Python', 'NLP', 'Machine Learning'],
    image: 'https://picsum.photos/seed/sentiment/800/600',
    link: 'https://github.com/dasrudra/IMDB/blob/main/imdb.ipynb',
  },
  {
    title: 'Speech Emotion Recognition',
    description: 'Hybrid machine learning models to identify emotional states from audio recordings by extracting key audio features and training classifiers.',
    tech: ['Python', 'Signal Processing', 'Machine Learning'],
    image: 'https://picsum.photos/seed/speech/800/600',
    link: 'https://github.com/dasrudra/Speech-Emotion-Recognition',
  },
  {
    title: 'Udemy Projects',
    description: 'A collection of 10+ web development projects focusing on HTML, CSS, and JavaScript fundamentals.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://picsum.photos/seed/web/800/600',
    link: 'https://github.com/dasrudra/Udemy-Projects',
  },
  {
    title: 'Unveiling Predictive Factors in Apple Quality',
    description: 'Research publication presented at the 2024 6th International Conference on Electrical Engineering and Information Communication Technology (ICEEICT).',
    tech: ['Machine Learning', 'Data Analysis', 'Research'],
    image: 'https://picsum.photos/seed/apple/800/600',
    link: 'https://ieeexplore.ieee.org/document/10534426?fbclid=IwZXh0bgNhZW0CMTAAAR1lt3eMmyzSVR3y0ghub0XjKbsXFH1wRFXiGlf3FSmI9NujTAS6lmYp3is_aem_ZmFrZWR1bW15MTZieXRlcw',
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
    year: 'Jan 2025 - Nov 2025',
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
