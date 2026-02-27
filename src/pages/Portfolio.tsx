import { motion } from 'motion/react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { projects } from '../constants';

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

const PortfolioPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="section-padding">
        <SectionHeading 
          title="Full Portfolio" 
          subtitle="Explore my complete collection of enterprise solutions, research publications, and software projects."
        />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[16/10] rounded-[40px] overflow-hidden mb-8 border border-white/5 bg-navy-900/50">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-navy-950/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
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
                <p className="text-muted-slate text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
