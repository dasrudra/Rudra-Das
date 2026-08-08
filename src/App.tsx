import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import CV from './pages/CV';
import CaseStudy from './pages/CaseStudy';
import InteractiveBackground from './components/InteractiveBackground';
import { navLinks } from './constants';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-navy-950 text-white selection:bg-accent-primary/30">
        {/* Dynamic Interactive & High-Tech Background */}
        <InteractiveBackground />

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/case-study" element={<CaseStudy />} />
          <Route path="/cv" element={<CV />} />
        </Routes>

        {/* Footer */}
        <footer className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <a href="/" className="text-3xl font-bold tracking-tighter font-display">
                RUDRA<span className="text-accent-primary">DAS</span>
              </a>
              <p className="text-muted-slate text-sm mt-4 max-w-xs">
                Software Engineer | AI & ML | SAP & Odoo ERP
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-10">
              {navLinks.slice(0, 5).map(link => (
                <a key={link.name} href={link.href} className="text-xs font-bold uppercase tracking-widest text-muted-slate hover:text-white transition-colors">{link.name}</a>
              ))}
            </div>

            <div className="text-center md:text-right">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-slate">
                © {new Date().getFullYear()} Rudra Das. <br />
                <span className="text-[10px] opacity-50 mt-2 block">Built with React & Tailwind</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
