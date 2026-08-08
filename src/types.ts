import { ReactNode } from 'react';

export interface NavLink {
  name: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon: ReactNode;
  size?: 'small' | 'large';
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  image: string;
  domain?: string;
  status?: string;
  featured?: boolean;
  liveLink?: string;
  caseStudyLink?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Programming' | 'Technical' | 'Microsoft';
}

export interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  description: string;
  type: 'education' | 'experience';
}
