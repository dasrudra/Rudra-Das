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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0B1220]/80 backdrop-blur-xl border-b border-[#2A3348] py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tight font-display text-[#EDEAE3]"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            RUDRA<span className="text-[#E0995A]"> DAS</span>
          </motion.span>
        </Link>

        {/* Desktop Links - Monospace per typography spec */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isHash = link.href.includes('#');
            
            if (isHash && !isHome) {
              const hash = link.href.split('#')[1];
              return (
                <Link
                  key={link.name}
                  to={`/#${hash}`}
                  className="font-mono text-xs font-semibold uppercase tracking-wider text-[#8B93A6] hover:text-[#EDEAE3] transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#E0995A] transition-all duration-300 group-hover:w-full" />
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.href}
                className="font-mono text-xs font-semibold uppercase tracking-wider text-[#8B93A6] hover:text-[#EDEAE3] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#E0995A] transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
          <motion.a
            href="/#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#E0995A] hover:bg-[#d68c4d] text-[#0B1220] px-7 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all accent-glow"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#EDEAE3]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
            className="md:hidden fixed inset-0 top-[72px] bg-[#0B1220] border-b border-[#2A3348] z-40 p-6"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-2xl font-bold text-[#EDEAE3] hover:text-[#E0995A] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#E0995A] text-[#0B1220] py-4 rounded-xl text-center font-mono font-bold uppercase tracking-wider text-sm"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
