import React, { useState, useEffect } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&?!';

export const GlitchText = ({ text, className }: { text: string, className?: string }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let interval: any;
    let timeout: any;

    const startGlitch = () => {
      let iterations = 0;
      interval = setInterval(() => {
        setDisplayText(prev => 
          prev.split('').map((char, index) => {
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join('')
        );
        
        if (iterations >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
          timeout = setTimeout(startGlitch, Math.random() * 5000 + 3000);
        }
        
        iterations += 1 / 3;
      }, 30);
    };

    timeout = setTimeout(startGlitch, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [text]);

  return <span className={className}>{displayText}</span>;
}
