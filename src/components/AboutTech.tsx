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
    <section className="relative py-32 px-6 overflow-hidden" id="about">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="inline-block px-4 py-1.5 glass-artifact text-[9px] font-mono tracking-[0.4em] text-accent-orange uppercase mb-8 rounded-full">
            Engineering Stack
          </div>
          <h2 className="text-5xl md:text-8xl font-heading font-black tracking-tighter leading-[0.85] mb-10 lens-reveal lens-reveal-cyan" data-text="SKILLS FOR IMPACT.">
            SKILLS <br />
            <span className="text-accent-purple italic font-light">FOR IMPACT.</span>
          </h2>
          
          <div className="space-y-8 text-xl text-white/40 leading-relaxed font-body max-w-lg">
            <p>
              Architecting at the edge of <span className="text-white">human-machine synthesis</span>. I build systems that don't just process data—they craft intelligence.
            </p>
            <div className="p-8 glass-artifact border-l-2 border-accent-purple bg-gradient-to-r from-accent-purple/5 to-transparent italic text-white/50 text-base leading-7 rounded-r-2xl">
              "Future engineering isn't about code complexity; it's about the elegance of the interface between logic and humanity."
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, duration: 0.4 }}
              whileHover={{ y: -5, borderColor: 'rgba(255, 159, 67, 0.4)', backgroundColor: 'rgba(255, 159, 67, 0.05)' }}
              className="glass-artifact rounded-2xl p-6 flex flex-col items-start gap-4 transition-all duration-300 group cursor-none border border-white/5 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-1 opacity-10 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-accent-orange/20 blur-xl rounded-full" />
              </div>
              <skill.icon size={20} className="text-accent-cyan group-hover:text-accent-orange transition-colors duration-500" />
              <span className="text-[10px] font-mono font-bold tracking-widest text-white/60 group-hover:text-white transition-colors uppercase">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTech;
;
