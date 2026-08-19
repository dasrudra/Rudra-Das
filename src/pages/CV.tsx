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

const CV = () => {
  const cvRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const element = cvRef.current;
    if (!element || isDownloading) return;

    try {
      setIsDownloading(true);
      
      const opt = {
        margin: 10,
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
        className="max-w-[800px] mx-auto bg-white text-gray-900 shadow-2xl rounded-xl p-8 md:p-12 border border-gray-200 print:shadow-none print:border-none print:p-0"
      >
        {/* Header */}
        <header className="border-b-2 border-gray-900 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight mb-2 text-gray-900">Rudra Das</h1>
            <p className="text-base font-bold text-gray-800 mb-1">Software Engineer — AI/ML</p>
            <p className="text-sm font-medium text-gray-600 mb-4">BSc in Computer Science and Engineering, East Delta University</p>
            <div className="space-y-1 text-sm text-gray-600 font-mono">
              <p className="flex items-center gap-2"><MapPin size={14} /> Chattogram, Bangladesh</p>
              <p className="flex items-center gap-2"><Phone size={14} /> +880-1796726405</p>
              <p className="flex items-center gap-2"><Mail size={14} /> dasrudra738@gmail.com</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs font-mono font-bold">
            <a href="https://linkedin.com/in/rudra-das-548bb42b2" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-800 hover:text-[#E0995A] transition-colors"><Linkedin size={14} /> LinkedIn</a>
            <a href="https://github.com/dasrudra" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-800 hover:text-[#E0995A] transition-colors"><Github size={14} /> GitHub</a>
            <a href="https://dasrudra.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-800 hover:text-[#E0995A] transition-colors"><Globe size={14} /> Portfolio</a>
            <a href="https://kaggle.com/rudradas2000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-gray-800 hover:text-[#E0995A] transition-colors"><Database size={14} /> Kaggle</a>
          </div>
        </header>

        {/* Profile / Objective */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-900">Profile</h2>
          <p className="text-xs leading-relaxed text-gray-700 font-sans">
            Software Engineer specializing in AI/ML, building production systems in Python across enterprise software and applied machine learning. Currently develops on Odoo’s Python backend and writes SAP ABAP reports and enhancements at a South Korean manufacturing multinational, while independently designing and shipping end-to-end computer-vision and NLP systems and AI evaluation benchmarks. Published IEEE researcher; submitted a benchmark to Google DeepMind’s Kaggle hackathon on measuring AI cognitive abilities.
          </p>
        </section>

        {/* Employment */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-4 text-gray-900">Employment</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Assistant Engineer – Manufacturing Applications (EAS)</h3>
                  <p className="text-xs italic text-gray-600">Tekvision (BD) Ltd., subsidiary of Youngone Holdings — Chattogram, Bangladesh</p>
                </div>
                <span className="text-xs font-mono font-medium text-gray-600 shrink-0 ml-4">December 2025 – Present</span>
              </div>
              <ul className="list-disc ml-4 space-y-1 text-xs text-gray-700 mt-2 font-sans">
                <li>Build AI-driven automation, computer-vision, and data-analytics tooling in Python to support production and commercial operations.</li>
                <li>Core-team member on the Odoo ERP implementation for APDL, developing on Odoo’s Python-based backend – requirement analysis, configuration, and UAT.</li>
                <li>Building hands-on SAP ABAP proficiency on the job: writing and optimizing custom reports and enhancements.</li>
                <li>Provide technical and functional support to SAP Production Planning (PP) users, diagnosing and resolving system issues across production and commercial workflows.</li>
                <li>Contribute to ERP deployment pricing and implementation-service costing models covering implementation, training, and post-go-live support.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Web Developer (Volunteer)</h3>
                  <p className="text-xs italic text-gray-600">FreeAppStore, New Zealand — Remote</p>
                </div>
                <span className="text-xs font-mono font-medium text-gray-600 shrink-0 ml-4">June 2026 – Present</span>
              </div>
              <ul className="list-disc ml-4 space-y-1 text-xs text-gray-700 mt-2 font-sans">
                <li>Build responsive, accessible features in React.js, TypeScript, and Tailwind CSS for a free, open-source web-app ecosystem.</li>
                <li>Collaborate asynchronously with a distributed volunteer team through an issue-based Git/GitHub contribution workflow.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Officer – IT, MIS</h3>
                  <p className="text-xs italic text-gray-600">Padma Plastics Ltd., a sister concern of Padma Group of Converters — Chattogram, Bangladesh</p>
                </div>
                <span className="text-xs font-mono font-medium text-gray-600 shrink-0 ml-4">May 2024 – November 2025</span>
              </div>
              <ul className="list-disc ml-4 space-y-1 text-xs text-gray-700 mt-2 font-sans">
                <li>Monitored SAP data-entry accuracy and produced management reporting supporting organizational compliance standards.</li>
                <li>Maintained IT infrastructure reliability – backups, recovery, maintenance, troubleshooting – and a full hardware/software/network asset register.</li>
                <li>Supported 5S/TPM/ISO and departmental KPI initiatives through IT-side documentation and reporting.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-900">Publications</h2>
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-xs font-bold text-gray-900 italic">Unveiling Predictive Factors in Apple Quality</h3>
            <span className="text-xs font-mono text-gray-600">March 2024</span>
          </div>
          <p className="text-xs text-gray-600 mb-1">2024 6th International Conference on Electrical Engineering and Information & Communication Technology (ICEEICT) – hosted by Military Institute of Science and Technology (MIST), Dhaka, Bangladesh</p>
          <a href="https://ieeexplore.ieee.org/document/10534426" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] hover:underline flex items-center gap-1 mt-1">
            <ExternalLink size={10} /> View on IEEE Xplore
          </a>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-900">Education</h2>
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600 font-mono">
                <th className="py-2 pr-4 font-bold">Degree/Certificate</th>
                <th className="py-2 px-4 font-bold">Institute/Board</th>
                <th className="py-2 px-4 font-bold">CGPA/Percentage</th>
                <th className="py-2 px-4 font-bold whitespace-nowrap">Passing Year</th>
                <th className="py-2 pl-4 font-bold">Major</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-100 uppercase">
                <td className="py-2 pr-4 font-bold">Bachelor of Science</td>
                <td className="py-2 px-4">East Delta University, Chattogram</td>
                <td className="py-2 px-4 italic font-mono">3.41 / 4.00</td>
                <td className="py-2 px-4 text-center font-mono">2024</td>
                <td className="py-2 pl-4">Computer Science and Engineering</td>
              </tr>
              <tr className="border-b border-gray-100 uppercase">
                <td className="py-2 pr-4 font-bold">HSC</td>
                <td className="py-2 px-4">Govt. Haji Muhammad Mohsin College</td>
                <td className="py-2 px-4 italic font-mono">4.25 / 5.00</td>
                <td className="py-2 px-4 text-center font-mono">2019</td>
                <td className="py-2 pl-4">Science</td>
              </tr>
              <tr className="border-b border-gray-200 uppercase">
                <td className="py-2 pr-4 font-bold">SSC</td>
                <td className="py-2 px-4">Chattogram Collegiate School</td>
                <td className="py-2 px-4 italic font-mono">5.00 / 5.00</td>
                <td className="py-2 px-4 text-center font-mono">2017</td>
                <td className="py-2 pl-4">Science</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Training */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-900">Training</h2>
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600 font-mono">
                <th className="py-2 pr-4 font-bold">Training Title</th>
                <th className="py-2 px-4 font-bold">Topic</th>
                <th className="py-2 px-4 font-bold">Institute</th>
                <th className="py-2 pl-4 font-bold whitespace-nowrap">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 font-bold">ABAP and S/4 HANA</td>
                <td className="py-2 px-4">ABAP fundamentals and core programming concepts</td>
                <td className="py-2 px-4">Coursera</td>
                <td className="py-2 pl-4 font-mono">February 2026</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4 font-bold">Python Web Course</td>
                <td className="py-2 px-4">Fundamentals of Python web development</td>
                <td className="py-2 px-4">Ostad</td>
                <td className="py-2 pl-4 font-mono">March 2024</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 pr-4 font-bold">Database and MySQL</td>
                <td className="py-2 px-4">Database management system and advanced SQL</td>
                <td className="py-2 px-4">Great Learning</td>
                <td className="py-2 pl-4 font-mono">February 2024</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Projects & Hackathon */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-4 text-gray-900">Projects & Hackathon</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xs font-bold text-gray-900 uppercase">Production Capacity & Operational Intelligence Dashboard</h3>
              </div>
              <a href="https://github.com/dasrudra/Production-Plant-Dashboard" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] italic block mb-1 hover:underline">
                https://github.com/dasrudra/Production-Plant-Dashboard
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans">
                <li>Developed a full-stack production planning dashboard that transforms monthly Excel Activity Plan data into executive KPIs, machine-level capacity analysis, utilization metrics, and operational insights.</li>
                <li>Built a Python-based Excel processing pipeline using Pandas/OpenPyXL to validate structured Plan-KPP workbooks and calculate, FastAPI REST APIs for Excel ingestion; implemented a SQLite-backed reporting layer; and developed the React/TypeScript frontend with KPI cards, target-vs-capacity charts, utilization analysis, machine planning tables, status distribution, saved reports, and month-to-month comparison.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xs font-bold text-gray-900 uppercase">DistractCheck: Measuring Selective Attention in Language Models</h3>
              </div>
              <a href="https://kaggle.com/competitions/kaggle-measuring-agi/writeups/distract-check-measuring-selective-attention-in-l" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] italic block mb-1 hover:underline">
                https://kaggle.com/competitions/kaggle-measuring-agi/writeups/distract-check-measuring-selective-attention-in-l
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans">
                <li>Kaggle x Google DeepMind Hackathon 2026 – Measuring Progress Toward AGI: Cognitive Abilities ($200,000 total prize pool, 1,000+ competing teams).</li>
                <li>Designed and submitted an evaluation harness measuring selective context retrieval in LLMs for the Attention track.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xs font-bold text-gray-900 uppercase">Smart AI Detection System</h3>
              </div>
              <a href="https://github.com/dasrudra/Smart-Detection-Ai" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] italic block mb-1 hover:underline">
                https://github.com/dasrudra/Smart-Detection-Ai
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans">
                <li>Developed a real-time Smart Gate Detection & Counting System using YOLOv8 and OpenCV to detect, track, and count people and vehicles crossing a virtual gate area with ROI-based line-crossing logic.</li>
                <li>Built a data logging and analytics pipeline with SQLite, CSV reporting, and a FastAPI web dashboard, enabling real-time monitoring, event snapshots, and hourly traffic summaries.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xs font-bold text-gray-900 uppercase">Emotion Recognition from Speech Using Hybrid Model</h3>
              </div>
              <a href="https://github.com/dasrudra/Speech-Emotion-Recognition" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] italic block mb-1 hover:underline">
                https://github.com/dasrudra/Speech-Emotion-Recognition
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans">
                <li>Developed a speech-emotion-recognition system using hybrid machine-learning models to identify emotional states from audio recordings.</li>
                <li>Extracted key acoustic features and trained classifiers for emotion classification.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xs font-bold text-gray-900 uppercase">Odoo ERP Fund Management System (Python)</h3>
              </div>
              <a href="https://github.com/dasrudra/NN-Fund-Management" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] italic block mb-1 hover:underline">
                https://github.com/dasrudra/NN-Fund-Management
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans">
                <li>Developed a custom Odoo 19 ERP module for fund account management, incoming fund tracking, allocation workflow, requisition control, and bill processing, built on Odoo’s Python backend.</li>
                <li>Designed computed fund balances including total received, unassigned balance, held balance, and assigned balance to support controlled fund utilization.</li>
                <li>Configured Odoo security groups, access-control rules, multi-company record rules, automated tests, and Docker-based setup.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-xs font-bold text-gray-900 uppercase">Accounts & Ledger Management System</h3>
              </div>
              <a href="https://github.com/dasrudra/Ledger-Software-frontend" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[#E0995A] italic block mb-1 hover:underline">
                https://github.com/dasrudra/Ledger-Software-frontend
              </a>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5 font-sans">
                <li>Built a role-based accounting and ledger application (Admin/Employee permission tiers) for digitizing daily customer-ledger operations, with balance carried forward automatically from each party’s previous closing entry and a profit-calculation engine deriving margin and commission profit from configurable rates.</li>
                <li>Implemented a day-closing workflow that locks finalized ledgers and routes corrections through auditable adjustment entries, built with reusable TypeScript components on an API-ready architecture designed for a planned FastAPI/MySQL backend.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-900">Skills</h2>
          <div className="space-y-1.5 text-xs text-gray-700 font-sans">
            <p><span className="font-mono font-bold uppercase w-48 inline-block">Programming Languages:</span> Python, ABAP, TypeScript, JavaScript, SQL, HTML/CSS</p>
            <p><span className="font-mono font-bold uppercase w-48 inline-block align-top">AI & Machine Learning:</span> Machine Learning, Computer Vision (YOLOv8, OpenCV), NLP, LLM Applications, Prompt Engineering, RAG Systems, Benchmark Design & LLM Evaluation, TensorFlow, PyTorch, Scikit-learn</p>
            <p><span className="font-mono font-bold uppercase w-48 inline-block">Enterprise Systems:</span> SAP (ABAP, Production Planning), Odoo (Python backend, security & access control), SAP BTP Gen AI</p>
            <p><span className="font-mono font-bold uppercase w-48 inline-block">Web, Data & Tools:</span> React.js, Flask, FastAPI, REST APIs, MySQL, SQLite, Git, GitHub, Docker, Google Colab</p>
            <p><span className="font-mono font-bold uppercase w-48 inline-block">Languages:</span> English (IELTS Academic 6.5), Bangla, Hindi</p>
          </div>
        </section>

        {/* Internships & Extra-Curricular Activities */}
        <section className="mb-8">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider border-b border-gray-200 pb-1 mb-3 text-gray-900">Internships & Extra-Curricular Activities</h2>
          <ul className="list-disc ml-4 space-y-1 text-xs text-gray-700 font-sans">
            <li><span className="font-bold text-gray-900">Machine Learning Intern</span> — Cognifyz Technologies (April’24 – June’24): Contributed to ML model development and optimization in a cross-functional team.</li>
            <li><span className="font-bold text-gray-900">Data Science Intern</span> — Skill Genie (Feb’24 – April’24): Built NLP models for spam filtering and movie-review sentiment classification.</li>
            <li><span className="font-bold text-gray-900">Team Leader, Academic Projects:</span> Led cross-functional student project teams.</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-end italic text-xs text-gray-500 font-mono">
          <p>Rudra Das — Professional CV</p>
          <div className="text-center">
            <div className="w-28 h-[1px] bg-gray-400 mb-1" />
            <p>Signature</p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default CV;
