import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      // Use linear interpolation (lerp) for ultra-smooth following
      // This eliminates any 'jitter' while still being incredibly responsive
      currentX += (targetX - currentX) * 0.5;
      currentY += (targetY - currentY) * 0.5;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX - 16}px, ${currentY - 16}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      targetX = e.clientX;
      targetY = e.clientY;
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('[role="link"]');
        
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Start animation loop
    render();
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999] mix-blend-difference hidden md:flex items-center justify-center will-change-transform"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
    >
      {/* Hover State: Expanded Circle */}
      <motion.div
        className="absolute w-full h-full bg-white rounded-full"
        initial={false}
        animate={{ 
          scale: isHovering ? 1.5 : 0,
          opacity: isHovering ? 1 : 0
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
      />
      
      {/* Normal State: Sleek Triangle */}
      <motion.div
        className="absolute w-full h-full"
        initial={false}
        animate={{ 
          scale: isHovering ? 0 : 1.2,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          <path d="M16 16 L28 19 L22 22 L19 28 Z" />
        </svg>
      </motion.div>
    </div>
  );
};
