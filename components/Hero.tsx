
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Image */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#070909]/80 to-[#070909] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=90&w=2400" 
          alt="Luxury Interior" 
          className="w-full h-[120%] object-cover object-center grayscale-[20%]"
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        style={{ opacity, y: textY }}
        className="relative z-20 max-w-7xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center">
            <span className="text-[#1FAE9B] font-bold tracking-[1.2em] uppercase text-[9px] mb-8 opacity-80">
              Est. 2025 • High-End Studio
            </span>
            
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold leading-none mb-8 tracking-tight">
              Where Vision <br />
              <span className="italic text-[#1FAE9B]">Meets Reality</span>
            </h1>

            <div className="w-16 h-[1px] bg-white/20 mb-8" />

            <p className="max-w-2xl mx-auto text-sm md:text-base text-white/60 mb-12 font-light leading-relaxed tracking-wide px-4">
              Crafting atmospheres of profound distinction. Our studio merges architectural rigor with a curated aesthetic of modern luxury.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/interiorswala.in/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-12 py-5 bg-[#1FAE9B] text-white font-bold uppercase tracking-[0.4em] text-[10px] overflow-hidden"
              >
                <span className="relative z-10">View Portfolio</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 opacity-10" />
              </motion.a>
              <a 
                href="#ai-designer" 
                className="px-12 py-5 border border-white/10 text-white font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white/5 transition-all"
              >
                Consult AI
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex flex-col items-center gap-3 opacity-30"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
