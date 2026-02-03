
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Instagram, MessageSquare, Loader2 } from 'lucide-react';
import { DesignSuggestion, ContactFormData, StudioDetails } from '../types';

interface ContactFormProps {
  initialDesign?: DesignSuggestion | null;
  onSendMessage: (data: ContactFormData) => void;
  studioDetails: StudioDetails;
}

const ContactForm: React.FC<ContactFormProps> = ({ initialDesign, onSendMessage, studioDetails }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential',
    message: ''
  });

  useEffect(() => {
    if (initialDesign) {
      setFormData(prev => ({
        ...prev,
        message: `I would like to discuss the AI-generated ${initialDesign.style} concept.`
      }));
    }
  }, [initialDesign]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const newQuery: ContactFormData = {
      ...formData,
      id: `query-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: Date.now(),
      aiDesign: initialDesign || undefined,
      status: 'New'
    };
    
    onSendMessage(newQuery);
    
    setTimeout(() => {
      setIsSending(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', projectType: 'Residential', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="py-32 bg-[#0B0F0E]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="flex flex-col h-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
            >
              <h2 className="text-6xl font-serif font-bold mb-10 leading-tight">Start Your<br /><span className="text-[#1FAE9B]">Consultation</span></h2>
              <p className="text-[#B0B8B6] mb-16 text-lg font-light leading-relaxed max-w-md">
                Experience architectural excellence. Connect with our experts to transform your space.
              </p>
            </motion.div>

            <div className="space-y-8 flex-grow">
              <div className="flex gap-8 items-start group">
                <div className="p-4 bg-white/5 rounded-full border border-white/5 group-hover:bg-[#1FAE9B]/10 group-hover:border-[#1FAE9B]/30 transition-all duration-500">
                  <Mail className="text-[#1FAE9B]" size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1 text-[#1FAE9B]">Email</h4>
                  <a href={`mailto:${studioDetails.email}`} className="text-white font-medium hover:text-[#1FAE9B] transition-colors cursor-pointer block text-sm">{studioDetails.email}</a>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="p-4 bg-white/5 rounded-full border border-white/5 group-hover:bg-[#1FAE9B]/10 group-hover:border-[#1FAE9B]/30 transition-all duration-500">
                  <MessageSquare className="text-[#1FAE9B]" size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1 text-[#1FAE9B]">WhatsApp</h4>
                  <a href={studioDetails.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:text-[#1FAE9B] transition-colors cursor-pointer block text-sm">{studioDetails.phone}</a>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="p-4 bg-white/5 rounded-full border border-white/5 group-hover:bg-[#1FAE9B]/10 group-hover:border-[#1FAE9B]/30 transition-all duration-500">
                  <MapPin className="text-[#1FAE9B]" size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-1 text-[#1FAE9B]">Office HQ</h4>
                  <p className="text-white font-medium text-sm leading-relaxed">{studioDetails.address}</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-10 border-t border-white/5">
               <div className="flex gap-10">
                <a 
                  href={studioDetails.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/60 hover:text-[#1FAE9B] transition-all duration-500 group"
                >
                  <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key="success"
                  className="bg-[#111] p-12 rounded-3xl border border-white/5 text-center py-32"
                >
                  <CheckCircle className="text-[#1FAE9B] w-20 h-20 mx-auto mb-8" />
                  <h3 className="text-4xl font-serif font-bold mb-4 italic">Vision Submitted</h3>
                  <p className="text-[#B0B8B6] mb-10 font-light text-sm">Our studio vault has captured your request. Expect a response shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-[#1FAE9B] font-bold uppercase tracking-widest text-[9px] underline underline-offset-8"
                  >
                    Start New Request
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#111] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
                >
                  {initialDesign && (
                    <div className="mb-8 p-4 bg-[#1FAE9B]/5 border border-[#1FAE9B]/20 rounded-xl">
                      <p className="text-[8px] uppercase tracking-widest text-[#1FAE9B] font-black mb-1">Attached Concept</p>
                      <p className="text-xs text-white/70 font-medium italic">"{initialDesign.style}"</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold ml-1">Name</label>
                        <input required type="text" className="w-full bg-[#0B0F0E] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1FAE9B] transition-all text-sm" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold ml-1">Email</label>
                        <input required type="email" className="w-full bg-[#0B0F0E] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1FAE9B] transition-all text-sm" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold ml-1">Phone</label>
                        <input required type="tel" className="w-full bg-[#0B0F0E] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1FAE9B] transition-all text-sm" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold ml-1">Category</label>
                        <select className="w-full bg-[#0B0F0E] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1FAE9B] appearance-none cursor-pointer text-sm" value={formData.projectType} onChange={(e) => setFormData({...formData, projectType: e.target.value})}>
                          <option>Residential</option>
                          <option>Commercial</option>
                          <option>Hospitality</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold ml-1">Vision & Message</label>
                      <textarea required rows={4} className="w-full bg-[#0B0F0E] border border-white/5 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1FAE9B] resize-none transition-all font-light text-sm" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSending}
                      className="w-full py-5 bg-[#1FAE9B] text-white font-bold uppercase tracking-[0.4em] text-[10px] rounded-xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 shadow-xl disabled:opacity-50"
                    >
                      {isSending ? <Loader2 className="animate-spin" size={12} /> : <>Send Message <Send size={12} /></>}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
