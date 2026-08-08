import React, { useEffect, useRef, useState } from 'react';

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse move listener for ambient spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isHovered) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered]);

  // Restrained Particle Constellation Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Initialize particles with amber (#E0995A) and teal (#5FB3B3)
    const particleCount = Math.min(Math.floor((width * height) / 28000), 30);
    const particles = Array.from({ length: particleCount }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.2 + 0.6,
      alpha: Math.random() * 0.4 + 0.15,
      pulse: Math.random() * Math.PI,
      isTeal: idx % 3 === 0, // 1/3 teal, 2/3 amber
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & draw particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.pulse += 0.015;
        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.1;

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isTeal
          ? `rgba(95, 179, 179, ${Math.max(0.05, currentAlpha)})`
          : `rgba(224, 153, 90, ${Math.max(0.05, currentAlpha)})`;
        ctx.fill();

        // Connect nearby particles with subtle hairline rules
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 100) * 0.08;
            ctx.strokeStyle = `rgba(42, 51, 72, ${lineAlpha * 2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-[#0B1220]">
      {/* Deep Ink Navy Base Gradient */}
      <div className="absolute inset-0 bg-radial-dark" />

      {/* Floating Animated Ambient Glow Orbs - Warm Amber & Muted Teal */}
      <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] bg-[#E0995A]/08 rounded-full blur-[140px] animate-pulse-slow" />
      <div 
        className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#5FB3B3]/06 rounded-full blur-[160px] animate-pulse-slow"
        style={{ animationDelay: '3s' }}
      />

      {/* Interactive Cursor Spotlight Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(224, 153, 90, 0.04), transparent 80%)`,
          }}
        />
      )}

      {/* High-Tech Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-grid-pattern"
        style={{
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* High-Tech Dot Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-dots-pattern"
        style={{
          maskImage: 'radial-gradient(circle at 50% 40%, black 30%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 40%, black 30%, transparent 90%)',
        }}
      />

      {/* Dynamic Particle Constellation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />

      {/* High-Tech Corner Frame Accents */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-[#2A3348] hidden md:block" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-[#2A3348] hidden md:block" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-[#2A3348] hidden md:block" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-[#2A3348] hidden md:block" />
    </div>
  );
};

export default InteractiveBackground;
