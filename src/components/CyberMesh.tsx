import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CyberMesh: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div className="fixed inset-0 -z-30 pointer-events-none overflow-hidden touch-none">
      <div
        ref={containerRef}
        className="absolute inset-x-[-20%] inset-y-[-20%] w-[140%] h-[140%] origin-center opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 159, 67, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 159, 67, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          maskImage: 'radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)'
        }}
      />
      
      {/* Static grid for background depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  );
};

export default CyberMesh;
