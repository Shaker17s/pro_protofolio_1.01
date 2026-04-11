import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ChevronDown, Zap, Linkedin, Github, Instagram } from 'lucide-react';

gsap.registerPlugin(TextPlugin);

const Hero: React.FC = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const clickCount = useRef(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  
  const { scrollY } = useScroll();
  const fontWeight = useTransform(scrollY, [0, 500], [900, 200]);
  const textOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  const quotes = [
    "\"Code is poetry written in logic.\"",
    "\"AI doesn't replace humans, it amplifies them.\"",
    "\"Innovation happens at the intersection of disciplines.\"",
    "\"The best code is the one that tells a story.\"",
    "\"Future belongs to those who build it.\"",
  ];

  const handleNameClick = useCallback(() => {
    clickCount.current += 1;
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 200);

    if (clickCount.current === 3) {
      window.dispatchEvent(new CustomEvent('triggerNeuralPulse'));
      clickCount.current = 0;
      
      // Intense temporary glitch
      gsap.to(".name-glitch-span", {
        skewX: 20,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        onComplete: () => gsap.set(".name-glitch-span", { skewX: 0 })
      });
    }
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Scramble entrance
    tl.to(".name-glitch-span", {
      duration: 2,
      text: "SHAKER ABDALLAH",
      ease: "power4.inOut",
      delay: 0.5
    });

    // Subtitle sequence
    const roles = ["AI PROMPT ENGINEER", "SOFTWARE ARCHITECT", "CREATIVE TECHNOLOGIST"];
    let currentRole = 0;

    const rotateSubtitle = () => {
      gsap.to(".role-text", {
        opacity: 0,
        y: -10,
        duration: 0.5,
        onComplete: () => {
          currentRole = (currentRole + 1) % roles.length;
          gsap.set(".role-text", { text: roles[currentRole], y: 10 });
          gsap.to(".role-text", { opacity: 1, y: 0, duration: 0.5 });
        }
      });
    };

    const interval = setInterval(rotateSubtitle, 3000);
    
    const handleNameMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xOffset = (clientX - window.innerWidth / 2) / 20;
      const yOffset = (clientY - window.innerHeight / 2) / 20;
      document.documentElement.style.setProperty('--mouse-x-offset', `${xOffset}px`);
      document.documentElement.style.setProperty('--mouse-y-offset', `${yOffset}px`);
    };
    
    window.addEventListener('mousemove', handleNameMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleNameMouseMove);
    };
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  return (
    <section className="relative min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4 perspective-2500 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,240,255,0.08),_transparent_40%)] pointer-events-none" />
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-accent-pink/5 blur-3xl opacity-50 pointer-events-none" />

      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-10 max-w-5xl"
      >
        <div className="absolute top-0 right-0 hidden sm:flex items-center gap-4 glass-artifact px-6 py-3 uppercase tracking-[0.4em] text-[10px] text-white/70 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-accent-cyan/5 w-full h-full -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms] ease-linear" />
          <span className="inline-flex h-2 w-2 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_10px_rgba(0,240,255,1)]" />
          SYSTEM_STATUS: <span className="text-accent-cyan font-black">LEGENDARY_OPTIMIZED</span>
        </div>

        <div className="inline-flex items-center gap-4 px-5 py-2.5 glass-artifact mb-10 hover:border-accent-orange/50 transition-all duration-500 group cursor-none rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-orange/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Zap size={14} className="text-accent-orange animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.6em] text-white/40 group-hover:text-white transition-colors uppercase font-black">Neural_Link::Active</span>
        </div>

        <motion.h1
          ref={nameRef}
          onClick={handleNameClick}
          className={`relative text-7xl md:text-[11rem] font-display tracking-[-0.06em] leading-[0.8] mb-16 cursor-none select-none transition-all duration-700 ${glitchActive ? 'animate-glitch' : ''}`}
        >
          {/* Static Perspective Shadow */}
          <div className="absolute inset-0 z-0 opacity-10 blur-[4px] flex flex-col items-center select-none pointer-events-none translate-x-[4px] translate-y-[4px]">
            <span className="block text-accent-orange">SHAKER</span>
            <span className="block italic font-light tracking-widest">ABDALLAH</span>
          </div>

          {/* Base Layer */}
          <div className="relative z-10 flex flex-col items-center">
            <span className="hero-text-hover block text-white/40 transition-all duration-700 hover:text-white/70">
              SHAKER
            </span>
            <span className="hero-text-hover block text-white/20 transition-all duration-700 italic font-light tracking-widest relative">
              ABDALLAH
              <span className="absolute -bottom-6 left-0 w-full h-[1.5px] bg-white/10" />
            </span>
          </div>
          {/* Highlight Layer (Masked - Sync'd via Raw Mouse) */}
          <div 
            className="fixed inset-0 z-20 pointer-events-none flex flex-col items-center justify-center select-none"
            style={{
              maskImage: 'radial-gradient(circle 120px at var(--cursor-x) var(--cursor-y), black 0%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(circle 120px at var(--cursor-x) var(--cursor-y), black 0%, transparent 100%)',
            }}
          >
            <div className="flex flex-col items-center">
              <span className="block text-accent-orange drop-shadow-[0_0_50px_rgba(255,159,67,1)] font-black uppercase text-7xl md:text-[11rem] tracking-[-0.06em] leading-[0.8]">
                SHAKER
              </span>
              <span className="block text-white italic font-black tracking-widest relative drop-shadow-[0_0_30px_rgba(255,255,255,0.7)] text-7xl md:text-[11rem] leading-[0.8]">
                ABDALLAH
                <span className="absolute -bottom-6 left-0 w-full h-[1.5px] bg-white shadow-[0_0_20px_rgba(255,255,255,1)]" />
              </span>
            </div>
          </div>
        </motion.h1>

        <div className="h-16 flex items-center justify-center gap-10 overflow-hidden mb-16">
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-accent-cyan/40 to-transparent" />
          <span className="hero-text-hover role-text cursor-text text-base md:text-xl font-mono tracking-[0.5em] text-white/40 uppercase">
            AI PROMPT ENGINEER
          </span>
          <div className="w-32 h-[1px] bg-gradient-to-l from-transparent via-accent-cyan/40 to-transparent" />
        </div>

        <div className="max-w-2xl mx-auto text-base md:text-lg leading-8 text-white/50 mb-12">
          Crafting elite digital identities with glassmorphic depth, lightning-fast interaction, and a premium visual narrative with a sunlit orange pulse that makes recruiters stop, stay, and remember.
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <button className="magnetic magnetic-btn glass-artifact px-10 py-5 text-[11px] font-heading font-black tracking-[0.35em] uppercase hover:bg-orange-400/15 hover:shadow-[0_0_35px_rgba(255,159,67,0.18)] transition-all duration-300 hover:scale-[1.04]">
            Analyze Artifacts
          </button>
          <button className="magnetic group flex items-center gap-3 text-[10px] font-mono tracking-[0.45em] uppercase text-white/40 hover:text-white transition-colors">
            Init Connection <div className="w-12 h-[1px] bg-white/20 group-hover:w-20 group-hover:bg-orange-400 transition-all duration-300" />
          </button>
        </div>

        <div className="flex items-center gap-6 mt-12">
          <a href="https://linkedin.com/in/shakerabdallah" target="_blank" rel="noopener noreferrer" className="glass-artifact p-3 hover:bg-[#0077B5] hover:shadow-[0_0_20px_#0077B5] transition-all duration-300">
            <Linkedin size={20} />
          </a>
          <a href="https://github.com/shakerabdallah" target="_blank" rel="noopener noreferrer" className="glass-artifact p-3 hover:bg-white hover:shadow-[0_0_20px_white] transition-all duration-300">
            <Github size={20} />
          </a>
          <a href="https://instagram.com/shakerabdallah" target="_blank" rel="noopener noreferrer" className="glass-artifact p-3 hover:bg-gradient-to-r hover:from-[#833ab4] hover:to-[#fd1d1d] hover:shadow-[0_0_20px_#833ab4] transition-all duration-300">
            <Instagram size={20} />
          </a>
        </div>

        <motion.div
          key={currentQuote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-sm font-body italic text-white/40 max-w-md mx-auto">
            {quotes[currentQuote]}
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-12 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] font-mono tracking-[0.6em] text-white/20 uppercase">Scroll to Initialize</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-accent-purple" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;