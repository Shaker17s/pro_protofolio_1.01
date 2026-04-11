import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorLens: React.FC = () => {
  const [hoverType, setHoverType] = useState<'normal' | 'text' | 'button' | 'hero'>('normal');
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the lens
  const springConfig = { damping: 25, stiffness: 200 };
  const lensX = useSpring(mouseX, springConfig);
  const lensY = useSpring(mouseY, springConfig);

  const cursorVariants = {
    normal: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(0px)",
      scale: 1,
    },
    text: {
      width: 100,
      height: 100,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255, 159, 67, 0.15) 0%, rgba(255, 159, 67, 0) 70%)",
      border: "1px solid rgba(255, 159, 67, 0.3)",
      backdropFilter: "blur(8px)",
      scale: 1.2,
    },
    button: {
      width: 180,
      height: 70,
      borderRadius: 16,
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      backdropFilter: "blur(20px)",
      scale: 1.05,
    },
    hero: {
      width: 150,
      height: 150,
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255, 159, 67, 0.25) 0%, rgba(0, 240, 255, 0.1) 100%)",
      border: "2px solid rgba(255, 159, 67, 0.5)",
      backdropFilter: "blur(12px)",
      scale: 1.3,
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Update global CSS variables for masking
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement)) return;

      const target = e.target;
      const interactive = target.closest('a, button, .magnetic, .hover-trigger');
      const heroText = target.closest('.hero-text-hover');
      const textElement = target.closest('p, span, h1, h2, h3, h4, h5, h6, .cursor-text');

      if (interactive) {
        setHoverType('button');
        setHoveredElement(interactive as HTMLElement);
        setIsHovering(true);
        
        if (interactive.classList.contains('magnetic')) {
          const rect = interactive.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          gsap.to(interactive, {
            x: (e.clientX - centerX) * 0.4,
            y: (e.clientY - centerY) * 0.4,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      } else if (heroText) {
        setHoverType('hero');
        setIsHovering(true);
      } else if (textElement) {
        setHoverType('text');
        setIsHovering(true);
      } else {
        setHoverType('normal');
        setIsHovering(false);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('magnetic')) {
        gsap.to(target, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        });
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
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Central Dot */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-cyan rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
      />
      
      {/* Liquid Lens */}
      <motion.div
        style={{ x: lensX, y: lensY }}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
        initial={false}
        animate={cursorVariants[hoverType]}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      >
        {/* Inner Gradient Bloom */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/10 via-transparent to-accent-cyan/10 opacity-50" />
        
        {/* Dynamic Glass Bevel */}
        <div className="absolute inset-[1px] rounded-[inherit] border border-white/10" />
      </motion.div>
    </>
  );
};

export default CursorLens;

