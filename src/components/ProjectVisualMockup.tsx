import React from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Project } from '../types';

interface ProjectVisualMockupProps {
  project: Project;
  themeColor?: string;
  className?: string;
}

export const ProjectVisualMockup: React.FC<ProjectVisualMockupProps> = ({
  project,
  themeColor = '#E0995A',
  className = ''
}) => {
  const imageName = project.image ? project.title.split(':')[0].toLowerCase().replace(/[^a-z0-0]/g, '_') + '.jpg' : 'cover.jpg';

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-[#2A3348] bg-[#141D30] shadow-2xl flex flex-col ${className}`}>
      {/* Chrome Top Header */}
      <div className="flex items-center justify-between px-3 md:px-4 py-2 bg-[#0B1220] border-b border-[#2A3348] shrink-0 z-20">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#5FB3B3]/80" />
          <span className="ml-1.5 text-[11px] font-mono font-medium text-[#8B93A6] flex items-center gap-1.5 truncate max-w-[180px] sm:max-w-none">
            <ImageIcon size={11} className="text-[#8B93A6]" />
            {imageName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#141D30] border border-[#2A3348] text-[#EDEAE3]/70 uppercase">
            {project.domain || "SYSTEM"}
          </span>
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
        </div>
      </div>

      {/* Cover Image Frame */}
      <div className="relative flex-1 w-full h-full min-h-[160px] overflow-hidden group bg-[#0B1220]">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div 
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${themeColor}22 0%, #0B1220 80%)`
            }}
          >
            <ImageIcon size={32} className="text-[#8B93A6] mb-2" />
            <span className="text-xs font-mono text-[#EDEAE3] font-bold uppercase">{project.title}</span>
          </div>
        )}

        {/* Ambient Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/20 to-transparent opacity-80 pointer-events-none" />

        {/* Bottom Metadata Bar over Cover Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-[#EDEAE3] z-10">
          <span className="px-2.5 py-1 rounded-md bg-[#0B1220]/90 backdrop-blur-md border border-[#2A3348] text-[10px] font-bold tracking-wider text-[#E0995A] uppercase truncate max-w-[220px]">
            {project.domain || "SOFTWARE SYSTEM"}
          </span>
          <span className="text-[10px] font-mono text-[#EDEAE3]/80 bg-[#0B1220]/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-[#2A3348]">
            {project.status || "Active"}
          </span>
        </div>
      </div>
    </div>
  );
};
