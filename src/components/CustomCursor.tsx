import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const CursorLens: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hoverType, setHoverType] = useState<'normal' | 'text' | 'button'>('normal');

  const cursorVariants = {
    normal: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0)",
      borderWidth: "1px",
      backdropFilter: "blur(0px) hue-rotate(0deg)",
      scale: 1,
    },
    textHover: {
      width: 28,
      height: 28,
      borderRadius: "50%",
      backgroundColor: "rgba(0, 240, 255, 0.4)", // electric blue neon
      borderWidth: "0px",
      backdropFilter: "blur(4px)",
      scale: 1.2,
    },
    buttonHover: {
      width: 120,
      height: 40,
      borderRadius: 12,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderWidth: "1px",
      backdropFilter: "blur(8px)",
      scale: 1,
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
      // Faster lerp for lightning-fast trailing
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      
      xSetFollower(followerX);
      ySetFollower(followerY);
      
      requestAnimationFrame(render);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, .magnetic, .glass-artifact, input, textarea, .hover-trigger');
      const textElement = target.closest('p, span, h1, h2, h3, h4, h5, h6, .cursor-text');
      
      if (interactive) {
        setHoverType('button');
        
        if (interactive.classList.contains('magnetic')) {
          const rect = interactive.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          gsap.to(interactive, {
            x: (mouseX - centerX) * 0.45,
            y: (mouseY - centerY) * 0.45,
            duration: 0.5,
            ease: "power3.out"
          });
        }
      } else if (textElement) {
        setHoverType('text');
      } else {
        setHoverType('normal');
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
        animate={hoverType}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </>
  );
};

export default CursorLens;

