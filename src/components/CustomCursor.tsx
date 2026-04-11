import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorLens: React.FC = () => {
  const [hoverType, setHoverType] = useState<'normal' | 'text' | 'button' | 'hero'>('normal');
  const [hoveredRect, setHoveredRect] = useState<{ width: number; height: number; x: number; y: number } | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Target coordinates (will snap to element center if hovering)
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);

  // Smooth springs for the lens
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const lensX = useSpring(targetX, springConfig);
  const lensY = useSpring(targetY, springConfig);
  const lensWidth = useSpring(44, springConfig);
  const lensHeight = useSpring(44, springConfig);
  const lensRadius = useSpring(22, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Update global CSS variables for masking
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);

      if (hoverType !== 'button' && hoverType !== 'hero') {
        targetX.set(e.clientX);
        targetY.set(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('a, button, .magnetic, .hover-trigger');
      const heroText = target.closest('.hero-text-hover');
      const textElement = target.closest('p, h1, h2, h3, h4, span, .lens-reveal');

      if (interactive) {
        setHoverType('button');
        const rect = interactive.getBoundingClientRect();
        setHoveredRect(rect);
        
        targetX.set(rect.left + rect.width / 2);
        targetY.set(rect.top + rect.height / 2);
        lensWidth.set(rect.width + 20);
        lensHeight.set(rect.height + 20);
        lensRadius.set(16);

        if (interactive.classList.contains('magnetic')) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            gsap.to(interactive, {
              x: (e.clientX - centerX) * 0.35,
              y: (e.clientY - centerY) * 0.35,
              duration: 0.4,
              ease: "power3.out"
            });
        }
      } else if (heroText) {
        setHoverType('hero');
        targetX.set(mouseX.get());
        targetY.set(mouseY.get());
        lensWidth.set(150);
        lensHeight.set(150);
        lensRadius.set(75);
      } else if (textElement) {
        setHoverType('text');
        targetX.set(mouseX.get());
        targetY.set(mouseY.get());
        lensWidth.set(100);
        lensHeight.set(100);
        lensRadius.set(50);
      } else {
        setHoverType('normal');
        targetX.set(mouseX.get());
        targetY.set(mouseY.get());
        lensWidth.set(44);
        lensHeight.set(44);
        lensRadius.set(22);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('magnetic')) {
        gsap.to(target, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [mouseX, mouseY, hoverType]);

  return (
    <>
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-orange rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(255,159,67,1)]"
      />
      
      <motion.div
        style={{ 
          x: lensX, 
          y: lensY, 
          width: lensWidth, 
          height: lensHeight, 
          borderRadius: lensRadius,
          translateX: "-50%",
          translateY: "-50%"
        }}
        className="fixed top-0 left-0 pointer-events-none z-[10000] border border-white/10 overflow-hidden bg-white/5 backdrop-blur-2xl flex items-center justify-center shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/10 via-white/5 to-accent-cyan/10 opacity-30" />
        {/* Volumetric Shine */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 rotate-45 blur-2xl" />
      </motion.div>
    </>
  );
};

export default CursorLens;

