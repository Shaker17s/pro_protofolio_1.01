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

  // Smooth springs for the lens - INCREASED STIFFNESS for snap
  const springConfig = { damping: 40, stiffness: 450, mass: 0.4 };
  const lensX = useSpring(targetX, springConfig);
  const lensY = useSpring(targetY, springConfig);
  const lensWidth = useSpring(32, springConfig);
  const lensHeight = useSpring(32, springConfig);
  const lensRadius = useSpring(16, springConfig);
  const lensOpacity = hoverType === 'button' ? 0.96 : hoverType === 'hero' ? 0.84 : 0.7;

  // Synchronize CSS masking variables with the RAW mouse position for ZERO lag
  useEffect(() => {
    const unsubscribeX = mouseX.on('change', (v) => {
      document.documentElement.style.setProperty('--cursor-x', `${v}px`);
    });
    const unsubscribeY = mouseY.on('change', (v) => {
      document.documentElement.style.setProperty('--cursor-y', `${v}px`);
    });
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    let currentInteractive: HTMLElement | null = null;
    let currentMagneticTarget: HTMLElement | null = null;
    let currentHover = 'normal' as 'normal' | 'text' | 'button' | 'hero';

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (currentHover !== 'button' && currentHover !== 'hero') {
        targetX.set(e.clientX);
        targetY.set(e.clientY);
      }
    };

    const updateHoverState = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest('a, button, .magnetic, .hover-trigger') as HTMLElement | null;
      const heroText = target.closest('.hero-text-hover');
      const lensRevealElement = target.closest('.lens-reveal');
      const textElement = !lensRevealElement ? target.closest('p, h1, h2, h3, h4, span') : null;
      const newHoverType: typeof currentHover = interactive ? 'button' : heroText ? 'hero' : textElement ? 'text' : 'normal';

      if (newHoverType === currentHover && interactive === currentInteractive) return;
      currentHover = newHoverType;
      currentInteractive = interactive;
      setHoverType(newHoverType);

      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        setHoveredRect(rect);
        targetX.set(rect.left + rect.width / 2);
        targetY.set(rect.top + rect.height / 2);
        lensWidth.set(Math.max(rect.width + 20, 90));
        lensHeight.set(Math.max(rect.height + 20, 50));
        lensRadius.set(16);

        if (interactive.classList.contains('magnetic')) {
          currentMagneticTarget = interactive;
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          gsap.to(interactive, {
            x: (e.clientX - centerX) * 0.25,
            y: (e.clientY - centerY) * 0.25,
            duration: 0.35,
            ease: 'power3.out'
          });
        }
      } else if (heroText) {
        targetX.set(mouseX.get());
        targetY.set(mouseY.get());
        lensWidth.set(80);
        lensHeight.set(80);
        lensRadius.set(40);
      } else if (textElement) {
        targetX.set(mouseX.get());
        targetY.set(mouseY.get());
        lensWidth.set(70);
        lensHeight.set(70);
        lensRadius.set(35);
      } else {
        targetX.set(mouseX.get());
        targetY.set(mouseY.get());
        lensWidth.set(44);
        lensHeight.set(44);
        lensRadius.set(22);
      }
    };

    const handlePointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (currentMagneticTarget && !currentMagneticTarget.contains(e.relatedTarget as Node)) {
        gsap.to(currentMagneticTarget, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' });
        currentMagneticTarget = null;
      }
      if (e.relatedTarget instanceof HTMLElement) {
        updateHoverState(e);
      } else {
        currentInteractive = null;
        currentHover = 'normal';
        setHoverType('normal');
        targetX.set(mouseX.get());
        targetY.set(mouseY.get());
        lensWidth.set(44);
        lensHeight.set(44);
        lensRadius.set(22);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerover', updateHoverState);
    window.addEventListener('pointerout', handlePointerOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerover', updateHoverState);
      window.removeEventListener('pointerout', handlePointerOut);
    };
  }, [mouseX, mouseY, targetX, targetY, lensWidth, lensHeight, lensRadius]);

  return (
    <>
      <motion.div
        style={{ x: mouseX, y: mouseY, willChange: 'transform' }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-orange rounded-full pointer-events-none z-[10002] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_18px_rgba(255,159,67,0.95)]"
      />
      
      <motion.div
        style={{ 
          x: lensX, 
          y: lensY, 
          width: lensWidth, 
          height: lensHeight, 
          borderRadius: lensRadius,
          translateX: "-50%",
          translateY: "-50%",
          opacity: lensOpacity,
        }}
        className="fixed top-0 left-0 pointer-events-none z-[10001] border border-white/12 overflow-hidden bg-white/10 backdrop-blur-3xl flex items-center justify-center shadow-[0_0_50px_rgba(255,159,67,0.18)]"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/10 via-white/5 to-accent-cyan/10 opacity-30" />
        {/* Volumetric Shine */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 rotate-45 blur-2xl" />
      </motion.div>
    </>
  );
};

export default CursorLens;

