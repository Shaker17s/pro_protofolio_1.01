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
        
        pulseParticles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.008;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.globalAlpha = 1.0;
          ctx.shadowBlur = 0;

          // Connections
          pulseParticles.forEach(p2 => {
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = p.color;
              ctx.globalAlpha = p.life * 0.15;
              ctx.stroke();
              ctx.globalAlpha = 1.0;
            }
          });
        });

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
