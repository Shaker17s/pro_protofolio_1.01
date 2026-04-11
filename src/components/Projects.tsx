import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import ProjectCaseStudy from './ProjectCaseStudy';

const projects = [
  {
    title: 'Full-Stack Django Bookstore',
    description: 'A complete e-commerce ecosystem with secure authentication, multi-vendor support, and Stripe integration. Engineered for hyper-growth.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1200',
    tech: ['Django', 'PostgreSQL', 'Stripe', 'Redis'],
    link: '#',
    github: '#'
  },
  {
    title: 'Air Canvas: Computer Vision',
    description: 'Transcending physical limits with gesture-based art. Built using MediaPipe and OpenCV, this tool transforms hand motions into digital reality in real-time.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    link: '#',
    github: '#'
  },
  {
    title: 'AI Interview Copilot',
    description: 'An LLM-powered runtime assistant that provides intelligent prompts and contextual guidance for technical interviews. Your secret edge.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
    tech: ['Next.js', 'OpenAI', 'Gemini Pro', 'WebRTC'],
    link: '#',
    github: '#'
  }
];

const ProjectCard = ({ project, index, onSelect }: { project: typeof projects[0], index: number, onSelect: (p: any) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`group relative flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center mb-20 lg:mb-32`}
    >
      {/* Refined Image Container */}
      <motion.div 
        layoutId={`project-container-${project.title}`}
        onClick={() => onSelect(project)}
        className="relative flex-1 w-full max-w-xl aspect-[16/9] rounded-2xl overflow-hidden glass-artifact cursor-none group/img shadow-2xl"
      >
        <motion.img
          layoutId={`project-image-${project.title}`}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale brightness-50 group-hover/img:grayscale-0 group-hover/img:brightness-100 transition-all duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        
        {/* Minimal Indicator */}
        <div className="absolute top-4 right-4 p-3 glass-artifact rounded-full opacity-0 group-hover/img:opacity-100 transition-all duration-300">
          <ArrowUpRight size={20} className="text-accent-cyan" />
        </div>
      </motion.div>

      {/* Compact Content Container */}
      <div className="flex-1 space-y-6 max-w-lg">
        <div className="flex items-center gap-4">
          <span className="text-accent-purple font-mono text-[10px] tracking-[0.4em] uppercase opacity-60">Artifact 0{index + 1}</span>
          <div className="h-[1px] w-12 bg-accent-purple/30" />
        </div>
        
        <motion.h3 
          layoutId={`project-title-${project.title}`}
          className="text-3xl md:text-5xl font-heading font-black tracking-tighter leading-tight"
        >
          {project.title}
        </motion.h3>
        
        <p className="text-base text-white/40 font-body leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="px-4 py-1.5 glass-artifact text-[9px] font-mono font-medium text-white/40 uppercase tracking-[0.1em] rounded-full">
              {t}
            </span>
          ))}
        </div>

        <button 
          onClick={() => onSelect(project)}
          className="magnetic group flex items-center gap-4 text-[10px] font-heading font-bold tracking-[0.3em] uppercase text-accent-cyan hover:text-white transition-colors"
        >
          Analysis Ready <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center lg:text-left"
        >
          <div className="inline-block px-4 py-1.5 glass-artifact text-[9px] font-mono tracking-[0.4em] text-accent-cyan uppercase mb-6 rounded-full">
            Data Repository
          </div>
          <h2 className="text-5xl md:text-[8rem] font-heading font-black tracking-tighter leading-[0.85] lens-reveal lens-reveal-purple" data-text="SELECTED ARTIFACTS.">
            SELECTED <br />
            <span className="text-accent-purple italic font-light">ARTIFACTS.</span>
          </h2>
        </motion.div>

        <LayoutGroup>
          <div className="space-y-32 lg:space-y-48">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} onSelect={setSelectedProject} />
            ))}
          </div>
        </LayoutGroup>
      </div>

      <ProjectCaseStudy 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;
