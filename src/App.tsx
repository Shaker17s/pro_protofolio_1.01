import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Hero from './components/Hero';
import AboutTech from './components/AboutTech';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CursorLens from './components/CustomCursor';
import Navbar from './components/Navbar';
import ParticleMesh from './components/ParticleMesh';
import CyberTerminal from './components/CyberTerminal';
import GlobalFilters from './components/GlobalFilters';
import NeuralNetwork from './components/NeuralNetwork'; // Upgraded Pulse Effect

function App() {
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`') {
        setIsTerminalMode(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main id="top" className="relative min-h-screen bg-black overflow-hidden selection:bg-accent-purple/30">
      <GlobalFilters />
      <Navbar />
      <CursorLens />
      <ParticleMesh />
      <NeuralNetwork />

      <AnimatePresence mode="wait">
        {!isTerminalMode ? (
          <motion.div
            key="interface"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 0.95,
              filter: 'blur(20px) brightness(0)',
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            className="relative z-10"
          >
            <Hero />
            <AboutTech />
            <Projects />
            <Contact />
            
            <footer className="py-12 text-center text-white/20 text-[10px] font-mono tracking-[0.5em] uppercase">
              <p>© {new Date().getFullYear()} Shaker Abdallah // System Core Stable</p>
            </footer>
          </motion.div>
        ) : (
          <CyberTerminal onClose={() => setIsTerminalMode(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
