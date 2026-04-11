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

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 relative">
          {/* Connection Lines (DNA) */}
          <div className="absolute inset-0 pointer-events-none opacity-20 -z-10">
            <svg width="100%" height="100%" className="blur-[1px]">
                <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="0.5" strokeDasharray="5,5" />
                <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(255, 159, 67, 0.3)" strokeWidth="0.5" strokeDasharray="5,5" />
            </svg>
          </div>

          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03, duration: 0.4 }}
              whileHover={{ y: -8, borderColor: 'rgba(255, 159, 67, 0.6)', backgroundColor: 'rgba(255, 159, 67, 0.08)' }}
              className="glass-artifact rounded-2xl p-6 flex flex-col items-start gap-4 transition-all duration-500 group cursor-none overflow-hidden relative border border-white/10"
            >
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-accent-orange/30 blur-2xl rounded-full animate-pulse" />
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-accent-cyan/20 blur-lg rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                <skill.icon size={24} className="text-accent-cyan group-hover:text-accent-orange transition-colors duration-700 relative z-10" />
              </div>
              
              <span className="text-[11px] font-mono font-black tracking-[0.2em] text-white/50 group-hover:text-amber-100 transition-colors uppercase">{skill.name}</span>
              
              {/* Micro-Progress Bar */}
              <div className="w-full h-0.5 bg-white/5 mt-auto rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 2, delay: index * 0.1 }}
                    className="h-full bg-accent-cyan/40"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTech;
;
