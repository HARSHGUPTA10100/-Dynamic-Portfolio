export interface PortfolioData {
  id: string;
  template: 'template1' | 'template2';
  hero: HeroSection;
  about: AboutSection;
  skills: Skill[];
  services: Service[];
  portfolio: Project[];
  testimonials: Testimonial[];
  blog: BlogPost;
  contact: ContactInfo;
}

export interface HeroSection {
  name: string;
  title: string;
  tagline: string;
  profileImage: string;
}

export interface AboutSection {
  bio: string;
  email: string;
  phone: string;
  location: string;
  socials: SocialLinks;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  instagram?: string;
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface BlogPost {
  title: string;
  summary: string;
}

export interface ContactInfo {
  message: string;
  email: string;
  phone: string;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  image: string;
  location: string;
  experience: number;
  projects: number;
  rating: number;
}

export interface Template {
  id: 'template1' | 'template2';
  name: string;
  description: string;
  image: string;
  features: string[];
}
