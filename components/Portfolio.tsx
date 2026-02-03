
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface PortfolioProps {
  projects: Project[];
}

const Portfolio: React.FC<PortfolioProps> = ({ projects }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center text-center px-6"
        >
          <span className="text-[10px] text-[#1FAE9B] font-bold uppercase tracking-[0.6em] mb-6">Archive</span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold italic mb-8">Selected <span className="text-white/40">Portfolio</span></h2>
          <div className="w-12 h-[1px] bg-[#1FAE9B]/30" />
        </motion.div>
      </div>

      <div className="space-y-40 md:space-y-64 px-6">
        {projects.map((project, index) => (
          /* Fix: Using key prop on a component requires the component to be properly typed for React props */
          <PortfolioSection key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

/* Fix: Explicitly type PortfolioSection as React.FC to handle React-specific props like 'key' */
const PortfolioSection: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-3/5 relative group"
      >
        <div className="relative aspect-[16/10] overflow-hidden arch-top shadow-2xl">
          <motion.img 
            src={project.image} 
            alt={project.title}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 3 }}
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
        </div>
        
        <div className={`absolute -bottom-6 ${isEven ? '-right-6' : '-left-6'} bg-[#1FAE9B] p-6 md:p-8 hidden md:block shadow-2xl`}>
           <ArrowUpRight size={24} className="text-white" />
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="w-full md:w-2/5 flex flex-col items-start"
      >
        <span className="text-[#1FAE9B] font-bold uppercase tracking-[0.4em] text-[9px] mb-6">{project.category}</span>
        <h3 className="text-4xl md:text-5xl font-serif font-bold italic mb-6 leading-tight">{project.title}</h3>
        <p className="text-white/50 text-sm md:text-base font-light leading-relaxed mb-10 max-w-md italic">
          "{project.description}"
        </p>
        
        {project.link ? (
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-4 group bg-[#1FAE9B]/10 px-6 py-4 rounded-full hover:bg-[#1FAE9B] hover:text-white transition-all duration-500"
          >
            Explore Experience
            <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        ) : (
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-4 group opacity-50">
            Case Study Private
            <div className="w-8 h-[1px] bg-white/20" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Portfolio;
