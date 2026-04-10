import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, ArrowRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  github: string;
}

interface ProjectCaseStudyProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-8 lg:p-12"
      >
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-2xl cursor-none" 
        />

        <motion.div
          layoutId={`project-container-${project.title}`}
          className="relative w-full max-w-7xl h-full bg-black border border-white/10 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row glass-artifact group"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 z-50 p-4 glass-artifact rounded-full hover:bg-white hover:text-black transition-all duration-500 hover:rotate-90 group/close"
          >
            <X size={24} />
          </button>

          {/* Core Visual */}
          <div className="flex-1 relative overflow-hidden">
            <motion.img
              layoutId={`project-image-${project.title}`}
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover lg:scale-110 group-hover:scale-100 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-12 left-12">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="flex gap-4"
               >
                 <a href={project.github} className="p-5 glass-artifact rounded-full hover:bg-white hover:text-black transition-all duration-500">
                    <Github size={24} />
                 </a>
                 <a href={project.link} className="p-5 glass-artifact rounded-full hover:bg-white hover:text-black transition-all duration-500">
                    <ExternalLink size={24} />
                 </a>
               </motion.div>
            </div>
          </div>

          {/* Artifact Intelligence */}
          <div className="flex-1 p-12 lg:p-20 overflow-y-auto custom-scrollbar flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <span className="text-accent-cyan font-mono text-sm tracking-[0.5em] uppercase opacity-50">Data Slab Analysis</span>
                <motion.h2 
                  layoutId={`project-title-${project.title}`}
                  className="text-6xl md:text-8xl font-heading font-black tracking-tighter leading-none"
                >
                  {project.title}
                </motion.h2>
              </div>

              <p className="text-2xl text-white/40 font-body leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-6">
                <h4 className="text-xs font-mono tracking-[0.4em] uppercase text-white/30">Technologies Deployed</h4>
                <div className="flex flex-wrap gap-4">
                  {project.tech.map(t => (
                    <span key={t} className="px-6 py-3 glass-artifact text-xs font-mono font-bold text-white/60 uppercase tracking-widest">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-12 border-t border-white/5">
                <button className="flex items-center gap-6 group/btn text-sm font-heading font-black tracking-[0.4em] uppercase">
                  Execute Live Stream <ArrowRight className="text-accent-purple group-hover/btn:translate-x-4 transition-transform duration-500" />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectCaseStudy;
