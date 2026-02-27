import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-navy-950/60 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tighter font-display"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            RUDRA<span className="text-corp-blue">DAS</span>
          </motion.span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link, i) => {
            const isExternal = link.href.startsWith('http');
            const isHash = link.href.includes('#');
            
            if (isHash && !isHome) {
              // If we are not on home, hash links should point to /#hash
              const hash = link.href.split('#')[1];
              return (
                <Link
                  key={link.name}
                  to={`/#${hash}`}
                  className="text-xs font-bold uppercase tracking-widest text-muted-slate hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-corp-blue transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs font-bold uppercase tracking-widest text-muted-slate hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-corp-blue transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-corp-blue hover:bg-glow-blue text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all blue-glow"
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 top-[72px] bg-navy-950 z-40 p-6"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-bold font-display hover:text-corp-blue transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <button className="bg-corp-blue text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-sm">Hire Me</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
