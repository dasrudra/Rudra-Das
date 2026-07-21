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
  ChevronRight, 
  ExternalLink, 
  GraduationCap,
  Briefcase,
  Layers,
  Terminal,
  Monitor,
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
import { services, projects, skills, timeline } from '../constants';

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
  maxTilt = 10, 
  glowColor = "rgba(16, 185, 129, 0.15)", 
  glareIntensity = 0.15 
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
      {/* Dynamic specular glare highlight overlay */}
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

const Home = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const containerRef = useRef(null);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        const result = await response.json();
        console.error('API error:', result);
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    }
  };

  return (
    <div ref={containerRef} className="bg-mesh relative">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent-primary text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Terminal size={14} />
              <span>Available for Enterprise Projects</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-4 text-gradient">
              Rudra <br /> <span className="text-accent-primary">Das</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8 leading-tight tracking-tight">
              Engineering AI & Enterprise Systems at Scale
            </h2>
            
            <p className="text-lg md:text-xl text-white/70 mb-10 font-medium max-w-xl leading-relaxed">
              Architecting high-performance <span className="text-accent-primary">AI-powered enterprise software</span> and intelligent automation pipelines. Specializing in bridging complex machine learning workflows with robust ERP systems to streamline business processes, optimize operations, and deliver scalable web applications that solve real-world problems.
            </p>

            <div className="space-y-8 mb-12">
              <div className="flex flex-wrap gap-4 items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/portfolio" 
                    className="bg-accent-primary hover:opacity-90 text-white px-8 py-5 rounded-2xl font-bold transition-all accent-glow flex items-center gap-3 group text-base"
                  >
                    Explore My Work <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/cv" 
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-5 rounded-2xl font-bold transition-all flex items-center gap-3 group text-base"
                  >
                    Download Resume <Sparkles size={18} className="text-accent-primary" />
                  </Link>
                </motion.div>

                {/* Elegant icon buttons for GitHub, LinkedIn, Kaggle */}
                <div className="flex items-center gap-3 pl-2 sm:pl-4">
                  <motion.a
                    href="https://github.com/dasrudra"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-accent-primary transition-all cursor-pointer shadow-lg"
                    title="GitHub"
                  >
                    <Github size={20} />
                  </motion.a>
                  
                  <motion.a
                    href="https://www.linkedin.com/in/rudra-das-548bb42b2"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-accent-primary transition-all cursor-pointer shadow-lg"
                    title="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </motion.a>

                  <motion.a
                    href="https://kaggle.com/rudradas2000"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/80 hover:text-accent-primary transition-all cursor-pointer shadow-lg"
                    title="Kaggle"
                  >
                    <Trophy size={20} />
                  </motion.a>
                </div>
              </div>

              {/* Subtle Trust Indicators */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-slate border-t border-white/5 pt-6">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                  <span className="font-medium text-white/80">Research Publication</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                  <span className="font-medium text-white/80">SAP Enterprise Experience</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse" />
                  <span className="font-medium text-white/80">Open Source Contributor</span>
                </div>
              </div>

              {/* Preserved Statistics line */}
              <div className="flex flex-wrap gap-8 pt-4 border-t border-white/5">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div className="text-3xl font-bold text-accent-primary">2+</div>
                  <div className="text-[10px] text-muted-slate uppercase font-bold tracking-widest leading-tight">
                    Year <br /> Experience
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="text-3xl font-bold text-accent-primary">9+</div>
                  <div className="text-[10px] text-muted-slate uppercase font-bold tracking-widest leading-tight">
                    Projects <br /> Completed
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-4"
                >
                  <div className="text-3xl font-bold text-accent-primary">1</div>
                  <div className="text-[10px] text-muted-slate uppercase font-bold tracking-widest leading-tight">
                    Research <br /> Publication
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-4"
                >
                  <div className="text-3xl font-bold text-accent-secondary">1</div>
                  <div className="text-[10px] text-muted-slate uppercase font-bold tracking-widest leading-tight">
                    Hackathon <br /> Project
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative z-10 glass-card p-4 rounded-[40px] animate-float max-w-[360px] mx-auto">
              <div className="rounded-[32px] overflow-hidden aspect-[4/5] border border-white/10 bg-white/5">
                <img 
                  src="https://i.postimg.cc/c4VLgDcV/Rudra-Pic-Professional-3.jpg" 
                  alt="Rudra Das" 
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Badges */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.08, y: -4, transition: { duration: 0.2 } }}
                className="absolute -right-8 top-10 glass-card p-2.5 px-4 accent-glow z-20 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="bg-accent-primary/20 p-1.5 rounded-xl">
                    <Sparkles className="text-accent-primary w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] text-muted-slate uppercase font-bold tracking-widest leading-none mb-1">Specialty</p>
                    <p className="text-xs font-extrabold leading-none text-white">AI Engineer</p>
                  </div>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/95 border border-white/10 text-[10px] text-white/90 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
                  Designing intelligent agentic workflows and custom automation systems
                </div>
              </motion.div>

              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.08, y: -4, transition: { duration: 0.2 } }}
                className="absolute -left-12 top-1/2 -translate-y-1/2 glass-card p-2.5 px-4 accent-glow z-20 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="bg-accent-primary/20 p-1.5 rounded-xl">
                    <Brain className="text-accent-primary w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] text-muted-slate uppercase font-bold tracking-widest leading-none mb-1">Core Tech</p>
                    <p className="text-xs font-extrabold leading-none text-white">Machine Learning</p>
                  </div>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/95 border border-white/10 text-[10px] text-white/90 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
                  Implementing predictive modeling, NLP, and computer vision pipelines
                </div>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                whileHover={{ scale: 1.08, y: -4, transition: { duration: 0.2 } }}
                className="absolute -bottom-10 -left-10 glass-card p-2.5 px-4 accent-glow z-20 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="bg-accent-primary/20 p-1.5 rounded-xl">
                    <Layers className="text-accent-primary w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] text-muted-slate uppercase font-bold tracking-widest leading-none mb-1">Architecture</p>
                    <p className="text-xs font-extrabold leading-none text-white">Enterprise ERP</p>
                  </div>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/95 border border-white/10 text-[10px] text-white/90 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
                  Architecting enterprise integrations, SAP ABAP development, and Odoo workflows
                </div>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: 1.08, y: -4, transition: { duration: 0.2 } }}
                className="absolute -bottom-10 right-0 glass-card p-2.5 px-4 accent-glow z-20 cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="bg-accent-primary/20 p-1.5 rounded-xl">
                    <Code2 className="text-accent-primary w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] text-muted-slate uppercase font-bold tracking-widest leading-none mb-1">Development</p>
                    <p className="text-xs font-extrabold leading-none text-white">Full-Stack Apps</p>
                  </div>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/95 border border-white/10 text-[10px] text-white/90 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
                  Building high-performance, secure, and responsive web platforms
                </div>
              </motion.div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-accent-primary/20 blur-[100px] -z-10 rounded-full scale-75" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative">
        <div className="section-padding max-w-7xl mx-auto space-y-16">
          
          {/* Upper portion: Heading and Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 max-w-5xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} />
              <span>The Visionary Approach</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white tracking-tight">
              Turning Complex Business Challenges into <span className="text-gradient">Intelligent Software Solutions</span>
            </h2>
            <div className="space-y-6 text-muted-slate text-lg leading-relaxed max-w-4xl">
              <p>
                I specialize in solving high-impact operational inefficiencies by designing intelligent, data-driven systems. By targeting systemic bottlenecks, I build software that automates repetitive workflows, minimizes operational overhead, and empowers organizational leadership with real-time actionable insights.
              </p>
              <p>
                My professional experience lies at the intersection of advanced artificial intelligence frameworks, custom Odoo & SAP ERP solutions, and scalable full-stack web platforms. From customizing SAP Production Planning systems to deploying database-backed computational ledger applications, I engineer systems with enterprise-grade durability.
              </p>
              <p>
                Driven by a deep passion for technological innovation, I actively engage in machine learning research and open-source contributions. I am committed to continuous learning, validating theoretical breakthroughs in public benchmarks, and translating complex logic into production-ready software solutions.
              </p>
            </div>
          </motion.div>

          {/* Lower portion: Grid of Capability Cards & Technical Profile */}
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Capabilities and academic background */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="grid gap-4">
                {[
                  { label: 'Enterprise Experience', val: 'ERP Customization & Automation', sub: 'Designing ABAP reports, customizing Odoo.sh workflows, and optimizing industrial business processes.', icon: <Building2 size={18} /> },
                  { label: 'AI & Research', val: 'Predictive Models & Intelligent Workflows', sub: 'Published researcher in data modeling, speech emotion classifiers, and Kaggle benchmark design.', icon: <Brain size={18} /> },
                  { label: 'Software Engineering', val: 'High-Performance Full-Stack Systems', sub: 'Architecting secure web apps and robust APIs using React, TypeScript, Python, and SQL databases.', icon: <Code2 size={18} /> },
                ].map((item, i) => (
                  <TiltContainer
                    key={i}
                    maxTilt={6}
                    glowColor="rgba(16, 185, 129, 0.15)"
                    glareIntensity={0.12}
                    className="glass-card p-5 flex items-start gap-5 rounded-2xl overflow-hidden cursor-default"
                  >
                    <div className="p-3 rounded-xl bg-accent-primary/10 text-accent-primary shrink-0 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-accent-primary mb-1">{item.label}</p>
                      <p className="text-base font-bold text-white mb-1 leading-tight">{item.val}</p>
                      <p className="text-xs text-muted-slate leading-relaxed">{item.sub}</p>
                    </div>
                  </TiltContainer>
                ))}
              </div>

              {/* Smaller Academic Summary */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-muted-slate">
                <GraduationCap size={16} className="text-accent-primary shrink-0" />
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-muted-slate/60">Academic Foundation</p>
                  <p className="text-white font-medium">BSc in Computer Science and Engineering</p>
                  <p className="text-[11px] text-muted-slate/80">East Delta University, Class of 2024 · CGPA 3.41 / 4.00</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Technical Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <TiltContainer
                maxTilt={6}
                glowColor="rgba(16, 185, 129, 0.2)"
                glareIntensity={0.18}
                className="glass-card p-10 space-y-12 rounded-[32px] overflow-hidden"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-accent-primary flex items-center justify-center text-white accent-glow">
                    <Terminal size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Technical Profile</h3>
                    <p className="text-muted-slate">Expertise & Background</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {[
                    { title: 'Artificial Intelligence', desc: 'Machine Learning, NLP, LLM Applications, Computer Vision, RAG Systems', icon: <Brain size={20} /> },
                    { title: 'Enterprise Technologies', desc: 'SAP ABAP, Odoo ERP, SAP BTP Generative AI, Process Automation', icon: <Building2 size={20} /> },
                    { title: 'Backend & APIs', desc: 'Python, FastAPI, Flask, SQL Databases, REST API Integration', icon: <Cpu size={20} /> },
                    { title: 'Frontend & Cloud', desc: 'React.js, TypeScript, Tailwind CSS, Git, GitHub Ecosystem', icon: <Globe size={20} /> },
                  ].map((point, i) => (
                    <div key={i} className="flex gap-6 items-start group/item">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-primary shrink-0 group-hover/item:border-accent-primary/40 group-hover/item:bg-accent-primary/5 transition-all">
                        {point.icon}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1 text-white group-hover/item:text-accent-primary transition-colors">{point.title}</h4>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {point.desc.split(', ').map((tech) => (
                            <span key={tech} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-muted-slate font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TiltContainer>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="services" className="bg-navy-900/30">
        <div className="section-padding max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent-primary text-xs font-bold uppercase tracking-[0.4em] mb-4 block"
            >
              Capabilities
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white tracking-tight"
            >
              Professional Capability & Technical Spectrum
            </motion.h2>
          </div>

          {/* Section 1: Four Capability Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Artificial Intelligence",
                icon: <Brain size={24} className="text-accent-primary" />,
                focus: "Designing intelligent agentic workflows, LLM applications, NLP pipelines, and advanced RAG architectures to automate reasoning and complex decision-making.",
                highlights: ["Agentic Workflows", "RAG & LLM Apps", "Predictive Modeling", "Dataset Curation"]
              },
              {
                title: "Enterprise Systems",
                icon: <Building2 size={24} className="text-accent-primary" />,
                focus: "Customizing robust Odoo ERP environments, designing SAP ABAP business logic, automating workflows, and building stable industrial data bridges.",
                highlights: ["Odoo.sh & Workflows", "SAP PP & ABAP Development", "Process Automation", "System Integrations"]
              },
              {
                title: "Full-Stack Engineering",
                icon: <Code2 size={24} className="text-accent-primary" />,
                focus: "Developing highly performant, type-safe frontends paired with resilient, clean backends and secure REST APIs designed to solve concrete business problems.",
                highlights: ["React.js & TypeScript", "Python (FastAPI & Flask)", "Tailwind CSS Layouts", "Secure REST APIs"]
              },
              {
                title: "Data Engineering",
                icon: <Database size={24} className="text-accent-primary" />,
                focus: "Structuring relational database schemas, orchestrating secure ETL data pipelines, conducting error analysis, and curating benchmarking datasets.",
                highlights: ["Relational Schemas", "ETL Pipelines", "Data Modeling & Viz", "Benchmark Design"]
              }
            ].map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <TiltContainer
                  maxTilt={8}
                  glowColor="rgba(16, 185, 129, 0.15)"
                  glareIntensity={0.15}
                  className="glass-card p-6 flex flex-col justify-between h-full rounded-[24px] overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center text-accent-primary shrink-0">
                      {cap.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white">{cap.title}</h3>
                    <p className="text-xs text-muted-slate leading-relaxed">{cap.focus}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-white/5">
                    {cap.highlights.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-medium text-muted-slate">
                        {tag}
                      </span>
                    ))}
                  </div>
                </TiltContainer>
              </motion.div>
            ))}
          </div>

          {/* Section 2: Four Proficiency Level Categories */}
          <div>
            <div className="text-left mb-8">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles size={16} className="text-accent-primary" />
                Engineering Proficiency & Technologies
              </h3>
              <p className="text-xs text-muted-slate">Structured classification of expertise and operational proficiency.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  level: "Core Expertise",
                  desc: "Primary technologies and architectures leveraged daily for core professional engineering deliverables.",
                  color: "rgba(16, 185, 129, 0.2)",
                  skills: ["Python", "Machine Learning", "SAP ABAP", "Odoo ERP", "React.js", "TypeScript", "SQL Databases", "Data Analysis", "FastAPI"]
                },
                {
                  level: "Strong Experience",
                  desc: "Robust frameworks, APIs, and design methodologies integrated regularly into production-ready platforms.",
                  color: "rgba(59, 130, 246, 0.15)",
                  skills: ["Flask", "RAG Systems", "NLP / LLMs", "REST APIs", "Git & GitHub", "Tailwind CSS", "Process Automation", "Dataset Curation", "Error Analysis"]
                },
                {
                  level: "Working Knowledge",
                  desc: "Functional toolsets, libraries, and automation utilities applied in supporting roles and testing.",
                  color: "rgba(245, 158, 11, 0.15)",
                  skills: ["Deep Learning", "TensorFlow", "Pandas & NumPy", "Pytest", "Web Scraping", "n8n", "LangChain", "Chrome Extension APIs"]
                },
                {
                  level: "Currently Exploring",
                  desc: "Cutting-edge paradigms, cognitive agents, and automation frameworks actively researched.",
                  color: "rgba(168, 85, 247, 0.15)",
                  skills: ["Agentic AI", "Multi-Agent Systems", "Model Context Protocol (MCP)", "AI Automation", "SAP Joule", "SAP BTP Generative AI"]
                }
              ].map((level, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TiltContainer
                    maxTilt={6}
                    glowColor={level.color}
                    glareIntensity={0.12}
                    className="glass-card p-6 flex flex-col h-full rounded-[20px] overflow-hidden"
                  >
                    <div className="mb-4">
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                        {level.level}
                      </h4>
                      <p className="text-[11px] text-muted-slate mt-1 leading-relaxed">{level.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
                      {level.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-white/80 hover:border-accent-primary/30 hover:text-white transition-all cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </TiltContainer>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 3: Dual Column - Currently Exploring & Professional Development */}
          <div className="grid md:grid-cols-2 gap-8 pt-4">
            {/* Column 1: Currently Exploring Highlight */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <TiltContainer
                maxTilt={4}
                glowColor="rgba(168, 85, 247, 0.15)"
                glareIntensity={0.1}
                className="glass-card p-8 rounded-[28px] overflow-hidden h-full space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Currently Exploring</h3>
                    <p className="text-xs text-muted-slate">Next-generation cognitive & automation technology stack</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { tech: "Agentic AI & Multi-Agent Systems", desc: "Orchestrating autonomous networks of specialized, goal-oriented LLM agents to resolve multi-step reasoning workflows." },
                    { tech: "Model Context Protocol (MCP)", desc: "Integrating secure API specifications and schema layers to safely connect models with real-world server context." },
                    { tech: "SAP Joule & AI Automation", desc: "Pioneering context-aware enterprise digital assistants that translate business process execution into intelligent system actions." }
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/20 transition-all group">
                      <h4 className="text-xs font-bold text-purple-300 group-hover:text-purple-200 transition-colors">{item.tech}</h4>
                      <p className="text-[11px] text-muted-slate mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </TiltContainer>
            </motion.div>

            {/* Column 2: Professional Development */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <TiltContainer
                maxTilt={4}
                glowColor="rgba(16, 185, 129, 0.15)"
                glareIntensity={0.1}
                className="glass-card p-8 rounded-[28px] overflow-hidden h-full space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-primary/10 text-accent-primary flex items-center justify-center">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Professional Development</h3>
                    <p className="text-xs text-muted-slate">Continuous educational programs & target specializations</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { organization: "SAP Learning", subject: "ABAP Cloud, SAP BTP Extension Suites & SAP PP Optimization" },
                    { organization: "DeepLearning.AI", subject: "AI Agentic Workflows, LLM Operations (LLMOps) & Fine-Tuning" },
                    { organization: "Coursera & Kaggle", subject: "Advanced Machine Learning Algorithms & High-Performance Data pipelines" },
                    { organization: "Google & Microsoft", subject: "Cloud Engineering, DevOps Architectures & Cognitive Services API" }
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-accent-primary/20 transition-all group flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-1.5 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-accent-primary transition-colors">{item.organization}</h4>
                        <p className="text-[11px] text-muted-slate mt-0.5 leading-relaxed">{item.subject}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TiltContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Marquee */}
      <section className="py-10 border-y border-white/5 bg-navy-950/50 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 items-center px-10"
          >
            {['SAP ABAP', 'Python', 'Odoo ERP', 'Flask', 'SQL', 'SQLite', 'React', 'Tailwind CSS', 'Machine Learning', 'Data Analysis'].map((tech) => (
              <span key={tech} className="text-2xl font-bold font-display text-white/20 hover:text-accent-primary transition-colors cursor-default uppercase tracking-tighter">
                {tech}
              </span>
            ))}
          </motion.div>
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-20 items-center px-10"
          >
            {['SAP ABAP', 'Python', 'Odoo ERP', 'Flask', 'SQL', 'SQLite', 'React', 'Tailwind CSS', 'Machine Learning', 'Data Analysis'].map((tech) => (
              <span key={tech} className="text-2xl font-bold font-display text-white/20 hover:text-accent-primary transition-colors cursor-default uppercase tracking-tighter">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Preview */}
      <section id="projects" className="bg-navy-900/30">
        <div className="section-padding">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-20 mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">Projects</h2>
            <p className="text-muted-slate text-lg leading-relaxed">A selection of enterprise and software projects demonstrating technical depth and problem-solving.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-10">
            {projects.slice(0, 4).map((project, i) => {
              const projectColor = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'][i % 4];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <TiltContainer
                    maxTilt={10}
                    glowColor={`${projectColor}20`}
                    glareIntensity={0.2}
                    className="glass-card p-6 rounded-[36px] overflow-hidden h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden mb-6 border border-white/5 bg-navy-950/80">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                          {project.link && (
                            <a 
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-xl bg-accent-primary text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all accent-glow z-30"
                            >
                              <ExternalLink size={20} />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.slice(0, 3).map(t => (
                            <span key={t} className="text-[9px] font-bold uppercase tracking-widest text-accent-primary bg-accent-primary/10 px-2.5 py-1 rounded-full">
                              {t}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-2xl font-bold group-hover:text-accent-primary transition-colors flex items-center gap-2">
                          {project.title}
                          <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </h3>
                        <p className="text-muted-slate text-sm leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest font-mono">
                        PREVIEW MODULE
                      </span>
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold text-accent-primary hover:underline flex items-center gap-1 z-30 relative"
                        >
                          Codebase
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </TiltContainer>
                </motion.div>
              );
            })}
          </div>
          
          <div className="mt-20 text-center">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-3 text-accent-primary font-bold uppercase tracking-widest hover:gap-5 transition-all"
            >
              View All Projects <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>


      {/* Experience Section */}
      <section id="experience" className="bg-navy-900/30 overflow-hidden">
        <div className="section-padding max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Left Column: Info & Publication */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-accent-primary text-xs font-bold uppercase tracking-[0.4em] block"
                >
                  Career Path
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold text-white leading-tight"
                >
                  Professional Experience <br /> & Research
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-muted-slate text-base leading-relaxed max-w-md"
                >
                  My engineering journey is defined by bridging complex enterprise resource systems with cutting-edge artificial intelligence, solving hard bottlenecks and delivering measurable business impact.
                </motion.p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3 text-white font-bold text-xl">
                  <BookOpen className="text-accent-primary" size={24} />
                  <h3>Academic & Lab Highlights</h3>
                </div>

                {/* Research Highlight Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <TiltContainer
                    maxTilt={6}
                    glowColor="rgba(16, 185, 129, 0.2)"
                    glareIntensity={0.15}
                    className="glass-card p-6 border-l-4 border-l-accent-primary rounded-r-2xl overflow-hidden cursor-default space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 rounded bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[10px] font-bold font-mono">
                        Published 2024
                      </span>
                      <span className="text-white/40 text-[10px] font-mono">IEEE Xplore</span>
                    </div>
                    
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-muted-slate/60 mb-1">Research Highlights</p>
                      <h4 className="text-lg font-bold text-white group-hover:text-accent-primary transition-colors leading-tight">
                        Unveiling Predictive Factors in Apple Quality
                      </h4>
                    </div>

                    <div className="space-y-1 text-xs text-muted-slate">
                      <p><span className="font-semibold text-white/80">Conference:</span> 6th International Conference on Electrical Engineering and Information Communication Technology (ICEE-ICT)</p>
                      <p><span className="font-semibold text-white/80">Domain:</span> Machine Learning & Predictive Analytics</p>
                    </div>

                    <a 
                      href="https://ieeexplore.ieee.org/document/10534426?fbclid=IwZXh0bgNhZW0CMTAAAR1lt3eMmyzSVR3y0ghub0XjKbsXFH1wRFXiGlf3FSmI9NujTAS6lmYp3is_aem_ZmFrZWR1bW15MTZieXRlcw" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent-primary text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all z-30 relative pt-2"
                    >
                      View Publication <ExternalLink size={14} />
                    </a>
                  </TiltContainer>
                </motion.div>

                {/* Hackathon Case Study */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="group"
                >
                  <TiltContainer
                    maxTilt={6}
                    glowColor="rgba(59, 130, 246, 0.2)"
                    glareIntensity={0.15}
                    className="glass-card p-6 border-l-4 border-l-accent-secondary rounded-r-2xl overflow-hidden cursor-default space-y-4"
                  >
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 rounded bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-[10px] font-bold font-mono">
                        Hackathon 2025
                      </span>
                      <span className="text-white/40 text-[10px] font-mono">Completed Outcome</span>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-muted-slate/60 mb-1">Case Study Preview</p>
                      <h4 className="text-lg font-bold text-white group-hover:text-accent-secondary transition-colors leading-tight">
                        DistractCheck: Selective Attention in LLMs
                      </h4>
                    </div>

                    <div className="space-y-2 text-xs">
                      <p className="text-muted-slate leading-relaxed">
                        <span className="font-semibold text-white/80">Problem:</span> Standard LLMs suffer severe recall degradation when key context is surrounded by distracting, irrelevant information.
                      </p>
                      <p className="text-muted-slate leading-relaxed">
                        <span className="font-semibold text-white/80">Outcome:</span> Built an automated evaluation harness to measure distraction curves and selective retrieval indexes of models.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {["LLM Benchmarks", "Python", "LangChain", "Groq API"].map(t => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] text-muted-slate font-mono">
                          {t}
                        </span>
                      ))}
                    </div>

                    <a 
                      href="https://github.com/dasrudra/DistractCheck-Measuring-Selective-Attention-in-Language-Models" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent-secondary text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all z-30 relative pt-2"
                    >
                      View Repository <ExternalLink size={14} />
                    </a>
                  </TiltContainer>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Timeline */}
            <div className="lg:col-span-7 relative">
              {/* Vertical Line with Gradient */}
              <div className="absolute left-0 lg:left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-accent-primary/50 via-accent-secondary/30 to-white/5" />

              <div className="space-y-12 lg:pl-20">
                {[
                  {
                    title: "Assistant Engineer - Functional Applications (EAS)",
                    company: "Tekvision (BD) Ltd. (Subsidiary of Youngone Holdings)",
                    location: "Korean EPZ, Karnaphuli, Chattogram",
                    date: "December 2025 - Present",
                    mission: "Designing and integrating custom business logic and automated subsystems to optimize massive manufacturing operations.",
                    bullets: [
                      "Engineered high-performance SAP ABAP custom reports and programmatic enhancements, substantially reducing routine ledger compilation times.",
                      "Formulated tiered enterprise costing models and deployment sheets for system upgrades, custom trainings, and post-go-live technical services.",
                      "Directed the functional requirement analysis and structured vendor coordination as a core contributor for the APDL Odoo ERP implementation.",
                      "Spearheaded technical integrations including full-stack data adapters and real-time computer vision subsystems on manufacturing floors."
                    ],
                    technologies: ["SAP PP", "ABAP", "Odoo ERP", "Odoo.sh", "FastAPI", "React.js", "Python", "SQL Databases"],
                    impact: "Automated key manufacturing reporting cycles and accelerated UAT validation across subsidiary plants, eliminating production verification bottlenecks."
                  },
                  {
                    title: "Open Source Contributor",
                    company: "FreeAppStore, New Zealand",
                    location: "Remote",
                    date: "June 2026 – Present",
                    mission: "Designing accessible and free-forever digital utilities to democratize technical tooling globally.",
                    bullets: [
                      "Architected type-safe UI components and robust application state schemas, significantly enhancing responsive performance and cross-device scaling.",
                      "Configured progressive web app (PWA) asset caching, ensuring seamless functionality and zero-latency loading under poor network conditions.",
                      "Orchestrated public Git workflows and structured automated validation test cases to streamline global developer contributions."
                    ],
                    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Git / GitHub", "PWA APIs", "Vite"],
                    impact: "Delivered functional utilities to thousands of global users, achieving a 35% reduction in application package sizes and load latencies."
                  },
                  {
                    title: "Officer - IT, MIS",
                    company: "Padma Plastics Ltd. (Padma Group Of Converters)",
                    location: "Dhaka, Bangladesh",
                    date: "May 2024 - November 2025",
                    mission: "Guarding corporate information consistency and maintaining uninterrupted IT systems continuity for high-volume manufacturing lines.",
                    bullets: [
                      "Audited daily SAP transaction databases and ledger entries, detecting and eliminating operational balance sheet mismatches.",
                      "Enforced continuous system backup schedules and server disaster recovery procedures, securing business-critical assets.",
                      "Pioneered customized Excel MIS tracking models and departmental KPI aggregators to streamline administrative decision cycles."
                    ],
                    technologies: ["SAP Operations", "MIS Analytics", "Database Auditing", "Backup Systems", "VBA & Apps Script"],
                    impact: "Maintained zero unscheduled data synchronization downtime and expedited leadership performance reviews through automated reporting."
                  }
                ].map((job, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="relative group"
                  >
                    {/* Glowing Dot on Line */}
                    <div className="absolute -left-[84px] top-9 w-4 h-4 rounded-full bg-navy-950 border-2 border-accent-primary shadow-[0_0_12px_rgba(16,185,129,0.8)] z-10 hidden lg:block transition-transform duration-300 group-hover:scale-125" />
                    
                    <TiltContainer
                      maxTilt={4}
                      glowColor="rgba(16, 185, 129, 0.12)"
                      glareIntensity={0.08}
                      className="glass-card p-6 md:p-8 hover:border-accent-primary/20 rounded-[28px] overflow-hidden cursor-default space-y-6"
                    >
                      {/* Job Header */}
                      <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-accent-primary transition-colors leading-tight">
                            {job.title}
                          </h3>
                          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-slate text-[10px] font-mono flex items-center gap-1.5 self-start md:self-center">
                            <Calendar size={12} className="text-accent-primary" />
                            {job.date}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-slate">
                          <span className="flex items-center gap-1.5">
                            <Building2 size={14} className="text-accent-primary" />
                            {job.company}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-accent-primary" />
                            {job.location}
                          </span>
                        </div>
                      </div>

                      {/* Business Mission */}
                      <div className="p-3.5 rounded-xl bg-accent-primary/[0.02] border-l-2 border-accent-primary/40 text-xs text-white/90 leading-relaxed italic">
                        <span className="font-bold text-accent-primary not-italic block text-[10px] uppercase tracking-wider mb-0.5">Role Mission</span>
                        "{job.mission}"
                      </div>

                      {/* Achievement Bullets */}
                      <div className="space-y-3">
                        <p className="text-[10px] font-bold text-muted-slate uppercase tracking-wider">Key Contributions</p>
                        <ul className="space-y-3">
                          {job.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex gap-3 text-muted-slate text-xs leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent-primary/70 shrink-0 mt-1.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies Used */}
                      <div className="space-y-2 pt-2">
                        <p className="text-[10px] font-bold text-muted-slate uppercase tracking-wider">Technologies Used</p>
                        <div className="flex flex-wrap gap-1.5">
                          {job.technologies.map(tech => (
                            <span key={tech} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-white/80 font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Business Impact Box */}
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-accent-primary uppercase tracking-wider">
                          <Award size={14} />
                          <span>Business Impact</span>
                        </div>
                        <p className="text-xs text-muted-slate leading-relaxed">
                          {job.impact}
                        </p>
                      </div>

                    </TiltContainer>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative">
        <div className="section-padding">
          <TiltContainer
            maxTilt={3}
            glowColor="rgba(16, 185, 129, 0.12)"
            glareIntensity={0.08}
            className="glass-card p-12 md:p-20 relative overflow-hidden rounded-[40px]"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] -z-10" />
            
            <div className="grid lg:grid-cols-2 gap-20">
              <div className="space-y-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="max-w-3xl mb-20 text-left"
                >
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">Get In Touch</h2>
                  <p className="text-muted-slate text-lg leading-relaxed">Let's discuss how we can optimize your enterprise solutions together.</p>
                </motion.div>
                <div className="space-y-8">
                  {[
                    { icon: <Mail />, label: 'Email', val: 'dasrudra738@gmail.com', href: 'mailto:dasrudra738@gmail.com' },
                    { icon: <MapPin />, label: 'Location', val: 'Boxir-bit, Terribazar, Chattogram' },
                    { icon: <Phone />, label: 'Phone', val: '+880-1796726405', href: 'tel:+8801796726405' },
                    { icon: <Linkedin />, label: 'LinkedIn', val: 'linkedin.com/in/rudra-das-548bb42b2', href: 'https://www.linkedin.com/in/rudra-das-548bb42b2' },
                    { icon: <Github />, label: 'GitHub', val: 'github.com/dasrudra', href: 'https://github.com/dasrudra' },
                    { icon: <Database />, label: 'Kaggle', val: 'kaggle.com/rudradas2000', href: 'https://www.kaggle.com/rudradas2000' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all duration-500">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-slate mb-1">{item.label}</p>
                        {item.href ? (
                          <a 
                            href={item.href} 
                            target={item.label !== 'Email' && item.label !== 'Phone' ? "_blank" : undefined}
                            rel={item.label !== 'Email' && item.label !== 'Phone' ? "noopener noreferrer" : undefined}
                            className="text-xl font-bold hover:text-accent-primary transition-colors"
                          >
                            {item.val}
                          </a>
                        ) : (
                          <p className="text-xl font-bold">{item.val}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.form
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 lg:mt-64"
                onSubmit={handleFormSubmit}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Honeypot field for spam protection */}
                  <input type="text" name="_gotcha" style={{ display: 'none' }} />
                  <input 
                    name="name"
                    type="text" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-primary transition-all placeholder:text-muted-slate/50" 
                    placeholder="Your Name" 
                  />
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-primary transition-all placeholder:text-muted-slate/50" 
                    placeholder="Your Email" 
                  />
                </div>
                <input 
                  name="subject"
                  type="text" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-primary transition-all placeholder:text-muted-slate/50" 
                  placeholder="Subject" 
                />
                <textarea 
                  name="message"
                  rows={5} 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent-primary transition-all placeholder:text-muted-slate/50 resize-none" 
                  placeholder="Message"
                ></textarea>
                
                <div className="flex flex-col gap-4">
                  <motion.button 
                    disabled={formStatus === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest transition-all accent-glow flex items-center justify-center gap-3 ${
                      formStatus === 'sending' ? 'bg-muted-slate cursor-not-allowed' : 'bg-accent-primary hover:opacity-90 text-white'
                    }`}
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </motion.button>

                  <AnimatePresence>
                    {formStatus === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium text-center"
                      >
                        Message sent successfully! I'll get back to you soon.
                      </motion.div>
                    )}
                    {formStatus === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center"
                      >
                        Something went wrong. Please try again or email me directly.
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.form>
            </div>
          </TiltContainer>
        </div>
      </section>
    </div>
  );
};

export default Home;
