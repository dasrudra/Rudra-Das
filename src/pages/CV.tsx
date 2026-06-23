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
  Calendar,
  Building2,
  GraduationCap,
  Award,
  Code2,
  Cpu,
  Layout,
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
            // Fix oklch issues by adding a style tag that overrides oklch colors with hex
            // Tailwind 4 uses oklch for its default color palette which html2canvas 1.4.1 doesn't support
            const style = clonedDoc.createElement('style');
            style.innerHTML = `
              :root {
                --color-accent-primary: #10B981 !important;
                --color-accent-secondary: #3B82F6 !important;
                --color-bg-dark: #020617 !important;
                --color-navy-900: #0f172a !important;
                --color-navy-950: #020617 !important;
                --color-muted-slate: #94A3B8 !important;
                
                /* Common gray overrides for html2canvas compatibility */
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
              
              /* Force fallback colors for common Tailwind 4 oklch patterns */
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

            // Nuclear option: Scan all style tags and replace oklch(...) with a safe fallback color
            // html2canvas fails when it tries to parse these strings in CSS rules.
            clonedDoc.querySelectorAll('style').forEach(tag => {
              if (tag.innerHTML.includes('oklch')) {
                tag.innerHTML = tag.innerHTML.replace(/oklch\([^)]*\)/g, '#6b7280');
              }
            });
          }
        },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      // Ensure html2pdf is a function (sometimes it's a default export on an object)
      const exporter = typeof html2pdf === 'function' ? html2pdf : (html2pdf as any).default;
      
      if (exporter) {
        await exporter().set(opt).from(element).save();
      } else {
        // Fallback to print if library fails to load
        window.print();
      }
    } catch (error) {
      console.error('PDF Generation Error:', error);
      // Fallback
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-32 pb-20 px-6 sm:px-10 selection:bg-accent-primary/20">
      {/* Top Bar for Web View Only */}
      <div className="max-w-4xl mx-auto mb-10 flex flex-wrap gap-4 justify-between items-center print:hidden">
        <Link to="/" className="text-sm font-bold text-gray-500 hover:text-accent-primary transition-colors flex items-center gap-2">
          ← Back to Portfolio
        </Link>
        <div className="flex gap-3">
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-6 py-3 bg-accent-primary text-white rounded-xl font-bold transition-all flex-1 sm:flex-none justify-center ${
              isDownloading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]'
            }`}
          >
            {isDownloading ? (
              <>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                Generating...
              </>
            ) : (
              <>
                <Download size={18} /> Download as PDF
              </>
            )}
          </button>
          <button 
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-2 px-6 py-3 bg-navy-950 text-white rounded-xl font-bold hover:bg-navy-900 transition-all"
          >
            <Printer size={18} /> Print
          </button>
        </div>
      </div>

      {/* CV Paper Component */}
      <motion.div 
        ref={cvRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[800px] mx-auto bg-white shadow-2xl rounded-sm p-8 md:p-12 border border-gray-100 print:shadow-none print:border-none print:p-0"
      >
        {/* Header */}
        <header className="border-b-2 border-gray-900 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Rudra Das</h1>
            <p className="text-lg font-medium text-gray-600 mb-4">BSc in Computer Science and Engineering</p>
            <div className="space-y-1 text-sm text-gray-600">
              <p className="flex items-center gap-2"><Building2 size={14} /> East Delta University, Chattogram</p>
              <p className="flex items-center gap-2"><MapPin size={14} /> Address: Boxir-bit, Terribazar, Chattogram</p>
              <p className="flex items-center gap-2"><Phone size={14} /> Phone: +880-1796726405</p>
              <p className="flex items-center gap-2"><Mail size={14} /> Email: dasrudra738@gmail.com</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm font-bold">
            <a href="https://linkedin.com/in/dasrudra" className="flex items-center gap-2 hover:text-accent-primary transition-colors"><Linkedin size={16} /> Linkedin</a>
            <a href="https://github.com/dasrudra" className="flex items-center gap-2 hover:text-accent-primary transition-colors"><Github size={16} /> Github</a>
            <a href="https://dasrudra.netlify.app" className="flex items-center gap-2 hover:text-accent-primary transition-colors"><Globe size={16} /> Portfolio</a>
            <a href="https://kaggle.com/rudradas2000" className="flex items-center gap-2 hover:text-accent-primary transition-colors"><Database size={16} /> Kaggle</a>
          </div>
        </header>

        {/* Career Objective */}
        <section className="mb-10">
          <h2 className="text-base font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">Career Objective</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Driven IT specialist, Software and ERP Developer dedicated to transforming business processes through technical innovation with a solid background in system administration, data analysis, and computer science. With hands-on experience, I am committed to use technical know-how, analytical aptitude, and problem-solving abilities to enhance organizational effectiveness and facilitate data-driven decision-making, looking for chances to develop in a fast-paced workplace and contribute to creative projects.
          </p>
        </section>

        {/* Employment */}
        <section className="mb-10">
          <h2 className="text-base font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-6">Employment</h2>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Assistant Engineer - Functional Applications (EAS)</h3>
                  <p className="text-sm italic text-gray-600">Tekvision (BD) Ltd. subsidiary of Youngone Holdings</p>
                </div>
                <span className="text-sm font-medium text-gray-600 shrink-0 ml-4">December 2025 - Present</span>
              </div>
              <ul className="list-disc ml-4 space-y-1 text-sm text-gray-700 mt-3">
                <li>Serving as an ERP Developer within the Enterprise Application Services (EAS) team responsible for developing, enhancing and maintaining SAP-based business applications that support commercial and production operations. Designing and optimizing custom ABAP program reports and enhancements to improve workflow efficiency data accuracy and system performance.</li>
                <li>Providing technical and functional support to SAP Production Planning (PP) module users by diagnosing system issues troubleshooting operational challenges and ensuring smooth execution of production and commercial processes.</li>
                <li>Actively involved in ERP customization, system integration, and process automation initiatives, including serving as a core team member in the Odoo ERP implementation for APDL (Alpha Product Development Ltd.). Responsible for functional and technical coordination, collaborate with vendors, requirement analysis, configuration support, and User Acceptance Testing (UAT).</li>
                <li>Supporting pricing strategy and implementation service costing for ERP deployment, including pricing models for implementation, training, customization, and post-go-live support services.</li>
                <li>Contributing to software engineering initiatives including development of AI-based computer vision systems, web applications and data analytics tools to support operational efficiency and innovation within enterprise systems.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Web Developer (Volunteer)</h3>
                  <p className="text-sm italic text-gray-600">FreeAppStore, New Zealand (Remote)</p>
                </div>
                <span className="text-sm font-medium text-gray-600 shrink-0 ml-4">June 2026 – Present</span>
              </div>
              <ul className="list-disc ml-4 space-y-1 text-sm text-gray-700 mt-3">
                <li>Contributing to a free-forever web application ecosystem through frontend development, responsive UI improvement, and open-source collaboration. Working with React.js, TypeScript, Tailwind CSS, JavaScript, Git/GitHub, and PWA-focused development practices.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-base font-bold text-gray-900">Officer - IT, MIS</h3>
                  <p className="text-sm italic text-gray-600">Padma Plastics Ltd. a sister concern of Padma Group Of Converters</p>
                </div>
                <span className="text-sm font-medium text-gray-600 shrink-0 ml-4">May 2024 - November 2025</span>
              </div>
              <ul className="list-disc ml-4 space-y-1 text-sm text-gray-700 mt-3">
                <li>Managed IT operations including data entry monitoring in SAP and data accuracy checking.</li>
                <li>Performed IT audits, system backup & recovery, and hardware/software maintenance.</li>
                <li>Maintained IT asset registers and inventory of networking components.</li>
                <li>Supported departmental KPI evaluation and 5S/TPM/ISO activities.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Publications */}
        <section className="mb-10">
          <h2 className="text-base font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">Publications</h2>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-bold text-gray-900 italic">Unveiling Predictive Factors in Apple Quality</h3>
            <span className="text-sm text-gray-600">March 2024</span>
          </div>
          <p className="text-xs text-gray-600 mb-2">Military Institute of Science and Technology (MIST), Dhaka-1216, Bangladesh</p>
          <p className="text-xs text-gray-700">
            2024 6th International Conference on Electrical Engineering and Information Communication Technology (ICEE-ICT)
          </p>
          <a href="https://ieeexplore.ieee.org/document/10534426" className="text-[10px] text-accent-primary hover:underline flex items-center gap-1 mt-1">
            <ExternalLink size={10} /> View on IEEE Xplore
          </a>
        </section>

        {/* Education */}
        <section className="mb-10 break-before-page print:pt-10">
          <h2 className="text-base font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">Education</h2>
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="py-2 pr-4 font-bold">Degree/Certificate</th>
                <th className="py-2 px-4 font-bold">Institute/Board</th>
                <th className="py-2 px-4 font-bold">CGPA/Percentage</th>
                <th className="py-2 px-4 font-bold whitespace-nowrap">Passing Year</th>
                <th className="py-2 pl-4 font-bold">Major</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-50 uppercase">
                <td className="py-3 pr-4 font-bold">Bachelor of Science</td>
                <td className="py-3 px-4">East Delta University, Chattogram</td>
                <td className="py-3 px-4 italic">3.41 (Out of 4.00)</td>
                <td className="py-3 px-4 text-center">2024</td>
                <td className="py-3 pl-4">CS & Engineering</td>
              </tr>
              <tr className="border-b border-gray-50 uppercase">
                <td className="py-3 pr-4 font-bold">HSC</td>
                <td className="py-3 px-4">Govt. Haji Muhammad Mohsin College</td>
                <td className="py-3 px-4 italic">4.25 (Out of 5.00)</td>
                <td className="py-3 px-4 text-center">2019</td>
                <td className="py-3 pl-4">Science</td>
              </tr>
              <tr className="border-b border-gray-200 last:border-b-0 uppercase">
                <td className="py-3 pr-4 font-bold">SSC</td>
                <td className="py-3 px-4">Chattogram Collegiate School</td>
                <td className="py-3 px-4 italic">5.00 (Out of 5.00)</td>
                <td className="py-3 px-4 text-center">2017</td>
                <td className="py-3 pl-4">Science</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Training */}
        <section className="mb-10">
          <h2 className="text-base font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">Training</h2>
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="py-2 pr-4 font-bold">Degree</th>
                <th className="py-2 px-4 font-bold">Course Description</th>
                <th className="py-2 px-4 font-bold">Institute</th>
                <th className="py-2 pl-4 font-bold text-right whitespace-nowrap">Year</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b border-gray-50">
                <td className="py-3 pr-4 font-bold uppercase">ABAP and S/4 HANA</td>
                <td className="py-3 px-4 italic">ABAP Fundamentals and Core Programming Concepts</td>
                <td className="py-3 px-4">Coursera</td>
                <td className="py-3 pl-4 text-right whitespace-nowrap">February 2026</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="py-3 pr-4 font-bold uppercase">Python Web Course</td>
                <td className="py-3 px-4 italic">Fundamentals of Python Web</td>
                <td className="py-3 px-4">Ostad</td>
                <td className="py-3 pl-4 text-right whitespace-nowrap">March 2024</td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="py-3 pr-4 font-bold uppercase">Data Science Crash Course</td>
                <td className="py-3 px-4 italic">Basic Statistics of Data Science and Fundamentals</td>
                <td className="py-3 px-4">Ostad</td>
                <td className="py-3 pl-4 text-right whitespace-nowrap">March 2024</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold uppercase">Database and MySQL</td>
                <td className="py-3 px-4 italic">Database Management System and Advanced SQL</td>
                <td className="py-3 px-4">Great Learnings</td>
                <td className="py-3 pl-4 text-right whitespace-nowrap">February 2024</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Projects & Hackathon */}
        <section className="mb-10">
          <h2 className="text-base font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-6">Projects & Hackathon</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-900 uppercase">FocusDeck – Chrome New Tab Productivity Dashboard</h3>
              </div>
              <p className="text-[10px] text-accent-primary italic block mb-1">https://github.com/dasrudra/FocusDeck</p>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5">
                <li>Developed a custom Chrome New Tab productivity dashboard using React.js, TypeScript, Tailwind CSS, and Chrome Extension APIs.</li>
                <li>Integrated real browser data including Chrome Bookmarks, History, and Downloads, with categorized bookmark folders and global search.</li>
              </ul>
            </div>
            
            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-900 uppercase">DistractCheck: Measuring Selective Attention in Language Models</h3>
              </div>
              <p className="text-[10px] text-accent-primary italic block mb-1">Kaggle x Google DeepMind Hackathon, 2026</p>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5">
                <li>Created and submitted a benchmark for the Attention track in the Kaggle hackathon Measuring Progress Toward AGI: Cognitive Abilities.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-900 uppercase">Smart AI Detection System</h3>
              </div>
              <p className="text-[10px] text-accent-primary italic block mb-1">https://github.com/dasrudra/Smart-Detection-Ai</p>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5">
                <li>Developed a real-time Smart Gate Detection Counting System using YOLOv8 and OpenCV to detect, track, and count people and vehicles.</li>
                <li>Built a data logging and analytics pipeline with SQLite, CSV reporting, and a FastAPI web dashboard.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-900 uppercase">Hotel Management System</h3>
              </div>
              <p className="text-[10px] text-accent-primary italic block mb-1">https://shorturl.at/XsTEw</p>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5">
                <li>Hotel Management System web application using Python (Flask) and SQLite.</li>
                <li>A modern, responsive UI with HTML, CSS, and Bootstrap, ensuring cross-device accessibility.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-900 uppercase">Accounting & Ledger Software</h3>
              </div>
              <p className="text-[10px] text-accent-primary italic block mb-1">https://github.com/dasrudra/Ledger-Software-frontend</p>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5">
                <li>Developed a high-performance, responsive frontend dashboard for ledger accounts and finance/transaction tracking.</li>
                <li>Utilized React.js, TypeScript, and Tailwind CSS to design elegant corporate-grade user interfaces with real-time feedback.</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-baseline">
                <h3 className="text-sm font-bold text-gray-900 uppercase">Meta Ads Library Scraper</h3>
              </div>
              <p className="text-[10px] text-accent-primary italic block mb-1">https://github.com/dasrudra/meta-ads-library-scraper</p>
              <ul className="text-xs text-gray-700 list-disc ml-4 space-y-0.5">
                <li>Developed a specialized tool to scrape and aggregate data from the Meta Ads Library for competitive analysis.</li>
                <li>Enabled efficient advertising trend research and data-driven insights for marketing strategies.</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-bold text-gray-900">Udemy Projects</h3>
                <p className="text-[10px] text-gray-500">HTML, CSS, JS based 10 Projects</p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-900">Sentiment Analysis Model</h3>
                <p className="text-[10px] text-gray-500 mb-1">IMDB movie review sentiment analysis using Python and ML.</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-bold text-gray-900">Emotion Recognition from Speech Using Hybrid Model</h3>
              <p className="text-[10px] text-gray-500">Speech Emotion Recognition system using hybrid machine learning models to identify emotional states from audio recordings.</p>
            </div>
          </div>
        </section>

        {/* Skills & Interests */}
        <section className="mb-10 break-before-page print:pt-10">
          <h2 className="text-base font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">Skills & Interests</h2>
          <div className="space-y-3 text-xs leading-relaxed">
            <p><span className="font-bold uppercase w-32 inline-block">Programming:</span> ABAP, Python, React.js, TypeScript, Tailwind CSS, SQL, HTML, CSS, JavaScript</p>
            <p><span className="font-bold uppercase w-32 inline-block">AI & Data Science:</span> Responsive Design, Glassmorphism UI, Dashboard Design, Machine Learning, Data Analysis, NLP, Image Processing, LLM Evaluation, Web Scraping, Data Engineering</p>
            <p><span className="font-bold uppercase w-32 inline-block">Frameworks/Tools:</span> Flask, FastAPI, REST APIs, Pytest, CLI Development, Git, GitHub, Kaggle Benchmarks, Chrome Extension Development</p>
            <p><span className="font-bold uppercase w-32 inline-block">Enterprise Tools:</span> SAP, Odoo.sh, SAP BTP Generative AI</p>
            <p><span className="font-bold uppercase w-32 inline-block">Databases:</span> MySQL, SQLite</p>
            <p><span className="font-bold uppercase w-32 inline-block">Operating Systems:</span> Windows</p>
            <p><span className="font-bold uppercase w-32 inline-block">Language:</span> Bangla, English, Hindi</p>
          </div>
        </section>

        {/* Internships & Extra-Curricular Activities */}
        <section className="mb-10">
          <h2 className="text-base font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">Internships & Extra-Curricular Activities</h2>
          <div className="space-y-4 text-xs">
            <div>
              <p className="font-bold uppercase">Data Science Intern | Skill Genie</p>
              <p className="text-gray-700">Worked on real-time data science projects including email spam filtering and IMDB movie review sentiment analysis. Developed NLP-based models for text classification and data pre-processing to enhance prediction accuracy.</p>
            </div>
            <div>
              <p className="font-bold uppercase">Machine Learning Intern | Cognifyz Technologies</p>
              <p className="text-gray-700">Contributed to machine learning model development and optimization for scalable technology solutions. Collaborated with cross-functional teams on the development and testing of machine learning applications.</p>
            </div>
            <div>
              <p className="font-bold uppercase">Leadership in Academic Projects</p>
              <p className="text-gray-700 italic">Served as Team Leader and contributed to innovation and teamwork.</p>
            </div>
            <div className="flex gap-4">
              <p className="text-gray-700"><span className="font-bold uppercase">Volunteer, EDU Cricket Tournament (Season 1):</span> Assisted in organizing and coordinating event operations.</p>
            </div>
            <div className="flex gap-4">
              <p className="text-gray-700"><span className="font-bold uppercase">Volunteer, EDU Indoor Games:</span> Managed logistics, participant coordination, and event flow.</p>
            </div>
          </div>
        </section>

        {/* Personal Details */}
        <section className="mb-10">
          <h2 className="text-base font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-4">Personal Details</h2>
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-xs">
            <p><span className="font-bold uppercase w-32 inline-block">Father's Name:</span> Babul Das</p>
            <p><span className="font-bold uppercase w-32 inline-block">Mother's Name:</span> Joba Das</p>
            <p><span className="font-bold uppercase w-32 inline-block">Date of Birth:</span> February 21, 2000</p>
            <p><span className="font-bold uppercase w-32 inline-block">Gender:</span> Male</p>
            <p><span className="font-bold uppercase w-32 inline-block">Marital Status:</span> Unmarried</p>
            <p><span className="font-bold uppercase w-32 inline-block">Nationality:</span> Bangladeshi</p>
            <p><span className="font-bold uppercase w-32 inline-block">Religion:</span> Hinduism</p>
            <p className="col-span-2"><span className="font-bold uppercase w-32 inline-block">Permanent Address:</span> Kaliaish, Moulovir Dokan, Satkania, Chattogram</p>
          </div>
        </section>

        {/* References */}
        <section className="mb-10">
          <h2 className="text-base font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-6">References</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="text-xs space-y-1 text-gray-700">
              <p className="font-bold text-sm text-gray-900 mb-2 underline">Reference 1:</p>
              <p><span className="font-bold">Name:</span> Dr. Mohammed Nazim Uddin</p>
              <p><span className="font-bold">Organization:</span> East Delta University</p>
              <p><span className="font-bold">Designation:</span> Vice-Chancellor</p>
              <p><span className="font-bold">Mobile:</span> 01730794514</p>
              <p><span className="font-bold">E-mail:</span> nazim@eastdelta.edu.bd</p>
              <p><span className="font-bold text-accent-primary italic">Relation: Academic</span></p>
            </div>
            <div className="text-xs space-y-1 text-gray-700">
              <p className="font-bold text-sm text-gray-900 mb-2 underline">Reference 2:</p>
              <p><span className="font-bold">Name:</span> Linkon Chowdhury</p>
              <p><span className="font-bold">Organization:</span> East Delta University</p>
              <p><span className="font-bold">Designation:</span> Assistant Professor, Dept. of CSE</p>
              <p><span className="font-bold">Mobile:</span> 01818633071</p>
              <p><span className="font-bold">E-mail:</span> linkoncuetbd@gmail.com</p>
              <p><span className="font-bold text-accent-primary italic">Relation: Academic</span></p>
            </div>
          </div>
        </section>

        {/* Footer Signature placeholder */}
        <footer className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-end italic text-xs text-gray-400">
          <p>Generated via Digital Portfolio</p>
          <div className="text-center">
            <div className="w-32 h-[1px] bg-gray-400 mb-2" />
            <p>Signature</p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default CV;
