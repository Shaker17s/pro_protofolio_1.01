import React, { useEffect, useRef } from 'react';

const ParticleMesh: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let particles: Particle[] = [];
    let pulses: Pulse[] = [];
    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000, lastX: 0, lastY: 0, vx: 0, vy: 0 };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    class Particle {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;

      constructor() {
        this.z = Math.random() * 2000;
        this.x = (Math.random() - 0.5) * canvas!.width * 2;
        this.y = (Math.random() - 0.5) * canvas!.height * 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 1.5 + 0.5;
        this.color = Math.random() > 0.5 ? '#7000FF' : '#00F0FF';
      }

      update() {
        this.z -= 0.1; // Hypnotically slow ambient movement
        if (this.z <= 1) this.z = 2000;

        const factor = 1000 / this.z;
        const sx = this.x * factor + canvas!.width / 2;
        const sy = this.y * factor + canvas!.height / 2;

        const dx = sx - mouse.x;
        const dy = sy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 300) {
          const force = (300 - dist) / 300;
          this.x += mouse.vx * force * 1.5;
          this.y += mouse.vy * force * 1.5;
        }

        this.x += (this.baseX - this.x) * 0.02;
        this.y += (this.baseY - this.y) * 0.02;
      }

      draw() {
        const factor = 1000 / this.z;
        const sx = this.x * factor + canvas!.width / 2;
        const sy = this.y * factor + canvas!.height / 2;
        const size = this.size * factor;

        if (sx < 0 || sx > canvas!.width || sy < 0 || sy > canvas!.height) return;

        ctx!.beginPath();
        ctx!.arc(sx, sy, size, 0, Math.PI * 2);
        ctx!.fillStyle = this.color;
        ctx!.globalAlpha = Math.min(1, factor * 0.5);
        ctx!.fill();
      }
    }

    class Pulse {
      p1: Particle;
      p2: Particle;
      progress: number;
      speed: number;

      constructor(p1: Particle, p2: Particle) {
        this.p1 = p1;
        this.p2 = p2;
        this.progress = 0;
        this.speed = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.progress += this.speed;
        return this.progress < 1;
      }

      draw() {
        const factor1 = 1000 / this.p1.z;
        const sx1 = this.p1.x * factor1 + canvas!.width / 2;
        const sy1 = this.p1.y * factor1 + canvas!.height / 2;

        const factor2 = 1000 / this.p2.z;
        const sx2 = this.p2.x * factor2 + canvas!.width / 2;
        const sy2 = this.p2.y * factor2 + canvas!.height / 2;

        const x = sx1 + (sx2 - sx1) * this.progress;
        const y = sy1 + (sy2 - sy1) * this.progress;

        ctx!.beginPath();
        ctx!.arc(x, y, 2, 0, Math.PI * 2);
        ctx!.fillStyle = '#FFF';
        ctx!.globalAlpha = Math.sin(this.progress * Math.PI) * 0.8;
        ctx!.fill();
        
        // Glow
        ctx!.shadowBlur = 10;
        ctx!.shadowColor = this.p1.color;
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    const init = () => {
      particles = Array.from({ length: 400 }, () => new Particle());
      pulses = [];
    };

    const animate = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Connections and Pulse Generation
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i += 4) {
        for (let j = i + 1; j < particles.length; j += 4) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          const factor1 = 1000 / p1.z;
          const sx1 = p1.x * factor1 + canvas.width / 2;
          const sy1 = p1.y * factor1 + canvas.height / 2;

          const factor2 = 1000 / p2.z;
          const sx2 = p2.x * factor2 + canvas.width / 2;
          const sy2 = p2.y * factor2 + canvas.height / 2;

          const dx = sx1 - sx2;
          const dy = sy1 - sy2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(sx1, sy1);
            ctx.lineTo(sx2, sy2);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (1 - dist / 150) * 0.08;
            ctx.stroke();

            // Randomly generate pulses
            if (Math.random() < 0.001) {
              pulses.push(new Pulse(p1, p2));
            }
          }
        }
      }

      pulses = pulses.filter(pulse => {
        const active = pulse.update();
        if (active) pulse.draw();
        return active;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.vx = e.clientX - mouse.lastX;
      mouse.vy = e.clientY - mouse.lastY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ background: '#000' }}
    />
  );
};

export default ParticleMesh;
