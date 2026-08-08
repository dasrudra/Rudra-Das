import React, { useState, useRef } from 'react';

interface TiltContainerProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
  glareIntensity?: number;
}

export const TiltContainer: React.FC<TiltContainerProps> = ({ 
  children, 
  className = "", 
  maxTilt = 10, 
  glowColor = "rgba(224, 153, 90, 0.15)", 
  glareIntensity = 0.15 
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    
    setTilt({
      x: normY * -maxTilt,
      y: normX * maxTilt
    });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? 12 : 0}px)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Cursor Light Glare */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-10 mix-blend-overlay"
        style={{
          opacity: isHovered ? glareIntensity * 2 : 0,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.35) 0%, transparent 60%)`
        }}
      />

      {/* Dynamic Ambient Backlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0.4,
          boxShadow: `0 0 35px ${glowColor}`
        }}
      />

      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
