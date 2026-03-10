import { useState, useRef, FormEvent } from 'react';
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
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { services, projects, skills, timeline } from '../constants';

const SectionHeading = ({ title, subtitle, align = 'center' }: { title: string; subtitle: string; align?: 'left' | 'center' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`max-w-3xl mb-20 ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
  >
    <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">{title}</h2>
    <p className="text-muted-slate text-lg leading-relaxed">{subtitle}</p>
  </motion.div>
);

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
      const response = await fetch('https://formspree.io/f/dasrudra738@gmail.com', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        const result = await response.json();
        console.error('Formspree error:', result);
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
            
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 text-gradient">
              Rudra <br /> <span className="text-accent-primary">Das</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-10 font-medium max-w-xl leading-relaxed">
              Python <span className="text-accent-primary">Web Developer</span>. 
              Crafting robust enterprise solutions with technical precision and modern digital presence.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to="/portfolio" 
                    className="bg-accent-primary hover:opacity-90 text-white px-8 py-5 rounded-2xl font-bold transition-all accent-glow flex items-center gap-3 group"
                  >
                    View Portfolio <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href="/Rudra_Das_CV.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Rudra_Das_CV.pdf"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-5 rounded-2xl font-bold transition-all flex items-center gap-3 group"
                  >
                    Download CV <Sparkles size={18} className="text-accent-primary" />
                  </a>
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-8 mt-4 md:mt-0">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div className="text-3xl font-bold text-accent-primary">1+</div>
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
                  <div className="text-3xl font-bold text-accent-primary">5+</div>
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
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative z-10 glass-card p-4 rounded-[40px] animate-float">
              <div className="rounded-[32px] overflow-hidden aspect-square border border-white/10">
                <img 
                  src="https://i.postimg.cc/Wz7cZY4n/IMG-4171.jpg" 
                  alt="Rudra Das" 
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating Badges */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -right-8 top-10 glass-card p-5 accent-glow z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-accent-primary/20 p-2 rounded-xl">
                    <Code2 className="text-accent-primary w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-slate uppercase font-bold tracking-widest">Expertise</p>
                    <p className="text-lg font-bold">SAP ABAP</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="absolute -left-12 top-1/2 glass-card p-5 accent-glow z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-accent-primary/20 p-2 rounded-xl">
                    <Briefcase className="text-accent-primary w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-slate uppercase font-bold tracking-widest">Role</p>
                    <p className="text-lg font-bold">ERP Specialist</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="absolute -bottom-10 -left-10 glass-card p-5 accent-glow z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-accent-primary/20 p-2 rounded-xl">
                    <Globe className="text-accent-primary w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-slate uppercase font-bold tracking-widest">Web</p>
                    <p className="text-lg font-bold">Python Dev</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="absolute -bottom-20 right-0 glass-card p-5 accent-glow z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-accent-primary/20 p-2 rounded-xl">
                    <Layers className="text-accent-primary w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-slate uppercase font-bold tracking-widest">Systems</p>
                    <p className="text-lg font-bold">Odoo ERP</p>
                  </div>
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
        <div className="section-padding grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} />
              <span>The Visionary Approach</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Bridging Complexity <br /> with <span className="text-gradient">Efficiency</span>
            </h2>
            <div className="space-y-6 text-muted-slate text-lg leading-relaxed">
              <p>
                I specialize in developing high-performance web applications and enterprise solutions that transform how businesses operate. 
                My goal is to make complexity seamless and data-driven through modern technical innovation.
              </p>
              <p>
                With a background in Computer Science and hands-on experience in industrial IT and MIS roles, 
                I bring a holistic understanding of how software serves business goals.
              </p>
            </div>
            
            <div className="grid gap-4">
              {[
                { label: 'Bachelor of Science (CSE)', val: 'East Delta University', sub: '2024 | CGPA: 3.41', icon: <GraduationCap size={16} /> },
                { label: 'HSC (Science)', val: 'Govt. Haji Muhammad Mohsin College', sub: '2019 | CGPA: 4.25', icon: <Briefcase size={16} /> },
                { label: 'SSC (Science)', val: 'Chattogram Collegiate School', sub: '2017 | CGPA: 5.00', icon: <Monitor size={16} /> },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  className="glass-card p-5 flex items-center gap-5"
                >
                  <div className="p-3 rounded-xl bg-accent-primary/10 text-accent-primary shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-slate mb-1">{item.label}</p>
                    <p className="text-base font-bold text-white">{item.val}</p>
                    <p className="text-xs text-muted-slate">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-10 space-y-12">
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
                  { title: 'Technical Expertise', desc: 'Python, ML, ABAP, MySQL, SQLite, ERP, Odoo.sh, SAP BTP Generative AI, Natural Language Processing (NLP), Pandas, NumPy, TensorFlow, Scikit-Learn, Flask, FastAPI, GitHub, Git, Data Science, Data Analysis, Machine Learning, Image Processing', icon: <Cpu size={20} /> },
                  { title: 'Research Background', desc: 'Published researcher in predictive data modeling.', icon: <Globe size={20} /> },
                  { title: 'Problem Solving', desc: 'Analytical mindset focused on organizational efficiency.', icon: <Layers size={20} /> },
                  { title: 'Location', desc: 'Chattogram, Bangladesh', icon: <MapPin size={20} /> },
                ].map((point, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-primary shrink-0">
                      {point.icon}
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">{point.title}</h4>
                      <p className="text-sm text-muted-slate leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="services" className="bg-navy-900/30">
        <div className="section-padding">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent-primary text-xs font-bold uppercase tracking-[0.4em] mb-4 block"
            >
              Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white"
            >
              Technical Skills & Professional Tools
            </motion.h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {[
              { title: 'Programming', tags: ['Python', 'ABAP', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'SQLite'] },
              { title: 'Data & ML', tags: ['ERP', 'Odoo.sh', 'SAP BTP Generative AI', 'Natural Language Processing (NLP)', 'Pandas', 'NumPy', 'TensorFlow', 'Scikit-Learn', 'Data Science', 'Data Analysis', 'Machine Learning', 'Image Processing'] },
              { title: 'Tools', tags: ['Flask', 'FastAPI', 'GitHub', 'Git', 'MS Office Suite', 'VS Code', 'PyCharm', 'Windows OS'] },
            ].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(0,255,163,0.8)]" />
                  <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-medium text-muted-slate hover:border-accent-primary/30 hover:text-white transition-all">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl mx-auto">
            {[
              { name: 'Python Development', level: 90 },
              { name: 'SQL & Databases', level: 85 },
              { name: 'Data Analysis', level: 85 },
              { name: 'ERP (ABAP)', level: 75 },
              { name: 'Machine Learning', level: 80 },
              { name: 'Web Development (HTML/CSS)', level: 90 },
            ].map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-bold text-white group-hover:text-accent-primary transition-colors">{skill.name}</span>
                  <span className="text-xs text-accent-primary font-bold">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-accent-primary accent-glow rounded-full"
                  />
                </div>
              </motion.div>
            ))}
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
          <SectionHeading 
            title="Projects" 
            subtitle="A selection of enterprise and software projects demonstrating technical depth and problem-solving."
          />
          <div className="grid md:grid-cols-2 gap-10">
            {projects.slice(0, 4).map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden mb-8 border border-white/5">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-navy-950/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                    <div className="flex gap-4">
                      {project.link && (
                        <motion.a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-14 h-14 rounded-2xl bg-accent-primary text-white flex items-center justify-center accent-glow"
                        >
                          <ExternalLink size={24} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 px-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-accent-primary bg-accent-primary/10 px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-accent-primary transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-slate text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-3 text-accent-primary font-bold uppercase tracking-widest hover:gap-5 transition-all"
            >
              View Full Portfolio <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>


      {/* Experience Section */}
      <section id="experience" className="bg-navy-900/30 overflow-hidden">
        <div className="section-padding">
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
                  className="text-muted-slate text-lg leading-relaxed max-w-md"
                >
                  My professional journey has been focused on bridging the gap between complex data systems and practical business applications.
                </motion.p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3 text-white font-bold text-xl">
                  <BookOpen className="text-accent-primary" size={24} />
                  <h3>Key Publication</h3>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 border-l-4 border-l-accent-primary/50 relative group"
                >
                  <span className="text-accent-primary text-[10px] font-bold uppercase tracking-widest block mb-3">March 2024</span>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-accent-primary transition-colors">
                    Unveiling Predictive Factors in Apple Quality
                  </h4>
                  <p className="text-muted-slate text-sm leading-relaxed mb-6">
                    2024 6th International Conference on Electrical Engineering and Information Communication Technology (ICEE-ICT)
                  </p>
                  <a 
                    href="https://ieeexplore.ieee.org/document/10534426?fbclid=IwZXh0bgNhZW0CMTAAAR1lt3eMmyzSVR3y0ghub0XjKbsXFH1wRFXiGlf3FSmI9NujTAS6lmYp3is_aem_ZmFrZWR1bW15MTZieXRlcw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent-primary text-xs font-bold uppercase tracking-widest hover:gap-3 transition-all"
                  >
                    View Publication <ExternalLink size={14} />
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Timeline */}
            <div className="lg:col-span-7 relative">
              {/* Vertical Line */}
              <div className="absolute left-0 lg:left-8 top-0 bottom-0 w-px bg-white/5" />

              <div className="space-y-12 lg:pl-20">
                {[
                  {
                    title: "Assistant Engineer - Functional Applications (EAS)",
                    company: "Tekvision (BD) Ltd. (Subsidiary of Youngone Holdings)",
                    location: "Plot # 25, Block-A, Korean EPZ, Karnaphuli, Chattogram 4376",
                    date: "December 2025 - Present",
                    bullets: [
                      "Serving as an ERP Developer within the Functional Applications Team, focused on designing and optimizing custom ABAP programs.",
                      "Providing dedicated technical and functional support to SAP Production Planning (PP) module end-users.",
                      "Collaborating with cross-functional teams to translate business requirements into technical specifications."
                    ]
                  },
                  {
                    title: "Officer - IT, MIS",
                    company: "Padma Plastics Ltd. (Padma Group Of Converters)",
                    location: "Dhaka, Bangladesh",
                    date: "January 2025 - November 2025",
                    bullets: [
                      "Managed IT operations including data entry monitoring in SAP and data accuracy checking.",
                      "Performed IT audits, system backup & recovery, and hardware/software maintenance.",
                      "Maintained IT asset registers and handled warranty/replacement procedures.",
                      "Supported departmental KPI evaluation and facilitated communication with management."
                    ]
                  }
                ].map((job, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="relative"
                  >
                    {/* Dot */}
                    <div className="absolute -left-[81px] top-8 w-3 h-3 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(0,255,163,0.8)] z-10 hidden lg:block" />
                    
                    <div className="glass-card p-8 md:p-10 hover:border-accent-primary/30 transition-all duration-500">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-2xl font-bold text-white max-w-md">{job.title}</h3>
                        <div className="px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-[11px] font-bold flex items-center gap-2 shrink-0 self-start md:self-center">
                          <Calendar size={14} />
                          {job.date}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8 text-muted-slate text-sm">
                        <div className="flex items-center gap-2">
                          <Building2 size={16} className="text-accent-primary" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-accent-primary" />
                          {job.location}
                        </div>
                      </div>

                      <ul className="space-y-4">
                        {job.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-4 text-muted-slate text-sm leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary shrink-0 mt-1.5" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
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
          <div className="glass-card p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] -z-10" />
            
            <div className="grid lg:grid-cols-2 gap-20">
              <div className="space-y-10">
                <SectionHeading 
                  title="Get In Touch" 
                  subtitle="Let's discuss how we can optimize your enterprise solutions together."
                  align="left"
                />
                <div className="space-y-8">
                  {[
                    { icon: <Mail />, label: 'Email', val: 'dasrudra738@gmail.com', href: 'mailto:dasrudra738@gmail.com' },
                    { icon: <MapPin />, label: 'Location', val: 'Boxir-bit, Terribazar, Chattogram' },
                    { icon: <Phone />, label: 'Phone', val: '+880-1796726405', href: 'tel:+8801796726405' },
                    { icon: <Linkedin />, label: 'LinkedIn', val: 'linkedin.com/in/rudra-das-548bb42b2', href: 'https://www.linkedin.com/in/rudra-das-548bb42b2' },
                    { icon: <Github />, label: 'GitHub', val: 'github.com/dasrudra', href: 'https://github.com/dasrudra' },
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
                className="space-y-6"
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
