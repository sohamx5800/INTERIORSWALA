
export interface ColorInfo {
  name: string;
  hex: string;
}

export interface DesignSuggestion {
  style: string;
  palette: ColorInfo[];
  description: string;
  keyElements: string[];
  furnitureIdeas: string[];
}

export interface StudioDetails {
  email: string;
  phone: string;
  address: string;
  instagram: string;
  whatsapp: string;
}

export interface ContactFormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  timestamp: number;
  aiDesign?: DesignSuggestion;
  status?: 'New' | 'In Progress' | 'Completed';
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  link?: string;
}
