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
  image: string;
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
