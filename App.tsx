
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import AIDesignAssistant from './components/AIDesignAssistant';
import ContactForm from './components/ContactForm';
import Scene3D from './components/Scene3D';
import AdminPanel from './components/AdminPanel';
import { motion, useScroll, useSpring, AnimatePresence, Variants } from 'framer-motion';
import { Lamp, Armchair, Ruler, LayoutGrid, Lock } from 'lucide-react';
import { DesignSuggestion, Project, ContactFormData, StudioDetails } from './types';

const INITIAL_PROJECTS: Project[] = [
  {
    id: "1",
    title: "The Zenith Residence",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=90&w=1600",
    description: "A masterclass in shadow and light, featuring bespoke Italian furnishings.",
    link: "https://www.instagram.com/interiorswala.in/"
  },
  {
    id: "2",
    title: "Emerald Plaza",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=90&w=1600",
    description: "Modernist corporate environments designed for peak inspiration."
  }
];

const DEFAULT_STUDIO: StudioDetails = {
  email: 'contact.interiorswala@gmail.com',
  phone: '+91 79808 72754',
  address: 'Champasari, Siliguri, India, 734003',
  instagram: 'https://www.instagram.com/interiorswala.in?igsh=N3ludzc2bDlnZXht',
  whatsapp: 'https://wa.me/917980872754'
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 1.4, 
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.2
    } 
  }
};

