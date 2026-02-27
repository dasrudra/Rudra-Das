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
  Sparkles
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
    <div ref={containerRef}>
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-corp-blue text-xs font-bold uppercase tracking-widest mb-8"
            >
              <Terminal size={14} />
              <span>Available for Enterprise Projects</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-8 text-gradient">
              Rudra <br /> <span className="text-corp-blue">Das</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-10 font-medium max-w-xl leading-relaxed">
              Software Developer & <span className="text-corp-blue">SAP & Odoo Consultant</span>. 
              Crafting robust enterprise solutions with technical precision and modern digital presence.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/portfolio" 
                  className="bg-corp-blue hover:bg-glow-blue text-white px-10 py-5 rounded-2xl font-bold transition-all blue-glow flex items-center gap-3 group"
                >
                  View Portfolio <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card px-8 py-5 flex items-center gap-4"
              >
                <div className="text-3xl font-bold text-corp-blue">1+</div>
                <div className="text-[10px] text-muted-slate uppercase font-bold tracking-widest leading-tight">
                  Years <br /> Experience
                </div>
              </motion.div>

              <div className="flex -space-x-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-navy-950 bg-navy-900 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="client" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-navy-950 bg-corp-blue flex items-center justify-center text-[10px] font-bold">
                  +12
                </div>
              </div>
              <p className="text-xs text-muted-slate font-medium">Trusted by <br /> 12+ Enterprise Clients</p>
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
                className="absolute -right-8 top-10 glass-card p-5 blue-glow z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-corp-blue/20 p-2 rounded-xl">
                    <Code2 className="text-corp-blue w-5 h-5" />
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
                className="absolute -left-12 top-1/2 glass-card p-5 blue-glow z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-corp-blue/20 p-2 rounded-xl">
                    <Briefcase className="text-corp-blue w-5 h-5" />
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
                className="absolute -bottom-10 -left-10 glass-card p-5 blue-glow z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-corp-blue/20 p-2 rounded-xl">
                    <Globe className="text-corp-blue w-5 h-5" />
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
                className="absolute -bottom-20 right-0 glass-card p-5 blue-glow z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-corp-blue/20 p-2 rounded-xl">
                    <Layers className="text-corp-blue w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-slate uppercase font-bold tracking-widest">Systems</p>
                    <p className="text-lg font-bold">Odoo ERP</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-corp-blue/20 blur-[100px] -z-10 rounded-full scale-75" />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-corp-blue/10 text-corp-blue text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} />
              <span>The Visionary Approach</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Bridging Complexity <br /> with <span className="text-gradient">Efficiency</span>
            </h2>
            <div className="space-y-6 text-muted-slate text-lg leading-relaxed">
              <p>
                I specialize in developing high-performance enterprise applications that transform how businesses operate. 
                Whether it's optimizing SAP workflows or building custom Odoo modules, my goal is to make complexity 
                seamless and data-driven.
              </p>
              <p>
                With a background in Computer Science and hands-on experience in industrial IT and MIS roles, 
                I bring a holistic understanding of how software serves business goals.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Education', val: 'BSc CSE', icon: <GraduationCap size={16} /> },
                { label: 'Specialization', val: 'SAP ABAP', icon: <Cpu size={16} /> },
                { label: 'Web Dev', val: 'Python', icon: <Globe size={16} /> },
                { label: 'Systems', val: 'Odoo', icon: <Layers size={16} /> },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card p-6 flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-corp-blue/10 text-corp-blue">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-slate">{item.label}</p>
                    <p className="text-lg font-bold">{item.val}</p>
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
                <div className="w-20 h-20 rounded-3xl bg-corp-blue flex items-center justify-center text-white blue-glow">
                  <Terminal size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Technical Philosophy</h3>
                  <p className="text-muted-slate">Code that scales, systems that empower.</p>
                </div>
              </div>
              
              <div className="space-y-8">
                {[
                  { title: 'Scalability', desc: 'Designing architectures that grow with your business needs.' },
                  { title: 'Precision', desc: 'Meticulous ABAP and Python development for zero-error workflows.' },
                  { title: 'Integration', desc: 'Seamlessly connecting disparate systems into a unified ecosystem.' },
                ].map((point, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-1 h-auto bg-corp-blue/20 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: '100%' }}
                        className="w-full bg-corp-blue"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">{point.title}</h4>
                      <p className="text-sm text-muted-slate leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-navy-900/30">
        <div className="section-padding">
          <SectionHeading 
            title="Core Expertise" 
            subtitle="Specialized enterprise solutions designed to streamline operations and drive digital transformation."
          />
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass-card p-10 group hover:border-corp-blue/50 transition-all duration-500 ${service.size === 'large' ? 'md:col-span-2' : ''}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-corp-blue/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-corp-blue group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-muted-slate leading-relaxed mb-8">{service.description}</p>
                <div className="flex items-center gap-2 text-corp-blue font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                  Learn More <ChevronRight size={14} />
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
              <span key={tech} className="text-2xl font-bold font-display text-white/20 hover:text-corp-blue transition-colors cursor-default uppercase tracking-tighter">
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
              <span key={tech} className="text-2xl font-bold font-display text-white/20 hover:text-corp-blue transition-colors cursor-default uppercase tracking-tighter">
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
                          className="w-14 h-14 rounded-2xl bg-corp-blue text-white flex items-center justify-center blue-glow"
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
                      <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-corp-blue bg-corp-blue/10 px-3 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold group-hover:text-corp-blue transition-colors flex items-center gap-2">
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
              className="inline-flex items-center gap-3 text-corp-blue font-bold uppercase tracking-widest hover:gap-5 transition-all"
            >
              View Full Portfolio <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="section-padding">
          <SectionHeading 
            title="Technical Stack" 
            subtitle="A comprehensive overview of my technical expertise and software proficiency."
          />
          <div className="grid lg:grid-cols-3 gap-8">
            {(['Programming', 'Technical', 'Microsoft'] as const).map((category, idx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-10 space-y-10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-corp-blue/10 flex items-center justify-center text-corp-blue">
                    {category === 'Programming' ? <Code2 size={28} /> : 
                     category === 'Technical' ? <Cpu size={28} /> : 
                     <Monitor size={28} />}
                  </div>
                  <h3 className="text-2xl font-bold">{category}</h3>
                </div>
                <div className="space-y-8">
                  {skills.filter(s => s.category === category).map((skill, i) => (
                    <div key={i} className="group">
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-bold uppercase tracking-widest text-white/80 group-hover:text-corp-blue transition-colors">{skill.name}</span>
                        <span className="text-xs text-corp-blue font-bold">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className="h-full bg-corp-blue blue-glow rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="bg-navy-900/30">
        <div className="section-padding">
          <SectionHeading 
            title="Professional Journey" 
            subtitle="A timeline of my professional experience and academic background."
          />
          
          <div className="max-w-4xl mx-auto space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative flex gap-12 group"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-corp-blue group-hover:bg-corp-blue group-hover:text-white transition-all duration-500 z-10">
                    {item.type === 'experience' ? <Briefcase size={24} /> : <GraduationCap size={24} />}
                  </div>
                  <div className="w-0.5 h-full bg-white/5 group-last:hidden" />
                </div>
                
                <div className="glass-card p-10 flex-1 group-hover:border-corp-blue/30 transition-all duration-500">
                  <span className="text-xs font-bold text-corp-blue uppercase tracking-widest mb-4 block">{item.year}</span>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/60 font-medium mb-6">{item.organization}</p>
                  <p className="text-muted-slate leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative">
        <div className="section-padding">
          <div className="glass-card p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-corp-blue/10 rounded-full blur-[100px] -z-10" />
            
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
                    { icon: <MapPin />, label: 'Location', val: 'Chittagong, Bangladesh' },
                    { icon: <Phone />, label: 'Phone', val: '+880-1796726405', href: 'tel:+8801796726405' },
                    { icon: <Linkedin />, label: 'LinkedIn', val: 'linkedin.com/in/rudra-das-548bb42b2', href: 'https://www.linkedin.com/in/rudra-das-548bb42b2' },
                    { icon: <Github />, label: 'GitHub', val: 'github.com/dasrudra', href: 'https://github.com/dasrudra' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-corp-blue group-hover:bg-corp-blue group-hover:text-white transition-all duration-500">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-slate mb-1">{item.label}</p>
                        {item.href ? (
                          <a 
                            href={item.href} 
                            target={item.label !== 'Email' && item.label !== 'Phone' ? "_blank" : undefined}
                            rel={item.label !== 'Email' && item.label !== 'Phone' ? "noopener noreferrer" : undefined}
                            className="text-xl font-bold hover:text-corp-blue transition-colors"
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
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-corp-blue transition-all placeholder:text-muted-slate/50" 
                    placeholder="Your Name" 
                  />
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-corp-blue transition-all placeholder:text-muted-slate/50" 
                    placeholder="Your Email" 
                  />
                </div>
                <input 
                  name="subject"
                  type="text" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-corp-blue transition-all placeholder:text-muted-slate/50" 
                  placeholder="Subject" 
                />
                <textarea 
                  name="message"
                  rows={5} 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-corp-blue transition-all placeholder:text-muted-slate/50 resize-none" 
                  placeholder="Message"
                ></textarea>
                
                <div className="flex flex-col gap-4">
                  <motion.button 
                    disabled={formStatus === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest transition-all blue-glow flex items-center justify-center gap-3 ${
                      formStatus === 'sending' ? 'bg-muted-slate cursor-not-allowed' : 'bg-corp-blue hover:bg-glow-blue text-white'
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
