import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const isHoveringRef = useRef(false);
  const isSuppressedRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = -100;
    let targetY = -100;

    const setPosition = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
    };

    const showCursor = () => {
      if (isSuppressedRef.current) return;
      isVisibleRef.current = true;
      setIsVisible(true);
      cursor.style.opacity = '1';
    };

    const hideCursor = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
      cursor.style.opacity = '0';
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition(targetX, targetY);

      if (!isVisibleRef.current && !isSuppressedRef.current) {
        showCursor();
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if cursor entered an iframe or an interactive preview area
      const isIframeOrPreview = 
        target.tagName.toLowerCase() === 'iframe' || 
        !!target.closest('iframe') ||
        !!target.closest('[data-hide-cursor="true"]') ||
        !!target.closest('.preview-viewport');
        
      if (isIframeOrPreview) {
        isSuppressedRef.current = true;
        hideCursor();
        return;
      } else if (isSuppressedRef.current) {
        isSuppressedRef.current = false;
        showCursor();
      }

      const isClickable = 
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'select' ||
        target.tagName.toLowerCase() === 'textarea' ||
        !!target.closest('button') ||
        !!target.closest('a') ||
        !!target.closest('[role="button"]') ||
        !!target.closest('[role="link"]');
        
      if (isHoveringRef.current !== isClickable) {
        isHoveringRef.current = isClickable;
        setIsHovering(isClickable);
      }
    };

    const handleDocumentMouseLeave = () => {
      hideCursor();
    };

    const handleDocumentMouseEnter = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition(targetX, targetY);
      if (!isSuppressedRef.current) {
        showCursor();
      }
    };

    const handleHideCustomCursor = () => {
      isSuppressedRef.current = true;
      hideCursor();
    };

    const handleShowCustomCursor = (e?: Event) => {
      isSuppressedRef.current = false;
      showCursor();
    };

    const handleWindowBlur = () => {
      hideCursor();
    };

    const handleWindowFocus = () => {
      if (!isSuppressedRef.current) {
        showCursor();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleDocumentMouseLeave);
    document.addEventListener('mouseenter', handleDocumentMouseEnter);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('hide-custom-cursor', handleHideCustomCursor);
    window.addEventListener('show-custom-cursor', handleShowCustomCursor);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleDocumentMouseLeave);
      document.removeEventListener('mouseenter', handleDocumentMouseEnter);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('hide-custom-cursor', handleHideCustomCursor);
      window.removeEventListener('show-custom-cursor', handleShowCustomCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999] mix-blend-difference hidden md:flex items-center justify-center will-change-transform opacity-0 transition-opacity duration-150 ease-out"
    >
      {/* Hover State: Expanded Circle */}
      <motion.div
        className="absolute w-full h-full bg-white rounded-full"
        initial={false}
        animate={{ 
          scale: isHovering ? 1.4 : 0,
          opacity: isHovering ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
      />
      
      {/* Normal State: Sleek Triangle */}
      <motion.div
        className="absolute w-full h-full flex items-center justify-center"
        initial={false}
        animate={{ 
          scale: isHovering ? 0 : 1.15,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
          <path d="M16 16 L28 19 L22 22 L19 28 Z" />
        </svg>
      </motion.div>
    </div>
  );
};
