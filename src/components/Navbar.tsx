import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu, Terminal, Layers, Mail } from 'lucide-react';

const navItems = [
  { name: 'Core', icon: <Cpu size={16} />, href: '#top' },
  { name: 'Diagnostics', icon: <Terminal size={16} />, href: '#about' },
  { name: 'Artifacts', icon: <Layers size={16} />, href: '#projects' },
  { name: 'Signal', icon: <Mail size={16} />, href: '#contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setScrolled(scrollTop > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[1000] p-6 pointer-events-none glass-artifact backdrop-blur-xl bg-black/10 border-b border-white/10 transition-all duration-500 ${scrolled ? 'bg-black/30 shadow-[0_20px_60px_rgba(0,0,0,0.35)]' : 'bg-black/10'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto"
        >
          <a href="#top" className="flex items-center gap-4 glass-artifact px-5 py-2.5 group hover:border-accent-orange/40 transition-all duration-500 rounded-full">
            <div className="w-2.5 h-2.5 rounded-full bg-accent-orange shadow-[0_0_10px_rgba(255,159,67,0.8)] animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.5em] font-black uppercase text-white group-hover:text-accent-orange transition-colors">S_ABDALLAH.SYS</span>
          </a>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 pointer-events-auto">
          {navItems.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="magnetic glass-artifact px-8 py-3 flex items-center gap-4 group transition-all duration-700 hover:bg-white hover:text-black rounded-full overflow-hidden"
            >
              <span className="text-accent-cyan group-hover:text-black transition-colors">{item.icon}</span>
              <span className="text-[10px] font-mono tracking-[0.4em] uppercase font-bold group-hover:font-black">{item.name}</span>
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden pointer-events-auto">
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="glass-artifact p-3"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-12 p-8 md:hidden pointer-events-auto"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-4xl font-heading font-black tracking-tighter hover:text-accent-purple transition-colors uppercase"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-2 left-1/4 w-px h-4 bg-gradient-to-b from-accent-cyan to-transparent"></div>
        <div className="absolute top-2 right-1/4 w-px h-4 bg-gradient-to-b from-accent-pink to-transparent"></div>
      </div>
    </nav>
  );
};

export default Navbar;
