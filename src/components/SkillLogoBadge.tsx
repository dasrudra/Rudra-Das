import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export const getSkillIconDetails = (skill: string) => {
  const s = skill.toLowerCase();
  
  if (s.includes('python')) return { logo: 'https://cdn.simpleicons.org/python' };
  if (s.includes('react')) return { logo: 'https://cdn.simpleicons.org/react' };
  if (s.includes('typescript')) return { logo: 'https://cdn.simpleicons.org/typescript' };
  if (s.includes('javascript') || s.includes('js')) return { logo: 'https://cdn.simpleicons.org/javascript' };
  if (s.includes('sap') || s.includes('abap')) return { logo: 'https://cdn.simpleicons.org/sap' };
  if (s.includes('odoo')) return { logo: 'https://cdn.simpleicons.org/odoo' };
  if (s.includes('tailwind')) return { logo: 'https://cdn.simpleicons.org/tailwindcss' };
  if (s.includes('fastapi')) return { logo: 'https://cdn.simpleicons.org/fastapi' };
  if (s.includes('flask')) return { logo: 'https://cdn.simpleicons.org/flask/FFFFFF' };
  if (s.includes('docker')) return { logo: 'https://cdn.simpleicons.org/docker' };
  if (s.includes('tensorflow')) return { logo: 'https://cdn.simpleicons.org/tensorflow' };
  if (s.includes('pytorch')) return { logo: 'https://cdn.simpleicons.org/pytorch' };
  if (s.includes('opencv') || s.includes('computer vision') || s.includes('yolo')) return { logo: 'https://cdn.simpleicons.org/opencv' };
  if (s.includes('github') || s.includes('git')) return { logo: 'https://cdn.simpleicons.org/github/FFFFFF' };
  if (s.includes('postgres')) return { logo: 'https://cdn.simpleicons.org/postgresql' };
  if (s.includes('mysql')) return { logo: 'https://cdn.simpleicons.org/mysql' };
  if (s.includes('sqlite')) return { logo: 'https://cdn.simpleicons.org/sqlite' };
  if (s.includes('sql') || s.includes('database') || s.includes('relational')) return { logo: 'https://cdn.simpleicons.org/postgresql' };
  if (s.includes('html')) return { logo: 'https://cdn.simpleicons.org/html5' };
  if (s.includes('css')) return { logo: 'https://cdn.simpleicons.org/css3' };
  if (s.includes('langchain')) return { logo: 'https://cdn.simpleicons.org/langchain' };
  if (s.includes('pytest')) return { logo: 'https://cdn.simpleicons.org/pytest' };
  if (s.includes('scikit') || s.includes('sklearn')) return { logo: 'https://cdn.simpleicons.org/scikitlearn' };
  if (s.includes('pandas')) return { logo: 'https://cdn.simpleicons.org/pandas' };
  if (s.includes('numpy')) return { logo: 'https://cdn.simpleicons.org/numpy' };
  if (s.includes('kaggle')) return { logo: 'https://cdn.simpleicons.org/kaggle' };
  if (s.includes('meta')) return { logo: 'https://cdn.simpleicons.org/meta' };
  if (s.includes('bootstrap')) return { logo: 'https://cdn.simpleicons.org/bootstrap' };
  if (s.includes('chrome') || s.includes('extension')) return { logo: 'https://cdn.simpleicons.org/googlechrome' };
  if (s.includes('vite')) return { logo: 'https://cdn.simpleicons.org/vite' };
  if (s.includes('n8n')) return { logo: 'https://cdn.simpleicons.org/n8n' };
  if (s.includes('openai') || s.includes('llm') || s.includes('nlp') || s.includes('rag') || s.includes('machine learning') || s.includes('deep learning') || s.includes('ai')) return { logo: 'https://cdn.simpleicons.org/openai/10A37F' };
  
  return { fallbackIcon: Sparkles };
};

interface SkillLogoBadgeProps {
  skill: string;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

export const SkillLogoBadge: React.FC<SkillLogoBadgeProps> = ({ skill, size = 'sm', className = '' }) => {
  const details = getSkillIconDetails(skill);
  const [imgError, setImgError] = useState(false);
  const FallbackIcon = details.fallbackIcon || Sparkles;

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-[9px] gap-1',
    sm: 'px-2.5 py-1 text-[10px] gap-1.5',
    md: 'px-3 py-1.5 text-xs gap-2'
  }[size];

  const imgSize = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4'
  }[size];

  return (
    <span className={`inline-flex items-center rounded-lg bg-[#0B1220] border border-[#2A3348] ${sizeClasses} text-[#EDEAE3]/90 font-mono hover:border-[#E0995A]/50 hover:bg-[#141D30] transition-all duration-200 cursor-default group shadow-sm ${className}`}>
      {details.logo && !imgError ? (
        <img 
          src={details.logo} 
          alt={skill} 
          className={`${imgSize} object-contain shrink-0 group-hover:scale-110 transition-transform`} 
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <FallbackIcon className={`${imgSize} text-[#E0995A] shrink-0 group-hover:scale-110 transition-transform`} />
      )}
      <span className="font-medium tracking-tight whitespace-nowrap">{skill}</span>
    </span>
  );
};
