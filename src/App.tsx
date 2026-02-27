import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
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
      <div className="relative min-h-screen bg-navy-950 text-white selection:bg-corp-blue/30">
        {/* Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-corp-blue/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-glow-blue/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        </div>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>

        {/* Footer */}
        <footer className="py-20 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <a href="/" className="text-3xl font-bold tracking-tighter font-display">
                RUDRA<span className="text-corp-blue">DAS</span>
              </a>
              <p className="text-muted-slate text-sm mt-4 max-w-xs">
                Software Developer Specialist focusing on SAP, Odoo, and Enterprise Solutions.
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
