import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const CursorLens: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hoverType, setHoverType] = useState<'normal' | 'text' | 'button' | 'hero'>('normal');
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [customPosition, setCustomPosition] = useState<{ x: number; y: number } | null>(null);
  const [customSize, setCustomSize] = useState<{ width: number; height: number } | null>(null);
  const [originalStyles, setOriginalStyles] = useState<{ [key: string]: string } | null>(null);

  const cursorVariants = {
    normal: {
      width: 44,
      height: 44,
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0)",
      borderWidth: "1px",
      backdropFilter: "blur(0px) hue-rotate(0deg)",
      scale: 1,
    },
    textHover: {
      width: 60,
      height: 60,
      borderRadius: "50%",
      borderWidth: "1px",
      backdropFilter: "blur(14px)",
      scale: 1.2,
      background: "linear-gradient(45deg, rgba(0, 240, 255, 0.18), rgba(255, 159, 67, 0.18), rgba(112, 0, 255, 0.18))",
    },
    buttonHover: {
      width: 200,
      height: 80,
      borderRadius: 24,
      borderWidth: "1px",
      backdropFilter: "blur(25px)",
      scale: 1,
      background: "linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(0, 240, 255, 0.05), rgba(255, 159, 67, 0.05))",
    },
    hero: {
      width: 98,
      height: 98,
      borderRadius: 28,
      borderWidth: "1px",
      backdropFilter: "blur(18px)",
      scale: 1.1,
      background: "linear-gradient(45deg, rgba(255, 159, 67, 0.16), rgba(0, 240, 255, 0.16), rgba(112, 0, 255, 0.16))",
    }
  };

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const xSetCursor = gsap.quickSetter(cursor, "x", "px");
    const ySetCursor = gsap.quickSetter(cursor, "y", "px");
    const xSetFollower = gsap.quickSetter(follower, "x", "px");
    const ySetFollower = gsap.quickSetter(follower, "y", "px");

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      xSetCursor(mouseX);
      ySetCursor(mouseY);
    };

    const render = () => {
      // Ultra-fast and smooth trailing
      const targetX = customPosition ? customPosition.x : mouseX;
      const targetY = customPosition ? customPosition.y : mouseY;
      
      followerX += (targetX - followerX) * 0.25;
      followerY += (targetY - followerY) * 0.25;
      
      xSetFollower(followerX);
      ySetFollower(followerY);
      
      requestAnimationFrame(render);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLElement)) {
        setHoverType('normal');
        setHoveredElement(null);
        return;
      }

      const target = e.target;
      const interactive = target.closest('a, button, .magnetic, input, textarea, .hover-trigger');
      const heroText = target.closest('.hero-text-hover');
      const textElement = target.closest('p, span, h1, h2, h3, h4, h5, h6, .cursor-text');
      const ignoreLens = target.closest('.ignore-cursor-hover');

      if (interactive) {
        setHoverType('button');
        setHoveredElement(interactive as HTMLElement);
        
        const rect = interactive.getBoundingClientRect();
        setCustomPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
        setCustomSize({
          width: rect.width + 20,
          height: rect.height + 20
        });
        
        // Store original styles
        const original = {
          backgroundColor: getComputedStyle(interactive).backgroundColor,
          backdropFilter: getComputedStyle(interactive).backdropFilter,
          border: getComputedStyle(interactive).border,
        };
        setOriginalStyles(original);
        
        // Make button glassy
        gsap.to(interactive, {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        });
        
        if (interactive.classList.contains('magnetic')) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          gsap.to(interactive, {
            x: (mouseX - centerX) * 0.65,
            y: (mouseY - centerY) * 0.65,
            duration: 0.3,
            ease: "power3.out"
          });
        }
      } else if (heroText && !ignoreLens) {
        setHoverType('hero');
        setHoveredElement(heroText as HTMLElement);
      } else if (textElement && !ignoreLens) {
        setHoverType('text');
        setHoveredElement(textElement as HTMLElement);
        
        // Change text color to gradient
        gsap.to(textElement, {
          background: 'linear-gradient(45deg, #00F0FF, #FF9F43, #7000FF)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        setHoverType('normal');
        setHoveredElement(null);
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
      
      // Reset text color
      if (hoveredElement && (hoveredElement.tagName.match(/^(P|SPAN|H[1-6])$/) || hoveredElement.classList.contains('cursor-text'))) {
        gsap.to(hoveredElement, {
          background: 'none',
          color: '',
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      
      // Reset button styles
      if (originalStyles && hoveredElement && hoveredElement.tagName === 'BUTTON') {
        gsap.to(hoveredElement, {
          ...originalStyles,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      
      setHoveredElement(null);
      setCustomPosition(null);
      setCustomSize(null);
      setOriginalStyles(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    
    const animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1 h-1 bg-accent-cyan rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <motion.div
        ref={followerRef}
        className="fixed top-0 left-0 border border-white/20 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference liquid-lens overflow-hidden"
        variants={cursorVariants}
        animate={{
          ...cursorVariants[hoverType],
          width: customSize ? customSize.width : cursorVariants[hoverType].width,
          height: customSize ? customSize.height : cursorVariants[hoverType].height,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </>
  );
};

export default CursorLens;

