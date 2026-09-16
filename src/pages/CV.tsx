import { useRef, useState } from 'react';
import { motion } from 'motion/react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Globe, 
  Database, 
  Download, 
  Printer,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import rudraProfilePhoto from '../assets/images/rudra_das_profile_1789542637059.jpg';

const CV = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const element = cvRef.current;
    if (!element || isDownloading) return;

    try {
      setIsDownloading(true);
      
      const opt = {
        margin: [8, 10, 8, 10],
        filename: 'Rudra_Das_CV.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { 
          scale: 2, 
          useCORS: true, 
          letterRendering: true,
          logging: false,
          onclone: (clonedDoc: Document) => {
            const style = clonedDoc.createElement('style');
            style.innerHTML = `
              :root {
                --color-accent-primary: #E0995A !important;
                --color-accent-secondary: #5FB3B3 !important;
                --color-bg-dark: #0B1220 !important;
                --color-navy-900: #141D30 !important;
                --color-navy-950: #0B1220 !important;
                --color-muted-slate: #8B93A6 !important;
                
                --color-gray-50: #f9fafb !important;
                --color-gray-100: #f3f4f6 !important;
                --color-gray-200: #e5e7eb !important;
                --color-gray-300: #d1d5db !important;
                --color-gray-400: #9ca3af !important;
                --color-gray-500: #6b7280 !important;
                --color-gray-600: #4b5563 !important;
                --color-gray-700: #374151 !important;
                --color-gray-800: #1f2937 !important;
                --color-gray-900: #111827 !important;
              }
              
              [class*="text-gray-"], [class*="bg-gray-"], [class*="border-gray-"] {
                color-scheme: light !important;
              }

              .text-gradient {
                background: none !important;
                -webkit-background-clip: initial !important;
                background-clip: initial !important;
                color: #111827 !important;
                -webkit-text-fill-color: initial !important;
              }

              .cv-page-section {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
              }

              * {
                color-scheme: light !important;
              }
            `;
            clonedDoc.head.appendChild(style);

            clonedDoc.querySelectorAll('style').forEach(tag => {
              if (tag.innerHTML.includes('oklch')) {
                tag.innerHTML = tag.innerHTML.replace(/oklch\([^)]*\)/g, '#6b7280');
              }
            });
          }
        },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      const exporter = typeof html2pdf === 'function' ? html2pdf : (html2pdf as any).default;
      
      if (exporter) {
        await exporter().set(opt).from(element).save();
      } else {
        window.print();
      }
    } catch (error) {
      console.error('PDF Generation Error:', error);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-[#EDEAE3] pt-28 pb-20 px-6 sm:px-10">
      {/* Top Bar for Web View Only */}
      <div className="max-w-4xl mx-auto mb-10 flex flex-wrap gap-4 justify-between items-center print:hidden">
        <Link to="/" className="text-sm font-mono font-bold text-[#8B93A6] hover:text-[#E0995A] transition-colors flex items-center gap-2">
          ← Back to Portfolio
        </Link>
        <div className="flex gap-3">
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-6 py-3 bg-[#E0995A] hover:bg-[#d68c4d] text-[#0B1220] rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex-1 sm:flex-none justify-center ${
              isDownloading ? 'opacity-70 cursor-not-allowed' : 'shadow-[0_0_20px_rgba(224,153,90,0.3)]'
            }`}
          >
            {isDownloading ? (
              <>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 border-2 border-[#0B1220] border-t-transparent rounded-full"
                />
                Generating...
              </>
            ) : (
              <>
                <Download size={16} /> Download as PDF
              </>
            )}
          </button>
          <button 
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-2 px-6 py-3 bg-[#141D30] border border-[#2A3348] text-[#EDEAE3] rounded-xl font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#1a263d] transition-all"
          >
            <Printer size={16} /> Print
          </button>
        </div>
      </div>

      {/* CV Paper Component */}
      <motion.div 
        ref={cvRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[840px] mx-auto bg-white text-gray-900 shadow-2xl rounded-xl p-8 md:p-12 border border-gray-200 print:shadow-none print:border-none print:p-0"
      >
        {/* Header matching PDF Page 1 */}
        <header className="border-b-2 border-gray-900 pb-6 mb-6 flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="flex items-start gap-5">
            <img 
              src={rudraProfilePhoto} 
              alt="Rudra Das" 
              className="w-20 h-24 object-cover object-top rounded shadow-sm border border-gray-300 shrink-0"
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-gray-900 leading-tight">
                Rudra Das
              </h1>
              <p className="text-xs font-semibold text-gray-800 mt-1">BSc in Computer Science and Engineering</p>
              <p className="text-xs text-gray-600">East Delta University, Chattogram</p>
              <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                <MapPin size={12} className="shrink-0 text-gray-500" /> Address: Boxir-bit, Terribazar, Chattogram
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 mt-1 font-mono">
                <span className="flex items-center gap-1">
                  <Phone size={12} className="shrink-0 text-gray-500" /> +880-1796726405
                </span>
                <span className="flex items-center gap-1">
                  <Mail size={12} className="shrink-0 text-gray-500" /> dasrudra738@gmail.com
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono font-bold shrink-0">
            <a href="https://linkedin.com/in/rudra-das-548bb42b2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-800 hover:text-[#E0995A] transition-colors">
              <Linkedin size={13} /> LinkedIn
            </a>
            <a href="https://github.com/dasrudra" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-800 hover:text-[#E0995A] transition-colors">
              <Github size={13} /> GitHub
            </a>
            <a href="https://dasrudra.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-800 hover:text-[#E0995A] transition-colors">
              <Globe size={13} /> Portfolio
            </a>
            <a href="https://kaggle.com/rudradas2000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-800 hover:text-[#E0995A] transition-colors">
              <Database size={13} /> Kaggle
            </a>
          </div>
        </header>

        {/* Career Objective */}
        <section className="mb-6 cv-page-section">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900">
            Career Objective
          </h2>
          <p className="text-xs leading-relaxed text-gray-700 font-sans text-justify">
            Driven IT specialist, Software and ERP Developer dedicated to transforming business processes through technical innovation with a solid background in system administration, data analysis, and computer science. With hands-on experience, I am committed to using technical knowledge, analytical aptitude, and problem-solving abilities to enhance organizational effectiveness and support data-driven decision-making in fast-paced and innovative environments.
          </p>
        </section>

        {/* Employment */}
        <section className="mb-6 cv-page-section">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3 text-gray-900">
            Employment
          </h2>
          
          <div className="space-y-4">
            {/* Role 1 */}
            <div>
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-xs font-bold text-gray-900">
                  Assistant Engineer – Functional Applications (EAS)
                </h3>
                <span className="text-[11px] font-mono text-gray-600 italic shrink-0 ml-4">
                  December 2025 – Present
                </span>
              </div>
              <p className="text-[11px] italic text-gray-700 font-sans mb-1.5">
                Tekvision (BD) Ltd., subsidiary of Youngone Holdings
              </p>
              <ul className="list-disc ml-4 space-y-1 text-xs text-gray-700 font-sans leading-relaxed">
                <li>Serving as an ERP Developer within the Enterprise Application Services (EAS) team, developing, enhancing, and maintaining SAP-based business applications supporting commercial and production operations.</li>
                <li>Designing and optimizing custom ABAP reports and enhancements to improve workflow efficiency, data accuracy, and system performance.</li>
                <li>Providing technical and functional support to SAP Production Planning (PP) users by diagnosing system issues, troubleshooting operational challenges, and supporting smooth execution of production and commercial processes.</li>
                <li>Involved in ERP customization, system integration, and process automation initiatives, including core-team participation in Odoo ERP implementation for APDL, requirement analysis, configuration support, vendor coordination, and UAT.</li>
                <li>Supporting ERP deployment pricing and implementation-service costing, including implementation, training, customization, and post-go-live support models.</li>
                <li>Contributing to AI-based computer vision systems, web applications, and data analytics tools to support operational efficiency and enterprise innovation.</li>
              </ul>
            </div>

            {/* Role 2 */}
            <div>
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-xs font-bold text-gray-900">
                  Web Developer (Volunteer) – Remote
                </h3>
                <span className="text-[11px] font-mono text-gray-600 italic shrink-0 ml-4">
                  June 2026 – Present
                </span>
              </div>
              <p className="text-[11px] italic text-gray-700 font-sans mb-1.5">
                FreeAppStore, New Zealand
              </p>
              <ul className="list-disc ml-4 space-y-1 text-xs text-gray-700 font-sans leading-relaxed">
                <li>Contributing to a free-forever web application ecosystem through frontend development and platform support.</li>
                <li>Supporting responsive, accessible, and user-friendly web applications using React.js, TypeScript, Tailwind CSS, HTML, CSS, and JavaScript.</li>
                <li>Collaborating with the volunteer/community team through platform workflow, documentation, and issue-based contribution processes.</li>
                <li>Gaining practical experience in open-source product development, PWA-based applications, Git/GitHub workflow, and remote technical collaboration.</li>
              </ul>
            </div>

            {/* Role 3 */}
            <div>
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-xs font-bold text-gray-900">
                  Officer – IT, MIS
                </h3>
                <span className="text-[11px] font-mono text-gray-600 italic shrink-0 ml-4">
                  May 2024 – November 2025
                </span>
              </div>
              <p className="text-[11px] italic text-gray-700 font-sans mb-1.5">
                Padma Plastics Ltd., a sister concern of Padma Group of Converters, Dhaka, Bangladesh
              </p>
              <ul className="list-disc ml-4 space-y-1 text-xs text-gray-700 font-sans leading-relaxed">
                <li>Managed IT operations including SAP data-entry monitoring, data-accuracy checking, and timely reporting, ensuring smooth workflow and compliance with organizational standards.</li>
                <li>Performed IT audits, system backup and recovery, hardware/software maintenance, OS installation, and troubleshooting to ensure uninterrupted IT infrastructure.</li>
                <li>Maintained IT asset registers, hardware/software/network inventory, and warranty/replacement documentation.</li>
                <li>Supported departmental KPI evaluation, 5S/TPM/ISO activities, and management reporting through accurate and timely documentation.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="mb-6 cv-page-section">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900">
            Publications
          </h2>
          <div className="flex justify-between items-baseline mb-0.5">
            <h3 className="text-xs font-bold text-gray-900">Unveiling Predictive Factors in Apple Quality</h3>
            <span className="text-[11px] font-mono text-gray-600 italic">March 2024</span>
          </div>
          <p className="text-[11px] italic text-gray-700 font-sans mb-1">
            Military Institute of Science and Technology (MIST), Dhaka, Bangladesh
          </p>
          <ul className="list-disc ml-4 space-y-1 text-xs text-gray-700 font-sans">
            <li>2024 6th International Conference on Electrical Engineering and Information & Communication Technology (ICEEICT).</li>
            <li>
              <a href="https://ieeexplore.ieee.org/document/10534426" target="_blank" rel="noopener noreferrer" className="text-[#E0995A] hover:underline font-mono text-[11px] inline-flex items-center gap-1">
                https://ieeexplore.ieee.org/document/10534426 <ExternalLink size={10} />
              </a>
            </li>
          </ul>
        </section>

        {/* Education */}
        <section className="mb-6 cv-page-section">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900">
            Education
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-gray-300 font-sans">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-300 text-gray-800 font-bold font-mono">
                  <th className="p-2 border-r border-gray-300">Degree/Certificate</th>
                  <th className="p-2 border-r border-gray-300">Institute/Board</th>
                  <th className="p-2 border-r border-gray-300 text-center">CGPA/Percentage</th>
                  <th className="p-2 border-r border-gray-300 text-center whitespace-nowrap">Passing Year</th>
                  <th className="p-2">Major</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-200">
                  <td className="p-2 border-r border-gray-200 font-semibold text-gray-900">Bachelor of Science</td>
                  <td className="p-2 border-r border-gray-200">East Delta University, Chattogram</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">3.41 / 4.00</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">2024</td>
                  <td className="p-2">Computer Science and Engineering</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 border-r border-gray-200 font-semibold text-gray-900">HSC</td>
                  <td className="p-2 border-r border-gray-200">Govt. Haji Muhammad Mohsin College</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">4.25 / 5.00</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">2019</td>
                  <td className="p-2">Science</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-gray-200 font-semibold text-gray-900">SSC</td>
                  <td className="p-2 border-r border-gray-200">Chattogram Collegiate School</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">5.00 / 5.00</td>
                  <td className="p-2 border-r border-gray-200 text-center font-mono">2017</td>
                  <td className="p-2">Science</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Training */}
        <section className="mb-6 cv-page-section">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900">
            Training
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-gray-300 font-sans">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-300 text-gray-800 font-bold font-mono">
                  <th className="p-2 border-r border-gray-300">Course</th>
                  <th className="p-2 border-r border-gray-300">Course Description</th>
                  <th className="p-2 border-r border-gray-300">Institute</th>
                  <th className="p-2 text-center whitespace-nowrap">Year</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-200">
                  <td className="p-2 border-r border-gray-200 font-semibold text-gray-900">ABAP and S/4 HANA</td>
                  <td className="p-2 border-r border-gray-200">ABAP fundamentals and core programming concepts</td>
                  <td className="p-2 border-r border-gray-200">Coursera</td>
                  <td className="p-2 text-center font-mono">February 2026</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 border-r border-gray-200 font-semibold text-gray-900">Python Web Course</td>
                  <td className="p-2 border-r border-gray-200">Fundamentals of Python web development</td>
                  <td className="p-2 border-r border-gray-200">Ostad</td>
                  <td className="p-2 text-center font-mono">March 2024</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-2 border-r border-gray-200 font-semibold text-gray-900">Data Science Crash Course</td>
                  <td className="p-2 border-r border-gray-200">Basic statistics and fundamentals of data science</td>
                  <td className="p-2 border-r border-gray-200">Ostad</td>
                  <td className="p-2 text-center font-mono">March 2024</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-gray-200 font-semibold text-gray-900">Database and MySQL</td>
                  <td className="p-2 border-r border-gray-200">Database management system and advanced SQL</td>
                  <td className="p-2 border-r border-gray-200">Great Learning</td>
                  <td className="p-2 text-center font-mono">February 2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Projects & Hackathon */}
        <section className="mb-6 cv-page-section">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3 text-gray-900">
            Projects & Hackathon
          </h2>
          <div className="space-y-4">
            {/* Odoo ERP */}
            <div>
              <h3 className="text-xs font-bold text-gray-900">Odoo ERP Fund Management System</h3>
              <a href="https://github.com/dasrudra/NN-Fund-Management" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/NN-Fund-Management
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans leading-relaxed">
                <li>Developed a custom Odoo 19 ERP module for fund account management, incoming fund tracking, allocation workflow, requisition control, and bill processing.</li>
                <li>Designed computed fund balances including total received, unassigned balance, held balance, and assigned balance to support controlled fund utilization.</li>
                <li>Configured Odoo security groups, access-control rules, multi-company record rules, XML views, menu actions, sequences, chatter tracking, and Docker-based setup.</li>
              </ul>
            </div>

            {/* Accounts & Ledger */}
            <div>
              <h3 className="text-xs font-bold text-gray-900">Accounts & Ledger Management System</h3>
              <a href="https://github.com/dasrudra/Ledger-Software-frontend" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/Ledger-Software-frontend
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans leading-relaxed">
                <li>Designed and developed a role-based accounting and ledger application for digitizing daily customer-ledger operations and financial reporting.</li>
                <li>Implemented party management, deterministic balance calculation, daily ledger closing, balance carry-forward, adjustment entries, personal-balance tracking, and historical reports.</li>
                <li>Structured the frontend using reusable TypeScript components, centralized financial utilities, persistent application state, and an API-ready architecture for future FastAPI, MySQL, and LangChain integration.</li>
              </ul>
            </div>

            {/* EAS KPI Engine */}
            <div>
              <h3 className="text-xs font-bold text-gray-900">EAS KPI Engine</h3>
              <a href="https://github.com/dasrudra/SAP-HRMS-Engine" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/SAP-HRMS-Engine
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans leading-relaxed">
                <li>Architected an enterprise operational analytics and KPI management engine for SAP & HRMS daily operations across Enterprise Application Services (EAS) departments.</li>
                <li>Engineered an automated ITSM Performance Report and department export ingestion pipeline in Google Apps Script with idempotent Ticket ID upserting; computed SLA metrics for Error/Issue Resolution Time (KPI 1: ≥ 99.50%) and User Training Feedback Analysis (KPI 2: ≥ 90%); and built responsive live dashboards with audit trail logging.</li>
              </ul>
            </div>

            {/* Production Plant Dashboard */}
            <div>
              <h3 className="text-xs font-bold text-gray-900">Production Capacity & Operational Intelligence Dashboard</h3>
              <a href="https://github.com/dasrudra/Production-Plant-Dashboard" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/Production-Plant-Dashboard
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans leading-relaxed">
                <li>Developed a full-stack production planning dashboard transforming monthly Excel Activity Plans into executive KPIs, machine-level capacity curves, utilization metrics, and operational insights via FastAPI and React/TypeScript.</li>
              </ul>
            </div>

            {/* FocusDeck */}
            <div>
              <h3 className="text-xs font-bold text-gray-900">FocusDeck – Chrome New Tab Productivity Dashboard</h3>
              <a href="https://github.com/dasrudra/FocusDeck---Chrome-Extension" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/FocusDeck---Chrome-Extension
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans leading-relaxed">
                <li>Developed a custom Chrome New Tab productivity dashboard using React.js, TypeScript, Tailwind CSS, and Chrome Extension APIs.</li>
                <li>Integrated Chrome Bookmarks, History, and Downloads with categorized bookmark folders, global search, and persistent local data storage using Chrome Storage API with localStorage fallback.</li>
              </ul>
            </div>

            {/* DistractCheck */}
            <div>
              <h3 className="text-xs font-bold text-gray-900">DistractCheck: Measuring Selective Attention in Language Models</h3>
              <a href="https://kaggle.com/competitions/kaggle-measuring-agi/writeups/distract-check-measuring-selective-attention-in-l" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://kaggle.com/competitions/kaggle-measuring-agi/writeups/distract-check-measuring-selective-attention-in-l
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans leading-relaxed">
                <li>Kaggle x Google DeepMind Hackathon, 2026.</li>
                <li>Created and submitted a benchmark for the Attention track in the Kaggle hackathon Measuring Progress Toward AGI: Cognitive Abilities.</li>
              </ul>
            </div>

            {/* Smart AI Detection */}
            <div>
              <h3 className="text-xs font-bold text-gray-900">Smart AI Detection System</h3>
              <a href="https://github.com/dasrudra/Smart-Detection-Ai" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/Smart-Detection-Ai
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans leading-relaxed">
                <li>Developed a real-time Smart Gate Detection & Counting System using YOLOv8 and OpenCV to detect, track, and count people and vehicles crossing a virtual gate area with ROI-based line-crossing logic.</li>
                <li>Built a data logging and analytics pipeline with SQLite, CSV reporting, and a FastAPI web dashboard, enabling real-time monitoring, event snapshots, and hourly traffic summaries.</li>
              </ul>
            </div>

            {/* Hotel Management System */}
            <div>
              <h3 className="text-xs font-bold text-gray-900">Hotel Management System</h3>
              <a href="https://shorturl.at/XsTEw" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://shorturl.at/XsTEw
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans leading-relaxed">
                <li>Developed a Hotel Management System web application using Python Flask and SQLite.</li>
                <li>Built a modern, responsive UI with HTML, CSS, and Bootstrap, ensuring cross-device accessibility, clean workflow management, and scalable system architecture.</li>
              </ul>
            </div>

            {/* Sentiment Analysis Model */}
            <div>
              <h3 className="text-xs font-bold text-gray-900">Sentiment Analysis Model for IMDB Movie Reviews</h3>
              <a href="https://github.com/dasrudra/IMDB/blob/main/imdb.ipynb" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/IMDB/blob/main/imdb.ipynb
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans leading-relaxed">
                <li>Built a sentiment-analysis model for IMDB movie reviews using Python and machine-learning techniques.</li>
                <li>Implemented data preprocessing, NLP-based feature extraction, and model training.</li>
              </ul>
            </div>

            {/* Emotion Recognition */}
            <div>
              <h3 className="text-xs font-bold text-gray-900">Emotion Recognition from Speech Using Hybrid Model</h3>
              <a href="https://github.com/dasrudra/Speech-Emotion-Recognition" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/Speech-Emotion-Recognition
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans leading-relaxed">
                <li>Developed a speech-emotion-recognition system using hybrid machine-learning models to identify emotional states from audio recordings.</li>
                <li>Extracted key audio features and trained classifiers for emotion classification.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills & Interests matching PDF Page 3 */}
        <section className="mb-6 cv-page-section">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2.5 text-gray-900">
            Skills & Interests
          </h2>
          <div className="space-y-1.5 text-xs text-gray-700 font-sans leading-relaxed">
            <p>
              <strong className="text-gray-900 font-semibold">Programming:</strong> ABAP, Python, React.js, TypeScript, Tailwind CSS, SQL, HTML, CSS, JavaScript
            </p>
            <p>
              <strong className="text-gray-900 font-semibold">AI & Data Science:</strong> Web Scraping, Data Engineering, CLI Development, Pytest, Responsive Design, Glassmorphism UI, Dashboard Design, Machine Learning, Data Analysis, Data Science, NLP, Image Processing, LLM Evaluation, Benchmark Design, Dataset Curation, LLM Applications, Prompt Engineering, RAG Systems, Workflow Automation, LLM Inference Optimization
            </p>
            <p>
              <strong className="text-gray-900 font-semibold">Frameworks & Tools:</strong> Flask, FastAPI, REST API Integration, n8n, LangChain, Groq API, Git, GitHub, Kaggle Benchmarks, Google Colab, Matplotlib, Scikit-Learn, TensorFlow, Chrome Extension Development
            </p>
            <p>
              <strong className="text-gray-900 font-semibold">Enterprise Tools:</strong> SAP, Odoo.sh, SAP BTP Generative AI
            </p>
            <p>
              <strong className="text-gray-900 font-semibold">Databases:</strong> MySQL, SQLite
            </p>
            <p>
              <strong className="text-gray-900 font-semibold">Microsoft:</strong> MS Word, Excel, PowerPoint, Outlook, Teams
            </p>
            <p>
              <strong className="text-gray-900 font-semibold">Operating Systems:</strong> Windows
            </p>
            <p>
              <strong className="text-gray-900 font-semibold">Non-Technical:</strong> Teaching Experience, Communication, Presentation, Consulting
            </p>
            <p>
              <strong className="text-gray-900 font-semibold">Languages:</strong> English (IELTS Academic 6.5), Bangla, Hindi
            </p>
          </div>
        </section>

        {/* Internships & Extra-Curricular Activities matching PDF Page 4 */}
        <section className="mb-6 cv-page-section">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-2 text-gray-900">
            Internships & Extra-Curricular Activities
          </h2>
          <ul className="list-disc ml-4 space-y-1.5 text-xs text-gray-700 font-sans leading-relaxed">
            <li>
              <strong className="text-gray-900 font-semibold">Data Science Intern | Skill Genie:</strong> Worked on real-time data-science projects including email spam filtering and IMDB movie review sentiment analysis. Developed NLP-based models for text classification and data preprocessing to enhance prediction accuracy.
            </li>
            <li>
              <strong className="text-gray-900 font-semibold">Machine Learning Intern | Cognifyz Technologies:</strong> Contributed to machine-learning model development and optimization for scalable technology solutions. Collaborated with cross-functional teams on development and testing of machine-learning applications.
            </li>
            <li>
              <strong className="text-gray-900 font-semibold">Leadership in Academic Projects:</strong> Served as Team Leader and contributed to innovation and teamwork.
            </li>
            <li>
              <strong className="text-gray-900 font-semibold">Volunteer, EDU Cricket Tournament (Season 1):</strong> Assisted in organizing and coordinating event operations.
            </li>
            <li>
              <strong className="text-gray-900 font-semibold">Volunteer, EDU Indoor Games:</strong> Managed logistics, participant coordination, and event flow.
            </li>
          </ul>
        </section>

        {/* References matching PDF Page 4 */}
        <section className="mb-6 cv-page-section">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-300 pb-1 mb-3 text-gray-900">
            References
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-700 font-sans">
            {/* Reference 1 */}
            <div className="p-3 rounded-lg border border-gray-200 bg-gray-50/60 space-y-1">
              <h3 className="font-bold text-gray-900 text-sm">Reference 1</h3>
              <p><span className="font-medium text-gray-900">Name:</span> Dr. Mohammed Nazim Uddin</p>
              <p><span className="font-medium text-gray-900">Organization:</span> East Delta University</p>
              <p><span className="font-medium text-gray-900">Designation:</span> Vice-Chancellor</p>
              <p className="leading-snug"><span className="font-medium text-gray-900">Address:</span> Abdullah Al Noman Road, Noman Society, Chattogram</p>
              <p><span className="font-medium text-gray-900">Mobile:</span> 01730794514</p>
              <p><span className="font-medium text-gray-900">E-mail:</span> <a href="mailto:nazim@eastdelta.edu.bd" className="text-[#E0995A] hover:underline font-mono">nazim@eastdelta.edu.bd</a></p>
              <p><span className="font-medium text-gray-900">Relation:</span> Academic</p>
            </div>

            {/* Reference 2 */}
            <div className="p-3 rounded-lg border border-gray-200 bg-gray-50/60 space-y-1">
              <h3 className="font-bold text-gray-900 text-sm">Reference 2</h3>
              <p><span className="font-medium text-gray-900">Name:</span> Linkon Chowdhury</p>
              <p><span className="font-medium text-gray-900">Organization:</span> East Delta University</p>
              <p><span className="font-medium text-gray-900">Designation:</span> Assistant Professor, Department of CSE</p>
              <p className="leading-snug"><span className="font-medium text-gray-900">Address:</span> Abdullah Al Noman Road, Noman Society, Chattogram</p>
              <p><span className="font-medium text-gray-900">Mobile:</span> 01818633071</p>
              <p><span className="font-medium text-gray-900">E-mail:</span> <a href="mailto:linkoncuetbd@gmail.com" className="text-[#E0995A] hover:underline font-mono">linkoncuetbd@gmail.com</a></p>
              <p><span className="font-medium text-gray-900">Relation:</span> Academic</p>
            </div>
          </div>
        </section>

        {/* Signature Block matching PDF Page 4 */}
        <section className="pt-4 border-t border-gray-300 flex justify-between items-end cv-page-section">
          <p className="text-[11px] text-gray-500 font-mono italic">
            Rudra Das — Curriculum Vitae
          </p>
          <div className="text-center">
            {/* Signature Drawing */}
            <div className="h-10 flex items-center justify-center mb-1">
              <svg className="w-28 h-8 text-gray-800" viewBox="0 0 140 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 10 28 C 25 10, 35 32, 45 15 C 50 8, 55 22, 65 24 C 75 26, 85 12, 95 20 C 105 28, 120 18, 130 22 M 25 24 L 120 25" />
              </svg>
            </div>
            <div className="w-32 h-[1px] bg-gray-400 mb-1 mx-auto" />
            <p className="text-xs font-serif text-gray-700 font-medium">Signature</p>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default CV;
