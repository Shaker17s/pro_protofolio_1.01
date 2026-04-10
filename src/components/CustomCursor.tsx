import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CursorLens: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

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
      // Advanced Lerp for ultra-smooth trailing
      followerX += (mouseX - followerX) * 0.08;
      followerY += (mouseY - followerY) * 0.08;
      
      xSetFollower(followerX);
      ySetFollower(followerY);
      
      requestAnimationFrame(render);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, .magnetic, .glass-artifact, input, textarea, .hover-trigger');
      
      if (interactive) {
        setIsHovering(true);
        gsap.to(follower, {
          scale: 3.5,
          duration: 0.8,
          ease: "expo.out",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderWidth: "0px",
          backdropFilter: "blur(4px) hue-rotate(90deg)"
        });
        
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
      } else {
        setIsHovering(false);
        gsap.to(follower, {
          scale: 1,
          duration: 0.8,
          ease: "expo.out",
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderWidth: "1px",
          backdropFilter: "blur(0px) hue-rotate(0deg)"
        });
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
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-12 h-12 border border-white/20 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference liquid-lens overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </>
  );
};

export default CursorLens;

