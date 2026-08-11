import React, { useState, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Database, 
  Globe, 
  Cpu, 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  MapPin, 
  ExternalLink, 
  GraduationCap,
  Layers,
  Terminal,
  ArrowUpRight,
  Sparkles,
  Building2,
  Calendar,
  BookOpen,
  Brain,
  Trophy,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectVisualMockup } from '../components/ProjectVisualMockup';
import { ProjectsStageCarousel } from '../components/ProjectsStageCarousel';
import { SignatureLedgerMotif } from '../components/SignatureLedgerMotif';
import { SkillLogoBadge } from '../components/SkillLogoBadge';

interface TiltContainerProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
  glareIntensity?: number;
}

const TiltContainer: React.FC<TiltContainerProps> = ({ 
  children, 
  className = "", 
  maxTilt = 8, 
  glowColor = "rgba(224, 153, 90, 0.15)", 
  glareIntensity = 0.12 
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    
    setTilt({
      x: normY * -maxTilt,
      y: normX * maxTilt
    });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-500 ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'none' : 'transform 0.5s ease, box-shadow 0.5s ease',
        boxShadow: isHovered ? `0 20px 40px ${glowColor}` : 'none',
      }}
    >
      {/* Specular glare overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 rounded-[inherit]" 
        style={{
          background: isHovered 
            ? `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glareIntensity}) 0%, transparent 60%)`
            : 'none',
          mixBlendMode: 'overlay',
          opacity: isHovered ? 1 : 0
        }}
      />
      {children}
    </div>
  );
};

// Helper component for skill badges is imported from ../components/SkillLogoBadge

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

const Home = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const containerRef = useRef(null);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const encode = (dataObj: Record<string, string>) =>
      Object.keys(dataObj)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(dataObj[key]))
        .join("&");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...data }),
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        console.error('Submission error status:', response.status);
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    }
  };

  return (
    <div ref={containerRef} className="bg-[#0B1220] relative text-[#EDEAE3]">
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
        <div className="section-padding grid lg:grid-cols-12 gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141D30] border border-[#2A3348] text-[#E0995A] font-mono text-xs font-bold uppercase tracking-wider mb-8"
            >
              <Terminal size={14} />
              <span>Available for Enterprise Projects</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.95] mb-4 text-[#EDEAE3]">
              Rudra <br /> <span className="text-[#E0995A]">Das</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-[#EDEAE3]/90 mb-8 leading-tight">
              Software Engineer | AI & ML | SAP & Odoo ERP
            </h2>
            
            <p className="text-base md:text-lg text-[#8B93A6] mb-10 font-sans max-w-xl leading-relaxed">
              Architecting high-performance <span className="text-[#E0995A] font-semibold">AI-powered enterprise software</span> and intelligent automation pipelines. Specializing in bridging complex machine learning workflows with robust ERP systems to streamline business processes, optimize operations, and deliver scalable web applications.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex flex-wrap gap-4 items-center">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link 
                    to="/portfolio" 
                    className="bg-[#E0995A] hover:bg-[#d68c4d] text-[#0B1220] px-8 py-4 rounded-xl font-mono text-sm font-bold uppercase tracking-wider transition-all accent-glow flex items-center gap-3 group"
                  >
                    Explore My Work <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link 
                    to="/cv" 
                    className="bg-[#141D30] hover:bg-[#1a263d] border border-[#2A3348] text-[#EDEAE3] px-8 py-4 rounded-xl font-mono text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-3 group"
                  >
                    Download Resume <Sparkles size={16} className="text-[#E0995A]" />
                  </Link>
                </motion.div>

                {/* Social Links */}
                <div className="flex items-center gap-3 pl-2 sm:pl-4">
                  <motion.a
                    href="https://github.com/dasrudra"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl bg-[#141D30] border border-[#2A3348] flex items-center justify-center text-[#8B93A6] hover:text-[#E0995A] transition-all cursor-pointer"
                    title="GitHub"
                  >
                    <Github size={18} />
                  </motion.a>
                  
                  <motion.a
                    href="https://www.linkedin.com/in/rudra-das-548bb42b2"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl bg-[#141D30] border border-[#2A3348] flex items-center justify-center text-[#8B93A6] hover:text-[#E0995A] transition-all cursor-pointer"
                    title="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </motion.a>

                  <motion.a
                    href="https://kaggle.com/rudradas2000"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl bg-[#141D30] border border-[#2A3348] flex items-center justify-center text-[#8B93A6] hover:text-[#E0995A] transition-all cursor-pointer"
                    title="Kaggle"
                  >
                    <Trophy size={18} />
                  </motion.a>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[#8B93A6] border-t border-[#2A3348] pt-6">
                <div className="flex items-center gap-2 bg-[#141D30] border border-[#2A3348] rounded-full px-4 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E0995A]" />
                  <span className="text-[#EDEAE3]">IEEE Publication</span>
                </div>
                <div className="flex items-center gap-2 bg-[#141D30] border border-[#2A3348] rounded-full px-4 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E0995A]" />
                  <span className="text-[#EDEAE3]">SAP & Odoo Enterprise</span>
                </div>
                <div className="flex items-center gap-2 bg-[#141D30] border border-[#2A3348] rounded-full px-4 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E0995A]" />
                  <span className="text-[#EDEAE3]">Open Source Contributor</span>
                </div>
              </div>

              {/* Statistics Bar */}
              <div className="flex flex-wrap gap-8 pt-4 border-t border-[#2A3348]">
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex items-center gap-3">
                  <div className="text-3xl font-display font-bold text-[#E0995A]">2+</div>
                  <div className="text-[10px] font-mono text-[#8B93A6] uppercase tracking-wider leading-tight">
                    Years <br /> Experience
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-3">
                  <div className="text-3xl font-display font-bold text-[#E0995A]">9+</div>
                  <div className="text-[10px] font-mono text-[#8B93A6] uppercase tracking-wider leading-tight">
                    Projects <br /> Delivered
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex items-center gap-3">
                  <div className="text-3xl font-display font-bold text-[#E0995A]">1</div>
                  <div className="text-[10px] font-mono text-[#8B93A6] uppercase tracking-wider leading-tight">
                    Research <br /> Publication
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex items-center gap-3">
                  <div className="text-3xl font-display font-bold text-[#5FB3B3]">1</div>
                  <div className="text-[10px] font-mono text-[#8B93A6] uppercase tracking-wider leading-tight">
                    Kaggle <br /> Hackathon
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Profile Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative z-10 glass-card p-4 rounded-[32px] max-w-[360px] mx-auto border border-[#2A3348] bg-[#141D30]">
              <div className="rounded-[24px] overflow-hidden aspect-[4/5] border border-[#2A3348] bg-[#0B1220]">
                <img 
                  src="https://i.postimg.cc/c4VLgDcV/Rudra-Pic-Professional-3.jpg" 
                  alt="Rudra Das" 
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Badges */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-[#0B1220] border border-[#2A3348] flex items-center gap-2">
                  <Brain size={16} className="text-[#5FB3B3]" />
                  <div>
                    <p className="text-[9px] font-mono text-[#8B93A6] uppercase">AI/ML</p>
                    <p className="text-xs font-mono font-bold text-[#EDEAE3]">Specialist</p>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0B1220] border border-[#2A3348] flex items-center gap-2">
                  <Building2 size={16} className="text-[#E0995A]" />
                  <div>
                    <p className="text-[9px] font-mono text-[#8B93A6] uppercase">ERP</p>
                    <p className="text-xs font-mono font-bold text-[#EDEAE3]">SAP & Odoo</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SIGNATURE MOTIF #1 — Hero to Capabilities transition bridge */}
      <SignatureLedgerMotif label="Enterprise Data Architecture — Neural Systems Bridge" />

      {/* About Section */}
      <section id="about" className="relative py-12">
        <div className="section-padding max-w-7xl mx-auto space-y-16">
          
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141D30] border border-[#2A3348] text-[#E0995A] font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Engineering Philosophy</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight text-[#EDEAE3]">
              Turning Operational Bottlenecks into <span className="text-[#E0995A]">Intelligent Software Systems</span>
            </h2>
            <div className="space-y-5 text-[#8B93A6] text-base leading-relaxed max-w-4xl font-sans">
              <p>
                I specialize in solving high-impact operational inefficiencies by designing intelligent, data-driven systems. By targeting systemic bottlenecks, I build software that automates repetitive workflows, minimizes operational overhead, and empowers organizational leadership with real-time actionable insights.
              </p>
              <p>
                My professional experience lies at the intersection of advanced artificial intelligence frameworks, custom Odoo & SAP ERP solutions, and scalable full-stack web platforms. From customizing SAP Production Planning systems to deploying database-backed computational ledger applications, I engineer systems with enterprise-grade durability.
              </p>
            </div>
          </motion.div>

          {/* Grid of Capability Cards */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainerVariants}
              className="lg:col-span-7 space-y-4"
            >
              {[
                { label: 'Enterprise Experience', val: 'ERP Customization & Automation', sub: 'Designing ABAP reports, customizing Odoo.sh workflows, and optimizing industrial business processes.', icon: <Building2 size={18} /> },
                { label: 'AI & Research', val: 'Predictive Models & Intelligent Workflows', sub: 'Published researcher in data modeling, speech emotion classifiers, and Kaggle benchmark design.', icon: <Brain size={18} /> },
                { label: 'Software Engineering', val: 'High-Performance Full-Stack Systems', sub: 'Architecting secure web apps and robust APIs using React, TypeScript, Python, and SQL databases.', icon: <Code2 size={18} /> },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={staggerItemVariants}
                  className="glass-card p-5 flex items-start gap-4 rounded-xl border border-[#2A3348] bg-[#141D30]"
                >
                  <div className="p-2.5 rounded-lg bg-[#0B1220] border border-[#2A3348] text-[#E0995A] shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E0995A] mb-1">{item.label}</p>
                    <p className="text-base font-display font-bold text-[#EDEAE3] mb-1">{item.val}</p>
                    <p className="text-xs text-[#8B93A6] leading-relaxed font-sans">{item.sub}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div variants={staggerItemVariants} className="flex items-center gap-4 p-4 rounded-xl bg-[#141D30] border border-[#2A3348] text-xs text-[#8B93A6]">
                <GraduationCap size={18} className="text-[#E0995A] shrink-0" />
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A6]/80">Academic Foundation</p>
                  <p className="text-[#EDEAE3] font-medium font-sans">BSc in Computer Science and Engineering</p>
                  <p className="text-[11px] text-[#8B93A6] font-mono">East Delta University, Chattogram · CGPA 3.41 / 4.00</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Technical Profile Box */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <div className="glass-card p-8 space-y-8 rounded-2xl border border-[#2A3348] bg-[#141D30]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#E0995A] flex items-center justify-center text-[#0B1220]">
                    <Terminal size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-[#EDEAE3]">Technical Profile</h3>
                    <p className="text-xs font-mono text-[#8B93A6]">Core Competency Areas</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[
                    { title: 'Artificial Intelligence', desc: 'Machine Learning, NLP, LLM Applications, Computer Vision, RAG Systems', icon: <Brain size={18} /> },
                    { title: 'Enterprise Technologies', desc: 'SAP ABAP, Odoo ERP, SAP BTP Generative AI, Process Automation', icon: <Building2 size={18} /> },
                    { title: 'Backend & APIs', desc: 'Python, FastAPI, Flask, SQL Databases, REST API Integration', icon: <Cpu size={18} /> },
                    { title: 'Frontend & Tools', desc: 'React.js, TypeScript, Tailwind CSS, Git, GitHub Ecosystem', icon: <Globe size={18} /> },
                  ].map((point, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-lg bg-[#0B1220] border border-[#2A3348] flex items-center justify-center text-[#E0995A] shrink-0">
                        {point.icon}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#EDEAE3] mb-1">{point.title}</h4>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {point.desc.split(', ').map((tech) => (
                            <SkillLogoBadge key={tech} skill={tech} size="xs" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="services" className="py-16 bg-[#0B1220]">
        <div className="section-padding max-w-7xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <span className="text-[#E0995A] font-mono text-xs font-bold uppercase tracking-[0.3em] mb-2 block">
              Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-[#EDEAE3]">
              Professional Capability & Technical Spectrum
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerVariants}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                title: "Artificial Intelligence",
                // AI/ML uses muted teal #5FB3B3 per prompt instructions
                icon: <Brain size={22} className="text-[#5FB3B3]" />,
                isAI: true,
                focus: "Designing intelligent agentic workflows, LLM applications, NLP pipelines, and advanced RAG architectures to automate reasoning.",
                highlights: ["Agentic Workflows", "RAG & LLM Apps", "Predictive Modeling", "Dataset Curation"]
              },
              {
                title: "Enterprise Systems",
                icon: <Building2 size={22} className="text-[#E0995A]" />,
                isAI: false,
                focus: "Customizing robust Odoo ERP environments, designing SAP ABAP business logic, automating workflows, and building stable data bridges.",
                highlights: ["Odoo.sh & Workflows", "SAP PP & ABAP Development", "Process Automation", "System Integrations"]
              },
              {
                title: "Full-Stack Engineering",
                icon: <Code2 size={22} className="text-[#E0995A]" />,
                isAI: false,
                focus: "Developing highly performant, type-safe frontends paired with resilient, clean backends and secure REST APIs designed to solve business problems.",
                highlights: ["React.js & TypeScript", "Python (FastAPI & Flask)", "Tailwind CSS Layouts", "Secure REST APIs"]
              },
              {
                title: "Data Engineering",
                icon: <Database size={22} className="text-[#E0995A]" />,
                isAI: false,
                focus: "Structuring relational database schemas, orchestrating secure ETL data pipelines, conducting error analysis, and curating benchmarking datasets.",
                highlights: ["Relational Schemas", "ETL Pipelines", "Data Modeling & Viz", "Benchmark Design"]
              }
            ].map((cap, i) => (
              <motion.div
                key={i}
                variants={staggerItemVariants}
                className={`glass-card p-6 flex flex-col justify-between h-full rounded-2xl border ${cap.isAI ? 'border-[#5FB3B3]/40 bg-[#141D30]' : 'border-[#2A3348] bg-[#141D30]'}`}
              >
                <div className="space-y-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${cap.isAI ? 'bg-[#5FB3B3]/10 text-[#5FB3B3]' : 'bg-[#E0995A]/10 text-[#E0995A]'}`}>
                    {cap.icon}
                  </div>
                  <h3 className="text-lg font-display font-bold text-[#EDEAE3]">{cap.title}</h3>
                  <p className="text-xs text-[#8B93A6] leading-relaxed font-sans">{cap.focus}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-[#2A3348]">
                  {cap.highlights.map(tag => (
                    <SkillLogoBadge key={tag} skill={tag} size="xs" />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Proficiency Categories */}
          <div className="pt-8">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-left mb-6"
            >
              <h3 className="text-xl font-display font-bold text-[#EDEAE3] flex items-center gap-2">
                <Sparkles size={16} className="text-[#E0995A]" />
                Engineering Proficiency & Toolsets
              </h3>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainerVariants}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                {
                  level: "Core Expertise",
                  desc: "Primary technologies and architectures leveraged daily for core professional engineering deliverables.",
                  skills: ["Python", "Machine Learning", "SAP ABAP", "Odoo ERP", "React.js", "TypeScript", "SQL Databases", "Data Analysis", "FastAPI"]
                },
                {
                  level: "Strong Experience",
                  desc: "Robust frameworks, APIs, and design methodologies integrated regularly into production-ready platforms.",
                  skills: ["Flask", "RAG Systems", "NLP / LLMs", "REST APIs", "Git & GitHub", "Tailwind CSS", "Process Automation", "Dataset Curation", "Error Analysis"]
                },
                {
                  level: "Working Knowledge",
                  desc: "Functional toolsets, libraries, and automation utilities applied in supporting roles and testing.",
                  skills: ["Deep Learning", "TensorFlow", "Pandas & NumPy", "Pytest", "Web Scraping", "n8n", "LangChain", "Chrome Extension APIs"]
                },
                {
                  level: "Emerging Tech & AI",
                  desc: "Cutting-edge paradigms, cognitive agents, and automation frameworks actively researched.",
                  skills: ["Agentic AI", "Multi-Agent Systems", "Model Context Protocol (MCP)", "AI Automation", "SAP Joule", "SAP BTP Generative AI"]
                }
              ].map((level, i) => (
                <motion.div
                  key={i}
                  variants={staggerItemVariants}
                  className="glass-card p-6 flex flex-col h-full rounded-2xl border border-[#2A3348] bg-[#141D30]"
                >
                  <div className="mb-4">
                    <h4 className="text-base font-display font-bold text-[#EDEAE3] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E0995A]" />
                      {level.level}
                    </h4>
                    <p className="text-[11px] text-[#8B93A6] mt-1 leading-relaxed font-sans">{level.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[#2A3348]">
                    {level.skills.map(skill => (
                      <SkillLogoBadge key={skill} skill={skill} size="sm" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Marquee */}
      <section className="py-8 border-y border-[#2A3348] bg-[#0B1220] overflow-hidden">
        <div className="flex whitespace-nowrap select-none">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 items-center px-8"
          >
            {['SAP ABAP', 'Python', 'Odoo ERP', 'FastAPI', 'Flask', 'SQL', 'React.js', 'TypeScript', 'Machine Learning', 'Computer Vision'].map((tech) => (
              <span key={tech} className="text-xl font-mono font-bold text-[#8B93A6]/30 hover:text-[#E0995A] transition-colors cursor-default uppercase tracking-wider">
                {tech}
              </span>
            ))}
          </motion.div>
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 items-center px-8"
          >
            {['SAP ABAP', 'Python', 'Odoo ERP', 'FastAPI', 'Flask', 'SQL', 'React.js', 'TypeScript', 'Machine Learning', 'Computer Vision'].map((tech) => (
              <span key={tech} className="text-xl font-mono font-bold text-[#8B93A6]/30 hover:text-[#E0995A] transition-colors cursor-default uppercase tracking-wider">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Stage Section */}
      <ProjectsStageCarousel 
        title="All Projects" 
        subtitle="An authentic showcase of enterprise modules, machine learning benchmarks, and software tools — formatted with verified status badges and accurate technical specifications."
        showPortfolioCTA={true} 
      />

      {/* SIGNATURE MOTIF #2 — Divider into Professional Experience & Research */}
      <SignatureLedgerMotif label="Structured Enterprise Ledgers — Machine Intelligence Research" />

      {/* Experience Section */}
      <section id="experience" className="py-12 bg-[#0B1220]">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Left Column: Research & Case Studies */}
            <div className="lg:col-span-5 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <span className="text-[#E0995A] font-mono text-xs font-bold uppercase tracking-[0.3em] block">
                  Career Path
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-[#EDEAE3] leading-tight">
                  Professional Experience <br /> & Research
                </h2>
                <p className="text-[#8B93A6] text-sm leading-relaxed max-w-md font-sans">
                  My engineering journey is defined by bridging complex enterprise resource systems with cutting-edge artificial intelligence, solving hard bottlenecks and delivering measurable business impact.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainerVariants}
                className="space-y-6"
              >
                <motion.div variants={staggerItemVariants} className="flex items-center gap-3 text-[#EDEAE3] font-display font-bold text-lg">
                  <BookOpen className="text-[#E0995A]" size={20} />
                  <h3>Academic & Lab Highlights</h3>
                </motion.div>

                {/* Research Highlight Card - Muted Teal AI Accent */}
                <motion.div variants={staggerItemVariants} className="glass-card p-6 border-l-4 border-l-[#5FB3B3] rounded-r-xl border-t border-r border-b border-[#2A3348] bg-[#141D30] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded bg-[#5FB3B3]/10 border border-[#5FB3B3]/30 text-[#5FB3B3] text-[10px] font-mono font-bold">
                      Published 2024
                    </span>
                    <span className="text-[#8B93A6] text-[10px] font-mono">IEEE Xplore</span>
                  </div>
                  
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A6] mb-0.5">Research Publication</p>
                    <h4 className="text-base font-display font-bold text-[#EDEAE3] leading-tight">
                      Unveiling Predictive Factors in Apple Quality
                    </h4>
                  </div>

                  <div className="space-y-1 text-xs text-[#8B93A6] font-sans">
                    <p><span className="font-semibold text-[#EDEAE3]">Conference:</span> 6th ICEE-ICT</p>
                    <p><span className="font-semibold text-[#EDEAE3]">Domain:</span> Machine Learning & Predictive Analytics</p>
                  </div>

                  <a 
                    href="https://ieeexplore.ieee.org/document/10534426?fbclid=IwZXh0bgNhZW0CMTAAAR1lt3eMmyzSVR3y0ghub0XjKbsXFH1wRFXiGlf3FSmI9NujTAS6lmYp3is_aem_ZmFrZWR1bW15MTZieXRlcw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#5FB3B3] text-xs font-mono font-bold uppercase tracking-wider hover:underline pt-2"
                  >
                    View Publication <ExternalLink size={13} />
                  </a>
                </motion.div>

                {/* Hackathon Case Study Card - Muted Teal AI Accent */}
                <motion.div variants={staggerItemVariants} className="glass-card p-6 border-l-4 border-l-[#5FB3B3] rounded-r-xl border-t border-r border-b border-[#2A3348] bg-[#141D30] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2 py-0.5 rounded bg-[#5FB3B3]/10 border border-[#5FB3B3]/30 text-[#5FB3B3] text-[10px] font-mono font-bold">
                      Kaggle Hackathon 2026
                    </span>
                    <span className="text-[#8B93A6] text-[10px] font-mono">Google DeepMind</span>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A6] mb-0.5">Benchmark Case Study</p>
                    <h4 className="text-base font-display font-bold text-[#EDEAE3] leading-tight">
                      DistractCheck: Selective Attention in LLMs
                    </h4>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#8B93A6] font-sans leading-relaxed">
                    <p>
                      <span className="font-semibold text-[#EDEAE3]">Problem:</span> Measuring context recall degradation when surrounded by noisy distractor text.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {["LLM Benchmarks", "Python", "LangChain", "Groq API"].map(t => (
                      <SkillLogoBadge key={t} skill={t} size="xs" />
                    ))}
                  </div>

                  <a 
                    href="https://github.com/dasrudra/DistractCheck-Measuring-Selective-Attention-in-Language-Models" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#5FB3B3] text-xs font-mono font-bold uppercase tracking-wider hover:underline pt-2"
                  >
                    View Repository <ExternalLink size={13} />
                  </a>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column: Timeline */}
            <div className="lg:col-span-7 relative">
              <div className="absolute left-0 lg:left-6 top-4 bottom-4 w-[1px] bg-[#2A3348]" />

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainerVariants}
                className="space-y-8 lg:pl-16"
              >
                {[
                  {
                    title: "Assistant Engineer – Manufacturing Applications",
                    company: "Tekvision (BD) Ltd.",
                    location: "Korean EPZ, Karnaphuli, Chattogram",
                    date: "December 2025 - Present",
                    bullets: [
                      "Build AI-driven automation, computer-vision, and data-analytics tooling in Python to support production and commercial operations.",
                      "Core-team member on the Odoo ERP implementation for APDL, developing on Odoo's Python-based backend — requirement analysis, configuration, and UAT.",
                      "Building hands-on SAP ABAP proficiency on the job: writing and optimizing custom reports and enhancements.",
                      "Provide technical and functional support to SAP Production Planning (PP) users, diagnosing and resolving system issues across production workflows."
                    ],
                    technologies: ["Python", "Odoo ERP", "SAP ABAP", "SAP PP", "Data Analytics", "Computer Vision"]
                  },
                  {
                    title: "Web Developer (Volunteer)",
                    company: "FreeAppStore, New Zealand",
                    location: "Remote",
                    date: "June 2026 – Present",
                    bullets: [
                      "Build responsive, accessible features in React.js, TypeScript, and Tailwind CSS for a free, open-source web-app ecosystem.",
                      "Collaborate asynchronously with a distributed volunteer team through an issue-based Git/GitHub contribution workflow."
                    ],
                    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Git", "GitHub"]
                  },
                  {
                    title: "Officer – IT, MIS",
                    company: "Padma Plastics Ltd.",
                    location: "Chattogram, Bangladesh",
                    date: "May 2024 - November 2025",
                    bullets: [
                      "Monitored SAP data-entry accuracy and produced management reporting supporting organizational compliance standards.",
                      "Maintained IT infrastructure reliability — backups, recovery, maintenance, troubleshooting — and asset register.",
                      "Supported 5S/TPM/ISO and departmental KPI initiatives through IT-side documentation and reporting."
                    ],
                    technologies: ["SAP", "IT Infrastructure", "MIS Reporting"]
                  }
                ].map((job, i) => (
                  <motion.div key={i} variants={staggerItemVariants} className="relative">
                    {/* Hairline dot */}
                    <div className="absolute -left-[71px] top-7 w-3 h-3 rounded-full bg-[#0B1220] border-2 border-[#E0995A] z-10 hidden lg:block" />
                    
                    <div className="glass-card p-6 md:p-8 rounded-2xl border border-[#2A3348] bg-[#141D30] space-y-5">
                      <div className="space-y-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <h3 className="text-lg font-display font-bold text-[#EDEAE3] leading-tight">
                            {job.title}
                          </h3>
                          <span className="px-2.5 py-1 rounded bg-[#0B1220] border border-[#2A3348] text-[#8B93A6] text-[10px] font-mono flex items-center gap-1.5 shrink-0">
                            <Calendar size={11} className="text-[#E0995A]" />
                            {job.date}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#8B93A6] font-mono">
                          <span className="flex items-center gap-1">
                            <Building2 size={13} className="text-[#E0995A]" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-[#E0995A]" />
                            {job.location}
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-2 font-sans">
                        {job.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-2.5 text-[#8B93A6] text-xs leading-relaxed">
                            <span className="text-[#E0995A] shrink-0">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#2A3348]">
                        {job.technologies.map(tech => (
                          <SkillLogoBadge key={tech} skill={tech} size="xs" />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-[#0B1220]">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="glass-card p-8 md:p-14 relative overflow-hidden rounded-3xl border border-[#2A3348] bg-[#141D30] space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[#E0995A] font-mono text-xs font-bold uppercase tracking-wider mb-2 block">
                Get In Touch
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#EDEAE3] mb-4">Let's Connect</h2>
              <p className="text-[#8B93A6] text-sm md:text-base leading-relaxed font-sans max-w-2xl">
                Interested in collaborating or discussing enterprise automation, machine learning projects, or custom ERP development? Reach out directly below.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainerVariants}
                className="space-y-4"
              >
                {[
                  { icon: <Mail size={18} />, label: 'Email', val: 'dasrudra738@gmail.com', href: 'mailto:dasrudra738@gmail.com' },
                  { icon: <MapPin size={18} />, label: 'Location', val: 'Chattogram, Bangladesh' },
                  { icon: <Phone size={18} />, label: 'Phone', val: '+880-1796726405', href: 'tel:+8801796726405' },
                  { icon: <Linkedin size={18} />, label: 'LinkedIn', val: 'linkedin.com/in/rudra-das-548bb42b2', href: 'https://www.linkedin.com/in/rudra-das-548bb42b2' },
                  { icon: <Github size={18} />, label: 'GitHub', val: 'github.com/dasrudra', href: 'https://github.com/dasrudra' },
                  { icon: <Database size={18} />, label: 'Kaggle', val: 'kaggle.com/rudradas2000', href: 'https://www.kaggle.com/rudradas2000' },
                ].map((item, i) => (
                  <motion.div key={i} variants={staggerItemVariants} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1220] border border-[#2A3348] flex items-center justify-center text-[#E0995A] shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase text-[#8B93A6]">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          target={item.label !== 'Email' && item.label !== 'Phone' ? "_blank" : undefined}
                          rel={item.label !== 'Email' && item.label !== 'Phone' ? "noopener noreferrer" : undefined}
                          className="text-sm font-bold text-[#EDEAE3] hover:text-[#E0995A] transition-colors"
                        >
                          {item.val}
                        </a>
                      ) : (
                        <p className="text-sm font-bold text-[#EDEAE3]">{item.val}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Contact Form */}
              <motion.form
                initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={handleFormSubmit}
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="text" name="bot-field" style={{ display: 'none' }} />
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    name="name"
                    type="text" 
                    required
                    className="w-full bg-[#0B1220] border border-[#2A3348] rounded-xl px-4 py-3 text-sm text-[#EDEAE3] focus:outline-none focus:border-[#E0995A] transition-colors placeholder-[#8B93A6]/50 font-sans" 
                    placeholder="Your Name" 
                  />
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="w-full bg-[#0B1220] border border-[#2A3348] rounded-xl px-4 py-3 text-sm text-[#EDEAE3] focus:outline-none focus:border-[#E0995A] transition-colors placeholder-[#8B93A6]/50 font-sans" 
                    placeholder="Your Email" 
                  />
                </div>
                <input 
                  name="subject"
                  type="text" 
                  required
                  className="w-full bg-[#0B1220] border border-[#2A3348] rounded-xl px-4 py-3 text-sm text-[#EDEAE3] focus:outline-none focus:border-[#E0995A] transition-colors placeholder-[#8B93A6]/50 font-sans" 
                  placeholder="Subject" 
                />
                <textarea 
                  name="message"
                  rows={4} 
                  required
                  className="w-full bg-[#0B1220] border border-[#2A3348] rounded-xl px-4 py-3 text-sm text-[#EDEAE3] focus:outline-none focus:border-[#E0995A] transition-colors placeholder-[#8B93A6]/50 resize-none font-sans" 
                  placeholder="Message"
                ></textarea>
                
                <button 
                  disabled={formStatus === 'sending'}
                  type="submit"
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all accent-glow flex items-center justify-center gap-2 ${
                    formStatus === 'sending' ? 'bg-[#8B93A6] cursor-not-allowed text-[#0B1220]' : 'bg-[#E0995A] hover:bg-[#d68c4d] text-[#0B1220]'
                  }`}
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-3 rounded-lg bg-[#5FB3B3]/10 border border-[#5FB3B3]/30 text-[#5FB3B3] text-xs font-mono text-center"
                    >
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                  {formStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono text-center"
                    >
                      Something went wrong. Please try again or email me directly.
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
