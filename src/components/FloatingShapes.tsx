import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FloatingShapes: React.FC = () => {
  const shapes = [
    { type: 'circle', size: 20, color: 'accent-cyan', delay: 0 },
    { type: 'square', size: 15, color: 'accent-purple', delay: 2 },
    { type: 'triangle', size: 25, color: 'accent-pink', delay: 4 },
    { type: 'circle', size: 18, color: 'accent-cyan', delay: 6 },
    { type: 'square', size: 12, color: 'accent-purple', delay: 8 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.color === 'accent-cyan' ? 'bg-accent-cyan/10' : shape.color === 'accent-purple' ? 'bg-accent-purple/10' : 'bg-accent-pink/10'} backdrop-blur-sm`}
          style={{
            width: shape.size,
            height: shape.size,
            borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'square' ? '0' : '0',
            clipPath: shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
          }}
          initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
          animate={{
            x: [null, Math.random() * window.innerWidth],
            y: [null, Math.random() * window.innerHeight],
            opacity: [0, 0.5, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;