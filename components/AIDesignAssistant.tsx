
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, Palette, Box, ArrowRight } from 'lucide-react';
import { getDesignSuggestions } from '../services/geminiService';
import { DesignSuggestion } from '../types';

interface AIDesignAssistantProps {
  onQuoteRequest: (design: DesignSuggestion) => void;
}

const AIDesignAssistant: React.FC<AIDesignAssistantProps> = ({ onQuoteRequest }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<DesignSuggestion | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const result = await getDesignSuggestions(prompt);
      setSuggestion(result);
    } catch (error) {
      console.error("AI Error:", error);
      alert("Something went wrong with the AI assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-designer" className="py-24 md:py-32 bg-[#0B0F0E] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1FAE9B]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1FAE9B]/10 rounded-full text-[#1FAE9B] mb-6"
          >
            <Sparkles size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">AI-Driven Innovation</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif font-bold mb-6 tracking-tight overflow-hidden"
          >
            AI Designer
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="text-[#B0B8B6] max-w-2xl mx-auto font-light leading-relaxed opacity-70 text-sm md:text-base"
          >
            Experience the future of architecture. Our AI engine generates curated concepts, palette names, and technical layouts instantly.
          </motion.p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          onSubmit={handleSubmit} 
          className="relative mb-12 md:mb-16 max-w-3xl mx-auto"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your dream space..."
            className="w-full bg-[#1FAE9B]/5 border border-white/10 rounded-xl py-5 md:py-6 px-6 md:px-8 text-white focus:outline-none focus:border-[#1FAE9B]/50 transition-all shadow-2xl placeholder:text-white/20 text-sm md:text-base"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-[#1FAE9B] rounded-lg text-white hover:bg-[#0E3F3A] transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          </button>
        </motion.form>

        <AnimatePresence mode="wait">
          {suggestion && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel rounded-2xl md:rounded-3xl p-6 md:p-16 border border-[#1FAE9B]/20 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                <div>
                  <div className="mb-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#1FAE9B] font-bold">Concept Output</span>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-4 italic">{suggestion.style}</h3>
                    <p className="text-[#B0B8B6] leading-relaxed font-light text-sm">{suggestion.description}</p>
                  </div>
                  
                  <div className="mb-8 md:mb-10">
                    <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-6 opacity-40">
                      <Palette size={14} /> Color Story
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 md:gap-6">
                      {suggestion.palette.map((color, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <div 
                            className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/10 shadow-lg transition-transform"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="text-center overflow-hidden w-full">
                            <span className="text-[8px] md:text-[9px] text-white font-bold uppercase block leading-tight truncate px-1">{color.name}</span>
                            <span className="text-[7px] md:text-[8px] text-[#B0B8B6] font-mono uppercase opacity-50">{color.hex}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-8 md:space-y-10">
                  <div>
                    <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-6 opacity-40">
                      <Box size={14} /> Design DNA
                    </h4>
                    <ul className="grid grid-cols-1 gap-3 md:gap-4">
                      {suggestion.keyElements.map((item, i) => (
                        <motion.li 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (i * 0.05) }}
                          className="flex items-start gap-4 text-[#B0B8B6] text-xs md:text-sm font-light"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1FAE9B] mt-1.5 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={() => onQuoteRequest(suggestion)}
                      className="w-full flex items-center justify-between px-6 md:px-8 py-4 md:py-5 bg-[#1FAE9B] text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-[11px] rounded-sm hover:bg-white hover:text-black transition-all group"
                    >
                      Realize Concept
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AIDesignAssistant;
