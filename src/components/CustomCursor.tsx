import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSuppressed, setIsSuppressed] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      if (!isSuppressed && !isVisible) {
        setIsVisible(true);
      }
      targetX = e.clientX;
      targetY = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${targetX - 16}px, ${targetY - 16}px, 0)`;
      }
    };

    const render = () => {
      // Instant direct tracking for native 1:1 response with zero lag
      currentX = targetX;
      currentY = targetY;

      if (cursorRef.current && (currentX !== 0 || currentY !== 0)) {
        cursorRef.current.style.transform = `translate3d(${currentX - 16}px, ${currentY - 16}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if cursor entered an iframe or an interactive preview area
      const isIframeOrPreview = 
        target.tagName.toLowerCase() === 'iframe' || 
        target.closest('iframe') ||
        target.closest('[data-hide-cursor="true"]') ||
        target.closest('.preview-viewport');
        
      if (isIframeOrPreview) {
        setIsVisible(false);
        setIsSuppressed(true);
        return;
      } else if (isSuppressed) {
        setIsSuppressed(false);
        setIsVisible(true);
      }

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
    const handleMouseEnter = () => {
      if (!isSuppressed) setIsVisible(true);
    };

    const handleHideCustomCursor = () => {
      setIsSuppressed(true);
      setIsVisible(false);
    };

    const handleShowCustomCursor = () => {
      setIsSuppressed(false);
      setIsVisible(true);
    };

    const handleWindowBlur = () => {
      setIsVisible(false);
    };

    const handleWindowFocus = () => {
      if (!isSuppressed) setIsVisible(true);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('hide-custom-cursor', handleHideCustomCursor);
    window.addEventListener('show-custom-cursor', handleShowCustomCursor);
    
    // Start animation loop
    render();
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('hide-custom-cursor', handleHideCustomCursor);
      window.removeEventListener('show-custom-cursor', handleShowCustomCursor);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isSuppressed]);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999] mix-blend-difference hidden md:flex items-center justify-center will-change-transform"
      style={{ opacity: isVisible && !isSuppressed ? 1 : 0, transition: 'opacity 0.2s ease' }}
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