const SectionWrapper: React.FC<{ children: React.ReactNode, id: string, className?: string }> = ({ children, id, className }) => {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={revealVariants}
      className={`relative py-32 md:py-48 px-6 ${className}`}
    >
      {children}
    </motion.section>
  );
};

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authForm, setAuthForm] = useState({ user: '', pass: '' });
  
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('interiorswala_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch (e) {
      return INITIAL_PROJECTS;
    }
  });
  
  const [queries, setQueries] = useState<ContactFormData[]>(() => {
    try {
      const saved = localStorage.getItem('interiorswala_queries');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [studioDetails, setStudioDetails] = useState<StudioDetails>(() => {
    try {
      const saved = localStorage.getItem('interiorswala_studio');
      return saved ? JSON.parse(saved) : DEFAULT_STUDIO;
    } catch (e) {
      return DEFAULT_STUDIO;
    }
  });

  useEffect(() => {
    localStorage.setItem('interiorswala_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('interiorswala_queries', JSON.stringify(queries));
  }, [queries]);

  useEffect(() => {
    localStorage.setItem('interiorswala_studio', JSON.stringify(studioDetails));
  }, [studioDetails]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        setIsAuth(false);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 40,
    restDelta: 0.001
  });

  const [aiDesign, setAiDesign] = useState<DesignSuggestion | null>(null);

  const handleQuoteRequest = useCallback((design: DesignSuggestion) => {
    setAiDesign(design);
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSendMessage = useCallback((data: ContactFormData) => {
    setQueries(prev => [data, ...prev]);
  }, []);

  const handleUpdateQuery = useCallback((id: string, updates: Partial<ContactFormData>) => {
    setQueries(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  }, []);

  const handleUpdateProject = useCallback((updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (authForm.user === 'admin' && authForm.pass === 'admin1234') {
      setIsAuth(true);
      window.scrollTo(0,0);
    } else {
      alert("Invalid credentials. Access Denied.");
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    setIsAdmin(false);
    window.location.hash = ''; 
    window.scrollTo(0, 0);
  };

  const services = useMemo(() => [
    { icon: <Armchair size={20} />, title: "Curation", desc: "Sourcing singular artifacts of exceptional pedigree." },
    { icon: <Lamp size={20} />, title: "Lighting", desc: "Manipulating atmosphere through scientific optics." },
    { icon: <Ruler size={20} />, title: "Volume", desc: "Optimization of grand spatial experiences." },
    { icon: <LayoutGrid size={20} />, title: "Utility", desc: "Merging seamless tech with human intuition." }
  ], []);

  if (isAdmin && !isAuth) {
    return (
      <div className="min-h-screen bg-[#070909] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-[#0B0F0E] p-12 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#1FAE9B]/20" />
          <div className="flex flex-col items-center mb-12">
            <div className="p-4 bg-[#1FAE9B]/10 rounded-2xl mb-6">
              <Lock className="text-[#1FAE9B]" size={32} />
            </div>
            <h2 className="text-3xl font-serif font-bold italic">Studio <span className="text-[#1FAE9B]">Vault</span></h2>
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/20 mt-3 font-bold">Authorized Personnel Only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[8px] uppercase tracking-widest text-white/30 ml-1 font-bold">Identity</label>
              <input type="text" placeholder="Username" className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl focus:outline-none focus:border-[#1FAE9B] text-sm transition-all" value={authForm.user} onChange={e => setAuthForm({...authForm, user: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-[8px] uppercase tracking-widest text-white/30 ml-1 font-bold">Passphrase</label>
              <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl focus:outline-none focus:border-[#1FAE9B] text-sm transition-all" value={authForm.pass} onChange={e => setAuthForm({...authForm, pass: e.target.value})} />
            </div>
            <button type="submit" className="w-full py-5 bg-[#1FAE9B] text-white font-bold uppercase tracking-[0.4em] text-[10px] rounded-xl shadow-xl hover:bg-white hover:text-black transition-all mt-4">Verify Access</button>
            <button type="button" onClick={() => { window.location.hash = ''; }} className="w-full text-[9px] uppercase tracking-widest text-white/20 hover:text-[#1FAE9B] transition-colors py-2 font-bold">Return to Gallery</button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (isAdmin && isAuth) {
    return (
      <AdminPanel 
        onLogout={handleLogout}
        projects={projects}
        queries={queries}
        studioDetails={studioDetails}
        onUpdateStudioDetails={setStudioDetails}
        onAddProject={(p) => setProjects(prev => [...prev, p])}
        onUpdateProject={handleUpdateProject}
        onDeleteProject={(id) => setProjects(prev => prev.filter(p => p.id !== id))}
        onDeleteQuery={(id) => setQueries(prev => prev.filter(q => q.id !== id))}
        onUpdateQuery={handleUpdateQuery}
        onClearQueries={() => setQueries([])}
      />
    );
  }

  return (
    <div className="relative bg-[#070909] text-white font-sans selection:bg-[#1FAE9B] selection:text-white">
      <Scene3D />
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-[#1FAE9B] z-[100] origin-left" style={{ scaleX }} />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        
        <SectionWrapper id="services" className="bg-transparent overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div variants={revealVariants}>
                <span className="text-[10px] text-[#1FAE9B] font-bold uppercase tracking-[0.6em] block mb-8">Design Philosophy</span>
                <h2 className="text-5xl md:text-7xl font-serif font-bold italic mb-12 leading-tight">
                  Luxury is a <br /><span className="text-[#1FAE9B]">State of Mind.</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  {services.map((s, i) => (
                    <motion.div key={i} variants={revealVariants} className="space-y-4">
                      <div className="text-[#1FAE9B]">{s.icon}</div>
                      <h4 className="text-xl font-serif italic">{s.title}</h4>
                      <p className="text-white/40 text-[10px] uppercase tracking-widest leading-loose">{s.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={revealVariants} className="relative">
                 <div className="relative arch-top overflow-hidden aspect-[4/5] shadow-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
                      className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                      alt="Interior Detail"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070909] via-transparent to-transparent opacity-60" />
                 </div>
              </motion.div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper id="portfolio">
           <Portfolio projects={projects} />
        </SectionWrapper>
        
        <AIDesignAssistant onQuoteRequest={handleQuoteRequest} />
        
        <SectionWrapper id="contact">
           <ContactForm 
            initialDesign={aiDesign} 
            onSendMessage={handleSendMessage} 
            studioDetails={studioDetails} 
          />
        </SectionWrapper>
      </main>

      <footer className="py-32 border-t border-white/5 bg-[#050707] relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div>
              <img src="logo.png" alt="Logo" className="h-14 mb-8 mx-auto md:mx-0 opacity-80" />
              <p className="text-[9px] uppercase tracking-[0.6em] text-white/30 max-w-sm">
                Architecting the Future of Elite Living. Global Design Collective.
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-6 text-center md:text-right">
              <div className="flex gap-12 text-[10px] font-bold uppercase tracking-widest text-white/20">
                 <a href={studioDetails.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#1FAE9B] transition-colors">Instagram</a>
                 <a href={studioDetails.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#1FAE9B] transition-colors">WhatsApp</a>
              </div>
            </div>
          </div>
          <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-20 text-[8px] uppercase tracking-[0.4em]">
             <span>© 2025 Interiorswala</span>
             <span>{studioDetails.address.split(',')[0]}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
