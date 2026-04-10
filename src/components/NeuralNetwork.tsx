import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NeuralNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let pulseParticles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];
    
    const handleTrigger = () => {
      setIsActive(true);
      createPulse();
      
      // Auto-deactivate after 6 seconds
      setTimeout(() => {
        setIsActive(false);
      }, 6000);
    };

    window.addEventListener('triggerNeuralPulse', handleTrigger);

    const createPulse = () => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      for (let i = 0; i < 300; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 1; // Slower ambient burst
        pulseParticles.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          color: Math.random() > 0.5 ? '#b026ff' : '#00f6ff'
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isActive || pulseParticles.length > 0) {
        pulseParticles = pulseParticles.filter(p => p.life > 0);
        
        // Batch particles for faster processing
        const particleCount = pulseParticles.length;
        
        for (let i = 0; i < particleCount; i++) {
          const p = pulseParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.008;

          // Faster drawing: No shadowBlur here
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life * 0.8;
          ctx.fill();

          // Optimize connections: only check a subset or skip nearby frames
          // To keep O(n^2) but make it faster, we only check every 2nd or 3rd particle
          // or simply keep it but ensure no external expensive operations inside.
          for (let j = i + 1; j < particleCount; j++) {
            const p2 = pulseParticles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distSq = dx * dx + dy * dy; // Use squared distance for speed
            
            if (distSq < 6400) { // 80 * 80
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = p.life * 0.1;
              ctx.stroke();
            }
          }
        }

        if (isActive) {
          ctx.font = 'bold 12px "Fira Code"';
          ctx.fillStyle = 'white';
          ctx.globalAlpha = 0.2;
          ctx.textAlign = 'center';
          ctx.fillText("NEURAL LINK SYNCHRONIZED // SYSTEM OPTIMIZED", window.innerWidth/2, window.innerHeight/2 + 100);
          ctx.globalAlpha = 1.0;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('triggerNeuralPulse', handleTrigger);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[100] transition-opacity duration-1000 ${isActive || isActive ? 'opacity-100' : 'opacity-0'}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default NeuralNetwork;
