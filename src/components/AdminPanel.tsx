
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  LogOut, 
  Trash2, 
  Plus, 
  ExternalLink, 
  MessageSquare, 
  History,
  AtSign,
  PhoneCall,
  Calendar,
  Sparkles,
  Palette,
  Edit2,
  CheckCircle2,
  Clock,
  Settings,
  MapPin,
  Share2
} from 'lucide-react';
import { Project, ContactFormData, StudioDetails } from '../types';

interface AdminPanelProps {
  onLogout: () => void;
  projects: Project[];
  queries: ContactFormData[];
  studioDetails: StudioDetails;
  onUpdateStudioDetails: (details: StudioDetails) => void;
  onAddProject: (project: Project) => void;
  onUpdateProject?: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onDeleteQuery: (id: string) => void;
  onUpdateQuery?: (id: string, updates: Partial<ContactFormData>) => void;
  onClearQueries: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  onLogout, 
  projects, 
  queries, 
  studioDetails,
  onUpdateStudioDetails,
  onAddProject, 
  onUpdateProject,
  onDeleteProject, 
  onDeleteQuery,
  onUpdateQuery,
  onClearQueries
}) => {
  const [activeTab, setActiveTab] = useState<'queries' | 'portfolio' | 'studio'>('queries');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    category: 'Residential',
    image: '',
    description: '',
    link: ''
  });

  const [localStudio, setLocalStudio] = useState<StudioDetails>(studioDetails);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
        onUpdateProject?.({ ...editingProject });
        setEditingProject(null);
        setShowAddModal(false);
    } else if (newProject.title && newProject.image) {
      onAddProject({
        ...newProject,
        id: `project-${Date.now()}`,
      } as Project);
      setNewProject({ title: '', category: 'Residential', image: '', description: '', link: '' });
      setShowAddModal(false);
    }
  };

  const handleStudioUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStudioDetails(localStudio);
    alert("Studio details updated successfully.");
  };

  const toggleQueryStatus = (id: string, currentStatus?: string) => {
    const nextStatus = currentStatus === 'New' ? 'In Progress' : currentStatus === 'In Progress' ? 'Completed' : 'New';
    onUpdateQuery?.(id, { status: nextStatus as any });
  };

  return (
    <div className="min-h-screen bg-[#070909] text-white font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-80 bg-[#0B0F0E] border-r border-white/5 p-8 flex flex-col justify-between">
        <div>
          <div className="flex flex-col gap-6 mb-16">
            <img 
              src="logo.png" 
              alt="Interiorswala" 
              className="h-12 w-auto object-contain self-start opacity-90 transition-opacity hover:opacity-100"
            />
            <div className="flex flex-col">
              <h1 className="text-xl font-serif font-bold italic leading-tight">Admin <span className="text-[#1FAE9B]">Vault</span></h1>
              <p className="text-[8px] uppercase tracking-[0.4em] text-white/20 mt-2 font-bold">Authorized Studio Management</p>
            </div>
          </div>

          <nav className="space-y-4">
            <button 
              onClick={() => setActiveTab('queries')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'queries' ? 'bg-[#1FAE9B] text-white shadow-lg shadow-[#1FAE9B]/20' : 'text-white/40 hover:bg-white/5'}`}
            >
              <MessageSquare size={18} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Client Queries</span>
              {queries.length > 0 && <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-full text-[8px]">{queries.length}</span>}
            </button>
            <button 
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'portfolio' ? 'bg-[#1FAE9B] text-white shadow-lg shadow-[#1FAE9B]/20' : 'text-white/40 hover:bg-white/5'}`}
            >
              <ImageIcon size={18} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Portfolio Mgmt</span>
            </button>
            <button 
              onClick={() => setActiveTab('studio')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all ${activeTab === 'studio' ? 'bg-[#1FAE9B] text-white shadow-lg shadow-[#1FAE9B]/20' : 'text-white/40 hover:bg-white/5'}`}
            >
              <Settings size={18} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Studio Info</span>
            </button>
          </nav>
        </div>

        <div className="space-y-4 mt-12 md:mt-0">
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
            <h4 className="text-[8px] uppercase tracking-widest font-bold text-white/40 mb-2">System Status</h4>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[9px] uppercase tracking-wider text-[#1FAE9B]">Operational</span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-bold"
          >
            <LogOut size={18} />
            <span className="text-[10px] uppercase tracking-[0.2em]">Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="text-[10px] text-[#1FAE9B] font-bold uppercase tracking-[0.5em] mb-4 block">Dashboard / {activeTab}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold italic capitalize leading-none">
              {activeTab === 'queries' ? 'Client Consultations' : activeTab === 'portfolio' ? 'Portfolio Masterpieces' : 'Studio Configuration'}
            </h2>
          </div>
          
          <div className="flex gap-4">
            {activeTab === 'queries' && queries.length > 0 && (
              <button 
                onClick={() => { if(confirm("Clear all consultation history?")) onClearQueries(); }}
                className="flex items-center gap-3 px-6 py-4 bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] uppercase tracking-[0.3em] font-black hover:bg-red-500 hover:text-white transition-all rounded-lg"
              >
                <History size={14} /> Clear History
              </button>
            )}
            {activeTab === 'portfolio' && (
              <button 
                onClick={() => {
                  setNewProject({ title: '', category: 'Residential', image: '', description: '', link: '' });
                  setEditingProject(null);
                  setShowAddModal(true);
                }}
                className="flex items-center gap-3 px-8 py-4 bg-white text-black text-[9px] uppercase tracking-[0.3em] font-black hover:bg-[#1FAE9B] hover:text-white transition-all shadow-xl rounded-lg"
              >
                <Plus size={16} /> Add Masterpiece
              </button>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8">
          {activeTab === 'queries' && (
            <div className="space-y-8">
              {queries.length === 0 ? (
                <div className="py-32 text-center opacity-30 border-2 border-white/5 border-dashed rounded-3xl flex flex-col items-center">
                  <History size={64} className="mb-6 opacity-20" />
                  <p className="text-xs uppercase tracking-[0.4em] font-bold">Vault is currently empty</p>
                </div>
              ) : (
                queries.map((query) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={query.id} 
                    className="bg-[#0B0F0E] border border-white/5 rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between gap-6 bg-gradient-to-r from-white/[0.02] to-transparent">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <h4 className="text-2xl font-serif font-bold">{query.name}</h4>
                          <span className={`text-[8px] uppercase tracking-widest px-4 py-1.5 rounded-full font-black shadow-lg ${
                            query.status === 'Completed' ? 'bg-green-500/20 text-green-500' : 
                            query.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-500' : 
                            'bg-[#1FAE9B] text-white'
                          }`}>
                            {query.status || 'New'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                          <span className="flex items-center gap-2"><AtSign size={12} className="text-[#1FAE9B]" /> {query.email}</span>
                          <span className="flex items-center gap-2"><PhoneCall size={12} className="text-[#1FAE9B]" /> {query.phone}</span>
                          <span className="flex items-center gap-2"><Calendar size={12} className="text-[#1FAE9B]" /> {new Date(query.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleQueryStatus(query.id, query.status)}
                          className="p-3 bg-white/5 text-white/40 hover:text-[#1FAE9B] hover:bg-[#1FAE9B]/10 rounded-xl transition-all"
                          title="Update Status"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => onDeleteQuery(query.id)}
                          className="p-3 text-white/10 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-1 border-r border-white/5 pr-8">
                        <h5 className="text-[8px] uppercase tracking-[0.4em] text-[#1FAE9B] font-bold mb-4">Message:</h5>
                        <p className="text-sm text-white/70 italic font-light leading-relaxed">
                          "{query.message}"
                        </p>
                      </div>

                      {query.aiDesign && (
                        <div className="lg:col-span-2">
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles size={14} className="text-[#1FAE9B]" />
                            <h5 className="text-[8px] uppercase tracking-[0.4em] text-[#1FAE9B] font-bold">Attached AI Concept:</h5>
                          </div>
                          <div className="bg-white/[0.03] rounded-2xl p-6 border border-[#1FAE9B]/10">
                            <h6 className="text-xl font-serif italic mb-2">{query.aiDesign.style}</h6>
                            <p className="text-xs text-white/50 mb-6 leading-relaxed">{query.aiDesign.description}</p>
                            
                            <div className="flex flex-wrap gap-4">
                              {query.aiDesign.palette.map((color, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color.hex }} />
                                  <span className="text-[8px] uppercase tracking-widest font-bold opacity-60">{color.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects.map((project) => (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={project.id} 
                  className="bg-[#0B0F0E] border border-white/5 rounded-2xl overflow-hidden group flex shadow-xl"
                >
                  <div className="w-40 md:w-56 bg-[#111] overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                  </div>
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] text-[#1FAE9B] font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                      <h4 className="text-2xl font-serif font-bold mb-3">{project.title}</h4>
                      {project.link && (
                        <a href={project.link} target="_blank" className="text-[#1FAE9B]/60 text-[8px] uppercase font-black flex items-center gap-2 hover:text-[#1FAE9B] transition-colors">
                          <ExternalLink size={10}/> Link
                        </a>
                      )}
                    </div>
                    <div className="flex gap-4 mt-8">
                      <button 
                        onClick={() => {
                          setEditingProject({ ...project });
                          setShowAddModal(true);
                        }}
                        className="flex items-center gap-2 text-white/20 hover:text-[#1FAE9B] text-[8px] uppercase tracking-widest font-bold transition-all"
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                      <button 
                        onClick={() => onDeleteProject(project.id)}
                        className="flex items-center gap-2 text-red-500/20 hover:text-red-500 text-[8px] uppercase tracking-widest font-bold transition-all"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'studio' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0B0F0E] border border-white/5 rounded-3xl p-12 max-w-3xl shadow-2xl"
            >
              <form onSubmit={handleStudioUpdate} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#1FAE9B] font-black">
                      <AtSign size={14} /> Public Email
                    </label>
                    <input 
                      required 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#1FAE9B] outline-none transition-all"
                      value={localStudio.email}
                      onChange={e => setLocalStudio({...localStudio, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#1FAE9B] font-black">
                      <PhoneCall size={14} /> Business Phone
                    </label>
                    <input 
                      required 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#1FAE9B] outline-none transition-all"
                      value={localStudio.phone}
                      onChange={e => setLocalStudio({...localStudio, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#1FAE9B] font-black">
                    <MapPin size={14} /> Studio Address
                  </label>
                  <input 
                    required 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#1FAE9B] outline-none transition-all"
                    value={localStudio.address}
                    onChange={e => setLocalStudio({...localStudio, address: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#1FAE9B] font-black">
                      <Share2 size={14} /> Instagram Link
                    </label>
                    <input 
                      required 
                      type="url" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#1FAE9B] outline-none transition-all"
                      value={localStudio.instagram}
                      onChange={e => setLocalStudio({...localStudio, instagram: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-[#1FAE9B] font-black">
                      <MessageSquare size={14} /> WhatsApp Link
                    </label>
                    <input 
                      required 
                      type="url" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#1FAE9B] outline-none transition-all"
                      value={localStudio.whatsapp}
                      onChange={e => setLocalStudio({...localStudio, whatsapp: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                   <button type="submit" className="px-12 py-5 bg-[#1FAE9B] text-white font-bold uppercase tracking-[0.4em] text-[10px] rounded-xl hover:bg-white hover:text-black transition-all shadow-xl shadow-[#1FAE9B]/10">
                    Save Studio Profile
                   </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </main>

      {/* Add/Edit Project Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-[#0B0F0E] border border-white/10 rounded-3xl p-12 shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-[#1FAE9B]" />
              <h3 className="text-3xl font-serif font-bold mb-8 italic">
                {editingProject ? 'Edit' : 'Add New'} <span className="text-[#1FAE9B]">Masterpiece</span>
              </h3>
              <form onSubmit={handleAddProject} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold ml-1">Project Title</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#1FAE9B] outline-none transition-all" 
                    value={editingProject ? editingProject.title : newProject.title} 
                    onChange={e => editingProject ? setEditingProject({...editingProject, title: e.target.value}) : setNewProject({...newProject, title: e.target.value})} 
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold ml-1">Category</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#1FAE9B] outline-none transition-all appearance-none cursor-pointer" 
                      value={editingProject ? editingProject.category : newProject.category} 
                      onChange={e => editingProject ? setEditingProject({...editingProject, category: e.target.value}) : setNewProject({...newProject, category: e.target.value})}
                    >
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Hospitality</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold ml-1">Image URL</label>
                    <input required type="url" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#1FAE9B] outline-none transition-all" 
                      value={editingProject ? editingProject.image : newProject.image} 
                      onChange={e => editingProject ? setEditingProject({...editingProject, image: e.target.value}) : setNewProject({...newProject, image: e.target.value})} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold ml-1">External Link</label>
                  <input type="url" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-[#1FAE9B] outline-none transition-all" 
                    value={editingProject ? (editingProject.link || '') : (newProject.link || '')} 
                    onChange={e => editingProject ? setEditingProject({...editingProject, link: e.target.value}) : setNewProject({...newProject, link: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-white/30 font-bold ml-1">Brief Description</label>
                  <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm resize-none focus:border-[#1FAE9B] outline-none transition-all" 
                    value={editingProject ? editingProject.description : newProject.description} 
                    onChange={e => editingProject ? setEditingProject({...editingProject, description: e.target.value}) : setNewProject({...newProject, description: e.target.value})} 
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 py-5 bg-[#1FAE9B] text-white font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-white hover:text-black transition-all">
                    {editingProject ? 'Save Changes' : 'Add to Gallery'}
                  </button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-8 py-5 border border-white/10 text-white font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-white/5">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
