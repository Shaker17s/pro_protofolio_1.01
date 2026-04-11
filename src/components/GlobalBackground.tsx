import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GlobalBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 5000], [0, -500]);
  const y2 = useTransform(scrollY, [0, 5000], [0, -800]);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 opacity-20">
        <motion.path
          d="M -100 200 Q 250 50 500 200 T 1100 200"
          fill="none"
          stroke="rgba(255, 159, 67, 0.4)"
          strokeWidth="0.5"
          style={{ y: y1 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.4, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M -200 500 Q 300 400 600 500 T 1200 500"
          fill="none"
          stroke="rgba(112, 0, 255, 0.3)"
          strokeWidth="0.5"
          style={{ y: y2 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.3, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.path
          d="M 0 800 Q 400 700 800 800 T 1300 800"
          fill="none"
          stroke="rgba(0, 240, 255, 0.2)"
          strokeWidth="0.5"
          style={{ y: y1 }}
          animate={{ pathLength: [0, 1], opacity: [0, 0.2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Additional golden lines for depth */}
        <motion.path
          d="M -100 100 L 1100 100"
          stroke="rgba(255, 159, 67, 0.1)"
          strokeWidth="0.5"
          strokeDasharray="5 15"
          animate={{ x: [-100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M -100 900 L 1100 900"
          stroke="rgba(112, 0, 255, 0.1)"
          strokeWidth="0.5"
          strokeDasharray="5 15"
          animate={{ x: [0, -100] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </svg>
      
      {/* Volumetric Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-orange/5 rounded-full blur-[150px] mix-blend-screen animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[200px] mix-blend-screen" />
    </div>
  );
};

export default GlobalBackground;
