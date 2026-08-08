import React from 'react';

interface SignatureLedgerMotifProps {
  className?: string;
  label?: string;
}

export const SignatureLedgerMotif: React.FC<SignatureLedgerMotifProps> = ({ className = '', label }) => {
  return (
    <div className={`relative w-full max-w-6xl mx-auto py-10 px-4 select-none overflow-hidden ${className}`}>
      <div className="flex items-center justify-between w-full relative">
        
        {/* Left Double Ledger Rule */}
        <div className="flex-1 flex flex-col justify-center space-y-1 pr-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#2A3348] to-[#2A3348]" />
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#2A3348]/50 to-[#2A3348]/70" />
        </div>

        {/* Center Node & Edge Network Transition Bridge */}
        <div className="relative flex items-center justify-center shrink-0 px-6 py-2">
          <svg className="w-64 h-12 overflow-visible" viewBox="0 0 250 50" fill="none">
            {/* Background connecting edges */}
            <path
              d="M 0 25 L 30 25 L 60 12 L 100 38 L 140 12 L 180 38 L 220 25 L 250 25"
              stroke="#2A3348"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <path
              d="M 30 25 L 75 35 L 125 25 L 175 15 L 220 25"
              stroke="#2A3348"
              strokeWidth="1"
            />
            <path
              d="M 60 12 L 125 25 L 180 38"
              stroke="#2A3348"
              strokeWidth="0.8"
            />

            {/* Main structural baseline */}
            <line x1="0" y1="25" x2="30" y2="25" stroke="#E0995A" strokeWidth="1.5" strokeOpacity="0.8" />
            <line x1="220" y1="25" x2="250" y2="25" stroke="#5FB3B3" strokeWidth="1.5" strokeOpacity="0.8" />

            {/* Neural/AI Nodes */}
            {/* Node 1: Enterprise Ledger Start */}
            <circle cx="30" cy="25" r="3.5" fill="#141D30" stroke="#E0995A" strokeWidth="1.5" />
            
            {/* Node 2: Top Data Node */}
            <circle cx="60" cy="12" r="3" fill="#141D30" stroke="#E0995A" strokeWidth="1.2" />
            <circle cx="60" cy="12" r="1" fill="#E0995A" />

            {/* Node 3: Bottom System Node */}
            <circle cx="100" cy="38" r="3" fill="#141D30" stroke="#E0995A" strokeWidth="1.2" />

            {/* Center Neural Hub */}
            <circle cx="125" cy="25" r="4.5" fill="#141D30" stroke="#5FB3B3" strokeWidth="1.5" />
            <circle cx="125" cy="25" r="2" fill="#5FB3B3" />

            {/* Node 5: Top ML Node */}
            <circle cx="140" cy="12" r="3" fill="#141D30" stroke="#5FB3B3" strokeWidth="1.2" />

            {/* Node 6: Bottom AI Node */}
            <circle cx="180" cy="38" r="3" fill="#141D30" stroke="#5FB3B3" strokeWidth="1.2" />
            <circle cx="180" cy="38" r="1" fill="#5FB3B3" />

            {/* Node 7: Output AI System */}
            <circle cx="220" cy="25" r="3.5" fill="#141D30" stroke="#5FB3B3" strokeWidth="1.5" />
          </svg>

          {label && (
            <span className="absolute -bottom-4 text-[10px] font-mono tracking-[0.2em] text-[#8B93A6] uppercase whitespace-nowrap">
              {label}
            </span>
          )}
        </div>

        {/* Right Double Ledger Rule */}
        <div className="flex-1 flex flex-col justify-center space-y-1 pl-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-[#2A3348] via-[#2A3348] to-transparent" />
          <div className="h-[1px] w-full bg-gradient-to-r from-[#2A3348]/70 via-[#2A3348]/50 to-transparent" />
        </div>

      </div>
    </div>
  );
};

export default SignatureLedgerMotif;
