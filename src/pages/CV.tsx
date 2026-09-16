import { useRef, useState } from 'react';
import { motion } from 'motion/react';
// @ts-ignore
import html2pdf from 'html2pdf.js';
import { 
  Download, 
  Printer,
  ExternalLink,
  Linkedin,
  Github,
  Globe,
  Database
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CV = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const element = cvRef.current;
    if (!element || isDownloading) return;

    try {
      setIsDownloading(true);
      
      const opt = {
        margin: [10, 12, 10, 12],
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

              .cv-section-block {
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
      <div className="max-w-4xl mx-auto mb-8 flex flex-wrap gap-4 justify-between items-center print:hidden">
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

      {/* CV Paper Document matching the user's PDF */}
      <motion.div 
        ref={cvRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[820px] mx-auto bg-white text-gray-900 shadow-2xl rounded-xl p-8 md:p-14 border border-gray-200 print:shadow-none print:border-none print:p-0 leading-normal"
        style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
      >
        {/* Header */}
        <header className="pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-950 font-serif mb-1">
              Rudra Das
            </h1>
            <p className="text-base italic text-gray-800 font-serif mb-1">
              Software Engineer — AI/ML
            </p>
            <p className="text-xs text-gray-700 font-serif">
              BSc in Computer Science and Engineering, East Delta University
            </p>
            <p className="text-xs text-gray-700 font-serif mt-0.5">
              Chattogram, Bangladesh <span className="mx-1">|</span> +880-1796726405
            </p>
            <a 
              href="mailto:dasrudra738@gmail.com" 
              className="text-xs text-gray-900 hover:text-[#E0995A] font-serif block mt-0.5 hover:underline"
            >
              dasrudra738@gmail.com
            </a>
          </div>

          <div className="flex flex-col sm:items-end gap-1 text-xs font-serif shrink-0">
            <a href="https://linkedin.com/in/rudra-das-548bb42b2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-800 hover:text-[#E0995A] hover:underline">
              <Linkedin size={13} className="text-gray-700" /> LinkedIn
            </a>
            <a href="https://github.com/dasrudra" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-800 hover:text-[#E0995A] hover:underline">
              <Github size={13} className="text-gray-700" /> GitHub
            </a>
            <a href="https://dasrudra.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-800 hover:text-[#E0995A] hover:underline">
              <Globe size={13} className="text-gray-700" /> Portfolio
            </a>
            <a href="https://kaggle.com/rudradas2000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-800 hover:text-[#E0995A] hover:underline">
              <Database size={13} className="text-gray-700" /> Kaggle
            </a>
          </div>
        </header>

        {/* Profile */}
        <section className="mb-6 cv-section-block">
          <h2 className="text-sm font-bold tracking-normal border-b border-gray-300 pb-1 mb-2.5 text-gray-950 font-serif">
            Profile
          </h2>
          <p className="text-xs leading-relaxed text-gray-800 font-serif text-justify">
            Software Engineer specializing in AI/ML, building production systems in Python across enterprise software and applied machine learning. Currently develops on Odoo’s Python backend and writes SAP ABAP reports and enhancements at a South Korean manufacturing multinational, while independently designing and shipping end-to-end computer-vision and NLP systems and AI evaluation benchmarks. Published IEEE researcher; submitted a benchmark to Google DeepMind’s Kaggle hackathon on measuring AI cognitive abilities.
          </p>
        </section>

        {/* Employment */}
        <section className="mb-6 cv-section-block">
          <h2 className="text-sm font-bold tracking-normal border-b border-gray-300 pb-1 mb-3 text-gray-950 font-serif">
            Employment
          </h2>
          
          <div className="space-y-4">
            {/* Assistant Engineer */}
            <div>
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-xs font-bold text-gray-950 font-serif">
                  Assistant Engineer – Manufacturing Applications (EAS)
                </h3>
                <span className="text-[11px] italic text-gray-700 shrink-0 ml-4 font-serif">
                  December 2025 – Present
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-1 text-[11px] italic text-gray-700 font-serif">
                <span>Tekvision (BD) Ltd., subsidiary of Youngone Holdings</span>
                <span>Chattogram, Bangladesh</span>
              </div>
              <ul className="list-disc ml-5 space-y-1 text-xs text-gray-800 font-serif leading-relaxed">
                <li>Build AI-driven automation, computer-vision, and data-analytics tooling in Python to support production and commercial operations.</li>
                <li>Core-team member on the Odoo ERP implementation for APDL, developing on Odoo’s Python-based backend – requirement analysis, configuration, and UAT.</li>
                <li>Building hands-on SAP ABAP proficiency on the job: writing and optimizing custom reports and enhancements.</li>
                <li>Provide technical and functional support to SAP Production Planning (PP) users, diagnosing and resolving system issues across production and commercial workflows.</li>
                <li>Contribute to ERP deployment pricing and implementation-service costing models covering implementation, training, and post-go-live support.</li>
              </ul>
            </div>

            {/* Officer – IT, MIS */}
            <div>
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="text-xs font-bold text-gray-950 font-serif">
                  Officer – IT, MIS
                </h3>
                <span className="text-[11px] italic text-gray-700 shrink-0 ml-4 font-serif">
                  May 2024 – November 2025
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-1 text-[11px] italic text-gray-700 font-serif">
                <span>Padma Plastics Ltd., a sister concern of Padma Group of Converters</span>
                <span>Chattogram, Bangladesh</span>
              </div>
              <ul className="list-disc ml-5 space-y-1 text-xs text-gray-800 font-serif leading-relaxed">
                <li>Monitored SAP data-entry accuracy and produced management reporting supporting organizational compliance standards.</li>
                <li>Maintained IT infrastructure reliability – backups, recovery, maintenance, troubleshooting – and a full hardware/software/network asset register.</li>
                <li>Supported 5S/TPM/ISO and departmental KPI initiatives through IT-side documentation and reporting.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="mb-6 cv-section-block">
          <h2 className="text-sm font-bold tracking-normal border-b border-gray-300 pb-1 mb-2 text-gray-950 font-serif">
            Publications
          </h2>
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="text-xs font-bold text-gray-950 font-serif">Unveiling Predictive Factors in Apple Quality</h3>
            <span className="text-[11px] italic text-gray-700 font-serif">March 2024</span>
          </div>
          <ul className="list-disc ml-5 space-y-1 text-xs text-gray-800 font-serif leading-relaxed">
            <li>2024 6th International Conference on Electrical Engineering and Information & Communication Technology (ICEEICT) – hosted by Military Institute of Science and Technology (MIST), Dhaka, Bangladesh.</li>
            <li>
              <a href="https://ieeexplore.ieee.org/document/10534426" target="_blank" rel="noopener noreferrer" className="text-[#E0995A] hover:underline inline-flex items-center gap-1 font-mono text-[11px]">
                https://ieeexplore.ieee.org/document/10534426 <ExternalLink size={10} />
              </a>
            </li>
          </ul>
        </section>

        {/* Education */}
        <section className="mb-6 cv-section-block">
          <h2 className="text-sm font-bold tracking-normal border-b border-gray-300 pb-1 mb-2 text-gray-950 font-serif">
            Education
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-gray-400 font-serif">
              <thead>
                <tr className="border-b border-gray-400 text-gray-950 font-bold">
                  <th className="p-2 border-r border-gray-400">Degree/Certificate</th>
                  <th className="p-2 border-r border-gray-400">Institute/Board</th>
                  <th className="p-2 border-r border-gray-400 text-center">CGPA/Percentage</th>
                  <th className="p-2 border-r border-gray-400 text-center whitespace-nowrap">Passing Year</th>
                  <th className="p-2">Major</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                <tr className="border-b border-gray-300">
                  <td className="p-2 border-r border-gray-300 font-medium">Bachelor of Science</td>
                  <td className="p-2 border-r border-gray-300">East Delta University, Chattogram</td>
                  <td className="p-2 border-r border-gray-300 text-center">3.41 / 4.00</td>
                  <td className="p-2 border-r border-gray-300 text-center">2024</td>
                  <td className="p-2">Computer Science and Engineering</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border-r border-gray-300 font-medium">HSC</td>
                  <td className="p-2 border-r border-gray-300">Govt. Haji Muhammad Mohsin College</td>
                  <td className="p-2 border-r border-gray-300 text-center">4.25 / 5.00</td>
                  <td className="p-2 border-r border-gray-300 text-center">2019</td>
                  <td className="p-2">Science</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-gray-300 font-medium">SSC</td>
                  <td className="p-2 border-r border-gray-300">Chattogram Collegiate School</td>
                  <td className="p-2 border-r border-gray-300 text-center">5.00 / 5.00</td>
                  <td className="p-2 border-r border-gray-300 text-center">2017</td>
                  <td className="p-2">Science</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Training */}
        <section className="mb-6 cv-section-block">
          <h2 className="text-sm font-bold tracking-normal border-b border-gray-300 pb-1 mb-2 text-gray-950 font-serif">
            Training
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse border border-gray-400 font-serif">
              <thead>
                <tr className="border-b border-gray-400 text-gray-950 font-bold">
                  <th className="p-2 border-r border-gray-400">Course</th>
                  <th className="p-2 border-r border-gray-400">Course Description</th>
                  <th className="p-2 border-r border-gray-400">Institute</th>
                  <th className="p-2 text-center whitespace-nowrap">Year</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                <tr className="border-b border-gray-300">
                  <td className="p-2 border-r border-gray-300 font-medium">Data Science</td>
                  <td className="p-2 border-r border-gray-300">Basic Statistics for Data Science</td>
                  <td className="p-2 border-r border-gray-300">Ostad</td>
                  <td className="p-2 text-center">February 2026</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2 border-r border-gray-300 font-medium">Python Web Course</td>
                  <td className="p-2 border-r border-gray-300">Fundamentals of Python web development</td>
                  <td className="p-2 border-r border-gray-300">Ostad</td>
                  <td className="p-2 text-center">March 2024</td>
                </tr>
                <tr>
                  <td className="p-2 border-r border-gray-300 font-medium">Database and MySQL</td>
                  <td className="p-2 border-r border-gray-300">Database management system and advanced SQL</td>
                  <td className="p-2 border-r border-gray-300">Great Learning</td>
                  <td className="p-2 text-center">February 2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Projects & Hackathon */}
        <section className="mb-6 cv-section-block">
          <h2 className="text-sm font-bold tracking-normal border-b border-gray-300 pb-1 mb-3 text-gray-950 font-serif">
            Projects & Hackathon
          </h2>
          
          <div className="space-y-4">
            {/* EAS KPI Engine */}
            <div>
              <h3 className="text-xs font-bold text-gray-950 font-serif">
                EAS KPI Engine — Enterprise KPI & Operational Intelligence Platform
              </h3>
              <a href="https://github.com/dasrudra/SAP-HRMS-Engine" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/SAP-HRMS-Engine
              </a>
              <ul className="list-disc ml-5 space-y-1 text-xs text-gray-800 font-serif leading-relaxed">
                <li>Developed a data-driven KPI analytics engine that converts structured Excel operational datasets into automated performance metrics, dashboards, and management insights.</li>
                <li>Built historical reporting and multi-period comparison capabilities, enabling users to evaluate KPI performance across multiple months and organizational sections and developed a management-facing dashboard with KPI cards, analytical charts, section-level tables, filtering, period selection, and comparative performance views.</li>
              </ul>
            </div>

            {/* Production Capacity & Operational Intelligence Dashboard */}
            <div>
              <h3 className="text-xs font-bold text-gray-950 font-serif">
                Production Capacity & Operational Intelligence Dashboard
              </h3>
              <a href="https://github.com/dasrudra/Production-Plant-Dashboard" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/Production-Plant-Dashboard
              </a>
              <ul className="list-disc ml-5 space-y-1 text-xs text-gray-800 font-serif leading-relaxed">
                <li>Developed a full-stack production planning dashboard that transforms monthly Excel Activity Plan data into executive KPIs, machine-level capacity analysis, utilization metrics, and operational insights.</li>
                <li>Built a Python-based Excel processing pipeline using Pandas/OpenPyXL to validate structured Plan-KPP workbooks and calculate, FastAPI REST APIs for Excel ingestion; implemented a SQLite-backed reporting layer; and developed the React/TypeScript frontend with KPI cards, target-vs-capacity charts, utilization analysis, machine planning tables, status distribution, saved reports, and month-to-month comparison.</li>
              </ul>
            </div>

            {/* DistractCheck */}
            <div>
              <h3 className="text-xs font-bold text-gray-950 font-serif">
                DistractCheck: Measuring Selective Attention in Language Models
              </h3>
              <a href="https://kaggle.com/competitions/kaggle-measuring-agi/writeups/distract-check-measuring-selective-attention-in-l" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://kaggle.com/competitions/kaggle-measuring-agi/writeups/distract-check-measuring-selective-attention-in-l
              </a>
              <ul className="list-disc ml-5 space-y-1 text-xs text-gray-800 font-serif leading-relaxed">
                <li>Kaggle x Google DeepMind Hackathon 2026 – Measuring Progress Toward AGI: Cognitive Abilities ($200,000 total prize pool, 1,000+ competing teams).</li>
                <li>Designed and submitted a benchmark for the Attention track.</li>
              </ul>
            </div>

            {/* Smart AI Detection System */}
            <div>
              <h3 className="text-xs font-bold text-gray-950 font-serif">
                Smart AI Detection System
              </h3>
              <a href="https://github.com/dasrudra/Smart-Detection-Ai" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/Smart-Detection-Ai
              </a>
              <ul className="list-disc ml-5 space-y-1 text-xs text-gray-800 font-serif leading-relaxed">
                <li>Developed a real-time Smart Gate Detection & Counting System using YOLOv8 and OpenCV to detect, track, and count people and vehicles crossing a virtual gate area with ROI-based line-crossing logic.</li>
                <li>Built a data logging and analytics pipeline with SQLite, CSV reporting, and a FastAPI web dashboard, enabling real-time monitoring, event snapshots, and hourly traffic summaries.</li>
              </ul>
            </div>

            {/* Emotion Recognition from Speech */}
            <div>
              <h3 className="text-xs font-bold text-gray-950 font-serif">
                Emotion Recognition from Speech Using Hybrid Model
              </h3>
              <a href="https://github.com/dasrudra/Speech-Emotion-Recognition" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/Speech-Emotion-Recognition
              </a>
              <ul className="list-disc ml-5 space-y-1 text-xs text-gray-800 font-serif leading-relaxed">
                <li>Developed a speech-emotion-recognition system using hybrid machine-learning models to identify emotional states from audio recordings.</li>
                <li>Extracted key audio features and trained classifiers for emotion classification.</li>
              </ul>
            </div>

            {/* Odoo ERP Fund Management System */}
            <div>
              <h3 className="text-xs font-bold text-gray-950 font-serif">
                Odoo ERP Fund Management System (Python)
              </h3>
              <a href="https://github.com/dasrudra/NN-Fund-Management" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/NN-Fund-Management
              </a>
              <ul className="list-disc ml-5 space-y-1 text-xs text-gray-800 font-serif leading-relaxed">
                <li>Developed a custom Odoo 19 ERP module for fund account management, incoming fund tracking, allocation workflow, requisition control, and bill processing, built on Odoo’s Python backend.</li>
                <li>Designed computed fund balances including total received, unassigned balance, held balance, and assigned balance to support controlled fund utilization.</li>
                <li>Configured Odoo security groups, access-control rules, multi-company record rules, automated tests, and Docker-based setup.</li>
              </ul>
            </div>

            {/* Accounts & Ledger Management System */}
            <div>
              <h3 className="text-xs font-bold text-gray-950 font-serif">
                Accounts & Ledger Management System
              </h3>
              <a href="https://github.com/dasrudra/Ledger-Software-frontend" target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-[#E0995A] hover:underline block mb-1">
                https://github.com/dasrudra/Ledger-Software-frontend
              </a>
              <ul className="list-disc ml-5 space-y-1 text-xs text-gray-800 font-serif leading-relaxed">
                <li>Built a role-based accounting and ledger application (Admin/Employee permission tiers) for digitizing daily customer-ledger operations, with balance carried forward automatically from each party’s previous closing entry and a profit-calculation engine deriving margin and commission profit from configurable rates.</li>
                <li>Implemented a day-closing workflow that locks finalized ledgers and routes corrections through auditable adjustment entries, built with reusable TypeScript components on an API-ready architecture designed for a planned FastAPI/MySQL backend.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-6 cv-section-block">
          <h2 className="text-sm font-bold tracking-normal border-b border-gray-300 pb-1 mb-2.5 text-gray-950 font-serif">
            Skills
          </h2>
          <div className="space-y-1.5 text-xs text-gray-800 font-serif leading-relaxed">
            <p>
              <strong className="text-gray-950 font-bold">Programming Languages:</strong> Python, ABAP, TypeScript, JavaScript, SQL, HTML/CSS
            </p>
            <p>
              <strong className="text-gray-950 font-bold">AI & Machine Learning:</strong> Machine Learning, Computer Vision (YOLOv8, OpenCV), NLP, LLM Applications, Prompt Engineering, RAG Systems, Benchmark Design & LLM Evaluation, TensorFlow, PyTorch, Scikit-learn
            </p>
            <p>
              <strong className="text-gray-950 font-bold">Enterprise Systems:</strong> SAP (ABAP, Production Planning), Odoo (Python backend, security & access control), SAP BTP Gen AI
            </p>
            <p>
              <strong className="text-gray-950 font-bold">Web, Data & Tools:</strong> React.js, Flask, FastAPI, REST APIs, MySQL, SQLite, Git, GitHub, Docker, Google Colab
            </p>
            <p>
              <strong className="text-gray-950 font-bold">Languages:</strong> English (IELTS Academic 6.5), Bangla, Hindi
            </p>
          </div>
        </section>

        {/* Internships & Extra-Curricular Activities */}
        <section className="mb-6 cv-section-block">
          <h2 className="text-sm font-bold tracking-normal border-b border-gray-300 pb-1 mb-2 text-gray-950 font-serif">
            Internships & Extra-Curricular Activities
          </h2>
          <ul className="list-disc ml-5 space-y-1 text-xs text-gray-800 font-serif leading-relaxed">
            <li>
              <strong className="text-gray-950 font-bold">Machine Learning Intern | Cognifyz Technologies</strong> ([April’24] – [June’24]): Contributed to ML model development and optimization in a cross-functional team.
            </li>
            <li>
              <strong className="text-gray-950 font-bold">Data Science Intern | Skill Genie</strong> ([Feb’24] – [April’24]): Built NLP models for spam filtering and movie-review sentiment classification.
            </li>
            <li>
              <strong className="text-gray-950 font-bold">Team Leader, Academic Projects:</strong> Led cross-functional student project teams.
            </li>
          </ul>
        </section>

        {/* References */}
        <section className="pt-2 text-xs italic text-gray-700 font-serif cv-section-block">
          <p>References available upon request.</p>
        </section>
      </motion.div>
    </div>
  );
};

export default CV;
