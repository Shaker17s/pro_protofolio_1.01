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
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(quoteInterval);
  }, [quotes.length]);

  return (
    <section className="relative min-h-[86vh] flex flex-col items-center justify-center text-center px-4 perspective-2500 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,240,255,0.12),_transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_50%)] pointer-events-none" />
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-accent-pink/10 blur-3xl opacity-70 pointer-events-none" />

      <motion.div
        style={{ opacity: textOpacity }}
        className="relative z-10 max-w-5xl"
      >
        <div className="absolute top-8 right-8 hidden sm:flex items-center gap-2 glass-artifact px-4 py-2 uppercase tracking-[0.3em] text-[10px] text-white/70 shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
          <span className="inline-flex h-2 w-2 rounded-full bg-accent-cyan animate-pulse" />
          NOW OPEN FOR ELITE ROLES
        </div>

        <div className="inline-flex items-center gap-3 px-4 py-2 glass-artifact mb-8 hover:border-accent-cyan/50 transition-colors group cursor-none">
          <Zap size={14} className="text-accent-cyan animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.4em] text-white/50 group-hover:text-white transition-colors uppercase">System Link: Active</span>
        </div>

        <motion.h1
          ref={nameRef}
          onClick={handleNameClick}
          style={{ fontWeight }}
          className={`relative ignore-cursor-hover text-6xl md:text-[8.5rem] font-display tracking-[-0.03em] leading-[0.9] mb-6 cursor-none select-none cursor-text transition-all duration-300 ${glitchActive ? 'animate-glitch' : ''}`}
        >
          <span className="ignore-cursor-hover block text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink"
            style={{ textShadow: '0 0 40px rgba(0,255,255,0.18)' }}
          >
            SHAKER
          </span>
          <span className="ignore-cursor-hover block text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-pink"
            style={{ textShadow: '0 0 50px rgba(255,255,255,0.18)' }}
          >
            ABDALLAH
          </span>
          <span className="absolute inset-x-0 -bottom-6 h-1.5 bg-gradient-to-r from-accent-cyan/60 via-accent-purple/50 to-accent-pink/60 blur-2xl opacity-80" />
        </motion.h1>

        <div className="h-12 flex items-center justify-center gap-4 overflow-hidden mb-10">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-accent-cyan/40" />
          <span className="role-text cursor-text text-sm md:text-lg font-mono tracking-[0.35em] bg-gradient-to-r from-accent-cyan to-accent-pink bg-clip-text text-transparent uppercase">
            AI PROMPT ENGINEER
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-accent-cyan/40" />
        </div>

        <div className="max-w-2xl mx-auto text-base md:text-lg leading-8 text-white/50 mb-12">
          Crafting elite digital identities with glassmorphic depth, lightning-fast interaction, and a premium visual narrative designed to make every recruiter stop and stay.
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <button className="magnetic magnetic-btn glass-artifact px-10 py-5 text-[11px] font-heading font-black tracking-[0.35em] uppercase hover:bg-white/15 hover:shadow-[0_0_35px_rgba(255,255,255,0.15)] transition-all duration-300 hover:scale-[1.04]">
            Analyze Artifacts
          </button>
          <button className="magnetic group flex items-center gap-3 text-[10px] font-mono tracking-[0.45em] uppercase text-white/40 hover:text-white transition-colors">
            Init Connection <div className="w-12 h-[1px] bg-white/20 group-hover:w-20 group-hover:bg-accent-cyan transition-all duration-300" />
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