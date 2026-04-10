import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layers, Zap, Terminal, Cpu, Brain, Palette, Move, GitBranch, Database } from 'lucide-react';

const skills = [
  { name: 'Python', icon: Code },
  { name: 'Django', icon: Layers },
  { name: 'React', icon: Zap },
  { name: 'TypeScript', icon: Terminal },
  { name: 'OpenCV', icon: Cpu },
  { name: 'Prompt Engineering', icon: Brain },
  { name: 'LLM Fine-Tuning', icon: Brain },
  { name: 'Tailwind', icon: Palette },
  { name: 'Framer Motion', icon: Move },
  { name: 'GSAP', icon: Zap },
  { name: 'Git', icon: GitBranch },
  { name: 'SQL', icon: Database },
];

const AboutTech: React.FC = () => {
  return (
    <section className="relative py-20 px-6 overflow-hidden" id="about">
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

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="glass-artifact rounded-full px-4 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors cursor-none"
            >
              <skill.icon size={16} className="text-accent-cyan" />
              <span className="text-xs font-mono text-white/70">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTech;
;
