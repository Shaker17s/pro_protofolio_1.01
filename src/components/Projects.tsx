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
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className={`group relative flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center mb-40 lg:mb-72`}
    >
      {/* Immersive Image Container */}
      <motion.div 
        layoutId={`project-container-${project.title}`}
        onClick={() => onSelect(project)}
        className="relative flex-1 w-full aspect-video lg:aspect-[16/10] rounded-[3rem] overflow-hidden glass-artifact cursor-none group/img perspective-2500"
      >
        <motion.img
          layoutId={`project-image-${project.title}`}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-300 group-hover:scale-110"
        />

        {/* Cinematic Ripple Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-purple/0 via-accent-cyan/20 to-accent-pink/0 opacity-0 group-hover/img:opacity-100"
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Analyze Indicator */}
        <div className="absolute inset-0 bg-accent-purple/20 opacity-0 group-hover/img:opacity-100 transition-all duration-700 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="p-6 glass-artifact rounded-full border-accent-cyan/30 animate-pulse">
            <ArrowUpRight size={32} className="text-accent-cyan" />
          </div>
          <span className="text-[10px] font-mono tracking-[0.5em] text-white uppercase">Initialize Analysis</span>
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="flex-1 space-y-10 text-left">
        <div className="flex items-center gap-6">
          <div className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
          <span className="text-accent-purple font-mono text-xs tracking-[0.5em] uppercase opacity-70">Artifact 0{index + 1}</span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>
        
        <motion.h3 
          layoutId={`project-title-${project.title}`}
          className="text-6xl md:text-8xl font-heading font-black tracking-tighter leading-none group-hover:text-accent-cyan transition-colors duration-700"
        >
          {project.title}
        </motion.h3>
        
        <p className="text-2xl text-white/30 font-body leading-relaxed max-w-xl">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-4">
          {project.tech.map(t => (
            <span key={t} className="px-6 py-3 glass-artifact text-[10px] font-mono font-bold text-white/50 uppercase tracking-[0.2em] group-hover:text-accent-cyan transition-all duration-500">
              {t}
            </span>
          ))}
        </div>

        <button 
          onClick={() => onSelect(project)}
          className="flex items-center gap-6 group/btn text-xs font-heading font-black tracking-[0.4em] uppercase text-white/60 hover:text-white transition-colors"
        >
          Detailed Review <ArrowUpRight size={18} className="text-accent-purple group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform duration-500" />
        </button>
      </div>

      {/* Massive Background Decal */}
      <span className="absolute -bottom-20 -right-20 text-[25rem] font-heading font-black text-white/[0.01] pointer-events-none select-none -z-10 group-hover:text-accent-purple/[0.03] transition-all duration-1000">
        0{index + 1}
      </span>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="relative py-20 px-6 overflow-hidden">
      {/* Atmosphere Decor */}
      <div className="absolute top-1/2 left-0 -translate-x-1/2 w-[1000px] h-[1000px] bg-accent-purple/5 rounded-full blur-[250px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-40 lg:mb-64"
        >
          <div className="inline-block px-4 py-2 glass-artifact text-[10px] font-mono tracking-[0.4em] text-accent-cyan uppercase mb-8">
            Data Repository
          </div>
          <h2 className="text-8xl md:text-[12rem] font-heading font-black tracking-tighter leading-[0.85]">
            SELECTED <br />
            <span className="text-accent-purple italic font-light drop-shadow-2xl">ARTIFACTS.</span>
          </h2>
        </motion.div>

        <LayoutGroup>
          <div className="space-y-32">
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
