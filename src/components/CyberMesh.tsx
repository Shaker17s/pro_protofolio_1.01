import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CyberMesh: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 2000], [20, 45]);
  const translateZ = useTransform(scrollY, [0, 2000], [0, -200]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth) * 100;
      const yPercent = (clientY / window.innerHeight) * 100;
      container.style.setProperty('--mouse-x', `${xPercent}%`);
      container.style.setProperty('--mouse-y', `${yPercent}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-30 pointer-events-none overflow-hidden bg-black">
      <motion.div
        ref={containerRef}
        style={{ rotateX, translateZ, perspective: '1000px' }}
        className="absolute inset-x-[-50%] inset-y-[-50%] w-[200%] h-[200%] origin-center"
      >
        {/* Dynamic Grid */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 159, 67, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 159, 67, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)'
          }}
        />

        {/* Highlight Pulse */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 240, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
          }}
        />
      </motion.div>
      
      {/* Decorative Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)]" />
    </div>
  );
};

export default CyberMesh;
