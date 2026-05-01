import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor = ({ type = 'dot' }: { type?: 'dot' | 'triangle' }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      if (cursorRef.current) {
        // Update position directly via DOM for zero latency
        cursorRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
      }
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a');
        
      setIsHovering(!!isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[10000] flex items-center justify-center will-change-transform"
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
    >
      {type === 'dot' && (
        <>
          {/* Outer Glow / Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.5)]"
            initial={false}
            animate={{ 
              scale: isHovering ? 1.5 : 0.8,
              opacity: isHovering ? 0 : 1,
              borderColor: isHovering ? 'rgba(129,140,248,0)' : 'rgba(129,140,248,0.8)'
            }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          />
          
          {/* Inner Dot / Filled Hover State */}
          <motion.div
            className="absolute rounded-full bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.8)]"
            initial={false}
            animate={{ 
              width: isHovering ? 32 : 8,
              height: isHovering ? 32 : 8,
              opacity: isHovering ? 0.3 : 1
            }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          />
        </>
      )}

      {type === 'triangle' && (
        <>
          {/* Hover State: Expanded Circle */}
          <motion.div
            className="absolute w-full h-full bg-white rounded-full"
            initial={false}
            animate={{ 
              scale: isHovering ? 1.25 : 0,
              opacity: isHovering ? 1 : 0
            }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
          />
          
          {/* Normal State: Sleek Triangle */}
          <motion.div
            className="absolute w-full h-full"
            initial={false}
            animate={{ 
              scale: isHovering ? 0 : 1,
              opacity: isHovering ? 0 : 1
            }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.2 }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 16 L28 19 L22 22 L19 28 Z" />
            </svg>
          </motion.div>
        </>
      )}
    </div>
  );
};
