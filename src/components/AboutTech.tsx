import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Cpu, Code, Brain, Zap, Terminal, Layers } from 'lucide-react';

const skills = [
  { name: 'Python', icon: <Code />, color: '#7000FF', glow: 'volumetric-glow-purple' },
  { name: 'React', icon: <Zap />, color: '#00F0FF', glow: 'volumetric-glow-cyan' },
  { name: 'LLMs', icon: <Brain />, color: '#7000FF', glow: 'volumetric-glow-purple' },
  { name: 'Systems', icon: <Cpu />, color: '#00F0FF', glow: 'volumetric-glow-cyan' },
];

const TiltCard = ({ skill }: { skill: typeof skills[0] }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={`relative h-64 w-full glass-artifact p-8 flex flex-col items-center justify-center gap-6 cursor-none hover:border-white/20 ${skill.glow}`}
    >
      <motion.div
        style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }}
        className="flex flex-col items-center gap-6"
      >
        <div style={{ color: skill.color }} className="opacity-80 group-hover:opacity-100 transition-opacity">
          {React.cloneElement(skill.icon as React.ReactElement, { size: 48 })}
        </div>
        <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-white/30">
          {skill.name}
        </span>
      </motion.div>

      {/* Internal Glitch Elements */}
      <div className="absolute top-6 right-6 w-1 h-1 bg-accent-cyan/40 rounded-full animate-pulse" />
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-accent-purple/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
    </motion.div>
  );
};

const AboutTech: React.FC = () => {
  return (
    <section className="relative py-40 px-6 overflow-hidden" id="about">
      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-[200px] -z-10" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="inline-block px-4 py-1.5 glass-artifact text-[10px] font-mono tracking-[0.4em] text-accent-purple uppercase mb-10">
            Cognitive Layer
          </div>
          <h2 className="text-7xl md:text-9xl font-heading font-black tracking-tighter leading-[0.85] mb-12">
            THE ARCHITECTURE <br />
            <span className="text-accent-purple italic font-light drop-shadow-2xl">OF INTUITION.</span>
          </h2>
          
          <div className="space-y-8 text-2xl text-white/30 leading-relaxed font-body max-w-xl">
            <p>
              I bridge the gap between raw compute and human experience. My work focuses on building <span className="text-white">non-binary interactions</span>—where code doesn't just execute, it anticipates.
            </p>
            <div className="p-10 glass-artifact border-l-4 border-accent-purple italic text-white/60 text-lg">
              "We aren't just building tools; we're engineering the next evolution of human capability."
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 perspective-2500">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <TiltCard skill={skill} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTech;
;
